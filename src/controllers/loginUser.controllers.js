import {getConnection} from '../database/connection.js';
import sql from 'mssql'

export const loginUser = async (req, res) => {
    const pool = await getConnection()
    
    const result = await pool
    .request()
    .input("UserParm", sql.VarChar, req.body.User)
    .input("PasswordParm", sql.VarChar, req.body.Password)    
    .execute("sp_LoginUser");
    
    if (!result.recordset || result.recordset.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log(result);
    return res.json(result.recordset[0]);
}

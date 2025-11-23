import {getConnection} from '../database/connection.js';
import sql from 'mssql'

export const getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Usuario');
    
    res.json(result.recordset);
}

export const getUserById = (req, res) => {
    const { id } = req.params;

    res.send(`Detalles del usuario con ID: ${id}`);
}

export const createUser = async (req, res) => {    
    const pool = await getConnection()

    const result = await pool
    .request()
    .input("FirstName", sql.VarChar, req.body.Nombres)
    .input("LastName", sql.VarChar, req.body.Apellidos)    
    .input("Phone", sql.VarChar, req.body.Telefono)
    .input("Email", sql.VarChar, req.body.Email)
    .input("Rol", sql.Int, req.body.Rol)
    .input("User", sql.VarChar, req.body.Usuario)
    .input("Password", sql.VarChar, req.body.Clave)
    .execute("sp_CreateUser");
    
    res.json({
        id: result.recordset[0].UserId,
        message: 'Usuario creado correctamente'});
}   

export const updateUser = (req, res) => { 
    const { id } = req.params;
    res.send(`Actualizar el usuario con ID: ${id}`);
}   

export const deleteUser = async(req, res) => {    
    const pool =  await getConnection()
    const result = await pool.request()
    .input("IdUser", sql.Int, req.params.id)
    .execute("sp_DeleteUser");
    
    if (result.recordset[0].Deleted === 0) {
        return res.status(404).json({message: "Usuario no encontrado"});
    }

    return res.json({message: "Usuario eliminado correctamente"});
}   
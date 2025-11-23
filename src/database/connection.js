import sql from 'mssql'


const dbSettings =  {
        user: 'sa',
        password: 'system',
        server: 'HACC\\SQLEXPRESS',        // <--- nombre del servicio en docker-compose
        database: 'DicriDB',
        options: {
                encrypt: true, 
                enableArithAbort: true,
                 integratedSecurity: true, 
                 trustServerCertificate: true, 
                 rowCollectionOnDone: true, 
                 instanceName: 'SQLEXPRESS'
        }
    }

export const getConnection = async () => {
    try {
        const pool = new sql.ConnectionPool(dbSettings);
        const poolConnect = await pool.connect()           

        return poolConnect;
    } catch (error) {
        console.error('ERROR VERIFIQUE:', error)
    }
}
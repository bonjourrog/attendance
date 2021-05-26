const mysql = require('mysql')
const {promisify} = require('util')
const {database} = require('./keys.js')

const pool = mysql.createPool(database)

pool.getConnection((err, conn)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log(`Database connection was closed. Error => ${err.code}`);
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log(`To many Connections. Error => ${err.code}`);
        }
        if(err.code === 'ECONNREFUSED'){
            console.log(`Data base connection was refused. Error => ${err.code}`);
        }
        if(conn){
            conn.release()
            console.log(`Database connection successfuly`);
            return;
        }
    }
})

pool.query = promisify(pool.query)

module.exports = pool

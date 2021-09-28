const mysql = require('mysql');
var path = require('path');
const envpath = path.join(__dirname, '../env')
require('dotenv').config({path: envpath + '/.env' });

const connection = mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password: process.env.DB_PASS,
        database : process.env.DB_DATABASE
    })


    connection.connect((error)=>{
        if (error) {
            
            console.log("El error es " + error)
            return
        }
        console.log("Conectado :)")
    })

    module.exports = connection;
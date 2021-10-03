const mysql = require('mysql2');


const myConnection = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'clothes',
        password: 'admin'
    });
    return connection;
}


module.exports = myConnection;
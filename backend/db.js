const mysql = require('mysql');

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'root1234',
    database: 'myapp'
});
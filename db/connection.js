// Import the mysql2 library
const mysql = require('mysql2');

// Create a MySQL connection configuration object
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

// Export the MySQL connection object for use in other modules
module.exports = db;

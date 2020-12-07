const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    //my username
    user: "root",
    //my password
    password: "rootroot",
    database: "employees"
});

connection.connect();

//setting up connection.query to use promises instead of callbacks
//use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;
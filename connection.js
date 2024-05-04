const mysql = require("mysql");

const db = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6702751",
    database: "sql6702751",
    password: "ulTfR6Lyi9",
});
//

module.exports = db;

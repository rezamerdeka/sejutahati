const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "localhost",
    user: "crud",
    database: "node_auth_api",
    password: "12345",
  })
  .on("error", (err) => {
    console.log("Gagal connect ke Database - ", err);
  });

module.exports = db_connection;

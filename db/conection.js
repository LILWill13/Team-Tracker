// requires the libary of mysql2
const mysql = require("mysql2");

// links our file to mysql2
const connection = mysql.createConnection({
  // localhost = the computer the app is running on
  host: "localhost",
  // our mysql username and password
  user: "root",
  password: "root",
  // the database we are connecting to
  database: "company_roster"
});

// if there is an error then it will be displayed
connection.connect(function (err) {
  if (err) throw err;
});

// allows us to use sqlLink in the other files in our application
module.exports = connection;
import mysql from "mysql";
// import dotenv from "dotenv";
// dotenv.config();
console.log(process.env.DATABASE, process.env.NODE_ENV);
var connection: any = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err: any) => {
  if (!err) {
    console.log("Connected to the database.");
  } else {
    console.log(err);
  }
});

export default connection;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// import dotenv from "dotenv";
// dotenv.config();
console.log(process.env.DATABASE, process.env.NODE_ENV);
var connection = mysql_1.default.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
connection.connect((err) => {
    if (!err) {
        console.log("Connected to the database.");
    }
    else {
        console.log(err);
    }
});
exports.default = connection;

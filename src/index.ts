// const express = require("express");
// const todosRouter = require("./routes/todos");
import express from "express";
import todosRouter from "./routes/todos";
// const bodyParser = require("body-parser");
import bodyParser from "body-parser";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(todosRouter);

export default app;
// module.exports = app
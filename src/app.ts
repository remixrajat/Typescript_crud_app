// const express = require("express");
import express from "express";
import todosRouter from "./routes/todos";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(todosRouter);
const port = 8000;

app.listen(port, () => {
  console.log("Server started");
});

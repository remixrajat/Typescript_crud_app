"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
// const todosRouter = require("./routes/todos");
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
// const bodyParser = require("body-parser");
const body_parser_1 = __importDefault(require("body-parser"));
// import dotenv from "dotenv";
// dotenv.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(todos_1.default);
exports.default = app;
// module.exports = app

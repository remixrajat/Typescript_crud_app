"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todos_1 = require("./todos");
const mysql_1 = __importDefault(require("mysql"));
// beforeEach(async () => {
//   const connection = await mysql.createConnection({
//     host: "localhost",
//     port: 3307,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: "todos",
//   });
//   await connection.synchronize();
// });
it("Should add two numbers", () => {
    expect(1 + 4).toBe(5);
});
// it("should check dataHandler", async () => {
//   let data: any = await dataHandler(`select * from todos_table`);
//   expect(data).toBe();
// });
// it("Should return data", async () => {
//   const data = await dataHandler("http://localhost:3020/test");
//   expect(data).toStrictEqual("test");
// });
// const promise = require("../promise");
it("Testing Promise With Error", () => __awaiter(void 0, void 0, void 0, function* () {
    (0, todos_1.dataHandler)("http://localhost:3020/tes").catch((err) => {
        expect(err).toEqual(Error("Wrong"));
    });
}));
it("Should retrun a valid user", (done) => {
    var connection = mysql_1.default.createConnection({
        host: "localhost",
        port: 3307,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: "test_todos",
    });
    connection.connect((err) => {
        if (!err) {
            const todo = {
                id: 1,
                todo: "F Todo",
            };
            (0, todos_1.dataHandler)(`insert into todos_table(todo) values("${todo.todo}")`);
        }
        else {
            console.log(err);
        }
        const req = { id: 1 };
    });
});

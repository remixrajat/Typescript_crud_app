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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const todos_1 = require("../routes/todos");
const http_status_codes_1 = require("http-status-codes");
// test("should add two numbers", ()=>{
//     const total = 1+1;
//     expect(total).toBe(2);
// })
const todo = { data: [{
            todo_id: 1,
            todo: "testing todo"
        }] };
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, todos_1.dataHandler)(`delete from todos_table`);
    yield (0, todos_1.dataHandler)(`insert into todos_table (todo_id,todo) values (${1},"testing todo")`);
}));
test("should add user to the database", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(index_1.default).post("/todo").send({ todo: "My first test todo" }).expect(201);
}));
test("should get user to the database", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(index_1.default).get("/").expect(200);
    const todoData = yield (0, todos_1.dataHandler)(`select * from todos_table`);
    expect(todoData[0]).not.toBeUndefined();
    expect(response.body.data).toMatchObject(todoData);
}));
test("should update a user in the database", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(index_1.default).put(`/todo/${1}`).send({
        todo_id: 1,
        todo: "updated testing todo"
    }).expect(200);
    const todoData = yield (0, todos_1.dataHandler)(`select * from todos_table`);
    expect(todoData).toMatchObject([{
            todo_id: 1,
            todo: "updated testing todo"
        }]);
}));
test("should delete a user from the database", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(index_1.default).delete(`/todo/${1}`).send().expect(http_status_codes_1.StatusCodes.OK);
    const todoData = yield (0, todos_1.dataHandler)(`select * from todos_table`);
    expect(todoData[0]).toBeUndefined();
}));

import { dataHandler } from "./todos";
import mysql from "mysql";

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

it("Testing Promise With Error", async () => {
  dataHandler("http://localhost:3020/tes").catch((err) => {
    expect(err).toEqual(Error("Wrong"));
  });
});

it("Should retrun a valid user", (done) => {
  var connection: any = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "test_todos",
  });

  connection.connect((err: any) => {
    if (!err) {
      const todo: any = {
        id: 1,
        todo: "F Todo",
      };
      dataHandler(`insert into todos_table(todo) values("${todo.todo}")`);
    } else {
      console.log(err);
    }

    const req = { id: 1 };
  });
});

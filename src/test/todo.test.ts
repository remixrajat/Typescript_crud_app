import request from "supertest";
import app from "../index";
import db from "../database/database";
import {dataHandler} from "../routes/todos";
import {
    StatusCodes,
} from 'http-status-codes';

// test("should add two numbers", ()=>{
//     const total = 1+1;
//     expect(total).toBe(2);
// })

const todo = {data: [{
    todo_id: 1,
    todo: "testing todo"
}]}

beforeEach(async()=>{
    await dataHandler(`delete from todos_table`);
    await dataHandler(`insert into todos_table (todo_id,todo) values (${1},"testing todo")`)
})

test("should add user to the database", async()=>{
    await request(app).post("/todo").send({todo: "My first test todo"}).expect(201);
})

test("should get user to the database", async()=>{
    const response = await request(app).get("/").expect(200);
    const todoData: any = await dataHandler(`select * from todos_table`)
    expect(todoData[0]).not.toBeUndefined();
    expect(response.body.data).toMatchObject(todoData)
})

test("should update a user in the database", async()=>{
    const response = await request(app).put(`/todo/${1}`).send({
        todo_id: 1,
        todo: "updated testing todo"
    }).expect(200);
    const todoData: any = await dataHandler(`select * from todos_table`)
    expect(todoData).toMatchObject([{
        todo_id: 1,
        todo: "updated testing todo"
    }])
})

test("should delete a user from the database", async()=>{
    await request(app).delete(`/todo/${1}`).send().expect(StatusCodes.OK);
    const todoData: any = await dataHandler(`select * from todos_table`)
    expect(todoData[0]).toBeUndefined();
})

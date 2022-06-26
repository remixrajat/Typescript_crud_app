import { Router } from "express";
import db from "../database/database";

const router = Router();

type RequestBody = { todo: string };
type RequestParams = { todoId: string };

export const dataHandler = (sql: string) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err: any, result: any, fields: any) => {
      if (err) return reject(err);
      else return resolve(result);
    });
  });
};

router.get("/", async (req: any, res: any, next: any) => {
  try {
    const result = await dataHandler(`select * from todos_table`);
    res.status(200).json({ data: result });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/todo", async (req, res, next) => {
  const body = req.body as RequestBody;

  try {
    const result = await dataHandler(
      `insert into todos_table(todo) values("${body.todo}")`
    );
    res.status(201).json({ message: "Successfully added to the database", data: result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/todo/:todoId", async (req, res, next) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const tid = Number(params.todoId);
  try {
    try {
      var data: any = await dataHandler(
        `select todo_id, todo from todos_table where todo_id=${tid}`
      );
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }

    if (data.length > 0) {
      const result = await dataHandler(
        `update todos_table set todo="${body.todo}" where todo_id=${tid}`
      );

      res.status(200).json({
        message: "Successfully updated todo.",
        results: result,
      });
    } else {
      res
        .json(200)
        .json({ message: "Success", response: "No data found for this id" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/todo/:todoId", async (req, res, next) => {
  const params = req.params as RequestParams;

  try {
    const result = dataHandler(
      `delete from todos_table where todo_id=${Number(params.todoId)}`
    );

    res.status(200).json({ message: "Successfully Deleted." });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
export default router;

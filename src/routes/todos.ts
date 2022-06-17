import { Router } from "express";
import db from "../database/database";

const router = Router();

type RequestBody = { todo: string };
type RequestParams = { todoId: string };

router.get("/", async (req: any, res: any, next) => {
  try {
    console.log("Hello");
    const result = await db.query(`select * from todos_table`);
    console.log(result);
    // res.status(200).json({ data: result });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }

  // db.query(
  //   "select * from todos_table",
  //   (error: any, results: any, fields: any) => {
  //     if (error) res.status(400).json({ message: error.message });
  //     else res.status(200).json({ data: results });
  //   }
  // );
});

router.post("/todo", async (req, res, next) => {
  const body = req.body as RequestBody;

  try {
    const result = await db.query(
      `insert into todos_table(todo) values("${body.todo}")`
    );
    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
  // db.query(
  //   `insert into todos_table(todo) values("${body.todo}")`,
  //   (error: any, results: any, fields: any) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(400).json({ message: error.message });
  //     }

  //     res.status(200).json({ data: results });
  //   }
  // );
});

router.put("/todo/:todoId", async (req, res, next) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const tid = Number(params.todoId);
  try {
    try {
      var data = await db.query(
        `select todo_id, todo from todos_table where todo_id=${tid}`
      );
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }

    if (data.length > 0) {
      const result = await db.query(
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

  // db.query(
  //   `select todo_id, todo from todos_table where todo_id=${tid}`,
  //   (error: any, results: any, fields: any) => {
  //     if (error) res.status(400).json({ message: error.message });
  //     else {
  //       console.log(results);
  //       if (results.length > 0) {
  //         db.query(
  //           `update todos_table set todo="${body.todo}" where todo_id=${tid}`,
  //           (error: any, results: any, fields: any) => {
  //             if (error) res.status(400).json({ message: error.message });
  //             else
  //               res.status(200).json({
  //                 message: "Successfully updated todo.",
  //                 results: results,
  //               });
  //           }
  //         );
  //       }
  //     }
  //   }
  // );
});

router.delete("/todo/:todoId", async (req, res, next) => {
  const params = req.params as RequestParams;

  try {
    const result = await db.query(
      `delete from todos_table where todo_id=${Number(params.todoId)}`
    );
    res.status(200).json({ message: "Successfully Deleted.", data: result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
  // db.query(
  //   `delete from todos_table where todo_id=${Number(params.todoId)}`,
  //   (error: any, results: any, fields: any) => {
  //     if (error) res.status(400).json({ message: error.message });
  //     else
  //       res
  //         .status(200)
  //         .json({ message: "Successfully Deleted.", data: results });
  //   }
  // );
});
export default router;

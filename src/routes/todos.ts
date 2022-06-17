import { Router } from "express";
import db from "../database/database";

const router = Router();

type RequestBody = { todo: string };
type RequestParams = { todoId: string };

router.get("/", async (req: any, res: any, next) => {
  db.query(
    "select * from todos_table",
    (error: any, results: any, fields: any) => {
      if (error) res.status(400).json({ message: error.message });
      else res.status(200).json({ data: results });
    }
  );
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  console.log(body);
  db.query(
    `insert into todos_table(todo) values("${body.todo}")`,
    (error: any, results: any, fields: any) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
      }

      res.status(200).json({ data: results });
    }
  );
});

router.put("/todo/:todoId", (req, res, next) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const tid = Number(params.todoId);
  console.log(tid, typeof tid);

  db.query(
    `select todo_id, todo from todos_table where todo_id=${tid}`,
    (error: any, results: any, fields: any) => {
      if (error) res.status(400).json({ message: error.message });
      else {
        console.log(results);
        if (results.length > 0) {
          db.query(
            `update todos_table set todo="${body.todo}" where todo_id=${tid}`,
            (error: any, results: any, fields: any) => {
              if (error) res.status(400).json({ message: error.message });
              else
                res.status(200).json({
                  message: "Successfully updated todo.",
                  results: results,
                });
            }
          );
        }
      }
    }
  );
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  db.query(
    `delete from todos_table where todo_id=${Number(params.todoId)}`,
    (error: any, results: any, fields: any) => {
      if (error) res.status(400).json({ message: error.message });
      else
        res
          .status(200)
          .json({ message: "Successfully Deleted.", data: results });
    }
  );
});
export default router;

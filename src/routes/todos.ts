import { Router } from "express";
import db from "../database/database";
import fs from "fs";
import axios from "axios";
const router = Router();

type RequestBody = { todo: string };
type RequestParams = { todoId: string };

export const dataHandler = (sql: string) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err: any, result: any, fields: any) => {
      if (err) return reject("Wrong");
      else return resolve(result);
    });
  });
};

router.get("/stream", async (req: any, res: any, next) => {
  try {
    const stream = fs.createReadStream(`${__dirname}/data.txt`);
    stream.pipe(res);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/writeMultiple", async (req: any, res: any, next) => {
  console.log("mango");
  try {
    const stream = fs.createReadStream(`${__dirname}/data.json`);
    stream.on("data", (chunk) => {
      const dataFromjson = JSON.parse(chunk.toString());
      let i = 1;
      let j = 0;
      for (const data in dataFromjson) {
        if (j < 5) {
          const writableStream = fs.createWriteStream(
            `${__dirname}/email${i}.txt`,
            {
              flags: "a",
            }
          );

          writableStream.write(`${data}: "${dataFromjson[data]}"\n`);

          j++;
        } else {
          j = 1;
          i++;
          const writableStream = fs.createWriteStream(
            `${__dirname}/email${i}.txt`,
            {
              flags: "a",
            }
          );
          writableStream.write(`${data}: "${dataFromjson[data]}"\n`);
        }
      }
      res.status(200).json({ result: "Success." });
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/readwriteStream", async (req: any, res: any) => {
  try {
    let dataFromRoute = await axios.get("http://localhost:8000/stream");
    // console.log(dataFromRoute.data);
    const writableStream = fs.createWriteStream(`${__dirname}/dataWrite.txt`);
    writableStream.write(dataFromRoute.data);
    res.status(200).json({ result: "Success" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/stream", async (req: any, res: any, next) => {
  try {
    const writableStream = fs.createWriteStream(`${__dirname}/data.txt`);
    writableStream.write(req.body.data);
    res.status(200).json({ result: "Success" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req: any, res: any, next) => {
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
    res
      .status(201)
      .json({ message: "Successfully added to the database", data: result });
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

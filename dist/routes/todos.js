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
const express_1 = require("express");
const database_1 = __importDefault(require("../database/database"));
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.query("select * from todos_table", (error, results, fields) => {
        if (error)
            res.status(400).json({ message: error.message });
        else
            res.status(200).json({ data: results });
    });
}));
router.post("/todo", (req, res, next) => {
    const body = req.body;
    console.log(body);
    database_1.default.query(`insert into todos_table(todo) values("${body.todo}")`, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
        res.status(200).json({ data: results });
    });
});
router.put("/todo/:todoId", (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const tid = Number(params.todoId);
    console.log(tid, typeof tid);
    database_1.default.query(`select todo_id, todo from todos_table where todo_id=${tid}`, (error, results, fields) => {
        if (error)
            res.status(400).json({ message: error.message });
        else {
            console.log(results);
            if (results.length > 0) {
                database_1.default.query(`update todos_table set todo="${body.todo}" where todo_id=${tid}`, (error, results, fields) => {
                    if (error)
                        res.status(400).json({ message: error.message });
                    else
                        res.status(200).json({
                            message: "Successfully updated todo.",
                            results: results,
                        });
                });
            }
        }
    });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    database_1.default.query(`delete from todos_table where todo_id=${Number(params.todoId)}`, (error, results, fields) => {
        if (error)
            res.status(400).json({ message: error.message });
        else
            res
                .status(200)
                .json({ message: "Successfully Deleted.", data: results });
    });
});
exports.default = router;

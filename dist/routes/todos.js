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
exports.dataHandler = void 0;
const express_1 = require("express");
const database_1 = __importDefault(require("../database/database"));
const router = (0, express_1.Router)();
const dataHandler = (sql) => {
    return new Promise((resolve, reject) => {
        database_1.default.query(sql, (err, result, fields) => {
            if (err)
                return reject(err);
            else
                return resolve(result);
        });
    });
};
exports.dataHandler = dataHandler;
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, exports.dataHandler)(`select * from todos_table`);
        res.status(200).json({ data: result });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}));
router.post("/todo", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const result = yield (0, exports.dataHandler)(`insert into todos_table(todo) values("${body.todo}")`);
        res.status(201).json({ message: "Successfully added to the database", data: result });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.put("/todo/:todoId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const tid = Number(params.todoId);
    try {
        try {
            var data = yield (0, exports.dataHandler)(`select todo_id, todo from todos_table where todo_id=${tid}`);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
        if (data.length > 0) {
            const result = yield (0, exports.dataHandler)(`update todos_table set todo="${body.todo}" where todo_id=${tid}`);
            res.status(200).json({
                message: "Successfully updated todo.",
                results: result,
            });
        }
        else {
            res
                .json(200)
                .json({ message: "Success", response: "No data found for this id" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.delete("/todo/:todoId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    try {
        const result = (0, exports.dataHandler)(`delete from todos_table where todo_id=${Number(params.todoId)}`);
        res.status(200).json({ message: "Successfully Deleted." });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.default = router;

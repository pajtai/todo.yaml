import { Router } from "express";
import {putTodos} from "../file-io/todo-yaml-put.js";
import {ensureAndGetTodos} from "../file-io/todo-yaml-ensure-get.js";
import {CWD, TODO_FILE_NAME} from "../constants.js";
import {sep} from "path";

export const router = Router();

router.get("/todo", async (req, res) => {
    const todos = await ensureAndGetTodos();
    res.json(todos.todo.map(ensureTodoStructure));
});

router.post("/todo", async (req, res) => {
    await putTodos(req.body);
    res.status(200).send();
});

router.get("/file", (req, res) => {
    res.json({
        filePath: [CWD, TODO_FILE_NAME].join(sep)
    });
});

function ensureTodoStructure(todo) {
    if (typeof todo === "string") {
        return {
            title: todo,
            done: false
        }
    } else {
        return todo;
    }
}

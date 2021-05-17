import { Router } from "express";
import {putTodos} from "../file-io/todo-yaml-put.js";
import {ensureAndGetTodos} from "../file-io/todo-yaml-ensure-get.js";

export const router = Router();

router.get("/todo", async (req, res) => {
    const todos = await ensureAndGetTodos();
    res.json(todos.todo.map(ensureTodoStructure));
});

router.post("/todo", async (req, res) => {
    await putTodos(req.body);
    res.status(200).send();
});

function ensureTodoStructure(todo) {
    if (typeof todo === "string") {
        return {
            title: todo,
            done: false,
            // type: null,
            // due: null,
            // priority: null,
            // project: null,
        }
    } else {
        return todo;
    }
}

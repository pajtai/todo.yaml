import { Router } from "express";
import { putTodos } from "../file-io/todo-yaml-put.js";
import { ensureTodoStructure } from "../core/util.js";
import { ensureAndGetTodos } from "../file-io/todo-yaml-ensure-get.js";
import configs from "../configs.js";
import { sep } from "path";

export const router = Router();

router.get("/todo", async (req, res) => {
    const todos = await ensureAndGetTodos();
    res.json(todos.todo.map(ensureTodoStructure(todos.configuration)));
});

router.post("/todo", async (req, res) => {
    await putTodos(req.body);
    res.status(200).send();
});

router.get("/configuration", async (req, res) => {
    const todos = await ensureAndGetTodos();
    res.json(todos.configuration);
});

router.get("/file", (req, res) => {
    res.json({
        filePath: [configs.CWD, configs.TODO_FILE_NAME].join(sep),
        fileName: configs.TODO_FILE_NAME,
    });
});

router.post("/shutdown", (req, res) => {
    if (req.body.action === "shutdown") {
        res.status(200).send();
        process.exit();
    }
});

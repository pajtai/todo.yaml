import { Router } from "express";
import { putTodos } from "../file-io/todo-yaml-put.js";
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
    });
});

router.post("/shutdown", (req, res) => {
    if (req.body.action === "shutdown") {
        res.status(200).send();
        process.exit();
    }
});

function ensureTodoStructure(configuration) {
    configuration.columns = configuration.columns || {};
    return (todo) => {
        if (typeof todo === "string") {
            return {
                title: todo,
            };
        }

        if (configuration.columns.dueDate) {
            todo.dueDate = todo.dueDate || null;
        } else {
            delete todo.dueDate;
        }

        if (configuration.columns.notes) {
            todo.notes = todo.notes || "";
        } else {
            delete todo.notes;
        }

        if (configuration.columns.importance) {
            todo.importance = todo.importance || 0;
        } else {
            delete todo.importance;
        }

        return todo;
    };
}

import { Router } from "express";
import { putTodos } from "../file-io/todo-yaml-put.js";
import { ensureTodoStructure } from "../core/util.js";
import { ensureAndGetTodos } from "../file-io/todo-yaml-ensure-get.js";
import configs from "../configs.js";
import { sep } from "path";
import util from "util";
import globCb from "glob";
const glob = util.promisify(globCb);
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

router.get("/files", async (req, res) => {
    const allYamlFiles = await glob([configs.CWD, "*.yaml"].join(sep));
    const currentFilePath = [configs.CWD, configs.TODO_FILE_NAME].join(sep);
    res.json({
        filePath: currentFilePath,
        fileName: configs.TODO_FILE_NAME,
        otherFiles: allYamlFiles.filter((file) => currentFilePath === file),
    });
});

router.post("/shutdown", (req, res) => {
    if (req.body.action === "shutdown") {
        res.status(200).send();
        process.exit();
    }
});

import { Router } from "express";
import { putTodos } from "../file-io/todo-yaml-put.js";
import { ensureTodoStructure } from "../core/util.js";
import { ensureAndGetTodos } from "../file-io/todo-yaml-ensure.js";
import configs from "../configs.js";
import { sep, basename } from "path";
import util from "util";
import globCb from "glob";
import { getTodos } from "../file-io/todo-yaml-get.js";
const glob = util.promisify(globCb);
export const router = Router();

router.get("/todo", async (req, res) => {
    // ensure .. etc cannot be passed into getTodos
    const file = basename(req.query.file || configs.TODO_FILE_NAME);
    const todos = await getTodos(file);
    res.json(todos.todo.map(ensureTodoStructure(todos.configuration)));
});

router.post("/todo", async (req, res) => {
    const file = basename(req.query.file || configs.TODO_FILE_NAME);
    await putTodos(req.body, file);
    res.status(200).send();
});

router.get("/configuration", async (req, res) => {
    const file = basename(req.query.file || configs.TODO_FILE_NAME);
    const todos = await getTodos(file);
    res.json(todos.configuration);
});

router.get("/files", async (req, res) => {
    const allYamlFiles = await glob([configs.CWD, "*.yaml"].join(sep));
    const file = basename(req.query.file || configs.TODO_FILE_NAME);
    const currentFilePath = [configs.CWD, file].join(sep);
    res.json({
        filePath: currentFilePath,
        fileName: file,
        otherFiles: allYamlFiles
            .filter((file) => currentFilePath !== file)
            .map((file) => {
                return {
                    filePath: file,
                    fileName: basename(file),
                };
            }),
    });
});

router.post("/shutdown", (req, res) => {
    if (req.body.action === "shutdown") {
        res.status(200).send();
        process.exit();
    }
});

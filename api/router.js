import { Router } from "express";
import {getTodos} from "./file-io/todo-yaml-get.js";

export const router = Router();

router.get("/todo", async (req, res) => {
    const todos = await getTodos();
    res.json(todos);
});


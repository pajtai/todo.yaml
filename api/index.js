#!/usr/bin/env node
import { dirname, sep } from 'path';
import { fileURLToPath } from 'url';
import open from "open";
import { router } from "./router.js";
import { ensureTodoYamlFile } from "./file-io/todo-yaml-ensure.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
import express from 'express';

await ensureTodoYamlFile();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static([__dirname,"..", "app", "dist"].join(sep)));

app.use("/api", router);
app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`App listening at ${url}`);
    open(url);
});

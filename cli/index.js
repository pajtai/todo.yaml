import { Command } from "commander";
import { configure } from "./configure.js";
import { ensureAndGetTodos } from "../file-io/todo-yaml-ensure-get.js";
import {writeFile} from "fs/promises";
import {CWD, TODO_FILE_NAME} from "../constants.js";
import {sep} from "path";
import YAML from "yaml";

const program = new Command();

program
    .command("configure")
    .alias("c")
    .description("Configure todo.yaml")
    .action(async () => {
        let todos = await ensureAndGetTodos();
        todos.configuration = await configure(todos.configuration);
        await writeFile([CWD, TODO_FILE_NAME].join(sep), YAML.stringify(todos));
    });

program.parse(process.argv);
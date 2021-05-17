import { Command } from "commander";
import { configure } from "./configure.js";
import {getEntireTodosObject} from "../file-io/todo-yaml-get.js";
import {ensureTodoYamlFile} from "../file-io/todo-yaml-ensure.js";
import {writeFile} from "fs/promises";
import {CWD, TODO_FILE_NAME} from "../api/constants.js";
import {sep} from "path";
import YAML from "yaml";

const program = new Command();

program
    .command("configure")
    .alias("c")
    .description("Configure todo.yaml")
    .action(async () => {
        await ensureTodoYamlFile();
        let todos = await getEntireTodosObject();
        console.log(todos);
        todos.configuration = await configure(todos.configuration);
        await writeFile([CWD, TODO_FILE_NAME].join(sep), YAML.stringify(todos));
    });

program.parse(process.argv);
import { program } from "commander";

import {ensureTodoYamlFile} from "./file-io/todo-yaml-ensure.js"
import { getTodos } from "./file-io/todo-yaml-get.js";
import {showItemsTodo} from "./todo-utils.js";

await ensureTodoYamlFile();
const todo = await getTodos();

program
    .command("list")
    .alias("ls")
    .description("List current todos")
    .action(() => {
        showItemsTodo(todo);
    });

program
    .command("configure")
    .alias("config")
    .alias("c")
    .description("Configure the current set of todos")
    .action(() => {
        console.log("configure");
    });

program.parse(process.argv);

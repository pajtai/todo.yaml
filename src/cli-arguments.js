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

program.parse(process.argv);

import { program } from "commander";

import("./file-io/todo-yaml-ensure.js");
import { todo } from "./file-io/todo-yaml-get.js";
import {showItemsTodo} from "./todo-utils.js";

program
    .command("list")
    .alias("ls")
    .description("List current todos")
    .action(() => {
        showItemsTodo(todo);
    });

program.parse(process.argv);

import { Command } from "commander";
import { configure } from "./configure.js";
import { ensureAndGetTodos } from "../file-io/todo-yaml-ensure.js";
import { writeFile } from "fs/promises";
import configs from "../configs.js";
import { sep } from "path";
import YAML from "yaml";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const program = new Command();
program.version(require("../package.json").version);
program
    .command("configure [file]")
    .alias("c")
    .description("Configure todo.yaml or the supplied file name")
    .action(async (fileName) => {
        if (fileName) {
            configs.TODO_FILE_NAME = fileName;
        }
        let todos = await ensureAndGetTodos();
        todos.configuration = await configure(todos.configuration || {});
        await writeFile(
            [configs.CWD, configs.TODO_FILE_NAME].join(sep),
            YAML.stringify(todos)
        );
    });

const options = program.parse(process.argv);

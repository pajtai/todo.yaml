import { access, readFile, writeFile } from "fs/promises";
import YAML from "yaml";
import inquirer from "inquirer";
import configs from "../configs.js";
import { sep } from "path";
import { configure } from "../cli/configure.js";

let fileExists = false;

export async function ensureAndGetTodos() {
    await ensureTodoYamlFile();
    return await getTodos();
}
/**
 * Ensure the todo file exists. Use a singleton variable to track whether file is created.
 * @returns {Promise<void>}
 */
async function ensureTodoYamlFile() {
    if (fileExists) {
        return;
    }
    try {
        await access([configs.CWD, configs.TODO_FILE_NAME].join(sep));
        fileExists = true;
    } catch {
        fileExists = false;
    }
    if (!fileExists) {
        try {
            let answers = await inquirer.prompt([
                {
                    name: "Confirm",
                    type: "confirm",
                    message: `${configs.TODO_FILE_NAME} not found. Create a ${configs.TODO_FILE_NAME} in this directory?`,
                    default: true,
                },
            ]);
            if (answers.Confirm) {
                const configuration = {};

                let todos = {
                    todo: ["This is an example todo"],
                    configuration: await configure(configuration),
                };
                await writeFile(
                    [configs.CWD, configs.TODO_FILE_NAME].join(sep),
                    YAML.stringify(todos)
                );
            } else {
                console.log(
                    "Please go to the directory you want your todo.yaml, and try again."
                );
                process.exit();
            }
        } catch (err) {
            console.log(`Whoops. Couldn't create todo.yaml: ${err}`);
        }
    }
}

async function getTodos() {
    const todoFile = await readFile(
        [configs.CWD, configs.TODO_FILE_NAME].join(sep),
        "utf-8"
    );
    return YAML.parse(todoFile);
}

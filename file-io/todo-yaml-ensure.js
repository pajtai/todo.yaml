import { access, writeFile } from "fs/promises";
import YAML from "yaml";
import inquirer from "inquirer";
import { CWD, TODO_FILE_NAME } from "../api/constants.js";
import { sep } from "path";
import {configure} from "../cli/configure.js";

let fileExists = false;

/**
 * Ensure the todo file exists. Use a singleton variable to track whether file is created.
 * @returns {Promise<void>}
 */
export async function ensureTodoYamlFile() {
    if (fileExists) {
        return;
    }
    try {
        await access([CWD, TODO_FILE_NAME].join(sep));
        fileExists = true;
    } catch {
        fileExists = false;
    }
    if (!fileExists) {
        try {
            let answers = await inquirer
                .prompt([
                    {
                        name: "Confirm",
                        type: "confirm",
                        message: "todo.yaml not found. Create a todo.yaml in this directory?",
                        default: false
                    }
                ]);
            if (answers.Confirm) {
                const configuration = {};

                let todos = {
                    todo: [
                        "This is an example todo"
                    ],
                    configuration: await configure(configuration)
                }
                await writeFile([CWD, TODO_FILE_NAME].join(sep), YAML.stringify(todos));
            } else {
                console.log("Please go to the directory you want your todo.yaml, and try again.");
                process.exit();
            }
        } catch (err) {
            console.log(`Whoops. Couldn't create todo.yaml: ${err}`);
        }
    }
}


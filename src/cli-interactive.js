import { writeFile } from "fs/promises";
import { spawnSync } from "child_process";
import chalk from "chalk";
import inquirer from "inquirer";
import YAML from "yaml";
import { TODO_FILE_PATH } from "./constants.js";

import {ensureTodoYamlFile} from "./file-io/todo-yaml-ensure.js"
import { getTodos } from "./file-io/todo-yaml-get.js";
import {showItemsTodo} from "./todo-utils.js";

await ensureTodoYamlFile();
const todos = await getTodos();
await showAndModifyTodoList();

async function showAndModifyTodoList () {
    console.clear();
    const choices = todos.todo.map((todo, index) => {
        return {
            name: todo,
            value: index
        }
    });
    choices.push({
        name: `+ ` + chalk.green(`Add a todo`),
        value: `add todo`
    });
    choices.push({
        name: `x ` + chalk.red(`Exit`),
        value: `exit`
    });

    const answers = await inquirer
        .prompt([
            {
                name: "Todo List",
                message: "Select the todos to complete, add a todo, or exit.\r\n",
                type: "checkbox",
                choices,
                pageSize: process.stdout.rows - 4
            },
        ]);


    // Needed for the splice command to run from last to first
    const theAnswers = answers["Todo List"].sort((a,b) => {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }

        return 0;
    });
    let quit = false;
    for (const answer of theAnswers) {
        if (isNaN(answer)) {
            switch (answer) {
                case "exit":
                    quit = true;
                    break;
                default:
                    const answers = await inquirer
                        .prompt([
                            {
                                name: "Task To Add",
                                type: "input"
                            }
                        ]);
                    const todoItem = answers["Task To Add"];
                    todos.todo.push(todoItem);
                    break;
            }
        } else {
            // thid doesn't work when multiple todos are selected to be completed
            todos.todo.splice(answer, 1);
        }
    }

    await writeFile(TODO_FILE_PATH, YAML.stringify(todos));
    if (quit) {
        console.clear();
        showItemsTodo(todos);
        process.exit();
    }
    await showAndModifyTodoList();
}



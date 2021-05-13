import { writeFile } from "fs/promises";
import chalk from "chalk";
import inquirer from "inquirer";
import YAML from "yaml";
import { TODO_FILE_PATH } from "./constants.js";

import {ensureTodoYamlFile} from "./file-io/todo-yaml-ensure.js"
import { getTodos } from "./file-io/todo-yaml-get.js";
import {showItemsTodo} from "./todo-utils.js";

await ensureTodoYamlFile();
const todo = await getTodos();
await showAndModifyTodoList();

async function showAndModifyTodoList () {
    console.clear();
    const choices = todo.todo.map((todo, index) => {
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
        name: `x ` + chalk.red(`Quit`),
        value: `quit`
    });
    const answers = await inquirer
        .prompt([
            {
                name: "Todo List",
                type: "checkbox",
                choices,
                pageSize: choices.length + 2,
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
                case "quit":
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
                    todo.todo.push(todoItem);
                    break;
            }
        } else {
            // thid doesn't work when multiple todos are selected to be completed
            todo.todo.splice(answer, 1);
        }
    }

    await writeFile(TODO_FILE_PATH, YAML.stringify(todo));
    if (quit) {
        console.clear();
        showItemsTodo(todo);
        process.exit();
    }
    await showAndModifyTodoList();
}



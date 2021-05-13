#!/usr/bin/env node
import { access, readFile, writeFile } from "fs/promises";
import defaultTodoFile from "./src/default-todo.js";
import findUp from "find-up";
import YAML from "yaml";
import inquirer from "inquirer";
import chalk from "chalk";

const todoFileName = "todo.yaml";

let todoFilePath = "todo.yaml";
let fileExists = true;
try {
    console.log("try");
    await access(todoFilePath);
} catch {
    console.log("no");
    fileExists = false;
}
if (!fileExists) {
    try {
        const answers = await inquirer
            .prompt([
                {
                    name: "Confirm",
                    type: "confirm",
                    message: "todo.yaml not found. Create a todo.yaml in this directory?",
                    default: false
                }
            ]);
        if (answers.Confirm) {
            await writeFile("todo.yaml", defaultTodoFile);
            todoFilePath = "todo.yaml";
        } else {
            console.log("Please go to the directory you want your todo.yaml, and try again.");
            process.exit();
        }
    } catch (err) {
        console.log(`Whoops. Couldn't create todo.yaml: ${err}`);
    }
}
const todoFile = await readFile(todoFilePath, "utf-8");
const todo = YAML.parse(todoFile);
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

    await writeFile(todoFilePath, YAML.stringify(todo));
    if (quit) {
        console.clear();
        console.log(chalk.green("Todo:"));
        todo.todo.forEach(todo => {
        console.log(`- ${todo}`);
        });
        process.exit();
    }
    await showAndModifyTodoList();
}



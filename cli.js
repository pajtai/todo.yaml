#!/usr/bin/env node
import { readFile, writeFile } from "fs/promises";
import defaultTodoFile from "./src/default-todo.js";
import findUp from "find-up";
import YAML from "yaml";
import inquirer from "inquirer";
import chalk from "chalk";

const todoFileName = "todo.yaml";
// TODO: configure yaml location first time cli is run
// TODO: confirm creation of blank todo when first run
// TODO: add cli help
// TODO: show options to list all todos or to configure
// TODO: interactively add  a todo
// TODO: interactively complete add a todo
// TODO: add custom command to quick list all todos
// TODO: add custom command to complete a todo (dynamic numbering?)

let todoFilePath = await findUp(todoFileName);
if (!todoFilePath) {
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
    })
    const answers = await inquirer
        .prompt([
            {
                name: "Todo List",
                type: "checkbox",
                choices
            }
        ]);

    const answer = answers["Todo List"];
    if (isNaN(answer)) {
        console.log("add a todo!");
        const answers = await inquirer
            .prompt([
                {
                    name: "Task To Add",
                    type: "input"
                }
            ]);
        const todoItem = answers["Task To Add"];
        todo.todo.push(todoItem);
    } else {
        todo.todo.splice(answer, 1);
    }

    await writeFile(todoFilePath, YAML.stringify(todo));
    await showAndModifyTodoList();
}



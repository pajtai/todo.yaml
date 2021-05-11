#!/usr/bin/env node
import { readFile, writeFile } from "fs/promises";
import findUp from "find-up";
import YAML from "yaml";
import inquirer from "inquirer";

const todoFileName = "todo.yaml";
// TODO: findup and config file
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
        await writeFile("todo.yaml", "- This is an example todo");
        todoFilePath = "todo.yaml";
    } catch (err) {
        console.log(`Whoops. Couldn't create todo.yaml: ${err}`);
    }
}
const todoFile = await readFile(todoFilePath, "utf-8");
const todo = YAML.parse(todoFile);

inquirer.prompt([
    {
        name: "Todo List",
        type: "checkbox",
        choices: todo
    }
]);

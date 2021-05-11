#!/usr/bin/env node
const fs = require("fs");
const YAML = require("yaml");
const inquirer = require("inquirer");

const todoFilePath = "./todo.yaml";

// TODO: findup yaml and config file
// TODO: configure yaml location first time cli is run
// TODO: add cli help
// TODO: show options to list all todos or to configure
// TODO: interactively complete add a todo
// TODO: add custom command to quick list all todos
// TODO: add custom command to complete a todo (dynamic numbering?)

const todoFile = fs.readFileSync(todoFilePath, "utf8");

const todo = YAML.parse(todoFile);

inquirer.prompt([
    {
        name: "Todo List",
        type: "checkbox",
        choices: todo
    }
]);
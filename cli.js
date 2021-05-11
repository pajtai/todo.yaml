#!/usr/bin/env node
const fs = require("fs");
const YAML = require("yaml");
const todoFilePath = "./todo.yaml";

const todoFile = fs.readFileSync(todoFilePath, "utf8");

const todo = YAML.parse(todoFile);

todo.forEach(item => {
    console.log(item);
});
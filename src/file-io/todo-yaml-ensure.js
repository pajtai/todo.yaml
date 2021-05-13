import { access, writeFile } from "fs/promises";
import defaultTodoFile from "../default-todo.js";
import inquirer from "inquirer";
import { TODO_FILE_PATH } from "../constants.js";

let fileExists = true;
try {
    await access(TODO_FILE_PATH);
} catch {
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
        } else {
            console.log("Please go to the directory you want your todo.yaml, and try again.");
            process.exit();
        }
    } catch (err) {
        console.log(`Whoops. Couldn't create todo.yaml: ${err}`);
    }
}

import chalk from "chalk";

export function showItemsTodo(todo) {
    console.log(chalk.green("Todo:"));
    todo.todo.forEach(todo => {
        console.log(`- ${todo}`);
    });
}
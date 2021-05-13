import chalk from "chalk";

export function showItemsTodo(todos) {
    console.log(chalk.green("Todo:"));
    todos.todo.forEach(todo => {
        console.log(`- ${todo}`);
    });
}
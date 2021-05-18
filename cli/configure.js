import inquirer from "inquirer";

export async function configure(configuration) {
    const SAVE_COMPLETED_TODOS = "Save completed todos";
    let defaults = [];
    if (configuration.saveCompleted) {
        defaults.push(SAVE_COMPLETED_TODOS);
    }
    let answers = await inquirer
        .prompt([
            {
                name: "saveCompleted",
                type: "checkbox",
                message: "Configure how todo.yaml behaves. Check the choices you want to enable.",
                choices: [ SAVE_COMPLETED_TODOS ],
                default: defaults
            }
        ]);
    configuration.saveCompleted = answers.saveCompleted.includes(SAVE_COMPLETED_TODOS);

    const columns = [
        {name: "Due Date", value: "dueDate"},
        // {name: "Type", value: "type"},
        // {name: "Context", value: "context"},
        // {name: "Project", value: "project"},
        // {name: "Importance", value: "importance"}
    ];
    defaults = columns.filter(column => {
            if (configuration.columns && configuration.columns[column.value]) {
                return true;
            }
        })
        .map(column => column.value);
    answers = await inquirer
        .prompt([
            {
                name: "columns",
                type: "checkbox",
                message: "Pick the columns you want visible",
                choices: columns,
                default: defaults
            }
        ]);
    columns.forEach(column => {
        configuration.columns = configuration.columns || {};
        configuration.columns[column.value] = answers.columns.includes(column.value);
    });
}
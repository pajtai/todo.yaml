import inquirer from "inquirer";

export async function configure(configuration) {
    const SAVE_COMPLETED_TODOS = "Save completed todos";
    const SHUTDOWN_SERVER_BUTTON =
        "Close window & shutdown server button in lower right of screen";
    const ADD_TODOS_UP_TOP = "Add todos to the top of the list";
    const SUBTASKS = "Use subtasks";
    const NEXT_ACTIONS = "Use stars to mark items to do next";
    let defaults = [];
    if (configuration.saveCompleted) {
        defaults.push(SAVE_COMPLETED_TODOS);
    }
    if (configuration.shutdownServerButton) {
        defaults.push(SHUTDOWN_SERVER_BUTTON);
    }
    if (configuration.addTodosToTop) {
        defaults.push(ADD_TODOS_UP_TOP);
    }
    if (configuration.subtasks) {
        defaults.push(SUBTASKS);
    }
    if (configuration.nextActions) {
        defaults.push(NEXT_ACTIONS);
    }
    let answers = await inquirer.prompt([
        {
            name: "configure",
            type: "checkbox",
            message:
                "Configure how todo.yaml behaves. Check the choices you want to enable.",
            choices: [
                ADD_TODOS_UP_TOP,
                SAVE_COMPLETED_TODOS,
                SHUTDOWN_SERVER_BUTTON,
                SUBTASKS,
                NEXT_ACTIONS,
            ],
            default: defaults,
        },
    ]);
    configuration.addTodosToTop = answers.configure.includes(ADD_TODOS_UP_TOP);
    configuration.saveCompleted =
        answers.configure.includes(SAVE_COMPLETED_TODOS);
    configuration.shutdownServerButton = answers.configure.includes(
        SHUTDOWN_SERVER_BUTTON
    );
    configuration.subtasks = answers.configure.includes(SUBTASKS);
    configuration.nextActions = answers.configure.includes(NEXT_ACTIONS);

    const columns = [
        { name: "Due Date", value: "dueDate" },
        { name: "Notes", value: "notes" },
        { name: "Importance", value: "importance" },
        // {name: "Type", value: "type"},
        // {name: "Context", value: "context"},
        // {name: "Project", value: "project"},
    ];
    defaults = columns
        .filter((column) => {
            if (configuration.columns && configuration.columns[column.value]) {
                return true;
            }
        })
        .map((column) => column.value);
    answers = await inquirer.prompt([
        {
            name: "columns",
            type: "checkbox",
            message: "Pick the columns you want visible",
            choices: columns,
            default: defaults,
        },
    ]);
    columns.forEach((column) => {
        configuration.columns = configuration.columns || {};
        configuration.columns[column.value] = answers.columns.includes(
            column.value
        );
    });

    return configuration;
}

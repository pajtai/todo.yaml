import inquirer from "inquirer";

export async function configure(configuration) {
    const SAVE_COMPLETED_TODOS = "Save completed todos";
    let defaults = [];
    if (configuration.saveCompleted) {
        defaults.push(SAVE_COMPLETED_TODOS);
    }
    const answers = await inquirer
        .prompt([
            {
                name: "Configure",
                type: "checkbox",
                message: "Configure how todo.yaml behaves. Check the choices you want to enable.",
                choices: [
                    {
                        name: SAVE_COMPLETED_TODOS,
                    }
                ],
                default: defaults
            }
        ]);
    configuration.saveCompleted = answers.Configure.includes(SAVE_COMPLETED_TODOS);
    return configuration;
}
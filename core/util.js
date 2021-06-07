export function ensureTodoStructure(configuration) {
    configuration.columns = configuration.columns || {};
    return (todo) => {
        if (typeof todo === "string") {
            return {
                title: todo,
            };
        }

        if (configuration.columns.dueDate) {
            todo.dueDate = todo.dueDate || null;
        } else {
            delete todo.dueDate;
        }

        if (configuration.columns.notes) {
            todo.notes = todo.notes || "";
        } else {
            delete todo.notes;
        }

        if (configuration.columns.importance) {
            todo.importance = todo.importance || 0;
        } else {
            delete todo.importance;
        }

        if (configuration.nextActions) {
            todo.nextAction = todo.nextAction || false;
        } else {
            delete todo.nextAction;
        }

        if (configuration.subtasks && todo.subtasks) {
            todo.subtasks = todo.subtasks.map((subtask) => {
                if (typeof subtask === "string") {
                    subtask = {
                        title: subtask,
                    };
                }
                if (configuration.nextActions) {
                    subtask.nextAction = subtask.nextAction || false;
                } else {
                    delete subtask.nextAction;
                }
                return subtask;
            });
        }

        return todo;
    };
}

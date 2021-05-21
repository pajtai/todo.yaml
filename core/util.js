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

        return todo;
    };
}

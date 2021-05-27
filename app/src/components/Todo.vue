<template>
    <section class="add-todo">
        <input
            class="add-todo__input"
            v-bind:class="{ 'add-todo__input-filtering': !!filter }"
            v-model="newTodo"
            autofocus
            placeholder="Enter todo"
            @keyup.enter="addTodo"
            type="text"
        />
    </section>
    <draggable
        v-model="todos"
        handle=".handle"
        tag="div"
        class="todo"
        item-key="_key"
        :sort="true"
    >
        <template #item="{ element }">
            <template v-if="element && show(element)">
                <div
                    class="todo__column"
                    v-if="!element._editing"
                    @dblclick="edit(element)"
                >
                    <input v-model="element.done" type="checkbox" />
                    <i class="fa fa-align-justify handle"></i>&nbsp;
                    {{ element.title }}
                </div>
                <div class="todo__column" v-else>
                    <input
                        v-todo-focus="element._editing"
                        v-model="editedString"
                        @blur="cancelEdit(element)"
                        @keyup.enter="doneEdit(element)"
                        type="text"
                    />
                </div>
                <div
                    class="todo__column-grid"
                    v-if="
                        config.columns.importance ||
                        config.columns.notes ||
                        config.columns.dueDate
                    "
                >
                    <div
                        class="todo__importance"
                        v-if="config.columns.importance"
                    >
                        <span
                            v-if="
                                !element._editingImportance &&
                                element.importance
                            "
                            @dblclick="editImportance(element)"
                            >{{ element.importance }}</span
                        >
                        <span
                            v-if="
                                !element._editingImportance &&
                                !element.importance
                            "
                            @dblclick="editImportance(element)"
                            class="todo__importance_empty"
                            >Add Importance</span
                        >
                        <input
                            v-if="element._editingImportance"
                            v-todo-focus="element._editingImportance"
                            v-model="editedString"
                            @blur="cancelEdit(element)"
                            @keyup.enter="doneEditImportance(element)"
                            type="number"
                        />
                    </div>
                    <div v-if="config.columns.notes" class="notes">
                        <span
                            v-if="!element._editingNotes && element.notes"
                            @dblclick="editNotes(element)"
                            >{{ element.notes }}</span
                        >
                        <span
                            class="todo__notes_empty"
                            @dblclick="editNotes(element)"
                            v-if="!element.notes && !element._editingNotes"
                            >Add Note</span
                        >
                        <input
                            v-todo-focus="element._editingNotes"
                            v-if="element._editingNotes"
                            v-model="editedString"
                            @blur="cancelEdit(element)"
                            @keyup.enter="doneEditNotes(element)"
                            type="text"
                        />
                    </div>
                    <div class="todo__date" v-if="config.columns.dueDate">
                        <datepicker
                            :placeholder="`No Due Date`"
                            v-model="element.dueDate"
                        />
                    </div>
                </div>
            </template>
        </template>
    </draggable>
    <div class="todo__labels">
        <div class="todo__column columns__title" @click="reOrder('title')">
            Title
        </div>
        <div class="todo__column-grid">
            <div
                class="columns__importance"
                v-if="config.columns.importance"
                @click="reOrder('importance')"
            >
                Importance
            </div>
            <div v-if="config.columns.notes">Notes</div>
            <div
                class="columns__due-date"
                v-if="config.columns.dueDate"
                @click="reOrder('dueDate')"
            >
                Due Date
            </div>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import datepicker from "vue3-datepicker";
export default {
    name: "Todo",
    components: {
        draggable,
        datepicker,
    },
    props: ["config"],
    data() {
        return {
            newTodo: "",
            filter: null,
            todos: [],
            editedString: null,
            keysToDelete: ["_editing", "_editingNotes", "_editingImportance"],
        };
    },
    async created() {
        await this.displayTodos();
    },
    watch: {
        $route: {
            handler() {
                this.displayTodos();
            },
        },
        todos: {
            handler() {
                if (!this.saveChanges) {
                    console.log("skip save");
                    this.saveChanges = true;
                } else {
                    this.save();
                    console.log("saved");
                }
            },
            deep: true,
        },
        newTodo: {
            handler() {
                if (/^\//.test(this.newTodo)) {
                    this.filter = this.newTodo.substring(1);
                } else {
                    this.filter = null;
                }
            },
        },
    },
    methods: {
        async displayTodos() {
            const response = await this.axios.get(
                `/api/todo/${this.getParam()}`
            );
            this.todos = response.data.map((todo, index) => {
                todo._key = index;
                this.keysToDelete.forEach((key) => {
                    todo[key] = false;
                });
                if (todo.dueDate) {
                    todo.dueDate = new Date(todo.dueDate);
                }
                return todo;
            });
            this.saveChanges = true;
        },
        getParam() {
            return this.$route.query.file
                ? `?file=${this.$route.query.file}`
                : "";
        },
        show(todo) {
            if (!this.filter) {
                return true;
            }

            const regex = new RegExp(this.filter, "i");
            let search = todo.title;
            if (!isNaN(todo.importance)) {
                search += "" + todo.importance;
            }
            if (typeof todo.notes === "string") {
                search += todo.notes;
            }
            if (todo.dueDate) {
                search += todo.dueDate.toISOString().slice(0, 10);
            }
            return regex.test(search);
        },
        addTodo() {
            if (this.config.addTodosToTop) {
                this.todos.unshift(this.createTodo(this.newTodo));
            } else {
                this.todos.push(this.createTodo(this.newTodo));
            }
            this.newTodo = "";
        },
        createTodo(title) {
            let newTodo = {};

            if (this.todos.length) {
                Object.keys(this.todos[0]).forEach((key) => {
                    newTodo[key] = null;
                });
            }
            return Object.assign(newTodo, {
                title,
                done: false,
            });
        },
        reOrder(column) {
            this.todos.sort((a, b) => {
                const diff = a[column] - b[column];
                switch (column) {
                    case "importance":
                        if (diff > 0) return -1;
                        if (diff < 0) return 1;
                        break;
                    case "dueDate":
                        if (!a[column] && b[column]) return 1;
                        if (!b[column] && a[column]) return -1;
                        if (diff > 0) return 1;
                        if (diff < 0) return -1;
                        break;
                    case "title":
                        console.log("sort");
                        if (a[column].toLowerCase() < b[column].toLowerCase())
                            return -1;
                        if (a[column].toLowerCase() > b[column].toLowerCase())
                            return 1;
                        break;
                }

                return 0;
            });
        },
        save() {
            // this will save any just completed todos
            this.axios.post(
                `/api/todo/${this.getParam()}`,
                this.todos.map((todo) => {
                    let copy = Object.assign({}, todo);
                    this.keysToDelete.forEach((key) => {
                        delete copy[key];
                    });
                    delete copy._key;
                    if (!copy.done) {
                        delete copy.done;
                    }
                    if (copy.dueDate) {
                        copy.dueDate = copy.dueDate.toISOString();
                    }
                    return copy;
                })
            );
            let i = this.todos.length;

            while (--i > -1) {
                let todo = this.todos[i];
                if (todo.done) {
                    // no need to save anything while we remove done todos
                    this.saveChanges = false;
                    // this will remove any just completed todos
                    this.todos.splice(i, 1);
                }
            }
        },
        edit(todo) {
            todo._editing = true;
            this.editedString = todo.title;
        },
        editNotes(todo) {
            todo._editingNotes = true;
            this.editedString = todo.notes;
        },
        editImportance(todo) {
            todo._editingImportance = true;
            this.editedString = todo.importance;
        },
        cancelEdit(todo) {
            todo._editing = false;
            todo._editingNotes = false;
            todo._editingImportance = false;
            this.editedString = null;
        },
        doneEdit(todo) {
            todo._editing = false;
            todo.title = this.editedString;
            this.editedString = null;
        },
        doneEditNotes(todo) {
            todo._editingNotes = false;
            todo.notes = this.editedString;
            this.editedString = null;
        },
        doneEditImportance(todo) {
            todo._editingImportance = false;
            todo.importance = parseInt(this.editedString);
            this.editedString = null;
        },
    },
    directives: {
        "todo-focus": function (el, binding) {
            if (binding.value) {
                el.focus();
            }
        },
    },
};
</script>
<style>
.add-todo {
    margin: 1rem;
    padding-top: 0.5rem;
}
.add-todo__input {
    border: none;
    border-bottom: 1px solid #aeaeae50;
    width: 100%;
}
.add-todo__input::placeholder {
    color: #aeaeae;
}
.add-todo__input:focus {
    outline-width: 0;
}
.add-todo__input-filtering {
    color: #0000ae;
}
.todo__notes_empty,
.todo__importance_empty {
    color: #aeaeae;
}
.v3dp__datepicker > input {
    border: none;
    cursor: pointer;
}
.todo__labels {
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}
.columns__importance:hover::after {
    content: "▾";
}
.columns__due-date:hover::after,
.columns__title:hover::after {
    content: "▴";
}
.columns__checkbox {
    visibility: hidden;
}
.todo,
.todo__labels {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    padding-top: 1rem;
}
.todo__column-grid {
    border-bottom: 1px solid #aeaeae50;
    margin-bottom: 1rem;
    margin-right: 1rem;
    margin-left: 1rem;
}
.todo__column {
    margin-left: 1rem;
}
@media only screen and (min-width: 601px) {
    .todo,
    .todo__labels {
        grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
        grid-auto-rows: 1fr;
    }
    .todo__column {
        border-bottom: 1px solid #aeaeae50;
        margin-bottom: 1rem;
    }
    .todo__column-grid {
        margin-left: 0;
    }
}

.todo__column-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.todo__labels > .todo__column,
.todo__labels > .todo__column-grid {
    border: none;
}
</style>

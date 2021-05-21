<template>
    <section class="add-todo">
        <input
            class="add-todo__input"
            v-model="newTodo"
            placeholder="Enter todo"
            @keyup.enter="addTodo"
            type="text"
        />
    </section>
    <ul>
        <draggable v-model="todos" item-key="_key" :sort="true">
            <template #item="{ element }">
                <li>
                    <div v-if="!element._editing" @dblclick="edit(element)">
                        <input v-model="element.done" type="checkbox" />
                        {{ element.title }}
                    </div>
                    <div v-else>
                        <input
                            v-todo-focus="element._editing"
                            v-model="editedString"
                            @blur="cancelEdit(element)"
                            @keyup.enter="doneEdit(element)"
                            type="text"
                        />
                    </div>
                    <div v-if="config.columns.importance">
                        <span
                            v-if="!element._editingImportance"
                            @dblclick="editImportance(element)"
                            >{{ element.importance }}</span
                        >
                        <input
                            v-else
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
                    <div v-if="config.columns.dueDate">
                        <datepicker
                            :placeholder="`No Due Date`"
                            v-model="element.dueDate"
                        />
                    </div>
                </li>
            </template>
        </draggable>
    </ul>
    <ul class="columns">
        <li>
            <div>Title</div>
            <div v-if="config.columns.importance">Importance</div>
            <div v-if="config.columns.notes">Notes</div>
            <div v-if="config.columns.dueDate">Due Date</div>
        </li>
    </ul>
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
            todos: [],
            editedString: null,
            keysToDelete: ["_editing", "_editingNotes", "_editingImportance"],
        };
    },
    async created() {
        const response = await this.axios.get("/api/todo/");
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
    watch: {
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
    },
    methods: {
        addTodo() {
            if (this.config.addToTop) {
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
        save() {
            // this will save any just completed todos
            this.axios.post(
                "/api/todo/",
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
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
li {
    cursor: pointer;
    text-align: left;
    background-color: #fff;
    margin: 1rem;
    padding: 0.5rem;
    border-bottom: 1px solid #aeaeae50;
}
li {
    display: flex;
}
li > div {
    flex: 1;
}
.add-todo {
    margin: 1rem;
    padding: 0.5rem;
}
.add-todo__input {
    border: none;
    border-bottom: 1px solid #aeaeae50;
    width: 100%;
}
.add-todo__input::placeholder {
    color: #aeaeae;
}
.todo__notes_empty {
    color: #aeaeae;
}
.v3dp__datepicker > input {
    border: none;
    cursor: pointer;
}
.columns {
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>

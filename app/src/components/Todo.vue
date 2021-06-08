<template>
    <section class="add-todo">
        <input
            class="add-todo__input"
            v-bind:class="{ 'add-todo__input-filtering': !!filter }"
            v-model="newTodo"
            placeholder="Enter todo"
            @keyup.enter="addTodo"
            type="text"
        />
    </section>
    <ul>
        <li class="columns">
            <div class="columns__title" @click="reOrder('title')">Title</div>
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
        </li>
    </ul>
    <draggable
        v-model="todos"
        handle=".handle"
        tag="ul"
        item-key="_key"
        :sort="true"
    >
        <template #item="{ element }">
            <li class="todo__item" v-if="element && show(element)">
                <div
                    v-if="!element._editing"
                    @dblclick="edit(element)"
                    class="todo__title"
                    style="position: relative; margin-right: 1rem"
                >
                    <i
                        v-if="config.nextActions"
                        @click="toggleNextAction(element)"
                        v-bind:class="{
                            fa: true,
                            'fa-star': element.nextAction,
                            'fa-star-o': !element.nextAction,
                        }"
                    ></i>
                    <input
                        class="todo__input"
                        v-model="element.done"
                        type="checkbox"
                    />
                    <i class="fa fa-align-justify handle"></i>
                    &nbsp;
                    <span class="subtasks" v-if="config.subtasks">
                        <i
                            @click="toggleSubtasks(element)"
                            v-bind:class="{
                                fa: true,
                                'fa-chevron-down': element._showSubstasks,
                                'fa-chevron-right': !element._showSubstasks,
                            }"
                        ></i>
                        <span
                            v-bind:style="{
                                opacity: (element.subtasks || []).length
                                    ? 1
                                    : 0,
                            }"
                            >({{ (element.subtasks || []).length }})</span
                        >
                    </span>
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
                <div class="todo__importance" v-if="config.columns.importance">
                    <span
                        v-if="!element._editingImportance && element.importance"
                        @dblclick="editImportance(element)"
                        >{{ element.importance }}</span
                    >
                    <span
                        v-if="
                            !element._editingImportance && !element.importance
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
                <div class="break"></div>
                <ul
                    v-if="config.subtasks && element._showSubstasks"
                    class="todo__subtasks"
                >
                    <li
                        v-for="subtask in element.subtasks"
                        v-bind:key="subtask"
                    >
                        <!--                        <i-->
                        <!--                            @click="toggleNextAction(subtask)"-->
                        <!--                            v-bind:class="{-->
                        <!--                                fa: true,-->
                        <!--                                'fa-star': subtask.nextAction,-->
                        <!--                                'fa-star-o': !subtask.nextAction,-->
                        <!--                            }"-->
                        <!--                        ></i>-->
                        <input
                            class="todd__input"
                            type="checkbox"
                            @change="finishSubtask(subtask, element)"
                        />{{ subtask.title }}
                    </li>
                </ul>
                <input
                    class="add-subtask__input"
                    v-if="config.subtasks && element._showSubstasks"
                    type="text"
                    v-model="element._newSubtask"
                    placeholder="Enter subtask"
                    @keyup.enter="addSubtask(element)"
                />
            </li>
        </template>
    </draggable>
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
            keysToDelete: [
                "_editing",
                "_editingNotes",
                "_editingImportance",
                "_newSubtask",
                "_showSubtasks",
            ],
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
                todo._newSubtask = "";
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
        addSubtask(todo) {
            todo.subtasks = todo.subtasks || [];
            todo.subtasks.push({ title: todo._newSubtask, nextAction: false });
            todo._newSubtask = "";
        },
        finishSubtask(subtask, todo) {
            todo.subtasks.splice(todo.subtasks.indexOf(subtask), 1);
        },
        toggleSubtasks(todo) {
            todo._showSubstasks = !todo._showSubstasks;
            console.log(todo._showSubstasks);
        },
        toggleNextAction(todo) {
            todo.nextAction = !todo.nextAction;
            this.reOrder();
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
                const nextA = a["nextAction"];
                const nextB = b["nextAction"];
                if (nextA && !nextB) {
                    return -1;
                }
                if (!nextA && nextB) {
                    return 1;
                }
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
.todo__item,
.columns {
    cursor: pointer;
    text-align: left;
    background-color: #fff;
    margin: 0;
    padding: 0.75rem 0.5rem 0.5rem;
    border-bottom: 1px solid #f0ffff;
    z-index: 99;
}
.todo__item,
.columns {
    display: flex;
    flex-wrap: wrap;
}
.todo__input {
    cursor: pointer;
}
.todo__item > div,
.columns > div {
    flex: 1;
}
.todo__item > .todo__title,
.columns > .columns__title {
    flex: 0 0 100%;
}
@media (min-width: 681px) {
    .todo__item > div,
    .columns > div {
        flex: 1;
    }
    .todo__item > .todo__title,
    .columns > .columns__title {
        flex: 2;
    }
}

.columns {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

.todo__item > .break {
    flex-basis: 100%;
    height: 0;
}
.todo__subtasks {
    margin-left: 5rem;
    color: gray;
}
.subtasks {
    color: #aeaeae;
}
.add-todo {
    margin: 0;
    padding: 0.75rem 0.5rem 0.5rem;
    border-bottom: 1px solid #f0ffff;
}
.add-todo__input {
    border: none;
    border-bottom: 1px solid #aeaeae50;
    width: 100%;
}
.add-subtask__input {
    border: 1px solid #aeaeae50;
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
</style>

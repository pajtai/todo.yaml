<template>
  <section>
    <input class="add-todo__input" v-model="newTodo" @keyup.enter="addTodo" type="text">
    <label class="add-todo__label">Add: </label>
  </section>
  <ul>
    <draggable v-model="todos" item-key="_key" :sort="true">
      <template #item="{element}">
        <li>
          <div v-if="!element._editing" @dblclick="edit(element)">
            <input v-model="element.done" type="checkbox">
            {{ element.title }}
          </div>
          <div v-else>
            <input
              v-todo-focus="element._editing"
              v-model="editedString"
              @blur="cancelEdit(element)"
              @keyup.enter="doneEdit(element)"
              type="text">
          </div>
          <div v-if="Object.keys(element).includes('notes')" class="notes">
            <span v-if="!element._editingNotes && element.notes" @dblclick="editNotes(element)">{{ element.notes }}</span>
            <span class="todo__notes_empty" @dblclick="editNotes(element)" v-if="!element.notes && !element._editingNotes">Add Note</span>
            <input v-if="element._editingNotes" v-model="element.notes" @keyup.enter="doneEditNotes(element)" type="text">
          </div>
          <div v-if="Object.keys(element).includes('dueDate')">
            <datepicker :placeholder="`No Due Date`" v-model="element.dueDate"/>
          </div>
        </li>
      </template>
    </draggable>
  </ul>
</template>

<script>
import draggable from "vuedraggable";
import datepicker from 'vue3-datepicker'
export default {
  name: "Todo",
  components: {
    draggable,
    datepicker
  },
  data() {
    return {
      newTodo: "",
      todos: [],
      removeKeys: ["_key", "_editing"],
      editedString: null
    }
  },
  async created() {
    const response = await this.axios.get("/api/todo/");
    this.todos = response.data.map((todo, index) => {
      todo._key = index;
      todo._editing = false;
      todo._editingNotes = false;
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
      deep: true
    },
  },
  methods: {
    addTodo() {
      this.todos.push(this.createTodo(this.newTodo));
      this.newTodo = "";
    },
    createTodo(title) {
      let newTodo = {};

      if (this.todos.length) {
        Object.keys(this.todos[0]).forEach(key => {
          newTodo[key] = null;
        });
      }
      return Object.assign(newTodo, {
        title,
        done: false
      });
    },
    save() {
      // this will save any just completed todos
      this.axios.post("/api/todo/", this.todos.map(todo => {
        let copy = Object.assign({}, todo);
        delete copy._editing;
        delete copy._editingNotes;
        delete copy._key;
        if (!copy.done) {
          delete copy.done;
        }
        if (copy.dueDate) {
          copy.dueDate = copy.dueDate.toISOString();
        }
        return copy;
      }));
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
    doneEdit(todo) {
      todo._editing = false;
      todo.title = this.editedString;
      this.editedString = null;
    },
    cancelEdit(todo) {
      console.log("cancelled");
      todo._editing = false;
      this.editedString = null;
    },
    editNotes(todo) {
      todo._editingNotes = true;
    },
    doneEditNotes(todo) {
      todo._editingNotes = false;
    },
  },
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};

</script>
<style>
section {
  padding: 1rem 0 0 2rem;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  cursor: pointer;
  text-align: left;
  background-color: #FFF;
  margin: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid #ABABAB;
}
li {
  display: flex;
}
li > div {
  flex: 1;
}
.add-todo__label {
  float: left;
  width: 3rem;
  color: #AEAEAE;
}
.add-todo__input {
  border: none;
  border-bottom: 1px solid #AEAEAE;
  width: calc(100% - 4rem);
}
.todo__notes_empty {
  color: #AEAEAE;
}
.v3dp__datepicker > input {
  border: none;
  cursor: pointer;
}
</style>

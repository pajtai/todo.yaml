<template>
  <section>
    <label>Add Todo:</label>
    <input v-model="newTodo" @keyup.enter="addTodo" type="text">
  </section>
  <ul>
    <draggable v-model="todos" item-key="key" @change="save" :sort="true">
      <template #item="{element}">
        <li>
          <div v-if="!element.editing" @dblclick="edit(element)">
            <input v-model="element.done" type="checkbox">
            {{ element.title }}
          </div>
          <input v-else v-model="element.title" @keyup.enter="doneEdit(element)" type="text">
        </li>
      </template>
    </draggable>
  </ul>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Todo",
  components: {
    draggable,
  },
  data() {
    return {
      newTodo: "",
      todos: []
    }
  },
  async created() {
    const response = await this.axios.get("/api/todo/");
    this.todos = response.data.map((todo, index) => {
      todo.key = index;
      todo.editing = false;
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
      this.todos.push(createTodo(this.newTodo));
      this.newTodo = "";
    },
    save() {
      // this will save any just completed todos
      this.axios.post("/api/todo/", this.todos);
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
      todo.editing = true;
    },
    doneEdit(todo) {
      todo.editing = false;
    }
  }
};

function createTodo(title) {
  return {
    title,
    done: false
  }
}
</script>

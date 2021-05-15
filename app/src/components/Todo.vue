<template>
  <section>
    <label>Add Todo:</label>
    <input v-model="newTodo" @keyup.enter="addTodo" type="text">
  </section>
  <ul>
    <li v-for="todo in undoneTodos" v-bind:key="todo">
      <input v-model="todo.done" type="checkbox">
      {{ todo.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      newTodo: "",
      todos: []
    }
  },
  async created() {
    const response = await this.axios.get("/api/todo/");
    this.todos = response.data;
  },
  computed: {
    undoneTodos() {
      return this.todos.filter(todo => !todo.done);
    }
  },
  watch: {
    todos: {
      handler() {
        this.save();
      },
      deep: true
    },
  },
  methods: {
    addTodo() {
      this.todos.push(createTodo(this.newTodo));
      this.newTodo = "";
      this.save();
    },
    save() {
      this.axios.post("/api/todo/", this.todos);
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

<template>
  <ul>
    <li v-for="todo in todos" v-bind:key="todo">
      {{todo.title || todo}}
    </li>
  </ul>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      todos: []
    }
  },
  async created() {
    const response = await this.axios.get("/api/todo/");
    this.todos = response.data.todo;
  }
};
</script>

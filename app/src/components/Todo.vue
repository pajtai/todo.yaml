<template>
  <section>
    <label>Add Todo:</label>
    <input v-model="newTodo" @keyup.enter="addTodo" type="text">
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
            <input v-model="element.title" @keyup.enter="doneEdit(element)" type="text">
          </div>
          <div>
            <datepicker/>
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
      removeKeys: ["_key", "_editing"]
    }
  },
  async created() {
    const response = await this.axios.get("/api/todo/");
    this.todos = response.data.map((todo, index) => {
      todo._key = index;
      todo._editing = false;
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
      this.axios.post("/api/todo/", this.todos.map(todo => {
        let copy = Object.assign({}, todo);
        delete copy._editing;
        delete copy._key;
        if (!copy.done) {
          delete copy.done;
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
    },
    doneEdit(todo) {
      todo._editing = false;
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
<style>
li {
  display: flex;
}
li > div {
  flex: 1;
}
</style>

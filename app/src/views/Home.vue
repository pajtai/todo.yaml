<template>
    <div class="home">
        <Todo v-bind:add-to-top="addToTop" />
    </div>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";

export default {
    name: "Home",
    components: {
        Todo,
    },
    props: ["addToTop"],
};
</script>

<template>
    <div class="home">
        <Todo v-bind:config="config" />
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
    props: ["config"],
};
</script>

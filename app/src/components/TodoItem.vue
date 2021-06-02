<template>
    <li class="todo">
        <div class="todo__section">
            <input class="todo__input" v-model="done" type="checkbox" />
            <i class="fa fa-align-justify handle"></i>
            <span v-if="!editing" @dblclick="edit()">{{ title }}</span>
        </div>
        <div class="todo__section">
            <div class="todo__date" v-if="config.columns.dueDate">
                <datepicker :placeholder="`No Due Date`" v-model="dueDate" />
            </div>
        </div>
    </li>
</template>

<script>
function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function addComputeds(keys) {
    let computeds = {};
    keys.forEach((key) => {
        computeds[key] = {
            get() {
                return this[`parent${ucfirst(key)}`];
            },
            set(value) {
                this.$emit(`update:parent${ucfirst(key)}`, value);
            },
        };
    });
    return computeds;
}

import datepicker from "vue3-datepicker";
export default {
    name: "TodoItem",
    components: {
        datepicker,
    },
    data() {
        return {
            editing: false,
        };
    },
    emits: ["update:done", "update:parentDueDate", "update:parentDone"],
    props: ["parentDone", "parentDueDate", "parentTitle", "config"],
    computed: {
        ...addComputeds(["done", "dueDate", "title"]),
    },
};
</script>

<style>
.todo {
    cursor: pointer;
    text-align: left;
    background-color: #fff;
    margin: 1rem;
    padding: 0.5rem;
    border-bottom: 1px solid #aeaeae50;
    display: flex;
    flex-wrap: nowrap;
}
.todo > .todo__section {
    flex: 1;
}
</style>

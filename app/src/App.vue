<template>
    <h1>{{ fileName }}</h1>
    <router-view v-if="isMounted" v-bind:config="config" />
    <footer>
        <div>
            <small>Editing: {{ path }}</small>
        </div>
        <div v-if="this.shutdownButton" @click="close()" class="close">X</div>
    </footer>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            path: "",
            name: "",
            shutdownButton: false,
            config: false,
            isMounted: false,
        };
    },
    async created() {
        const responses = await Promise.all([
            this.axios.get("/api/file/"),
            this.axios.get("/api/configuration/"),
        ]);
        this.path = responses[0].data.filePath;
        this.fileName = responses[0].data.fileName;
        this.shutdownButton = !!responses[1].data.shutdownServerButton;
        this.config = responses[1].data;
        this.isMounted = true;
    },
    methods: {
        async close() {
            await this.axios.post("/api/shutdown", {
                action: "shutdown",
            });
            window.close();
        },
    },
};
</script>
<style>
body {
    background-color: #f0ffff;
}
h1 {
    color: #ababab;
    margin: 0 2rem 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
}
.home {
    background-color: #fff;
    padding-bottom: 1rem;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

footer {
    color: #ababab;
    font-size: 1rem;
    margin-bottom: 4rem;
}
footer > div {
    display: inline-block;
}
.close {
    float: right;
    cursor: pointer;
}
</style>

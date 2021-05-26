<template>
    <h1 v-if="isMounted">{{ fileName }}</h1>
    <router-view v-if="isMounted" v-bind:config="config" />
    <footer v-if="isMounted">
        <ul class="files">
            <li>
                <small>Editing: {{ path }}</small>
            </li>
            <li
                class="files__choices"
                v-for="file in otherFiles"
                v-bind:key="file.fileName"
            >
                <small
                    ><a v-bind:href="link(file)"
                        >Switch to: {{ file.filePath }}</a
                    ></small
                >
            </li>
        </ul>
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
            otherFiles: [],
        };
    },
    async created() {
        const responses = await Promise.all([
            this.axios.get("/api/files/"),
            this.axios.get("/api/configuration/"),
        ]);
        this.path = responses[0].data.filePath;
        this.fileName = responses[0].data.fileName;
        this.otherFiles = responses[0].data.otherFiles || [];
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
        link(file) {
            return `/?file=${file.fileName}`;
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
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
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

footer,
footer a {
    color: #ababab;
    text-decoration: none;
}

footer {
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
.files {
    background: none;
    cursor: pointer;
}
.files__choices {
    display: none;
}
.files:hover > .files__choices {
    display: inherit;
}
</style>

<template>
<!--  <div id="nav">-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </div>-->
  <router-view />
  <footer>
    <small>Editing: {{path}}</small>
  </footer>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      path: ""
    }
  },
  async created() {
    const response = await this.axios.get("/api/file/");
    this.path = response.data.filePath;
  }
}
</script>
<style>
body {
  background-color: #F0FFFF;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.home {
  background-color: #FFF;
  padding-bottom: 1rem;
}
section {
  padding: 1rem;
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
  color: #ABABAB;
  font-size: 1rem;
}
</style>

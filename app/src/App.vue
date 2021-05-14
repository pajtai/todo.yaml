<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F0FFFF;
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
  border-radius: 0.5rem;
  border: 1px solid #ABABAB;
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
</style>

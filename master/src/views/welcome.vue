<template>
  <div id="app">
    <img class="logo" src="../assets/logo.png">
    <hello></hello>
    <p>
<<<<<<< HEAD:master/src/views/welcome.vue
      Welcome to your Vue.js app!ssdfdgddfg
=======
      Welcome to your Vue.js app!sdfsds
>>>>>>> c16e2c4429ca1513e3207a1cd1b47a7e37d65f81:master/src/views/welcome.vue
    </p>
   
  </div>
</template>

<script>
import Hello from '../components/Hello'

export default {
  components: {
    Hello
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
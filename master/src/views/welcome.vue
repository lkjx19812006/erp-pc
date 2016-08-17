<template>
  <div id="app">
    <hello></hello>
    <p>
      Welcome to your Vue.js appssss!
    </p>
   
  </div>
</template>

<script>
import Hello from '../components/Hello'
export default {
  components: {
    Hello,
  }
}
</script>

<style>

 /* body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
 }  */

#app {
  color: #2c3e50;
  max-width: 100%;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: left;
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
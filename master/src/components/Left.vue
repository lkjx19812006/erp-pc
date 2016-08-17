<template>
  <div  id="left">
    <ul><li><a v-link="{ path: '/home/news' }">Go to news /foo</a></li>
    <li><a v-link="{ path: '/home/message'}">Go to message/foo/bar</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: '左边'
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
 #left {
        float:left;
        width:20%;
        height:90%;
        background-color: white;
    }
</style>
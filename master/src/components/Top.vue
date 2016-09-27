<template>
  <div  class="top gray_bg">
   <img src="/static/images/logo.png" height="47" width="58" />
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
      msg: ''
    }
  }
}
</script>

<style scoped>
.top{
    height: 60px;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 100;
    }
.top > img{
  margin-top: 5px;
  margin-left: 0.5%;
}
</style>
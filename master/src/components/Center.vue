<template>

   <div id="center">
   <router-view></router-view>
   </div>


</template>
<script>
export default {

 /*,
  data () {
    return {
      msg: '1111'
    }*/
}
</script>
<style scoped>
#center {
    height: calc(100% - 130px);
    position: absolute;
    right: 0;
    top: 130px;
    overflow: auto;
    left: 240px;
}
</style>

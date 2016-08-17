<template>
  <div  class="center_top light_bg mui-clearfix">
    <div class="new_time left">{{ msg }}</div>
    <div class="right head_info">
      <img src="../assets/images/head.png" height="52" width="52" />
    </div>
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
      msg: '最后更新时间:2016-7-22 12:23:36'
    }
  }
}
</script>

<style scoped>
 .center_top {
     height: 70px;
    position: fixed;
    right: 0;
    white-space: nowrap;
    left: 240px;
    box-shadow: 0px 2px 2px #ccc;
    top: 60px;
    }
  .new_time{
    margin-left: 40px;
    font-size: 14px;
    color: #666;
    padding-top: 30px;
  }
  .head_info{
    padding-right: 16px;
    padding-top: 10px;
  }
</style>
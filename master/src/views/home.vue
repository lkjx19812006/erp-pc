<template>
 <!--<top></top>-->
 <left></left>
 <centerTop></centerTop>
 <center></center>

</template>

<script>
import top from '../components/Top'
import left from '../components/Left'
import centertop from '../components/centerTop'
import center from '../components/Center'
import store from '../vuex/store'

export default {
  components: {
    top,
    left,
    centertop,
    center
  },
  store
}
</script>

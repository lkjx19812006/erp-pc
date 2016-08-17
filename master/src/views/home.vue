<template>
 <top></top>
 <left></left>
 <center_top></center_top>
 <center></center>

</template>

<script>
import top from '../components/Top'
import left from '../components/Left'
import center_top from '../components/center_top'
import center from '../components/Center'
import store from '../vuex/store'

export default {
  components: {
    top,
    left,
    center_top,
    center
  },
  store
}
</script>
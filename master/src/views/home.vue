<template>
 <top></top>
 <left></left>
 <center></center>
<router-view></router-view>

</template>

<script>
import top from '../components/Top'
import left from '../components/Left'
import center from '../components/Center'

export default {
  components: {
    top,
    left,
    center
  }
}
</script>
<template>
    <div>
        <left></left>
        <centerTop></centerTop>
        <center></center>
    </div>
</template>
<script>
/*import top from '../components/Top'*/
import left from '../components/Left'
import centertop from '../components/centerTop'
import center from '../components/Center'
import store from '../vuex/store'

export default {
    components: {
        left,
        centertop,
        center
    },
    events: {
        lang: function(val) {
            console.log('主页切换语言：' + val);
            this.$broadcast('changeLang', val);
        },
        tab: function(val) {
            console.log(val);
            this.$broadcast('topTab', val);
        },
    },
    store
}
</script>

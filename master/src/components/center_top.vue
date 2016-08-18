<template>
    <div class="center_top light_bg mui-clearfix" v-bind:class="{'center_top':getMenu==240,'center_nav':getMenu==50}" transition="expand">
        <div class="new_time left">{{ msg }}</div>
        <div class="right head_info">
            <img src="../assets/images/head.png" height="52" width="52" />
        </div>
    </div>
</template>
<script>
import {
    getMenu
} from '../vuex/getters'
export default {
    data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                msg: '最后更新时间:2016-7-22 12:23:36',
                wantshow: true
            }
        },
        vuex: {
            getters: {
                getMenu
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

.center_nav {
    height: 70px;
    position: fixed;
    right: 0;
    white-space: nowrap;
    left: 50px;
    box-shadow: 0px 2px 2px #ccc;
    top: 60px;
}

.center_left {
    left: 50px;
}

.new_time {
    margin-left: 40px;
    font-size: 14px;
    color: #666;
    padding-top: 30px;
}

.head_info {
    padding-right: 16px;
    padding-top: 10px;
}

</style>

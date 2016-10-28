<template>
    <div class="center_top light_bg mui-clearfix" v-bind:class="{'center_top':getMenu==240,'center_nav':getMenu==50}" transition="expand">
        <div class="new_time left">最近登录时间:{{ initLogin.time }}</div>
        <div class="right head_info">
            <span style="float:left;margin:20px 10px 0 0 ">{{initLogin.name}}</span><img src="/static/images/head.png" height="52" width="52" />
        </div>
    </div>
</template>
<script>
import {
    getMenu,
    initLogin
} from '../vuex/getters'
export default {
    data() {
            return {

            }
        },
        vuex: {
            getters: {
                getMenu,
              initLogin
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
    box-shadow: 0px 2px 2px #999;
    top: 60px;
    z-index: 1000;
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

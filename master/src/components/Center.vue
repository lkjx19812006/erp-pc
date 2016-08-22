<template>

    <div  v-bind:class="{'center':getMenu==240,'center_top':getMenu==50}"  transition="expand">
        <router-view></router-view>
    </div>
</template>
<script>
import {
    getMenu
} from '../vuex/getters'
export default {

    vuex: {
        getters: {
            getMenu
        }
    }
}
</script>
<style scoped>
.center {
    height: calc(100% - 130px);
    position: absolute;
    right: 0;
    top: 130px;
    overflow: auto;
    overflow-x: hidden;
    left: 240px;
    white-space: nowrap;
}
.center_top{
    height: calc(100% - 130px);
    position: absolute;
    right: 0;
    top: 130px;
    overflow: auto;
    left: 50px;
}
</style>

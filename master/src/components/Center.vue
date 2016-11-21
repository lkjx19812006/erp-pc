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
    top: 70px;
    left: 200px;
    white-space: nowrap;
   /*  min-width: 1500px; */
}
.center_top{
    height: calc(100% - 130px);
    position: absolute;
    right: 0;
    top: 70px;
    overflow: auto;
    left: 50px;
}
</style>

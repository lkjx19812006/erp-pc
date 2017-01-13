<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
    <div class="container modal_con" v-show="param.show" >
        <div class="top-title" @click="param.show=false">
            <span class="glyphicon glyphicon-remove-circle" ></span>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:['param'],
    data() {
        return {
            show:true,
            name:''
        }
    }

}
</script>
<style scoped>
.top-title{
    position: fixed;
    width:60%;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 1083;
}
.modal_con{
    width: 60%;
}
</style>

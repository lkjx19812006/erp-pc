<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="model-header">
            <!-- <h4>{{$t('static.friendly_warning')}}</h4> -->
            
            <img :src="param.img"/>
                <!-- <div class="tips_name">{{param.name}}</div> -->
        </div>
    </div>
</template>
<script>
export default {
    props: ['param']

}
</script>
<style scoped>

.modal_con{
    z-index:1102;
    width: 60%;
    overflow: auto;
    background: none;
}
.model-header img{
    margin: auto;
}
.top-title{
    width: 60%;
    left: 0;
    right: 0;
}
.modal {
    z-index:1102;
    opacity: 0.5;
    background-color: #000;
    display: block;
}

.tips_name{
    color: #fa6705;
    font-size: 20px;
    margin-top: 40px;
    display: inline-block;
    width: 60%;
    white-space: normal;
}
</style>

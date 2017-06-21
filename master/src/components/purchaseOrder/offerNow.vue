<template>
    <div>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container del_modal_con" v-show="param.show">
            <div class="model-header">
                <h4>{{$t('static.friendly_warning')}}</h4>
                <div class="model-tips clearfix">
                    <img src="/static/images/bee.png" class="pull-left" height="138" width="111" />
                    <p class="offer">是否立即询价扩散？</p>
                </div>
                
                <div class="model-footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <input type="button" class="btn  btn-confirm" @click="param.link(param,param.show = false)" value="{{$t('static.confirm')}}" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['param'],
    methods:{
        hidden:function(){
            this.param.show = false;
            // this.$parent.param.show =false
        }
    }
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
    z-index: 1102;
}

.del_modal_con {
    z-index: 1102;
}

.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -28px;
    margin-right: -22px;
}
.offer{
    font-size: 16px;
    font-weight: bold;
    line-height: 50px;
}
.top-title span {
    font-size: 30px;
    color: #fff;
}

.tips_name {
    color: #fa6705;
    font-size: 20px;
    margin-top: 40px;
    display: inline-block;
    width: 60%;
    white-space: normal;
}
</style>

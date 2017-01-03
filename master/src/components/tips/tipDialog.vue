<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>{{$t('static.friendly_warning')}}</h4>
            <div class="model-tips clearfix">
                <img src="/static/images/bee.png"  class="pull-left" height="138" width="111"/>
                <div class="tips_name" v-if="param.name=='确定取消询价?'">{{$t('static.cancel_inquire')}}</div>
                <!-- <div class="tips_name" v-if="param.name==='确认删除文件?'">{{$t('static.del_file')}}</div> -->
                <div class="tips_name" v-if="param.name=='确认删除?'">{{$t('static.del_confirm')}}</div>
                <div class="tips_name" v-if="param.name!='确定取消询价?'&&param.name!='确认删除?'">{{param.name}}</div>
            </div>
            <div class="model-footer" v-if="param.alert">
                <input type="button" class="btn btn-close"  @click="param.show = false"  value="{{$t('static.confirm')}}"/>
            </div>
            <div class="model-footer" v-if="param.remain">
                <input type="button" class="btn btn-close"  @click="param.callback()"  value="{{$t('static.confirm')}}"/>
            </div>
            <div class="model-footer" v-if="param.confirm">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                <input type="button" class="btn  btn-confirm"  @click="param.callback(),param.show = false" value="{{$t('static.confirm')}}" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['param']
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
    z-index: 1102;
}
.del_modal_con{
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

.top-title span {
    font-size: 30px;
    color: #fff;
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

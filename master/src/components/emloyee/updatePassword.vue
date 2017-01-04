<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>修改密码</h4>
            <div class="model-tips clearfix">
                <input type="text" class="form-control" v-model="param.newPwd" placeholder="请输入密码" />
            </div>

            <div class="model-footer">
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

.del_modal_con{
    width:380px;
    z-index:1102;
}
.modal {
    z-index:1102;
    opacity: 0.5;
    background-color: #000;
    display: block;
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

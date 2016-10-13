<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>友情提示</h4>
            <div class="model-tips clearfix">
                <img src="../../static/images/bee.png"  class="pull-left" height="158" width="131"/>
                <span class="tips_name">{{param.name}}</span></div>
            <div class="model-footer">
                <input type="button" class="btn btn-close"  @click="param.show = false"  value="确定"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
        }
    }
}
</script>
<style scoped>
.modal {
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
    font-size: 28px;
    margin-top: 40px;
    display: inline-block;
}
</style>

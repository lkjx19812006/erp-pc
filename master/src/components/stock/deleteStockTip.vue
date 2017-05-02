<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4 v-if="param.title=='意向'">{{$t('static.del_intent')}}</h4>
            <h4 v-else>删除{{param.title}}</h4>
            <p class="model-tips">{{$t('static.del_info')}}</p>
            <div class="model-footer">
                <button type="button" class="btn btn-close"  @click="param.show = false">{{$t('static.cancel')}}</button>
                <button type="button" class="btn btn-orange" @click="param.link(param,param.show=false)">{{$t('static.del')}}</button>
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
   z-index: 1083
}
.del_modal_con{
    z-index: 1084
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

</style>

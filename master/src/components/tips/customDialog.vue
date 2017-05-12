<template>
    <!-- 自定义对话框 -->
    <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>{{param.title}}</h4>
            <div class="model-tips clearfix">
                <!-- <label class="left" style="font-size: 14px;font-weight: 100">{{param.title}}</label> -->
                <textarea v-model='param.comments' class="form-control" style="width:100%;overflow:auto;word-break:break-all" rows="5"></textarea>
            </div>
            <div class="model-footer">
                <button v-for="item in param.items" type="button" class="btn btn-default" :class=item.style @click="item.handle">{{item.name}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import {

} from '../../vuex/actions'
export default {
    props: ['param'],
    vuex: {
        actions: {

        }
    },
    methods: {

    },
    created() {

    }

}
</script>
<style scoped>
.del_modal_con {
    z-index: 1083;
}

.modal {
    z-index: 1083;
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

.btn {
    margin-left: 10px;
}
</style>

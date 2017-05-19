<!-- 弹窗组件，只有关闭和显示的功能 -->
<template>
    <!-- 自定义对话框 -->
    <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>{{param.title}}111</h4>
            <slot></slot>
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

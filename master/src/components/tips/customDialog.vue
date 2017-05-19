<template>
    <!-- 自定义对话框 -->
    <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>{{param.title}}</h4>
            <div class="model-tips clearfix">
                <div v-show="param.showText" v-for="item in param.quickText">
                    <div>
                        <label>{{item.title}}:</label>
                        <span v-for="text in item.texts" style="cursor:pointer" class="quick_edit" @click="addText(text)">{{text}}&nbsp;&nbsp;</span>
                    </div>
                </div>
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
        addText: function(text) {
            if (this.param.editType = "replace") { //替换（单选）
                this.param.comments = text;
            } else if (this.param.comments.split(',').indexOf(text) == -1) { //拼接
                this.param.comments += text + ',';
            }

        },
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

.model-tips {
    padding: 20px 10px;
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

label {
    font-size: 14px;
    color: #3399ff;
}

span {
    font-size: 12px;
    color: #3399ff;
}
</style>

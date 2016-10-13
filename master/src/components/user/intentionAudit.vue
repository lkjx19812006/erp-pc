<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>会员意向审核</h3>
        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <div class="editpage">
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <div class="editpageleft">
               </div>
                 </div>
           </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=pass,tipsParam.name='确认审核通过?'">通过</button>
            <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=reject,tipsParam.name='确认审核不通过?'">不通过</button>
        </div>
    </div>
</template>
<script>
import tipsdialogModel  from '../tips/tipDialog'
import {

} from '../../vuex/getters'
import {

    batchUserIntentionAudit
} from '../../vuex/actions'
export default {
    components: {
        tipsdialogModel
    },
    props: ['param'],
    data() {
        return {
            tipsParam:{
                show:false,
                confirm:true,
                name:"",
                callback:''

          }
        }
    },
    vuex: {
       getters: {

        },
        actions: {
            batchUserIntentionAudit
        }
    },
    methods: {

        pass: function(){
            this.param.validate = 1;
            this.batchUserIntentionAudit(this.param);
        },
        reject: function(){
            this.param.validate = 2;
            this.batchUserIntentionAudit(this.param);
        },
    },
    created() {

   }

}
</script>
<style scoped>
.modal_con {

    width:450px;
    height:300px;
}
.big-font {
    font-size: 36px;
}
.top-title span {
    font-size: 28px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpage-input {
    margin-top: 15px;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.edit-input {
    height: 36px;
    line-height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.edit_footer {
    position:absolute;
    margin-bottom:-50px;
    width: 450px;
}

.edit_footer button {
    margin-left: 15px;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.editpage_img {
    width: 90%;
}

.editpage_img img {
    display: inline-block;
    background: #ccc;
}

.editpage-image {
    display: inline-block;
}
</style>

<!-- <template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>会员意向审核</h4>
            <p class="model-tips"></p>
            <div class="model-footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=pass,tipsParam.name='确认审核通过?'">通过</button>
                <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=reject,tipsParam.name='确认审核不通过?'">不通过</button>
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

</style> -->

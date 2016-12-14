<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title}}</h3>
        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <div class="editpage">
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <div class="editpageleft">
                    <!-- <div style="color:red">
                        快速编辑：
                        <span v-for="item in initAuditLabel.arr">
                            <label style="cursor:pointer" class="quick_edit" @click="addText(item.text)">{{item.text}}&nbsp;&nbsp;</label>
                        </span>
                    </div> -->
                    <div class="editpage-input">
                           <label class="editlabel">{{$t('static.comment')}}</label>
                           <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none" rows="5" value="{{param.description}}"></textarea>
                    </div>
               </div>
           </section>
        </div>
        <div class="edit_footer" v-if="param.title=='申请订单审核'">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
            <button type="button" class="btn  btn-confirm" @click="pass(param)">{{$t('static.applications')}}</button>
            <!-- <button type="button" class="btn  btn-confirm" @click="reject(param)">{{$t('static.cancel_order')}}</button> -->
        </div>
        <div class="edit_footer" v-else>
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
            <button type="button" class="btn  btn-confirm" @click="pass(param)">{{$t('static.pass')}}</button>
            <!-- <button type="button" class="btn  btn-confirm" @click="reject(param)">{{$t('static.reject')}}</button> -->
        </div>
    </div>
</template>
<script>
import {
    /*initAuditLabel*/
} from '../../vuex/getters'
import {
   /* auditQuickEdit,*/
    orgOrderAudit
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {

        }
    },
    vuex: {
       getters: {
            /*initAuditLabel*/
        },
        actions: {
            /*auditQuickEdit,*/
            orgOrderAudit
        }
    },
    methods: {
       /* addText: function(text){
            if(this.param.auditComment.split(',').indexOf(text) == -1){
                this.param.auditComment += text + ',';
            }
        },*/
        pass: function(param){
            this.param.show = false;
            this.orgOrderAudit(this.param);
            
        },
        reject: function(param){
            this.param.validate = -2;
            this.param.show=false;
            console.log(this.param.ids);
            console.log(this.param.description);
            console.log(this.param.indexs);
            this.param.callback = this.param.callback;
            this.orgOrderAudit(this.param);
        },
    },
    /*created() {
        this.auditQuickEdit();
   }*/

}
</script>
<style scoped>
.modal_con {
    width: 454px;
    height: 300px;
    top: 0;
}
.edit_footer{
    width: 454px;
    position: absolute;
    bottom: 0;
}
.big-font {
    font-size: 36px;
}
.top-title{
    position: absolute;
    top: 0;
    width: 454px;
}
.top-title span {
    font-size: 28px;
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

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
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

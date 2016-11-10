<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>意向审核</h3>
        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <div class="editpage">
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <div class="editpageleft">

                    <div class="editpage-input">
                           <label class="editlabel">备注</label>
                           <!-- <input type="textarea" v-model='param.auditComment' class="form-control edit-input" value="{{param.auditComment}}" /> -->
                           <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all" rows="5" value="{{param.description}}"></textarea>
                    </div>
               </div>
                 </div>
           </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=reject,tipsParam.name='确认审核不通过?'">不通过</button>
            <div v-if="param.key=='user'" style="display:inline-block">
                <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=auditing,tipsParam.name='确认审核中?'">审核中</button>
            </div>
            <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=pass,tipsParam.name='确认审核通过?'">通过</button>
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
            if(this.param.key=='user'){   //客服审核意向(初审会员的意向)
                this.param.validate = 1;
            }
            if(this.param.key=='employee'){    //业务员审核意向(部门意向)
                this.param.validate = 2;
            }
            if(this.param.key=='org'){    //主管审核意向(部门意向)
                this.param.validate = 3;
            }

            this.batchUserIntentionAudit(this.param);
        },
        reject: function(){
            if(this.param.key=='user'){
                this.param.validate = -1;
            }
            if(this.param.key=='employee'){
                this.param.validate = -2;
            }
            if(this.param.key=='org'){
                this.param.validate = -3;
            }
            this.batchUserIntentionAudit(this.param);
        },
        auditing:function(){
            this.param.validate = 9;
            this.batchUserIntentionAudit(this.param); 
        },
    },
    created() {

   }

}
</script>
<style scoped>
.modal{
    z-index:1085;
}
.modal_con{
    z-index:1086;
    width:400px;
    height:300px;
    top:0;
}
.edit_footer{
    position: absolute;
    bottom: 0px;
    width:400px;
}
.top-title{
    width: 100%;
    position: absolute;
    top:0;
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
    font-size: 15px;
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


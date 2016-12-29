<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.titles}}</h3>
        </div>
        <validator name="validation">
            <div class="edit-model">
               <section class="editsection clearfix" v-cloak>
                    <div class="editpage-input col-md-12" v-if="param.titles=='确认收款'||param.titles=='确认付款'">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.description}}"></textarea>
                    </div>
                    <div class="editpage-input col-md-12" v-if="param.titles=='审核合同'">
                       <label class="editlabel">审核说明</label>
                       <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" ></textarea>
                    </div>
                    <div class="editpage-input col-md-12" v-if="param.titles=='重新申请审核'">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5"></textarea>
                    </div>
                    <div class="editpage-input col-md-12" v-if="param.titles!='审核合同'&&param.titles!='重新申请审核'">
                         <label class="editlabel">支付/收款凭证</label>
                         <press-image :value.sync="param.image_f" :showurl.sync="param.image_f_show" :type.sync="type" :param="imageParam" style="float:left;width:25%"></press-image>
                         <press-image :value.sync="param.image_s" :showurl.sync="param.image_s_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:25%"></press-image>
                         <press-image :value.sync="param.image_t" :showurl.sync="param.image_t_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:25%"></press-image>
                    </div>
               </section>
            </div>
            <div class="edit_footer" v-if="param.titles=='确认收款'||param.titles=='确认付款'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
               <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="reject(param)">不通过</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="agree(param)">确定</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true" >通过审核</button>
            </div>
            <div class="edit_footer" v-if="param.titles=='审核合同'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
               <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="bargainReject(param)">不通过</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="bargainPass(param)">确定</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true" >通过审核</button>
            </div>
            <div class="edit_footer" v-if="param.titles=='重新申请审核'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
               <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="cancelContract(param)">取消合同申请</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="referTo(param)">提交</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true" >提交</button>
            </div>
            <div class="edit_footer" v-if="param.titles=='确定收款'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show=false)">{{$t('static.confirm')}}</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true" >确定</button>
            </div>
        </validator>
    </div>
</template>
<script>
import pressImage from '../../imagePress'
import {

} from '../../../vuex/getters'
import {

} from '../../../vuex/actions'
export default {
    components: {
        pressImage
    },
    props: ['param'],
    data() {
        return {
            type:"image/jpeg,image/jpg,image/png",
            imageParam:{
               url:'/crm/api/v1/file/',
               qiniu:false
            }
        }
    },
    vuex: {
       getters: {

        },
        actions: {
            
        }
    },
    methods: {
        agree: function(item){
            this.param.validate = 2;
            this.param.show=false;
            this.param.link(item);
        },
        reject: function(item){
            this.param.validate = 3;
            this.param.link(item);
            this.param.show=false;
        },
        bargainPass:function(){ //审核合同通过
            this.param.show = false;
            this.param.validate = 2;
            console.log(this.param)
            this.param.link(this.param);
        },
        cancelContract:function(){ //取消合同申请
            this.param.show = false;
            this.param.validate = -1;
            console.log(this.param)
            this.param.link(this.param);
        },
        referTo:function(){  //重新
            this.param.show = false; 
            this.param.validate = 1;
            console.log(this.param)
            this.param.link(this.param);
        },
        bargainReject:function(){ //审核合同未通过
            this.param.show = false;
            this.param.validate = -2;
            console.log(this.param)
            this.param.link(this.param);
        }
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
    width:600px;
    max-height: 600px;
    overflow-y:auto;
}
.edit_footer{
    position: absolute;
    bottom: 0px;
    width:600px;
}
.top-title{
    width: 100%;
    position: absolute;
    top:0;
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


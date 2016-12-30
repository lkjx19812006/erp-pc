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
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">调整差额 <span class="system_danger" v-if="$validation.adjust.required">{{$t('static.required')}}</span></label>
                       <input type="number" class="form-control" v-model="param.adjusted"  v-validate:adjust="{required:true}"/>
                    </div>
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">补充合同文本 <span class="system_danger" v-if="$validation.text.required">{{$t('static.required')}}</span></label>
                       <textarea v-model='param.contractText' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;font-size: 13px;" rows="5" placeholder="请说明补充理由" v-validate:text="{required:true}"></textarea>
                    </div>
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;font-size: 13px;" rows="3"></textarea>
                    </div>
                    <div class="editpage-input col-md-12">
                         <label class="editlabel">支付/收款凭证</label>
                         <press-image :value.sync="param.image_f" :showurl.sync="param.image_f_show" :type.sync="type" :param="imageParam" style="float:left;width:20%"></press-image>
                         <press-image :value.sync="param.image_s" :showurl.sync="param.image_s_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:20%"></press-image>
                         <press-image :value.sync="param.image_t" :showurl.sync="param.image_t_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:20%"></press-image>
                    </div>
               </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm()">{{$t('static.confirm')}}</button>
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
            },
            amount:'',
        }
    },
    vuex: {
       getters: {

        },
        actions: {
            
        }
    },
    methods: {
        confirm:function(){
            this.param.show =false;
            this.param.link(this.param);
        }
    },
    created() {

   }

}
</script>
<style scoped>
.modal{
    z-index:1102;
}
.modal_con{
    z-index:1102;
}

.top-title{
    width: 100%;
    position: absolute;
    top:0;
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


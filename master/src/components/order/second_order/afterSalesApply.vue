<template>
    <personnel-model :param="employeeParam" v-if="employeeParam.show"></personnel-model>
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
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">售后方式 <span class="system_danger" v-if="$validation.adjust.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-show="false" class="form-control" v-model="param.type"  v-validate:adjust="{required:true}"/>
                       <select class="form-control" v-model="param.type" @change="clickSwitch()">
                          <option value="0">换货</option>
                          <option value="1">退货</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">收货人 <span class="system_danger" v-if="$validation.consignee.required">{{$t('static.required')}}</span></label>
                       <input type="text"  class="form-control" v-model="employeeParam.consigneeName"  v-validate:consignee="{required:true}" value="{{param.consignee}}" readonly="true"  @click="selectEmployee(param.consignee,employeeParam.consigneeName,receive)" />
                    </div>
                    <div class="editpage-input col-md-6" v-if="param.type==0">
                       <label class="editlabel">发货人 <span class="system_danger" v-if="$validation.shipper.required">{{$t('static.required')}}</span></label>
                       <input type="text"  class="form-control" v-model="employeeParam.shipperName"  v-validate:shipper="{required:true}" value="{{param.consignee}}" readonly="true"  @click="selectEmployee(param.shipper,employeeParam.shipperName,deliver)" />
                    </div>
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;font-size: 13px;" rows="5"></textarea>
                    </div>
                    <div class="editpage-input col-md-12">
                         <label class="editlabel">上传凭证</label>
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
import personnelModel  from  '../second_order/allEmployee'
import {

} from '../../../vuex/getters'
import {

} from '../../../vuex/actions'
export default {
    components: {
        pressImage,
        personnelModel
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
            employeeParam:{
                show:false,
                shipperName:'',
                consigneeName:'',
                consignee:'',
                shipper:'',
                differce:''
            },
            receive:'收货',
            deliver:'发货'
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
        },
        clickSwitch:function(){
            if(this.param.type==0){

            }else if(this.param.type==1){
                this.employeeParam.shipperName = '';
                this.param.shipper = '';
            }   
        },
        selectEmployee:function(id,name,differce){
            console.log(differce)
           this.employeeParam.show = true;
           if(differce=='收货'){
             this.employeeParam.consignee= id;
             this.employeeParam.consigneeName = name;
           }else if(differce=='发货'){
             this.employeeParam.shipper= id;
             this.employeeParam.shipperName = name;
           }
           this.employeeParam.differce = differce;
        }
    },
    events: {
        selectEmpOrOrg: function(person) {
            console.log(person)
            if(person.differce=='收货'){
                this.employeeParam.consigneeName = person.employeeName;
                this.param.consignee = person.employeeId;
                this.employeeParam.consignee = person.employeeId;
            }else if(person.differce=='发货'){
                this.employeeParam.shipperName = person.employeeName;
                this.param.shipper = person.employeeId;
                this.employeeParam.shipper = person.employeeId;
            }
            console.log(this.param.consignee)
        }
    },
    created() {

   }

}
</script>
<style scoped>
.modal{
    z-index:1091;
}
.modal_con{
    z-index:1091;
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


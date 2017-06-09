<template>
<div>
    <orgsearch-model :param="orgNameParam" v-if="orgNameParam.show"></orgsearch-model>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="close()" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection" v-cloak>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>部门业务类型</label>
                                <select class="form-control edit-input" v-model="param.bizType">
                                    <option>Tech</option>
                                    <option>Finance</option>
                                    <option>HR</option>
                                    <option>Sales</option>
                                </select>
                            </div>
                            <div class="client-detailInfo  pull-left col-md-6 col-xs-12" v-if="param.distinct=='editparten'">
                                <label>部门编码</label>
                                <input type="text" class="form-control edit-input" v-model="param.code" readonly="true" />
                            </div>

                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>部门名称 <span class="system_danger" v-if="$validation.orgname.required">请输入名称</span></label>
                                <input type="text" class="form-control edit-input"  v-model="param.name"  v-validate:orgname="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-left col-md-6 col-xs-12" v-if="param.distinct=='editparten'">
                                <label>上级部门 <span class="system_danger" v-if="$validation.level.required">请输入上级部门</span></label>
                                 <input type="text" class="form-control edit-input" v-model="orgNameParam.orgName" value="{{param.pid}}" v-validate:level="['required']" @click="selectOrg(orgid,orgName)"  />
                            </div>
                            <div class="client-detailInfo  pull-left col-md-6 col-xs-12" v-else >
                                <label>上级部门 <span class="system_danger" v-if="$validation.level1.required">请输入上级部门</span></label>
                                <input type="text" class="form-control edit-input" v-model="orgNameParam.orgName"  v-validate:level1="['required']" @click="selectOrg(orgid,orgName)" v-else @click="selectOrg(orgid,orgName)" />
                               
                            </div>
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12" v-if="param.distinct=='editparten'">
                                <label>级别</label>
                                <input type="text" class="form-control edit-input"  v-model="param.level" readonly="true" />
                            </div>
                            <div class="client-detailInfo  pull-left col-md-6 col-xs-12" v-if="param.distinct=='editparten'">
                                <label>可用状态</label>
                                <select class="form-control edit-input" v-model="param.status">
                                    <option value="1">可用</option>
                                    <option value="0">无用</option>
                                </select>
                            </div>
                            <div class="client-detailInfo  pull-left col-md-6 col-xs-12" v-if="param.distinct=='editparten'">
                                <label style="display:inline;font-size:14px;">管辖省份：</label>
                                    <Tag color="blue" v-for="($index,item) in param.jsonArray" track-by="$index" closable @on-close="deleteLabel($index)">{{item.name}}</Tag>
                                    <i-button icon="ios-plus-empty" type="dashed" size="small" @click="newlabel()">
                                        <span v-if="!pro.show">展开</span>
                                        <span v-else>收起</span>
                                        添加
                                    </i-button>
                                <div v-if="pro.show">
                                    <i-select :model.sync="pro.data" style="width:200px" >
                                        <i-option v-for="item in initCNProvince" :value="item.id" @click="check(item)">{{ item.cname }}</i-option>
                                    </i-select>
                                </div>
                                    
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn btn-confirm" v-if="$validation.valid"  @click="save()">保存</button>
                    <button type="button" class="btn btn-confirm" v-else  disabled="disabled">保存</button>
                </div>
            </form>
        </validator>
    </div>
</div>
</template>
<script>
import orgsearchModel from  '../emloyee/searchorg'
import filter from '../../filters/filters'
import {
    initOrgDetail,
    initCNProvince
} from '../../vuex/getters'
import {
    getOrgDetail,
    createEmploy,
    alterOrg,
    createOrg
} from '../../vuex/actions'
export default {
    components: {
        orgsearchModel
    },
    props: ['param'],
    data() {
        return {
            dateText:'',
            show:true,
            orgNameParam:{
                show:false,
                orgName:'',
                orgid:this.param.pid,
                orgcode:'',
                leaf:true   //只获取叶子节点
            },
            loadParam:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                id:this.param.id
            },
            pro:{
                show:false,
                data:''
            },
            idsArr:[]
        }
    },
     vuex: {
        getters:{
            initOrgDetail,
            initCNProvince
        },
        actions: {
            getOrgDetail,
            createEmploy,
            alterOrg,
            createOrg
        }
    },
    methods:{
        checked:function(item){
            if(item.checked){
                item.checked=false;
            }else{
                item.checked=true;
            }
            console.log(item.checked);
        },
        save:function(){
            this.param.show=false;
            if(this.param.distinct=='editparten'){
                this.param.pid = this.orgNameParam.orgid;
                for(var i =0; i<this.param.jsonArray.length;i++){
                    this.idsArr.push(this.param.jsonArray[i].id)
                    
                }
                this.param.responsibleProvinceId = this.idsArr.join(',')
                this.alterOrg(this.param);
            }else{
                this.param.pid = this.orgNameParam.orgid;
                this.createOrg(this.param);
            }
            this.param.bizType ='';
            this.param.code = '';
            this.param.level ='';
            this.param.name = '';
            this.param.pid = '';
            this.param.status = '';
        },
        close:function(){
            this.param.show=false;
            this.param.bizType =" ";
            this.param.code = " ";
            this.param.level =" ";
            this.param.name = " ";
            this.param.pid = " ";
            this.param.status = " ";
        },
        selectOrg:function(){
            this.orgNameParam.show=true;
            this.param.pid = this.orgNameParam.orgid;
        },
        newlabel:function(){
            this.pro.show = !this.pro.show 
        },
        check:function(item){
            var provinceArr={}
            provinceArr.name = item.cname
            provinceArr.id = item.id
            this.param.jsonArray.push(provinceArr)
        },
        deleteLabel:function($index){
            this.param.jsonArray.splice($index,1)
        }
    },
    events:{
        org:function(org){
            this.orgNameParam.orgName = org.orgName;
            this.orgNameParam.orgid = org.orgid;
            this.orgNameParam.orgcode = org.orgcode;
        }
    },
    created(){
        //this.idsArr = this.param.responsibleProvinceId.split('，')
        console.log(this.param)
    },
    watch:{
        'initOrgDetail':function (to,from){
           /* if(this.param.distinct == 'editparten'){
                this.param.bizType = to.bizType;
                this.param.code = to.code;
                this.param.level = to.level;
                this.param.name = to.name;
                this.param.pid = to.pid;
                this.param.status = to.status;
                this.orgNameParam.orgName = to.pid;
            }  */
        }
    },
    filter: (filter, {})
}
</script>
<style scoped>
.modal_con{
    height: 600px;
}
.edit_footer{
    position: absolute;
    bottom:0;
}
.top-title{
    position: absolute;
    top: 0;
    right: 0;
}
.search_input{
    float: none;
    text-indent: 0px;
}
.editsection {
    width: 100%;
    box-sizing: border-box;
}
.client-detailInfo label{
    display: inline-block;
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

.edit_footer button {
    margin-left: 15px;
}

</style>

<template>
<div>
    <orgsearch-model :param="orgNameParam" v-if="orgNameParam.show"></orgsearch-model>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
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
                                    <option>{{param.bizType}}</option>
                                    <option>Tech</option>
                                    <option>Finance</option>
                                    <option>HR</option>
                                    <option>Sales</option>
                                </select>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>部门编码</label>
                                <input type="text" class="form-control edit-input" v-model="param.code" value="{{initOrgDetail.code}}" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>部门名称 <span class="system_danger" v-if="$validation.name.required">请输入名称</span></label>
                                <input type="text" class="form-control edit-input"  v-model="param.name" v-validate:name="['required']" value="{{initOrgDetail.name}}"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>上级部门 <span class="system_danger" v-if="$validation.pid.required">请输入上级部门</span></label>
                                <input type="email" class="form-control edit-input" v-model="param.pid" value="{{initOrgDetail.pid}}" v-validate:pid="['required']"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>级别</label>
                                <input type="text" class="form-control edit-input"  v-model="param.level" value="{{initOrgDetail.level}}"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>可用状态</label>
                                <select class="form-control edit-input" v-model="param.status">
                                    <option>{{param.status}}</option>
                                    <option value="1">可用</option>
                                    <option value="0">无用</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn btn-confirm" v-if="$validation.valid"  @click="save()">保存</button>
                    <button type="button" class="btn btn-confirm" v-else v-else disabled="disabled">保存</button>
                </div>
            </form>
        </validator>
    </div>
</div>
</template>
<script>
import orgsearchModel from  '../emloyee/searchorg'
import {
    initOrgDetail
} from '../../vuex/getters'
import {
    getOrgDetail,
    createEmploy
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
                orgid:'',
                orgcode:'',
                leaf:true   //只获取叶子节点
            },
            loadParam:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                id:this.param.id
            }
           
        }
    },
     vuex: {
        getters:{
            initOrgDetail
        },
        actions: {
            getOrgDetail,
            createEmploy
        }
    },
    methods:{
         createDateText() {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let str = `${year}/${month}/${day}`
            this.dateText = str.replace(/\b(\w)\b/g, "0$1")
        },
        save:function(){
            var temp = '';
            this.initRoleList.forEach(function(item){
                if(item.checked){
                    temp += item.id + ',';
                }         
            })
            console.log(temp);
            this.param.privilege = temp.substring(0,temp.length-1);
            this.param.show = false
            this.param.callback = this.param.callback;
            this.param.link(this.param);
        },
        checked:function(item){
            if(item.checked){
                item.checked=false;
            }else{
                item.checked=true;
            }
            console.log(item.checked);
        },
        selectorg:function(){
            this.orgNameParam.show=true;
            this.param.orgName = this.orgNameParam.orgName;
            this.param.orgid = this.orgNameParam.orgid;
            this.param.orgcode = this.orgNameParam.orgcode;
        }
    },
    events:{
        org:function(qq){
            this.param.orgName = qq.orgName;
            this.param.orgid = qq.orgid;
            this.param.orgcode = qq.orgcode;
        }
    },
    created(){
        this.getOrgDetail(this.loadParam)
        console.log(this.initOrgDetail)
        if(this.initOrgDetail.id!==''){
            console.log(';;;;')
        }
    },
    ready() {
        this.createDateText()
    }
}
</script>
<style scoped>
.editsection{
    margin-bottom: 50px;
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

.edit_footer button {
    margin-left: 15px;
}
.role{
    margin-right: 10px;
}
</style>

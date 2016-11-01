<template>
    <orgsearch-model :param="orgNameParam" v-if="orgNameParam.show"></orgsearch-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
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
                                <label>{{param.namelist}}  <span class="system_danger" v-if="$validation.username.minlength">请输入至少两位</span></label>
                                <input type="text" class="form-control" v-model="param.name" v-validate:username="{minlength:2}"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.englist}}</label>
                                <input type="text" class="form-control" v-model="param.ename"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.job}}  <span class="system_danger" v-if="$validation.no.required">请输入员工工号</span></label>
                                <input type="text" class="form-control" v-model="param.no" v-validate:no="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.parten}}  <span class="system_danger" v-if="$validation.org.required">请选择部门</span></label>
                                 <input type="text" class="form-control" v-model="param.orgName" v-validate:org="['required']" @click="selectorg()" readonly="true" />
                               <!--  <select class="form-control" v-model="param.orgName" id="userown" v-validate:userown="['required']">
                                   <option v-for="item in initOrgList">{{item.name}}</option>
                               </select> -->
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.positionlist}} <span class="system_danger" v-if="$validation.position.required">请输入职位</span></label>
                                <input type="text" class="form-control" maxlength="11" v-model="param.position" v-validate:position="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.phonelist}} <span class="system_danger" v-if="$validation.phone.phone">请输入正确的手机号</span></label>
                                <input type="email" class="form-control" v-model="param.mobile" v-validate:phone="['phone']"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.nolist}}</label>
                                <input type="text" class="form-control" v-model="param.extno" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.entry}}</label>
                                <div class="search_input">
                                    <mz-datepicker :time.sync="param.entrydate" format="yyyy-MM-dd">
                                    </mz-datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
                                <label>{{param.levellist}}</label>
                                <input type="text" class="form-control" v-model="param.level" />
                            </div>
                            <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                <label>{{param.leave}}</label>
                                 <div class="search_input">
                                    <mz-datepicker :time.sync="param.leavedate"  format="yyyy-MM-dd">
                                    </mz-datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo col-xs-12">
                                <label>角色</label>
                                <div  class="clerafix">
                                    <div class="pull-left role clerafix col-md-3 col-xs-3" v-for="item in initRoleList" >
                                        <input type="checkbox" class="checkbox_unselect"  
                                        v-model="item.checked" @click="checked(item)"/>
                                        <label for="admin">{{item.cname}}</label>
                                    </div>
                                    
                                </div>
                            </div> 
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn btn-confirm" v-if="$validation.valid"  @click="save(param,param.show = false)">保存</button>
                    <button type="button" class="btn btn-confirm" v-else v-else disabled="disabled">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import calendar from '../calendar/vue.datepicker'
import orgsearchModel from '../emloyee/searchorg'
import {
    initRoleList
} from '../../vuex/getters'
import {
    getRoleList,
    createEmploy
} from '../../vuex/actions'
export default {
    components: {
        calendar,
        orgsearchModel
    },
    props: ['param'],
    data() {
        return {
            loadParam:{
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            dateText:'',
            show:true,
            orgNameParam:{
                show:false,
                orgName:'',
                orgid:'',
                orgcode:'',
                leaf:true   //只获取叶子节点
            },
            roleParam:{
                pageSize:100,
                cur:1,
                roles:[]

            }
        }
    },
     vuex: {
        getters:{
            initRoleList
        },
        actions: {
            getRoleList,
            createEmploy
        }
    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
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
        save:function(param){
            console.log('确定');
            var temp = '';
            this.initRoleList.forEach(function(item){
                if(item.checked){
                    temp += item.id + ',';
                }         
            })
            console.log(temp);
            param.privilege = temp.substring(0,temp.length-1);
            console.log(param.privilege);
            this.param.link(param);
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
        if(this.param.privilege!=''&&this.param.privilege!=null){
            this.roleParam.roles = this.param.privilege.split(',');
        }
        this.getRoleList(this.roleParam);
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
.search_input{
    float: none;
}
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.search_input{
    text-indent: 0px;
}
.edit-content h3 {
    font-size: 18px;
    color: #fa6705;
    margin: 0;
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

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
    float: left;
}
.editpageleft{
    border-right:1px solid #ddd; 
}
.editpageleft h4,
.editpageright h4{
    text-indent: 16px;
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
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}
.role{
    margin-right: 10px;
}
.checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}
</style>

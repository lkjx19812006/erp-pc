<template>
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
                     <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                     </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.namelist}}</label>
                                <input type="text" id="username" class="form-control" v-model="param.name" v-validate:username="['required']"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.englist}}</label>
                                <input type="text" id="usertype" class="form-control" v-model="param.ename" v-validate:usertype="['required']" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.job}}</label>
                                <input type="text" id="category" class="form-control" v-model="param.no" v-validate:category="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.parten}}</label>
                                <select class="form-control" v-model="param.orgName" id="userown" v-validate:userown="['required']">
                                    <option v-for="item in initOrgList">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.positionlist}}</label>
                                <input type="text" class="form-control" maxlength="11" v-model="param.position" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.phonelist}}</label>
                                <input type="email" class="form-control" v-model="param.mobile"  />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.nolist}}</label>
                                <input type="text" class="form-control" v-model="param.extNo" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.entry}}</label>
                                <div class="search_input">
                                    <mz-datepicker :time.sync="param.entryDate" format="yyyy-MM-dd HH:mm:ss">
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
                                    <mz-datepicker :time.sync="param.leaveDate" format="yyyy-MM-dd HH:mm:ss">
                                    </mz-datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.orgid}}</label>
                                <select class="form-control" v-model="param.orgId" id="userown" v-validate:userown="['required']">
                                    <option v-for="item in initOrgList">{{item.id}}</option>
                                </select>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>{{param.code}}</label>
                                <select class="form-control" v-model="param.orgCode" id="userown" v-validate:userown="['required']">
                                    <option v-for="item in initOrgList">{{item.code}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{param.statuslist}}</label>
                                 <select class="form-control"  v-model="param.status">
                                     <option value="1">可用</option>
                                     <option value="0">无效</option>
                                 </select>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo col-xs-12">
                                <label>角色</label>
                                <div  class="clerafix">
                                    <div class="pull-left role clerafix" v-for="item in param.role">
                                        <input type="checkbox" class="checkbox_unselect" id="admin" 
                                        v-model="item.checked" @click="checked(item)"/>
                                        <label for="admin">{{item.type}}</label>
                                    </div>
                                    <!-- <div class="pull-left role clerafix">
                                         <input type="checkbox" class="checkbox_unselect" id="client_ids"  value="部门经理" />
                                         <label  for="client_ids">部门经理</label>
                                    </div> -->
                                </div>
                            </div> 
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm"  @click="Employ(param,param.show = false)" value="保存" />
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import calendar from '../calendar/vue.datepicker'
import {
    initOrgList
} from '../../vuex/getters'
import {
    getOrgList,
    createEmploy
} from '../../vuex/actions'
export default {
    components: {
        calendar
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
            show:true
        }
    },
     vuex: {
        getters:{
            initOrgList
        },
        actions: {
            getOrgList,
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
        Employ:function(param){
            var temp = [];
            param.role.forEach(function(item){
                if(item.checked){
                    temp.push(item);
                }         
            })
            param.role = temp;
            this.createEmploy(param)
        },
        checked:function(item){
            if(item.checked){
                item.checked=false;
            }else{
                item.checked=true;
            }
            console.log(item.checked);
        }
    },
    created(){
        this.getOrgList(this.loadParam);
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

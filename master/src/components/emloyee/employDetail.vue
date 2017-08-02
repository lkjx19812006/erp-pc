<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"  @click="param.show=false"></div> 
    <div class="container modal_con modal_overall" v-show="param.show" @click="param.show=false">
        <div class="client-section clearfix" v-cloak>
            <div class="top-title" @click="param.show=false">
                <span class="glyphicon glyphicon-remove-circle"  style="font-size:28px"></span>
            </div>
            <!-- <div  class="section_title clearfix">
                <span style="font-size:18px;color:#FA6705">{{param.name}}</span>
                <button class="new_btn transfer" v-if="$validation.valid" @click="saveSucc(param)">保存</button> 
                <button class="new_btn transfer" v-else disabled="disabled">保存</button> 
            </div> -->
            <div class="col-md-12 col-xs-12" >
                <div class="section_title  col-md-12 col-xs-12 clearfix">
                    <span style="font-size:14px">基本信息</span>
                </div>
                <div @click.stop="">
                    <div class="clearfix col-md-12 col-xs-12" style="padding-top:10px;">
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6" ><label>姓名:</label>{{param.name}}</div>
                        <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6"><label>英文名:</label>{{param.ename}}
                        </div>
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6"><label>工号:</label>{{param.no}}</div>
                        <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6"><label>部门:</label>{{param.orgName}}
                        </div>
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6"><label>职位:</label>{{param.position}}</div>
                        <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6"><label>手机号:</label>{{param.mobile}}
                        </div>
                        <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6"><label>QQ:</label>{{param.qq}}
                        </div>
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6"><label>座机号:</label>{{param.extno}}</div>
                        <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6"><label>是否在职:</label>{{param.leave | leaveTime}}
                        </div>
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6"><label>入职时间:</label>{{param.entrydate}}</div>
                        <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6"><label>离职时间:</label>{{param.leavedate}}
                        </div>
                    </div>
                    <div class="clearfix col-md-11 col-xs-12">
                        <div class="client-detailInfo pull-left col-md-12 col-xs-12">
                            <label class="editlabel">角色</label>
                            <div  class="clerafix">
                                <div class="pull-left role clerafix col-md-3 col-xs-3" v-for="item in initRoleList" >
                                    <input type="checkbox" class="checkbox_unselect"  
                                    v-model="item.checked" />
                                    <label for="admin">{{item.cname}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import filter from '../../filters/filters'
import tipsdialogModel  from '../tipsDialog'
import calendar from '../calendar/vue.datepicker'
import {
    initRoleList
} from '../../vuex/getters'
import {
    getRoleList,
    updateEmploy
} from '../../vuex/actions'
export default {
    components: {
        filter,
        tipsdialogModel,
        calendar
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            tipsParam:{
                show:false,
                name:'修改成功'
            },
            roleParam:{
                pageSize:100,
                cur:1,
                roles:[]

            },
            dateText:''
        }
    },
    props:['param'],
    vuex: {
        getters:{
            initRoleList
        },
       actions:{
            getRoleList,
            updateEmploy
       }
    },
    methods: {
        createDateText() {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let str = `${year}/${month}/${day}`
            this.dateText = str.replace(/\b(\w)\b/g, "0$1")
        },
        saveSucc:function(param){
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
           this.tipsParam.show= true;
           this.updateEmploy(param) 
        },
        checked:function(item){
            if(item.checked){
                item.checked=false;
            }else{
                item.checked=true;
            }
            console.log(item.checked);
        },
    },
    created(){
        if(this.param.privilege!=''&&this.param.privilege!=null){
            this.roleParam.roles = this.param.privilege.split(',');
        }
        this.getRoleList(this.roleParam);
    },
    ready() {
        this.createDateText()
    },
    filter: (filter, {})
}
</script>
<style scoped>
span{
    font-size:12px;
}
label{
    font-size:12px;
}
input{
    font-size:12px;
}
.top-title{
    position: fixed;
    width: 60%;
    margin: auto;
    right: 0;
    left: 0;
    cursor: pointer;
}
.client-detailInfo{
    padding: 5PX;
    font-size: 14px;
}
.client-detailInfo label{
    display: inline-block;
}
.client-detailInfo img {
    width: 100px;
}
.panel-body ul li:last-of-type{
    float: right;
}
.panel-body ul > li:last-of-type {
    float: none;
    position: relative;
}
.panel-collapse{
    background-color: #fff;
}
.panel-group .panel{
    border-radius: 10px;
}
.breed_action {
    top: 33px;
    right: 30px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt {
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}

.contactSet>thead{
    color: #fa6705;
}
.contactSet>tbody>tr>td,.contactSet>thead>tr>th{
    border-bottom: none;
    border-top: none;
    text-align: left;
}
.contact_img{
    margin-right: 6px !important;
}
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}

.edit-left {
    border-right: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
    
    margin-top: 5px;
}

.edit-right {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 5px;
    margin-top: 20px;
}

.mz-datepicker > input {
    font-family: 'Microsoft YaHei', serif;
    color: #666;
    border: 1px solid #d9d9d9;
    height: 30px;
    box-sizing: border-box;
    outline: none;
    padding: 0 30px 0 7px;
    font-size: 15px;
    width: 100%;
    cursor: pointer;
}

.mz-datepicker > i {
    
    height: 36px;
}

</style>

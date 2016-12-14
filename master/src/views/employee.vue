<template>
   <createemp-model :param="createParam" v-if="createParam.show"></createemp-model>
   <detailemp-model :param="changeParam" v-if="changeParam.show"></detailemp-model>
   <searchorg-model :param.sync="orgParam" v-if="orgParam.show"></searchorg-model>
   <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div  class="myemploy">
        <div class="order_search">
            <div class="clear">
                <div class="left my_order_search">
                    <div class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24"  />
                        <input type="text" class="search_input" v-model="loadParam.name"  placeholder="按员工名字搜索" @keyup.enter="loadByCondition()">
                    </div>
                    <div class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" v-model="loadParam.mobile"  placeholder="按员工电话搜索" @keyup.enter="loadByCondition()">
                    </div>
                    <div class="name_search clearfix" style="margin-right:10px;border:none">
                        <button class="new_btn " style="line-height:20px;" @click="rest()">清空条件</button>
                    </div>
                    <div class="name_search clearfix" style="border:none">
                        <button class="new_btn" @click="loadByCondition()">搜索</button>
                    </div>
                </div>
            </div>
            <div class="clear">
                <dl class="clear left">
                  <dt class="left marg_top">是否在职：</dt>
                  <div class="btn-group">
                     <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.leave==1}" @click="selectType(1)">
                        在职
                     </button>
                     <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.leave==0}" @click="selectType(0)">
                        离职
                     </button>
                  </div>
               </dl>
               <div class="right">
                    <button type="button" class="btn btn-primary pull-right transfer" @click="loadByCondition()">刷新</button>
                    <button class="btn btn-default pull-right " @click="newData({
                         title:'新建员工',
                         show:true,
                         name:'',
                         orgid:'',
                         orgcode:'',
                         status:'',
                         ename:'',
                         no:'',
                         orgName:'',
                         position:'',
                         mobile:'',
                         extno:'',
                         level:'',
                         privilege:'',
                         entrydate:'',
                         leavedate:'',
                         namelist:'姓名',
                         englist:'英文名',
                         job:'工号',
                         parten:'部门',
                         code:'部门编码',
                         orgiid:'部门编号',
                         statuslist:'状态',
                         positionlist:'职位',
                         phonelist:'手机',
                         nolist:'分机号',
                         entry:'入职时间',
                         leave:'离职时间',
                         levellist:'职级',
                         link:createEmploy,
                         url:'/employee/',
                         key:'employeeList'
                         })">新建</button>
                </div>
            </div>
        </div>
        <div class="order_table" id="table_box">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
           <table class="table table-hover table_color table-striped"  v-cloak id="tab">
              <thead>
                  <tr>
                     <th>姓名</th>
                     <th>英文名</th>
                     <th>工号</th>
                     <th>部门</th>
                     <th>职位</th>
                     <th>手机号</th>
                     <th>分机号</th>
                     <th>入职时间</th>
                     <th>离职时间</th>
                     <th>职级</th>
                     <th>员工状态</th>
                     <th>编辑</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in initEmployeeList">
                    <td class="underline"  @click="clickOn({
                                 sub:$index,
                                 id:item.id,
                                 show:true,
                                 name:item.name,
                                 ename:item.ename,
                                 no:item.no,
                                 privilege:item.privilege,
                                 orgid:item.orgid,
                                 orgcode:item.orgcode,
                                 leave:item.leave,
                                 orgName:item.orgName,
                                 position:item.position,
                                 mobile:item.mobile,
                                 extno:item.extno,
                                 level:item.level,
                                 entrydate:item.entrydate,
                                 leavedate:item.leavedate,
                                 link:updateEmploy,
                                 url:'/employee/',
                                 key:'employeeList'
                                })">{{item.name}}</td>
                    <td>{{item.ename}}</td>
                    <td>{{item.no}}</td>
                    <td>{{item.orgName}}</td>
                    <td>{{item.position}}</td>
                    <td>{{item.mobile}}</td>
                    <td>{{item.extno}}</td>
                    <td>{{item.entrydate | date}}</td>
                    <td>{{item.leavedate | date}}</td>
                    <td>{{item.level | levelstate}}</td>
                    <td>
                        <div v-if="item.leave==0">离职</div>
                        <div v-if="item.leave==1">在职</div>
                        <div v-if="item.leave!=1&&item.leave!=0">在职</div>  
                    </td>
                    <td @click="modify({
                                 title:'编辑员工',
                                 sub:$index,
                                 id:item.id,
                                 show:true,
                                 name:item.name,
                                 ename:item.ename,
                                 no:item.no,
                                 privilege:item.privilege,
                                 orgid:item.orgid,
                                 orgcode:item.orgcode,
                                 leave:item.leave,
                                 orgName:item.orgName,
                                 position:item.position,
                                 mobile:item.mobile,
                                 extno:item.extno,
                                 level:item.level,
                                 entrydate:item.entrydate,
                                 leavedate:item.leavedate,
                                 namelist:'姓名',
                                 englist:'英文名',
                                 job:'工号',
                                 parten:'部门',
                                 positionlist:'职位',
                                 phonelist:'手机',
                                 nolist:'分机号',
                                 code:'部门编码',
                                 orgiid:'部门编号',
                                 statuslist:'状态',
                                 entry:'入职时间',
                                 leaveTime:'离职时间',
                                 levellist:'职级',
                                 link:updateEmploy,
                                 url:'/employee/',
                                 key:'employeeList',
                                })">
                        <a class="operate"><img src="/static/images/edit.png" height="18" width="30" alt="编辑" title="编辑"/></a>
                    </td>
                  </tr>
                </tbody>
              </table>
        </div>
         <div class="order_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
</template>
<script>
import createempModel  from  '../components/emloyee/createEmploy'
import pagination from '../components/pagination'
import filter from '../filters/filters'
import detailempModel  from '../components/emloyee/employDetail'
import searchorgModel  from '../components/emloyee/searchorg'
import common from '../common/common'
import changeMenu from '../components/tools/tabs/tabs.js'
import tipsdialogModel from '../components/tips/tipDialog'
import {
   getList,
   initEmployeeList,
   initOrgList
} from '../vuex/getters'
import {
    getEmployeeList,
    updateEmploy,
    createEmploy,
    getOrgList
} from '../vuex/actions'
export default {
    components:{
        pagination,
        createempModel,
        detailempModel,
        searchorgModel,
        tipsdialogModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                list: true,   //部门以列表的形式展现(只展示叶子节点),
                cur: 1,
                all: 7,
                name:'',
                mobile:'',
                orgId:'',
                orgCode:'',
                leave:1,
                total:0
            },
            createParam:{
                show:false
            },
            changeParam:{
                show:false
            },
            deleteParam:{
                show:false
            },
            tipsParam:{
                show:false,
                alert:true,
                name:"",
            },
            orgParam:{
                show:false,
                orgid:'',
                orgName:'',
                orgcode:'',
                all:true      //表示获取所有部门信息，而不是只有叶子信息
            }
        }
    },

    methods:{
        editData:function(sub,param){
            if(this.$store.state.table.basicBaseList[param.concrete][sub].show){
                this.$store.state.table.basicBaseList[param.concrete][sub].show= !this.$store.state.table.basicBaseList[param.concrete][sub].show;
            }else{
                this.$store.state.table.basicBaseList[param.concrete][sub].show = true;
            }
        },
        selectType:function(leave){
            console.log(leave)
            this.loadParam.leave = leave;
            this.getEmployeeList(this.loadParam);
        },
        newData:function(initEmployeeList){
            this.createParam=initEmployeeList;
            this.createParam.callback = this.callback;
        },
        callback:function(title){
            this.tipsParam.show = true;
            this.tipsParam.name=title;
            this.tipsParam.alert=true;
        },
        modify:function(initEmployeeList){
            this.createParam=initEmployeeList;
            this.createParam.callback = this.callback;
        },
        clickOn: function(initEmployeeList) {
            this.changeParam = initEmployeeList;
        },
        loadByCondition:function(){
            this.getEmployeeList(this.loadParam);
        },
        rest:function(){
            this.loadParam.name = '';
            this.loadParam.mobile = '';
            this.loadParam.orgId = '';
            this.loadParam.orgName = '';
            this.loadParam.orgCode = '';
            this.getEmployeeList(this.loadParam);
        },
        searchOrg:function(){
            this.orgParam.show = true;
        }
    },
    vuex: {
        getters: {
           getList,
           initEmployeeList,
           initOrgList
        },
        actions: {
            getEmployeeList,
            updateEmploy,
            createEmploy,
            getOrgList
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmployeeList(this.loadParam);
        },
        org:function(org){
            this.loadParam.orgName = org.orgName;
            this.loadParam.orgCode = org.orgcode;
        }
    },
    ready(){
      common('tab','table_box',1);
    },
    created() {
        /*if (this.$route.query.id > this.getList[7].subcategory.length || isNaN(this.$route.query.id)||!this.$route.query.id) {
            this.$route.query.id = 0;
        }*/
        changeMenu(this.$store.state.table.isTop,this.getEmployeeList,this.loadParam,localStorage.employeeParam); 
        
        this.getOrgList(this.loadParam);
    },
    filter:(filter,{})
}
</script>
<style scoped>

.myemploy {
    width: 100%;
    white-space: nowrap;
}
.order_search {
    padding: 35px 30px 0 40px;
}
.transfer{
    margin-left: 18px;
}

.name_search{
    position: relative;
    display: inline-block;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
}

.tel_search {
    margin-right: 0;
}
.name_search > .new_btn{
    height: 30px;
    padding: 0 10px;
}

.order_table {
    margin-top: 0px;
    position: relative;
}

.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}
.order_pagination{
    margin: 0 auto;
    text-align: center;
}

.base_pagination{
    margin: auto;
    text-align: center;
}
.cover_loading{
   text-align: center;
   position: absolute;
   top: 40%;
   z-index: 1100;
   left: 0;
   right: 0
}
 #table_box  table th,#table_box  table td{
    width: 141px;
    min-width: 141px;
}
</style>

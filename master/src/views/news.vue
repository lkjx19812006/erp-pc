<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
    <personalauth-model :param="personalParam" v-if="personalParam.show"></personalauth-model>
    <companyauth-model :param="companyParam" v-if="companyParam.show"></companyauth-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <search-model :param.sync="searchParam" v-if="searchParam.show"></search-model>

     <div  v-show="!changeParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">会员</div>
            
           <!--  <div class="col-xs-6 my_order_search">
               <div class="name_search clearfix">
                   <img src="/static/images/search.png" height="24" width="20">
                   <input type="text" class="search_input" v-model="loadParam.fullname" @keyup.enter="loadByCondition()" placeholder="按名字搜索">
               </div>
               <div class="ordertel_search clearfix">
                   <img src="/static/images/search.png" height="24" width="20">
                   <input type="text" class="search_input" v-model="loadParam.phone" @keyup.enter="loadByCondition()" placeholder="按手机号搜索">
               </div>
               <div class="name_search clearfix"> 
                   <img src="/static/images/search.png" height="24" width="20">
                   <input type="text" class="search_input" v-model="loadParam.audit" @keyup.enter="loadByCondition()" placeholder="按审核状态搜索">
               </div>
               <div class="name_search clearfix"> 
                   <div>
                       开始时间:
                       <mz-datepicker :time.sync="loadParam.startCtime" format="yyyy/MM/dd HH:mm:ss">
                       </mz-datepicker>
                   </div>
               </div> 
               <div class="name_search clearfix"> 
                   
                   <div>
                   结束时间:
                       <mz-datepicker :time.sync="loadParam.endCtime" format="yyyy/MM/dd HH:mm:ss">
                       </mz-datepicker>
                   </div>
               </div> 
                
           </div>
           <div class="right col-xs-1">
               <button type="button" class="btn btn-default" height="24" width="24" @click="resetTime()">清空时间</button>
               <button type="button" class="btn btn-default" height="24" width="24" @click="loadByCondition()">查询</button>
           </div> -->
            <div class="right col-xs-1">
                <button type="button" class="btn btn-default" height="24" width="24" @click="search()">查询</button>
            </div>
            
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak>
                <thead>
                    <tr>
                        <th></th>
                        <th>姓名</th>
                        <th>昵称</th>
                        <th>手机</th>
                        <th>归属地</th>
                        <th>邮箱</th>
                        <th>qq</th>
                        <th>公司</th>
                        <th>主营业务员</th>
                        <!-- <th>会员状态</th> -->
                        <th>来源</th>
                        <th>客户类型</th>
                        <th>审核状态</th>
                        <th>划转状态</th>
                        <th>备注</th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-for="item in initUserList"  >
                        <td  @click.stop="">
                            <label  class="checkbox_unselect"v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)" ></label>
                        </td>
                        <td class="underline" @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true
                                })">{{item.fullname}}</td>
                        <td>{{item.nickname}}</td>
                        <td>{{item.phone}}</td>
                        <td>暂无</td>
                        <td>{{item.email}}</td>
                        <td>{{item.qq}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.employee}}</td>
                        <td v-if="item.source==0" style="color:red">{{item.sourceType}}</td>
                        <td v-if="item.source==1" style="color:green">{{item.sourceType}}</td>
                        <td v-if="item.source==2" style="color:blue">{{item.sourceType}}</td>
                        <td v-if="item.source==3" style="color:#444444 ">{{item.sourceType}}</td>
                        <td>{{item.bizTypeName}}</td>
                        <td>{{item.auditResult}}</td>
                        <td>暂无</td>
                        <td>{{item.comment}}</td>
                        
                        <td @click.stop="eventClick($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show="item.show">
                                <ul>
                                    <li @click="modifyUser({
                                                id:item.id,
                                                show:true,
                                                name:item.name,
                                                nickname:item.nickname,
                                                fullname:item.fullname,
                                                type:item.type,
                                                phone:item.phone,
                                                email:item.email,
                                                qq:item.qq,
                                                index:$index,
                                                company:item.company,
                                                comment:item.comment,
                                                link:alertInfo,
                                                url:'/user/',
                                                key:'userList'
                                                },item.show=false)">编辑</li>
                                    <li @click="userToClient({
                                                id:item.id,
                                                main:item.main,
                                                phone:item.phone,
                                                tel:item.tel,
                                                email:item.email,
                                                qq:item.qq,
                                                type:item.type,
                                                fullname:item.fullname,
                                                employeeId:item.employeeId,
                                                customerId:item.customerId,  
                                                orgId:'',
                                                status:item.status,                          
                                                show:true,
                                                link:deleteInfo,
                                                url:'/user/',
                                                key:'userList'
                                                },item.show=false)">划转</li>
                                    <li @click="createIntention(item.show=false)">意向</li>
                                    <li v-if="item.utype==1" @click="personalAuth({id:item.id,index:$index,ucomment:item.ucomment,utype:1},item.show=false)">个人认证</li>
                                    <li v-if="item.ctype==1" @click="companyAuth({id:item.id,index:$index,ccomment:item.ccomment,ctype:1},item.show=false)">企业认证</li>
                                </ul>
                            </div>
                        </td>

                        
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
    
</template>

<script>
import calendar from '../components/calendar/vue.datepicker'
import createModel  from '../components/user/userCreate'
import alterinfoModel  from '../components/user/userUpdate'
import transferModel  from '../components/user/userTransfer'
import detailModel from '../components/user/userDetail'
import searchModel from '../components/user/userSearch'
import intentionModel from  '../components/user/userIntention'
import personalauthModel from '../components/user/personalAuth'
import companyauthModel from '../components/user/companyAuth'
import pagination from '../components/pagination'
import {
    getCount,
    initUserList,
    initUserDetail,
   
} from '../vuex/getters'
import {
    getUserList,
    getUserDetail,
  
} from '../vuex/actions'


export default {
    //props: ['param'],
    components: {   
        pagination,
        calendar,
        createModel,
        alterinfoModel,
        transferModel,
        detailModel,
        searchModel,
        intentionModel,
        personalauthModel,
        companyauthModel,

       
    },
	 data() {
        return {
            list: {all:8,cur:1},
            loadParam: {
                loading: true,
                fullname: '',
                phone: '',
                status: '',
                startCtime: '',
                endCtime: '',
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            createParam:{
                show:false
            },
            alterParam:{
                show:false,
                id:'',
                name:''
            },
            transferParam:{
                show:false,
                id:'',
                name:''
            },
            changeParam:{
                show:false
            },
            searchParam:{
                show:false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                fullname:'',
                source:'',
                busiType:'',
                phone:'',
                startCtime:'',
                endCtime:'',
                audit:'',

            },
         intentionParam:{
            show:false,
            fullname:this.initUserDetail.fullname,
            id:this.initUserDetail.id,
            phone:this.initUserDetail.phone,
            url:'/intention/'


        },
            personalParam:{

                show:false,
                utype:1
            },
            companyParam:{
                show:false,
                ctype:1
            },
        
        }
    },
    vuex: {
        getters: {
            // note that you're passing the function itself, and not the value 'getCount()'
            counterValue: getCount,
            initUserList,
            initUserDetail,
                
        },
        actions: {
            getUserList,
            getUserDetail,
            
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getUserList(this.loadParam);
        }
      },
  methods: {
    clickOn: function(item) {
        this.changeParam = item;
        this.getUserDetail(this.changeParam);
    },
    eventClick:function(id){
            if(this.$store.state.table.basicBaseList.userList[id].show){
                this.$store.state.table.basicBaseList.userList[id].show = !this.$store.state.table.basicBaseList.userList[id].show;
            }else{
                this.$store.state.table.basicBaseList.userList[id].show=true;
            }   
        },

    /*loadByName(){
        console.log('name');
            this.loadParam.phone = '';
            this.loadParam.audit = '';
            this.getUserList(this.loadParam);
    },
    loadByPhone(){
            console.log('phone');
            this.loadParam.fullname = '';
            this.loadParam.audit = '';
            console.log(this.loadParam);
            this.getUserList(this.loadParam);
    },
    loadByAudit(){
            console.log('audit');
            console.log(this.loadParam);
            this.loadParam.phone = '';
            this.loadParam.fullname = '';
            this.getUserList(this.loadParam);
    },*/
    resetTime:function(){
        this.loadParam.startCtime = '';
        this.loadParam.endCtime = '';
    },
    loadByCondition:function(){
        this.getUserList(this.loadParam);
    },
    search:function(){
        this.searchParam.show = true;
    },
    createUser:function(value){
        console.log('createUser');
            this.createParam.show=true;
            //this.createParam.name=value;
        },

    clientTransfer:function(value){
        this.transferParam.show=true;
        this.transferParam.name=value;
    },
    modifyUser:function(item){
        this.alterParam = item;
    },
    userToClient:function(item){
        this.transferParam = item;
    },
    createIntention:function(){
        this.intentionParam.show = true;
    },
    personalAuth:function(item){
        
        this.personalParam.show = true;
        this.personalParam.id = item.id;
        this.personalParam.index = item.index;
        this.personalParam.ucomment = item.ucomment;
        this.personalParam.utype = item.utype;
    
    },
    companyAuth:function(item){
        this.companyParam.show = true;
        this.companyParam.id = item.id;
        this.companyParam.index = item.index;
        this.companyParam.ccomment = item.ccomment;
        this.companyParam.ctype = item.ctype;
    }

  },
  created() { 
        this.getUserList(this.loadParam);
  }
 
  
}

</script>

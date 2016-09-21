<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>

    
     <div  v-show="!changeParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">会员</div>
            
            <div class="col-xs-6 my_order_search">
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
                    <input type="text" class="search_input" v-model="loadParam.audit" @keyup.enter="loadByCondition()" placeholder="按状态搜索">
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
            </div>
            <div class="right col-xs-1">
                
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
                        <th>电话</th>
                        <th>邮箱</th>
                        <th>qq</th>
                        <th>公司</th>
                        <th>积分</th>
                        <!-- <th>会员状态</th> -->
                        <th>来源</th>
                        <th>客户类型</th>
                        <th>审核状态</th>
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
                        <td>{{item.email}}</td>
                        <td>{{item.qq}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.score}}</td>
                        <td>{{item.sourceType}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.auditResult}}</td>
                        <td>暂无备注</td>
                        
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
                                    <li @click="changce(item.show=false)">机会</li>
                                    <li @click="personalAuth(item.show=false)">个人认证</li>
                                    <li @click="companyAuth(item.show=false)">企业认证</li>
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
import pagination from '../components/pagination'
import {
    getCount,
    initUserList,
    initUserDetail
} from '../vuex/getters'
import {
    getUserList,
    getUserDetail  
} from '../vuex/actions'


export default {
    props: ['param'],
    components: {   
        pagination,
        calendar,
        createModel,
        alterinfoModel,
        transferModel,
        detailModel,


       
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
            }

        }
    },
    vuex: {
        getters: {
            // note that you're passing the function itself, and not the value 'getCount()'
            counterValue: getCount,
            initUserList,
            initUserDetail         
        },
        actions: {
            getUserList,
            getUserDetail
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
    resetTime(){
        this.loadParam.startCtime = '';
        this.loadParam.endCtime = '';
    },
    loadByCondition(){
        this.getUserList(this.loadParam);
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
    changce:function(){

    },
    personalAuth(){

    },
    companyAuth(){

    }

  },
  created() { 
        this.getUserList(this.loadParam);
  }
 
  
}

</script>

<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    
     <div  v-show="!changeParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">会员</div>
            <div class="col-xs-8 my_order_search">
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24"  @click="loadByName()">
                    <input type="text" class="search_input" v-model="loadParam.fullname" @keyup.enter="loadByName()" placeholder="按名字搜索">
                </div>
                <div class="ordertel_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24" @click="loadByPhone()">
                    <input type="text" class="search_input" v-model="loadParam.phone" @keyup.enter="loadByPhone()" placeholder="按手机号搜索">
                </div>
                <div class="name_search clearfix"> 
                    <img src="/static/images/search.png" height="24" width="24" @click="loadByStatus()">
                    <input type="text" class="search_input" v-model="loadParam.status" @keyup.enter="loadByStatus()" placeholder="按状态搜索">
                </div>
            </div>
            <div class="right col-xs-2">
                <!-- <button class="new_btn transfer" @click="clientTransfer('transfer')">划转</button> -->
                 <!-- <button class="new_btn" @click="createUser('create')">新建</button>  -->
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
                        <th>会员状态</th>
                        <th>来源</th>
                        <th>客户类型</th>
                        <th>审核状态</th>
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
                                show:true,
                                link:alterInfo,
                                url:'/customer/',
                                key:'customerList'
                                                })">{{item.fullname}}</td>
                        <td>{{item.nickname}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.qq}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.score}}</td>
                        <td>
                            <div v-if="item.status==0">普通会员</div>
                            <div v-if="item.status==1">客户</div>
                            <div v-if="item.status==2">拉黑</div>
                        </td>
                        <td><div v-if="item.source==0">PC</div>
                            <div v-if="item.source==1">安卓</div>
                            <div v-if="item.source==2">微信</div>
                            <div v-if="item.source==3">IOS</div>
                        </td>
                        <td>{{item.utype}}</td>
                        <td>暂无字段</td>
                        
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
import createModel  from '../components/user/userCreate'
import alterinfoModel  from '../components/user/userUpdate'
import transferModel  from '../components/user/userTransfer'
import detailModel from '../components/user/userDetail'
import pagination from '../components/pagination'
import {
    getCount,
    initUserList
} from '../vuex/getters'
import {
    getUserList  
} from '../vuex/actions'


export default {
    props: ['param'],
    components: {   
        pagination,
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
            initUserList           
        },
        actions: {
            getUserList,
           
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
        console.log('jdakljd');
            this.changeParam = item;
            //this.userDetail(this.changeParam);
        },
    eventClick:function(id){
            if(this.$store.state.table.basicBaseList.userList[id].show){
                this.$store.state.table.basicBaseList.userList[id].show = !this.$store.state.table.basicBaseList.userList[id].show;
            }else{
                this.$store.state.table.basicBaseList.userList[id].show=true;
            }   
        },
    loadByName(){
        console.log('name');
            this.loadParam.phone = '';
            this.loadParam.status = '';
            this.getUserList(this.loadParam);
    },
    loadByPhone(){
        console.log('phone');
            this.loadParam.fullname = '';
            this.loadParam.status = '';
            console.log(this.loadParam);
            this.getUserList(this.loadParam);
    },
    loadByStatus(){
        console.log('status');
            this.loadParam.phone = '';
            this.loadParam.fullname = '';
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

    }


  },
  created() { 
        this.getUserList(this.loadParam);
  }
 
  
}

</script>

<template>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>

    <div>
        <h3>Count is {{ counterValue }}</h3>
    </div>

     <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">会员</div>
            <div class="col-xs-8 my_order_search">
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按品种类别搜索">
                </div>
                <div class="ordertel_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="按客户名称搜索">
                </div>
            </div>
            <div class="right col-xs-2">
                <button class="new_btn transfer" @click="clientTransfer('transfer')">划转</button>
                <button class="new_btn" @click="createCustomer('create')">新建</button>
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
                        <th>会员类型</th>
                        <th>最后登录时间</th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" @click="checkedAll()" ></label>
                        </td>
                        <td>全选</td>
                    </tr>
                    <tr v-for="item in initUserList"  @click="clickOn(item.id)">
                        <td  @click.stop="">
                            <label  class="checkbox_unselect"v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)" ></label>
                        </td>
                        <td>{{item.fullname}}</td>
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
                        <td>{{item.lastLoginTime}}</td>
                        <td><button v-if="item.status==0" type="button" class="btn btn-default btn-close" @click="userToClient({
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
                                                status:item.status,                          
                                                show:true,
                                                link:deleteInfo,
                                                url:'/user/',
                                                key:'userList'
                                                },item.show=false)">划转</button></td>
                        
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
                                                principal:item.principal,
                                                bizScope:item.bizScope,
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
                                                status:item.status,                          
                                                show:true,
                                                link:deleteInfo,
                                                url:'/user/',
                                                key:'userList'
                                                },item.show=false)">划转</li>
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
    <pagination :combination="list"></pagination>
</template>

<script>
import alterinfoModel  from '../components/user/userUpdate'
import transferModel  from '../components/user/userTransfer'
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
        alterinfoModel,
        transferModel
       
    },
	 data() {
        return {
            list: {all:8,cur:1},
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
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
     console.log(input);
    }
  },
  methods: {
    eventClick:function(id){
            if(this.$store.state.table.basicBaseList.userList[id].show){
                this.$store.state.table.basicBaseList.userList[id].show = !this.$store.state.table.basicBaseList.userList[id].show;
            }else{
                this.$store.state.table.basicBaseList.userList[id].show=true;
            }   
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
        
        
    }

  },
  created() { 
        this.getUserList(this.loadParam, this.loadParam.all);
        console.log(this.initUserList);
  }
 
  
}

</script>

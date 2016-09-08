<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <alterInfo-model :param="alterParam" v-if="alterParam.show"></alterInfo-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <div v-show="!changeParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">客户</div>
            <div class="col-xs-8 my_order_search">
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按品种类别搜索">
                </div>
                <div class="ordertel_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="按客户名称搜索" v-on:keyup="categoryNameSearch(loadParam.name)">
                </div>
            </div>
            <div class="right col-xs-2">
                <button class="new_btn transfer">划转</button>
                <button class="new_btn" @click="createCustomer('create')">新建</button>
            </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped" v-cloak>
                <thead>
                    <tr>
                        <th></th>
                        <th>类型</th>
                        <th>名称</th>
                        <th>分类码</th>
                        <th>负责人</th>
                        <th>经营范围</th>
                        <th>电话</th>
                        <th>邮箱</th>
                        <th>所在省</th>
                        <th>所在市</th>
                        <th>注册地址</th>
                        <th>业务员ID</th>
                        <th>信用等级</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="checkbox" id="checkbox_a1" class="chk"/> 
                            <label for="checkbox_a1" class="checkbox" @click="checkedAll()"></label> 
                        </td>
                        <td>全选</td>
                    </tr>
                    <tr v-for="item in initCustomerlist" @click="clickOn(item.id)">
                        <td  @click.stop="">
                            <input type="checkbox" id="checkbox+'{{item.id}}'" class="chk" /> 
                            <label for="checkbox+'{{item.id}}'" class="checkbox"></label> 
                        </td>
                        <td>{{item.type}}</td>
                        <th>{{item.name}}</th>
                        <td>{{item.category}}</td>
                        <td>{{item.principal}}</td>
                        <td>{{item.biz_scope}}</td>
                        <td>{{item.tel}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.employee_id}}</td>
                        <td>{{item.credit_level}}</td>
                        <td @click.stop="eventClick($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show="item.show">
                                <ul>
                                    <li @click="modifyClient({
                                                id:item.id,
                                                show:true,
                                                name:item.name,
                                                type:item.type,
                                                category:item.category,
                                                principal:item.principal,
                                                biz_scope:item.biz_scope,
                                                tel:item.tel,
                                                email:item.email,
                                                province:item.province,
                                                city:item.city,
                                                address:item.address,
                                                employee_id:item.employee_id,
                                                credit_level:item.credit_level,
                                                link:alterInfo,
                                                url:'/customer/',
                                                key:'customerList'
                                                },item.show=false)">编辑</li>
                                    <li @click="specDelete({
                                                id:item.id,
                                                show:true,
                                                name:item.name,
                                                title:'客户',
                                                link:deleteInfo,
                                                url:'/customer/',
                                                key:'customerList'
                                                },item.show=false)">删除</li>
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
import pagination from '../components/pagination'
import pressImage from '../components/imagePress'
import detailModel from '../components/clientRelate/clientDetail'
import createModel from '../components/clientRelate/clientCreate'
import deletebreedModel from '../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel  from '../components/clientRelate/clientUpdate'
import {
    initCustomerlist
} from '../vuex/getters'
import {
    getClientList,
    deleteInfo,
    alterInfo,
    getClientDetail
} from '../vuex/actions'

export default {
    components: {   
        pagination,
        pressImage,
        detailModel,
        createModel,
        deletebreedModel,
        alterinfoModel
    },
    vuex: {
        getters: {
            initCustomerlist
        },
        actions: {
            getClientList,
            deleteInfo,
            alterInfo,
            getClientDetail
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            changeParam: {
                show: false,
                id: ''
            },
            createParam:{
                show: false,
                name:''
            },
            deleteParam:{
                show:false
            },
            alterParam:{
                show:false,
                id:''
            }
        }
    },
    methods: {
        clickOn: function(id) {
            this.changeParam.show = true;
            this.getClientDetail(this.changeParam);
        },
        createCustomer:function(value){
            this.createParam.show=true;
            this.createParam.name=value;
        },
        eventClick:function(id){
            if(this.$store.state.table.basicBaseList.customerList[id].show){
                this.$store.state.table.basicBaseList.customerList[id].show = !this.$store.state.table.basicBaseList.customerList[id].show;
            }else{
                this.$store.state.table.basicBaseList.customerList[id].show=true;
            }   
        },
        specDelete:function(initCustomerlist){
            this.deleteParam = initCustomerlist;
        },
        modifyClient:function(initCustomerlist){
            this.alterParam =initCustomerlist;
        }
        /*checkedAll: function() {
            var _this = this;
            console.log(_this.checkboxModel);
            if (this.checked) {//实现反选
              _this.checkboxModel = [];
            }else{//实现全选
              _this.checkboxModel = [];
              _this.checkboxData.forEach(function(item) {
                _this.checkboxModel.push(item.id);
              });
            }
          }*/
    },
    created() {
        this.getClientList(this.loadParam, this.loadParam.all);
    }

}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-left: 18px;
}
.chk{
    display: none;
}
.checkbox, .radio{
    margin: 0;
}
.chk + .checkbox { 
    background-color: #FFF; 
    border: 1px solid #C1CACA;   
    border-radius: 3px; 
    -webkit-border-radius: 3px; 
    -moz-border-radius: 3px; 
    -ms-border-radius: 3px; 
    display: inline-block; 
    position: relative; 
    width: 18px;
    height: 18px;
} 

.chk + .checkbox:active { 
    border-color: #fa6705;
    border: 1px solid #C1CACA;
} 
 
.chk:checked + .checkbox { 
    border: 1px solid #fa6705; 
    color: #243441; 
} 
 
.chk:checked + .checkbox:after { 
    content: '\2714';
    position: absolute; 
    top: 0px; 
    left: -1px; 
    color: #fa6705;
    border-radius: 3px; 
    -webkit-border-radius: 3px; 
    -moz-border-radius: 3px; 
    -ms-border-radius: 3px;  
    width: 100%; 
    text-align: center; 
    font-size: 12px; 
    padding: 0px 0 0 0; 
    vertical-align: text-top; 
     width: 18px;
    height: 18px;
} 
</style>

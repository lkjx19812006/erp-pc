<template>
    <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <update-model :param="updateParam" v-if="updateParam.show"></update-model>
    <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <div v-show="!detailParam.show">
        <div class="myOrder">
            <div class="order_search">
                <div class="clear">
                    <div class="my_order col-xs-2">我的订单</div>
                    <div class="right">
                        <button class="new_btn" @click="newOrder({
                            show:true,
                            title1:'新建订单',
                            type:'',
                            sourceType:'',
                            sample:'',
                            intl:'',
                            customer:'',
                            currency:'',
                            consignee:'',
                            consigneePhone:'',
                            zipCode:'',
                            country:'',
                            province:'',
                            city:'',
                            district:'',
                            consigneeAddr:'',
                            comments:'',
                            incidentals:'',
                            incidentalsDesc:'',
                            preferential:'',
                            preferentialDesc:'',
                            goods:[{
                                    sourceType:'',
                                    sourceId:'',
                                    title:'',
                                    breedId:'',
                                    brredName:'',
                                    quality:'',
                                    location:'',
                                    spec:'',
                                    price:'',
                                    unit:'',
                                    number:''
                                }],
                            key:'orderList',
                            link:createOrder
                            })">新建</button>
                        <button class="new_btn transfer" @click="createSearch()">搜索</button>
                    </div>
                </div>
            </div>
        </div>
            <div class="order_table">
                <table class="table table-hover table_color table-striped " v-cloak>
                    <thead>
                        <tr>  
                            <th>订单号</th>
                            <th>订单类别</th>
                            <th>订单来源</th>
                            <th>收货人名称</th>
                            <th>收货人电话</th>
                            <th>收货人地址</th>
                            <th>国家</th>
                            <th>所在省</th>
                            <th>所在市</th>
                            <th>业务员</th>
                            <th>物流单号</th>
                            <th>备注</th>
                            <th>客户端类型</th>
                            <th>订单状态</th>
                            <th>审核状态</th>
                            <th>支付方式</th>
                            <th>支付状态</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initOrderlist"  v-cloak>
                          <td><a @click="clickOn({
                                        show:true,
                                        id:item.id,
                                        loading:false
                                })">{{item.no }}</a></td>
                          <td>{{item.type}}</td>
                          <td>{{item.sourceType}}</td>
                          <td>{{item.consignee}}</td>
                          <td>{{item.consigneePhone}}</td>
                          <td>{{item.consigneeAddr}}</td>
                          <td>{{item.country}}</td>
                          <td>{{item.province}}</td>
                          <td>{{item.city}}</td>
                          <td>{{item.employee}}</td>
                          <td>{{item.logisticsNo}}</td>
                          <td>{{item.comments}}</td>
                          <td v-if="item.clients==0||item.clients==null" style="background:red;color:#fff">{{item.clients}}</td>
                          <td v-if="item.clients==1" style="background:green;color:#fff">{{item.clients}}</td>
                          <td v-if="item.clients==2" style="background:blue;color:#fff">{{item.clients}}</td>
                          <td v-if="item.clients==3" style="background:#444444;color:#fff">{{item.clients}}</td>
                          <td>{{item.orderStatus}}</td>
                          <td>{{item.status}}</td>
                          <td>{{item.payWay}}</td>
                          <td>{{item.pay}}</td>
                          <td @click="editClick($index)">
                              <img height="24" width="24" src="/static/images/default_arrow.png" />
                              <div class="component_action" v-show="item.show">
                                   <ul>
                                       <li @click="updateOrder({
                                                sub:$index,
                                                id:item.id,
                                                show:true,
                                                title1:'修改订单',
                                                type:item.type,
                                                sourceType:item.sourceType,
                                                sample:item.sample,
                                                intl:item.intl,
                                                customer:item.customer,
                                                currency:item.currency,
                                                consignee:item.consignee,
                                                consigneePhone:item.consigneePhone,
                                                zipCode:item.zipCode,
                                                country:item.country,
                                                province:item.province,
                                                city:item.city,
                                                district:item.district,
                                                consigneeAddr:item.consigneeAddr,
                                                comments:item.comments,
                                                incidentals:item.incidentals,
                                                incidentalsDesc:item.incidentalsDesc,
                                                preferential:item.preferential,
                                                preferentialDesc:item.preferentialDesc,
                                                goods:[{
                                                        sourceType:item.sourceType,
                                                        sourceId:item.sourceId,
                                                        title:item.title,
                                                        breedId:item.breedId,
                                                        brredName:item.brredName,
                                                        quality:item.quality,
                                                        location:item.location,
                                                        spec:item.spec,
                                                        price:item.price,
                                                        unit:item.unit,
                                                        number:item.number
                                                    }],
                                                key:'orderList',
                                                link:alterOrder,
                                                url:'/order/'
                                                })">编辑</li>
                                       <li @click="specDelete({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.no,
                                                title:'订单',
                                                link:deleteInfo,
                                                url:'/order/',
                                                key:'orderList'
                                                })">删除</li>
                                   </ul>
                               </div>
                          </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="order_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>   
</template>
<script>
import pagination from '../components/pagination'
import editorderModel from '../components/order/orderInformationDialog'
import updateModel from '../components/order/orderUpdate'
import detailModel from '../components/order/orderDetail'
import searchModel from '../components/order/orderSearch'
import deletebreedModel from  '../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import {
    getList,
    initOrderlist
} from '../vuex/getters'
import {
    getOrderList,
    deleteInfo,
    alterOrder,
    createOrder
} from '../vuex/actions'

export default {
    components: {
        editorderModel,
        pagination,
        updateModel,
        detailModel,
        searchModel,
        deletebreedModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                show:false,
                cur: 1,
                all: 7,
                consignee:'',
                consigneePhone:'',
                type:'',
                orderStatus:'',
                payWay:'',
                clients:'',
                dataStatus:''
            },
            dialogParam:{
                show: false
            },
            updateParam: {
                show:false,   
            },
            detailParam: {
                show:false
            },
            deleteParam:{
                show:false
            },
            updateorderParam:{
                show:false
            },
            show:true
        }
    },
    vuex: {
        getters: {
            getList,
            initOrderlist
        },
        actions: {
            getOrderList,
            deleteInfo,
            alterOrder,
            createOrder
        }
    },
    created() {
        this.getOrderList(this.loadParam);
        if (this.$route.query.id > this.getList[6].subcategory.length || isNaN(this.$route.query.id)) {
            this.$route.query.id = 0;
        }
    },
    methods: {
        editClick: function(sub) {
            if(this.$store.state.table.basicBaseList.orderList[sub].show){
                this.$store.state.table.basicBaseList.orderList[sub].show=!this.$store.state.table.basicBaseList.orderList[sub].show;
            }else{
                 this.$store.state.table.basicBaseList.orderList[sub].show=true;
            }    
        },
        newOrder:function(initOrderlist){
             this.dialogParam=initOrderlist;
        },
        createSearch:function(){
             this.loadParam.show=true;
             this.loadParam.loading=false;
        },
        clickOn:function(initOrderlist){
            console.log(initOrderlist);
            this.detailParam=initOrderlist;
        },
        specDelete:function(initOrderlist){
            this.deleteParam = initOrderlist;
        },
        updateOrder:function(initOrderlist){
            this.dialogParam=initOrderlist;
        }
    },
     route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
      }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOrderList(this.loadParam);
        }
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}
.order_search {
    padding: 25px 30px 0 40px;
}
.my_order {
    float: left;
    color: #fa6705;
    font-size: 20px;
    padding: 0;
}
.transfer{
    margin-right: 20px;
}
.new_btn {
    float: right;
    border: 1px solid #ccc;
    color: #003077;
    padding: 4px 10px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    background: #fff;
}
.order_table {
    margin-top: 20px;
    position: relative;
}

.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    border-top: 1px solid #ddd;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}

.order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 11.1%;
    display: table-cell;
}

.order_table .table > ul >li a {
    color: #003077;
}

.order_table .table_hover > ul:hover {
    background: #f5f5f5;
}

.order_table .table > ul >li img {
    margin: auto;
}

.order_action {
    position: absolute;
    right: 97px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
}

.order_show {
    position: absolute;
    right: 20px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
    display: block;
}

.order_action ul,
.order_show ul {
    margin-bottom: 0;
}

.order_action ul li a,
.order_show ul li a {
    color: #003077;
    padding: 5px 5px 5px 10px;
    display: block;
}

.expand-transition {
    transition: all .3s ease;
    overflow: inherit;
}

.expand-enter,
.expand-leave {
    opacity: 0;
    height: 0;
}

.v-spinner {
    text-align: center;
}
.order_pagination{
    text-align: center;
}
</style>

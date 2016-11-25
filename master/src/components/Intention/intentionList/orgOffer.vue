<template>
     <createorder-model :param="orderParam" v-if="orderParam.show"></createorder-model>
     <search-model :param="loadParam" v-if="loadParam.show"></search-model>
     <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2" style="font-size:14px">部门报价</div>
            <div class="right">
              <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
              <button class="new_btn transfer" @click="searchOffer()">搜索</button>
              <!-- <button class="new_btn" @click="createIntention()">新建</button> -->
            </div>
        </div>
        <div class="service-nav clearfix">
            <div class="my_order_search">
               <div class="filter_search clearfix">

               </div>
           </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak>
                <thead>
                    <tr>
                        <!-- <th>
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label>
                        </th> -->
                        <!-- <th>意向ID</th> -->
                        <th>报价会员</th>
                        <th>会员手机</th>
                        <th>发布意向客户</th>
                        <th>客户手机</th>
                        <th>品种</th>
                        <th>产地</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>总价</th>
                        <th>杂费</th>
                        <th>杂费说明</th>
                        <th>备注</th>
                        <th>是否已采纳</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOfferList">
                         <!-- <td  >
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)"></label>
                                                 </td> -->
                        <!-- <td>{{item.intentionId}}</td> -->
                        <td>{{item.userName}}</td>
                        <td>{{item.userPhone}}</td>
                        <td>{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.number}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.incidentals}}</td>
                        <td>{{item.incidentalsDesc}}</td>
                        <td>{{item.comments}}</td>
                        <td>
                           <div v-if="item.orderTime==0">未采纳</div>
                           <div v-else>已采纳</div>
                        </td>
                        <td  v-if="item.orderTime==0"  @click.stop="adopt(item,$index)">
                               <a class="operate"><img src="/static/images/adopt.png" height="18" width="46"  alt="我要采纳" title="我要采纳"/>
                               </a>
                        </td>
                       <!--  <td @click.stop="clickShow($index)">
                          <img height="24" width="24" src="/static/images/default_arrow.png" />
                          <div class="component_action" v-show="item.show">
                              <ul>
                                  <li v-if="item.orderTime==0" @click="adopt(item,$index)">采纳</li>
                              </ul>
                          </div>
                                              </td> -->
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
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import createorderModel  from '../createOrder'
import searchModel  from '../offerSearch'
import {
    initOfferList,
    initLogin
} from '../../../vuex/getters'
import {
    getOfferList
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        createorderModel,
        searchModel
    },
    vuex: {
        getters: {
            initOfferList,
            initLogin
        },
        actions: {
            getOfferList
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show:false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                link:'/intention/org/offers',
                breedName:'',
                spec:'',
                fullname:'',
                startTime:'',
                endTime:'',
                total:0
            },

            offerParam:{
                show:false,
                id:''
            },
            orderParam:{
                show:false,
                index:'',
                key:'offerList',
                type:'',
                customer:'',
                sample:0,
                intl:0,
                employee:this.initLogin.id,   //业务员ID
                org:this.initLogin.orgId,    //部门ID
                incidentals:'',
                incidentalsDesc:'',
                preferential:'',   //优惠金额
                preferentialDesc:'',
                currency:'',     //货币品种
                consignee:'',    //收货人姓名
                consigneePhone:'',
                zipCode:'',     //邮编
                country:'',
                province:'',
                city:'',
                district:'',
                consigneeAddr:'',
                comments:'',
                sourceType:1,        //商品来源类型(意向)
                orderStatus:0,   //订单状态
                goods:[{
                  sourceType:2,   //商品来源类型(报价)
                  sourceId:'',    //商品来源ID
                  title:'',       //订单商品标题
                  breedId:'',
                  brredName:'',
                  quality:'',
                  location:'',
                  spec:'',
                  price:'',
                  unit:'',
                  number:''
                }]

            },
            checked:false
        }
    },
    methods: {
        searchOffer:function(){
          this.loadParam.show = true;
        },
        resetCondition:function(){
          this.loadParam.breedName='';
          this.loadParam.spec='';
          this.loadParam.fullname='';
          this.loadParam.startTime='';
          this.loadParam.endTime='';   
          this.getOfferList(this.loadParam);
        },
        clickShow:function(index){
            this.$store.state.table.basicBaseList.offerList[index].show=!this.$store.state.table.basicBaseList.offerList[index].show;
        },
        onlyselected:function(index){
            var _this = this;
            this.$store.state.table.basicBaseList.offerList[index].checked=!this.$store.state.table.basicBaseList.offerList[index].checked;
            if(!this.$store.state.table.basicBaseList.offerList[index].checked){
                this.checked = false;
            }else{
                this.checked = true;
                this.$store.state.table.basicBaseList.offerList.forEach(function(item){
                    if(!item.checked){
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll:function(){
            this.checked = !this.checked;
            if(this.checked){
                this.$store.state.table.basicBaseList.offerList.forEach(function(item){
                    item.checked = true;
                })
            }else{
                this.$store.state.table.basicBaseList.offerList.forEach(function(item){
                    item.checked = false;
                })
            }
        },
        adopt:function(item,index){
            console.log("创建订单");
            this.orderParam.show = true;
            this.orderParam.index = index;
            this.orderParam.customer = item.customerId;
            this.orderParam.incidentals = item.incidentals;
            this.orderParam.incidentalsDesc = item.incidentalsDesc;

            this.orderParam.goods[0].sourceId = item.id;
            this.orderParam.goods[0].breedId = item.breedId;
            this.orderParam.goods[0].breedName = item.breedName;
            this.orderParam.goods[0].spec = item.spec;
            this.orderParam.goods[0].price = item.price;
            this.orderParam.goods[0].unit = item.unit;
            this.orderParam.goods[0].number = item.number;
            this.orderParam.goods[0].quality = item.quality;
            this.orderParam.goods[0].location = item.location;

            for(var key in this.orderParam){
                if(this.orderParam[key]!=''){
                    console.log(key+'=='+this.orderParam[key]);
                }
            }
            console.log(this.orderParam.goods[0]);
            return ;
        }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOfferList(this.loadParam);
        }
    },
    created() {
        this.getOfferList(this.loadParam, this.loadParam.all);
    },
    filter: (filter,{})
}
</script>
<style scoped>
.service-nav {
    padding: 15px 30px 0 40px;
}
.order_table{
    margin-top:-4px;
}
.my_enterprise{
    padding:6px;
}
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-left: 18px;
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
}
</style>


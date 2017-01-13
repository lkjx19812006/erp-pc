<template>
    <createorder-model :param="orderParam" v-if="orderParam.show"></createorder-model>
    <search-model :param="loadParam" v-if="loadParam.show"></search-model>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>

    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear pull-left">
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">会员名：</dt>
                 <dd class="left">
                      <input type="text" class="form-control" v-model="loadParam.fullname" placeholder="按回车键搜索" @keyup.enter="offerSearch()">
                 </dd>
              </dl>

              <dl class="clear left transfer">
                 <dt class="left transfer marg_top" >会员手机：</dt>
                 <dd class="left">
                      <input type="text" class="form-control" v-model="loadParam.userPhone" placeholder="按回车键搜索" @keyup.enter="offerSearch()">
                 </dd>
              </dl>

              <dl class="clear left transfer">
                 <dt class="left transfer marg_top" >报价时间：</dt>
                 <dd class="left">
                      <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss" class="a">
                      </mz-datepicker>
                 </dd>
              </dl>
              <dl class="clear left transfer">
                 <button type="button" class="btn btn-default" height="24" width="24" @click="offerSearch()">搜索</button>
                 <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
              </dl>
            </div>
            <div class="right">
              <button class="btn btn-primary" @click="offerSearch()">刷新</button>
              <!-- <button class="new_btn" @click="createIntention()">新建</button> -->
            </div>
        </div>

        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                       <th>报价时间</th>
                       <th>所属交易员</th>
                       <th>报价客户</th>
                       
                       <th>联系方式</th>
                       <th>品种名</th>
                       <th>报价价格</th>
                       <th>库存</th>
                       <th>报价备注</th>
                       <th>订单次数</th>
                       <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initMyOfferList">
                        <td>{{item.otime | date}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.customerName}}</td>
                        
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.number}}{{item.unit}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.orderTime}}次</td>
                        
                  <!-- <td>{{item.userName}}</td>
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
                  -->
                        <td >
                              <a class="operate" @click.stop="adopt(item,$index)" v-if="item.orderTime==0"><img src="/static/images/adopt.png"   alt="我要采纳" title="我要采纳"/>
                               </a>
                               <div v-else>已生成订单</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--底部分页-->
        <pagination :combination="loadParam"  slot="page"></pagination>

    </mglist-model>

</template>
<script>
import pagination from '../../pagination'
import calendar from '../../calendar/vue.datepicker'
import filter from '../../../filters/filters'
import createorderModel  from '../createOrder'
import searchModel  from '../offerSearch'
import common from  '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import tipsModel from '../../tips/tipDialog'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
	initMyOfferList,
    initLogin
} from '../../../vuex/getters'
import {
	getOfferList
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        createorderModel,
        searchModel,
        tipsModel,
        mglistModel
    },
    vuex: {
        getters: {
            initMyOfferList,
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
                link:'/intention/employee/offers',
                key:'myOfferList',
                breedName:'',
                spec:'',
                fullname:'',
                userPhone:'',
                startTime:'',
                endTime:'',
                total:0
            },
            tipsParam:{
              name:'',
              show:false,
              alert:true
            },
            offerParam:{
            	show:false,
            	id:''
            },
            orderParam:{
                index:'',
                show:false,
                key:'myOfferList',
                type:'',
                customer:'',
                sample:0,
                intl:0,
                employee:this.initLogin.id,   //业务员ID
                org:this.initLogin.orgId,    //部门ID
                incidentals:0,
                incidentalsDesc:'',
                preferential:0,   //优惠金额
                preferentialDesc:'',
                currency:1,     //货币品种
                consignee:'',    //收货人姓名
                consigneePhone:'',
                zipCode:'',     //邮编
                country:'',
                province:'',
                city:'',
                total:0,
                cost:0,
                district:'',
                consigneeAddr:'',
                comments:'',
                sourceType:2,        //商品来源类型(意向)
                orderStatus:0,   //订单状态
                goods:[{
                  sourceType:2,   //商品来源类型(报价)
                  sourceId:'',    //商品来源ID
                  title:'',       //订单商品标题
                  breedId:'',
                  breedName:'',
                  quality:'',
                  location:'',
                  spec:'',
                  price:'',
                  costPrice:'',
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
        offerSearch:function(){
            console.log(this.loadParam);
            this.getOfferList(this.loadParam);
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
        	this.$store.state.table.basicBaseList.myOfferList[index].show=!this.$store.state.table.basicBaseList.myOfferList[index].show;
        },
        onlyselected:function(index){
        	var _this = this;
            this.$store.state.table.basicBaseList.myOfferList[index].checked=!this.$store.state.table.basicBaseList.myOfferList[index].checked;
            if(!this.$store.state.table.basicBaseList.myOfferList[index].checked){
            	this.checked = false;
            }else{
            	this.checked = true;
            	this.$store.state.table.basicBaseList.myOfferList.forEach(function(item){
            		if(!item.checked){
            			_this.checked = false;
            		}
            	})
            }
        },
        checkedAll:function(){
   			this.checked = !this.checked;
   			if(this.checked){
   				this.$store.state.table.basicBaseList.myOfferList.forEach(function(item){
   					item.checked = true;
   				})
   			}else{
   				this.$store.state.table.basicBaseList.myOfferList.forEach(function(item){
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
            this.orderParam.type = item.type;
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
            this.orderParam.callback = this.adoptback;
        },
        adoptback:function(title){
          this.tipsParam.name=title;
          this.tipsParam.alert=true;
          this.tipsParam.show=true;
        },

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOfferList(this.loadParam);
        }
    },
    created() {
        changeMenu(this.$store.state.table.isTop,this.getOfferList,this.loadParam,localStorage.myOfferParam); 
    },
    ready(){
      common('tab','table_box',1);
    },
    filter: (filter,{})
}
</script>
<style scoped>
.name_search{
  margin-right: 1%;
}
.service-nav {
    padding: 30px 20px 10px 40px;
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
 #table_box  table th,#table_box  table td{
  width: 170px;
  min-width:170px;
}
</style>


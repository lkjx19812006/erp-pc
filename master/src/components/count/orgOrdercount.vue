<template>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">部门订单交易统计</div>
	</div>
    <div class="order_table">
        <!-- <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>  -->
        <table class="table table-hover table_color table-bordered table-striped " v-cloak>
            <thead>
                <tr style="background:none;color:#000">
                    <th rowspan="1"></th>
                    <th colspan="12">销售订单</th>
                    <th colspan="12">采购订单</th>
                </tr>
                <tr style="background:none;color:#000">
                    <th rowspan="2">业务员/部门</th>
                    <th colspan="3">全部订单</th>
                    <th colspan="5">全部已完成</th>
                    <th colspan="4">进行中订单</th>
                    <th colspan="3">全部订单</th>
                    <th colspan="3">全部已完成</th>
                    <th colspan="4">进行中订单</th>
                </tr>
                <tr style="background:none;color:#000">
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>利润</th>
                    <th>利润率</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>应收账款</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>应付账款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initOrgOrderCount">
                    <th>{{item.id}}</th>
                    <th>{{item.saleAllOrderNumber}}</th>
                    <th>{{item.saleAllOrderAmount}}kg</th>
                    <th>{{item.saleAllOrderMoney}}元</th>
                    <th>{{item.saleEndOrderNumber}}</th>
                    <th>{{item.saleEndOrderAmount}}kg</th>
                    <th>{{item.saleEndOrderMoney}}元</th>
                    <th>{{item.profit}}元</th>
                    <th>{{item.profitMargin}}</th>
                    <th>{{item.saleIngOrderNumber}}</th>
                    <th>{{item.saleIngOrderAmount}}kg</th>
                    <th>{{item.saleIngOrderMoney}}元</th>
                    <th>{{item.saleIngOrderUnpaid}}元</th>
                    <th>{{item.buyAllOrderNumber}}</th>
                    <th>{{item.buyAllOrderAmount}}kg</th>
                    <th>{{item.buyAllOrderMoney}}元</th>
                    <th>{{item.buyEndOrderNumber}}</th>
                    <th>{{item.buyEndOrderAmount}}kg</th>
                    <th>{{item.buyEndOrderMoney}}元</th>
                    <th>{{item.buyIngOrderNumber}}</th>
                    <th>{{item.buyIngOrderAmount}}kg</th>
                    <th>{{item.buyIngOrderMoney}}元</th>
                    <th>{{item.buyIngOrderUnpaid}}元</th>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- <div class="click_change">
        <span class="date_active" v-bind:class="{ 'date_active': orderSort=='type'}" @click="changeOrderSort('type')">客户类型</span>
        <span v-bind:class="{ 'date_active': orderSort=='address'}" @click="changeOrderSort('address')">客户所在地</span>
        <span v-bind:class="{ 'date_active': orderSort=='breed'}" @click="changeOrderSort('breed')">品种</span>
        <span v-bind:class="{ 'date_active': orderSort=='location'}" @click="changeOrderSort('location')">产地</span>
        <span v-bind:class="{ 'date_active': orderSort=='other'}" @click="changeOrderSort('other')">辅材其他</span>
    </div> -->

    <div class="btn-group" style="margin-top:20px">
         <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': orderSort=='type'}" @click="changeOrderSort('type')">
            客户类型
         </button>
         <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': orderSort=='address'}" @click="changeOrderSort('address')">
            客户所在地
         </button>
         <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': orderSort=='breed'}" @click="changeOrderSort('breed')">
            品种
         </button>
         <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': orderSort=='location'}" @click="changeOrderSort('location')">
            产地
         </button>
         <!-- <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': orderSort=='other'}" @click="changeOrderSort('other')">
            辅材其他
         </button> -->
     </div>

	<div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                <thead>
                    <tr style="background:none;color:#000">
                        <th>序号</th>
                        <th>
                            <span v-if="orderSort=='type'">客户类型</span>
                            <span v-if="orderSort=='address'">地区</span>
                            <span v-if="orderSort=='breed'">品种</span>
                            <span v-if="orderSort=='location'">产地</span>
                            <span v-if="orderSort=='other'">其他</span>
                        </th>
                        <th>订单数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                        <th>利润</th>
                        <th>利润率</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOrgOrderSortCount">
                        <td width="100px">{{$index+1}}</td>
                        <td width="100px">{{item.focuName}}</td>
                        <td width="100px">{{item.saleAllOrderNumber}}</td>
                        <td width="100px">{{item.saleAllOrderAmount}}kg</td>
                        <td width="100px">{{item.saleAllOrderMoney}}元</td>
                        <td width="100px">{{item.profit}}元</td>
                        <td width="100px">{{item.profitMargin}}</td>
                    </tr>
                </tbody>
            </table>
    
        </div>
    
</template>
<script>
	import {
		initOrgOrderCount,
        initOrgOrderSortCount
	} from '../../vuex/getters'
	import {
		getOrderCount
	} from '../../vuex/actions'
	import pagination from  '../pagination'
	export default {
		components:{
			pagination,
		},
		data() {
	        return {
	            loadParam: {
                    loading: true,
                    color: '#5dc596',
                    size: '15px',
                    link:"/report/order/total",
                    key:"orgOrderCount",
                    objType:'org',    
                    org:this.$store.state.table.login.orgId
                },
                sortParam:{   
                    loading: true,
                    link:"/report/order/org",
                    key:"orgOrderSortCount",
                    focus:'custType',  
                    objType:'', 
                    objId:'', 
                    orgId:this.$store.state.table.login.orgId  
                },
                orderSort:"type",
	        }
	    },
	    methods:{
            changeOrderSort:function(orderSort){
                this.orderSort = orderSort;
                if(orderSort=="type"){
                    this.sortParam.link = "/report/order/org";
                    this.sortParam.focus = "custType";
                    this.sortParam.orgId = this.$store.state.table.login.orgId;
                    this.sortParam.objType = "";
                    this.sortParam.objId = "" ;
                }
                if(orderSort=="address"){
                    this.sortParam.link = "/report/order/org";
                    this.sortParam.focus = "custRegion";
                    this.sortParam.orgId = this.$store.state.table.login.orgId;
                    this.sortParam.objType = "";
                    this.sortParam.objId = "" ;
                }
                if(orderSort=="breed"){
                    this.sortParam.link = "/report/order/goods";
                    this.sortParam.focus = "goods";
                    this.sortParam.orgId = "";
                    this.sortParam.objType = "org";
                    this.sortParam.objId = this.$store.state.table.login.orgId  ;
                }
                if(orderSort=="location"){
                    this.sortParam.link = "/report/order/goods";
                    this.sortParam.focus = "location";
                    this.sortParam.orgId = "";
                    this.sortParam.objType = "org";
                    this.sortParam.objId = this.$store.state.table.login.orgId  ;
                }
                this.getOrderCount(this.sortParam);


            }
	    },
	    vuex: {
	        getters: {
	            initOrgOrderCount,
                initOrgOrderSortCount
	        },
	        actions: {
	            getOrderCount
	        }
	    },
	    events: {
	        
	    },
	    created() {
	        this.getOrderCount(this.loadParam);
            this.getOrderCount(this.sortParam);
	    
	    }
	}
</script>
<style scoped>
.click_change span{
    padding:0 20px;
    display: inline-block;
    border-right: 1px solid #ddd;
    cursor: pointer;
}
.date_active{
    background: #fa6705;
    color: #fff;
}
.table{
    margin-bottom: 20px;
    position: relative;
    display: table;
    max-height: 20px;
}
.table-bordered {
    border-top: 0px solid #ddd;
}
.btn-warning {
    background-color: #fa6705;
}

</style>
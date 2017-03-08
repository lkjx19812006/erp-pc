<template>
	 <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">部门管理</div>
            <div class="btn btn-primary right" @click="refresh()">刷新</div>
        </div>
        <!-- 日期统计 -->
        <div class="order_table clearfix" style="margin-top: 15px; margin-bottom:10px " id="top">
            <div class="btn-group">
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.orderType==1}" @click="clickType(1)">
                    销售
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.orderType===0}" @click="clickType(0)">
                    采购
                </button>
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='day'}" @click="clickChange('day')">
                    日
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='week'}" @click="clickChange('week')">
                    周
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='month'}" @click="clickChange('month')">
                    月
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='quarter'}" @click="clickChange('quarter')">
                    季
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='year'}" @click="clickChange('year')">
                    年
                </button>
            </div>
            <!-- 搜索起止时间 -->
	        <div class="btn-group clearfix right">
	            <div class="clear transfer">
	                <div class="left">
	                      <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
	                      <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
	                      </mz-datepicker>
	                </div>
	                <div class="left">
	                        <dt class="left marg_top">~~</dt>
	                        <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
	                        </mz-datepicker>
	                </div>
	                <button type="button" class="btn btn-default" style="margin-left: 15px;" @click="search
	                    ()">搜索</button>
	                <button type="button" class="btn btn-default" @click="resetCondition()">{{$t("static.clear_all")}}</button>
	            </div>
	        </div>
        </div>
      
        <!-- 业务 -->
        <div class="listContent">
           <!-- 业务中的一项 -->
           <div class="listItem" v-for = "item in initOrgCount">
              <div class="title">
                 <span>{{item.name}}</span>
              </div>
              <div class="total" v-for = "item in initOrgCount[$index].statisticsList">
                 <label>订单金额:</label><span>{{item.totalSum}}</span><br/>
                 <label>应收/应付:</label><span>{{item.statisticsList[0].unpaidSum}}</span>
              </div>
              <!-- 业务员 应收金额 应收 应付 列表 -->
              <div class="table">
                 <ul class="table-header">
                 	<li>业务员</li>
                 	<li>订单金额</li>
                 	<li>应收/应付</li>
                 </ul>
                 <ul class="table-ct table-header" v-for = "itemlist in item.lowerList">
                 	<li>{{itemlist.}}</li>
                 	<li>333333</li>
                 	<li>35353636</li>
                 </ul>

              </div>
           </div>
        </div>

    </div>
</template>
<script>
	import {
	  initOrgCount
	} from '../../vuex/getters'
	import {
		getOrgCount
	} from '../../vuex/actions'
	
	export default {
		components:{
		   
		},
		data() {
	        return {
	        }    
	    },
	    methods:{

	    },
	    vuex: {
	       getters:{
              initOrgCount
	       },
	       actions:{
	       	 getOrgCount
	       }
	    },
	   
	    created() {
	       this.getOrgCount()
	    }
	}
</script>
<style scoped>
.listItem{ 
	float: left
}
.listContent{
	clear: both; 
	width: 100%;
	border: 1px solid #d5d5d5;
	border-bottom:none
}
.listContent .listItem{ 
	width: 400px;
	border-right: 1px solid #d5d5d5
}
.listContent .title{ 
	height: 30px;
	line-height: 30px;
	text-align: center;
	border-bottom: 1px solid #d5d5d5;
}

.listContent .total{
	border-bottom: 1px solid #d5d5d5;
	padding:10px 20px; 
}
.table-header{
	display: flex;
}
.table-header li{
	flex: 1;
	clear: both;
	padding-left: 10px;
	border-left: 1px solid #d5d5d5;
	border-bottom: 1px solid #d5d5d5
}
.click_change span {
    padding: 0 20px;
    display: inline-block;
    border-right: 1px solid #ddd;
    cursor: pointer;
}

.date_active {
    background: #fa6705;
    color: #fff;
}

.order_table {
    text-align: left;
}

.table {
    margin-bottom: 20px;
    position: relative;
    display: table;
}

.table>thead>tr>th {
    font-weight: 700;
}

.btn-warning {
    background-color: #fa6705;
}
.btn-group{
   
}
</style>
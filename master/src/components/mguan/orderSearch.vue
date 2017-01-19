<template>
	<div class="clear">
	    <div class="right">
	        <button class="btn btn-default transfer" @click="newOrder()">{{$t('static.new')}}</button>
	        <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
	    </div>
	    <div class="left">
	      <dl class="clear left transfer">
	         <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
	         <dd class="left">
	              <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
	                  <option value="">{{$t('static.please_select')}}</option>
	                  <option value="0">{{$t('static.purchase')}}</option>
	                  <option value="1">{{$t('static.sell')}}</option>
	              </select>
	         </dd>
	      </dl>
	      <dl class="clear left transfer">
	         <dt class="left transfer marg_top">{{$t('static.order_status')}}：</dt>
	         <dd class="left">
	               <select  v-model="loadParam.orderStatus"  class="form-control" @change="selectSearch()">
	                      <option value="">{{$t('static.please_select')}}</option>
	                      <option value="0">{{$t('static.create_order')}}</option>
	                      <option value="10">{{$t('static.order_procing')}}</option>
	                      <option value="20">{{$t('static.waiting_order')}}</option>
	                      <option value="30">{{$t('static.awaiting_review')}}</option>
	                      <option value="40">{{$t('static.wait_ship')}}</option>
	                      <option value="50">{{$t('static.wait_receipt')}}</option>
	                      <option value="60">{{$t('static.awaiting_comment')}}</option>
	                      <option value="70">{{$t('static.order_over')}}</option>
	              </select>
	         </dd>
	      </dl>
	      <dl class="clear left transfer">
	         <dt class="left transfer marg_top">{{$t('static.trading_patterns')}}：</dt>
	         <dd class="left">
	               <select v-model="loadParam.mode"  class="form-control" @change="selectSearch()">
	                  <option value="">{{$t('static.please_select')}}</option>
	                  <option value="1">{{$t('static.together')}}</option>
	                  <option value="2">{{$t('static.three_side')}}</option>
	                  <option value="3">{{$t('static.self_support')}}</option>
	              </select>
	         </dd>
	      </dl>
	      <dl class="clear left transfer">
	         <dt class="left transfer marg_top">{{$t('static.consignee_name')}}：</dt>
	         <dd class="left">
	            <input type="text"  class="form-control" v-model="loadParam.consignee"  @keyup.enter="selectSearch()"/>
	         </dd>
	      </dl>
	      <dl class="clear left transfer">
	         <dt class="left transfer marg_top">{{$t('static.consignee_phone')}}：</dt>
	         <dd class="left">
	            <input type="text"  class="form-control" v-model="loadParam.consigneePhone"  @keyup.enter="selectSearch()"/>
	         </dd>
	      </dl>
	      <button type="button" class="new_btn"  @click="resetTime()">{{$t('static.clear_all')}}</button>
	        <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
	    </div>
	</div>
</template>
<script>
	import {
		initLogin
	} from '../../vuex/getters.js'
	export default{
		data(){
			return {
				loadParam: {
                    loading: true,
                    color: '#5dc596',
                    size: '15px',
                    show:false,
                    cur: 1,
                    all:1,
                    consignee:'',
                    /*link:'/order/myList',
                    key:'myOrderList',
                    employee:this.initLogin.id,
                    org:this.initLogin.orgId,*/
                    consignee:'',
                    consigneePhone:'',
                    type:'',
                    orderStatus:'',
                    payWay:'',
                    clients:'',
                    dataStatus:'',
                    customerName:'',
                    customerPhone:'',
                    no:'',
                    ctime:'',
                    ftime:'',
                    mode:'',
                    total:0
                }
			}
		},
		vuex:{
			getters:{
				initLogin
			}
		},
		methods:{
			selectSearch:function(){
				console.log('1111')
                this.$emit('order-search', this.loadParam);
            }
		}
	}
</script>
<style scoped>
	
</style>
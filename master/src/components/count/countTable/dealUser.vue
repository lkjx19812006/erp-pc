<template>
	<div class="detail_left_top">
	     <h4 class="detail_title bg-info">{{param.name}}
	         <span class="detail_num">
	             <a href="javascript:void(0);" class="person_num" @click="change('num')">人数：{{param.total}}</a>
	             <a href="javascript:void(0);" class="person_num" @click="change('time')">人次：{{param.total}}</a>&nbsp
	             <a href="javascript:void(0);" class="btn btn-link" @click="showDetail('newDealDetail')">more>></a>
	         </span>
	     </h4>
	        <table class="table table-hover table_color table-striped">
	            <thead>
	                <tr>
	                    <th style="min-width:100px;text-align: center;">用户</th>
	                    <th style="min-width:120px;text-align: center;">联系方式</th>
	                    <th style="min-width:130px;text-align: center;" v-if="showType=='time'">订单号</th>
	                    <th style="min-width:130px;text-align: center;" v-if="showType=='num'">订单数量</th>
	                    <th style="min-width:150px;text-align: center;">时间</th>
	                </tr>
	            </thead>
	            <tbody v-if="showType=='time'">
	                <tr v-for="item in getDealUserDetail" >
	                    <td><a href="javascript:void(0);">{{item.customerName}}</a></td>
	                    <td>{{item.customerPhone}}</td>
	                    <td>{{item.no}}</td>
	                    <td>{{item.ctime}}</td>
	                </tr>
	            </tbody>

	            <tbody v-if="showType=='num'">
	                <tr v-for="item in getDealUserDetail" >
	                    <td><a href="javascript:void(0);">{{item.name}}</a></td>
	                    <td>{{item.mainPhone}}</td>
	                    <td></td>
	                    <td>{{item.ctime}}</td>
	                </tr>
	            </tbody>
	        </table>
	    
	        <pagination :combination="param" slot="page"></pagination>
	</div>
</template>

<script>
import pagination from '../../pagination'
import {
    getDealUserDetail
} from '../../../vuex/getters'

import {
    getDealUser,
} from '../../../vuex/actions'
export default{
	components:{
		pagination
	},
	data(){
		return {
			showType:'num'
		}
	},
	props:['param'],
	vuex:{
		getters:{
			getDealUserDetail
		},
		actions:{
			getDealUser
		}
	},
	methods:{
		change:function(data){
			this.param.showType = data
			this.showType = data
			this.$dispatch('change',data)
		},
		showDetail:function(data){
			this.$dispatch('showD',data)
		}
	},
	events:{
		fresh: function(input) {
            this.param.cur = input;
            this.getDealUser(this.param)
        },
	},
	created:function(){
	}
}
</script>

<style scoped>
.detail_left_top{
    width: 100%;
    height:400px;
    background: #fff;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
}
.detail_title{
    padding-left:20px;
    line-height: 50px;
    background: #fafafa
}
.detail_num{
    display: inline-block;
    float: right;
    margin-right:20px;
    color:#ff9e4d
}
.person_num{
    color:#ff9e4d;
    margin-right:10px;
    font-size:16px;
}
</style>
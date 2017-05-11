<template>
	<div>
        <h4 class="detail_title bg-info">{{param.name}}
            <span class="detail_num">
                <!-- <a href="javascript:void(0);" class="person_num" @click="change('num')">人数：{{param.total}}</a> -->
                <a href="javascript:void(0);" class="person_num" >人次：{{param.total}}</a>&nbsp
                <a href="javascript:void(0);" class="btn btn-link" @click="showDetail('newActiveDetail')">more>></a>
            </span>
        </h4>
        <table class="table table-hover table_color table-striped">
            <thead>
                <tr>
                    <th style="min-width:80px;text-align: center;">用户</th>
                    <th style="min-width:120px;text-align: center;">联系方式</th>
                    <th style="min-width:120px;text-align: center;">
                        活跃类型
                        <select v-model="param.activeType" @change="changeActiveType()">
                            <option value="报价">报价</option>
                            <option value="订单">订单</option>
                            <option value="意向">意向</option>
                            <option value="采购单">采购单</option>
                        </select>
                    </th>
                    <th style="min-width:150px;text-align: center;">编号</th>
                    <th style="min-width:130px;text-align: center;">时间</th>
                </tr>
            </thead>
            <tbody v-if="param.activeType=='报价'">
                <tr v-for="item in getActiveUserDetail">
                    <td><a href="javascript:void(0);">{{item.offerName}}</a></td>
                    <td>{{item.offerMobile}}</td>
                    <td>{{param.activeType}}</td>
                    <td>{{item.id}}</td>
                    <td>{{item.ctime}}</td>
                </tr>
            </tbody>
            <tbody v-if="param.activeType!='报价'">
                <tr v-for="item in getActiveUserDetail">
                    <td><a href="javascript:void(0);">{{item.customerName}}</a></td>
                    <td>{{item.customerPhone}}</td>
                    <td>{{param.activeType}}</td>
                    <td>{{item.id}}</td>
                    <td>{{item.ctime}}</td>
                </tr>
            </tbody>
        </table>
        <!--底部分页-->
        <pagination :combination="param" slot="page"></pagination>
    </div>
    
</template>

<script>
import pagination from '../../pagination'
import {
    getActiveUserDetail
} from '../../../vuex/getters'

import {
    getActiveUser,
} from '../../../vuex/actions'
export default{
	components:{
		pagination
	},
	data(){
		return {
			
		}
	},
	props:['param'],
	vuex:{
		getters:{
			getActiveUserDetail
		},
		actions:{
			getActiveUser
		}
	},
	methods:{
		/*change:function(data){
			this.param.showType = data
			this.showType = data
			this.$dispatch('change',data)
		},*/
		changeActiveType:function(){
			this.getActiveUser(this.param)
		}
	},
	events:{
		fresh: function(input) {
            this.param.cur = input;
            this.getActiveUser(this.param)
        },
	},
	created:function(){
	}
}
</script>

<style>
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
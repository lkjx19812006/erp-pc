<template>
	<div class="detail_left_top">
	        <h4 class="detail_title bg-info">{{param.name}}
	            <span class="detail_num">
	                <a href="javascript:void(0);" class="person_num">{{param.total}}人</a>&nbsp
	                <a href="javascript:void(0);" class="btn btn-link" @click="showDetail('newUserDetail')">more>></a>
	            </span>
	        </h4>
	        <table class="table table-hover table_color table-bordered table-striped ">
	            <thead>
	                <tr>
	                    <th style="min-width:100px;text-align: center;">用户</th>
	                    <th style="min-width:150px;text-align: center;">联系方式</th>
	                    <th style="min-width:100px;text-align: center;">区域</th>
	                    <th style="min-width:150px;text-align: center;">时间</th>
	                </tr>
	            </thead>
	            <tbody>
	                <tr v-for="item in getNewUserDetail">
	                    <td><a href="javascript:void(0);">{{item.name}}</a></td>
	                    <td>{{item.mainPhone}}</td>
	                    <td>{{item.provinceName}}</td>
	                    <td>{{item.ctime}}</td>
	                </tr>
	            </tbody>
	        </table>
	    <!--底部分页-->
	    <div class="pages">
	    	<pagination :combination="param" slot="page"></pagination>
	    </div>
	        
	</div>
</template>

<script>
import pagination from '../../pagination'
import {
    getNewUserDetail,
} from '../../../vuex/getters'

import {
    getNewUser,
} from '../../../vuex/actions'
export default{
	components:{
		pagination
	},
	props:['param'],
	vuex:{
		getters:{
			getNewUserDetail
		},
		actions:{
			getNewUser
		}
	},
	methods:{
		showDetail:function(data){
			this.$dispatch('showD',data)
		}
	},
	events:{
		fresh: function(input) {
            this.param.cur = input;
            this.getNewUser(this.param)
        },
	},
	created:function(){
		console.log(this.param)
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
    position: relative;
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
.pages{
	position: absolute;
	bottom: 0;
	left:5%;
}
</style>
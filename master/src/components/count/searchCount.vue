<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
	    <div @click="param.show=false" class="top-title">
	        <span class="glyphicon glyphicon-remove-circle"></span>
	    </div>
	    <div class="edit-content">
	        <h3>统计搜索</h3>
	    </div>
	    <div class="edit-model">
	    	<div class="clearfix space_down">
	    		<div class="pull-left col-md-6 ">
	    			<label>客户类型：</label> 
                    <select class="form-control" v-model="param.name"  placeholder="按照客户类型搜索">
                    	<option>1111</option>
                    </select>
	    		</div>
	    		<div class="pull-right col-md-6 ">
					<label>客户星级：</label>
                    <input type="text"  class="form-control" v-model="param.name"  placeholder="按照客户星级搜索"/>
	    		</div>
	    	</div>
	    	<div class="clearfix space_down">
	    		<div class="pull-left col-md-6 ">
	    			<label>新增成交客户数：</label>
                    <select class="form-control" v-model="param.name"  placeholder="按照客户类型搜索">
                    	<option>撮合</option>
                    	<option>自营</option>
                    	<option>三方</option>
                    </select>
	    		</div>
	    		<div class="pull-right col-md-6">
					<label>复购客户数：</label>
                    <select class="form-control" v-model="param.name"  placeholder="按照客户类型搜索">
                    	<option>撮合</option>
                    	<option>自营</option>
                    	<option>三方</option>
                    </select>
	    		</div>
	    	</div>
	    	<div class="clearfix space_down">
	    		<div class="pull-left col-md-6 ">
	    			<label>月统计：</label>
                    <select class="form-control" v-model="param.month"  placeholder="按照月统计搜索">
                    	<option>1月</option>
                    	<option>2月</option>
                    	<option>3月</option>
                    	<option>4月</option>
                    	<option>5月</option>
                    	<option>6月</option>
                    	<option>7月</option>
                    	<option>8月</option>
                    	<option>9月</option>
                    	<option>10月</option>
                    	<option>11月</option>
                    	<option>12月</option>
                    </select>
	    		</div>
	    		<div class="pull-right col-md-6">
					<label>交易模式：</label>
                    <input type="text"  class="form-control" v-model="param.name"  placeholder="按照客户星级搜索"/>
	    		</div>
	    	</div>
	    	<div class="clearfix space_down">
	    		<div class="pull-left col-md-6">
	    			<label style="display: block">选择开始时间：</label>
                    <mz-datepicker :time.sync="param.ctime" format="yyyy/MM/dd HH:mm:ss">
                    </mz-datepicker>
	    		</div>
	    		<div class="pull-right col-md-6">
					<label style="display: block">选择截止时间：</label>
                    <mz-datepicker :time.sync="param.stime" format="yyyy/MM/dd HH:mm:ss">
                    </mz-datepicker>
                    <input type="button" class="btn btn-default" value="清空条件" @click=""/>
	    		</div>
	    	</div>
	    </div> 
	    <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <input type="button" class="btn  btn-confirm"  @click="clientSearch(param.show = false)" value="确定">
        </div>
	</div>
</template>
<script>
	import calendar from '../calendar/vue.datepicker'
	export default {
		components:{
			calendar
		},
		props:['param'],
		data:{
			return:{

			}
		}
	}
</script>
<style scoped>
	.top-title{
		left: 0;
		right: 0;
		width: 800px;
	}
	.space_down{
		margin-bottom: 15px;
	}
</style>
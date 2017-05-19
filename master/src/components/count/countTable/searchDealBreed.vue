<template>
	<employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
	<selectorg-model :param="searchParam" v-if="searchParam.show"></selectorg-model>
	<div class="search">
		<dl class="clear left transfer" style="margin-top:20px">
	        <div class="left">
	            <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
	            <mz-datepicker :time.sync="searchParam.startTime" format="yyyy-MM-dd HH:mm:ss">
	            </mz-datepicker>
	        </div>
	        <div class="left">
	            <dt class="left marg_top">~~</dt>
	            <mz-datepicker :time.sync="searchParam.endTime" format="yyyy-MM-dd HH:mm:ss">
	            </mz-datepicker>
	        </div>
	        <dt class="left transfer marg_top" style="margin-left: 10px">订单类型：</dt>
	        <dd class="left margin_right">
	            <select class="form-control edit-input" placeholder="按回车键搜索" v-model="searchParam.type">
	            		<option value='0'>采购</option>
	                    <option value='1'>销售</option>

	            </select>
	        </dd>
	        <dt class="left transfer marg_top" style="margin-left: 20px" v-if="param.name=='部门品种统计'">选择业务员:</dt>
	        <dd class="left margin_right" v-if="param.name=='部门品种统计'">
	            <input type="text" v-model="searchParam.name" class="form-control" readonly="readonly" @click="selectPerson()">
	        </dd>
	        <dt class="left transfer marg_top" style="margin-left: 20px" v-if="param.name=='全部品种统计'">选择部门:</dt>
	        <dd class="left margin_right" v-if="param.name=='全部品种统计'">
	            <input type="text" v-model="searchParam.orgName" class="form-control" readonly="readonly" @click="selectOrg()">
	        </dd>
	        <button class="btn btn-default tosearch btn-warning" style="margin-left: 10px" @click="searchCus()">搜索</button>
	        <button class="btn btn-default tosearch btn-warning" style="right: 90px" @click="resetSearch()">清空搜索条件</button>
	    </dl>
	</div>
</template>

<script>
import vSelect from '../../tools/vueSelect/components/Select'
import employeeModel from '../../clientRelate/searchEmpInfo'
import selectorgModel from '../../../components/tips/treeDialog'
import {initProvince,initLogin} from '../../../vuex/getters'
import {getProvinceList} from '../../../vuex/actions'
export default{
	components:{
		vSelect,
		employeeModel,
		selectorgModel
	},
	vuex:{
		getters:{
			initProvince,
			initLogin
		},
		actions:{
			getProvinceList
		}
	},
	props:['param'],
	data(){
		return {			
			searchParam:{
				id:'7',
	            startTime:'',
	            endTime:'',
	            type:'',
	            empId:'',
	            name:'',
	            orgId:'',
	            show: false,
	            orgName: '',
	            callback: this.callback,
        	},
        	province: {
                id: '',
                cname: ''
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: this.initLogin.orgId,
                //单个业务员搜索
                employeeId: '',
                employeeName: '',

            }
		}
	    
	},
	methods:{
		searchCus:function(){
			this.$dispatch('searchDeal',this.searchParam)			
		},
		resetSearch:function(){
			this.searchParam.startTime=''
			this.searchParam.endTime=''
			this.searchParam.type=''
			this.searchParam.empId=''
			this.searchParam.name=''
			this.searchParam.orgId=''
			this.searchParam.orgName=''
			this.$dispatch('searchDeal',this.searchParam)
		},
		showDetail:function(data){
			this.$dispatch('showDetail',data)
		},
		selectPerson:function(){
			this.employeeParam.show=true
		},
		selectOrg:function(){
			this.searchParam.show = true
		},
		callback:function(){

		}
	},
	events:{
		a:function(data){
			this.searchParam.name = data.employeeName
			this.searchParam.empId = data.employeeId
		}
	},
	created:function(){
		this.getProvinceList(this.searchParam)
	}
}
</script>

<style scoped>
.search{
	width: 100%;
	position: relative;
}
.regional{
	position: absolute;
	right: 20px;
}
.tosearch{
	position: absolute;
	right: 200px;
}
.mz-datepicker{
	width: 180px!important
}
</style>
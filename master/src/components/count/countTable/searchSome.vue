<template>
	<div class="search">
		<dl class="clear left transfer" style="margin-top:20px">
	        <div class="left">
	            <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
	            <mz-datepicker :time.sync="searchParam.startTime" format="yyyy-MM-dd HH:mm:ss" style='width:30px'>
	            </mz-datepicker>
	        </div>
	        <div class="left">
	            <dt class="left marg_top">~~</dt>
	            <mz-datepicker :time.sync="searchParam.endTime" format="yyyy-MM-dd HH:mm:ss">
	            </mz-datepicker>
	        </div>
	        <dt class="left transfer marg_top" style="margin-left: 10px">品种类型：</dt>
	        <dd class="left margin_right">
	            <select class="form-control edit-input" placeholder="按回车键搜索" v-model="searchParam.type">
	                    <option value='0'>求购</option>
	                    <option value='1'>供应</option>
	            </select>
	        </dd>
	        <dt class="left transfer marg_top" style="margin-left: 20px" v-if="searchParam.searchType=='新增'">区域:</dt>
	        <dd class="left margin_right" v-if="searchParam.searchType=='新增'">
	            <div  type="text" class="edit-input">
	                <v-select :debounce="250" :value.sync="searchParam.provinceId"  :options="initProvince" placeholder="省/Province" label="cname">
	                </v-select>
	            </div>
	        </dd>
	        <button class="btn btn-default tosearch" style="margin-left: 10px" @click="searchCus()">搜索{{searchParam.searchType}}</button>
	        <button class="btn btn-link change" style="margin-left: 10px" @click="changeType()">点击切换搜索</button>
	        <button class="btn btn-default btn-warning regional" @click="showDetail()">查看区域品种</button>
	    </dl>
	</div>
</template>

<script>
import vSelect from '../../tools/vueSelect/components/Select'
import {initProvince} from '../../../vuex/getters'
import {getProvinceList} from '../../../vuex/actions'
export default{
	components:{
		vSelect
	},
	vuex:{
		getters:{
			initProvince
		},
		actions:{
			getProvinceList
		}
	},
	data(){
		return {
			
			searchParam:{
				searchType:'新增',
				id:'7',
	            startTime:'',
	            endTime:'',
	            provinceId:'',
	            type:'',
	            callback:this.callback
        	},
        	province: {
                id: '',
                cname: ''
            },
		}
	    
	},
	methods:{
		searchCus:function(){
			this.$dispatch('search',this.searchParam)			
		},
		changeType:function(){
			if(this.searchParam.searchType=='新增'){
				this.searchParam.searchType = '成交'
				this.searchParam.provinceId = ''
			}else{
				this.searchParam.searchType = '新增'
			}
		},
		showDetail:function(data){
			this.$dispatch('showDetail',data)
		}
	},
	created:function(){
		this.getProvinceList(this.searchParam)
	}
}
</script>

<style>
.search{
	width: 100%;
	position: relative;
}
.regional{
	position: absolute;
	right: 20px;
}
.change{
	position: absolute;
	right: 180px;
}
.tosearch{
	position: absolute;
	right: 280px;
}
.mz-datepicker{
	width: 180px!important
}
</style>
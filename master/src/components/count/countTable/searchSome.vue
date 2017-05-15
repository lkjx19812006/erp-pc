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
	        <dt class="left transfer marg_top" style="margin-left: 20px">区域:</dt>
	        <dd class="left margin_right">
	            <div  type="text" class="edit-input">
	                <v-select :debounce="250" :value.sync="searchParam.provinceId"  :options="initProvince" placeholder="省/Province" label="cname">
	                </v-select>
	            </div>
	        </dd>
	        <dt class="left transfer marg_top" style="margin-left: 10px">品种类型：</dt>
	        <dd class="left margin_right">
	            <select class="form-control edit-input" placeholder="按回车键搜索" v-model="searchParam.type">
	                    <option value='0'>求购</option>
	                    <option value='1'>供应</option>
	            </select>
	        </dd>
	        <button class="btn btn-default" style="margin-left: 10px" @click="searchCus()">搜索</button>
	        <button class="btn btn-default btn-warning" style="margin-left: 50px" @click="showDetail()">查看区域品种</button>
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
}
.mz-datepicker{
	width: 190px!important
}
</style>
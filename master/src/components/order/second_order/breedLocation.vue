<template>
    <div>
    	<i-select :model.sync="param.location" style="width:200px">
        	<i-option v-for="item in initBreedDetail.locals.arr" :value="item.locationId" :key="item">{{ item.name }}</i-option>
    	</i-select>
    	<button class="btn btn-defalut" @click="addNew()" v-if="!addData.ifShow" :disabled="!show.id">新增</button>
    	<button class="btn btn-defalut" @click="confirm()" v-else :disabled="!show.id || !param.province">提交</button>
    	<div  type="text" class="edit-input" v-show="addData.ifShow">
	        <v-select :debounce="250" :value.sync="param.province"  :options="initProvince" placeholder="省/Province" label="cname">
	        </v-select>
	    </div>
    </div>   
</template>

<script>
	import {initBreedDetail,initProvince} from '../../../vuex/getters'
	import {addBreedLocation} from '../../../vuex/actions'
	import vSelect from '../../tools/vueSelect/components/Select'
	export default{
		components:{
			vSelect
		},
		data(){
			return {
				addData:{
					ifShow:false,
					addInfo:'新增'
				}
			}
		},
		props:['param','show'],
		vuex:{
			getters:{
				initBreedDetail,
				initProvince
			},
			actions:{
				addBreedLocation
			}
		},
		methods:{
			addNew:function(){
				this.addData.ifShow= true

			},
			confirm:function(){
				this.addBreedLocation(this.param.province.id,this.show.id)
				this.addData.ifShow= false
			}
		}
	}
</script>

<style scoped>
	.ivu-select{
		width:284px!important
	}
	.edit-input {
	    height: 36px;
	    width: 75%;
	    border: 1px solid #ddd;
	    border-radius: 5px;
	    -webkit-border-radius: 5px;
	    -moz-border-radius: 5px;
	    -ms-border-radius: 5px;
	}

	.edit-input:focus {
	    border-color: #fa6705;
	}
</style>
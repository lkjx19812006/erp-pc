<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>市列表</h4>
			<div class="trans_service clearfix">
    			<div class="cover_loading">
	                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
	            </div>
				<div class="col-xs-8">
	                <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="请输入国家名称" @keyup.enter="">
	                </div>
	            </div>
	            <table class="table table-hover table_head table-striped " v-cloak>
	                <thead>
	                    <tr>
	                    	<th></th>
	                        <th>市</th>
	                        <th></th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="item in initCitylist">
	                    	<td  @click.stop="">
	                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="selectCity($index,item.id,item.cname)" ></label>
	                        </td>
	                        <td>{{item.cname}}</td>
	                        <td></td>
	                    </tr>
	                </tbody>
	            </table>
			</div>
			<!-- <div class="base_pagination">
	            <pagination :combination="param"></pagination>
	        </div> -->
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import {
    initCitylist
} from '../../vuex/getters'
import {
    getCityList
} from '../../vuex/actions'
export default{
	props:['param'],
	data(){
		return {
			loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                name:''
            },
			checked:false,
			show:true
		}
	},
	components:{
		pagination
	},
	vuex:{
		getters:{
			initCitylist
		},
		actions:{
			getCityList
		}
	},
	methods:{
		selectCity:function(index,id,cname){
			this.$store.state.table.systemBaseList.cityList[index].checked=!this.$store.state.table.systemBaseList.cityList[index].checked;
			for(var key in this.initCountrylist){
				if(key!=index){
					if(this.$store.state.table.systemBaseList.cityList[index].checked==true){
						this.$store.state.table.systemBaseList.cityList[index].checked=false;
					}
				}
			}
			this.param.id= id;
			this.param.cname = cname;
			this.param.show=false;
			this.$dispatch('city',this.param);
		},
		employNameSearch: function() {
            this.getBreedNameSearch(this.loadParam);
        }
	},
    events: {
	    fresh: function(input) {
	        this.loadParam.cur = input;
	        this.getBreedData(this.loadParam);
	    }
    },
	created(){
		console.log(this.param);
		this.getCityList(this.param);
	}
}
</script>
<style scoped>
.modal{
	z-index: 1081;
}
.modal_con{
	z-index: 1082;
}
.change_trans{
	margin-top: 20px;
}
.con_trans{
	margin-top: 40px;
}
.tans_tab{
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #fa6705;
	text-align: left;
}
.tans_tab > .tabs{
	width: 100px;
	display: inline-block;
	font-size:16px;
	text-align: center;
	background-color: #f5f5f5;
	color: #333;
	float: left;
	height: 40px;
	border-bottom: 1px solid #fa6705;
	cursor: pointer;
}
.tans_tab .tabs_active{
	background-color: #fff;
	color: #fa6705;
	border: 1px solid #fa6705;
	border-bottom: 0;
}
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.trans_service{
	margin-top: 20px;
}
.trans_service .col-xs-8{
	margin-bottom: 20px;
}
.table{
	margin-bottom: 5px;
}
.table_head>thead>tr{
	background-color: #f5f5f5;
	color: #333;
	font-size: 18px;
}
.base_pagination{
	margin-top: 0;
}
</style>
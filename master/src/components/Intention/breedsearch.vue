<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>{{$t('static.breed')}}</h4>
			<div class="trans_service clearfix">
    			<div class="cover_loading">
	                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
	            </div>
				<div class="col-xs-8">
	                <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="请输入品种名称">

	                </div>
	                <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.eName" placeholder="Please enter the name of the breed">

	                </div>
          			<div class="name_search clearfix" style="border:none"> <input type="button" class="search_input btn btn-default"   height="24" width="24" value="{{$t('static.search')}}" @click="employNameSearch()"></div>

	            </div>
	            <table class="table table-hover table_head table-striped " v-cloak>
	                <thead>
	                    <tr>
	                    	<th></th>
	                        <th>品种名称</th>
	                        <th>English name</th>
	                        <th>类别</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="item in initBreedlist"  @click="serviceselected($index,item.id,item.name)">
	                    	<td>
	                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  ></label>
	                        </td>        
	                        <td>{{item.name}}</td>
	                        <td>{{item.eName}}</td>
	                        <td>{{item.categoryName}}</td>
	                    </tr>
	                </tbody>
	            </table>
			</div>
			<div class="base_pagination">
	            <pagination :combination="loadParam"></pagination>
	        </div>
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import {
    initBreedlist
} from '../../vuex/getters'
import {
    getBreedData,
    getBreedNameSearch
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
                name:'',
                eName:'',
                total:0
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
			initBreedlist
		},
		actions:{
			getBreedData,
			getBreedNameSearch
		}
	},
	methods:{
		serviceselected:function(sub,id,name){
			this.$store.state.table.basicBaseList.breedList[sub].checked=!this.$store.state.table.basicBaseList.breedList[sub].checked;
			for(var key in this.initBreedlist){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.breedList[key].checked==true){
						this.$store.state.table.basicBaseList.breedList[key].checked=false;
					}
				}
			}
			this.param.breedId= id;
			this.param.breedName = name;
			console.log(this.param.breedName)
			this.param.show=false;
			this.$dispatch('breed',this.param);
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
		this.getBreedData(this.loadParam);
	}
}
</script>
<style scoped>
.modal{
	z-index: 1085;
}
.modal_con{
	z-index: 1085;
}
.change_trans{
	margin-top: 20px;
}
.top-title{
	top:91px;
	position: fixed;
	right: 0;
	width: 800px;
	margin: auto;
	left: 0;
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

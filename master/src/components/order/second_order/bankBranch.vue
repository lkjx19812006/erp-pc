<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>银行支行</h4>
			<div class="trans_service clearfix">
    			<div class="cover_loading">
	                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
	            </div>
				<div class="clearfix">
	                <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="总行名称" @keyup.enter="employNameSearch()">
	                </div>
	                <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.province" placeholder="支行所在省"  @keyup.enter="employNameSearch()">
	                </div>
	                <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.city" placeholder="支行所在市"  @keyup.enter="employNameSearch()">
	                </div>
                    <div class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" v-model="loadParam.district" placeholder="支行所在区"  @keyup.enter="employNameSearch()">
                    </div>
	                <button class="new_btn" @click="employNameSearch()">{{$t('static.search')}}</button>
	                <button class="new_btn transfer" @click="reset()">{{$t('static.clear_all')}}</button>
	            </div>
	            <table class="table table-hover table_head table-striped " v-cloak>
	                <thead>
	                    <tr>
	                    	<th></th>
	                        <th>银行支行名称</th>
	                        <th>{{$t('static.province')}}</th>
                            <th>{{$t('static.city')}}</th>
                            <th>{{$t('static.area')}}</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="item in initBankBranchList" @click="serviceselected($index,item.id,item.subName)"> 
	                    	<td>
	                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"></label>
	                        </td>
	                        <td>{{item.subName}}</td>
	                        <td>{{item.province}}</td>
                            <td>{{item.city}}</td>
                            <td>{{item.district}}</td>
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
import pagination from '../../pagination'
import {
    initBankBranchList
} from '../../../vuex/getters'
import {
    getBankBranchList
} from '../../../vuex/actions'
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
                name:this.param.name,
                province:'',
                city:'',
                district:'',
                total:0
            },
		}
	},
	components:{
		pagination
	},
	vuex:{
		getters:{
			initBankBranchList
		},
		actions:{
			getBankBranchList
		}
	},
	methods:{
		serviceselected:function(sub,id,subName){
			this.$store.state.count.bankBranchList[sub].checked=!this.$store.state.count.bankBranchList[sub].checked;
			for(var key in this.initBankBranchList){
				if(key!=sub){
					if(this.$store.state.count.bankBranchList[key].checked==true){
						this.$store.state.count.bankBranchList[key].checked=false;
					}
				}
			}
			this.param.paySubName= subName;
			/*this.param.customerName = name;
			this.param.customerPhone = tel;
            this.param.email = email;*/
			this.param.show=false;
			this.$dispatch('subName',this.param);
		},
		employNameSearch: function() {
            this.getBankBranchList(this.loadParam);
        },
        reset:function(){
        	//this.loadParam.name='';
            this.loadParam.province='';
            this.loadParam.city='';
            this.loadParam.district='';
            this.getBankBranchList(this.loadParam);
        }
	},
    events: {
	    fresh: function(input) {
	        this.loadParam.cur = input;
	        this.getBankBranchList(this.loadParam);
	    }
    },
	created(){
		this.getBankBranchList(this.loadParam);
	}
}
</script>
<style scoped>
.modal{
	z-index: 1087;
}
.modal_con{
	z-index: 1087;
}
.top-title{
	position: fixed;
	margin: auto;
	right: 0;
	left: 0;
	width: 800px;
}
.change_trans{
	margin-top: 20px;
}
.con_trans{
	margin-top: 40px;
}
.transfer{
	margin-right: 7px;
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
.table_head>thead>tr{
	background-color: #f5f5f5;
	color: #333;
	font-size: 18px;
}
.base_pagination{
	margin-top: 0;
	position: relative;
}
table{
	display: table;
}
.name_search{
    margin-right:0;
}
</style>
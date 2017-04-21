<template>
   <div>
	 <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	 <div class="container modal_con" v-show="param.show">
       <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>{{$t('static.supplier')}}</h4>
	    	<div class="con_list">
                <div style="margin:10px 10px 15px 10px" class="clearfix">
                    <div class="input-group col-xs-4 pull-left">
                        <div class="input-group-addon"><img src="/static/images/search.png" height="20" width="20"></div>
                        <input type="text" class="form-control"  placeholder="{{$t('static.supplier_name')}}" v-model="loadParam.name"  @keyup.enter="selectSearch()">
                    </div> 
                    <div class="col-xs-1 pull-left"></div>
                    <div class="input-group col-xs-4 pull-left">
                        <div class="input-group-addon"><img src="/static/images/search.png" height="20" width="20"></div>
                        <select v-model="loadParam.type"  class="form-control"  @change="selectSearch()">
                            <option value="">{{$t('static.please_select')}}</option>
                            <option value="0">其它</option>
                            <option value="1">合作社</option>
                            <option value="2">药商</option>
                            <option value="3">药厂</option>
                            <option value="4">个体户</option>
                            <option value="5">药店</option>
                            <option value="6">医院</option>
                            <option value="7">贸易公司</option>
                            <option value="8">零售商行</option>
                            <option value="9">药农</option>
                            <option value="10">介绍人</option>
                            <option value="11">药贩子</option>
                            <option value="12">产地药商</option>
                            <option value="13">销地药商</option>
                            <option value="14">养生诊所</option>
                            <option value="15">化工厂</option>
                            <option value="16">化妆品厂</option>
                            <option value="17">提取物厂</option>
                            <option value="18">食品厂</option>
                            <option value="19">实验室</option>
                            <option value="20">网上电商</option>
                            <option value="21">中成药生产商</option>
                            <option value="22">西药生产商</option>
                            <option value="23">饮片厂</option>
                            <option value="24">茶类公司</option>
                      </select>
                    </div>
                    <button type="button" class="new_btn" @click="reset()">{{$t('static.clear_all')}}</button>
                    <button type="button" class="new_btn" style="margin-right:10px;" @click="selectSearch()">{{$t('static.search')}}</button>
                </div>
    			<div class="trans_service clearfix">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>    
		            <table class="table table-hover table_color table-striped" style="text-align:center" v-cloak>
		                <thead>
		                    <tr>
		                        <th></th>
		                        <th>{{$t('static.supplier_name')}}</th>
		                        <th>{{$t('static.client_type')}}</th>
		                        <th>{{$t('static.contact')}}</th>
                                <th>{{$t('static.cellphone')}}</th>
		                    </tr>
		                </thead>
		                <tbody>
		                    <tr v-for="item in initProductlist"  @click="selectEmployee($index,item)">
		                       <td>
		                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="selectEmployee($index,item)"></label>
		                        </td>
		                        <td>{{item.name}}</td>
		                        <td>{{item.typeDesc}}</td>
		                        <td>{{item.mainContact}}</td>
                                <td>{{item.mainPhone}}</td>
		                    </tr>
		                </tbody>
		            </table>
                    <div class="order_pagination">
                        <pagination :combination="loadParam"></pagination>
                    </div>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-close"  @click="param.show = fasle">{{$t('static.cancel')}}</button>
                        <button type="button"  class="btn btn-orange" v-if="param.customer==''" disabled="true">{{$t('static.confirm')}}</button>
                        <button type="button"  class="btn btn-orange" v-else  @click="confirmEmp()" >{{$t('static.confirm')}}</button>
                    </div>
    			</div>
	    	</div>
	    </div>
	</div>
  </div>
</template>
<script>
import pagination from '../../pagination.vue'
import {
    initProductlist,
} from '../../../vuex/getters'
import {
    getProductList
} from '../../../vuex/actions'
export default{
	components:{
        pagination
	},
	props:['param'],
	data(){
		return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total:0,
                link:this.param.link,
                employeeId:'',
                name:'',
                type:'',
                typeDesc:''
            }
		}
	},
	vuex:{
		getters:{
			initProductlist,
		},
		actions:{
			getProductList
		}
	},
	methods:{
        reset:function(){
            this.loadParam.name="";
            this.loadParam.type="";
            this.loadParam.typeDesc="";
            this.getProductList(this.loadParam);
        },
        selectSearch:function(){
            this.getProductList(this.loadParam);
        },
		selectEmployee:function(sub,item){
			this.$store.state.table.basicBaseList.productList[sub].checked=!this.$store.state.table.basicBaseList.productList[sub].checked;
            if(this.$store.state.table.basicBaseList.productList[sub].checked==true){
                this.param.customer = item.id;
            }else if(this.$store.state.table.basicBaseList.productList[sub].checked==false){
                this.param.customer = '';
            }
			for(var key in this.initProductlist){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.productList[key].checked==true){
						this.$store.state.table.basicBaseList.productList[key].checked=false;
					}
				}
			}
		},
        confirmEmp:function(){
            this.param.customer = '';
            this.param.customerName = '';
            this.param.consignee = '';
            this.param.consigneePhone = '';
            for(var key in this.initProductlist){
                if(this.$store.state.table.basicBaseList.productList[key].checked == true){
                    this.param.customer = this.$store.state.table.basicBaseList.productList[key].id;
                    this.param.customerName = this.$store.state.table.basicBaseList.productList[key].name;
                    this.param.consignee = this.$store.state.table.basicBaseList.productList[key].mainContact;
                    this.param.consigneePhone = this.$store.state.table.basicBaseList.productList[key].mainPhone;
                }
            }
            console.log(this.param);
            this.$dispatch('supplier', this.param);
            this.param.show = false;
        }
	},
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getProductList(this.loadParam);
            this.checked=false;
        }
    },
	created() {
        if('employeeId' in this.param){
            this.loadParam.employeeId=this.param.employeeId
        }
        this.getProductList(this.loadParam);
    }
}
</script>
<style scoped>
.modal {
	z-index:1085;
}
.modal_con {
    width: 900px;
    z-index: 1085;
}
.top-title{
	width: 900px;
	z-index: 1083;
    position: fixed;
    right: 0;
    left: 0;
    margin:auto;
}
.edit_footer{
	width:900px;
    z-index: 1000;
}
.trans_service{
	margin-top: 10px;
}
.con_list{
	position: relative;
}
.change_trans{
	margin-top: 20px;
}
.con_trans{
	margin-top: 40px;
}
.name_search{
    margin-top:30px;
}
.btn_shape{
    width:175px;
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
	font-size:14px;
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
.tans_tab .tabs_active_1{
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
.trans_service .col-xs-8{
	margin-bottom: 20px;
}
.table_head>thead>tr{
	color: #333;
	font-size: 18px;
}

.trans_parten{
    text-align: left;
}
.treeview{
    height:500px;
    border:0px;
}
.table{
    display: table;
}
</style>

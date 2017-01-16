<template>
	 <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
     <div class="cover_loading">
         <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
     </div>

	 <div class="container modal_con" v-show="param.show">
       <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>选择供应商</h4>
	    	<div class="con_list">
    			<div class="trans_service clearfix">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>    
		            <table class="table table-hover table_color table-striped" style="text-align:center" v-cloak>
		                <thead>
		                    <tr>
		                        <th></th>
		                        <th>供应商名称</th>
		                        <th>客户类型</th>
		                        <th>主要联系人</th>
                                <th>手机号</th>
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
                        <button type="button" class="btn btn-close"  @click="param.show = fasle">取消</button>
                        <button type="button"  class="btn btn-orange" v-if="param.customer==''" disabled="true">确定</button>
                        <button type="button"  class="btn btn-orange" v-else  @click="confirmEmp()" >确定</button>
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
                employeeId:this.param.employee
            },
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

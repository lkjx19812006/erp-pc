<template>
	<div v-show="param.send"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.send">
        <div @click="param.send = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	        <h4>寄样申请表</h4>
	        <div class="edit-model">
                <section class="editsection clearfix">
                	<div class="client-detailInfo col-md-6 col-xs-12">
                        <label class="editlabel">客户名称 <span class="system_danger" v-if="$validation.customer.required">请输入客户名称</span></label>
                         <input type="text" class="form-control edit-input"  id="customer" v-model="param.customerName"  onlyready="true" v-validate:customer="['required']" @click="searchCustomer(param.customerName,param.customerId,param.customerPhone)"/>
                    </div>
                    <div class="client-detailInfo  col-md-6 col-xs-12">
                        <label class="editlabel">类型</label>
                        <select  class="form-control edit-input"  v-model="param.type">
                            <option value="0">求购</option>
                            <option value="1">供应</option>
                        </select>
                    </div>
                </section>
            </div>
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import {
    initCustomerlist
} from '../../vuex/getters'
import {
    
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
                link:'/customer/employeeDistributed',
                name:'',
                phone:'',
                type:'',
                employeeId:'',
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
			initCustomerlist
		},
		actions:{
			
		}
	},
	methods:{
		serviceselected:function(sub,id,name,tel,email){
			this.$store.state.table.basicBaseList.customerList[sub].checked=!this.$store.state.table.basicBaseList.customerList[sub].checked;
			for(var key in this.initCustomerlist){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.customerList[key].checked==true){
						this.$store.state.table.basicBaseList.customerList[key].checked=false;
					}
				}
			}
			this.param.customerId= id;
			this.param.customerName = name;
			this.param.customerPhone = tel;
            this.param.email = email;
			this.param.show=false;
			this.$dispatch('customer',this.param);
		},
		employNameSearch: function() {
            this.getClientList(this.loadParam);
        },
        reset:function(){
        	this.loadParam.name='';
            this.loadParam.phone='';
        }
	},
	created(){
		if("employeeId" in this.param){
                this.loadParam.employeeId = this.param.employeeId;
        }
	}
}
</script>
<style scoped>
.modal{
	z-index: 1085;
}
.modal_con{
	z-index: 1085;
	top:60;
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
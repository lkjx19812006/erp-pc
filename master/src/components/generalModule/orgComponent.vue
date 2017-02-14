<template>
<div>
	<div v-show="param.show"  class="modal modal-main fade account-modal" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
       <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
            <h4>划转到部门</h4>
            <div class="cover_loading">
                <pulse-loader :loading="orgParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
	    	<div class="con_list">
                <div class="conditionTrans clear">
                    <label class="left">是否划转名下客户：</label>
                    <select v-model="param.transferCustomer" class="form-control left" style="width:12%;">
                        <option selected value="true">是</option>
                        <option value="false">否</option>
                    </select>
                </div>
                <div class="trans_parten">
                    <div>
                        <treeview :value.sync="id"
                            :model="initOrgList"
                            class="form-control"
                            labelname="name"
                            valuename="id"
                            children="lowerList"
                        ></treeview>
                    </div>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-close"  @click="param.show = fasle">取消</button>
                        <button type="button" class="btn btn-orange" @click="confirmOrg()">确定</button>
                    </div>
                </div>

	    	</div>
	    </div>
	</div>
</div>
</template>
<script>
import pagination from '../pagination'
import treeDialog from '../tips/treeDialog'
import {
    initCustomerlist,
    initEmployeeList,
    initOrgList,
    initLogin
} from '../../vuex/getters'
import {
    getClientList,
    getEmployeeList,
    getOrgList
} from '../../vuex/actions'
export default{
	components:{
        pagination,
        treeDialog
	},
	props:['param'],
	data(){
		return {
			checked:false,
			customerFlag:0,
            id: undefined, // Binded to component.
			orgParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total:''
            },
            treeParam:{
                show:false,
                callback:this.callback,
                orgId:'',
                orgName:''
            }

		}
	},

	vuex:{
		getters:{
			initCustomerlist,
			initEmployeeList,
			initOrgList,
            initLogin
		},
		actions:{
			getClientList,
			getEmployeeList,
			getOrgList
		}
	},
	methods:{
        callback:function(){
          console.log(this.treeParam);
          if(this.treeParam.orgId){
            this.loadParam.orgId=this.treeParam.orgId;
            this.loadParam.orgName=this.treeParam.orgName;
            this.employSearch();
          }
        },
		selectDepartment:function(id){
			this.$store.state.table.basicBaseList.orgList[id].checked=!this.$store.state.table.basicBaseList.orgList[id].checked;
			for(var key in this.initOrgList){
				if(key!=id){
					if(this.$store.state.table.basicBaseList.orgList[key].checked==true){
						this.$store.state.table.basicBaseList.orgList[key].checked=false;
					}
				}
			}
		},
        confirmEmp:function(){
            console.log(this.param);
            this.param.employeeId = '';
            this.param.employeeName = '';
            this.param.orgId = '';
            this.param.orgName = '';
            for(var key in this.initEmployeeList){
                if(this.$store.state.table.basicBaseList.employeeList[key].checked == true){
                    this.param.employeeId = this.$store.state.table.basicBaseList.employeeList[key].id;
                    this.param.employeeName = this.$store.state.table.basicBaseList.employeeList[key].name;
                    this.param.orgId = this.$store.state.table.basicBaseList.employeeList[key].orgid;
                    this.param.orgName = this.$store.state.table.basicBaseList.employeeList[key].orgName;
                }
            }
            console.log(this.param);
            this.$dispatch('selectEmpOrOrg', this.param);
            this.param.show = false;
            this.param.callback = this.param.callback;

        },
        confirmOrg:function(){
            console.log(this.param);
            this.$dispatch('selectEmpOrOrg', this.param);
            this.param.show = false;
        }
	},

    events: {
        fresh: function(input) {
            this.orgParam.cur = input;
            this.getOrgList(this.orgParam);
        },
        treeview_click:function(param){
            console.log(param)
            console.log(param.value);
            console.log(param.label);
            this.param.orgId = param.value;
            this.param.orgName = param.label;
        }
    },
	created() {
      this.getOrgList(this.orgParam);
    }
}
</script>
<style scoped>
.modal {
	z-index:1085;
}
.modal_con {
    width:600px;
    z-index: 1085;
}
.top-title{
	width: 600px;
	z-index: 1083;
    position: fixed;
    right: 0;
    left: 0;
    margin:auto;
}
.edit_footer{
	width:600px;
    z-index: 1000;
}
.trans_service{
	margin-top: 10px;
}
.conditionTrans{
    text-align: left;
    font-size: 14px;
    padding: 5px 14px;
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
	/* background-color: #f5f5f5; */
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
    margin-bottom: 0;
}
</style>

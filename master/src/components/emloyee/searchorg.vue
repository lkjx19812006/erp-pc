<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>部门信息</h4>
			<div class="trans_service clearfix">
    			<div class="cover_loading">
	                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
	            </div>
	            <!-- <table class="table table-hover table_head table-striped " v-cloak>
                    <thead>
                        <tr>
                            <th></th>
                            <th>部门</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initOrgList">
                            <td  @click.stop="">
                               <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="serviceselected($index,item.id,item.name,item.code)" ></label>
                            </td>
                            <td>{{item.name}}</td>
                        </tr>
                    </tbody>
                </table> -->
                <div class="trans_parten">
                    <treeview :value.sync="id"
                        :model="$store.state.table.basicBaseList.orgList"
                        class="form-control"
                        labelname="name"
                        valuename="id"
                        codename="code"
                        children="lowerList"
                    ></treeview>
                </div>
			</div>
	    </div>
        <div class="edit_footer">
                <button type="button" class="btn btn-close"  @click="param.show = fasle">取消</button>
                <button type="button" class="btn btn-orange" @click="confirm()">确定</button>
        </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import {
    initOrgList
} from '../../vuex/getters'
import {
    getOrgList
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
                all: 7
            },
			checked:false,
			show:true,
            id: undefined, // Binded to component.
		}
	},
	components:{
		pagination
	},
	vuex:{
		getters:{
			initOrgList
		},
		actions:{
			getOrgList
		}
	},
	methods:{
		serviceselected:function(sub,id,name,code){
			this.$store.state.table.basicBaseList.orgList[sub].checked=!this.$store.state.table.basicBaseList.orgList[sub].checked;
			for(var key in this.initOrgList){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.orgList[key].checked==true){
						this.$store.state.table.basicBaseList.orgList[key].checked=false;
					}
				}
			}
			this.param.orgid= id;
			this.param.orgcode= code;
			this.param.orgName = name;
			
		},
		employNameSearch: function() {
            this.getOrgList(this.loadParam);
        },
        confirm:function(){
            this.param.show=false;
            console.log(this.param);
            this.$dispatch('org',this.param);
        }

	},
    events: {  
      treeview_click:function(param){
        if('all' in this.param&&this.param.all===true){      //获取所有部门信息
            console.log('所有部门');
            this.param.orgid= param.value;
            this.param.orgcode= param.code;
            this.param.orgName = param.label;
        }else if('leaf' in this.param&&this.param.leaf===true){
            console.log('叶子');
            if(param.children.length==0){   //获取叶子节点部门信息
                this.param.orgid= param.value;
                this.param.orgcode= param.code;
                this.param.orgName = param.label;
            }
        }
        
      }
    },
	created(){
		this.getOrgList(this.loadParam);
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
.trans_parten{
    text-align: left;
}
.treeview{
    height:500px;
    border:0px;
}
</style>
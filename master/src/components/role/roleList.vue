<template>
	<div class="clear">
		<editscope-model :param="editMenuParam" v-if="editMenuParam.show"></editscope-model>
		<tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <div  style="width:25%;float:left;position:relative;">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
          <div class="clear operate_menu">
            <button class="btn btn-default pull-left" @click="addMenu()">添加菜单</button>
            <button class="btn btn-default pull-right transfer" @click="deleteMenu({
              id:'',
              show:false,
              link:specDel,
              url:'/org/'
              })">删除菜单</button>
            <button class="btn btn-default pull-right" @click="editMenu()">编辑菜单</button>
          </div>
          <div class="trans_parten clear">
                <div class="clear">
                    <ul v-for="item in list.result" class="clear"> 
                        <li>
                            <div class="clear">
                                <p class="line_text" v-bind:class="{'line_text':!list.result[$index].show,'select_line_text':list.result[$index].show}" @click="selectShow(list.result[$index])">{{list.result[$index].cname}}</p>
                                <!-- 二级目录 -->
                                <div v-for="subItem in list.result[$index].subcategory"  class="sub_second clear">
                                    <p class="line_text" v-bind:class="{'line_text':!subItem.show,'select_line_text':subItem.show}" @click="selectShow(subItem)">{{subItem.cname}}</p>
                                    <!-- 三级功能 -->
                                    <!-- <div  class="sub_second clear" v-for="secondItem in subItem.subcategory"> </div> -->
                                    <!-- <ul  class="sub_second clear" v-show="false"> 
                                        <li class="clear">
                                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}"   @click="selectShow(secondItem)" >
                                            </label>
                                            <p class="line_text">{{secondItem.cname}}22</p>
                                        </li>
                                        <li class="clear">
                                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}"   @click="selectShow(secondItem,$index)" >
                                            </label>
                                            <p class="line_text">{{secondItem.cname}}22</p>
                                        </li>
                                    </ul>  -->
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
          </div>
        </div>
	</div>
</template>
<script>
/*import mglistModel from '../mguan/mgListComponent'*/
import treeDialog from '../generalModule/orgComponent'
import editscopeModel from '../role/editScope'
import tipsModel from '../tips/tipDialog'
import {
	initScopeDetail
} from '../../vuex/getters.js'
import {
   baseGetData,
   scopedOperate,
   baseAddData,
   baseUpdateData
} from '../../vuex/actions.js'
export default {
    components: {
       /*mglistModel,*/
       treeDialog,
       editscopeModel,
       tipsModel
    },
    props: ['param'],
    data() {
        return {
            arr:[0,1,2,3,4],
            dateText:'',
            show:true,
            loadParam:{
            	loading:false,
            	color: '#5dc596',
                size: '15px',
                url:'/sys/menu/',
                cur:1,
                keyName:'menu'
            },
            tipsParam:{
            	show:false,
            	name:'',
            	alert:true
            },
            editMenuParam:{
            	show:false,
            	cname:'',
            	ename:'',
            	icon:'',
            	id:'',
            	pid:'',
            	type:'',
            	remark:''
            }
        }
    },
    methods:{
    	selectShow:function(item){
    		/*--循环所有的层级的show置为false,最后自己本身为true(如果是关联显示应该判断父级和子级的显示)--*/
	        for(var i in this.list.result){ 
        		if(this.list.result[i].show){
        			this.list.result[i].show = false;
        		}
        		let subcategory = this.list.result[i].subcategory;
        		for(var j in subcategory){
        			if(subcategory[j].show){
        				subcategory[j].show = false;
        			}
        		}
        	}
	        item.show =true; 
	        this.scopedOperate(item);
	        console.log(this.initScopeDetail)
	        console.log(item)
	    },
	    addMenu:function(){
	       this.editMenuParam.show=true;
           this.editMenuParam.title='添加菜单';
           this.editMenuParam.cname='';
           this.editMenuParam.ename='';
           this.editMenuParam.icon='';
           this.editMenuParam.pid='';
           this.editMenuParam.remark='';
           this.editMenuParam.type=''; // 0/1 页面/功能 
           this.editMenuParam.url='';
	    },
	    editMenu:function(){
	       this.editMenuParam.show=true;
           this.editMenuParam.title='编辑菜单';
           this.editMenuParam.link = '/sys/menu/';
           this.editMenuParam.cname=this.initScopeDetail.cname;
           this.editMenuParam.ename=this.initScopeDetail.ename;
           this.editMenuParam.icon=this.initScopeDetail.icon;
           this.editMenuParam.pid=this.initScopeDetail.pid;
           this.editMenuParam.remark=this.initScopeDetail.remark;
           this.editMenuParam.type=this.initScopeDetail.type; // 0/1 页面/功能 
           this.editMenuParam.url=this.initScopeDetail.url;
           this.editMenuParam.callback = this.callback;
	    },
	    callback:function(title){
	    	this.tipsParam.show = true;
	    }
    },
    vuex: {
        getters: {
          list:state => state.tablelist.menu.list,
          initScopeDetail
        },
        actions: {
           baseGetData,
           baseAddData,
           scopedOperate,
           baseUpdateData
        }
    },
    watch:{
    	'selectShow':function(val,oldval){
    		console.log(val)
    		console.log(oldval)
    	}
    },
    created(){
        this.baseGetData(this.loadParam);
    }
}
</script>
<style  scoped>
.line_text{
    margin-top:10px;
    float:left;
    margin-left:20px;
}
.select_line_text{
	margin-top:10px;
    float:left;
    color:#fa6705;
    margin-left:20px;
    font-weight: 700;
}
.sub_second{
    margin-left: 26px;
    clear:both;
    white-space: normal;
}
.transfer{
	margin-left:8px;
}
.operate_menu{
	position: relative;
	margin-top: 20px;
}
.trans_parten{
	position: absolute;
	left:0;
	right:0;
	max-height: 700px;
	overflow-y: auto;
}
</style>
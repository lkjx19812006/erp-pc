<template>
	<div class="clear">
        <div  style="width:25%;float:left;position:relative;">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
          <div class="clear operate_menu">
            <button class="btn btn-default pull-left" @click="addOrg()">添加菜单</button>
            <button class="btn btn-default pull-right transfer" @click="deleteOrg({
              id:'',
              show:false,
              link:specDel,
              url:'/org/'
              })">删除菜单</button>
            <button class="btn btn-default pull-right" @click="editOrg()">编辑菜单</button>
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
import {
   baseGetData,
   scopedOperate,
   baseAddData,
   baseUpdateData
} from '../../vuex/actions.js'
export default {
    components: {
       /*mglistModel,*/
       treeDialog
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
	        console.log(item)
	    }
    },
    vuex: {
        getters: {
          list:state => state.tablelist.menu.list
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
<style type="scoped">
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
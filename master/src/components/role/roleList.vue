<template>
	<div>
		<!-- 左侧部门 -->
	    <mglist-model style="width:30%;float:left">
	        <!-- 头部搜索 -->
	        <div slot="top" style="height:42px;">
	        </div>
	        <!-- 中间列表 -->
	        <div slot="form">
	          <div class="cover_loading">
	              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
	          </div>
	          <div class="clear">
	            <button class="btn btn-default pull-left" @click="addOrg()">添加菜单</button>
	            <button class="btn btn-default pull-right transfer" @click="deleteOrg({
	              id:'',
	              show:false,
	              link:specDel,
	              url:'/org/'
	              })">删除菜单</button>
	            <button class="btn btn-default pull-right" @click="editOrg()">编辑菜单</button>
	          </div>
	          <div class="trans_parten">
	            <div>
                    <div class="clear">
                        <ul v-for="item in list.result">
                            <li>
                                <div class="clear">
                                   <!--  <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index].show,'checkbox_select_base':list.result[$index].show}"   @click="selectShow(list.result[$index])" >
                                   </label> -->
                                    <p class="line_text" v-bind:class="{'line_text':!list.result[$index].show,'select_line_text':list.result[$index].show}" @click="selectShow(list.result[$index],$index)">{{list.result[$index].cname}}</p>
                                    <!-- 二级目录 -->
                                    <div v-for="subItem in list.result[$index].subcategory"  class="sub_second clear">
                                        <!-- <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)" >
                                        </label> -->
                                        <p class="line_text" v-bind:class="{'line_text':!subItem.show,'select_line_text':subItem.show}" @click="selectShow(subItem,$index)">{{subItem.cname}}</p>
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
	    </mglist-model>
	</div>
</template>
<script>
import mglistModel from '../mguan/mgListComponent'
import treeDialog from '../generalModule/orgComponent'
import {
   baseGetData,
   baseAddData,
   baseUpdateData
} from '../../vuex/actions.js'
export default {
    components: {
       mglistModel,
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
    	selectShow:function(item,index){
	        item.show=!item.show;
	        console.log(item)
	        if(item.pid==0&&item.subcategory.length==0){
	            for(let i in item.subcategory){
	                item.subcategory[i].show=item.show;
	            }
	        }else if(item.pid==0&&item.subcategory.length!==0){
	        	for(let i in item.subcategory){
	                item.subcategory[i].show=item.show;
	            }
	        }else{
	            let category;
	            for(let i in this.list.result){
	                if(this.list.result[i].id==item.pid){
	                   category= this.list.result[i];
	                }
	            }
	            category.show=item.show;
	            console.log(item.show)
	            console.log(category.show)
	            if(!item.show){
	                for(let i in category.subcategory){
	                    if(category.subcategory[i].show){
	                       category.show=true; 
	                    }
	                }
	            }
	        }
	        for(var key in this.list.result){
	          let menuList = this.$store.state.tablelist.menu.list.result;
              if(key!=index){
                if(menuList[key].show==true&&menuList[key].subcategory.length==0){
                    menuList[key].show=false;
                }else if(menuList[key].show==true&&menuList[key].subcategory.length>0){
                	menuList[key].show=false;
                	for(var i in menuList[key].subcategory){
                		if(i!=index){
                			if(menuList[key].subcategory[i].show==true){
                				menuList[key].subcategory[i].show=false;
                			}
                		}else if(i==key){
                			menuList[key].show=false;
                			menuList[key].subcategory[i].show=true;
                		}
                	}
                }
              }
            }

	    },
    },
    vuex: {
        getters: {
          list:state => state.tablelist.menu.list
        },
        actions: {
           baseGetData,
           baseAddData,
           baseUpdateData
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
</style>
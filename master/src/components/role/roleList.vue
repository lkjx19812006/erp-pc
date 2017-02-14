<template>
	<div>
		<!-- 左侧部门 -->
	    <mglist-model style="width:20%;float:left">
	        <!-- 头部搜索 -->
	        <div slot="top" style="height:42px;">
	        </div>
	        <!-- 中间列表 -->
	        <div slot="form">
	          <div class="cover_loading">
	              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
	          </div>
	          <div class="clear">
	            <button class="btn btn-default pull-left" @click="addOrg()">添加部门</button>
	            <button class="btn btn-default pull-right transfer" @click="deleteOrg({
	              id:'',
	              show:false,
	              link:specDel,
	              url:'/org/'
	              })">删除部门</button>
	            <button class="btn btn-default pull-right" @click="editOrg()">编辑部门</button>
	          </div>
	          <div class="trans_parten">
	            <div>
                    <div class="clear">
                        <ul v-for="item in list.result">
                            <li>
                                <div class="clear">
                                    <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index].show,'checkbox_select_base':list.result[$index].show}"   @click="selectShow(list.result[$index])" >
                                    </label>
                                    <p class="line_text">{{list.result[$index].cname}}</p>
                                    <!-- 二级目录 -->
                                    <div v-for="subItem in list.result[$index].subcategory"  class="sub_second clear">
                                        <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)" >
                                        </label>
                                        <p class="line_text">{{subItem.cname}}</p>
                                        <!-- 三级功能 -->
                                        <!-- <div  class="sub_second clear" v-for="secondItem in subItem.subcategory"> </div> -->
                                        <ul  class="sub_second clear" v-show="false"> 
                                            <li class="clear">
                                                <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}"   @click="selectShow(secondItem)" >
                                                </label>
                                                <p class="line_text">{{secondItem.cname}}22</p>
                                            </li>
                                            <li class="clear">
                                                <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}"   @click="selectShow(secondItem)" >
                                                </label>
                                                <p class="line_text">{{secondItem.cname}}22</p>
                                            </li>
                                        </ul> 
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
                cur:1
            }
        }
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
<template>
     <chancedetail-model :param.sync="chanceParam" v-if="chanceParam.show"></chancedetail-model>
     <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
     <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
     <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
     <editintent-model :param="editParam" v-if="editParam.show"></editintent-model>
     <createintent-model :param="createParam" v-if="createParam.show"></createintent-model>
   <!--   <offerinfo-model :param="offerParam" v-if="offerParam.show"></offerinfo-model> -->
     
	 <div v-show="!chanceParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">我的报价</div>
            <div class="col-xs-5 my_order_search">
               <div class="name_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" placeholder="按客户名称搜索" v-model="loadParam.customerName"  @keyup.enter="searchOffer()">
               </div>
              <div class="ordertel_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" v-model="loadParam.name" placeholder="按客户名称搜索">
               </div>
           </div> 
            <div class="right col-xs-2">
              <button class="new_btn transfer" @click="searchOffer()">搜索</button>
              <!-- <button class="new_btn" @click="createIntention()">新建</button> -->
            </div>
        </div>
        <div class="service-nav clearfix">
            <div class="my_order_search">
               <div class="filter_search clearfix">
                    
               </div>
           </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak>
                <thead>
                    <tr>  
                        <th>
                        	<label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label>
                        </th>
                        <th>意向ID</th>	
                        <th>单价</th>
                        <th>数量</th>
                        <th>总价</th>
                        <th>杂费</th>
      	            	<th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOfferList">
                         <td  >
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>
                        </td>
                        <td>{{item.intentionId}}</td>
                        <td>{{item.price}}</td> 
                        <td>{{item.number}}</td> 
                        <td>{{item.total}}</td> 
                        <td>{{item.incidentals}}</td> 
                        <td @click.stop="clickShow($index)">
                           <img height="24" width="24" src="/static/images/default_arrow.png" />
                           <div class="component_action" v-show="item.show">
                               <ul>
                                   <li @click="">编辑</li>
                                   <li @click="">删除</li>
                               </ul>
                           </div>
                       </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import chancedetailModel from '../../Intention/chanceDetail'
import transferintentModel from '../../Intention/transferIntent'
import tipsdialogModel  from '../../tipsDialog'
import deletebreedModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import editintentModel  from  '../../Intention/Editintention'
import createintentModel from '../../Intention/createIntention'
/*import offerinfoModel from '../../Intention/offerInfo'*/

import {
	initOfferList
} from '../../../vuex/getters'
import {
	getOfferList,
	
	
} from '../../../vuex/actions'
export default {
    components: {   
        pagination,
        chancedetailModel,
        transferintentModel,
        tipsdialogModel,
        deletebreedModel,
        editintentModel,
        createintentModel
    },
    vuex: {
        getters: {
            initOfferList
        },
        actions: {
            getOfferList,
            
            
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                link:'/intention/employee/list',
                type:'',
                invoic:'',
                visit:'',
                intl:'',
                sampling:'',
                status:'',
                advance:'',
                customerName:''
            },
            chanceParam:{
                show:false
            },
            intentionParam:{
                show:false,
                id:'',
                name:'意向'
            },
            tipsParam:{
                show:false,
                name:'请先选择意向'
            },
            deleteParam:{
            	show:false
            },
            editParam:{
            	show:false
            },
            createParam:{
            	show:false
            },
            offerParam:{
            	show:false,
            	id:''
            },
            checked:false
        }
    },
    methods: {
        clickShow:function(index){
        	this.$store.state.table.basicBaseList.offerList[index].show=!this.$store.state.table.basicBaseList.offerList[index].show;
        }, 
        onlyselected:function(index){
        	var _this = this;
            this.$store.state.table.basicBaseList.offerList[index].checked=!this.$store.state.table.basicBaseList.offerList[index].checked;
            if(!this.$store.state.table.basicBaseList.offerList[index].checked){
            	this.checked = false;
            }else{
            	this.checked = true;
            	this.$store.state.table.basicBaseList.offerList.forEach(function(item){
            		if(!item.checked){
            			_this.checked = false;
            		}
            	})
            }	
            
           
        },
        checkedAll:function(){
   			this.checked = !this.checked;
   			if(this.checked){
   				this.$store.state.table.basicBaseList.offerList.forEach(function(item){
   					item.checked = true;
   				})		
   			}else{
   				this.$store.state.table.basicBaseList.offerList.forEach(function(item){
   					item.checked = false;
   				})
   			}   	
        },
        
       
        
        
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOfferList(this.loadParam);
        }
    },
    created() {
        this.getOfferList(this.loadParam, this.loadParam.all);
    },
    filter: (filter,{})
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-left: 18px;
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
</style>


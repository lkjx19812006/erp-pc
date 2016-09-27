<template>
     <chancedetail-model :param.sync="chanceParam" v-if="chanceParam.show"></chancedetail-model>
     <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
     <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
     <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
     <editintent-model :param="editParam" v-if="editParam.show"></editintent-model>
     <createintent-model :param="createParam" v-if="createParam.show"></createintent-model>
     <offerinfo-model :param="offerParam" v-if="offerParam.show"></offerinfo-model>
	 <div v-show="!chanceParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">意向</div>
            <div class="col-xs-5 my_order_search">
               <div class="name_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" placeholder="按客户名称搜索" v-model="loadParam.customerName"  @keyup.enter="searchChance()">
               </div>
              <!--  <div class="ordertel_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" v-model="loadParam.name" placeholder="按客户名称搜索">
               </div>-->
           </div> 
            <div class="right col-xs-2">
              <button class="new_btn transfer" @click="searchChance()">搜索</button>
                <button class="new_btn" @click="createIntention({
                       show:true,
                       title:'新建',
                       customerName:'',
                       customerId:'',
                       customerPhone:'',
                       breedName:'',
                       breedId:'',
                       type:'',
                       especial:'',
                       qualification:'',
                       quality:'',
                       spec:'',
                       number:'',
                       unit:'',
                       price:'',
                       address:'',
                       location:'',
                       advance:'',
                       invoic:'',
                       visit:'',
                       pack:'',
                       intl:'',
                       visit:'',
                       sampling:'',
                       sampleNumber:'',
                       sampleUnit:'',
                       sampleAmount:'',
                       status:'',
                       country:'',
                       province:'',
                       city:'',
                       district:'',
                       address:'',
                       link:createIntentionInfo,
                       url:'/intention/'
                       })">新建</button> 
            </div>
        </div>
        <div class="service-nav clearfix">
            <div class="my_order_search">
               <div class="filter_search clearfix">
                    <dl class="clearfix">
                        <dt>类型：</dt>
                        <dd>
                            <select  v-model="loadParam.type" @change="searchChance()">
                                <option value="">请选择类型</option>
                                <option value="0">求购</option>
                                <option value="1">供应</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>是否提供发票：</dt>
                        <dd>
                            <select v-model="loadParam.invoic" @change="searchChance()">
                                <option value="">请选择发票</option>
                                <option value="0">无发票</option>
                                <option value="1">普通发票</option>
                                <option value="2">增值发票</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>是否上门看货：</dt>
                        <dd>
                            <select v-model="loadParam.visit" @change="searchChance()">
                                <option value="">请选择</option>
                                <option value="0">不看</option>
                                <option value="1">会看</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>是否提供样品：</dt>
                        <dd>
                            <select v-model="loadParam.sampling" @change="searchChance()">
                                <option value="">请选择样品</option>
                                <option value="0">无</option>
                                <option value="1">有</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>选择状态：</dt>
                        <dd>
                            <select v-model="loadParam.status" @change="searchChance()">
                                <option value="">请选择状态</option>
                                <option value="0">待审</option>
                                <option value="1">通过</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>预付比例：</dt>
                        <dd>
                            <select v-model="loadParam.advance" @change="searchChance()">
                                <option value="">请选择预付比例</option>
                                <option value="0">0</option>
                                <option value="1">100%</option>
                                <option value="0.1">10%</option>
                                <option value="0.2">20%</option>
                                <option value="0.3">30%</option>
                                <option value="0.4">40%</option>
                                <option value="0.5">50%</option>
                                <option value="0.6">60%</option>
                                <option value="0.7">70%</option>
                                <option value="0.8">80%</option>
                                <option value="0.9">90%</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>是否是国际信息：</dt>
                        <dd>
                            <select v-model="loadParam.intl" @change="searchChance()">
                                <option value="">通过国际搜索</option>
                                <option value="0">国内</option>
                                <option value="1">国际</option>
                            </select>
                        </dd>
                    </dl>
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
                        <th></th>
                        <th>类型</th>
      	            		<th>特殊的</th>
      	            		<th>客户名称</th>
      	            		<th>客户手机号</th>
      	            		<th>品种名称</th>
      	            		<th>资格资质</th>
      	            		<th>规格</th>
      	            		<th>单位</th>
                        <th>单价</th>
                        <th>产地</th>
                        <th>数量</th>
                        <th>国家</th>
                        <th>所在省</th>
                        <th>所在市</th>
                        <th>所在区</th>
	            		      <th>交收地址</th>
      	            		<th>预付比例</th>
      	            		<th>发票</th>
      	            		<th>上门看货</th>
      	            		<th>包装</th>
      	            		<th>是否国际</th>
      	            		<th>提供样品</th>
      	            		<th>样品数量</th>
      	            		<th>样品单位</th>
      	            		<th>样品价格</th>
      	            		<th>报价人数</th>
      	            		<th>审核状态</th>
      	            		<th></th>
                    </tr>
                </thead>
                <tbody>
                  <!--  <tr>
                      <td>
                          <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label>
                      </td>
                      <td>全选</td>
                  </tr> -->
                    <tr v-for="item in initIntentionList">
                         <td  @click.stop="">
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>
                        </td>
                        <td>{{item.type | chanceType}}</td>
                        <td>{{item.especial | chanceEspec}}</td>
                        <td>{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td class="underline" @click="chanceClick({
                                id:item.id,
                                sub:$index,
                                show:true,
                                customerName:item.customerName,
                                customerPhone:item.customerPhone,
                                breedName:item.breedName,
                                type:item.type,
                                especial:item.especial,
                                qualification:item.qualification,
                                spec:item.spec,
                                number:item.number,
                                unit:item.unit,
                                price:item.price,
                                address:item.address,
                                location:item.location,
                                advance:item.advance,
                                invoic:item.invoic,
                                visit:item.visit,
                                pack:item.pack,
                                intl:item.intl,
                                visit:item.visit,
                                sampling:item.sampling,
                                sampleNumber:item.sampleNumber,
                                sampleUnit:item.sampleUnit,
                                sampleAmount:item.sampleAmount,
                                offer:item.offer,
                                status:item.status,
                                country:item.country,
                                province:item.province,
                                city:item.city,
                                district:item.district,
                                address:item.address,
                                link:editintentInfo,
                                url:'/intention/',
                                key:'intentionList'
                                })">{{item.breedName}}</td>
                        <td>{{item.qualification | qualify}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.unit}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.number}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.district}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.advance}}</td>
                        <td>{{item.invoic | invoicstate}}</td>
                        <td>{{item.visit | visitstate}}</td>
                        <td>{{item.pack}}</td>
                        <td>{{item.intl | intlstata}}</td>
                        <td>{{item.sampling}}</td>
                        <td>{{item.sampleNumber}}</td>
                        <td>{{item.sampleUnit}}</td>
                        <td>{{item.sampleAmount}}</td>
                        <td class="underline" @click="offerDetail(item.id)">{{item.offerNumber}}</td>
                        <td>{{item.status | status}}</td>
                        <td @click.stop="eventClick($index)">
                           <img height="24" width="24" src="/static/images/default_arrow.png" />
                           <div class="component_action" v-show="item.show">
                               <ul>
                                   <li @click="modifyClient({
                                               id:item.id,
                                               sub:$index,
                                               show:true,
                                               title:'编辑',
                                               customerName:item.customerName,
                                               customerPhone:item.customerPhone,
                                               breedName:item.breedName,
      				                                type:item.type,
      				                                especial:item.especial,
      				                                qualification:item.qualification,
      				                                spec:item.spec,
      				                                number:item.number,
      				                                unit:item.unit,
      				                                price:item.price,
      				                                address:item.address,
      				                                location:item.location,
      				                                advance:item.advance,
      				                                invoic:item.invoic,
      				                                visit:item.visit,
      				                                pack:item.pack,
      				                                intl:item.intl,
      				                                visit:item.visit,
      				                                sampling:item.sampling,
      				                                sampleNumber:item.sampleNumber,
      				                                sampleUnit:item.sampleUnit,
      				                                sampleAmount:item.sampleAmount,
      				                                offer:item.offer,
      				                                status:item.status,
                                               country:item.country,
                                               province:item.province,
                                               city:item.city,
                                               district:item.district,
                                               address:item.address,
                                               link:editintentInfo,
                                               url:'/intention/',
                                               key:'intentionList'
                                               })">编辑</li>
                                   <li @click="specDelete({
                                               id:item.id,
                                               sub:$index,
                                               show:true,
                                               name:item.name,
                                               title:'意向',
                                               link:deleteInfo,
                                               url:'/intention/',
                                               key:'intentionList'
                                               })">删除</li>
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
import pagination from '../components/pagination'
import filter from '../filters/filters'
import chancedetailModel from '../components/Intention/chanceDetail'
import transferintentModel from '../components/Intention/transferIntent'
import tipsdialogModel  from '../components/tipsDialog'
import deletebreedModel from '../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import editintentModel  from  '../components/Intention/Editintention'
import createintentModel from '../components/Intention/createIntention'
import offerinfoModel from '../components/Intention/offerInfo'
import {
	initIntentionList
} from '../vuex/getters'
import {
	getIntentionList,
	deleteInfo,
	editintentInfo,
	createIntentionInfo,
	getOffersdetail
} from '../vuex/actions'
export default {
    components: {   
        pagination,
        chancedetailModel,
        transferintentModel,
        tipsdialogModel,
        deletebreedModel,
        editintentModel,
        createintentModel,
        offerinfoModel
    },
    vuex: {
        getters: {
            initIntentionList
        },
        actions: {
            getIntentionList,
            deleteInfo,
            editintentInfo,
            createIntentionInfo,
            getOffersdetail
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
            }
        }
    },
    methods: {
         eventClick:function(sub){
            if(this.$store.state.table.basicBaseList.intentionList[sub].show){
                this.$store.state.table.basicBaseList.intentionList[sub].show = !this.$store.state.table.basicBaseList.intentionList[sub].show;
            }else{
                this.$store.state.table.basicBaseList.intentionList[sub].show=true;
            }
        },
        chanceClick:function(initIntentionList){
            this.chanceParam = initIntentionList;
        },
        onlyselected:function(sub,id){
            this.$store.state.table.basicBaseList.intentionList[sub].checked=!this.$store.state.table.basicBaseList.intentionList[sub].checked;
            for(var key in this.initIntentionList){
                if(key!=sub){
                    if(this.$store.state.table.basicBaseList.intentionList[key].checked==true){
                        this.$store.state.table.basicBaseList.intentionList[key].checked=false;
                    }
                }
             }
            this.id = id;
        },
        clientTransfer:function(initIntentionList){
            this.intentionParam = initIntentionList;
            console.log(this.initIntentionList)
            for(var i in this.initIntentionList){
                if(this.initIntentionList[i].checked){
                    if(this.initIntentionList[i].checked==true){
                         this.intentionParam.id=this.initIntentionList[i].id;
                         this.intentionParam = this.initIntentionList[i];
                         this.intentionParam.show=true;
                    }  
                }else if(this.intentionParam.id==""&&!this.initIntentionList[i].checked){
                    this.tipsParam.show= true;
                    this.tipsParam.name= '请先选择业务机会';
                    this.intentionParam.show=false;
                }
            }
        },
        searchChance:function(){
            this.getIntentionList(this.loadParam)
        },
        specDelete:function(initIntentionList){
        	this.deleteParam = initIntentionList;
        },
        modifyClient:function(initIntentionList){
        	this.editParam = initIntentionList;
        },
        createIntention:function(initIntentionList){
        	   this.createParam = initIntentionList;
        },
        offerDetail:function(id){
        	this.offerParam.show=true;
        	this.offerParam.id=id;
        	this.getOffersdetail(this.offerParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntentionList(this.loadParam);
        }
    },
    created() {
        this.getIntentionList(this.loadParam, this.loadParam.all);
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
    background-image: url(../../static/images/unselect.png);
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
    background-image: url(../../static/images/selected.png);
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

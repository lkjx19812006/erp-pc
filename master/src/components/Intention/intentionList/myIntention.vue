<template>
     <chancedetail-model :param.sync="chanceParam" v-if="chanceParam.show"></chancedetail-model>
     <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
     <intentionaudit-model :param="intentionAuditParam" v-if="intentionAuditParam.show"></intentionaudit-model>
     <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
     <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
     <editintent-model :param="editParam" v-if="editParam.show"></editintent-model>
     <createintent-model :param="createParam" v-if="createParam.show"></createintent-model>
     <supdem-model :param="supdemParam" v-if="supdemParam.show"></supdem-model>
     <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
     <audit-dialog :param.sync="auditParam" v-if="auditParam.show"></audit-dialog>

	 <div v-show="!chanceParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">我的意向</div>
            <div class="col-xs-5 my_order_search">
               <!-- <div class="name_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" placeholder="按客户名称搜索" v-model="loadParam.customerName"  @keyup.enter="searchIntention()">
               </div>
                             <div class="ordertel_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" v-model="loadParam.name" placeholder="按客户名称搜索">
               </div> -->
           </div>
            <div class="right">
                <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
                <button class="new_btn transfer" @click="search()">搜索</button>
                <!-- <button class="new_btn transfer" @click="intentionAudit()">审核</button> -->
               <!--  <button class="new_btn transfer" @click="upOrDown({
                                                               onSell:2
                                                             })">下架</button>
               <button class="new_btn transfer" @click="upOrDown({
                                                             onSell:1
                                                           })">上架</button> -->
                <button class="new_btn" @click="createIntention({
                       show:true,
                       selectCustomer:true,
                       flag:0,
                       employeeId:'100014',
                       title:'新建',
                       customerName:'',
                       customerId:'',
                       customerPhone:'',
                       breedName:'',
                       breedId:'',
                       type:0,
                       especial:1,
                       validate:0,
                       qualification:'',
                       quality:'',
                       spec:'',
                       number:'',
                       unit:'',
                       price:'',
                       address:'',
                       location:'',
                       advance:0,
                       invoic:0,
                       visit:'',
                       pack:'',
                       intl:0,
                       visit:0,
                       sampling:0,
                       sampleNumber:0,
                       sampleUnit:'',
                       sampleAmount:0,
                       country:'中国',
                       province:'',
                       city:'',
                       district:'',
                       address:'',
                       key:'intentionList',
                       link:createIntentionInfo,
                       inType:3,
                       url:'/intention/',
                       image_f:'',
                       image_s:'',
                       image_t:'',
                       images:'',
                       audit:0,
                       onSell:0
                       })">新建</button>
            </div>
        </div>
        <div class="service-nav clearfix">
            <div class="my_order_search">

           </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak>
                <thead>
                    <tr>
                        <!--<th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label></th>-->
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
                        <th>上下架</th>
      	            		<th></th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in initIntentionList"
                        @click="match(item)"  style="cursor:pointer">
                         <!--<td>-->
                            <!--<label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>-->
                        <!--</td>-->
                        <td>{{item.type | chanceType}}</td>
                        <td>
                            <div v-if="item.especial==0">普通</div>
                            <div v-if="item.especial==1&&item.type==0">紧急求购</div>
                            <div v-if="item.especial==1&&item.type==1">低价资源</div>
                        </td>

                        <td>{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td class="underline" @click.stop="detailClick({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true,
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
                                })">{{item.breedName}}
                        </td>
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
                        <td>
                            <div v-if="item.sampling==0">否</div>
                            <div v-if="item.sampling==1">是</div>
                        </td>
                        <td>{{item.sampleNumber}}</td>
                        <td>{{item.sampleUnit}}</td>
                        <td>{{item.sampleAmount}}</td>
                        <td>{{item.offerNumber}}</td>
                        <td>{{item.validate | intentionAudit}}</td>
                        <td>
                          <div>{{item.onSell | onsell}}</div>
                        </td>
                        <td @click.stop="eventClick($index)">
                           <img height="24" width="24" src="/static/images/default_arrow.png" />
                           <div class="component_action" v-show="item.show">
                               <ul>
                                   <li @click="modifyIntention({
                                               id:item.id,
                                               sub:$index,
                                               selectCustomer:false,
                                               flag:1,
                                               show:true,
                                               loading:true,
                                               title:'编辑',
                                               customerName:item.customerName,
                                               customerPhone:item.customerPhone,
                                               breedName:item.breedName,
                                               breedId:item.breedId,
      				                                type:item.type,
      				                                especial:item.especial,
      				                                quality:item.quality,
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
                                               validate:item.validate,
                                               link:editintentInfo,
                                               url:'/intention/',
                                               key:'intentionList',
                                               image_f:'',
                                               image_s:'',
                                               image_t:'',
                                               image_f_show:'',
                                               image_s_show:'',
                                               image_t_show:'',
                                               duedate:item.duedate
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
                                   <li v-if="(item.validate==3&&item.onSell==0)||(item.especial==0&&(item.onSell==0||item.onSell==4))" @click="up($index,item.id,2)">上架</li>
                                   <li v-if="((item.onSell==0&&item.especial==1&&item.validate!=3)||((item.onSell==4||item.onSell==-4)&&item.especial==1&&item.validate==3)||item.validate==-3||item.validate==1)&&item.validate!=2" @click="applyAudit($index,item.id)">申请审核</li >
                                   <li v-if="item.onSell==2&&(item.especial==0||(item.type==0&&item.especial==1))" @click="up($index,item.id,4)">下架</li>
                                   <li v-if="(item.onSell==-4||item.onSell==2)&&item.type==1&&item.especial==1" @click="up($index,item.id,3)">申请下架</li >

                               </ul>
                           </div>
                       </td>

                    </tr>

                </tbody>
            </table>

        </div>
        <!-- <div v-if="supdemParam.breedId!=''&&initSupplyDemandList.length!=0" style="min-height:30px;max-height:200px;width:87%;overflow-y:auto;position:fixed;bottom:20px;left:250px;z-index:100">
          <table class="table table-hover table_color table-striped " v-cloak >
            <thead>
                <tr>
                    <th>特殊的</th>
                    <th>客户名称</th>
                    <th>客户手机号</th>
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
                    <th>审核状态</th>
                    <th>上下架</th>
                </tr>
            </thead>
            <tbody>

                    <tr v-for="item in initSupplyDemandList">
                        <td>{{item.especial | chanceEspec}}</td>
                        <td>{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
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
                        <td>
                            <div v-if="item.sampling==0">否</div>
                            <div v-if="item.sampling==1">是</div>
                        </td>
                        <td>{{item.sampleNumber}}</td>
                        <td>{{item.sampleUnit}}</td>
                        <td>{{item.sampleAmount}}</td>
                        <td>{{item.validate}}</td>
                        <td>
                          <div v-if="item.onSell==0">初始</div>
                          <div v-if="item.onSell==1">上架</div>
                          <div v-if="item.onSell==2">下架</div>
                        </td>
                    </tr>


                </tbody>
          </table>
        </div> -->
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
import intentionauditModel from'../../user/intentionAudit'
import tipsdialogModel  from '../../tipsDialog'
import deletebreedModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import editintentModel  from  '../../Intention/Editintention'
import createintentModel from '../../user/userIntention'
import supdemModel from '../supplyDemand'
import searchModel from '../intentionSearch'
import auditDialog from '../../tips/auditDialog'

import {
	initIntentionList,
  initSupplyDemandList
} from '../../../vuex/getters'
import {
	getIntentionList,
  getSupplyDemandList,
  intentionUpAndDown,
	deleteInfo,
	editintentInfo,
	createIntentionInfo,
  batchUserIntentionAudit
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        chancedetailModel,
        transferintentModel,
        intentionauditModel,
        tipsdialogModel,
        deletebreedModel,
        editintentModel,
        createintentModel,
        supdemModel,
        searchModel,
        auditDialog
    },
    vuex: {
        getters: {
            initIntentionList,
            initSupplyDemandList
        },
        actions: {
            getIntentionList,
            getSupplyDemandList,
            intentionUpAndDown,
            deleteInfo,
            editintentInfo,
            createIntentionInfo,
            batchUserIntentionAudit
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show:false,
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
                customerName:'',
                total:0
            },
            supdemParam:{
                show:false,
                id:'',
                type:'',
                breedId:'',
                typeName:'',
                link:'/intention/'
            },
            chanceParam:{
                show:false
            },
            intentionParam:{
                show:false,
                id:'',
                name:'意向'
            },
            intentionAuditParam:{
                show:false,
                arr:[],
                indexs:[],
                validate:0,
                description:''
            },
            tipsParam:{
                show:false,
                name:'',
                ids:[],
                index:[],
                onSell:0
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
            checked:false,
            auditParam:{
              title:'意向申请审核备注',
              auditComment:'',
              confirm:true,
              callback:'',
              show:false
            }
        }
    },
    methods: {
        match:function(item){
            this.supdemParam.show = true;
            this.supdemParam.id = item.id;
            this.supdemParam.type = 1-item.type
            if(this.supdemParam.type==0){
                this.supdemParam.typeName = "求购";
            }else{
                this.supdemParam.typeName = "供应";
            }
            this.supdemParam.breedId = item.breedId;
            /*if(item.id==this.supdemParam.id&&this.$store.state.table.basicBaseList.supplyDemandList.length!=0){
                this.$store.state.table.basicBaseList.supplyDemandList = [];
            }else{
              this.supdemParam.id = item.id;
              this.supdemParam.type = 1-item.type
              this.supdemParam.breedId = item.breedId;
              this.getSupplyDemandList(this.supdemParam);
            }*/

        },
        eventClick:function(sub){
            if(this.$store.state.table.basicBaseList.intentionList[sub].show){
                this.$store.state.table.basicBaseList.intentionList[sub].show = !this.$store.state.table.basicBaseList.intentionList[sub].show;
            }else{
                this.$store.state.table.basicBaseList.intentionList[sub].show=true;
            }
        },
        detailClick:function(initIntentionList){
            this.chanceParam = initIntentionList;
        },
        onlyselected:function(sub,id){
            var _this = this;
            this.$store.state.table.basicBaseList.intentionList[sub].checked=!this.$store.state.table.basicBaseList.intentionList[sub].checked;
            if(!this.$store.state.table.basicBaseList.intentionList[sub].checked){
                this.checked = false;
            }else{
                this.checked = true;
                this.$store.state.table.basicBaseList.intentionList.forEach(function(item){
                    if(!item.checked){
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll:function(){
       			this.checked = !this.checked;
       			if(this.checked){
         				this.$store.state.table.basicBaseList.intentionList.forEach(function(item){
         					item.checked = true;
         				})
       			}else{
         				this.$store.state.table.basicBaseList.intentionList.forEach(function(item){
         					item.checked = false;
         				})
       			}
        },
        intentionAudit:function(){
            this.intentionAuditParam.arr = [];
            this.intentionAuditParam.indexs = [];
            for(var i=0;i<this.$store.state.table.basicBaseList.intentionList.length;i++){
                if(this.$store.state.table.basicBaseList.intentionList[i].checked){
                    this.intentionAuditParam.arr.push(this.$store.state.table.basicBaseList.intentionList[i].id);
                    this.intentionAuditParam.indexs.push(i);
                }
            }
            if(this.intentionAuditParam.arr.length==0){
                this.tipsParam.name = '请先选择意向';
                this.tipsParam.show = true;
            }else{
                this.intentionAuditParam.show = true;
            }
        },
        upOrDown:function(param){
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.onSell = param.onSell;
            if(param.onSell==2){
                this.tipsParam.name = '意向上架成功';
            }
            if(param.onSell==4){
                this.tipsParam.name = '意向下架成功';
            }
            for(var i=0;i<this.initIntentionList.length;i++){
                if(this.initIntentionList[i].checked){
                    this.tipsParam.ids.push(this.initIntentionList[i].id);
                    this.tipsParam.indexs.push(i);
                }
            }
            if(this.tipsParam.ids.length==0){
                this.tipsParam.name = '请先选择意向';
                this.tipsParam.show = true;
            }else{
              console.log('上下架');
                this.intentionUpAndDown(this.tipsParam);
            }

        },
        up:function(index,id,onSell){
            var onSellObj={
              "0":'初始',
              "1":'申请上架',
              "2":'上架',
              "-2":'上架失败',
              "3":'申请下架',
              "4":'下架',
              "-4":'下架失败'
            }
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.ids.push(id);
            this.tipsParam.indexs.push(index);
            this.tipsParam.onSell = onSell;
            this.tipsParam.name = onSellObj[onSell];
            this.intentionUpAndDown(this.tipsParam);
        },
        down:function(index,id){
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.ids.push(id);
            this.tipsParam.indexs.push(index);
            this.tipsParam.onSell = 4;
            this.tipsParam.name = '意向下架成功';
            this.intentionUpAndDown(this.tipsParam);
        },
        applyDown:function(index,id){
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.ids.push(id);
            this.tipsParam.indexs.push(index);
            this.tipsParam.onSell = 3;
            this.tipsParam.name = '申请下架成功';
            this.intentionUpAndDown(this.tipsParam);
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
        search:function(){
          this.loadParam.loading = false;
          this.loadParam.show = true;

        },
        searchIntention:function(){
            this.getIntentionList(this.loadParam);
        },
        resetCondition:function(){
            this.loadParam.type='';
            this.loadParam.invoic='';
            this.loadParam.visit='';
            this.loadParam.intl='';
            this.loadParam.sampling='';
            this.loadParam.status='';
            this.loadParam.advance='';
            this.loadParam.customerName='';
            this.getIntentionList(this.loadParam);

        },
        specDelete:function(initIntentionList){
        	  this.deleteParam = initIntentionList;
        },
        modifyIntention:function(initIntentionList){
        	  this.createParam = initIntentionList;
        },
        createIntention:function(initIntentionList){
        	  this.createParam = initIntentionList;
        },
        applyAudit:function(index,id){
          this.auditParam.indexs = [];
          this.auditParam.indexs.push(index);
          this.auditParam.arr = [];
          this.auditParam.arr.push(id);
          this.auditParam.validate = 2;
          this.auditParam.show=true;
          this.auditParam.callback=this.auditCallback;
        },
        auditCallback:function(){
          this.auditParam.description=this.auditParam.auditComment;
          this.batchUserIntentionAudit(this.auditParam);
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
.base_pagination{
  margin-bottom:250px;
}
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


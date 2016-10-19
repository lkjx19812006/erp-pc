<template>
     <chancedetail-model :param.sync="chanceParam" v-if="chanceParam.show"></chancedetail-model>
     <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
     <intentionaudit-model :param="intentionAuditParam" v-if="intentionAuditParam.show"></intentionaudit-model>
     <auditdialog-model :param="auditParam" v-if="auditParam.show"></auditdialog-model>
     <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
     <editintent-model :param="editParam" v-if="editParam.show"></editintent-model>
     <createintent-model :param="createParam" v-if="createParam.show"></createintent-model>
     <supdem-model :param="supdemParam" v-if="supdemParam.show"></supdem-model>
     
   <div v-show="!chanceParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">部门意向</div>
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
                <!-- <button class="new_btn transfer" @click="intentionAudit()">审核</button> -->
                <button class="new_btn transfer" @click="upOrDown({
                                                                onSell:2  
                                                              })">下架</button>
                <button class="new_btn transfer" @click="upOrDown({
                                                              onSell:1
                                                            })">上架</button>
                <!-- <button class="new_btn" @click="createIntention({
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
                       key:'intentionList',
                       link:createIntentionInfo,
                       url:'/intention/'
                       })">新建</button>  -->
            </div>
        </div>
        <div class="service-nav clearfix">
            <div class="my_order_search">
               <div class="filter_search clearfix">
                    <dl class="clearfix">
                        <dt>类型：</dt>
                        <dd>
                            <select  v-model="loadParam.type" @change="searchIntention()">
                                <option value="">请选择类型</option>
                                <option value="0">求购</option>
                                <option value="1">供应</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>是否提供发票：</dt>
                        <dd>
                            <select v-model="loadParam.invoic" @change="searchIntention()">
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
                            <select v-model="loadParam.visit" @change="searchIntention()">
                                <option value="">请选择</option>
                                <option value="0">不看</option>
                                <option value="1">会看</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>是否提供样品：</dt>
                        <dd>
                            <select v-model="loadParam.sampling" @change="searchIntention()">
                                <option value="">请选择样品</option>
                                <option value="0">无</option>
                                <option value="1">有</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>选择状态：</dt>
                        <dd>
                            <select v-model="loadParam.status" @change="searchIntention()">
                                <option value="">请选择状态</option>
                                <option value="0">待审</option>
                                <option value="1">通过</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>预付比例：</dt>
                        <dd>
                            <select v-model="loadParam.advance" @change="searchIntention()">
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
                            <select v-model="loadParam.intl" @change="searchIntention()">
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
                        <th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label></th>
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
                         <td>
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>
                        </td>
                        <td>{{item.type | chanceType}}</td>
                        <td>{{item.especial | chanceEspec}}</td>
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
                        <td>{{item.validate}}</td>
                        <td>
                          <div v-if="item.onSell==0">初始</div>
                          <div v-if="item.onSell==1">上架</div>
                          <div v-if="item.onSell==2">下架</div>
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
                                   <li @click="audit($index,item.id)">审核</li>          
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
import auditdialogModel  from '../../tips/auditDialog'
import deletebreedModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import editintentModel  from  '../../Intention/Editintention'
import createintentModel from '../../user/userIntention'
import supdemModel from '../supplyDemand'

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
} from '../../../vuex/actions'
export default {
    components: {   
        pagination,
        chancedetailModel,
        transferintentModel,
        intentionauditModel,
        auditdialogModel,
        deletebreedModel,
        editintentModel,
        createintentModel,
        supdemModel
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
                link:'/intention/user/list',
                type:'',
                invoic:'',
                visit:'',
                intl:'',
                sampling:'',
                status:'',
                advance:'',
                customerName:''
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
            auditParam:{
                show:false,
                name:'',
                audit:true,
                title:'意向审核',
                pass:'pass',
                reject:'pass'
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
            if(param.onSell==1){
                this.tipsParam.name = '意向上架成功';
            }
            if(param.onSell==2){
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
        audit:function(index,id){
            console.log(index+'==='+id);
            this.auditParam.name = "意向审核";
            this.auditParam.show = true;
        },
        pass:function(){
            console.log('审核通过');
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
          console.log(initIntentionList.unit);
          this.createParam = initIntentionList;
        },
        createIntention:function(initIntentionList){
             this.createParam = initIntentionList;
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


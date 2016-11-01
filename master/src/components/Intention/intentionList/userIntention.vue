<template>
     <chancedetail-model :param="chanceParam" v-if="chanceParam.show"></chancedetail-model>
     <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
     <intentionaudit-model :param="intentionAuditParam" v-if="intentionAuditParam.show"></intentionaudit-model>
     <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
     <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
     <editintent-model :param="editParam" v-if="editParam.show"></editintent-model>
     <createintent-model :param="createParam" v-if="createParam.show"></createintent-model>
     <supdem-model :param="supdemParam" v-if="supdemParam.show"></supdem-model>
     <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
     <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>

   <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">会员意向</div>
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
                <button class="new_btn transfer" @click="intentionAudit()">审核</button>
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
      <!--   <div class="service-nav clearfix">
          <div class="my_order_search">
      
         </div>
      </div> -->
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
                        <th>会员名称</th>
                        <th>会员手机号</th>
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
                        <!-- <th>上下架</th> -->
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in initIntentionList"
                        @click="match(item)"  style="cursor:pointer">
                         <td>
                            <label v-if="item.validate==0" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" >
                            </label>
                        </td>
                        <td>{{item.type | chanceType}}</td>
                        <td>
                            <div v-if="item.especial==0">普通</div>
                            <div v-if="item.especial==1&&item.type==0">紧急求购</div>
                            <div v-if="item.especial==1&&item.type==1">低价资源</div>
                        </td>
                        <td>{{item.userFullname}}</td>
                        <td>{{item.userPhone}}</td>
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
                                key:'intentionList',
                                image_f:'',
                                image_s:'',
                                image_t:'',
                                image_f_show:'',
                                image_s_show:'',
                                image_t_show:'',
                                duedate:item.duedate
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
                        <!-- <td>
                          <div>{{item.onSell | onsell}}</div>
                        </td> -->
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
                                   <li @click="userToClient({
                                                  name:item.userFullname,
                                                  keyname:'transStatus',
                                                  sub:$index,
                                                  userId:item.userId,
                                                  main:1,
                                                  province:'',
                                                  phone:item.userPhone,
                                                  tel:item.userTel,
                                                  email:item.userEmail,
                                                  qq:item.userQq,
                                                  type:'',
                                                  fullname:item.userFullname,
                                                  employeeId:'',
                                                  employeeName:'',
                                                  orgId:'',
                                                  orgName:'',
                                                  show:true,
                                                  key:'userList',
                                                  countryId:7,
                                                  countryName:'中国',
                                                  contact:{
                                                   name: item.userFullname,
                                                   position: '',
                                                   department: '',
                                                   phone: item.userPhone,
                                                   tel: item.userTel,
                                                   email: item.email,
                                                   qq: item.userQq,
                                                   wechart: ''
                                                  }
                                                },item.show=false)">划转</li>
                                   <li v-if="item.validate==0" @click="audit($index,item.id)">审核</li>
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
import tipsdialogModel  from '../../tips/tipDialog'
import deletebreedModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import editintentModel  from  '../../Intention/Editintention'
import createintentModel from '../../user/userIntention'
import supdemModel from '../supplyDemand'
import transferModel  from '../../user/userTransfer'
import searchModel from '../intentionSearch'


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
        tipsdialogModel,
        deletebreedModel,
        editintentModel,
        createintentModel,
        supdemModel,
        transferModel,
        searchModel
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
                show:false,
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
            transferParam:{
              show:false
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
                alert:true,
                name:''

            },
            intentionAuditParam:{
                show:false,
                key:'user',
                arr:[],
                indexs:[],
                validate:0,
                description:''
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
                    if(!item.checked&&item.validate==0){
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll:function(){
            this.checked = !this.checked;
            if(this.checked){
                this.$store.state.table.basicBaseList.intentionList.forEach(function(item){
                    if(item.validate==0){
                        item.checked = true;
                    }
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
                console.log(this.intentionAuditParam.indexs);
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
        audit:function(index,id){   //单个意向审核
            this.intentionAuditParam.show = true;
            this.intentionAuditParam.arr = [];
            this.intentionAuditParam.indexs = [];
            this.intentionAuditParam.arr.push(id);
            this.intentionAuditParam.indexs.push(index);
        },
        userToClient:function(item){
            console.log(item);

            this.transferParam = item;
        },
        searchIntention:function(){
            this.getIntentionList(this.loadParam);
        },
        search:function(){
          this.loadParam.loading = false;
          this.loadParam.show = true;

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


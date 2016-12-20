<template>
     <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
     <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
     <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
     <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
     <create-model :param.sync="createParam" v-if="createParam.show"></create-model>
     <modify-model :param.sync="modifyParam" v-if="modifyParam.show"></modify-model>
     <cancelinquire-model :param="cancelInquireParam" v-if="cancelInquireParam.show"></cancelinquire-model>
     <inquire-model :param="inquireParam" v-if="inquireParam.show"></inquire-model>
     <createorder-model :param="createOrderParam" v-if="createOrderParam.show"></createorder-model>
     <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
     <div>
        <div class="service-nav clearfix">
            <div class="clear left" >
                  <dl class="clear left transfer">
                     <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                     <dd class="left">
                           <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                     </dd>
                  </dl>
                  <dl class="clear left transfer">
                     <dt class="left transfer marg_top">{{$t('static.client_name')}}：</dt>
                     <dd class="left">
                           <input type="text" class="form-control" v-model="loadParam.customerName" @keyup.enter="intentionSearch()"/>
                     </dd>
                  </dl>
                  <!-- <dl class="clear left transfer" >
                     <dt class="left transfer marg_top">{{$t('static.salesman')}}：</dt>
                     <dd class="left">
                          <input type="text" class="form-control" v-model="loadParam.employeeName" @keyup.enter="intentionSearch()"/>
                     </dd>
                  </dl> -->
                  <dl class="clear left transfer">
                     <dt class="left transfer marg_top">{{$t('static.client_email')}}：</dt>
                     <dd class="left">
                           <input type="text" class="form-control" v-model="loadParam.customerEmail" @keyup.enter="intentionSearch()"/>
                     </dd>
                  </dl>
                  <button class="new_btn transfer" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                  <button class="new_btn transfer" @click="intentionSearch()">{{$t('static.search')}}</button>        
            </div>
        </div>
        <div class="clearfix" style="margin-right: 10px">
            <div class="click_change pull-left">
                <span class="date_active" v-bind:class="{ 'date_active': this.loadParam.inquire===''}" @click="clickday('')">{{$t('static.please_select')}}</span>
                <span v-bind:class="{ 'date_active': this.loadParam.inquire===0}" @click="clickday(0)">{{$t('static.not_inquiry')}}</span>
                <span v-bind:class="{ 'date_active':  this.loadParam.inquire===1}" @click="clickday(1)">{{$t('static.inquiry')}}</span>
                <span v-bind:class="{ 'date_active':  this.loadParam.inquire===2}" @click="clickday(2)">{{$t('static.quotation')}}</span>
                <span v-bind:class="{ 'date_active':  this.loadParam.inquire===3}" @click="clickday(3)">{{$t('static.quo_complete')}}</span>
            </div>
            <button class="btn btn-primary pull-right transfer" @click="intentionSearch()">{{$t('static.refresh')}}</button>  
            <button class="btn btn-default pull-right" @click="createIntention()">{{$t('static.new')}}</button>
        </div>
        <div class="order_table" id="table_box">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <!--<th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label></th>-->
                        <th>{{$t('static.type')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th style="width:200px;min-width: 200px">{{$t('static.commodity_items')}}</th>
                        <!-- <th>{{$t('static.certificate')}}</th> -->
                        <th>{{$t('static.country')}}</th>
                        <!-- <th>{{$t('static.province')}}</th> -->
                        <th>{{$t('static.city')}}</th>
                        <!-- <th>{{$t('static.area')}}</th> -->
                        <th>{{$t('static.dealing_address')}}</th>
                        <!--<th>{{$t('static.pre_payment')}}</th>
                         <th>{{$t('static.invoice')}}</th> -->
                        <!-- <th>{{$t('static.come_to_see_product')}}</th> 
                        <th>{{$t('static.packaging')}}</th>-->
                        <!-- <th>{{$t('static.international')}}</th> -->
                        <th>{{$t('static.Number_of_inquiries')}}</th>
                        <th>{{$t('static.quotation_number')}}</th>
                        <th>{{$t('static.issued_time')}}</th>
                        <!-- <th>{{$t('static.review_status')}}</th> -->
                        <!-- <th>{{$t('static.description')}}</th> -->
                        <th>{{$t('static.inquiry_state')}}</th>
                        <th>{{$t('static.inquiry_type')}}</th>
                        <th style="min-width: 250px;">{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initMyIntlIntentionList" style="cursor:pointer">
                        <td>
                            <div v-if="item.especial==0&&item.type==0">{{$t('static.common_purchase')}}</div>
                            <div v-if="item.especial==0&&item.type==1">{{$t('static.common_supply')}}</div>
                            <div v-if="item.especial==1&&item.type==0">{{$t('static.emergency')}}</div>
                            <div v-if="item.especial==1&&item.type==1">{{$t('static.low_cost')}}</div>
                        </td>
                        <td class="underline" @click="clickOn(item.id)">{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.names}}</td>
                        <!-- <td>{{item.qualification | qualify}}</td> -->
                        <td>{{item.country}}</td>
                        <!-- <td>{{item.province}}</td> -->
                        <td>{{item.city}}</td>
                        <!-- <td>{{item.district}}</td> -->
                        <td>{{item.address}}</td>
                    <!-- <td>{{item.advance | advanced}}</td>
                        发票<td v-if="item.invoic==0">{{$t('static.none')}}</td>
                        <td v-if="item.invoic==1">{{$t('static.common_invoice')}}</td>
                        <td v-if="item.invoic==2">{{$t('static.add_invoice')}}</td>
                        <td v-if="item.invoic===null">{{$t('static.none')}}</td> -->
                        <!-- <td>{{item.visit | visitstate}}</td>
                        <td v-if="item.pack=='其它'">{{$t('static.other')}}</td>
                        <td v-if="item.pack!='积压包'&&item.pack!='编织袋'&&item.pack!='瓦楞纸箱'&&item.pack!='真空包装'&&item.pack!='其它'">{{$t('static.other')}}</td>
                        <td v-if="item.pack=='积压包'">{{$t('static.pallets')}}</td>
                        <td v-if="item.pack=='编织袋'">{{$t('static.bag')}}</td>
                        <td v-if="item.pack=='瓦楞纸箱'">{{$t('static.box')}}</td>
                        <td v-if="item.pack=='真空包装'">{{$t('static.packing')}}</td> -->
                        <!-- <td>{{item.intl | intlstata}}</td> 
                    -->
                        <td>{{item.inquireTime}}</td>
                        <td>{{item.offerTime}}</td>
                        <td>{{item.ctime}}</td>
                        <!-- <td>{{item.validate | intentionAudit}}</td> -->
                        <!-- <td>{{item.description}}</td> -->
                        <td v-if="item.inquire==0" style="background:#7B68EE;color:#fff">{{$t('static.initial')}}</td>
                        <td v-if="item.inquire==1" style="background:#CD853F;color:#fff">{{$t('static.inquiry')}}</td>
                        <td v-if="item.inquire==2" style="background:#483D8B;color:#fff">{{$t('static.quotation')}}</td>
                        <td v-if="item.inquire==3" style="background:green;color:#fff">{{$t('static.quo_complete')}}</td>
                        <td>{{item.inquireType}}</td>
                        <td>
                            <div style="display:inline-block;margin-right:7px" @click="deleteIntention({
                                        id:item.id,
                                        sub:$index,
                                        show:true,
                                        name:item.customerName,
                                        title:'意向',
                                        link:deleteInfo,
                                        url:'/intlIntention/',
                                        key:'myIntlIntentionList'
                                        })"><img src="/static/images/{{$t('static.img_del')}}.png" alt="删除"  /></div>
                            <!-- <div style="display:inline-block;margin-right:7px" @click="confirmOffer(item.id,$index)"><img src="/static/images/confirmOffer.png" alt="确认报价"  /></div> -->
                            <div style="display:inline-block;margin-right:7px"  @click.stop="newOrder(item,$index)"><img src="/static/images/{{$t('static.img_adopt')}}.png" alt="生成订单" /></div>
                            <div v-if="item.inquire===0||item.inquire===3"  style="display:inline-block;margin-right:7px" @click="modifyIntention(item.id,$index)"><img src="/static/images/{{$t('static.img_edit')}}.png" alt="编辑"  /></div>
                            <div v-if="item.inquire===0" style="display:inline-block;margin-right:7px" @click="inquire(item.id,$index,item.inquireTime)"><img src="/static/images/{{$t('static.img_inquire')}}.png" alt="询价" /></div>
                            <div v-if="item.inquire===3" style="display:inline-block;margin-right:7px" @click="inquire(item.id,$index,item.inquireTime)"><img src="/static/images/{{$t('static.img_askagain')}}.png" alt="再次询价" /></div>

                            <div v-if="item.inquire===1" style="display:inline-block;margin-right:7px" @click="cancelInquire(item.id,$index,item.inquireTime)"><img src="/static/images/{{$t('static.img_cancelinquire')}}.png" alt="取消询价" /></div>
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
import searchModel from '../intlIntentionSearch'
import deletebreedModel from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import detailModel from '../intentionDetail'
import createModel from '../createIntention'
import modifyModel from '../modifyIntention'
import cancelinquireModel from '../../tips/tipDialog'
import inquireModel from '../inquire'
import createorderModel from '../createOrderDialog' 
import tipsModel  from '../../../components/tips/tipDialog'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import breedsearchModel from '../breedsearch'
import {
    initMyIntlIntentionList,
    initLogin
} from '../../../vuex/getters'
import {
    getIntlIntentionList,
    intlIntentionInquire,
    deleteInfo,
    intlIntentionAffirmOffer,
    cancelIntlIntentionInquire,
    createOrder
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        searchModel,
        detailModel,
        createModel,
        modifyModel,
        cancelinquireModel,
        inquireModel,
        deletebreedModel,
        createorderModel,
        tipsModel,
        breedsearchModel
    },
    vuex: {
        getters: {
            initMyIntlIntentionList,
            initLogin
        },
        actions: {
            getIntlIntentionList,
            intlIntentionInquire,
            deleteInfo,
            intlIntentionAffirmOffer,
            cancelIntlIntentionInquire,
            createOrder
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
                total:0,
                link:'/intlIntention/by/employee',
                key:'myIntlIntentionList',
                employeeName:'',
                breedId:'',
                breedName:'',
                customerName:'',
                customerEmail:'',
                inquire:''
            },
            breedSearchParam:{
                show:false    
            },
            detailParam:{
                link:'/intlIntention/',
                key:'intentionDetail',
                show:false,
                loading:true,
                id:''
            },
            createOrderParam:{
                show:false,
                callback:this.orderCallback,
                title1:'新建订单',
                type:1,
                sourceType:1,
                sample:0,
                intl:1,
                customer:'',
                currency:'',
                consignee:'',
                consigneePhone:'',
                zipCode:'',
                country:'',
                province:'',
                city:'',
                email:'',
                total:0,
                employee:this.initLogin.id,
                org:this.initLogin.orgId,
                district:'',
                consigneeAddr:'',
                customerName:'',
                customerPhone:'',
                comments:'',
                incidentals:0,
                incidentalsDesc:'',
                preferential:0,
                preferentialDesc:'',
                payWay:'',
                orderStatus:'',
                goods:[ //多个商品

                ],
                link:createOrder,
                key:'orderList',
                different:'国际'
            },
            intentionParam:{
                show:false,
                id:'',
                name:'意向'
            },
            inquireParam:{
                show:false,
                key:'myIntlIntentionList',
                callback:this.inquireCallback,
                inquireTime:'',    //询价的次数
                index:'',
                inquire:'',
                link:'',
                intentionId:'',
                inquireType:'',
                comment:''
            },
            affirmOfferParam:{
                show:false,
                link:'/intlIntention/offer',
                id:'',
                index:'',
                description:''

            },
            cancelInquireParam:{
                show:false,
                name:'确定取消询价?',
                confirm:true,
                inquire:'',
                inquireTime:'',
                callback:this.confirmCancelInquire,
                link:'/intlIntention/inquire',
                key:'myIntlIntentionList',
                id:'',
                index:''
            },
            tipsParam:{
                show:false,
                name:'修改成功',
                alert:true,
            },
            deleteParam:{
                show:false,
            },
            editParam:{
                show:false,
            },
            createParam:{
                show:false,
                url:'/intlIntention/',
                callback:this.createCallback,
                customerId:'',
                customerName:'',
                customerPhone:'',
                customerEmail:'',
                country:'',
                province:'',
                city:'',
                district:'',
                address:'',
                duedate:'',
                pack:'',
                items:[
                    
                ]
            },
            modifyParam:{
                show:false,
                link:'/intlIntention/',
                key:'myIntlIntentionList',
                callback:this.editCallback,
                id:'',
                index:'',
                duedate:'',
                pack:'',
                items:[     //存放商品条目
                    
                ],
                itemsBack:[   //商品条目备份，用于与修改后的商品条目对照

                ],

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
    ready(){
      common('tab','table_box',1);
    },
    methods: {
        clickday:function(inquire){
            this.loadParam.inquire = inquire;
            console.log(this.loadParam.inquire)
            this.getIntlIntentionList(this.loadParam);
        },
        inquire:function(id,index,time){
            console.log('inquire');
            console.log(time);
            this.inquireParam.link = '/intlIntention/inquire';
            this.inquireParam.index = index;
            this.inquireParam.inquireTime = time;
            this.inquireParam.intentionId = id;
            this.inquireParam.inquireType = '';
            this.inquireParam.comment = '';
            this.inquireParam.show = true;
        },
        inquireAgain:function(id,index,time){
            console.log('再次询价');
            this.inquireParam.link = '/intlIntention/itemInquire';
            this.inquireParam.index = index;
            this.inquireParam.inquireTime = time;
            this.inquireParam.intentionId = id;
            this.inquireParam.inquireType = '';
            this.inquireParam.comment = '';
            this.inquireParam.show = true;
        },
        intentionSearch:function(){
            this.getIntlIntentionList(this.loadParam);
        },
        breedSearch:function(){
            this.breedSearchParam.show = true;
        },
        cancelInquire:function(id,index,time){
            console.log('取消询价');
             console.log(time);   
            this.cancelInquireParam.id = id;
            this.cancelInquireParam.index = index;
            this.cancelInquireParam.inquireTime = time;
            this.cancelInquireParam.show = true;
            //this.cancelIntlIntentionInquire(this.cancelInquireParam);
        },
        confirmCancelInquire:function(){
            console.log(this.cancelInquireParam);
           this.cancelIntlIntentionInquire(this.cancelInquireParam); 
        },
        
        clickOn:function(id){
            this.detailParam.id = id;
            this.detailParam.show = true;
        },
        
        detailClick:function(initIntentionList){
            this.chanceParam = initIntentionList
        },
        newOrder:function(item,sub){
            console.log(item)
            this.createOrderParam.show = true;
            this.createOrderParam.employee = item.employee;
            this.createOrderParam.id = item.id;
            this.createOrderParam.customer = item.customerId;
            this.createOrderParam.org = this.initLogin.orgId;
            this.createOrderParam.consigneeAddr = item.address;
            this.createOrderParam.customerName = item.customerName;
            this.createOrderParam.customerPhone = item.customerPhone;
            this.createOrderParam.province = item.province;
            this.createOrderParam.country = item.country;
            this.createOrderParam.district = item.district;
            this.createOrderParam.city = item.city;
            this.createOrderParam.consigneeAddr = item.address;
            this.createOrderParam.intl = item.intl;
            this.createOrderParam.total = item.itemsTotal;
            this.createOrderParam.goods = [];
        },
        
        search:function(){
          this.loadParam.loading = false;
          this.loadParam.show = true;

        },
        searchIntention:function(){
            this.getIntlIntentionList(this.loadParam);
        },
        resetCondition:function(){
            this.loadParam.employeeName='';
            this.loadParam.customerName='';
            this.loadParam.breedId='';
            this.loadParam.breedName='';
            this.loadParam.customerEmail='';
            this.getIntlIntentionList(this.loadParam);
        },
        
        createIntention:function(){
            this.createParam.show = true;
            this.createParam.callback = this.createCallback;
        },
        deleteIntention:function(param){
            this.deleteParam = param;
        },
        modifyIntention:function(id,index){
            console.log(this.modifyParam)
              this.modifyParam.show = true;
              this.modifyParam.id = id;
              this.modifyParam.index = index;
              this.modifyParam.items = [];
              this.modifyParam.itemsBack = [];
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
        },
        createCallback:function(name){
            this.tipsParam.show = true;
            this.tipsParam.name=name;
            this.tipsParam.alert=true;
        },
        editCallback:function(name){
            this.tipsParam.show = true;
            this.tipsParam.name=name;
            this.tipsParam.alert=true;
        },
        inquireCallback:function(name){
            this.tipsParam.show = true;
            this.tipsParam.name=name;
            this.tipsParam.alert=true;
        },
        orderCallback:function(name){
            this.tipsParam.show = true;
            this.tipsParam.name=name;
            this.tipsParam.alert=true;
        },

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntlIntentionList(this.loadParam);
        },
        a:function(qq){
            this.loadParam.employeeId = qq.employeeId;
            this.loadParam.employeeName = qq.employeeName;
        },
        breed:function(breed){
            this.loadParam.breedId=breed.breedId;
            this.loadParam.breedName=breed.breedName;
            console.log(this.loadParam);
        }
    },
    created() {
        changeMenu(this.$store.state.table.isTop,this.getIntlIntentionList,this.loadParam,localStorage.myIntlIntentionParam); 
        
    },
    filter: (filter,{})
}
</script>
<style scoped>
.base_pagination{
  margin-bottom:250px;
}
.transfer{
    margin-left: 18px;
}
.service-nav{
    padding-left: 0;
    padding-bottom: 10px;
}
.click_change{
    text-align: left;
    border: 1px solid #ddd;
    border-bottom: none;
    border-right: none;
    width:541px;
    line-height: 30px;
}
.click_change span{
    padding:0 20px;
    display: inline-block;
    border-right: 1px solid #ddd;
    cursor: pointer;
}
.date_active{
    background: #fa6705;
    color: #fff;
}
#table_box table th,#table_box table td{
    width: 117px;
    min-width: 117px;
}
</style>


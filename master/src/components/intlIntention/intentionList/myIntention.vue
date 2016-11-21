<template>
     <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
     <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
     <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
     <create-model :param.sync="createParam" v-if="createParam.show"></create-model>
     <modify-model :param.sync="modifyParam" v-if="modifyParam.show"></modify-model>
     <cancelinquire-model :param="cancelInquireParam" v-if="cancelInquireParam.show"></cancelinquire-model>
     <inquire-model :param="inquireParam" v-if="inquireParam.show"></inquire-model>
     <createorder-model :param="createOrderParam" v-if="createOrderParam.show"></createorder-model>
     <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">{{$t('static.my_intention')}}</div>
            <div class="col-xs-5 my_order_search">
               
           </div>
            <div class="right">
                <button class="new_btn transfer" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                <button class="new_btn transfer" @click="search()">{{$t('static.search')}}</button>
                <button class="new_btn" @click="createIntention()">{{$t('static.new')}}</button>
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
                            <th>{{$t('static.special')}}</th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.client_email')}}</th>
                            <th>{{$t('static.commodity_items')}}</th>
                            <th>{{$t('static.certificate')}}</th>
                            <th>{{$t('static.country')}}</th>
                            <th>{{$t('static.province')}}</th>
                            <th>{{$t('static.city')}}</th>
                            <th>{{$t('static.area')}}</th>
                            <th>{{$t('static.dealing_address')}}</th>
                            <th>{{$t('static.pre_payment')}}</th>
                            <th>{{$t('static.invoice')}}</th>
                            <th>{{$t('static.come_to_see_product')}}</th>
                            <th>{{$t('static.packaging')}}</th>
                            <th>{{$t('static.international')}}</th>
                            <th>{{$t('static.Number_of_inquiries')}}</th>
                            <th>{{$t('static.quotation_number')}}</th>
                            <th>{{$t('static.issued_time')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th>{{$t('static.description')}}</th>
                            <th>{{$t('static.inquiry_state')}}</th>
                            <th>{{$t('static.inquiry_type')}}</th>
                            <th colspan="5">{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in initIntlIntentionList" style="cursor:pointer">
                        <td>
                            <div v-if="item.especial==0">普通</div>
                            <div v-if="item.especial==1&&item.type==0">紧急求购</div>
                            <div v-if="item.especial==1&&item.type==1">低价资源</div>
                        </td>
                        <td>{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td class="underline" @click="clickOn(item.id)">{{item.names}}</td>
                        <td>{{item.qualification | qualify}}</td>
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
                        <td>{{item.inquireTime}}</td>
                        <td>{{item.offerTime}}</td>
                        <td>{{item.ctime | date}}</td>
                        <td>{{item.validate | intentionAudit}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.inquire | inquire}}</td>
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
                                                key:'intlIntentionList'
                                                })"><img src="/static/images/del.png" alt="删除"  /></div>
                            <!-- <div style="display:inline-block;margin-right:7px" @click="confirmOffer(item.id,$index)"><img src="/static/images/confirmOffer.png" alt="确认报价"  /></div> -->
                        </td>
                        <td>
                        <div style="display:inline-block;margin-right:7px"  @click.stop="newOrder(item,$index)"><img src="/static/images/adopt.png" height="18" width="47" alt="生成订单" /></div>
                        </td>
                        <td v-if="item.inquire===0">
                            <div  style="display:inline-block;margin-right:7px" @click="inquire(item.id,$index,item.inquireTime)"><img src="/static/images/inquire.png" alt="询价" /></div>
                        </td>
                        <td v-if="item.inquire===3">
                            <div  style="display:inline-block;margin-right:7px" @click="inquire(item.id,$index,item.inquireTime)"><img src="/static/images/inquireAgain.png" alt="再次询价" /></div>
                        </td>
                        <td v-if="item.inquire===1">
                            <div  style="display:inline-block;margin-right:7px" @click="cancelInquire(item.id,$index,item.inquireTime)"><img src="/static/images/cancelInquire_icon.png" alt="取消询价" /></div>
                        </td>
                            <!-- <div v-if="item.inquire===1" style="display:inline-block;margin-right:7px" @click="cancelInquire(item.id)">取消询价</div> -->
                        <td >
                            <div v-if="item.inquire===0||item.inquire===3"  style="display:inline-block;margin-right:7px" @click="modifyIntention(item.id,$index)"><img src="/static/images/{{$t('static.img_edit')}}.png" alt="编辑"  /></div>
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
import deletebreedModel  from  '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import detailModel from '../intentionDetail'
import createModel from '../createIntention'
import modifyModel from '../modifyIntention'
import cancelinquireModel from '../../tips/tipDialog'
import inquireModel from '../inquire'
import createorderModel from '../createOrderDialog' 

import {
    initIntlIntentionList,
      initLogin
} from '../../../vuex/getters'
import {
    getIntlIntentionList,
    intlIntentionInquire,
    deleteInfo,
    intlIntentionAffirmOffer,
    cancelIntlIntentionInquire,
    createOrder,

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
        createorderModel
    },
    vuex: {
        getters: {
            initIntlIntentionList,
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
                employeeName:'',
                breedId:'',
                breedName:'',
                customerName:'',
                customerEmail:''
                
            },
            
            detailParam:{
                link:'/intlIntention/',
                key:'intentionDetail',
                show:false,
                id:''

            },
            createOrderParam:{
                show:false,
                title1:'新建订单',
                type:1,
                sourceType:1,
                sample:'',
                intl:'',
                customer:'',
                currency:'',
                consignee:'',
                consigneePhone:'',
                zipCode:'',
                country:'',
                province:'',
                city:'',
                email:'',
                employee:this.initLogin.id,
                org:this.initLogin.orgId,
                district:'',
                consigneeAddr:'',
                customerName:'',
                comments:'',
                incidentals:'',
                incidentalsDesc:'',
                preferential:'',
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
                id:'',
                index:''
            },
            tipsParam:{
                show:false,
                name:'',
                ids:[],
                index:[],
                onSell:0
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
                key:'intentionList',
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
    methods: {
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
        eventClick:function(sub){
            if(this.$store.state.table.basicBaseList.intentionList[sub].show){
                this.$store.state.table.basicBaseList.intentionList[sub].show = !this.$store.state.table.basicBaseList.intentionList[sub].show;
            }else{
                this.$store.state.table.basicBaseList.intentionList[sub].show=true;
            }
        },
        detailClick:function(initIntentionList){
            this.chanceParam = initIntentionList
        },
        newOrder:function(item,sub){
            this.createOrderParam.show = true;
            this.createOrderParam.employee = item.employee;
            this.createOrderParam.id = item.id;
            this.createOrderParam.customer = item.customerId;
            this.createOrderParam.org = this.initLogin.orgId;
            this.createOrderParam.consigneeAddr = item.address;
            this.createOrderParam.customerName = item.customerName;
            this.createOrderParam.province = item.province;
            this.createOrderParam.country = item.country;
            this.createOrderParam.district = item.district;
            this.createOrderParam.city = item.city;
            this.createOrderParam.consigneeAddr = item.address;
            this.createOrderParam.intl = item.intl;
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
        },
        deleteIntention:function(getIntlIntentionList){
            this.deleteParam = getIntlIntentionList;
           /* this.deleteParam.index = index;
            this.deleteIntlIntention(this.deleteParam);  */
        },
        modifyIntention:function(id,index){
            console.log(id);
            console.log(index);
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
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntlIntentionList(this.loadParam);
        }
    },
    created() {
        this.getIntlIntentionList(this.loadParam, this.loadParam.all);
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


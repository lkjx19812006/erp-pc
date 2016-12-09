<template>
     <inquire-model :param="inquireParam" v-if="inquireParam.show"></inquire-model>
     <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
     <offer-model :param="offerParam" v-if="offerParam.show"></offer-model>
     <affirmoffer-model :param="affirmOfferParam" v-if="affirmOfferParam.show"></affirmoffer-model>
     <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
     <div>
        <div class="service-nav clearfix">
            
        </div>
        <div class="click_change pull-left">
            <span class="date_active" v-bind:class="{ 'date_active': isA}" @click="clickday()">{{$t('static.please_select')}}</span>
            <span v-bind:class="{ 'date_active': !isA&&isB}" @click="clickweek()">{{$t('static.not_inquiry')}}</span>
            <span v-bind:class="{ 'date_active': !isA&&!isB&&isC}" @click="clickmonth()">{{$t('static.inquiry')}}</span>
            <span v-bind:class="{ 'date_active': !isA&&!isB&&!isC&&isD}" @click="clickyear()">{{$t('static.quotation')}}</span>
            <span v-bind:class="{ 'date_active': !isA&&!isB&&!isC&&!isD}" @click="clickfinish()">{{$t('static.quo_complete')}}</span>
        </div>
        <div class="order_table" id="table_box" v-show="currentView==1">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.inquire_type')}}</th>
                        <th>{{$t('static.commodity_items')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.country')}}</th>
                        <th>{{$t('static.city')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.inquiry_state')}}</th>
                        <th>{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initIntlIntentionInquireList" style="cursor:pointer">
                        <td>{{item.inquireType}}</td>
                        <td>{{item.names}}</td>
                        <td class="underline" @click="clickOn(item.intentionId,item.id,$index)">{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.ctime | date}}</td>
                        <td v-if="item.inquire==0" style="background:#7B68EE;color:#fff">{{$t('static.initial')}}</td>
                        <td v-if="item.inquire==1" style="background:#CD853F;color:#fff">{{$t('static.inquiry')}}</td>
                        <td v-if="item.inquire==2" style="background:#483D8B;color:#fff">{{$t('static.quotation')}}</td>
                        <td v-if="item.inquire==3" style="background:green;color:#fff">{{$t('static.quo_complete')}}</td>
                        <td>
                            <div v-if="item.inquire==2" style="display:inline-block;margin-right:7px" @click="confirmOffer(item.intentionId,$index)"><img src="/static/images/{{$t('static.img_confirm')}}.png" alt="确认报价"  /></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="order_table" id="table_box" v-show="currentView==2">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.inquire_type')}}</th>
                        <th>{{$t('static.commodity_items')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.country')}}</th>
                        <th>{{$t('static.city')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.inquiry_state')}}</th>
                        <th>{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initIntlIntentionInquireList" style="cursor:pointer" v-if="item.inquire==0">
                        <td>{{item.inquireType}}</td>
                        <td>{{item.names}}</td>
                        <td class="underline" @click="clickOn(item.intentionId,item.id,$index)">{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.ctime | date}}</td>
                        <td v-if="item.inquire==0" style="background:#7B68EE;color:#fff">{{$t('static.initial')}}</td>
                        <td v-if="item.inquire==1" style="background:#CD853F;color:#fff">{{$t('static.inquiry')}}</td>
                        <td v-if="item.inquire==2" style="background:#483D8B;color:#fff">{{$t('static.quotation')}}</td>
                        <td v-if="item.inquire==3" style="background:green;color:#fff">{{$t('static.quo_complete')}}</td>
                        <td>
                            <div v-if="item.inquire==2" style="display:inline-block;margin-right:7px" @click="confirmOffer(item.intentionId,$index)"><img src="/static/images/{{$t('static.img_confirm')}}.png" alt="确认报价"  /></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="order_table" id="table_box" v-show="currentView==3">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.inquire_type')}}</th>
                        <th>{{$t('static.commodity_items')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.country')}}</th>
                        <th>{{$t('static.city')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.inquiry_state')}}</th>
                        <th>{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initIntlIntentionInquireList" style="cursor:pointer" v-if="item.inquire==1">
                        <td>{{item.inquireType}}</td>
                        <td>{{item.names}}</td>
                        <td class="underline" @click="clickOn(item.intentionId,item.id,$index)">{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.ctime | date}}</td>
                        <td v-if="item.inquire==0" style="background:#7B68EE;color:#fff">{{$t('static.initial')}}</td>
                        <td v-if="item.inquire==1" style="background:#CD853F;color:#fff">{{$t('static.inquiry')}}</td>
                        <td v-if="item.inquire==2" style="background:#483D8B;color:#fff">{{$t('static.quotation')}}</td>
                        <td v-if="item.inquire==3" style="background:green;color:#fff">{{$t('static.quo_complete')}}</td>
                        <td>
                            <div v-if="item.inquire==2" style="display:inline-block;margin-right:7px" @click="confirmOffer(item.intentionId,$index)"><img src="/static/images/{{$t('static.img_confirm')}}.png" alt="确认报价"  /></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="order_table" id="table_box" v-show="currentView==4">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.inquire_type')}}</th>
                        <th>{{$t('static.commodity_items')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.country')}}</th>
                        <th>{{$t('static.city')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.inquiry_state')}}</th>
                        <th>{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initIntlIntentionInquireList" style="cursor:pointer" v-if="item.inquire==2">
                        <td>{{item.inquireType}}</td>
                        <td>{{item.names}}</td>
                        <td class="underline" @click="clickOn(item.intentionId,item.id,$index)">{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.ctime | date}}</td>
                        <td v-if="item.inquire==0" style="background:#7B68EE;color:#fff">{{$t('static.initial')}}</td>
                        <td v-if="item.inquire==1" style="background:#CD853F;color:#fff">{{$t('static.inquiry')}}</td>
                        <td v-if="item.inquire==2" style="background:#483D8B;color:#fff">{{$t('static.quotation')}}</td>
                        <td v-if="item.inquire==3" style="background:green;color:#fff">{{$t('static.quo_complete')}}</td>
                        <td>
                            <div v-if="item.inquire==2" style="display:inline-block;margin-right:7px" @click="confirmOffer(item.intentionId,$index)"><img src="/static/images/{{$t('static.img_confirm')}}.png" alt="确认报价"  /></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="order_table" id="table_box" v-show="currentView==5">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.inquire_type')}}</th>
                        <th>{{$t('static.commodity_items')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.country')}}</th>
                        <th>{{$t('static.city')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.inquiry_state')}}</th>
                        <th>{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initIntlIntentionInquireList" style="cursor:pointer" v-if="item.inquire==3">
                        <td>{{item.inquireType}}</td>
                        <td>{{item.names}}</td>
                        <td class="underline" @click="clickOn(item.intentionId,item.id,$index)">{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.ctime | date}}</td>
                        <td v-if="item.inquire==0" style="background:#7B68EE;color:#fff">{{$t('static.initial')}}</td>
                        <td v-if="item.inquire==1" style="background:#CD853F;color:#fff">{{$t('static.inquiry')}}</td>
                        <td v-if="item.inquire==2" style="background:#483D8B;color:#fff">{{$t('static.quotation')}}</td>
                        <td v-if="item.inquire==3" style="background:green;color:#fff">{{$t('static.quo_complete')}}</td>
                        <td>
                            <div v-if="item.inquire==2" style="display:inline-block;margin-right:7px" @click="confirmOffer(item.intentionId,$index)"><img src="/static/images/{{$t('static.img_confirm')}}.png" alt="确认报价"  /></div>
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
import offerModel from '../intlOffer'
import detailModel from '../inquireDetail'
import affirmofferModel from '../confirmOffer'
import common from '../../../common/common'
import inquireModel from '../inquire'
import tipsModel  from '../../../components/tips/tipDialog'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import {
    initIntlIntentionInquireList
  
} from '../../../vuex/getters'
import {
    getIntlIntentionInquireList,
    intlIntentionInquire,
    
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        inquireModel,
        offerModel,
        detailModel,
        affirmofferModel,
        tipsModel
    },
    vuex: {
        getters: {
            initIntlIntentionInquireList 
        },
        actions: {
            getIntlIntentionInquireList,
            intlIntentionInquire    
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
                link:'/intlIntention/inquire',
                employee:'',
                breedId:'',
                breedName:'',
                customerName:'',
                customerEmail:''  
            },
            isA:true,
            isB:false,
            isC:false,
            isD:false,
            currentView:1,
            affirmOfferParam:{
                show:false,
                link:'/intlIntention/offer',
                callback:this.offerCallback,
                id:'',
                index:'',
                description:''
            },
            detailParam:{
                link:'/intlIntention/',
                key:'intentionDetail',
                show:false,
                index:'',    //询价列表的索引
                id:'',
                inquireId:''
            },
           
            inquireParam:{
                show:false,
                times:0,    //询价的次数
                link:'',
                intentionId:'',
                inquireType:'',
                comment:''
            },
            tipsParam:{
                show:false,
                name:'修改成功',
                alert:true,
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
            offerParam:{
                show:false,
                id:'',
                items:[],
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
        clickday:function(){
            this.isA = true;
            this.currentView = 1;
        },
        clickweek:function(){
            this.isA = false;
            this.isB = true;
            this.currentView = 2;
        },
        clickmonth:function(){
            this.isB = false;
            this.isA = false;
            this.isC = true;
            this.currentView = 3;
        },
        clickyear:function(){
            this.isB = false;
            this.isA = false;
            this.isC = false;
            this.isD= true;
            this.currentView = 4;
        },
        clickfinish:function(){
            this.isB = false;
            this.isA = false;
            this.isC = false;
            this.isD = false;
            this.currentView = 5;
        },
        clickOn:function(id,inquireId,index){
            this.detailParam.id = id;
            this.detailParam.index = index;
            this.detailParam.inquireId = inquireId;

            this.detailParam.show = true;
        },
        offer:function(){
            this.offerParam.show = true;
        },
        confirmOffer:function(intentionId,index){
            console.log(intentionId);
            this.affirmOfferParam.id = intentionId;
            this.affirmOfferParam.index = index;
            this.affirmOfferParam.show = true;
            //this.intlIntentionAffirmOffer(this.affirmOfferParam);
        },
        search:function(){
          this.loadParam.loading = false;
          this.loadParam.show = true;

        },
        searchIntention:function(){
            this.getIntlIntentionList(this.loadParam);
        },
        resetCondition:function(){
            this.loadParam.employee='';
            this.loadParam.customerName='';
            this.loadParam.breedId='';
            this.loadParam.breedName='';
            this.loadParam.customerEmail='';
            this.getIntlIntentionList(this.loadParam);
        },
        offerCallback:function(name){
            this.tipsParam.show = true;
            this.tipsParam.name=name;
            this.tipsParam.alert=true;
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntlIntentionInquireList(this.loadParam);
        }
    },
    created() {
        changeMenu(this.$store.state.table.isTop,this.getIntlIntentionInquireList,this.loadParam,localStorage.intlInquireParam); 
        
    },
    filter: (filter,{})
}
</script>
<style scoped>
.click_change{
    text-align: left;
    border: 1px solid #ddd;
    border-bottom: none;
    border-right: none;
    width: 569px;
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
.transfer{
    margin-left: 18px;
}
 #table_box  table th,#table_box  table td{
    min-width: 171px;
    width: 171px;
}
</style>


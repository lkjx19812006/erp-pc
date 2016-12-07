<template>
     <inquire-model :param="inquireParam" v-if="inquireParam.show"></inquire-model>
     <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
     <offer-model :param="offerParam" v-if="offerParam.show"></offer-model>
     <affirmoffer-model :param="affirmOfferParam" v-if="affirmOfferParam.show"></affirmoffer-model>
     <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">{{$t('static.International_intention_inquiry')}}</div>
            
        </div>
        <div class="order_table" id="table_box">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <!--<th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label></th>-->
                        <th>{{$t('static.inquire_type')}}</th>
                        <th>{{$t('static.commodity_items')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.country')}}</th>
                        <!-- <th>{{$t('static.province')}}</th> -->
                        <th>{{$t('static.city')}}</th>
                        <!-- <th>{{$t('static.area')}}</th> -->
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.inquiry_state')}}</th>
                        <th>{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in initIntlIntentionInquireList" style="cursor:pointer">
                         <!--<td>-->
                            <!--<label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>-->
                        <!--</td>-->
                        <td>{{item.inquireType}}</td>
                        <td><a class="underline" @click="clickOn(item.intentionId,item.id,$index)">{{item.names}}</a></td>
                        <td>{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.country}}</td>
                        <!-- <td>{{item.province}}</td> -->
                        <td>{{item.city}}</td>
                        <!-- <td>{{item.district}}</td> -->
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
        affirmofferModel
    },
    vuex: {
        getters: {
            initIntlIntentionInquireList,
            
        },
        actions: {
            getIntlIntentionInquireList,
            intlIntentionInquire,
            
            
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
            affirmOfferParam:{
                show:false,
                link:'/intlIntention/offer',
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
                name:'',
                ids:[],
                index:[],
                onSell:0
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
 #table_box  table th,#table_box  table td{
    min-width: 171px;
    width: 171px;
}
</style>


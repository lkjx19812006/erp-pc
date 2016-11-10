<template>
     <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
     <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
     <create-model :param.sync="createParam" v-if="createParam.show"></create-model>
     <modify-model :param.sync="modifyParam" v-if="modifyParam.show"></modify-model>
     <inquire-model :param="inquireParam" v-if="inquireParam.show"></inquire-model>
     
     <div v-show="!detailParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">我的意向</div>
            <div class="col-xs-5 my_order_search">
               
           </div>
            <div class="right">
                <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
                <button class="new_btn transfer" @click="search()">搜索</button>
                <button class="new_btn" @click="createIntention()">新建</button>
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
                            <th>资格资质</th>
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
                            <th>询价次数</th>
                            <th>报价次数</th>
                            <th>发布时间</th>
                            <th>审核状态</th>
                            <th>描述</th>
                            <th colspan="4">操作</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in initIntlIntentionList" style="cursor:pointer">
                         <!--<td>-->
                            <!--<label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>-->
                        <!--</td>-->
                        <td>{{item.type | chanceType}}</td>
                        <td>
                            <div v-if="item.especial==0">普通</div>
                            <div v-if="item.especial==1&&item.type==0">紧急求购</div>
                            <div v-if="item.especial==1&&item.type==1">低价资源</div>
                        </td>
                        <td class="underline" @click="clickOn(item.id)">{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
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
                        <td>{{item.inquire}}</td>
                        <td>{{item.offerTime}}</td>
                        <td>{{item.ctime | date}}</td>
                        <td>{{item.validate | intentionAudit}}</td>
                        <td>{{item.description}}</td>
                        <td>
                            <div v-if="item.inquire===0&&item.inquireTime===0" style="display:inline-block;margin-right:7px" @click="inquire(item.id,item.inquireTime)"><img src="/static/images/inquire.png" alt="询价" /></div>
                            <div v-if="item.inquire===0&&item.inquireTime!==0" style="display:inline-block;margin-right:7px" @click="inquire(item.id,item.inquireTime)"><img src="/static/images/inquireAgain.png" alt="再次询价" /></div>
                            <div v-if="item.inquire===1" style="display:inline-block;margin-right:7px" @click="cancelInquire(item.id)">取消询价</div>
                            <div style="display:inline-block;margin-right:7px" @click="modifyIntention(item.id,$index)"><img src="/static/images/edit.png" alt="编辑"  /></div>
                            <div style="display:inline-block;margin-right:7px" @click="deleteIntention(item.id,$index)"><img src="/static/images/del.png" alt="删除"  /></div>
                            <div style="display:inline-block;margin-right:7px" @click="confirmOffer(item.id,$index)"><img src="/static/images/quote.png" alt="确认报价"  /></div>
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
import detailModel from '../intentionDetail'
import createModel from '../createIntention'
import modifyModel from '../modifyIntention'
import inquireModel from '../inquire'


import {
    initIntlIntentionList
  
} from '../../../vuex/getters'
import {
    getEmpIntlIntentionList,
    intlIntentionInquire,
    deleteIntlIntention,
    intlIntentionAffirmOffer,
    cancelIntlIntentionInquire
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        searchModel,
        detailModel,
        createModel,
        modifyModel,
        inquireModel,
        
    },
    vuex: {
        getters: {
            initIntlIntentionList,
            
        },
        actions: {
            getEmpIntlIntentionList,
            intlIntentionInquire,
            deleteIntlIntention,
            intlIntentionAffirmOffer,
            cancelIntlIntentionInquire
            
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
                link:'/intlIntention/',
                employee:'',
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
            intentionParam:{
                show:false,
                id:'',
                name:'意向'
            },
            inquireParam:{
                show:false,
                times:0,    //询价的次数
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
                link:'/intlIntention/inquire',
                id:''
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
                id:'',
                index:'',
                link:'/intlIntention/',
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
                items:[
                    
                ]
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
        inquire:function(id,time){
            console.log('inquire');
            this.inquireParam.link = '/intlIntention/inquire';
            this.inquireParam.times = time;
            this.inquireParam.intentionId = id;
            this.inquireParam.inquireType = '';
            this.inquireParam.comment = '';
            this.inquireParam.show = true;
        },
        inquireAgain:function(id,time){
            console.log('再次询价');
            this.inquireParam.link = '/intlIntention/itemInquire';
            this.inquireParam.times = time;
            this.inquireParam.intentionId = id;
            this.inquireParam.inquireType = '';
            this.inquireParam.comment = '';
            this.inquireParam.show = true;

        },
        cancelInquire:function(id){

            this.cancelInquireParam.id = id;
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
        
        
        search:function(){
          this.loadParam.loading = false;
          this.loadParam.show = true;

        },
        searchIntention:function(){
            this.getEmpIntlIntentionList(this.loadParam);
        },
        resetCondition:function(){
            this.loadParam.employee='';
            this.loadParam.customerName='';
            this.loadParam.breedId='';
            this.loadParam.breedName='';
            this.loadParam.customerEmail='';
            this.getEmpIntlIntentionList(this.loadParam);
        },
        
        createIntention:function(){

            this.createParam.show = true;
        },
        deleteIntention:function(id,index){
            this.deleteParam.id = id;
            this.deleteParam.index = index;
            this.deleteIntlIntention(this.deleteParam);  
        },
        modifyIntention:function(id,index){
            console.log(id);
            console.log(index);
              this.modifyParam.show = true;
              this.modifyParam.id = id;
              this.modifyParam.index = index;
              this.modifyParam.items = [];
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
            this.getEmpIntlIntentionList(this.loadParam);
        }
    },
    created() {
        this.getEmpIntlIntentionList(this.loadParam, this.loadParam.all);
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


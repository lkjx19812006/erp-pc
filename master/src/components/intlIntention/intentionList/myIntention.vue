<template>
     <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
     <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
     <create-model :param.sync="createParam" v-if="createParam.show"></create-model>
     <modify-model :param.sync="modifyParam" v-if="modifyParam.show"></modify-model>
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
                            <th></th>
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
                        <td class="underline" @click="clickOn({


                            })">{{item.customerName}}</td>
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
                        <td>
                            <div style="display:inline-block;margin-right:7px" @click="modifyIntention(item.id)"><img src="/static/images/edit.png" alt="编辑"  /></div>
                            <div style="display:inline-block;margin-right:7px" @click="inquire()"><img src="/static/images/edit1.png" alt="询价" /></div>
                            <div style="display:inline-block;margin-right:7px" @click="del()"><img src="/static/images/del.png" alt="删除"  /></div>
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
import {
    initIntlIntentionList
  
} from '../../../vuex/getters'
import {
    getIntlIntentionList,
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        searchModel,
        detailModel,
        createModel,
        modifyModel
    },
    vuex: {
        getters: {
            initIntlIntentionList,
            
        },
        actions: {
            getIntlIntentionList,
            
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
                id:'',
                /*customerId:'',
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
                    
                ]*/
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
        edit:function(){
            console.log('edit');
        },
        del:function(){
            console.log('del');
        },
        inquire:function(){
            console.log('inquire');
        },
        clickOn:function(){
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
        specDelete:function(initIntentionList){
              this.deleteParam = initIntentionList;
        },
        modifyIntention:function(id){
              this.modifyParam.show = true;
              this.modifyParam.id = id;
        },
        createIntention:function(){

              this.createParam.show = true;
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


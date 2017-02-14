<template>
    <chancedetail-model :param.sync="chanceParam" v-if="chanceParam.show"></chancedetail-model>
    <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
    <intentionaudit-model :param="intentionAuditParam" v-if="intentionAuditParam.show"></intentionaudit-model>
    <createintent-model :param="createParam" v-if="createParam.show"></createintent-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <supdem-model :param="supdemParam" v-if="supdemParam.show"></supdem-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>

    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:10px;">
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:3px" >客户名：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:3px" >客户手机：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerPhone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:3px" >品种：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" placeholder="选择品种" @click="breedSearch()" >
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:3px" >产地：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.location" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:3px" >标签：</dt>
                   <dd class="left">
                        <input-select
                           :value.sync="loadParam.label"
                           :prevalue="loadParam.label"
                           :options="labels"
                           placeholder="标签"
                         >
                        </input-select>
                   </dd>
                </dl>
                
                <dl class="clear left transfer">

                   <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
                </dl>
            </div>
            
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">意向类型：</dt>
                   <div class="btn-group">
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===''&&this.loadParam.especial===''}" @click="selectType('','')">
                          全部
                       </button>
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===0&&this.loadParam.especial===0}" @click="selectType(0,0)">
                          普通求购
                       </button>
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===0&&this.loadParam.especial===1}" @click="selectType(0,1)">
                          紧急求购
                       </button>
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===1&&this.loadParam.especial===0}" @click="selectType(1,0)">
                          普通供应
                       </button>
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===1&&this.loadParam.especial===1}" @click="selectType(1,1)">
                          低价资源
                       </button>
                   </div>
                </dl>

                <dl class="clear left transfer" style="margin-left:50px">
                   <dt class="left transfer marg_top">审核状态：</dt>
                   <div class="btn-group">
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===''}" @click="selectValidate('')">
                          全部
                       </button>
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===0}" @click="selectValidate(0)">
                          待审核
                       </button>
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===1}" @click="selectValidate(1)">
                          审核通过
                       </button>
                       <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===-1}" @click="selectValidate(-1)">
                          审核不通过
                       </button>
                   </div>
                </dl>

                <dl class="clear left transfer" style="margin-left:50px">
                   <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>

                <dd class="pull-right" style="margin-right:10px">
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" @click="intentionAudit()">审核</button>
                    <button type="button" class="btn btn-primary" height="24" width="24" @click="selectSearch()">刷新</button>
                </dd>

              </div>     
        </div>

        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th><!-- <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label> --></th>
                        <th>类型</th>
                        <!-- <th>特殊的</th> -->
                        <th>客户名称</th>
                        <th>客户手机号</th>
                        <th>品种名称</th>
                        <th>资格资质</th>
                        <th>规格</th>
                        <th>单位</th>
                        <th>单价</th>
                        <th>产地</th>
                        <th>数量</th>
                        <th>所在省</th>
                        <th>交收地址</th>
                        <th>提供样品</th>
                        <th>样品数量</th>
                        <th>样品价格</th>
                        <th>审核状态</th>
                        <th style="min-width: 150px;">操作</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in initUnIntentionList">
                         <td>
                            <label v-if="item.validate==0" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" >
                            </label>
                        </td>
                        <!-- <td>{{item.type | chanceType}}</td> -->
                        <td>
                            <div v-if="item.especial==0&&item.type==0">普通求购</div>
                            <div v-if="item.especial==0&&item.type==1">普通供应</div>
                            <div v-if="item.especial==1&&item.type==0">紧急求购</div>
                            <div v-if="item.especial==1&&item.type==1">低价资源</div>
                        </td>
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
                                key:'unIntentionList',
                                image_f:'',
                                image_s:'',
                                image_t:'',
                                image_f_show:'',
                                image_s_show:'',
                                image_t_show:'',
                                duedate:item.duedate
                                })">{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td @click="match(item)"  style="cursor:pointer;color:#fa6705">{{item.breedName}}</td>
                        <td>{{item.qualification | qualify}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.unit}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.number}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.address}}</td>
                        <td>
                            <div v-if="item.sampling==0">否</div>
                            <div v-if="item.sampling==1">是</div>
                        </td>
                        <td>{{item.sampleNumber}}</td>
                        <td>{{item.sampleAmount}}</td>
                        <td>{{item.validate | intentionAudit}}</td>
                        <td >
                            <a class="operate" @click="modifyIntention({
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
                                               key:'unIntentionList',
                                               images:item.pics,
                                               image_f:'',
                                               image_s:'',
                                               image_t:'',
                                               image_f_show:'',
                                               image_s_show:'',
                                               image_t_show:'',
                                               duedate:item.duedate
                                               })"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
                           </a>
                            <a class="operate" @click.stop="userToClient({
                                name:item.customerName,
                                keyname:'transStatus',
                                sub:$index,
                                //userId:item.userId,
                                main:1,
                                province:'',
                                phone:item.customerPhone,
                                tel:item.userTel,
                                email:item.userEmail,
                                qq:item.userQq,
                                type:0,
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
                                 name: item.customerName,
                                 position: '',
                                 department: '',
                                 phone: item.customerPhone,
                                 tel: item.userTel,
                                 email: item.email,
                                 qq: item.userQq,
                                 wechart: ''
                                }
                              },item.show=false)"><img src="/static/images/transfer.png" height="18" width="30"  alt="划转" title="划转"/>
                            </a>
                        </td>

                    </tr>

                </tbody>
            </table>
        </div>

        <!--底部分页-->
        <pagination :combination="loadParam"  slot="page"></pagination>
              
    </mglist-model>

</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import chancedetailModel from '../../Intention/chanceDetail'
import transferintentModel from '../../Intention/transferIntent'
import createintentModel from '../../user/userIntention'
import intentionauditModel from'../../user/intentionAudit'
import tipsdialogModel  from '../../tips/tipDialog'
import supdemModel from '../supplyDemand'
import transferModel  from '../../user/userTransfer'
import searchModel from '../intentionSearch'
import breedsearchModel from '../breedsearch'
//import inputSelect from '../../tools/vueSelect/components/inputselect'
import inputSelect from '../../tools/vueSelect/components/multiSelect'
import commonArray from '../../tools/commonArray'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'

import {
  initUnIntentionList,
  initSupplyDemandList
} from '../../../vuex/getters'
import {
  getIntentionList,
  getSupplyDemandList,
  intentionUpAndDown,
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        chancedetailModel,
        intentionauditModel,
        createintentModel,
        transferintentModel,
        tipsdialogModel,
        supdemModel,
        transferModel,
        searchModel,
        breedsearchModel,
        inputSelect,
        mglistModel
    },
    vuex: {
        getters: {
            initUnIntentionList,
            initSupplyDemandList
        },
        actions: {
            getIntentionList,
            getSupplyDemandList,
            intentionUpAndDown,

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
                link:'/intention/resource/list',
                key:'unIntentionList',
                type:'',      //类型
                especial:'',    //特殊
                invoic:'',  //发票
                visit:'',    //上门看货
                sampling:'',   //样品
                advance:'',  //预付比例
                intl:'',  //是否国际
                validate:'',  //审核状态
                onSell:'', //审核状态
                total:0,
                breedId:'',
                breedName:'',
                customerName:'',
                customerPhone:'',
                location:'',
                label:''
            },
            labels:[],
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
                key:'unIntentionList',
                name:''

            },
            intentionAuditParam:{
                show:false,
                key:'unIntentionList',
                arr:[],
                indexs:[],
                validate:0,
                description:''
            },
            createParam:{
              show:false
            },
            offerParam:{
              show:false,
              id:''
            },
            breedSearchParam:{
              show:false
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
            if(this.$store.state.table.basicBaseList.unIntentionList[sub].show){
                this.$store.state.table.basicBaseList.unIntentionList[sub].show = !this.$store.state.table.basicBaseList.unIntentionList[sub].show;
            }else{
                this.$store.state.table.basicBaseList.unIntentionList[sub].show=true;
            }
        },
        detailClick:function(param){
            this.chanceParam = param;
        },
        onlyselected:function(sub,id){
            var _this = this;
            this.$store.state.table.basicBaseList.unIntentionList[sub].checked=!this.$store.state.table.basicBaseList.unIntentionList[sub].checked;
            if(!this.$store.state.table.basicBaseList.unIntentionList[sub].checked){
                this.checked = false;
            }else{
                this.checked = true;
                this.$store.state.table.basicBaseList.unIntentionList.forEach(function(item){
                    if(!item.checked&&item.validate==0){
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll:function(){
            this.checked = !this.checked;
            if(this.checked){
                this.$store.state.table.basicBaseList.unIntentionList.forEach(function(item){
                    if(item.validate==0){
                        item.checked = true;
                    }
                })
            }else{
                this.$store.state.table.basicBaseList.unIntentionList.forEach(function(item){
                  item.checked = false;
                })
            }
        },
        breedSearch:function(){
            this.breedSearchParam.show = true;
        },
        selectType:function(type,especial){
            this.loadParam.type = type;
            this.loadParam.especial = especial;
            this.selectSearch();
        },
        selectValidate:function(validate){
            this.loadParam.validate = validate;
            this.selectSearch();
        },
        intentionAudit:function(){
            this.intentionAuditParam.arr = [];
            this.intentionAuditParam.indexs = [];
            for(var i=0;i<this.$store.state.table.basicBaseList.unIntentionList.length;i++){
                if(this.$store.state.table.basicBaseList.unIntentionList[i].checked){
                    this.intentionAuditParam.arr.push(this.$store.state.table.basicBaseList.unIntentionList[i].id);
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
            for(var i=0;i<this.initUnIntentionList.length;i++){
                if(this.initUnIntentionList[i].checked){
                    this.tipsParam.ids.push(this.initUnIntentionList[i].id);
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
            item.employeeId=this.$store.state.table.login.id;
            item.employeeName=this.$store.state.table.login.name;
            item.orgId=this.$store.state.table.login.orgId;
            this.transferParam = item;
            this.transferParam.callback = this.tansferback;
        },
        tansferback:function(title){
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
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
            this.loadParam.especial='';
            this.loadParam.invoic='';
            this.loadParam.visit='';
            this.loadParam.intl='';
            this.loadParam.sampling='';
            this.loadParam.validate='';
            this.loadParam.onSell='';
            this.loadParam.advance='';
            this.loadParam.customerName='';
            this.loadParam.breedId='';
            this.loadParam.breedName='';
            this.loadParam.customerPhone='';
            this.loadParam.location='';
            this.loadParam.label='';
            this.getIntentionList(this.loadParam);

        },
        specDelete:function(param){
          this.deleteParam = param;
        },
        modifyIntention:function(param){  
          this.createParam = param;
          this.createParam.callback = this.modifyback;
        },
        modifyback:function(title){
            this.getIntentionList(this.loadParam);
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
        createIntention:function(param){
             this.createParam = param;
        },
        selectSearch:function(){
          this.getIntentionList(this.loadParam)
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntentionList(this.loadParam);
        },
        breed:function(breed){
            this.loadParam.breedId=breed.breedId;
            this.loadParam.breedName=breed.breedName;
            this.selectSearch();
            
        }
    },
    created() {
      this.labels = commonArray.intentionLabels;
       changeMenu(this.$store.state.table.isTop,this.getIntentionList,this.loadParam,localStorage.potentialIntentionParam);
        
    },
    ready(){
      common('tab','table_box',1);
    },
    filter: (filter,{})
}
</script>
<style scoped>
.transfer{
    margin-right: 8px;
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
.service-nav {
    padding: 35px 10px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
</style>


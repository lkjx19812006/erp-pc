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
        <div class="service-nav">
          <div class="clearfix">
              <div class="my_enterprise col-xs-2">会员意向</div>
              <div class="right">
                  <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
                  <button class="new_btn transfer" @click="search()">搜索</button>
                  <button class="new_btn transfer" @click="intentionAudit()">审核</button>
              </div>
          </div>
          <div class="clear" style="margin-top:10px;">
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">意向类型：</dt>
                 <dd class="left">
                      <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                          <option value="">全部</option>
                          <option value="0">求购</option>
                          <option value="1">供应</option>
                      </select>
                 </dd>
              </dl>
              <dl class="clear left transfer" v-show="loadParam.type==1&&loadParam.type">
                 <dt class="left transfer marg_top">供应类型：</dt>
                 <dd class="left">
                       <select v-model="loadParam.especial"  class="form-control" @change="selectSearch()">
                              <option value="">全部</option>
                              <option value="0">普通供应</option>
                              <option value="1">低价资源</option>
                      </select>
                 </dd>
              </dl>
              <dl class="clear left transfer" v-show="loadParam.type==0&&loadParam.type">
                 <dt class="left transfer marg_top">求购类型：</dt>
                 <dd class="left">
                       <select v-model="loadParam.especial"  class="form-control" @change="selectSearch()">
                              <option value="">全部</option>
                              <option value="0">普通求购</option>
                              <option value="1">紧急求购</option>
                      </select>
                 </dd>
              </dl>
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">发票提供：</dt>
                 <dd class="left">
                       <select v-model="loadParam.invoic"  class="form-control" @change="selectSearch()">
                                <option value="">全部</option>
                                <option value="0">无发票</option>
                                <option value="1">普通发票</option>
                                <option value="2">增值发票</option>
                      </select>
                 </dd>
              </dl>
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">审核状态：</dt>
                 <dd class="left">
                       <select v-model="loadParam.validate"  class="form-control" @change="selectSearch()">
                          <option value="">全部</option>
                          <option value="0">初始</option>
                          <option value="9">审核中</option>
                          <option value="1">客服审核通过</option>
                          <option value="-1">客服审核不通过</option>
                          <option value="2">业务员申请审核</option>
                          <option value="3">业务主管审核通过</option>
                          <option value="-3">业务主管审核不通过</option>
                      </select>
                 </dd>
              </dl>
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">上/下架状态：</dt>
                 <dd class="left">
                       <select v-model="loadParam.onSell"  class="form-control" @change="selectSearch()">
                          <option value="">全部</option>
                          <option value="0">初始</option>
                          <option value="1">申请上架</option>
                          <option value="2">上架</option>
                          <option value="-2">上架失败</option>
                          <option value="3">申请下架</option>
                          <option value="4">下架</option>
                          <option value="-4">下架失败</option>
                      </select>
                 </dd>
              </dl>
          </div>
        </div>
        <div class="order_table" id="table_box">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label></th>
                        <th>类型</th>
                        <th>发布时间</th>
                        <th>客户名称</th>
                        <th>主要联系人</th>
                        <th>联系方式</th>
                        <th>手机归属地</th>
                        <th>意向商品</th>
                        <th>商品产地</th>
                        <th>商品规格</th>
                        <th>商品数量</th>
                        <th>剩余有效期</th>
                        <th>客户备注</th>
                        <th>意向来源</th>

                        <!-- <th>意向类型</th>
                        <th>会员名称</th>
                        <th>会员手机号</th>
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
                        <th>发布时间</th>
                        <th>审核状态</th> -->
                        
                        <th style="min-width: 250px;">操作</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in initUserIntentionList">
                         <td>
                            <label v-if="item.validate==0||item.validate==9" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" >
                            </label>
                        </td>
                        <td>
                            <div v-if="item.especial==0&&item.type==0">普通求购</div>
                            <div v-if="item.especial==0&&item.type==1">普通供应</div>
                            <span v-if="item.especial==1&&item.type==0">紧急求购</span>
                            <span v-if="item.especial==1&&item.type==1">低价资源</span>
                        </td>
                        <td>{{item.ctime | date}}</td>
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
                                key:'userIntentionList',
                                image_f:'',
                                image_s:'',
                                image_t:'',
                                image_f_show:'',
                                image_s_show:'',
                                image_t_show:'',
                                duedate:item.duedate
                                })">{{item.userFullname}}</td>
                        <td>{{item.mainContact}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.number}}{{item.unit}}</td>
                        <td>{{item.duedateDesc}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.inTypeDesc}}</td>

                        <!-- <td>
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
                                key:'intentionList',
                                image_f:'',
                                image_s:'',
                                image_t:'',
                                image_f_show:'',
                                image_s_show:'',
                                image_t_show:'',
                                duedate:item.duedate
                                })">{{item.userFullname}}</td>
                        <td>{{item.userPhone}}</td>
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
                        <td>{{item.ctime | date}}</td>
                        <td>{{item.validate | intentionAudit}}</td> -->
                        <td>
                            <a class="operate" @click.stop="modifyIntention({
                                  id:item.id,
                                  sub:$index,
                                  selectCustomer:false,
                                  flag:1,
                                  show:true,
                                  loading:true,
                                  title:'编辑',
                                  userFullname:item.userFullname,
                                  userPhone:item.userPhone,
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
                                  ctime:item.ctime,
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
                                   key:'userIntentionList',
                                   image_f:'',
                                   image_s:'',
                                   image_t:'',
                                   image_f_show:'',
                                   image_s_show:'',
                                   image_t_show:'',
                                   duedate:item.duedate
                                   })">
                                   <img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
                            </a>
                            <a class="operate" @click.stop="specDelete({
                                 id:item.id,
                                 sub:$index,
                                 show:true,
                                 name:item.name,
                                 title:'意向',
                                 link:deleteInfo,
                                 url:'/intention/',
                                 key:'userIntentionList'
                                 })">
                               <img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/>
                            </a>
                            <a class="operate" @click.stop="userToClient({
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
                              },item.show=false)">
                                 <img src="/static/images/transfer.png" height="18" width="28"  alt="划转" title="划转"/>
                            </a>
                           <a class="operate" v-if="item.validate==0||item.validate==9" @click.stop="audit($index,item.id)"><img src="/static/images/apply.png" height="18" width="47"  alt="审核" title="审核"/></a>
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
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'

import {
  initUserIntentionList,
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
            initUserIntentionList,
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
                key:'userIntentionList',
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
                location:''
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
                key:'userIntentionList',
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
            if(this.$store.state.table.basicBaseList.userIntentionList[sub].show){
                this.$store.state.table.basicBaseList.userIntentionList[sub].show = !this.$store.state.table.basicBaseList.userIntentionList[sub].show;
            }else{
                this.$store.state.table.basicBaseList.userIntentionList[sub].show=true;
            }
        },
        detailClick:function(param){
            this.chanceParam = param;
        },
        onlyselected:function(sub,id){
            var _this = this;
            this.$store.state.table.basicBaseList.userIntentionList[sub].checked=!this.$store.state.table.basicBaseList.userIntentionList[sub].checked;
            if(!this.$store.state.table.basicBaseList.userIntentionList[sub].checked){
                this.checked = false;
            }else{
                this.checked = true;
                this.$store.state.table.basicBaseList.userIntentionList.forEach(function(item){
                    if(!item.checked&&item.validate==0){
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll:function(){
            this.checked = !this.checked;
            if(this.checked){
                this.$store.state.table.basicBaseList.userIntentionList.forEach(function(item){
                    if(item.validate==0||item.validate==9){
                        item.checked = true;
                    }
                })
            }else{
                this.$store.state.table.basicBaseList.userIntentionList.forEach(function(item){
                  item.checked = false;
                })
            }
        },
        intentionAudit:function(){
            this.intentionAuditParam.arr = [];
            this.intentionAuditParam.indexs = [];
            for(var i=0;i<this.$store.state.table.basicBaseList.userIntentionList.length;i++){
                if(this.$store.state.table.basicBaseList.userIntentionList[i].checked){
                    this.intentionAuditParam.arr.push(this.$store.state.table.basicBaseList.userIntentionList[i].id);
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
            for(var i=0;i<this.initUserIntentionList.length;i++){
                if(this.initUserIntentionList[i].checked){
                    this.tipsParam.ids.push(this.initUserIntentionList[i].id);
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
            this.getIntentionList(this.loadParam);

        },
        specDelete:function(param){
          this.deleteParam = param;
        },
        modifyIntention:function(param){
         
          this.createParam = param;
        },
        createIntention:function(param){
             this.createParam = param;
        },
        selectSearch:function(){
          this.getIntentionList(this.loadParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntentionList(this.loadParam);
        }
    },
    created() {
        changeMenu(this.$store.state.table.isTop,this.getIntentionList,this.loadParam,localStorage.userIntentionParam);
        
    },
    ready(){
      common('tab','table_box',1);
    },
    filter: (filter,{})
}
</script>
<style scoped>
  .edit-model {
    padding: 10px 30px 80px 30px;
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
#table_box table th,#table_box table td{
    width: 116px;
    min-width: 116px;
}
</style>


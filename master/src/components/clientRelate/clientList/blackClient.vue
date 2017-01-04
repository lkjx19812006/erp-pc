<template>
  <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
  <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
  <div>
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">{{$t('static.blacklist')}}</div>
      <button class="new_btn transfer" @click="clientTransferWhite()">{{$t('static.out_of_blacklist')}}</button>
    </div>
    <div class="order_table" id="table_box">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak id="tab">
        <thead>
        <tr>
          <th>
            <!-- <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label> -->
          </th>

          <th>{{$t('static.salesman')}}</th>
          <th>{{$t('static.create_time')}}</th>
          <th>{{$t('static.recent_contact')}}</th>
          <th>{{$t('static.client_name')}}</th>
          <th>{{$t('static.transaction_num')}}</th>
          <th>{{$t('static.client_type')}}</th>
          <th>{{$t('static.contact')}}</th>
          <th>{{$t('static.position')}}</th>
          <th>{{$t('static.cellphone')}}</th>
          <th>{{$t('static.phone_origin')}}</th>
          <th>{{$t('static.client_origin')}}</th>
          <th>{{$t('static.detailed_address')}}</th>
          <th>{{$t('static.main_product')}}</th> 

        <!-- <th>类型</th>
          <th>分类</th>
          <th>客户来源</th>
          <th>客户信用等级</th>
          <th>客户名称</th>
          <th>分类码</th>
          <th>所属分类</th>
          <th>所属业务员</th>
          <th>负责人</th>
          <th style="min-width:120px">经营范围</th>
          <th>手机</th>
          <th>手机省</th>
          <th>手机市</th>
          <th>邮箱</th>
          <th>国家</th>
          <th>所在省</th>
          <th>所在市</th>
          <th>注册地址</th>
          <th>创建时间</th>
          <th style="min-width:200px">备注</th>
         -->
        </tr>
        </thead>
        <tbody>
        <tr>

        </tr>
        <tr v-for="item in initBlackCustomerlist">
          <td  @click.stop="">
            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>
          </td>

          <td>{{item.employeeName}}</td>
          <td>{{item.ctime}}</td>
          <td>{{item.lastOrderTime}}</td>
          <td class="underline"  @click="clickOn({
                id:item.id,
                sub:$index,
                show:true,
                loading:true,
                creditLevel:item.creditLevel,
                name:item.name,
                link:alterInfo,
                url:'/customer/',
                key:'blackCustomerList'
                })">{{item.name}}
          </td>
          <td>{{item.orderTotal}}</td>
          <td>{{item.type | customerType}}</td>
          <td>{{item.mainContact}}</td>
          <td></td>
          <td>{{item.mainPhone}}</td>
          <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
          <td>{{item.provinceName}}{{item.cityName}}</td>
          <td>{{item.address}}</td>
          <td>{{item.bizScope}}</td>

          <!-- <td>{{item.typeDesc}}</td>
          <td>{{item.classifyDesc | classify}}</td>
          <td v-if="item.sourceType=='pc'" style="background:#CC3333;color:#fff">{{item.sourceType}}</td>
                        <td v-if="item.sourceType=='weixin'" style="background:green;color:#fff">{{item.sourceType}}</td>
                        <td v-if="item.sourceType=='android'" style="background:#0000CC;color:#fff">{{item.sourceType}}</td>
                        <td v-if="item.sourceType=='ios'" style="background:#CC0099;color:#fff">{{item.sourceType}}</td>
                        <td v-if="item.sourceType!='pc'&&item.sourceType!='weixin'&&item.sourceType!='android'&&item.sourceType!='ios'" style="background:#fa6705;color:#fff">{{item.sourceType}}</td> 
          <td v-if="item.creditLevel!=1&&item.creditLevel!=2&&item.creditLevel!=3">暂无等级</td>
          <td v-if="item.creditLevel==1">一星客户</td>
          <td v-if="item.creditLevel==2">二星客户</td>
          <td v-if="item.creditLevel==3">三星客户</td>
          <td class="underline"  @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true,
                                creditLevel:item.creditLevel,
                                name:item.name,
                                link:alterInfo,
                                url:'/customer/',
                                key:'customerList'
                                })">{{item.name}}</td>
          上面这个img显示新客户图标
          <td>{{item.category}}</td>
          <td>{{item.classify | classify}}</td>
          <td>{{item.employeeName}}</td>
          <td>{{item.principal}}</td>
          <td>{{item.bizScope}}</td>
          <td>{{item.mainPhone}}</td>
          <td>{{item.phoneProvince}}</td>
          <td>{{item.phoneCity}}</td>
          <td>{{item.email}}</td>
          <td>{{item.countryName | country}}</td>
          <td>{{item.provinceName}}</td>
          <td>{{item.cityName}}</td>
          <td>{{item.address}}</td>
          <td>{{item.ctime}}</td>
          <td >{{item.blackComments}}</td> -->
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

  import pagination from '../../../components/pagination'
  import detailModel from '../../../components/clientRelate/clientDetail'
  import searchModel  from  '../../../components/clientRelate/searchModel'
  import tipsdialogModel  from '../../../components/tipsDialog'
  import auditDialog from '../../../components/tips/auditDialog'
  import common from '../../../common/common'
  import changeMenu from '../../../components/tools/tabs/tabs.js'
  import {
    initBlackCustomerlist
  } from '../../../vuex/getters'
  import {
    getClientList,
    customerTransferBlacklist

  } from '../../../vuex/actions'

  export default {
    components: {
      pagination,
      detailModel,
      tipsdialogModel,
      searchModel,
      auditDialog
    },
    vuex: {
      getters: {
        initBlackCustomerlist
      },
      actions: {
        getClientList,
        customerTransferBlacklist
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
          link:'/customer/',
          key:'blackCustomerList',
          name:'',
          phone:'',
          employeeId:'',
          employeeName:'',
          type:'',
          classify:'',
          status:'',
          bizScope:'',
          provinceName:'',
          province:'',
          city:'',
          cityName:'',
          blacklist:1,
          total:0
        },
        searchParam:{
          show:false,
        },
        tipsParam:{
          show:false,
          name:'请先选择客户'
        },
        changeParam: {
          show: false,
          loading:true
        },
        auditParam:{
          show:false,
          title:'客户踢出黑名单备注',
          arr:[],
          blacklist:0,
          link:'/customer/transferBlacklist',
          key:'blackCustomerList',
        },
        checked:false
      }
    },
    methods: {
      clickOn: function(param) {
        this.changeParam = param;
      },

      checkedAll: function() {
        this.checked=!this.checked;
        if(this.checked){
          this.$store.state.table.basicBaseList.blackCustomerList.forEach(function(item){
            item.checked=true;
          })
        }else{
          this.$store.state.table.basicBaseList.blackCustomerList.forEach(function(item){
            item.checked=false;
          })
        }
      },
      onlyselected:function(sub,id){

        const _this=this;
        this.$store.state.table.basicBaseList.blackCustomerList[sub].checked=!this.$store.state.table.basicBaseList.blackCustomerList[sub].checked;
        if(!this.$store.state.table.basicBaseList.blackCustomerList[sub].checked){
          _this.checked=false;
        }else {
          _this.checked=true;
          this.$store.state.table.basicBaseList.blackCustomerList.forEach(function (item) {
            if(!item.checked){
              _this.checked=false;
            }
          })
        }
      },
      searchClient:function(){
        this.getClientList(this.loadParam)
      },
      clientTransferWhite(){
        for(var i in this.initBlackCustomerlist){
          if(this.initBlackCustomerlist[i].checked){
            this.auditParam.arr.push(this.initBlackCustomerlist[i].id);
          }
        }
        if(this.auditParam.arr.length>0){
          this.auditParam.show=true;
          this.auditParam.confirm=true;
          this.auditParam.arr=this.auditParam.arr;
          this.auditParam.callback=this.callback;
        }else{
          this.tipsParam.show=true;
          this.tipsParam.alert=true;
          this.tipsParam.name='请先选择客户';
          this.tipsParam.confirm=false;
        }
      },
      callback:function(){
        this.auditParam.blackComments=this.auditParam.auditComment;
        this.auditParam.customerIds=this.auditParam.arr;
        this.auditParam.arr=[];
        this.auditParam.auditComment='';
        this.auditParam.callback = this.supplierback;
        this.customerTransferBlacklist(this.auditParam);
      },
      supplierback:function(title){
        console.log(title)
        this.tipsParam.show = true;
        if(title=='success'){
          this.tipsParam.name = '移除黑名单成功';
        }else{
          this.tipsParam.name=title;
        }
        
        this.tipsParam.alert=true;
     },
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getClientList(this.loadParam);
      }
    },
    ready(){
      common('tab','table_box',1);
    },
    created() {
      changeMenu(this.$store.state.table.isTop,this.getClientList,this.loadParam,localStorage.blackClientParam);
    }
  }
</script>
<style scoped>
  .breed_action {
    top: 33px;
    right: 106px;
  }
  .transfer{
    margin-left: 18px;
  }
.table>tbody>tr>td{
    max-width: 400px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break:break-all; */
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
    width: 122px;
    min-width: 122px;
}
</style>

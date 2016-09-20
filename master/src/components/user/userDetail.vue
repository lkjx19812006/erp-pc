<template>
  <createcust-model :param="custParam" v-if="custParam.show"></createcust-model>
  <createaddr-model :param="addressParam" v-if="addressParam.show"></createaddr-model>
  <createlabel-model :param="labelParam" v-if="labelParam.show"></createlabel-model>
  <updatecontact-model :param="updateParam" v-if="updateParam.show"></updatecontact-model>
  <updateaddr-model :param="addrParam" v-if="addrParam.show"></updateaddr-model>
  <updatelabel-model :param="updlabelParam" v-if="updlabelParam.show"></updatelabel-model>
  <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
  <createfiles-model :param="cfilesParam" v-if="cfilesParam.show"></createfiles-model>
  <createtrack-model :param="ctrackParam" v-if="ctrackParam.show"></createtrack-model>
  <createproduct-model :param="cproductParam" v-if="cproductParam.show"></createproduct-model>
  <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
<div class="client_body">
      <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <a class="navbar-brand navbar-name" href="#">{{initUserDetail.fullname}}</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right" style="margin-top:8px;">
                        <li>
                            <button type="button" class="btn btn-base">新建跟进</button>
                        </li>
                        
                        <li>
                            <button type="button" class="btn btn-base" @click="modifyUser({
                                               id:initUserDetail.id,
                                               show:true,
                                               name:initUserDetail.name,
                                               nickname:initUserDetail.nickname,
                                               fullname:initUserDetail.fullname,
                                               type:initUserDetail.type,
                                               phone:initUserDetail.phone,
                                               email:initUserDetail.email,
                                               qq:initUserDetail.qq,
                                               company:initUserDetail.company,
                                               link:alertInfo,
                                               url:'/user/',
                                               key:'userList'
                                               })">编辑</button>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix" >
                <div class="col-md-8 client-detail">
                    <h4 class="section_title">相关</h4>
                    <article>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                          link:initClientDetail.contacts,
                          crete:'chance'
                          })">
                    <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                    <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                      业务机会（{{initUserDetail.chance.arr.length}}）
                    </a>
                    <button type="button" class="btn btn-base pull-right"  @click.stop="createFormt({
                                         id:param.id,
                                         customerId:param.id,
                                         title:'联系人',
                                         show:true,
                                         name:'',
                                         position:'',
                                         department:'',
                                         phone:'',
                                         tel:'',
                                         email:'',
                                         qq:'',
                                         wechart:'',
                                         main:'',
                                         namelist:'客户名称',
                                         job:'联系人职位',
                                         parten:'联系人部门',
                                         phonelist:'手机',
                                         tellist:'电话',
                                         emaillist:'邮箱',
                                         QQ:'qq',
                                         webchart:'微信',
                                         remark:'备注',
                                         link:createCustomer,
                                         url:'/customer/contact',
                                         key:'contacts'
                                         })">新建</button>
                  </h4>
                                </div>
                                <div class="panel-collapse" v-show="initUserDetail.chance.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>品种</th>
                                            <th>产地</th>
                                            <th>规格</th>
                                            <th>数量</th>
                                            <th>价格</th>
                                            <th>单位</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initUserDetail.chance.arr">
                                                <td>{{item.breedName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td  @click="clickShow($index,{
                                                  concrete:'chance'
                                                  })">
                                                  <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                <div class="breed_action" v-show="item.show">
                                                    <dl>
                                                       <dt @click="updateSpec()">编辑</dt>
                                                       <dt @click="specDelete()">删除</dt>
                                                   </dl>
                                                </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                          
                           
                             
                            
                <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                          link:initClientDetail.addresses,
                          crete:'follow'
                          })">
                    <img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
                    <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                      跟进（{{initUserDetail.follow.arr.length}}）
                    </a>
                    <button type="button" class="btn btn-base pull-right" @click.stop="createAddr({
                                         customerId:param.id,
                                         id:param.id,
                                         show:true,
                                         title:'收货地址',
                                             typelist:'类型',
                                             namelist:'联系人姓名',
                                         phonelist:'联系人电话',
                                         sexlist:'性别',
                                         countylist:'国家',
                                         provicelist:'所在省',
                                         citylist:'所在市',
                                         addr_detail:'地址',
                                         distlist:'所在区域',
                                         streetlist:'所在街道',
                                         addr:'详细地址',
                                             type:'',
                                             contactName:'',
                                             contactPhone:'',
                                             sex:'',
                                             country:'',
                                             province:'',
                                             city:'',
                                             district:'',
                                             street:'',
                                             detailAddr:'',
                                             address:'',
                                         link:createAddress,
                                         url:'/customer/insertAddress',
                                         key:'addresses'
                                         })">新建</button>
                  </h4>
                                </div>
                                <div  class="panel-collapse" v-show="initUserDetail.follow.show">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                          <thead>
                                            <th>订单号</th>
                                            <th>机会</th>
                                            <th>备注</th>
                                            
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initUserDetail.follow.arr">
                                                <td>{{item.orderNo}}</td>
                                                <td>{{item.chanceId}}</td>
                                                <td>{{item.comment}}</td>
                                                
                                                <td  @click="clickShow($index,{
                                                  concrete:'follow'
                                                  })">
                                                  <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                <div class="breed_action" v-show="item.show" >
                                                   <dl>
                                                       <dt @click="updateAddr({
                                                           sub:$index,
                                                           id:item.id,
                                                           customerId:item.customerId,
                                                           show:true,
                                                           title:'收货地址',
                                                           typelist:'类型',
                                                           namelist:'联系人姓名',
                                                   phonelist:'联系人电话',
                                                   sexlist:'性别',
                                                   countylist:'国家',
                                                   provicelist:'所在省',
                                                   citylist:'所在市',
                                                   addr_detail:'地址',
                                                   distlist:'所在区域',
                                                   streetlist:'所在街道',
                                                   addr:'详细地址',
                                                           type:item.type,
                                                           contactName:item.contactName,
                                                           contactPhone:item.contactPhone,
                                                           sex:item.sex,
                                                           country:item.country,
                                                           province:item.province,
                                                           city:item.city,
                                                           district:item.district,
                                                           street:item.street,
                                                           detailAddr:item.detailAddr,
                                                           address:item.address,
                                                           link:addrInfo,
                                                           url:'/customer/updateAddress',
                                                           key:'addresses',
                                                           headline:'clientDetail'
                                                           })">编辑</dt>
                                                       <dt @click="specDelete({
                                                           id:item.id,
                                                           sub:$index,
                                                           show:true,
                                                           title:'收货地址',
                                                           link:addrDel,
                                                           url:'/customer/deleteAddress/',
                                                           key:'addresses',
                                                           headline:'clientDetail'
                                                           })">删除</dt>
                                                   </dl> 
                                                </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                          
                            
                        </div>
                    </article>
                </div>

                <div class="col-md-4">
                    <h4 class="section_title">详情</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>姓名</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.fullname" value="{{initUserDetail.fullname}}"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>昵称</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.nickname" value="{{initUserDetail.nickname}}" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>电话</label>
                                    <input type="text" class="form-control"  v-model="initUserDetail.phone" value="{{initUserDetail.phone}}"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>邮箱</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.email" value="{{initUserDetail.email}}"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>qq</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.qq" value="{{initUserDetail.qq}}" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>公司</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.company" value="{{initUserDetail.company}}"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-12 col-xs-12">
                                    <label>备注</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.comment" value="{{initUserDetail.comment}}" />
                                </div>
                              
                            </div>
                           <!--  <div class="client-detailInfo">
                               <img class="left" src="/static/images/blackselect.png" height="28" width="28" />
                               <label>加入黑名单</label>
                           </div>
                           <div class="client-editbtn">
                               <button type="button" class="btn btn-orange" @click="modifyUser({
                                               id:initUserDetail.id,
                                               show:true,
                                               name:initUserDetail.name,
                                               nickname:initUserDetail.nickname,
                                               fullname:initUserDetail.fullname,
                                               type:initUserDetail.type,
                                               phone:initUserDetail.phone,
                                               email:initUserDetail.email,
                                               qq:initUserDetail.qq,
                                               index:$index,
                                               company:initUserDetail.company,
                                               link:alertInfo,
                                               url:'/user/',
                                               key:'userList'
                                               })">编辑</button>
                           </div>  -->
                        </div>
                    </article>
                </div>
            </div>
        </section>
       </div>


</template>
<script>
import pressImage from '../../components/imagePress'
import tipsdialogModel from '../tipsDialog'
import createcustModel  from '../clientRelate/createClientDetail'
import createaddrModel from '../clientRelate/createAddrInfo'
import createlabelModel from '../clientRelate/label/createLabel'
import updatelabelModel from '../clientRelate/label/updatelebel'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import updatecontactModel from '../clientRelate/updateContactInfo'
import updateaddrModel from '../clientRelate/updataAddrInfo'
import createfilesModel from  '../clientRelate/createFiles'
import createtrackModel from '../clientRelate/label/createTrack'
import createproductModel from  '../clientRelate/label/createProduct'
import {
  initClientDetail,

  initUserDetail
} from '../../vuex/getters'
import {
  getClientDetail,
  createCustomer,
  specDel,
  updateContact,
  addrInfo,
  createAddress,
  alterInfo,
  addrDel,
  createLabel,
  alterLabel,
  createRemark,
  alterRemark,
  createTrack,
  createProduct,
  alterProduct,
  uploadFiles,

 //getUserDetail 
} from '../../vuex/actions'
export default {
    components: {
        pressImage,
        createcustModel,
        deletebreedModel,
        updatecontactModel,
        updateaddrModel,
        createaddrModel,
        createlabelModel,
        updatelabelModel,
        createfilesModel,
        createtrackModel,
        createproductModel,
        tipsdialogModel
    },
    props:['param'],
    data(){
      return {
        custParam:{
          show:false,
          id:''
        },
        deleteParam:{
          show:false
        },
        updateParam:{
          show:false
        },
        addrParam:{
          show:false
        },
        addressParam:{
          show:false
        },
        labelParam:{
          show:false
        },
        updlabelParam:{
          show:false
        },
        cfilesParam:{
          show:false
        },
        ctrackParam:{
          show:false,
          name:''
        },
        cproductParam:{
          show:false
        },
        tipsParam:{
          show:false
        },
        show:true
      }
    },
    vuex:{
      getters:{
      initClientDetail,

      initUserDetail
      },
      actions:{
        getClientDetail,
        createCustomer,
        specDel,
        updateContact,
        addrInfo,
        createAddress,
        alterInfo,
        addrDel,
        createLabel,
        alterLabel,
        createRemark,
        alterRemark,
        createTrack,
        createProduct,
        alterProduct,
        uploadFiles,

        //getUserDetail
      }
    },
    methods:{
      modifyUser:function(item){
        this.$parent.modifyUser(item);
      },
      enfoldment:function(param){

        if(this.$store.state.table.userDetail[param.crete].arr.length==0){
                this.$store.state.table.userDetail[param.crete].show=true;
            }
            this.$store.state.table.userDetail[param.crete].show = !this.$store.state.table.userDetail[param.crete].show;
      },
      clickShow: function(index,param) {
            
            if (this.$store.state.table.userDetail[param.concrete].arr[index].show) {
                this.$store.state.table.userDetail[param.concrete].arr[index].show = false;
            } else {
                this.$store.state.table.userDetail[param.concrete].arr[index].show = true
            }
         
        },
        createFormt:function(initBreedDetail){
          this.custParam = initBreedDetail;
        },
        createAddr:function(initBreedDetail){
          this.addressParam = initBreedDetail;
        },
        newlabel:function(initBreedDetail){
          this.labelParam = initBreedDetail;
        },
        specDelete:function(initBreedDetail){
            this.deleteParam = initBreedDetail;
        },
        updateSpec:function(initBreedDetail){
          this.updateParam = initBreedDetail;
        },
        updateAddr:function(initBreedDetail){
          this.addrParam = initBreedDetail;
        },
        updatelabel:function(initBreedDetail){
          this.updlabelParam = initBreedDetail;
        },
        createfiles:function(initBreedDetail){
          this.cfilesParam=initBreedDetail;
        },
        createtrack:function(value){
          this.ctrackParam.show = true;
          this.ctrackParam.name= value;
        },
        newproduct:function(initBreedDetail){
          this.cproductParam = initBreedDetail;
        }
    }

    
}
</script>
<style scoped>
.client_body {
    position: relative;
    background-color: #fff;
    padding: 20px;
}

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.navbar-img {
    float: left;
    margin-right: 10px;
}

.navbar-name {
    color: #fa6705;
    font-size: 20px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
}

section {
    background-color: #fff;
}
.breed_action{
  top: 20px;
  right: 40px;
}
.breed_action dl dt{
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}
section article {
    margin-top: 30px;
}
.top-title{
  z-index: 100
}
.client-section {
    padding: 10px 5px 40px 5px;
}

.section_title {
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    margin: 0;
}
.contactSet thead{
  color:#fa6705;
}
.panel-title-set {
    margin-top: 6px;
    margin-left: 26px;
    display: inline-block;
    font-size: 20px;
    color: #333;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}

.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
  text-align: left;
}
.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
}

.client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
}
.client-detailInfo label {
    display: block;
    color: #333;
    font-size: 16px;
}

.btn-orange {
    background-color: #fa6705;
    color: #fff;
    font-size: 18px;
}
.label_action{
  position: absolute;
  top:13px;
  right: 32px;
  border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 1000;
    min-width: 90px;
    cursor: pointer;
    padding: 5px 10px;
    max-width: 200px;
}
.client-editbtn {
    text-align: right;
    margin-top: 15px;
}
.client-image {
    display: inline-block;
}
</style>

<template>
    <updatecompany-model :param="companylistParam" v-if="companylistParam.show"></updatecompany-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con modal_overall" v-show="param.show">
      <div class="cover_loading" v-if="param.id!=initCompanyDetail.id">
        <pulse-loader :loading="true" :color="color" :size="size"></pulse-loader>
      </div>
        <div class="client-section clearfix" v-cloak>
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="col-md-8">
                <h4 class="section_title">企业相关 <button v-if="!initCompanyDetail.customerId" class="new_btn transfer" @click="createCustomer({
                          detail:'companyDetail',
                          sub:param.sub,
                          keyname:'transform',
                          key:'enterpriseList',
                          show:true,
                          companyId:initCompanyDetail.id,
                          category:initCompanyDetail.category,
                          type:'1,企业',
                          name:initCompanyDetail.name,
                          tel:initCompanyDetail.tel,
                          principal:initCompanyDetail.principal,
                          bizScope:initCompanyDetail.bizScope,
                          province:initCompanyDetail.province,
                          city:initCompanyDetail.city,
                          address:initCompanyDetail.address,
                          classify:0,
                          employeeId:'',
                          employeeName:'',
                          orgId:'',
                          orgName:'',
                          countryId:7,
                          countryName:'中国'
                          })">提取为客户</button>
                </h4>
                <div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading clearfix" @click="companytoggle({
                                link:initCompanyDetail.companyContacts,
                                crete:'companyContacts'
                                })">
                            <h4 class="panel-title clearfix">
                            <img class="pull-left" src="/static/images/contact.png" height="32" width="27" />
                            <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                联系人({{initCompanyDetail.companyContacts.arr.length}})
                            </a>
                            <button v-if="!initCompanyDetail.customerId" type="button" class="btn btn-base pull-right" @click.stop="createCompany({
                               cid:param.id,
                               show:true,
                               title:'新建联系人',
                               namelist:'联系人名称',
                               phonelist:'手机号',
                               emaillist:'邮箱',
                               tellist:'固话',
                               weblist:'微信',
                               mainlist:'主要联系人',
                               positionlist:'职务',
                               name:'',
                               position:'',
                               phone:'',
                               tel:'',
                               email:'',
                               wechart:'',
                               main:0,
                               link:createContact,
                               url:'contract',
                               key:'companyContacts'
                              })">新建</button>
                        </h4>
                        </div>
                        <div class="panel-collapse"  v-show="!initCompanyDetail.companyContacts.show">
                            <div class="panel-body panel-set">
                                <table class="table contactSet">
                                    <thead>
                                        <tr>
                                            <th>名称</th>
                                            <th>手机</th>
                                            <th>电话</th>
                                            <th>邮箱</th>
                                            <th>微信</th>
                                            <th>主要联系人</th>
                                            <th>职务</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in initCompanyDetail.companyContacts.arr">
                                            <td>{{item.name}}</td>
                                            <td>{{item.phone}}</td>
                                            <td>{{item.tel}}</td>
                                            <td>{{item.email}}</td>
                                            <td>{{item.wechart}}</td>
                                            <td v-if="item.main==0">否</td>
                                            <td v-if="item.main==1">是</td>
                                            <td>{{item.position}}</td>
                                            <td><a class="operate" v-if="!initCompanyDetail.customerId"  @click="updateCompany({
                                                 sub:$index,
                                                 id:item.id,
                                                 show:true,
                                                 cid:item.cid,
                                                 title:'编辑联系人',
                                                 namelist:'联系人名称',
                                                 phonelist:'手机号',
                                                 emaillist:'邮箱',
                                                 tellist:'固话',
                                                 weblist:'微信',
                                                 mainlist:'主要联系人',
                                                 positionlist:'职务',
                                                 name:item.name,
                                                 phone:item.phone,
                                                 tel:item.tel,
                                                 email:item.email,
                                                 wechart:item.wechart,
                                                 link:alterCompany,
                                                 position:item.position,
                                                 url:'contract',
                                                 key:'companyContacts',
                                                 main:item.main
                                                 },item.show=false)"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/></a>
                                            <a class="operate" @click="contactDel({name:item.name,id:item.id,url:'contract',index:$index},item.show=false)" v-if="!initCompanyDetail.customerId"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/></a>
                                                <!-- <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                <div class="breed_action" v-show="item.show" transition="expand">
                                                   <dl>
                                                       <dt @click="updateCompany({
                                                               sub:$index,
                                                               id:item.id,
                                                               show:true,
                                                               cid:item.cid,
                                                               title:'编辑联系人',
                                                               namelist:'联系人名称',
                                                               phonelist:'手机号',
                                                               emaillist:'邮箱',
                                                               tellist:'固话',
                                                               weblist:'微信',
                                                               mainlist:'主要联系人',
                                                               name:item.name,
                                                               phone:item.phone,
                                                               tel:item.tel,
                                                               email:item.email,
                                                               wechart:item.wechart,
                                                               link:alterCompany,
                                                               url:'contract',
                                                               key:'companyContacts',
                                                               main:item.main
                                                               },item.show=false)">编辑</dt>
                                                        <dt  @click="contactDel({name:item.name,id:item.id,url:'contract',index:$index},item.show=false)">删除</dt>
                                                   </dl>
                                        </div> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading clearfix" @click="companytoggle({
                                link:initCompanyDetail.companyProducts,
                                crete:'companyProducts'
                                })">
                            <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/product.png" height="27" width="27" />
                                <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                    产品({{initCompanyDetail.companyProducts.arr.length}})
                                </a>
                            </h4>
                        </div>
                        <div class="panel-collapse"  v-show="!initCompanyDetail.companyProducts.show">
                            <div class="panel-body panel-set">
                                <table class="table contactSet">
                                    <thead>
                                        <tr>
                                            <th>企业名称</th>
                                            <th>类型</th>
                                            <th>名称</th>
                                            <th>状态</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in initCompanyDetail.companyProducts.arr">
                                            <td>{{item.companyName}}</td>
                                            <td>{{item.type}}</td>
                                            <td>{{item.name}}</td>
                                            <td>{{item.status}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                       <div class="panel-heading clearfix" @click="companytoggle({
                               link:initCompanyDetail.companyLicenses,
                               crete:'companyLicenses'
                               })">
                             <h4 class="panel-title clearfix">
                                 <img class="pull-left" src="/static/images/contact.png" height="32" width="27" />
                                 <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                     证书({{initCompanyDetail.companyLicenses.arr.length}})
                                 </a>

                             </h4>
                       </div>
                       <div class="panel-collapse"  v-show="!initCompanyDetail.companyLicenses.show">
                           <div class="panel-body panel-set">
                               <table class="table contactSet">
                                   <thead>
                                       <tr>
                                           <th>证书类型</th>
                                           <th>产品名称</th>
                                           <th>资质名称</th>
                                           <th>发证机构</th>
                                           <th>证书编号</th>
                                           <th>发证日期</th>
                                           <th>过期日期</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <tr v-for="item in initCompanyDetail.companyLicenses.arr">
                                           <td v-if="item.type==0">企业证书</td>
                                           <td v-if="item.type==1">产品证书</td>
                                           <td>{{item.productName}}</td>
                                           <td>{{item.name}}</td>
                                           <td>{{item.organization}}</td>
                                           <td>{{item.number}}</td>
                                           <td>{{item.releaseDate}}</td>
                                           <td>{{item.dueDate}}</td>
                                       </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4" style="border-left:1px solid #ddd">
                <h4 class="section_title">详情</h4>
                <div class="edit-detail clearfix">
                        <div class="client-detailInfo col-xs-12">
                            <label>分类码:</label>
                            <input type="text" class="form-control" value="{{initCompanyDetail.category | catestate}}" disabled=""  />
                        </div>
                        <div class="client-detailInfo col-xs-12">
                            <label>类别:</label>
                            <input type="text" class="form-control" value="{{initCompanyDetail.type}}" disabled=""  />
                        </div>
                        <div class="client-detailInfo  col-xs-12">
                            <label>企业名称</label>
                            <input type="text" class="form-control" value="{{initCompanyDetail.name}}" disabled=""  />
                        </div>
                        <div class="client-detailInfo  col-xs-12">
                            <label>经营范围</label>
                             <input type="text" class="form-control" value="{{initCompanyDetail.bizScope}}" disabled=""  />
                        </div>
                         <div class="client-detailInfo  col-xs-12 ">
                            <label>企业代表人</label>
                            <input type="text" class="form-control" value="{{initCompanyDetail.principal}}" disabled=""  />
                        </div>
                        <div class="client-detailInfo  col-xs-12 ">
                            <label>所在省</label>
                            <input type="text" class="form-control" value="{{initCompanyDetail.province}}" disabled=""  />
                        </div>
                        <div class="client-detailInfo  col-xs-12 ">
                            <label>所在市</label>
                            <input type="text" class="form-control" value="{{initCompanyDetail.city}}" disabled=""  />
                        </div>
                        <div class="client-detailInfo  col-xs-12 ">
                            <label>注册地址</label>
                            <input type="text" class="form-control" value="{{initCompanyDetail.address}}"  disabled=""  />
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import updatecompanyModel from '../serviceBaselist/breedDetailDialog/createContact'
import filter from '../../filters/filters'
import transferModel  from '../user/userTransfer'
import deletebreedModel  from './breedDetailDialog/deleteBreedDetail'
import {
    initCompanyDetail
} from '../../vuex/getters'
import {
    alterCompany,
    createContact,
    deleteCompanyContact,
} from '../../vuex/actions'
export default {
    components: {
        updatecompanyModel,
        filter,
        deletebreedModel,
        transferModel
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            contactParam:{
                show:false
            },
            companylistParam:{
                show:false
            },
            transferParam:{
                show:false,
                id:'',
                name:'',
                employeeId:'',
                employeeName:'',
                orgId:'',
                orgName:'',
                province:'',
                city:''
            },
          deleteParam:{
            show:false
          }
        }
    },
    props:['param'],
    vuex: {
        getters: {
            initCompanyDetail
        },
        actions: {
            alterCompany,
            createContact,
            deleteCompanyContact
        }
    },
    methods: {
        companytoggle: function(param) {
            if(this.$store.state.table.companyDetail[param.crete].arr.length==0){
                this.$store.state.table.companyDetail[param.crete].show=false
            }
            this.$store.state.table.companyDetail[param.crete].show = !this.$store.state.table.companyDetail[param.crete].show;
        },
        contactShow:function(id){
            if(this.$store.state.table.companyDetail.companyContacts.arr[id].show){
                this.$store.state.table.companyDetail.companyContacts.arr[id].show=!this.$store.state.table.companyDetail.companyContacts.arr[id].show
            }else{
                this.$store.state.table.companyDetail.companyContacts.arr[id].show=true;
            }
        },
        createCustomer:function(param){
            this.transferParam=param;
        },
        createCompany:function(initCompanyDetail){
            this.companylistParam = initCompanyDetail;
        },
        updateCompany:function(initCompanyDetail){
            this.companylistParam = initCompanyDetail;
        },
        contactDel:function(param){
              this.deleteParam.show=true;
              this.deleteParam.link= this.deleteCompanyContact;
              this.deleteParam.title=param.name;
              this.deleteParam.url=param.url;
              this.deleteParam.index=param.index;
              this.deleteParam.id=param.id;
        }
    },
    filter: (filter, {})
}
</script>
<style scoped>
table{
  margin:0;
}
.modal_con{
    width: 70%;
}
.top-title{
  width: 70%;
  left: 0;
  right: 0;
}
.table>tbody+tbody{
  border-top: 0;
}

.table>tbody tr td{
  padding: 15px 0;
}

.client-detailInfo img {
    width: 100px;
}
.panel-body ul li:last-of-type{
    float: right;
}
.panel-body ul > li:last-of-type {
    float: none;
    position: relative;
}
.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control{
    background-color: #fff;
}
.panel-collapse{
    background-color: #fff;
}
.panel-group .panel{
    border-radius: 10px;
}
.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
}
.breed_action{
  top: 20px;
  right: 40px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt{
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}

.contactSet>thead{
    color: #fa6705;
}
.contactSet>tbody>tr>td,.contactSet>thead>tr>th{
    text-align: left;
}
.contact_img{
    margin-right: 6px !important;
}
</style>

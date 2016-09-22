<template>
    <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
    <div class="breed_detail">
        <div class="client-section clearfix" v-cloak>
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
          <!--   <div class="col-md-8">
              <h4 class="section_title">业务机会相关</h4>
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
                         <button type="button" class="btn btn-base pull-right" @click.stop="createContact(param.id)">新建</button>
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
                                         <th></th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     <tr v-for="item in initCompanyDetail.companyContacts.arr">
                                         <td>{{item.name}}</td>
                                         <td>{{item.phone}}</td>
                                         <td>{{item.tel}}</td>
                                         <td>{{item.email}}</td>
                                         <td>{{item.wechart}}</td>
                                         <td @click="contactShow($index)">
                                             <img src="/static/images/default_arrow.png" height="24" width="24" />
                                             <div class="breed_action" v-show="item.show" transition="expand">
                                                <dl>
                                                    <dt @click="updateCompany({
                                                            sub:$index,
                                                            id:item.id,
                                                            show:true,
                                                            cid:item.cid,
                                                            title:'联系人',
                                                            namelist:'联系人名称',
                                                            phonelist:'手机号',
                                                            emaillist:'邮箱',
                                                            tellist:'电话',
                                                            weblist:'微信',
                                                            name:item.name,
                                                            phone:item.phone,
                                                            tel:item.tel,
                                                            email:item.email,
                                                            wechart:item.wechart,
                                                            link:alterCompany,
                                                            url:'contract',
                                                            key:'companyContacts'
                                                            },item.show=false)">编辑</dt>
                                                   <dt  @click="contactDel($index,item.id,item.show=false)">删除</dt>
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
                     <div class="panel-heading clearfix" @click="companytoggle({
                             link:initCompanyDetail.companyProducts,
                             crete:'companyProducts'
                             })">
                         <h4 class="panel-title clearfix">
                             <img class="pull-left" src="/static/images/product.png" height="27" width="27" />
                             <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                 产品({{initCompanyDetail.companyProducts.arr.length}})
                             </a>
                             <button type="button" class="btn btn-base pull-right" @click.stop="createContact(param.id)">新建</button>
                         </h4>
                     </div>
                     <div class="panel-collapse"  v-show="!initCompanyDetail.companyProducts.show">
                         <div class="panel-body panel-set">
                             <table class="table contactSet">
                                 <thead>
                                     <tr>
                                         <th>名称</th>
                                         <th>手机</th>
                                         <th>电话</th>
                                         <th>邮箱</th>
                                         <th>微信</th>
                                         <th></th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     <tr v-for="item in initCompanyDetail.companyProducts.arr">
                                         <td>{{item.name}}</td>
                                         <td>{{item.phone}}</td>
                                         <td>{{item.tel}}</td>
                                         <td>{{item.email}}</td>
                                         <td>{{item.wechart}}</td>
                                         <td @click="contactShow($index)">
                                             <img src="/static/images/default_arrow.png" height="24" width="24" />
                                             <div class="breed_action" v-show="item.show" transition="expand">
                                                <dl>
                                                    <dt @click="updateCompany({
                                                            sub:$index,
                                                            id:item.id,
                                                            show:true,
                                                            cid:item.cid,
                                                            title:'联系人',
                                                            namelist:'联系人名称',
                                                            phonelist:'手机号',
                                                            emaillist:'邮箱',
                                                            tellist:'电话',
                                                            weblist:'微信',
                                                            name:item.name,
                                                            phone:item.phone,
                                                            tel:item.tel,
                                                            email:item.email,
                                                            wechart:item.wechart,
                                                            link:alterCompany,
                                                            url:'contract',
                                                            key:'companyProducts'
                                                            },item.show=false)">编辑</dt>
                                                   <dt  @click="contactDel($index,item.id,item.show=false)">删除</dt>
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
                    <div class="panel-heading clearfix" @click="companytoggle({
                            link:initCompanyDetail.companyLicenses,
                            crete:'companyLicenses'
                            })">
                        <h4 class="panel-title clearfix">
                        <img class="pull-left" src="/static/images/contact.png" height="32" width="27" />
                        <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                            证书({{initCompanyDetail.companyLicenses.arr.length}})
                        </a>
                        <button type="button" class="btn btn-base pull-right" @click.stop="createContact(param.id)">新建</button>
                    </h4>
                    </div>
                    <div class="panel-collapse"  v-show="!initCompanyDetail.companyLicenses.show">
                        <div class="panel-body panel-set">
                            <table class="table contactSet">
                                <thead>
                                    <tr>
                                        <th>名称</th>
                                        <th>手机</th>
                                        <th>电话</th>
                                        <th>邮箱</th>
                                        <th>微信</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in initCompanyDetail.companyLicenses.arr">
                                        <td>{{item.name}}</td>
                                        <td>{{item.phone}}</td>
                                        <td>{{item.tel}}</td>
                                        <td>{{item.email}}</td>
                                        <td>{{item.wechart}}</td>
                                        <td @click="contactShow($index)">
                                            <img src="/static/images/default_arrow.png" height="24" width="24" />
                                            <div class="breed_action" v-show="item.show" transition="expand">
                                               <dl>
                                                   <dt @click="updateCompany({
                                                           sub:$index,
                                                           id:item.id,
                                                           show:true,
                                                           cid:item.cid,
                                                           title:'联系人',
                                                           namelist:'联系人名称',
                                                           phonelist:'手机号',
                                                           emaillist:'邮箱',
                                                           tellist:'电话',
                                                           weblist:'微信',
                                                           name:item.name,
                                                           phone:item.phone,
                                                           tel:item.tel,
                                                           email:item.email,
                                                           wechart:item.wechart,
                                                           link:alterCompany,
                                                           url:'contract',
                                                           key:'companyLicenses'
                                                           },item.show=false)">编辑</dt>
                                                  <dt  @click="contactDel($index,item.id,item.show=false)">删除</dt>
                                               </dl>
                                           </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                 </div>
             </div>  -->
            <!-- <div class="col-md-4" style="border-left:1px solid #ddd"> -->
                <div  class="section_title clearfix">
                    <span >详情</span>
                    <button class="new_btn transfer" @click="clientTransfer({
                      name:'意向',
                      id:param.id,
                      show:true
                      })">划转为意向</button> 
                </div>
                <div class="edit-detail">
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>类型:</label>
                            <input type="text" class="form-control" value="{{param.type | chanceType}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>是否特殊</label>
                            <input type="text" class="form-control" value="{{param.especial | chanceEspec}}" disabled="disabled" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>品种名称</label>
                            <input type="text" class="form-control" value="{{param.breedName}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>资质证书</label>
                            <input type="text" class="form-control" value="{{param.qualification | qualify}}" disabled="disabled" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>规格</label>
                            <input type="text" class="form-control" value="{{param.spec}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>交收地址</label>
                            <input type="text" class="form-control" value="{{param.address}}" disabled="disabled" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>预付比例</label>
                            <input type="text" class="form-control" value="{{param.advance}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>发票</label>
                            <input type="text" class="form-control" value="{{param.invoic | invoicstate}}" disabled="disabled" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>上门看货</label>
                            <input type="text" class="form-control" value="{{param.visit | visitstate}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>是否国际</label>
                            <input type="text" class="form-control" value="{{param.intl | intlstata}}" disabled="disabled" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>单位</label>
                            <input type="text" class="form-control" value="{{param.unit}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>包装</label>
                            <input type="text" class="form-control" value="{{param.pack}}" disabled="disabled" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>提供样品</label>
                            <input type="text" class="form-control" value="{{param.sampling}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>样品数量</label>
                            <input type="text" class="form-control" value="{{param.sampleNumber}}" disabled="disabled" />
                        </div>
                    </div>      
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>样品单位</label>
                            <input type="text" class="form-control" value="{{param.sampleUnit}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>样品总价</label>
                            <input type="text" class="form-control" value="{{param.sampleAmount}}" disabled="disabled" />
                        </div>
                    </div>    
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label>单价</label>
                            <input type="text" class="form-control" value="{{param.price}}" disabled="disabled"  />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label>状态</label>
                            <input type="text" class="form-control" value="{{param.status | status}}" disabled="disabled" />
                        </div>
                    </div>  
                </div>
            </div>
       <!--  </div> -->
    </div>
</template>
<script>
import filter from '../../filters/filters'
import transferintentModel from '../Intention/transferIntent'
export default {
    components: {
        filter,
        transferintentModel
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
                show:false,
                id:''
            },
            companylistParam:{
                show:false,
                id:''
            },
            intentionParam:{
                show:false,
                id:'',
                name:'意向'
            }
        }
    },
    props:['param'],
    vuex: {
       
    },
    methods: {
        clientTransfer:function(param){
            this.intentionParam = param;
            this.intentionParam.id=this.param.id;
            this.intentionParam = this.param;
            this.intentionParam.show=true;
        }
    },
    filter: (filter, {})
}
</script>
<style scoped>
.top-title{
    width: 100%;
    right: 0;
    top:130px;
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
.breed_action {
    top: 33px;
    right: 30px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt {
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}

.contactSet>thead{
    color: #fa6705;
}
.contactSet>tbody>tr>td,.contactSet>thead>tr>th{
    border-bottom: none;
    border-top: none;
    text-align: left;
}
.contact_img{
    margin-right: 6px !important;
}
</style>

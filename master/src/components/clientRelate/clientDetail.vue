<template>
    <div>
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
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
        <createorder-model :param="orderParam" v-if="orderParam.show"></createorder-model>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click.stop="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div class="client_nav">
                <nav class="navbar navbar-client" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                            <span class="navbar-brand navbar-name" href="#">{{param.name}}</span>
                        </div>
                        <ul class="nav navbar-nav navbar-right" style="margin-top:8px;">
                            <li>
                                <button type="button" class="btn btn-base" @click.stop="specDelete({
                                id:param.id,
                                sub:param.sub,
                                show:true,
                                name:param.name,
                                title:param.name,
                                link:deleteInfo,
                                url:'/customer/',
                                key:'customerList'
                                })">{{$t('static.del_client_info')}}</button>
                            </li>
                            <li v-if="initClientDetail.supplier!=1">
                                <button type="button" class="btn btn-base" @click.stop="clientTransferSupplier({
                                   id:param.id,
                                   sub:param.sub,
                                   show:true,
                                   link:'/customer/setSupplier',
                                   title:'客户提取为供应商备注'
                                   })">{{$t('static.make_them_become_supplier')}}</button>
                            </li>
                            <li v-if="initClientDetail.blacklist==0">
                                <button type="button" class="btn btn-base" @click.stop="clientTransferBlack()">{{$t('static.drag_into_blacklist')}}</button>
                            </li>
                            <li v-if="initClientDetail.blacklist==1">
                                <button type="button" class="btn btn-base" @click.stop="clientTransferBlack()">{{$t('static.out_of_blacklist')}}</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <section>
                <div class="client-section clearfix">
                    <div class="col-md-12">
                        <h4 class="section_title">{{$t('static.detailed_information')}}</h4>
                        <article>
                            <div class="panel-group" @click.stop="">
                                <div class="panel panel-default" style="border:none">
                                    <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                        <mg-label :title="$t('static.name')">{{initClientDetail.name}}</mg-label>
                                        <mg-label :title="$t('static.type')">{{initClientDetail.type |customerType}}</mg-label>
                                        <mg-label :title="$t('static.whether_supplier')" v-if="initClientDetail.supplier==0">{{$t('static.no')}}</mg-label>
                                        <mg-label :title="$t('static.whether_supplier')" v-if="initClientDetail.supplier==1">{{$t('static.yes')}}</mg-label>
                                        <mg-label :title="$t('static.classification')">{{initClientDetail.classify | classify}}</mg-label>
                                        <mg-label :title="$t('static.cellphone')">{{initClientDetail.mainPhone}}<span v-if="initClientDetail.phoneProvince!=''||initClientDetail.phoneCity!=''">（{{initClientDetail.phoneProvince}}{{initClientDetail.phoneCity}}）</span></mg-label>
                                        <mg-label :title="$t('static.telephone')">{{initClientDetail.tel}}</mg-label>
                                        <mg-label :title="$t('static.client_email')">{{initClientDetail.email}}</mg-label>
                                        <mg-label :title="$t('static.postcodes')">{{initClientDetail.number}}</mg-label>
                                        <mg-label :title="$t('static.principals')">{{initClientDetail.principal}}</mg-label>
                                        <mg-label :title="$t('static.legal')">{{initClientDetail.legalPerson}}</mg-label>
                                        <mg-label :title="$t('static.website')">{{initClientDetail.website}}</mg-label>
                                        <mg-label :title="$t('static.country')">{{initClientDetail.countryName}}</mg-label>
                                        <mg-label :title="$t('static.province')+$t('static.city')">{{initClientDetail.provinceName}} {{initClientDetail.cityName}}</mg-label>
                                        <mg-label :title="$t('static.detailed_address')">{{initClientDetail.address}}</mg-label>
                                        <mg-label :title="$t('static.transaction_num')">{{initClientDetail.orderTotal}}{{initClientDetail.lastOrderTime}}</mg-label>
                                        <mg-label :title="$t('static.client_source')">{{initClientDetail.source | intentionSource}}</mg-label>
                                        <mg-label :title="$t('static.department')+'/'+$t('static.salesman')">{{initClientDetail.orgName}}<span v-if="initClientDetail.employeeName">（{{initClientDetail.employeeName}}）</span></mg-label>
                                        <mg-label :title="$t('static.create_time')">{{initClientDetail.ctime}}</mg-label>
                                        <mg-label :title="$t('static.blacklist')" v-if="initClientDetail.blacklist==1">{{initClientDetail.name}}</mg-label>
                                        <div class="col-md-12 col-sm-12 col-xs-12">
                                            <label>{{$t('static.business_scope')}}：</label>{{initClientDetail.bizScope}}</div>
                                        <div class="col-md-12 col-sm-12 col-xs-12">
                                            <label>{{$t('static.comment')}}：</label>{{initClientDetail.comments}}</div>
                                    </ul>
                                    <div style="font-size:14px;">
                                        <label>{{$t('static.label')}}</label>：
                                        <Tag color="blue" v-for="item in initClientDetail.labels.arr" closable @on-close="deleteLabel(item,$index)">{{item.label}}</Tag>
                                        <i-button icon="ios-plus-empty" type="dashed" size="small" @click="newlabel({
                                             customerId:param.id,
                                             id:param.id,
                                             show:true,
                                             title:'标签',
                                             labelist:'标签',
                                             statuslist:'类型',
                                             label:'',
                                             status:'',
                                             link:createLabel,
                                             url:'/customer/insertLabel',
                                             key:'labels'
                                             })">添加标签</i-button>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                                link:initClientDetail.contacts,
                                                crete:'contacts'
                                                })">
                                          <img class="pull-left" src="/static/images/contact.png" height="32" width="27"/>
                                          <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                            {{$t('static.contact')}}（{{initClientDetail.contacts.arr.length}}）
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
                                                   main:0,
                                                   namelist:'联系人姓名',
                                                   job:'联系人职位',
                                                   parten:'联系人部门',
                                                   phonelist:'手机',
                                                   tellist:'电话',
                                                   emaillist:'邮箱',
                                                   QQ:'qq',
                                                   webchart:'微信',
                                                   link:createCustomer,
                                                   list:initClientDetail.contacts.arr,
                                                   url:'/customer/contact',
                                                   key:'contacts'
                                                   })">{{$t('static.new')}}</button>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initClientDetail.contacts.show&&initClientDetail.contacts.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>{{$t('static.name')}}</th>
                                                    <th>{{$t('static.position')}}</th>
                                                    <th>{{$t('static.department')}}</th>
                                                    <th>{{$t('static.cellphone')}}</th>
                                                    <th>{{$t('static.telephone')}}</th>
                                                    <th>{{$t('static.client_email')}}</th>
                                                    <th>qq</th>
                                                    <th>{{$t('static.wechat')}}</th>
                                                    <th colspan="2">{{$t('static.operation')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initClientDetail.contacts.arr">
                                                        <td>{{item.name}}</td>
                                                        <td>{{item.position}}</td>
                                                        <td>{{item.department}}</td>
                                                        <td>{{item.phone}}</td>
                                                        <td>{{item.tel}}</td>
                                                        <td>{{item.email}}</td>
                                                        <td>{{item.qq}}</td>
                                                        <td>{{item.wechart}}</td>
                                                        <td @click.stop="updateSpec({
                                                             sub:$index,
                                                             id:item.id,
                                                             show:true,
                                                             title:'联系人',
                                                             namelist:'联系人姓名',
                                                             job:'联系人职位',
                                                             parten:'联系人部门',
                                                             phonelist:'手机',
                                                             tellist:'电话',
                                                             emaillist:'邮箱',
                                                             QQ:'qq',
                                                             webchart:'微信',
                                                             name:item.name,
                                                             position:item.position,
                                                             department:item.department,
                                                             phone:item.phone,
                                                             tel:item.tel,
                                                             email:item.email,
                                                             qq:item.qq,
                                                             wechart:item.wechart,
                                                             main:item.main,
                                                             link:updateContact,
                                                             list:initClientDetail.contacts.arr,
                                                             url:'/customer/contact',
                                                             key:'contacts',
                                                             headline:'clientDetail'
                                                             })">
                                                            <a class="operate"><img src="/static/images/edit.png" height="18" width="30" alt="编辑" title="编辑" />
                                                            </a>
                                                        </td>
                                                        <!-- 删除联系人 -->
                                                        <td @click.stop="specDelete({
                                                                 id:item.id,
                                                                 sub:$index,
                                                                 show:true,
                                                                 name:item.name,
                                                                 title:'联系人',
                                                                 link:specDel,
                                                                 url:'/customer/contact/',
                                                                 key:'contacts',
                                                                 headline:'clientDetail'
                                                                 },item.show=false)">
                                                            <a class="operate"><img src="/static/images/del.png" height="18" width="30" alt="删除" title="删除" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                      link:initClientDetail.files,
                                      crete:'files'
                                      })">
                                <img class="pull-left" src="/static/images/file.png" height="29" width="26"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                  {{$t('static.file')}}（{{initClientDetail.files.arr.length}}）
                                </a>
                                <button type="button" class="btn btn-base pull-right" @click.stop="createfiles({
                                     bizId:param.id,
                                     show:true,
                                     title:'新建文件',
                                     fileType:'',
                                     bizType:'customer_license',
                                     description:'',
                                     path:'',
                                     name:'',
                                     link:uploadFiles,
                                     url:'/customer/file/',
                                     key:'files',
                                     image_f_show:'',
                                     image_f:''
                                    })">{{$t('static.new')}}</button>
                          </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initClientDetail.files.show&&initClientDetail.files.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>{{$t('static.filename')}}</th>
                                                    <th>{{$t('static.file_type')}}</th>
                                                    <!-- <th>所属文件</th> -->
                                                    <th>{{$t('static.preview')}}</th>
                                                    <th>{{$t('static.description')}}</th>
                                                    <th colspan="2">{{$t('static.operation')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initClientDetail.files.arr">
                                                        <!-- <td><img v-bind:src="item.path" /></td> -->
                                                        <!--<td><img v-bind:src="item.url" v-if="item.fileType=='jpg'||item.fileType=='bmp'||item.fileType=='jpg'||item.fileType=='jpeg'" style='float:left; margin-left:15px;' />-->
                                                        <!--<img  src="/static/images/pdf.png" v-if="item.fileType=='pdf'" style='float:left; margin-left:15px;'>-->
                                                        <!--<img  src="/static/images/word.png" v-if="item.fileType=='doc'||item.fileType=='docx'" style='float:left; margin-left:15px;'>-->
                                                        <!--<img  src="/static/images/excel.png" v-if="item.fileType=='xls'||item.fileType=='xlsx'" style='float:left; margin-left:15px;'>-->
                                                        <!--</td>-->
                                                        <td>{{item.name}}</td>
                                                        <td>
                                                            {{item.fileType}}
                                                        </td>
                                                        <!-- <td v-if="item.bizType=='customer_license'">客户文件</td> -->
                                                        <!-- <td v-if="item.bizType=='product_license'">产品文件</td> -->
                                                        <td>
                                                            <img v-if="item.fileType=='image'||item.fileType=='other'" width="100" :src="item.url" @click.stop="clickBig(item.url)" />
                                                            <img src="/static/images/pdf.png" v-if="item.fileType=='pdf文件'">
                                                            <img src="/static/images/word.png" v-if="item.fileType=='word'">
                                                            <img src="/static/images/excel.png" v-if="item.fileType=='excel'">
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                        <td>
                                                            <a class="operate" @click.stop="specDelete({
                                                   id:item.id,
                                                   sub:$index,
                                                   show:true,
                                                   title:'文件',
                                                   link:specDel,
                                                   url:'/customer/file/',
                                                   key:'files',
                                                   headline:'clientDetail'
                                                   },item.show=false)"><img src="/static/images/del.png" alt="删除" title="删除" />
                                                            </a>
                                                            <a class="operate" href="{{item.url}}" download=""><img src="/static/images/upload.png" height="18" width="28" /></a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default" v-if="param.inquiry!='询价'">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                        link:initClientDetail.intentions,
                                        crete:'intentions'
                                        })">
                                            <img class="pull-left" src="/static/images/intent.png" height="29" width="26"  />
                                            <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                                {{$t('static.intention')}}（{{initClientDetail.intentions.arr.length}}）
                                            </a>
                                            <button type="button" class="btn btn-base pull-right" @click.stop="createIntention()">{{$t('static.new')}}</button>
                                        </h4>
                                    </div>
                                    <!-- 意向 -->
                                    <div class="panel-collapse" v-show="!initClientDetail.intentions.show&&initClientDetail.intentions.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>{{$t('static.breed')}}</th>
                                                    <th>{{$t('static.origin')}}</th>
                                                    <th>{{$t('static.specification')}}</th>
                                                    <th>{{$t('static.quantity')}}</th>
                                                    <th>{{$t('static.price')}}</th>
                                                    <th>{{$t('static.unit')}}</th>
                                                    <th>{{$t('static.operation')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initClientDetail.intentions.arr">
                                                        <td>{{item.breedName}}</td>
                                                        <td>{{item.location}}</td>
                                                        <td>{{item.spec}}</td>
                                                        <td>{{item.number}}</td>
                                                        <td>{{item.price}}元</td>
                                                        <td>{{item.unit | unit}}</td>
                                                        <td @click.stop="updateIntention({
                                                      flag:1,
                                                      show:true,
                                                      sub:$index,
                                                      key:'client',
                                                      id:item.id,
                                                      breedName:item.breedName,
                                                      price:item.price,
                                                      unit:item.unit,
                                                      especial:item.especial,
                                                      quality:item.quality,
                                                      spec:item.spec,
                                                      number:item.number,
                                                      location:item.location,
                                                      type:item.type,
                                                      preSell:item.preSell,
                                                      country:item.country,
                                                      province:item.province,
                                                      city:item.city,
                                                      district:item.district,
                                                      address:item.address,
                                                      invoic:item.invoic,
                                                      sampling:item.sampling,
                                                      sampleUnit:item.sampleUnit,
                                                      advance:item.advance,
                                                      intl:item.intl,
                                                      sampleNumber:item.sampleNumber,
                                                      sampleAmount:item.sampleAmount,
                                                      qualification:item.qualification,
                                                      breedId:item.breedId,
                                                      pack:item.pack,
                                                      visit:item.visit,
                                                      duedate:item.duedate,
                                                      breedId:item.breedId,
                                                      description:item.description,
                                                      validate:item.validate,
                                                      inType:3,
                                                      loading:false,
                                                      pics:item.pics,
                                                      images:''
                                                  })">
                                                            <a class="operate"><img src="/static/images/edit.png" height="18" width="30" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default" v-if="param.inquiry!='询价'">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                        link:initClientDetail.orders,
                                        crete:'orders'
                                        })">
                                  <img class="pull-left" src="/static/images/order.png" height="29" width="26"  />
                                  <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                    {{$t('static.order')}}（{{initClientDetail.orders.arr.length}}）
                                  </a>
                                  <button type="button" class="btn btn-base pull-right" @click.stop="newOrder({
                                      show:true,
                                      title1:'新建订单',
                                      type:1,
                                      customer:initClientDetail.id,
                                      sample:0,
                                      intl:0,
                                      incidentals:'',
                                      incidentalsDesc:'',
                                      preferential:'',
                                      preferentialDesc:'',
                                      currency:'人民币',
                                      consigner:'',
                                      consignerName:'',
                                      consignee:'',
                                      consigneeName:'',
                                      consigneePhone:'',
                                      zipCode:'',
                                      country:'',
                                      province:'',
                                      customerName:initClientDetail.name,
                                      employee:initClientDetail.employeeId,
                                      org:initClientDetail.orgId,
                                      city:'',
                                      district:'',
                                      cost:0,
                                      total:0,
                                      consigneeAddr:'',
                                      comments:'',
                                      sourceType:0,
                                      goods:[],
                                      key:'orders',
                                      link:createOrder
                                    })">{{$t('static.new')}}</button>
                            </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initClientDetail.orders.show&&initClientDetail.orders.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>{{$t('static.order_no')}}</th>
                                                    <th>{{$t('static.order_source')}}</th>
                                                    <th>{{$t('static.consignee_name')}}</th>
                                                    <th>{{$t('static.consignee_phone')}}</th>
                                                    <th>{{$t('static.consignee_address')}}</th>
                                                    <th>{{$t('static.order_status')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initClientDetail.orders.arr">
                                                        <!-- <td><img :src="item.path" /></td> -->
                                                        <td>{{item.no}}</td>
                                                        <td v-if="item.sourceType==0">新建</td>
                                                        <td v-if="item.sourceType==1">意向</td>
                                                        <td v-if="item.sourceType==2">报价</td>
                                                        <td>{{item.consignee}}</td>
                                                        <td>{{item.consigneePhone}}</td>
                                                        <td>{{item.consigneeAddr}}</td>
                                                        <td>{{item.orderStatus | orderstatus}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                          link:initClientDetail.trackings,
                                          crete:'trackings'
                                          })">
                                          <img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
                                          <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                            {{$t('static.tracking')}}（{{initClientDetail.trackings.arr.length}}）
                                          </a>
                                  <button type="button" class="btn btn-base pull-right" @click.stop="createTracking({
                                      objId:initClientDetail.id,
                                      bizId:'',
                                      bizName:'',
                                      type:1,
                                      trackingWay:'',
                                      bizType:'',
                                      contactNo:'',
                                      comments:'',
                                      show:true,
                                      customer:true,
                                      flag:0
                                    })">{{$t('static.new')}}</button>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initClientDetail.trackings.show">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>{{$t('static.business_type')}}</th>
                                                    <th>{{$t('static.tracking_mode')}}</th>
                                                    <th>{{$t('static.contact_number')}}</th>
                                                    <th>{{$t('static.comment')}}</th>
                                                    <th>{{$t('static.create_time')}}</th>
                                                    <th style="text-align:center">{{$t('static.operation')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initClientDetail.trackings.arr">
                                                        <td v-if="!item.bizType">客户</td>
                                                        <td v-if="item.bizType==1">意向</td>
                                                        <td v-if="item.bizType==2">订单</td>
                                                        <td>{{item.trackingWay}}</td>
                                                        <td>{{item.contactNo}}</td>
                                                        <td>{{item.comments}}</td>
                                                        <td>{{item.ctime}}</td>
                                                        <td @click.stop="updateTracking(item,$index)">
                                                            <a class="operate"><img src="/static/images/edit.png" height="18" width="30" />
                                                            </a>
                                                        </td>
                                                        <!--  <td  @click="clickShow($index,{
                                           concrete:'trackings'
                                           })">
                                            <img src="/static/images/default_arrow.png" height="24" width="24" />
                                            <div class="breed_action" v-show="item.show" >
                                               <dl>
                                                 <dt @click="updateTracking(item,$index)">编辑</dt>
                                               </dl>
                                            </div>
                                          </td> -->
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!--<p class="contact-view">查看全部</p>-->
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                        link:initClientDetail.remarks,
                                        crete:'remarks'
                                        })">
                                  <img class="pull-left" src="/static/images/remark.png" height="30" width="27"  />
                                  <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                    {{$t('static.comment')}}（{{initClientDetail.remarks.arr.length}}）
                                  </a>
                                  <button type="button" class="btn btn-base pull-right" @click.stop="newlabel({
                                         customerId:param.id,
                                         id:param.id,
                                         show:true,
                                         title:'备注',
                                         labelist:'备注',
                                         statuslist:'状态',
                                         remark:'',
                                         status:'',
                                         link:createRemark,
                                         url:'/customer/remark',
                                         key:'remarks'
                                         })">{{$t('static.new')}}</button>
                                </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initClientDetail.remarks.show&&initClientDetail.remarks.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>{{$t('static.comment')}}</th>
                                                    <th>{{$t('static.status')}}</th>
                                                    <th colspan="2">{{$t('static.operation')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initClientDetail.remarks.arr">
                                                        <td>{{item.remark}}</td>
                                                        <td>{{item.status}}</td>
                                                        <td>
                                                            <a class="operate" @click.stop="updatelabel({
                                                       sub:$index,
                                                       id:item.id,
                                                       customerId:item.customerId,
                                                       show:true,
                                                       title:'备注',
                                                       labelist:'备注',
                                                       statuslist:'状态',
                                                       remark:item.remark,
                                                       status:item.status,
                                                       link:alterRemark,
                                                       url:'/customer/remark',
                                                       key:'remarks',
                                                       headline:'clientDetail'
                                                       })"><img src="/static/images/edit.png" height="18" width="30" />
                                                            </a>
                                                            <!--      </td>
                                       <td  > -->
                                                            <a class="operate" @click.stop="specDelete({
                                                       id:item.id,
                                                       sub:$index,
                                                       show:true,
                                                       title:'备注',
                                                       link:specDel,
                                                       url:'/customer/remark/',
                                                       key:'remarks',
                                                       headline:'clientDetail'
                                                       },item.show=false)"><img src="/static/images/del.png" height="18" width="30" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                link:initClientDetail.addresses,
                                crete:'addresses'
                                })">
                                <img class="pull-left" src="/static/images/addr.png" height="30" width="26"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                  {{$t('static.address')}}（{{initClientDetail.addresses.arr.length}}）
                                </a>
                                <button type="button" class="btn btn-base pull-right" @click.stop="createAddr({
                                       customerId:param.id,
                                       id:param.id,
                                       show:true,
                                       title:'地址',
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
                                       })">{{$t('static.new')}}</button>
                             </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initClientDetail.addresses.show&&initClientDetail.addresses.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>{{$t('static.type')}}</th>
                                                    <th>{{$t('static.name')}}</th>
                                                    <th>{{$t('static.cellphone')}}</th>
                                                    <th>{{$t('static.sex')}}</th>
                                                    <th>{{$t('static.country')}}</th>
                                                    <th>{{$t('static.province')}}</th>
                                                    <th>{{$t('static.city')}}</th>
                                                    <th>{{$t('static.area')}}</th>
                                                    <th>{{$t('static.street')}}</th>
                                                    <th>{{$t('static.address')}}</th>
                                                    <th>{{$t('static.detailed_address')}}</th>
                                                    <th colspan="2">{{$t('static.operation')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initClientDetail.addresses.arr">
                                                        <td v-if="item.type==0">普通</td>
                                                        <td v-if="item.type==1">默认</td>
                                                        <td>{{item.contactName}}</td>
                                                        <td>{{item.contactPhone}}</td>
                                                        <td v-if="item.sex==1">男</td>
                                                        <td v-if="item.sex==0">女</td>
                                                        <td v-if="item.sex==null">未说明</td>
                                                        <td>{{item.country}}</td>
                                                        <td>{{item.province}}</td>
                                                        <td>{{item.city}}</td>
                                                        <td>{{item.district}}</td>
                                                        <td>{{item.street}}</td>
                                                        <td>{{item.detailAddr}}</td>
                                                        <td>{{item.address}}</td>
                                                        <td @click.stop="updateAddr({
                                                   sub:$index,
                                                   id:item.id,
                                                   customerId:item.customerId,
                                                   show:true,
                                                   title:'地址',
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
                                                   })">
                                                            <a class="operate"><img src="/static/images/edit.png" height="18" width="30" />
                                                            </a>
                                                        </td>
                                                        <td @click.stop="specDelete({
                                                   id:item.id,
                                                   sub:$index,
                                                   show:true,
                                                   title:'地址',
                                                   link:addrDel,
                                                   url:'/customer/deleteAddress/',
                                                   key:'addresses',
                                                   headline:'clientDetail'
                                                   },item.show=false)">
                                                            <a class="operate"><img src="/static/images/del.png" height="18" width="30" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default" v-cloak>
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                    link:initClientDetail.products,
                                    crete:'products'
                                    })">
                              <img class="pull-left" src="/static/images/product.png" height="27" width="27"  />
                              <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                {{$t('static.product')}}（{{initClientDetail.products.arr.length}}）
                              </a>
                              <button type="button" class="btn btn-base pull-right" @click.stop="newproduct({
                                     cid:param.id,
                                     id:param.id,
                                     show:true,
                                     title:'新建产品',
                                     type:'',
                                     name:'',
                                     breedId:'',
                                     breedName:'',
                                     quality:'',
                                     location:'',
                                     spec:'',
                                     number:'',
                                     price:'',
                                     unit:'',
                                     duedate:'',
                                     coa:'',
                                     link:createProduct,
                                     url:'/customer/product',
                                     key:'products'
                                     })">{{$t('static.new')}}</button>
                            </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initClientDetail.products.show&&initClientDetail.products.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>{{$t('static.type')}}</th>
                                                    <th>{{$t('static.name')}}</th>
                                                    <th>{{$t('static.breed')}}</th>
                                                    <th>{{$t('static.quality')}}</th>
                                                    <th>{{$t('static.origin')}}</th>
                                                    <th>{{$t('static.specification')}}</th>
                                                    <th>{{$t('static.quantity')}}</th>
                                                    <th>{{$t('static.price')}}</th>
                                                    <th>{{$t('static.unit')}}</th>
                                                    <th>{{$t('static.deadline')}}</th>
                                                    <th>{{$t('static.test_report')}}</th>
                                                    <th colspan="2">{{$t('static.operation')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initClientDetail.products.arr">
                                                        <td>{{item.type}}</td>
                                                        <td>{{item.name}}</td>
                                                        <td>{{item.breedName}}</td>
                                                        <td>{{item.quality}}</td>
                                                        <td>{{item.location}}</td>
                                                        <td>{{item.spec}}</td>
                                                        <td>{{item.number}}</td>
                                                        <td>{{item.price}}</td>
                                                        <td>{{item.unit}}</td>
                                                        <td>{{item.duedate}}</td>
                                                        <td v-if="item.coa==0">无</td>
                                                        <td v-if="item.coa==1">有</td>
                                                        <td @click.stop="newproduct({
                                                   sub:$index,
                                                   id:item.id,
                                                   cid:item.cid,
                                                   show:true,
                                                   title:'编辑产品',
                                                   type:item.type,
                                                   name:item.name,
                                                   breedId:item.breedId,
                                                   breedName:item.breedName,
                                                   quality:item.quality,
                                                   location:item.location,
                                                   spec:item.spec,
                                                   number:item.number,
                                                   price:item.price,
                                                   unit:item.unit,
                                                   duedate:item.duedate,
                                                   coa:item.coa,
                                                   link:alterProduct,
                                                   url:'/customer/product',
                                                   key:'products',
                                                   headline:'clientDetail'
                                                   })">
                                                            <a class="operate"><img src="/static/images/edit.png" height="18" width="30" />
                                                            </a>
                                                        </td>
                                                        <td @click.stop="createfiles({
                                                     bizId:item.id,
                                                     show:true,
                                                     title:'新建产品文件',
                                                     fileType:'',
                                                     bizType:'product_license',
                                                     description:'',
                                                     path:'',
                                                     link:uploadFiles,
                                                     url:'/customer/file/',
                                                     key:'files'
                                                   })">
                                                            <a class="operate"><img src="/static/images/uploadPro.png" height="18" width="67" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- <p class="contact-view">查看全部</p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import pressImage from '../../components/imagePress'
import filter from '../../filters/filters.js'
import tipsdialogModel from '../tips/tipDialog'
import createcustModel from '../clientRelate/createClientDetail'
import createaddrModel from '../clientRelate/createAddrInfo'
import createlabelModel from '../clientRelate/label/createLabel'
import updatelabelModel from '../clientRelate/label/updatelebel'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import updatecontactModel from '../clientRelate/updateContactInfo'
import updateaddrModel from '../clientRelate/updataAddrInfo'
import createfilesModel from '../clientRelate/createFiles'
import createtrackModel from '../user/userTracking'
import createproductModel from '../clientRelate/label/createProduct'
import intentionModel from '../user/userIntention'
import auditDialog from '../tips/auditDialog'
import createorderModel from '../order/createOrderDialog'
import pictureModel from '../tips/pictureDialog'
import mgLabel from '../../components/mguan/mgLabel'
import {
    initClientDetail
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
    createProduct,
    alterProduct,
    uploadFiles,
    deleteInfo,
    customerTransferBlacklist,
    createOrder
} from '../../vuex/actions'
export default {
    components: {
        pressImage,
        filter,
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
        intentionModel,
        tipsdialogModel,
        auditDialog,
        createorderModel,
        pictureModel,
        mgLabel
    },
    props: ['param'],
    data() {
        return {
            custParam: {
                show: false,
                id: ''
            },
            deleteParam: {
                show: false
            },
            updateParam: {
                show: false
            },
            addrParam: {
                show: false
            },
            addressParam: {
                show: false
            },
            labelParam: {
                show: false
            },
            updlabelParam: {
                show: false
            },
            cfilesParam: {
                show: false
            },
            intentionParam: {
                show: false
            },
            ctrackParam: {
                show: false,
                objId: '',
                bizId: '',
                bizName: '',
                type: 0,
                trackingWay: '',
                bizType: '',
                contactNo: '',
                comments: '',
                customer: true,
                flag: 0
            },
            labelDelParam: {
                id: '',
                sub: '',
                title: '标签',
                url: '/customer/deleteLable/',
                key: 'labels',
                headline: 'clientDetail'
            },
            cproductParam: {
                show: false
            },
            pictureParam: {
                show: false,
                img: ''
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            auditParam: {
                show: false
            },
            show: true,
            orderParam: {
                show: false
            }
        }
    },
    vuex: {
        getters: {
            initClientDetail
        },
        actions: {
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
            createProduct,
            alterProduct,
            uploadFiles,
            deleteInfo,
            customerTransferBlacklist,
            createOrder
        }
    },
    methods: {
        enfoldment: function(param) {
            if (this.$store.state.table.clientDetail[param.crete].arr.length == 0) {
                this.$store.state.table.clientDetail[param.crete].show = false
            }
            this.$store.state.table.clientDetail[param.crete].show = !this.$store.state.table.clientDetail[param.crete].show;
        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        clickShow: function(id, param) {
            this.$store.state.table.clientDetail[param.concrete].arr[id].show = !this.$store.state.table.clientDetail[param.concrete].arr[id].show;

        },
        createFormt: function(initBreedDetail) {
            this.custParam = initBreedDetail;
        },
        createAddr: function(initBreedDetail) {
            this.addressParam = initBreedDetail;
        },
        newlabel: function(initBreedDetail) {
            this.labelParam = initBreedDetail;
            this.labelParam.callback = this.labelCallback;
        },
        specDelete: function(initBreedDetail) {
            console.log(initBreedDetail)
            var _self = this;
            if (initBreedDetail.key == 'customerList') {
                initBreedDetail.callback = function() {
                    _self.param.show = false;
                }
            } else {
                initBreedDetail.callback = function() {

                }
            }
            this.deleteParam = initBreedDetail;
        },
        deleteLabel: function(item, sub) {
            this.labelDelParam.id = item.id;
            this.labelDelParam.sub = sub;
            console.log(this.labelDelParam)
            this.addrDel(this.labelDelParam)
        },
        clientTransferSupplier: function(initBreedDetail) {
            this.auditParam = initBreedDetail;
            this.auditParam.confirm = true;
            this.auditParam.arr = [];
            if (initBreedDetail.id) {
                this.auditParam.arr.push(initBreedDetail.id);
            }
            this.auditParam.callback = this.callback;
        },
        updateSpec: function(initBreedDetail) {
            this.updateParam = initBreedDetail;
        },
        updateAddr: function(initBreedDetail) {
            this.addrParam = initBreedDetail;
        },
        updatelabel: function(initBreedDetail) {
            this.updlabelParam = initBreedDetail;
        },
        createfiles: function(initBreedDetail) {
            this.cfilesParam = initBreedDetail;
            //         this.$broadcast('getImageData');
        },
        createTracking: function(param) {
            this.ctrackParam.objId = param.objId;
            this.ctrackParam.bizId = param.bizId;
            this.ctrackParam.bizName = param.bizName;
            this.ctrackParam.type = param.type;
            this.ctrackParam.trackingWay = param.trackingWay;
            this.ctrackParam.bizType = param.bizType;
            this.ctrackParam.contactNo = param.contactNo;
            this.ctrackParam.comments = param.comments;
            this.ctrackParam.show = param.show;
            this.ctrackParam.customer = param.customer;
            this.ctrackParam.flag = param.flag;

        },
        updateTracking: function(item, index) {
            item.show = !item.show;
            item.index = index;
            this.ctrackParam = item;
            this.ctrackParam.flag = 1; //1表示修改
            this.ctrackParam.show = true;

        },
        newproduct: function(initBreedDetail) {
            this.cproductParam = initBreedDetail;
        },
        createIntention: function() {
            this.intentionParam = {
                show: false,
                flag: 0, //0表示创建，1表示修改
                sub: '',
                customerId: this.initClientDetail.id,
                //fullname:this.initUserDetail.fullname,
                customerName: this.initClientDetail.name,
                //phone:this.initUserDetail.phone,
                customerPhone: this.initClientDetail.mainPhone,
                id: '',
                breedId: '',
                breedName: '',
                price: '',
                unit: '',
                especial: 1,
                quality: '',
                spec: '',
                number: '',
                location: '',
                type: 0,
                preSell: 0,
                visit: 0,
                validate: 0,
                country: '中国',
                province: '',
                city: '',
                district: '',
                address: '',
                invoic: 0,
                sampling: 0,
                sampleUnit: '',
                advance: 0,
                intl: 0,
                sampleNumber: 0,
                sampleAmount: 0,
                pack: '',
                qualification: 'GMP',
                url: '/intention/',
                key: 'client',
                pics: '',
                images: '',
                inType: 3,
                audit: 0
            };
            this.intentionParam.show = true;

        },

        updateIntention: function(param) {
            this.intentionParam = param;
        },
        callback: function() {
            this.auditParam.blackComments = this.auditParam.auditComment;
            this.auditParam.customerIds = this.auditParam.arr;
            this.auditParam.auditComment = '';
            this.customerTransferBlacklist(this.auditParam);
        },
        clientTransferBlack: function() {
            this.auditParam.link = '/customer/transferBlacklist';
            this.auditParam.arr = [];
            this.auditParam.arr.push(this.initClientDetail.id);

            if (this.initClientDetail.blacklist == 0) {
                this.auditParam.blacklist = 1;
                this.auditParam.title = '加入黑名单备注';
            } else {
                this.auditParam.blacklist = 0;
                this.auditParam.title = '踢出黑名单备注';
            }
            this.auditParam.confirm = true;
            this.auditParam.callback = this.callback;
            this.auditParam.show = true;
        },
        newOrder: function(order) {
            this.orderParam = order;
        },
        labelCallback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        }
    },
    filter: (filter, {}),
    created() {
        this.getClientDetail(this.param);
    }
}
</script>
<style scoped>
.top-title {
    position: fixed;
    z-index: 1088;
    width: 60%;
    right: 0;
    left: 0;
}

.modal {
    z-index: 1082;
}

.modal_con {
    z-index: 1082;
    width: 60%;
}

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

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
}

section {
    background-color: #fff;
}

section article {
    margin-top: 10px;
}

.client-section {
    padding: 10px 5px 40px 5px;
}

.contactSet thead {
    color: #fa6705;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    text-align: center;
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

.table {
    display: table;
}

.client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
}
</style>

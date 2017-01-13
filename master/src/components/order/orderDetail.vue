<template>
    <tracking-model :param="trackingParam" v-if="trackingParam.show"></tracking-model>
    <credence-model :param="credenceParam" v-if="credenceParam.show"></credence-model>
    <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
    <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
    <divided-model :param="divideParam" v-if="divideParam.show"></divided-model>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <apply-model :param="applyDetails" v-if="applyDetails.show"></apply-model>

    <shadow-model :param="param">
        <div class="cover_loading">
             <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="client_nav">
          <nav class="navbar navbar-client" role="navigation">
              <div class="container-fluid">
                  <div class="navbar-header">
                      <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                      <span class="navbar-brand navbar-name">{{initOrderDetail.customerName}}</span>
                  </div>
              </div>
          </nav>
        </div>
        <section>
          <div class="client-section clearfix" >
              <div class="col-md-12">
                  <h4 class="section_title">{{$t('static.details')}}</h4>
                  <article @click.stop="">
                      <div class="panel-group">
                          <div class="panel panel-default" style="border:none">
                              <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                  <mg-label :title="$t('static.order_no')">{{initOrderDetail.no}}</mg-label>
                                  <mg-label :title="$t('static.order_type')" v-if="initOrderDetail.type==1">{{$t('static.sell')}}</mg-label>
                                  <mg-label :title="$t('static.order_type')" v-if="initOrderDetail.type==0">{{$t('static.purchase')}}</mg-label>
                                  <mg-label :title="$t('static.breed')">{{initOrderDetail.goodsDesc}}</mg-label>
                                  <mg-label :title="$t('static.consignee_name')">{{initOrderDetail.consignee}}</mg-label>
                                  <mg-label :title="$t('static.consignee_phone')">{{initOrderDetail.consigneePhone}}</mg-label>
                                  <mg-label :title="$t('static.country')">{{initOrderDetail.country}}</mg-label>
                                  <mg-label :title="$t('static.province')+$t('static.city')+$t('static.area')">{{initOrderDetail.province}} {{initOrderDetail.city}} {{initOrderDetail.district}}</mg-label>
                                  <mg-label :title="$t('static.detailed_address')">{{initOrderDetail.consigneeAddr}}</mg-label>
                                  <mg-label :title="$t('static.transcation_amount')" style="color:red">{{initOrderDetail.total}}（{{initOrderDetail.currency | Currency}}）</mg-label>
                                  <mg-label :title="$t('static.sundry_fees')+$t('static.fee_explain')">{{initOrderDetail.incidentals}}<span v-if="initOrderDetail.incidentalsDesc!=''">（{{initOrderDetail.incidentalsDesc}}）</span></mg-label>
                                  <mg-label :title="$t('static.preferential')+$t('static.discount_note')">{{initOrderDetail.preferential}}<span v-if="initOrderDetail.preferentialDesc!=''">（{{initOrderDetail.preferentialDesc}}）</span></mg-label>
                                  <mg-label :title="$t('static.paid')">{{initOrderDetail.prepaid}}（{{initOrderDetail.currency | Currency}}）</mg-label>
                                  <mg-label :title="$t('static.wait_payment')">{{initOrderDetail.unpaid}}（{{initOrderDetail.currency | Currency}}）</mg-label>
                                  <mg-label :title="$t('static.transcation')">{{initOrderDetail.ctime}}</mg-label>
                                  <mg-label :title="$t('static.comment')" style="width:100%">{{initOrderDetail.description}}</mg-label>
                              </ul>        
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading" >
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:'',
                                            crete:'goods'
                                            })">
                                      <img class="pull-left" src="/static/images/order.png" height="30" width="30" style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" >
                                        {{$t('static.commodity_order')}}（{{initOrderDetail.goods.arr.length}}）
                                      </a>
                                      <span class="pull-right" style="color:#000;line-height:27px;font-size: 13px;">{{$t('static.breed')}}{{$t('static.total')}}：{{initOrderDetail.goods.total}}元</span>
                                     
                                  </h4>
                              </div>
                              <div class="panel-collapse" v-if="initOrderDetail.goods.arr.length!==null" v-show="initOrderDetail.goods.show">
                                  <div class="panel-body panel-set">
                                      <table class="table  contactSet">
                                        <thead>
                                          <th>{{$t('static.breed')}}</th>
                                          <th>{{$t('static.origin')}}</th>
                                          <th>{{$t('static.specification')}}</th>
                                          <th>{{$t('static.quantity')}}（{{$t('static.unit')}}）</th>
                                          <th>{{$t('static.quality')}}</th>
                                          <th>{{$t('static.price')}}</th>
                                          <th>{{$t('static.cost_price')}}</th>
                                          <th>{{$t('static.cost')}}{{$t('static.total')}}</th>
                                          <th>{{$t('static.total')}}</th>
                                        </thead>
                                      <tbody>
                                          <tr v-for="item in initOrderDetail.goods.arr">
                                              <td>{{item.breedName}}</td>
                                              <td>{{item.location}}</td>
                                              <td>{{item.spec}}</td>
                                              <td>{{item.number}}（{{item.unit | Unit}}）</td>
                                              <td>{{item.quality}}</td>
                                              <td>{{item.price}}元/{{item.unit | Unit}}</td>
                                              <td>{{item.costPrice}}元/{{item.unit | Unit}}</td>
                                              <td>{{item.cost}}</td>
                                              <td>{{item.amount}}元</td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  </div>
                              </div>
                              <div class="panel-collapse" v-else v-show="initOrderDetail.goods.show">
                                  <div class="panel-body panel-set">
                                      <table class="table  contactSet">
                                        <thead>
                                          <th>{{$t('static.breed')}}</th>
                                          <th>{{$t('static.origin')}}</th>
                                          <th>{{$t('static.specification')}}</th>
                                          <th>{{$t('static.quantity')}}（{{$t('static.unit')}}）</th>
                                          <th>{{$t('static.quality')}}</th>
                                          <th>{{$t('static.price')}}</th>
                                          <th>{{$t('static.total')}}</th>
                                        </thead>
                                      <tbody>
                                          <tr v-for="item in initOrderDetail.goods.arr">
                                              <td>{{item.breedName}}</td>
                                              <td>{{item.location}}</td>
                                              <td>{{item.spec}}</td>
                                              <td>{{item.number}}（{{item.unit | Unit}}）</td>
                                              <td>{{item.quality}}</td>
                                              <td>{{item.price}}元/{{item.unit | Unit}}</td>
                                              <td>{{item.amount}}元</td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  </div>
                              </div>
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading" >
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                        link:'',
                                        crete:'stages'
                                        })">
                                      <img class="pull-left" src="/static/images/dividePay.png" height="32" width="26" style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.stages.arr.length!==null">
                                        {{$t('static.installment')}}（{{initOrderDetail.stages.arr.length}}）
                                      </a>
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                      {{$t('static.pay_evidence')}}（0）
                                      </a>
                                      <span v-if="initOrderDetail.orderStatus==60&&initOrderDetail.logistics==40" style="color:red;font-size: 13px;padding-left: 10px;display:inline-block;line-height:27px">客户已收货，商品质量符合客户要求！</span>
                                      <button type="button" class="btn btn-base pull-right"  @click.stop="divided_payments(initOrderDetail.id,initOrderDetail.total,initOrderDetail.stages)"  v-if="initOrderDetail.stages.arr.length!==null&&(initOrderDetail.validate==0||initOrderDetail.validate==-2)&&initOrderDetail.orderStatus<20&&param.contact=='/order/myList'">{{$t('static.edit')}}</button>
                                      <button v-else></button>
                                  </h4>
                              </div>
                              <div class="panel-collapse" v-if="initOrderDetail.stages.arr.length&&initOrderDetail.stages.show" v-cloak>
                                  <div class="panel-body panel-set">
                                      <table class="table  contactSet">
                                        <thead>
                                          <th>分期类型</th>
<!--                                           <th>分期期数</th> -->
                                          <th colspan="6">分期说明</th>
                                          <!-- <th>付款比例</th> -->
                                         <!--  <th>分期支付时间</th> -->
                                          <th>分期原因</th> 
                                          <th>申请状态</th>
                                          <th>申请备注</th>
                                          <th>{{$t('static.create_time')}}</th>
                                          <th></th>
                                        </thead>
                                        <tbody>
                                          <tr v-for="item in initOrderDetail.stages.arr">
                                              <td v-if="item.type==0">付款</td>
                                              <td v-if="item.type==1">收款</td>
                                              <td colspan="6" v-if="item.extra==0">{{item.orderStatus | orderDescript}}立即支付{{item.amount}}元（合同金额的{{item.ratio | advanced}}）</td>
                                              <td colspan="6" v-if="item.extra!==0">{{item.orderStatus | orderDescript}}的{{item.extra}}天内支付{{item.amount}}元（合同金额的{{item.ratio | advanced}}）</td>
                                              <td>{{item.description}}</td>
                                              <td v-if="item.validate==0" style="color:#91a0ff;cursor:pointer" @click="apply_Record({
                                                  sub:$index,
                                                  show:true,
                                                  loading:false,
                                                  type:item.type,
                                                  bizType:'order',
                                                  bizId:item.orderId,
                                                  bizSubId:item.id,
                                                  url:'/fund/requestRecord'
                                                  })">{{$t('static.wait_approval')}}</td>
                                              <td v-if="item.validate==1"  style="color:#91a0ff;cursor:pointer" @click="apply_Record({
                                                  sub:$index,
                                                  show:true,
                                                  loading:false,
                                                  type:item.type,
                                                  bizType:'order',
                                                  bizId:item.orderId,
                                                  bizSubId:item.id,
                                                  url:'/fund/requestRecord'
                                                  })">{{$t('static.applied')}}</td>
                                              <td v-if="item.validate==2" style="color:green;cursor:pointer" @click="apply_Record({
                                                  sub:$index,
                                                  show:true,
                                                  loading:false,
                                                  type:item.type,
                                                  bizType:'order',
                                                  bizId:item.orderId,
                                                  bizSubId:item.id,
                                                  url:'/fund/requestRecord'
                                                  })">{{$t('static.approved')}}</td>
                                              <td v-if="item.validate==3" style="color:red;cursor:pointer" @click="apply_Record({
                                                  sub:$index,
                                                  show:true,
                                                  loading:false,
                                                  type:item.type,
                                                  bizType:'order',
                                                  bizId:item.orderId,
                                                  bizSubId:item.id,
                                                  url:'/fund/requestRecord'
                                                  })">{{$t('static.unapproved')}}</td>
                                              <td>{{item.comment}}</td>
                                              <td>{{item.ctime}}</td>
                                              <td v-if="param.contact=='/order/myList'">
                                                  <a class="operate" v-if="item.type==1&&item.validate==0&&(initOrderDetail.orderStatus==30||initOrderDetail.orderStatus==item.orderStatus)" @click="applyInfo({
                                                          show:true,
                                                          sub:$index,
                                                          bizId:item.orderId,
                                                          bizSubId:item.id,
                                                          validate:item.validate,
                                                          type:item.type,
                                                          payWay:'',
                                                          payName:'',
                                                          paySubName:'',
                                                          payUserName:'',
                                                          extra:item.extra,
                                                          payNumber:'',
                                                          comment:'',
                                                          image_f:'',
                                                          image_s:'',
                                                          image_t:'',
                                                          images:'',
                                                          url:'/fund/createByOrderStages',
                                                          titles:'申请分期审核',
                                                          link:paymentAudit
                                                      })"> 
                                                  <img src="/static/images/apply.png"  style="width:47px" />
                                                  </a>
                                                  <a class="operate" v-if="item.type==0&&item.validate==0&&(initOrderDetail.orderStatus==30||initOrderDetail.orderStatus==item.orderStatus)" @click="applyInfo({
                                                          show:true,
                                                          sub:$index,
                                                          bizId:item.orderId,
                                                          bizSubId:item.id,
                                                          validate:item.validate,
                                                          type:item.type,
                                                          payWay:'',
                                                          payName:'',
                                                          paySubName:'',
                                                          payUserName:'',
                                                          payNumber:'',
                                                          comment:'',
                                                          image_f:'',
                                                          image_s:'',
                                                          image_t:'',
                                                          images:'',
                                                          url:'/fund/createByOrderStages',
                                                          titles:'申请支付',
                                                          link:paymentAudit
                                                      })"> 
                                                  <img src="/static/images/payorder.png"  style="width:38px" />
                                                  </a>
                                                  <button class="btn btn-warning" style="font-size: 12px;background: #fff;color: #eea236;padding: 3px;" v-if="item.type==0&&item.validate==3&&(initOrderDetail.orderStatus==30||initOrderDetail.orderStatus==item.orderStatus)" @click="applyInfo({
                                                          show:true,
                                                          sub:$index,
                                                          bizId:item.orderId,
                                                          bizSubId:item.id,
                                                          loading:false,
                                                          cur:1,
                                                          type:item.type,
                                                          validate:item.validate,
                                                          payWay:'',
                                                          payName:'',
                                                          paySubName:'',
                                                          payUserName:'',
                                                          payNumber:'',
                                                          comment:'',
                                                          image_f:'',
                                                          image_s:'',
                                                          image_t:'',
                                                          images:'',
                                                          url:'/fund/createByOrderStages',
                                                          titles:'重新申请支付',
                                                          link:paymentAudit
                                                      })">重新申请支付</button>
                                                  <a class="operate" v-if="item.type==1&&item.validate==3&&(initOrderDetail.orderStatus==30||initOrderDetail.orderStatus==item.orderStatus)" @click="applyInfo({
                                                          show:true,
                                                          sub:$index,
                                                          bizId:item.orderId,
                                                          bizSubId:item.id,
                                                          loading:false,
                                                          cur:1,
                                                          type:item.type,
                                                          validate:item.validate,
                                                          payWay:'',
                                                          payName:'',
                                                          paySubName:'',
                                                          payUserName:'',
                                                          payNumber:'',
                                                          comment:'',
                                                          image_f:'',
                                                          image_s:'',
                                                          image_t:'',
                                                          images:'',
                                                          url:'/fund/createByOrderStages',
                                                          titles:'重新申请审核',
                                                          link:paymentAudit
                                                      })"> 
                                                      <img src="/static/images/reset.png"  style="width:47px" />
                                                  </a>
                                              </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                  </div>
                              </div>
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading" >
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                        link:'',
                                        crete:'contractList'
                                        })">
                                      <img class="pull-left" src="/static/images/dividePay.png" height="32" width="26" style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.contractList.arr.length!==null">
                                        合同凭证（{{initOrderDetail.contractList.arr.length}}）
                                      </a>
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                      合同凭证（0）
                                      </a>
                                      <span v-if="initOrderDetail.orderStatus==60&&initOrderDetail.logistics==40" style="color:red;font-size: 13px;padding-left: 10px;display:inline-block;line-height:27px">客户已收货，商品质量符合客户要求！</span>
                                          <button type="button" class="btn btn-base pull-right" @click.stop="createcredence({
                                              show:true,
                                              orderId:initOrderDetail.id,
                                              route:uploadDocument,
                                              link:'/order/attachSubmit/',
                                              description:'',
                                              fileType:'image',
                                              bizType:'order_contract',
                                              orderContractList:'',
                                              titles:'上传合同'
                                              })" 
                                              v-if="initOrderDetail.contractList.arr.length!==null&&(initOrderDetail.validate==0||initOrderDetail.validate==-2)&&initOrderDetail.orderStatus<20&&param.contact=='/order/myList'">{{$t('static.new')}}</button>
                                      <button v-else></button>
                                  </h4>
                              </div>
                              <div class="panel-collapse" v-if="initOrderDetail.contractList.arr.length&&!initOrderDetail.contractList.show" v-cloak>
                                  <div class="panel-body panel-set">
                                      <table class="table  contactSet">
                                        <thead>
                                          <th>{{$t('static.file_type')}}</th>
                                          <th>{{$t('static.file_origin')}}</th>
                                          <th>{{$t('static.file_path')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                          <th>{{$t('static.create_time')}}</th>
                                        </thead>
                                        <tbody>
                                          <tr v-for="item in initOrderDetail.contractList.arr">
                                              <td>{{item.fileType}}</td>
                                              <td>{{item.bizType}}</td>
                                              <td>
                                                  <img :src="item.url" v-if="item.fileType=='image'" @click="clickBig(item.url)"/>
                                                  <img src="/static/images/pdf.png" height="20" width="20" v-else/>
                                              </td>
                                              <td>{{item.description}}</td>
                                              <td>{{item.ctime}}</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                  </div>
                              </div>
                          </div>
                          <!-- 支付凭证 -->
                          <div class="panel panel-default">
                              <div class="panel-heading" >
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:'',
                                            crete:'payPics'
                                            })">
                                      <img class="pull-left" src="/static/images/pay.png" height="26" width="26" style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.payPics.arr.length!==null">
                                        {{$t('static.pay_evidence')}}（{{initOrderDetail.payPics.arr.length}}）<span v-if="param.orderStatus<30&&param.contact=='/order/myList'" class="system_danger">{{$t('static.pay_tips')}}</span>
                                      </a>
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                      {{$t('static.pay_evidence')}}（0）<span class="system_danger" v-if="param.orderStatus<30&&param.contact=='/order/myList'">{{$t('static.pay_tips')}}</span>
                                      </a>
                                      <button type="button" class="btn btn-base pull-right"  @click.stop="createcredence({
                                          show:true,
                                          orderId:initOrderDetail.id,
                                          route:uploadDocument,
                                          link:'/order/attachSubmit/',
                                          description:'',
                                          fileType:'image',
                                          bizType:'order_pay',
                                          payPics:'',
                                          titles:'上传支付凭证'
                                          })"  v-if="(initOrderDetail.payPics.arr.length!==null&&param.contact=='/order/myList')&&param.orderStatus>=30">{{$t('static.new')}}</button>
                                     <!--  <button type="button" class="btn btn-base pull-right" v-if="param.contact=='/order/myList'"  @click.stop="">新建</button> -->
                                      <a v-else></a>
                                  </h4>
                              </div>
                              <div class="panel-collapse" v-if="initOrderDetail.payPics.arr.length&&!initOrderDetail.payPics.show" v-cloak>
                                  <div class="panel-body panel-set">
                                      <table class="table  contactSet">
                                        <thead>
                                          <th>{{$t('static.file_type')}}</th>
                                          <th>{{$t('static.file_origin')}}</th>
                                          <th>{{$t('static.file_path')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                        </thead>
                                      <tbody>
                                          <tr v-for="item in initOrderDetail.payPics.arr">
                                              <td>{{item.fileType}}</td>
                                              <td>{{item.bizType}}</td>
                                              <td><img :src="item.url" v-if="item.fileType=='image'" @click="clickBig(item.url)"/>
                                                  <img src="/static/images/pdf.png" height="20" width="20" v-else/>
                                              </td>
                                              <td>{{item.description}}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  </div>
                              </div>
                          </div>
                          <!-- 上传附件 -->
                          <div class="panel panel-default">
                              <div class="panel-heading" >
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:'',
                                            crete:'attachFiles'
                                            })">
                                      <img class="pull-left" src="/static/images/appendix.png"  style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" >
                                        {{$t('static.upload_attachments')}}（{{initOrderDetail.attachFiles.arr.length}}）
                                      </a>
                                      <button type="button" class="btn btn-base pull-right"  @click.stop="createcredence({
                                          show:true,
                                          orderId:param.id,
                                          link:'/order/attachSubmit/',
                                          route:uploadDocument,
                                          description:'',
                                          fileType:'image',
                                          bizType:'attach_files',
                                          attachFiles:'',
                                          titles:'上传附件凭证'
                                          })" v-if="initOrderDetail.attachFiles.arr.length!==null&&param.contact=='/order/myList'">{{$t('static.new')}}</button>
                                      <a v-else ></a>
                                  </h4>
                              </div>
                              <div class="panel-collapse" v-show="!initOrderDetail.attachFiles.show">
                                  <div class="panel-body panel-set">
                                      <table class="table  contactSet">
                                        <thead>
                                         <th>{{$t('static.file_type')}}</th>
                                          <th>{{$t('static.file_origin')}}</th>
                                          <th>{{$t('static.file_path')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                        </thead>
                                      <tbody>
                                          <tr v-for="item in initOrderDetail.attachFiles.arr">
                                              <td>{{item.fileType}}</td>
                                              <td>{{item.bizType}}</td>
                                              <td><img :src="item.url" v-if="item.fileType=='image'" @click="clickBig(item.url)"/>
                                                  <img src="/static/images/pdf.png" height="20" width="20" v-else/>
                                              </td>
                                              <td>{{item.description}}</td>
                                              <td>
                                                  <img v-bind:src="item.image" />
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  </div>
                              </div>
                          </div>
                          <!-- 物流凭证 -->
                          <div class="panel panel-default">
                              <div class="panel-heading" >
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:'',
                                            crete:'sendPics'
                                            })">
                                      <img class="pull-left" src="/static/images/logist.png"  style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.sendPics.arr.length">
                                        {{$t('static.logistics')}}（{{initOrderDetail.sendPics.arr.length}}）<span class="system_danger" v-if="param.orderStatus<50&&param.contact=='/order/myList'">{{$t('static.logistics_tips')}}</span>
                                      </a>
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                        {{$t('static.logistics')}}（0） <span class="system_danger" v-if="param.orderStatus<50&&param.contact=='/order/myList'">{{$t('static.logistics_tips')}}</span>
                                      </a>
                                      <button type="button" class="btn btn-base pull-right"  @click.stop="createcredence({
                                          show:true,
                                          orderId:param.id,
                                          link:'/order/attachSubmit/',
                                          description:'',
                                          fileType:'image',
                                          bizType:'order_send',
                                          sendPics:'',
                                          route:uploadDocument,
                                          titles:'上传物流凭证'
                                          })" v-if="initOrderDetail.sendPics.arr.length!==null&&param.contact=='/order/myList'&&param.orderStatus>=50">{{$t('static.new')}}</button>
                                      <!-- <button type="button" class="btn btn-base pull-right" v-if="param.contact=='/order/myList'"  @click.stop="">新建</button> -->
                                      <a v-else></a>
                                  </h4>
                              </div>
                              <div class="panel-collapse" v-if="initOrderDetail.sendPics.arr.length!==null&&!initOrderDetail.sendPics.show" >
                                  <div class="panel-body panel-set">
                                      <table class="table  contactSet">
                                        <thead>
                                          <th>{{$t('static.file_type')}}</th>
                                          <th>{{$t('static.file_origin')}}</th>
                                          <th>{{$t('static.file_path')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                        </thead>
                                      <tbody>
                                          <tr v-for="item in initOrderDetail.sendPics.arr">
                                              <td>{{item.fileType}}</td>
                                              <td>{{item.bizType}}</td>
                                              <td><img :src="item.url" v-if="item.fileType=='image'" @click="clickBig(item.url)"/>
                                                  <img src="/static/images/pdf.png" height="20" width="20" v-else/>
                                              </td>
                                              <td>{{item.description}}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </article>
              </div>
          </div>
        </section>
    </shadow-model>
  <!-- <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
  <div class="container modal_con" v-show="param.show" >
      <div class="top-title">
          <span class="glyphicon glyphicon-remove-circle" @click="param.show=false"></span>
      </div>
     
     </div> -->
</template>
<script>
import trackingModel from '../order/ordergoods'
import credenceModel from '../order/createcredence'
import disposeModel  from  '../order/orderStatus'
import pictureModel  from  '../tips/pictureDialog'
import dividedModel from './second_order/newDivided'
import filter from '../../filters/filters'
import tipsModel  from  '../tips/tipDialog'
import auditModel from './second_order/orderAudit'
import applyModel from './second_order/applyDetaillist'
import mgLabel from '../mguan/mgLabel.vue'
import shadowModel from '../mguan/shadow.vue'
import {
  initOrderDetail,
  initMyFundList
} from '../../vuex/getters'
import {
  getOrderDetail,
  uploadDocument,
  dividedPayment,
  paymentAudit,
  getMyFundList
} from '../../vuex/actions'
export default {
    components: {
      trackingModel,
      credenceModel,
      disposeModel,
      pictureModel,
      dividedModel,
      filter,
      tipsModel,
      auditModel,
      applyModel,
      mgLabel,
      shadowModel
    },
    props:['param'],
    data(){
      return {
        trackingParam:{
          show:false
        },
        sourceType:{
          0:'PC',
          1:'android',
          2:'wechart',
          3:'ios'
        },
        type:{
          0:'采购',
          1:'销售'
        },
        show:true,
        credenceParam:{
           show:false,
           creCallback:''
        },
        disposeParam:{ //订单处理各个状态
            show:false,
            sales:false,
            handle:false,
            payment:false,
            Auditing:false,
            sendoff:false,
            express:false,
            delivery:false,
            tips:''
        },
        pictureParam:{
            show:false,
            img:''
        },
        tipsParam:{
            show:false,
            alert:true,
            name:''
        },
        divideParam:{
            show:false,
            loading:true,
            id:'',
            link:dividedPayment,
            url:'/order/updateStages/',
            stages:[],
            orderStatus:''
        },
        auditParam:{
            show:false,
            id:''
        },
        applyDetails:{
            show:false
        }
      }
    },
    vuex:{
      getters:{
        initOrderDetail,
        initMyFundList
      },
      actions:{
        getOrderDetail,
        uploadDocument,
        dividedPayment,
        paymentAudit,
        getMyFundList
      }
    },
    methods:{
          enfoldment:function(param){
          	console.log(this.$store.state.table.orderDetail[param.crete])
            if(this.$store.state.table.orderDetail[param.crete].arr.length==0){
                this.$store.state.table.orderDetail[param.crete].show=false;
            }
            this.$store.state.table.orderDetail[param.crete].show = !this.$store.state.table.orderDetail[param.crete].show;
          },
          applyInfo:function(item){
            console.log(item)
                this.auditParam = item;
                this.auditParam.callback = this.callback;
                if(item.titles=='重新申请审核'){
                    this.getMyFundList(item);
                    if(this.initMyFundList!=''&&this.initMyFundList[0]){
                       console.log(this.initMyFundList[0])
                        item.amount = this.initMyFundList[0].amount;
                        item.payName = this.initMyFundList[0].payName;
                        item.payUserName = this.initMyFundList[0].payUserName;
                        item.payNumber = this.initMyFundList[0].payNumber;
                        item.payWay = this.initMyFundList[0].payWay;
                        item.paySubName = this.initMyFundList[0].paySubName;
                        item.images = this.initMyFundList[0].images;
                        this.auditParam.show=true;
                        /* item.amount = this.initMyFundList[this.initMyFundList.length-1].amount;
                        item.payName = this.initMyFundList[this.initMyFundList.length-1].payName;
                        item.payUserName = this.initMyFundList[this.initMyFundList.length-1].payUserName;
                        item.payNumber = this.initMyFundList[this.initMyFundList.length-1].payNumber;
                        item.payWay = this.initMyFundList[this.initMyFundList.length-1].payWay;
                        item.paySubName = this.initMyFundList[this.initMyFundList.length-1].paySubName;
                        item.images = this.initMyFundList[this.initMyFundList.length-1].images;
                        this.auditParam.show=true;*/
                    }else{
                        this.auditParam.show=false;
                    }
                }else{
                    this.auditParam.show=true;
                }
                
          },
          apply_Record:function(item){
             this.applyDetails.show=true;
             this.applyDetails = item;
          },
          divided_payments:function(id,total,stages){
            console.log(stages)
              console.log(this.initOrderDetail)
              this.divideParam.show = true;
              this.divideParam.id = id;
              this.divideParam.total = total;
              this.divideParam.stages = stages.arr;
              this.divideParam.callback = this.callback;
              console.log(this.divideParam)
          },
          createChance:function(item,index){
            console.log(item)
                item.show=!item.show;
                item.index = index;
                this.trackingParam = item;
                this.trackingParam.show = true;
          },
         createcredence:function(initOrderDetail){
            console.log(initOrderDetail)
             this.credenceParam=initOrderDetail;
             this.credenceParam.creCallback = this.pictureCallback;
             console.log(this.credenceParam)
         },
         clickBig:function(img){
              this.pictureParam.show=true;
              this.pictureParam.img = img;
          },
        pendingOrder:function(initOrderDetail){
            console.log(initOrderDetail)
            console.log(this.disposeParam)
            this.disposeParam = initOrderDetail;
            /*this.disposeParam = this.param;*/
            this.disposeParam.show = true;

        },
        callback:function(title){
          this.tipsParam.show = true;
          this.tipsParam.name=title;
          this.tipsParam.alert=true;
        },
        pictureCallback:function(title){
          this.tipsParam.show = true;
          this.tipsParam.name=title;
          this.tipsParam.alert=true;
          this.getOrderDetail(this.param);
        }
    },
    filter:(filter,{}),
   created(){
   	  this.getOrderDetail(this.param);
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

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
}

section {
    background-color: #fff;
}
.breed_action{
  top: 10px;
  right: 35px;
  padding: 0 2px;
}
.breed_action dl dt{
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}
section article {
    margin-top: 10px;
}

.client-section {
    padding: 10px 5px 40px 5px;
}

.contactSet thead{
  color:#fa6705;
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
.table>tbody>tr>td img{
    width: 100px;
    margin: 0
}
.table{display: table;}
.btn-orange {
    background-color: #fa6705;
    color: #fff;
    font-size: 18px;
}
.client-editbtn {
    text-align: right;
    margin-top: 15px;
}
.client-image {
    display: inline-block;
}
</style>

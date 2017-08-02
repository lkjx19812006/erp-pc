<template>
    <div>
        <editorder-model :param="editParam" v-if="editParam.show"></editorder-model>
        <credence-model :param="credenceParam" v-if="credenceParam.show"></credence-model>
        <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <divided-model :param="divideParam" v-if="divideParam.show"></divided-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <confirm-model :param="confirmParam" v-if="confirmParam.show"></confirm-model>
        <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
        <apply-model :param="applyDetails" v-if="applyDetails.show"></apply-model>
        <delete-model :param="deleteParam" v-if="deleteParam.show"></delete-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <purchase-model :param="purchaseParam" v-if="purchaseParam.show"></purchase-model>
        <chance-detail-model :param="chanceParam" v-if="chanceParam.show"></chance-detail-model>
        <evaluate-model  :param="evaluateParam" v-if="evaluateParam.show"></evaluate-model>
        <evaluation-model  :param="historyParam" v-if="historyParam.show"></evaluation-model>
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
                <div class="client-section clearfix">
                    <div class="col-md-12">
                        <!-- <h4 class="section_title">{{$t('static.customer_info')}}</h4> -->
                        <article @click.stop="">
                            <div class="panel-group">
                                <div class="panel panel-default" style="border:none">
                                    <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                        <!-- 客户 -->
                                        <div class="clearfix">
                                            <p class="btn btn-primary btn-xs">{{$t('static.customer_info')}}</p>
                                        </div>
                                        <div class="clearfix">
                                            <mg-label title="ID">
                                                <span v-if="initOrderDetail.customer>=0">{{initOrderDetail.customer}}</span>
                                                <span v-else>{{initOrderDetail.user}}</span>
                                            </mg-label>
                                            <mg-label :title="$t('static.customerName')">{{initOrderDetail.customerName}}</mg-label>
                                            <mg-label :title="$t('static.cellphone')">{{initOrderDetail.customerPhone}}</mg-label>
                                        </div>
                                        <hr style="height:1px;border-color:#ccc" />
                                        <!-- 订单 -->
                                        <div class="clearfix">
                                            <p class="btn btn-primary btn-xs">{{$t('static.order_info')}}</p>
                                        </div>
                                        <div class="clearfix">
                                            <mg-label :title="$t('static.breed')">{{initOrderDetail.goodsDesc}}</mg-label>
                                            <mg-label :title="$t('static.order_no')">{{initOrderDetail.no}}</mg-label>
                                            <mg-label :title="$t('static.order_type')" v-if="initOrderDetail.type==1&&initOrderDetail.link==''">{{$t('static.sell')}}</mg-label>
                                            <mg-label :title="$t('static.order_type')" v-if="initOrderDetail.type==1&&initOrderDetail.link!==''">{{$t('static.sell')}}<a slot="" @click="linkDetail({
                                                show:true,
                                                id:initOrderDetail.link,
                                                loading:true,
                                                key:'orderDetail',
                                                contact:'/order/myList'
                                                })">（{{$t('static.purchase')}}{{$t('static.details')}}）</a></mg-label>
                                            <mg-label :title="$t('static.order_type')" v-if="initOrderDetail.type==0&&initOrderDetail.link==''">{{$t('static.purchase')}}</mg-label>
                                            <mg-label :title="$t('static.order_type')" v-if="initOrderDetail.type==0&&initOrderDetail.link!==''">{{$t('static.purchase')}}<a slot="" @click="linkDetail({
                                                show:true,
                                                id:initOrderDetail.link,
                                                loading:true,
                                                key:'orderDetail',
                                                contact:'/order/myList'
                                                })">（{{$t('static.sell')}}{{$t('static.details')}}）</a></mg-label>
                                            <mg-label :title="$t('static.sample_order')">{{initOrderDetail.sample | Sample}}</mg-label>
                                            <!-- 新增 订单性质 -->
                                            <mg-label :title="$t('static.trading_patterns')" style="color:red" v-if="initOrderDetail.orderStatus ==0||initOrderDetail.orderStatus ==70">{{initOrderDetail.orderStatus | orderstatus}}</mg-label>
                                            <!-- 新增 订单状态 -->
                                            <mg-label :title="$t('static.order_status')">{{initOrderDetail.orderStatus | orderstatus}}</mg-label>
                                            <!-- 成交时间 -->
                                            <mg-label :title="$t('static.transcation')">{{initOrderDetail.ctime}}</mg-label>
                                        </div>
                                        <hr style="height:1px;border-color:#ccc" />
                                        <div class="clearfix">
                                            <p class="btn btn-primary btn-xs">{{$t('static.consignee')}}</p>
                                        </div>
                                        <div class="clearfix">
                                            <mg-label :title="$t('static.consignee_name')">{{initOrderDetail.consignee}}</mg-label>
                                            <mg-label :title="$t('static.consignee_phone')">{{initOrderDetail.consigneePhone}}</mg-label>
                                            <mg-label :title="$t('static.country')">{{initOrderDetail.countryName}}</mg-label>
                                            <mg-label :title="$t('static.detailed_address')">{{initOrderDetail.consigneeAddr}}</mg-label>
                                        </div>
                                        <hr style="height:10px;border-color:#ccc" />
                                        <div class="clearfix">
                                            <p class="btn btn-primary btn-xs">{{$t('static.transcation_amount')}}</p>
                                        </div>
                                        <div class="clearfix">
                                            <mg-label :title="$t('static.transcation_amount')" style="color:red">{{initOrderDetail.total}}（{{initOrderDetail.currency | Currency}}）</mg-label>
                                            <mg-label :title="$t('static.wait_payment')">{{initOrderDetail.unpaid}}（{{initOrderDetail.currency | Currency}}）</mg-label>
                                            <mg-label :title="$t('static.paid')">{{initOrderDetail.prepaid}}（{{initOrderDetail.currency | Currency}}）</mg-label>
                                            <mg-label :title="$t('static.sundry_fees')+$t('static.fee_explain')">{{initOrderDetail.incidentals}}<span v-if="initOrderDetail.incidentalsDesc!=''">（{{initOrderDetail.incidentalsDesc}}）</span></mg-label>
                                            <mg-label :title="$t('static.preferential')+$t('static.discount_note')">{{initOrderDetail.preferential}}<span v-if="initOrderDetail.preferentialDesc!=''">（{{initOrderDetail.preferentialDesc}}）</span></mg-label>
                                            <mg-label :title="$t('static.freight')+$t('static.freight_payer')">{{initOrderDetail.freight}}（{{initOrderDetail.freightType | freightType}}）</span>
                                            </mg-label>
                                        </div>
                                        <mg-label :title="$t('static.comment')" style="width:100%">{{initOrderDetail.comments}}</mg-label>
                                    </ul>
                                </div>
                                <!-- 商品订单列表 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:'',
                                            crete:'goods'
                                            })">
                                      <img class="pull-left" src="/static/images/order.png" height="30" width="30" style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" >
                                        {{$t('static.commodity_order')}}（{{initOrderDetail.goods.arr.length}}）
                                      </a>
                                      <span class="pull-right" style="color:#000;line-height:27px;font-size: 13px;">{{$t('static.breed')}}{{$t('static.total')}}：{{initOrderDetail.goods.total}} {{initOrderDetail.currency | Currency}}</span>
                                  </h4>

                                    </div>
                                    <div class="panel-collapse" v-if="initOrderDetail.goods.arr.length!==null" v-show="initOrderDetail.goods.show">
                                        <div class="panel-body panel-set">
                                        <span style="display:inline-block;width:100%;height:32px;text-align:right;padding-right:7px;" v-if="param.int==1&&initOrderDetail.orderStatus==60&&param.isEvaluate==0">
                                         <input type="checkbox"  @change="changeTitleChecked(data,$event)" :checked="title1">{{$t('static.Select_all')}}
                                            <button class="btn btn-success" @click="batchAccept()" >{{$t('static.Batch_evaluation')}}</button>

                                            </span>
                                            <button class="btn btn-primary right" style="margin-left:10px" v-if="param.int==1&&initOrderDetail.orderStatus==60&&param.isEvaluate==0"  @click.stop="confirm({
                                             id:param.id,
                                             show:true,
                                             url:'/order/confirmEvaluate',
                                             })">{{$t('static.confirm_evaluation')}}</button>
                                       <button class="btn right" style="color:black;font-weight:bolder;margin-left:30px" disabled="" v-if="param.isEvaluate==1">{{$t('static.evaluation_confirmed')}}</button> 
                                            <table class="table  contactSet"  style="border-top:1px solid #eee">
                                                <thead>
                                                    <th style="width:30px;" v-if="param.int==1&&initOrderDetail.orderStatus==60&&param.isEvaluate==0">{{$t('static.selected')}}</th>
                                                    <th>{{$t('static.breed')}}</th>
                                                    <th>{{$t('static.origin')}}</th>
                                                    <th>{{$t('static.specification')}}</th>
                                                    <th>{{$t('static.quantity')}}（{{$t('static.unit')}}）</th>
                                                    <th>{{$t('static.quality')}}</th>
                                                    <th>{{$t('static.order_source')}}</th>
                                                    <th v-if="initOrderDetail.type == 1">{{$t('static.price')}}</th>
                                                    <th v-if="initOrderDetail.type == 0">采购价格</th>
                                                    <th v-if="this.initLogin.orgId !=='11'&&initOrderDetail.type==1&&initOrderDetail.intl==0">{{$t('static.cost_price')}}</th>

                                                    <th v-if="initOrderDetail.orderStatus==60">药典合格</th>
                                                    <th v-if="initOrderDetail.orderStatus==60">内控合格</th>
                                                    <th v-if="initOrderDetail.orderStatus==60&&initOrderDetail.sample==1">是否成交</th>
                                                    <th v-if="param.int==1&&initOrderDetail.orderStatus==60">{{$t('static.evaluation')}}</th>
                                                    <th v-if="param.int==1&&initOrderDetail.orderStatus==60&&param.isEvaluate==0">{{$t('static.handle')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initOrderDetail.goods.arr">
                                                        <td @click.stop="" style="width:100px;" v-if="param.int==1&&initOrderDetail.orderStatus==60&&param.isEvaluate==0">
                                                        <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                                                        </td>  
                                                        <td>                                                            
                                                            <a v-if="item.sourceType == 1" @click="showIntent(item.sourceId)" href="javascript:void(0);">{{item.breedName}}</a>
                                                            <span v-else>{{item.breedName}}</span>
                                                        </td>
                                                        <td>{{item.locationName}}</td>
                                                        <td>{{item.spec | specFilter_a}}</td>
                                                        <td>{{item.number}}（{{item.unit | Unit}}）</td>
                                                        <td>{{item.quality}}</td>
                                                        <td>{{item.sourceType | orderSource}}</td>
                                                        <td>{{item.price}} （{{initOrderDetail.currency | Currency}}）/{{item.unit | Unit}}</td>
                                                        <td v-if="this.initLogin.orgId !=='11'&&initOrderDetail.type==1&&initOrderDetail.intl==0">{{item.costPrice}} （{{initOrderDetail.currency | Currency}}）/{{item.unit | Unit}}</td>
                                                        <td v-if="initOrderDetail.orderStatus==60">
                                                            <a href="javascript:void(0);" @click="editQa(item,initOrderDetail.sample,'qaStandard')">{{item.qaStandard | qaFilter}}</a>
                                                        </td>
                                                        <td v-if="initOrderDetail.orderStatus==60">
                                                            <a href="javascript:void(0);" @click="editQa(item,initOrderDetail.sample,'qaSelf')">{{item.qaSelf | qaFilter}}</a>
                                                        </td>
                                                        <td v-if="initOrderDetail.orderStatus==60&&initOrderDetail.sample==1">
                                                            <a href="javascript:void(0);" @click="editQa(item,initOrderDetail.sample,'sample')">{{item.sampleTraded | isDeal}}</a>
                                                        </td>
                                                        <td v-if="param.int==1&&initOrderDetail.orderStatus==60" @click="checkHistory(item.id,item.breedName)">
                                                        <Poptip placement="top" trigger="hover">
                                                        <span v-if="item.evaluation!=''">{{item.evaluation | textDisplay '4'}}</span>
                                                        <span v-else>{{$t('static.unvalued')}}</span>
                                                        <div class="api" slot="content" style="color:green">
                                                            {{item.evaluation}}
                                                        </div>
                                                        </Poptip>
                                                        <p class="clickMore">{{$t('static.click_here_for')}}</p>
                                                        </td>
                                                        <td style="color:blue;cursor:pointer" @click="addEval(item.id)"  v-if="param.int==1&&initOrderDetail.orderStatus==60&&param.isEvaluate==0">{{$t('static.evaluate')}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="panel-collapse" v-else v-show="initOrderDetail.goods.show">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
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
                                                        <td>{{item.locationName}}</td>
                                                        <td>{{item.spec}}</td>
                                                        <td>{{item.number}}（{{item.unit | Unit}}）</td>
                                                        <td>{{item.quality}}</td>
                                                        <td>{{item.price}}（{{initOrderDetail.currency | Currency}}）/{{item.unit | Unit}}</td>
                                                        <td>{{item.amount}}（{{initOrderDetail.currency | Currency}}）</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 采销对应 -->
                                <div v-if="initOrderDetail.type==0&&initOrderDetail.intl===0" class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                                key:'linkOrder'
                                            })">
                                            <img class="pull-left" src="/static/images/dividePay.png" height="32" width="26" style="margin-top:4px;" />
                                            <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initLinkOrder.arr.length!==null">
                                              对应销售订单（{{initLinkOrder.arr.length}}）
                                            </a>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-if="initLinkOrder.arr.length&&initLinkOrder.show" v-cloak>
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>销售订单ID</th>
                                                    <th>品种</th>
                                                    <th>数量</th>
                                                    <th>
                                                        <span v-if="initOrderDetail.type == 1">采购业务员</span>
                                                        <span v-else>销售业务员</span>
                                                    </th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initLinkOrder.arr">
                                                        <th>{{item.sellId}}</th>
                                                        <td>{{item.breedName}}</td>
                                                        <td>{{item.number}}{{item.unit | Unit}}</td>
                                                        <td>
                                                            <span v-if="initOrderDetail.type == 1">{{item.buyEmployeeName}}</span>
                                                            <span v-else>{{item.sellEmployeeName}}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- “待采购” -->
                                <div v-if="initOrderDetail.type==1&&initOrderDetail.intl===0" class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                        link:'',
                                        crete:'orderLinkList'
                                        })">
                                            <img class="pull-left" src="/static/images/dividePay.png" height="32" width="26" style="margin-top:4px;" />
                                            <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.orderLinkList.arr.length!==null">
                                              待采购（{{initOrderDetail.orderLinkList.arr.length}}）
                                            </a>
                                            <button type="button" class="btn btn-base pull-right" @click.stop="editPurchase()">编辑</button>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-if="initOrderDetail.orderLinkList.arr.length&&initOrderDetail.orderLinkList.show" v-cloak>
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>采购订单ID</th>
                                                    <th>品种</th>
                                                    <th>数量</th>
                                                    <th>采购业务员</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initOrderDetail.orderLinkList.arr">
                                                        <td>
                                                            <span v-if="item.buyId!=''">{{item.buyId}}</span>
                                                            <span v-else>未生成采购订单</span>
                                                        </td>
                                                        <td>{{item.breedName}}</td>
                                                        <td>{{item.number}}{{item.unit | Unit}}</td>
                                                        <td>{{item.buyEmployeeName}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 分期付款 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                        link:'',
                                        crete:'stages'
                                        })">
                                      <img class="pull-left" src="/static/images/dividePay.png" height="32" width="26" style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.stages.arr.length!==null">
                                        {{$t('static.installment')}}（{{initOrderDetail.stages.arr.length}}）
                                      </a>
                                      <span v-if="initOrderDetail.orderStatus==60&&initOrderDetail.logistics==40" style="color:red;font-size: 13px;padding-left: 10px;display:inline-block;line-height:27px">{{$t('static.quality_satisfied')}}</span>
                                      <!-- 分期付款 编辑 按钮 -->
                                      <button type="button" class="btn btn-base pull-right"  @click.stop="divided_payments(initOrderDetail.id,initOrderDetail.total,initOrderDetail.stages)"  v-if="initOrderDetail.stages.arr.length!==null&&(initOrderDetail.validate==0||initOrderDetail.validate==-2)&&initOrderDetail.orderStatus<20&&param.contact=='/order/myList'">{{$t('static.edit')}}</button>
                                      <button v-else></button>
                                  </h4>
                                    </div>
                                    <div class="panel-collapse" v-if="initOrderDetail.stages.arr.length&&initOrderDetail.stages.show" v-cloak>
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>{{$t('static.install_type')}}</th>
                                                    <th colspan="6">{{$t('static.install_detail')}}</th>
                                                    <!-- <th>付款比例</th> -->
                                                    <!--  <th>分期支付时间</th> -->
                                                    <th>{{$t('static.install_reason')}}</th>
                                                    <th>{{$t('static.apply_status')}}</th>
                                                    <th>{{$t('static.apply_note')}}</th>
                                                    <th>{{$t('static.create_time')}}</th>
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initOrderDetail.stages.arr">
                                                        <td v-if="item.type==0">{{$t('static.paid')}}</td>
                                                        <td v-if="item.type==1">{{$t('static.income')}}</td>
                                                        <td colspan="6" v-if="item.extra==0">{{item.orderStatus | orderDescript}} {{$t('static.immediately_pay')}} {{item.amount}} {{initOrderDetail.currency | Currency}}
                                                            <!-- （{{$t('static.order_amount')}} {{item.ratio | advanced}}） -->
                                                        </td>
                                                        <td colspan="6" v-if="item.extra!==0">{{item.orderStatus | orderDescript}} {{item.extra}} {{$t('static.day')}} {{$t('static.immediately_pay')}} {{item.amount}} {{initOrderDetail.currency | Currency}}
                                                            <!-- （{{$t('static.order_amount')}} {{item.ratio | advanced}}） -->
                                                        </td>
                                                        <td>{{item.comment}}</td>
                                                        <td v-if="item.validate==0" style="color:#91a0ff;cursor:pointer" @click="apply_Record({
                                                              sub:$index,
                                                              show:true,
                                                              loading:false,
                                                              type:item.type,
                                                              bizType:'order',
                                                              bizId:item.orderId,
                                                              bizSubId:item.id,
                                                              url:'/fund/requestRecord'
                                                              })">{{$t('static.notpayment')}}</td>
                                                        <td v-if="item.validate==1" style="color:#91a0ff;cursor:pointer" @click="apply_Record({
                                                              sub:$index,
                                                              show:true,
                                                              loading:false,
                                                              type:item.type,
                                                              bizType:'order',
                                                              bizId:item.orderId,
                                                              bizSubId:item.id,
                                                              url:'/fund/requestRecord'
                                                              })">{{$t('static.applypayment')}}</td>
                                                        <td v-if="item.validate==2" style="color:green;cursor:pointer" @click="apply_Record({
                                                              sub:$index,
                                                              show:true,
                                                              loading:false,
                                                              type:item.type,
                                                              bizType:'order',
                                                              bizId:item.orderId,
                                                              bizSubId:item.id,
                                                              url:'/fund/requestRecord'
                                                              })">{{$t('static.yetpayment')}}</td>
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
                                                            <!-- 申请审核 -->
                                                            <button class="btn btn-warning" style="font-size: 12px;background: #fff;color: #eea236;padding: 3px;" v-if="item.type==1&&item.validate==0&&(initOrderDetail.orderStatus==30||initOrderDetail.orderStatus==item.orderStatus)" @click="applyInfo({
                                                                  show:true,
                                                                  sub:$index,
                                                                  bizId:item.orderId,
                                                                  bizSubId:item.id,
                                                                  validate:item.validate,
                                                                  type:item.type,
                                                                  payWay:'',
                                                                  payName:'',
                                                                  currency:initOrderDetail.currency,
                                                                  paySubName:'',
                                                                  payUserName:'',
                                                                  extra:item.extra,
                                                                  payNumber:'',
                                                                  amount:item.amount,
                                                                  country:initOrderDetail.country,
                                                                  comment:'',
                                                                  image_f:'',
                                                                  image_s:'',
                                                                  image_t:'',
                                                                  images:'',
                                                                  url:'/fund/createByOrderStages',
                                                                  titles:this.$t('static.review_application'),
                                                                  link:paymentAudit
                                                                  })"> {{$t('static.review_application')}}
                                                            </button>
                                                            <!-- 申请付款 -->
                                                            <button class="btn btn-warning" style="font-size: 12px;background: #fff;color: #eea236;padding: 3px;" v-if="item.type==0&&item.validate==0&&(initOrderDetail.orderStatus==30||initOrderDetail.orderStatus==item.orderStatus)" @click="applyInfo({
                                                                  show:true,
                                                                  sub:$index,
                                                                  bizId:item.orderId,
                                                                  bizSubId:item.id,
                                                                  validate:item.validate,
                                                                  type:item.type,
                                                                  payWay:'',
                                                                  payName:'',
                                                                  paySubName:'',
                                                                  currency:initOrderDetail.currency,
                                                                  amount:item.amount,
                                                                  country:initOrderDetail.country,
                                                                  payUserName:'',
                                                                  payNumber:'',
                                                                  comment:'',
                                                                  image_f:'',
                                                                  image_s:'',
                                                                  image_t:'',
                                                                  images:'',
                                                                  url:'/fund/createByOrderStages',
                                                                  titles:this.$t('static.review_application'),
                                                                  link:paymentAudit
                                                                })">
                                                                {{$t('static.apply_payment')}}</button>
                                                            </a>
                                                            <!-- 申请付款 -->
                                                            <!-- <button class="btn btn-warning" style="font-size: 12px;background: #fff;color: #eea236;padding: 3px;" v-if="item.type==1&&item.validate==0&&(initOrderDetail.orderStatus==30||initOrderDetail.orderStatus==item.orderStatus)" @click="applyInfo({
                                                                  show:true,
                                                                  sub:$index,
                                                                  bizId:item.orderId,
                                                                  bizSubId:item.id,
                                                                  validate:item.validate,
                                                                  type:item.type,
                                                                  payWay:'',
                                                                  payName:'',
                                                                  paySubName:'',
                                                                  currency:initOrderDetail.currency,
                                                                  payUserName:'',
                                                                  payNumber:'',
                                                                  comment:'',
                                                                  image_f:'',
                                                                  image_s:'',
                                                                  image_t:'',
                                                                  images:'',
                                                                  url:'/fund/createByOrderStages',
                                                                  titles:this.$t('static.review_application'),
                                                                  link:paymentAudit
                                                                })">{{$t('static.apply_payment')}}</button> -->
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
                                                                  currency:initOrderDetail.currency,
                                                                  amount:item.amount,
                                                                  country:initOrderDetail.country,
                                                                  payName:'',
                                                                  paySubName:'',
                                                                  payUserName:'',
                                                                  payNumber:'',
                                                                  comment:'',
                                                                  images:'',
                                                                  url:'/fund/createByOrderStages',
                                                                  titles:'重新申请支付',
                                                                  link:paymentAudit
                                                              })">{{$t('static.reapply')}}</button>
                                                            <a class="operate" v-if="item.type==1&&item.validate==3&&(initOrderDetail.orderStatus==30||initOrderDetail.orderStatus==item.orderStatus)" @click="applyInfo({
                                                                      show:true,
                                                                      sub:$index,
                                                                      bizId:item.orderId,
                                                                      bizSubId:item.id,
                                                                      loading:false,
                                                                      cur:1,
                                                                      currency:initOrderDetail.currency,
                                                                      amount:item.amount,
                                                                       country:initOrderDetail.country,
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
                                                                <img src="/static/images/reset.png" style="width:47px" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 合同 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                        link:'',
                                        crete:'contractList'
                                        })">
                                      <img class="pull-left" src="/static/images/dividePay.png" height="32" width="26" style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.contractList.arr.length!==null">
                                        {{$t('static.contract')}}（{{initOrderDetail.contractList.arr.length}}）
                                      </a>
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                      {{$t('static.contract')}}（0）
                                      </a>
                                      <span v-if="initOrderDetail.orderStatus==60&&initOrderDetail.logistics==40" style="color:red;font-size: 13px;padding-left: 10px;display:inline-block;line-height:27px">{{$t('static.quality_satisfied')}}！</span>
                                          <button type="button" class="btn btn-base pull-right" @click.stop="createcredence({
                                              show:true,
                                              orderId:initOrderDetail.id,
                                              route:uploadDocument,
                                              link:'/order/attachSubmit/',
                                              description:'',
                                              bizType:'order_contract',
                                              orderContractList:'',
                                              titles:'上传合同'
                                              })"
                                              v-if="initOrderDetail.contractList.arr.length!==null&&(initOrderDetail.validate==0||initOrderDetail.validate==-2)&&(initOrderDetail.orderStatus<20||initOrderDetail.orderStatus==70)&&param.contact=='/order/myList'">{{$t('static.new')}}</button>
                                      <button v-else></button>
                                  </h4>
                                    </div>
                                    <div class="panel-collapse" v-if="initOrderDetail.contractList.arr.length&&!initOrderDetail.contractList.show" v-cloak>
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>{{$t('static.file_type')}}</th>
                                                    <!-- 删除文件来源 <th>{{$t('static.file_origin')}}</th> -->
                                                    <th>文件名称</th>
                                                    <th>{{$t('static.file_path')}}</th>
                                                    <th>{{$t('static.description')}}</th>
                                                    <!-- 删除创建时间<th>{{$t('static.create_time')}}</th> -->
                                                    <th v-if="initOrderDetail.validate==0||initOrderDetail.validate==-2">操作</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initOrderDetail.contractList.arr">
                                                        <td>{{item.url | file}}</td>
                                                        <!-- 删除文件来源<td>{{item.bizType}}</td> -->
                                                        <th>{{item.name}}</th>
                                                        <td>
                                                            <img :src="item.url" v-if="item.url | isImage" @click="clickBig(item.url)" style="margin:auto" />
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                        <!-- 删除创建时间<td>{{item.ctime}}</td> -->
                                                        <td>
                                                            <!-- 下载 -->
                                                            <a href="{{item.url}}" download="" class="btn btn-default">下载<!-- <img src="/static/images/{{$t('static.img_upload')}}.png" style="margin:auto" /> --></a>
                                                            <button v-if="initOrderDetail.validate==0||initOrderDetail.validate==-2" class="btn btn-default" @click="deleteCompact({
                                                            id:item.id,
                                                            sub:$index,
                                                            show:true,
                                                            name:'合同凭证',
                                                            title:'合同凭证',
                                                            link:specDel,
                                                            url:'/customer/file/',
                                                            key:'contractList',
                                                            headline:'orderDetail'
                                                          })">{{$t('static.del')}}</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 支付凭证 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
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
                                                    <th>文件名称</th>
                                                    <th>{{$t('static.file_path')}}</th>
                                                    <th>{{$t('static.description')}}</th>
                                                    <th>{{$t('static.handle')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initOrderDetail.payPics.arr">
                                                        <td>{{item.url | file}}</td>
                                                        <td>{{item.name}}</td>
                                                        <td>
                                                            <img :src="item.url" v-if="item.url | isImage" @click="clickBig(item.url)" style="margin:auto" />
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                        <td><a href="{{item.url}}" download="" class='btn btn-default'>下载</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 上传附件 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
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
                                                    <th>文件名称</th>
                                                    <th>{{$t('static.file_path')}}</th>
                                                    <th>{{$t('static.description')}}</th>
                                                    <th>{{$t('static.handle')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initOrderDetail.attachFiles.arr">
                                                        <td>{{item.url | file}}</td>
                                                        <!--   <td>{{item.bizType}}</td> -->
                                                        <td>{{item.name}}</td>
                                                        <td>
                                                            <img :src="item.url" v-if="item.url | isImage" @click="clickBig(item.url)" style="margin:auto" />
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                        <td>
                                                            <a href="{{item.url}}" download="" class="btn btn-default">下载</a>
                                                            <button v-if="initOrderDetail.validate==0||initOrderDetail.validate==-2" class="btn btn-default" @click="deleteCompact({
                                                            id:item.id,
                                                            sub:$index,
                                                            show:true,
                                                            name:'附件',
                                                            title:'附件',
                                                            link:specDel,
                                                            url:'/customer/file/',
                                                            key:'attachFiles',
                                                            headline:'orderDetail'
                                                          })">{{$t('static.del')}}</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 物流凭证 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
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
                                          bizType:'order_send',
                                          sendPics:'',
                                          route:uploadDocument,
                                          titles:'上传物流凭证'
                                          })" v-if="initOrderDetail.sendPics.arr.length!==null&&param.contact=='/order/myList'&&param.orderStatus>=50">{{$t('static.new')}}</button>
                                      <!-- <button type="button" class="btn btn-base pull-right" v-if="param.contact=='/order/myList'"  @click.stop="">新建</button> -->
                                      <a v-else></a>
                                  </h4>
                                    </div>
                                    <div class="panel-collapse" v-if="initOrderDetail.sendPics.arr.length!==null&&!initOrderDetail.sendPics.show">
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>{{$t('static.file_type')}}</th>
                                                    <!-- <th>{{$t('static.file_origin')}}</th> -->
                                                    <th>文件名称</th>
                                                    <th>{{$t('static.file_path')}}</th>
                                                    <th>{{$t('static.description')}}</th>
                                                    <th>{{$t('static.handle')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initOrderDetail.sendPics.arr">
                                                        <td>{{item.url | file}}</td>
                                                        <td>{{item.name}}</td>
                                                        <td>
                                                            <img :src="item.url" v-if="item.url | isImage" @click="clickBig(item.url)" style="margin:auto" />
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                        <th><a href="{{item.url}}" download="" class="btn btn-default">下载</a></th>
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
    </div>
    <!-- <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
  <div class="container modal_con" v-show="param.show" >
      <div class="top-title">
          <span class="glyphicon glyphicon-remove-circle" @click="param.show=false"></span>
      </div>

     </div> -->
</template>
<script>
import editorderModel from './second_order/editOrderQa'
import credenceModel from '../order/createcredence'
import disposeModel from '../order/orderStatus'
import pictureModel from '../tips/pictureDialog'
import employeeModel from '../clientRelate/searchEmpInfo'
import purchaseModel from './second_order/toBePurchased'
import dividedModel from './second_order/newDivided'
import filter from '../../filters/filters'
import tipsModel from '../tips/tipDialog'
import auditModel from './second_order/orderAudit'
import applyModel from './second_order/applyDetaillist'
import mgLabel from '../mguan/mgLabel.vue'
import shadowModel from '../mguan/shadow.vue'
import deleteModel from '../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import confirmModel from '../serviceBaselist/breedDetailDialog/comfirm'
import chanceDetailModel from '../intention/chanceDetail'
import evaluateModel from '../intlIntention/evaluate'
import evaluationModel from './evaluationHistory'
import {
    initOrderDetail,
    initLinkOrder,
    initMyFundList,
    initLogin
} from '../../vuex/getters'
import {
    getOrderDetail,
    getLinkOrder,
    uploadDocument,
    dividedPayment,
    paymentAudit,
    getMyFundList,
    specDel,
    updateOrderLink,
    getEvaluation
} from '../../vuex/actions'
export default {
    components: {
        editorderModel,
        credenceModel,
        disposeModel,
        pictureModel,
        employeeModel,
        purchaseModel,
        dividedModel,
        filter,
        tipsModel,
        auditModel,
        applyModel,
        mgLabel,
        shadowModel,
        deleteModel,
        chanceDetailModel,
        evaluateModel,
        confirmModel,
        evaluationModel
    },
    props: ['param'],
    data() {
        return {
            title1:'',
            sourceType: {
                0: 'PC',
                1: 'android',
                2: 'wechart',
                3: 'ios'
            },
            type: {
                0: '采购',
                1: '销售'
            },
            show: true,
            credenceParam: {
                show: false,
                creCallback: ''
            },
            disposeParam: { //订单处理各个状态
                show: false,
                sales: false,
                handle: false,
                payment: false,
                Auditing: false,
                sendoff: false,
                express: false,
                delivery: false,
                tips: ''
            },
            pictureParam: {
                show: false,
                img: ''
            },
            tipsParam: {
                show: false,
                alert: true,
                name: ''
            },
            confirmParam : {
               show: false
            },
            divideParam: {
                show: false,
                loading: true,
                id: '',
                link: dividedPayment,
                url: '/order/updateStages/',
                stages: [],
                orderStatus: ''
            },
            auditParam: {
                show: false,
                id: ''
            },
            applyDetails: {
                show: false
            },
            deleteParam: {
                show: false
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: '',
                employeeId: '',
                employeeName: ''
            },

            purchaseParam: {
                link: "/order/updateOrderLink",
                show: false,
                sellId: this.param.id,
                sellEmployee: this.initLogin.id,
                goods: [], //订单中的商品
                orderLinkList: [], //订单中的待采购
                orderLinkBack: [], //备份初始的待采购信息（id）
                list: [], //goods和orderLinkList重组后的信息
                callback: this.callback
            },
            editParam: {
                show: false,
                key: "orderDetail",
                callback: this.getOrderDetail
            },
            chanceParam:{
                show:false,
                loading:false,
                id:''
            },
            historyParam:{
                show:false
            },
             evaluateParam:{
                show:false,
                ids:[],
                intentionId:this.param.id
            }
        }
    },
    vuex: {
        getters: {
            initOrderDetail,
            initLinkOrder,
            initMyFundList,
            initLogin
        },
        actions: {
            getOrderDetail,
            getLinkOrder,
            uploadDocument,
            dividedPayment,
            paymentAudit,
            getMyFundList,
            specDel,
            updateOrderLink,
            getEvaluation
        }
    },
    methods: {
        checkHistory:function(v,w){
        this.historyParam.show=true;
        this.historyParam.id=v;
        this.historyParam.name=w;
        this.historyParam.url='/order/getHistoryEvaluation';
        this.getEvaluation(this.historyParam);
        },
        enfoldment: function(param) {
            if (param.crete) {
                if (this.$store.state.table.orderDetail[param.crete].arr.length == 0) {
                    this.$store.state.table.orderDetail[param.crete].show = false;
                }
                this.$store.state.table.orderDetail[param.crete].show = !this.$store.state.table.orderDetail[param.crete].show;
            } else if (param.key) {
                if (this.$store.state.table.basicBaseList[param.key].arr.length == 0) {
                    this.$store.state.table.basicBaseList[param.key].show = false;
                }
                this.$store.state.table.basicBaseList[param.key].show = !this.$store.state.table.basicBaseList[param.key].show;
            }

        },
         removeByValue:function(arr, val) {
          for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
              arr.splice(i, 1);
              break;
            }
          }
        },
        loopTitle:function(){   //initOrderDetail.goods.arr
            var that = this;
            var allDetail=this.$store.state.table.orderDetail;
               allDetail.goods.arr.every(function (item) {
                if(allDetail.goods.selected.length==allDetail.goods.arr.length){
                       that.title1=true;  
                }else{
                      that.title1=false; 
                }
           })
        },
         onlyselected: function(sub) {
             var allDetail=this.$store.state.table.orderDetail;
            const _this = this;
             allDetail.goods.arr[sub].checked = !allDetail.goods.arr[sub].checked;
            if (!allDetail.goods.arr[sub].checked) {
                _this.checked = false;
                  this.removeByValue(allDetail.goods.selected,allDetail.goods.arr[sub].id);  
                  this.loopTitle();
            } else {
                _this.checked = true;
                 allDetail.goods.selected.push(allDetail.goods.arr[sub].id);
                  this.loopTitle(); 
                  allDetail.goods.arr.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })}
        },
        changeTitleChecked : function (data,event) {
            var allDetail=this.$store.state.table.orderDetail;
            var _this = this;
          if (event.target.checked === true) {
             this.title1=true;
            console.log("sadasda",this.title1)
            allDetail.goods.arr.forEach(function (item,i) {
            allDetail.goods.arr[i].checked=true && allDetail.goods.selected.push(item.id);
           })
          }else {
               this.title1=false;
               allDetail.goods.arr.forEach(function (item,i) {
               allDetail.goods.arr[i].checked=false;
               allDetail.goods.selected.length=0;
              })
          }
         
        },
         batchAccept: function(arr) {
           this.title1=false;
            var allDetail=this.$store.state.table.orderDetail;
           if (allDetail.goods.selected.length <= 0 ) {
            this.tipsParam.show = true;
            this.tipsParam.name = "请至少选择一条报价！";
            return;
           }
           else{
            this.evaluateParam.ids=allDetail.goods.selected;
           }      
           this.evaluateParam.link='/order/evaluateOrder';
           this.evaluateParam.show=true;
           this.evaluateParam.callback = this.evaluateCallback;
           this.evaluateParam.orderId=this.param.id;
           this.evaluateParam.page=1;
           this.evaluateParam.callback = this.evaluateCallback;
        },
        editPurchase: function() {
            this.purchaseParam.goods = this.initOrderDetail.goods.arr;
            this.purchaseParam.orderLinkList = this.initOrderDetail.orderLinkList.arr;
            this.purchaseParam.orderLinkBack = [];
            //获取list
            let goods = this.purchaseParam.goods;
            let orderLinkList = this.purchaseParam.orderLinkList;
            let result = [];
            for (let i = 0; i < goods.length; i++) {
                result.push(goods[i]);
                let temp = [];
                for (let k = 0; k < orderLinkList.length; k++) {
                    if (orderLinkList[k].sellGoodsId == goods[i].id) {
                        // 待报价条目所处的状态,0初始，1添加，2编辑,在actions中处理
                        //orderLinkList[k].flag = 0;
                        if (orderLinkList[k].id) {
                            this.purchaseParam.orderLinkBack.push(orderLinkList[k]);
                        }
                        temp.push(orderLinkList[k]);
                    }
                }
                result.push({
                    arr: temp,
                    breedId: goods[i].breedId,
                    breedName: goods[i].breedName,
                    unit: goods[i].unit,
                    sellGoodsId: goods[i].id,
                    show: true,
                    toBePurchased: true, //表示这是一个“待采购”
                });
            }
            this.purchaseParam.list = result;
            this.purchaseParam.show = true;
        },
        applyInfo: function(item) {

            this.auditParam = item;
            this.auditParam.callback = this.callback;
            if (item.titles == '重新申请审核' || item.titles == '重新申请支付') {
                this.getMyFundList(item);
                if (this.initMyFundList != '' && this.initMyFundList[0]) {

                    item.amount = this.initMyFundList[0].amount;
                    item.payName = this.initMyFundList[0].payName;
                    item.payUserName = this.initMyFundList[0].payUserName;
                    item.payNumber = this.initMyFundList[0].payNumber;
                    item.payWay = this.initMyFundList[0].payWay;
                    item.paySubName = this.initMyFundList[0].paySubName;
                    item.images = this.initMyFundList[0].images;
                    item.currency = this.initMyFundList[0].currency;
                    item.comment = this.initMyFundList[0].comment;
                    this.auditParam.show = true;
                } else {
                    this.auditParam.show = false;
                }
            } else {
                this.auditParam.show = true;
            }

        },
        confirm: function(param) {
            this.confirmParam = param;
            this.confirmParam.callback = this.confirmCallback;
        },
       confirmCallback: function(name) {
            this.confirmParam.show = false;
            this.showTips(name);
            this.$emit('evaluate-add', '');
           
        },
        //添加评价
        addEval:function(v){
        console.log("SAdsadsadsadsadsadsaftfv",v)
        this.evaluateParam.ids=[]
        this.evaluateParam.link='/order/evaluateOrder';
        this.evaluateParam.ids.push(v);
        this.evaluateParam.orderId=this.param.id;
        this.evaluateParam.show=true;
        this.evaluateParam.page=1;
        this.evaluateParam.callback = this.evaluateCallback;
        },
        evaluateCallback: function(name) {
            this.evaluateParam.show = false;
            this.showTips(name);
            this.getOrderDetail(this.param);
        },
        showTips: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
        },
        deleteCompact: function(item) {
            this.deleteParam = item;
            this.deleteParam.show = true;
        },
        apply_Record: function(item) {
            this.applyDetails.show = true;
            this.applyDetails = item;
        },
        divided_payments: function(id, total, stages) {
            this.divideParam.show = true;
            this.divideParam.id = id;
            this.divideParam.total = total;
            this.divideParam.stages = stages.arr;
            this.divideParam.callback = this.callback;
        },
        linkDetail: function(detail) { //关联采购详情
            this.param.id = detail.id;
            this.getOrderDetail(this.param);
        },
        createcredence: function(initOrderDetail) {
            this.credenceParam = initOrderDetail;

            this.credenceParam.creCallback = this.pictureCallback;
        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        pendingOrder: function(initOrderDetail) {
            this.disposeParam = initOrderDetail;
            /*this.disposeParam = this.param;*/
            this.disposeParam.show = true;

        },
        callback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getOrderDetail(this.param);
        },
        pictureCallback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getOrderDetail(this.param);
        },
        editQa: function(item, data, type) {
            console.log(this.initOrderDetail)
            this.editParam.show = true
            this.editParam.breedName = item.breedName
            this.editParam.qa_standard = item.qaStandard
            this.editParam.qa_self = item.qaSelf
            this.editParam.sample_traded = item.sampleTraded
            this.editParam.sample = data
            this.editParam.ids = item.id
            this.editParam.type = type
            this.editParam.id = this.initOrderDetail.id
        },
        showIntent:function(id){
            this.chanceParam.id = id
            this.chanceParam.show = true

        }
    },
    filter: (filter, {}),
    events: {

    },
    created() {
        console.log("asgudash",this.param)
        this.getOrderDetail(this.param);
        this.getLinkOrder(this.param);
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

.breed_action {
    top: 10px;
    right: 35px;
    padding: 0 2px;
}

.breed_action dl dt {
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
.clickMore{
    margin-left:25px;
    width:80px;
    font-size:8px;
    color:blue; 
    -webkit-transform-origin-x:0;
    -webkit-transform: scale(0.70);
    cursor: pointer;
}

/* .downloadbtn{
    display: inline-block;
    border:1px solid #ccc;
    background-color:#fff;
    color:#333;
    padding: 6px 12px;
    border-radius: 5px;
    font-size:13px;
    margin-bottom: 0px;
    cursor: pointer;
    user-select: none;
} */

.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
}

.table>tbody>tr>td img {
    width: 100px;
    margin: 0
}

.table>tbody>tr>td a img {
    width: auto;
}

.table {
    display: table;
}

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

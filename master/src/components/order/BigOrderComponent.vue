<template>
    <div>
        <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
        <createorder-model :param="createParam" v-if="createParam.show"></createorder-model>
        <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <employee-model :param="transferParam" v-if="transferParam.show"></employee-model>
        <cancel-model :param="cancelParam" v-if="cancelParam.show"></cancel-model>
        <cancel-model :param="cancelFlowParam" v-if="cancelFlowParam.show"></cancel-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <language-model v-show="false"></language-model>
        <applysend-model :param="applyParam" v-if="applyParam.show"></applysend-model>
        <reapply-model :param="reapplyParam" v-if="reapplyParam.show"></reapply-model>
        <record-model :param="recordParam" v-if="recordParam.show"></record-model>
        <contract-model :param="contractParam" v-if="contractParam.show"></contract-model>
        <saleapply-model :param="applicationParam" v-if="applicationParam.show"></saleapply-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear">
                    <div class="clear left">
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order_no')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.no" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order')}}ID：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.id" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.consignee_name')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consignee" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.consignee_phone')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consigneePhone" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="clear left">
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
                        <dd class="left">
                            <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="0">{{$t('static.purchase')}}</option>
                                <option value="1">{{$t('static.sell')}}</option>
                                <option value="2">预售</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.order_status')}}：</dt>
                        <dd class="left">
                            <select v-model="loadParam.orderStatus" class="form-control" @change="selectSearch()">
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="0">{{$t('static.create_order')}}</option>
                                <!-- <option value="10">{{$t('static.pending')}}</option> -->
                                <option value="20">{{$t('static.wait_for_payment')}}</option>
                                <option value="30">{{$t('static.wait_for_audit')}}</option>
                                <option value="40">{{$t('static.wait_for_delivery')}}</option>
                                <option value="50">{{$t('static.wait_for_receiving')}}</option>
                                <option value="60">{{$t('static.awaiting_comment')}}</option>
                                <option value="70">{{$t('static.order_over')}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">是否样品：</dt>
                        <dd class="left">
                            <select class="form-control" v-model="loadParam.sample" @change="selectSearch()">
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="0">{{$t('static.no')}}</option>
                                <option value="1">{{$t('static.yes')}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <div class="left">
                            <dt class="left transfer marg_top">起止时间：</dt>
                            <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                        <div class="left">
                            <dt class="left marg_top">~~</dt>
                            <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                    </dl>
                </div>
                <div class="clear left">
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.trading_patterns')}}：</dt>
                        <dd class="left">
                            <select v-model="loadParam.mode" class="form-control" @change="selectSearch()">
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="1">{{$t('static.together')}}</option>
                                <option value="2">{{$t('static.three_side')}}</option>
                                <option value="3">{{$t('static.self_support')}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">审核状态：</dt>
                        <dd class="left">
                            <select v-model="loadParam.validate" class="form-control" @change="selectSearch()">
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="0">未审核</option>
                                <option value="1">待审核</option>
                                <option value="2">审核通过</option>
                                <option value="-2">审核未通过</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.order_source')}}：</dt>
                        <dd class="left">
                            <select class="form-control" v-model="loadParam.sourceType" @change="selectSearch()">
                                <!-- 0/1/2/3/4/5 新建/意向/报价/样品申请/库存/待采购 -->
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="0">{{$t('static.new')}}</option>
                                <option value="1">{{$t('static.intention')}}</option>
                                <option value="2">{{$t('static.quoted_price')}}</option>
                                <option value="3">样品申请</option>
                                <option value="4">库存</option>
                                <option value="5">待采购</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer" v-if="showonAll">
                        <dt class="left transfer marg_top">部门：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.orgName" placeholder="请选择部门" readonly="true" @click="selectOrg()" />
                        </dd>
                    </dl>
                    <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer" v-if='showExport'>
                        <dt class="left transfer marg_top" style="letter-spacing:3px">所属业务员：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" readonly="true" @click="selectEmployee()">
                        </dd>
                    </dl>
                    <button class="new_btn transfer" v-if="showExport" @click="selectSearch()"><a href="/crm/api/v1/order/exportExcel?{{exportUrl}}">导出订单</a></button>
                    <button type="button" class="new_btn transfer" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                    <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
                </div>
                <div class="right">
                    <button class="btn btn-default transfer" v-if='!showExport' @click="newOrder()">{{$t('static.new')}}</button>
                    <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead>
                        <tr>
                            <th>{{$t('static.transcation')}}</th>
                            <th>{{$t('static.order_type')}}</th>
                            <th>{{$t('static.trading_patterns')}}</th>
                            <th>{{$t('static.sample_order')}}</th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.breed')}}</th>
                            <th>商品图片</th>
                            <th>{{$t('static.transcation_amount')}}</th>
                            <th>{{$t('static.wait_payment')}}</th>
                            <th>{{$t('static.paid')}}</th>
                            <th>{{$t('static.currency')}}</th>
                            <th>{{$t('static.salesman')}}</th>
                            <th>{{$t('static.consignee_consigner_name')}}</th>
                            <th>{{$t('static.consignee_phone')}}</th>
                            <th>{{$t('static.consignee_address')}}</th>
                            <th>{{$t('static.payment_method')}}</th>
                            <th>{{$t('static.order_status')}}</th>
                            <th>{{$t('static.order_source')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th>{{$t('static.comment')}}</th>
                            <th style="width:133.75px" v-if='!showonAll'>{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initAllOrderlist" v-cloak>
                            <td>{{item.tradeTime | subtime}}</td>
                            <td>
                                <div v-if="item.type==1&&item.pre==0">{{$t('static.sell')}}</div>
                                <div v-if="item.type==0&&item.pre==0">{{$t('static.purchase')}}</div>
                                <div v-if="item.type==1&&item.pre==1">预售</div>
                            </td>
                            <td>
                                <div v-if="item.mode==1">{{$t('static.together')}}</div>
                                <div v-if="item.mode==2">{{$t('static.three_side')}}</div>
                                <div v-if="item.mode==3">{{$t('static.self_support')}}</div>
                            </td>
                            <td>
                                <div v-if="item.sample==0">{{$t('static.no')}}</div>
                                <div v-if="item.sample==1">{{$t('static.yes')}}</div>
                            </td>
                            <td><a @click="clickOn({
                                  show:true,
                                  id:item.id,
                                  loading:false,
                                   key:'orderDetail',
                                  orderStatus:item.orderStatus,
                                  contact:''
                          })">{{item.customerName}}</a></td>
                            <td>{{item.goodsDesc}}</td>
                            <td>
                                <div v-if="item.sourceType==1&&item.goods[0].image!=''">
                                    <img v-bind:src="item.goods[0].image" style="width:40px" @click="clickBig(item.goods[0].image)">
                                </div>
                            </td>
                            <td>{{item.total}}</td>
                            <td>{{item.unpaid}}</td>
                            <td>{{item.prepaid}}</td>
                            <td>{{item.currency | Currency}}</td>
                            <td>{{item.employeeName}}</td>
                            <td>{{item.consignee}}</td>
                            <td>{{item.consigneePhone}}</td>
                            <td>
                                <Poptip placement="top" trigger="hover">
                                    <span v-if="item.consigneeAddr">{{item.consigneeAddr | textDisplay '5'}}</span>
                                    <span v-else>未填写详细地址</span>
                                    <div class="api" slot="content">
                                        {{item.countryName}} {{item.provinceName}} {{item.cityName}} {{item.districtName}} {{item.consigneeAddr}}
                                    </div>
                                </Poptip>
                            </td>
                            <td v-if="item.payWay===0">{{$t('static.offline')}}</td>
                            <td v-if="item.payWay==1">{{$t('static.alipay')}}</td>
                            <td v-if="item.payWay==2">{{$t('static.pingan')}}</td>
                            <td v-if="item.payWay==3">{{$t('static.yaokuan')}}</td>
                            <td v-if="item.payWay==4">WeChat</td>
                            <td v-if="item.payWay!=0&&item.payWay!=1&&item.payWay!=2&&item.payWay!=3&&item.payWay!=4">{{$t('static.none')}}</td>
                            <td v-if="this.language=='zh_CN'">
                                <div>{{item.orderStatus | assess item.type item.logistics item.verifierName item.taskKey}}</div>
                                <div v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</div>
                                <div v-if="item.orderStatus==0" style="background:#fa6705;color:#fff">{{$t('static.create_order')}}</div>
                            </td>
                            <td v-if="this.language=='en'">
                                <div>{{item.orderStatus | Enassess item.type item.logistics item.verifierName item.taskKey}}</div>
                                <div v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</div>
                                <div v-if="item.orderStatus==0" style="background:#fa6705;color:#fff">{{$t('static.create_order')}}</div>
                            </td>
                            <td>
                                <span v-if="item.sourceType==0">{{$t('static.new')}}</span>
                                <span v-if="item.sourceType==1">{{$t('static.intention')}}</span>
                                <span v-if="item.sourceType==2">{{$t('static.quote')}}</span>
                                <span v-if="item.sourceType==3">{{$t('static.sample_order')}}</span>
                                <span v-if="item.sourceType==4">库存</span>
                                <span v-if="item.sourceType==5">待采购</span>
                            </td>
                            <td>
                                <div v-if="item.validate==0">{{$t('static.wait_approval')}}</div>
                                <div v-if="item.validate==1">{{$t('static.approving')}}(待{{item.verifierName}}审核)</div>
                                <div v-if="item.validate==2" style="background:green;color:#fff">{{$t('static.approved')}}</div>
                                <div v-if="item.validate==-2" style="background:red;color:#fff">{{$t('static.unapproved')}}</div>
                            </td>
                            <td>
                                <Poptip placement="left" trigger="hover">
                                    <span>{{item.comments | textDisplay '5'}}</span>
                                    <div class="api" slot="content">
                                        {{item.comments}}
                                    </div>
                                </Poptip>
                            </td>
                            <!--   操作状态 -->
                            <td v-if='!showonAll'>
                                <button v-if='!showTransfer' class="btn btn-primary btn-xs" v-if="(item.validate==0||item.validate==-2)&&item.orderStatus!==-1" @click="updateOrder({
                                        show:true,
                                        id:item.id,
                                        index:$index,
                                        type:item.type,
                                        consigner:item.consigner,
                                        consignerName:item.consignerName,
                                        sourceType:0,
                                        sample:item.sample,
                                        intl:item.intl,
                                        customer:item.customer,
                                        currency:item.currency,
                                        consigner:item.consigner,
                                        verifierName:item.verifierName,
                                        consignee:item.consignee,
                                        consigneePhone:item.consigneePhone,
                                        customerPhone:item.consigneePhone,
                                        zipCode:item.zipCode,
                                        country:item.country,
                                        countryName:item.countryName,
                                        province:item.province,
                                        provinceName:item.provinceName,
                                        city:item.city,
                                        cityName:item.cityName,
                                        employee:item.employee,
                                        customerName:item.customerName,
                                        org:item.org,
                                        tradeTime:item.tradeTime,
                                        district:item.district,
                                        districtName:item.districtName,
                                        orderStatus:item.orderStatus,
                                        consigneeAddr:item.consigneeAddr,
                                        comments:item.comments,
                                        validate:item.validate,
                                        freight:item.freight,
                                        freightType:item.freightType,
                                        incidentals:item.incidentals,
                                        incidentalsDesc:item.incidentalsDesc,
                                        preferential:item.preferential,
                                        preferentialDesc:item.preferentialDesc,
                                        status:item.status,
                                        total:item.total,
                                        cost:item.cost,
                                        key:'myOrderList',
                                        link:alterOrder,
                                        url:'/order/',
                                        goods:item.goods,
                                        goodsBack:[]
                                        },item.goods)">{{$t('static.edit')}}
                                </button>
                                <!-- 取消订单,在订单状态为20和70或者新建的订单还未申请审核可以取消，并说明原因 -->
                                <!-- <button class="btn btn-warning btn-apply" v-if="item.orderStatus==20||item.orderStatus==70||(item.orderStatus==0&&item.validate==0)" @click="cancelOrder(item.id,$index)">
                                    取消订单
                                </button> -->
                                <!-- 新的取消订单流程，分三个阶段
                                    1.未申请审核或审核不通过阶段（validate<=0)，
                                    2.申请审核阶段（validate=1），不能取消
                                    3.审核完成后，validate=2 
                                    并且订单完成后无法取消-->
                                <div v-if="item.orderStatus<60">
                                    <!-- 普通订单（非预售）处于1阶段时，可以直接取消 -->
                                    <button v-show='!showTransfer' style="width:100px" class="btn btn-danger btn-xs" v-if="item.validate<=0&&(item.pre!=1||(item.pre==1&&item.type==0))" @click="cancelOrder(item.id,$index)">
                                        取消订单
                                    </button>
                                    <!-- 预售订单处于1阶段时，需要走流程 -->
                                    <button v-show='!showTransfer' class="btn btn-primary btn-base" v-if="item.validate<=0&&item.pre==1&&item.type==1&&item.cancel==0" @click="cancelOrderByFlow(item.id)">
                                        申请取消订单
                                    </button>
                                    <!-- 所有订单处于3阶段时，需要走流程 -->
                                    <button v-show='!showTransfer' class="btn btn-primary btn-base" v-if="item.validate==2&&item.cancel==0" @click="cancelOrderByFlow(item.id)">
                                        申请取消订单
                                    </button>
                                </div>
                                <div v-show='!showTransfer' v-if="item.validate==2">
                                    <button class="btn btn-danger" @click="clickOn({
                                                show:true,
                                                id:item.id,
                                                loading:true,
                                                key:'orderDetail',
                                                orderStatus:item.orderStatus,
                                                contact:'/order/myList'
                                        })" v-if="(item.orderStatus==20||item.orderStatus==10)&&item.type==0">{{$t('static.apply_payment')}}
                                    </button>
                                    <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==30&&item.type==0">
                                        <img v-bind:src="/static/images/$t('static.img_paid').png" title="待客户收款" alt="待客户收款" />
                                    </a>
                                    <!-- 申请收款按钮 -->
                                    <button class="btn btn-warning btn-xs" @click="clickOn({
                                            show:true,
                                            id:item.id,
                                            loading:true,
                                            key:'orderDetail',
                                            orderStatus:item.orderStatus,
                                            contact:'/order/myList'
                                    })" v-if="(item.orderStatus==20||item.orderStatus==30)&&item.type==1">{{$t('static.apply_income')}}
                                    </button>
                                    <!-- 销售订单发货流程start-->
                                    <button class="btn btn-danger btn-xs" @click="applySend(item,$index)" v-if="item.orderStatus==40&&item.type==1&&item.logistics==0">{{$t('static.apply_send')}}
                                    </button>
                                    <a class="operate" v-if="item.orderStatus==40&&item.type==1&&item.logistics==1&&item.taskKey=='order_send_governor_validate'" style="color:#333;">{{$t('static.management_approval')}}</a>
                                    <button class="btn btn-danger btn-xs" @click="reapplySend(item,$index)" v-if="item.orderStatus==40&&item.logistics==-1&&item.type==1&&item.verifier==item.employee">{{$t('static.reapply_delivery')}}
                                    </button>
                                    <!-- 发货 -->
                                    <button class="btn btn-warning btn-xs" @click="pendingOrder(item,$index)" v-if="item.orderStatus==40&&item.logistics==1&&item.type==1&&item.taskKey=='order_send_warehouse_validate'&&item.verifier==item.employee">{{$t('static.shipped')}}
                                    </button>
                                    <!-- 销售订单发货流程end -->
                                    <button class="btn btn-success btn-xs" @click="pendingOrder(item,$index)" v-if="item.orderStatus ==60&&item.type==0&&(item.logistics==3||item.logistics==2)">{{$t('static.quality_satisfied')}}
                                    </button>
                                    <button class="btn btn-success btn-xs" @click="pendingOrder(item,$index)" v-if="item.orderStatus ==70&&item.type==0">{{$t('static.order_over')}}
                                    </button>
                                    <button class="btn btn-success btn-xs" @click="pendingOrder(item,$index)" v-if="item.orderStatus==60&&item.type==1&&(item.logistics==3||item.logistics==2)">{{$t('static.quality_satisfied')}}
                                    </button>
                                    <button class="btn btn-danger btn-xs" @click="addContract({
                                            show:true,
                                            sub:$index,
                                            orderId:item.id,
                                            total:item.total,
                                            adjusted:'',
                                            comment:'',
                                            contractText:'',
                                            url:'/order/quality/contract/start',
                                            link:applyContract,
                                            titles:this.$t('static.supply_contract'),
                                            images:''
                                          })" v-if="item.orderStatus==60&&(item.logistics==3||item.logistics==2)">{{$t('static.supply_contract')}}
                                    </button>
                                    <button class="btn btn-danger btn-xs" @click="afterSales({
                                            show:true,
                                            loading:false,
                                            sub:$index,
                                            flag:0,
                                            orderId:item.id,
                                            id:item.id,
                                            goods:item.goods,
                                            consignee:'',
                                            comment:'',
                                            shipper:'',
                                            type:'',
                                            url:'/order/quality/after/sales/start',
                                            link:afterSalesApply,
                                            titles:this.$t('static.apply_sales'),
                                            images:''
                                          })" v-if="item.orderStatus==60&&(item.logistics==3||item.logistics==2)">{{$t('static.apply_sales')}}
                                    </button>
                                    <!-- <button class="btn btn-danger"  @click="pendingOrder(item,$index)" v-if="item.orderStatus ==60&&item.type==1&&item.logistics==2" style="background:#fff;color:#eea236;padding:1px 5px;">确认收货
                                        </button> -->
                                    <button class="btn btn-danger btn-xs" @click="pendingOrder(item,$index)" v-if="item.orderStatus==10&&item.type==1">{{$t('static.pending_payment')}}</button>
                                    <button class="btn btn-danger btn-xs" @click="pendingOrder(item,$index)" v-if="item.orderStatus==50&&item.type==0">{{$t('static.receive')}}
                                    </button>
                                    <button class="btn btn-danger btn-xs" @click="pendingOrder(item,$index)" v-if="item.orderStatus==40&&item.type==0">{{$t('static.pending_shipped')}}
                                    </button>
                                    <button class="btn btn-primary btn-xs" @click="pendingOrder(item,$index)" v-if="item.orderStatus==50&&item.type==1">{{$t('static.receive')}}
                                    </button>
                                    <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==0">
                                        <img v-bind:src="/static/images/$t('static.img_handle').png" title="订单待处理" alt="订单待处理" />
                                    </a>
                                </div>
                                <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==-1">
                                    <img v-bind:src="/static/images/$t('static.img_canceled').png" title="订单已取消" alt="订单已取消" />
                                </a>
                                <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==-2">
                                    <img v-bind:src="/static/images/$t('static.deadline').png" title="订单已过期" alt="订单已过期" />
                                </a>
                                <!-- 申请审核,当订单开始取消后，不能再申请 -->
                                <button v-show='!showTransfer' class="btn btn-default btn-apply" @click="orderCheck(item.id,$index,item.validate)" v-if="item.validate==0&&(item.orderStatus==0||item.orderStatus==70)&&item.cancel==0">{{$t('static.review_application')}}</button>
                                <button v-show='!showTransfer' class="btn btn-default btn-apply" @click="orderCheck(item.id,$index,item.validate)" v-if="item.validate==-2&&(item.orderStatus==0||item.orderStatus==70)&&item.cancel==0">{{$t('static.reapply')}}</button>
                                <button v-show='!showTransfer' class="btn btn-warning btn-xs" @click="showRecord(item)" v-if="item.validate!=0">审核记录</button>
                                <!--      取消订单,在订单状态为20和70或者新建的订单还未申请审核可以取消，并说明原因 -->
                                <button v-show='!showTransfer' class="btn btn-warning btn-apply" v-if="item.orderStatus==20||item.orderStatus==70||(item.orderStatus==0&&item.validate==0)" @click="cancelOrder(item.id,$index)">
                                    取消订单
                                </button>
                                <!--   审核取消订单,当取消状态是1时，需要部门主管审核 -->
                                <button v-show='!showTransfer' class="btn btn-warning btn-apply" v-if="item.cancel==1" @click="">
                                    审核取消订单
                                </button>
                                <!--  订单划转到任意一个业务员 -->
                                <button v-if='showTransfer' class="btn btn-warning btn-apply" v-if="(item.orderStatus==0||item.orderStatus==10)&&item.validate==0" @click="transferToEmployee(item,$index)">
                                    划转
                                </button>
                                <!--  审核 -->
                                <button class="btn btn-warning btn-apply" v-if="item.validate==1&&(item.verifier == $store.state.table.login.id)" @click="orderCheck(item.id,$index)">
                                    {{$t('static.verified')}}
                                </button>
                                <!-- 审核发货 -->
                                <button class="btn btn-warning" v-if="item.validate==2&&(item.verifier == $store.state.table.login.id)&&item.logistics==1&&(item.taskKey=='order_send_governor_validate'||item.taskKey=='financial_validate')" @click="orderSend(item.id,$index)" style="background:#fff;color:#eea236;padding:1px 3px;">{{$t('static.verified')}}{{$t('static.shipped')}}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
        <div style="font-size:14px;white-space: normal" v-if='showonAll'>
            <span style="margin-left:1%;color:red">总金额：{{initAllOrderStatis.totalSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;color:red">已支付金额：{{initAllOrderStatis.prepaidSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;color:red">未支付金额：{{initAllOrderStatis.unpaidSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">成本总金额：{{initAllOrderStatis.costSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">商品总金额：{{initAllOrderStatis.amountSum  | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">订单数量：{{initAllOrderStatis.orderCount | money}}笔</span>
            <span style="margin-left:1%;">特惠总金额：{{initAllOrderStatis.preferentialSum  | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">杂费总金额：{{initAllOrderStatis.incidentalsSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
        </div>
        <div style="font-size:14px;white-space: normal;" v-if='showMoney'>
            <span style="margin-left:1%;color:red">{{$t('static.total_money')}}：{{initOrgOrderStatis.totalSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;color:red">{{$t('static.paid_amount')}}：{{initOrgOrderStatis.prepaidSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;color:red">{{$t('static.unpaid_amount')}}：{{initOrgOrderStatis.unpaidSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">{{$t('static.costprice')}}：{{initOrgOrderStatis.costSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">{{$t('static.order_total')}}：{{initOrgOrderStatis.amountSum  | money}} {{initOrgOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">{{$t('static.order_num')}}：{{initOrgOrderStatis.orderCount | money}}笔</span>
            <span style="margin-left:1%;">{{$t('static.discount')}}：{{initOrgOrderStatis.preferentialSum  | money}} {{initOrgOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">{{$t('static.extra_total')}}：{{initOrgOrderStatis.incidentalsSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
        </div>
    </div>
</template>
<script>
import createorderModel from './createOrderDialog'
import pagination from '../pagination'
import editorderModel from '../order/orderInformationDialog'
import detailModel from '../order/orderDetail'
import pictureModel from '../tips/pictureDialog'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import disposeModel from '../order/orderStatus'
import tipsdialogModel from '../tips/tipDialog'
import auditModel from '../../components/tips/auditDialog'
import breedsearchModel from '../intention/breedsearch'
import selectorgModel from '../../components/tips/treeDialog'
import cancelModel from './cancleMsg'
//单个业务员搜索
//
import employeeModel from '../clientRelate/searchEmpInfo'
import filter from '../../filters/filters'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'


import applysendModel from '../order/second_order/orderAudit'
import reapplyModel from '../tips/auditDialog'
import contractModel from '../order/second_order/contractItems'
import saleapplyModel from '../order/second_order/afterSalesApply'
import recordModel from '../record/record'


import {
    getList,
    initAllOrderlist,
    initAllOrderStatis,
    initMyOrderlist,
    initLogin,
    initOrgOrderlist,
    initOrgOrderStatis
} from '../../vuex/getters'
import {
    getOrderList,
    getOrderStatistical,
    alterOrder,
    createOrder,
    orderStatu,
    getOrderDetail,
    orderOrgAudit,
    getEmpolyeeOrder,
    applyContract,
    afterSalesApply,
    orderCancle,
    orderCancleApply,
    getOrgOrder,
    transferOrder
} from '../../vuex/actions'
export default {
    components: {
        changeMenu,
        applysendModel,
        reapplyModel,
        recordModel,
        contractModel,
        saleapplyModel,
        editorderModel,
        filter,
        languageModel,
        pagination,
        detailModel,
        pictureModel,
        deletebreedModel,
        disposeModel,
        tipsdialogModel,
        auditModel,
        mglistModel,
        selectorgModel,
        employeeModel,
        breedsearchModel,
        createorderModel,
        cancelModel
    },
    data() {
        return {
            showonAll: '', //部门搜索只在全部订单显示
            showExport: '', //是否显示导出订单
            showTransfer: '', //操作状态中的划转只在org显示
            orderPageID: '', //订单页id
            showMoney: '',
            key: ['orgOrderList', 'allOrderList'],
            url: ['/order/myList', '/order/sectionList', '/order/'],
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                show: false,
                cur: 1,
                all: 1,
                total: 0,
                org: this.initLogin.orgId,
                employee: this.initLogin.id,
                link: '/order/',
                key: 'allOrderList',
                breedId: '',
                breedName: '',
                employeeId: '',
                employeeName: '',
                consignee: '',
                consigneePhone: '',
                type: '',
                orderStatus: '',
                payWay: '',
                clients: '',
                dataStatus: '',
                no: '',
                org: '',
                orgName: '',
                startTime: '',
                endTime: '',
                mode: '',
                validate: '',
                sample: '',
                sourceType: ''
            },
            selectOrgParam: {
                show: false,
                orgId: '',
                orgName: '',
                callback: this.callback,
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: "",
                //单个业务员搜索
                employeeId: '',
                employeeName: '',

            },
            applicationParam: {
                show: false
            },
            applyParam: {
                show: false,
                orderId: '',
                sub: '',
                titles: '申请发货',
                description: '',
                callback: '',
                logistics: ''
            },
            reapplyParam: {
                show: false,
                orderId: '',
                sub: '',
                titles: '',
                auditComment: '',
                callback: '',
                logistics: ''
            },
            recordParam: {
                loading: true,
                link: '/flow/flowRecord',
                bizType: 'order_validate',
                bizId: '',
                show: false,
            },
            //直接取消
            cancelParam: {
                show: false,
                index: '',
                id: '',
                cancleCauses: '',
                link: '/order/cancle',
                key: 'myOrderList',
                callback: this.orderCancle, //cancelMsg.vue中会执行此方法
                cancelBack: this.cancelBack //取消成功后会调用此方法(action中执行)
            },
            //走流程申请取消
            cancelFlowParam: {
                show: false,
                id: '', //取消订单记录的ID号（非订单ID）
                validate: '', //取消订单记录的审核状态
                orderId: '',
                cancleCauses: '',
                link: '/order/flow/cancel/request',
                callback: this.orderCancleApply,
                cancelBack: this.cancelBack //取消成功后会调用此方法(action中执行)
            },
            //新建order
            createParam: {
                show: false,
                title1: this.$t('static.new_order'),
                type: 1,
                pre: 0,
                sourceType: 0,
                sample: 0,
                intl: '',
                customer: '',
                currency: '',
                tradeTime: '',
                addressId: '', //地址ID，如果为空，表示是新增的收货地址,否则是已存在的收货地址
                consignee: '',
                consigneePhone: '',
                consigner: '', //发货人,(销售订单时，是业务员ID，采购订单时，是""，不填)
                consignerName: '', //发货人名
                zipCode: '',
                country: '',
                province: '',
                city: '',
                employee: this.initLogin.id,
                org: this.initLogin.orgId,
                district: '',
                consigneeAddr: '',
                customerName: '',
                customerPhone: '',
                comments: '',
                freight: 0,
                freightType: 1, //0/1，我方支付/客户支付（默认）
                incidentals: 0,
                incidentalsDesc: '',
                preferential: 0,
                preferentialDesc: '',
                payWay: '',
                total: '',
                cost: '',
                orderStatus: 0,
                goods: [ //多个商品

                ],
                link: createOrder,
                key: 'myOrderList',
                callback: '' //成功后的回调函数

            },
            breedSearchParam: {
                show: false
            },
            dialogParam: {
                show: false
            },
            updateParam: {
                show: false,
            },
            detailParam: {
                show: false
            },
            pictureParam: {
                show: false,
                img: ''
            },
            contractParam: {
                show: false
            },
            updateorderParam: {
                show: false
            },
            transferParam: { //划转订单
                show: false,
                link: '/order/transferToEmployee',
                callback: '',
                employee: '',
                id: '',
                user: '' //在这里无效，主要是为了配合注册客户订单的划转
            },
            employeeStatus: 0, //表示是哪个地方用到了选择业务员的模块,初始为0,1表示搜索，2表示划转订单
            language: '',
            disposeParam: { //订单处理各个状态
                show: false,
                sales: false,
                handle: false,
                payment: false,
                Auditing: false,
                sendoff: false,
                express: false,
                delivery: false
            },
            auditParam: {
                show: false,
                audit: true,
                indexs: [], //批量审核使用,暂停用
                ids: [], //批量审核使用,暂停用
                id: '',
                index: '',
                auditComment: '',
                validate: '',
                title: "部门订单审核",
                key: "orgOrderList",
                pass: this.auditPass,
                reject: this.auditReject,
            },

            tipsParam: {
                show: false,
                alert: true,
                name: "请选择要审核的订单"
            },
            show: true
        }
    },
    computed: {
        exportUrl: function() {
            let url = "org=" + this.loadParam.org;
            if (this.loadParam.orderStatus) {
                url += "&orderStatus=" + this.loadParam.orderStatus;
            }
            if (this.loadParam.type) {
                url += "&type=" + this.loadParam.type;
            }
            if (this.loadParam.consignee) {
                url += "&consignee=" + this.loadParam.consignee;
            }
            if (this.loadParam.consigneePhone) {
                url += "&consigneePhone=" + this.loadParam.consigneePhone;
            }
            if (this.loadParam.mode) {
                url += "&mode=" + this.loadParam.mode;
            }
            if (this.loadParam.validate) {
                url += "&validate=" + this.loadParam.validate;
            }
            if (this.loadParam.breedId) {
                url += "&breedId=" + this.loadParam.breedId;
            }
            if (this.loadParam.employeeId) {
                url += "&employee=" + this.loadParam.employeeId;
            }
            if (this.loadParam.startTime) {
                url += "&startTime=" + this.loadParam.startTime;
            }
            if (this.loadParam.endTime) {
                url += "&endTime=" + this.loadParam.endTime;
            }
            return url;
        }
    },
    vuex: {
        getters: {
            getList,
            initAllOrderlist,
            initAllOrderStatis,
            initMyOrderlist,
            initLogin,
            initOrgOrderlist,
            initOrgOrderStatis
        },
        actions: {
            getOrderList,
            getOrderStatistical,
            alterOrder,
            createOrder,
            orderStatu,
            getOrderDetail,
            orderOrgAudit,
            getEmpolyeeOrder,
            applyContract,
            afterSalesApply,
            orderCancle,
            orderCancleApply,
            getOrgOrder,
            getOrderStatistical,
            transferOrder
        }
    },
    methods: {
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectOrg: function() {
            this.selectOrgParam.show = true;
        },
        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        callback: function() {
            if (this.selectOrgParam.orgId) {
                this.loadParam.org = this.selectOrgParam.orgId;
                this.loadParam.orgName = this.selectOrgParam.orgName;

                this.employeeParam.orgId = this.selectOrgParam.orgId;
                this.selectSearch();
            }
        },
        newOrder: function() {
            //新建订单时将一些之前填入的信息清空
            this.createParam.goods = [];
            this.createParam.total = "";
            this.createParam.cost = "";
            this.createParam.freight = 0;
            this.createParam.incidentals = 0;
            this.createParam.preferential = 0;
            this.createParam.show = true;
            this.createParam.callback = this.newBack;
        },
        //售后
        afterSales: function(sales) {
            this.applicationParam = sales;
            this.applicationParam.show = true;
            this.applicationParam.callback = this.afterSalesBack;
        },
        afterSalesBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.applicationParam.show = false;
            this.getEmpolyeeOrder(this.loadParam);
        },
        // 点击申请收款弹出子弹框
        clickOn: function(param) {
            this.detailParam = param;
        },
        cancelOrderByFlow: function(orderId, cancel) { //cancel表示是订单取消的哪个阶段，0/1/2，申请取消/重新申请取消/取消

            this.cancelFlowParam.orderId = orderId;
            this.cancelFlowParam.show = true;
        },
        pendingOrder: function(item, sub) {
            item.show = !item.show;
            item.sub = sub;
            this.disposeParam = item;
            this.disposeParam.key = "myOrderList";
            this.disposeParam.show = true;
            /*--采购状态type==0--*/
            if (item.orderStatus == 0 && item.type == 0) {
                this.disposeParam.tips = "订单已提交，请审核！";
            }
            if (item.orderStatus == 10 && item.type == 0) {
                this.disposeParam.tips = "订单处理完成，待财务付款！";
            }
            if (item.orderStatus == -1) {
                this.disposeParam.tips = this.$t('static.cancle_order');
            }
            if (item.orderStatus == -2) {
                this.disposeParam.tips = this.$t('static.expired_order');
            }
            if (item.orderStatus == 20 && item.type == 0) {
                this.disposeParam.tips = "订单处理完成，待财务付款！";

            }
            if (item.orderStatus == 30 && item.type == 0) {
                this.disposeParam.tips = "订单已付款，待客户收款";
                this.disposeParam.confirmReceipt = true;
            }
            if (item.orderStatus == 40 && item.type == 0) {
                this.disposeParam.tips = this.$t('static.pending_shipped');
                this.disposeParam.sendoff = true;
            }
            if (item.orderStatus == 50 && item.type == 0) {
                this.disposeParam.tips = "您的订单已发货，请注意保持电话通畅，等待收货确认！";
                this.disposeParam.delivery = true;
            }
            if (item.orderStatus == 60 && item.type == 0) {
                if (item.unpaid > 0) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = this.$t('static.not_settle');
                    this.tipsParam.alert = true;
                    this.disposeParam.show = false;
                } else {
                    this.disposeParam.tips = "买家已收货，请确认订单是否完成！";
                    this.disposeParam.estimate = true;
                }
            }
            if (item.orderStatus == 70 && item.type == 0) {
                this.disposeParam.tips = this.$t('static.order_over');
            }
            /*--销售状态type==1--*/
            if (item.orderStatus == 0 && item.type == 1) {
                this.disposeParam.tips = "订单已提交，请审核！";
                this.disposeParam.handle = true;
            }
            if (item.orderStatus == 10 && item.type == 1) {
                this.disposeParam.tips = "订单处理完成，等待客户付款！";
                this.disposeParam.sales = true;
            }
            if (item.orderStatus == 20 && item.type == 1) {
                this.disposeParam.tips = "客户已付款，等待申请财务核查！";
                this.disposeParam.payment = true;
            }
            if (item.orderStatus == 30 && item.type == 1) {
                this.disposeParam.tips = "客户已付款，等待财务核查！";
                this.disposeParam.Auditing = true;
            }
            if (item.orderStatus == 40 && item.type == 1) {
                this.disposeParam.tips = "财务核查通过，请等待卖家发货！";
                this.disposeParam.sendoff = true;
            }
            if (item.orderStatus == 50 && item.type == 1) {
                this.disposeParam.tips = "订单已发货，请等待收货确认！";
                this.disposeParam.express = true;
            }
            if (item.orderStatus == 60 && item.type == 1) {
                if (item.unpaid > 0) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = this.$t('static.not_settle');
                    this.tipsParam.alert = true;
                    this.disposeParam.show = false;
                } else {
                    this.disposeParam.tips = "买家已收货，请确认订单是否完成！";
                    this.disposeParam.estimate = true;
                }
            }
            if (item.orderStatus == 70 && item.type == 1) {
                this.disposeParam.tips = this.$t('static.order_over');
            }
            this.disposeParam.callback = this.orderBack;
        },
        //合同
        addContract: function(contract) {
            this.contractParam = contract;
            this.contractParam.show = true;
            this.contractParam.callback = this.orderBack;
        },
        //查看审核记录
        showRecord: function(item) {
            this.recordParam.bizId = item.id;
            this.recordParam.show = true;
        },
        cancelOrder: function(id, index) {
            this.cancelParam.id = id;
            this.cancelParam.index = index;
            this.cancelParam.show = true;
        },

        selectSearch: function() {
            this.orderPageID = this.$route.query.id
            console.log(this.orderPageID)
            if (this.orderPageID == 0) {
                this.getEmpolyeeOrder(this.loadParam);
            } else if (this.orderPageID == 1) {
                this.getOrgOrder(this.loadParam);
                this.getOrderStatistical(this.loadParam);
            } else if (this.orderPageID == 2) {
                this.getOrderList(this.loadParam);
                this.getOrderStatistical(this.loadParam);
            } else {
                console.log('nothing')
            }

        },
        selectType: function(type) {
            this.loadParam.type = type;
            this.selectSearch();
        },
        editClick: function(sub) {
            if (this.$store.state.table.basicBaseList.allOrderList[sub].show) {
                this.$store.state.table.basicBaseList.allOrderList[sub].show = !this.$store.state.table.basicBaseList.allOrderList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.allOrderList[sub].show = true;
            }
        },
        //订单划转到业务员
        transferToEmployee: function(item, itemSub) {
            //将employeeStatus置为2,表示是划转业务员
            this.employeeStatus = 2;
            this.transferParam.id = item.id;
            this.transferParam.employee = "";
            this.transferParam.callback = this.transferCallback;
            this.transferParam.show = true;
            this.transferParam.itemSub = itemSub;
        },
        transferCallback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
            //由于划转订单，在后台是异步操作，会有些许延迟，所以这里设置在0.1s后重新请求列表数据
            setTimeout(this.selectSearch, 100);
        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        clickOn: function(param) {
            this.detailParam = param;
        },
        updateOrder: function(param) {

            this.dialogParam = param;
        },
        resetCondition: function() {
            this.loadParam.startTime = "";
            this.loadParam.endTime = "";
            this.loadParam.consigneePhone = "";
            this.loadParam.consignee = "";
            this.loadParam.orderStatus = "";
            this.loadParam.dataStatus = "";
            this.loadParam.no = "";
            this.loadParam.id = "";
            this.loadParam.mode = "";
            this.loadParam.validate = "";
            this.loadParam.type = "";
            this.loadParam.clients = "";
            this.loadParam.payWay = "";
            this.loadParam.org = "";
            this.loadParam.orgName = "";
            this.loadParam.employeeId = "";
            this.loadParam.employeeName = "";
            this.employeeParam.orgId = ""; //保证employeeParam.orgId与loadParam.org同步变化
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.loadParam.sample = "";
            this.selectSearch();
        },
        applyBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.selectSearch();
        },
        orderCheck: function(id, index) {

            this.auditParam.id = id;
            this.auditParam.index = index;

            this.auditParam.show = true;
            this.auditParam.title = '审核订单';
            this.auditParam.callback = this.applyBack;
        },
        auditPass: function() {
            this.auditParam.validate = 1;
            this.orderOrgAudit(this.auditParam);
        },
        auditReject: function() {
            this.auditParam.validate = 0;
            this.orderOrgAudit(this.auditParam);
        },
        //变量true false控制函数
        changeBool: function(a, b, c, d) {
            this.showonAll = a;
            this.showExport = b;
            this.showTransfer = c;
            this.showMoney = d;
        },
        //显示隐藏功能键
        funBtn: function() {
            if (this.$route.query.id == 0) {

                this.changeBool(false, false, false, false)
                changeMenu(this.$store.state.table.isTop, this.getEmpolyeeOrder, this.loadParam, localStorage.myOrderParam);
                this.language = localStorage.lang;
            } else if (this.$route.query.id == 1) {

                this.changeBool(false, true, true, true)
                changeMenu(this.$store.state.table.isTop, this.getOrgOrder, this.loadParam, localStorage.orgOrderParam);
                changeMenu(this.$store.state.table.isTop, this.getOrderStatistical, this.loadParam, localStorage.orgOrderParam);
                this.language = localStorage.lang;
                console.log('hahah', this.loadParam.key)
            } else if (this.$route.query.id == 2) {

                changeMenu(this.$store.state.table.isTop, this.getOrderStatistical, this.loadParam, localStorage.allOrderParam);
                this.language = localStorage.lang;
                this.changeBool(true, true, true, false)
            } else {
                console.log("nothing")
            }
        },

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.selectSearch();
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.selectSearch();
        },
        a: function(employee) {
            this.loadParam.employeeId = employee.employeeId;
            this.loadParam.employeeName = employee.employeeName;
            this.selectSearch();
        },
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
        this.orderPageID = this.$route.query.id
        console.log(this.$route.query.id)
        if (this.orderPageID == 0) {
            this.loadParam.link = this.url[0]
            this.getEmpolyeeOrder(this.loadParam);
        } else if (this.orderPageID == 1) {
            this.loadParam.link = this.url[1]
            this.employeeParam.orgId = this.initLogin.orgId
            this.getOrgOrder(this.loadParam);
            this.getOrderStatistical(this.loadParam);
        } else if (this.orderPageID == 2) {
            this.loadParam.link = this.url[2]
            this.getOrderList(this.loadParam);
            this.getOrderStatistical(this.loadParam);
        } else {
            console.log('nothing')
        }
    },
    created() {
        this.funBtn()

        this.language = localStorage.lang;
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}

.order_search {
    padding: 35px 10px 0 10px;
}

.transfer {
    margin-right: 16px;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}

.order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 11.1%;
    display: table-cell;
}

.order_table .table > ul >li a {
    color: #003077;
}

.order_table .table_hover > ul:hover {
    background: #f5f5f5;
}

#table_box table th,
#table_box table td {
    width: 100px;
    min-width: 100px;
}


/* #table_box table .btn{
    width:90px
} */

.order_table .table > ul >li img {
    margin: auto;
}

.order_pagination {
    text-align: center;
}

.api {
    color: #3399ff;
}
</style>

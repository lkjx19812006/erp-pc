<template>
    <div>
        <offer-model :param="offerParam" v-if="offerParam.show"></offer-model>
        <inquireinfo-model :param="inquireInfoParam" v-if="inquireInfoParam.show"></inquireinfo-model>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <itemhistory-model :param="itemHistoryParam" v-if="itemHistoryParam.show"></itemhistory-model>
        <uploadfiles-model :param="uploadFilesParam" v-if="uploadFilesParam.show"></uploadfiles-model>
        <otheroffer-model :param="otherOfferParam" v-if="otherOfferParam.show"></otheroffer-model>
        <inquireagain-model :param="inquireAgainParam" v-if="inquireAgainParam.show"></inquireagain-model>
        <delfile-model :param="delFileParam" v-if="delFileParam.show"></delfile-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <evaluate-model :param="evaluateParam" v-if="evaluateParam.show"></evaluate-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
        <div class="container modal_con modal_overall" v-show="param.show" @click="param.show=false">
            <div class="top-title">
                <span class="glyphicon glyphicon-remove-circle" @click="param.show=false"></span>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div class="client_nav">
                <nav class="navbar navbar-client" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                            <span class="navbar-brand navbar-name">{{initIntlIntentionDetail.customerName}}</span>
                        </div>
                        <ul class="nav navbar-nav navbar-right" style="margin-top:8px;">
                            <li>
                                <!-- <button type="button" class="btn btn-base"  @click="createOffer()">新建报价</button> -->
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <section>
                <div class="client-section clearfix" @click.stop="">
                    <div class="col-md-12">
                        <h4 class="section_title">{{$t('static.detailed_information')}}</h4>
                        <article>
                            <div class="edit-detail">
                                <div class="clearfix">
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.type')}}：</label>
                                        <span v-if="initIntlIntentionDetail.especial==0&&initIntlIntentionDetail.type==0">{{$t('static.common_purchase')}}</span>
                                        <span v-if="initIntlIntentionDetail.especial==0&&initIntlIntentionDetail.type==1">{{$t('static.common_supply')}}</span>
                                        <span v-if="initIntlIntentionDetail.especial==1&&initIntlIntentionDetail.type==0">{{$t('static.emergency')}}</span>
                                        <span v-if="initIntlIntentionDetail.especial==1&&initIntlIntentionDetail.type==1">{{$t('static.low_cost')}}</span>
                                    </div>
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.client_name')}}：</label>
                                        <span>{{initIntlIntentionDetail.customerName}}</span>
                                    </div>
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.client_phone')}}：</label>
                                        <span>{{initIntlIntentionDetail.customerPhone}}</span>
                                    </div>
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.client_email')}}：</label>
                                        <span>{{initIntlIntentionDetail.customerEmail}}</span>
                                    </div>
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.country')}}：</label>
                                        <span>{{initIntlIntentionDetail.countryName}}</span>
                                    </div>
                                    <!-- 国外的市就是国内的省 -->
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.city')}}：</label>
                                        <span>{{initIntlIntentionDetail.provinceName}}</span>
                                    </div>
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.address')}}：</label>
                                        <span>{{initIntlIntentionDetail.address}}</span>
                                    </div>
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.intention_source')}}：</label>
                                        <span>{{initIntlIntentionDetail.source}}</span>
                                    </div>
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.inquiry_state')}}：</label>
                                        <span v-if="initIntlIntentionDetail.inquire==0">{{$t('static.initial')}}</span>
                                        <span v-if="initIntlIntentionDetail.inquire==1">{{$t('static.inquiry')}}</span>
                                        <span v-if="initIntlIntentionDetail.inquire==2">{{$t('static.quotation')}}</span>
                                        <span v-if="initIntlIntentionDetail.inquire==3">{{$t('static.quo_complete')}}</span>
                                    </div>
                                    <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.issued_time')}}：</label>
                                        <span>{{initIntlIntentionDetail.ctime}}</span>
                                    </div>
                                    <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.packaging')}}：</label>
                                        <span>{{initIntlIntentionDetail.pack}}</span>
                                    </div>
                                    <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6">
                                        <label class="editlabel">{{$t('static.destination')}}：</label>
                                        <span>{{initIntlIntentionDetail.port}}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="col-md-12 client-detail">
                        <h4 class="section_title" style="margin:15px 0">{{$t('static.related_information')}} 
                      <div style="width:100%;height:35px;text-align:right;padding-right:7px"  v-if="param.inquire==3">
                      <input id="all-checked"
                              type="checkbox"
                              :checked="topTitle"
                              @change="changeAllChecked($event)"
                            > {{$t('static.Select_all')}}
                             <button class="btn btn-primary" @click="batchAccept(1)" >{{$t('static.evaluate_all')}}</button>
                             </div></h4>
                        <article>
                            <div class="panel-group">
                                <!-- 询价记录 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click="enfoldment({

                                            link:initIntlIntentionDetail.inquires,
                                            crete:'inquires'
                                            })">
                                     <img class="pull-left" src="/static/images/inquire_icon.png" height="29" width="26" />
                                      <a data-toggle="collapse" data-parent="#accordion" href="javascript:void(0)" class="panel-title-set">
                                       {{$t('static.inquiry_record')}}（{{initIntlIntentionDetail.inquires.arr.length}}）
                                      </a>
                                        <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initIntlIntentionDetail.inquires.show&&initIntlIntentionDetail.inquires.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet" style="border-top:1px solid #eee">
                                                <thead>
                                                    <th>{{$t('static.inquire_type')}}</th>
                                                    <th>{{$t('static.destination')}}/{{$t('static.postcodes')}}</th>
                                                    <th>{{$t('static.inquire_time')}}</th>
                                                    <th>{{$t('static.inquiry_state')}}</th>
                                                    <th>{{$t('static.product_price')}}</th>
                                                    <th>{{$t('static.other_cost')}}</th>
                                                    <th>{{$t('static.total_cost')}}</th>
                                                    <th>{{$t('static.comment')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initIntlIntentionDetail.inquires.arr">
                                                        <!-- <td><img :src="item.path" /></td> -->
                                                        <td>
                                                            <a class="underline" v-if="item.inquire==3" @click="getInquireInfo(item.id)">{{item.inquireType}}</a>
                                                            <span v-else>{{item.inquireType}}</span>
                                                        </td>
                                                        <td>
                                                            <div v-if="item.inquireType=='CIF'||item.inquireType=='FCA'||item.inquireType=='FAS'||item.inquireType=='CPT'||item.inquireType=='CFR'||item.inquireType=='CIP'||item.inquireType=='DAT'||item.inquireType=='DAP'||item.inquireType=='DDP'||item.inquireType=='DAP'||item.inquireType=='EXW'||item.inquireType=='FOB'||item.inquireType=='DDP'">{{item.port}}</div>
                                                            <div v-if="item.inquireType=='Border Trade'">{{item.port}}{{item.postcode}}</div>
                                                            <div v-else>{{item.postcode}}</div>
                                                        </td>
                                                        <td>{{item.ctime}}</td>
                                                        <td v-if="item.inquire==0">{{$t('static.initial')}}</td>
                                                        <td v-if="item.inquire==1" style="color:#00BFFF">{{$t('static.inquiry')}}</td>
                                                        <td v-if="item.inquire==2" style="color:#EE82EE">{{$t('static.quotation')}}</td>
                                                        <td v-if="item.inquire==3" style="color:#2E8B57">{{$t('static.quo_complete')}}</td>
                                                        <td>{{item.productTotal}}</td>
                                                        <td>{{item.otherTotal}}</td>
                                                        <td>{{item.total}}</td>
                                                        <td>{{item.comment}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 原材料信息 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:initIntlIntentionDetail.items,
                                            crete:'items'
                                            })">

                                              <img class="pull-left" src="/static/images/offer.png" height="29" width="26"  />
                                              <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                                {{$t('static.medicinal_material_information')}}（{{initIntlIntentionDetail.items.arr.length}}）
                                              </a>
                                              <!--询价完成或再次询价才显示价格-->
                                              <span class="pull-right" style="color:#fa6705">{{$t('static.total')}}：
                                                  <p v-show="initIntlIntentionDetail.inquire==3||initIntlIntentionDetail.inquireTime>1" class="pull-right" v-for="item in initIntlIntentionDetail.itemsTotal">{{item.total}}{{item.currency | Currency}}<span v-if="$index!==0">+</span></p>
                                                  <!-- {{initIntlIntentionDetail.itemsTotal}}{{initIntlIntentionDetail.items.arr[0].currency | Currency}} -->
                                              </span>
                                              <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initIntlIntentionDetail.items.show&&initIntlIntentionDetail.items.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <span style="display:inline-block;width:100%;height:32px;text-align:right;padding-right:7px;" v-if="param.inquire==3">
                                         <input type="checkbox"  @change="changeTitleChecked(data,$event,'items','offerId')" :checked="title1">{{$t('static.Select_all')}}
                                            <button class="btn btn-primary" @click="batchAccept('items')" >{{$t('static.Batch_evaluation')}}</button>
                                            </span>
                                            <table class="table contactSet" style="border-top:1px solid #eee">
                                                <thead>
                                                    <th style="width:30px;" v-if="param.inquire==3">{{$t('static.selected')}}</th>
                                                    <th>{{$t('static.breed')}}</th>
                                                    <th>{{$t('static.origin')}}</th>
                                                    <th>{{$t('static.specification')}}</th>
                                                    <th>{{$t('static.quality')}}</th>
                                                    <th>{{$t('static.quoted_price')}}</th>
                                                    <th>{{$t('static.exchange')}}</th>
                                                    <th>{{$t('static.quantity')}}（{{$t('static.unit')}}）</th>
                                                    <th>{{$t('static.quatation_name')}}</th>
                                                    <th>{{$t('static.comment')}}</th>
                                                    <!-- 再次询价 -->
                                                    <th>{{$t('static.inquiry_again')}}</th>
                                                    <!-- 再次报价 -->
                                                    <th>{{$t('static.quote_again')}}</th>
                                                    <th>{{$t('static.quatiton_time')}}</th>
                                                    <th>{{$t('static.inquiry_state')}}</th>
                                                    <th>{{$t('static.evaluation')}}</th>
                                                    <th>{{$t('static.handle')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(index,item) in initIntlIntentionDetail.items.arr">
                                                        <td @click.stop="" style="width:100px;" v-if="param.inquire==3">
                                                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,'items')"></label>
                                                        </td>
                                                        <!--  <input type="checkbox"  value="{{item.offerId}}" checked="{{item.checked}}" v-model="selectArr" >   -->
                                                        <!--  <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>{{item.checked}} -->
                                                        <td>
                                                            <a style="cursor:pointer" @click="getItemHistory(item.id)">{{item.breedName}}</a>
                                                        </td>
                                                        <td>{{item.location | province}}</td>
                                                        <td>{{item.spec}}</td>
                                                        <td>{{item.quality}}</td>
                                                        <td>{{item.price}}<span v-if="item.offerEUnit!=''&&item.offerEUnit!==null">（{{item.offerEUnit}}）</span></td>
                                                        <td>{{item.exchangeRate}}</td>
                                                        <td>{{item.number}}（{{item.unit | Unit}}）</td>
                                                        <td>{{item.offererName}}</td>
                                                        <td>{{item.offerComment}}</td>
                                                        <td>
                                                            <div v-if="item.again==1"> {{$t('static.inquiry_again')}}</div>
                                                        </td>
                                                        <td>
                                                            <div v-if="item.offerAgain==1" style="color:red">
                                                                {{$t('static.quoted')}}
                                                            </div>
                                                        </td>
                                                        <td>{{item.utime}}</td>
                                                        <td>
                                                            <div v-if="item.inquire===0">
                                                                {{$t('static.initial')}}
                                                            </div>
                                                            <div v-if="item.inquire===1">
                                                                {{$t('static.inquiry')}}
                                                            </div>
                                                            <div v-if="item.inquire===2">
                                                                {{$t('static.quotation')}}
                                                            </div>
                                                            <div v-if="item.inquire===3">
                                                                {{$t('static.quo_complete')}}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Poptip placement="right-start" trigger="hover">
                                                                <span v-if="item.evaluation!=''">{{item.evaluation | textDisplay '4'}}</span>
                                                                <span v-else>{{$t('static.unvalued')}}</span>
                                                                <div slot="content" style="color:green;white-space:normal;width:150px;">
                                                                    {{item.evaluation}}
                                                                </div>
                                                            </Poptip>
                                                            <!--   <Tooltip placement="top">
                                                            <i-button>多行</i-button>
                                                            <div slot="content" style="color:green;width:100px;word-break:break-all; word-wrap:wrap;">
                                                                {{item.evaluation}}
                                                            </div>
                                                                                                                     </Tooltip>  -->
                                                        </td>
                                                        <td>
                                                            <a style="cursor:pointer" @click="inquireAgain(item,$index)" v-if="item.again==0&&initIntlIntentionDetail.inquireTime>1&&initIntlIntentionDetail.isEvaluate==1"><img src="/static/images/{{$t('static.img_rerequire')}}.png" alt="再次询价" /></a>
                                                            <a style="color:blue" v-if="param.inquire==3" @click="addEval(item.offerId)">{{$t('static.evaluate')}}</a>
                                                        </td>
                                                    </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 提取物列表 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                                    link:initIntlIntentionDetail.extractive,
                                                    crete:'extractive'
                                                    })">
                                              <img class="pull-left" src="/static/images/offer.png" height="29" width="26"  />
                                              <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                                {{$t('static.extractive_information')}}（{{initIntlIntentionDetail.extractive.arr.length}}）
                                              </a>
                                              <!--询价完成或再次询价才显示价格-->
                                              <span class="pull-right" style="color:#fa6705">{{$t('static.total')}}：
                                                  <p v-show="initIntlIntentionDetail.inquire==3||initIntlIntentionDetail.inquireTime>1" class="pull-right" v-for="item in initIntlIntentionDetail.extractiveTotal">{{item.total}}{{item.currency | Currency}}<span v-if="$index!==0">+</span></p>
                                                  <!-- {{initIntlIntentionDetail.itemsTotal}}{{initIntlIntentionDetail.items.arr[0].currency | Currency}} -->
                                              </span>
                                              <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initIntlIntentionDetail.extractive.show&&initIntlIntentionDetail.extractive.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <span style="display:inline-block;width:100%;height:32px;text-align:right;padding-right:7px;" v-if="param.inquire==3">
                                          <input  type="checkbox"  :checked="title2" @change="changeTitleChecked(data,$event,'extractive','offerId')">{{$t('static.Select_all')}}
                                          <!--   <Checkbox :checked='selectAll' @click.prevent="checkAll()" >{{$t('static.Select_all')}}</Checkbox> -->
                                            <button class="btn btn-primary" @click="batchAccept('extractive')" >{{$t('static.Batch_evaluation')}}</button>
                                            </span>
                                            <table class="table contactSet" style="border-top:1px solid #eee">
                                                <thead>
                                                    <th style="width:30px;" v-if="param.inquire==3">{{$t('static.selected')}}</th>
                                                    <th>{{$t('static.breed')}}</th>
                                                    <th>{{$t('static.origin')}}</th>
                                                    <th>{{$t('static.specification')}}</th>
                                                    <th>{{$t('static.quality')}}</th>
                                                    <th>{{$t('static.quoted_price')}}</th>
                                                    <th>{{$t('static.exchange')}}</th>
                                                    <th>{{$t('static.quantity')}}（{{$t('static.unit')}}）</th>
                                                    <th>{{$t('static.quatation_name')}}</th>
                                                    <th>{{$t('static.comment')}}</th>
                                                    <th>{{$t('static.inquiry_again')}}</th>
                                                    <th>{{$t('static.quote_again')}}</th>
                                                    <th>{{$t('static.quatiton_time')}}</th>
                                                    <th>{{$t('static.inquiry_state')}}</th>
                                                    <th>{{$t('static.evaluation')}}</th>
                                                    <!-- <th></th> -->
                                                    <th>{{$t('static.handle')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initIntlIntentionDetail.extractive.arr">
                                                        <td @click.stop="" style="width:100px;" v-if="param.inquire==3">
                                                            <!-- 
                                                        <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"></label> -->
                                                            <!--     <input type="checkbox" value="{{item.offerId}}" v-model="selectArr" >  -->
                                                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,'extractive')"></label>
                                                        </td>
                                                        </td>
                                                        <td>
                                                            <a style="cursor:pointer" @click="getItemHistory(item.id)">{{item.breedName}}</a>
                                                        </td>
                                                        <td>{{item.location | province}}</td>
                                                        <td>{{item.spec}}</td>
                                                        <td>{{item.quality}}</td>
                                                        <td>{{item.price}}<span v-if="item.offerEUnit!=''&&item.offerEUnit!==null">（{{item.offerEUnit}}）</span></td>
                                                        <td>{{item.exchangeRate}}</td>
                                                        <td>{{item.number}}（{{item.unit | Unit}}）</td>
                                                        <td>{{item.offererName}}</td>
                                                        <td>{{item.offerComment}}</td>
                                                        <td>
                                                            <div v-if="item.again==1">已再次询价</div>
                                                        </td>
                                                        <td>
                                                            <div v-if="item.offerAgain==1" style="color:red">
                                                                {{$t('static.quoted')}}
                                                            </div>
                                                        </td>
                                                        <td>{{item.utime}}</td>
                                                        <!-- <td><a style="cursor:pointer" @click="inquireAgain(item,$index)" v-if="item.again==0&&initIntlIntentionDetail.inquireTime>0"><img src="/static/images/{{$t('static.img_rerequire')}}.png" alt="再次询价" /></a></a></td> -->
                                                        <td>
                                                            <div v-if="item.inquire===0">
                                                                {{$t('static.initial')}}
                                                            </div>
                                                            <div v-if="item.inquire===1">
                                                                {{$t('static.inquiry')}}
                                                            </div>
                                                            <div v-if="item.inquire===2">
                                                                {{$t('static.quotation')}}
                                                            </div>
                                                            <div v-if="item.inquire===3">
                                                                {{$t('static.quo_complete')}}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Poptip placement="right-start" trigger="hover">
                                                                <span v-if="item.evaluation!=''">{{item.evaluation | textDisplay '4'}}</span>
                                                                <span v-else>{{$t('static.unvalued')}}</span>
                                                                <div slot="content" style="color:green;white-space:normal;width:150px;">
                                                                    {{item.evaluation}}
                                                                </div>
                                                            </Poptip>
                                                        </td>
                                                        <td>
                                                            <a style="cursor:pointer" @click="inquireAgain(item,$index)" v-if="item.again==0  &&initIntlIntentionDetail.inquireTime>1&&item.isEvaluate==1"><img src="/static/images/{{$t('static.img_rerequire')}}.png" alt="再次询价" /></a>
                                                            <a style="color:blue" v-if="param.inquire==3" @click="addEval(item.offerId)">{{$t('static.evaluate')}}</a>
                                                        </td>
                                                    </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 运费及其他费用 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                                  link:initIntlIntentionDetail.offers,
                                                  crete:'offers'
                                                  })">
                                            <img class="pull-left" src="/static/images/otheroffer_icon.png" height="29" width="26"  />
                                            <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-if="initIntlIntentionDetail.offers.arr.length&&(initIntlIntentionDetail.inquire==3||initIntlIntentionDetail.inquireTime>1)">
                                              {{$t('static.other_quotations')}}（{{initIntlIntentionDetail.offers.arr.length}}）
                                            </a>
                                            <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                              {{$t('static.other_quotations')}}（0）
                                            </a>
                                             <span class="pull-right" style="color:#fa6705">{{$t('static.quotation_total')}}：
                                                 <p v-show="initIntlIntentionDetail.inquire==3||initIntlIntentionDetail.inquireTime>1" class="pull-right" v-for="item in initIntlIntentionDetail.offersTotal">{{item.total}}{{item.currency | Currency}}<span v-if="$index!==0">+</span></p>
                                                 <!-- {{initIntlIntentionDetail.offersTotal}}{{initIntlIntentionDetail.items.arr[0].currency | Currency}} -->
                                             </span>
                                            <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                         </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="initIntlIntentionDetail.offers.show&&initIntlIntentionDetail.offers.arr.length>0&&(initIntlIntentionDetail.inquire==3||initIntlIntentionDetail.inquireTime>1)">
                                        <div class="panel-body panel-set">
                                            <span style="display:inline-block;width:100%;height:32px;text-align:right;padding-right:7px;" v-if="param.inquire==3">
                                          <input :id="data.listTitle" type="checkbox"   :checked="title3" @change="changeTitleChecked(data,$event,'offers','id')">{{$t('static.Select_all')}}
                                         <!--    <Checkbox :checked='selectAll' @click.prevent="checkAll()" >{{$t('static.Select_all')}}</Checkbox> -->
                                            <button class="btn btn-primary" @click="batchAccept('offers')" >{{$t('static.Batch_evaluation')}}</button>
                                            </span>
                                            <table class="table contactSet" style="border-top:1px solid #eee">
                                                <thead>
                                                    <th style="width:30px;" v-if="param.inquire==3">{{$t('static.selected')}}</th>
                                                    <th>{{$t('static.expense_explanation')}}</th>
                                                    <th>{{$t('static.expense')}}</th>
                                                    <th>{{$t('static.currency')}}</th>
                                                    <th>{{$t('static.all_in_cost')}}</th>
                                                    <th>{{$t('static.comment')}}</th>
                                                    <th>{{$t('static.evaluation')}}</th>
                                                    <th v-if="param.inquire">{{$t('static.handle')}}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initIntlIntentionDetail.offers.arr">
                                                        <!-- <td><img :src="item.path" /></td> -->
                                                        <td @click.stop="" style="width:100px;" v-if="param.inquire==3">
                                                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,'offers')"></label>
                                                        </td>
                                                        <td>{{item.costDesc}}</td>
                                                        <td>{{item.cost}}</td>
                                                        <td>{{item.currency | Currency}}</td>
                                                        <td>{{item.total}}</td>
                                                        <td>{{item.comment}}</td>
                                                        <td>
                                                            <Poptip placement="right-start" trigger="hover">
                                                                <span v-if="item.evaluation!=''">{{item.evaluation | textDisplay '4'}}</span>
                                                                <span v-else>{{$t('static.unvalued')}}</span>
                                                                <div slot="content" style="color:green;white-space:normal;width:150px;">
                                                                    {{item.evaluation}}
                                                                </div>
                                                            </Poptip>
                                                        </td>
                                                        <td v-if="param.inquire"><a style="color:blue" v-if="param.inquire==3" @click="addEval(item.id)">{{$t('static.evaluate')}}</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 原文件 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initIntlIntentionDetail.files,
                                              crete:'files'
                                              })">
                                              <img class="pull-left" src="/static/images/originalfile_icon.png" height="29" width="26"  />
                                              <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                                {{$t('static.original_file')}}（{{initIntlIntentionDetail.files.arr.length}}）
                                              </a>
                                              <button type="button" class="btn btn-base pull-right" @click.stop="uploadOriginalFiles()">{{$t('static.upload')}}</button>                                  
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="initIntlIntentionDetail.files.show&&initIntlIntentionDetail.files.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <!-- <th>{{$t('static.file_path')}}</th> -->
                                                    <th>{{$t('static.file_type')}}</th>
                                                    <th>{{$t('static.description')}}</th>
                                                    <th>{{$t('static.create_time')}}</th>
                                                    <th>{{$t('static.file_path')}}</th>
                                                    <th></th>
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initIntlIntentionDetail.files.arr">
                                                        <td>{{item.fileType}}</td>
                                                        <td>{{item.description}}</td>
                                                        <td>{{item.ctime}}</td>
                                                        <td>
                                                            <img :src="item.url" v-if="item.fileType=='image'" style="max-width: 150px;" @click="clickBig(item.url)" />
                                                            <img src="/static/images/pdf.png" v-if="item.fileType=='pdf'">
                                                            <img src="/static/images/word.png" v-if="item.fileType=='word'">
                                                            <img src="/static/images/excel.png" v-if="item.fileType=='excel'">
                                                            <img src="/static/images/breedinfo.png" v-if="item.fileType=='other'">
                                                        </td>
                                                        <td>
                                                            <a href="{{item.url}}" download=""><img src="/static/images/{{$t('static.img_download')}}.png" alt="下载" /></a>
                                                        </td>
                                                        <td>
                                                            <a @click="delFile(item,$index)"><img src="/static/images/{{$t('static.img_del')}}.png" alt="删除" /></a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 报价文件 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initIntlIntentionDetail.offerFiles,
                                              crete:'offerFiles'
                                              })">
                                              <img class="pull-left" src="/static/images/offerfile_icon.png" height="29" width="26"  />
                                              <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                                {{$t('static.quotation_file')}}（{{initIntlIntentionDetail.offerFiles.arr.length}}）
                                              </a>
                                              <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="initIntlIntentionDetail.offerFiles.show&&initIntlIntentionDetail.offerFiles.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <!-- <th>{{$t('static.file_path')}}</th> -->
                                                    <th>{{$t('static.file_type')}}</th>
                                                    <th>{{$t('static.description')}}</th>
                                                    <th>{{$t('static.create_time')}}</th>
                                                    <th>{{$t('static.file_path')}}</th>
                                                    <th></th>
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initIntlIntentionDetail.offerFiles.arr">
                                                        <!-- <td><img :src="item.path" /></td> -->
                                                        <!-- <td v-if="item.fileType=='image'"><img :src="item.url"/></td>
                                                <td v-else>{{item.url}}</td> -->
                                                        <td>{{item.fileType}}</td>
                                                        <td>{{item.description}}</td>
                                                        <td>{{item.ctime}}</td>
                                                        <td>
                                                            <img :src="item.url" v-if="item.fileType=='image'" style="max-width: 150px;" @click="clickBig(item.url)" />
                                                            <img src="/static/images/pdf.png" v-if="item.fileType=='pdf'">
                                                            <img src="/static/images/word.png" v-if="item.fileType=='word'">
                                                            <img src="/static/images/excel.png" v-if="item.fileType=='excel'">
                                                            <img src="/static/images/breedinfo.png" v-if="item.fileType=='other'">
                                                        </td>
                                                        <td>
                                                            <a href="{{item.url}}" download=""><img src="/static/images/{{$t('static.img_download')}}.png" alt="下载" /></a>
                                                        </td>
                                                        <td>
                                                            <a @click="delFile(item,$index)"><img src="/static/images/{{$t('static.img_del')}}.png" alt="删除" /></a>
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
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import pictureModel from '../tips/pictureDialog'
import filter from '../../filters/filters'
import inquireinfoModel from './inquireInfo'
import itemhistoryModel from './itemHistory'
import inquireagainModel from './inquireAgain'
import uploadfilesModel from './uploadFiles'
import delfileModel from '../tips/tipDialog'
import tipsModel from '../tips/tipDialog'
import evaluateModel from './evaluate'
import {
    initIntlIntentionDetail,
    initLogin
} from '../../vuex/getters'
import {
    editintentInfo,
    getIntlIntentionDetail,
    delIntlIntentionFiles
} from '../../vuex/actions'
export default {
    components: {
        filter,
        inquireinfoModel,
        itemhistoryModel,
        inquireagainModel,
        uploadfilesModel,
        delfileModel,
        pictureModel,
        tipsModel,
        evaluateModel
    },
    data() {
        return {
            topTitle: false,
            title1: false,
            title2: false,
            title3: false,
            isShowListItem: false,
            selectArr: [],
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            inquireInfoParam: {
                show: false,
                showCost: false, //是否显示成本价,true显示,false不显示
                link: '/intlIntention/inquire/',
                id: ''
            },
            itemHistoryParam: {
                show: false,
                showCost: false, //是否显示成本价,true显示,false不显示
                link: '/intlIntention/itemHistory',
                id: '' //意向明细ID

            },
            pictureParam: {
                show: false,
                img: ''
            },
            inquireAgainParam: {
                show: false,
                link: '/intlIntention/itemInquire',
                itemId: '',
                index: '',
                description: '',
                callback: ''

            },
            tipsParam: {
                alert: true,
                show: false,
                name: ''
            },

            uploadFilesParam: {
                link: '/intlIntention/files',
                show: false,
                bizId: '', //意向ID
                category: '', //上传类型 0/1 原文件/报价附件
                path: '',
                description: '',
                fileType: '',
                image_f_show: ''
            },
            delFileParam: {
                show: false,
                link: '/intlIntention/files',
                name: '确认删除文件?',
                callback: this.delFileConfirm,
                confirm: true,
                id: '',
                category: '',
                index: '',
            },
            evaluateParam: {
                show: false,
                ids: [],
                intentionId: this.param.id
            }
        }
    },
    props: ['param'],
    vuex: {
        getters: {
            initIntlIntentionDetail,
            initLogin
        },
        actions: {
            editintentInfo,
            getIntlIntentionDetail,
            delIntlIntentionFiles
        }
    },
    methods: {
        removeByValue: function(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        },
        titleStatus: function(a, b, c) {
            this.title1 = a;
            this.title2 = b;
            this.title3 = c;
        },
        loopTitle: function(ar) {
            var that = this;
            var allDetail = this.$store.state.table.basicBaseList.intlIntentionDetail;
            if (ar == 'items') {
                allDetail[ar].arr.every(function(item) {
                    if (allDetail[ar].selected.length == allDetail[ar].arr.length) {
                        that.title1 = true;
                    } else {
                        that.title1 = false;
                    }
                })
            } else if (ar == 'extractive') {
                allDetail[ar].arr.every(function(item) {
                    if (allDetail[ar].selected.length == allDetail[ar].arr.length) {
                        that.title2 = true;
                    } else {
                        that.title2 = false;
                    }
                })
            } else if (ar == 'offers') {
                allDetail[ar].arr.every(function(item) {
                    if (allDetail[ar].selected.length == allDetail[ar].arr.length) {
                        that.title3 = true;
                    } else {
                        that.title3 = false;
                    }
                })
            }
        },
        onlyselected: function(sub, ar) {
            var allDetail = this.$store.state.table.basicBaseList.intlIntentionDetail;
            const _this = this;
            console.log(ar)
            allDetail[ar].arr[sub].checked = !allDetail[ar].arr[sub].checked;
            if (!allDetail[ar].arr[sub].checked) {
                _this.checked = false;
                _this.topTitle = false;
                if (ar == 'offers') {
                    this.removeByValue(allDetail[ar].selected, allDetail[ar].arr[sub].id);
                    this.loopTitle(ar);
                } else {
                    this.removeByValue(allDetail[ar].selected, allDetail[ar].arr[sub].offerId);
                    this.loopTitle(ar);
                };
            } else {
                _this.checked = true;
                if (ar == 'offers') {
                    allDetail[ar].selected.push(allDetail[ar].arr[sub].id);
                    this.loopTitle(ar);
                } else {
                    allDetail[ar].selected.push(allDetail[ar].arr[sub].offerId);
                    this.loopTitle(ar);
                }
                this.isAllChecked();
                allDetail[ar].arr.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        changeTitleChecked: function(data, event, list, type) {
            var allData = this.$store.state.table.basicBaseList.intlIntentionDetail;
            var _this = this;
            if (event.target.checked === true) {
                if (list == 'items') {
                    this.title1 = true;
                } else if (list == 'extractive') {
                    this.title2 = true;
                } else if (list == 'offers') {
                    this.title3 = true;
                }
                this.isAllChecked();
                console.log("sadasda", this.title1)
                allData[list].arr.forEach(function(item, i) {
                    allData[list].arr[i].checked = true && allData[list].selected.push(item[type]);
                })
            } else {
                this.topTitle = false;
                allData[list].arr.forEach(function(item, i) {
                    allData[list].arr[i].checked = false;
                    allData[list].selected.length = 0;
                    console.log("dfgsdgfdgdsfds", allData[list])
                })
            }

        },
        changeAllChecked: function(event) {
            var allData = this.$store.state.table.basicBaseList.intlIntentionDetail;
            if (event.target.checked === true) {
                allData.items.arr.forEach(function(item, i) {
                    allData.items.arr[i].checked = true && allData.items.selected.push(item.offerId);
                })
                allData.extractive.arr.forEach(function(item, i) {
                    allData.extractive.arr[i].checked = true && allData.extractive.selected.push(item.offerId);
                })
                allData.offers.arr.forEach(function(item, i) {
                    allData.offers.arr[i].checked = true && allData.offers.selected.push(item.id);
                })
                this.titleStatus(true, true, true);
            } else {
                allData.items.arr.forEach(function(item, i) {
                    allData.items.arr[i].checked = false;
                });
                allData.extractive.arr.forEach(function(item, i) {
                    allData.extractive.arr[i].checked = false;
                });
                allData.offers.arr.forEach(function(item, i) {
                    allData.offers.arr[i].checked = false;
                });
                allData.items.selected.length = 0
                allData.extractive.selected.length = 0;
                allData.offers.selected.length = 0;
                this.titleStatus(false, false, false);
            }
        },
        isAllChecked: function() {
            if (this.title1 == true && this.title2 == true && this.title3 == true) {
                this.topTitle = true;
            }

        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        enfoldment: function(param) {
            console.log(this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].arr);
            if (this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].arr.length == 0) {
                this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show = true;
            }
            this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show = !this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show;
        },
        //获取询价详情
        getInquireInfo: function(id) {
            console.log(id);
            this.inquireInfoParam.id = id;
            this.inquireInfoParam.show = true;

        },
        //添加评价
        addEval: function(v) {
            this.evaluateParam.ids = []
            this.evaluateParam.link = '/intlIntention/evaluateOffer';
            this.evaluateParam.ids.push(v);
            this.evaluateParam.show = true;
            this.evaluateParam.callback = this.evaluateCallback;
        },
        evaluateCallback: function(name) {
            this.evaluateParam.show = false;
            this.showTips(name);
            this.getIntlIntentionDetail(this.param);
        },
        showTips: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
        },
        getItemHistory: function(id) {
            this.itemHistoryParam.id = id;
            this.itemHistoryParam.show = true;
        },
        delFileConfirm: function() {
            this.delIntlIntentionFiles(this.delFileParam);
        },
        inquireAgain: function(item, index) {
            this.inquireAgainParam.itemId = item.id;
            this.inquireAgainParam.index = index;
            this.inquireAgainParam.show = true;
            this.inquireAgainParam.callback = this.inquireCallback;
        },
        delFile: function(item, index) {
            this.delFileParam.id = item.id;
            this.delFileParam.category = item.category;
            this.delFileParam.index = index;
            this.delFileParam.show = true;
        },

        uploadOriginalFiles: function() {
            this.uploadFilesParam.bizId = this.param.id;
            this.uploadFilesParam.category = 0;
            this.uploadFilesParam.path = '';
            this.uploadFilesParam.description = '';
            this.uploadFilesParam.fileType = '';
            this.uploadFilesParam.image_f_show = '';
            this.uploadFilesParam.show = true;
            this.uploadFilesParam.callback = this.inquireCallback;
        },
        inquireCallback: function(title) {
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.getIntlIntentionDetail(this.param);
        },
        batchAccept: function(arr) {
            this.topTitle = false;
            this.titleStatus(false, false, false);
            var allDetail = this.$store.state.table.basicBaseList.intlIntentionDetail
            if (arr != 1) {
                console.log(arr)
                if (allDetail[arr].selected.length <= 0) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = "请至少选择一条报价！";
                    return;
                } else {
                    console.log("hhh", allDetail.items.selected)
                    this.evaluateParam.ids = allDetail[arr].selected;
                }
            } else {
                var arr1 = allDetail.items.selected;
                var arr2 = allDetail.extractive.selected;
                var arr3 = allDetail.offers.selected;
                this.evaluateParam.ids = arr1.concat(arr2).concat(arr3);
                console.log("7684165dfgdsfgsdfhs", this.evaluateParam.ids)

            }
            this.evaluateParam.link = '/intlIntention/evaluateOffer';
            this.evaluateParam.show = true;
            this.evaluateParam.callback = this.evaluateCallback;
        },

    },
    watch: {
        initIntlIntentionDetail: function(newval, oldval) {
            console.log("yyy", newval, oldval)
        }
    },
    created() {
        this.getIntlIntentionDetail(this.param);
    },
    filter: (filter, {})
}
</script>
<style scoped>
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
    top: 20px;
    right: 40px;
}

.files_action {
    position: absolute;
    top: 18px;
    right: 40px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 1000;
    min-width: 80px;
    height: 30px;
    padding: 5px 8px;
    cursor: pointer;
}

.files_action:hover {
    color: #fa6705;
}

.breed_action dl dt {
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}

section article {
    margin-top: 30px;
}

.top-title {
    z-index: 100;
    width: 60%;
    right: 0;
    top: 91px;
    margin: auto;
    left: 0;
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

.table {
    display: table;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    text-align: left;
}

.edit-detail {
    border: 0px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 0px;
}

.client-detail {
    border-right: 0px solid #ddd;
}

.client-detailInfo {
    padding: 0 15px 0px 15px;
}

.client-detailInfo label {
    display: inline-block;
}

.client-detailInfo span {
    white-space: normal;
}

.client-detailInfo img {
    margin-right: 8px;
}
</style>

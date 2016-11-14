<template>
    <offer-model :param="offerParam" v-if="offerParam.show"></offer-model>
    <inquireinfo-model :param="inquireInfoParam" v-if="inquireInfoParam.show"></inquireinfo-model>
    <itemhistory-model :param="itemHistoryParam" v-if="itemHistoryParam.show"></itemhistory-model>
    <editoffer-model :param="editOfferParam" v-if="editOfferParam.show"></editoffer-model>
    <otheroffer-model :param="otherOfferParam" v-if="otherOfferParam.show"></otheroffer-model>
    <editotheroffer-model :param="editOtherOfferParam" v-if="editOtherOfferParam.show"></editotheroffer-model>
    <delotheroffer-model :param="delOtherOfferParam" v-if="delOtherOfferParam.show"></delotheroffer-model>
    <uploadfiles-model :param="uploadFilesParam" v-if="uploadFilesParam.show"></uploadfiles-model>
    <delfile-model :param="delFileParam" v-if="delFileParam.show"></delfile-model>
    
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con modal_overall" v-show="param.show">
        <div class="top-title">
            <span class="glyphicon glyphicon-remove-circle"  @click="param.show=false" ></span>
        </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <span class="navbar-brand navbar-name">{{param.customerName}}</span>
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
            <div class="client-section clearfix" >
                <div class="col-md-12">
                    <h4 class="section_title">{{$t('static.details')}}</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.client_name')}}：{{initIntlIntentionDetail.customerName}}</label>
                                     
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.client_phone')}}：{{initIntlIntentionDetail.customerPhone}}</label>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12" >
                                    <label class="editlabel">{{$t('static.client_email')}}：{{initIntlIntentionDetail.customerEmail}}</label>
                                    
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.country')}}：{{initIntlIntentionDetail.country}}</label>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                
                            </div>

                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.province')}}：{{initIntlIntentionDetail.province}}</label>
                                     
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.city')}}：{{initIntlIntentionDetail.city}}</label>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12" >
                                    <label class="editlabel">{{$t('static.area')}}：{{initIntlIntentionDetail.district}}</label>
                                    
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.description')}}：{{initIntlIntentionDetail.description}}</label>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                
                            </div>

                          
                        </div>
                    </article>
                </div>

                <div class="col-md-11 client-detail">
                    <h4 class="section_title">{{$t('static.related_information')}}</h4>
                    <article>
                        <div class="panel-group">
                            
                          <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                      <h4 class="panel-title clearfix" @click="enfoldment({
                                                  link:initIntlIntentionDetail.inquires,
                                                  crete:'inquires'
                                                  })">
                                            <img class="pull-left" src="/static/images/inquire_icon.png" height="29" width="26"  />
                                            <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                              {{$t('static.inquiry_record')}}（{{initIntlIntentionDetail.inquires.arr.length}}）
                                            </a>
                                            <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                      </h4>
                                    </div>
                                    <div  class="panel-collapse" v-show="initIntlIntentionDetail.inquires.show&&initIntlIntentionDetail.inquires.arr.length>0">
                                       <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                              <thead>
                                                <th>{{$t('static.inquire_type')}}</th>
                                                <th>{{$t('static.comment')}}</th>
                                                <th>{{$t('static.create_time')}}</th>
                                                <th>{{$t('static.inquiry_state')}}</th>
                                                <!-- <th></th>
                                                <th></th> -->
                                                
                                              </thead>
                                              <tbody>
                                                   <tr v-for="item in initIntlIntentionDetail.inquires.arr">
                                                      <td><a class="underline" @click="getInquireInfo(item.id)">{{item.inquireType}}</a></td>
                                                      <td>{{item.comment}}</td>
                                                      <td>{{item.ctime}}</td>
                                                      <td>{{item.inquire | inquire}}</td>
                                                      <!-- <td @click="offer()" style="cursor:pointer">原材料报价</td>
                                                      <td @click="otherOffer()" style="cursor:pointer">其他报价</td> -->
                                                        
                                                  </tr>
                                              </tbody>
                                          </table>
                                        </div>
                                    </div>
                                </div>       

                          <div class="panel panel-default">
                              <div class="panel-heading" v-cloak>
                                <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:initIntlIntentionDetail.items,
                                            crete:'items'
                                            })">
                                      <img class="pull-left" src="/static/images/offer.png" height="29" width="26"  />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                        {{$t('static.item_details')}}（{{initIntlIntentionDetail.items.arr.length}}）
                                      </a>
                                      <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> --> 
                                </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.items.show&&initIntlIntentionDetail.items.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>{{$t('static.breed')}}</th>
                                          <th>{{$t('static.currency')}}</th>
                                          <th>{{$t('static.cost')}}</th>
                                          <th>{{$t('static.quoted_price')}}</th>
                                          <th>{{$t('static.quantity')}}</th>
                                          <th>{{$t('static.unit')}}</th>
                                          <th>{{$t('static.comment')}}</th>
                                          <th>再次询价</th>
                                          <th>再次报价</th>
                                          <th></th> 
                                          <th></th> 
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.items.arr">
                                                <td><a style="cursor:pointer" @click="getItemHistory(item.id)">{{item.breedName}}</a></td>
                                                <td>{{item.offerCurrency | Currency}}</td>
                                                <td>{{item.offerOrigPrice}}</td>
                                                <td>{{item.offerPrice}}</td>
                                                <td>{{item.offerNumber}}</td>
                                                <td>{{item.offerUnit}}</td>
                                                <td>{{item.offerComment}}</td>
                                                <td>
                                                    <div v-if="item.again==0">否</div>
                                                    <div v-else>是</div>
                                                </td>
                                                <td>
                                                    <div v-if="item.offerAgain==0">否</div>
                                                    <div v-else>是</div>
                                                </td>
                                                <td><a style="cursor:pointer" @click="editOffer(item,$index)"><img src="/static/images/quote.png" alt="报价" /></a></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                  </div>
                              </div>
                          </div> 

                        <div class="panel panel-default">
                            <div class="panel-heading" v-cloak>
                                <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:initIntlIntentionDetail.offers,
                                            crete:'offers'
                                            })">
                                      <img class="pull-left" src="/static/images/otheroffer_icon.png" height="29" width="26"  />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                        {{$t('static.other_quotation')}}（{{initIntlIntentionDetail.offers.arr.length}}）
                                      </a>
                                      <button type="button" class="btn btn-base pull-right" @click.stop="addOtherOffer()">新建</button>
                                </h4>
                            </div>
                        
                            <div  class="panel-collapse" v-show="initIntlIntentionDetail.offers.show&&initIntlIntentionDetail.offers.arr.length>0">
                               <div class="panel-body panel-set">
                                    <table class="table contactSet">
                                      <thead>
                                        <th>{{$t('static.currency')}}</th>
                                        <th>{{$t('static.expense')}}</th>
                                        <th>{{$t('static.expense_explanation')}}</th>
                                        <th>{{$t('static.comment')}}</th>
                                        <th></th>
                                        <th></th>
                                       
                                      </thead>
                                      <tbody>
                                           <tr v-for="item in initIntlIntentionDetail.offers.arr">
                                              <td>{{item.currency | Currency}}</td>
                                              <td>{{item.cost}}</td>
                                              <td>{{item.costDesc}}</td>
                                              <td>{{item.comment}}</td>
                                              <td><a style="cursor:pointer" @click="editOtherOffer(item,$index)"><img src="/static/images/edit.png" alt="编辑" /></a></td>
                                              <td><a style="cursor:pointer" @click="delOtherOffer(item,$index)"><img src="/static/images/del.png" alt="删除" /></a></td>
                                             
                                              <!-- <td  @click="clickShow($index,{
                                                  concrete:'otherOffers'
                                                  })">
                                                  <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                  <div class="files_action" v-show="item.show" >
                                                      <dl>
                                                          <dt @click="edit($index,item)">修改备注</dt>
                                                      </dl>
                                                  </div>
                                              </td> -->
                                          </tr>
                                      </tbody>
                                  </table>
                                </div>
                            </div>
                        </div> 

                          <div class="panel panel-default">
                              <div class="panel-heading" v-cloak>
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initIntlIntentionDetail.files,
                                              crete:'files'
                                              })">
                                        <img class="pull-left" src="/static/images/originalfile_icon.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          {{$t('static.raw_material_file')}}（{{initIntlIntentionDetail.files.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right" @click.stop="uploadOriginalFiles()">{{$t('static.upload')}}</button> 
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.files.show&&initIntlIntentionDetail.files.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>{{$t('static.file_type')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                          <th>{{$t('static.create_time')}}</th>
                                          <th></th>
                                          <th></th>
                                          <th></th>
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.files.arr">
                                                <td>{{item.fileType}}</td>
                                                <td>{{item.description}}</td>
                                                <td>{{item.ctime}}</td>
                                                <td><a href="{{item.url}}" download=""><img src="/static/images/download.png" alt="下载" /></a></td>
                                                <td><a @click="delFile(item,$index)"><img src="/static/images/del.png" alt="删除" /></a></td>
                                                <td></td>
                                               <!--  <td  @click="clickShow($index,{
                                                   concrete:'files'
                                                   })">
                                                   <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                   <div class="files_action" v-show="item.show" >
                                                       <dl>
                                                           <dt @click="edit($index,item)">修改备注</dt>
                                                       </dl>
                                                   </div>
                                               </td> -->
                                            </tr>
                                        </tbody>
                                    </table>
                                  </div>
                              </div>
                          </div>
                          
                          <div class="panel panel-default">
                              <div class="panel-heading" v-cloak>
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initIntlIntentionDetail.offerFiles,
                                              crete:'offerFiles'
                                              })">
                                        <img class="pull-left" src="/static/images/offerfile_icon.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          {{$t('static.quotation_documents')}}（{{initIntlIntentionDetail.offerFiles.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right" @click.stop="uploadOfferFiles()">{{$t('static.upload')}}</button> 
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.offerFiles.show&&initIntlIntentionDetail.offerFiles.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>{{$t('static.file_type')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                          <th>{{$t('static.create_time')}}</th>
                                          <th></th>
                                          <th></th>
                                          <th></th>
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.offerFiles.arr">
                                                <td>{{item.fileType}}</td>
                                                <td>{{item.description}}</td>
                                                <td>{{item.ctime}}</td>
                                                <td><a href="{{item.url}}" download=""><img src="/static/images/download.png" alt="下载" /></a></td>
                                                <td><a @click="delFile(item,$index)"><img src="/static/images/del.png" alt="删除" /></a></td>
                                                <td></td>
                                                <!-- <td  @click="clickShow($index,{
                                                    concrete:'offers'
                                                    })">
                                                    <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="files_action" v-show="item.show" >
                                                        <dl>
                                                            <dt @click="edit($index,item)">修改备注</dt>
                                                        </dl>
                                                    </div>
                                                </td> -->
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
</template>
<script>

import filter from '../../filters/filters'
import inquireinfoModel from './inquireInfo'
import itemhistoryModel from './itemHistory'
import offerModel from './intlOffer'
import otherofferModel from './otherOffer'
import editofferModel from './editOffer'
import editotherofferModel from './editOtherOffer'
import delotherofferModel from '../tips/tipDialog'
import uploadfilesModel from './uploadFiles'
import delfileModel from '../tips/tipDialog'
import{
    initIntlIntentionDetail,
    initLogin
} from '../../vuex/getters'
import {
    editintentInfo,
    getIntlIntentionDetail,
    delIntlIntentionOtherOffer,
    delIntlIntentionFiles
} from '../../vuex/actions'
export default {
    components: {
        filter,
        offerModel,
        inquireinfoModel,
        itemhistoryModel,
        otherofferModel,
        editofferModel,
        editotherofferModel,
        delotherofferModel,
        uploadfilesModel,
        delfileModel
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            inquireInfoParam:{
                show:false,
                link:'/intlIntention/inquire/',
                id:''
            },
            itemHistoryParam:{
                show:false,
                link:'/intlIntention/itemHistory',
                id:''                               //意向明细ID

            },
            offerParam:{
                show:false,
                link:'/intlIntention/itemOffer',
                items:[]
                /*id:9,
                intentionId:'58228a6688e87dc057d5e969',
                inquireId:7,
                type:0,
                currency:1,
                itemId:8,
                itemName:'一枝黄花',
                origPrice:1,
                price:3,
                number:3,
                unit:'kg',
                total:9,
                comment:'来来来'*/
            },
            editOfferParam:{
                show:false,
                link:'/intlIntention/itemOffer',
                /*id:'',
                intentionId:'',
                inquireId:'',
                type:0,
                currency:'',
                itemId:'',
                itemName:'',
                origPrice:'',
                price:'',
                number:'',
                unit:'',
                total:'',
                comment:''*/
                id:'',
                intentionId:'',
                inquireId:'',
                type:0,
                currency:1,
                itemId:'',
                itemName:'',
                origPrice:'',
                price:'',
                number:'',
                unit:'',
                total:'',
                comment:''

            },
            otherOfferParam:{
                show:false,
                link:'/intlIntention/otherOffer',
                items:[],
                intentionId:this.param.id,
                inquireId:this.param.inquireId,


                /*id:12,
                intentionId:'58228a6688e87dc057d5e969',
                inquireId:7,
                type:1,
                currency:1,
                cost:2,
                costDesc:'运费+小费',
                total:2,
                comment:'啦啦啦'*/

            },
            editOtherOfferParam:{
                show:false,
                link:'/intlIntention/otherOffer',
                index:'',
                id:'',
                intentionId:'',
                inquireId:'',
                type:1,
                currency:'',
                cost:'',
                costDesc:'',
                total:'',
                comment:''
            },
            delOtherOfferParam:{
                show:false,
                link:'/intlIntention/otherOffer',
                name:'确认删除?',
                callback:this.delConfirm,
                confirm:true,
                id:'',
                index:'',
                type:''
            },
            uploadFilesParam:{
                link:'/intlIntention/files',
                show:false,
                bizId:'',   //意向ID
                category:'',   //上传类型 0/1 原附件/报价附件
                path:'',
                description:'',
                fileType:'', 
                image_f_show:''
                
            },
            delFileParam:{
                show:false,
                link:'/intlIntention/files',
                name:'确认删除文件?',
                callback:this.delFileConfirm,
                confirm:true,
                id:'',
                category:'',
                index:'', 
            },
            
        }
    },
    props:['param'],
    vuex: {
        getters:{
            initIntlIntentionDetail,
            initLogin
        },
        actions:{
            editintentInfo,
            getIntlIntentionDetail,
            delIntlIntentionOtherOffer,
            delIntlIntentionFiles
        }
    },
    methods: {
      
      enfoldment:function(param){
          if(this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].arr.length==0){
              this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show=true;
          }
          this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show = !this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show;
      },
     
     offer:function(){
        this.offerParam.show = true;
     },
     otherOffer:function(){
        this.otherOfferParam.show = true;
     },
     //获取询价详情
     getInquireInfo:function(id){
        console.log(id);
        this.inquireInfoParam.id = id;
        this.inquireInfoParam.show = true;

     },

     getItemHistory:function(id){
        this.itemHistoryParam.id = id;
        this.itemHistoryParam.show = true;
     },
     //编辑原材料报价
     editOffer:function(item,index){                          
        console.log(item);
        this.editOfferParam.id = item.offerId;    //?报价ID？？？没有
        this.editOfferParam.intentionId = item.intentionId;
        this.editOfferParam.inquireId = item.inquireId;
        this.editOfferParam.itemId = item.id;
        this.editOfferParam.itemName = item.breedName;
        this.editOfferParam.type = 0;    //0表示原材料报价
        this.editOfferParam.currency = item.offerCurrency;
        this.editOfferParam.origPrice = item.offerOrigPrice;
        this.editOfferParam.price = item.offerPrice;
        this.editOfferParam.number = item.offerNumber;
        this.editOfferParam.unit = item.offerUnit;
        //this.editOfferParam.total = item.total;
        this.editOfferParam.comment = item.offerComment;

        this.editOfferParam.index = index;
        this.editOfferParam.show = true;
     },
     //上传原文件
     uploadOriginalFiles:function(){
        this.uploadFilesParam.bizId = this.param.id;  
        this.uploadFilesParam.category = 0;
        this.uploadFilesParam.path = '';
        this.uploadFilesParam.description='';
        this.uploadFilesParam.fileType='';
        this.uploadFilesParam.image_f_show='';
        this.uploadFilesParam.show = true;
        console.log(this.uploadFilesParam);
        
     },
     //上传报价文件
     uploadOfferFiles:function(){
        this.uploadFilesParam.bizId = this.param.id;  
        this.uploadFilesParam.category = 1;
        this.uploadFilesParam.path = '';
        this.uploadFilesParam.description='';
        this.uploadFilesParam.fileType='';
        this.uploadFilesParam.image_f_show='';
        this.uploadFilesParam.show = true;
        console.log(this.uploadFilesParam);
     },
     delFile:function(item,index){
        this.delFileParam.id = item.id;
        this.delFileParam.category = item.category;
        this.delFileParam.index = index;
        this.delFileParam.show = true;
     },
     delFileConfirm:function(){
        this.delIntlIntentionFiles(this.delFileParam);
     },
     
      //新建其他报价和编辑其他报价共用一个界面
     addOtherOffer:function(){

        console.log(this.param);
        this.editOtherOfferParam.id='';
        this.editOtherOfferParam.intentionId = this.param.id;
        this.editOtherOfferParam.inquireId=this.param.inquireId;
        this.editOtherOfferParam.type=1;
        this.editOtherOfferParam.currency='';
        this.editOtherOfferParam.cost='';
        this.editOtherOfferParam.costDesc='';
        this.editOtherOfferParam.total='';
        this.editOtherOfferParam.comment='';
        this.editOtherOfferParam.show = true;
     },
     editOtherOffer:function(item,index){
        
        this.editOtherOfferParam.id=item.id;
        this.editOtherOfferParam.intentionId=item.intentionId;
        this.editOtherOfferParam.inquireId=item.inquireId;
        this.editOtherOfferParam.type=item.type;
        this.editOtherOfferParam.currency=item.currency;
        this.editOtherOfferParam.cost=item.cost;
        this.editOtherOfferParam.costDesc=item.costDesc;
        this.editOtherOfferParam.total=item.total;
        this.editOtherOfferParam.comment=item.comment;
        this.editOtherOfferParam.index = index;
        this.editOtherOfferParam.show = true;

     },
     delOtherOffer:function(item,index){
        this.delOtherOfferParam.id=item.id;
        this.delOtherOfferParam.type=item.type;
        this.delOtherOfferParam.index = index;
        this.delOtherOfferParam.show = true;

     },
     delConfirm:function(){
        this.delIntlIntentionOtherOffer(this.delOtherOfferParam);
     }
     
      
    },
    created(){
      console.log(this.param);
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
.breed_action{
  top: 20px;
  right: 40px;
}
.files_action{
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
.files_action:hover{
  color: #fa6705;
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
  z-index: 100;
  width: 70%;
  right: 0;
  top: 91px;
  position: fixed;
  margin: auto;
  left: 0;
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
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
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

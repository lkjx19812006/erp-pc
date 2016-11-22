<template>
    <offer-model :param="offerParam" v-if="offerParam.show"></offer-model>
    <inquireinfo-model :param="inquireInfoParam" v-if="inquireInfoParam.show"></inquireinfo-model>
    <itemhistory-model :param="itemHistoryParam" v-if="itemHistoryParam.show"></itemhistory-model>
    <uploadfiles-model :param="uploadFilesParam" v-if="uploadFilesParam.show"></uploadfiles-model>
    <otheroffer-model :param="otherOfferParam" v-if="otherOfferParam.show"></otheroffer-model>
    <inquireagain-model :param="inquireAgainParam" v-if="inquireAgainParam.show"></inquireagain-model>
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
            <div class="client-section clearfix" >
                <div class="col-md-12">
                    <h4 class="section_title">{{$t('static.detailed_information')}}</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.client_name')}}：</label>
                                    <span>{{initIntlIntentionDetail.customerName}}</span>
                                     
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.commodity_items')}}：</label>
                                    <span>{{initIntlIntentionDetail.names}}</span>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12" >
                                    <label class="editlabel">{{$t('static.client_email')}}：</label>
                                    <span>{{initIntlIntentionDetail.customerEmail}}</span>
                                    
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.country')}}：</label>
                                    <span>{{initIntlIntentionDetail.country}}</span>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                
                            </div>

                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.province')}}：</label>
                                    <span>{{initIntlIntentionDetail.province}}</span>
                                     
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.city')}}：</label>   
                                    <span>{{initIntlIntentionDetail.city}}</span>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12" >
                                    <label class="editlabel">{{$t('static.area')}}：</label>
                                    <span>{{initIntlIntentionDetail.district}}</span>
                                    
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">{{$t('static.description')}}：</label>
                                    <span>{{initIntlIntentionDetail.description}}</span>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                
                            </div>

                          
                        </div>
                    </article>
                </div>

                <div class="col-md-11 client-detail">
                    <h4 class="section_title">相关</h4>
                    <article>
                        <div class="panel-group">
                            
                          <div class="panel panel-default" >
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
                                          <!-- <th></th>
                                          <th></th> -->
                                          
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.inquires.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td><a class="underline" @click="getInquireInfo(item.id)">{{item.inquireType}}</a></td>
                                                <td>{{item.comment}}</td>
                                                <td>{{item.ctime}}</td>
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
                                          <!-- <th>{{$t('static.cost')}}</th> -->
                                          <th>{{$t('static.quoted_price')}}</th>
                                          <th>{{$t('static.quantity')}}</th>
                                          <th>{{$t('static.unit')}}</th>
                                          <th>{{$t('static.inquiry_again')}}</th>
                                          <th>{{$t('static.quote_again')}}</th>
                                          <th></th>
                                          <th></th> 
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.items.arr">
                                                <td><a style="cursor:pointer" @click="getItemHistory(item.id)">{{item.breedName}}</a></td>
                                                <!-- <td>{{item.origPrice}}</td> -->
                                                <td>{{item.price}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.unit}}</td>
                                                <td>{{item.again | requireAgain}}</td>
                                                <td>{{item.offerAgain | offerAgain}}</td>
                                                <td><a style="cursor:pointer" @click="inquireAgain(item,$index)" v-if="item.again==0"><img src="/static/images/{{$t('static.img_rerequire')}}.png" alt="再次询价" /></a></a></td> 
                                                <td></td>
                                            </tr>
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
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-if="initIntlIntentionDetail.offers.arr.length">
                                          {{$t('static.other_quotations')}}（{{initIntlIntentionDetail.offers.arr.length}}）
                                        </a>
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                          {{$t('static.other_quotations')}}（0）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                  </h4>
                              </div>

                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.offers.show&&initIntlIntentionDetail.offers.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>{{$t('static.currency')}}</th>
                                          <th>{{$t('static.expense')}}</th>
                                          <th>{{$t('static.expense_explanation')}}</th>
                                          <th>{{$t('static.all_in_cost')}}</th>
                                          <th>{{$t('static.comment')}}</th>
                                          <!-- <th></th>
                                          <th></th> -->
                                         
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.offers.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.currency | Currency}}</td>
                                                <td>{{item.cost}}</td>
                                                <td>{{item.costDesc}}</td>
                                                <td>{{item.total}}</td>
                                                <td>{{item.comment}}</td>
                                                <!-- <td><a style="cursor:pointer" @click="editOtherOffer(item,$index)">编辑</a></td>
                                                <td><a style="cursor:pointer" @click="delOtherOffer(item,$index)">删除</a></td> -->
                                               
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
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.files.show&&initIntlIntentionDetail.files.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <!-- <th>{{$t('static.file_path')}}</th> -->
                                          <th>{{$t('static.file_type')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                          <th>{{$t('static.create_time')}}</th>
                                          <th></th>
                                          <th></th>
                                          
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.files.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                               <!--  <td v-if="item.fileType=='image'"><img :src="item.url"/></td>
                                               <td v-else></td> -->
                                                <td>{{item.fileType}}</td>
                                                <td>{{item.description}}</td>
                                                <td>{{item.ctime}}</td>
                                                <td><a href="{{item.url}}" download=""><img src="/static/images/{{$t('static.img_download')}}.png" alt="下载" /></a></td>
                                                <td><a @click="delFile(item,$index)"><img src="/static/images/{{$t('static.img_del')}}.png" alt="删除" /></a></td>
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
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.offerFiles.show&&initIntlIntentionDetail.offerFiles.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <!-- <th>{{$t('static.file_path')}}</th> -->
                                          <th>{{$t('static.file_type')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                          <th>{{$t('static.create_time')}}</th>
                                          <th></th>
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
                                                <td><a href="{{item.url}}" download=""><img src="/static/images/{{$t('static.img_download')}}.png" alt="下载" /></a></td>
                                                <td><a @click="delFile(item,$index)"><img src="/static/images/{{$t('static.img_del')}}.png" alt="删除" /></a></td>
                                                <td></td>
                                               
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
import offerModel from './intlOffer'
import inquireinfoModel from './inquireInfo'
import itemhistoryModel from './itemHistory'
import otherofferModel from './otherOffer'
import inquireagainModel from './inquireAgain'
import uploadfilesModel from './uploadFiles'
import delfileModel from '../tips/tipDialog'
import{
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
        offerModel,
        inquireinfoModel,
        itemhistoryModel,
        otherofferModel,
        inquireagainModel,
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
                showCost:false,             //是否显示成本价,true显示,false不显示
                link:'/intlIntention/inquire/',
                id:''
            },
            itemHistoryParam:{
                show:false,
                showCost:false,             //是否显示成本价,true显示,false不显示
                link:'/intlIntention/itemHistory',
                id:''                               //意向明细ID

            },
            inquireAgainParam:{
              show:false,
              link:'/intlIntention/itemInquire',
              itemId:'',
              index:'',
              description:'',

            },
            offerParam:{
                show:false,
                link:'/intlIntention/itemOffer',
                id:9,
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
                comment:'来来来'
            },
            otherOfferParam:{
                show:false,
                link:'/intlIntention/otherOffer',
                id:9,
                intentionId:'58228a6688e87dc057d5e969',
                inquireId:7,
                type:1,
                currency:1,
                cost:2,
                costDesc:'运费+小费',
                total:2,
                comment:'啦啦啦'

            },
            uploadFilesParam:{
                link:'/intlIntention/files',
                show:false,
                bizId:'',   //意向ID
                category:'',   //上传类型 0/1 原文件/报价附件
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
      delFileConfirm:function(){
                this.delIntlIntentionFiles(this.delFileParam);
             },
     inquireAgain:function(item,index){
        console.log(item);
        this.inquireAgainParam.itemId = item.id;
        this.inquireAgainParam.index = index;
        this.inquireAgainParam.show = true;

     },
      delFile:function(item,index){
        this.delFileParam.id = item.id;
        this.delFileParam.category = item.category;
        this.delFileParam.index = index;
        this.delFileParam.show = true;
     },
     offer:function(){
        this.offerParam.show = true;
     },
     otherOffer:function(){
        this.otherOfferParam.show = true;
     },    
     uploadOriginalFiles:function(){
        this.uploadFilesParam.bizId = this.param.id;  
        this.uploadFilesParam.category = 0;
        this.uploadFilesParam.path = '';
        this.uploadFilesParam.description='';
        this.uploadFilesParam.fileType='';
        this.uploadFilesParam.image_f_show='';
        this.uploadFilesParam.show = true;
        console.log(this.uploadFilesParam);
        
     }
      
    },
    created(){
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
.client-detailInfo label{
  display: inline-block;
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

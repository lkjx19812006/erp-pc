<template>
    <offer-model :param="offerParam" v-if="offerParam.show"></offer-model>
    <otheroffer-model :param="otherOfferParam" v-if="otherOfferParam.show"></otheroffer-model>
    <inquireagain-model :param="inquireAgainParam" v-if="inquireAgainParam.show"></inquireagain-model>
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
                    <h4 class="section_title">详情</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-2 col-xs-12">
                                    <label class="editlabel">客户名称：{{initIntlIntentionDetail.customerName}}</label>
                                     
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">电话：18702961510</label>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12" >
                                    <label class="editlabel">QQ：857714244</label>
                                    
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">邮箱：857714244@qq.com</label>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                
                            </div>

                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-2 col-xs-12">
                                    <label class="editlabel">客户名称：刘振领</label>
                                     
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">电话：18702961510</label>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12" >
                                    <label class="editlabel">QQ：857714244</label>
                                    
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">邮箱：857714244@qq.com</label>
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
                            
                          <div class="panel panel-default">
                              <div class="panel-heading" v-cloak>
                                <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:initIntlIntentionDetail.inquires,
                                            crete:'inquires'
                                            })">
                                      <img class="pull-left" src="/static/images/offer.png" height="29" width="26"  />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                        询价记录（{{initIntlIntentionDetail.inquires.arr.length}}）
                                      </a>
                                      <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.inquires.show&&initIntlIntentionDetail.inquires.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>询价类型</th>
                                          <th>备注</th>
                                          <th>创建时间</th>
                                          <!-- <th></th>
                                          <th></th> -->
                                          
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.inquires.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.inquireType}}</td>
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
                                        条目详情（{{initIntlIntentionDetail.items.arr.length}}）
                                      </a>
                                      <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.items.show&&initIntlIntentionDetail.items.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>产品名</th>
                                          <th>成本</th>
                                          <th>报价</th>
                                          <th>数量</th>
                                          <th>单位</th>
                                          <th></th>
                                          <th></th> 
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.items.arr">
                                                <td>{{item.breedName}}</td>
                                                <td>{{item.origPrice}}</td>
                                                <td>{{item.price}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.unit}}</td>
                                                <td><a style="cursor:pointer" @click="inquireAgain(item,$index)">再次询价</a></td> 
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
                                        <img class="pull-left" src="/static/images/msg.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          其他报价（{{initIntlIntentionDetail.offers.arr.length}}）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                  </h4>
                              </div>

                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.offers.show&&initIntlIntentionDetail.offers.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>货币</th>
                                          <th>费用</th>
                                          <th>费用说明</th>
                                          <th>总费用</th>
                                          <th>备注</th>
                                          <!-- <th></th>
                                          <th></th> -->
                                         
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.offers.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.currency}}</td>
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
                                        <img class="pull-left" src="/static/images/msg.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          原文件（{{initIntlIntentionDetail.files.arr.length}}）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.files.show&&initIntlIntentionDetail.files.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>会员名</th>
                                          <th>备注</th>
                                          <th>回复</th>
                                          <th>回复人</th>
                                          <th></th>
                                          <th></th>
                                          <th></th>
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.files.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.fullname}}</td>
                                                <td>{{item.comments}}</td>
                                                <td>{{item.reply}}</td>
                                                <td>{{item.replier}}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td  @click="clickShow($index,{
                                                    concrete:'files'
                                                    })">
                                                    <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="files_action" v-show="item.show" >
                                                        <dl>
                                                            <dt @click="edit($index,item)">修改备注</dt>
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
                              <div class="panel-heading" v-cloak>
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initIntlIntentionDetail.offerFiles,
                                              crete:'offerFiles'
                                              })">
                                        <img class="pull-left" src="/static/images/msg.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          报价文件（{{initIntlIntentionDetail.offerFiles.arr.length}}）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntlIntentionDetail.offerFiles.show&&initIntlIntentionDetail.offerFiles.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>会员名</th>
                                          <th>备注</th>
                                          <th>回复</th>
                                          <th>回复人</th>
                                          <th></th>
                                          <th></th>
                                          <th></th>
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntlIntentionDetail.offerFiles.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.fullname}}</td>
                                                <td>{{item.comments}}</td>
                                                <td>{{item.reply}}</td>
                                                <td>{{item.replier}}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td  @click="clickShow($index,{
                                                    concrete:'offers'
                                                    })">
                                                    <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="files_action" v-show="item.show" >
                                                        <dl>
                                                            <dt @click="edit($index,item)">修改备注</dt>
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

            </div>
        </section>
    </div>
</template>
<script>

import filter from '../../filters/filters'
import offerModel from './intlOffer'
import otherofferModel from './otherOffer'
import inquireagainModel from './inquireAgain'
import{
    initIntlIntentionDetail,
    initLogin
} from '../../vuex/getters'
import {
    editintentInfo,
    getIntlIntentionDetail
} from '../../vuex/actions'
export default {
    components: {
        filter,
        offerModel,
        otherofferModel,
        inquireagainModel
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            inquireAgainParam:{
              show:false,
              link:'/intlIntention/itemInquire',
              itemId:'',
              comment:'',

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

            }
            
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
            getIntlIntentionDetail
        }
    },
    methods: {
      
      enfoldment:function(param){
          if(this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].arr.length==0){
                  this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show=true;
          }
          this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show = !this.$store.state.table.basicBaseList.intlIntentionDetail[param.crete].show;
      },
     inquireAgain:function(item,index){
        console.log(item);
        this.inquireAgainParam.itemId = item.id;
        this.inquireAgainParam.show = true;

     },

     offer:function(){
        this.offerParam.show = true;
     },
     otherOffer:function(){
        this.otherOfferParam.show = true;
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

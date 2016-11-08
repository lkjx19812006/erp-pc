<template>
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
                                            link:initIntentionDetail.offers,
                                            crete:'offers'
                                            })">
                                      <img class="pull-left" src="/static/images/offer.png" height="29" width="26"  />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                        报价明细（{{initIntentionDetail.offers.arr.length}}）
                                      </a>
                                      <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntentionDetail.offers.show&&initIntentionDetail.offers.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>会员名</th>
                                          <th>联系方式</th>
                                          <th>单价</th>
                                          <th>数量</th>
                                          <th>单位</th>
                                          <th>杂费</th>
                                          <th>杂费说明</th>
                                          <th>是否已采纳</th>
                                          <th></th>
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initIntentionDetail.offers.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.userName}}</td>
                                                <td>{{item.userPhone}}</td>
                                                <td>{{item.price}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.unit}}</td>
                                                <td>{{item.incidentals}}</td>
                                                <td>{{item.incidentalsDesc}}</td>
                                                <td>
                                                  <div v-if="item.orderTime==0">未采纳</div>
                                                  <div v-else>已采纳</div>

                                                </td>
                                                <td v-if="item.orderTime==0"  @click="clickShow($index,{
                                                    concrete:'offers'
                                                    })">
                                                    <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="files_action" v-show="item.show" >
                                                        <dl>
                                                            <dt @click="adopt(item,$index)">采纳</dt>
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
                                              link:initIntentionDetail.msgs,
                                              crete:'msgs'
                                              })">
                                        <img class="pull-left" src="/static/images/msg.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          其他报价（{{initIntentionDetail.msgs.arr.length}}）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntentionDetail.msgs.show&&initIntentionDetail.msgs.arr.length>0">
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
                                             <tr v-for="item in initIntentionDetail.msgs.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.fullname}}</td>
                                                <td>{{item.comments}}</td>
                                                <td>{{item.reply}}</td>
                                                <td>{{item.replier}}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td  @click="clickShow($index,{
                                                    concrete:'msgs'
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
                                              link:initIntentionDetail.msgs,
                                              crete:'msgs'
                                              })">
                                        <img class="pull-left" src="/static/images/msg.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          原文件（{{initIntentionDetail.msgs.arr.length}}）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="initIntentionDetail.msgs.show&&initIntentionDetail.msgs.arr.length>0">
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
                                             <tr v-for="item in initIntentionDetail.msgs.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.fullname}}</td>
                                                <td>{{item.comments}}</td>
                                                <td>{{item.reply}}</td>
                                                <td>{{item.replier}}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td  @click="clickShow($index,{
                                                    concrete:'msgs'
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
import{
    initIntentionDetail,
    initLogin
} from '../../vuex/getters'
import {
    editintentInfo,
    getIntentionDetail
} from '../../vuex/actions'
export default {
    components: {
        filter,
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            
        }
    },
    props:['param'],
    vuex: {
        getters:{
            initIntentionDetail,
            initLogin
        },
        actions:{
            editintentInfo,
            getIntentionDetail
        }
    },
    methods: {
      saveSucc:function(param){
           this.tipsParam.show= true;
           this.editintentInfo(param);
      },
      enfoldment:function(param){
          if(this.$store.state.table.basicBaseList.intentionDetail[param.crete].arr.length==0){
                  this.$store.state.table.basicBaseList.intentionDetail[param.crete].show=true;
          }
          this.$store.state.table.basicBaseList.intentionDetail[param.crete].show = !this.$store.state.table.basicBaseList.intentionDetail[param.crete].show;
      },
      clickShow: function(index,param) {
          this.$store.state.table.basicBaseList.intentionDetail[param.concrete].arr[index].show = !this.$store.state.table.basicBaseList.intentionDetail[param.concrete].arr[index].show;
      },
      adopt:function(item,index){
          console.log("创建订单");
          console.log(item);

          this.orderParam.show = true;
          this.orderParam.index = index;
          //this.orderParam.customer = item.customerId;
          this.orderParam.goods[0].sourceId = item.id;
          this.orderParam.goods[0].spec = item.spec;
          this.orderParam.goods[0].price = item.price;
          this.orderParam.goods[0].unit = item.unit;
          this.orderParam.goods[0].number = item.number;
          this.orderParam.incidentals = item.incidentals;
          this.orderParam.incidentalsDesc = item.incidentalsDesc;
          this.orderParam.goods[0].quality = item.quality;
          this.orderParam.goods[0].location = item.location;
      },
      edit:function(index,item){
        console.log(item)
          this.updateParam.index = index;
          this.updateParam.id = item.id;
          this.updateParam.show = true;
          this.updateParam.comments = item.comments;
      },
      createTracking:function(item){
        item.show=!item.show;
        item.bizId=this.initIntentionDetail.id;
        if(this.initIntentionDetail.customerId){
          item.objId=this.initIntentionDetail.customerId;
          item.type=0;
        }else{
          item.objId=this.initIntentionDetail.userId;
          item.type=1;
        }
          item.breedName=this.initIntentionDetail.breedName;
          item.spec=this.initIntentionDetail.spec;
          item.location=this.initIntentionDetail.location;
          item.number=this.initIntentionDetail.number;
          item.unit=this.initIntentionDetail.unit;
          item.price=this.initIntentionDetail.price;
        item.bizType=1;
        this.trackingParam = item;
        this.trackingParam.show = true;
        this.trackingParam.flag = 0;   //0表示添加
      },
      updateTracking:function(item,index){
        item.show=!item.show;
        item.index = index;
        this.trackingParam = item;
        this.trackingParam.flag = 1;   //1表示修改
        this.trackingParam.show = true;
      }
    },
    created(){
       this.getIntentionDetail(this.param,);
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

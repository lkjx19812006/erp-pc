<template>
  <tracking-model :param="trackingParam" v-if="trackingParam.show"></tracking-model>
  <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
  <createorder-model :param="orderParam" v-if="orderParam.show"></createorder-model>
  <editmsg-model :param.sync="updateParam" v-if="updateParam.show"></editmsg-model>
  <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
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
                <div class="col-md-8 client-detail">
                    <h4 class="section_title">相关</h4>
                    <article>
                        <div class="panel-group">

                          <div class="panel panel-default" v-if="param.type===0">
                              <div class="panel-heading" v-cloak>
                              <!-- <div class="cover_loading">
                                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                              </div> -->
                                <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:initIntentionDetail.offers,
                                            crete:'offers'
                                            })">
                                      <img class="pull-left" src="/static/images/offer.png" height="29" width="26"  />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                        报价（{{initIntentionDetail.offers.arr.length}}）
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
                                          <th>操作</th>
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
                                                <td v-if="item.orderTime==0"  @click="adopt(item,$index)">
                                                     <a class="operate"><img src="/static/images/adopt.png" height="18" width="46"  alt="我要采纳" title="我要采纳"/>
                                                    </a>
                                                    <!-- <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="files_action" v-show="item.show" >
                                                        <dl>
                                                            <dt @click="adopt(item,$index)">采纳</dt>
                                                        </dl>
                                                    </div> -->
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
                                          留言（{{initIntentionDetail.msgs.arr.length}}）
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
                                                <td @click="edit($index,item)">
                                                  <a class="operate"><img src="/static/images/upremark.png" height="18" width="48"  alt="修改备注" title="修改备注"/>
                                                    </a>
                                                </td>
                                               <!--  <td  @click="clickShow($index,{
                                                   concrete:'msgs'
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
                                              link:initIntentionDetail.trackings,
                                              crete:'trackings'
                                              })">
                                <img class="pull-left" src="/static/images/follow-up.png" height="29" width="26"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                  跟进（{{initIntentionDetail.trackings.arr.length}}）
                                </a>
                                <button type="button" class="btn btn-base pull-right" @click.stop="createTracking({
                                          objId:initIntentionDetail.id,
                                          bizId:'',
                                          bizName:'',
                                          type:0,
                                          trackingWay:'',
                                          bizType:'',
                                          contactNo:'',
                                          comments:'',
                                          show:false
                                        })">新建</button>
                              </h4>
                            </div>
                            <div  class="panel-collapse" v-show="initIntentionDetail.trackings.show&&initIntentionDetail.trackings.arr.length>0">
                              <div class="panel-body panel-set">
                                <table class="table contactSet">
                                  <thead>
                                    <th>业务类型</th>
                                    <th>跟进方式	</th>
                                    <th>联系账号</th>
                                    <th>备注</th>
                                    <th>操作</th>
                                  </thead>
                                  <tbody>
                                  <tr v-for="item in initIntentionDetail.trackings.arr">
                                    <!-- <td><img :src="item.path" /></td> -->
                                      <td v-if="item.bizType==0">会员</td>
                                      <td v-if="item.bizType==1">意向</td>
                                      <td v-if="item.bizType==2">订单</td>
                                      <td v-if="item.bizType!=0&&item.bizType!=1&&item.bizType!=2">会员</td>
                                      <td>{{item.trackingWay}}</td>
                                      <td>{{item.contactNo}}</td>
                                      <td>{{item.comments}}</td>
                                      <td @click="updateTracking(item,$index)">
                                        <a class="operate"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
                                          </a>
                                      </td>
                                      <!-- <td  @click="clickShow($index,{
                                                      concrete:'trackings'
                                                      })">
                                        <img src="/static/images/default_arrow.png" height="24" width="24" />
                                        <div class="files_action" v-show="item.show" >
                                          <dl>
                                            <dt @click="updateTracking(item,$index)">编辑</dt>
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
                <div class="col-md-12">
                    <h4 class="section_title">详情</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-2 col-xs-12">
                                    <label class="editlabel">客户名称</label>
                                     <input type="text" class="form-control edit-input"  v-model="param.customerName" value="{{param.customerName}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">类型</label>
                                    <input type="text" class="form-control edit-input"  v-if="param.type==0&&param.especial==1" value="紧急求购" disabled="disabled"/>
                                    <input type="text" class="form-control edit-input"  v-if="param.type==1&&param.especial==1" value="低价资源" disabled="disabled"/>
                                    <input type="text" class="form-control edit-input"  v-if="param.especial==0" value="普通" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12" >
                                    <label class="editlabel">品种名称</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.breedName" value="{{param.breedName}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">客户手机号</label>
                                     <input type="text" class="form-control edit-input"  v-model="param.customerPhone" value="{{param.customerPhone}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <!-- <div class="client-detailInfo  col-md-2 col-xs-12" >
                                    <label class="editlabel">是否特殊</label>
                                    <select  class="form-control edit-input"  v-model="param.especial" disabled="disabled">
                                            <option value="0">普通</option>
                                            <option value="1">特殊</option>
                                    </select>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div> -->
                            </div>

                            <div class="clearfix"> 
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">国家</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.country" value="{{param.country}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">所在省</label>
                                     <input type="text" class="form-control edit-input"   v-model="param.province" value="{{param.province}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">所在市</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.city" value="{{param.city}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                 <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">所在区</label>
                                     <input type="text" class="form-control edit-input"  v-model="param.district" value="{{param.district}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                            </div>

                            <div class="clearfix">
                               
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">数量</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.number" value="{{param.number}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">产地</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.location" value="{{param.location}}"  disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">资质证书</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.qualification" value="{{param.qualification}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">规格</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.spec" value="{{param.spec}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                            </div>

                            <div class="clearfix">
                                
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">单位</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.unit" value="{{param.unit}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">交收地址</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.address" value="{{param.address}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">预付比例 </label>
                                    <input type="text" class="form-control edit-input"  v-model="param.advance" value="{{param.advance}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                 <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">发票</label>
                                   <select  class="form-control edit-input"  v-model="param.invoic" disabled="disabled">
                                        <option value="0">无发票</option>
                                        <option value="1">普通发票</option>
                                        <option value="2">增值发票</option>
                                    </select>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                            </div>

                            <div class="clearfix">
                               
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">上门看货</label>
                                    <select  class="form-control edit-input"  v-model="param.visit" disabled="disabled">
                                        <option value="0">不看</option>
                                        <option value="1">会</option>
                                    </select>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">包装</label>
                                    <input type="text" class="form-control edit-input" v-model="param.pack" value="{{param.pack}}"  disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">是否国际</label>
                                    <select  class="form-control edit-input"  v-model="param.intl" disabled="disabled">
                                        <option value="0">国内</option>
                                        <option value="1">国际</option>
                                    </select>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">提供样品</label>
                                    <select  class="form-control edit-input"  v-model="param.sampling" disabled="disabled">
                                        <option value="0">无</option>
                                        <option value="1">有</option>
                                    </select>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                            </div>

                            <div class="clearfix">
                                
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">样品数量</label>
                                    <input type="text" class="form-control edit-input" v-model="param.sampleNumber" value="{{param.sampleNumber}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">样品单位</label>
                                    <input type="text" class="form-control edit-input" v-model="param.sampleUnit" value="{{param.sampleUnit}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">样品总价</label>
                                    <input type="text" class="form-control edit-input" v-model="param.sampleAmount" value="{{param.sampleAmount}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">单价</label>
                                    <input type="text" class="form-control edit-input" v-model="param.price" value="{{param.price}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                            </div>

                            <div class="clearfix">
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">状态</label>
                                    <select  class="form-control edit-input"  v-model="param.status" disabled="disabled">
                                        <option value="0">待审</option>
                                        <option value="1">通过</option>
                                    </select>
                                </div>
                                <div class="client-detailInfo col-md-1 col-xs-12"></div>
                                <div class="client-detailInfo col-md-2 col-xs-12">
                                    <label class="editlabel">预览</label>
                                    <img v-for="item in initIntentionDetail.pics" :src="item.url"  width="150px;" @click="clickBig(item.url)"/>
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
import trackingModel from  '../user/userTracking'
import filter from '../../filters/filters'
import tipsdialogModel  from '../tipsDialog'
import createorderModel  from './createOrder'
import editmsgModel from './editMsg'
import pictureModel from '../tips/pictureDialog'
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
        tipsdialogModel,
        createorderModel,
        editmsgModel,
        trackingModel,
        pictureModel
    },
    data() {
        return {
            changeShow: true,
            trackingParam:{
                show:false,
                bizType:1,
                breedName:'',
                spec:'',
                location:'',
                number:'',
                unit:'',
                price:'',
                total:0
            },
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            tipsParam:{
                show:false,
                name:'修改成功'
            },
            pictureParam:{
              show:false,
              img:''
            },
            orderParam:{
                show:false,
                index:'',
                key:'intentionDetail',
                type:this.initIntentionDetail.type,
                customer:this.initIntentionDetail.customerId,
                sample:0,
                intl:0,
                employee:this.initLogin.id,   //业务员ID
                org:this.initLogin.orgId,    //部门ID
                incidentals:'',
                incidentalsDesc:'',
                preferential:'',   //优惠金额
                preferentialDesc:'',
                currency:'',     //货币品种
                consignee:'',    //收货人姓名
                consigneePhone:'',
                zipCode:'',     //邮编
                country:'',
                province:'',
                city:'',
                district:'',
                consigneeAddr:'',
                comments:'',
                sourceType:1,    //来源类型(意向)
                orderStatus:0,   //订单状态
                goods:[{
                  sourceType:2,   //商品来源类型(报价)
                  sourceId:'',   //商品来源ID
                  title:'',      //订单商品标题
                  breedId:this.initIntentionDetail.breedId,
                  breedName:this.initIntentionDetail.breedName,
                  quality:'',
                  location:'',
                  spec:'',
                  price:'',
                  unit:'',
                  number:''
              }]

            },
            updateParam:{
                show:false,
                index:'',
                comments:'',
                key:'intentionDetail',
                id:''
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
      clickBig:function(img){
          this.pictureParam.show=true;
          this.pictureParam.img = img;
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
.table{
  display: table;
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

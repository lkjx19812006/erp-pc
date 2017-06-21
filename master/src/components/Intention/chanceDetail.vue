<template>
    <tracking-model :param="trackingParam" v-if="trackingParam.show"></tracking-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <createorder-model :param="orderParam" v-if="orderParam.show"></createorder-model>
    <editmsg-model :param.sync="updateParam" v-if="updateParam.show"></editmsg-model>
    <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
    <label-model :param="labelParam" v-if="labelParam.show"></label-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
    <div class="container modal_con modal_overall" v-show="param.show">
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
                        <span class="navbar-brand navbar-name">
                        {{initIntentionDetail.type | intentionType initIntentionDetail.especial initIntentionDetail.preSell}}
                        {{initIntentionDetail.breedName}}
                        </span>
                    </div>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix">
                <div class="col-md-12">
                    <h4 class="section_title">详情：
                    {{initIntentionDetail.onSell | onsell}}
                    <span v-if="initIntentionDetail.onSell==2">
                        <Poptip placement="top" trigger="hover">
                            <span>({{initIntentionDetail.shelveTime | date}})</span>
                            <div class="api" slot="content">
                                上架时间
                            </div>
                        </Poptip>
                    </span>
                    <span v-if="initIntentionDetail.onSell==4">
                        <Poptip placement="top" trigger="hover">
                            <span>({{initIntentionDetail.unshelveTime | date}})</span>
                            <div class="api" slot="content">
                                下架时间
                            </div>
                        </Poptip>
                    </span>,
                    <Poptip placement="top" trigger="hover">
                        <span>{{initIntentionDetail.pubdate | date}}~{{initIntentionDetail.duedate | date}}</span>
                        <div class="api" slot="content">
                            发布时间~过期时间
                        </div>
                    </Poptip>

                    </h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo col-md-9 col-xs-12" style="max-height:300px;overflow-y: auto;">
                                    <span v-if="initIntentionDetail.pics.length>0" class="left">
                                        <label>品种图片：</label>
                                        <img v-for="item in initIntentionDetail.pics" :src="item.url" width="140px;" class="left" @click="clickBig(item.url)" />
                                    </span>
                                    <span v-if="initIntentionDetail.importQualityPics.length>0" class="left">
                                        <label>进口资质：</label>
                                        <img v-for="item in initIntentionDetail.importQualityPics" :src="item.url" width="140px;" class="left" @click="clickBig(item.url)" />
                                        
                                    </span>
                                    <span v-if="initIntentionDetail.testReportPics.length>0" class="left">
                                        <label >检测报告：</label>
                                        <img v-for="item in initIntentionDetail.testReportPics" :src="item.url" width="140px;" class="left" @click="clickBig(item.url)" />
                                    </span>
                                </div>
                            </div>
                            <div class="clearfix">
                                <p class="btn btn-primary btn-xs">意向信息</p>
                            </div>
                            <div class="clearfix">
                                <mg-label title="数量">{{initIntentionDetail.number}}{{initIntentionDetail.unit | Unit}}</mg-label>
                                <mg-label title="价格">{{initIntentionDetail.price}}元/{{initIntentionDetail.unit | Unit}}</mg-label>
                                <mg-label title="规格要求">{{initIntentionDetail.spec}}</mg-label>
                                <mg-label title="产地要求">{{initIntentionDetail.locationName}}</mg-label>
                                <mg-label title="质量要求">{{initIntentionDetail.quality}}</mg-label>
                                <div class="client-detailInfo col-md-12 col-xs-12">
                                    <label style="display:inline;font-size:14px;">备注说明：</label>
                                    <span style="font-size:14px;">{{initIntentionDetail.validate | intentionAudit}}({{initIntentionDetail.description}})</span>
                                </div>
                            </div>
                            <hr style="height:10px;border-color:#ccc" />
                            <div class="clearfix">
                                <label class="editlabel">
                                    <p class="btn btn-primary btn-xs">客户信息</p>
                                    <span style="font-weight:400">
                                        {{initIntentionDetail.customerName}}({{initIntentionDetail.customerPhone}})
                                    </span>
                                </label>
                            </div>
                            <hr style="height:10px;border-color:#ccc" />
                            <div class="clearfix">
                                <label class="editlabel">
                                    <p class="btn btn-primary btn-xs">交货地址</p>
                                    <span style="font-weight:400">
                                        {{initIntentionDetail.provinceName}} {{initIntentionDetail.cityName}} {{initIntentionDetail.districtName}} {{initIntentionDetail.address}}
                                    </span>
                                </label>
                            </div>
                            <hr style="height:10px;border-color:#ccc" />
                            <div class="clearfix" v-if="initIntentionDetail.sampling==1">
                                <label class="editlabel">
                                    <p class="btn btn-primary btn-xs">样品信息</p>
                                    <span style="font-weight:400">
                                        一份样品{{initIntentionDetail.sampleNumber}}{{initIntentionDetail.sampleUnit| Unit}}，总共{{initIntentionDetail.sampleAmount}}元
                                    </span>
                                </label>
                                <hr style="height:10px;border-color:#ccc" />
                            </div>
                            <div class="clearfix" v-if="param.type===0">
                                <label class="editlabel">
                                    <p class="btn btn-primary btn-xs">报价信息</p>
                                    <span style="font-weight:400">共{{initIntentionDetail.offerNumber}}人报价，报价平均价格{{initIntentionDetail.offerVprice}}元/{{initIntentionDetail.unit | Unit}}，供货总量为{{initIntentionDetail.offerTotal}}{{initIntentionDetail.unit|Unit}}</span>
                                </label>
                            </div>
                            <hr style="height:10px;border-color:#ccc" />
                            <div class="clearfix">
                                <p class="btn btn-primary btn-xs">其他信息</p>
                            </div>
                            <div class="clearfix">
                                <!-- <mg-label title="预付比例">{{initIntentionDetail.advance | advanced}}</mg-label> -->
                                <mg-label title="付款方式">{{initIntentionDetail.paymentWay}}</mg-label>
                                <mg-label title="发票说明">{{initIntentionDetail.invoic | invoicstate}}</mg-label>
                                <mg-label title="看货说明">{{initIntentionDetail.visit | visitstate}}</mg-label>
                                <mg-label title="来源">{{initIntentionDetail.source | intentionSource}}</mg-label>
                                <mg-label title="归属业务员">{{initIntentionDetail.employeeName}}</mg-label>
                                <div class="client-detailInfo col-md-12 col-xs-12">
                                    <label style="display:inline;font-size:14px;">{{$t('static.label')}}：</label>
                                    <Tag color="blue" v-for="item in initIntentionDetail.labels" closable @on-close="deleteLabel(item,$index)">{{item.label}}</Tag>
                                    <i-button icon="ios-plus-empty" type="dashed" size="small" @click="newlabel({
                                             intentionId:param.id,
                                             show:true,
                                             label:'',
                                             status:'',
                                             link:createLabel,
                                             url:'/intention/insertLabel',
                                             key:'labels'
                                             })">添加标签</i-button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-md-12 client-detail" @click.stop="">
                    <h4 class="section_title">相关</h4>
                    <article>
                        <div class="panel-group">
                            <div class="panel panel-default" v-if="param.type===0">
                                <div class="panel-heading" v-cloak>
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
                                <div class="panel-collapse" v-show="initIntentionDetail.offers.show&&initIntentionDetail.offers.arr.length>0">
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
                                                    <td>{{item.customerName}}</td>
                                                    <td>{{item.customerPhone}}</td>
                                                    <td>{{item.price}}</td>
                                                    <td>{{item.number}}</td>
                                                    <td>{{item.unit}}</td>
                                                    <td>{{item.incidentals}}</td>
                                                    <td>{{item.incidentalsDesc}}</td>
                                                    <td>
                                                        <div v-if="item.orderTime==0">未采纳</div>
                                                        <div v-else>已采纳</div>
                                                    </td>
                                                    <td>
                                                        <a class="operate" v-if="item.orderTime==0" @click="adopt(item,$index)">
                                                            <img src="/static/images/adopt.png" height="18" width="46" alt="我要采纳" title="我要采纳" />
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
                                <div class="panel-collapse" v-show="initIntentionDetail.msgs.show&&initIntentionDetail.msgs.arr.length>0">
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
                                                        <a class="operate"><img src="/static/images/upremark.png" height="18" width="48" alt="修改备注" title="修改备注" />
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
                                <div class="panel-collapse" v-show="initIntentionDetail.trackings.show&&initIntentionDetail.trackings.arr.length>0">
                                    <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                            <thead>
                                                <th>业务类型</th>
                                                <th>跟进方式 </th>
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
                                                        <a class="operate"><img src="/static/images/edit.png" height="18" width="30" alt="编辑" title="编辑" />
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
            </div>
        </section>
    </div>
</template>
<script>
import trackingModel from '../user/userTracking'
import filter from '../../filters/filters'
import tipsdialogModel from '../tipsDialog'
import createorderModel from './createOrder'
import editmsgModel from './editMsg'
import pictureModel from '../tips/pictureDialog'
import labelModel from './createLabel'
import mgLabel from '../mguan/mgLabel.vue'
import {
    initIntentionDetail,
    initLogin
} from '../../vuex/getters'
import {
    editintentInfo,
    getIntentionDetail,
    createLabel,
    addrDel
} from '../../vuex/actions'
export default {
    components: {
        filter,
        tipsdialogModel,
        createorderModel,
        editmsgModel,
        trackingModel,
        pictureModel,
        labelModel,
        mgLabel
    },
    data() {
        return {
            changeShow: true,
            trackingParam: {
                show: false,
                bizType: 1,
                breedName: '',
                spec: '',
                location: '',
                number: '',
                unit: '',
                price: '',
                total: 0
            },
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            tipsParam: {
                show: false,
                name: '修改成功'
            },
            pictureParam: {
                show: false,
                img: ''
            },
            labelParam: {
                show: false
            },
            delLabelParam: {
                id: '',
                sub: '',
                url: '/intention/deleteLabel/',
                key: 'labels',
                headline: 'basicBaseList',
                sign: 'intentionDetail'
            },
            orderParam: {
                show: false,
                index: '',
                key: 'intentionDetail',
                type: '',
                customer: '',
                customerName: '',
                sample: 0,
                intl: 0,
                employee: this.initLogin.id, //业务员ID
                org: this.initLogin.orgId, //部门ID
                incidentals: 0,
                incidentalsDesc: '',
                preferential: 0, //优惠金额
                preferentialDesc: '',
                currency: '', //货币品种
                consignee: '', //收货人姓名
                consigneePhone: '',
                consigner: '',
                zipCode: '', //邮编
                country: '',
                province: '',
                tradeTime: '',
                city: '',
                district: '',
                cost: 0,
                total: 0,
                consigneeAddr: '',
                comments: '',
                sourceType: 1, //来源类型(意向)
                orderStatus: 0, //订单状态
                goods: [{
                    sourceType: 2, //商品来源类型(报价)
                    sourceId: '', //商品来源ID
                    title: '', //订单商品标题
                    breedId: this.initIntentionDetail.breedId,
                    breedName: this.initIntentionDetail.breedName,
                    quality: '',
                    location: '',
                    spec: '',
                    price: '',
                    unit: '',
                    costPrice: '',
                    number: '',
                    image: ''
                }]

            },
            updateParam: {
                show: false,
                index: '',
                comments: '',
                key: 'intentionDetail',
                id: ''
            },
        }
    },
    props: ['param'],
    vuex: {
        getters: {
            initIntentionDetail,
            initLogin
        },
        actions: {
            editintentInfo,
            getIntentionDetail,
            createLabel,
            addrDel
        }
    },
    methods: {
        saveSucc: function(param) {
            this.tipsParam.show = true;
            this.editintentInfo(param);
        },
        enfoldment: function(param) {
            if (this.$store.state.table.basicBaseList.intentionDetail[param.crete].arr.length == 0) {
                this.$store.state.table.basicBaseList.intentionDetail[param.crete].show = true;
            }
            this.$store.state.table.basicBaseList.intentionDetail[param.crete].show = !this.$store.state.table.basicBaseList.intentionDetail[param.crete].show;
        },
        clickShow: function(index, param) {
            this.$store.state.table.basicBaseList.intentionDetail[param.concrete].arr[index].show = !this.$store.state.table.basicBaseList.intentionDetail[param.concrete].arr[index].show;
        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        adopt: function(item, index) {
            this.orderParam.type = this.initIntentionDetail.type;
            this.orderParam.customer = this.initIntentionDetail.customerId;
            this.orderParam.customerName = this.initIntentionDetail.customerName;
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
            if (item.pics.length > 0) { //如果有报价图片
                this.orderParam.goods[0].image = item.pics[0].path;
            }
            this.orderParam.callback = this.callback;
            console.log(this.orderParam)
        },
        edit: function(index, item) {
            console.log(item)
            this.updateParam.index = index;
            this.updateParam.id = item.id;
            this.updateParam.show = true;
            this.updateParam.comments = item.comments;
        },
        createTracking: function(item) {
            item.show = !item.show;
            item.bizId = this.initIntentionDetail.id;
            if (this.initIntentionDetail.customerId) {
                item.objId = this.initIntentionDetail.customerId;
                item.type = 0;
            } else {
                item.objId = this.initIntentionDetail.userId;
                item.type = 1;
            }
            item.breedName = this.initIntentionDetail.breedName;
            item.spec = this.initIntentionDetail.spec;
            item.location = this.initIntentionDetail.location;
            item.number = this.initIntentionDetail.number;
            item.unit = this.initIntentionDetail.unit;
            item.price = this.initIntentionDetail.price;
            item.bizType = 1;
            this.trackingParam = item;
            this.trackingParam.show = true;
            this.trackingParam.flag = 0; //0表示添加
        },
        updateTracking: function(item, index) {
            item.show = !item.show;
            item.index = index;
            this.trackingParam = item;
            this.trackingParam.flag = 1; //1表示修改
            this.trackingParam.show = true;
        },
        callback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
            console.log('..')
        },
        newlabel: function(item) {
            this.labelParam = item;
            this.labelParam.callback = this.callback;
        },
        deleteLabel: function(item, index) {
            this.delLabelParam.id = item.id;
            this.delLabelParam.sub = index;
            this.addrDel(this.delLabelParam);
        },

    },
    created() {
        this.getIntentionDetail(this.param);
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

.b_title {
    color: #337ab7
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

.modal_overall {
    width: 60%;
}

.top-title {
    z-index: 100;
    width: 60%;
    right: 0;
    top: 91px;
    position: fixed;
    margin: auto;
    left: 0;
}

.client-section {
    padding: 10px 5px 40px 5px;
}

.contactSet thead {
    color: #fa6705;
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

.editlabel {
    font-size: 14px;
    margin-bottom: 10px;
    display: block;
}

.api {
    color: #3399ff;
}
</style>

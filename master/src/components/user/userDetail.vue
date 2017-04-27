<template>
    <div>
        <tracking-model :param="trackingParam" v-if="trackingParam.show"></tracking-model>
        <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
        <personalauth-model :param="personalParam" v-if="personalParam.show"></personalauth-model>
        <companyauth-model :param="companyParam" v-if="companyParam.show"></companyauth-model>
        <intentionaudit-model :param="intentionAuditParam" v-if="intentionAuditParam.show"></intentionaudit-model>
        <tipsdialog-model :param="tipParam" v-if="tipParam.show"></tipsdialog-model>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
        <div class="container modal_con modal_overall" v-show="param.show" @click="param.show=false">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div class="client_nav">
                <nav class="navbar navbar-client" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                            <span class="navbar-brand navbar-name">{{initUserDetail.fullname}}</span>
                        </div>
                        <!--   <ul class="nav navbar-nav navbar-right" style="margin-top:8px;">

                        <li>
                            <button type="button" class="btn btn-base" @click="modifyUser({
                                               id:initUserDetail.id,
                                               show:true,
                                               loading:false,
                                               name:initUserDetail.name,
                                               nickname:initUserDetail.nickname,
                                               fullname:initUserDetail.fullname,
                                               type:initUserDetail.type,
                                               phone:initUserDetail.phone,
                                               email:initUserDetail.email,
                                               qq:initUserDetail.qq,
                                               index:param.sub,
                                               company:initUserDetail.company,
                                               comment:initUserDetail.comment,

                                               })">编辑</button>
                        </li>
                    </ul> -->
                    </div>
                </nav>
            </div>
            <section>
                <div class="client-section clearfix">
                    <div class="col-md-12">
                        <h4 class="section_title">详情</h4>
                        <article @click.stop="">
                            <div class="panel-group">
                                <div class="panel panel-default" style="border:none">
                                    <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>姓名：</label>{{initUserDetail.fullname}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>昵称：</label>{{initUserDetail.nickname}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>手机（归属地）：</label>{{initUserDetail.phone}}<span v-if="initUserDetail.province!==''">（{{initUserDetail.province}}）</span></div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>QQ：</label>{{initUserDetail.qq}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>公司：</label>{{initUserDetail.company}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>邮箱：</label>{{initUserDetail.email}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>经营类型：</label>{{initUserDetail.bizTypeName}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>来源：</label>{{initUserDetail.sourceType}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>主营业务：</label>{{initUserDetail.bizMain}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>身份证号：</label>{{initUserDetail.idnumber}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>重要等级：</label>{{importance[initUserDetail.importance]}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>审核状态：</label>{{initUserDetail.auditResult}}</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6" v-if="initUserDetail.transStatus==1">
                                            <label>划转状态：</label>已划转</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6" v-if="initUserDetail.transStatus!==1">
                                            <label>划转状态：</label>未划转</div>
                                        <div class="col-md-3 col-sm-4 col-xs-6">
                                            <label>会员星级：</label>{{grade[initUserDetail.grade]}}</div>
                                        <div class="col-md-12 col-sm-12 col-xs-12">
                                            <label>{{$t('static.comment')}}：</label>{{initUserDetail.comment}}</div>
                                    </ul>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initUserDetail.intention,
                                              crete:'intention'
                                              })">
                                        <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          会员意向（{{initUserDetail.intention.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="createIntention()">新建</button>
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="intentionAudit()">审核</button>
                                      </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="initUserDetail.intention.show">
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>
                                                        <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!initUserDetail.intention.checked,'checkbox_select':initUserDetail.intention.checked}" id="client_ids" @click="checkedAll()"></label>
                                                    </th>
                                                    <th>品种</th>
                                                    <th>产地</th>
                                                    <th>规格</th>
                                                    <th>数量</th>
                                                    <th>价格</th>
                                                    <th>单位</th>
                                                    <th>详细地址</th>
                                                    <th>意向类型</th>
                                                    <th>审核状态</th>
                                                    <th>审核备注</th>
                                                    <th>操作</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initUserDetail.intention.arr">
                                                        <td @click.stop="">
                                                            <label v-if="item.validate==0||item.validate==9" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                                                        </td>
                                                        <td>{{item.breedName}}</td>
                                                        <td>{{item.location}}</td>
                                                        <td>{{item.spec}}</td>
                                                        <td>{{item.number}}</td>
                                                        <td>{{item.price}}元</td>
                                                        <td>{{item.unit}}</td>
                                                        <td>{{item.address}}</td>
                                                        <td>
                                                            <div v-if="item.type==0">求购</div>
                                                            <div v-if="item.type==1">供应</div>
                                                        </td>
                                                        <!-- <td>{{item.validate | intentionAudit}}</td> -->
                                                        <td>
                                                            <div v-if="item.validate==-1" style="color:red">审核不通过</div>
                                                            <div v-if="item.validate==0">初始</div>
                                                            <div v-if="item.validate==1" style="color:green;">审核通过</div>
                                                            <div v-if="item.validate==9">审核中</div>
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                        <td>
                                                            <a class="operate" v-if="item.validate==-1||item.validate==0" @click="updateIntention(
                                                            intentionParam.loading=true,
                                                            intentionParam.sub=$index,
                                                            intentionParam.id=item.id,
                                                            intentionParam.breedName=item.breedName,
                                                            intentionParam.price=item.price,
                                                            intentionParam.unit=item.unit,
                                                            intentionParam.especial=item.especial,
                                                            intentionParam.quality=item.quality,
                                                            intentionParam.spec=item.spec,
                                                            intentionParam.number=item.number,
                                                            intentionParam.location=item.location,
                                                            intentionParam.type=item.type,
                                                            intentionParam.preSell=item.preSell,
                                                            intentionParam.country=item.country,
                                                            intentionParam.province=item.province,
                                                            intentionParam.city=item.city,
                                                            intentionParam.district=item.district,
                                                            intentionParam.address=item.address,
                                                            intentionParam.invoic=item.invoic,
                                                            intentionParam.sampling=item.sampling,
                                                            intentionParam.sampleUnit=item.sampleUnit,
                                                            intentionParam.advance=item.advance,
                                                            intentionParam.intl=item.intl,
                                                            intentionParam.sampleNumber=item.sampleNumber,
                                                            intentionParam.sampleAmount=item.sampleAmount,
                                                            intentionParam.qualification=item.qualification,
                                                            intentionParam.pack=item.pack,
                                                            intentionParam.visit=item.visit,
                                                            intentionParam.duedate=item.duedate,
                                                            intentionParam.breedId=item.breedId,
                                                            intentionParam.key='user',
                                                            intentionParam.validate=item.validate,
                                                            intentionParam.description=item.description,
                                                            intentionParam.inType=2,
                                                            intentionParam.pics=item.pics,
                                                            intentionParam.images='',
                                                            intentionParam.importQualityPics=item.importQualityPics,
                                                            intentionParam.importQualityImages='',
                                                            intentionParam.testReportPics=item.testReportPics,
                                                            intentionParam.testReportImages='',
                                                            intentionParam.callback=intentionCallback
                                                        )"><img src="/static/images/edit.png" height="18" width="30" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="personalEnfoldment({id:initUserDetail.id})">
                                        <img class="pull-left" src="/static/images/person.png" height="26" width="27" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          个人认证
                                        </a>
                                        <button v-if="initUserDetail.utype==0" type="button" class="btn btn-base pull-right"  @click.stop="" disabled="disabled">未申请认证</button>
                                        <button v-if="initUserDetail.utype==1" type="button" class="btn btn-primary pull-right"  @click.stop="personalAuth({id:initUserDetail.id,ucomment:initUserDetail.ucomment,utype:initUserDetail.utype})">点击认证</button>
                                        <button v-if="initUserDetail.utype==2" type="button" class="btn btn-success pull-right"  @click.stop="" disabled="disabled">已通过认证</button>
                                        <button v-if="initUserDetail.utype==3" type="button" class="btn btn-warning pull-right"  @click.stop="" disabled="disabled">认证未通过</button>

                                    </h4>
                                    </div>
                                    <!-- <div class="panel-collapse" v-show="initUserDetail.personalAuthShow&&initUserDetail.utype==1"> -->
                                    <div class="panel-collapse" v-show="initUserDetail.personalAuthShow&&initIdentify.files.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>文件类型</th>
                                                    <th>路径</th>
                                                    <th>描述</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initIdentify.files">
                                                        <td>{{item.fileType}}</td>
                                                        <td>
                                                            <img v-bind:src="item.path" @click="clickBig(item.path)" width='150px' />
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="companyEnfoldment({id:initUserDetail.id})">
                                      <img class="pull-left" src="/static/images/company1.png" height="26" width="30" style="margin-top:4px;" />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                        企业认证
                                      </a>
                                      <button v-if="initUserDetail.ctype==0" type="button" class="btn btn-base pull-right"  @click.stop="" disabled="disabled">未申请认证</button>
                                      <button v-if="initUserDetail.ctype==1" type="button" class="btn btn-primary pull-right"  @click.stop="companyAuth({id:initUserDetail.id,ccomment:initUserDetail.ccomment,ctype:initUserDetail.ctype})">点击认证</button>
                                      <button v-if="initUserDetail.ctype==2" type="button" class="btn btn-success pull-right"  @click.stop="" disabled="disabled">已通过认证</button>
                                      <button v-if="initUserDetail.ctype==3" type="button" class="btn btn-warning pull-right"  @click.stop="" disabled="disabled">认证未通过</button>


                                  </h4>
                                    </div>
                                    <!-- <div class="panel-collapse" v-show="initUserDetail.companyAuthShow&&initUserDetail.ctype==1"> -->
                                    <div class="panel-collapse" v-show="initUserDetail.companyAuthShow&&initIdentify.files.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>文件类型</th>
                                                    <th>路径</th>
                                                    <th>描述
                                                        <th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initIdentify.files">
                                                        <td>{{item.fileType}}</td>
                                                        <td>
                                                            <div class="thumbnail col-md-3 col-sm-4 col-xs-6">
                                                                <img v-bind:src="item.path" @click="clickBig(item.path)" width="200px" />
                                                            </div>
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 订单 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:initUserDetail.orders,
                                            crete:'orders'
                                            })">
                                      <img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                        订单（{{initUserDetail.orders.arr.length}}）
                                      </a>
                                    </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="initUserDetail.orders.show">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>来源</th>
                                                    <th>订单单号</th>
                                                    <th>品种</th>
                                                    <th>收货人姓名</th>
                                                    <th>收货人手机</th>
                                                    <th>详细地址</th>
                                                    <th>成交时间</th>
                                                    <th>总金额</th>
                                                    <th>审核状态</th>
                                                    <th>订单状态</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initUserDetail.orders.arr">
                                                        <td v-if="item.sourceType==0">新建</td>
                                                        <td v-if="item.sourceType==1">意向</td>
                                                        <td v-if="item.sourceType==2">报价</td>
                                                        <td v-if="item.sourceType==3">样品</td>
                                                        <td v-if="item.sourceType!=0&&item.sourceType!=1&&item.sourceType!=2&&item.sourceType!=3">其他</td>
                                                        <td>{{item.no}}</td>
                                                        <td>{{item.goodsDesc}}</td>
                                                        <td>{{item.consignee}}</td>
                                                        <td>{{item.consigneePhone}}</td>
                                                        <td>{{item.consigneeAddr}}</td>
                                                        <td>{{item.ctime}}</td>
                                                        <td>{{item.total}}</td>
                                                        <td>{{item.validate | Auditing}}</td>
                                                        <td>{{item.orderStatus | orderstatus}}</td>
                                                        <!--  <td  @click="clickShow($index,{
                                               concrete:'tracking'
                                               })">
                                               <img src="/static/images/default_arrow.png" height="24" width="24" />
                                             <div class="breed_action" v-show="item.show" >
                                                 <dt @click="updateTracking(item,$index)">编辑</dt>
                                             </div>
                                             </td> -->
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 跟进 -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:initUserDetail.tracking,
                                            crete:'tracking'
                                            })">
                                      <img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
                                      <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                        跟进（{{initUserDetail.tracking.arr.length}}）
                                      </a>
                                      <button type="button" class="btn btn-base pull-right" @click.stop="createTracking({
                                          objId:initUserDetail.id,
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
                                    <div class="panel-collapse" v-show="initUserDetail.tracking.show">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>业务类型</th>
                                                    <th>跟进方式</th>
                                                    <th>联系账号</th>
                                                    <th>备注</th>
                                                    <th>创建时间</th>
                                                    <th>修改时间</th>
                                                    <th style="text-align:center">操作</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initUserDetail.tracking.arr">
                                                        <td v-if="item.bizType==0">会员</td>
                                                        <td v-if="item.bizType==1">意向</td>
                                                        <td v-if="item.bizType==2">订单</td>
                                                        <td v-if="item.bizType!=0&&item.bizType!=1&&item.bizType!=2">会员</td>
                                                        <td>{{item.trackingWay}}</td>
                                                        <td>{{item.contactNo}}</td>
                                                        <td>{{item.comments}}</td>
                                                        <td>{{item.ctime}}</td>
                                                        <td>{{item.utime}}</td>
                                                        <td @click="updateTracking(item,$index)">
                                                            <a class="operate"><img src="/static/images/edit.png" height="18" width="30" />
                                                            </a>
                                                        </td>
                                                        <!--  <td  @click="clickShow($index,{
                                               concrete:'tracking'
                                               })">
                                               <img src="/static/images/default_arrow.png" height="24" width="24" />
                                             <div class="breed_action" v-show="item.show" >
                                                 <dt @click="updateTracking(item,$index)">编辑</dt>
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
    </div>
</template>
<script>
import trackingModel from './userTracking'
import intentionModel from './userIntention'
import personalauthModel from './personalAuth'
import companyauthModel from './companyAuth'
import intentionauditModel from './intentionAudit'
import tipsdialogModel from '../tips/tipDialog'
import filter from '../../filters/filters'
import pictureModel from '../tips/pictureDialog'

import {
    initClientDetail,
    initUserDetail,
    initIdentify,
    initLogin
} from '../../vuex/getters'
import {
    getClientDetail,
    getUserDetail,
    getAuthInfo,
    createOrder
} from '../../vuex/actions'
export default {
    components: {
        personalauthModel,
        trackingModel,
        intentionModel,
        companyauthModel,
        intentionauditModel,
        tipsdialogModel,
        pictureModel,
    },
    props: ['param'],
    data() {
        return {
            trackingParam: {
                show: false
            },
            importance: {
                0: '重要',
                1: '很重要',
                2: '非常重要'
            },
            grade: {
                0: '一星会员',
                1: '二星会员',
                2: '三星会员'
            },
            intentionParam: {
                loading: false,
                show: false,
                flag: 0, //0表示创建，1表示修改
                sub: '',
                userId: this.initUserDetail.id,
                //fullname:this.initUserDetail.fullname,
                customerName: this.initUserDetail.fullname,
                //phone:this.initUserDetail.phone,
                customerPhone: this.initUserDetail.phone,
                callback: '',
                id: '',
                breedId: '',
                breedName: '',
                price: '',
                unit: '',
                especial: '',
                quality: '',
                spec: '',
                number: '',
                location: '',
                type: '',
                preSell: '',
                country: '',
                pack: '',
                province: '',
                city: '',
                district: '',
                address: '',
                invoic: '',
                sampling: '',
                sampleUnit: '',
                advance: '',
                intl: '',
                duedate: '',
                pack: '',
                sampleNumber: 0,
                sampleAmount: 0,
                qualification: '',
                url: '/intention/',
                images: '',
                pics: [],
                description: '',
                inType: 2,
                loading: false
            },
            intentionAuditParam: {
                show: false,
                key: 'user',
                arr: [],
                indexs: [],
                validate: 1,
                description: ''
            },
            detailParam: {
                show: false
            },
            pictureParam: {
                show: false,
                img: ''
            },
            show: true,
            personalParam: {
                show: false,
                utype: 1
            },
            companyParam: {
                show: false,
                ctype: 1
            },
            tipParam: {
                show: false,
                alert: true,
                name: '请先选择意向'
            }
        }
    },
    vuex: {
        getters: {
            initUserDetail,
            initClientDetail,
            initIdentify,
            initLogin
        },
        actions: {
            getClientDetail,
            getUserDetail,
            getAuthInfo,
            createOrder
        }
    },
    methods: {
        modifyUser: function(item) {
            this.$parent.modifyUser({
                loading: false,
                id: item.id,
                show: true,
                link: 'alertInfo',
                url: '/user/',
                key: 'userList',
                index: this.param.sub,
                nickname: '',
                qq: '',
                fullname: '',
                email: '',
                phone: '',
                tel: '',
                nickname: '',
                company: '',
                comment: '',
                address: '',
                idnumber: '',
                bizType: '',
                gender: '',
                importance: '',
                userType: ''
            });
        },
        clickBig: function(img) {
            console.log(img)
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        onlyselected: function(index, id) {
            console.log('index=' + index + ',id=' + id);
            const _this = this;
            this.$store.state.table.userDetail.intention.arr[index].checked = !this.$store.state.table.userDetail.intention.arr[index].checked;
            if (!this.$store.state.table.userDetail.intention.arr[index].checked) {
                this.$store.state.table.userDetail.intention.checked = false;
            } else {
                this.$store.state.table.userDetail.intention.checked = true;
                this.$store.state.table.userDetail.intention.arr.forEach(function(item) {
                    if (!item.checked && item.validate == 0) {
                        _this.$store.state.table.userDetail.intention.checked = false;
                    }
                })
            }

        },
        checkedAll: function() {
            this.$store.state.table.userDetail.intention.checked = !this.$store.state.table.userDetail.intention.checked;
            if (this.$store.state.table.userDetail.intention.checked) {
                this.$store.state.table.userDetail.intention.arr.forEach(function(item) {
                    if (item.validate == 0 || item.validate == 9) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }


                })
            } else {
                this.$store.state.table.userDetail.intention.arr.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        intentionAudit: function() {
            const _this = this;
            this.intentionAuditParam.arr = [];
            this.intentionAuditParam.indexs = [];
            for (let i = 0; i < this.initUserDetail.intention.arr.length; i++) {
                if (this.initUserDetail.intention.arr[i].checked) {
                    this.intentionAuditParam.arr.push(this.initUserDetail.intention.arr[i].id);
                    this.intentionAuditParam.indexs.push(i);
                }
            }
            if (this.intentionAuditParam.arr.length === 0) {
                this.tipParam.show = true;
                this.tipParam.name = '请先选择意向';
            } else {
                this.intentionAuditParam.show = true;
            }
        },
        enfoldment: function(param) {
            if (this.$store.state.table.userDetail[param.crete].arr.length == 0) {
                this.$store.state.table.userDetail[param.crete].show = true;
            }
            this.$store.state.table.userDetail[param.crete].show = !this.$store.state.table.userDetail[param.crete].show;
        },
        personalEnfoldment: function(item) {

            this.$store.state.table.userDetail.personalAuthShow = !this.$store.state.table.userDetail.personalAuthShow;
            if (this.$store.state.table.userDetail.personalAuthShow) {
                item.utype = 1;
                console.log(item);
                this.getAuthInfo(item);

            }

        },
        companyEnfoldment: function(item) {
            this.$store.state.table.userDetail.companyAuthShow = !this.$store.state.table.userDetail.companyAuthShow;
            if (this.$store.state.table.userDetail.companyAuthShow) {
                item.ctype = 1;
                console.log(item);
                this.getAuthInfo(item);
            }

        },
        personalAuth: function(item) {
            this.personalParam.show = true;
            this.personalParam.id = item.id;
            this.personalParam.index = item.index;
            this.personalParam.ucomment = item.ucomment;
            this.personalParam.utype = item.utype;
        },
        companyAuth: function(item) {
            this.companyParam.show = true;
            this.companyParam.id = item.id;
            this.companyParam.index = item.index;
            this.companyParam.ccomment = item.ccomment;
            this.companyParam.ctype = item.ctype;
        },
        clickShow: function(index, param) {
            if (this.$store.state.table.userDetail[param.concrete].arr[index].show) {
                this.$store.state.table.userDetail[param.concrete].arr[index].show = false;
            } else {
                this.$store.state.table.userDetail[param.concrete].arr[index].show = true;
            }

        },
        createTracking: function(item) {
            item.show = !item.show;
            item.userId = this.initUserDetail.id;
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
        createIntention: function() {
            this.intentionParam = {
                show: false,
                flag: 0, //0表示创建，1表示修改
                sub: '',
                key: 'user',
                callback: this.intentionCallback,
                userId: this.initUserDetail.id,
                //fullname:this.initUserDetail.fullname,
                customerName: this.initUserDetail.fullname,
                //phone:this.initUserDetail.phone,
                customerPhone: this.initUserDetail.phone,
                id: '',
                breedId: '',
                breedName: '',
                price: '',
                unit: '',
                especial: 1,
                quality: '',
                spec: '',
                number: '',
                location: '',
                type: 0,
                preSell: 0,
                visit: 0,
                validate: 1,
                country: '中国',
                province: '',
                city: '',
                district: '',
                address: '',
                invoic: 0,
                duedate: '',
                pack: '',
                sampling: 0,
                sampleUnit: '',
                advance: 0,
                intl: 0,
                sampleNumber: 0,
                sampleAmount: 0,
                qualification: '',
                url: '/intention/',
                pics: [],
                images: '',
                importQualityPics: [],
                importQualityImages: '',
                testReportPics: [],
                testReportImages: '',
                inType: 2,
                audit: 0
            };
            this.intentionParam.show = true;

        },
        updateIntention: function() {
            this.intentionParam.flag = 1;
            this.intentionParam.show = true;
        },

        intentionCallback: function(title) {
            let editIntention = "editIntention"; //表示是编辑意向后调用的回调函数
            this.getUserDetail(this.param, editIntention);
            this.tipParam.show = true;
            this.tipParam.name = title;
            this.tipParam.alert = true;
        },

        getUserDetail: function() {
            detailParam.id = initUserDetail.id;
            this.getUserDetail(detailParam);
        }

    },
    created() {
        console.log(this.initLogin)
        this.getUserDetail(this.param);
    },
    filter: (filter, {})

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
    font-size: 14px;
}

section {
    background-color: #fff;
}

.breed_action {
    top: 20px;
    right: 40px;
    z-index: 99
}

.breed_action dt {
    display: block;
    padding: 3px;
    font-size: 12px;
    cursor: pointer;
}

.breed_action dt:hover {
    color: #fa6705;
}

section article {
    margin-top: 30px;
}

.top-title {
    z-index: 100;
    width: 60%;
    position: fixed;
    right: 0;
    top: 91px;
    left: 0;
    margin: auto;
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

.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
}

.table {
    display: table;
}

.label_action {
    position: absolute;
    top: 13px;
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

.checkbox_unselect {
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

.checkbox_select {
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

table {
    display: table;
}

.panel-default ul > div {
    padding: 5px 0;
    white-space: normal;
}
</style>

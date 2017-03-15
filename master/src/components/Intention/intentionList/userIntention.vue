<template>
    <div>
        <chancedetail-model :param="chanceParam" v-if="chanceParam.show"></chancedetail-model>
        <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
        <intentionaudit-model :param="intentionAuditParam" v-if="intentionAuditParam.show"></intentionaudit-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
        <editintent-model :param="editParam" v-if="editParam.show"></editintent-model>
        <createintent-model :param="createParam" v-if="createParam.show"></createintent-model>
        <supdem-model :param="supdemParam" v-if="supdemParam.show"></supdem-model>
        <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
        <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <mglist-model>
            <!-- 头部搜索-->
            <div slot="top">
                <div class="clear" style="margin-top:3px;">
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">会员名：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.userName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">会员手机：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.userPhone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">品种：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" placeholder="选择品种" @click="breedSearch()">
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">产地：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.location" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">标签：</dt>
                        <dd class="left">
                            <input-select :value.sync="loadParam.label" :prevalue="loadParam.label" :options="labels" placeholder="标签">
                            </input-select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <!-- <button class="new_btn transfer" @click="search()">搜索</button> -->
                        <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
                        <!-- <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button> -->
                    </dl>
                </div>
                <div class="clear" style="margin-top:3px;">
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">意向类型：</dt>
                        <div class="btn-group">
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===''&&this.loadParam.especial===''}" @click="selectType('','')">
                                全部
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===0&&this.loadParam.especial===0}" @click="selectType(0,0)">
                                普通求购
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===0&&this.loadParam.especial===1}" @click="selectType(0,1)">
                                紧急求购
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===1&&this.loadParam.especial===0}" @click="selectType(1,0)">
                                普通供应
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===1&&this.loadParam.especial===1}" @click="selectType(1,1)">
                                低价资源
                            </button>
                        </div>
                    </dl>
                    <dl class="clear left transfer" style="margin-left:20px">
                        <dt class="left transfer marg_top">审核状态：</dt>
                        <div class="btn-group">
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===''}" @click="selectValidate('')">
                                全部
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===0}" @click="selectValidate(0)">
                                待审核
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===1}" @click="selectValidate(1)">
                                审核通过
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===-1}" @click="selectValidate(-1)">
                                审核不通过
                            </button>
                        </div>
                    </dl>
                    <dl class="clear left transfer" style="margin-left:20px">
                        <dt class="left transfer marg_top">意向来源：</dt>
                        <div class="btn-group">
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.source===''}" @click="selectSource('')">
                                全部
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.source===1}" @click="selectSource(1)">
                                PC
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.source===2}" @click="selectSource(2)">
                                安卓
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.source===3}" @click="selectSource(3)">
                                微信
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.source===4}" @click="selectSource(4)">
                                IOS
                            </button>
                        </div>
                    </dl>
                    <dl class="clear left transfer" style="margin-left:50px">
                        <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                    </dl>
                    <div class="clearfix pull-right">
                        <button class="btn btn-primary  transfer" @click="selectSearch()">刷新</button>
                    </div>
                    <dd class="pull-right" style="margin-right:10px">
                        <button type="button" class="btn btn-default" height="24" width="24" @click="intentionAudit()">审核</button>
                    </dd>
                </div>
            </div>
            <!--中间列表-->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead>
                        <tr>
                            <th>
                                <!-- <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label> -->
                            </th>
                            <th>类型</th>
                            <th>发布时间</th>
                            <th>所属业务员</th>
                            <th>会员名称</th>
                            <th>主要联系人</th>
                            <th>联系方式</th>
                            <th>手机归属地</th>
                            <th>意向商品</th>
                            <th>商品产地</th>
                            <th>单价</th>
                            <th>商品规格</th>
                            <th>商品数量</th>
                            <th>剩余有效期</th>
                            <th>客户备注</th>
                            <th>录入类型</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initUserIntentionList">
                            <td>
                                <label v-if="item.validate==0||item.validate==9" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)">
                                </label>
                            </td>
                            <td>
                                <div v-if="item.especial==0&&item.type==0">普通求购</div>
                                <div v-if="item.especial==0&&item.type==1">普通供应</div>
                                <span v-if="item.especial==1&&item.type==0">紧急求购</span>
                                <span v-if="item.especial==1&&item.type==1">低价资源</span>
                            </td>
                            <td>{{item.ctime}}</td>
                            <td v-if="item.employeeName!==''">{{item.employeeName}}</td>
                            <td v-if="item.employeeName==''">暂无归属业务员</td>
                            <td class="underline" @click.stop="detailClick({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true,
                                customerName:item.customerName,
                                customerPhone:item.customerPhone,
                                breedName:item.breedName,
                                type:item.type,
                                especial:item.especial,
                                qualification:item.qualification,
                                spec:item.spec,
                                number:item.number,
                                unit:item.unit,
                                price:item.price,
                                address:item.address,
                                location:item.location,
                                advance:item.advance,
                                invoic:item.invoic,
                                visit:item.visit,
                                pack:item.pack,
                                intl:item.intl,
                                visit:item.visit,
                                sampling:item.sampling,
                                sampleNumber:item.sampleNumber,
                                sampleUnit:item.sampleUnit,
                                sampleAmount:item.sampleAmount,
                                offer:item.offer,
                                status:item.status,
                                country:item.country,
                                province:item.province,
                                city:item.city,
                                district:item.district,
                                address:item.address,
                                link:editintentInfo,
                                url:'/intention/',
                                key:'userIntentionList',
                                image_f:'',
                                image_s:'',
                                image_t:'',
                                image_f_show:'',
                                image_s_show:'',
                                image_t_show:'',
                                duedate:item.duedate
                                })">{{item.userFullname}}</td>
                            <td>{{item.mainContact}}</td>
                            <td>{{item.customerPhone}}</td>
                            <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
                            <td>{{item.breedName}}</td>
                            <td>{{item.location}}</td>
                            <td>{{item.price}}元/{{item.unit}}</td>
                            <td>{{item.spec}}</td>
                            <td>{{item.number}}{{item.unit}}</td>
                            <td>{{item.duedateDesc}}</td>
                            <td>{{item.description}}</td>
                            <td>{{item.inTypeDesc}}</td>
                            <td>
                                <a class="operate" @click.stop="modifyIntention({
                                  id:item.id,
                                  sub:$index,
                                  selectCustomer:false,
                                  flag:1,
                                  show:true,
                                  loading:true,
                                  title:'编辑',
                                  userFullname:item.userFullname,
                                  userPhone:item.userPhone,
                                  customerName:item.customerName,
                                  customerPhone:item.customerPhone,
                                  breedName:item.breedName,
                                  breedId:item.breedId,
                                  type:item.type,
                                  especial:item.especial,
                                  quality:item.quality,
                                  qualification:item.qualification,
                                  spec:item.spec,
                                  number:item.number,
                                  unit:item.unit,
                                  price:item.price,
                                  ctime:item.ctime,
                                  address:item.address,
                                  location:item.location,
                                  advance:item.advance,
                                  invoic:item.invoic,
                                  visit:item.visit,
                                  pack:item.pack,
                                  intl:item.intl,
                                  description:item.description,
                                  visit:item.visit,
                                  sampling:item.sampling,
                                  sampleNumber:item.sampleNumber,
                                  sampleUnit:item.sampleUnit,
                                  sampleAmount:item.sampleAmount,
                                  offer:item.offer,
                                  status:item.status,
                                   country:item.country,
                                   province:item.province,
                                   city:item.city,
                                   district:item.district,
                                   address:item.address,
                                   validate:item.validate,
                                   link:editintentInfo,
                                   url:'/intention/',
                                   key:'userIntentionList',
                                   images:item.pics,
                                   image_f:'',
                                   image_s:'',
                                   image_t:'',
                                   image_f_show:'',
                                   image_s_show:'',
                                   image_t_show:'',
                                   duedate:item.duedate
                                   })">
                                    <img src="/static/images/edit.png" height="18" width="30" alt="编辑" title="编辑" />
                                </a>
                                <a class="operate" @click.stop="specDelete({
                                 id:item.id,
                                 sub:$index,
                                 show:true,
                                 name:item.name,
                                 title:'意向',
                                 link:deleteInfo,
                                 url:'/intention/',
                                 key:'userIntentionList'
                                 })">
                                    <img src="/static/images/del.png" height="18" width="30" alt="删除" title="删除" />
                                </a>
                                <a class="operate" @click.stop="userToClient({
                                    name:item.userFullname,
                                    keyname:'transStatus',
                                    sub:$index,
                                    userId:item.userId,
                                    main:1,
                                    province:'',
                                    phone:item.userPhone,
                                    tel:item.userTel,
                                    email:item.userEmail,
                                    qq:item.userQq,
                                    type:'',
                                    fullname:item.userFullname,
                                    employeeId:'',
                                    employeeName:'',
                                    orgId:'',
                                    orgName:'',
                                    show:true,
                                    key:'userList',
                                    countryId:7,
                                    countryName:'中国',
                                    contact:{
                                       name: item.userFullname,
                                       position: '',
                                       department: '',
                                       phone: item.userPhone,
                                       tel: item.userTel,
                                       email: item.email,
                                       qq: item.userQq,
                                       wechart: ''
                                     }
                                  },item.show=false)">
                                    <img src="/static/images/transfer.png" height="18" width="28" alt="划转" title="划转" />
                                </a>
                                <a class="operate" v-if="item.validate==0||item.validate==9" @click.stop="audit($index,item.id)"><img src="/static/images/orgcheck.png" height="18" width="28" alt="审核" title="审核" /></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--底部分页-->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
    </div>
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import chancedetailModel from '../../Intention/chanceDetail'
import transferintentModel from '../../Intention/transferIntent'
import intentionauditModel from '../../user/intentionAudit'
import tipsdialogModel from '../../tips/tipDialog'
import deletebreedModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import editintentModel from '../../Intention/Editintention'
import createintentModel from '../../user/userIntention'
import supdemModel from '../supplyDemand'
import transferModel from '../../user/userTransfer'
import searchModel from '../intentionSearch'
import breedsearchModel from '../breedsearch'
//import inputSelect from '../../tools/vueSelect/components/inputselect'
import inputSelect from '../../tools/vueSelect/components/multiSelect'
import common from '../../../common/common'
import commonArray from '../../tools/commonArray'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'

import {
    initUserIntentionList,
    initSupplyDemandList
} from '../../../vuex/getters'
import {
    getIntentionList,
    getSupplyDemandList,
    intentionUpAndDown,
    deleteInfo,
    editintentInfo,
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        chancedetailModel,
        transferintentModel,
        intentionauditModel,
        tipsdialogModel,
        deletebreedModel,
        editintentModel,
        createintentModel,
        supdemModel,
        transferModel,
        searchModel,
        breedsearchModel,
        inputSelect,
        mglistModel
    },
    vuex: {
        getters: {
            initUserIntentionList,
            initSupplyDemandList
        },
        actions: {
            getIntentionList,
            getSupplyDemandList,
            intentionUpAndDown,
            deleteInfo,
            editintentInfo
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                link: '/intention/user/list',
                key: 'userIntentionList',
                type: '', //类型
                especial: '', //特殊
                invoic: '', //发票
                visit: '', //上门看货
                sampling: '', //样品
                advance: '', //预付比例
                intl: '', //是否国际
                validate: '', //审核状态
                source: '', //意向来源
                onSell: '', //上架状态
                total: 0,
                breedId: '',
                breedName: '',
                userName: '',
                userPhone: '',
                customerName: '',
                customerPhone: '',
                location: '',
                label: '' //标签
            },
            labels: [],
            supdemParam: {
                show: false,
                id: '',
                type: '',
                breedId: '',
                typeName: '',
                link: '/intention/'
            },
            transferParam: {
                show: false
            },
            chanceParam: {
                show: false
            },
            intentionParam: {
                show: false,
                id: '',
                name: '意向'
            },
            tipsParam: {
                show: false,
                alert: true,
                name: ''

            },
            intentionAuditParam: {
                show: false,
                key: 'userIntentionList',
                arr: [],
                indexs: [],
                validate: 0,
                description: ''
            },
            deleteParam: {
                show: false
            },
            editParam: {
                show: false
            },
            createParam: {
                show: false
            },
            offerParam: {
                show: false,
                id: ''
            },
            breedSearchParam: {
                show: false
            },
            checked: false
        }
    },
    methods: {
        match: function(item) {
            this.supdemParam.show = true;
            this.supdemParam.id = item.id;
            this.supdemParam.type = 1 - item.type
            if (this.supdemParam.type == 0) {
                this.supdemParam.typeName = "求购";
            } else {
                this.supdemParam.typeName = "供应";
            }
            this.supdemParam.breedId = item.breedId;
            /*if(item.id==this.supdemParam.id&&this.$store.state.table.basicBaseList.supplyDemandList.length!=0){
                this.$store.state.table.basicBaseList.supplyDemandList = [];
            }else{
              this.supdemParam.id = item.id;
              this.supdemParam.type = 1-item.type
              this.supdemParam.breedId = item.breedId;
              this.getSupplyDemandList(this.supdemParam);
            }*/

        },
        eventClick: function(sub) {
            if (this.$store.state.table.basicBaseList.userIntentionList[sub].show) {
                this.$store.state.table.basicBaseList.userIntentionList[sub].show = !this.$store.state.table.basicBaseList.userIntentionList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.userIntentionList[sub].show = true;
            }
        },
        detailClick: function(param) {
            this.chanceParam = param;
        },
        onlyselected: function(sub, id) {
            var _this = this;
            this.$store.state.table.basicBaseList.userIntentionList[sub].checked = !this.$store.state.table.basicBaseList.userIntentionList[sub].checked;
            if (!this.$store.state.table.basicBaseList.userIntentionList[sub].checked) {
                this.checked = false;
            } else {
                this.checked = true;
                this.$store.state.table.basicBaseList.userIntentionList.forEach(function(item) {
                    if (!item.checked && item.validate == 0) {
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.userIntentionList.forEach(function(item) {
                    if (item.validate == 0 || item.validate == 9) {
                        item.checked = true;
                    }
                })
            } else {
                this.$store.state.table.basicBaseList.userIntentionList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectType: function(type, especial) {
            this.loadParam.type = type;
            this.loadParam.especial = especial;
            this.selectSearch();
        },
        selectValidate: function(validate) {
            this.loadParam.validate = validate;
            this.selectSearch();
        },
        selectSource: function(source) {
            this.loadParam.source = source;
            this.selectSearch();
        },
        intentionAudit: function() {
            this.intentionAuditParam.arr = [];
            this.intentionAuditParam.indexs = [];
            for (var i = 0; i < this.$store.state.table.basicBaseList.userIntentionList.length; i++) {
                if (this.$store.state.table.basicBaseList.userIntentionList[i].checked) {
                    this.intentionAuditParam.arr.push(this.$store.state.table.basicBaseList.userIntentionList[i].id);
                    this.intentionAuditParam.indexs.push(i);
                }
            }
            if (this.intentionAuditParam.arr.length == 0) {
                this.tipsParam.name = '请先选择意向';
                this.tipsParam.show = true;
            } else {
                console.log(this.intentionAuditParam.indexs);
                this.intentionAuditParam.show = true;
            }
        },
        upOrDown: function(param) {
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.onSell = param.onSell;
            if (param.onSell == 1) {
                this.tipsParam.name = '意向上架成功';
            }
            if (param.onSell == 2) {
                this.tipsParam.name = '意向下架成功';
            }
            for (var i = 0; i < this.initUserIntentionList.length; i++) {
                if (this.initUserIntentionList[i].checked) {
                    this.tipsParam.ids.push(this.initUserIntentionList[i].id);
                    this.tipsParam.indexs.push(i);
                }
            }
            if (this.tipsParam.ids.length == 0) {
                this.tipsParam.name = '请先选择意向';
                this.tipsParam.show = true;
            } else {
                console.log('上下架');
                this.intentionUpAndDown(this.tipsParam);
            }

        },
        audit: function(index, id) { //单个意向审核
            this.intentionAuditParam.show = true;
            this.intentionAuditParam.arr = [];
            this.intentionAuditParam.indexs = [];
            this.intentionAuditParam.arr.push(id);
            this.intentionAuditParam.indexs.push(index);
        },
        userToClient: function(item) {
            this.transferParam = item;
            this.transferParam.callback = this.transferback;
        },
        transferback: function(title) {
            if (title == 'success') {
                this.tipsParam.name = '划转成功';
            } else {
                this.tipsParam.name = title;
            }

            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
        searchIntention: function() {
            this.getIntentionList(this.loadParam);
        },
        search: function() {
            this.loadParam.loading = false;
            this.loadParam.show = true;

        },
        resetCondition: function() {
            this.loadParam.type = '';
            this.loadParam.especial = '';
            this.loadParam.invoic = '';
            this.loadParam.visit = '';
            this.loadParam.intl = '';
            this.loadParam.sampling = '';
            this.loadParam.validate = '';
            this.loadParam.onSell = '';
            this.loadParam.advance = '';
            this.loadParam.customerName = '';
            this.loadParam.breedId = '';
            this.loadParam.breedName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.location = '';
            this.loadParam.inType = '';
            this.loadParam.source = '';
            this.loadParam.label = '';
            this.getIntentionList(this.loadParam);

        },
        specDelete: function(param) {
            this.deleteParam = param;
        },
        modifyIntention: function(param) {
            this.createParam = param;
            this.createParam.callback = this.modifyback;
        },
        modifyback: function(title) { //修改完成后刷新页面数据
            this.getIntentionList(this.loadParam);
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
        selectSearch: function() {
            this.getIntentionList(this.loadParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntentionList(this.loadParam);
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.selectSearch();

        }
    },
    created() {
        this.labels = commonArray.intentionLabels;
        changeMenu(this.$store.state.table.isTop, this.getIntentionList, this.loadParam, localStorage.userIntentionParam);

    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.edit-model {
    padding: 10px 30px 80px 30px;
}

.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-right: 8px;
}

#table_box table th,
#table_box table td {
    width: 100px;
    min-width: 100px;
}

.operate {
    margin: 0;
}

.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}
</style>

<template>
    <chancedetail-model :param="chanceParam" v-if="chanceParam.show"></chancedetail-model>
    <transferintent-model :param="intentionParam" v-if="intentionParam.show"></transferintent-model>
    <intentionaudit-model :param="intentionAuditParam" v-if="intentionAuditParam.show"></intentionaudit-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <createintent-model :param="createParam" v-if="createParam.show"></createintent-model>
    <supdem-model :param="supdemParam" v-if="supdemParam.show"></supdem-model>
    <search-model :param="loadParam" v-if="loadParam.show"></search-model>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
    <createorder-model :param="createOrderParam" v-if="createOrderParam.show"></createorder-model>
    <sendapply-model :param="sampleOrderParam" v-if="sampleOrderParam.send"></sendapply-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">客户名：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">客户手机：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerPhone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
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
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
                </dl>
            </div>
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">意向类型：</dt>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===''&&this.loadParam.especial===''&&this.loadParam.preSell===''}" @click="selectType('','','')">
                            全部
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===0&&this.loadParam.especial===0&&this.loadParam.preSell===0}" @click="selectType(0,0,0)">
                            普通求购
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===0&&this.loadParam.especial===1&&this.loadParam.preSell===0}" @click="selectType(0,1,0)">
                            紧急求购
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===1&&this.loadParam.especial===0&&this.loadParam.preSell===0}" @click="selectType(1,0,0)">
                            普通供应
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===1&&this.loadParam.especial===1&&this.loadParam.preSell===0}" @click="selectType(1,1,0)">
                            低价资源
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===1&&this.loadParam.especial===1&&this.loadParam.preSell===1}" @click="selectType(1,1,1)">
                            预售资源
                        </button>
                    </div>
                </dl>
                <dl class="clear left transfer" style="margin-left:50px">
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
                <dl class="clear left transfer" style="margin-left:50px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>
                <dd class="pull-right" style="margin-right:10px">
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn" @click="createIntention({
                         show:true,
                         selectCustomer:true,
                         flag:0,
                         employeeId:'100014',
                         title:'新建',
                         customerName:'',
                         customerId:'',
                         customerPhone:'',
                         breedName:'',
                         breedId:'',
                         type:0,
                         especial:1,
                         preSell:0,
                         validate:0,
                         qualification:'',
                         quality:'',
                         spec:'',
                         number:'',
                         moq:'',
                         unit:'',
                         price:'',
                         duedate:'',
                         address:'',
                         location:'',
                         advance:0,
                         invoic:0,
                         visit:'',
                         pack:'',
                         intl:0,
                         visit:0,
                         sampling:0,
                         sampleNumber:0,
                         sampleUnit:'',
                         sampleAmount:0,
                         country:7,
                         province:'',
                         city:'',
                         district:'',
                         address:'',
                         transportType:'', 
                         transportNo:'',
                         arriveTime:'',
                         description:'',
                         key:'myIntentionList',
                         link:createIntentionInfo,
                         inType:3,
                         url:'/intention/',
                         pics:[],
                         images:'',
                         importQualityPics:[],
                         importQualityImages:'',
                         testReportPics:[],
                         testReportImages:'',
                         audit:0,
                         onSell:0,
                         ctime:''
                         })">新建</button>
                    <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
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
                        <th>类型</th>
                        <th>发布时间</th>
                        <th>客户名称</th>
                        <th>主要联系人</th>
                        <th>联系方式</th>
                        <th>手机归属地</th>
                        <th>意向商品</th>
                        <th>商品产地</th>
                        <th>商品规格</th>
                        <th>商品数量</th>
                        <th>剩余有效期</th>
                        <th>客户备注</th>
                        <th>意向来源</th>
                        <th>上架状态</th>
                        <th style="min-width:200px;text-align: left;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initMyIntentionList">
                        <td>
                            <div v-if="item.especial==0&&item.type==0&&item.preSell==0">普通求购</div>
                            <div v-if="item.especial==0&&item.type==1&&item.preSell==0">普通供应</div>
                            <div v-if="item.especial==1&&item.type==0&&item.preSell==0">紧急求购</div>
                            <div v-if="item.especial==1&&item.type==1&&item.preSell==0">低价资源</div>
                            <div v-if="item.especial==1&&item.type==1&&item.preSell==1">预售资源</div>
                        </td>
                        <td>{{item.pubdate}}</td>
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
                                key:'myIntentionList'
                                })">{{item.customerName}}</td>
                        <td>{{item.mainContact}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.number}}{{item.unit | Unit}}</td>
                        <td>{{item.duedateDesc}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.inTypeDesc}}</td>
                        <td>{{item.onSell | onsell}}</td>
                        <td style="text-align: left">
                            <a class="operate" v-if="item.onSell===0||item.onSell==-2||item.onSell==4" @click.stop="modifyIntention({
                                              id:item.id,
                                              sub:$index,
                                              selectCustomer:false,
                                              flag:1,
                                              show:true,
                                              loading:true,
                                              title:'编辑',
                                              customerName:item.customerName,
                                              customerPhone:item.customerPhone,
                                              breedName:item.breedName,
                                              breedId:item.breedId,
                                              type:item.type,
                                              especial:item.especial,
                                              preSell:item.preSell,
                                              quality:item.quality,
                                              qualification:item.qualification,
                                              spec:item.spec,
                                              number:item.number,
                                              moq:item.moq,
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
                                              onSell:item.onSell,
                                              ctime:item.ctime,
                                              sampling:item.sampling,
                                              sampleNumber:item.sampleNumber,
                                              sampleUnit:item.sampleUnit,
                                              sampleAmount:item.sampleAmount,
                                              offer:item.offer,
                                              status:item.status,
                                               country:item.country,
                                               countryName:item.countryName,
                                               province:item.province,
                                               provinceName:item.provinceName,
                                               city:item.city,
                                               cityName:item.cityName,
                                               district:item.district,
                                               districtName:item.districtName,
                                               address:item.address,
                                               validate:item.validate,
                                               link:editintentInfo,
                                               url:'/intention/',
                                               key:'myIntentionList',
                                               pics:item.pics,
                                               images:'',
                                               importQualityPics:item.importQualityPics,
                                               importQualityImages:'',
                                               testReportPics:item.testReportPics,
                                               testReportImages:'',
                                               duedate:item.duedate,
                                               arriveTime:item.arriveTime,
                                               transportNo:item.transportNo,
                                               transportType:item.transportType,
                                               description: item.description
                                               })"><img src="/static/images/edit.png" height="18" width="28" alt="编辑" />
                            </a>
                            <a class="operate" v-if="item.onSell===0||item.onSell==-2||item.onSell==4" @click.stop="specDelete({
                                               id:item.id,
                                               sub:$index,
                                               show:true,
                                               name:item.name,
                                               title:'意向',
                                               link:deleteInfo,
                                               url:'/intention/',
                                               key:'myIntentionList'
                                               })"><img src="/static/images/del.png" height="18" width="28" alt="删除" />
                            </a>
                            <a v-if="item.onSell===0||item.onSell==-2||item.onSell==4">
                                <button type="button" class="btn btn-default" height="24" width="24" style="font-size:4px;padding:0px 2px;margin-top:-22px;color:#fa6705" @click="up($index,item.id,1)">申请上架</button>
                            </a>
                            <a class="operate" v-if="item.onSell==2" @click="up($index,item.id,3)"><img src="/static/images/applyunder.png" height="18" width="47" alt="申请下架" />
                            </a>
                            <a class="operate" v-if="item.type==1&&item.preSell===0" @click.stop="newOrder(item,$index)"><img src="/static/images/adopt.png" alt="生成订单" />
                            </a>
                            <a class="operate" @click.stop="sengSample(item,$index)">
                                <img src="/static/images/sample.png" alt="寄样申请" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import chancedetailModel from '../../Intention/chanceDetail'
import transferintentModel from '../../Intention/transferIntent'
import intentionauditModel from '../../user/intentionAudit'
import tipsdialogModel from '../../tipsDialog'
import deletebreedModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
/*import editintentModel  from  '../../Intention/Editintention'*/
import createintentModel from '../../user/userIntention'
import supdemModel from '../supplyDemand'
import searchModel from '../intentionSearch'
import breedsearchModel from '../breedsearch'
import auditDialog from '../../tips/auditDialog'
import createorderModel from '../createOrder'
import sendapplyModel from '../sendSampleapply'
//import inputSelect from '../../tools/vueSelect/components/inputselect'
import inputSelect from '../../tools/vueSelect/components/multiSelect'
import commonArray from '../../tools/commonArray'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initMyIntentionList,
    initSupplyDemandList,
    initLogin
} from '../../../vuex/getters'
import {
    getIntentionList,
    getSupplyDemandList,
    intentionUpAndDown,
    deleteInfo,
    editintentInfo,
    createIntentionInfo,
    batchUserIntentionAudit,
    createOrder
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        chancedetailModel,
        transferintentModel,
        intentionauditModel,
        tipsdialogModel,
        deletebreedModel,
        createintentModel,
        supdemModel,
        searchModel,
        breedsearchModel,
        auditDialog,
        createorderModel,
        sendapplyModel,
        inputSelect,
        mglistModel
    },
    vuex: {
        getters: {
            initMyIntentionList,
            initSupplyDemandList,
            initLogin
        },
        actions: {
            getIntentionList,
            getSupplyDemandList,
            intentionUpAndDown,
            deleteInfo,
            editintentInfo,
            createIntentionInfo,
            batchUserIntentionAudit,
            createOrder
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
                link: '/intention/employee/list',
                key: 'myIntentionList',
                type: '', //类型
                especial: '', //特殊
                preSell: '', //是否预售
                invoic: '', //发票
                visit: '', //上门看货
                sampling: '', //样品
                advance: '', //预付比例
                intl: '', //是否国际
                validate: '', //审核状态
                onSell: '', //审核状态
                total: 0,
                breedId: '',
                breedName: '',
                customerName: '',
                customerPhone: '',
                location: '',
                label: ''
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
            chanceParam: {
                show: false
            },
            sampleOrderParam: {
                send: false,
                sub: '',
                country: '中国',
                province: '',
                city: '',
                district: '',
                customer: '',
                customerName: '',
                customerPhone: '',
                breedName: '',
                total: 0,
                consignee: '',
                address: '',
                consigneePhone: '',
                currency: 1,
                employee: this.initLogin.id,
                items: [

                ],
            },
            createOrderParam: {
                show: false,
                sub: '',
                key: 'myIntentionList',
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
                currency: 1, //货币品种
                consignee: '', //收货人姓名
                consigneePhone: '',
                consigner: '',
                zipCode: '', //邮编
                country: '',
                province: '',
                city: '',
                district: '',
                consigneeAddr: '',
                comments: '',
                total: 0,
                cost: 0,
                currency: 1,
                sourceType: 1, //来源类型(意向)
                orderStatus: 0, //订单状态
                goods: [{
                    sourceType: 1, //商品来源类型(报价)
                    sourceId: '', //商品来源ID
                    title: '', //订单商品标题
                    breedId: '',
                    breedName: '',
                    quality: '',
                    location: '',
                    spec: '',
                    price: 0,
                    costPrice: 0,
                    unit: '',
                    number: 0
                }]
            },
            intentionParam: {
                show: false,
                id: '',
                name: '意向'
            },
            intentionAuditParam: {
                show: false,
                key: "myIntentionList",
                arr: [],
                indexs: [],
                validate: 0,
                description: ''
            },
            tipsParam: {
                show: false,
                key: 'myIntentionList',
                name: '',
                ids: [],
                index: [],
                onSell: 0
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
            checked: false,
            auditParam: {
                title: '意向申请审核备注',
                auditComment: '',
                confirm: true,
                callback: '',
                show: false
            },
            breedSearchParam: {
                show: false
            }
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
            if (this.$store.state.table.basicBaseList.myIntentionList[sub].show) {
                this.$store.state.table.basicBaseList.myIntentionList[sub].show = !this.$store.state.table.basicBaseList.myIntentionList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.myIntentionList[sub].show = true;
            }
        },
        detailClick: function(param) {
            this.chanceParam = param;
        },
        onlyselected: function(sub, id) {
            var _this = this;
            this.$store.state.table.basicBaseList.myIntentionList[sub].checked = !this.$store.state.table.basicBaseList.myIntentionList[sub].checked;
            if (!this.$store.state.table.basicBaseList.myIntentionList[sub].checked) {
                this.checked = false;
            } else {
                this.checked = true;
                this.$store.state.table.basicBaseList.myIntentionList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.myIntentionList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.myIntentionList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectType: function(type, especial, preSell) {
            this.loadParam.type = type;
            this.loadParam.especial = especial;
            this.loadParam.preSell = preSell;
            this.selectSearch();
        },
        selectValidate: function(validate) {
            this.loadParam.validate = validate;
            this.selectSearch();
        },
        intentionAudit: function() {
            this.intentionAuditParam.arr = [];
            this.intentionAuditParam.indexs = [];
            for (var i = 0; i < this.$store.state.table.basicBaseList.myIntentionList.length; i++) {
                if (this.$store.state.table.basicBaseList.myIntentionList[i].checked) {
                    this.intentionAuditParam.arr.push(this.$store.state.table.basicBaseList.myIntentionList[i].id);
                    this.intentionAuditParam.indexs.push(i);
                }
            }
            if (this.intentionAuditParam.arr.length == 0) {
                this.tipsParam.name = '请先选择意向';
                this.tipsParam.show = true;
            } else {
                this.intentionAuditParam.show = true;
            }
        },
        upOrDown: function(param) {
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.onSell = param.onSell;
            if (param.onSell == 2) {
                this.tipsParam.name = '意向上架成功';
            }
            if (param.onSell == 4) {
                this.tipsParam.name = '意向下架成功';
            }
            for (var i = 0; i < this.initMyIntentionList.length; i++) {
                if (this.initMyIntentionList[i].checked) {
                    this.tipsParam.ids.push(this.initMyIntentionList[i].id);
                    this.tipsParam.indexs.push(i);
                }
            }
            if (this.tipsParam.ids.length == 0) {
                this.tipsParam.name = '请先选择意向';
                this.tipsParam.show = true;
            } else {

                this.intentionUpAndDown(this.tipsParam);
            }

        },
        up: function(index, id, onSell) {
            var onSellObj = {
                "0": '初始',
                "1": '申请上架',
                "2": '上架成功',
                "-2": '上架失败',
                "3": '申请下架',
                "4": '下架成功',
                "-4": '下架失败'
            }
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.ids.push(id);
            this.tipsParam.indexs.push(index);
            this.tipsParam.onSell = onSell;
            this.tipsParam.name = onSellObj[onSell];
            this.intentionUpAndDown(this.tipsParam);
        },
        down: function(index, id) {
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.ids.push(id);
            this.tipsParam.indexs.push(index);
            this.tipsParam.onSell = 4;
            this.tipsParam.name = '意向下架成功';
            this.intentionUpAndDown(this.tipsParam);
        },
        applyDown: function(index, id) {
            this.tipsParam.ids = [];
            this.tipsParam.indexs = [];
            this.tipsParam.ids.push(id);
            this.tipsParam.indexs.push(index);
            this.tipsParam.onSell = 3;
            this.tipsParam.name = '申请下架成功';
            this.intentionUpAndDown(this.tipsParam);
        },
        newOrder: function(item, sub) {
            this.createOrderParam.show = true;
            this.createOrderParam.sub = sub;
            this.createOrderParam.customer = item.customerId;
            this.createOrderParam.tradeTime = item.tradeTime;
            this.createOrderParam.customerName = item.customerName;
            this.createOrderParam.type = item.type;
            this.createOrderParam.goods[0].sourceId = item.id;
            this.createOrderParam.goods[0].breedName = item.breedName;
            this.createOrderParam.goods[0].breedId = item.breedId;
            this.createOrderParam.goods[0].spec = item.spec;
            this.createOrderParam.goods[0].price = item.price;
            this.createOrderParam.goods[0].unit = item.unit;
            this.createOrderParam.goods[0].number = item.number;
            this.createOrderParam.goods[0].quality = item.quality;
            this.createOrderParam.goods[0].location = item.location;
            this.createOrderParam.total = 0;
            this.createOrderParam.callback = this.createback;
            this.createOrderParam.consignee=''
            this.createOrderParam.consigneePhone=''
            this.createOrderParam.consigner=''
            this.createOrderParam.incidentals=0
            this.createOrderParam.preferential=0
            this.createOrderParam.incidentalsDesc=''
            this.createOrderParam.preferentialDesc=''
            this.createOrderParam.consigneeAddr=''
            this.createOrderParam.comments=''
        },
        clientTransfer: function(param) {
            this.intentionParam = param;

            for (var i in this.initMyIntentionList) {
                if (this.initMyIntentionList[i].checked) {
                    if (this.initMyIntentionList[i].checked == true) {
                        this.intentionParam.id = this.initMyIntentionList[i].id;
                        this.intentionParam = this.initMyIntentionList[i];
                        this.intentionParam.show = true;
                    }
                } else if (this.intentionParam.id == "" && !this.initMyIntentionList[i].checked) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = '请先选择业务机会';
                    this.intentionParam.show = false;
                }
            }
        },
        search: function() {
            this.loadParam.loading = false;
            this.loadParam.show = true;

        },
        searchIntention: function() {
            this.getIntentionList(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.type = '';
            this.loadParam.especial = '';
            this.loadParam.preSell = '';
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
        modifyback: function(title) {
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
            this.getIntentionList(this.loadParam);
        },
        createIntention: function(param) {
            this.createParam = param;
            this.createParam.callback = this.createback;
        },
        createback: function(title) {
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
            this.getIntentionList(this.loadParam);
        },
        applyAudit: function(index, id) {
            this.auditParam.indexs = [];
            this.auditParam.indexs.push(index);
            this.auditParam.arr = [];
            this.auditParam.arr.push(id);
            this.auditParam.validate = 2;
            this.auditParam.show = true;
            this.auditParam.callback = this.auditCallback;
        },
        auditCallback: function() {
            this.auditParam.description = this.auditParam.auditComment;
            this.batchUserIntentionAudit(this.auditParam);
        },
        selectSearch: function() {
            this.getIntentionList(this.loadParam);
        },
        sengSample: function(item, sub) {
            this.sampleOrderParam.send = true;
            this.sampleOrderParam.sub = sub;
            this.sampleOrderParam.customer = item.customerId;
            this.sampleOrderParam.customerName = item.customerName;
            this.sampleOrderParam.customerPhone = item.customerPhone;
            this.sampleOrderParam.breedName = item.breedName;
            this.sampleOrderParam.country = item.country;
            this.sampleOrderParam.province = item.province;
            this.sampleOrderParam.city = item.city;
            this.sampleOrderParam.district = item.district;
            this.sampleOrderParam.ctime = item.ctime;
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

        },

    },
    created() {
        this.labels = commonArray.intentionLabels;
        changeMenu(this.$store.state.table.isTop, this.getIntentionList, this.loadParam, localStorage.myIntentionParam);

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

#table_box table th,
#table_box table td {
    width: 121px;
    min-width: 110px;
}

.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}
</style>

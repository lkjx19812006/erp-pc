<template>
    <div>
        <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
        <create-model :param="createParam" v-if="createParam.send"></create-model>
        <delete-model :param="delParam" v-if="delParam.show"></delete-model>
        <edit-model :param.sync="dialogParam" v-if="dialogParam.send"></edit-model>
        <apply-model :param="applyParam" v-if="applyParam.show"></apply-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <mglist-model>
            <!-- 头部搜索-->
            <div slot="top">
                <div class="pull-right">
                    <button class="btn btn-default transfer" @click="New()">新建</button>
                    <button class="btn btn-primary  transfer" @click="searchMsg()">刷新</button>
                </div>
                <div class="clearfix">
                    <dl class="clear left">
                        <dt class="left  marg_top">{{$t('static.client_name')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.customerName" @keyup.enter="searchMsg()" placeholder="{{$t('static.enter_client_name')}}" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left  marg_top">{{$t('static.client_phone')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.customerPhone" @keyup.enter="searchMsg()" placeholder="{{$t('static.enter_client_phone')}}" />
                        </dd>
                    </dl>
                    <dl class="clearfix pull-left transfer">
                        <dt class="left  marg_top">{{$t('static.review_status')}}：</dt>
                        <dd class="left">
                            <select class="form-control search_input" v-model="loadParam.validate" @change="searchMsg()">
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="0">{{$t('static.initial')}}</option>
                                <option value="1">{{$t('static.review_application')}}</option>
                                <option value="2">{{$t('static.approved')}}</option>
                                <option value="3">{{$t('static.unapproved')}}</option>
                            </select>
                        </dd>
                    </dl>
                    <button class="new_btn  pull-left transfer" @click="searchMsg()">搜索</button>
                    <button class="new_btn  pull-left transfer" @click="resetCondition()">清空条件</button>
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
                            <th>客户名称</th>
                            <th>客户电话</th>
                            <th>需支付总金额</th>
                            <th>币种</th>
                            <th>收货人名称</th>
                            <th>联系方式</th>
                            <th>收货地址</th>
                            <th>样品名称</th>
                            <th>审核状态</th>
                            <th>备注</th>
                            <th>创建时间</th>
                            <th style="min-width: 150px;text-align: left">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initSamplelist">
                            <td class="underline" @click="clickOn({
                                 id:item.id,
                                 sub:$index,
                                 show:true,
                                 key:'sampleDetail',
                                 name:item.customerName,
                                 loading:false
                             })">{{item.customerName}}</td>
                            <td>{{item.customerPhone}}</td>
                            <td>{{item.total}}</td>
                            <td>{{item.currency | Currency}}</td>
                            <td>{{item.consignee}}</td>
                            <td>{{item.consigneePhone}}</td>
                            <td>{{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.address}}</td>
                            <td>{{item.sampleDesc}}</td>
                            <td v-if="item.validate==0">{{item.validate | Audit}}</td>
                            <td v-if="item.validate==1">
                                <div style="background:#9010ff;color:#fff">{{item.validate | Audit}}</div>
                            </td>
                            <td v-if="item.validate==2">
                                <div style="background:green;color:#fff">{{item.validate | Audit}}</div>
                            </td>
                            <td v-if="item.validate==3">
                                <div style="background:green;color:#fff">{{item.validate | Audit}}</div>
                            </td>
                            <td>{{item.comments}}</td>
                            <td>{{item.ctime}}</td>
                            <td style="text-align: left;">
                                <a class="operate" v-if="item.validate==0||item.validate==3" @click="updateOrder(item,$index)">
                                    <img src="/static/images/edit.png" alt="编辑" title="编辑" />
                                </a>
                                <a class="operate" v-if="item.validate==0||item.validate==3" @click="deleInfo({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:deleteData,
                                    url:'/sample/',
                                    key:'mySampleList'
                                    })">
                                    <img src="/static/images/del.png" />
                                </a>
                                <a class="operate" v-if="item.validate==0" @click="applyCheck({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:sampleApply,
                                    title:'寄样申请',
                                    auditComment:'',
                                    validate:item.validate,
                                    url:'/sample/validate/apply/',
                                    key:'mySampleList'
                                    })">
                                    <img src="/static/images/apply.png" />
                                </a>
                                <a class="operate" v-if="item.validate==1">
                                    <button type="button" class="btn btn-default" height="24" width="24" style="font-size:4px;padding:0px 2px;margin-top:-22px;color:#fa6705" @click="applyCheck({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:sampleApply,
                                    title:'取消寄样申请',
                                    auditComment:'',
                                    url:'/sample/validate/cancel/',
                                    key:'mySampleList'
                                    })">取消申请
                                    </button>
                                </a>
                                <a class="operate" v-if="item.validate==3" @click="applyCheck({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:sampleApply,
                                    title:'重新申请',
                                    auditComment:'',
                                    validate:item.validate,
                                    url:'/sample/validate/apply/',
                                    key:'mySampleList'
                                    })">
                                    <img src="/static/images/reset.png" />
                                </a>
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
import createModel from '../sendSampleapply'
import detailModel from '../sampleDetail'
import common from '../../../common/common'
import deleteModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import editModel from '../alterSample'
import applyModel from '../../tips/auditDialog'
import tipsModel from '../../tips/tipDialog'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initSamplelist,
    initLogin
} from '../../../vuex/getters'
import {
    getSampleList,
    getSampleDetail,
    deleteData,
    sampleApply
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        createModel,
        detailModel,
        deleteModel,
        editModel,
        applyModel,
        tipsModel,
        mglistModel
    },
    vuex: {
        getters: {
            initSamplelist,
            initLogin
        },
        actions: {
            getSampleList,
            getSampleDetail,
            deleteData,
            sampleApply
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                customerName: '',
                customerPhone: '',
                validate: '',
                key: 'samplelist',
                total: 0
            },
            delParam: {
                show: false,
                id: ''
            },
            applyParam: {
                show: false,
                sample: ''
            },
            changeParam: {
                show: false
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            createParam: {
                send: false,
                customerName: '',
                customerPhone: '',
                customer: '',
                breedName: '',
                consignee: '',
                consigneePhone: '',
                currency: '1',
                address: '',
                comments: '',
                country: '中国',
                province: '',
                city: '',
                district: '',
                total: '',
                employee: this.initLogin.id,
                items: [

                ],
            },
            dialogParam: {
                send: false,
                link: '/sample/',
                key: 'samplelist',
                id: '',
                index: '',
                customerName: '',
                customerPhone: '',
                consignee: '',
                consigneePhone: '',
                total: '',
                country: '',
                address: '',
                province: '',
                city: '',
                comments: '',
                district: '',
                items: [ //存放商品条目

                ],
                itemsBack: [ //商品条目备份，用于与修改后的商品条目对照

                ],
            },
            checked: false
        }
    },
    methods: {
        clickShow: function(index) {
            this.$store.state.table.basicBaseList.msgList[index].show = !this.$store.state.table.basicBaseList.msgList[index].show;
        },
        applyCheck: function(initSamplelist) {
            this.applyParam = initSamplelist;
            this.applyParam.callback = this.applycallback;
        },
        applycallback: function(title) {
            console.log(title)
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
        New: function() {
            this.createParam.send = true;
            this.createParam.callback = this.newcallback;
        },
        newcallback: function(title) {
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
        searchMsg: function() {
            this.getSampleList(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.validate = '';
            this.getSampleList(this.loadParam);
        },
        onlyselected: function(index) {
            var _this = this;
            this.$store.state.table.basicBaseList.msgList[index].checked = !this.$store.state.table.basicBaseList.msgList[index].checked;
            if (!this.$store.state.table.basicBaseList.msgList[index].checked) {
                this.checked = false;
            } else {
                this.checked = true;
                this.$store.state.table.basicBaseList.msgList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.msgList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.msgList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        clickOn: function(initSamplelist) {
            this.changeParam = initSamplelist;
        },
        deleInfo: function(initSamplelist) {
            this.delParam = initSamplelist;
        },
        updateOrder: function(item, index) {
            this.dialogParam.send = true;
            this.dialogParam.id = item.id;
            this.dialogParam.country = item.country;
            this.dialogParam.province = item.province;
            this.dialogParam.city = item.city;
            this.dialogParam.address = item.address;
            this.dialogParam.district = item.district;
            this.dialogParam.index = index;
            this.dialogParam.items = [];
            this.dialogParam.itemsBack = [];
            this.dialogParam.callback = this.updateback;
        },
        updateback: function(title) {
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getSampleList(this.loadParam);
        }
    },
    created() {
        this.getSampleList(this.loadParam);
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.service-nav {
    padding-bottom: 10px;
}

.my_enterprise {
    padding: 6px;
}

.transfer {
    margin-left: 18px;
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
    width: 143px;
    min-width: 143px;
}
</style>

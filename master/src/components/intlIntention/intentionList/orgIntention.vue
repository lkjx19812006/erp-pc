<template>
    <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
    <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
    <create-model :param.sync="createParam" v-if="createParam.show"></create-model>
    <modify-model :param.sync="modifyParam" v-if="modifyParam.show"></modify-model>
    <inquire-model :param="inquireParam" v-if="inquireParam.show"></inquire-model>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <inquiry-audit-dialog :param.sync="againParam" v-if="againParam.show">></inquiry-audit-dialog>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <mglist-model>
        <div slot="top">
            <div class="clear">
                <dl class="clear left">
                    <dt class="left marg_top">{{$t('static.breed')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">{{$t('static.client_name')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerName" @keyup.enter="intentionSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">{{$t('static.salesman')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.employeeName" @keyup.enter="intentionSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">{{$t('static.client_email')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerEmail" @keyup.enter="intentionSearch()" />
                    </dd>
                </dl>
            </div>
            <div class="clearfix" style="padding-right:10px">
                <div class="btn-group pull-left">
                    <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.inquire===''}" @click="clickday('')">{{$t('static.please_select')}}</button>
                    <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.inquire===0}" @click="clickday(0)">{{$t('static.not_inquiry')}}</button>
                    <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.inquire===1}" @click="clickday(1)">{{$t('static.inquiry')}}</button>
                    <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.inquire===2}" @click="clickday(2)">{{$t('static.quotation')}}</button>
                    <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.inquire===3}" @click="clickday(3)">{{$t('static.quo_complete')}}</button>
                    <button class="new_btn transfer pull-left" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                    <button class="new_btn transfer pull-left" @click="intentionSearch()">{{$t('static.search')}}</button>
                </div>
                <button class="btn btn-primary pull-right transfer" @click="intentionSearch()">{{$t('static.refresh')}}</button>
            </div>
        </div>
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.type')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th style="width:146px;min-width: 146px;">{{$t('static.commodity_items')}}</th>
                        <th>{{$t('static.country')}}</th>
                        <th>{{$t('static.city')}}</th>
                        <th>{{$t('static.dealing_address')}}</th>
                        <th>{{$t('static.Number_of_inquiries')}}</th>
                        <th>{{$t('static.quotation_number')}}</th>
                        <th>{{$t('static.issued_time')}}</th>
                        <th>{{$t('static.description')}}</th>
                        <th>{{$t('static.inquiry_state')}}</th>
                        <th>{{$t('static.review_status')}}</th>
                        <th>{{$t('static.inquiry_type')}}</th>
                        <th>{{$t('static.intention_source')}}</th>
                        <th>{{$t('static.review')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOrgIntlIntentionList" style="cursor:pointer">
                        <td>
                            <div v-if="item.especial==0&&item.type==0">{{$t('static.common_purchase')}}</div>
                            <div v-if="item.especial==0&&item.type==1">{{$t('static.common_supply')}}</div>
                            <div v-if="item.especial==1&&item.type==0">{{$t('static.emergency')}}</div>
                            <div v-if="item.especial==1&&item.type==1">{{$t('static.low_cost')}}</div>
                        </td>
                        <td class="underline" @click="clickOn(item.id)">{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.names}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.inquireTime}}</td>
                        <td>{{item.offerTime}}</td>
                        <td>{{item.ctime}}</td>
                        <td>{{item.description}}</td>
                        <td>
                            <div v-if="item.inquire==0" style="background:#7B68EE;color:#fff">{{$t('static.initial')}}</div>
                            <div v-if="item.inquire==1" style="background:#CD853F;color:#fff">{{$t('static.inquiry')}}</div>
                            <div v-if="item.inquire==2" style="background:#483D8B;color:#fff">{{$t('static.quotation')}}</div>
                            <div v-if="item.inquire==3" style="background:green;color:#fff">{{$t('static.quo_complete')}}</div>
                        </td>
                        <td>
                            <div v-if="item.validate==0">{{$t('static.initial')}}</div>
                            <div v-if="item.validate==1">Tania {{$t('static.approving')}}</div>
                            <div v-if="item.validate==2">{{$t('static.approved')}}</div>
                            <div v-if="item.validate==-2">{{$t('static.unapproved')}}</div>
                        </td>
                        <td>{{item.inquireType}}</td>
                        <td>{{item.source}}</td>
                        <!-- 再次询价 申请审核 -->
                        <td>
                            <button class="btn btn-default btn-apply" v-if="item.inquire==3&&item.validate==1" @click="applicationAudit(item.id)">{{$t('static.Request_again')}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import tipsModel from '../../tips/tipDialog'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import searchModel from '../intlIntentionSearch'
import detailModel from '../intentionDetail'
import createModel from '../createIntention'
import modifyModel from '../modifyIntention'
import inquireModel from '../inquire'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import breedsearchModel from '../breedsearch'
import mglistModel from '../../mguan/mgListComponent.vue'
import inquiryAuditDialog from '../inquiryAuditDialog.vue'

import {
    initOrgIntlIntentionList
} from '../../../vuex/getters'
import {
    getIntlIntentionList,
    intlIntentionInquire,
    deleteIntlIntention,
    intlIntentionAffirmOffer,
    cancelIntlIntentionInquire
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        searchModel,
        detailModel,
        createModel,
        modifyModel,
        inquireModel,
        breedsearchModel,
        mglistModel,
        inquiryAuditDialog,
        tipsModel

    },
    vuex: {
        getters: {
            initOrgIntlIntentionList,

        },
        actions: {
            getIntlIntentionList,
            intlIntentionInquire,
            deleteIntlIntention,
            intlIntentionAffirmOffer,
            cancelIntlIntentionInquire

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
                total: 0,
                link: '/intlIntention/',
                key: 'orgIntlIntentionList',
                employeeName: '',
                breedId: '',
                breedName: '',
                customerName: '',
                customerEmail: '',
                inquire: ''

            },
            breedSearchParam: {
                show: false
            },
            detailParam: {
                link: '/intlIntention/',
                key: 'intentionDetail',
                show: false,
                loading: true,
                id: ''

            },
            intentionParam: {
                show: false,
                id: '',
                name: '意向'
            },
            inquireParam: {
                show: false,
                times: 0, //询价的次数
                link: '',
                intentionId: '',
                inquireType: '',
                comment: ''
            },
            affirmOfferParam: {
                show: false,
                link: '/intlIntention/offer',
                id: '',
                index: '',
                description: ''

            },
            cancelInquireParam: {
                link: '/intlIntention/inquire',
                id: ''
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            deleteParam: {
                show: false,
                id: '',
                index: '',
                link: '/intlIntention/',
            },
            editParam: {
                show: false,
            },
            createParam: {
                show: false,
                url: '/intlIntention/',
                customerId: '',
                customerName: '',
                customerPhone: '',
                customerEmail: '',
                country: '',
                province: '',
                city: '',
                district: '',
                address: '',
                duedate: '',
                pack: '',
                items: [

                ]
            },
            modifyParam: {
                show: false,
                link: '/intlIntention/',
                key: 'intentionList',
                id: '',
                index: '',
                duedate: '',
                pack: '',
                items: [

                ]
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
            againParam: { //再次询价
                show: false,
                description: '',
                link: '/intlIntention/inquireValidate',
                id: 0,
                callback: ""
            }
        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    methods: {
        clickday: function(inquire) {
            this.loadParam.inquire = inquire;
            this.getIntlIntentionList(this.loadParam);
        },
        inquire: function(id, time) {
            console.log('inquire');
            this.inquireParam.link = '/intlIntention/inquire';
            this.inquireParam.times = time;
            this.inquireParam.intentionId = id;
            this.inquireParam.inquireType = '';
            this.inquireParam.comment = '';
            this.inquireParam.show = true;
        },
        inquireAgain: function(id, time) {
            console.log('再次询价');
            this.inquireParam.link = '/intlIntention/itemInquire';
            this.inquireParam.times = time;
            this.inquireParam.intentionId = id;
            this.inquireParam.inquireType = '';
            this.inquireParam.comment = '';
            this.inquireParam.show = true;

        },
        cancelInquire: function(id) {

            this.cancelInquireParam.id = id;
            this.cancelIntlIntentionInquire(this.cancelInquireParam);
        },

        clickOn: function(id) {
            this.detailParam.id = id;
            this.detailParam.show = true;
        },
        eventClick: function(sub) {
            if (this.$store.state.table.basicBaseList.intentionList[sub].show) {
                this.$store.state.table.basicBaseList.intentionList[sub].show = !this.$store.state.table.basicBaseList.intentionList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.intentionList[sub].show = true;
            }
        },
        detailClick: function(initIntentionList) {
            this.chanceParam = initIntentionList;
        },
        onlyselected: function(sub, id) {
            var _this = this;
            this.$store.state.table.basicBaseList.intentionList[sub].checked = !this.$store.state.table.basicBaseList.intentionList[sub].checked;
            if (!this.$store.state.table.basicBaseList.intentionList[sub].checked) {
                this.checked = false;
            } else {
                this.checked = true;
                this.$store.state.table.basicBaseList.intentionList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.intentionList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.intentionList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        search: function() {
            this.loadParam.loading = false;
            this.loadParam.show = true;

        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        intentionSearch: function() {
            this.getIntlIntentionList(this.loadParam);
        },
        searchIntention: function() {
            this.getIntlIntentionList(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.employeeName = '';
            this.loadParam.customerName = '';
            this.loadParam.breedId = '';
            this.loadParam.breedName = '';
            this.loadParam.inquire = '';
            this.loadParam.customerEmail = '';
            this.getIntlIntentionList(this.loadParam);
        },

        createIntention: function() {

            this.createParam.show = true;
        },
        deleteIntention: function(id, index) {
            this.deleteParam.id = id;
            this.deleteParam.index = index;
            this.deleteIntlIntention(this.deleteParam);
        },
        modifyIntention: function(id, index) {
            this.modifyParam.show = true;
            this.modifyParam.id = id;
            this.modifyParam.index = index;
            this.modifyParam.items = [];
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
        // 再次询价的 申请审核
        applicationAudit: function(id) {
            this.againParam.id = id;
            this.againParam.show = true;
            this.againParam.callback = this.applyCallback;
        },
        applyCallback: function(name) {
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
            this.getIntlIntentionList(this.loadParam);

        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntlIntentionList(this.loadParam);
        },
        a: function(qq) {
            this.loadParam.employeeId = qq.employeeId;
            this.loadParam.employeeName = qq.employeeName;
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            if (!!breed.eName) {
                this.loadParam.breedName = breed.eName;
            }
            this.getIntlIntentionList(this.loadParam);
        }
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getIntlIntentionList, this.loadParam, localStorage.orgIntlIntentionParam);

    },
    filter: (filter, {})
}
</script>
<style scoped>
.service-nav {
    padding-left: 0;
    padding-bottom: 0px;
}

.click_change {
    text-align: left;
    border: 1px solid #ddd;
    border-bottom: none;
    border-right: none;
    width: 541px;
    line-height: 30px;
}

.click_change span {
    padding: 0 20px;
    display: inline-block;
    border-right: 1px solid #ddd;
    cursor: pointer;
}

.date_active {
    background: #fa6705;
    color: #fff;
}

.transfer {
    margin-left: 18px;
}

#table_box table th,
#table_box table td {
    min-width: 104px;
    width: 104px;
}
</style>

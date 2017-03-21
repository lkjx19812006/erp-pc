<template>
    <inquire-model :param="inquireParam" v-if="inquireParam.show"></inquire-model>
    <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
    <offer-model :param="offerParam" v-if="offerParam.show"></offer-model>
    <affirmoffer-model :param="affirmOfferParam" v-if="affirmOfferParam.show"></affirmoffer-model>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <mglist-model>
        <div slot="top">
            <div class="clear">
                <dl class="clear left">
                    <dt class="left  marg_top">{{$t('static.breed')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left  marg_top">{{$t('static.client_name')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerName" @keyup.enter="intentionSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left  marg_top">{{$t('static.salesman')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.employeeName" @keyup.enter="intentionSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left  marg_top">国家：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.country" @keyup.enter="intentionSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left  marg_top">{{$t('static.client_email')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerEmail" @keyup.enter="intentionSearch()" />
                    </dd>
                </dl>
            </div>
            <div class="btn-group pull-left">
                <button class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.inquire === ''}" @click="selectInquire('')">{{$t('static.please_select')}}</button>
                <button class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.inquire === 0}" @click="selectInquire(0)">{{$t('static.not_inquiry')}}</button>
                <button class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.inquire === 1}" @click="selectInquire(1)">{{$t('static.inquiry')}}</button>
                <button class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.inquire === 2}" @click="selectInquire(2)">{{$t('static.quotation')}}</button>
                <button class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.inquire === 3}" @click="selectInquire(3)">{{$t('static.quo_complete')}}</button>
                <button class="new_btn left transfer pull-left" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                <button class="new_btn left transfer pull-left" @click="intentionSearch()">{{$t('static.search')}}</button>
            </div>
            <button class="btn btn-primary pull-right" style="margin-right:20px" @click="intentionSearch()">{{$t('static.refresh')}}</button>
        </div>
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.inquire_type')}}</th>
                        <th>{{$t('static.commodity_items')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_email')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.country')}}</th>
                        <th>{{$t('static.city')}}</th>
                        <th>{{$t('static.intention_source')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.inquiry_state')}}</th>
                        <!-- <th>{{$t('static.handle')}}</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initIntlIntentionInquireList" style="cursor:pointer">
                        <td>{{item.inquireType}}</td>
                        <td>{{item.names}}</td>
                        <td class="underline" @click="clickOn(item,$index)">{{item.customerName}}</td>
                        <td>{{item.customerEmail}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.source}}</td>
                        <td>{{item.ctime}}</td>
                        <td v-if="item.inquire==0">
                            <div style="background:#7B68EE;color:#fff">{{$t('static.initial')}}</div>
                        </td>
                        <td v-if="item.inquire==1">
                            <div style="background:#CD853F;color:#fff">{{$t('static.inquiry')}}</div>
                        </td>
                        <td v-if="item.inquire==2">
                            <div style="background:#483D8B;color:#fff">{{$t('static.quotation')}}</div>
                        </td>
                        <td v-if="item.inquire==3">
                            <div style="background:green;color:#fff">{{$t('static.quo_complete')}}</div>
                        </td>
                        <!-- <td>
                            <div v-if="item.inquire==2&&privilege==true" style="display:inline-block;margin-right:7px" @click="confirmOffer(item.intentionId,$index)"><img src="/static/images/{{$t('static.img_confirm')}}.png" alt="确认报价"  /></div>
                        </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import offerModel from '../intlOffer'
import detailModel from '../inquireDetail' //国际报价详情
import affirmofferModel from '../confirmOffer'
import common from '../../../common/common'
import inquireModel from '../inquire'
import tipsModel from '../../../components/tips/tipDialog'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import breedsearchModel from '../breedsearch'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initIntlIntentionInquireList,
    initLogin
} from '../../../vuex/getters'
import {
    getIntlIntentionInquireList,
    intlIntentionInquire,

} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        inquireModel,
        offerModel,
        detailModel,
        affirmofferModel,
        tipsModel,
        breedsearchModel,
        mglistModel
    },
    vuex: {
        getters: {
            initIntlIntentionInquireList,
            initLogin
        },
        actions: {
            getIntlIntentionInquireList,
            intlIntentionInquire
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
                link: '/intlIntention/inquire',
                employee: '',
                breedId: '',
                breedName: '',
                employeeName: '',
                customerName: '',
                customerEmail: '',
                inquire: '',
                country: ''
            },
            affirmOfferParam: {
                show: false,
                link: '/intlIntention/offer',
                callback: this.offerCallback,
                id: '',
                index: '',
                description: ''
            },
            detailParam: {
                link: '/intlIntention/',
                key: 'intentionDetail',
                show: false,
                index: '', //询价列表的索引
                id: '',
                inquireId: '',
                inquire: '',
                callback: this.detailCallback
            },
            breedSearchParam: {
                show: false
            },
            inquireParam: {
                show: false,
                times: 0, //询价的次数
                link: '',
                intentionId: '',
                inquireType: '',
                comment: ''
            },
            tipsParam: {
                show: false,
                name: '修改成功',
                alert: true,
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
            offerParam: {
                show: false,
                id: '',
                items: [],
            },
            privilege: /31/.test(this.initLogin.privilege), //判断是否为供应部主管
            checked: false,
            auditParam: {
                title: '意向申请审核备注',
                auditComment: '',
                confirm: true,
                callback: '',
                show: false
            }
        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    methods: {
        selectInquire: function(inquire) {
            this.loadParam.inquire = inquire;
            this.getIntlIntentionInquireList(this.loadParam);
        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        clickOn: function(item, index) {
            this.detailParam.id = item.intentionId;
            this.detailParam.index = index;
            this.detailParam.inquireId = item.id;
            this.detailParam.inquire = item.inquire;
            this.detailParam.show = true;
        },
        intentionSearch: function() {
            this.getIntlIntentionInquireList(this.loadParam);
        },
        offer: function() {
            this.offerParam.show = true;
        },
        confirmOffer: function(intentionId, index) {
            console.log(intentionId);
            this.affirmOfferParam.id = intentionId;
            this.affirmOfferParam.index = index;
            this.affirmOfferParam.show = true;
            //this.intlIntentionAffirmOffer(this.affirmOfferParam);
        },
        search: function() {
            this.loadParam.loading = false;
            this.loadParam.show = true;

        },
        searchIntention: function() {
            this.getIntlIntentionInquireList(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.employee = '';
            this.loadParam.customerName = '';
            this.loadParam.employeeName = '';
            this.loadParam.breedId = '';
            this.loadParam.breedName = '';
            this.loadParam.inquire = '';
            this.loadParam.customerEmail = '';
            this.getIntlIntentionInquireList(this.loadParam);
        },
        offerCallback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
        },
        //在详情界面需要刷新列表页面时，调用此函数
        detailCallback: function() {
            this.getIntlIntentionInquireList(this.loadParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIntlIntentionInquireList(this.loadParam);
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            if (!!breed.eName) {
                this.loadParam.breedName = breed.eName;
            }
            this.getIntlIntentionInquireList(this.loadParam);
        }
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getIntlIntentionInquireList, this.loadParam, localStorage.intlInquireParam);
        console.log(this.initLogin.privilege)

        console.log(/31/.test(this.initLogin.privilege))
    },
    filter: (filter, {})
}
</script>
<style scoped>
.service-nav {
    padding: 25px 0 0 0;
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
    min-width: 170px;
    width: 170px;
}
</style>

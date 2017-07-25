<template>
    <div>
        <update-model :param="editParam" v-if="editParam.show"></update-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <audit-model :param="financeParam" v-if="financeParam.show"></audit-model>
        <contract-model :param="contractParam" v-if="contractParam.show"></contract-model>
        <language-model v-show="false"></language-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clearfix">
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
                        <dd class="left">
                            <select class="form-control" v-model="loadParam.orderType" @change="selectSearch()">
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="0">{{$t('static.purchase')}}</option>
                                <option value="1">{{$t('static.sell')}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left  marg_top">{{$t('static.breed')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.orderDesc" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.order_no')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.orderNo" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl>
                   <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.client_id')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.customer" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl> 
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.client_name')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.customerName" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.client_phone')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.customerPhone" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl>
                    <button type="button" class="new_btn transfer pull-left" @click="resetTime()">{{$t('static.clear_all')}}</button>
                    <button class="new_btn transfer pull-left" @click="selectSearch()">{{$t('static.search')}}</button>
                    <div class="clearfix right">
                        <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                    </div>
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_color table-striped" v-cloak id="tab">
                    <thead>
                        <tr>
                            <th>{{$t('static.date')}}</th>
                            <th>{{$t('static.client_id')}}</th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.client_phone')}}</th>
                            <th>{{$t('static.breed')}}</th>
                            <th>{{$t('static.order_no')}}</th>
                            <th>{{$t('static.order_type')}}</th>
                            <th>{{$t('static.diferencia')}}</th>
                            <th>{{$t('static.contract_note')}}</th>
                            <th>{{$t('static.comment')}}</th>
                            <th>{{$t('static.approve_comment')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th>{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initMyContractList">
                            <td>{{item.ctime | dateTime}}</td>
                            <td>{{item.customer}}</td>
                            <td><a @click="details({
                                id:item.id,
                                show:true,
                                loading:false,
                                url:'/order/contract/details/',
                                index:$index
                                })">{{item.customerName}}</a>
                            </td>
                            <td>{{item.customerPhone}}</td>
                            <td>{{item.orderDesc}}</td>
                            <td>{{item.orderNo}}</td>
                            <td v-if="item.orderType==0">{{$t('static.purchase')}}</td>
                            <td v-if="item.orderType==1">{{$t('static.sell')}}</td>
                            <td>{{item.adjusted}}</td>
                            <td>{{item.contractText}}</td>
                            <td>{{item.comment}}</td>
                            <td>{{item.description}}</td>
                            <td v-if="this.language=='zh_CN'">{{item.validate | Auditing}}</td>
                            <td v-if="this.language=='en'">{{item.validate | EnAuditing}}</td>
                            <td>
                                <a class="operate" v-if="item.validate==-2" @click="editPayment({
                                  show:true,
                                  sub:$index,
                                  id:item.id,
                                  orderId:item.orderId,
                                  validate:item.validate,
                                  adjusted:item.adjusted,
                                  comment:item.comment,
                                  image_f:'',
                                  image_s:'',
                                  image_t:'',
                                  images:'',
                                  contractText:item.contractText,
                                  url:'/order/contract/edit',
                                  titles:'编辑',
                                  link:contractEdit
                              })"><img src="/static/images/{{$t('static.img_edit')}}.png" alt="编辑" /></a>
                                <a class="operate" v-if="item.validate==-2&&item.taskKey=='supplementary_contract_employee_handle'" @click="applyInfo({
                                    show:true,
                                    sub:$index,
                                    id:item.id,
                                    validate:item.validate,
                                    adjusted:item.adjusted,
                                    comment:'',
                                    url:'/order/quality/contract/restartOrCancel',
                                    titles:'重新申请审核',
                                    link:contractCheck
                                })"><img src="/static/images/{{$t('static.img_reset')}}.png" alt="重新申请审核" /></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
    </div>
</template>
<script>
import pagination from '../pagination'
import detailModel from '../order/second_order/fundDetail'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import auditModel from './second_order/financeAudit'
import tipsModel from '../../components/tips/tipDialog'
import updateModel from '../../components/order/second_order/updateContract'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'
import contractModel from '../order/second_order/orderReceiveDetail'
import {
    initMyContractList
} from '../../vuex/getters'
import {
    getMyContractList,
    paymentConfirm,
    contractCheck,
    contractEdit
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        detailModel,
        auditModel,
        tipsModel,
        updateModel,
        mglistModel,
        languageModel,
        contractModel
    },
    vuex: {
        getters: {
            initMyContractList
        },
        actions: {
            getMyContractList,
            paymentConfirm,
            contractCheck,
            contractEdit
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
                all: 1,
                link: '/order/contract/list/employee',
                orderDesc: '',
                customer:'',
                customerName: '',
                customerPhone: '',
                orderNo: '',
                orderType: '',
                validate: '',
                total: 0
            },
            contractParam: {
                show: false
            },
            editParam: {
                show: false
            },
            tipsParam: {
                show: false,
                alert: true,
                name: ''
            },
            language: '',
            financeParam: {
                show: false
            },
            checked: false
        }
    },
    methods: {
        selectSearch: function() {
            this.getMyContractList(this.loadParam);
        },
        clickday: function(validate) {
            this.loadParam.validate = validate;
            this.getMyContractList(this.loadParam);
        },
        details: function(item) {
            this.contractParam = item;
        },
        resetTime: function() {
            this.loadParam.orderDesc = '';
            this.loadParam.customer='';
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.orderNo = '';
            this.loadParam.orderType = '';
            this.getMyContractList(this.loadParam);
        },
        editPayment: function(param) {
            this.editParam.show = true;
            this.editParam = param;
            this.editParam.callback = this.callback;
            console.log(this.editParam)
        },
        applyInfo: function(item) {
            this.financeParam.show = true;
            this.financeParam = item;
            this.financeParam.callback = this.callback;
        },
        callback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.alert = true;
            this.tipsParam.name = title;
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getMyContractList(this.loadParam);
        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.count.isTop, this.getMyContractList, this.loadParam, localStorage.myFundParam);
        this.language = localStorage.lang;
    }
}
</script>
<style scoped>
.transfer {
    margin-right: 10px;
}

.service-nav {
    padding-bottom: 0px;
    padding-left: 10px;
    padding-right: 10px;
}

#table_box table th,
#table_box table td {
    width: 144px;
    min-width: 144px;
}
</style>

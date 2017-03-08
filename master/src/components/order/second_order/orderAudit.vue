<template>
    <div>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <bank-model :param="branchParam" v-if="branchParam.show"></bank-model>
        <div v-show="param.show" class="modal modal-main fade account-modal" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>{{param.titles}}</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <!-- 申请分期 -->
                    <section class="editsection clearfix" v-cloak v-if="param.titles==this.$t('static.review_application')">
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.country')}} <span class="system_danger" v-if="$validation.country.required">{{$t('static.required')}}</span></label>
                            <input type="text" v-validate:country="{required:true}" v-show="false" v-model="param.country" class="form-control edit-input" />
                            <div type="text" class="edit-input">
                                <v-select :debounce="250" :value.sync="country" :on-change="clickCountry" :options="initCountrylist" placeholder="国家/Country" label="cnameEn">
                                </v-select>
                            </div>
                        </div>
                        <!-- 判断是否国际 -->
                        <div v-if="param.country==7">
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.payment_method')}} <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payWay" @change="selectname()">
                                    <option value="2">{{$t('static.pingan')}}</option>
                                    <option value="0">{{$t('static.offline')}}</option>
                                    <option value="1">{{$t('static.alipay')}}</option>
                                    <option value="4">WeChat</option>
                                    <option value="3">{{$t('static.yaokuan')}}</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6" v-if="param.payWay!=2">
                                <label class="editlabel">{{$t('static.name')}} <span class="system_danger" v-if="$validation.name.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:name="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payName">
                                    <option>{{$t('static.offline')}}</option>
                                    <option>{{$t('static.alipay')}}</option>
                                    <option>Wechat</option>
                                    <option>{{$t('static.yaokuan')}}</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6" v-if="param.payWay==2">
                                <label class="editlabel">{{$t('static.bank_name')}} <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:payname="{required:true}" v-show="false" v-model="payName.name" class="form-control edit-input" />
                                <div class="form-control edit-input" style="padding:0;border:none">
                                    <v-select :debounce="250" :value.sync="payName" :on-change="selectProvince" :options="initBankList" placeholder="银行名称" label="name">
                                    </v-select>
                                </div>
                                <!-- <select class="form-control edit-input" v-model="param.payName">
                                    <option v-for="item in initBankList">{{item.name}}</option>
                               </select> -->
                            </div>
                            <div class="editpage-input col-md-6" v-if="param.payWay==2">
                                <label class="editlabel">{{$t('static.paid_branch')}}</label>
                                <input type="text" v-model="param.paySubName" v-if="payName.name==''" disabled="true" class="form-control edit-input" placeholder="请先选择一个银行" />
                                <input type="text" v-model="param.paySubName" v-if="payName.name!==''" class="form-control edit-input" @click="branch({
                              show:true,
                              name:this.payName.name
                            })" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.userName')}} <span class="system_danger" v-if="$validation.payuser.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-model="param.payUserName" v-validate:payuser="['required']" class="form-control edit-input" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.account')}} <span class="system_danger" v-if="$validation.paynumber.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-model="param.payNumber" class="form-control edit-input" v-validate:paynumber="['required']" />
                            </div>
                        </div>
                        <div v-if="param.country!==7">
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.payment_method')}} <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payWay" @change="selectname()">
                                    <option value="2">{{$t('static.pingan')}}</option>
                                    <option value="5">PayPal</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6" v-show="false">
                                <label class="editlabel">{{$t('static.name')}} <span class="system_danger" v-if="$validation.name.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:name="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payName">
                                    <option>{{$t('static.pingan')}}</option>
                                    <option>PayPal</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.pattern')}} <span class="system_danger" v-if="$validation.pi.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:pi="{required:true}" v-model="param.payNumber" class="form-control edit-input" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.total_money')}} <span class="system_danger" v-if="$validation.amount.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:amount="{required:true}" v-model="param.amount" class="form-control edit-input" />
                            </div>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.currency')}}</label>
                            <select v-model="param.currency" class="form-control edit-input" disabled="true">
                                <option v-for="item in initCurrencylist" value="{{item.id}}">{{item.cname}}{{item.name}}</option>
                            </select>
                        </div>
                        <div class="editpage-input col-md-12">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.comment}}"></textarea>
                        </div>
                        <div class="editpage-input col-md-12" style="max-height:200px;overflow-y:auto">
                            <label class="editlabel">{{$t('static.payment')}}</label>
                            <press-image :value.sync="param.image_f" :type.sync="type" :param="imageParam"></press-image>
                        </div>
                    </section>
                    <!-- 重新申请审核 -->
                    <section class="editsection clearfix" v-cloak v-if="param.titles=='重新申请审核'||param.titles=='重新申请支付'">
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.country')}} <span class="system_danger" v-if="$validation.country.required">{{$t('static.required')}}</span></label>
                            <input type="text" v-validate:country="{required:true}" v-show="false" v-model="param.country" class="form-control edit-input" />
                            <div type="text" class="edit-input">
                                <v-select :debounce="250" :value.sync="country" :on-change="clickCountry" :options="initCountrylist" placeholder="国家/Country" label="cnameEn">
                                </v-select>
                            </div>
                        </div>
                        <!-- 判断是否国际 -->
                        <div v-if="param.country==7">
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.payment_method')}} <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payWay" @change="selectname()">
                                    <option value="2">{{$t('static.pingan')}}</option>
                                    <option value="0">{{$t('static.offline')}}</option>
                                    <option value="1">{{$t('static.alipay')}}</option>
                                    <option value="4">WeChat</option>
                                    <option value="3">{{$t('static.yaokuan')}}</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6" v-if="param.payWay!=2">
                                <label class="editlabel">{{$t('static.name')}} <span class="system_danger" v-if="$validation.name.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:name="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payName">
                                    <option>{{$t('static.offline')}}</option>
                                    <option>{{$t('static.alipay')}}</option>
                                    <option>Wechat</option>
                                    <option>{{$t('static.yaokuan')}}</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6" v-if="param.payWay==2">
                                <label class="editlabel">{{$t('static.bank_name')}} <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:payname="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payName">
                                    <option v-for="item in initBankList">{{item.name}}</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6" v-if="param.payWay==2">
                                <label class="editlabel">{{$t('static.paid_branch')}}</label>
                                <!-- <select class="form-control edit-input" v-model="initMyFundList[initMyFundList.length-1].paySubName"> -->
                                <input type="text" v-model="param.paySubName" class="form-control edit-input" @click="branch({
                            show:true,
                            name:this.param.payName
                          })" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.userName')}} <span class="system_danger" v-if="$validation.payuser.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-model="param.payUserName" v-validate:payuser="['required']" class="form-control edit-input" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.account')}} <span class="system_danger" v-if="$validation.paynumber.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-model="param.payNumber" class="form-control edit-input" v-validate:paynumber="['required']" />
                            </div>
                        </div>
                        <div v-if="param.country!==7">
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.payment_method')}} <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payWay" @change="selectname()">
                                    <option value="2">{{$t('static.pingan')}}</option>
                                    <option value="5">PayPal</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6" v-show="false">
                                <label class="editlabel">{{$t('static.name')}} <span class="system_danger" v-if="$validation.name.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:name="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                                <select class="form-control edit-input" v-model="param.payName">
                                    <option>{{$t('static.pingan')}}</option>
                                    <option>PayPal</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.pattern')}} <span class="system_danger" v-if="$validation.pi.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:pi="{required:true}" v-model="param.payNumber" class="form-control edit-input" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.total_money')}} <span class="system_danger" v-if="$validation.amount.required">{{$t('static.required')}}</span></label>
                                <input type="text" v-validate:amount="{required:true}" v-model="param.amount" class="form-control edit-input" />
                            </div>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.currency')}}</label>
                            <select v-model='param.currency' class="form-control edit-input" disabled="true">
                                <option v-for="item in initCurrencylist" value="{{item.id}}">{{item.cname}}{{item.name}}</option>
                            </select>
                        </div>
                        <div class="editpage-input col-md-12">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.comment}}"></textarea>
                        </div>
                        <div class="editpage-input col-md-12" style="max-height:200px;overflow-y:auto;">
                            <label class="editlabel">{{$t('static.payment')}}</label>
                            <!-- <img :src="param.images" /> -->
                            <press-image :value.sync="param.image_f" :type="type" :param="imageParam"></press-image>
                        </div>
                    </section>
                    <!-- 重新申请审核end -->
                    <section class="editsection clearfix" v-cloak v-if="param.titles==this.$t('static.apply_send')">
                        <div class="editpage-input col-md-12">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.description}}"></textarea>
                        </div>
                    </section>
                    <!-- 收付款编辑 -->
                    <section class="editsection clearfix" v-cloak v-if="param.titles==this.$t('static.edit')">
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.payment_method')}} <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                            <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                            <select class="form-control edit-input" v-model="param.payWay" @change="selectname()">
                                <option value="2">{{$t('static.pingan')}}</option>
                                <option value="0">{{$t('static.offline')}}</option>
                                <option value="1">{{$t('static.alipay')}}</option>
                                <option value="4">WeChat</option>
                                <option value="3">{{$t('static.yaokuan')}}</option>
                            </select>
                        </div>
                        <div class="editpage-input col-md-6" v-if="param.payWay!=2">
                            <label class="editlabel">{{$t('static.name')}} <span class="system_danger" v-if="$validation.name.required">{{$t('static.required')}}</span></label>
                            <input type="text" v-validate:name="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                            <select class="form-control edit-input" v-model="param.payName">
                                <option>{{$t('static.offline')}}</option>
                                <option>{{$t('static.alipay')}}</option>
                                <option>Wechat</option>
                                <option>{{$t('static.yaokuan')}}</option>
                            </select>
                        </div>
                        <div class="editpage-input col-md-6" v-if="param.payWay==2">
                            <label class="editlabel">{{$t('static.bank_name')}} <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                            <input type="text" v-validate:payname="{required:true}" v-show="false" v-model="payName.name" class="form-control edit-input" />
                            <div class="form-control edit-input" style="padding:0;border:none">
                                <v-select :debounce="250" :value.sync="payName" :on-change="selectProvince" :options="initBankList" placeholder="银行名称" label="name">
                                </v-select>
                            </div>
                        </div>
                        <div class="editpage-input col-md-6" v-if="param.payWay==2">
                            <label class="editlabel">{{$t('static.paid_branch')}}</label>
                            <input type="text" v-model="param.paySubName" class="form-control edit-input" @click="branch({
                                show:true,
                                name:this.payName.name
                              })" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.userName')}} <span class="system_danger" v-if="$validation.payuser.required">{{$t('static.required')}}</span></label>
                            <input type="text" v-model="param.payUserName" v-validate:payuser="['required']" class="form-control edit-input" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.account')}} <span class="system_danger" v-if="$validation.paynumber.required">{{$t('static.required')}}</span></label>
                            <input type="text" v-model="param.payNumber" class="form-control edit-input" v-validate:paynumber="['required']" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.diferencia')}}</label>
                            <input type="text" v-model="param.amount" class="form-control edit-input" disabled="true" />
                        </div>
                        <div class="editpage-input col-md-12">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" disabled="true"></textarea>
                        </div>
                    </section>
                </div>
                <div class="edit_footer" v-if="param.titles==this.$t('static.review_application')||param.titles==this.$t('static.edit')">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm(param)">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
                <div class="edit_footer" v-if="param.titles=='重新申请审核'||param.titles=='重新申请支付'">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirmReset(param)">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
                <div class="edit_footer" v-if="param.titles==this.$t('static.apply_send')">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="applySend(param)">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import tipsdialogModel from '../../tips/tipDialog'
import pressImage from '../../tools/upload/imagePressMul.vue'
import vSelect from '../../tools/vueSelect/components/Select'
import bankModel from './bankBranch'
import {
    initMyFundList,
    initBankList,
    initCountrylist,
    initBankBranchList,
    initCurrencylist
} from '../../../vuex/getters'
import {
    getMyFundList,
    getBankList,
    getBankBranchList,
    getCurrencyList,
    getCountryList,
    orderApplySend
} from '../../../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        pressImage,
        vSelect,
        bankModel
    },
    vuex: {
        getters: {
            initMyFundList,
            initBankList,
            initCountrylist,
            initBankBranchList,
            initCurrencylist
        },
        actions: {
            getMyFundList,
            getBankList,
            getCountryList,
            getCurrencyList,
            getBankBranchList,
            orderApplySend
        }
    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 1,
                type: this.param.type,
                validate: this.param.validate,
                bizSubId: this.param.bizSubId,
                bizId: this.param.bizId,
                total: 0
            },
            country: {
                cname: '',
                nameEn: '',
                cnameEn: ''
            },
            resetCheckParam: {
                amount: '',
                payName: '',
                payUserName: '',
                payNumber: '',
                payWay: '',
                paySubName: 0,
                //paySubName:0
            },
            tipsParam: {
                show: false,
                confirm: true,
                name: "",
                callback: ''
            },
            payName: {
                name: ""
            },
            branchParam: {
                show: false
            },
            type: "image/jpeg,image/jpg,image/png",
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            }
        }
    },

    methods: {
        clickCountry: function() {
            this.param.country = this.country.id;
            console.log(this.param.country)
            console.log(this.country.cnameEn)
        },
        branch: function(item) {
            this.branchParam.show = true;
            this.branchParam = item;
            console.log(this.branchParam)
        },
        selectname: function() {
            if (this.param.payWay == 0) {
                this.param.payName = this.$t('static.offline');
                this.param.paySubName = "";
            } else if (this.param.payWay == 1) {
                this.param.payName = this.$t('static.alipay');
                this.param.paySubName = "";
            } else if (this.param.payWay == 3) {
                this.param.payName = this.$t('static.yaokuan');
                this.param.paySubName = "";
            } else if (this.param.payWay == 4) {
                this.param.payName = 'Wechat';
                this.param.paySubName = "";
            } else if (this.param.payWay == 5) {
                this.param.payName = 'PayPal';
                this.param.paySubName = "";
            } else if (this.param.payWay == 2 && this.param.country !== 7) {
                this.param.payName = this.$t('static.pingan');
                this.param.paySubName = "";
            }
        },
        confirm: function(item) {
            this.param.show = false;
            if (this.payName.name) {
                this.param.payName = this.payName.name;
            }
            console.log(this.param);
            this.param.link(this.param);
        },
        confirmReset: function(item) {
            console.log(item)
            this.param.show = false;
            this.param.link(item)
            console.log(item)
        },
        applySend: function(item) {
            this.param.show = false;
            console.log(item)
            this.orderApplySend(item);
        }
    },
    events: {
        subName: function(branch) {
            this.param.paySubName = branch.paySubName;
        },
        getImageData: function(imageData) {
            var paths = new Array();
            this.param.path = imageData.result.path;
        },
        getFiles: function(files) {
            this.param.images = '';
            for (let i = 0; i < files.length; i++) {
                if (i == 0) {
                    this.param.images = files[0].path;
                } else {
                    this.param.images = this.param.images + "," + files[i].path;
                }
            }
        }
    },
    created() {
        this.getCurrencyList(this.loadParam);
        this.getCountryList(this.loadParam)
        console.log(this.param.country)
        this.getBankList(this.payName);
        if (this.param.payName && this.param.titles == '申请分期审核') {
            this.payName.name = this.param.payName;
        }
    }

}
</script>
<style scoped>
.modal {
    z-index: 1085;
}

.modal_con {
    z-index: 1086;
    height: 650px;
}

.edit_footer {
    position: absolute;
    bottom: 0px;
}

.top-title {
    width: 100%;
    position: absolute;
    top: 0;
}

.big-font {
    font-size: 36px;
}

.top-title span {
    font-size: 28px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 15px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.edit-input {
    height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.editpage_img {
    width: 90%;
}

.editpage_img img {
    display: inline-block;
    background: #ccc;
}

.editpage-image {
    display: inline-block;
}
</style>

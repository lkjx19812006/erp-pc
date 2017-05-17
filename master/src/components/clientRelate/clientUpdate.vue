<template>
    <select-model :param="selectParam" v-if="selectParam.show"></select-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <language-model v-show="false"></language-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="cover_loading">
        <pulse-loader :loading="countryParam.loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.edit')}} {{param.name}}</h3>
        </div>
        <validator name="validation">
            <div class="edit-model">
                <section class="editsection clear" v-cloak>
                    <div class="editpage">
                        <div class="editpageleft">
                            <!-- 客户名称 -->
                            <div class="editpage-input">
                                <label class="editlabel" for="system">{{$t('static.client_name')}}<span class="system_danger" v-if="$validation.name.minlength">{{$t('static.enter_client_name')}}</span></label>
                                <input type="text" v-model='param.name' v-validate:name="{minlength:2}" class="form-control edit-input" value="{{param.name}}" />
                            </div>
                            <!-- 客户类型 -->
                            <div class="editpage-input" v-if="this.language=='zh_CN'">
                                <label class="editlabel">{{$t('static.client_type')}}</label>
                                <select class="form-control edit-input" v-model='param.type'>
                                    <option v-for="item in initUserType" value="{{item.id}}">{{item.name}}</option>
                                </select>
                            </div>
                            <div class="editpage-input" v-if="this.language=='en'">
                                <label class="editlabel">{{$t('static.client_type')}}</label>
                                <select class="form-control edit-input" v-model='param.type'>
                                    <option v-for="item in initUserType" value="{{item.id}}">{{item.id | customerTypeEn}}</option>
                                </select>
                            </div>
                            <!-- 法人 -->
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.legal')}} </label>
                                <input type="text" id="legalPerson" class="form-control edit-input" v-model="param.legalPerson" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.country')}}</label>
                                <div>
                                    <v-select :debounce="250" :value.sync="country" :on-change="selectProvince" :options="initCountrylist" placeholder="国家/Country" label="cnameEn">
                                    </v-select>
                                </div>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.province')}}</label>
                                <input type="text" v-if="!country.id" class="form-control edit-input" placeholder="请先选择一个国家" disabled="disabled" v-model='province.cname' value="{{param.provinceName}}" />
                                <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省/Province" label="cname" v-if="country.id">
                                </v-select>
                                <!-- <input type="text" v-model='param.province' class="form-control edit-input" value="{{param.province}}" /> -->
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.city')}}</label>
                                <input type="text" v-if="!province.id" class="form-control edit-input" placeholder="请先选择一个省" disabled="disabled" v-model='city.cname' />
                                <v-select :debounce="250" :value.sync="city" :options="initCitylist" placeholder="市/City" label="cname" v-if="province.id">
                                </v-select>
                                <!-- <input type="text" v-model='param.city' class="form-control edit-input" value="{{param.city}}" /> -->
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.business_scope')}}</label>
                                <input type="text" v-model='param.bizScope' class="form-control edit-input" value="{{param.bizScope}}" />
                            </div>
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.classification')}}</label>
                                <select class="form-control edit-input" v-model='param.classify' value="{{param.classify}}">
                                    <option value="1">{{$t("static.purchaser")}}</option>
                                    <option value="2">{{$t("static.supplier")}}</option>
                                    <option value="3">{{$t("static.purchaser_and_supplier")}}</option>
                                </select>
                            </div>
                            <!-- <div class="editpage-input" v-if="param.key=='myCustomerList'">
                          <label>{{$t('static.deparment')}}</label>
                          <input v-if="param.employeeName" type="text" class="form-control edit-input" readonly="readonly"
                                 v-model="param.employeeName" @click="selectParam.show=true"/>
                          <input v-if="!param.employeeName" type="text" class="form-control edit-input" readonly="readonly" v-model="param.orgName" @click="selectParam.show=true"/>
                        
                        </div>
                         -->
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.principals')}}</label>
                                <input type="text" v-model='param.principal' class="form-control edit-input" value="{{param.principal}}" />
                            </div>
                            <!-- 客户手机 -->
                            <div class="editpage-input" v-if="this.language=='zh_CN'">
                                <label class="editlabel" for="system">{{$t('static.cellphone')}}<span class="system_danger" v-if="$validation.mainphone.phone">{{$t('static.validate_cellphone')}}</span></label>
                                <input type="text" v-model="param.mainPhone" class="form-control edit-input" v-validate:mainphone="['phone']" debounce="500" value="{{param.mainPhone}}" />
                            </div>
                            <div class="editpage-input" v-if="this.language=='en'">
                                <label class="editlabel" for="system">{{$t('static.cellphone')}}</label>
                                <input type="text" v-model="param.mainPhone" class="form-control edit-input" debounce="500" value="{{param.mainPhone}}" />
                            </div>
                            <!-- 客户电话 -->
                            <div class="editpage-input">
                                <label class="editlabel" for="system">{{$t('static.telephone')}}</label>
                                <input type="text" v-model="param.tel" class="form-control edit-input" debounce="500" />
                            </div>
                            <!-- 客户邮箱 -->
                            <div class="editpage-input">
                                <label class="editlabel" for="system">{{$t('static.email')}}<span class="system_danger" v-if="$validation.email.email">{{$t('static.validate_email')}}</span></label>
                                <input type="text" v-model="param.email" class="form-control edit-input" v-validate:email="['email']" value="{{param.email}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.detailed_address')}}</label>
                                <input type="text" v-model='param.address' class="form-control edit-input" value="{{param.address}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.credit_rating')}}</label>
                                <select class="form-control edit-input" v-model='param.creditLevel'>
                                    <option value="1">{{$t('static.one_star')}}</option>
                                    <option value="2">{{$t('static.two_star')}}</option>
                                    <option value="3">{{$t('static.three_star')}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="editpage-input col-md-12" style="padding:0;">
                        <label class="editlabel">{{$t('static.comment')}}</label>
                        <textarea type="text" class="form-control" v-model="param.comments" value="{{param.comments}}" rows="5"></textarea>
                    </div>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                <button type="button" class="btn btn-confirm" v-if="$validation.valid" @click="confirm()">{{$t('static.confirm')}}</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
            </div>
        </validator>
    </div>
</template>
<script>
import tipsdialogModel from '../tips/tipDialog'
import vSelect from '../tools/vueSelect/components/Select'
import selectModel from '../user/employeeOrOrg'
import languageModel from '../tools/language.vue'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initUserType
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getUserTypeList
} from '../../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        vSelect,
        selectModel,
        languageModel
    },
    props: ['param'],
    data() {
        return {
            selectParam: {
                show: false,
                employeeId: '',
                employeeName: '',
                orgId: '',
                orgName: ''
            },
            province: {
                cname: '',
                id: ''
            },
            city: {
                cname: '',
                id: ''
            },
            country: {
                cname: '',
                cnameEn: '',
                id: ''
            },
            countryParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            language: '',
            provinceParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                country: ''
            },
            cityParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                province: ''
            },
            tipsParam: {
                show: false,
                alert: true,
                name: ''
            },
            checkCustomer: {}
        }
    },
    vuex: {
        getters: {
            initCountrylist,
            initProvince,
            initUserType,
            initCitylist
        },
        actions: {
            getCountryList,
            getProvinceList,
            getCityList,
            getUserTypeList
        }
    },
    methods: {
        selectProvince: function() {
            this.province = '';
            this.city = '';
            if (this.country != '' && this.country != null) {
                this.getProvinceList(this.country);
            }

        },
        selectCity: function() {
            this.city = '';
            if (this.province != '' && this.province != null) {
                this.getCityList(this.province);
            }

        },
        checkCustomer: function() { //检查客户是否存在
            var _self = this;
            var phone = this.param.mainPhone.replace(/(^\s*)|(\s*$)/g, "");
            this.$http({
                method: 'POST',
                url: '/crm/api/v1/customer/checkCustomer?phone=' + phone,
                emulateHTTP: true,
                emulateJSON: false,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                console.log(this.param.mainPhone)
                if (this.param.mainPhone.length >= 7 && this.param.mainPhone.length <= 45 && res.json().code == 200) {
                    _self.chechCallback(res.json().result);
                    _self.provinceArr = res.json().result;
                }
            }, (res) => {
                console.log('fail');
            })
        },
        chechCallback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        },
        confirm: function() {
            this.param.country = this.country.id;
            this.param.countryName = this.country.cnameEn;
            this.param.province = this.province.id;
            this.param.provinceName = this.province.cname;
            this.param.city = this.city.id;
            this.param.cityName = this.city.cname;
            this.param.show = false;
            this.param.callback = this.param.callback;
            this.param.link(this.param);
        }
    },
    watch: {
        'param.mainPhone': 'checkCustomer'
    },
    events: {
        'selectEmpOrOrg': function(param) {
            this.param.employeeId = param.employeeId;
            this.param.employeeName = param.employeeName;
            this.param.orgId = param.orgId;
            this.param.orgName = param.orgName;
        }
    },
    created() {
        if (this.param.country) {
            this.country.cnameEn = this.param.countryName;
            this.country.id = this.param.country;
            this.province.cname = this.param.provinceName;
            this.province.id = this.param.province;
            this.city.cname = this.param.cityName;
            this.city.id = this.param.id;
            //联动
            this.countryParam.country = this.param.country;
            this.countryParam.province = this.param.province;
            this.countryParam.city = this.param.city;

        }
        this.getCountryList(this.countryParam);
        this.getUserTypeList(this.countryParam);
        if (localStorage.lang) {
            this.language = localStorage.lang;
        } else {
            this.language = "zh_CN";
        }


    }
}
</script>
<style scoped>
.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    right: 0;
    top: 0;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.v-select {
    width: 90%;
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

.editpage-input {
    margin-top: 15px;
}

.edit-input {
    height: 36px;
    line-height: 36px;
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

.client-detailInfo {
    padding: 0px 30px 20px 30px;
}
</style>

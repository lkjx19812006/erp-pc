<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建客户地址</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.name')}}<span class="system_danger" v-if="$validation.name.minlength">{{$t('static.validate_name')}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.contactName" v-validate:name="{minlength:2}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.type')}}<span class="system_danger" v-if="$validation.aa.required">{{$t('static.validate_type')}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.type" v-validate:aa="['required']" v-show="false" />
                                    <select class="form-control edit-input" v-model="param.type">
                                        <option value="0">普通</option>
                                        <option value="1">默认</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.cellphone')}}<span class="system_danger" v-if="$validation.phone.phone">{{$t('static.validate_cellphone')}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.contactPhone" v-validate:phone="['phone']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.sex')}}</label>
                                    <select class="form-control" v-model="param.sex" style="width:90%;">
                                        <option value="1">男</option>
                                        <option value="0">女</option>
                                    </select>
                                </div>
                                <!-- 地址 -->
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.address')}}</label>
                                    <input type="text" class="form-control edit-input" v-model="address" readonly="readonly" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.countylist}}</label>
                                    <input type="text" class="form-control edit-input"  id="country" v-model="param.country" v-validate:country="['required']" /> -->
                                    <label class="editlabel">{{$t('static.country')}}</label>
                                    <div type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="country" :on-change="selectProvince" :options="initCountrylist" placeholder="国家" label="cname"></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <!--  <label class="editlabel">{{param.provicelist}}</label>
                                    <input type="text" class="form-control edit-input"  id="province" v-model="param.province" v-validate:province="['required']"/> -->
                                    <label class="editlabel">{{$t('static.province')}}</label>
                                    <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_country_first')}}" />
                                    <div v-if="country.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省" label="cname"></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.citylist}}</label>
                                    <input type="text" class="form-control edit-input"  id="city" v-model="param.city" v-validate:city="['required']" /> -->
                                    <label class="editlabel">{{$t('static.city')}}</label>
                                    <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_province_first')}}" />
                                    <div v-if="province.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="city" :on-change="selectDistrict" :options="initCitylist" placeholder="市" label="cname"></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.distlist}}</label>
                                    <input type="text" class="form-control edit-input"  id="district" v-model="param.district" v-validate:district="['required']" /> -->
                                    <label class="editlabel">{{$t('static.area')}}</label>
                                    <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_city_first')}}" />
                                    <div v-if="city.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="district" :on-change="sDistrict" :options="initDistrictlist" placeholder="区" label="cname"></v-select>
                                    </div>
                                </div>
                                <!-- 详细地址 -->
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.detailed_address')}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.detailAddr" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm()">{{$t('static.save')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.save')}}</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList,
    createAddress

} from '../../vuex/actions'
export default {
    components: {
        vSelect
    },
    props: ['param'],
    data() {
        return {
            country: {
                id: '',
                cname: ''
            },
            province: {
                id: '',
                cname: ''
            },
            city: {
                id: '',
                cname: ''
            },
            district: {
                id: '',
                cname: ''
            },
            countryParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            provinceParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                country: ''
            },
            cityParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                province: ''
            },
            districtParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                city: ''
            }
        }
    },
    route: {
        activate: function(transition) {

            transition.next()
        },
        deactivate: function(transition) {

            transition.next()
        }
    },
    vuex: {
        getters: {
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist
        },
        actions: {
            getCountryList,
            getProvinceList,
            getCityList,
            getDistrictList,
            createAddress
        }
    },
    computed: {
        address: function() {

            return this.country.cname + this.province.cname + this.city.cname + this.district.cname + this.param.detailAddr;
        }
    },
    methods: {
        selectProvince: function() {
            this.province = {
                id: '',
                cname: ''
            };
            this.city = {
                id: '',
                cname: ''
            };
            this.district = {
                id: '',
                cname: ''
            };
            if (this.country != '' && this.country != null) {
                this.getProvinceList(this.country);
            }
        },
        selectCity: function() {
            this.city = {
                id: '',
                cname: ''
            };
            this.district = {
                id: '',
                cname: ''
            };
            if (this.province != '' && this.province != null) {
                this.getCityList(this.province);
            }
        },
        selectDistrict: function() {
            this.district = {
                id: '',
                cname: ''
            };
            if (this.city != '' && this.city != null) {
                this.getDistrictList(this.city);
            }
        },
        sDistrict: function() {

        },
        confirm: function() {
            this.param.country = this.country.id;
            this.param.province = this.province.id;
            this.param.city = this.city.id;
            this.param.district = this.district.id;
            this.param.address = this.address;
            this.createAddress(this.param);
        }

    },
    created() {

        this.getCountryList(this.countryParam);
    }
}
</script>
<style scoped>
.modal {
    z-index: 1087;
}

.modal_con {
    z-index: 1087;
    bottom: 200px;
}

.top-title {
    position: absolute;
    top: 0;
    right: 0;
}

.edit_footer {
    bottom: 200px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
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

.edit-input {
    height: 36px;
    line-height: 18px;
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

.edit_footer button {
    margin-left: 15px;
}
</style>

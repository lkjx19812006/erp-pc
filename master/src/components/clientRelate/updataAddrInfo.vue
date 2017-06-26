<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.name')}}<span class="system_danger" v-if="$validation.name.minlength">请输入姓名且不少于两位数</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.contactName" v-validate:name="{minlength:2}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.type')}}</label>
                                    <select class="form-control edit-input" v-validate:aa="['required']" v-model="param.type" value="{{param.type}}">
                                        <option value="0">普通</option>
                                        <option value="1">默认</option>
                                    </select>
                                    <!-- <input type="text" class="form-control edit-input"  v-model="param.type" value="{{param.type}}" /> -->
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.cellphone')}}<span class="system_danger" v-if="$validation.phone.phone">请输入正确的号码</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.contactPhone" v-validate:phone="['phone']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.sex')}}</label>
                                    <select class="form-control" v-model="param.sex" style="width:90%;">
                                        <option value="1">男</option>
                                        <option value="0">女</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.address')}}</label>
                                    <input type="text" class="form-control edit-input" v-model="address" readonly="readonly" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.countylist}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.country" value="{{param.country}}" /> -->
                                    <label class="editlabel">{{$t('static.country')}}</label>
                                    <div type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="country" :on-change="selectProvince" :options="initCountrylist" placeholder="国家" label="cname"></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.provicelist}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.province" value="{{param.province}}" /> -->
                                    <label class="editlabel">{{$t('static.province')}}</label>
                                    <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
                                    <div v-if="country.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省" label="cname"></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.citylist}}</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.city" value="{{param.city}}" /> -->
                                    <label class="editlabel">{{$t('static.city')}}</label>
                                    <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个省" />
                                    <div v-if="province.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="city" :on-change="selectDistrict" :options="initCitylist" placeholder="市" label="cname"></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.distlist}}</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.district" value="{{param.district}}" /> -->
                                    <label class="editlabel">{{$t('static.area')}}</label>
                                    <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个市" />
                                    <div v-if="city.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="district" :on-change="sDistrict" :options="initDistrictlist" placeholder="区" label="cname"></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.detailed_address')}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.detailAddr" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm()">保存</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">保存</button>
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
    addrInfo
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
            addrInfo
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
            this.addrInfo(this.param);
        }

    },
    created() {
        if (this.param.country) {
            //用于联动
            this.countryParam.country = this.param.country;
            this.countryParam.province = this.param.province;
            this.countryParam.city = this.param.city;
            this.countryParam.district = this.param.district;
            //初始化，地址信息
            this.country.id = this.param.country;
            this.country.cname = this.param.countryName;
            this.province.id = this.param.province;
            this.province.cname = this.param.provinceName;
            this.city.id = this.param.city;
            this.city.cname = this.param.cityName;
            this.district.id = this.param.district;
            this.district.cname = this.param.districtName;
        }

        this.getCountryList(this.countryParam);
    }
}
</script>
<style scoped>
.modal {
    z-index: 1083
}

.modal_con {
    width: 630px;
    height: 600px;
    z-index: 1083;
}

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
    line-height: 20px;
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

.edit_footer {
    position: absolute;
    border-top: 1px solid #ddd;
    text-align: right;
    width: 630px;
    padding: 10px 20px;
    margin-bottom: -50px;
}

.edit_footer button {
    margin-left: 15px;
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

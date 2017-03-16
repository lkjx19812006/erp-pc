<template>
    <div>
        <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
        <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
        <div v-show="param.send" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.send">
            <div @click="param.send = false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="model-header">
                <h4>填写寄样申请表</h4>
                <validator name="validation">
                    <div class="edit-model">
                        <div>
                            <h4 style="text-align: left">样品信息</h4>
                            <table class="table table-hover table_color table-striped ">
                                <thead>
                                    <tr>
                                        <th>品种名称</th>
                                        <th>质量</th>
                                        <th>产地</th>
                                        <th>规格</th>
                                        <th>数量</th>
                                        <th>单位</th>
                                        <th>说明</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in param.items">
                                        <td>{{item.breedName}}</td>
                                        <td>{{item.quality}}</td>
                                        <td>{{item.location}}</td>
                                        <td>{{item.spec}}</td>
                                        <td>{{item.number}}</td>
                                        <td>{{item.cunit}}</td>
                                        <td>{{item.description}}</td>
                                        <td v-if="breedInfo.status==0||breedInfo.status==2" @click="showModifyBreed($index)"><a>{{$t('static.edit')}}</a></td>
                                        <td v-else>{{$t('static.edit')}}</td>
                                        <td v-if="breedInfo.status==0" @click="deleteBreed($index)"><a>{{$t('static.del')}}</a></td>
                                        <td v-else>{{$t('static.del')}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="padding-left:25%">
                                <div v-if="breedInfo.status==0" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0;cursor:pointer" @click="showAddBreed()">添加样品信息</div>
                            </div>
                            <validator name="inner">
                                <div v-if="addParam.show||updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                                    <div class="clearfix">
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.breed')}}<span class="system_danger" v-if="$inner.breedname.required">{{$t('static.required')}}</span></label>
                                            <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" v-validate:breedname="{required:true}" @click="searchBreed()" readonly="true" />
                                        </div>
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.quantity')}}<span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span></label>
                                            <input type="number" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                                        </div>
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                            <!-- <input type="text"  /> -->
                                            <select v-model="breedInfo.cunit" class="form-control edit-input" v-validate:unit="{required:true}">
                                                <option v-for="item in initUnitlist" value="{{item.id+','+item.name}}">{{item.name}}({{item.ename}})</option>
                                            </select>
                                        </div>
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.quality')}}</label>
                                            <input type="text" v-model="breedInfo.quality" class="form-control edit-input" />
                                        </div>
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.specification')}}</label>
                                            <input type="text" v-show="!breedParam.id" v-model="breedInfo.spec" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />
                                            <div type="text" class="edit-input" v-if="breedParam.id">
                                                <input-select :value.sync="breedInfo.spec" :prevalue="breedInfo.spec" :options="initBreedDetail.specs.arr" placeholder="规格" label="name">
                                                </input-select>
                                            </div>
                                        </div>
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.origin')}}</label>
                                            <input type="text" v-show="!breedParam.id" v-model="breedInfo.location" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />
                                            <div type="text" class="edit-input" v-if="breedParam.id">
                                                <input-select :prevalue="breedInfo.location" :value.sync="breedInfo.location" :options="initBreedDetail.locals.arr" placeholder="产地" label="name">
                                                </input-select>
                                            </div>
                                        </div>
                                        <div class="client-detailInfo  col-md-12">
                                            <label class="editlabel">说明</label>
                                            </label>
                                            <textarea class="form-control" v-model="breedInfo.description" value="{{breedInfo.description}}" style="resize:none; border:1px solid #ddd;" rows="5"></textarea>
                                        </div>
                                        <div class="pull-right col-md-6" style="margin-top:10px;text-align:right">
                                            <button type="button" class="btn btn-confirm">
                                                <div v-if="breedInfo.status==1" @click="cancelAddBreed()">{{$t('static.cancel')}}</div>
                                                <div v-if="breedInfo.status==2" @click="cancelModifyBreed()">{{$t('static.cancel')}}</div>
                                            </button>
                                            <button type="button" class="btn btn-confirm" v-if="$inner.valid">
                                                <div v-if="breedInfo.status==1" @click="addBreed()">{{$t('static.save')}}</div>
                                                <div v-if="breedInfo.status==2" @click="modifyBreed()">{{$t('static.save')}}</div>
                                            </button>
                                            <button type="button" class="btn btn-confirm" v-else disabled="disabled">{{$t('static.save')}}</button>
                                        </div>
                                    </div>
                                </div>
                            </validator>
                        </div>
                        <section class="editsection clearfix">
                            <h4 style="text-align: left;">客户信息</h4>
                            <div class="client-detailInfo col-md-6 col-xs-12">
                                <label class="editlabel">客户名称 <span class="system_danger" v-if="$validation.customer.required">请输入客户名称</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.customerName" value="{{param.customerName}}" @click="searchCustomer(param.customerName,param.customer,param.customerPhone)" v-validate:customer="['required']" />
                            </div>
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">客户电话</label>
                                <input type="text" class="form-control edit-input" v-model="param.customerPhone" value="{{param.customerPhone}}" />
                            </div>
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">收货人姓名（若为空则默认收货人为客户本人）</label>
                                <input type="text" class="form-control edit-input" v-model="param.consignee" value="{{param.consignee}}" />
                            </div>
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">收货人联系方式</label>
                                <input type="text" class="form-control edit-input" v-model="param.consigneePhone" value="{{param.consigneePhone}}" />
                            </div>
                            <!-- <div class="client-detailInfo  col-md-6 col-xs-12">
	                        <label class="editlabel">收货地址 <span class="system_danger" v-if="$validation.address.required">必填项</span></label></label>
	                        <input type="text" class="form-control edit-input" v-model="param.address" value="{{param.address}}" v-validate:address="['required']" />
	                    </div> -->
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">合计总额 <span class="system_danger" v-if="$validation.total.required">必填项</span></label>
                                </label>
                                <input type="text" class="form-control edit-input" v-model="param.total" value="{{param.total}}" v-validate:total="['required']" />
                            </div>
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">{{$t('static.country')}}<span class="system_danger" v-if="$validation.country.required">必填项</span></label>
                                <input type="text" v-show="false" v-model="country.cname" v-validate:country="['required']">
                                <div type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="country" :on-change="selectProvince" :options="initCountrylist" placeholder="国家" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">{{$t('static.province')}}<span class="system_danger" v-if="$validation.province.required">必填项</span></label>
                                <input type="text" v-show="false" v-model="province.cname" v-validate:province="['required']">
                                <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
                                <div v-if="country.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">{{$t('static.city')}}<span class="system_danger" v-if="$validation.city.required">必填项</span></label>
                                <input type="text" v-show="false" v-model="city.cname" v-validate:city="['required']">
                                <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个省" />
                                <div v-if="province.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="city" :on-change="selectDistrict" :options="initCitylist" placeholder="市" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">{{$t('static.area')}}<span class="system_danger" v-if="$validation.district.required">必填项</span></label>
                                <input type="text" v-show="false" v-model="district.cname" v-validate:district="['required']">
                                <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个市" />
                                <div v-if="city.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="district" :options="initDistrictlist" placeholder="区" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label class="editlabel">详细地址 <span class="system_danger" v-if="$validation.addr.required">必填项</span></label>
                                <input type="text" v-validate:addr="['required']" class="form-control edit-input" v-model="param.address" />
                            </div>
                            <div class="client-detailInfo  col-md-12">
                                <label class="editlabel">备注 </label>
                                </label>
                                <textarea class="form-control" v-model="param.comments" value="{{param.comments}}" style="resize:none; border:1px solid #ddd;" rows="5"></textarea>
                            </div>
                        </section>
                    </div>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-default btn-close" @click="param.send = false">{{$t('static.cancel')}}</button>
                        <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&param.items.length>0" @click="confirm()">{{$t('static.confirm')}}</button>
                        <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                    </div>
                </validator>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import vSelect from '../tools/vueSelect/components/Select'
import inputSelect from '../tools/vueSelect/components/inputselect'
import searchbreedModel from './breedsearch'
import searchcustomerModel from '../Intention/clientname'
import {
    initCustomerlist,
    initBreedDetail,
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initUnitlist
} from '../../vuex/getters'
import {
    getBreedDetail,
    createSample,
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList,
    getUnitList
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
            countryParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            breedParam: {
                show: false,
                breedName: '',
                breedId: '',
                loading: false,
                id: ''
            },
            breedInfo: {
                status: 0, //自定义状态，表示编辑框的状态，0表示收起(起始)状态，1表示add，2表示update，add或update结束后将status置为0
                breedId: '',
                breedName: '',
                title: '',
                quality: '',
                location: '',
                spec: '',
                number: '',
                cunit: '',
                unit: '',
                description: '',
                id: ''
            },
            addParam: {
                show: false,
                length: 0
            },
            updateParam: {
                show: false,
                index: 0
            },
            empNameParam: {
                show: false,
                customer: '',
                customerName: '',
                customerPhone: ''
            },
            country: {
                cname: '',
                id: '',
            },
            province: {
                cname: '',
                id: '',
            },
            city: {
                cname: '',
                id: '',
            },
            district: {
                cname: '',
                id: '',
            }
        }
    },
    components: {
        pagination,
        searchbreedModel,
        vSelect,
        inputSelect,
        searchcustomerModel
    },
    vuex: {
        getters: {
            initCustomerlist,
            initBreedDetail,
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist,
            initUnitlist
        },
        actions: {
            getBreedDetail,
            createSample,
            getCountryList,
            getProvinceList,
            getCityList,
            getDistrictList,
            getUnitList
        }
    },
    methods: {
        selectProvince: function() {
            console.log('selectProvince');
            this.province = '';
            this.city = '';
            this.district = '';
            if (this.country != '' && this.country != null) {
                this.getProvinceList(this.country);
            }
        },

        selectCity: function() {
            this.city = '';
            this.district = '';
            if (this.province != '' && this.province != null) {
                this.getCityList(this.province);
            }

        },
        selectDistrict: function() {
            this.district = '';
            if (this.city != '' && this.city != null) {
                this.getDistrictList(this.city);
            }

        },
        serviceselected: function(sub, id, name, tel, email) {
            this.$store.state.table.basicBaseList.customerList[sub].checked = !this.$store.state.table.basicBaseList.customerList[sub].checked;
            for (var key in this.initCustomerlist) {
                if (key != sub) {
                    if (this.$store.state.table.basicBaseList.customerList[key].checked == true) {
                        this.$store.state.table.basicBaseList.customerList[key].checked = false;
                    }
                }
            }
            this.param.customerId = id;
            this.param.customerName = name;
            this.param.customerPhone = tel;
            this.param.email = email;
            this.param.show = false;
            this.$dispatch('customer', this.param);
        },
        employNameSearch: function() {
            this.getClientList(this.loadParam);
        },
        searchCustomer: function(customerName, customer, customerPhone) {
            this.empNameParam.show = true;
        },
        reset: function() {
            this.loadParam.name = '';
            this.loadParam.phone = '';
        },
        searchBreed: function(breedName, breedId) {
            this.breedParam.show = true;
            /*this.param.breedName = this.breedParam.breedName;
            this.param.breedId = this.breedParam.breedId;*/
        },
        showModifyBreed: function(index) {
            this.breedInfo.status = 2;
            this.updateParam.index = index;
            this.breedInfo.breedId = this.param.items[index].breedId,
                this.breedInfo.breedName = this.param.items[index].breedName,
                this.breedInfo.quality = this.param.items[index].quality,
                this.breedInfo.location = this.param.items[index].location,
                this.breedInfo.spec = this.param.items[index].spec,
                this.breedInfo.number = this.param.items[index].number,
                this.breedInfo.cunit = this.param.items[index].cunit,
                this.breedInfo.unit = this.param.items[index].unit,
                this.breedInfo.description = this.param.items[index].description,
                this.updateParam.show = true;
        },
        deleteBreed: function(index) {
            this.param.items.splice(index, 1);
        },
        cancelAddBreed: function() {
            this.param.items.pop();
            this.breedInfo.status = 0;
            this.addParam.show = false;
        },
        cancelModifyBreed: function() {
            this.breedInfo.status = 0;
            this.updateParam.show = false;
        },
        modifyBreed: function() {
            this.param.items[this.updateParam.index].breedId = this.breedInfo.breedId,
                this.param.items[this.updateParam.index].breedName = this.breedInfo.breedName,
                this.param.items[this.updateParam.index].quality = this.breedInfo.quality,
                this.param.items[this.updateParam.index].location = this.breedInfo.location,
                this.param.items[this.updateParam.index].spec = this.breedInfo.spec,
                this.param.items[this.updateParam.index].number = this.breedInfo.number,
                this.param.items[this.updateParam.index].cunit = this.breedInfo.cunit.split(',')[1],
                this.param.items[this.updateParam.index].unit = this.breedInfo.cunit.split(',')[0],
                /*this.param.items[this.updateParam.index].sourceType=this.breedInfo.sourceType,*/
                this.param.items[this.updateParam.index].status = this.breedInfo.status,
                this.param.items[this.updateParam.index].description = this.breedInfo.description,
                /*this.param.items[this.updateParam.index].orderId=this.breedInfo.id,*/
                this.breedInfo.status = 0;
            this.updateParam.show = false;
        },
        addBreed: function() {
            this.param.items[this.param.items.length - 1].breedId = this.breedInfo.breedId;
            this.param.items[this.param.items.length - 1].breedName = this.breedInfo.breedName;
            this.param.items[this.param.items.length - 1].quality = this.breedInfo.quality;
            this.param.items[this.param.items.length - 1].location = this.breedInfo.location;
            this.param.items[this.param.items.length - 1].spec = this.breedInfo.spec;
            this.param.items[this.param.items.length - 1].description = this.breedInfo.description;
            this.param.items[this.param.items.length - 1].number = this.breedInfo.number;
            this.param.items[this.param.items.length - 1].cunit = this.breedInfo.cunit.split(',')[1];
            this.param.items[this.param.items.length - 1].unit = this.breedInfo.cunit.split(',')[0];
            /*this.param.items[this.param.items.length-1].sourceType = this.breedInfo.sourceType;*/
            console.log(this.param.items[this.param.items.length - 1]);
            this.breedInfo.status = 0;
            this.addParam.show = false;
        },
        showAddBreed: function() {
            if (this.param.items.length == 0 || this.param.items[this.param.items.length - 1].breedId != '') {
                this.breedInfo.status = 1;
                this.breedInfo.breedId = '';
                this.breedInfo.breedName = '';
                this.breedInfo.quality = '';
                this.breedInfo.location = '';
                this.breedInfo.spec = '';
                this.breedInfo.number = '';
                this.breedInfo.description = '';
                this.breedInfo.cunit = '';
                this.breedInfo.unit = '';
                this.param.items.push({
                    breedId: '',
                    breedName: '',
                    quality: '',
                    location: '',
                    spec: '',
                    number: '',
                    cunit: '',
                    description: '',
                    unit: ''
                });
                this.addParam.show = true;
            }

        },
        confirm: function(param) {
            this.param.country = this.country.cname;
            this.param.province = this.province.cname;
            this.param.city = this.city.cname;
            this.param.district = this.district.cname;
            this.param.send = false;
            console.log(this.param);
            this.param.callback = this.param.callback;
            this.createSample(this.param);
        }
    },
    events: {
        breed: function(breed) {
            console.log(breed)
            this.breedInfo.breedName = breed.breedName;
            this.breedInfo.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
            console.log(this.breedParam.id)
        },
        customer: function(customer) {
            this.param.customerName = customer.customerName;
            this.param.customer = customer.customerId;
            this.param.customerPhone = customer.customerPhone;
        }
    },
    created() {
        if ("employeeId" in this.param) {
            this.loadParam.employeeId = this.param.employeeId;
        }
        this.getCountryList(this.countryParam);
        this.getProvinceList(this.countryParam);
        this.getUnitList();
        if (this.param.breedId) {
            this.breedParam.breedName = this.param.brredName;
            this.breedParam.id = this.param.breedId;
            this.getBreedDetail(this.breedParam);
            console.log(this.breedParam)
        }
        if (this.param.country) {
            this.countryParam.country = this.param.country;
            this.countryParam.province = this.param.province;
            this.countryParam.city = this.param.city;
            this.countryParam.district = this.param.district;
            this.country.cname = this.param.country;
            this.province.cname = this.param.province;
            this.city.cname = this.param.city;
            this.district.cname = this.param.district;
        }
        console.log(this.param)
    }
}
</script>
<style scoped>
.modal {
    z-index: 1085;
}

.modal_con {
    z-index: 1085;
    top: 60;
}

.top-title {
    position: fixed;
    margin: auto;
    right: 0;
    left: 0;
    width: 800px;
}

.change_trans {
    margin-top: 20px;
}

.con_trans {
    margin-top: 40px;
}

.transfer {
    margin-right: 7px;
}

.tans_tab {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #fa6705;
    text-align: left;
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

.tans_tab > .tabs {
    width: 100px;
    display: inline-block;
    font-size: 16px;
    text-align: center;
    background-color: #f5f5f5;
    color: #333;
    float: left;
    height: 40px;
    border-bottom: 1px solid #fa6705;
    cursor: pointer;
}

.tans_tab .tabs_active {
    background-color: #fff;
    color: #fa6705;
    border: 1px solid #fa6705;
    border-bottom: 0;
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

.trans_service {
    margin-top: 20px;
}

.trans_service .col-xs-8 {
    margin-bottom: 20px;
}

.table {
    display: table;
}

.table_head>thead>tr {
    background-color: #f5f5f5;
    color: #333;
    font-size: 18px;
}

.base_pagination {
    margin-top: 0;
}

.editlabel {
    text-align: left;
}
</style>

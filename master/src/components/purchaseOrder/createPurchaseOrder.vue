<template>
    <!-- 创建订单 -->
    <div>
        <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
        <searchcustomer-model :param="customerParam" v-if="customerParam.show"></searchcustomer-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>新建采购单</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <section class="editsection">
                        <div style="margin-top:20px;">
                            <img src="/static/images/breedInfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">基本信息</h5>
                        </div>
                        <div class="clearfix">
                            <!-- 采购单类型 -->
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">采购单类型：<span class="system_danger" v-if="$validation.type.required">{{$t('static.required')}}</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.type" v-validate:type="['required']" v-show="false" />
                                <select class="form-control" v-model="param.type">
                                    <option value="0">药厂采购单</option>
                                    <option value="1">药商采购单</option>
                                </select>
                            </div>
                            <!-- 客户选择 -->
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">客户名称： <span class="system_danger" v-if="$validation.custname.required">{{$t('static.required')}}</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.customerName" value="{{param.customerName}}" v-validate:custname="['required']" readonly="true" @click="searchCustomer()" />
                            </div>
                            <!-- 客户电话 -->
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">客户电话： <span class="system_danger" v-if="$validation.phone.required">{{$t('static.required')}}</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.customerPhone" value="{{param.customerPhone}}" v-validate:phone="['required']" />
                            </div>
                            <!-- 省 -->
                            <!-- <div class="editpage-input col-md-4">
                                <label class="editlabel">省</label>
                                <div type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省/Province" label="cname">
                                    </v-select>
                                </div>
                            </div> -->
                            <!-- 市 -->
                            <!-- <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.city')}}</label>
                                <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_province_first')}}" />
                                <div v-if="province.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="city" :on-change="selectDistrict" :options="initCitylist" placeholder="市/City" label="cname">
                                    </v-select>
                                </div>
                            </div> -->
                            <!-- 区 -->
                            <!-- <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.area')}}</label>
                                <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_city_first')}}" />
                                <div v-if="city.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="district" :options="initDistrictlist" placeholder="区" label="cname">
                                    </v-select>
                                </div>
                            </div> -->
                            <div class="editpage-input col-md-8">
                                <label class="editlabel">详细地址 <span class="system_danger" v-if="$validation.address.required">必填项</span></label>
                                <input type="text" class="form-control edit-input" style="width:95%" v-model="param.address" v-validate:address="{required:true}"/>
                            </div>
                            <div class="editpage-input col-md-8">
                                <label class="editlabel">付款方式 <span class="system_danger" v-if="$validation.paymentWay.required">必填项</span></label>
                                <input type="text" v-model="param.paymentWay" v-validate:paymentWay='{required:true}' v-show="false"/>
                                <pay-type :width="'95%'" :param="param"></pay-type>
                            </div>
                            
                            <div class="editpage-input col-md-8">
                                <label class="editlabel">采购备注 </label>
                                <textarea type="text" class="form-control edit-input" style="width:95%;height:80px" v-model="param.comment"></textarea>
                            </div>
                        </div>
                    </section>
                    <div>
                        <div style="margin-top:40px;">
                            <img src="/static/images/breedInfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">意向信息</h5>
                        </div>
                        <table class="table table-hover table_color table-striped ">
                            <thead>
                                <tr>
                                    <th>品种</th>
                                    <th>数量</th>
                                    <th>单价</th>
                                    <th>单位</th>
                                    <th>产地</th>
                                    <th>规格</th>
                                    <th>质量</th>
                                    <th>竞争性指标</th>
                                    <th>操作</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in param.intentionList">
                                    <td>{{item.breedName}}</td>
                                    <td>{{item.number}}</td>
                                    <td>{{item.price}}</td>
                                    <td>{{item.unit | Unit}}</td>
                                    <td>{{item.location | province}}</td>
                                    <td>{{item.spec}}</td>
                                    <td>{{item.quality}}</td>
                                    <td>{{item.mainStandard}}</td>
                                    <td v-if="intentionInfo.status==0" @click="showModifyIntention($index)"><a>{{$t('static.edit')}}</a></td>
                                    <td v-else>{{$t('static.edit')}}</td>
                                    <td v-if="intentionInfo.status==0" @click="deleteIntention($index)"><a>{{$t('static.del')}}</a></td>
                                    <td v-else>{{$t('static.del')}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- 添加意向按钮 -->
                        <div style="padding-left:25%">
                            <div v-if="intentionInfo.status==0" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showAddIntention()">{{$t('static.add_material_information')}}</div>
                        </div>
                        <!-- 添加意向或更新意向表单 -->
                        <validator name="inner">
                            <div v-if="addParam.show||updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                                <div class="col-md-12 clearfix">
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">品种<span class="system_danger" v-if="$inner.breedname.required">{{$t('static.required')}}</span></label>
                                        <input type="text" v-model="intentionInfo.breedName" class="form-control edit-input" v-validate:breedname="{required:true}" @click="searchBreed()" readonly="true" />
                                    </div>
                                    <!-- 数量和单位 -->
                                    <div class="editpage-input col-md-6">
                                        <div style="clear:both;height:36px;">
                                            <div class="left" style="width:45%;">
                                                <label class="editlabel">{{$t('static.quantity')}}<span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span></label>
                                                <input type="number" v-model="intentionInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                                            </div>
                                            <div class="left" style="width:45%;">
                                                <label class="editlabel">{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                                <input type="text" v-show="false" v-model="intentionInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}" disabled="disabled" />
                                                <select class="form-control edit-input" v-model="intentionInfo.unit">
                                                    <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}({{item.ename}})</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 中标价格 -->
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">中标价格
                                            <span class="system_danger" v-if="$inner.price.min">价格不能小于0</span>
                                        </label>
                                        <input type="number" v-model="intentionInfo.price" class="form-control edit-input" v-validate:price="{
                                            min:0
                                            }" />
                                    </div>
                                    <!-- 规格 -->
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.specification')}}
                                            <span class="system_danger" v-if="$inner.breed.required">必填项</span>
                                        </label>
                                        <input type="text" v-show="!breedParam.id" v-model="intentionInfo.spec" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" v-validate:breed="{required:true}"/>
                                        <div type="text" class="edit-input" v-if="breedParam.id">
                                            <input-select :value.sync="intentionInfo.spec" :prevalue="intentionInfo.spec" :options="initBreedDetail.specs.arr" placeholder="规格/Specification" label="name">
                                            </input-select>
                                        </div>
                                    </div>

                                    <!-- 产地 -->
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.origin')}}</label>
                                        <input type="text" v-show="!breedParam.id" v-model="intentionInfo.location" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />
                                        <!-- <div type="text" class="edit-input" v-if="breedParam.id">
                                            <input-select :prevalue="intentionInfo.location" :value.sync="intentionInfo.location" :options="initBreedDetail.locals.arr" placeholder="产地/Origin" label="name">
                                            </input-select>
                                        </div> -->
                                        <div v-if="breedParam.id">
                                            <breed-location :param="intentionInfo" :show="breedParam" :widparam="'270'"></breed-location>
                                        </div>
                                    </div>
                                    <!-- 质量要求 -->
                                    <div class="editpage-input col-md-6" style="padding-right:110px">
                                        <label class="editlabel">质量要求
                                            <span class="system_danger" v-if="$inner.quality.required">必填项</span>
                                        </label>
                                        <input type="text" v-model="intentionInfo.quality" class="form-control edit-input" v-validate:quality="{required:true}" v-show="false"/>
                                        <quality-required :param="intentionInfo"></quality-required>
                                    </div>
                                    
                                    <!-- 竞争性指标 -->
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">竞争性指标</label>
                                        <input type="text" v-model="intentionInfo.mainStandard" class="form-control edit-input" />
                                    </div>
                                    <div class="col-md-12" style="margin-top:10px;text-align:right">
                                        <button type="button" class="btn btn-confirm" v-if="intentionInfo.status==1" @click="cancelAddIntention()">{{$t('static.cancel')}}
                                        </button>
                                        <button type="button" class="btn btn-confirm" v-if="intentionInfo.status==2" @click="cancelModifyIntention()">{{$t('static.cancel')}}</button>
                                        <button type="button" class="btn btn-confirm" v-show='false' @click="addBreed()">{{$t('static.save')}}</button>
                                        <button type="button" class="btn btn-confirm" v-if="$inner.valid">
                                            <div v-if="intentionInfo.status==1" @click="addIntention()">{{$t('static.save')}}</div>
                                            <div v-if="intentionInfo.status==2" @click="modifyIntention()">{{$t('static.save')}}</div>
                                        </button>
                                        <button type="button" class="btn btn-confirm" v-else disabled="disabled">{{$t('static.save')}}</button>
                                    </div>
                                </div>
                            </div>
                        </validator>
                    </div>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&intentionInfo.status==0&&param.intentionList.length>0&&param.intentionList[param.intentionList.length-1].breedId!=''" @click="confirm()">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import pressImage from '../imagePress'
import qualityRequired from '../user/plugins/qualityRequired'
import searchcustomerModel from '../Intention/clientname'
import inputSelect from '../tools/vueSelect/components/inputselect'
import searchbreedModel from '../Intention/breedsearch'
import consigneeModel from '../clientRelate/addressSearch'
import searchemgModel from '../order/second_order/allEmployee'
import supplierDialog from '../order/second_order/selectAllSupplier.vue'
import breedLocation from '../order/second_order/breedLocation'
import payType from '../user/plugins/payType'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initBreedDetail,
    initCurrencylist,
    initUnitlist,
    initEmployeeList,
    initLogin
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getBreedDetail,
    getDistrictList,
    getUnitList,
    getCurrencyList,
    getEmployeeList,
    createPurchaseOrder
} from '../../vuex/actions'
export default {
    components: {
        searchcustomerModel,
        searchbreedModel,
        breedLocation,
        vSelect,
        inputSelect,
        pressImage,
        qualityRequired,
        payType
    },
    props: ['param'],
    data() {
        return {
            countryParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                id: 7
            },
            country: {
                id: '',
                cname: '',
                cnameEn: ''
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
            customerParam: {
                show: false
            },
            breedParam: {
                show: false,
                breedName: '',
                breedId: '',
                loading: false,
                id: ''
            },
            intentionInfo: {
                status: 0, //自定义状态，表示编辑框的状态，0表示收起(起始)状态，1表示add，2表示update，add或update结束后将status置为0
                breedId: '',
                breedName: '',
                location: '',
                spec: '',
                number: '',
                unit: '',
                price: '',
                quality: '', //质量要求
                mainStandard: '', //竞争性指标
            },
            addParam: {
                show: false,
                length: 0
            },
            updateParam: {
                show: false,
                index: 0,
            },

        }
    },
    vuex: {
        getters: {
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist,
            initBreedDetail,
            initCurrencylist,
            initUnitlist,
            initEmployeeList,
            initLogin
        },
        actions: {
            getCountryList,
            getProvinceList,
            getCityList,
            getBreedDetail,
            getDistrictList,
            getUnitList,
            getEmployeeList,
            getCurrencyList,
            createPurchaseOrder
        }
    },
    methods: {
        searchCustomer: function() {
            this.customerParam.show = true;
        },
        searchBreed: function() {
            this.breedParam.show = true;
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
        //展示新增意向页面
        showAddIntention: function() {
            if (this.param.intentionList.length == 0 || this.param.intentionList[this.param.intentionList.length - 1].breedId != '') {
                this.intentionInfo.status = 1;
                this.intentionInfo.breedId = '';
                this.intentionInfo.breedName = '';
                this.intentionInfo.location = '';
                this.intentionInfo.spec = '';
                this.intentionInfo.number = '';
                this.intentionInfo.unit = '';
                this.intentionInfo.price = '';
                this.intentionInfo.quality = ''; //质量要求
                this.intentionInfo.mainStandard = ''; //竞争性指标

                this.param.intentionList.push({
                    breedId: '',
                    breedName: '',
                    location: '',
                    spec: '',
                    number: '',
                    unit: '',
                    price: '',
                    quality: '',
                    mainStandard: ''
                });
                //新增时将breedParam清空
                this.breedParam.id = "";
                this.breedParam.breedName = "";
                this.addParam.show = true;
            }

        },
        //确认新增的意向
        addIntention: function() {
            //价格只能输入之多两位小数
            if ((/\.\d{3,}/).test(this.intentionInfo.price)) {
                this.intentionInfo.price = this.intentionInfo.price.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            if ((/\.\d{3,}/).test(this.intentionInfo.costPrice)) {
                this.intentionInfo.costPrice = this.intentionInfo.costPrice.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            this.param.intentionList[this.param.intentionList.length - 1].breedId = this.intentionInfo.breedId;
            this.param.intentionList[this.param.intentionList.length - 1].breedName = this.intentionInfo.breedName;
            this.param.intentionList[this.param.intentionList.length - 1].location = this.intentionInfo.location;
            this.param.intentionList[this.param.intentionList.length - 1].spec = this.intentionInfo.spec;
            this.param.intentionList[this.param.intentionList.length - 1].number = this.intentionInfo.number;
            this.param.intentionList[this.param.intentionList.length - 1].unit = this.intentionInfo.unit;
            this.param.intentionList[this.param.intentionList.length - 1].price = this.intentionInfo.price;
            this.param.intentionList[this.param.intentionList.length - 1].quality = this.intentionInfo.quality;
            this.param.intentionList[this.param.intentionList.length - 1].mainStandard = this.intentionInfo.mainStandard;
            this.intentionInfo.status = 0;
            this.addParam.show = false;

        },
        //取消新增意向
        cancelAddIntention: function() {
            this.param.intentionList.pop();
            this.intentionInfo.status = 0;
            this.addParam.show = false;
        },
        //展示编辑意向的页面
        showModifyIntention: function(index) {
            this.intentionInfo.status = 2;
            this.updateParam.index = index;
            this.intentionInfo.breedId = this.param.intentionList[index].breedId;
            this.intentionInfo.breedName = this.param.intentionList[index].breedName;
            this.intentionInfo.location = this.param.intentionList[index].location;
            this.intentionInfo.spec = this.param.intentionList[index].spec;
            this.intentionInfo.number = this.param.intentionList[index].number;
            this.intentionInfo.unit = this.param.intentionList[index].unit;
            this.intentionInfo.price = this.param.intentionList[index].price;
            this.intentionInfo.quality = this.param.intentionList[index].quality;
            this.intentionInfo.mainStandard = this.param.intentionList[index].mainStandard;
            //编辑时需要再查一次产地
            this.breedParam.id = this.param.intentionList[index].breedId;
            this.breedParam.breedName = this.param.intentionList[index].breedName;
            this.getBreedDetail(this.breedParam);
            this.updateParam.show = true;

        },
        //确认修改的意向
        modifyIntention: function() {
            //价格只能输入之多两位小数
            if ((/\.\d{3,}/).test(this.intentionInfo.price)) {
                this.intentionInfo.price = this.intentionInfo.price.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            if ((/\.\d{3,}/).test(this.intentionInfo.costPrice)) {
                this.intentionInfo.costPrice = this.intentionInfo.costPrice.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            this.param.intentionList[this.updateParam.index].breedId = this.intentionInfo.breedId;
            this.param.intentionList[this.updateParam.index].breedName = this.intentionInfo.breedName;
            this.param.intentionList[this.updateParam.index].location = this.intentionInfo.location;
            this.param.intentionList[this.updateParam.index].spec = this.intentionInfo.spec;
            this.param.intentionList[this.updateParam.index].number = this.intentionInfo.number;
            this.param.intentionList[this.updateParam.index].unit = this.intentionInfo.unit;
            this.param.intentionList[this.updateParam.index].price = this.intentionInfo.price;
            this.param.intentionList[this.updateParam.index].quality = this.intentionInfo.quality;
            this.param.intentionList[this.updateParam.index].mainStandard = this.intentionInfo.mainStandard;

            this.intentionInfo.status = 0;
            this.updateParam.show = false;

        },
        //取消修改的意向
        cancelModifyIntention: function() {
            this.intentionInfo.status = 0;
            this.updateParam.show = false;
        },
        //删除意向
        deleteIntention: function(index) {
            this.param.intentionList.splice(index, 1);
        },
        //确认提交
        confirm: function() {
            this.param.province = this.province.id;
            this.param.city = this.city.id;
            this.param.district = this.district.id;
            this.param.show = false;
            this.createPurchaseOrder(this.param);
        },

    },
    watch: {

    },
    events: {
        breed: function(breed) {
            if (this.param.intl == 1 && breed.eName) {
                this.intentionInfo.breedName = breed.eName;
                this.intentionInfo.breedId = breed.breedId;
                this.breedParam.breedName = breed.eName;
                this.breedParam.id = breed.breedId;
            } else {
                this.intentionInfo.breedName = breed.breedName;
                this.intentionInfo.breedId = breed.breedId;
                this.breedParam.breedName = breed.breedName;
                this.breedParam.id = breed.breedId;
            }
            this.getBreedDetail(this.breedParam);
        },
        customer: function(customer) {
            this.param.customerId = customer.customerId;
            this.param.customerName = customer.customerName;
            this.param.customerPhone = customer.customerPhone;
        },

    },
    created() {
        //获取中国的省
        this.getProvinceList(this.countryParam);
        //获取单位列表
        this.getUnitList();

    }
}
</script>
<style scoped>
.modal {
    z-index: 1083
}

.modal_con {
    z-index: 1083;
    width: 950px;
}

.top-title {
    position: fixed;
    width: 950px;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 70px 30px;
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
.system_danger{
    display: inline-block;
    height: 10px!important
}
.editpage-input {
    margin-top: 15px;
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

.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 0px;
    width: 950px;
}

.edit_footer button {
    margin-left: 15px;
}

.table {
    display: table;
}
</style>

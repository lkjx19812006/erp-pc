<template>
    <div>
        <searchemg-model :param="employeeParam" v-if="employeeParam.show"></searchemg-model>
        <supplier-dialog :param="supplierParam" v-if="supplierParam.show"></supplier-dialog>
        <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>新建订单</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <section class="editsection">
                        <h5 style="border-bottom:1px solid #ddd;color:#fa6705;margin-bottom: 0;padding-bottom:10px">商品信息</h5>
                        <table class="table table-hover table_color table-striped ">
                            <thead>
                                <tr>
                                    <th>商品标题</th>
                                    <th>品种名称</th>
                                    <th>数量</th>
                                    <th>单位</th>
                                    <th>价格</th>
                                    <th>成本价</th>
                                    <th>质量</th>
                                    <th>产地</th>
                                    <th>规格</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{param.goods[0].title}}</td>
                                    <td>{{param.goods[0].breedName}}</td>
                                    <td>{{param.goods[0].number}}</td>
                                    <td>{{param.goods[0].unit | Unit}}</td>
                                    <td>{{param.goods[0].price}}</td>
                                    <td>{{param.goods[0].costPrice}}</td>
                                    <td>{{param.goods[0].quality}}</td>
                                    <td>{{param.goods[0].location}}</td>
                                    <td>{{param.goods[0].spec}}</td>
                                    <td v-if="breedInfo.status==0||breedInfo.status==2" @click="showModifyBreed()">
                                        <a>{{$t('static.edit')}}</a>
                                    </td>
                                    <td v-else>{{$t('static.edit')}}</td>
                                    <!-- <td v-if="breedInfo.status==0" @click="deleteBreed($index)"><a>{{$t('static.del')}}</a></td>
                                <td v-else>{{$t('static.del')}}</td> -->
                                </tr>
                            </tbody>
                        </table>
                        <validator name="inner">
                            <div v-if="updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                                <div class="clearfix">
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.breed')}}<span class="system_danger" v-if="$inner.breedname.required">{{$t('static.required')}}</span></label>
                                        <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" v-validate:breedname="{required:true}" @click="searchBreed()" readonly="true" />
                                    </div>
                                    <div class="editpage-input col-md-6">
                                        <div style="clear:both;height:36px;">
                                            <div class="left" style="width:45%;">
                                                <label class="editlabel">{{$t('static.quantity')}}<span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span></label>
                                                <input type="number" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                                            </div>
                                            <div class="left" style="width:45%;">
                                                <label class="editlabel">{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                                <select v-model="breedInfo.cunit" class="form-control edit-input" v-validate:unit="{required:true}">
                                                    <option v-for="item in initUnitlist" value="{{item.id+','+item.name}}">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                        <select v-model="breedInfo.cunit" class="form-control edit-input" v-validate:unit="{required:true}">
                                            <option v-for="item in initUnitlist" value="{{item.id+','+item.name}}">{{item.name}}</option>
                                        </select>
                                    </div> -->
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.price')}}<span class="system_danger" v-if="$inner.price.required">{{$t('static.required')}}</span></label>
                                        <div style="clear:both;height:36px;">
                                            <div class="left" style="width:45%;">
                                                <input type="number" v-model="breedInfo.price" class="form-control edit-input" v-validate:price="{required:true}" />
                                            </div>
                                            <div class="left" style="width:45%;">
                                                <select class="form-control edit-input" v-model="breedInfo.cunit" disabled="true">
                                                    <option v-for="item in initUnitlist" value="{{item.id+','+item.name}}">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">成本价<span class="system_danger" v-if="$inner.cost.required">{{$t('static.required')}}</span></label>
                                        <div style="clear:both;height:36px;">
                                            <div class="left" style="width:45%;">
                                                <input type="number" v-model="breedInfo.costPrice" class="form-control edit-input" v-validate:cost="{required:true}" />
                                            </div>
                                            <div class="left" style="width:45%;">
                                                <select class="form-control edit-input" v-model="breedInfo.cunit" disabled="true">
                                                    <option v-for="item in initUnitlist" value="{{item.id+','+item.name}}">{{item.name}}({{item.ename}})</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.quality')}}</label>
                                        <input type="text" v-model="breedInfo.quality" class="form-control edit-input" />
                                    </div>
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.specification')}}</label>
                                        <input type="text" v-model="breedInfo.spec" class="form-control edit-input" />
                                    </div>
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.origin')}}</label>
                                        <input type="text" v-model="breedInfo.location" class="form-control edit-input" />
                                    </div>
                                    <div class="pull-right col-md-6" style="margin-top:10px;text-align:right">
                                        <button type="button" class="btn btn-confirm">
                                            <div v-if="breedInfo.status==2" @click="cancelModifyBreed()">{{$t('static.cancel')}}</div>
                                        </button>
                                        <button type="button" class="btn btn-confirm" v-if="$inner.valid">
                                            <div v-if="breedInfo.status==2" @click="modifyBreed()">{{$t('static.save')}}</div>
                                        </button>
                                        <button type="button" class="btn btn-confirm" v-else disabled="disabled">{{$t('static.save')}}</button>
                                    </div>
                                </div>
                            </div>
                        </validator>
                        <h5 style="border-bottom:1px solid #ddd;color:#fa6705;margin-bottom: 0;padding-bottom:10px">订单信息</h5>
                        <div class="clear">
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.transcation')}}</label>
                                <mz-datepicker :time.sync="param.tradeTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.order_type')}} <span class="system_danger" v-if="$validation.type.required">{{$t('static.select_order_type')}}</span></label>
                                <input v-show="false" type="text" class="form-control" v-model="param.type" v-validate:type="['required']" readonly="readonly" />
                                <select class="form-control edit-input" v-model="param.type" @click="exChange()">
                                    <option value="0">{{$t('static.purchase')}}</option>
                                    <option value="1">{{$t('static.sell')}}</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-6" v-if="param.type==1">
                                <label class="editlabel">选择发货人 <span class="system_danger" v-if="$validation.shipper.required">{{$t('static.required')}}</span></label>
                                <input type="text" class="form-control edit-input" readonly="true" v-model="employeeParam.consignerName" v-validate:shipper="{required:true}" @click="selectEmployee(param.consigner,employeeParam.consignerName)" />
                            </div>
                            <!-- 客户选择 -->
                            <div class="editpage-input col-md-6" v-if="param.type==1">
                                <label class="editlabel">{{$t('static.client_name')}} <span class="system_danger" v-if="$validation.custname.required">{{$t('static.required')}}</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.customerName" v-validate:custname="['required']" readonly="true" @click="searchCustomer(param.customerName,param.customer)" />
                            </div>
                            <!-- 供应商选择 -->
                            <div class="editpage-input col-md-6" v-if="param.type==0">
                                <label class="editlabel">{{$t('static.supplier_name')}} <span class="system_danger" v-if="$validation.supplier.required">{{$t('static.required')}}</span></label>
                                <input type="text" class="form-control edit-input" v-model="supplierParam.supplierName" v-validate:supplier="{required:true}" readonly="true" @click="selectSupplier()" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.sundry_fees')}}：</label>
                                <div class="clearfix">
                                    <button class="btn btn-default left" style="font-size: 16px" @click="addIncidentals()">+</button>
                                    <input type="number" class="edit-input" v-model="param.incidentals" style="width:60%;display:inline-block;float:left;border:none;text-align: center;" value="{{param.incidentals}}" @keyup="" />
                                    <button class="btn btn-default left" style="font-size: 16px" @click="subduction()">-</button>
                                </div>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.preferential')}}：</label>
                                <div class="clearfix">
                                    <button class="btn btn-default left" style="font-size: 16px" @click="addCompute()">+</button>
                                    <input type="number" class="edit-input" v-model="param.preferential" style="width:60%;display:inline-block;float:left;border:none;text-align: center;" value="{{param.preferential}}" />
                                    <button class="btn btn-default left" style="font-size: 16px" @click="reduce()">-</button>
                                </div>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">杂费说明</label>
                                <input type="text" class="form-control edit-input" v-model="param.incidentalsDesc" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">优惠说明</label>
                                <input type="text" class="form-control edit-input" v-model="param.preferentialDesc" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">收货人姓名 <span class="system_danger" v-if="$validation.customer.required">必填项</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.consignee" v-validate:customer="['required']" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">收货人电话 <span class="system_danger" v-if="$validation.mobile.phone">必填项</span></label>
                                <input type="tel" class="form-control edit-input" v-model="param.consigneePhone" v-validate:mobile="['phone']" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">收货人地址 <span class="system_danger" v-if="$validation.addr.required">必填项</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.consigneeAddr" v-validate:addr="['required']" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">国家</label>
                                <div type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="country" :on-change="selectProvince" :options="initCountrylist" placeholder="国家" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">省</label>
                                <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
                                <div v-if="country.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">市</label>
                                <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个省" />
                                <div v-if="province.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="city" :on-change="selectDistrict" :options="initCitylist" placeholder="市" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">区</label>
                                <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个市" />
                                <div v-if="city.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="district" :options="initDistrictlist" placeholder="区" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">总价</label>
                                <input type="text" class="form-control edit-input" v-model="param.total" readonly="true" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">成本总价</label>
                                <input type="text" readonly="true" class="form-control edit-input" v-model="param.cost" />
                            </div>
                            <div class="editpage-input col-md-12">
                                <label class="editlabel">备注</label>
                                <textarea v-model='param.comments' class="form-control" style="width:95%;overflow:auto;word-break:break-all" rows="5"></textarea>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm(param.show=false)">保存</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="disabled">保存</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import inputSelect from '../tools/vueSelect/components/inputselect'
import pressImage from '../../components/imagePress'
import searchemgModel from '../order/second_order/allEmployee'
import searchcustomerModel from '../Intention/clientname'
import supplierDialog from '../order/second_order/selectAllSupplier'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initUnitlist
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList,
    createOrder,
    getUnitList
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        searchemgModel,
        inputSelect,
        searchcustomerModel,
        supplierDialog
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
                all: 7
            },
            breedInfo: {
                status: 0, //自定义状态，表示编辑框的状态，0表示收起(起始)状态，2表示update，update结束后将status置为0
                breedId: '',
                breedName: '',
                title: '',
                quality: '',
                location: '',
                spec: '',
                number: '',
                cunit: '',
                unit: '',
                costPrice: '',
                price: '',
                id: ''
            },
            empNameParam: {
                show: false,
                customer: '',
                customerName: '',
                customerPhone: ''
            },
            updateParam: {
                show: false,
                index: 0
            },
            country: {
                cname: '',
            },
            province: {
                cname: ''
            },
            city: {
                cname: ''
            },
            district: {
                cname: ''
            },
            employeeParam: {
                show: false,
                consigner: '',
                consignerName: ''
            },
            supplierParam: {
                show: false,
                customer: '',
                customerName: '',
                consignee: '',
                consigneePhone: '',
                supplierName: '',
                employee: this.param.employee,
                link: '/customer/suppliers'
            },
            saith: 0, //点击按钮计算
            sum: 0, //点击按钮计算
        }
    },
    vuex: {
        getters: {
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist,
            initUnitlist
        },
        actions: {
            getCountryList,
            getProvinceList,
            getCityList,
            getDistrictList,
            createOrder,
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
        addCompute: function() { //优惠增加
            var saith = 0;
            if (this.param.preferential && this.param.preferential != '') {
                saith = parseFloat(this.param.preferential);
                saith += 1;
                this.param.preferential = saith;
            } else {
                this.param.preferential = 0;
                saith = parseFloat(this.param.preferential);
                saith += 1;
                this.param.preferential = saith;
            }
        },
        reduce: function() { //优惠减少
            var saith = 0;
            if (this.param.preferential && this.param.preferential != '' && this.param.preferential > 0) {
                saith = parseFloat(this.param.preferential);
                saith = (saith * 1000 - 1000) / 1000;
                this.param.preferential = saith;
            } else {
                this.param.preferential = 0;
            }

        },
        addIncidentals: function() { //杂费增加
            var saith = 0;
            if (this.param.incidentals && this.param.incidentals != '') {
                saith = parseFloat(this.param.incidentals);
                saith += 1;
                this.param.incidentals = saith;
            } else {
                this.param.incidentals = 0;
                saith = parseFloat(this.param.incidentals);
                saith += 1;
                this.param.incidentals = saith;
            }
        },
        subduction: function() { //杂费减少
            var saith = 0;
            if (this.param.incidentals && this.param.incidentals != '' && this.param.incidentals > 0) {
                saith = parseFloat(this.param.incidentals);
                saith = (saith * 1000 - 1000) / 1000;
                this.param.incidentals = saith;
            } else {
                this.param.incidentals = 0;
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
        showModifyBreed: function() {
            this.breedInfo.status = 2;
            this.breedInfo.breedId = this.param.goods[0].breedId,
                this.breedInfo.breedName = this.param.goods[0].breedName,
                this.breedInfo.quality = this.param.goods[0].quality,
                this.breedInfo.location = this.param.goods[0].location,
                this.breedInfo.spec = this.param.goods[0].spec,
                this.breedInfo.number = this.param.goods[0].number,
                this.breedInfo.cunit = this.param.goods[0].cunit,
                this.breedInfo.unit = this.param.goods[0].unit,
                this.breedInfo.cunit = this.param.goods[0].unit,
                this.breedInfo.price = this.param.goods[0].price,
                this.breedInfo.costPrice = this.param.goods[0].costPrice,
                this.breedInfo.title = this.param.goods[0].title,
                this.updateParam.show = true;
        },
        cancelModifyBreed: function() {
            this.breedInfo.status = 0;
            this.updateParam.show = false;
        },
        modifyBreed: function() {
            this.param.goods[0].breedId = this.breedInfo.breedId,
                this.param.goods[0].breedName = this.breedInfo.breedName,
                this.param.goods[0].quality = this.breedInfo.quality,
                this.param.goods[0].location = this.breedInfo.location,
                this.param.goods[0].spec = this.breedInfo.spec,
                this.param.goods[0].number = this.breedInfo.number,
                this.param.goods[0].unit = this.breedInfo.cunit.split(',')[0],
                this.param.goods[0].price = this.breedInfo.price,
                this.param.goods[0].costPrice = this.breedInfo.costPrice,
                this.param.goods[0].title = this.breedInfo.breedName,
                this.breedInfo.status = 0;
            this.updateParam.show = false;
        },
        changeTotal: function() {
            this.param.total = (parseFloat(this.param.goods[0].price * this.param.goods[0].number) * 100 + parseFloat(this.param.incidentals) * 100 - parseFloat(this.param.preferential) * 100) / 100;
            this.param.cost = (parseFloat(this.param.goods[0].costPrice * this.param.goods[0].number) * 100) / 100;
        },
        confirm: function() {
            this.param.country = this.country.cname;
            this.param.province = this.province.cname;
            this.param.city = this.city.cname;
            this.param.district = this.district.cname;
            console.log(this.param);
            this.param.callback = this.param.callback;
            this.createOrder(this.param);
        },
        selectEmployee: function(id, name) {
            this.employeeParam.show = true;
            this.employeeParam.consigner = id;
            this.employeeParam.consignerName = name;
        },
        selectSupplier: function() {
            this.supplierParam.show = true;
        },
        searchCustomer: function(customerName, customer) {
            this.empNameParam.show = true;
        },
        selectEmployee: function(id, name) {
            this.employeeParam.show = true;
            this.employeeParam.consigner = id;
            this.employeeParam.consignerName = name;
        }
    },
    watch: {
        'param.incidentals': 'changeTotal',
        'param.preferential': 'changeTotal',
        'param.goods[0].price': 'changeTotal',
        'param.goods[0].costPrice': 'changeTotal',
        'param.goods[0].number': 'changeTotal',
    },
    events: {
        selectEmpOrOrg: function(employee) {
            console.log(employee)
            this.employeeParam.consigner = employee.employeeId;
            this.employeeParam.consignerName = employee.employeeName;
            this.param.consigner = this.employeeParam.consigner;
        },
        supplier: function(item) {
            console.log(item)
            this.supplierParam.customer = item.customer;
            this.supplierParam.customerName = item.customerName;
            this.supplierParam.supplierName = item.customerName;
            this.supplierParam.consignee = item.consignee;
            this.supplierParam.consigneePhone = item.consigneePhone;
            this.param.customer = this.supplierParam.customer;
            this.param.customerName = this.supplierParam.customerName;
            this.param.consignee = this.supplierParam.consignee;
            this.param.consigneePhone = this.supplierParam.consigneePhone;
        },
        customer: function(customer) {
            this.param.customerName = customer.customerName;
            this.param.customerPhone = customer.customerPhone;
            this.param.consigneePhone = customer.customerPhone;
            this.param.consignee = customer.customerName;
            this.param.customer = customer.customerId;
            this.consigneeParam.customerId = customer.customerId;
        },
    },
    created() {
        this.getCountryList(this.countryParam);
        this.getUnitList();
        console.log(this.param);
        console.log(this.param.total);
        this.param.total = (parseFloat(this.param.goods[0].price * this.param.goods[0].number) * 100 + parseFloat(this.param.incidentals) * 100 - parseFloat(this.param.preferential) * 100) / 100;
        this.param.cost = (parseFloat(this.param.goods[0].costPrice * this.param.goods[0].number) * 100) / 100;
        if (this.param.customerName) {
            this.supplierParam.supplierName = this.param.customerName;
        }
        if (!this.param.tradeTime) {
            var date = new Date();
            date.setDate(date.getDate());
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            this.param.tradeTime = year + "-" + month + "-" + day + " 00:00:00";
        }
    }
}
</script>
<style scoped>
.modal,
.modal_con {
    z-index: 1082;
}

.top-title {
    z-index: 100;
    width: 800px;
    right: 0;
    top: 91px;
    position: fixed;
    margin: auto;
    left: 0;
}

table {
    display: table;
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

.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 0px;
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

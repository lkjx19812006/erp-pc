<template>
    <div>
        <div id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
        <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
        <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
        <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3 v-if="param.flag==0">新增意向</h3>
                <h3 v-if="param.flag==1">修改意向</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <!--<div class="cover_loading">-->
                    <!--<pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>-->
                    <!--</div>-->
                    <div class="cover_loading">
                        <pulse-loader :loading="breedParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>
                    <section class="editsection" v-cloak>
                        <input type="hidden" class="form-control edit-input" value="{{param.id}}" />
                        <div style="margin-top:15px">
                            <dt class="left transfer marg_top">意向类型：</dt>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.param.type===0&&this.param.especial===0&&this.param.preSell==0}" @click="selectType(0,0,0)">
                                    普通求购
                                </button>
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.param.type===0&&this.param.especial===1&&this.param.preSell==0}" @click="selectType(0,1,0)">
                                    紧急求购
                                </button>
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.param.type===1&&this.param.especial===0&&this.param.preSell==0}" @click="selectType(1,0,0)">
                                    普通供应
                                </button>
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.param.type===1&&this.param.especial===1&&this.param.preSell==0}" @click="selectType(1,1,0)">
                                    低价资源
                                </button>
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.param.type===1&&this.param.especial===1&&this.param.preSell==1}" @click="selectType(1,1,1)">
                                    预售资源
                                </button>
                                <!-- 必须选择意向类型 -->
                               <!--  <span class="system_danger" v-if="$validation.breedname.required">请选择意向类型</span> -->
                            </div>
                        </div>
                        <div v-if="param.selectCustomer" style="margin-top:15px">
                            <label class="editlabel">选择客户</label>
                            <input type="text" v-model='param.customerName' class="form-control edit-input" style="width:95%" readonly="readonly" @click="searchCustomer(param.customerName,param.customerId,param.customerPhone)" />
                        </div>
                        <div style="margin-top:15px">
                            <img src="/static/images/breedinfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">药材信息</h5>
                        </div>
                        <div class="editpage-input clearfix" style="width:100%;max-height: 200px;overflow-y: auto">
                            <label class="editlabel">药材图片</label>
                            <press-image :value.sync="param.pics" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:20%"></press-image>
                        </div>
                        <!-- 当为预售资源时，进口资质和检测报告需要上传 -->
                        <!-- <div v-if="param.type==1&&param.especial==1&&param.preSell==1" class="editpage-input clearfix" style="width:100%;max-height: 200px;overflow-y: auto">
                            <label class="editlabel">进口资质</label>
                            <press-image :value.sync="param.image_s" :showurl.sync="param.image_s_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:20%"></press-image>
                        </div>
                        <div v-if="param.type==1&&param.especial==1&&param.preSell==1" class="editpage-input clearfix" style="width:100%;max-height: 200px;overflow-y: auto">
                            <label class="editlabel">检测报告</label>
                            <press-image :value.sync="param.image_t" :showurl.sync="param.image_t_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:20%"></press-image>
                        </div> -->
                        <div class="editpage">
                            <div class="editpageleft">
                                <!-- 品种 -->
                                <div class="editpage-input">
                                    <label class="editlabel">品种名称<span class="system_danger" v-if="$validation.breedname.required">品种不能为空</span></label>
                                    <input type="text" v-model="param.breedName" class="form-control edit-input" v-validate:breedname="{required:true}" value="{{param.breedName}}" @click="searchBreed(param.breedName,param.breedId)" readonly="true" />
                                </div>
                                <!-- 单价 -->
                                <div class="editpage-input" style="width:80%">
                                    <label class="editlabel">单价<span class="system_danger" v-if="$validation.price.money">请输入不超过小数点两位的数字</span></label>
                                    <input type="number" v-model='param.price' v-validate:price="['money']" class="form-control edit-input" value="{{param.price}}" style="display:-webkit-inline-box" /><span v-show="param.unit">元/{{param.unit | Unit}}</span>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">质量要求</label>
                                    <input type="text" v-model="param.quality" class="form-control edit-input" value="{{param.quality}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">包装</label>
                                    <input type="text" v-show="false" v-model="param.pack" />
                                    <div type="text" class="edit-input">
                                        <input-select :prevalue="param.pack" :value.sync="param.pack" :options="tag" placeholder="包装">
                                        </input-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">上门看货</label>
                                    <select type="text" class="form-control edit-input" v-model="param.visit">
                                        <option value="0">否</option>
                                        <option value="1">会</option>
                                    </select>
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input" style="float:left;width:50%">
                                    <label class="editlabel" for="system">数量<span class="system_danger" v-if="$validation.number.quantity">不超过小数点两位的数字</span></label>
                                    <input type="number" v-model="param.number" v-validate:number="['quantity']" class="form-control edit-input" value="{{param.number}}" />
                                </div>
                                <div class="editpage-input" style="float:right;width:50%">
                                    <label class="editlabel">单位<span class="system_danger" v-if="$validation.unit.required">单位不能为空</span></label>
                                    <input type="text" v-model="param.unit" class="form-control edit-input" v-validate:unit="{required:true}" v-show="false" />
                                    <select v-model="param.unit" class="form-control edit-input">
                                        <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}</option>
                                    </select>
                                </div>
                                <div class="editpage-input" style="clear:both;padding-top:15px">
                                    <label class="editlabel">过期时间</label>
                                    <mz-datepicker :time.sync="param.duedate" format="yyyy-MM-dd HH:mm:ss" style="height:36px">
                                    </mz-datepicker>
                                    <button type="button" class="btn btn-default" style="margin-top:-6px" height="24" width="24" @click="reset('duedate')">清空</button>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">规格<span class="system_danger" v-if="$validation.spec.required">规格不能为空</span></label>
                                    <input type="text" v-show="!breedParam.id" v-model="param.spec" class="form-control edit-input" disabled="disabled" v-validate:spec="{required:true}" />
                                    <div type="text" class="edit-input" v-if="breedParam.id">
                                        <input-select :value.sync="param.spec" :prevalue="param.spec" :options="initBreedDetail.specs.arr" placeholder="规格" label="name">
                                        </input-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">产地<span class="system_danger" v-if="$validation.location.required">产地不能为空</span></label>
                                    <input type="text" v-model="param.location" v-show="false" class="form-control edit-input" v-validate:location="{required:true}" />
                                    <input type="text" v-model="param.location" v-show="!breedParam.id" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />
                                    <div type="text" class="edit-input" v-if="breedParam.id">
                                        <input-select :prevalue="param.location" :value.sync="param.location" :options="initBreedDetail.locals.arr" placeholder="产地" label="name">
                                        </input-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top:25px">
                            <img src="/static/images/receiverinfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">交收信息</h5>
                        </div>
                        <!-- 非预售或预购 -->
                        <div v-if="param.preSell===0" class="editpage">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">省</label>
                                    <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
                                    <input type="text" v-show="false" v-model="province.cname">
                                    <div v-if="country.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省" label="cname">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">市</label>
                                    <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个省" />
                                    <div v-if="province.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="city" :on-change="selectDistrict" :options="initCitylist" placeholder="市" label="cname">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">区</label>
                                    <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个市" />
                                    <div v-if="city.cname" type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="district" :options="initDistrictlist" placeholder="区" label="cname">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">详细地址</label>
                                    <input type="text" v-model='param.address' class="form-control edit-input" value="{{param.address}}" />
                                </div>
                                <!-- 客户备注 -->
                                <div class="editpage-input col-md-12" style="padding-left: 0px;padding-right: 30px;">
                                    <label class="editlabel">客户备注</label>
                                    <textarea class="form-control" v-model="param.description" rows="5"></textarea>
                                </div>
                            </div>
                            <div class="editpageright">
                                <!-- <div class="editpage-input">
                                   <label class="editlabel">是否国际</label>
                                   <select type="text" class="form-control edit-input" v-model="param.intl">
                                     <option value="0">国内</option>
                                     <option value="1">国际</option>
                                   </select>
                                 </div> -->
                                <div class="editpage-input">
                                    <label class="editlabel">发票</label>
                                    <select type="text" class="form-control edit-input" v-model="param.invoic">
                                        <option value="0">无</option>
                                        <option value="1">普通</option>
                                        <option value="2">增值</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">预付比例</label>
                                    <select type="text" class="form-control edit-input" v-model="param.advance">
                                        <option value=0>0</option>
                                        <option value=0.1>10%</option>
                                        <option value=0.2>20%</option>
                                        <option value=0.3>30%</option>
                                        <option value=0.4>40%</option>
                                        <option value=0.5>50%</option>
                                        <option value=0.6>60%</option>
                                        <option value=0.7>70%</option>
                                        <option value=0.8>80%</option>
                                        <option value=0.9>90%</option>
                                        <option value=1>100%</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">是否提供样品</label>
                                    <select type="text" class="form-control edit-input" v-model="param.sampling">
                                        <option value="0">无</option>
                                        <option value="1">有</option>
                                    </select>
                                </div>
                                <div class="editpage-input" v-show="param.sampling==1">
                                    <!-- <label class="editlabel">样品单位</label>
                                    <div type="text" class="edit-input">
                                        <input-select :prevalue="param.sampleUnit" :value.sync="param.sampleUnit" :options="initBreedDetail.units.arr" placeholder="样品单位" label="name">
                                        </input-select>
                                    </div> -->
                                    <label class="editlabel">样品单位</label>
                                    <select v-model="param.sampleUnit" class="form-control edit-input">
                                        <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}</option>
                                    </select>
                                </div>
                                <div class="editpage-input" v-show="param.sampling==1">
                                    <label class="editlabel">样品数量</label>
                                    <input type="text" v-model='param.sampleNumber' class="form-control edit-input" value="{{param.sampleNumber}}" />
                                </div>
                                <div class="editpage-input" v-show="param.sampling==1">
                                    <label class="editlabel">样品总价</label>
                                    <input type="text" v-model='param.sampleAmount' class="form-control edit-input" value="{{param.sampleAmount}}" />
                                </div>
                            </div>
                        </div>
                        <!-- 预售或者预购 -->
                        <div v-if="param.preSell===1" class="editpage">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">出口国家</label>
                                    <div type="text" class="edit-input">
                                        <v-select :debounce="250" :value.sync="country" :options="initCountrylist" placeholder="国" label="cname">
                                        </v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">运输类型</label>
                                    <select type="text" class="form-control edit-input" v-model="param.transportType">
                                        <option value="1">空运</option>
                                        <option value="2">海运</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">航班号</label>
                                    <input type="text" v-model='param.transportNo' class="form-control edit-input" />
                                </div>
                                <!-- 到港地点复用address -->
                                <div class="editpage-input">
                                    <label class="editlabel">到港地点</label>
                                    <input type="text" v-model='param.address' class="form-control edit-input" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">到港时间</label>
                                    <mz-datepicker :time.sync="param.arriveTime" format="yyyy-MM-dd HH:mm:ss" style="height:36px">
                                    </mz-datepicker>
                                    <button type="button" class="btn btn-default" style="margin-top:-6px" height="24" width="24" @click="reset('arrive')">清空</button>
                                </div>
                            </div>
                            <div class="editpageright">
                                <!-- <div class="editpage-input">
                                   <label class="editlabel">是否国际</label>
                                   <select type="text" class="form-control edit-input" v-model="param.intl">
                                     <option value="0">国内</option>
                                     <option value="1">国际</option>
                                   </select>
                                 </div> -->
                                <div class="editpage-input">
                                    <label class="editlabel">发票</label>
                                    <select type="text" class="form-control edit-input" v-model="param.invoic">
                                        <option value="0">无</option>
                                        <option value="1">普通</option>
                                        <option value="2">增值</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">预付比例</label>
                                    <select type="text" class="form-control edit-input" v-model="param.advance">
                                        <option value=0>0</option>
                                        <option value=0.1>10%</option>
                                        <option value=0.2>20%</option>
                                        <option value=0.3>30%</option>
                                        <option value=0.4>40%</option>
                                        <option value=0.5>50%</option>
                                        <option value=0.6>60%</option>
                                        <option value=0.7>70%</option>
                                        <option value=0.8>80%</option>
                                        <option value=0.9>90%</option>
                                        <option value=1>100%</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">是否提供样品</label>
                                    <select type="text" class="form-control edit-input" v-model="param.sampling">
                                        <option value="0">无</option>
                                        <option value="1">有</option>
                                    </select>
                                </div>
                                <div class="editpage-input" v-show="param.sampling==1">
                                    <!-- <label class="editlabel">样品单位</label>
                                    <div type="text" class="edit-input">
                                        <input-select :prevalue="param.sampleUnit" :value.sync="param.sampleUnit" :options="initBreedDetail.units.arr" placeholder="样品单位" label="name">
                                        </input-select>
                                    </div> -->
                                    <label class="editlabel">样品单位</label>
                                    <select v-model="param.sampleUnit" class="form-control edit-input">
                                        <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}</option>
                                    </select>
                                </div>
                                <div class="editpage-input" v-show="param.sampling==1">
                                    <label class="editlabel">样品数量</label>
                                    <input type="text" v-model='param.sampleNumber' class="form-control edit-input" value="{{param.sampleNumber}}" />
                                </div>
                                <div class="editpage-input" v-show="param.sampling==1">
                                    <label class="editlabel">样品总价</label>
                                    <input type="text" v-model='param.sampleAmount' class="form-control edit-input" value="{{param.sampleAmount}}" />
                                </div>
                            </div>
                        </div>
                        <div style="margin-top:25px">
                            <img src="/static/images/sellerinfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">商家信息</h5>
                        </div>
                        <div class="editpage">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">资质证书</label>
                                    <select type="text" class="form-control edit-input" v-model="param.qualification" placeholder="请输入资质证书">
                                        <option value="GMP">GMP</option>
                                        <option value="GSP">GSP</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="createOrUpdateIntention()">确定</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">确定</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import searchbreedModel from '../Intention/breedsearch'
import searchcustomerModel from '../Intention/clientname'
import vSelect from '../tools/vueSelect/components/Select'
import inputSelect from '../tools/vueSelect/components/inputselect'
import tipdialogModel from '../tips/tipDialog'
/*import pressImage from '../imagePress'*/
import pressImage from '../tools/upload/imagePressMul'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initBreedDetail,
    initIntentionDetail,
    initUnitlist
} from '../../vuex/getters'
import {
    createIntentionInfo,
    editintentInfo,
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList,
    getBreedDetail,
    getIntentionDetail,
    getUnitList
} from '../../vuex/actions'
export default {
    components: {
        searchbreedModel,
        searchcustomerModel,
        vSelect,
        inputSelect,
        tipdialogModel,
        pressImage
    },
    props: ['param'],
    data() {
        return {
            tipParam: {
                show: false,
                name: '',
                remain: true,
                callback: this.callback
            },
            breedParam: {
                show: false,
                breedName: '',
                breedId: '',
                loading: false,
                id: ''
            },
            empNameParam: {
                show: false,
                customerId: '',
                customerName: '',
                customerPhone: '',
                employeeId: ''
            },
            tag: ['真空包装', '瓦楞纸箱', '编织袋', '积压包', '其它'],
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
            },
            type: "image/jpeg,image/jpg,image/png",
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false,
                files: []
            }
        }
    },
    vuex: {
        getters: {
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist,
            initBreedDetail,
            initIntentionDetail,
            initUnitlist
        },
        actions: {
            createIntentionInfo,
            editintentInfo,
            getCountryList,
            getProvinceList,
            getCityList,
            getDistrictList,
            getBreedDetail,
            getIntentionDetail,
            getUnitList
        }
    },
    methods: {
        selectType: function(type, especial, preSell) {
            this.param.type = type;
            this.param.especial = especial;
            this.param.preSell = preSell;
        },
        searchBreed: function(breedName, breedId) {
            this.breedParam.show = true;
        },
        searchCustomer: function(customerName, customerId, customerPhone) {
            this.empNameParam.show = true;
            if ("employeeId" in this.param) {
                this.empNameParam.employeeId = this.param.employeeId;
            }
        },
        callback: function() {
            this.param.show = false;
            this.tipParam.show = false;
        },
        createOrUpdateIntention: function() {
            this.param.pics = this.setPics(this.param.images);
            if (this.param.flag == 0) {
                this.param.country = this.country.cname;
                this.param.province = this.province.cname;
                this.param.city = this.city.cname;
                if (this.district.cname) {
                    this.param.district = this.district.cname;
                } else {
                    this.param.district = '';
                }
                //this.tipParam.name = '新建意向成功';
                this.param.show = false;
                this.param.callback = this.param.callback;
                this.createIntentionInfo(this.param);
            }
            if (this.param.flag == 1) {
                this.param.country = this.country.cname;
                this.param.province = this.province.cname;
                this.param.city = this.city.cname;
                this.param.district = this.district.cname;
                //this.tipParam.name = '修改意向成功';
                this.param.show = false;
                this.param.callback = this.param.callback;
                this.editintentInfo(this.param);
            }
            this.param.callback = this.param.callback;
        },
        reset: function(type) {
            if (type == "duedate") {
                this.param.duedate = "";
            }
            if (type == "arrive") {
                this.param.arriveTime = "";
            }

        },
        selectProvince: function() {
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
        /*
         * 设置图片数组
         * @param pics原图片数组（从后台获取）
         * 
         */
        setPics: function(images) {
            let imageArr = images.split(",");
            let pics = [];
            if (imageArr.length > 0) {
                for (let i = 0; i < imageArr.length; i++) {
                    let temp = {
                        url: imageArr[i],
                        path: imageArr[i]
                    }
                    pics.push(temp);
                }
            }
            console.log(pics);
            return pics;
        },
        /*
         * 设置图片路径拼接字符串，与setPics相反的操作
         * @param pics原图片数组（从后台获取）
         */
        setImages: function(pics) {
            let images = '';
            if (pics.length > 0) {
                for (let i = 0; i < pics.length; i++) {
                    if (i == 0) {
                        images = pics[0].path;
                    } else {
                        images = images + "," + pics[i].path;
                    }

                }
            }
            return images;
        },
        /*
         * 设置文件信息
         * @param pics原图片数组（从后台获取）
         * 
         */
        setFiles: function(pics) {
            let files = [];
            if (pics.length > 0) {
                for (let i = 0; i < pics.length; i++) {
                    let temp = {
                        imageShow: true,
                        showurl: pics[i].url,
                        path: pics[i].path
                    }
                    files.push(temp);
                }
            }

            return files;
        },


    },
    events: {
        breed: function(breed) {
            this.param.breedName = breed.breedName;
            this.param.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
            this.breedParam.loading = true;
            this.getBreedDetail(this.breedParam);
        },
        customer: function(customer) {
            this.param.customerName = customer.customerName;
            this.param.customerId = customer.customerId;
            this.param.customerPhone = customer.customerPhone;
        }

    },
    created() {

        this.imageParam.files = this.setFiles(this.param.pics);
        this.param.images = this.setImages(this.param.pics);

        //设置过期时间,7天后
        if (!this.param.duedate) {
            var date = new Date();
            date.setDate(date.getDate() + 7);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            this.param.duedate = year + "-" + month + "-" + day + " 00:00:00";
        }

        if (this.param.breedId) {
            this.breedParam.breedName = this.param.breedName;
            this.breedParam.id = this.param.breedId;
            this.getBreedDetail(this.breedParam);
        }
        if (this.param.id) {
            this.param.loading = true;
            this.getIntentionDetail(this.param);
        } else {
            this.param.loading = false;
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
        this.getCountryList(this.countryParam);
        this.getUnitList();

    }
}
</script>
<style scoped>
.modal {
    z-index: 1083
}

.modal_con {
    z-index: 1084
}

.edit-model {
    padding: 10px 30px 80px 30px;
}

.top-title {
    position: fixed;
    top: 91px;
    right: 0;
    left: 0;
    margin: auto;
    width: 800px;
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

.editpagecenter {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 100%;
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
    /*  margin-top: 50px; */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 800px;
    background: #fff;
    margin: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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

.remark {
    margin-top: 15px
}

.remark textarea {
    width: 650px;
    min-height: 70px;
}
</style>

<template>
    <!-- 创建订单 -->
    <div>
        <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
        <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
        <consignee-model :param="consigneeParam" v-if="consigneeParam.show"></consignee-model>
        <searchemg-model :param="employeeParam" v-if="employeeParam.show"></searchemg-model>
        <supplier-dialog :param="supplierParam" v-if="supplierParam.show"></supplier-dialog>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>{{$t('static.new_order')}}</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <div class="clearfix">
                        <div class="editpage-input col-md-3" v-if="param.intl!=1">
                            <label class="editlabel">{{$t('static.book')}}</label>
                            <select class="form-control edit-input" v-model="param.pre">
                                <option value="0">{{$t('static.no')}}</option>
                                <option value="1">{{$t('static.yes')}}</option>
                            </select>
                        </div>
                        <!--订单类型  -->
                        <div class="editpage-input col-md-3">
                            <label class="editlabel">
                                {{$t('static.order_type')}}
                                <!-- <span class="system_danger" v-if="$validation.type.required">
                                    {{$t('static.select_order_type')}}
                                </span> -->
                            </label>
                            <input type="text" class="form-control" v-model="orderType" readonly="readonly" />
                            <!-- <select class="form-control edit-input" v-model="param.type" @change="exChange()">
                                <option value="0">{{$t('static.purchase')}}</option>
                                <option value="1">{{$t('static.sell')}}</option>
                            </select> -->
                        </div>
                        <!-- 是否样品单： -->
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.sample_order')}}：<span class="system_danger" v-if="$validation.sample.required">{{$t('static.required')}}</span>
                            </label>
                            <input type="text" class="form-control edit-input" v-model="param.sample" v-validate:sample="{required:true}" v-show="false" />
                            <select class="form-control edit-input" v-model="param.sample">
                                <option selected="selected" disabled="disabled" style='display: none' value=''></option>
                                <option value="1">{{$t('static.yes')}}</option>
                                <option value="0">{{$t('static.no')}}</option>
                            </select>
                        </div>
                        <div class="editpage-input col-md-6" v-show="param.type==1">
                            <label class="editlabel">{{$t('static.send_person')}} <span class="system_danger" v-if="$validation.shipper.required">{{$t('static.required')}}</span></label>
                            <input type="text" class="form-control edit-input" readonly="true" v-model="param.consignerName" v-validate:shipper="{required:true}" @click="selectEmployee()" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.transcation')}}</label>
                            <mz-datepicker :time.sync="param.tradeTime" format="yyyy/MM/dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                    </div>
                    <section class="editsection">
                        <div style="margin-top:20px;">
                            <img src="/static/images/breedinfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">{{$t('static.customer_info')}}</h5>
                            <!-- 填写收货地址，或选择收货地址（无法使用，因为国省市区要传ID，而选择的地址不是中文） -->
                            <!-- 选择收货地址 -->
                            <button v-if="param.customerName&&param.type==1" type="button" class="btn right" v-bind:class="{ 'btn-confirm': createOrSelect===1}" style="margin-right:40px;" @click="selectConsignee()">{{$t('static.select_addr')}}</button>
                            <!-- 填写收货地址（默认） -->
                            <button v-if="param.customerName&&param.type==1" type="button" class="btn right" v-bind:class="{ 'btn-confirm': createOrSelect===0}" style="margin-right:20px;" @click="createConsignee()">{{$t('static.shipped_addr')}}</button>
                        </div>
                        <div class="clearfix">
                            <!-- 客户选择（销售）/供应商选择（采购） -->
                            <div class="editpage-input col-md-4">
                                <label class="editlabel" v-show="param.type==0">{{$t('static.supplier_name')}} <span class="jinggao" v-if="$validation.custname.required">{{$t('static.required')}}</span></label>
                                <label class="editlabel" v-show="param.type==1">{{$t('static.client_name')}} <span class="jinggao" v-if="$validation.custname.required">{{$t('static.required')}}</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.customerName" value="{{param.customerName}}" v-validate:custname="['required']" readonly="true" @click="searchCustomer()" />
                            </div>
                            <!-- 是否国际 -->
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.international')}} <span class="jinggao" v-if="$validation.intl.required">{{$t('static.required')}}</span>
                                </label>
                                <input type="text" class="form-control edit-input" v-model="param.intl" v-validate:intl="{required:true}" v-show="false" />
                                <select type="text" class="form-control edit-input" v-model="param.intl" @change="selectBizType()">
                                    <option value="0">{{$t('static.no')}}</option>
                                    <option value="1">{{$t('static.yes')}}</option>
                                </select>
                            </div>
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.currency')}}</label>
                                <select type="text" class="form-control edit-input" v-model="param.currency" v-if="param.intl==0">
                                    <option value="1" selected>CNY人民币元</option>
                                    <option v-for="item in initCurrencylist" value="{{item.id}}">{{item.name}}{{item.cname}}</option>
                                </select>
                                <select type="text" class="form-control edit-input" v-model="param.currency" v-if="param.intl==1">
                                    <option value="2" selected>USD美元</option>
                                    <option v-for="item in initCurrencylist" value="{{item.id}}">{{item.name}}{{item.cname}}</option>
                                </select>
                            </div>
                            <!-- 收货人信息 -->
                            <div class="editpage-input col-md-4">
                                <label class="editlabel" v-if="param.type==1">{{$t('static.consignee_name')}}</label>
                                <label class="editlabel" v-if="param.type==0">{{$t('static.send_person')}} {{$t('static.name')}}</label>
                                <input type="text" class="form-control edit-input" v-model="param.consignee" value="{{param.consignee}}" />
                            </div>
                            <div class="editpage-input col-md-4">
                                <label class="editlabel" v-if="param.type==1">{{$t('static.consignee_phone')}}</label>
                                <label class="editlabel" v-if="param.type==0">{{$t('static.send_person')}} {{$t('static.cellphone')}}</label>
                                <input type="text" class="form-control edit-input" v-model="param.consigneePhone" value="{{param.consigneePhone}}" />
                            </div>
                            <!-- 为了兼容国际并且可以选择地址，国家需要分为两种处理方式，1.直接填写，用cnameEn字段，2选择用cname字段 -->
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.country')}}</label>
                                <!-- 如果cnameEn存在或者cname不存在，显示cnameEn，因为这样不确定是否国际，并且认为这是新建地址 -->
                                <div v-if="country.cnameEn||!country.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="country" :on-change="selectProvince" :options="initCountrylist" placeholder="国家/Country" label="cnameEn">
                                    </v-select>
                                </div>
                                <!-- 如果cnameEn不存在并且cname存在，认为这是选择地址，而且是国内的（暂时这么认为，因为创建地址的时候用的是cname）-->
                                <div v-if="!country.cnameEn&&country.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="country" :on-change="selectProvince" :options="initCountrylist" placeholder="国家/Country" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <!-- 判断省是否显示，应该用country的cnameEn和cname字段共同决定 -->
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.province')}}</label>
                                <input type="text" v-if="!country.cnameEn&&!country.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_country_first')}}" />
                                <div v-if="country.cnameEn" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省/Province" label="cnameEn">
                                    </v-select>
                                </div>
                                <div v-if="!country.cnameEn&&country.cname" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省/Province" label="cnameEn">
                                    </v-select>
                                </div>
                            </div>
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.city')}}</label>
                                <input type="text" v-if="!province.cnameEn" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_province_first')}}" />
                                <div v-if="province.cnameEn" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="city" :on-change="selectDistrict" :options="initCitylist" placeholder="市/City" label="cnameEn">
                                    </v-select>
                                </div>
                            </div>
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.area')}}</label>
                                <input type="text" v-if="!city.cnameEn" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_city_first')}}" />
                                <div v-if="city.cnameEn" type="text" class="edit-input">
                                    <v-select :debounce="250" :value.sync="district" :options="initDistrictlist" placeholder="区" label="cname">
                                    </v-select>
                                </div>
                            </div>
                            <div class="editpage-input col-md-8">
                                <label class="editlabel">{{$t('static.detailed_address')}} <span class="system_danger" v-if="$validation.addr.required">{{$t('static.enter_address')}}</span></label>
                                <input type="text" class="form-control edit-input" style="width:95%" v-model="param.consigneeAddr" v-validate:addr="['required']" />
                            </div>
                            <div class="editpage-input col-md-4">
                                <label class="editlabel">{{$t('static.postcodes')}} <span class="system_danger" v-if="$validation.code.postcode">{{$t('static.enter_code')}}</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.zipCode" v-validate:code="['postcode']" value="{{param.zipCode}}" />
                            </div>
                        </div>
                    </section>
                    <div>
                        <div style="margin-top:20px;">
                            <img src="/static/images/breedinfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">{{$t('static.medicinal_material_information')}}</h5>
                        </div>
                        <table class="table table-hover table_color table-striped ">
                            <thead>
                                <tr>
                                    <th>{{$t('static.headline')}}</th>
                                    <th>{{$t('static.breed')}}</th>
                                    <th>{{$t('static.unit')}}</th>
                                    <th>{{$t('static.price')}}</th>
                                    <th v-if="this.initLogin.orgId!=='11'">{{$t('static.cost_price')}}</th>
                                    <th>{{$t('static.quality')}}</th>
                                    <th>{{$t('static.quantity')}}</th>
                                    <th>{{$t('static.specification')}}</th>
                                    <th>{{$t('static.origin')}}</th>
                                    <!-- <th>发货地</th> -->
                                    <th>{{$t('static.handle')}}</th>
                                    <th>{{$t('static.handle')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in param.goods">
                                    <td>{{item.title}}</td>
                                    <td>{{item.breedName}}</td>
                                    <td>{{item.unit | Unit}}</td>
                                    <td>{{item.price}}</td>
                                    <td v-if="this.initLogin.orgId!=='11'">{{item.costPrice}}</td>
                                    <td>{{item.quality}}</td>
                                    <td>{{item.number}}</td>
                                    <td>{{item.spec}}</td>
                                    <td>{{item.location | province}}</td>
                                    <td v-if="breedInfo.status==0" @click="showModifyBreed($index)"><a>{{$t('static.edit')}}</a></td>
                                    <td v-else>{{$t('static.edit')}}</td>
                                    <td v-if="breedInfo.status==0" @click="deleteBreed($index)"><a>{{$t('static.del')}}</a></td>
                                    <td v-else>{{$t('static.del')}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="padding-left:25%">
                            <div v-if="breedInfo.status==0" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showAddBreed()">{{$t('static.add_material_information')}}</div>
                        </div>
                        <validator name="inner">
                            <div v-if="addParam.show||updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                                <div class="col-md-12 clearfix">
                                    <!-- 品种 -->
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.breed')}}<span class="system_danger" v-if="$inner.breedname.required">{{$t('static.required')}}</span></label>
                                        <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" v-validate:breedname="{required:true}" @click="searchBreed()" readonly="true" />
                                    </div>
                                    <!-- 数量,必填至多两位小数 -->
                                    <div class="editpage-input col-md-6">
                                        <div style="clear:both;height:36px;">
                                            <div class="left" style="width:45%;">
                                                <label class="editlabel">{{$t('static.quantity')}}
                                                    <span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span>
                                                    <span class="system_danger" v-if="!$inner.number.required&&$inner.number.quantity">
                                                        {{$t('static.two_decimal')}}
                                                    </span>
                                                </label>
                                                <input type="number" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="['required','quantity']" />
                                            </div>
                                            <div class="left" style="width:45%;">
                                                <label class="editlabel">{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                                <input type="text" v-show="false" v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}" disabled="disabled" />
                                                <select class="form-control edit-input" v-model="breedInfo.unit">
                                                    <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}({{item.ename}})</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 价格,必填至多两位小数 -->
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">
                                            <span v-if="param.type==0">{{$t('static.purchase')}}</span>
                                            <span>{{$t('static.price')}}</span>
                                            <span class="jinggao" v-if="$inner.pack0.required">{{$t('static.required')}}</span>
                                            <span class="jinggao" v-if="!$inner.pack0.required&&$inner.pack0.money">
                                                {{$t('static.two_decimal')}}
                                            </span>
                                        </label>
                                        <div style="clear:both;height:36px;">
                                            <div class="left" style="width:45%;">
                                                <input type="number" v-model="breedInfo.price" class="form-control edit-input" v-validate:pack0="['required','money']" />
                                            </div>
                                            <div class="left" style="width:45%;">
                                                <select class="form-control edit-input" v-model="breedInfo.unit" disabled="true">
                                                    <option v-for="item in initUnitlist" value="{{item.id}}">元/{{item.name}}({{item.ename}})</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 成本价格,,必填至多两位小数 -->
                                    <div class="editpage-input col-md-6" v-if="param.type===1&&param.intl!=1">
                                        <label class="editlabel">
                                            {{$t('static.cost_price')}}
                                            <span class="system_danger" v-if="$inner.cost.required">{{$t('static.required')}}</span>
                                            <span class="system_danger" v-if="!$inner.cost.required&&$inner.cost.money">
                                                {{$t('static.two_decimal')}}
                                            </span>
                                        </label>
                                        <div style="clear:both;height:36px;">
                                            <div class="left" style="width:45%;">
                                                <input type="number" v-model="breedInfo.costPrice" class="form-control edit-input" v-validate:cost="['required','money']" />
                                            </div>
                                            <div class="left" style="width:45%;">
                                                <select class="form-control edit-input" v-model="breedInfo.unit" disabled="true">
                                                    <option v-for="item in initUnitlist" value="{{item.id}}">元/{{item.name}}({{item.ename}})</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 质量 -->
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.quality')}}</label>
                                        <input type="text" v-model="breedInfo.quality" class="form-control edit-input" />
                                    </div>
                                    <div class="editpage-input col-md-6">
                                        <label class="editlabel">{{$t('static.specification')}}</label>
                                        <input type="text" v-show="!breedParam.id" v-model="breedInfo.spec" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />
                                        <div type="text" class="edit-input" v-if="breedParam.id">
                                            <input-select :value.sync="breedInfo.spec" :prevalue="breedInfo.spec" :options="initBreedDetail.specs.arr" placeholder="规格/Specification" label="name">
                                            </input-select>
                                        </div>
                                    </div>
                                    <!-- 产地 -->
                                    <div class="editpage-input col-md-6">
                                        <!-- <label class="editlabel">{{$t('static.origin')}}</label>
                                        <input type="text" v-show="!breedParam.id" v-model="breedInfo.location" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />
                                        <div type="text" class="edit-input" v-if="breedParam.id">
                                            <input-select :prevalue="breedInfo.location" :value.sync="breedInfo.location" :options="initBreedDetail.locals.arr" placeholder="产地/Origin" label="name">
                                            </input-select>
                                        </div> -->
                                        <label class="editlabel">{{$t('static.origin')}}<span class="jinggao" v-if="$inner.locals.required">{{$t('static.required')}}</span> </label>
                                        <input type="text" v-show="false" v-model="breedInfo.location" v-validate:locals="{required:true}" />
                                        <breed-location :param="breedInfo" :show="breedParam" :widparam="'285'"></breed-location>
                                    </div>
                                    <!-- 发货地 -->
                                    <div class="editpage-input col-md-6" v-if="param.intl!=1">
                                        <label class="editlabel">{{$t('static.delivery_addr')}}<span class="jinggao" v-if="$inner.lcoals.required">{{$t('static.required')}}</span> </label>
                                        <input type="text" v-show="false" v-model="breedInfo.provinceId" v-validate:lcoals="{required:true}" />
                                        <div type="text" class="edit-input">
                                            <v-select :debounce="250" :value.sync="breedInfo.provinceId" :options="initCNProvince" placeholder="省/Province" label="cname">
                                            </v-select>
                                        </div>
                                    </div>
                                    <!-- 提交 -->
                                    <div class="col-md-12" style="margin-top:10px;text-align:right">
                                        <button type="button" class="btn btn-confirm" v-if="breedInfo.status==1" @click="cancelAddBreed()">{{$t('static.cancel')}}
                                        </button>
                                        <button type="button" class="btn btn-confirm" v-if="breedInfo.status==2" @click="cancelModifyBreed()">{{$t('static.cancel')}}</button>
                                        <button type="button" class="btn btn-confirm" v-show='false' @click="addBreed()">{{$t('static.save')}}</button>
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
                    <div class="clearfix">
                        <div style="margin-top:20px;">
                            <img src="/static/images/breedinfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">{{$t('static.other_info')}}</h5>
                        </div>
                        <!-- 运费 -->
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.freight')}}</label>
                            <div class="clearfix">
                                <input type="number" class="form-control edit-input" v-model="param.freight" style="display:inline-block;float:left;" @keyup="" />
                            </div>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.freight_payer')}}</label>
                            <select type="text" class="form-control edit-input" v-model="param.freightType">
                                <option value="0">{{$t('static.pay_by_us')}}</option>
                                <option value="1">{{$t('static.pay_by_customer')}}</option>
                            </select>
                        </div>
                        <!-- 杂费 -->
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.sundry_fees')}}</label>
                            <div class="clearfix">
                                <!-- <button class="btn btn-default left" style="font-size: 16px" @click="addIncidentals()">+</button> -->
                                <input type="number" class="form-control edit-input" v-model="param.incidentals" style="display:inline-block;float:left;" @keyup="" />
                                <!-- <button class="btn btn-default right" style="font-size: 16px" @click="subduction()">-</button> -->
                            </div>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.fee_explain')}}</label>
                            <input type="text" class="form-control edit-input" v-model="param.incidentalsDesc" value="{{param.incidentalsDesc}}" />
                        </div>
                        <!-- 优惠金额 -->
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.preferential')}}</label>
                            <div class="clearfix">
                                <!-- <button class="btn btn-default left" style="font-size: 16px" @click="addCompute()">+</button> -->
                                <input type="number" class="form-control edit-input" v-model="param.preferential" style="display:inline-block;float:left;" />
                                <!-- <button class="btn btn-default right" style="font-size: 16px" @click="reduce()">-</button> -->
                            </div>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.discount_note')}}</label>
                            <input type="text" class="form-control edit-input" v-model="param.preferentialDesc" value="{{param.preferentialDesc}}" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.total')}}</label>
                            <input type="text" class="form-control edit-input" v-model="param.total" readonly="true" />
                        </div>
                        <div class="editpage-input col-md-6" v-if="this.initLogin.orgId !== '11'">
                            <label class="editlabel">{{$t('static.cost')}}{{$t('static.total')}}</label>
                            <input type="text" class="form-control edit-input" v-model="param.cost" readonly="true" />
                        </div>
                        <div class="editpage-input col-md-12">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <textarea rows="5" class="form-control" v-model="param.comments" value="{{param.comments}}" style="resize: none;width:100%;"></textarea>
                        </div>
                    </div>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&param.goods.length>0&&param.goods[param.goods.length-1].breedId!=''&&breedInfo.status==0" @click="confirm(param)">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import pressImage from '../imagePress'
import mzDatepicker from '../calendar/vue.datepicker.js'
import breedLocation from './second_order/breedLocation'
import searchcustomerModel from '../Intention/clientname'
import inputSelect from '../tools/vueSelect/components/inputselect'
import searchbreedModel from '../Intention/breedsearch'
import consigneeModel from '../clientRelate/addressSearch'
import searchemgModel from '../order/second_order/allEmployee'
import supplierDialog from '../order/second_order/selectAllSupplier.vue'
import tipsdialogModel from '../tips/tipDialog'
import util from '../tools/util.js'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initBreedDetail,
    initCurrencylist,
    initUnitlist,
    initEmployeeList,
    initLogin,
    initCNProvince
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getBreedDetail,
    getDistrictList,
    createOrder,
    getUnitList,
    getCurrencyList,
    getEmployeeList
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        mzDatepicker,
        searchcustomerModel,
        searchbreedModel,
        consigneeModel,
        inputSelect,
        searchemgModel,
        supplierDialog,
        tipsdialogModel,
        breedLocation
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
            orgParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            empNameParam: {
                show: false,
                customer: '',
                customerName: '',
                customerPhone: ''
            },
            consigneeParam: {
                show: false,
                loading: true,
                link: '/customer/getAddress/',
                customerId: ''
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
                costPrice: 0,
                number: '',
                unit: '',
                unitName: '',
                price: '',
                provinceId: '', //选择发货地
                province: '' //品种新增产地
            },
            addParam: {
                show: false,
                length: 0
            },
            updateParam: {
                show: false,
                index: 0,
                price: 0, //修改前,被修改条目的单价
                number: 0, //修改前,被修改条目的数量
            },
            employeeParam: {
                show: false,
                consigner: '',
                consignerName: ''
            },
            country: {
                id: '7',
                cname: '中国',
                cnameEn: '中国(China)'
            },
            province: {
                id: '',
                cnameEn: ''
            },
            city: {
                id: '',
                cnameEn: ''
            },
            district: {
                id: '',
                cname: ''
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
            tipsParam: {
                show: false,
                alert: true,
                name: "",
            },
            selectType: 1,
            createOrSelect: 0, //选择还是新建客户收货地址,0新建,1选择
            saith: 0, //点击按钮计算
            sum: 0, //点击按钮计算
            altogether: 0, //所有商品的总金额,
            costmoney: 0, //所有商品的成本总金额
            orderType: ''
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
            initLogin,
            initCNProvince
        },
        actions: {
            getCountryList,
            getProvinceList,
            getCityList,
            getBreedDetail,
            getDistrictList,
            createOrder,
            getUnitList,
            getEmployeeList,
            getCurrencyList
        }
    },
    methods: {
        initParam: function() { //初始化this.param
            if (this.param.type == 1) { //如果是销售订单，则将consignerName置为""
                this.param.consigner = ""; //后台需要的字段
                this.param.consignerName = ""; //前端展示需要的字段

            } else { //如果是采购订单，则将consignerName置为"init"（为了通过验证），提交时将其还原为空
                this.param.consigner = "-1";
                this.param.consignerName = "init"
            }
        },
        resetParam: function() { //还原this.param
            if (this.param.type != 1) {
                this.param.consigner = "";
                this.param.consignerName = "";
            }
        },
        selectProvince: function() {
            this.province = {
                id: '',
                cnameEn: ''
            };
            this.city = {
                id: '',
                cnameEn: ''
            };
            this.district = {
                id: '',
                cname: ''
            };
            if (this.country.id) {
                this.getProvinceList(this.country);
            }
        },

        selectCity: function() {
            this.city = {
                id: '',
                cnameEn: ''
            };
            this.district = {
                id: '',
                cname: ''
            };
            if (this.province.id) {
                this.getCityList(this.province);
            }

        },
        selectDistrict: function() {
            this.district = {
                id: '',
                cname: ''
            };
            if (this.city.id) {
                this.getDistrictList(this.city);
            }
        },

        selectEmployee: function(id, name) {
            this.employeeParam.show = true;
        },
        addCompute: function() { //优惠增加
            var saith = 0;
            if (this.param.preferential && this.param.preferential != '') {
                saith = parseFloat(this.param.preferential);
                saith = (saith * 1000 + 1000) / 1000;
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
                saith = (saith * 1000 + 1000) / 1000;
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

        searchBreed: function(breedName, breedId) {
            this.breedParam.show = true;
        },
        searchCustomer: function() {
            //如果是采购订单，选择供应商
            if (this.param.type == 0) {
                this.supplierParam.show = true;
            }
            //如果是销售订单，选择客户
            if (this.param.type == 1) {
                this.empNameParam.show = true;
            }

        },
        selectSupplier: function() {
            this.supplierParam.show = true;
        },
        exChange: function() {
            this.param.consignner = "";
            this.param.customer = "";
            this.param.consignee = "";
            this.param.consigneeName = "";
            this.param.customerName = "";
            this.initParam();
        },
        createConsignee: function() {
            this.createOrSelect = 0;
            this.param.addressId = '';
            //重置收货人信息
            this.param.consignee = this.param.customerName;
            this.param.consigneePhone = this.param.customerPhone;
            this.param.consigneeAddr = "";
            //重置省市区信息
            this.country.id = 7;
            this.country.cnameEn = "中国(China)";
            this.province.id = "";
            this.province.cnameEn = "";
            this.city.id = "";
            this.city.cnameEn = "";
            this.district.id = "";
            this.district.cname = "";
            this.countryParam.country = 7;
            this.getCountryList(this.countryParam);

        },
        selectConsignee: function() {
            this.createOrSelect = 1;
            if (this.param.customer) {
                this.consigneeParam.customerId = this.param.customer;
            }
            this.consigneeParam.show = true;
        },
        addBreed: function() {
            //价格只能输入之多两位小数
            if ((/\.\d{3,}/).test(this.breedInfo.price)) {
                this.breedInfo.price = this.breedInfo.price.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            if ((/\.\d{3,}/).test(this.breedInfo.costPrice)) {
                this.breedInfo.costPrice = this.breedInfo.costPrice.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            this.param.goods[this.param.goods.length - 1].breedId = this.breedInfo.breedId;
            this.param.goods[this.param.goods.length - 1].breedName = this.breedInfo.breedName;
            this.param.goods[this.param.goods.length - 1].title = this.breedInfo.breedName;
            this.param.goods[this.param.goods.length - 1].quality = this.breedInfo.quality;
            this.param.goods[this.param.goods.length - 1].location = this.breedInfo.location;
            this.param.goods[this.param.goods.length - 1].spec = this.breedInfo.spec;
            this.param.goods[this.param.goods.length - 1].number = this.breedInfo.number;
            this.param.goods[this.param.goods.length - 1].unit = this.breedInfo.unit;
            this.param.goods[this.param.goods.length - 1].price = this.breedInfo.price;
            this.param.goods[this.param.goods.length - 1].costPrice = this.breedInfo.costPrice;
            this.param.goods[this.param.goods.length - 1].sourceType = this.breedInfo.sourceType;
            this.param.goods[this.param.goods.length - 1].ship_addr = this.breedInfo.provinceId.id;
            this.breedInfo.status = 0;
            this.addParam.show = false;
            this.altogether += (parseFloat(this.param.goods[this.param.goods.length - 1].price) * parseFloat(this.param.goods[this.param.goods.length - 1].number) * 100) / 100;
            this.costmoney += (parseFloat(this.param.goods[this.param.goods.length - 1].costPrice) * parseFloat(this.param.goods[this.param.goods.length - 1].number) * 100) / 100;


        },
        showModifyBreed: function(index) {
            this.breedInfo.status = 2;
            this.updateParam.number = this.param.goods[index].number;
            this.updateParam.price = this.param.goods[index].price;
            this.updateParam.costPrice = this.param.goods[index].costPrice;
            this.updateParam.index = index;
            this.breedInfo.breedId = this.param.goods[index].breedId;
            this.breedInfo.breedName = this.param.goods[index].breedName;
            this.breedInfo.title = this.param.goods[index].title;
            this.breedInfo.quality = this.param.goods[index].quality;
            this.breedInfo.location = this.param.goods[index].location;
            this.breedInfo.spec = this.param.goods[index].spec;
            this.breedInfo.number = this.param.goods[index].number;
            this.breedInfo.unit = this.param.goods[index].unit;
            this.breedInfo.price = this.param.goods[index].price;
            this.breedInfo.costPrice = this.param.goods[index].costPrice;
            this.breedInfo.sourceType = this.param.goods[index].sourceType;
            this.breedParam.id = this.breedInfo.breedId
            this.getBreedDetail(this.breedParam)
            this.updateParam.show = true;
            this.altogether -= parseFloat(this.breedInfo.number) * parseFloat(this.breedInfo.price);
            this.costmoney -= parseFloat(this.breedInfo.number) * parseFloat(this.breedInfo.costPrice);
        },
        showAddBreed: function() {
            if (this.param.goods.length == 0 || this.param.goods[this.param.goods.length - 1].breedId != '') {
                this.breedInfo.status = 1;
                this.breedInfo.breedId = '';
                this.breedInfo.breedName = '';
                this.breedInfo.title = '';
                this.breedInfo.quality = '';
                this.breedInfo.location = '';
                this.breedInfo.spec = '';
                this.breedInfo.number = '';
                this.breedInfo.unit = '';
                this.breedInfo.price = '';
                this.breedInfo.provinceId = '';
                this.breedInfo.costPrice = 0;
                this.breedParam.id = ''
                if (this.param.type == 0) {
                    this.breedInfo.costPrice = 0;
                }
                this.breedInfo.sourceType = 0;
                this.param.goods.push({
                    breedId: '',
                    breedName: '',
                    title: '',
                    quality: '',
                    location: '',
                    spec: '',
                    number: '',
                    unit: '',
                    price: '',
                    costPrice: '',
                    sourceType: 0,
                    status: 1

                });
                this.addParam.show = true;
            }

        },
        deleteBreed: function(index) {
            this.altogether -= parseFloat(this.param.goods[index].number) * parseFloat(this.param.goods[index].price)
            this.costmoney -= parseFloat(this.param.goods[index].number) * parseFloat(this.param.goods[index].costPrice)
            this.param.goods.splice(index, 1);

        },
        cancelAddBreed: function() {
            this.param.goods.pop();
            this.breedInfo.status = 0;
            this.addParam.show = false;
        },
        modifyBreed: function() {
            //价格只能输入之多两位小数
            if ((/\.\d{3,}/).test(this.breedInfo.price)) {
                this.breedInfo.price = this.breedInfo.price.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            if ((/\.\d{3,}/).test(this.breedInfo.costPrice)) {
                this.breedInfo.costPrice = this.breedInfo.costPrice.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            this.param.goods[this.updateParam.index].breedId = this.breedInfo.breedId;
            this.param.goods[this.updateParam.index].breedName = this.breedInfo.breedName;
            this.param.goods[this.updateParam.index].title = this.breedInfo.breedName;
            this.param.goods[this.updateParam.index].quality = this.breedInfo.quality;
            this.param.goods[this.updateParam.index].location = this.breedInfo.location;
            this.param.goods[this.updateParam.index].spec = this.breedInfo.spec;
            this.param.goods[this.updateParam.index].number = this.breedInfo.number;
            this.param.goods[this.updateParam.index].unit = this.breedInfo.unit;
            this.param.goods[this.updateParam.index].price = this.breedInfo.price;
            this.param.goods[this.updateParam.index].costPrice = this.breedInfo.costPrice;
            this.param.goods[this.updateParam.index].sourceType = this.breedInfo.sourceType;
            this.param.goods[this.updateParam.index].ship_addr = this.breedInfo.provinceId.id;

            this.breedInfo.status = 0;
            this.updateParam.show = false;
            this.altogether += (parseFloat(this.param.goods[this.updateParam.index].number) * parseFloat(this.param.goods[this.updateParam.index].price) * 100) / 100;
            this.costmoney += (parseFloat(this.param.goods[this.updateParam.index].number) * parseFloat(this.param.goods[this.updateParam.index].costPrice) * 100) / 100;

        },
        cancelModifyBreed: function() {
            this.breedInfo.status = 0;
            this.updateParam.show = false;
            this.altogether += (parseFloat(this.updateParam.number) * parseFloat(this.updateParam.price) * 100) / 100;
            this.costmoney += (parseFloat(this.updateParam.number) * parseFloat(this.updateParam.costPrice) * 100) / 100;
            this.updateParam.number = 0;
            this.updateParam.price = 0;
        },
        selectBizType: function() {
            if (this.param.intl == 0) {

            }
            if (this.param.intl == 1) {}
        },
        confirm: function(param) {
            if (param.type == 0 && param.pre == 1) {
                this.tipsParam.show = true;
                this.tipsParam.name = "暂不支持预购订单！";
                return;
            }
            this.resetParam();
            this.param.country = this.country.id;
            this.param.province = this.province.id;
            this.param.city = this.city.id;
            this.param.district = this.district.id;
            this.param.show = false;
            this.param.consigneeAddr = param.consigneeAddr;
            //如果this.param.addressId = 0,则新增客户地址
            // if(param.intl == 1){
            //     this.param.pre = 0
            //     console.log(param)
            // }
            this.createOrder(this.param);

        },
        changeTotal: function() {
            var patt = new RegExp(/\.\d{3,}/);
            if (!this.param.freight) {
                this.param.freight = 0
            }
            if (!this.param.incidentals) {
                this.param.incidentals = 0
            }
            if (!this.param.preferential) {
                this.param.preferential = 0
            }
            if (patt.test(this.param.freight)) { //如果超过两位小数，则只保留前两位小数
                this.param.freight = this.param.freight.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            if (patt.test(this.param.incidentals)) { //如果超过两位小数，则只保留前两位小数
                this.param.incidentals = this.param.incidentals.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            if (patt.test(this.param.preferential)) { //如果超过两位小数，则只保留前两位小数
                this.param.preferential = this.param.preferential.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            if (patt.test(this.altogether)) { //如果超过两位小数，则只保留前两位小数
                this.altogether = this.altogether + '';
                this.altogether = this.altogether.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }
            if (patt.test(this.costmoney)) { //如果超过两位小数，则只保留前两位小数
                this.costmoney = this.costmoney + '';
                this.costmoney = this.costmoney.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/, '$1$2.$3');
            }

            //this.param.incidentals.replace(/^(\-)*(\d+)\.(\d\d)*$/,'$1$2.$3');
            this.param.total = (parseFloat(this.altogether) * 1000 + parseFloat(this.param.incidentals) * 1000 - parseFloat(this.param.preferential) * 1000) / 1000;
            this.param.cost = (parseFloat(this.costmoney) * 1000) / 1000;
            //如果是客户支付运费total=total+freight
            if (this.param.freightType == 1) {
                this.param.total = (parseFloat(this.param.total) * 1000 + parseFloat(this.param.freight) * 1000) / 1000;
            }
        }
    },
    watch: {
        'param.freightType': 'changeTotal',
        'param.freight': 'changeTotal',
        'param.incidentals': 'changeTotal',
        'param.preferential': 'changeTotal',
        'altogether': 'changeTotal',
        'costmoney': 'changeTotal',
    },
    events: {
        breed: function(breed) {
            if (this.param.intl == 1 && breed.eName) {
                this.breedInfo.breedName = breed.eName;
                this.breedInfo.breedId = breed.breedId;
                this.breedParam.breedName = breed.eName;
                this.breedParam.id = breed.breedId;
                this.getBreedDetail(this.breedParam);
            } else {
                this.breedInfo.breedName = breed.breedName;
                this.breedInfo.breedId = breed.breedId;
                this.breedParam.breedName = breed.breedName;
                this.breedParam.id = breed.breedId;
                this.getBreedDetail(this.breedParam);
            }
        },
        customer: function(customer) {
            this.param.customerName = customer.customerName;
            this.param.customerPhone = customer.customerPhone;
            this.param.consignee = customer.customerName;
            this.param.consigneePhone = customer.customerPhone;
            this.param.customer = customer.customerId;
        },
        supplier: function(item) {
            this.param.customer = this.supplierParam.customer;
            this.param.customerName = this.supplierParam.customerName;
            this.param.consignee = this.supplierParam.consignee;
            this.param.consigneePhone = this.supplierParam.consigneePhone;
        },
        address: function(address) {
            this.param.consignee = address.contactName;
            this.param.consigneePhone = address.contactPhone;

            this.country.id = address.country;
            this.country.cnameEn = address.countryName;
            this.province.id = address.province;
            this.province.cnameEn = address.provinceName;
            this.city.id = address.city;
            this.city.cnameEn = address.cityName;
            this.district.id = address.district;
            this.district.cname = address.districtName;
            this.param.consigneeAddr = address.detailAddr;
            this.param.addressId = address.id; //地址ID

        },
        selectEmpOrOrg: function(employee) {
            this.param.consigner = employee.employeeId;
            this.param.consignerName = employee.employeeName;

        }
    },
    created() {

        this.getCountryList(this.countryParam);
        this.getProvinceList(this.countryParam);
        this.getEmployeeList(this.orgParam);
        this.getUnitList();
        this.getCurrencyList();
        if (this.param.breedId) {
            this.breedParam.breedName = this.param.breedName;
            this.breedParam.id = this.param.breedId;
            this.getBreedDetail(this.breedParam);
        }
        if (this.param.goods.length > 0) {
            for (var i = 0; i < this.param.goods.length; i++) {
                this.altogether += parseFloat(this.param.goods[i].number) * parseFloat(this.param.goods[i].price);
                this.costmoney += parseFloat(this.param.goods[i].number) * parseFloat(this.param.goods[i].costPrice);
            }
            this.supplierParam.supplierName = this.param.customerName;
        }

        if (!this.param.tradeTime) {
            this.param.tradeTime = util.getDate(0, true);
        }
        this.initParam();
        if (this.param.type == 1) {
            this.orderType = '销售(sell)'
        } else {
            this.orderType = '采购(purchase)'
        }
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

.jinggao {
    color: red;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 100;
    font-size: 12px;
    height: 10px;
}

.edit_footer button {
    margin-left: 15px;
}

.table {
    display: table;
}
</style>

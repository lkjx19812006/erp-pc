<template>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
    <searchemg-model :param="employeeParam" v-if="employeeParam.show"></searchemg-model>
    <consignee-model :param="consigneeParam" v-if="consigneeParam.show"></consignee-model>
    <div v-show="param.show"  id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.change_order')}}</h3>
        </div>
      <validator name="validation">
          <div class="edit-model">
              <div class="clearfix">
                  <div class="editpage-input col-md-6">
                      <label class="editlabel">{{$t('static.order_type')}} <span class="system_danger" v-if="$validation.type.required">{{$t('static.select_order_type')}}</span></label>
                      <input v-show="false" type="text" class="form-control" v-model="param.type" v-validate:type="['required']" readonly="readonly"/>
                      <select  class="form-control edit-input" v-model="param.type"   >
                          <option value="0">{{$t('static.purchase')}}</option>
                          <option value="1">{{$t('static.sell')}}</option>
                      </select>
                  </div>
                  <div class="editpage-input col-md-6">
                      <label class="editlabel">{{$t('static.order_status')}}</label>
                      <select  class="form-control edit-input" v-model="param.orderStatus" >
                          <option value="0">{{$t('static.create_order')}}</option>
                          <!-- <option value="60">{{$t('static.awaiting_comment')}}</option> -->
                          <option value="70">{{$t('static.order_over')}}</option>
                      </select>
                  </div>
                  <div class="editpage-input col-md-6" v-if="param.type==1">
                    <label class="editlabel">选择发货人 <span class="system_danger" v-if="$validation.shipper.required">{{$t('static.required')}}</span></label>
                    <input  type="text" class="form-control edit-input"  v-model="employeeParam.consignerName"  v-validate:shipper="['required']" readonly="readonly" @click="selectEmployee(param.consigner,employeeParam.consignerName)"/>
                  </div>
              </div>
              <section class="editsection">
                  <div style="margin-top:20px;">
                     <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                     <h5 style="display:inline">{{$t('static.customer_info')}}</h5>

                     <!-- <a v-if="param.customerName" class="right" style="margin-right:40px;" @click="selectConsignee()">选择收货人信息</a> -->
                     <button v-if="param.customerName&&param.type==1" type="button" class="btn right" v-bind:class="{ 'btn-confirm': createOrSelect===1}" style="margin-right:40px;" @click="selectConsignee()">选择收货地址</button>

                     <!-- <a v-if="param.customerName" class="right" style="margin-right:20px;" @click="createConsignee()">新建收货人信息</a> -->
                     <button v-if="param.customerName&&param.type==1" type="button" class="btn right" v-bind:class="{ 'btn-confirm': createOrSelect===0}" style="margin-right:20px;" @click="createConsignee()">填写收货地址</button>

                  </div>
                  <div class="clearfix">
                        <div class="editpage-input col-md-4" v-if="param.type==1">
                            <label class="editlabel">{{$t('static.client_name')}} <span class="system_danger" v-if="$validation.custname.required">{{$t('static.choose_client')}}</span></label>
                            <input type="text" class="form-control edit-input" v-model="param.customerName"   v-validate:custname="['required']" value="{{param.customerName}}" readonly="true" @click="searchCustomer(param.customerName,param.customer)"/>
                        </div>
                        <div class="editpage-input col-md-4" v-if="param.type==0">
                            <label class="editlabel">供应商姓名</label>
                            <input type="text" class="form-control edit-input" v-model="param.customerName"   value="{{param.customerName}}" readonly="true" @click="searchCustomer(param.customerName,param.customer)"/>
                        </div>
                        <div class="editpage-input col-md-4">
                            <label class="editlabel">{{$t('static.international')}}</label>
                            <select type="text" class="form-control edit-input" v-model="param.intl"  @change="selectBizType()">
                                <option value="0" selected="true">{{$t('static.no')}}</option>
                                <option value="1">{{$t('static.yes')}}</option>
                            </select>
                        </div>
                        <div class="editpage-input col-md-4" >
                            <label class="editlabel">{{$t('static.currency')}}</label>
                             <select type="text" class="form-control edit-input"  v-model="param.currency"  value="{{param.currency}}" v-if="param.intl==0">
                                <option value="1" selected>CNY人民币</option>
                               <!--  <option value="1">是</option> -->
                            </select>
                            <select type="text" class="form-control edit-input"  v-model="param.currency"  value="{{param.currency}}" v-if="param.intl==1">
                                <option value="2" selected>USD美元</option>
                                <option  v-for="item in initCurrencylist" value="{{item.id}}">{{item.name}}{{item.cname}}</option>
                            </select>
                        </div>
                        <div class="editpage-input col-md-4">
                            <label class="editlabel" v-if="param.type==1">{{$t('static.consignee_name')}} <!-- <span class="system_danger" v-if="$validation.consignee.minlength">{{$t('static.enter_name')}}</span> --></label>
                            <label class="editlabel" v-if="param.type==0">发货人姓名</label>
                            <input type="text" class="form-control edit-input" v-model="param.consignee" value="{{param.consignee}}"  />
                        </div> 
                        <div class="editpage-input col-md-4" >
                            <label class="editlabel" v-if="param.type==1">{{$t('static.consignee_phone')}} <!--  <span class="system_danger" v-if="$validation.mobile.phone">{{$t('static.enter_phone')}}</span> --></label>
                            <label class="editlabel" v-if="param.type==0">发货人手机</label>
                            <input type="text" class="form-control edit-input" v-model="param.consigneePhone"  value="{{param.consigneePhone}}"/>
                        </div>  
                        
                        <div class="editpage-input col-md-4">
                            <label class="editlabel">{{$t('static.country')}}</label>
                            <div type="text" class="edit-input">
                                <v-select
                                   :debounce="250"
                                   :value.sync="country"
                                   :on-change="selectProvince"
                                   :options="initCountrylist"
                                   placeholder="国家/Country"
                                   label="cname"
                                  >
                                 </v-select>
                           </div>
                        </div>
                        <div class="editpage-input col-md-4">
                            <label class="editlabel">{{$t('static.province')}}</label>
                            <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_country_first')}}" />
                            <div v-if="country.cname" type="text" class="edit-input">
                                <v-select
                                  :debounce="250"
                                  :value.sync="province"
                                  :on-change="selectCity"
                                  :options="initProvince"
                                  placeholder="省/Province"
                                  label="cname">
                                </v-select>
                            </div>
                        </div>
                        <div class="editpage-input col-md-4">
                            <label class="editlabel">{{$t('static.city')}}</label>
                            <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_province_first')}}" />
                            <div v-if="province.cname" type="text" class="edit-input">
                                <v-select
                                     :debounce="250"
                                     :value.sync="city"
                                     :on-change="selectDistrict"
                                     :options="initCitylist"
                                     placeholder="市/City"
                                     label="cname"
                                >
                                </v-select>
                            </div>
                        </div>
                        <div class="editpage-input col-md-4">
                            <label class="editlabel">{{$t('static.area')}}</label>
                            <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_city_first')}}" />
                            <div v-if="city.cname" type="text" class="edit-input">
                                <v-select
                                      :debounce="250"
                                      :value.sync="district"
                                      :options="initDistrictlist"
                                      placeholder="区"
                                      label="cname">
                                </v-select>
                             </div>
                        </div>
                        <div class="editpage-input col-md-8" v-if="param.type==1">
                            <label class="editlabel">{{$t('static.detailed_address')}} <span class="system_danger" v-if="$validation.addr.required">{{$t('static.enter_address')}}</span></label>
                            <input type="text" class="form-control edit-input" v-model="param.consigneeAddr"    v-validate:addr="['required']" value="{{param.consigneeAdd}}" />
                        </div>
                        <div class="editpage-input col-md-8" v-if="param.type==0">
                            <label class="editlabel">{{$t('static.detailed_address')}}</label>
                            <input type="text" class="form-control edit-input" v-model="param.consigneeAddr" />
                        </div>
                        <div class="editpage-input col-md-4">
                            <label class="editlabel">{{$t('static.postcodes')}} <span class="system_danger" v-if="$validation.code.postcode">{{$t('static.enter_code')}}</span></label>
                            <input type="text" class="form-control edit-input" v-model="param.zipCode" v-validate:code="['postcode']" value="{{param.zipCode}}" />
                        </div>     
                  </div>
              </section>
              <div>
                 <div style="margin-top:20px;">
                     <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                     <h5 style="display:inline">{{$t('static.medicinal_material_information')}}</h5>
                  </div>
                  <table class="table table-hover table_color table-striped ">
                      <thead>
                         <tr>
                           <th>{{$t('static.headline')}}</th> 
                           <th>{{$t('static.breed')}}</th>
                           <th>{{$t('static.unit')}}</th>
                           <th>{{$t('static.price')}}</th>
                           <th>{{$t('static.cost_price')}}</th>
                           <th>{{$t('static.quality')}}</th>
                           <th>{{$t('static.quantity')}}</th> 
                           <th>{{$t('static.specification')}}</th> 
                           <th>{{$t('static.origin')}}</th> 
                           <th></th> 
                           <th></th>
                         </tr>
                      </thead>
                      <tbody>
                         <tr v-for="item in param.goods">
                             <td>{{item.title}}</td>
                             <td>{{item.breedName}}</td>
                             <td>{{item.unit | Unit}}</td>
                             <td>{{item.price}}</td>
                             <td>{{item.costPrice}}</td>
                             <td>{{item.quality}}</td>
                             <td>{{item.number}}</td>
                             <td>{{item.spec}}</td>
                             <td>{{item.location}}</td>
                             <td v-show="false">{{item.orderId}}</td>
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
                             <div class="editpageleft">
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.breed')}}<span class="system_danger" v-if="$inner.breedname.required">{{$t('static.required')}}</span></label>
                                     <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" v-validate:breedname="{required:true}"  @click="searchBreed()" readonly="true" />
                                </div>
                                <div class="editpage-input">
                                       <label class="editlabel" >{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                       <input type="text" v-show="false" v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}" disabled="disabled" />
                                       <select  class="form-control edit-input"  v-model="breedInfo.unit">
                                            <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}（{{item.ename}}）</option>
                                       </select>
                                  </div>
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.quality')}}</label>
                                     <input type="text" v-model="breedInfo.quality" class="form-control edit-input"  />
                                </div>
                         
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.specification')}}</label>
                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.spec" class="form-control edit-input"  disabled="disabled" placeholder="请先选择一个品种"/>
                                     <div type="text" class="edit-input" v-if="breedParam.id">
                                         <input-select
                                           :value.sync="breedInfo.spec"
                                           :prevalue="breedInfo.spec"
                                           :options="initBreedDetail.specs.arr"
                                           placeholder="规格"
                                           label="name"
                                         >
                                         </input-select>
                                     </div>
                                </div>
                             </div>
                         
                             <div class="editpageright">
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.quantity')}}<span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span></label>
                                       <div style="clear:both;height:36px;">
                                           <div class="left" style="width:45%;">
                                              <input type="number" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                                           </div>
                                           <div class="left" style="width:45%;">
                                              <select  class="form-control edit-input"  v-model="breedInfo.unit" disabled="true">
                                                  <option v-for="item in initUnitlist"  value="{{item.id}}">{{item.name}}({{item.ename}})</option>
                                              </select>
                                           </div>
                                       </div>
                                </div>
                         
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.price')}}<span class="system_danger" v-if="$inner.pack0.required">{{$t('static.required')}}</span></label>
                                     <div style="clear:both;height:36px;">
                                         <div class="left" style="width:45%;">
                                            <input type="number"  v-model="breedInfo.price" class="form-control edit-input" v-validate:pack0="{required:true}" />
                                         </div>
                                          
                                         <div class="left" style="width:45%;">
                                            <select  class="form-control edit-input"  v-model="breedInfo.unit" disabled="true">
                                                <option v-for="item in initUnitlist"  value="{{item.id}}">元/{{item.name}}({{item.ename}})</option>
                                            </select>
                                         </div>
                                     </div>
                                </div>
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.cost_price')}}<span class="system_danger" v-if="$inner.cost.required">{{$t('static.required')}}</span></label>
                                     <div style="clear:both;height:36px;">
                                         <div class="left" style="width:45%;">
                                            <input type="number"  v-model="breedInfo.costPrice" class="form-control edit-input" v-validate:cost="{required:true}" />
                                         </div>
                                         <div class="left" style="width:45%;">
                                            <select  class="form-control edit-input"  v-model="breedInfo.unit" disabled="true">
                                                <option v-for="item in initUnitlist"  value="{{item.id}}">元/{{item.name}}({{item.ename}})</option>
                                            </select>
                                         </div>
                                     </div>
                                </div>
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.origin')}}</label>
                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.location" class="form-control edit-input"  disabled="disabled" placeholder="请先选择一个品种"/>
                                     <div type="text" class="edit-input" v-if="breedParam.id">
                                         <input-select
                                           :prevalue="breedInfo.location"
                                           :value.sync="breedInfo.location"
                                           :options="initBreedDetail.locals.arr"
                                           placeholder="产地"
                                           label="name"
                                         >
                                         </input-select>
                                     </div>
                                </div>
                                <div style="margin-top:10px;text-align:right">
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
              <div class="clearfix">
                  <div style="margin-top:20px;">
                     <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                     <h5 style="display:inline">{{$t('static.other_info')}}</h5>
                  </div>
                  <div class="editpage-input col-md-6">
                        <label class="editlabel left">{{$t('static.preferential')}}：</label>
                        <div class="clearfix left">
                          <button class="btn btn-default left" style="font-size: 16px" @click="addCompute()">+</button>
                          <input type="number" class="edit-input" v-model="param.preferential" style="width:60%;display:inline-block;float:left;border:none;text-align: center;" value="{{param.preferential}}"/>
                          <button class="btn btn-default right" style="font-size: 16px" @click="reduce()">-</button>
                        </div>
                    </div>
                   
                    <div class="editpage-input col-md-6">
                        <label class="editlabel left">{{$t('static.sundry_fees')}}：</label>
                        <div class="clearfix left">
                          <button class="btn btn-default left" style="font-size: 16px" @click="addIncidentals()">+</button>
                          <input type="number" class="edit-input" v-model="param.incidentals" style="width:60%;display:inline-block;float:left;border:none;text-align: center;" value="{{param.incidentals}}" @keyup=""/>
                          <button class="btn btn-default right" style="font-size: 16px" @click="subduction()">-</button>
                        </div>
                    </div>
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">{{$t('static.discount_note')}}</label>
                       <input type="text" class="form-control edit-input" v-model="param.preferentialDesc" value="{{param.preferentialDesc}}"/>
                   </div>
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">{{$t('static.fee_explain')}}</label>
                       <input type="text" class="form-control edit-input" v-model="param.incidentalsDesc" value="{{param.incidentalsDesc}}"/>
                   </div>
                    <div class="editpage-input col-md-6">
                        <label class="editlabel">{{$t('static.total')}}</label>
                        <input type="text" class="form-control edit-input" v-model="param.total" readonly="true" />
                    </div>
                    <div class="editpage-input col-md-6">
                        <label class="editlabel">{{$t('static.cost_price')}}</label>
                        <input type="text" class="form-control edit-input" v-model="param.cost" readonly="true" />
                    </div>
                  <div class="editpage-input col-md-12">
                      <label class="editlabel">{{$t('static.comment')}}</label>
                      <textarea rows="5" class="form-control" v-model="param.comments" value="{{param.comments}}" style="resize:none;width:100%;"></textarea>
                  </div>
              </div>
          </div>
          <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
            <button type="button" class="btn  btn-confirm"  v-if="$validation.valid&&param.goods.length>0"  @click="confirm()">{{$t('static.confirm')}}</button>
            <button type="button" class="btn  btn-confirm" v-else  disabled="true">{{$t('static.confirm')}}</button>
          </div>
      </validator>
    </div>

</template>
<script>
import vSelect from  '../tools/vueSelect/components/Select'
import pressImage from '../imagePress'
import searchcustomerModel  from '../Intention/clientname'
import inputSelect from '../tools/vueSelect/components/inputselect'
import searchbreedModel  from '../Intention/breedsearch'
import searchemgModel from '../order/second_order/allEmployee'
import consigneeModel  from '../clientRelate/addressSearch'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initBreedDetail,
    initCurrencylist,
    initUnitlist
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getBreedDetail,
    getDistrictList,
    createOrder,
    alterOrder,
    getOrderDetail,
    getCurrencyList,
    getUnitList
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        searchcustomerModel,
        searchbreedModel,
        consigneeModel,
        inputSelect,
        searchemgModel,
        consigneeModel

    },
    props: ['param'],
    data() {
        return {
            countryParam:{
              loading:true,
              show:false,
              color: '#5dc596',
              size: '15px',
              cur: 1,
              all: 7
            },
            empNameParam:{
                show:false,
                customer:'',
                customerName:''
            },
            consigneeParam:{
                show:false,
                loading:true,
                link:'/customer/getAddress/',
                customerId:''
            },
            breedParam:{
                show:false,
                breedName:'',
                breedId:'',
                loading:false,
                id:''
            },
            employeeParam:{
              show:false,
              consigner:'',
              consignerName:''
            },
            breedInfo:{ 
              status:0,   //自定义状态，表示编辑框的状态，0表示收起(起始)状态，1表示add，2表示update，add或update结束后将status置为0
              breedId:'',
              breedName:'',
              title:'',
              quality:'',
              location:'',
              spec:'',
              number:'',
              unit:'',
              price:'',
              costPrice:'',
              id:''
            },
            consigneeParam:{
                show:false,
                loading:true,
                link:'/customer/getAddress/',
                customerId:''
            },
            addParam:{
              show:false,
              length:0
            },
            updateParam:{
              show:false,
              index:0,
              price:0,    //修改前,被修改条目的单价
              number:0,   //修改前,被修改条目的数量
            },
            country:{
              cname:'',
            },
            province:{
              cname:''
            },
            city:{
              cname:''
            },
            district:{
              cname:''
            },
            createOrSelect:0,     //选择还是新建客户收货地址,0新建,1选择
            saith:0, //点击按钮计算
            sum:0, //点击按钮计算
            altogether:0, //所有商品的总金额,
            costmoney:0, // 所有商品的成本总价
        }
    },
    vuex: {
        getters:{
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist,
            initBreedDetail,
            initCurrencylist,
            initUnitlist
        },
        actions:{
            getCountryList,
            getProvinceList,
            getCityList,
            getBreedDetail,
            getDistrictList,
            createOrder,
            alterOrder,
            getOrderDetail,
            getCurrencyList,
            getUnitList
        }
    },
    methods:{
        selectProvince:function(){
            console.log('selectProvince');
            this.province = '';
            this.city = '';
            this.district = '';
            if(this.country!=''&&this.country!=null){
              this.getProvinceList(this.country);
            }
        },
        selectEmployee:function(id,name){
           this.employeeParam.show = true;
           this.employeeParam.consigner= id;
           this.employeeParam.consignerName = name;
        },
        addCompute:function(){ //优惠增加
          var saith = 0;
          if(this.param.preferential&&this.param.preferential!=''){
             saith=parseFloat(this.param.preferential);
             saith +=1;
             this.param.preferential = saith;
          }else{
             this.param.preferential=0;
             saith=parseFloat(this.param.preferential);
             saith +=1;
             this.param.preferential = saith;
          }
        },
        reduce:function(){ //优惠减少
          var saith = 0;
          if(this.param.preferential&&this.param.preferential!=''&&this.param.preferential>0){
             saith=parseFloat(this.param.preferential);
             saith = (saith*1000 - 1000)/1000;
             this.param.preferential = saith;
          }else{
             this.param.preferential=0;
          }
          
        },
        addIncidentals:function(){ //杂费增加
          var saith = 0;
          if(this.param.incidentals&&this.param.incidentals!=''){
             saith=parseFloat(this.param.incidentals);
             saith +=1;
             this.param.incidentals = saith;
          }else{
             this.param.incidentals=0;
             saith=parseFloat(this.param.incidentals);
             saith +=1;
             this.param.incidentals = saith;
          }
        },
        subduction:function(){ //杂费减少
          var saith = 0;
          if(this.param.incidentals&&this.param.incidentals!=''&&this.param.incidentals>0){
             saith=parseFloat(this.param.incidentals);
             saith = (saith*1000 - 1000)/1000;
             this.param.incidentals = saith;
          }else{
             this.param.incidentals=0;
          }
        },
        selectCity:function(){
            this.city = '';
            this.district = '';
            if(this.province!=''&&this.province!=null){
              this.getCityList(this.province);
            }

        },
        selectDistrict:function(){
            this.district = '';
            if(this.city!=''&&this.city!=null){
              this.getDistrictList(this.city);
            }
        },
        searchBreed:function(breedName,breedId){
                this.breedParam.show=true;
                /*this.param.breedName = this.breedParam.breedName;
                this.param.breedId = this.breedParam.breedId;*/
          },
        searchCustomer:function(customerName,customer){
            this.empNameParam.show=true;
            /*if("employeeId" in this.param){
                this.empNameParam.employeeId = this.param.employeeId;
            }*/
        },
        selectConsignee:function(){
            this.createOrSelect = 1;
            this.consigneeParam.show=true;
        },
        createConsignee:function(){
            this.createOrSelect = 0;
            this.param.addressId = '';
            this.param.consignee = this.param.customerName;
            this.param.consigneePhone = this.param.customerPhone;
            this.param.consigneeAddr = "";
            this.country.cname = "中国";
            this.province.cname = "";
            this.city.cname = "";
            this.district.cname = "";
        },
        addBreed:function(){
          this.param.goods[this.param.goods.length-1].breedId = this.breedInfo.breedId;
          this.param.goods[this.param.goods.length-1].breedName = this.breedInfo.breedName;
          this.param.goods[this.param.goods.length-1].title = this.breedInfo.title;
          this.param.goods[this.param.goods.length-1].quality = this.breedInfo.quality;
          this.param.goods[this.param.goods.length-1].location = this.breedInfo.location;
          this.param.goods[this.param.goods.length-1].spec = this.breedInfo.spec;
          this.param.goods[this.param.goods.length-1].number = this.breedInfo.number;
          this.param.goods[this.param.goods.length-1].unit = this.breedInfo.unit;
          this.param.goods[this.param.goods.length-1].price = this.breedInfo.price;
          this.param.goods[this.param.goods.length-1].costPrice = this.breedInfo.costPrice;
          this.param.goods[this.param.goods.length-1].sourceType = this.breedInfo.sourceType;
          this.param.goods[this.param.goods.length-1].orderId = this.breedInfo.orderId;
          
          console.log(this.param.goods[this.param.goods.length-1]);
          this.breedInfo.status = 0;
          this.addParam.show = false; 
          this.altogether += (parseFloat(this.param.goods[this.param.goods.length-1].price)*parseFloat(this.param.goods[this.param.goods.length-1].number)*100)/100;
          this.costmoney += (parseFloat(this.param.goods[this.param.goods.length-1].costPrice)*parseFloat(this.param.goods[this.param.goods.length-1].number)*100)/100;
          console.log(this.altogether)
        },
        showModifyBreed:function(index){
          this.breedInfo.status = 2;
          this.updateParam.price = this.param.goods[index].price,
          this.updateParam.number = this.param.goods[index].number,
          this.updateParam.index = index;
          this.breedInfo.breedId=this.param.goods[index].breedId,
          this.breedInfo.breedName=this.param.goods[index].breedName,
          this.breedInfo.title=this.param.goods[index].title,
          this.breedInfo.quality=this.param.goods[index].quality,
          this.breedInfo.location=this.param.goods[index].location,
          this.breedInfo.spec=this.param.goods[index].spec,
          this.breedInfo.number=this.param.goods[index].number,
          this.breedInfo.unit=this.param.goods[index].unit,
          this.breedInfo.price=this.param.goods[index].price,
          this.breedInfo.costPrice=this.param.goods[index].costPrice,
          this.breedInfo.sourceType=this.param.goods[index].sourceType,
          this.breedInfo.id=this.param.goods[index].orderId,
          this.updateParam.show = true;
          this.altogether -=parseFloat(this.breedInfo.number)*parseFloat(this.breedInfo.price);
          this.costmoney -=parseFloat(this.breedInfo.number)*parseFloat(this.breedInfo.costPrice);
        },
        showAddBreed:function(){
          if(this.param.goods.length == 0||this.param.goods[this.param.goods.length-1].breedId != ''){
              this.breedInfo.status = 1;    
              this.breedInfo.breedId='';
              this.breedInfo.breedName='';
              this.breedInfo.title='';
              this.breedInfo.quality='';
              this.breedInfo.location='';
              this.breedInfo.spec='';
              this.breedInfo.number='';
              this.breedInfo.unit='';
              this.breedInfo.price='';
              this.breedInfo.costPrice='';
              this.breedInfo.sourceType=0;
              this.breedInfo.id='';
              this.param.goods.push({
                  breedId:'',
                  breedName:'',
                  title:'',
                  quality:'',
                  location:'',
                  spec:'',
                  number:'',
                  unit:'',
                  price:'',
                  costPrice:'',
                  sourceType:0,
                  status:1,
                  id:''
              });
              this.addParam.show = true;
          }  
          
        },
        deleteBreed:function(index){
          this.altogether -=parseFloat(this.param.goods[index].number)*parseFloat(this.param.goods[index].price);
          this.costmoney -=parseFloat(this.param.goods[index].number)*parseFloat(this.param.goods[index].costPrice);
          this.param.goods.splice(index,1);
        },
        cancelAddBreed:function(){
            this.param.goods.pop();
            this.breedInfo.status = 0;
            this.addParam.show = false; 
        },
        selectConsignee:function(){
            this.createOrSelect = 1;
            this.consigneeParam.show=true;
        },
        createConsignee:function(){
            this.createOrSelect = 0;
            this.param.addressId = '';
            this.param.consignee = this.param.customerName;
            this.param.consigneePhone = this.param.customerPhone;
            this.param.consigneeAddr = "";
            this.country.cname = "中国";
            this.province.cname = "";
            this.city.cname = "";
            this.district.cname = "";
        },
        modifyBreed:function(){
          this.param.goods[this.updateParam.index].breedId=this.breedInfo.breedId,
          this.param.goods[this.updateParam.index].breedName=this.breedInfo.breedName,
          this.param.goods[this.updateParam.index].title=this.breedInfo.breedName,
          this.param.goods[this.updateParam.index].quality=this.breedInfo.quality,
          this.param.goods[this.updateParam.index].location=this.breedInfo.location,
          this.param.goods[this.updateParam.index].spec=this.breedInfo.spec,
          this.param.goods[this.updateParam.index].number=this.breedInfo.number,
          this.param.goods[this.updateParam.index].unit=this.breedInfo.unit,
          this.param.goods[this.updateParam.index].price=this.breedInfo.price,
          this.param.goods[this.updateParam.index].costPrice=this.breedInfo.costPrice,
          this.param.goods[this.updateParam.index].sourceType=this.breedInfo.sourceType,
          /*this.param.goods[this.updateParam.index].status=this.breedInfo.status,*/
          this.param.goods[this.updateParam.index].orderId=this.breedInfo.id,
          this.breedInfo.status = 0;
          this.updateParam.show = false;
          this.altogether += (parseFloat(this.param.goods[this.updateParam.index].number)*parseFloat(this.param.goods[this.updateParam.index].price)*100)/100;
          this.costmoney += (parseFloat(this.param.goods[this.updateParam.index].number)*parseFloat(this.param.goods[this.updateParam.index].costPrice)*100)/100
          console.log(this.altogether)
        },
        cancelModifyBreed:function(){
          this.breedInfo.status = 0;
          this.updateParam.show = false; 
          this.altogether += (parseFloat(this.updateParam.number)*parseFloat(this.updateParam.price)*100)/100;
          this.costmoney += (parseFloat(this.updateParam.number)*parseFloat(this.updateParam.costPrice)*100)/100;
          this.updateParam.number = 0;
          this.updateParam.price = 0;
        },
        selectBizType:function(){
           console.log('addad');
           this.param.currency = '';
           if(this.param.intl==0){

           }
           if(this.param.intl==1){} 
        },
        confirm:function(){
            this.param.country = this.country.cname;
            this.param.province = this.province.cname;
            this.param.city = this.city.cname;
            this.param.district = this.district.cname;
            this.param.show=false;
            var temp=[];  
            for(var i=0;i<this.param.goodsBack.length;i++){
                var k = 0;
                for(var j=0;j<this.param.goods.length;j++){
                  if(this.param.goodsBack[i].id!=this.param.goods[j].id){
                      k++;
                  }
                  if(k==this.param.goods.length){
                    this.param.goodsBack[i].status = 0;
                    temp.push(this.param.goodsBack[i]);
                  }
                }
            }
            var _this = this;
            console.log(temp);
            temp.forEach(function(item){
              _this.param.goods.push(item);
            })
            console.log(this.param.goods);
            this.param.callback=this.param.callback;
            this.alterOrder(this.param);

        },
        changeTotal:function(){
          var patt=new RegExp(/\.\d{3,}/);
          if(!this.param.incidentals){
             this.param.incidentals=0
          }
          if(!this.param.preferential){
             this.param.preferential=0
          }
          if(patt.test(this.param.incidentals)){   //如果超过两位小数，则只保留前两位小数
              this.param.incidentals = this.param.incidentals.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
          }
          if(patt.test(this.param.preferential)){   //如果超过两位小数，则只保留前两位小数
              this.param.preferential = this.param.preferential.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
          }
          if(patt.test(this.altogether)){   //如果超过两位小数，则只保留前两位小数
              this.altogether = this.altogether + '';
              this.altogether = this.altogether.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
          }
          if(patt.test(this.costmoney)){   //如果超过两位小数，则只保留前两位小数
              this.costmoney = this.costmoney + '';
              this.costmoney = this.costmoney.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
          }
          this.param.total = (parseFloat(this.altogether)*1000+parseFloat(this.param.incidentals)*1000 - parseFloat(this.param.preferential)*1000)/1000;
          this.param.cost = (parseFloat(this.costmoney)*1000+parseFloat(this.param.incidentals)*1000 - parseFloat(this.param.preferential)*1000)/1000;
        }
    },
    watch:{
        'param.incidentals':'changeTotal',
        'param.preferential':'changeTotal',
        'altogether':'changeTotal',
        'costmoney':'changeTotal'
    },
    events:{
        breed:function(breed){
            this.breedInfo.breedName = breed.breedName;
            this.breedInfo.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
        },
        customer:function(customer){
            console.log(customer);
            this.param.customerName = customer.customerName;
            this.param.customer = customer.customerId;
            this.param.customerPhone = customer.customerPhone;
            this.param.consigneePhone = customer.customerPhone;
            this.param.customerEmail = customer.email;
            this.consigneeParam.customerId = customer.customerId;
        },
        address:function(address){
          console.log(address);
          this.param.consignee = address.contactName;
          this.param.consigneePhone = address.contactPhone;

          this.country.cname = address.country;
          this.province.cname = address.province;
          this.city.cname = address.city;
          this.district.cname = address.district;

          this.param.consigneeAddr = address.detailAddr;
          this.param.addressId = address.id;   //地址ID

        },
        selectEmpOrOrg:function(employee){
            console.log(employee)
            this.employeeParam.consigner = employee.employeeId;
            this.employeeParam.consignerName = employee.employeeName;
            this.param.consigner = this.employeeParam.consigner;

        }
    },
    created(){
        this.getCountryList(this.countryParam);
        this.getProvinceList(this.countryParam);
        this.getCurrencyList();
        this.getUnitList();
         if(this.param.customer){
            this.consigneeParam.customerId = this.param.customer;
         }
         //.getOrderDetail(this.param);   

         if(this.param.breedId){
            this.breedParam.breedName = this.param.breedName;
            this.breedParam.id = this.param.breedId;
            this.getBreedDetail(this.breedParam);
            console.log(this.breedParam)
          }
        if(this.param.country){
          this.countryParam.country=this.param.country;
          this.countryParam.province=this.param.province;
          this.countryParam.city=this.param.city;
          this.countryParam.district=this.param.district;
          this.country.cname=this.param.country;
          this.province.cname=this.param.province;
          this.city.cname=this.param.city;
          this.district.cname=this.param.district;
        }
        if(this.param.goods.length>0){
            for(var i=0;i < this.param.goods.length;i++){
                this.altogether +=parseFloat(this.param.goods[i].number)*parseFloat(this.param.goods[i].price);
                this.costmoney +=parseFloat(this.param.goods[i].number)*parseFloat(this.param.goods[i].costPrice);
            }
        }
        if(this.param.consigner){
          this.employeeParam.consignerName = this.param.consigner;
        }
    }
}
</script>
<style scoped>
.modal{
  z-index: 1083
}
.modal_con{
  z-index: 1083;
}
.top-title{
  position: fixed;
  width: 800px;
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
    margin-top: 50px;
}
.table{
  display: table;
}
</style>

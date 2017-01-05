<template>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
    <consignee-model :param="consigneeParam" v-if="consigneeParam.show"></consignee-model>
    
    <div v-show="param.show"  id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
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
                            <option value="0" selected>{{$t('static.create_order')}}</option>
                            <!-- <option value="60">{{$t('static.awaiting_comment')}}</option> -->
                            <option value="70">{{$t('static.order_over')}}</option>
                        </select>
                    </div>
                </div>
                <section class="editsection">
                    <div style="margin-top:20px;">
                       <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                       <h5 style="display:inline">{{$t('static.customer_info')}}</h5>
                       <!-- <a v-if="param.customerName" class="right" style="margin-right:40px;" @click="selectConsignee()">选择收货人信息</a> -->
                       <button v-if="param.customerName" type="button" class="btn right" v-bind:class="{ 'btn-confirm': createOrSelect===1}" style="margin-right:40px;" @click="selectConsignee()">选择收货地址</button>

                       <!-- <a v-if="param.customerName" class="right" style="margin-right:20px;" @click="createConsignee()">新建收货人信息</a> -->
                       <button v-if="param.customerName" type="button" class="btn right" v-bind:class="{ 'btn-confirm': createOrSelect===0}" style="margin-right:20px;" @click="createConsignee()">新建收货地址</button>

                    </div>
                    <div class="clearfix">
                        <div class="editpage-input col-md-4">
                            <label class="editlabel">{{$t('static.client_name')}} <span class="system_danger" v-if="$validation.custname.required">{{$t('static.required')}}</span></label>
                            <input type="text" class="form-control edit-input" v-model="param.customerName"   v-validate:custname="['required']" value="{{param.customerName}}" readonly="readonly" @click="searchCustomer(param.customerName,param.customer)"/>
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
                            </select>
                            <select type="text" class="form-control edit-input"  v-model="param.currency"  value="{{param.currency}}" v-if="param.intl==1">
                                <option value="2" selected>USD美元</option>
                                <option  v-for="item in initCurrencylist" value="{{item.id}}">{{item.name}}{{item.cname}}</option>
                            </select>
                        </div>
                        <!-- 收货人信息 -->
                        <div class="editpage-input col-md-4">
                            <label class="editlabel">{{$t('static.consignee_name')}} <!-- <span class="system_danger" v-if="$validation.consignee.minlength">{{$t('static.enter_name')}}</span> --></label>
                            <input type="text" class="form-control edit-input" v-model="param.consignee" value="{{param.customerName}}"  />
                        </div> 
                        <div class="editpage-input col-md-4" >
                            <label class="editlabel">{{$t('static.consignee_phone')}} <!--  <span class="system_danger" v-if="$validation.mobile.phone">{{$t('static.enter_phone')}}</span> --></label>
                            <input type="text" class="form-control edit-input" v-model="param.consigneePhone"  value="{{param.customerPhone}}"/>
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
                        <div class="editpage-input col-md-8">
                            <label class="editlabel">{{$t('static.detailed_address')}} <span class="system_danger" v-if="$validation.addr.required">{{$t('static.enter_address')}}</span></label>
                            <input type="text" class="form-control edit-input" v-model="param.consigneeAddr"    v-validate:addr="['required']" value="{{param.consigneeAdd}}" />
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
                               <td>{{item.quality}}</td>
                               <td>{{item.number}}</td>
                               <td>{{item.spec}}</td>
                               <td>{{item.location}}</td>
                               <td v-if="breedInfo.status==0||breedInfo.status==2" @click="showModifyBreed($index)"><a>{{$t('static.edit')}}</a></td>
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
                                             placeholder="规格/Specification"
                                             label="name"
                                           >
                                           </input-select>
                                       </div>
                                  </div>
                               </div>
                               <div class="editpageright">                                                          
                                  <div class="editpage-input">
                                       <label class="editlabel" >{{$t('static.quantity')}}<span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span></label>
                                       <input type="number" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                                  </div>
                           
                                  <div class="editpage-input">
                                       <label class="editlabel" >{{$t('static.price')}}<span class="system_danger" v-if="$inner.pack0.required">{{$t('static.required')}}</span></label>
                                       <input type="number"  v-model="breedInfo.price" class="form-control edit-input" v-validate:pack0="{required:true}" />
                                  </div>
                                  <div class="editpage-input">
                                       <label class="editlabel" >{{$t('static.headline')}}</label>
                                       <input type="text" v-model="breedInfo.title" class="form-control edit-input" value="{{breedInfo.breedName}}"/>
                                  </div>
                                  <div class="editpage-input">
                                       <label class="editlabel" >{{$t('static.origin')}}</label>
                                       <input type="text" v-show="!breedParam.id" v-model="breedInfo.location" class="form-control edit-input"  disabled="disabled" placeholder="请先选择一个品种"/>
                                       <div type="text" class="edit-input" v-if="breedParam.id">
                                           <input-select
                                             :prevalue="breedInfo.location"
                                             :value.sync="breedInfo.location"
                                             :options="initBreedDetail.locals.arr"
                                             placeholder="产地/Origin"
                                             label="name"
                                           >
                                           </input-select>
                                       </div>
                                  </div>
                           
                                  <div style="margin-top:10px;text-align:right">
                                      <button type="button" class="btn btn-confirm" v-if="breedInfo.status==1" @click="cancelAddBreed()">{{$t('static.cancel')}}
                                          <!-- <div v-if="breedInfo.status==1" @click="cancelAddBreed()"></div> -->
                                          <!-- <div v-if="breedInfo.status==2" @click="cancelModifyBreed()">{{$t('static.cancel')}}</div> -->
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
                    <div class="editpage-input col-md-12">
                        <label class="editlabel">{{$t('static.comment')}}</label>
                        <textarea rows="5" class="form-control" v-model="param.comments" value="{{param.comments}}" style="resize: none;width:100%;"></textarea>
                    </div>
                </div>
            </div>
            <div class="edit_footer">
              <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
              <button type="button" class="btn  btn-confirm"  v-if="$validation.valid&&$inner.valid&&param.goods.length>0&&param.goods[param.goods.length-1].breedId!=''"  @click="confirm(param)">{{$t('static.confirm')}}</button>
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
    getUnitList,
    getCurrencyList
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        searchcustomerModel,
        searchbreedModel,
        consigneeModel,
        inputSelect
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
                customerName:'',
                customerPhone:''
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
              price:''
            },
            addParam:{
              show:false,
              length:0
            },
            updateParam:{
              show:false,
              index:0
            },
            country:{
              id:'',
              cname:'',
            },
            province:{
              id:'',
              cname:''
            },
            city:{
              id:'',
              cname:''
            },
            district:{
              id:'',
              cname:''
            },
            createOrSelect:0,     //选择还是新建客户收货地址,0新建,1选择
            saith:0, //点击按钮计算
            sum:0, //点击按钮计算
            altogether:0, //所有商品的总金额
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
            getUnitList,
            getCurrencyList
        }
    },
    methods:{
        selectProvince:function(){
            console.log('selectProvince');
            this.province = {
              id:'',
              cname:''
            };
            this.city = {
              id:'',
              cname:''
            };
            this.district = {
              id:'',
              cname:''
            };
            if(this.country!=''&&this.country!=null){
              this.getProvinceList(this.country);
            }
        },
        selectCity:function(){
            this.city = {
              id:'',
              cname:''
            };
            this.district = {
              id:'',
              cname:''
            };
            if(this.province!=''&&this.province!=null){
              this.getCityList(this.province);
            }

        },
        selectDistrict:function(){
            this.district = {
              id:'',
              cname:''
            };
            if(this.city!=''&&this.city!=null){
              this.getDistrictList(this.city);
            }

        },
        addCompute:function(){ //优惠增加
          var saith = 0;
          if(this.param.preferential&&this.param.preferential!=''){
             saith=parseFloat(this.param.preferential);
             saith = (saith*1000+1000)/1000;
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
             saith = (saith*1000+1000)/1000;
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
        
        searchBreed:function(breedName,breedId){
            this.breedParam.show=true;
        },
        searchCustomer:function(customerName,customer){
            this.empNameParam.show=true;
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
          //价格只能输入之多两位小数
          if((/\.\d{3,}/).test(this.breedInfo.price)){
              this.breedInfo.price = this.breedInfo.price.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
          }
          this.param.goods[this.param.goods.length-1].breedId = this.breedInfo.breedId;
          this.param.goods[this.param.goods.length-1].breedName = this.breedInfo.breedName;
          this.param.goods[this.param.goods.length-1].title = this.breedInfo.title;
          this.param.goods[this.param.goods.length-1].quality = this.breedInfo.quality;
          this.param.goods[this.param.goods.length-1].location = this.breedInfo.location;
          this.param.goods[this.param.goods.length-1].spec = this.breedInfo.spec;
          this.param.goods[this.param.goods.length-1].number = this.breedInfo.number;
          this.param.goods[this.param.goods.length-1].unit = this.breedInfo.unit;
          this.param.goods[this.param.goods.length-1].price = this.breedInfo.price;
          this.param.goods[this.param.goods.length-1].sourceType = this.breedInfo.sourceType;
          console.log(this.param.goods[this.param.goods.length-1]);
          this.breedInfo.status = 0;
          this.addParam.show = false; 
          this.altogether += (parseFloat(this.param.goods[this.param.goods.length-1].price)*parseFloat(this.param.goods[this.param.goods.length-1].number)*100)/100
          console.log(this.altogether)
        },
        showModifyBreed:function(index){
          this.breedInfo.status = 2;
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
          this.breedInfo.sourceType=this.param.goods[index].sourceType,
          this.updateParam.show = true;
          this.altogether -=parseFloat(this.breedInfo.number)*parseFloat(this.breedInfo.price);
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
              this.breedInfo.sourceType=0;
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
                  sourceType:0
              });
              this.addParam.show = true;
          }  
          
        },
        deleteBreed:function(index){
           this.altogether -=parseFloat(this.param.goods[index].number)*parseFloat(this.param.goods[index].price)
           this.param.goods.splice(index,1);

        },
        cancelAddBreed:function(){
            this.param.goods.pop();
            this.breedInfo.status = 0;
            this.addParam.show = false; 
        },
        modifyBreed:function(){
          //价格只能输入之多两位小数
          if((/\.\d{3,}/).test(this.breedInfo.price)){
              this.breedInfo.price = this.breedInfo.price.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
          }
          this.param.goods[this.updateParam.index].breedId=this.breedInfo.breedId,
          this.param.goods[this.updateParam.index].breedName=this.breedInfo.breedName,
          this.param.goods[this.updateParam.index].title=this.breedInfo.title,
          this.param.goods[this.updateParam.index].quality=this.breedInfo.quality,
          this.param.goods[this.updateParam.index].location=this.breedInfo.location,
          this.param.goods[this.updateParam.index].spec=this.breedInfo.spec,
          this.param.goods[this.updateParam.index].number=this.breedInfo.number,
          this.param.goods[this.updateParam.index].unit=this.breedInfo.unit,
          this.param.goods[this.updateParam.index].price=this.breedInfo.price,
          this.param.goods[this.updateParam.index].sourceType=this.breedInfo.sourceType,
          this.breedInfo.status = 0;
          this.updateParam.show = false;
          console.log(this.param.goods[this.updateParam.index].price);
          console.log(this.param.goods[this.updateParam.index].number);
          this.altogether += (parseFloat(this.param.goods[this.updateParam.index].number)*parseFloat(this.param.goods[this.updateParam.index].price)*100)/100
          console.log(this.altogether)
        },
        cancelModifyBreed:function(){
          this.breedInfo.status = 0;
          this.updateParam.show = false; 
        },
        selectBizType:function(){
           console.log('addad');
           this.param.currency = '';
           if(this.param.intl==0){

           }
           if(this.param.intl==1){} 
        },
        confirm:function(param){
            this.param.country = this.country.cname;
            this.param.province = this.province.cname;
            this.param.city = this.city.cname;
            this.param.district = this.district.cname;
            this.param.show=false;
            //如果this.param.addressId = 0,则新增客户地址
            console.log(this.param);
            this.param.callback = this.param.callback;
            this.createOrder(this.param);
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
            console.log(this.param.incidentals);
            //this.param.incidentals.replace(/^(\-)*(\d+)\.(\d\d)*$/,'$1$2.$3');
            this.param.total = (parseFloat(this.altogether)*1000+parseFloat(this.param.incidentals)*1000 - parseFloat(this.param.preferential)*1000)/1000;
        }
    },
    watch:{
        'param.incidentals':'changeTotal',
        'param.preferential':'changeTotal',
        'altogether':'changeTotal',
    },
    events:{
        breed:function(breed){
            this.breedInfo.breedName = breed.breedName;
            this.breedInfo.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
        },
        customer:function(customer){
            this.param.customerName = customer.customerName;
            this.param.customerPhone = customer.customerPhone;
            this.param.customer = customer.customerId;
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

          this.param.consigneeAddr = address.address;
          this.param.addressId = address.id;   //地址ID
        }
    },
    created(){
        this.getCountryList(this.countryParam);
        this.getProvinceList(this.countryParam);
        this.getUnitList();
        this.getCurrencyList();
        console.log(this.param);
         if(this.param.customer){
            this.consigneeParam.customerId = this.param.customer;
         }
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
    }
}
</script>
<style scoped>
.modal{
  z-index: 1083
}
.modal_con{
  z-index: 1083;
  top:45px;
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
    margin-top: 0px;
}

.edit_footer button {
    margin-left: 15px;
}

.table{
  display: table;
}
</style>

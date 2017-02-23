<template>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
    <searchemg-model :param="employeeParam" v-if="employeeParam.show"></searchemg-model>
    <tip-model :param="tipParam" v-if="tipParam.show"></tip-model>
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
               <div>
                 <div style="margin-bottom:10px;">
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
                           <!-- <th>{{$t('static.cost_price')}}</th> -->
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
                             <!-- <td>{{item.costPrice}}</td> -->
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
                                     <input type="text"  v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}"  v-show="false"/>
                                     <select v-model="breedInfo.unit" class="form-control edit-input" >
                                          <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}({{item.ename}})</option>
                                     </select>
                                </div>
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.quality')}}</label>
                                     <input type="text" v-model="breedInfo.quality" class="form-control edit-input"  />
                                </div>
                         
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.specification')}}</label>
                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.spec" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种"/>
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
                                     <div style="clear:both;height:36px;">
                                       <div class="left" style="width:45%;">
                                          <input type="number" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                                       </div>
                                       <div class="left" style="width:45%;">
                                          <select  class="form-control edit-input"  v-model="breedInfo.unit" disabled="true">
                                              <option v-for="item in initUnitlist"  value="{{item.id}}">元/{{item.name}}({{item.ename}})</option>
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
                                <!-- 成本价格，国际部不应该看到 -->
                                <!-- <div class="editpage-input">
                                    <label class="editlabel" >{{$t('static.cost_price')}}<span class="system_danger" v-if="$inner.cost.required">{{$t('static.required')}}</span></label>
                                    <div style="clear:both;height:36px;">
                                       <div class="left" style="width:45%;">
                                          <input type="text" v-model="breedInfo.costPrice" class="form-control edit-input" v-validate:cost="{required:true}" />
                                       </div>
                                       <div class="left" style="width:45%;">
                                          <select  class="form-control edit-input"  v-model="breedInfo.unit" disabled="true">
                                              <option v-for="item in initUnitlist"  value="{{item.id}}">元/{{item.name}}({{item.ename}})</option>
                                          </select>
                                       </div>
                                    </div>
                                </div> -->
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.origin')}}</label>
                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.location" class="form-control edit-input"  disabled="disabled" placeholder="请先选择一个品种"/>
                                     <div type="text" class="edit-input" v-if="breedParam.id">
                                         <input-select
                                           :prevalue="breedInfo.location"
                                           :value.sync="breedInfo.location"
                                           :options="initBreedDetail.locals.arr"
                                           placeholder="产地/origin"
                                           label="name"
                                         >
                                         </input-select>
                                     </div>

                                </div>
                                <div style="margin-top:50px;text-align:right">
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
              <section class="editsection">
                  <div style="margin-top:20px;">
                     <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                     <h5 style="display:inline">{{$t('static.customer_info')}}</h5>
                  </div>
                  <div class="editpage">
                      <div class="editpageleft">
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.order_status')}}</label>
                              <select  class="form-control edit-input" v-model="param.orderStatus" >
                                  <option value="0" selected>{{$t('static.create_order')}}</option>
                                  <option value="60">{{$t('static.awaiting_comment')}}</option>
                                  <option value="70">{{$t('static.order_over')}}</option>
                              </select>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.client_name')}} <span class="system_danger" v-if="$validation.custname.required">{{$t('static.choose_client')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.customerName"   v-validate:custname="['required']" value="{{param.customerName}}" disabled="true" @click="searchCustomer(param.customerName,param.customer)"/>
                          </div>
                           <div class="editpage-input">
                              <label class="editlabel">{{$t('static.consignee_name')}} <span class="system_danger" v-if="$validation.consignee.minlength">{{$t('static.enter_name')}}</span></label>
                              <input type="text"  class="form-control edit-input" v-model="param.consignee" value="{{param.customerName}}" v-validate:consignee="{minlength:2}" />
  
                          </div>
                          <!-- <div class="editpage-input">
                              <label class="editlabel">{{$t('static.client_email')}} <span class="system_danger" v-if="$validation.you.email">请输入正确的邮箱</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.email"  v-validate:you="['email']" />
                          </div> -->
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.country')}}</label>
                              <!-- <select type="text" class="form-control edit-input" v-model="param.country">
                                  <option v-for="item in initCountrylist">{{item.nameEn}}{{item.cname}}</option>
                              </select> -->
                              <div type="text" class="edit-input">
                                  <v-select
                                     :debounce="250"
                                     :value.sync="country"
                                     :on-change="selectProvince"
                                     :options="initCountrylist"
                                     placeholder="国家/country"
                                     label="cnameEn"
                                    >
                                   </v-select>
                             </div>
                          </div>
                      
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.postcodes')}} <span class="system_danger" v-if="$validation.code.postcode">{{$t('static.postcodes')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.zipCode" v-validate:code="['postcode']" value="{{param.zipCode}}" />
                          </div>
                           
                          <div class="editpage-input clearfix">
                              <label class="editlabel">{{$t('static.preferential')}}</label>
                              <div class="clearfix left">
                                <button class="btn btn-default left" style="font-size: 16px" @click="addCompute()">+</button>
                                <input type="number" class="edit-input" v-model="param.preferential" style="width:60%;display:inline-block;float:left;border:none;text-align: center;" value="{{param.preferential}}"/>
                                <button class="btn btn-default right" style="font-size: 16px" @click="reduce()">-</button>
                              </div>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.discount_note')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.preferentialDesc" value="{{param.preferentialDesc}}"/>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.total')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.total" readonly="true" />
                          </div>
                          
                      </div>
                      <div class="editpageright">
                          <div class="editpage-input" v-if="param.type==1">
                            <label class="editlabel">选择发货人 <span class="system_danger" v-if="$validation.shipper.required">选择发货人</span></label>
                            <input  type="text" class="form-control edit-input" v-model="employeeParam.consignerName" v-validate:shipper="['required']" readonly="readonly" @click="selectEmployee(param.consigner,employeeParam.consignerName)"/>
                          </div>  
                          <!-- <div class="editpage-input">
                              <label class="editlabel">{{$t('static.client_phone')}} <span class="system_danger" v-if="$validation.custtel.required">{{$t('static.required')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.customerPhone"   v-validate:custtel="['required']" value="{{param.customerPhone}}" disabled="true"/>
                          </div> -->
                          <div class="editpage-input"  v-if="param.different=='国际'">
                              <label class="editlabel">{{$t('static.consignee_phone')}}  <span class="system_danger" v-if="$validation.intl.intlphone">{{$t('static.enter_phone')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.consigneePhone"  v-validate:intl="['intlphone']" value="{{param.customerPhone}}"/>
                          </div>
                          <div class="editpage-input" v-else>
                              <label class="editlabel">{{$t('static.consignee_phone')}} {{param.customerPhone}} <span class="system_danger" v-if="$validation.mobile.phone">{{$t('static.enter_phone')}}</span></label>
                              <input type="text"  class="form-control edit-input" v-model="param.consigneePhone"   value="{{param.customerPhone}}"/>
                          </div>
                        
                          <div class="editpage-input" >
                              <label class="editlabel">{{$t('static.currency')}} </label>
                               <select type="text" class="form-control edit-input"  v-model="param.currency"  value="{{param.currency}}" v-if="param.intl==0">
                                  <option value="0" selected>CNY人民币</option>
                                 <!--  <option value="1">是</option> -->
                              </select>
                              <select type="text" class="form-control edit-input"  v-model="param.currency"   value="{{param.currency}}" v-if="param.intl==1">
                                  <option value="0">CNY人民币</option>
                                  <option value="1" selected>USD美元</option>
                                  <option value="2">EUR欧元</option>
                                  <option value="3">HKD港币</option>
                                  <option value="4">GBP英镑</option>
                                  <option value="5">JPY日元</option>
                                  <option value="6">KRW韩元</option>
                                  <option value="7">CAD加元</option>
                                  <option value="8">AUD澳元</option>
                                  <option value="9">CHF瑞郎</option>
                                  <option value="10">SGD新加坡元</option>
                                  <option value="11">MYR马来西亚币</option>
                                  <option value="12">IDR印尼</option>
                                  <option value="13">NZD新西兰</option>
                                  <option value="14">VND越南</option>
                                  <option value="15">THB泰铢</option>
                                  <option value="16">PHP菲律宾</option>
                              </select>
                          </div>
                          <!-- <div class="editpage-input">
                              <label class="editlabel">{{$t('static.sample_order')}}</label>
                              <select type="text" class="form-control edit-input" v-model="param.sample" value="{{param.sample}}" >
                                  <option value="0" selected>{{$t('static.no')}}</option>
                                  <option value="1">{{$t('static.yes')}}</option>
                              </select>
                          </div> -->
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.city')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.city" placeholder="{{$t('static.city')}}">
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.detailed_address')}} <span class="system_danger" v-if="$validation.addr.required">{{$t('static.enter_address')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.consigneeAddr"    v-validate:addr="['required']" value="{{param.consigneeAdd}}" />
                          </div>
                          <div class="editpage-input clearfix">
                              <label class="editlabel">{{$t('static.sundry_fees')}}</label>
                              <div class="clearfix left">
                                <button class="btn btn-default left" style="font-size: 16px" @click="addIncidentals()">+</button>
                                <input type="number" class="edit-input" v-model="param.incidentals" style="width:60%;display:inline-block;float:left;border:none;text-align: center;" value="{{param.incidentals}}" @keyup=""/>
                                <button class="btn btn-default right" style="font-size: 16px" @click="subduction()">-</button>
                              </div>
                          </div>
                          
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.fee_explain')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.incidentalsDesc" value="{{param.incidentalsDesc}}"/>
                          </div>

                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.comment')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.comments" value="{{param.comments}}"/>
                          </div>
                          <!-- <div class="editpage-input">
                              <label class="editlabel">{{$t('static.cost_price')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.cost" readonly="true" />
                          </div> -->
                         
                      </div>
                  </div>
              </section>
             
          </div>
          <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
            <button type="button" class="btn  btn-confirm"  v-if="$validation.valid&&param.goods.length>0&&param.goods[param.goods.length-1].breedId!=''"  @click="confirm(param)">{{$t('static.confirm')}}</button>
            <button type="button" class="btn  btn-confirm" v-else  disabled="true">{{$t('static.confirm')}}</button>
          </div>
      </validator>
    </div>

</template>
<script>
import vSelect from  '../tools/vueSelect/components/Select'
import pressImage from '../imagePress'
import searchcustomerModel  from  '../Intention/clientname'
import inputSelect from '../tools/vueSelect/components/inputselect'
import tipModel from '../tips/tipDialog'
import searchbreedModel  from '../Intention/breedsearch'
import searchemgModel from '../order/second_order/allEmployee'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initBreedDetail,
    initIntlIntentionDetail,
    initUnitlist,
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getBreedDetail,
    getDistrictList,
    createOrder,
    getUnitList,
    getIntlIntentionDetail
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        searchcustomerModel,
        searchbreedModel,
        tipModel,
        inputSelect,
        searchemgModel
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
              price:'',
              costPrice:'',
              sourceType:1
            },
            addParam:{
              show:false,
              length:0
            },
            updateParam:{
              show:false,
              number:'',
              price:'',
              index:0
            },
            tipParam:{
              show:false,
              name:"The Price Is Required!!!",
              alert:true
            },
            employeeParam:{
              show:false,
              consigner:'',
              consignerName:''
            },
            country:{
              cname:'',
              nameEn:'',
              cnameEn:''
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
            saith:0, //点击按钮计算
            sum:0, //点击按钮计算
            altogether:"", //所有商品的总金额,
            //costmoney:0, //所有商品成本的总金额
        }
    },
    vuex: {
        getters:{
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist,
            initBreedDetail,
            initIntlIntentionDetail,
            initUnitlist
        },
        actions:{
            getCountryList,
            getProvinceList,
            getCityList,
            getBreedDetail,
            getDistrictList,
            createOrder,
            getIntlIntentionDetail,
            getUnitList
        }
    },
    methods:{
        selectProvince:function(){
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
        addCompute:function(){ //优惠增加
          if(this.altogether===""){
             this.altogether = this.param.itemsTotal;
          }
          
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
          if(this.altogether===""){
             this.altogether = this.param.itemsTotal;
          }
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
          if(this.altogether===""){
             this.altogether = this.param.itemsTotal;
          }
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
          if(this.altogether===""){
             this.altogether = this.param.itemsTotal;
          }
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
                /*this.param.breedName = this.breedParam.breedName;
                this.param.breedId = this.breedParam.breedId;*/
          },
        searchCustomer:function(customerName,customer){
            this.empNameParam.show=true;
            /*if("employeeId" in this.param){
                this.empNameParam.employeeId = this.param.employeeId;
            }*/
        },
        addBreed:function(){

          this.param.goods[this.param.goods.length-1].breedId = this.breedInfo.breedId;
          this.param.goods[this.param.goods.length-1].breedName = this.breedInfo.breedName;
          this.param.goods[this.param.goods.length-1].title = this.breedInfo.breedName;
          this.param.goods[this.param.goods.length-1].quality = this.breedInfo.quality;
          this.param.goods[this.param.goods.length-1].location = this.breedInfo.location;
          this.param.goods[this.param.goods.length-1].spec = this.breedInfo.spec;
          this.param.goods[this.param.goods.length-1].number = this.breedInfo.number;
          this.param.goods[this.param.goods.length-1].unit = this.breedInfo.unit;
          this.param.goods[this.param.goods.length-1].price = this.breedInfo.price;
          this.param.goods[this.param.goods.length-1].costPrice = this.breedInfo.costPrice;
          this.param.goods[this.param.goods.length-1].sourceType = this.breedInfo.sourceType;
          
          this.breedInfo.status = 0;
          this.addParam.show = false; 
          this.altogether += (parseFloat(this.param.goods[this.param.goods.length-1].price)*parseFloat(this.param.goods[this.param.goods.length-1].number)*1000)/1000;
          /*this.costmoney += (parseFloat(this.param.goods[this.param.goods.length-1].costPrice)*parseFloat(this.param.goods[this.param.goods.length-1].number)*1000)/1000;*/
          
        },
        showModifyBreed:function(index){
          if(this.param.goods[index].costPrice==undefined){
            this.param.goods[index].costPrice=0;
          }
          
          if(this.altogether===""){
             this.altogether = this.param.itemsTotal;
          }
          this.breedInfo.status = 2;
          this.updateParam.index = index;
          this.breedInfo.breedId=this.param.goods[index].breedId;
          this.breedInfo.breedName=this.param.goods[index].breedName;
          this.breedInfo.title=this.param.goods[index].title;
          this.breedInfo.quality=this.param.goods[index].quality;
          this.breedInfo.location=this.param.goods[index].location;
          this.breedInfo.spec=this.param.goods[index].spec;
          this.breedInfo.number=this.param.goods[index].number;
          this.breedInfo.unit=this.param.goods[index].unit;
          this.breedInfo.price=this.param.goods[index].price;
          this.breedInfo.costPrice=this.param.goods[index].costPrice;
          this.breedInfo.sourceType=this.param.goods[index].sourceType;

          this.updateParam.number = this.param.goods[index].number;
          this.updateParam.price = this.param.goods[index].price;
          this.updateParam.show = true;
       
          this.altogether -=parseFloat(this.breedInfo.number)*parseFloat(this.breedInfo.price);
          //this.costmoney -=parseFloat(this.breedInfo.number)*parseFloat(this.breedInfo.costPrice);

          /*if(this.param.goods[index].price==''||this.param.goods[index].price==null){
            this.breedInfo.price=0;
             this.altogether -=parseFloat(this.breedInfo.number)*parseFloat(this.breedInfo.price);
          }
          this.costmoney -=parseFloat(this.breedInfo.number)*parseFloat(this.breedInfo.costPrice);*/
        },
        showAddBreed:function(){
          if(this.altogether===""){
             this.altogether = this.param.itemsTotal;
          }
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
              this.breedInfo.costPrice=0;
              this.breedInfo.price='';
              this.breedInfo.sourceType=1;
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
                  sourceType:1
              });
              this.addParam.show = true;
          }  
          
        },
        deleteBreed:function(index){
           if(this.altogether===""){
             this.altogether = this.param.itemsTotal;
           }
           this.altogether -=parseFloat(this.param.goods[index].number)*parseFloat(this.param.goods[index].price);
           //this.costmoney -=parseFloat(this.param.goods[index].number)*parseFloat(this.param.goods[index].costPrice);
           this.param.goods.splice(index,1);
        },
        cancelAddBreed:function(){
            this.param.goods.pop();
            this.breedInfo.status = 0;
            this.addParam.show = false; 
        },
        modifyBreed:function(){

          if((/\.\d{3,}/).test(this.breedInfo.price)){
              this.breedInfo.price = this.breedInfo.price.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
          }
          if((/\.\d{3,}/).test(this.breedInfo.costPrice)){
              this.breedInfo.costPrice = this.breedInfo.costPrice.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
          }
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
          this.breedInfo.status = 0;
          this.updateParam.show = false;
          
          this.altogether += (parseFloat(this.param.goods[this.updateParam.index].number)*parseFloat(this.param.goods[this.updateParam.index].price)*100)/100;
         /* this.costmoney += (parseFloat(this.param.goods[this.updateParam.index].number)*parseFloat(this.param.goods[this.updateParam.index].costPrice)*100)/100;*/
          
        },
        cancelModifyBreed:function(){
          this.breedInfo.status = 0;
          this.updateParam.show = false; 
          this.altogether += (parseFloat(this.updateParam.number)*parseFloat(this.updateParam.price)*100)/100;
          //this.costmoney += (parseFloat(this.updateParam.number)*parseFloat(this.updateParam.costPrice)*100)/100;
          this.updateParam.number = 0;
          this.updateParam.price = 0;
        },
        selectBizType:function(){
           this.param.currency = '';
           if(this.param.intl==0){

           }
           if(this.param.intl==1){} 
        },
        confirm:function(param){
            this.param.country =this.country.cnameEn;
            /*this.param.province = this.province.cname;
            this.param.city = this.city.cname;
            this.param.district = this.district.cname;*/
            //进入生成订单页面时,价格不存在,需要编辑
            for(var i=0;i<this.param.goods.length;i++){
                if(this.param.goods[i].price===''||this.param.goods[i].price===undefined){
                    this.tipParam.show = true;
                    return ;
                } 
            }
            this.param.show=false;
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
            /*if(patt.test(this.costmoney)){   //如果超过两位小数，则只保留前两位小数
                this.costmoney = this.costmoney + '';
                this.costmoney = this.costmoney.replace(/^(\-?)(\d+)\.(\d{2})(\d*)/,'$1$2.$3');
            }*/
            //this.param.incidentals.replace(/^(\-)*(\d+)\.(\d\d)*$/,'$1$2.$3');
            this.param.total = (parseFloat(this.altogether)*1000+parseFloat(this.param.incidentals)*1000 - parseFloat(this.param.preferential)*1000)/1000;
            /*this.param.cost = (parseFloat(this.costmoney)*1000+parseFloat(this.param.incidentals)*1000 - parseFloat(this.param.preferential)*1000)/1000;*/
            
        }
    },
    watch:{
        'param.incidentals':'changeTotal',
        'param.preferential':'changeTotal',
        'altogether':'changeTotal',
        //'costmoney':'changeTotal',
    },
    events:{
        breed:function(breed){
          if(breed.eName==null||breed.eName==""){
             this.breedInfo.breedName = breed.breedName;
             this.breedParam.breedName = breed.breedName;
          }else{
            this.breedParam.breedName = breed.eName;
            this.breedInfo.breedName = breed.eName;
          } 
            this.breedInfo.breedId = breed.breedId;
            /*this.breedParam.breedName = breed.breedName;*/
            this.breedParam.id = breed.breedId;
            //this.breedParam.loading=true;
            //this.getBreedDetail(this.breedParam);
        },
        selectEmpOrOrg:function(employee){
            this.employeeParam.consigner = employee.employeeId;
            this.employeeParam.consignerName = employee.employeeName;
            this.param.consigner = this.employeeParam.consigner;
        },
        customer:function(customer){
            this.param.customerName = customer.customerName;
            this.param.customer = customer.customerId;
        }
    },
    created(){
        this.getCountryList(this.countryParam);
        this.getProvinceList(this.countryParam);
        this.getIntlIntentionDetail(this.param);
        this.getUnitList();
         if(this.param.breedId){
            this.breedParam.breedName = this.param.breedName;
            this.breedParam.id = this.param.breedId;
            this.getBreedDetail(this.breedParam);
          }
        if(this.param.country){
          this.countryParam.country=this.param.country;
          this.countryParam.province=this.param.province;
          this.countryParam.city=this.param.city;
          this.countryParam.district=this.param.district;
          this.country.cnameEn=this.param.country;
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
  width:950px;
}
.top-title{
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
    width: 950px;
    margin-top: 0;
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
.table{
  display: table;
}
</style>

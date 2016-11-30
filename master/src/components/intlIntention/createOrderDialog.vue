<template>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
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
              <section class="editsection">
                  <div style="margin-top:20px;">
                     <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                     <h5 style="display:inline">{{$t('static.customer_info')}}</h5>
                  </div>
                  <div class="editpage">
                      <div class="editpageleft">
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.client_name')}} <span class="system_danger" v-if="$validation.custname.required">{{$t('static.choose_client')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.customerName"   v-validate:custname="['required']" value="{{param.customerName}}" readonly="readonly" @click="searchCustomer(param.customerName,param.customer)"/>
                          </div>
                           <div class="editpage-input">
                              <label class="editlabel">{{$t('static.consignee_name')}} <span class="system_danger" v-if="$validation.consignee.minlength">{{$t('static.enter_name')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.consignee" value="{{param.consignee}}" v-validate:consignee="{minlength:2}" />
                          </div>
                          <!-- <div class="editpage-input">
                              <label class="editlabel">{{$t('static.client_email')}} <span class="system_danger" v-if="$validation.you.email">请输入正确的邮箱</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.email"  v-validate:you="['email']" />
                          </div> -->
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.country')}}</label>
                              <div type="text" class="edit-input">
                                  <v-select
                                     :debounce="250"
                                     :value.sync="country"
                                     :on-change="selectProvince"
                                     :options="initCountrylist"
                                     placeholder="国家"
                                     label="cname"
                                    >
                                   </v-select>
                             </div>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.city')}}</label>
                              <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个省" />
                              <div v-if="province.cname" type="text" class="edit-input">
                                  <v-select
                                       :debounce="250"
                                       :value.sync="city"
                                       :on-change="selectDistrict"
                                       :options="initCitylist"
                                       placeholder="市"
                                       label="cname"
                                  >
                                  </v-select>
                              </div>
                          </div>
                      
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.postcodes')}} <span class="system_danger" v-if="$validation.code.postcode">{{$t('static.postcodes')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.zipCode" v-validate:code="['postcode']" value="{{param.zipCode}}" />
                          </div>
                           <div class="editpage-input">
                              <label class="editlabel">{{$t('static.detailed_address')}} <span class="system_danger" v-if="$validation.addr.required">{{$t('static.enter_address')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.consigneeAddr"    v-validate:addr="['required']" value="{{param.consigneeAdd}}" />
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.preferential')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.preferential" value="{{parampreferential}}"/>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.discount_note')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.preferentialDesc" value="{{param.preferentialDesc}}"/>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.comment')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.comments" value="{{param.comments}}"/>
                          </div>
                      </div>
                      <div class="editpageright">

                          
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.international')}}</label>
                              <select type="text" class="form-control edit-input" v-model="param.intl"  @change="selectBizType()">
                                  <option value="0">否</option>
                                  <option value="1">是</option>
                              </select>
                          </div>
                          <div class="editpage-input"  v-if="param.different=='国际'">
                              <label class="editlabel">{{$t('static.consignee_phone')}}  <span class="system_danger" v-if="$validation.intl.intlphone">{{$t('static.enter_phone')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.consigneePhone"  v-validate:intl="['intlphone']" value="{{param.consigneePhone}}"/>
                          </div>
                          <div class="editpage-input" v-else>
                              <label class="editlabel">{{$t('static.consignee_phone')}}  <span class="system_danger" v-if="$validation.mobile.phone">{{$t('static.enter_phone')}}</span></label>
                              <input type="text" class="form-control edit-input" v-model="param.consigneePhone"  v-validate:mobile="['phone']" value="{{param.consigneePhone}}"/>
                          </div>
                          
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.province')}}</label>
                              <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
                              <div v-if="country.cname" type="text" class="edit-input">
                                  <v-select
                                    :debounce="250"
                                    :value.sync="province"
                                    :on-change="selectCity"
                                    :options="initProvince"
                                    placeholder="省"
                                    label="cname">
                                  </v-select>
                              </div>
                          </div>
                           <div class="editpage-input">
                              <label class="editlabel">{{$t('static.area')}}</label>
                              <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个市" />
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
                          <div class="editpage-input" >
                              <label class="editlabel">{{$t('static.currency')}} </label>
                               <select type="text" class="form-control edit-input"  v-model="param.currency"  value="{{param.currency}}" v-if="param.intl==0">
                                  <option value="0" selected>人民币</option>
                                 <!--  <option value="1">是</option> -->
                              </select>
                              <select type="text" class="form-control edit-input"  v-model="param.currency"   value="{{param.currency}}" v-if="param.intl==1">
                                  <option value="0">人民币</option>
                                  <option value="1" selected>美元</option>
                                  <option value="2">欧元</option>
                                  <option value="3">港币</option>
                                  <option value="4">英镑</option>
                                  <option value="5">日元</option>
                                  <option value="6">韩元</option>
                                  <option value="7">加元</option>
                                  <option value="8">澳元</option>
                                  <option value="9">瑞郎</option>
                                  <option value="10">新加坡元</option>
                                  <option value="11">马来西亚币</option>
                                  <option value="12">印尼</option>
                                  <option value="13">新西兰</option>
                                  <option value="14">越南</option>
                                  <option value="15">泰铢</option>
                                  <option value="16">菲律宾</option>
                              </select>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.sample_order')}}</label>
                              <select type="text" class="form-control edit-input" v-model="param.sample" value="{{param.sample}}" >
                                  <option value="0" selected>否</option>
                                  <option value="1">是</option>
                              </select>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.sundry_fees')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.incidentals" value="{{param.incidentals}}"/>
                          </div>
                          
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.fee_explain')}}</label>
                              <input type="text" class="form-control edit-input" v-model="param.incidentalsDesc" value="{{param.incidentalsDesc}}"/>
                          </div>
                          <div class="editpage-input">
                              <label class="editlabel">{{$t('static.order_status')}}</label>
                              <select  class="form-control edit-input" v-model="param.orderStatus" >
                                  <option value="0" selected>订单生成</option>
                                  <option value="60">已完成未评论</option>
                                  <option value="70">订单已完成</option>
                              </select>
                          </div>
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
                             <td>{{item.brredName}}</td>
                             <td>{{item.unit}}</td>
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
                                     <input type="text" v-model="breedInfo.brredName" class="form-control edit-input" v-validate:breedname="{required:true}"  @click="searchBreed()" readonly="true" />
                                </div>
                         
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.quality')}}<span class="system_danger" v-if="$inner.quality.required">{{$t('static.required')}}</span></label>
                                     <input type="text" v-model="breedInfo.quality" class="form-control edit-input" v-validate:quality="{required:true}" />
                                </div>
                         
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.specification')}}<span class="system_danger" v-if="$inner.spec.required">{{$t('static.required')}}</span></label>
                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.spec" class="form-control edit-input" v-validate:spec="{required:true}" disabled="disabled" placeholder="请先选择一个品种"/>
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
                                
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}" disabled="disabled" placeholder="请先选择一个品种"/>
                                     <div type="text" class="edit-input" v-if="breedParam.id">
                                         <input-select
                                           :value.sync="breedInfo.unit"
                                           :prevalue="breedInfo.unit"
                                           :options="initBreedDetail.units.arr"
                                           placeholder="单位"
                                           label="name"
                                         >
                                         </input-select>
                                     </div>
                                </div>
                             </div>
                         
                             <div class="editpageright">
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.headline')}}</label>
                                     <input type="text" v-model="breedInfo.title" class="form-control edit-input" />
                                </div>
                         
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.origin')}}<span class="system_danger" v-if="$inner.location.required">{{$t('static.required')}}</span></label>
                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.location" class="form-control edit-input" v-validate:location="{required:true}" disabled="disabled" placeholder="请先选择一个品种"/>
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
                         
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.quantity')}}<span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span></label>
                                     <input type="text" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                                </div>
                         
                                <div class="editpage-input">
                                     <label class="editlabel" >{{$t('static.price')}}<span class="system_danger" v-if="$inner.pack0.required">{{$t('static.required')}}</span></label>
                                     <input type="text"  v-model="breedInfo.price" class="form-control edit-input" v-validate:pack0="{required:true}" />
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
import searchcustomerModel  from  '../Intention/clientname'
import inputSelect from '../tools/vueSelect/components/inputselect'
import searchbreedModel  from '../Intention/breedsearch'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initBreedDetail,
    initIntlIntentionDetail
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getBreedDetail,
    getDistrictList,
    createOrder,
    getIntlIntentionDetail
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        searchcustomerModel,
        searchbreedModel,
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
              brredName:'',
              title:'',
              quality:'',
              location:'',
              spec:'',
              number:'',
              unit:'',
              price:'',
              sourceType:1
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
            }
        }
    },
    vuex: {
        getters:{
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist,
            initBreedDetail,
            initIntlIntentionDetail
        },
        actions:{
            getCountryList,
            getProvinceList,
            getCityList,
            getBreedDetail,
            getDistrictList,
            createOrder,
            getIntlIntentionDetail
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
        searchBreed:function(brredName,breedId){
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
          this.param.goods[this.param.goods.length-1].brredName = this.breedInfo.brredName;
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
        },
        showModifyBreed:function(index){
          this.breedInfo.status = 2;
          this.updateParam.index = index;
          this.breedInfo.breedId=this.param.goods[index].breedId,
          this.breedInfo.brredName=this.param.goods[index].brredName,
          this.breedInfo.title=this.param.goods[index].title,
          this.breedInfo.quality=this.param.goods[index].quality,
          this.breedInfo.location=this.param.goods[index].location,
          this.breedInfo.spec=this.param.goods[index].spec,
          this.breedInfo.number=this.param.goods[index].number,
          this.breedInfo.unit=this.param.goods[index].unit,
          this.breedInfo.price=this.param.goods[index].price,
          this.breedInfo.sourceType=this.param.goods[index].sourceType,
          this.updateParam.show = true;
        },
        showAddBreed:function(){
          if(this.param.goods.length == 0||this.param.goods[this.param.goods.length-1].breedId != ''){
              this.breedInfo.status = 1;    
              this.breedInfo.breedId='';
              this.breedInfo.brredName='';
              this.breedInfo.title='';
              this.breedInfo.quality='';
              this.breedInfo.location='';
              this.breedInfo.spec='';
              this.breedInfo.number='';
              this.breedInfo.unit='';
              this.breedInfo.price='';
              this.breedInfo.sourceType=1;
              this.param.goods.push({
                  breedId:'',
                  brredName:'',
                  title:'',
                  quality:'',
                  location:'',
                  spec:'',
                  number:'',
                  unit:'',
                  price:'',
                  sourceType:1
              });
              this.addParam.show = true;
          }  
          
        },
        deleteBreed:function(index){
           this.param.goods.splice(index,1);
        },
        cancelAddBreed:function(){
            this.param.goods.pop();
            this.breedInfo.status = 0;
            this.addParam.show = false; 
        },
        modifyBreed:function(){
          this.param.goods[this.updateParam.index].breedId=this.breedInfo.breedId,
          this.param.goods[this.updateParam.index].brredName=this.breedInfo.brredName,
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
            console.log(this.param);
            this.createOrder(this.param);

        }
    },
    events:{
        breed:function(breed){
            this.breedInfo.brredName = breed.breedName;
            this.breedInfo.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
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
        console.log(this.param);
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
    padding: 10px 30px 30px 30px;
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
    bottom:5px;
    margin-top: 50px;
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

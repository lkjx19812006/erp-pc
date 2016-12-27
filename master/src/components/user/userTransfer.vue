<template>
  <select-model :param="selectParam" v-if="selectParam.show"></select-model>
  <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
  <div class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
  <div class="container modal_con">
    <div class="cover_loading">
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div @click="param.show=false" class="top-title">
      <span class="glyphicon glyphicon-remove-circle"></span>
    </div>
    <div class="edit-content">
        <h3>{{$t('static.new')}}</h3>
    </div>
    <validator name="validation">
      <form novalidate>
        <div class="edit-model">
          <section class="editsection" v-cloak>
            <!-- <div style="margin-top:20px;margin-left:10px;margin-bottom:15px;">
               <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
               <h5 style="display:inline">{{$t('static.customer_info')}}</h5>
            </div> -->
            <div class="clearfix">
              <!-- 客户名称 -->
              <div class="client-detailInfo col-md-6">
                 <label class="editlabel">{{$t('static.client_name')}}<span class="system_danger" v-if="$validation.name.minlength">{{$t('static.enter_client_name')}}</span></label>
                 <input type="text" class="form-control edit-input" v-model="param.name"
                       v-validate:name="{minlength:2}"/>
              </div>
              
              <!-- 联系人姓名 -->         
              <div class="client-detailInfo  col-md-6">
                <label class="editlabel">{{$t('static.contact')}}{{$t('static.name')}}<span class="system_danger" v-if="$validation.cname.minlength">{{$t('static.required')}}</span></label>
                <input type="text" class="form-control edit-input" v-validate:cname="{minlength:2}" v-model="contacts[0].name"/>
              </div>
              <!-- 客户类型 -->
              <div class="client-detailInfo   col-md-6">
                <label class="editlabel">{{$t('static.client_type')}}</label>
                <select class="form-control edit-input" v-model="param.type">
                    <option v-for="item in initUserType" value="{{item.id}}">{{item.id | customerType}}</option>
                </select>
              </div>
              <!-- 联系人手机 -->
              <div class="client-detailInfo  col-md-6">
                <label class="editlabel" for="system">{{$t('static.contact')}}{{$t('static.cellphone')}}<span class="system_danger" v-if="$validation.cphone.phone">{{$t('static.validate_cellphone')}}</span></label>
                <input type="text" class="form-control edit-input" v-validate:cphone="['phone']" v-model="contacts[0].phone"/>
              </div>
              <!-- 客户电话 -->
              <div class="client-detailInfo  col-md-6">
                 <label class="editlabel" for="system">{{$t('static.telephone')}}<span class="system_danger" v-if="$validation.tel.tel">{{$t('static.validate_telephone')}}</span></label>
                 <input type="text" class="form-control edit-input" v-validate:tel="['tel']" v-model="param.tel" />
              </div>
            
              <!-- <div  class="client-detailInfo   col-md-6">
                <label class="editlabel">{{$t('static.type')}}</label>
                <select class="form-control" v-model="param.type">
                  <option value='0,个人' selected>{{$t('static.personal')}}</option>
                  <option value='1,企业'>{{$t('static.enterprise')}}</option>
                </select>
              </div> -->

              <!-- 法人 -->
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.legal')}} </label>
                <input type="text" id="legalPerson" class="form-control edit-input" v-model="param.legalPerson"
                       />
              </div>

              <!-- 负责人 -->
              <div class="client-detailInfo  col-md-6">
                <label class="editlabel">{{$t('static.principals')}} </span></label>
                <input type="text" id="principal" class="form-control edit-input" v-model="param.principal"/>
              </div>

              <!-- 邮编 -->
              <div class="client-detailInfo col-md-6">
                <label>{{$t('static.postcodes')}}</label>
                <input type="text"  class="form-control edit-input" v-model="param.number"
                      />
              </div>
              
              <!-- 客户分类 -->
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.classification')}}<span class="system_danger" v-if="$validation.classify.required">{{$t('static.required')}}</span></label>
                <input v-show="false" type="text" class="form-control edit-input" readonly="readonly" v-model="param.classify" v-validate:classify="['required']"  />
                <select class="form-control edit-input "  v-model="param.classify">
                  <option value="1,买">{{$t("static.purchaser")}}</option>
                  <option value="2,卖">{{$t("static.supplier")}}</option>
                  <option value="3,买卖">{{$t("static.purchaser_and_supplier")}}</option>
                </select>
              </div>
              
              <!-- 客户邮箱 -->
              <div class="client-detailInfo  col-md-6">
                <label class="editlabel" for="system">{{$t('static.email')}}<span class="system_danger" v-if="$validation.email.email">{{$t('static.enter_email')}}</span></label>
                <input type="email" class="form-control edit-input" v-validate:email="['email']" v-model="param.email"/>
              </div>
              <!-- 经营范围 -->
              <div class="client-detailInfo  col-md-6" >
                <label>{{$t('static.business_scope')}}</label>
                <input type="text" class="form-control edit-input" v-model="param.bizScope"/>
              </div>
              <!-- 选择国家 -->
              <div v-if="param.countryId" class="client-detailInfo  col-md-6" >
                <label>{{$t('static.country')}}</label>
                <input type="text" class="form-control edit-input" v-model="param.countryName" readonly="readonly"/>
              </div>
              <div v-if="!param.countryId" class="client-detailInfo  col-md-6" >
                <label>{{$t('static.country')}}</label>
                <div  class="form-control edit-input" style="padding:0;border:none" >
                    <v-select
                      :debounce="250"
                      :value.sync="country"
                      :on-change="selectProvince"
                      :options="countryArr"
                      placeholder="国家"
                      label="cnameEn"
                    >
                    </v-select>
                  </div>
              </div>
              <!-- 选择省 -->
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.province')}}</label>
                <input type="text" v-if="!country.id" class="form-control edit-input" disabled="disabled"
                       placeholder="请先选择一个国家"/>
                  <div  class="form-control edit-input" style="padding:0;border:none" v-if="country.id">
                    <v-select
                      :debounce="250"
                      :value.sync="province"
                      :on-change="selectCity"
                      :options="provinceArr"
                      placeholder="省"
                      label="cname"
                    >
                    </v-select>
                  </div>
              </div>
              <!-- 选择市 -->
              <div class="client-detailInfo   col-md-6">
                <label>{{$t('static.city')}}</label>
                <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled"
                       placeholder="请先选择一个省"/>
                  <div  class="form-control edit-input" style="padding:0;border:none"  v-if="province.cname">
                    <v-select
                      :debounce="250"
                      :value.sync="city"
                      :options="cityArr"
                      placeholder="市"
                      label="cname"
                    >
                    </v-select>
                  </div>
              </div>
              <!-- 主营业务 -->
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.main_product')}}</label>
                <input type="text" class="form-control edit-input" v-model="param.mainBiz"/>
              </div>
              <!-- 网站 -->
              <div class="client-detailInfo  col-md-6" >
                <label>{{$t('static.website')}}</label>
                <input type="text" class="form-control edit-input" v-model="param.website"/>
              </div>
              <!-- 信用等级 -->
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.credit_rating')}}</label>
                <select class="form-control edit-input"  v-model="param.creditLevel">
                  <option value="1" selected>{{$t('static.one_star')}}</option>
                  <option value="2">{{$t('static.two_star')}}</option>
                  <option value="3">{{$t('static.three_star')}}</option>
                </select>
              </div>
              <!-- 注册地址 -->
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.registered_address')}}</label>
                <input type="text" class="form-control edit-input" v-model="param.address"/>
              </div>
              <!-- 备注 -->
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.comment')}}</label>
                <input type="text" class="form-control edit-input" v-model="param.comments"/>
              </div>
              <!-- 是否主联系人 -->
              <div class="client-detailInfo col-md-6">
                <label>{{$t('static.whether_main_contact')}}</label>
                <select class="form-control edit-input" v-model='contacts[0].main'>
                  <option value="1">{{$t('static.yes')}}</option>
                  <option value="0">{{$t('static.no')}}</option>
                </select>
              </div>
              <!-- 联系人部门 -->
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.contact')}}{{$t('static.department')}}</label>
                <input type="text" class="form-control edit-input" v-model="contacts[0].department"/>
              </div>
              <!-- 联系人职位 -->
              <div class="client-detailInfo col-md-6">
                <label>{{$t('static.contact')}}{{$t('static.position')}}</label>
                <input type="text" class="form-control edit-input" v-model="contacts[0].position"/>
              </div>
              <!-- 联系人电话 -->
              <div class="client-detailInfo   col-md-6">
                <label class="editlabel" for="system">{{$t('static.contact')}}{{$t('static.telephone')}}
                  <span class="system_danger" v-if="$validation.ctel.tel">{{$t('static.validate_telephone')}}）</span>
                </label>
                <input type="text" class="form-control edit-input" v-validate:ctel="['tel']" v-model="contacts[0].tel"/>
              </div>
              <!-- 联系人邮箱 -->
              <div class="client-detailInfo   col-md-6">
                <label class="editlabel" for="system">{{$t('static.contact')}}{{$t('static.email')}}<span class="system_danger" v-if="$validation.cemail.email">{{$t('static.validate_email')}}</span></label>
                <input type="email" class="form-control edit-input" v-validate:cemail="['email']" v-model="contacts[0].email"/>
              </div>
              <!-- 联系人微信 -->
              <div class="client-detailInfo  col-md-6">
                <label class="editlabel" for="system">{{$t('static.contact')}}{{$t('static.wechat')}}<span class="system_danger" v-if="$validation.cwechart.wechart">{{$t('static.validate_wechat')}}</span></label>
                <input type="text" class="form-control edit-input" v-validate:cwechart="['wechart']" v-model="contacts[0].wechart"/>
              </div>
              <!-- 联系人QQ -->
              <div class="client-detailInfo  col-md-6">
                <label class="editlabel" for="system">{{$t('static.contact')}}QQ<span class="system_danger" v-if="$validation.cqq.qq">{{$t('static.validate_qq')}}</span></label>
                <input type="text" class="form-control edit-input" v-validate:cqq="['qq']" v-model="contacts[0].qq"/>
              </div>
            </div>
            <!-- 联系人信息 -->  
            <!-- <div v-if="contactshow">
              <div style="margin-top:25px;margin-left:30px;margin-bottom:15px;">
                <img src="/static/images/contact@2x.png" style="display:inline"/>
                <h5 style="display:inline">{{$t('static.contact')}}</h5>
              </div>
            
              <div class="clearfix">
                
                <div class="client-detailInfo col-md-6">
                  <label>{{$t('static.whether_main_contact')}}</label>
                  <select class="form-control " v-model='contacts[0].main'>
                    <option value="1">{{$t('static.yes')}}</option>
                    <option value="0">{{$t('static.no')}}</option>
                  </select>
                </div>
            
                <div class="client-detailInfo  col-md-6">
                  <label>{{$t('static.department')}}</label>
                  <input type="text" class="form-control" v-model="contacts[0].department"/>
                </div>
                <div class="client-detailInfo col-md-6">
                  <label>{{$t('static.position')}}</label>
                  <input type="text" class="form-control" v-model="contacts[0].position"/>
                </div>
                
                <div class="client-detailInfo   col-md-6">
                  <label class="editlabel" for="system">{{$t('static.telephone')}}<span class="system_danger" v-if="$validation.ctel.tel">{{$t('static.validate_telephone')}}）</span></label>
                  <input type="text" class="form-control" v-validate:ctel="['tel']" v-model="contacts[0].tel"/>
                </div>
                <div class="client-detailInfo   col-md-6">
                  <label class="editlabel" for="system">{{$t('static.email')}}<span class="system_danger" v-if="$validation.cemail.email">{{$t('static.validate_email')}}</span></label>
                  <input type="email" class="form-control" v-validate:cemail="['email']" v-model="contacts[0].email"/>
                </div>
                <div class="client-detailInfo  col-md-6">
                  <label class="editlabel" for="system">{{$t('static.wechat')}}<span class="system_danger" v-if="$validation.cwechart.wechart">{{$t('static.validate_wechat')}}</span></label>
                  <input type="text" class="form-control" v-validate:cwechart="['wechart']" v-model="contacts[0].wechart"/>
                </div>
            
                <div class="client-detailInfo  col-md-6">
                  <label class="editlabel" for="system">QQ<span class="system_danger" v-if="$validation.cqq.qq">{{$t('static.validate_qq')}}</span></label>
                  <input type="text" class="form-control" v-validate:cqq="['qq']" v-model="contacts[0].qq"/>
                </div>
              </div>
            </div> -->

          </section>
        </div>
        <div class="edit_footer">
          <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
          <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="save()">{{$t('static.confirm')}}</button>
          <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
        </div>
      </form>
    </validator>
  </div>
</template>
<script>
  import selectModel  from './employeeOrOrg'
  import tipsModel  from '../tips/tipDialog'
  import vSelect from '../tools/vueSelect/components/Select'
  import {
    initUserType,
  } from '../../vuex/getters'
  import {
    saveCreate,
    getUserTypeList
  } from '../../vuex/actions'
  export default {
    components: {
      selectModel,
      tipsModel,
      vSelect
    },
    props: {
      param: {},
    },
    data() {
      return {
        loadParam:{
            loading: true,
            show:false,
            color: '#5dc596',
            size: '15px',
            cur: 1,
            all: 7,
            total:0
        },
        selectParam: {
          choice:'选择',
          show: false,
          employeeId: '',
          employeeName: '',
          orgId: '',
          orgName: '',
          loading:true,
        },
        tipsParam:{
          show:false,
          remain:true,
          name:'创建成功',
          alert:true
        },
        contacts: [{
          name: null,
          position: '',
          department: '',
          phone: '',
          tel: '',
          email: '',
          qq: '',
          wechart: '',
          main: 1
        }],
        contactshow:true,
        loading: false,
        provinceArr:[],
        cityArr:[],
        checkCustomer:{},
        countryArr:[],
        province: {
          cname: ''
        },
        city: {
          cname: ''
        },
        country:{
/*          cname: '',*/
          cnameEn:''
        },

      }
    },
    vuex: {
      getters:{
        initUserType,
      },
      actions: {
        saveCreate,
        getUserTypeList
      }
    },
    methods: {
      getContacts: function (url) {
        var _self = this;
        this.$http({
          method: 'GET',
          url: url,
          emulateJSON: false,
          emulateHTTP: false
        }).then((res) => {
          _self.loading = false;
          console.log(res.json());
          _self.initContacts(res.json().result)
        }, (res) => {
          _self.loading = false;
          console.log('fail');
        })


      },
      getCountrys:function(){
        var _self = this;
        this.$http({
          method: 'GET',
          url: '/crm/api/v1/sys/location/country/',
          emulateJSON: false,
          emulateHTTP: false
        }).then((res) => {
          _self.countryArr=res.json().result;
          _self.countryArr.forEach(function(item){
            item.cnameEn = item.cname + '(' + item.nameEn + ')';  //中英文名字"中国/Chinese"
          })
        }, (res) => {

          console.log('fail');
        })
      },
      getProvinces:function(){
        var _self = this;
        console.log(_self.param);
        console.log(this.country.id)
        this.$http({
          method: 'GET',
          url: '/crm/api/v1/sys/location/province/?country='+this.country.id,
          emulateJSON: false,
          emulateHTTP: false
        }).then((res) => {
          _self.provinceArr=res.json().result;
          _self.provinceArr.forEach(function(item){
            if(_self.param.province&&_self.param.province.indexOf(item.cname) == 0 ){
              _self.province=item;
              return _self.getCities();
            }

          })
        }, (res) => {

          console.log('fail');
        })
      },
      getCities:function(){

        var _self = this;
        this.$http({
          method: 'GET',
          url: '/crm/api/v1/sys/location/city/?province='+this.province.id ,
          emulateJSON: false,
          emulateHTTP: false
        }).then((res) => {

          _self.cityArr=res.json().result;
          _self.cityArr.forEach(function(item){
            if(_self.param.city&&_self.param.city.indexOf(item.cname) == 0 ){
              return _self.city=item;
            }
          })
        }, (res) => {
          console.log('fail');
        })

      },
      checkCustomer:function(){  //检查客户是否存在
        var _self = this;
        this.$http({
          method: 'POST',
          url: '/crm/api/v1/customer/checkCustomer?phone='+this.contacts[0].phone,
          emulateHTTP: true,
          emulateJSON: false,
          headers: {
              "X-Requested-With": "XMLHttpRequest",
              'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then((res) => {
          if(this.contacts[0].phone.length==11&&res.json().code==200){
            _self.chechCallback(res.json().result);
            console.log(res.json().result)
            _self.provinceArr=res.json().result;
          }
          console.log(res.json().result)
        }, (res) => {
          console.log('fail');
        })
      },
      initContacts: function (data) {
        var _self = this;
        if (this.param.companyId) {
          data.companyContacts.forEach(function (item) {
            _self.contacts.push({
              name: item.name,
              position: '',
              department: '',
              phone: item.phone,
              tel: item.tel,
              email: item.email,
              qq: item.qq,
              wechart: item.wechart,
              main: item.main
            })
          })
        } else if (this.param.userId) {
        }
        if (_self.contacts.length > 1) {
          _self.contacts.splice(0, 1);
          _self.contactshow=false;
        }
      },
      selectCity: function () {
        this.city = '';
        if (this.province != '' && this.province != null) {
          this.getCities();
        }
      },
      selectProvince:function(){
        this.province = '';
        if (this.country != '' && this.country != null) {
          this.getProvinces();
        }
      },
      save: function () {

        console.log(this.param.type);  
    
        this.param.contacts=this.contacts;
        this.param.province=this.province.id;
        this.param.city=this.city.id;
        this.param.cityName=this.city.cname;
        this.param.provinceName=this.province.cname;
        /*this.param.typeDesc=this.param.type.split(',')[1];
        this.param.type=this.param.type.split(',')[0];*/
        this.param.classifyDesc = this.param.classify.split(',')[1];
        this.param.classify= this.param.classify.split(',')[0];
        if(this.param.countryId){
          this.param.country=this.param.countryId;
          this.param.countryName=this.param.countryName;
        }
        else{
          this.param.country=this.country.id;
          this.param.countryName=this.country.cnameEn;
        }
        this.param.show=false;
        this.param.callback=this.param.callback;
        this.saveCreate(this.param,this.tipsParam);
      },
      chechCallback:function(title){
          this.tipsParam.show =true;
          this.tipsParam.remain =false;
          this.tipsParam.name =title;
          this.tipsParam.alert =true;
      }
    },
    watch:{
        'contacts[0].phone':'checkCustomer'
    },
    events: {
      'selectEmpOrOrg': function (param) {
        this.param.employeeId = param.employeeId;
        this.param.employeeName = param.employeeName;
        this.param.orgId = param.orgId;
        this.param.orgName = param.orgName;
      }
    },
    created(){
      
      if (this.param.companyId) {
        this.loading=true;
        this.getContacts('/crm/api/v1/company/' + this.param.companyId);
      }
      if(this.param.countryId){
        this.country.id=this.param.countryId;
        this.getProvinces();
      } else {
        this.getCountrys();
      }

      if(this.param.contact){
        this.contacts[0].name= this.param.contact.name;
        this.contacts[0].position= this.param.contact.position;
        this.contacts[0].department=this.param.contact.department;
        this.contacts[0].phone=this.param.contact.phone;
        this.contacts[0].tel=this.param.contact.tel;
        this.contacts[0].email=this.param.contact.email;
        this.contacts[0].qq=this.param.contact.qq;
        this.contacts[0].wechart=this.param.contact.wechart;
        this.contacts[0].main=1;
      }
      this.getUserTypeList(this.loadParam);

    }

  }
</script>
<style scoped>
.modal{
  z-index: 1083;
}
  .modal_con {
    width: 840px;
    z-index: 1084;
  }

  .top-title {
    width: 840px;
    position: fixed;
    top: 91px;
  }

  .editsection {
    width: 100%;
    box-sizing: border-box;
    margin-bottom:70px;
  }

.edit-input {
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
  }

  .edit-input:focus {
    border-color: #fa6705;
  }

  .editpage-input {
    margin-top: 15px;
  }

  .editlabel {
    color: #333;
    font-size: 14px;
    display: block;
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
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 840px;
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

</style>

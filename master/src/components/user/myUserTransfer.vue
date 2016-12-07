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
            <div style="margin-top:20px;margin-left:30px;margin-bottom:15px;">
               <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
               <h5 style="display:inline">{{$t('static.customer_info')}}</h5>
            </div>
            <div class="clearfix">
              <div class="client-detailInfo col-md-6">
                 <label class="editlabel">{{$t('static.client_name')}}<span class="system_danger" v-if="$validation.name.minlength">{{$t('static.enter_client_name')}}</span></label>
                 <input type="text" id="username" class="form-control" v-model="param.name"
                       v-validate:name="{minlength:2}"/>
              </div>
              <div class="client-detailInfo   col-md-6">
                <label class="editlabel">{{$t('static.type')}}</label>
                <select class="form-control " v-model="param.type">
                  <option value='0,个人' selected>{{$t('static.personal')}}</option>
                  <option value='1,企业'>{{$t('static.enterprise')}}</option>
                </select>
              </div>
              <div v-if="param.type=='1,企业'" class="client-detailInfo  col-md-6">
                <label>{{$t('static.legal')}} </label>
                <input type="text" id="legalPerson" class="form-control" v-model="param.legalPerson"
                       />
              </div>
              <div  v-if="param.type=='1,企业'" class="client-detailInfo   col-md-6">
                <label class="editlabel">{{$t('static.principals')}} <span class="system_danger" v-if="$validation.principal.minlength">{{$t('static.required')}}</span></label>
                <input type="text" id="principal" class="form-control" v-model="param.principal"
                       v-validate:principal="{minlength:2}"/>
              </div>
              <div  v-if="param.type=='1,企业'" class="client-detailInfo col-md-6">
                <label>{{$t('static.postcodes')}}</label>
                <input type="text"  class="form-control" v-model="param.number"
                      />
              </div>
              <div v-if="param.type=='1,企业'" class="client-detailInfo   col-md-6">
                <label class="editlabel">类型</label>
                <select class="form-control " v-model="param.category">
                    <option v-for="item in initUserType">{{item.name}}</option>
                </select>
              </div>

              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.classification')}}<span class="system_danger" v-if="$validation.classify.required">{{$t('static.required')}}</span></label>
                <input v-show="false" type="text" class="form-control" readonly="readonly" v-model="param.classify" v-validate:classify="['required']"  />
                <select class="form-control "  v-model="param.classify">
                  <option value="1,买">{{$t("static.purchaser")}}</option>
                  <option value="2,卖">{{$t("static.supplier")}}</option>
                  <option value="3,买卖">{{$t("static.purchaser_and_supplier")}}</option>
                </select>
              </div>
              <div class="client-detailInfo   col-md-6" v-if="param.supplier!=1">
                <label>{{$t('static.deparment')}}</label>
                <input v-show="false" type="text" class="form-control" readonly="readonly"
                       v-model="param.orgId" />
                <input v-if="param.employeeId" type="text" class="form-control" readonly="readonly"
                       v-model="param.employeeName"  @click="selectParam.show=true" value="{{param.employeeName}}"/>
                <input v-if="!param.employeeId" type="text" class="form-control" readonly="readonly" v-model="param.orgName"
                       @click="selectParam.show=true" value="{{param.orgName}}" />
              </div>
              <div class="client-detailInfo  col-md-6">
                 <label class="editlabel" for="system">{{$t('static.telephone')}}<span class="system_danger" v-if="$validation.tel.tel">{{$t('static.validate_telephone')}}</span></label>
                 <input type="text" class="form-control" v-validate:tel="['tel']" v-model="param.tel" />
              </div>
              <div class="client-detailInfo  col-md-6">
                <label class="editlabel" for="system">{{$t('static.email')}}<span class="system_danger" v-if="$validation.email.email">{{$t('static.enter_email')}}</span></label>
                <input type="email" class="form-control" v-validate:email="['email']" v-model="param.email"/>
              </div>
              <div class="client-detailInfo  col-md-6" >
                <label>{{$t('static.business_scope')}}</label>
                <input type="text" class="form-control" v-model="param.bizScope"/>
              </div>
              <div v-if="!param.countryId" class="client-detailInfo  col-md-6" >
                <label>{{$t('static.country')}}</label>
                <div  class="form-control" style="padding:0;border:none" >
                <v-select
                  :debounce="250"
                  :value.sync="country"
                  :on-change="selectProvince"
                  :options="countryArr"
                  placeholder="国家"
                  label="cname"
                >
                </v-select>
                  </div>
              </div>
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.province')}}</label>
                <input type="text" v-if="!country.id" class="form-control  " disabled="disabled"
                       placeholder="请先选择一个国家"/>
                <div  class="form-control" style="padding:0;border:none" v-if="country.id">
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
              <div class="client-detailInfo   col-md-6">
                <label>{{$t('static.city')}}</label>
                <input type="text" v-if="!province.cname" class="form-control  " disabled="disabled"
                       placeholder="请先选择一个省"/>
                <div  class="form-control" style="padding:0;border:none"  v-if="province.cname">
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
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.main_product')}}</label>
                <input type="text" class="form-control" v-model="param.mainBiz"/>
              </div>
              <div class="client-detailInfo  col-md-6" >
                <label>{{$t('static.website')}}</label>
                <input type="text" class="form-control" v-model="param.website"/>
              </div>

              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.credit_rating')}}</label>
                <select class="form-control "  v-model="param.creditLevel">
                  <option value="1" selected>{{$t('static.one_star')}}</option>
                  <option value="2">{{$t('static.two_star')}}</option>
                  <option value="3">{{$t('static.three_star')}}</option>
                </select>
              </div>
              <div class="client-detailInfo   col-md-6">
                <label>{{$t('static.registered_address')}}</label>
                <input type="text" class="form-control" v-model="param.address"/>
              </div>
              <div class="client-detailInfo  col-md-6">
                <label>{{$t('static.comment')}}</label>
                <input type="text" class="form-control" v-model="param.comments"/>
              </div>
            </div>

            <div v-if="contactshow">
              <div style="margin-top:25px;margin-left:30px;margin-bottom:15px;">
                <img src="/static/images/contact@2x.png" style="display:inline"/>
                <h5 style="display:inline">{{$t('static.contact')}}</h5>
              </div>
              <div class="clearfix">
                <div class="client-detailInfo  col-md-6">
                  <label class="editlabel">{{$t('static.name')}}<span class="system_danger" v-if="$validation.cname.minlength">{{$t('static.required')}}</span></label>
                  <input type="text" class="form-control" v-validate:cname="{minlength:2}" v-model="contacts[0].name"/>
                </div>
                <div class="client-detailInfo col-md-6">
                  <label>{{$t('static.whether_main_contact')}}</label>
                  <select class="form-control " v-model='contacts[0].main'>
                    <option value="1">{{$t('static.yes')}}</option>
                    <option value="0">{{$t('static.no')}}</option>
                  </select>
                </div>

                <div class="client-detailInfo   col-md-6">
                  <label>{{$t('static.department')}}</label>
                  <input type="text" class="form-control" v-model="contacts[0].department"/>
                </div>
                <div class="client-detailInfo col-md-6">
                  <label>{{$t('static.position')}}</label>
                  <input type="text" class="form-control" v-model="contacts[0].position"/>
                </div>
                <div class="client-detailInfo col-md-6">
                  <label class="editlabel" for="system">{{$t('static.cellphone')}}<span class="system_danger" v-if="$validation.cphone.phone">{{$t('static.validate_cellphone')}}</span></label>
                  <input type="text" class="form-control" v-validate:cphone="['phone']" v-model="contacts[0].phone"/>
                </div>
                <div class="client-detailInfo   col-md-6">
                  <label class="editlabel" for="system">{{$t('static.telephone')}}<span class="system_danger" v-if="$validation.ctel.tel">{{$t('static.validate_telephone')}}）</span></label>
                  <input type="text" class="form-control" v-validate:ctel="['tel']" v-model="contacts[0].tel"/>
                </div>
                <div class="client-detailInfo  col-md-6">
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
            </div>

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
  import selectModel  from './selectEmployee'
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
          orgName: ''
        },
        tipsParam:{
          show:false,
          remain:true,
          name:'创建成功',
          callback:this.callback
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
        countryArr:[],
        province: {
          cname: ''
        },
        city: {
          cname: ''
        },
        country:{
          cname: ''
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
        }, (res) => {

          console.log('fail');
        })
      },
      getProvinces:function(){
        var _self = this;
        console.log(_self.param);
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
        this.param.contacts=this.contacts;
        this.param.province=this.province.id;
        this.param.city=this.city.id;
        this.param.cityName=this.city.cname;
        this.param.provinceName=this.province.cname;
        this.param.typeDesc=this.param.type.split(',')[1];
        this.param.type=this.param.type.split(',')[0];
        this.param.classifyDesc = this.param.classify.split(',')[1];
        this.param.classify= this.param.classify.split(',')[0];
        if(this.param.countryId){
          this.param.country=this.param.countryId;
          this.param.countryName=this.param.countryName;
        }
        else{
          this.param.country=this.country.id;
          this.param.countryName=this.country.cname;
        }
        this.param.show=false;
        this.param.callback = this.param.callback;
        this.saveCreate(this.param,this.tipsParam);

      },
      callback:function(){
        this.param.show = false;
      }
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
    float: left;
  }

  .editpageleft {
    border-right: 1px solid #ddd;
  }

  .editpageleft h4,
  .editpageright h4 {
    text-indent: 16px;
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

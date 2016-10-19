<template>
  <select-model :param="selectParam" v-if="selectParam.show"></select-model>
  <div class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
  <div class="container modal_con">

    <div class="cover_loading">
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>

    <div @click="param.show=false" class="top-title">
      <span class="glyphicon glyphicon-remove-circle"></span>
    </div>
    <div class="edit-content">
      <h3>新建客户</h3>
    </div>
    <validator name="validation">
      <form novalidate>
        <div class="edit-model">
          <section class="editsection" v-cloak>
            <div style="margin-top:20px;margin-left:30px;margin-bottom:15px;">
               <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
               <h4 style="display:inline">客户信息</h4>
            </div>
            <div class="clearfix">
              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                <label>名称</label>
                <input type="text" id="username" class="form-control" v-model="param.name"
                       v-validate:username="['required']"/>
              </div>
              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                <label class="editlabel">类型</label>
                <select class="form-control edit-input" v-model="param.type">
                  <option value='0,个人'>个人</option>
                  <option value='1,企业'>企业</option>
                </select>
              </div>
            </div>

            <div class="clearfix" v-if="param.type=='1,企业'">
              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                <label>法人</label>
                <input type="text" id="legalPerson" class="form-control" v-model="param.legalPerson"
                       v-validate:legalPerson="['required']"/>
              </div>
              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                <label class="editlabel">负责人</label>
                <input type="text" id="principal" class="form-control" v-model="param.principal"
                       v-validate:principal="['required']"/>
              </div>
            </div>

            <div class="clearfix" v-if="param.type=='1,企业'">
              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                <label>编码</label>
                <select class="form-control edit-input" v-model="param.number">
                  <option value="true">有</option>
                  <option value="false">无</option>
                </select>
              </div>
              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                <label class="editlabel">类型</label>
                <select class="form-control edit-input" v-model="param.category">
                  <option value="HF">保健品厂</option>
                  <option value="MF">药厂</option>
                  <option value="CF">化妆品厂</option>
                  <option value="FF">食品厂</option>
                </select>
              </div>
            </div>

            <div class="clearfix">
              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                <label>分类码</label>
                <select class="form-control edit-input" id="classify" v-model="param.classify" v-validate:classify="['required']">
                  <option value="1,'买'">买</option>
                  <option value="2,'卖'">卖</option>
                  <option value="3,'买卖'">买卖</option>
                </select>

              </div>
              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                <label>业务员/部门</label>
                <input v-if="!param.orgId" type="text" class="form-control" readonly="readonly"
                       v-model="param.employeeName" @click="selectParam.show=true"/>
                <input v-if="param.orgId" type="text" class="form-control" readonly="readonly" v-model="param.orgName"
                       @click="selectParam.show=true"/>
              </div>
            </div>
            <div class="clearfix">
              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                <label>电话</label>
                <input type="text" class="form-control" maxlength="11" v-model="param.tel"/>
              </div>
              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                <label>邮箱</label>
                <input type="email" class="form-control" v-model="param.email"/>
              </div>
            </div>

            <div class="clearfix"  >
              <div class="client-detailInfo pull-left col-md-6 col-xs-12" >
                <label>经营范围</label>
                <input type="text" class="form-control" v-model="param.bizScope"/>
              </div>
              <div class="client-detailInfo pull-right col-md-6 col-xs-12" v-if="!param.countryId">
                <label>所在国家</label>
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


            <div class="clearfix">
              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                <label>所在省</label>
                <input type="text" v-if="!country.id" class="form-control edit-input" disabled="disabled"
                       placeholder="请先选择一个国家"/>
                <v-select
                  :debounce="250"
                  :value.sync="province"
                  :on-change="selectCity"
                  :options="provinceArr"
                  placeholder="省"
                  label="cname"
                  v-if="country.id"
                >
                </v-select>
              </div>

              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                <label>所在市</label>
                <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled"
                       placeholder="请先选择一个省"/>
                <v-select
                  :debounce="250"
                  :value.sync="city"
                  :options="cityArr"
                  placeholder="市"
                  label="cname"
                  v-if="province.cname"
                >
                </v-select>
              </div>
            </div>

            <div class="clearfix">
              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                <label>主营业务</label>
                <input type="text" class="form-control" v-model="param.mainBiz"/>
              </div>
              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                <label>网站</label>
                <input type="text" class="form-control" v-model="param.website"/>
              </div>
            </div>


            <div class="clearfix">
              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                <label>备注</label>
                <input type="text" class="form-control" v-model="param.comments"/>
              </div>
              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                <label>注册地址</label>
                <input type="text" class="form-control" v-model="param.address"/>
              </div>
            </div>

            <div v-if="contactshow">

              <div style="margin-top:25px;margin-left:30px;margin-bottom:15px;">
                <img src="/static/images/contact@2x.png" style="display:inline"/>
                <h4 style="display:inline">联系人</h4>
              </div>
              <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                  <label>联系人名称</label>
                  <input type="text" class="form-control" v-model="contacts[0].name"/>
                </div>
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                  <label>是否主联系人</label>
                  <select class="form-control edit-input" v-model='contacts[0].main'>
                    <option value="0" selected="selected">是</option>

                  </select>
                </div>

              </div>
              <div class="clearfix">
                <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
                  <label>联系人部门</label>
                  <input type="text" class="form-control" v-model="contacts[0].department"/>
                </div>
                <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                  <label>联系人职位</label>
                  <input type="text" class="form-control" v-model="contacts[0].position"/>
                </div>

              </div>
              <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                  <label>手机</label>
                  <input type="text" class="form-control" maxlength="11" v-model="contacts[0].phone"/>
                </div>
                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                  <label>电话</label>
                  <input type="text" class="form-control" v-model="contacts[0].tel"/>
                </div>
              </div>
              <div class="clearfix">
                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                  <label>邮箱</label>
                  <input type="email" class="form-control" v-model="contacts[0].email"/>
                </div>
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                  <label>微信</label>
                  <input type="text" class="form-control" v-model="contacts[0].wechart"/>
                </div>

              </div>
              <div class="clearfix">
                <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
                  <label>qq</label>
                  <input type="text" class="form-control" v-model="contacts[0].qq"/>
                </div>
              </div>
            </div>

          </section>
        </div>
        <div class="edit_footer">
          <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
          <input type="button" class="btn  btn-confirm" @click="save(param.show = false)" value="确定"/>
        </div>
      </form>
    </validator>
  </div>
</template>
<script>
  import selectModel  from './employeeOrOrg.vue'
  import vSelect from '../tools/vueSelect/components/Select'

  import {
    saveCreate
  } from '../../vuex/actions'
  export default {
    components: {
      selectModel,
      vSelect
    },
    props: {
      param: {},


    },
    data() {
      return {
        selectParam: {
          show: false,
          employeeId: '',
          employeeName: '',
          orgId: '',
          orgName: ''
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

      actions: {
        saveCreate,

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
        this.saveCreate(this.param);

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



    }
  }
</script>
<style scoped>
  .modal_con {
    width: 840px;
  }

  .top-title {
    width: 840px;
  }

  .edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  .edit-content h3 {
    font-size: 18px;
    color: #fa6705;
    margin: 0;
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

  .edit-input {
    height: 36px;
    line-height: 36px;
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
    position: fixed;
    left: 0;
    right: 0;
    bottom: 60px;
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

  .form-control {
    width: 360px;
  }

  .client-detailInfo {
    padding: 0px 30px 20px 30px;

  }
</style>

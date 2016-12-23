<template>
    <select-model :param="selectParam" v-if="selectParam.show"></select-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="cover_loading">
        <pulse-loader :loading="countryParam.loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{param.name}}的信息</h3>
        </div>
        <validator name="validation">
            <div class="edit-model">
                <section class="editsection" v-cloak>
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel" for="system">{{$t('static.client_name')}}<span class="system_danger" v-if="$validation.name.minlength">{{$t('static.enter_client_name')}}</span></label>
                                <input type="text" v-model='param.name' v-validate:name="{minlength:2}" class="form-control edit-input" value="{{param.name}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.type')}}</label>
                                <select class="form-control edit-input"  v-model='param.type'>
                                     <option value="0">{{$t('static.personal')}}</option>
                                     <option value="1">{{$t('static.enterprise')}}</option>
                                </select>
                                <!-- <input type="text" v-model='param.type' class="form-control edit-input" value="{{param.type}}" /> -->
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">分类码</label>
                                <input type="text" v-model='param.category' class="form-control edit-input" value="{{param.category}}" />
                            </div>
                             <div class="editpage-input">
                                <label  class="editlabel">{{$t('static.country')}}</label>
                                 <div>
                                    <v-select
                                      :debounce="250"
                                      :value.sync="country"
                                      :on-change="selectProvince"
                                      :options="initCountrylist"
                                      placeholder="国家"
                                      label="cnameEn"
                                    >
                                    </v-select>
                                </div>
                              </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.province')}}</label>
                                <input type="text" v-if="!country.cname" class="form-control edit-input"  placeholder="请先选择一个国家" disabled="disabled" v-model='param.provinceName' value="{{param.provinceName}}" />
                                    <v-select
                                      :debounce="250"
                                      :value.sync="province"
                                      :on-change="selectCity"
                                      :options="initProvince"
                                      placeholder="省"
                                      label="cname"
                                      v-if="country.cname"
                                    >
                                    </v-select>
                                <!-- <input type="text" v-model='param.province' class="form-control edit-input" value="{{param.province}}" /> -->
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.city')}}</label>
                                <input type="text" v-if="!province.cname" class="form-control edit-input"  placeholder="请先选择一个省"  v-model='param.cityName' value="{{param.cityName}}"/>
                                <v-select
                                  :debounce="250"
                                  :value.sync="city"
                                  :options="initCitylist"
                                  placeholder="市"
                                  label="cname"
                                  v-if="province.cname"
                                >
                                </v-select>
                                <!-- <input type="text" v-model='param.city' class="form-control edit-input" value="{{param.city}}" /> -->
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.business_scope')}}</label>
                                <input type="text" v-model='param.bizScope' class="form-control edit-input" value="{{param.bizScope}}" />
                            </div>
                          
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.classification')}}</label>
                                <select class="form-control edit-input"  v-model='param.classify' value="{{param.classify}}">
                                     <option value="1">{{$t("static.purchaser")}}</option>
                                     <option value="2">{{$t("static.supplier")}}</option>
                                     <option value="3">{{$t("static.purchaser_and_supplier")}}</option>
                                </select>
                            </div>

                            <!-- <div class="editpage-input" v-if="param.key=='myCustomerList'">
                              <label>{{$t('static.deparment')}}</label>
                              <input v-if="param.employeeName" type="text" class="form-control edit-input" readonly="readonly"
                                     v-model="param.employeeName" @click="selectParam.show=true"/>
                              <input v-if="!param.employeeName" type="text" class="form-control edit-input" readonly="readonly" v-model="param.orgName" @click="selectParam.show=true"/>
                            
                            </div>
                             -->
                            <div class="editpage-input">
                                <label class="editlabel">负责人</label>
                                <input type="text" v-model='param.principal' class="form-control edit-input" value="{{param.principal}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel" for="system">{{$t('static.cellphone')}}<span class="system_danger" v-if="$validation.mainphone.phone">{{$t('static.validate_cellphone')}}</span></label>
                                <input type="text" v-model="param.mainPhone" class="form-control edit-input" v-validate:mainphone="['phone']" value="{{param.mainPhone}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel" for="system">{{$t('static.email')}}<span class="system_danger" v-if="$validation.email.email">{{$t('static.validate_email')}}</span></label>
                                <input type="text" v-model="param.email" class="form-control edit-input" v-validate:email="['email']" value="{{param.email}}" />
                            </div>

                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.registered_address')}}</label>
                                <input type="text" v-model='param.address' class="form-control edit-input" value="{{param.address}}" />
                            </div>

                          <div class="editpage-input">
                            <label class="editlabel">{{$t('static.credit_rating')}}</label>
                            <select class="form-control edit-input"  v-model='param.creditLevel' >
                              <option value="1">{{$t('static.one_star')}}</option>
                              <option value="2">{{$t('static.two_star')}}</option>
                              <option value="3">{{$t('static.three_star')}}</option>
                            </select>
                          </div>
                          <div class="editpage-input">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <input type="text" v-model='param.comments' class="form-control edit-input" value="{{param.comments}}" />
                          </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                <button type="button" class="btn btn-confirm" v-if="$validation.valid" @click="confirm()">{{$t('static.confirm')}}</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
            </div>

        </validator>

    </div>

</template>
<script>
import tipsdialogModel  from '../tips/tipDialog'
import vSelect from '../tools/vueSelect/components/Select'
import selectModel  from '../user/employeeOrOrg'

import {
    initCountrylist,
    initProvince,
    initCitylist
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList
} from '../../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        vSelect,
        selectModel
    },
    props: ['param'],
    data() {
        return {
                selectParam: {
                  show: false,
                  employeeId: '',
                  employeeName: '',
                  orgId: '',
                  orgName: ''
                },
                province: {
                  cname: ''
                },
                city: {
                  cname: ''
                },
                country:{
                  cname: '',
                  cnameEn: '',
                },
                countryParam:{
                  loading:false,
                  show:false,
                  color: '#5dc596',
                  size: '15px',
                  cur: 1,
                  all: 7
                },
                provinceParam:{
                  loading:false,
                  show:false,
                  color: '#5dc596',
                  size: '15px',
                  cur: 1,
                  all: 7,
                  country:''
                },
                cityParam:{
                  loading:false,
                  show:false,
                  color: '#5dc596',
                  size: '15px',
                  cur: 1,
                  all: 7,
                  province:''
                }
        }
    },
    vuex: {
        getters: {
          initCountrylist,
          initProvince,
          initCitylist
        },
        actions: {
          getCountryList,
          getProvinceList,
          getCityList,
        }
    },
    methods: {
        selectProvince:function(){
            this.province = '';
            this.city = '';

            this.param.province=this.province.cname;
            this.param.city=this.city.cname;
            if(this.country!=''&&this.country!=null){
              this.getProvinceList(this.country);
            }
      },
      selectCity:function(){
        this.city = '';

        this.param.city=this.city.cname;
        if(this.province!=''&&this.province!=null){
          this.getCityList(this.province);
        }

      },
      confirm:function(){
        this.param.country=this.country.id;
        this.param.countryName=this.country.cnameEn;
        this.param.province=this.province.id;
        this.param.provinceName=this.province.cname;
        this.param.city=this.city.id;
        this.param.cityName=this.city.cname;
        this.param.show=false;
        this.param.callback=this.param.callback;
        this.param.link(this.param);
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
      if(this.param.country){
        this.country.cnameEn=this.param.countryName;
        this.province.cname=this.param.provinceName;
        this.city.cname=this.param.cityName;
      }
      this.getCountryList(this.countryParam);

    }
}
</script>
<style scoped>

.big-font {
    font-size: 36px;
}

.top-title {
  position: absolute;
  right: 0;
  top: 0;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.v-select{
    width: 90%;
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

.client-detailInfo {
    padding: 0px 30px 20px 30px;

}
</style>

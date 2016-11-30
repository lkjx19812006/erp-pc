<template>
    <searchemp-model :param="empNameParam" v-if="empNameParam.show"></searchemp-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.search')}}</h3>
        </div>
        <div class="edit-model">
             <!-- <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                         </div> -->
            <section class="editsection" v-cloak>
                <div class="clearfix">
                     <div class="client-detailInfo  col-xs-12">
                        <label>{{$t('static.client_name')}}：</label>
                        <input type="text"  class="form-control" v-model="param.name"  placeholder="{{$t('static.enter_client_name')}}"/>
                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>{{$t('static.business_scope')}}：</label>
                        <input type="text"  class="form-control" v-model="param.bizScope"  placeholder="{{$t('static.enter_business_scope')}}"/>
                    </div>
                    <div class="client-detailInfo  col-xs-6">
                        <label>{{$t('static.province')}}：</label>
                        <div   class="form-control" style="padding:0;border:none;height:31px">
                          <v-select
                              :debounce="250"
                              :value.sync="province"
                              :on-change="selectProvince"
                              :options="initProvince"
                              placeholder="省"
                              label="cname"

                         >
                            </v-select>
                        </div>
                    </div>
                    <div class="client-detailInfo  col-xs-6">
                        <label>{{$t('static.city')}}：</label>
                        <input type="text" v-if="!province.cname" class="form-control" disabled="disabled" v-model="param.cityName" style="height:37px"  placeholder="{{$t('static.select_province_first')}}"/>
                      <div v-if="province.cname"  class="form-control" style="padding:0;border:none;height:31px">
                            <v-select
                                     :debounce="250"
                                     :value.sync="city"
                                     :on-change="selectCity"
                                     :options="initCitylist"
                                     placeholder="市"
                                     label="cname"

                           >
                           </v-select>
                        </div>

                    </div>
                  <div class="client-detailInfo  col-xs-6">
                    <label>{{$t('static.province_of_phone')}}：</label>
                    <div   class="form-control" style="padding:0;border:none;height:31px">
                    <v-select
                      :debounce="250"
                      :value.sync="phoneProvince"
                      :on-change="selectPhoneProvince"
                      :options="initProvince"
                      placeholder="省"
                      label="cname"

                    >

                    </v-select>
                    </div>
                  </div>
                  <div class="client-detailInfo  col-xs-6">
                    <label>{{$t('static.city_of_phone')}}：</label>
                    <input type="text" v-if="!phoneProvince.cname" class="form-control" disabled="disabled" v-model="param.phoneCityName" style="height:37px"  placeholder="{{$t('static.select_province_first')}}"/>
                    <div v-if="phoneProvince.cname"  class="form-control" style="padding:0;border:none;height:31px">
                      <v-select
                        :debounce="250"
                        :value.sync="phoneCity"
                        :on-change="selectPhoneCity"
                        :options="initCitylist"
                        placeholder="市"
                        label="cname"

                      >
                      </v-select>
                    </div>
                  </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.client_phone')}}：</label>
                        <input type="text"  class="form-control" v-model="param.phone"  placeholder="{{$t('static.enter_client_phone')}}"/>
                    </div>
                    <div class="client-detailInfo  col-xs-6" @click="employee(param.employeeId,param.employeeName)" v-if="param.link=='/customer/employeeDistributed'" style="display:none;">
                        <label>{{$t('static.salesman')}}：</label>
                        <input type="text"  class="form-control" v-model="param.employeeName"   placeholder="{{$t('static.select_salesman')}}" disabled="disabled" />
                        <!--<div class="empSearch" ><img src="/static/images/search.png" height="24" width="24"></div>-->
                    </div>
                     <div class="client-detailInfo  col-xs-6" @click="employee(param.employeeId,param.employeeName)" v-else>
                        <label>{{$t('static.salesman')}}：</label>
                        <input type="text"  class="form-control" v-model="param.employeeName"   placeholder="{{$t('static.select_salesman')}}" disabled="disabled" />
                        <!--<div class="empSearch" ><img src="/static/images/search.png" height="24" width="24"></div>-->
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.client_type')}}：</label>
                        <select class="form-control" v-model="param.type">
                            <option value="">{{$t('static.please_select')}}</option>
                            <option v-for="item in initUserType" value="{{item.id}}" >{{item.name}}</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.customer_classification')}}：</label>
                        <select class="form-control"  v-model="param.classify">
                            <option value="" selected>{{$t("static.please_select")}}</option>
                            <option value="1">{{$t("static.purchaser")}}</option>
                            <option value="2">{{$t("static.supplier")}}</option>
                            <option value="3">{{$t("static.purchaser_and_supplier")}}</option>
                        </select>
                    </div>
                  <div class="client-detailInfo col-xs-6">
                    <label>{{$t("static.credit_rating")}}：</label>
                    <select class="form-control"  v-model="param.creditLevel">
                      <option value="" selected>{{$t("static.please_select")}}</option>
                      <option value="0">{{$t("static.none")}}</option>
                          <option value="1">{{$t("static.one_star")}}</option>
                          <option value="2">{{$t("static.two_star")}}</option>
                          <option value="3">{{$t("static.three_star")}}</option>
                    </select>
                  </div>

                  <div class="client-detailInfo col-xs-6">
                    <label>{{$t("static.registration_start_time")}}：</label>
                    <mz-datepicker :time.sync="param.ctimeStart" format="yyyy/MM/dd HH:mm:ss">
                    </mz-datepicker>
                  </div>
                  <div class="client-detailInfo col-xs-6" style="float:right">
                    <label>{{$t("static.registration_end_time")}}：</label>
                    <mz-datepicker :time.sync="param.ctimeEnd" format="yyyy/MM/dd HH:mm:ss">
                    </mz-datepicker>
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetTime()">{{$t("static.clear_all")}}</button>
                  </div>

                  <div class="client-detailInfo col-xs-6">
                    <label>{{$t("static.client_label")}}：</label>
                    <input type="text"  class="form-control" v-model="param.label" />
                  </div>
                    <!-- <div class="client-detailInfo col-xs-12">
                        <label>标签：</label>
                        <select class="form-control" v-model="param.status">
                            <option value="">请选择标签类型</option>
                            <option value="0">优秀客户</option>
                            <option value="1">普通客户</option>
                            <option value="2">难揍客户</option>
                            <option value="3">黑名单</option>
                        </select>
                    </div> -->
                    <!--<div class="client-detailInfo col-xs-12">-->
                        <!--<label>状态：</label>-->
                        <!--<select class="form-control" v-model="param.status">-->
                            <!--<option value="">请选择状态</option>-->
                            <!--<option value="0">无效</option>-->
                            <!--<option value="1">有效</option>-->
                        <!--</select>-->
                    <!--</div>    -->
                </div>
            </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t("static.cancel")}}</button>
            <input type="button" class="btn  btn-confirm"  @click="clientSearch(param.show = false)" value="{{$t('static.confirm')}}">
        </div>
    </div>
</template>
<script>
import searchempModel from '../../components/clientRelate/searchEmpInfo'
import vSelect from '../tools/vueSelect/components/Select'
import {
    initProvince,
    initCitylist,
    initUserType
} from '../../vuex/getters'
import {
    getProvinceList,
    getCityList,
    getClientList,
    getUserTypeList
} from '../../vuex/actions'
export default {
    components: {
        searchempModel,
        vSelect
    },
    props: ['param'],
    data() {
        return {
          loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                name:'',
                phone:'',
                employeeId:'',
                employeeName:'',
                type:'',
                classify:'',
                status:''

            },
            empNameParam:{
                show:false,
                employeeId:'',
                employeeName:''
            },
            province:{
              cname:''
            },
            city:{
              cname:''
            },
          phoneProvince:{
            cname:''
          },
          phoneCity:{
            cname:''
          },
            provinceParam:{
              loading:true,
              show:false,
              color: '#5dc596',
              size: '15px',
              cur: 1,
              all: 7,
              country:''
            },
        }
    },
    vuex: {
        getters: {
            initProvince,
            initCitylist,
            initUserType
        },
        actions: {
            getProvinceList,
            getCityList,
            getClientList,
            getUserTypeList
        }
    },
    events:{
        a:function(qq){
            this.param.employeeId = qq.employeeId;
            this.param.employeeName = qq.employeeName;
        }
    },
    methods:{
        clientSearch:function(){
            if(typeof this.param.city=='undefined'){
                this.param.city = '';
            }
            if(typeof this.param.phoneCityName=='undefined'){
                this.param.phoneCityName = '';
            }
            
              this.getClientList(this.param);
        },
        employee:function(employeeId,employeeName){
            this.empNameParam.show=true;
            this.param.employeeId = this.empNameParam.employeeId;
            this.param.employeeName = this.empNameParam.employeeName;
        },
        selectProvince:function(){
            this.city = '';
            this.param.city = '';
            this.param.cityName = '';
            this.param.province = this.province.id;
            this.param.provinceName = this.province.cname;
            console.log(this.param.cityName);
            if(this.province.cname){
                this.getCityList(this.province);
            }
        },
      resetTime:function(){
        this.param.ctimeStart='';
        this.param.ctimeEnd='';
      },
      selectPhoneProvince:function(){
        this.phoneCity = '';
        this.param.phoneCity = '';
        this.param.phoneCityName = '';
        this.param.phoneProvince = this.phoneProvince.id;
        this.param.phoneProvinceName = this.phoneProvince.cname;
        if(this.phoneProvince.cname){
          this.getCityList(this.phoneProvince);
        }


      },
        selectCity:function(){
            this.param.city = this.city.id;
            this.param.cityName = this.city.cname;
        },
      selectPhoneCity:function(){
        this.param.phoneCity = this.phoneCity.id;
        this.param.phoneCityName = this.phoneCity.cname;
      }
    },
    created() {
        this.param.province = '';
        this.param.city = '';
        this.param.provinceName = '';
        this.param.cityName = '';
        //this.getClientList(this.loadParam);
        this.getProvinceList(this.provinceParam);
        this.getUserTypeList(this.loadParam)

    }
}
</script>
<style scoped>
.modal_con{
    /*max-height: 720px;*/
    width: 700px;
}
.top-title{
    width: 700px;
}
.edit_footer{
    position: fixed;
    bottom: 20px;
    width: 700px;
}
.empSearch{
    position: absolute;
    right: 15px;
    top: 26px;
    width: 6%;
    height: 34px;
    cursor: pointer;
    border-left: 1px solid #ddd;
}
.empSearch >img{
    margin: auto;
    position: relative !important;
    vertical-align: middle;
}
.big-font {
    font-size: 36px;
}

.top-title span {
    font-size: 28px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 15px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
}

.editsection {
    position:relative;
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
.client-detailInfo img{
    position: absolute;
    top: 6px;
}
</style>

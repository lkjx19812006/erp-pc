<template>
    <searchemp-model :param="empNameParam" v-if="empNameParam.show"></searchemp-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>客户搜索</h3>
        </div>
        <div class="edit-model">
             <!-- <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                         </div> -->
            <section class="editsection" v-cloak>
                <div class="clearfix">
                     <div class="client-detailInfo  col-xs-12">
                        <label>名称：</label>
                        <input type="text"  class="form-control" v-model="param.name"  placeholder="按客户名称搜索"/>
                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>经营品种：</label>
                        <input type="text"  class="form-control" v-model="param.bizScope"  placeholder="按客户经营的品种搜索"/>
                    </div>
                    <div class="client-detailInfo  col-xs-6">
                        <label>所在省：</label>
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
                        <label>所在市：</label>
                        <input type="text" v-if="!province.cname" class="form-control" disabled="disabled" v-model="param.cityName" style="height:37px"  placeholder="请先选择一个省"/>
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
                    <label>手机所在省：</label>
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
                    <label>手机所在市：</label>
                    <input type="text" v-if="!phoneProvince.cname" class="form-control" disabled="disabled" v-model="param.phoneCityName" style="height:37px"  placeholder="请先选择一个省"/>
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
                        <label>手机：</label>
                        <input type="text"  class="form-control" v-model="param.phone"  placeholder="按客户手机搜索"/>
                    </div>
                    <div class="client-detailInfo  col-xs-6" @click="employee(param.employeeId,param.employeeName)">
                        <label>业务员ID：</label>
                        <input type="text"  class="form-control" v-model="param.employeeName"   placeholder="按业务员ID搜索" disabled="disabled" />
                        <!--<div class="empSearch" ><img src="/static/images/search.png" height="24" width="24"></div>-->
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>客户类型：</label>
                        <select class="form-control" v-model="param.type">
                            <option value="">请选择类型</option>
                            <option value="0">个人</option>
                            <option value="1">企业</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>客户分类：</label>
                        <select class="form-control"  v-model="param.classify">
                            <option value="" selected>请选择分类</option>
                            <option value="1">买</option>
                            <option value="2">卖</option>
                            <option value="3">买卖</option>
                        </select>
                    </div>
                  <div class="client-detailInfo col-xs-6">
                    <label>客户等级：</label>
                    <select class="form-control"  v-model="param.creditLevel">
                      <option value="" selected>请选择等级</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                    </select>
                  </div>
                  <div class="client-detailInfo col-xs-6">
                    <label>客户标签：</label>
                    <input type="text"  class="form-control" v-model="param.label"   placeholder="按会员标签搜索"  />
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
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <input type="button" class="btn  btn-confirm"  @click="clientSearch(param.show = false)" value="确定">
        </div>
    </div>
</template>
<script>
import searchempModel from '../../components/clientRelate/searchEmpInfo'
import vSelect from '../tools/vueSelect/components/Select'
import {
    initProvince,
    initCitylist
} from '../../vuex/getters'
import {
    getProvinceList,
    getCityList,
    getClientList
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
            initCitylist
        },
        actions: {
            getProvinceList,
            getCityList,
            getClientList
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
            if(this.province.cname){
                this.getCityList(this.province);
            }


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

    }
}
</script>
<style scoped>
.modal_con{
    /*max-height: 720px;*/
    width: 600px;
}
.top-title{
    width: 600px;
}
.edit_footer{
    position: fixed;
    bottom: 20px;
    width: 600px;
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

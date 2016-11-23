<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>会员搜索</h3>
        </div>
        <div class="edit-model">
             <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <section class="editsection" v-cloak>
                <div class="clearfix">
                     <div class="client-detailInfo  col-xs-12">
                        <label>名称：</label>
                        <input type="text"  class="form-control" v-model="param.fullname"  placeholder="按会员名称搜索"/>
                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>来源：</label>
                        <select type="text" class="form-control" v-model="param.source">
                            <option value="">请选择来源</option>
                            <option value="1">PC</option>
                            <option value="2">安卓</option>
                            <option value="3">微信</option>
                            <option value="4">IOS</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>主营业务：</label>
                        <input type="text"  class="form-control" v-model="param.bizMain"  placeholder="按经主营业务搜索"/>
                    </div>
                  <div class="client-detailInfo  col-xs-12">
                    <label>经营类型：</label>
                    <select class="form-control edit-input"  v-model="param.bizType"  >
                      <option value="" selected>请选择经营类型</option>
                      <option value="0">其它</option>
                      <option value="1">合作社</option>
                      <option value="2">药商</option>
                      <option value="3">药厂</option>
                      <option value="4">个体户</option>
                      <option value="5">药店</option>
                      <option value="6">医院</option>
                      <option value="7">贸易公司</option>
                      <option value="8">零售商行</option>
                      <option value="9">药农</option>
                      <option value="10">介绍人</option>
                      <option value="11">药贩子</option>
                      <option value="12">产地药商</option>
                      <option value="13">销地药商</option>
                      <option value="14">养生诊所</option>
                      <option value="15">化工厂</option>
                      <option value="16">化妆品厂</option>
                      <option value="17">提取物厂</option>
                      <option value="18">食品厂</option>
                      <option value="19">实验室</option>
                      <option value="20">网上电商</option>
                      <option value="21">中成药生产商</option>
                      <option value="22">西药生产商</option>
                      <option value="23">饮片厂</option>
                    </select>
                  </div>
                  <div class="client-detailInfo  col-xs-6">
                    <label>手机省：</label>
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
                    <!--<input type="text"  class="form-control" v-model="param.province"  placeholder="按手机省搜索"/>-->
                  </div>
                  <div class="client-detailInfo  col-xs-6">
                    <label>手机市：</label>
                    <input type="text" v-if="!phoneProvince.cname" class="form-control" disabled="disabled"  style="height:37px"  placeholder="请先选择一个省"/>
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
                    <!--<input type="text"  class="form-control" v-model="param.city"  placeholder="按手机市搜索"/>-->
                  </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>手机号：</label>
                        <input type="text"  class="form-control" v-model="param.phone"  placeholder="按手机号搜索"/>
                    </div>
                    <div class="client-detailInfo col-xs-5">
                        <label>注册时间起始：</label>
                        <mz-datepicker :time.sync="param.startCtime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-7">
                        <label>注册时间结束：</label>
                        <mz-datepicker :time.sync="param.endCtime" format="yyyy/MM/dd HH:mm:ss" class="a">
                        </mz-datepicker>
                        <button type="button" class="btn btn-default" height="24" width="24" @click="resetTime()">清空</button>
                    </div>

                    <div class="client-detailInfo col-xs-12">
                        <label>审核状态：</label>
                        <select type="text" class="form-control" v-model="param.audit">
                            <option value="">请选择审核状态</option>
                            <option value="0">待审核</option>
                            <option value="1">审核中</option>
                            <option value="2">审核通过</option>
                            <option value="3">审核不通过</option>
                      </select>
                    </div>

                    <div class="client-detailInfo col-xs-12">
                      <label>划转状态：</label>
                      <select type="text" class="form-control" v-model="param.transform">
                        <option value="">请选择划转状态</option>
                        <option value="0">待划转</option>
                        <option value="1">已划转</option>
                        <option value="2">转黑</option>
                      </select>
                    </div>
                </div>
            </section>

        </div>
      <!--<div class="edit_footer">-->
        <!--<button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>-->
        <!--<input type="button" class="btn  btn-confirm"  @click="userSearch(param,param.show = false)" value="确定">-->
      <!--</div>-->

    </div>
    <div class="edit_footer">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="userSearch(param,param.show = false)" value="确定">
    </div>
</template>
<script>

import vSelect from '../tools/vueSelect/components/Select'
import {
  initProvince,
  initCitylist
} from '../../vuex/getters'
import {
    getProvinceList,
    getCityList,
    getUserList
} from '../../vuex/actions'
export default {
    components: {
      vSelect
    },
    props: ['param'],
    data() {
        return {
          loadParam: {
                loading: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                name:'',
                tel:'',
                employeeId:'',
                employeeName:''
            },
            empNameParam:{
                show:false,
                employeeId:'',
                employeeName:''
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
          getUserList
        }
    },
    methods:{
        userSearch:function(param){
            this.param.cur = 1;
            this.getUserList(this.param);
        },
        resetTime:function(){
        	this.param.startCtime = "";
        	this.param.endCtime = "";
        },
      selectPhoneProvince:function(){
        this.phoneCity = '';
        this.param.city = '';
        this.param.phoneCityName = '';
        this.param.province = this.phoneProvince.cname;
        this.param.phoneProvinceName = this.phoneProvince.cname;
        if(this.phoneProvince.cname){
          this.getCityList(this.phoneProvince);
        }
      },
      selectPhoneCity:function(){
        this.param.city = this.phoneCity.cname;
        this.param.phoneCityName = this.phoneCity.cname;
      }
    },
    created() {
      this.param.province = '';
      this.param.city = '';
      this.getProvinceList(this.provinceParam);
    }
}
</script>
<style scoped>
.modal_con{

    width: 600px;
}
.top-title{
    position: absolute;
    width: 100%;
    top: 0;
}
.edit_footer{
    position: fixed;
    bottom: 50px;
    width: 100%;
  z-index: 1080;
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
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 60px 30px;
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

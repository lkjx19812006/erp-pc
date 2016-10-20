<template>
    <select-model :param="selectParam" v-if="selectParam.show"></select-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{param.name}}的信息</h3>
        </div>
        <div class="edit-model">
            <section class="editsection" v-cloak>
                <div class="editpage">
                    <div class="editpageleft">
                        <div class="editpage-input">
                            <label class="editlabel">名称</label>
                            <input type="text" v-model='param.name' class="form-control edit-input" value="{{param.name}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">类型</label>
                            <select class="form-control edit-input"  v-model='param.type'>
                                 <option value="0">个人</option>
                                 <option value="1">企业</option>
                            </select>
                            <!-- <input type="text" v-model='param.type' class="form-control edit-input" value="{{param.type}}" /> -->
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">分类码</label>
                            <input type="text" v-model='param.category' class="form-control edit-input" value="{{param.category}}" />
                        </div>
                         <div class="editpage-input">
                            <label  class="editlabel">所在国家</label>
                             <div type="text">
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
                            <label class="editlabel">所在省</label>
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
                            <label class="editlabel">所在市</label>
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
                            <label class="editlabel">经营范围</label>
                            <input type="text" v-model='param.bizScope' class="form-control edit-input" value="{{param.bizScope}}" />
                        </div>
                    </div>
                    <div class="editpageright">
                        <div class="editpage-input">
                            <label class="editlabel">分类</label>
                            <select class="form-control edit-input"  v-model='param.classify' >
                                 <option value="0">买</option>
                                 <option value="1">卖</option>
                                 <option value="2">买卖</option>
                            </select>
                        </div>

                      <div class="editpage-input">
                        <label>业务员/部门</label>
                        <input v-if="!param.orgId" type="text" class="form-control" readonly="readonly"
                               v-model="param.employeeName" @click="selectParam.show=true"/>
                        <input v-if="param.orgId" type="text" class="form-control" readonly="readonly" v-model="param.orgName"
                               @click="selectParam.show=true"/>
                      </div>

                        <div class="editpage-input">
                            <label class="editlabel">负责人</label>
                            <input type="text" v-model='param.principal' class="form-control edit-input" value="{{param.principal}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">电话</label>
                            <input type="text" v-model="param.mainPhone" class="form-control edit-input" value="{{param.mainPhone}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">邮箱</label>
                            <input type="text" v-model="param.email" class="form-control edit-input" value="{{param.email}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">备注</label>
                            <input type="text" v-model='param.comments' class="form-control edit-input" value="{{param.comments}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">注册地址</label>
                            <input type="text" v-model='param.address' class="form-control edit-input" value="{{param.address}}" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <!-- <button type="button" class="btn  btn-confirm" @click="param.link(param,param.show = false)">确定</button> -->
            <button type="button" class="btn  btn-confirm" @click="confirm()">确定</button>
        </div>
    </div>
</template>
<script>
import tipsdialogModel  from '../tips/tipDialog'
import vSelect from '../tools/vueSelect/components/Select'
import selectModel  from '../user/employeeOrOrg.vue'

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
            tipsParam:{
                show:false,
                confirm:true,
                name:"确认修改信息?",
                callback:this.alertInfo

              },
                province: {
                  cname: ''
                },
                city: {
                  cname: ''
                },
                country:{
                  cname: ''
                },
                countryParam:{
                  loading:true,
                  show:false,
                  color: '#5dc596',
                  size: '15px',
                  cur: 1,
                  all: 7
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
                cityParam:{
                  loading:true,
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
          getCityList
        }
    },
    methods: {
        alertInfo: function(){
            this.param.show = false;
            this.param.link(this.param);
        },
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
        this.param.countryName=this.country.cname;
        this.param.province=this.province.id;
        this.param.provinceName=this.province.cname;
        this.param.city=this.city.id;
        this.param.cityName=this.city.cname;
        this.tipsParam.show=true

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
        this.country.cname=this.param.countryName;
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

.top-title span {
    font-size: 28px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.v-select{
    width: 90%;
}
.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
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

.client-detailInfo {
    padding: 0px 30px 20px 30px;

}
</style>

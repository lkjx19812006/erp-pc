<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建客户地址</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.name')}}<span class="system_danger" v-if="$validation.name.minlength">{{$t('static.validate_name')}}</span></label>
                                    <input type="text" class="form-control edit-input"  v-model="param.contactName" v-validate:name="{minlength:2}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.type')}}<span class="system_danger" v-if="$validation.aa.required">{{$t('static.validate_type')}}</span></label>
                                    <input type="text" class="form-control edit-input"  v-model="param.type" v-validate:aa="['required']" v-show="false"/> 
                                    <select class="form-control edit-input"  v-model="param.type" >
                                       <option value="0">普通</option>
                                       <option value="1">默认</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.cellphone')}}<span class="system_danger" v-if="$validation.phone.phone">{{$t('static.validate_cellphone')}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.contactPhone" v-validate:phone="['phone']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.sex')}}</label>
                                    <select  class="form-control" v-model="param.sex" style="width:90%;">
                                        <option value="1">女</option>
                                        <option value="0">男</option>
                                    </select>
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.address')}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.address" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.street')}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.street" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.countylist}}</label>
                                    <input type="text" class="form-control edit-input"  id="country" v-model="param.country" v-validate:country="['required']" /> -->
                                    <label class="editlabel">{{$t('static.country')}} <span class="system_danger" v-if="!country.cname"></span></label>
                                    <div type="text" class="edit-input">
                                        <v-select
                                           :debounce="250"
                                           :value.sync="country"
                                           :on-change="selectProvince"
                                           :options="initCountrylist"
                                           placeholder="国家"
                                           label="cname"></v-select>
                                    </div>
                                </div>
                                 <div class="editpage-input">
                                   <!--  <label class="editlabel">{{param.provicelist}}</label>
                                    <input type="text" class="form-control edit-input"  id="province" v-model="param.province" v-validate:province="['required']"/> -->
                                    <label class="editlabel">{{$t('static.province')}}<span class="system_danger" v-if="!country.cname"></span></label>
                                    <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_country_first')}}" />
                                    <div v-if="country.cname" type="text" class="edit-input">
                                        <v-select
                                          :debounce="250"
                                          :value.sync="province"
                                          :on-change="selectCity"
                                          :options="initProvince"
                                          placeholder="省"
                                          label="cname"></v-select>
                                    </div>
                                </div>
                                 <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.citylist}}</label>
                                    <input type="text" class="form-control edit-input"  id="city" v-model="param.city" v-validate:city="['required']" /> -->
                                    <label class="editlabel">{{$t('static.city')}}<span class="system_danger" v-if="!country.cname"></span></label>
                                    <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_province_first')}}" />
                                    <div v-if="province.cname" type="text" class="edit-input">
                                       <v-select
                                         :debounce="250"
                                         :value.sync="city"
                                         :on-change="selectDistrict"
                                         :options="initCitylist"
                                         placeholder="市"
                                         label="cname"></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.distlist}}</label>
                                    <input type="text" class="form-control edit-input"  id="district" v-model="param.district" v-validate:district="['required']" /> -->
                                    <label class="editlabel">{{$t('static.area')}}<span class="system_danger" v-if="!country.cname"></span></label>
                                    <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="{{$t('static.select_city_first')}}" />
                                    <div v-if="city.cname" type="text" class="edit-input">
                                        <v-select
                                            :debounce="250"
                                            :value.sync="district"
                                            :on-change="sDistrict"
                                            :options="initDistrictlist"
                                            placeholder="区"
                                            label="cname" ></v-select>
                                    </div>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.detailed_address')}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.detailAddr"  />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid"  @click="param.link(param,param.show = false)">{{$t('static.save')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else  disabled="true">{{$t('static.save')}}</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist
}from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList
} from '../../vuex/actions'
export default {
    components: {
        vSelect
    },
    props: ['param'],
    data() {
        return {
          country:{
              cname:''
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
            },
            districtParam:{
              loading:true,
              show:false,
              color: '#5dc596',
              size: '15px',
              cur: 1,
              all: 7,
              city:''
            }
        }
    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
        }
    },
    vuex : {
        getters : {
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist
        },
        actions : {
            getCountryList,
            getProvinceList,
            getCityList,
            getDistrictList
        }
    },
    methods : {
        selectProvince:function(){
            this.param.country = this.country.cname;
            this.province = '';
            this.city = '';
            this.district = '';
            if(this.country!=''&&this.country!=null){
              this.getProvinceList(this.country);
            }
        },
        selectCity:function(){
            this.param.province = this.province.cname;
            this.city = '';
            this.district = '';
            if(this.province!=''&&this.province!=null){
              this.getCityList(this.province);
            }
        },
        selectDistrict:function(){
            this.param.city = this.city.cname;
            this.district = '';
            if(this.city!=''&&this.city!=null){
              this.getDistrictList(this.city);
            }
        },
        sDistrict : function (){
            this.param.district = this.district.cname;
        } 
        
    },
  created() {
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

        this.getCountryList(this.countryParam);   
    }
}
</script>
<style scoped>
.modal{
  z-index: 1083;
}
.modal_con{
  z-index: 1084;
  bottom: 200px;
}
.top-title{
    position: absolute;
    top: 0;
    right: 0;
}
.edit_footer{
  bottom: 200px;
}
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
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

.edit-input {
    height: 36px;
    line-height: 18px;
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
.edit_footer button {
    margin-left: 15px;
}
</style>

<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建客户{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.namelist}}<span class="system_danger" v-if="$validation.name.minlength">请输入姓名且不少于两位数</span></label>
                                    <input type="text" class="form-control edit-input"  v-model="param.contactName" v-validate:name="{minlength:2}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.typelist}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.type" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.phonelist}}<span class="system_danger" v-if="$validation.phone.phone">请输入正确的号码</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.contactPhone" v-validate:phone="['phone']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.sexlist}}</label>
                                    <select  class="form-control" v-model="param.sex" style="width:90%;">
                                        <option value="1">女</option>
                                        <option value="0">男</option>
                                    </select>
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.addr}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.address" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.streetlist}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.street" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <!-- <label class="editlabel">{{param.countylist}}</label>
                                    <input type="text" class="form-control edit-input"  id="country" v-model="param.country" v-validate:country="['required']" /> -->
                                    <label class="editlabel">国家</label>
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
                                    <label class="editlabel">省</label>
                                    <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
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
                                    <label class="editlabel">市</label>
                                    <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个省" />
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
                                    <label class="editlabel">区</label>
                                    <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个市" />
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
                                    <label class="editlabel">{{param.addr_detail}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.detailAddr"  />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid"  @click="param.link(param,param.show = false)">保存</button>
                    <button type="button" class="btn  btn-confirm" v-else  disabled="true">保存</button>
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

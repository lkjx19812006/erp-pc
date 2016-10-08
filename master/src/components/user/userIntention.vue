<template>
    <country-model :param="countryParam" v-if="countryParam.show"></country-model>
    <province-model :param="provinceParam" v-if="provinceParam.show"></province-model>
    <city-model :param="cityParam" v-if="cityParam.show"></city-model>
    <district-model :param="districtParam" v-if="districtParam.show"></district-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3 v-if="param.flag==0">新增会员意向</h3>
            <h3 v-if="param.flag==1">修改会员意向</h3>
        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak> 
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />

               <div style="margin-top:15px">
                  <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                  <h4 style="display:inline">药材信息</h4>           
               </div>

               <div class="editpage">
                   <div class="editpageleft">

                       <div class="editpage-input">
                           <label class="editlabel">品种名称</label>
                            <input type="text" v-model='param.breedName' class="form-control edit-input" value="{{param.breedName}}" @click="searchBreed(param.breedName,param.breedId)" />
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">单价</label>
                            <input type="text" v-model='param.price' class="form-control edit-input" value="{{param.price}}" />
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">单位</label>
                           <input type="text" v-model="param.unit" class="form-control edit-input" value="{{param.unit}}" />
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">是否特殊</label>
                           <select type="text" class="form-control edit-input" v-model="param.especial">
                                <option value="0">普通</option>
                                <option value="1">特殊</option>
                           </select>
                       </div>

                        <div class="editpage-input">
                           <label class="editlabel">质量要求</label>
                           <input type="text" v-model="param.quality" class="form-control edit-input" value="{{param.quality}}" />
                       </div>

                   </div>
                   <div class="editpageright">

                       <div class="editpage-input">
                           <label class="editlabel">规格</label>
                            <input type="text" v-model='param.spec' class="form-control edit-input" value="{{param.spec}}" />
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">数量</label>
                           <input type="text" v-model="param.number" class="form-control edit-input" value="{{param.number}}" />
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">产地</label>
                           <input type="text" v-model="param.location" class="form-control edit-input" value="{{param.location}}" />
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">意向类型</label>
                           <select type="text" class="form-control edit-input" v-model="param.type">
                                <option value="0">求购</option>
                                <option value="1">供应</option>
                           </select>
                       </div>
                                      
                   </div>
               </div>

               <div style="margin-top:25px">
                  <img src="/static/images/receiverinfo@2x.png" style="display:inline"/>
                  <h4 style="display:inline">交收信息</h4>           
               </div>
               <div class="editpage">
                   <div class="editpageleft">
                       <div class="editpage-input">
                           <label class="editlabel">省</label>
                           <input type="text" v-if="!country" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
                           <v-select v-if="country"
                              :debounce="250" 
                              :value.sync="province" 
                              :on-search="selectCity()" 
                              :options="initProvince" 
                              placeholder="省" 
                              label="cname">

                            </v-select>
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">区</label>
                            <input type="text" v-if="!city" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个市" />
                            <v-select v-if="city"
                              :debounce="250" 
                              :value.sync="district" 
                              :on-search="" 
                              :options="initDistrictlist" 
                              placeholder="区" 
                              label="cname">

                            </v-select>

                       </div>

                        <div class="editpage-input">
                            <label class="editlabel">国家</label>
                            <div type="text" class="edit-input">
                              <v-select 
                                :debounce="250" 
                                :value.sync="country" 
                                :on-search="selectProvince()" 
                                :options="initCountrylist" 
                                placeholder="国家" 
                                label="cname">
                              </v-select>
                            </div>
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">发票</label>
                           <select type="text" class="form-control edit-input" v-model="param.invoic">
                                <option value="0">无</option>
                                <option value="1">普通</option>
                                <option value="2">增值</option>
                           </select>
                       </div>

                        <div class="editpage-input">
                           <label class="editlabel">是否提供样品</label>
                           <select type="text" class="form-control edit-input" v-model="param.sampling">
                                <option value="0">无</option>
                                <option value="1">有</option>
                           </select>
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">样品单位</label>
                            <input type="text" v-model='param.sampleUnit' class="form-control edit-input" value="{{param.sampleUnit}}" />
                       </div>
   

                   </div> 
                   
                   <div class="editpageright">
                       <div class="editpage-input">
                           <label class="editlabel">市</label>
                           <input type="text" v-if="!province" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个省" />
                           <v-select v-if="province"
                              :debounce="250" 
                              :value.sync="city" 
                              :on-search="selectDistrict()" 
                              :options="initCitylist" 
                              placeholder="市" 
                              label="cname">

                            </v-select>
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">详细地址</label>
                            <input type="text" v-model='param.address' class="form-control edit-input" value="{{param.address}}" />
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">预付比例</label>
                            <input type="text" v-model='param.advance' class="form-control edit-input" value="{{param.advance}}" />
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">是否国际</label>
                           <select type="text" class="form-control edit-input" v-model="param.intl">
                                <option value="0">国内</option>
                                <option value="1">国际</option>
                           </select>
                       </div>

                       <div class="editpage-input">
                           <label class="editlabel">样品数量</label>
                            <input type="text" v-model='param.sampleNumber' class="form-control edit-input" value="{{param.sampleNumber}}" />
                       </div> 

                       <div class="editpage-input">
                           <label class="editlabel">样品总价</label>
                            <input type="text" v-model='param.sampleAmount' class="form-control edit-input" value="{{param.sampleAmount}}" />
                       </div>  

                  </div>    
               </div>

               <div style="margin-top:25px">
                  <img src="/static/images/sellerinfo@2x.png" style="display:inline"/>
                  <h4 style="display:inline">商家信息</h4>           
               </div>
               <div class="editpage">
                   <div class="editpageleft">
                        <div class="editpage-input">
                           <label class="editlabel">资质证书</label>
                           <input type="text" v-model='param.qualification' class="form-control edit-input" value="{{param.qualification}}" />
                       </div>
                   </div>
               </div>     

           </section>
        </div>  
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="createOrUpdateIntention(param,param.show = false)">确定</button>
        </div>
    </div>
</template>
<script>
import searchbreedModel  from '../Intention/breedsearch'
import countryModel  from '../address/countryList'
import provinceModel  from '../address/provinceList'
import cityModel  from '../address/cityList'
import districtModel  from '../address/districtList'
import vSelect from '../tools/vueSelect/components/Select'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist
} from '../../vuex/getters'
import {   
    createIntentionInfo,
    editintentInfo,
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList
} from '../../vuex/actions'
export default {
    components: {
        searchbreedModel,
        vSelect,
        countryModel,
        provinceModel,
        cityModel,
        districtModel,

    },
    props: ['param'],
    data() {
        return {
          breedParam:{
              show:false,
              breedName:'',
              breedId:''
            },
            country:'',
            province:'',
            city:'',
            district:'',
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
    vuex: {
       getters: {
          initCountrylist,
          initProvince,
          initCitylist,
          initDistrictlist
        },
        actions: {
          createIntentionInfo,
          editintentInfo,
          getCountryList,
          getProvinceList,
          getCityList,
          getDistrictList
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
    methods: {
      searchBreed:function(breedName,breedId){
        console.log('breed');
            this.breedParam.show=true;
            /*this.param.breedName = this.breedParam.breedName;
            this.param.breedId = this.breedParam.breedId;*/
        },
      createOrUpdateIntention:function(){
        if(this.param.flag==0){
          console.log('新增会员意向');    
          this.param.country = this.country.cname;
          this.param.province = this.province.cname;
          this.param.city = this.city.cname;
          this.param.district = this.district.cname;
          this.param.show=false;
          this.createIntentionInfo(this.param);
        }
        if(this.param.flag==1){
          console.log('修改会员意向');

          this.param.country = this.country.cname;
          this.param.province = this.province.cname;
          this.param.city = this.city.cname;
          this.param.district = this.district.cname;
          this.param.show=false;
          this.editintentInfo(this.param);
        }

          
      },
      /*selectCountry:function(){
          this.countryParam.show=true;
      },*/
      selectProvince:function(){
        console.log('selectProvince');
        this.province = '';
        this.city = '';
        this.district = '';
        if(this.country!=''&&this.country!=null){
          this.getProvinceList(this.country);
        }
        
      },
      selectCity:function(){
        this.city = '';
        this.district = '';
        if(this.province!=''&&this.province!=null){
          this.getCityList(this.province);
        }
        
      },
      selectDistrict:function(){
        this.district = '';
        if(this.city!=''&&this.city!=null){
          this.getDistrictList(this.city);
        }
        
      }
        
    },
    events:{
        breed:function(breed){
            this.param.breedName = breed.breedName;
            this.param.breedId = breed.breedId;
        },
        /*country:function(country){
          console.log('country');
            this.param.countryName = country.cname;
            this.param.country = country.id;
            this.provinceParam.country = country.id;
            this.param.province = '';   //选国家,要将省市区置空
            this.param.city = '';
            this.param.district = '';
        },
        province:function(province){
            console.log('province');
            console.log(province.id);
            this.param.provinceName = province.cname;
            this.param.province = province.id;
            this.cityParam.province = province.id;
            this.param.city = '';     //选省,要将市区置为空
            this.param.district = '';
        },
        city:function(city){
            this.param.cityName = city.cname;
            this.param.city = city.id;
            this.districtParam.city = city.id;
            this.param.district = '';  //选市,要将区置为空
        },
        district:function(district){
            this.param.districtName = district.cname;
            this.param.district = district.id;
        }*/

    },
    created(){
      
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
    bottom: 10px;
    width: 800px;
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
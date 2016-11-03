<template>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
    <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3 v-if="param.flag==0">新增意向</h3>
            <h3 v-if="param.flag==1">修改意向</h3>
        </div>
        <validator name="validation">
          <div class="edit-model">
            <!--<div class="cover_loading">-->
              <!--<pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>-->
            <!--</div>-->
            <div class="cover_loading">
              <pulse-loader :loading="breedParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
             <section class="editsection" v-cloak>
                 <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />

                 <div v-if="param.selectCustomer" style="margin-top:15px">
                    <label class="editlabel">选择客户</label>
                    <input type="text" v-model='param.customerName' class="form-control edit-input" style="width:95%" readonly="readonly" @click="searchCustomer(param.customerName,param.customerId,param.customerPhone)"/>
                 </div>

                 <div style="margin-top:15px">
                    <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                    <h4 style="display:inline">药材信息</h4>
                 </div>

               <div class="editpage">
               <div class="editpage-input" style="width:100%">
                 <label class="editlabel">药材图片</label>
                 <press-image :value.sync="param.image_f" :showurl.sync="param.image_f_show" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>
                 <press-image :value.sync="param.image_s" :showurl.sync="param.image_s_show" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>
                 <press-image :value.sync="param.image_t" :showurl.sync="param.image_t_show" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>
               </div>
                 </div>
                 <div class="editpage">

                     <div class="editpageleft">

                         <div class="editpage-input">
                             <label class="editlabel" >品种名称<span class="system_danger" v-if="$validation.breedname.required">品种不能为空</span></label>
                             <input type="text" v-model="param.breedName" class="form-control edit-input" v-validate:breedname="{required:true}" value="{{param.breedName}}" @click="searchBreed(param.breedName,param.breedId)" readonly="true" />
                         </div>

                         <div class="editpage-input" style="width:80%">
                              <label class="editlabel" >单价<span class="system_danger" v-if="$validation.price.money">请输入不超过小数点两位的数字</span></label>
                              <input type="text" v-model='param.price' v-validate:price="['money']" class="form-control edit-input" value="{{param.price}}"  style="display:-webkit-inline-box"/><span v-show="param.unit">/{{param.unit}}</span>
                         </div>
                         <div class="editpage-input">
                             <label class="editlabel">单位<span class="system_danger" v-if="$validation.unit.required">单位不能为空</span></label>
                           <input type="text" v-show="!breedParam.id"  v-model="param.unit" v-validate:unit="{required:true}" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />
                           <div type="text" class="edit-input" v-if="breedParam.id">
                             <input-select
                               :value.sync="param.unit"
                               :prevalue="param.unit"
                               :options="initBreedDetail.units.arr"
                               placeholder="单位"
                               label="name"
                             >
                             </input-select>
                           </div>
                         </div>
                         <div class="editpage-input">
                             <label class="editlabel" >是否特殊</label>
                              <select type="text" class="form-control edit-input" v-model="param.especial" >
                                  <option value="0">普通</option>
                                  <option value="1">特殊</option>
                              </select>
                         </div>

                          <div class="editpage-input">
                             <label class="editlabel">质量要求<span class="system_danger" v-if="$validation.quality.required">质量要求不能为空</span></label>
                             <input type="text" v-model="param.quality" class="form-control edit-input" v-validate:quality="{required:true}" value="{{param.quality}}" />
                         </div>

                       <div class="editpage-input">
                         <label class="editlabel">包装<span class="system_danger" v-if="$validation.pack.required">包装不能为空</span></label>
                         <input type="text" v-show="false"  v-model="param.pack" v-validate:pack="{required:true}"  />

                         <select type="text" class="form-control edit-input" v-model="param.pack">
                           <option value={{item}} v-for="item in tag">{{item}}</option>

                         </select>

                         <!--<div type="text" class="edit-input" >-->
                           <!--<input-select-->
                             <!--:prevalue="param.pack"-->
                             <!--:value.sync="param.pack"-->
                             <!--:options="tag"-->
                             <!--placeholder="包装"-->
                           <!--&gt;-->
                           <!--</input-select>-->
                         <!--</div>-->
                       </div>
                     </div>

                     <div class="editpageright">

                         <div class="editpage-input">
                             <label class="editlabel">规格<span class="system_danger" v-if="$validation.spec.required">规格不能为空</span></label>
                           <input type="text" v-show="!breedParam.id"  v-model="param.spec" class="form-control edit-input" disabled="disabled" v-validate:spec="{required:true}" />
                           <div type="text" class="edit-input" v-if="breedParam.id">
                             <input-select
                               :value.sync="param.spec"
                               :prevalue="param.spec"
                               :options="initBreedDetail.specs.arr"
                               placeholder="规格"
                               label="name"
                             >
                             </input-select>
                           </div>
                         </div>

                         <div class="editpage-input">
                              <label class="editlabel" for="system">数量<span class="system_danger" v-if="$validation.number.quantity">请输入不超过小数点四位的数字</span></label>
                             <input type="text" v-model="param.number" v-validate:number="['quantity']" class="form-control edit-input" value="{{param.number}}" />
                         </div>

                         <div class="editpage-input">

                             <label class="editlabel">产地<span class="system_danger" v-if="$validation.location.required">产地不能为空</span></label>
                           <input type="text" v-model="param.location" v-show="!breedParam.id"  v-validate:location="{required:true}" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />

                           <div type="text" class="edit-input" v-if="breedParam.id">
                             <input-select
                               :prevalue="param.location"
                               :value.sync="param.location"
                               :options="initBreedDetail.locals.arr"
                               placeholder="产地"
                               label="name"

                             >
                             </input-select>
                           </div>

                         </div>

                         <div class="editpage-input">
                             <label class="editlabel">意向类型</label>
                             <select type="text" class="form-control edit-input" v-model="param.type">
                                  <option value="0">求购</option>
                                  <option value="1">供应</option>
                             </select>
                         </div>

                       <div class="editpage-input">
                         <label class="editlabel">上门看货</label>
                         <select type="text" class="form-control edit-input" v-model="param.visit">
                           <option value="0">否</option>
                           <option value="1">会</option>
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

                         <label class="editlabel">国家<span class="system_danger" v-if="$validation.country.required">请选择国家</span></label>
                         <input type="text" v-show="false" v-model="country.cname" v-validate:country="['required']">
                         <div type="text" class="edit-input" >
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
                             <label class="editlabel">省<span class="system_danger" v-if="$validation.province.required">请选择省</span></label>
                             <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
                             <input type="text" v-show="false" v-model="province.cname" v-validate:province="['required']">
                           <div v-if="country.cname" type="text" class="edit-input">
                              <v-select
                                :debounce="250"
                                :value.sync="province"
                                :on-change="selectCity"
                                :options="initProvince"
                                placeholder="省"
                                label="cname">

                              </v-select>
                             </div>
                         </div>

                       <div class="editpage-input">
                         <label class="editlabel">市</label>
                         <input type="text" v-if="!province.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个省" />
                         <div v-if="province.cname" type="text" class="edit-input">
                         <v-select
                                   :debounce="250"
                                   :value.sync="city"
                                   :on-change="selectDistrict"
                                   :options="initCitylist"
                                   placeholder="市"
                                   label="cname"
                         >
                         </v-select>
                           </div>
                       </div>

                         <div class="editpage-input">
                             <label class="editlabel">区</label>
                              <input type="text" v-if="!city.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个市" />
                           <div v-if="city.cname" type="text" class="edit-input">
                           <v-select
                                :debounce="250"
                                :value.sync="district"
                                :options="initDistrictlist"
                                placeholder="区"
                                label="cname"
                           >
                              </v-select>
                             </div>
                         </div>

                       <div class="editpage-input">
                         <label class="editlabel">详细地址<span v-if="$validation.address.required" class="system_danger">请输入详细地址</span></label>
                         <input type="text" v-model='param.address' v-validate:address="['required']" class="form-control edit-input" value="{{param.address}}" />
                       </div>

                       <div class="editpage-input">
                         <label class="editlabel">过期时间</label>
                         <mz-datepicker :time.sync="param.duedate" format="yyyy-MM-dd HH:mm:ss" class="a">
                         </mz-datepicker>
                         <button type="button" class="btn btn-default" height="24" width="24" @click="reset()">清空</button>
                       </div>
                     </div>

                     <div class="editpageright">

                       <div class="editpage-input">
                         <label class="editlabel">是否国际</label>
                         <select type="text" class="form-control edit-input" v-model="param.intl">
                           <option value="0">国内</option>
                           <option value="1">国际</option>
                         </select>
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
                             <label class="editlabel">预付比例</label>
                           <select type="text" class="form-control edit-input" v-model="param.advance">
                             <option value=0>0</option>
                             <option value=0.1>10%</option>
                             <option value=0.2>20%</option>
                             <option value=0.3>30%</option>
                             <option value=0.4>40%</option>
                             <option value=0.5>50%</option>
                             <option value=0.6>60%</option>
                             <option value=0.7>70%</option>
                             <option value=0.8>80%</option>
                             <option value=0.9>90%</option>
                             <option value=1>100%</option>
                           </select>

                         </div>



                       <div class="editpage-input">
                         <label class="editlabel">是否提供样品</label>
                         <select type="text" class="form-control edit-input" v-model="param.sampling">
                           <option value="0">无</option>
                           <option value="1">有</option>
                         </select>
                       </div>

                       <div class="editpage-input" v-show="param.sampling==1">
                         <label class="editlabel">样品单位</label>

                         <div type="text" class="edit-input">
                           <input-select
                             :prevalue="param.sampleUnit"
                             :value.sync="param.sampleUnit"
                             :options="initBreedDetail.units.arr"
                             placeholder="样品单位"
                             label="name"
                           >
                           </input-select>
                         </div>
                       </div>
                       <div class="editpage-input" v-show="param.sampling==1">
                             <label class="editlabel">样品数量</label>
                              <input type="text" v-model='param.sampleNumber' class="form-control edit-input" value="{{param.sampleNumber}}" />
                         </div>

                         <div class="editpage-input" v-show="param.sampling==1">
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
                            <select type="text" class="form-control edit-input" v-model="param.qualification" placeholder="请输入资质证书">
                              <option value="GMP">GMP</option>
                              <option value="GSP">GSP</option>
                            </select>
                         </div>
                     </div>
                 </div>

             </section>
          </div>
          <div class="edit_footer">
              <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
              <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="createOrUpdateIntention()">确定</button>
              <button type="button" class="btn  btn-confirm" v-else disabled="true">确定</button>
          </div>
        </validator>
    </div>
</template>
<script>
import searchbreedModel  from '../Intention/breedsearch'
import searchcustomerModel  from '../Intention/clientname'
import vSelect from '../tools/vueSelect/components/Select'
import inputSelect from '../tools/vueSelect/components/inputselect'
import tipdialogModel from '../tips/tipDialog'
import pressImage from '../imagePress'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist,
    initBreedDetail,
    initIntentionDetail
} from '../../vuex/getters'
import {
    createIntentionInfo,
    editintentInfo,
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList,
    getBreedDetail,
    getIntentionDetail
} from '../../vuex/actions'
export default {
    components: {
        searchbreedModel,
        searchcustomerModel,
        vSelect,
        inputSelect,
        tipdialogModel,
        pressImage
    },
    props: ['param'],
    data() {
        return {
          tipParam:{
              show:false,
              name:'',
              remain:true,
              callback:this.callback
          },
          breedParam:{
              show:false,
              breedName:'',
              breedId:'',
              loading:false,
              id:''
          },
          empNameParam:{
            show:false,
            customerId:'',
            customerName:'',
            customerPhone:'',
            employeeId:''
          },
          tag:['真空包装','瓦楞纸箱','编织袋','积压包','其它'],
            country:{
              cname:'',
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
            },
          imageParam:{
            url:'/crm/api/v1/file/',
            qiniu:false
          },
          type:"image/*"
        }
    },
    vuex: {
       getters: {
          initCountrylist,
          initProvince,
          initCitylist,
          initDistrictlist,
          initBreedDetail,
          initIntentionDetail
        },
        actions: {
          createIntentionInfo,
          editintentInfo,
          getCountryList,
          getProvinceList,
          getCityList,
          getDistrictList,
          getBreedDetail,
          getIntentionDetail
        }
    },
    methods: {
      searchBreed:function(breedName,breedId){
        console.log('breed');
            this.breedParam.show=true;
            /*this.param.breedName = this.breedParam.breedName;
            this.param.breedId = this.breedParam.breedId;*/
      },
      searchCustomer:function(customerName,customerId,customerPhone){
            this.empNameParam.show=true;
            if("employeeId" in this.param){
                this.empNameParam.employeeId = this.param.employeeId;
            }
      },
      callback:function(){
          this.param.show=false;
          this.tipParam.show=false;
      },
      createOrUpdateIntention:function(){
        if(this.param.flag==0){
          this.param.country = this.country.cname;
          this.param.province = this.province.cname;
          this.param.city = this.city.cname;
          if(this.district.cname){
            this.param.district = this.district.cname;
          }else{
            this.param.district ='';
          }
          //this.tipParam.name = '新建意向成功';
          this.param.show=false;
          this.createIntentionInfo(this.param);
        }
        if(this.param.flag==1){
          this.param.country = this.country.cname;
          this.param.province = this.province.cname;
          this.param.city = this.city.cname;
          this.param.district = this.district.cname;
          //this.tipParam.name = '修改意向成功';
          this.param.show=false;
          this.editintentInfo(this.param);
        }

      },
      reset:function(){
        console.log(this.param.duedate)
          this.param.duedate="";
           console.log(this.param.duedate)
      },
      selectProvince:function(){
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
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
            this.breedParam.loading=true;
            this.getBreedDetail(this.breedParam);
        },
        customer:function(customer){
            this.param.customerName = customer.customerName;
            this.param.customerId = customer.customerId;
            this.param.customerPhone = customer.customerPhone;
        }
    },
    created(){
      console.log(this.param.breedId)
      if(this.param.breedId){
        this.breedParam.breedName = this.param.breedName;
        this.breedParam.id = this.param.breedId;
        this.getBreedDetail(this.breedParam);
      }
      if(this.param.id){
        this.param.loading=true;
        this.getIntentionDetail(this.param);
      }else{
        this.param.loading=false;
      }
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
  z-index: 1083
}
.modal_con{
  z-index: 1084
}

.edit-model {
  padding: 10px 30px 80px 30px;
}

.top-title{
    position: absolute;
    top: 0;
    right:0;
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

.editpagecenter{
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  width: 100%;
}


.editpage-input {
    margin-top: 15px;
}

.edit-input {
    height: 36px;
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
   /*  margin-top: 50px; */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
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

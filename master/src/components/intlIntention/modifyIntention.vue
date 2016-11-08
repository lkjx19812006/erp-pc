<template>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
    <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>修改国际意向</h3>
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

                 <div style="margin-top:15px">
                    <label class="editlabel">选择客户<span class="system_danger" v-if="$validation.name.required">请选择客户</label>
                    <input type="text" v-model='param.customerName' v-validate:name="['required']" class="form-control edit-input" style="width:95%" readonly="readonly" @click="searchCustomer()"/>
                 </div>

                 <div style="margin-top:25px">
                    <img src="/static/images/receiverinfo@2x.png" style="display:inline"/>
                    <h4 style="display:inline">交收信息</h4>
                 </div>
                 <div class="editpage">
                     <div class="editpageleft">

                       <div class="editpage-input">
                         <label class="editlabel">手机<span v-if="$validation.phone.required" class="system_danger">请输入手机号</span></label>
                         <input type="text" v-model='param.customerPhone' v-validate:phone="['required']" class="form-control edit-input"  />
                       </div>

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
                         <label class="editlabel">邮箱<span v-if="$validation.email.required" class="system_danger">请输入邮箱号</span></label>
                         <input type="text" v-model='param.customerEmail' v-validate:email="['required']" class="form-control edit-input"  />
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
                         <label class="editlabel">包装<span v-if="$validation.pack.required" class="system_danger">请输入包装要求</span></label>
                         <input type="text" v-model='param.pack' v-validate:pack="['required']" class="form-control edit-input"  />
                       </div>


                     </div>


                 </div>

                 <div style="margin-top:25px">
                    <img src="/static/images/sellerinfo@2x.png" style="display:inline"/>
                    <h4 style="display:inline">药材信息</h4>
                 </div>
                 
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                         <tr>
                           <th>品种</th> 
                           <th>质量</th>
                           <th>资质</th>
                           <th>产地</th>
                           <th>规格</th>
                           <th>数量</th> 
                           <th>单位</th> 
                           <th>包装</th>  
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in param.items">
                             <td>{{item.breedName}}</td>
                             <td>{{item.quality}}</td>
                             <td>{{item.qualification}}</td>
                             <td>{{item.location}}</td>
                             <td>{{item.spec}}</td>
                             <td>{{item.number}}</td>
                             <td>{{item.unit}}</td>
                             <td>{{item.pack}}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div style="padding-left:25%">
                     <div style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showBreed()">添加药材信息</div>   
                 </div>   
                  
                 <validator name="inner">   
                     <div v-if="addParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                           <div class="editpageleft">
                              <div class="editpage-input">
                                   <label class="editlabel" >品种名称<span class="system_danger" v-if="$inner.breedname.required">必填项</span></label>
                                   <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" v-validate:breedname="{required:true}"  @click="searchBreed()" readonly="true" />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >质量要求<span class="system_danger" v-if="$inner.quality.required">必填项</span></label>
                                   <input type="text" v-model="breedInfo.quality" class="form-control edit-input" v-validate:quality="{required:true}" />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >规格要求<span class="system_danger" v-if="$inner.spec.required">必填项</span></label>
                                   <input type="text" v-model="breedInfo.spec" class="form-control edit-input" v-validate:spec="{required:true}"/>
                              </div>
                              
                              <div class="editpage-input">
                                   <label class="editlabel" >单位<span class="system_danger" v-if="$inner.unit.required">必填项</span></label>
                                   <input type="text" v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}"/>
                              </div>
                       
                           </div>
                       
                           <div class="editpageright">
                              <div class="editpage-input">
                                   <label class="editlabel" >资质要求<span class="system_danger" v-if="$inner.qualification.required">必填项</span></label>
                                   <input type="text" v-model="breedInfo.qualification" class="form-control edit-input" v-validate:qualification="{required:true}"/>
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >产地要求<span class="system_danger" v-if="$inner.location.required">必填项</span></label>
                                   <input type="text" v-model="breedInfo.location" class="form-control edit-input" v-validate:location="{required:true}"/>
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >数量要求<span class="system_danger" v-if="$inner.number.required">必填项</span></label>
                                   <input type="text" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >包装要求<span class="system_danger" v-if="$inner.pack0.required">必填项</span></label>
                                   <input type="text" v-model="breedInfo.pack" class="form-control edit-input" v-validate:pack0="{required:true}" />
                              </div>

                              <div style="margin-top:10px;text-align:right">
                                  <button type="button" class="btn btn-confirm" @click="cancelBreed()">取消</button>
                                  <button type="button" class="btn btn-confirm" v-if="$inner.valid" @click="addBreed()">保存</button>
                                  <button type="button" class="btn btn-confirm" v-else disabled="disabled">保存</button>
                                  
                              </div>
                              
                           </div>
                     </div>  
                 </validator>  
                 <!-- <div class="editpage">
                       <div class="editpageleft">
                          <div class="editpage-input">
                               <label class="editlabel" >品种名称<span class="system_danger" v-if="$validation.breedname.required">必填项</span></label>
                               <input type="text" v-model="param.items[0].breedName" class="form-control edit-input" v-validate:breedname="{required:true}"  @click="searchBreed()" readonly="true" />
                          </div>
                   
                          <div class="editpage-input">
                               <label class="editlabel" >质量要求<span class="system_danger" v-if="$validation.quality.required">必填项</span></label>
                               <input type="text" v-model="param.items[0].quality" class="form-control edit-input" v-validate:quality="{required:true}" />
                          </div>
                   
                          <div class="editpage-input">
                               <label class="editlabel" >规格要求<span class="system_danger" v-if="$validation.spec.required">必填项</span></label>
                               <input type="text" v-model="param.items[0].spec" class="form-control edit-input" v-validate:spec="{required:true}"/>
                          </div>
                          
                          <div class="editpage-input">
                               <label class="editlabel" >单位<span class="system_danger" v-if="$validation.unit.required">必填项</span></label>
                               <input type="text" v-model="param.items[0].unit" class="form-control edit-input" v-validate:unit="{required:true}"/>
                          </div>
                   
                       </div>
                   
                       <div class="editpageright">
                          <div class="editpage-input">
                               <label class="editlabel" >资质要求<span class="system_danger" v-if="$validation.qualification.required">必填项</span></label>
                               <input type="text" v-model="param.items[0].qualification" class="form-control edit-input" v-validate:qualification="{required:true}"/>
                          </div>
                   
                          <div class="editpage-input">
                               <label class="editlabel" >产地要求<span class="system_danger" v-if="$validation.location.required">必填项</span></label>
                               <input type="text" v-model="param.items[0].location" class="form-control edit-input" v-validate:location="{required:true}"/>
                          </div>
                   
                          <div class="editpage-input">
                               <label class="editlabel" >数量要求<span class="system_danger" v-if="$validation.number.required">必填项</span></label>
                               <input type="text" v-model="param.items[0].number" class="form-control edit-input" v-validate:number="{required:true}" />
                          </div>
                   
                          <div class="editpage-input">
                               <label class="editlabel" >包装要求<span class="system_danger" v-if="$validation.pack0.required">必填项</span></label>
                               <input type="text" v-model="param.items[0].pack" class="form-control edit-input" v-validate:pack0="{required:true}" />
                          </div>
                       
                       </div>
                   </div>   -->  

                 <!-- <div style="margin-top:25px">
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
                 </div> -->

             </section>
          </div>
          <div class="edit_footer">
              <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
              <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&$inner.valid&&param.items.length>0&&param.items[0].breedId!=''" @click="createOrUpdateIntlIntention()">确定</button>
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
    initIntlIntentionDetail
} from '../../vuex/getters'
import {
    createIntlIntention,
    editintentInfo,
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList,
    getBreedDetail,
    getIntlIntentionDetail
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
          addParam:{
            show:false,
            length:0
          },
          breedInfo:{
              breedId:'',
              breedName:'',
              qualification:'',
              quality:'',
              location:'',
              spec:'',
              number:'',
              unit:'',
              pack:''
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
          initIntlIntentionDetail
        },
        actions: {
          createIntlIntention,
          editintentInfo,
          getCountryList,
          getProvinceList,
          getCityList,
          getDistrictList,
          getBreedDetail,
          getIntlIntentionDetail
        }
    },
    methods: {
      searchBreed:function(breedName,breedId){
            this.breedParam.show=true;
      },
      searchCustomer:function(){
            this.empNameParam.show=true;
            /*if("employeeId" in this.param){
                this.empNameParam.employeeId = this.param.employeeId;
            }*/
      },
      showBreed:function(){
          if(this.param.items.length == 0||this.param.items[this.param.items.length-1].breedId != ''){
              this.breedInfo.breedId='';
              this.breedInfo.breedName='';
              this.breedInfo.qualification='';
              this.breedInfo.quality='';
              this.breedInfo.location='';
              this.breedInfo.spec='';
              this.breedInfo.number='';
              this.breedInfo.unit='';
              this.breedInfo.pack='';
              this.param.items.push({
                  breedId:'',
                  breedName:'',
                  qualification:'',
                  quality:'',
                  location:'',
                  spec:'',
                  number:'',
                  unit:'',
                  pack:''

              });
              this.addParam.show = true;
              var scroll = document.getElementById("scroll");
              console.log(scroll.scrollTop);
              console.log(scroll.scrollHeight);
              scroll.scrollBottom = -500;
          }  
          
      },
      addBreed:function(){
          //this.param.items[this.param.items.length-1].breedName = this.breedInfo.breedName;
          this.param.items[this.param.items.length-1].breedId = this.breedInfo.breedId;
          this.param.items[this.param.items.length-1].breedName = this.breedInfo.breedName;
          this.param.items[this.param.items.length-1].qualification = this.breedInfo.qualification;
          this.param.items[this.param.items.length-1].quality = this.breedInfo.quality;
          this.param.items[this.param.items.length-1].location = this.breedInfo.location;
          this.param.items[this.param.items.length-1].spec = this.breedInfo.spec;
          this.param.items[this.param.items.length-1].number = this.breedInfo.number;
          this.param.items[this.param.items.length-1].unit = this.breedInfo.unit;
          this.param.items[this.param.items.length-1].pack = this.breedInfo.pack;

          console.log(this.param.items[this.param.items.length-1]);
          this.addParam.show = false; 

      },
      cancelBreed:function(){
          this.param.items.pop();
          this.addParam.show = false; 
      },
      callback:function(){
          this.param.show=false;
          this.tipParam.show=false;
      },
      createOrUpdateIntlIntention:function(){
        this.param.country = this.country.cname;
        this.param.province = this.province.cname;
        this.param.city = this.city.cname;
        this.param.district = this.district.cname;

        this.createIntlIntention(this.param);
        console.log(this.param);
        console.log(this.param.items);
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
            this.breedInfo.breedName = breed.breedName;
            this.breedInfo.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
            //this.breedParam.loading=true;
            //this.getBreedDetail(this.breedParam);
        },
        customer:function(customer){
            console.log(customer);
            this.param.customerName = customer.customerName;
            this.param.customerId = customer.customerId;
            this.param.customerPhone = customer.customerPhone;
            this.param.customerEmail = customer.email;
            
        }
    },
    created(){
      this.getIntlIntentionDetail(this.param);
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

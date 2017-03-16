<template>
  <div>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
    <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.revised_international_intention')}}</h3>
        </div>
        <validator name="validation">
          <div class="edit-model">
            <div class="cover_loading">
              <pulse-loader :loading="breedParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
             <section class="editsection" v-cloak>
                 <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
                 <div class="clearfix">
                   <div class="col-md-6">
                     <label class="editlabel">{{$t('static.packaging')}}<span v-if="$validation.pack.required" class="system_danger">{{$t('static.enter_package')}}</span></label>
                     <input type="text" v-show="false" v-model='param.pack' v-validate:pack="['required']" class="form-control edit-input"  />
                     <div type="text" class="edit-input" >
                       <input-select
                         :prevalue="param.pack"
                         :value.sync="param.pack"
                         :options="tag"
                         placeholder="包装/Packaging"
                       >
                       </input-select>
                     </div>
                   </div>              
                   <div class="col-md-6">
                     <label class="editlabel">{{$t('static.deadline')}}</label>
                     <mz-datepicker :time.sync="param.duedate" format="yyyy-MM-dd HH:mm:ss" class="a">
                     </mz-datepicker>
                     <button type="button" class="btn btn-default" height="24" width="24" @click="reset()">{{$t('static.clear_all')}}</button>
                   </div>                 
                 </div>

                 <div style="margin-top:25px">
                    <img src="/static/images/sellerinfo@2x.png" style="display:inline"/>
                    <h4 style="display:inline">{{$t('static.medicinal_material_information')}}</h4>
                 </div>
                 
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                         <tr>
                           <th>{{$t('static.breed')}}</th> 
                           <th>{{$t('static.quality')}}</th>
                           <th>{{$t('static.certificate')}}</th>
                           <th>{{$t('static.origin')}}</th>
                           <th>{{$t('static.specification')}}</th>
                           <th>{{$t('static.quantity')}}</th> 
                           <th>{{$t('static.unit')}}</th> 
                           <th>{{$t('static.packaging')}}</th> 
                           <th></th> 
                           <th></th>
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
                             <td>{{item.unit | Unit}}</td>
                             <td>{{item.pack}}</td>
                             <td v-if="breedInfo.status==0||breedInfo.status==2" @click="showModifyBreed($index)"><a>{{$t('static.edit')}}</a></td>
                             <td v-else>{{$t('static.edit')}}</td>
                             <td v-if="breedInfo.status==0" @click="deleteBreed($index)"><a>{{$t('static.del')}}</a></td>
                             <td v-else>{{$t('static.del')}}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div style="padding-left:25%">
                     <div v-if="breedInfo.status==0" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showAddBreed()">{{$t('static.add_material_information')}}</div>   
                 </div>   
                  
                 <validator name="inner">   
                     <div v-if="addParam.show||updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                           <div class="editpageleft">
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.breed')}}<span class="system_danger" v-if="$inner.breedname.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" v-validate:breedname="{required:true}"  @click="searchBreed()" readonly="true" />
                              </div>
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                   <input type="text"  v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}"  v-show="false"/>
                                   <select v-model="breedInfo.unit" class="form-control edit-input" >
                                        <option v-for="item in initUnitlist" value="{{item.id}}">{{item.ename+'-'+item.name}}</option>
                                   </select>
                              </div>
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.quality')}}</label>
                                   <input type="text" v-model="breedInfo.quality" class="form-control edit-input"  />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.specification')}}</label>
                                   <input type="text" v-show="!breedParam.id" v-model="breedInfo.spec" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种"/>
                                   <div type="text" class="edit-input" v-if="breedParam.id">
                                       <input-select
                                         :value.sync="breedInfo.spec"
                                         :prevalue="breedInfo.spec"
                                         :options="initBreedDetail.specs.arr"
                                         placeholder="规格/Specification"
                                         label="name"
                                       >
                                       </input-select>
                                   </div>
                              </div>
                            
                           </div>
                       
                           <div class="editpageright">
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.quantity')}}<span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span></label>
                                   <input type="number"  v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
                              </div>
                              <div class="editpage-input">
                                   <label class="editlabel">{{$t('static.certificate')}}</label>
                                   <select v-model="breedInfo.qualification" class="form-control edit-input">
                                        <option>NONE</option>
                                        <option>GMP</option>
                                        <option>GSP</option>
                                   </select>
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.origin')}}</label>
                                   <input type="text" v-model="breedInfo.location" v-show="!breedParam.id" class="form-control edit-input"  disabled="disabled" placeholder="请先选择一个品种" />
                                    <div type="text" class="edit-input" v-if="breedParam.id">
                                       <input-select
                                         :prevalue="breedInfo.location"
                                         :value.sync="breedInfo.location"
                                         :options="initBreedDetail.locals.arr"
                                         placeholder="产地/Origin"
                                         label="name"
                                       >
                                       </input-select>
                                   </div>
                              </div>

                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.packaging')}}</label>
                                   <input type="text" v-show="false" v-model="breedInfo.pack" class="form-control edit-input"  />
                                   <div type="text" class="edit-input" >
                                     <input-select
                                       :prevalue="breedInfo.pack"
                                       :value.sync="breedInfo.pack"
                                       :options="tag"
                                       placeholder="包装/Packaging"
                                     >
                                     </input-select>
                                   </div>
                              </div>

                              <div style="margin-top:10px;text-align:right">
                                  <button type="button" class="btn btn-confirm">
                                      <div v-if="breedInfo.status==1" @click="cancelAddBreed()">{{$t('static.cancel')}}</div>
                                      <div v-if="breedInfo.status==2" @click="cancelModifyBreed()">{{$t('static.cancel')}}</div>
                                  </button>
                                  <button type="button" class="btn btn-confirm" v-if="$inner.valid">
                                      <div v-if="breedInfo.status==1" @click="addBreed()">{{$t('static.save')}}</div>
                                      <div v-if="breedInfo.status==2" @click="modifyBreed()">{{$t('static.save')}}</div>
                                  </button>
                                  <button type="button" class="btn btn-confirm" v-else disabled="disabled">{{$t('static.save')}}</button>
                                  
                              </div>
                              
                           </div>
                     </div>  
                 </validator> 

                 <!-- <validator name="modify">   
                     <div v-if="updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                           <div class="editpageleft">
                              <div class="editpage-input">
                                   <label class="editlabel" >品种名称<span class="system_danger" v-if="$modify.breedname1.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" v-validate:breedname1="{required:true}"  @click="searchBreed()" readonly="true" />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >质量要求<span class="system_danger" v-if="$modify.quality1.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.quality" class="form-control edit-input" v-validate:quality1="{required:true}" />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >规格要求<span class="system_danger" v-if="$modify.spec1.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.spec" class="form-control edit-input" v-validate:spec1="{required:true}"/>
                              </div>
                              
                              <div class="editpage-input">
                                   <label class="editlabel" >单位<span class="system_danger" v-if="$modify.unit1.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit1="{required:true}"/>
                              </div>
                       
                           </div>
                       
                           <div class="editpageright">
                              <div class="editpage-input">
                                   <label class="editlabel" >资质要求<span class="system_danger" v-if="$modify.qualification1.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.qualification" class="form-control edit-input" v-validate:qualification1="{required:true}"/>
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >产地要求<span class="system_danger" v-if="$modify.location1.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.location" class="form-control edit-input" v-validate:location1="{required:true}"/>
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >数量要求<span class="system_danger" v-if="$modify.number1.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.number" class="form-control edit-input" v-validate:number1="{required:true}" />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >包装要求<span class="system_danger" v-if="$modify.pack1.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="breedInfo.pack" class="form-control edit-input" v-validate:pack1="{required:true}" />
                              </div>
                 
                              <div style="margin-top:10px;text-align:right">
                                  <button type="button" class="btn btn-confirm" @click="cancelModifyBreed()">取消</button>
                                  <button type="button" class="btn btn-confirm" v-if="$modify.valid" @click="modifyBreed()">保存</button>
                                  <button type="button" class="btn btn-confirm" v-else disabled="disabled">保存</button>
                                  
                              </div>
                              
                           </div>
                     </div>  
                 </validator>  -->

             </section>
          </div>
          <div class="edit_footer">
              <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
              <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&param.items.length>0&&param.items[param.items.length-1].breedId!=''" @click="createOrUpdateIntlIntention()">{{$t('static.confirm')}}</button>
              <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
          </div>
        </validator>
    </div>
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
    initUnitlist,
    initIntlIntentionDetail
} from '../../vuex/getters'
import {
    updateIntlIntention,
    editintentInfo,
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList,
    getBreedDetail,
    getUnitList,
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
          updateParam:{
            show:false,
            index:0
          },
          breedInfo:{ 
              status:0,   //自定义状态，表示编辑框的状态，0表示收起(起始)状态，1表示add，2表示update，add或update结束后将status置为0
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
          tag:['真空包装/Vacuum packaging','瓦楞纸箱/Box','编织袋/Woven bag','积压包/Pallets','其它/Other'],
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
          initIntlIntentionDetail,
          initUnitlist
        },
        actions: {
          updateIntlIntention,
          editintentInfo,
          getCountryList,
          getProvinceList,
          getCityList,
          getDistrictList,
          getBreedDetail,
          getUnitList,
          getIntlIntentionDetail
        }
    },
    methods: {
      searchBreed:function(breedName,breedId){
            this.breedParam.show=true;
      },
      searchCustomer:function(){
          this.empNameParam.show=true;
      },
      showAddBreed:function(){
          if(this.param.items.length == 0||this.param.items[this.param.items.length-1].breedId != ''){
              this.breedInfo.status = 1;    
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
                  pack:'',
                  status:''

              });
              this.addParam.show = true;
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
          this.param.items[this.param.items.length-1].status = 1;

          console.log(this.param.items[this.param.items.length-1]);
          this.breedInfo.status = 0;
          this.addParam.show = false; 

      },
      showModifyBreed:function(index){
          this.breedInfo.status = 2;
          this.updateParam.index = index;
          this.breedInfo.breedId=this.param.items[index].breedId;
          this.breedInfo.breedName=this.param.items[index].breedName,
          this.breedInfo.qualification=this.param.items[index].qualification,
          this.breedInfo.quality=this.param.items[index].quality,
          this.breedInfo.location=this.param.items[index].location,
          this.breedInfo.spec=this.param.items[index].spec,
          this.breedInfo.number=this.param.items[index].number,
          this.breedInfo.unit=this.param.items[index].unit,
          this.breedInfo.pack=this.param.items[index].pack,
          this.breedParam.id = this.breedInfo.breedId;
          this.updateParam.show = true;
      },
      modifyBreed:function(){
          this.param.items[this.updateParam.index].breedId=this.breedInfo.breedId,
          this.param.items[this.updateParam.index].breedName=this.breedInfo.breedName,
          this.param.items[this.updateParam.index].qualification=this.breedInfo.qualification,
          this.param.items[this.updateParam.index].quality=this.breedInfo.quality,
          this.param.items[this.updateParam.index].location=this.breedInfo.location,
          this.param.items[this.updateParam.index].spec=this.breedInfo.spec,
          this.param.items[this.updateParam.index].number=this.breedInfo.number,
          this.param.items[this.updateParam.index].unit=this.breedInfo.unit,
          this.param.items[this.updateParam.index].pack=this.breedInfo.pack,
          this.breedInfo.status = 0;
          this.updateParam.show = false;
      },
      deleteBreed:function(index){
         this.param.items.splice(index,1);
      },
      cancelAddBreed:function(){
          this.param.items.pop();
          this.breedInfo.status = 0;
          this.addParam.show = false; 
      },
      cancelModifyBreed:function(){
          this.breedInfo.status = 0;
          this.updateParam.show = false; 
      },
      callback:function(){
          this.param.show=false;
          this.tipParam.show=false;
      },
      createOrUpdateIntlIntention:function(){
        this.param.show = false;
        //将this.param.items补全
        console.log(this.param.items.length);
        console.log(this.param.itemsBack.length);
        var temp=[];   //存放this.param.itemsBack中有，this.param.items中没有的
        for(var i=0;i<this.param.itemsBack.length;i++){
            var k = 0;
            for(var j=0;j<this.param.items.length;j++){
              if(this.param.itemsBack[i].id!=this.param.items[j].id){
                  k++;
              }
              if(k==this.param.items.length){
                this.param.itemsBack[i].status = 0;
                temp.push(this.param.itemsBack[i]);
              }
            }
        }
        var _this = this;
        console.log(temp);
        temp.forEach(function(item){
          _this.param.items.push(item);
        })
        console.log(this.param.items);
        this.updateIntlIntention(this.param);
        
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
          if(breed.eName==null||breed.eName==""){
             this.breedInfo.breedName = breed.breedName;
             this.breedParam.breedName = breed.breedName;
          }else{
            this.breedParam.breedName = breed.eName;
            this.breedInfo.breedName = breed.eName;
          } 
            this.breedInfo.breedId = breed.breedId;
            
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
      /*在编辑意向的时候，如果删除原先存在的条目，数据库中不会删除，需要将条目的status置为0,*/
      console.log('商品数量');
      console.log(this.param.items.length);
      this.getIntlIntentionDetail(this.param);
      if(this.param.breedId){
          this.breedParam.breedName = this.param.breedName;
          this.breedParam.id = this.param.breedId;
          this.getBreedDetail(this.breedParam);
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
      this.getUnitList();
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
    right:0;
    width: 800px;
    left: 0;
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
.btn-close {
    color: #fa6705;
}
.editpage-input {
    margin-top: 15px;
    margin-right: 10px;
}

.table{
  display: table;
}
a{
    cursor:pointer;
}
</style>

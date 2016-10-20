<template>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
    <div v-show="param.show"  id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title1}}</h3>
        </div>
        <div class="edit-model">
            <form name="editOrderinfo" action="javascript:void(0)">
                <section class="editsection">
                    <div style="margin-top:20px;">
                       <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                       <h4 style="display:inline">客户信息</h4>
                    </div>
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel">订单类别</label>
                                <select type="text" class="form-control edit-input" v-model="param.type"  value="{{param.type}}" >
                                    <option value="0">采购</option>
                                    <option value="1">销售</option>
                                </select>
                                <!-- <input type="text" class="form-control edit-input" v-model="param.sourceType" value="{{param.sourceType}}"/> -->
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">来源类型</label>
                                <select type="text" class="form-control edit-input" v-model="param.sourceType"  value="{{param.sourceType}}" >
                                    <option value="0">新建</option>
                                    <option value="1">意向</option>
                                    <option value="2">报价</option>
                                </select>
                                <!-- <input type="text" class="form-control edit-input" v-model="param.sourceType" value="{{param.sourceType}}"/> -->
                            </div>
                             <div class="editpage-input">
                                <label class="editlabel">收货人姓名</label>
                                <input type="text" class="form-control edit-input" v-model="param.consignee" value="{{param.consignee}}"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">国家</label>
                                <div type="text" class="edit-input">
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
                                <label class="editlabel">省</label>
                                <input type="text" v-if="!country.cname" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个国家" />
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
                                          label="cname">
                                    </v-select>
                                 </div>
                            </div>
                             <div class="editpage-input">
                                <label class="editlabel">收货人详细地址</label>
                                <input type="text" class="form-control edit-input" v-model="param.consigneeAddr"  value="{{param.consigneeAdd}}"/>
                            </div>  
                             <div class="editpage-input">
                                <label class="editlabel">杂费</label>
                                <input type="text" class="form-control edit-input" v-model="param.incidentals" value="{{param.incidentals}}"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">优惠金额</label>
                                <input type="text" class="form-control edit-input" v-model="param.preferential" value="{{parampreferential}}"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">优惠说明</label>
                                <input type="text" class="form-control edit-input" v-model="param.preferentialDesc" value="{{param.preferentialDesc}}"/>
                            </div>
                          <!--   <div class="editpage-input">
                              <label class="editlabel">客户端来源</label>
                              <select type="text" class="form-control edit-input" v-model="param.clients">
                                  <option value="0" selected>pc</option>
                                  <option value="1">是</option>
                              </select>
                          </div> -->
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">选择客户</label>
                                <input type="text" class="form-control edit-input" v-model="param.customerName" value="{{param.customer}}" readonly="readonly" @click="searchCustomer(param.customerName,param.customer,param.employee)"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">是否国际</label>
                                <select type="text" class="form-control edit-input" v-model="param.intl">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">收货人电话</label>
                                <input type="text" class="form-control edit-input" v-model="param.consigneePhone" value="{{param.consigneePhone}}"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">邮编</label>
                                <input type="text" class="form-control edit-input" v-model="param.zipCode" value="{{param.zipCode}}"/>
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
                                <label class="editlabel">货币类型</label>
                                 <select type="text" class="form-control edit-input"  v-model="param.currency"  value="{{param.currency}}">
                                    <option value="0" selected>人民币</option>
                                   <!--  <option value="1">是</option> -->
                                </select>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">是否样品订单</label>
                                <select type="text" class="form-control edit-input" v-model="param.sample" value="{{param.sample}}" >
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">备注</label>
                                <input type="text" class="form-control edit-input" v-model="param.comments" value="{{param.comments}}"/>
                            </div>
                             <div class="editpage-input">
                                <label class="editlabel">杂费说明</label>
                                <input type="text" class="form-control edit-input" v-model="param.incidentalsDesc" value="{{param.incidentalsDesc}}"/>
                            </div>
                        </div>
                    </div>
                </section>
                <div>
                   <div style="margin-top:20px;">
                       <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                       <h4 style="display:inline">订单商品信息</h4>
                    </div> 
                    <div class="editpage">
                         <div class="editpageleft">
                            <div class="editpage-input">
                                 <label class="editlabel">订单商品标题</label>
                                <input type="text" class="form-control edit-input" v-model="param.goods[0].title"  value="{{param.goods[0].title}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">订单商品来源</label>
                                <select type="text" class="form-control edit-input" v-model="param.goods[0].sourceType"  value="{{param.goods[0].sourceType}}" >
                                    <option value="0">新建</option>
                                    <option value="1">意向</option>
                                    <option value="2">报价</option>
                                </select>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">商品单位</label>
                                <input type="text" class="form-control edit-input" v-model="param.goods[0].unit" value="{{param.goods[0].unit}}"/>
                            </div>

                            <div class="editpage-input">
                                <label class="editlabel">商品质量</label>
                                <input type="text" class="form-control edit-input" v-model="param.goods[0].quality" value="{{param.goods[0].quality}}"/>
                            </div>
                             <div class="editpage-input">
                                <label class="editlabel">商品价格</label>
                                <input type="text" class="form-control edit-input" v-model="param.goods[0].price" value="{{param.goods[0].price}}"/>
                            </div>
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">订单商品药材品种名称</label>
                                <input type="text" class="form-control edit-input" v-model="param.goods[0].brredName"  value="{{param.goods[0].brredName}}"  @click="searchBreed(param.brredName,param.breedId)"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">商品数量</label>
                                <input type="text" class="form-control edit-input" v-model="param.goods[0].number" value="{{param.goods[0].number}}"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">商品规格</label>
                                <input type="text" class="form-control form-control edit-input" v-model="param.goods[0].spec"  value="{{param.goods[0].spec}}"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">商品产地</label>
                                <input type="text" class="form-control edit-input" v-model="param.goods[0].location" value="{{param.goods[0].location}}"/>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="confirm(param)">保存</button>
        </div>
    </div>
</template>
<script>
import vSelect from  '../tools/vueSelect/components/Select'
import pressImage from '../imagePress'
import searchcustomerModel  from '../Intention/clientname'
import searchbreedModel  from '../Intention/breedsearch'
import {
    initCountrylist,
    initProvince,
    initCitylist,
    initDistrictlist, 
} from '../../vuex/getters'
import {
    getCountryList,
    getProvinceList,
    getCityList,
    getDistrictList
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        searchcustomerModel,
        searchbreedModel
    },
    props: ['param'],
    data() {
        return {
            countryParam:{
              loading:true,
              show:false,
              color: '#5dc596',
              size: '15px',
              cur: 1,
              all: 7
            },
            empNameParam:{
                show:false,
                customer:'',
                customerName:''
            },
            breedParam:{
                show:false,
                brredName:'',
                breedId:''
            },
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
            }
        }
    },
    vuex: {
        getters:{
            initCountrylist,
            initProvince,
            initCitylist,
            initDistrictlist, 
        },
        actions:{
            getCountryList,
            getProvinceList,
            getCityList,
            getDistrictList
        }
    },
    methods:{
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

        },
        searchBreed:function(brredName,breedId){
                this.breedParam.show=true;
                /*this.param.breedName = this.breedParam.breedName;
                this.param.breedId = this.breedParam.breedId;*/
          },
        searchCustomer:function(customerName,customer,employee){
            this.empNameParam.show=true;
            /*if("employeeId" in this.param){
                this.empNameParam.employeeId = this.param.employeeId;
            }*/
        },
        confirm:function(param){
            this.param.country = this.country.id;
            this.param.province = this.province.id;
            this.param.city = this.city.id;
            this.param.district = this.district.id;
            console.log(this.param);
            this.param.link(this.param);

        }
    },
    events:{
        breed:function(breed){
            console.log(this.param.goods[0])
            this.param.goods[0].brredName = breed.breedName;
            this.param.goods[0].breedId = breed.breedId;
           /* this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
            this.breedParam.loading=true;
            this.getBreedDetail(this.breedParam);*/
        },
        customer:function(customer){
            this.param.customerName = customer.customerName;
            this.param.customer = customer.customerId;
            this.param.employee = customer.employeeName;
        }
    },
    created(){
        this.getCountryList(this.countryParam);
        console.log(this.param);
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
    bottom:5px;
    margin-top: 50px;
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
.editpage_img{
    width: 90%;
}
.editpage_img img{
    display: inline-block;
    background: #ccc;
}
.editpage-image{
    display: inline-block;
}
</style>

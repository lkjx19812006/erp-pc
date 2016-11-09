<template>
    <div v-show="param.show"  id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h4>新建订单</h4>
        </div>
        <validator name="validation">
            <div class="edit-model">
                <form name="editOrderinfo" action="javascript:void(0)">
                    <section class="editsection">
                        <h5>订单信息</h5>
                        <div class="editpage">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">是否样品订单</label>
                                    <!-- <input type="text" class="edit-input" v-model="param.sample"/> -->
                                    <select type="text" class="form-control edit-input" v-model="param.sample">
                                        <option value="0">否</option>
                                        <option value="1">是</option>
                                    </select>
                                </div>

                                <div class="editpage-input">
                                    <label class="editlabel">杂费</label>
                                    <input type="text" class="form-control edit-input" v-model="param.incidentals"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">优惠金额</label>
                                    <input type="text" class="form-control edit-input" v-model="param.preferential"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">收货人</label>
                                    <input type="text" class="form-control edit-input" v-model="param.consignee"/>
                                </div>

                                <div class="editpage-input">
                                    <label class="editlabel">国家</label>
                                    <div type="text" class="form-control edit-input">
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
                                    <div v-if="province.cname" type="text" class="form-control edit-input">
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
                                    <label class="editlabel">收货人地址</label>
                                    <input type="text" class="form-control edit-input" v-model="param.consigneeAddr"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">货币类型</label>
                                    <input type="text" class="form-control edit-input" v-model="param.currency"/>
                                </div>
                                <div class="editpage-input">
                               <label class="editlabel">备注</label>
                               <!-- <input type="textarea" v-model='param.auditComment' class="form-control edit-input" value="{{param.auditComment}}" /> -->
                               <textarea v-model='param.comments' class="form-control" style="width:190%;overflow:auto;word-break:break-all" rows="5"></textarea>
                        </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">是否国际</label>
                                    <select type="text" class="form-control edit-input" v-model="param.intl">
                                        <option value="0">否</option>
                                        <option value="1">是</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">杂费说明</label>
                                    <input type="text" class="form-control edit-input" v-model="param.incidentalsDesc"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">优惠说明</label>
                                    <input type="text" class="form-control edit-input" v-model="param.preferentialDesc"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">收货人电话</label>
                                    <input type="text" class="form-control edit-input" v-model="param.consigneePhone"/>
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
                                    <label class="editlabel">邮编<span class="system_danger" v-if="$validation.zipcode.postcode">请输入正确的邮编</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.zipCode" v-validate:zipcode="['postcode']"/>
                                </div>

                            </div>

                        </div>
                        <h5>商品信息</h5>
                        <div class="editpage">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">商品标题</label>
                                    <input type="text" class="form-control edit-input" v-model="param.goods[0].title"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">产地</label>
                                    <input type="text" class="form-control edit-input" v-model="param.goods[0].location"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">单价<span class="system_danger" v-if="$validation.price.money">请输入不超过两位小数的数字</span></label>
                                    <input type="text" class="form-control  edit-input" v-model="param.goods[0].price" v-validate:price="['money']"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">数量<span class="system_danger" v-if="$validation.number.quantity">请输入不超过四位小数的数字</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:number="['quantity']" v-model="param.goods[0].number"/>
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">商品来源ID</label>
                                    <input type="text" class="form-control edit-input" v-model="param.goods[0].sourceId" disabled="true"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">品质</label>
                                    <input type="text" class="form-control edit-input" v-model="param.goods[0].quality"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">规格</label>
                                    <input type="text" class="form-control edit-input" v-model="param.goods[0].spec"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">单位<span class="system_danger" v-if="$validation.unit.required">请输入单位</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:unit="['required']" v-model="param.goods[0].unit"/>
                                </div>

                            </div>
                        </div>
                    </section>
                </form>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm()">保存</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="disabled">保存</button>
            </div>
        </validator>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import pressImage from '../../components/imagePress'
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
    getDistrictList,
    createOrder
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage
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
            getDistrictList,
            createOrder,
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

        confirm:function(){
            this.param.country = this.country.id;
            this.param.province = this.province.id;
            this.param.city = this.city.id;
            this.param.district = this.district.id;
            console.log(this.param);
            this.createOrder(this.param);

        }
    },
    created(){
        this.getCountryList(this.countryParam);
        console.log(this.param);
    }
}
</script>
<style scoped>
.top-title{
  z-index: 100;
  width:800px;
  right: 0;
  top: 91px;
  position: fixed;
  margin: auto;
  left: 0;
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

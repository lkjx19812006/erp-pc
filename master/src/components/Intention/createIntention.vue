<template>
    <searchcustomer-model :param="empNameParam" v-if="empNameParam.show"></searchcustomer-model>
    <searchbreed-model :param="breedNameParam" v-if="breedNameParam.show"></searchbreed-model>
    <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新增意向</h3>
        </div>
        <validator name="validation">
                <div class="edit-model">
                    <section class="editsection" v-cloak>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">客户名称 <span class="system_danger" v-if="$validation.customer.required">请输入客户名称</span></label>
                                 <input type="text" class="form-control edit-input"  id="customer" v-model="param.customerName"  onlyready="true" v-validate:customer="['required']" @click="searchCustomer(param.customerName,param.customerId,param.customerPhone)"/>
                            </div>
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">类型</label>
                                <select  class="form-control edit-input"  v-model="param.type">
                                        <option value="0">求购</option>
                                        <option value="1">供应</option>
                                </select>
                            </div>
                        </div>
                         <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">品种名称  <span class="system_danger" v-if="$validation.name.required">请选择品种名称</span></label>
                                <input type="text" class="form-control edit-input"  id="name" v-model="param.breedName"  v-validate:name="['required']"
                                @click="searchBreed(param.breedName,param.breedId)" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">是否特殊</label>
                                <select  class="form-control edit-input"  v-model="param.especial" >
                                        <option value="0">普通</option>
                                        <option value="1">特殊</option>
                                </select>
                            </div>
                        </div>
                         <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">客户手机号 <span class="system_danger" v-if="$validation.phone.required">请输入客户手机号</span></label>
                                 <input type="text" class="form-control edit-input"  id="phone" v-model="param.customerPhone"  v-validate:phone="['required']" />
                            </div>
                            <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                <label class="editlabel">国家 <span class="system_danger" v-if="$validation.country.required">请输入国家名称</span></label>
                                <input type="text" class="form-control edit-input"  id="country" v-model="param.country"  v-validate:country="['required']" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">所在省 <span class="system_danger" v-if="$validation.province.required">请输入省</span></label>
                                 <input type="text" class="form-control edit-input"  id="province" v-model="param.province"  v-validate:province="['required']" />
                            </div>
                            <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                <label class="editlabel">所在市 <span class="system_danger" v-if="$validation.city.required">请输入市</span></label>
                                <input type="text" class="form-control edit-input"  id="city" v-model="param.city"  v-validate:city="['required']" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">所在区 <span class="system_danger" v-if="$validation.district.required">请输入区</span></label>
                                 <input type="text" class="form-control edit-input"  id="district" v-model="param.district"  v-validate:district="['required']" />
                            </div>
                            <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                <label class="editlabel">数量 <span class="system_danger" v-if="$validation.number.required">请输入数量</span></label>
                                <input type="text" class="form-control edit-input"  id="number" v-model="param.number"   v-validate:number="['required']" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">产地</label>
                                <input type="text" class="form-control edit-input"  v-model="param.location"  />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">资质证书</label>
                                <input type="text" class="form-control edit-input"  v-model="param.qualification" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">规格  <span class="system_danger" v-if="$validation.spec.required">请输入规格</span></label>
                                <input type="text" class="form-control edit-input"  id="spec" v-model="param.spec"  v-validate:spec="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">单位</label>
                                <input type="text" class="form-control edit-input"  v-model="param.unit"  />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">交收地址  <span class="system_danger" v-if="$validation.address.required">请输入地址</span></label>
                                <input type="text" class="form-control edit-input"  id="address" v-model="param.address"  v-validate:address="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">预付比例 <span class="system_danger" v-if="$validation.address.required">请输入预付比例</span></label>
                                <input type="text" class="form-control edit-input"  v-model="param.advance"  id="advance"  v-validate:advance="['required']" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">发票</label>
                               <select  class="form-control edit-input"  v-model="param.invoic" >
                                    <option value="0">无发票</option>
                                    <option value="1">普通发票</option>
                                    <option value="2">增值发票</option>
                                </select>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">上门看货 <span class="system_danger" v-if="$validation.address.required">请输入预付比例</span></label>
                                <select  class="form-control edit-input"  v-model="param.visit" >
                                    <option value="0">不看</option>
                                    <option value="1">会</option>
                                </select>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">包装</label>
                                <input type="text" class="form-control edit-input" v-model="param.pack"  />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">是否国际</label>
                                <select  class="form-control edit-input"  v-model="param.intl" >
                                    <option value="0">国内</option>
                                    <option value="1">国际</option>
                                </select>
                            </div>
                        </div>
                         <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">单价</label>
                                <input type="text" class="form-control edit-input" v-model="param.price"  />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">状态</label>
                                <select  class="form-control edit-input"  v-model="param.status" >
                                    <option value="0">待审</option>
                                    <option value="1">通过</option>
                                </select>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">提供样品</label>
                                <select  class="form-control edit-input"  v-model="param.sampling">
                                    <option value="0" @click="sample_0()" >无</option>
                                    <option value="1" @click="sample_1()">有</option>
                                </select>
                               <!--  <input type="text" class="form-control edit-input" v-model="param.sampling" value="{{param.sampling}}"  /> -->
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12" v-show="sample">
                                <label class="editlabel">样品数量</label>
                                <input type="text" class="form-control edit-input" v-model="param.sampleNumber"  />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12" v-show="sample">
                                <label class="editlabel">样品单位</label>
                                <input type="text" class="form-control edit-input" v-model="param.sampleUnit" value="{{param.sampleUnit}}"  />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12" v-show="sample">
                                <label class="editlabel">样品价格</label>
                                <input type="text" class="form-control edit-input" v-model="param.sampleAmount"  />
                            </div>
                        </div>
                         <div class="clearfix">
                            <div class="client-detailInfo  col-xs-12">
                                <label class="editlabel">质量描述 <span class="system_danger" v-if="$validation.quality.required">必填项</span></label>
                                <textarea v-model="param.quality" rows="5" class="textarea" id="quality"  v-validate:quality="['required']"></textarea>
                            </div>
                         </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm"   @click="param.link(param,param.show = false)" value="确定"/>
                </div>
        </validator>
    </div>
</template>
<script>
import filter from '../../filters/filters'
import searchcustomerModel  from '../Intention/clientname'
import searchbreedModel  from '../Intention/breedsearch'
export default {
    components: {
        searchcustomerModel,
        searchbreedModel
    },
    props: ['param'],
    data() {
        return {
          sample:true,
          empNameParam:{
            show:false,
            customerId:'',
            customerName:'',
            customerPhone:''
          },
          breedNameParam:{
            show:false,
            breedName:'',
            breedId:''
          }
        }
    },
    vuex:{
        actions:{
            
        }
    },
    methods:{
        sample_0:function(){
            this.sample=false;
            console.log("sss")
        },
        sample_1:function(){
             this.sample=true;
        },
        searchCustomer:function(customerName,customerId,customerPhone){
            this.empNameParam.show=true;
            this.param.customerName = this.empNameParam.customerName;
            this.param.customerId = this.empNameParam.customerId;
            this.param.customerPhone = this.empNameParam.customerPhone;
        },
        searchBreed:function(breedName,breedId){
            this.breedNameParam.show=true;
            this.param.breedName = this.breedNameParam.breedName;
            this.param.breedId = this.breedNameParam.breedId;
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
    events:{
        customer:function(qq){
            this.param.customerName = qq.customerName;
            this.param.customerId = qq.customerId;
            this.param.customerPhone = qq.customerPhone;
        },
        breed:function(qq){
            this.param.breedName = qq.breedName;
            this.param.breedId = qq.breedId;
        }
    },
    filter:(filter,{})
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
    padding: 10px 30px 50px 30px;
}
.textarea{
    width: 100%;
    resize: none;
    border: 1px solid #ddd;
    border-radius: 5px;
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
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    background-size: 60%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}
.role{
    margin-right: 10px;
}
</style>
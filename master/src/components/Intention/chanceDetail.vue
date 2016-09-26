<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div class="breed_detail">
        <div class="client-section clearfix" v-cloak>
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div  class="section_title clearfix">
                <span>客户{{param.customerName}}的信息</span>
                <button class="new_btn transfer" @click="saveSucc(param)">保存</button> 
            </div>
            <div class="edit-detail">
                <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">客户名称</label>
                     <input type="text" class="form-control edit-input"  v-model="param.customerName" value="{{param.customerName}}" />
                </div>
                <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                    <label class="editlabel">类型</label>
                    <select  class="form-control edit-input"  v-model="param.type">
                            <option value="0">求购</option>
                            <option value="1">供应</option>
                    </select>
                </div>
            </div>
             <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">品种名称</label>
                    <input type="text" class="form-control edit-input"   v-model="param.breedName" value="{{param.breedName}}" />
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
                    <label class="editlabel">客户手机号</label>
                     <input type="text" class="form-control edit-input"  v-model="param.customerPhone" value="{{param.customerPhone}}" />
                </div>
                <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                    <label class="editlabel">国家</label>
                    <input type="text" class="form-control edit-input"  v-model="param.country" value="{{param.country}}" />
                </div>
            </div>
            <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">所在省</label>
                     <input type="text" class="form-control edit-input"   v-model="param.province" value="{{param.province}}"/>
                </div>
                <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                    <label class="editlabel">所在市</label>
                    <input type="text" class="form-control edit-input"  v-model="param.city" value="{{param.city}}"/>
                </div>
            </div>
            <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">所在区</label>
                     <input type="text" class="form-control edit-input"  v-model="param.district" value="{{param.district}}" />
                </div>
                <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                    <label class="editlabel">数量</label>
                    <input type="text" class="form-control edit-input"  v-model="param.number" value="{{param.number}}" />
                </div>
            </div>
            <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">产地</label>
                    <input type="text" class="form-control edit-input"  v-model="param.location" value="{{param.location}}"  />
                </div>
                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                    <label class="editlabel">资质证书</label>
                    <input type="text" class="form-control edit-input"   v-model="param.qualification" value="{{param.qualification}}" />
                </div>
            </div>
            <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">规格 </label>
                    <input type="text" class="form-control edit-input"   v-model="param.spec" value="{{param.spec}}"  />
                </div>
                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                    <label class="editlabel">单位</label>
                    <input type="text" class="form-control edit-input"   v-model="param.unit" value="{{param.unit}}" />
                </div>
            </div>
            <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">交收地址</label>
                    <input type="text" class="form-control edit-input"  v-model="param.address" value="{{param.address}}" />
                </div>
                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                    <label class="editlabel">预付比例 </label>
                    <input type="text" class="form-control edit-input"  v-model="param.advance" value="{{param.advance}}"/>
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
                    <label class="editlabel">上门看货</label>
                    <select  class="form-control edit-input"  v-model="param.visit" >
                        <option value="0">不看</option>
                        <option value="1">会</option>
                    </select>
                </div>
            </div>
            <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">包装</label>
                    <input type="text" class="form-control edit-input" v-model="param.pack" value="{{param.pack}}"  />
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
                    <label class="editlabel">提供样品</label>
                    <select  class="form-control edit-input"  v-model="param.sampling" >
                        <option value="0">无</option>
                        <option value="1">有</option>
                    </select>
                </div>
                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                    <label class="editlabel">样品数量</label>
                    <input type="text" class="form-control edit-input" v-model="param.sampleNumber" value="{{param.sampleNumber}}"  />
                </div>
            </div>
            <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">样品单位</label>
                    <input type="text" class="form-control edit-input" v-model="param.sampleUnit" value="{{param.sampleUnit}}"  />
                </div>
                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                    <label class="editlabel">样品总价</label>
                    <input type="text" class="form-control edit-input" v-model="param.sampleAmount" value="{{param.sampleAmount}}"  />
                </div>
            </div>
            <div class="clearfix">
                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                    <label class="editlabel">单价</label>
                    <input type="text" class="form-control edit-input" v-model="param.price" value="{{param.price}}"  />
                </div>
                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                    <label class="editlabel">状态</label>
                    <select  class="form-control edit-input"  v-model="param.status" >
                        <option value="0">待审</option>
                        <option value="1">通过</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import filter from '../../filters/filters'
import tipsdialogModel  from '../tipsDialog'
import {
    editintentInfo
} from '../../vuex/actions'
export default {
    components: {
        filter,
        tipsdialogModel
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            tipsParam:{
                show:false,
                name:'修改成功'
            },
        }
    },
    props:['param'],
    vuex: {
       actions:{
           editintentInfo
       }
    },
    methods: {
        saveSucc:function(param){
           this.tipsParam.show= true;
           this.editintentInfo(param) 
        }
    },
    filter: (filter, {})
}
</script>
<style scoped>
.top-title{
    width: 100%;
    right: 0;
    top:130px;
}
.client-detailInfo img {
    width: 100px;
}
.panel-body ul li:last-of-type{
    float: right;
}
.panel-body ul > li:last-of-type {
    float: none;
    position: relative;
}
.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control{
    background-color: #fff;
}
.panel-collapse{
    background-color: #fff;
}
.panel-group .panel{
    border-radius: 10px;
}
.breed_action {
    top: 33px;
    right: 30px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt {
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}

.contactSet>thead{
    color: #fa6705;
}
.contactSet>tbody>tr>td,.contactSet>thead>tr>th{
    border-bottom: none;
    border-top: none;
    text-align: left;
}
.contact_img{
    margin-right: 6px !important;
}
</style>

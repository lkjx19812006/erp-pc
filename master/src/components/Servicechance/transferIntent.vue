<template>
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
                                <label class="editlabel">类型</label>
                                <select  class="form-control edit-input"  v-model="param.type">
                                        <option value="0">求购</option>
                                        <option value="1">供应</option>
                                </select>
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
                                <label class="editlabel">品种名称  <span class="system_danger" v-if="$validation.name.required">请选择品种名称</span></label>
                                <input type="text" class="form-control edit-input"  id="name" v-model="param.breedName" value="{{param.breedName}}" v-validate:name="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">资质证书</label>
                                <input type="text" class="form-control edit-input"   v-model="param.qualification" value="{{param.qualification | qualify}}" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">规格  <span class="system_danger" v-if="$validation.spec.required">请输入规格</span></label>
                                <input type="text" class="form-control edit-input"  id="spec" v-model="param.spec" value="{{param.spec}}" v-validate:spec="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">单位</label>
                                <input type="text" class="form-control edit-input"   v-model="param.unit" value="{{param.unit}}" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">交收地址  <span class="system_danger" v-if="$validation.address.required">请输入地址</span></label>
                                <input type="text" class="form-control edit-input"  id="address" v-model="param.address" value="{{param.address}}" v-validate:address="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">预付比例 <span class="system_danger" v-if="$validation.address.required">请输入预付比例</span></label>
                                <input type="text" class="form-control edit-input"  v-model="param.advance" value="{{param.advance}}" id="advance"  v-validate:advance="['required']"/>
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
                                <input type="text" class="form-control edit-input" v-model="param.sampling" value="{{param.sampling}}"  />
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
                                <label class="editlabel">报价总数</label>
                                <input type="text" class="form-control edit-input" v-model="param.offer" value="{{param.offer}}"  />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">状态</label>
                                <select  class="form-control edit-input"  v-model="param.status" >
                                    <option value="0">待审</option>
                                    <option value="1">通过</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm"   @click="createIntention(param,param.show = false)" value="确定"/>
                </div>
        </validator>
    </div>
</template>
<script>
import filter from '../../filters/filters'
import {
    createIntention
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
          
        }
    },
    vuex:{
        actions:{
            createIntention
        }
    },
    methods:{

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

<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.titles}}</h3>
        </div>
        <validator name="validation">
            <div class="edit-model">
               <section class="editsection clearfix" v-cloak v-if="param.titles=='申请分期审核'">
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">支付方式 <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                      <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="param.payWay">
                            <option value="2">{{$t('static.pingan')}}</option>
                            <option value="0">{{$t('static.offline')}}</option>
                            <option value="1">{{$t('static.alipay')}}</option>
                            <option value="4">WeChat</option>
                            <option value="3">{{$t('static.yaokuan')}}</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" v-if="param.payWay!=2"> 
                       <label class="editlabel">名称 <span class="system_danger" v-if="$validation.name.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-validate:name="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="param.payName">
                            <option>支付宝</option>
                            <option>Wechat</option>
                            <option>线下转账</option>
                            <option>药款支付</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" v-if="param.payWay==2"> 
                       <label class="editlabel">银行名称 <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-validate:payname="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="param.payName">
                            <option>中国银行</option>
                            <option>招商银行</option>
                            <option>广发银行</option>
                            <option>建设银行</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6"  v-if="param.payWay==2">
                       <label class="editlabel">银行支行</label>
                       <select class="form-control edit-input" v-model="param.paySubName">
                            <option>虹口支行</option>
                            <option>杨浦支行</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">用户名 <span class="system_danger" v-if="$validation.payuser.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="param.payUserName" v-validate:payuser="['required']" class="form-control edit-input" /> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">账号 <span class="system_danger" v-if="$validation.paynumber.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="param.payNumber" class="form-control edit-input" v-validate:paynumber="['required']" /> 
                    </div>
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.comment}}"></textarea>
                    </div>
                    <div class="editpage-input col-md-12">
                         <label class="editlabel">支付/收款凭证</label>
                         <press-image :value.sync="param.image_f" :showurl.sync="param.image_f_show" :type.sync="type" :param="imageParam" style="float:left;width:25%"></press-image>
                         <press-image :value.sync="param.image_s" :showurl.sync="param.image_s_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:25%"></press-image>
                         <press-image :value.sync="param.image_t" :showurl.sync="param.image_t_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:25%"></press-image>
                    </div>
               </section>
               <section class="editsection clearfix" v-cloak v-if="param.titles=='重新申请审核'">
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">支付方式 <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                      <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="initMyFundList[initMyFundList.length-1].payWay" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="initMyFundList[initMyFundList.length-1].payWay">
                            <option value="2">{{$t('static.pingan')}}</option>
                            <option value="0">{{$t('static.offline')}}</option>
                            <option value="1">{{$t('static.alipay')}}</option>
                            <option value="4">WeChat</option>
                            <option value="3">{{$t('static.yaokuan')}}</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" v-if="initMyFundList[initMyFundList.length-1].payWay!=2"> 
                       <label class="editlabel">名称 <span class="system_danger" v-if="$validation.name.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-validate:name="{required:true}" v-show="false" v-model="initMyFundList[initMyFundList.length-1].payName" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="initMyFundList[initMyFundList.length-1].payName">
                            <option>支付宝</option>
                            <option>Wechat</option>
                            <option>线下转账</option>
                            <option>药款支付</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" v-if="initMyFundList[initMyFundList.length-1].payWay==2"> 
                       <label class="editlabel">银行名称 <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-validate:payname="{required:true}" v-show="false" v-model="initMyFundList[initMyFundList.length-1].payName" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="initMyFundList[initMyFundList.length-1].payName">
                            <option>中国银行</option>
                            <option>招商银行</option>
                            <option>广发银行</option>
                            <option>建设银行</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6"  v-if="initMyFundList[initMyFundList.length-1].payWay==2">
                       <label class="editlabel">银行支行</label>
                       <select class="form-control edit-input" v-model="initMyFundList[initMyFundList.length-1].paySubName">
                            <option>虹口支行</option>
                            <option>杨浦支行</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">用户名 <span class="system_danger" v-if="$validation.payuser.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="initMyFundList[initMyFundList.length-1].payUserName" v-validate:payuser="['required']" class="form-control edit-input" /> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">账号 <span class="system_danger" v-if="$validation.paynumber.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="initMyFundList[initMyFundList.length-1].payNumber" class="form-control edit-input" v-validate:paynumber="['required']" /> 
                    </div>
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">备注</label>
                       <textarea v-model='initMyFundList[initMyFundList.length-1].comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.comment}}"></textarea>
                    </div>
                    <div class="editpage-input col-md-12">
                         <label class="editlabel">支付/收款凭证</label>
                         <img :src="initMyFundList[initMyFundList.length-1].images" />
                         <press-image :value.sync="param.image_f" :showurl.sync="param.image_f_show" :type.sync="type" :param="imageParam" style="float:left;width:25%"></press-image>
                         <press-image :value.sync="param.image_s" :showurl.sync="param.image_s_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:25%"></press-image>
                         <press-image :value.sync="param.image_t" :showurl.sync="param.image_t_show" :type.sync="type" :param="imageParam" style="float:left;margin-left:5%;width:25%"></press-image>
                    </div>
               </section>
            </div>
            <div class="edit_footer" v-if="param.titles=='申请分期审核'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
               <!--  <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=reject,tipsParam.name='确认审核不通过?'">不通过</button>
               <div v-if="param.key=='user'" style="display:inline-block">
                   <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=auditing,tipsParam.name='确认审核中?'">审核中</button>
               </div> -->
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show=false)">提交</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true" >提交</button>
            </div>
             <div class="edit_footer" v-if="param.titles=='重新申请审核'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
               <!--  <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=reject,tipsParam.name='确认审核不通过?'">不通过</button>
               <div v-if="param.key=='user'" style="display:inline-block">
                   <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true,tipsParam.callback=auditing,tipsParam.name='确认审核中?'">审核中</button>
               </div> -->
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirmReset(param)">提交</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true" >提交</button>
            </div>
        </validator>
    </div>
</template>
<script>
import tipsdialogModel  from '../../tips/tipDialog'
import pressImage from '../../imagePress'
import {
    initMyFundList
} from '../../../vuex/getters'
import {
    getMyFundList
} from '../../../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        pressImage
    },
    props: ['param'],
    data() {
        return {
            loadParam: {
              loading: true,
              show:false,
              color: '#5dc596',
              size: '15px',
              cur: 1,
              all: 1,
              type:this.param.type,
              amount:'',
              payName:'',
              payUserName:'',
              payNumber:'',
              payWay:'',
              validate:this.param.validate,
              total:0
            },
            tipsParam:{
                show:false,
                confirm:true,
                name:"",
                callback:''
            },
            type:"image/jpeg,image/jpg,image/png",
            imageParam:{
               url:'/crm/api/v1/file/',
               qiniu:false
            }
        }
    },
    vuex: {
        getters: {
            initMyFundList
        },
        actions: {
            getMyFundList
        }
    },
    methods: {
        confirmReset:function(item){
            console.log(item)
            console.log(this.initMyFundList[initMyFundList.length-1])
            item.payName = this.initMyFundList[initMyFundList.length-1].payName;
            item.payNumber = this.initMyFundList[initMyFundList.length-1].payNumber;
            item.paySubName = this.initMyFundList[initMyFundList.length-1].paySubName;
            item.payUserName = this.initMyFundList[initMyFundList.length-1].payUserName;
            item.payWay = this.initMyFundList[initMyFundList.length-1].payWay;
            this.param.show = false;
            this.param.link(item)
            console.log(item)
        }
    },
    created() {
        this.getMyFundList(this.loadParam);
    }

}
</script>
<style scoped>
.modal{
    z-index:1085;
}
.modal_con{
    z-index:1086;
    width:600px;
    height:650px;
}
.edit_footer{
    position: absolute;
    bottom: 0px;
    width:600px;
}
.top-title{
    width: 100%;
    position: absolute;
    top:0;
}
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
    font-size: 15px;
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


<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <bank-model :param="branchParam" v-if="branchParam.show"></bank-model>
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
               <!-- 申请分期 -->
               <section class="editsection clearfix" v-cloak v-if="param.titles=='申请分期审核'||param.titles=='申请支付'">
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">支付方式 <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                      <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="param.payWay" @change="selectname()">
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
                            <option>线下打款</option>
                            <option>支付宝</option>
                            <option>Wechat</option>
                            <option>药款支付</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" v-if="param.payWay==2"> 
                        <label class="editlabel">银行名称 <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                        <input type="text" v-validate:payname="{required:true}" v-show="false"  v-model="payName.name" class="form-control edit-input" />
                          <div  class="form-control edit-input" style="padding:0;border:none" >
                              <v-select
                                :debounce="250"
                                :value.sync="payName"
                                :on-change="selectProvince"
                                :options="initBankList"
                                placeholder="银行名称"
                                label="name"
                              >
                              </v-select>
                            </div>
                       <!-- <select class="form-control edit-input" v-model="param.payName">
                            <option v-for="item in initBankList">{{item.name}}</option>
                       </select> -->
                    </div>
                    <div class="editpage-input col-md-6"  v-if="param.payWay==2">
                       <label class="editlabel">银行支行</label>
                       <input type="text" v-model="param.paySubName" v-if="payName.name==''" disabled="true"  class="form-control edit-input" placeholder="请先选择一个银行" />
                       <input type="text" v-model="param.paySubName" v-if="payName.name!==''"  class="form-control edit-input" @click="branch({
                          show:true,
                          name:this.payName.name
                        })"/> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">用户名 <span class="system_danger" v-if="$validation.payuser.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="param.payUserName" v-validate:payuser="['required']" class="form-control edit-input" /> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">账号 <span class="system_danger" v-if="$validation.paynumber.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="param.payNumber" class="form-control edit-input" v-validate:paynumber="['required']" /> 
                    </div>
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">{{$t('static.currency')}}</label>
                       <select v-model="param.currency" class="form-control edit-input" disabled="true">
                          <option v-for="item in initCurrencylist" value="{{item.id}}">{{item.cname}}{{item.name}}</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.comment}}"></textarea>
                    </div>
                    
                    <div class="editpage-input col-md-12" style="max-height:200px;overflow-y:auto">
                         <label class="editlabel">支付/收款凭证</label>
                         <press-image :value.sync="param.image_f" :type.sync="type" :param="imageParam"></press-image>
                    </div>
               </section>
               <!-- 重新申请审核 -->
               <section class="editsection clearfix" v-cloak v-if="param.titles=='重新申请审核'||param.titles=='重新申请支付'">
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">支付方式 <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                      <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="param.payWay" @change="selectname()">
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
                            <option>线下打款</option>
                            <option>支付宝</option>
                            <option>Wechat</option>
                            <option>药款支付</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" v-if="param.payWay==2"> 
                      <!-- <label class="editlabel" @click="ddd()">银行名称 <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                        <input type="text" v-validate:payname="{required:true}" v-show="false" v-model="payName.name"  class="form-control edit-input" />
                          <div  class="form-control edit-input" style="padding:0;border:none" >
                              <v-select
                                :debounce="250"
                                :value.sync="payName"
                                :on-change="selectProvince"
                                :options="initBankList"
                                placeholder="银行名称"
                                label="name"
                              >
                              </v-select>
                          </div> -->
                          <label class="editlabel">银行名称 <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                          <input type="text" v-validate:payname="{required:true}" v-show="false" v-model="param.payName" class="form-control edit-input" />
                          <select class="form-control edit-input" v-model="param.payName">
                               <option v-for="item in initBankList">{{item.name}}</option>
                          </select>
                    </div>
                    <div class="editpage-input col-md-6"  v-if="param.payWay==2">
                       <label class="editlabel">银行支行</label>
                       <!-- <select class="form-control edit-input" v-model="initMyFundList[initMyFundList.length-1].paySubName"> -->
                        <input type="text" v-model="param.paySubName"  class="form-control edit-input" @click="branch({
                            show:true,
                            name:this.param.payName
                          })"/> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">用户名 <span class="system_danger" v-if="$validation.payuser.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="param.payUserName" v-validate:payuser="['required']" class="form-control edit-input" /> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">账号 <span class="system_danger" v-if="$validation.paynumber.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="param.payNumber" class="form-control edit-input" v-validate:paynumber="['required']" /> 
                    </div>
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">{{$t('static.currency')}}</label>
                       <select v-model='param.currency' class="form-control edit-input" disabled="true">
                          <option v-for="item in initCurrencylist" value=
                          "{{item.id}}">{{item.cname}}{{item.name}}</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.comment}}"></textarea>
                    </div>
                    <div class="editpage-input col-md-12" style="max-height:200px;overflow-y:auto;">
                         <label class="editlabel">支付/收款凭证</label>
                         <!-- <img :src="param.images" /> -->
                         <press-image :value.sync="param.image_f"  :type="type" :param="imageParam" ></press-image>
                    </div>
               </section>
               <!-- 重新申请审核end -->
               <section class="editsection clearfix" v-cloak v-if="param.titles=='申请发货'">
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.description}}"></textarea>
                    </div>
               </section>
               <!-- 收付款编辑 -->
                <section class="editsection clearfix" v-cloak v-if="param.titles=='编辑'">
                    <div class="editpage-input col-md-6">
                       <label class="editlabel">支付方式 <span class="system_danger" v-if="$validation.payway.required">{{$t('static.required')}}</span></label>
                      <input type="text" v-validate:payway="{required:true}" v-show="false" v-model="param.payWay" class="form-control edit-input" />
                       <select class="form-control edit-input" v-model="param.payWay"  @change="selectname()">
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
                            <option>线下打款</option>
                            <option>支付宝</option>
                            <option>Wechat</option>
                            <option>药款支付</option>
                       </select>
                    </div>
                    <div class="editpage-input col-md-6" v-if="param.payWay==2"> 
                        <label class="editlabel">银行名称 <span class="system_danger" v-if="$validation.payname.required">{{$t('static.required')}}</span></label>
                        <input type="text" v-validate:payname="{required:true}" v-show="false"  v-model="payName.name" class="form-control edit-input" />
                          <div  class="form-control edit-input" style="padding:0;border:none" >
                              <v-select
                                :debounce="250"
                                :value.sync="payName"
                                :on-change="selectProvince"
                                :options="initBankList"
                                placeholder="银行名称"
                                label="name"
                              >
                              </v-select>
                            </div>
                    </div>
                    <div class="editpage-input col-md-6"  v-if="param.payWay==2">
                       <label class="editlabel">银行支行</label>
                       <input type="text" v-model="param.paySubName"  class="form-control edit-input" @click="branch({
                          show:true,
                          name:this.payName.name
                        })"/> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">用户名 <span class="system_danger" v-if="$validation.payuser.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="param.payUserName" v-validate:payuser="['required']" class="form-control edit-input" /> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">账号 <span class="system_danger" v-if="$validation.paynumber.required">{{$t('static.required')}}</span></label>
                       <input type="text" v-model="param.payNumber" class="form-control edit-input" v-validate:paynumber="['required']" /> 
                    </div>
                    <div class="editpage-input col-md-6" >
                       <label class="editlabel">差额</label>
                       <input type="text" v-model="param.amount" class="form-control edit-input" value="{{param.amount}}" disabled="true" /> 
                    </div>
                    <div class="editpage-input col-md-12">
                       <label class="editlabel">备注</label>
                       <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.comment}}" disabled="true"></textarea>
                    </div>
               </section>
            </div>
            <div class="edit_footer" v-if="param.titles=='申请分期审核'||param.titles=='申请支付'||param.titles=='编辑'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm(param)">提交</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true" >提交</button>
            </div>
            <div class="edit_footer" v-if="param.titles=='重新申请审核'||param.titles=='重新申请支付'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirmReset(param)">提交</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true" >提交</button>
            </div>
            <div class="edit_footer" v-if="param.titles=='申请发货'">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="applySend(param)">提交</button>
                <button type="button" class="btn  btn-confirm" v-else disabled="true">提交</button>
            </div>
        </validator>
    </div>
</template>
<script>
import tipsdialogModel  from '../../tips/tipDialog'
import pressImage from '../../tools/upload/imagePressMul.vue'
import vSelect from '../../tools/vueSelect/components/Select'
import bankModel from './bankBranch'
import {
    initMyFundList,
    initBankList,
    initBankBranchList,
    initCurrencylist
} from '../../../vuex/getters'
import {
    getMyFundList,
    getBankList,
    getBankBranchList,
    getCurrencyList,
    orderApplySend
} from '../../../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        pressImage,
        vSelect,
        bankModel
    },
    vuex: {
        getters: {
            initMyFundList,
            initBankList,
            initBankBranchList,
            initCurrencylist
        },
        actions: {
            getMyFundList,
            getBankList,
            getCurrencyList,
            getBankBranchList,
            orderApplySend
        }
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
              validate:this.param.validate,
              bizSubId:this.param.bizSubId,
              bizId:this.param.bizId,
              total:0
            },
            resetCheckParam:{
                amount:'',
                payName:'',
                payUserName:'',
                payNumber:'',
                payWay:'',
                paySubName:0,
                //paySubName:0
            },
            tipsParam:{
                show:false,
                confirm:true,
                name:"",
                callback:''
            },
            payName:{
              name:""
            },
            branchParam:{
              show:false
            },
            type:"image/jpeg,image/jpg,image/png",
            imageParam:{
               url:'/crm/api/v1/file/',
               qiniu:false
            }
        }
    },
    
    methods: {
        branch:function(item){
           this.branchParam.show = true;
           this.branchParam = item;
           console.log(this.branchParam)
        },
        selectname:function(){
           if(this.param.payWay==0){
              this.param.payName ='线下打款';
              this.param.paySubName = "";
           }else if(this.param.payWay==1){
              this.param.payName ='支付宝';
              this.param.paySubName = "";
           }else if(this.param.payWay==3){
              this.param.payName ='药款支付';
              this.param.paySubName = "";
           }else if(this.param.payWay==4){
              this.param.payName ='Wechat';
              this.param.paySubName = "";
           }
        },
        confirm:function(item){
          this.param.show=false;
          if(this.payName.name){
            this.param.payName=this.payName.name;
          }
          console.log(this.param)
          this.param.link(this.param);
        },
        confirmReset:function(item){
            console.log(item)
            this.param.show = false;
            this.param.link(item)
            console.log(item)
        },
        applySend:function(item){
           this.param.show = false;
           console.log(item)
           this.orderApplySend(item);
        }
    },
    events:{
      subName: function(branch) {
        this.param.paySubName=branch.paySubName;
      },
       getImageData: function(imageData) {
            console.log('返回信息');
            console.log(imageData);
            var paths = new Array();
            this.param.path=imageData.result.path;
        },
      getFiles: function(files){
            this.param.images = '';
            for(let i = 0;i<files.length;i++){
                if(i==0){
                    this.param.images = files[0].path;
                }else{
                    this.param.images = this.param.images + "," + files[i].path;
                }
            }
        }
    },
    watch:{

    },
    created() {
        this.getCurrencyList(this.loadParam);
        console.log(this.initMyFundList)
        this.getBankList(this.payName);
        if(this.param.payName&&this.param.titles=='申请分期审核'){
            this.payName.name = this.param.payName;
        }
    }

}
</script>
<style scoped>
.modal{
    z-index:1085;
}
.modal_con{
    z-index:1086;
    height:650px;
}
.edit_footer{
    position: absolute;
    bottom: 0px;
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


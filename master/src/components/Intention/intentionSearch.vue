<template>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>意向搜索</h3>
        </div>
        <div class="edit-model">
             <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <section class="editsection" v-cloak>
                <div class="clearfix">
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种：</label>
                        <input type="text" class="form-control" v-model="param.breedName" readonly="true" @click="breedSearch()" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>客户名：</label>
                        <input type="text" class="form-control" v-model="param.customerName" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>手机：</label>
                        <input type="text" class="form-control" v-model="param.customerPhone" />
                    </div>  
                    <div class="client-detailInfo  col-xs-12">
                        <label>产地：</label>
                        <input type="text" class="form-control" v-model="param.location" />
                    </div>    
                    <div class="client-detailInfo  col-xs-12">
                        <label>意向类型：</label>
                        <select type="text" class="form-control" v-model="param.type">
                                <option value="" selected>全部</option>
                                <option value="0">求购</option>
                                <option value="1">供应</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12" v-show="param.type==1&&param.type">
                      <label>供应类型：</label>
                      <select type="text" class="form-control" v-model="param.especial">
                        <option value="" selected>全部</option>
                        <option value="0">普通供应</option>
                        <option value="1">低价资源</option>
                      </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12" v-show="param.type==0&&param.type">
                      <label>求购类型：</label>
                      <select type="text" class="form-control" v-model="param.especial">
                        <option value="" selected>全部</option>
                        <option value="0">普通求购</option>
                        <option value="1">紧急求购</option>
                      </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>提供发票：</label>
                        <select type="text" class="form-control" v-model="param.invoic">
                                <option value="" selected>全部</option>
                                <option value="0">无发票</option>
                                <option value="1">普通发票</option>
                                <option value="2">增值发票</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>上门看货：</label>
                        <select type="text" class="form-control" v-model="param.visit">
                                <option value="" selected>全部</option>
                                <option value="0">不看</option>
                                <option value="1">会看</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>提供样品：</label>
                        <select type="text" class="form-control" v-model="param.sampling">
                                <option value="" selected>全部</option>
                                <option value="0">无</option>
                                <option value="1">有</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>审核状态：</label>
                        <select type="text" class="form-control" v-model="param.validate">
                                <option value="" selected>全部</option>
                                <option value="0">初始</option>
                                <option value="9">审核中</option>
                                <option value="1">客服审核通过</option>
                                <option value="-1">客服审核不通过</option>
                                <option value="2">业务员申请审核</option>
                                <option value="3">业务主管审核通过</option>
                                <option value="-3">业务主管审核不通过</option>
                        </select>
                    </div>
                  <div class="client-detailInfo  col-xs-12" v-if="param.link!='/intention/user/list'">
                    <label>上/下架状态：</label>
                    <select type="text" class="form-control" v-model="param.onSell">
                      <option value="" selected>全部</option>
                      <option value="0">初始</option>
                      <option value="1">申请上架</option>
                      <option value="2">已上架</option>
                      <option value="-2">上架失败</option>
                      <option value="3">申请下架</option>
                      <option value="4">已下架</option>
                      <option value="-4">下架失败</option>
                    </select>
                  </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>预付比例：</label>
                        <select type="text" class="form-control" v-model="param.advance">
                                <option value="" selected>全部</option>
                                <option value="0">0~10%</option>
                                <option value="0.1">10%~20%</option>
                                <option value="0.2">20%~30%</option>
                                <option value="0.3">30%~40%</option>
                                <option value="0.4">40%~50%</option>
                                <option value="0.5">50%~60%</option>
                                <option value="0.6">60%~70%</option>
                                <option value="0.7">70%~80%</option>
                                <option value="0.8">80%~90%</option>
                                <option value="0.9">90%~100%</option>
                        </select>
                    </div>
                </div>
            </section>

        </div>
      <!--<div class="edit_footer">-->
        <!--<button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>-->
        <!--<input type="button" class="btn  btn-confirm"  @click="userSearch(param,param.show = false)" value="确定">-->
      <!--</div>-->

    </div>
    <div class="edit_footer">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="intentionSearch(param,param.show = false)" value="确定">
    </div>
</template>
<script>

import calendar from '../calendar/vue.datepicker'
import breedsearchModel from './breedsearch'
import {
    getIntentionList
} from '../../vuex/actions'
export default {
    components: {
        breedsearchModel
    },
    props: ['param'],
    data() {
        return {
          loadParam: {
                loading: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                name:'',
                tel:'',
                employeeId:'',
                employeeName:''
            },
            empNameParam:{
                show:false,
                employeeId:'',
                employeeName:''
            },
            breedSearchParam:{
                show:false    
            },
        }
    },
    vuex: {
        actions: {
             getIntentionList
        }
    },
    events:{
        a:function(qq){
            this.loadParam.employeeId = qq.employeeId;
            this.loadParam.employeeName = qq.employeeName;
        },
        breed:function(breed){
            this.param.breedId=breed.breedId;
            this.param.breedName=breed.breedName;
            console.log(this.param);
        }
    },
    methods:{
        breedSearch:function(){
            this.breedSearchParam.show = true;
        },
        intentionSearch:function(param){
            this.param.cur = 1;
            console.log(this.param);
            this.getIntentionList(this.param);
        },
        resetTime:function(){
            this.param.startCtime = "";
            this.param.endCtime = "";
        },
        employee:function(employeeId,employeeName){
            this.empNameParam.show=true;
            this.loadParam.employeeId = this.empNameParam.employeeId;
            this.loadParam.employeeName = this.empNameParam.employeeName;
        }
    },
    created() {
        //this.getUserList(this.loadParam);
        console.log(this.param)
    }
}
</script>
<style scoped>
.modal_con{
    width: 600px;
}
.top-title{
    position: fixed;
    width: 600px;
    top: 91px;
    left: 0;
    right: 0;
    margin: auto;
}
.edit_footer{
    position: fixed;
    bottom: 50px;
    width: 100%;
  z-index: 1080;
  width: 600px;

}
.empSearch{
    position: absolute;
    right: 15px;
    top: 26px;
    width: 6%;
    height: 34px;
    cursor: pointer;
    border-left: 1px solid #ddd;
}
.empSearch >img{
    margin: auto;
    position: relative !important;
    vertical-align: middle;
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

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 60px 30px;
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
.client-detailInfo img{
    position: absolute;
    top: 6px;
}
</style>

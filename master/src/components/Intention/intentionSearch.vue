<template>
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
                        <label>类型：</label>
                        <select type="text" class="form-control" v-model="param.type">
                                <option value="">请选择类型</option>
                                <option value="0">求购</option>
                                <option value="1">供应</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>是否提供发票：</label>
                        <select type="text" class="form-control" v-model="param.invoic">
                                <option value="">请选择发票</option>
                                <option value="0">无发票</option>
                                <option value="1">普通发票</option>
                                <option value="2">增值发票</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>是否上门看货：</label>
                        <select type="text" class="form-control" v-model="param.visit">
                                <option value="">请选择</option>
                                <option value="0">不看</option>
                                <option value="1">会看</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>是否提供样品：</label>
                        <select type="text" class="form-control" v-model="param.sampling">
                                <option value="">请选择样品</option>
                                <option value="0">无</option>
                                <option value="1">有</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>选择状态：</label>
                        <select type="text" class="form-control" v-model="param.status">
                                <option value="">请选择状态</option>
                                <option value="0">待审</option>
                                <option value="1">通过</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>预付比例：</label>
                        <select type="text" class="form-control" v-model="param.advance">
                                <option value="">请选择预付比例</option>
                                <option value="0">0</option>
                                <option value="1">100%</option>
                                <option value="0.1">10%</option>
                                <option value="0.2">20%</option>
                                <option value="0.3">30%</option>
                                <option value="0.4">40%</option>
                                <option value="0.5">50%</option>
                                <option value="0.6">60%</option>
                                <option value="0.7">70%</option>
                                <option value="0.8">80%</option>
                                <option value="0.9">90%</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>是否是国际信息：</label>
                        <select type="text" class="form-control" v-model="param.intl">
                                <option value="">通过国际搜索</option>
                                <option value="0">国内</option>
                                <option value="1">国际</option>
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
import {
    getIntentionList
} from '../../vuex/actions'
export default {
    components: {

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
            }
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
        }
    },
    methods:{
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
    }
}
</script>
<style scoped>
.modal_con{

    width: 600px;
}
.top-title{
    position: absolute;
    width: 100%;
    top: 0;
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

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
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
.client-detailInfo img{
    position: absolute;
    top: 6px;
}
</style>

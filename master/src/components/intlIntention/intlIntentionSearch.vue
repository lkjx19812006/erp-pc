<template>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.search')}}</h3>
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
                        <label>业务员名：</label>
                        <input type="text" class="form-control" v-model="param.employee" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>客户邮箱：</label>
                        <input type="text" class="form-control" v-model="param.customerEmail" />
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
    getIntlIntentionList
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
             getIntlIntentionList
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
            this.getIntlIntentionList(this.param);
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

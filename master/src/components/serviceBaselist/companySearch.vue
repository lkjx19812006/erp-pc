<template>
    <searchemp-model :param="empNameParam" v-if="empNameParam.show"></searchemp-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>企业查询</h3>
        </div>
        <div class="edit-model">
             <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <section class="editsection" v-cloak>
                <div class="clearfix">
                     <div class="client-detailInfo  col-xs-12">
                        <label>省：</label>
                        <input type="text"  class="form-control" v-model="param.province"  placeholder="按省查询"/>
                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>类别：</label>
                        <select class="form-control" v-model="param.type">
	                        <option value="" selected>按类别搜索</option>
	                        <option value="MF">药厂</option>
	                        <option value="CF">化妆品厂</option>
	                        <option value="FF">食品厂</option>
	                        <option value="HF">保健品厂</option>
                     </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>是否划转：</label>
                        <select class="form-control" v-model="param.transform">
	                        <option value="" selected>根据客户划转</option>
	                        <option value="">已划转</option>
	                        <option value="">未划转</option>
                     </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>企业名称：</label>
                        <input type="text"  class="form-control" v-model="param.name"  placeholder="按企业名查询"/>
                    </div>
                    
                    <div class="client-detailInfo  col-xs-12">
                        <label>分类码：</label>
                        <input type="text"  class="form-control" v-model="param.category"  placeholder="按分类码查询"/>
                    </div>
                   
                    
                </div>      
            </section>
        </div>
        <div class="edit_footer">
             <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <input type="button" class="btn  btn-confirm"  @click="companySearch(param,param.show = false)" value="确定">
        </div>
    </div>
</template>
<script>

import calendar from '../calendar/vue.datepicker'
import {
    getCompanyData
} from '../../vuex/actions'
export default {
    components: {
        
    },
    props: ['param'],
    data() {
        return {
          loadParam: {
                show:false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                province:'',
                type:'',
                transform:'',
                name:'',
                category:''
            },
            
        }
    },
    vuex: {
        actions: {
            getCompanyData
        }
    },
    events:{
        a:function(qq){
            this.loadParam.employeeId = qq.employeeId;
            this.loadParam.employeeName = qq.employeeName;
        }
    },
    methods:{
        companySearch:function(param){
             this.getCompanyData(this.param);
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
    created() {
        //this.getCompanyData(this.loadParam);
    }
}
</script>
<style scoped>
.modal_con{
    max-height: 650px;
    width: 600px;
} 
.top-title{
    position: absolute;
    width: 100%;
    top: 0;
}
.edit_footer{
    position: absolute;
    bottom: 0;
    width: 100%;
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

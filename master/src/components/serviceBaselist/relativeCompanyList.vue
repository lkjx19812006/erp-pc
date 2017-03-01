<template>
    <detail-model  :param="detailParam" v-if="detailParam.show"></detail-model>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="model-header">
            <h4>相关企业（{{param.name}}）</h4>
            <div class="trans_service clearfix">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_head table-striped " v-cloak>
                    <thead>
                        <tr>
                            <th>公司名称</th>
                            <th>手机号</th>
                            <th>公司类型</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initRelativeCompanylist" >
                            <td><a @click="companyDetail(item.id,$index)">{{item.name}}</a></td>
                            <td>{{item.tel}}</td>
                            <td>{{item.type}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="option">
                    <!-- <button type="button" class="btn btn-close"  @click="param.show = false">取消</button> -->
                    <input  type="button" class="btn btn-orange" @click="param.show = false" value="返回"/>
                </div> 
            </div>
            <div class="base_pagination">
                <pagination :combination="loadParam"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import detailModel  from '../serviceBaselist/companydetail'
import {
    initRelativeCompanylist,
} from '../../vuex/getters'
import {
    getRetiveCompany,
    getCompanyDetail
  
} from '../../vuex/actions'
export default{
    props:['param'],
    data(){
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total:0,
                name:''
            },
            detailParam: {
                id:'',
                show:false,
                loading:false
            }
        }
    },
    components:{
        pagination,
        detailModel
    },
    vuex:{
        getters:{
            initRelativeCompanylist
        },
        actions:{
            getRetiveCompany,
            getCompanyDetail
        }
    },
    methods:{ 
        companyDetail:function(id,index){
            this.detailParam.show = true;
            this.detailParam.id = id;
            this.detailParam.sub=index;
            this.detailParam.loading = true;
            this.getCompanyDetail(this.detailParam);
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getRetiveCompany(this.loadParam);
        }
    },
    created(){
        this.loadParam.name = this.param.name;
        this.loadParam.link = this.param.link;
        this.getRetiveCompany(this.loadParam);
    }
}
</script>
<style scoped>
.modal{
    z-index: 1020;
}
.modal_con{
    z-index: 1020;
}
.change_trans{
    margin-top: 20px;
}
.con_trans{
    margin-top: 40px;
}
.top-title {
    left:0;
    right: 0;
    width:800px;
}
.tans_tab{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #fa6705;
    text-align: left;
}
.tans_tab > .tabs{
    width: 100px;
    display: inline-block;
    font-size:16px;
    text-align: center;
    background-color: #f5f5f5;
    color: #333;
    float: left;
    height: 40px;
    border-bottom: 1px solid #fa6705;
    cursor: pointer;
}
.tans_tab .tabs_active{
    background-color: #fff;
    color: #fa6705;
    border: 1px solid #fa6705;
    border-bottom: 0;
}
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.trans_service{
    margin-top: 20px;
}
.trans_service .col-xs-8{
    margin-bottom: 20px;
}
.table{
    margin-bottom: 5px;
}
.table_head>thead>tr{
    background-color: #f5f5f5;
    color: #333;
    font-size: 18px;
}
.base_pagination{
    margin-top: 0;
    bottom: 50px;
}
.table{
    display: table
}
.option {
    
    text-align: right;
    padding: 10px 20px;
    
    position: fixed;
    left: 0;
    right: 0;
    
    width: 800px;
    background: #fff;
    margin: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>
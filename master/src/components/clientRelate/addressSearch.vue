<template>
    <createaddr-model :param="addressParam" v-if="addressParam.show"></createaddr-model>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="model-header">
            <h4>收货人地址信息</h4>
            <div class="trans_service clearfix">
                <div class="cover_loading">
                    <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
                </div>
                
                <table class="table table-hover table_head table-striped " v-cloak>
                    <thead>
                        <tr>
                            <th></th>
                            <th>收货人</th>
                            <th>手机号</th>
                            <th>地址</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initAddressList" @click="serviceselected($index,item)">
                           <td >
                               <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"></label>
                            </td>
                            <td>{{item.contactName}}</td>
                            <td>{{item.contactPhone}}</td>
                            <td>{{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.detailAddr}}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="padding-left:25%">
                    <div style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showCreateAddress({
                                             customerId:param.customerId,
                                             show:true,
                                             title:'地址',
                                             typelist:'类型',
                                             namelist:'联系人姓名',
                                             phonelist:'联系人电话',
                                             sexlist:'性别',
                                             countylist:'国家',
                                             provicelist:'所在省',
                                             citylist:'所在市',
                                             addr_detail:'地址',
                                             distlist:'所在区域',
                                             streetlist:'所在街道',
                                             addr:'详细地址',
                                             type:'',
                                             contactName:'',
                                             contactPhone:'',
                                             sex:'',
                                             country:'',
                                             province:'',
                                             city:'',
                                             district:'',
                                             street:'',
                                             detailAddr:'',
                                             address:'',
                                             link:createAddress,
                                             url:'/customer/insertAddress',
                                             key:'addresses'
                                             })">新增收货地址</div>   
                </div>
                <!-- <div class="edit_footer">
                    <button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
                    <input  type="button" class="btn btn-orange" @click="selected(param,param.show=false)" value="确定"/>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import createaddrModel from './createAddrInfo'
import {
   initAddressList
} from '../../vuex/getters'
import {
    getAddrInfo,
    createAddress,
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
                name:'',
                mobile:'',
                orgId:''
            },
            selectOrgParam:{
                show:false,
                orgId:'',
                orgName:'',
                callback:this.callback,
            },
            addressParam:{
                show:false
            },
            checked:false,
            show:true
        }
    },
    components:{
        createaddrModel
    },
    vuex:{
        getters:{
           initAddressList
        },
        actions:{
           getAddrInfo,
           createAddress,
        }
    },
    methods:{
        serviceselected:function(index,item){
            this.param.show=false;
            this.$dispatch('address',item);
        },
        showCreateAddress:function(address){
            this.addressParam = address;
        }
        
    },
    events: {
        
    },
    created(){
        this.getAddrInfo(this.param);
    }
}
</script>
<style scoped>
.modal{
    z-index: 1086;
}
.modal_con{
    z-index: 1086;
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
}
.table{
    display: table
}
</style>
<template>
	<delete-model :param="delParam" v-if="delParam.show"></delete-model>
    <modify-model :param="modifyParam" v-if="modifyParam.show"></modify-model>
    <system-model :param="dialogParam" v-if="dialogParam.show"></system-model>
	<div class="order_search">
        <div class="clear">
            <div class="my_order col-xs-2">枚举类型</div>
            <div class="col-xs-8 my_order_search">
                <div class="name_search">
                    <select class="form-control"  v-model="loadParam.sel" @change="searchname(
                    )">
                        <option selected value="">请选择种类名称搜索</option>
                        <option  value="TRACE">跟进类型</option>
                        <option  value="ST">规格类型</option>
                        <option  value="BANK">银行</option>
                        <option  value="OSTAT">订单状态</option>
                        <option  value="OT">包装方式</option>
                        <option  value="MU">计量单位</option>
                        <option  value="PAY">付款方式</option>
                        <option  value="CL">客户信用等级</option>
                        <option  value="IS">意向状态</option>
                        <option  value="HT">药材品类</option>
                        <option  value="ES">员工状态</option>
                        <option  value="ET">企业类型</option>
                        <option  value="CS">客户来源</option>
                        <option  value="CT">证书类型</option>
                        <option  value="AS">审核状态</option>
                        <option  value="DEV">快递公司</option>
                        <option  value="POS">职位</option>
                        <option  value="LBL">常见标签</option>
                        <option  value="ON">客户信用等级</option>
                    </select>
                </div>
            </div>
            <div class="right col-xs-2">
                <button class="new_btn" @click="newData('data')" data-toggle="modal" data-target="#myModal">新建</button>
            </div>
        </div>
    </div>
    <div class="order_table">
      <div class="cover_loading">
          <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
       <table class="table table-hover table_color table-striped"  v-cloak>
          <thead>
              <tr>
                 <th>编码</th>
                 <th>名称</th>
                 <th>类型</th>
                 <th>描述</th>
                 <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in initSystemlist">
                <td>{{item.code }}</td>
                <td>{{item.name}}</td>
                <td>{{item.typedesc}}</td>
                <td>{{item.desc }}</td>
                <td  @click="editData($index)">
                  <img height="24" width="24" src="/static/images/default_arrow.png" style="margin:auto"/>
                   <div class="component_action" v-show='item.show' transition="expand">
                      <ul>
                          <li @click="modify($index)">编辑</li>
                          <li @click="del({
                                sub:$index,
                                id:item.id,
                                show:true
                                })">删除</li>
                      </ul>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
    </div>
     <div class="order_pagination">
        <pagination :combination="loadParam"></pagination>
    </div>
</template>
<script>
import pagination from '../pagination'
import systemModel from '../systemcomponent/systemDataInfoDialog'
import modifyModel from '../systemcomponent/systemUpdateInfo'
import deleteModel from '../systemcomponent/systemDelInfo'
import filter from '../../filters/filters'

import {
    initSystemlist,
    initSearchlist
} from '../../vuex/getters'
import {
    getSystemData,
    changeShowStatue,
    getSystemSearch
} from '../../vuex/actions'

export default {
    components: {
        systemModel,
        pagination,
        modifyModel,
        deleteModel,
        filter
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                all:10,
                cur:1,
                sel:''
            },
            dialogParam:{
                 show: false,
                 name: 'data'
            },
            modifyParam:{
            	id:'',
            	show:false
            },
            delParam:{
                id:'',
                show:false
            },
            show:true,
            editmodel:true,
            sel:''
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getSystemSearch(this.loadParam);
        }
    },
    vuex: {
        getters: {
            initSystemlist,
            initSearchlist
        },
        actions: {
            getSystemData,
            changeShowStatue,
            getSystemSearch
        }
    },
    created() {
        this.getSystemData(this.loadParam,this.loadParam.all);
    },
    methods: {
        searchname: function() {
            this.getSystemSearch(this.loadParam);
        },
        editData: function(id) {
            if(this.$store.state.table.systemBaseList.enumlist[id].show == true){
                this.$store.state.table.systemBaseList.enumlist[id].show=!this.$store.state.table.systemBaseList.enumlist[id].show;
            }else{
                 this.$store.state.table.systemBaseList.enumlist[id].show=true;
            }
        },
        newData:function(value){
             this.dialogParam.name=value;
             this.dialogParam.show=true;
             this.editmodel = false;
        },
        modify:function(id){
          	this.modifyParam.id=id;
            this.modifyParam.show=true;
            this.$broadcast('getParam');
        },
        del:function(param){
            this.delParam.id=param.id;
            this.delParam.sub=param.sub;
            this.delParam.show=true;
        }
    },

    filter:(filter,{
    })

}
</script>
<style scoped>
.order_search {
    padding: 25px 30px 0 40px;
}

.my_order {
    float: left;
    color: #fa6705;
    font-size: 20px;
    padding: 0;
}
.name_search{
    position: relative;
    border:none;
    display: inline-block;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    background: #fff;
    height: 34px;
    line-height: 32px;
     margin-right: 7%;
}
.tel_search {
    margin-right: 0;
}
.new_btn {
    float: right;
    border: 1px solid #ccc;
    color: #003077;
    padding: 4px 10px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    background: #fff;
}

.order_table {
    margin-top: 20px;
    position: relative;
}

.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}

.order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 15.8%;
    display: table-cell;
}

.order_table .table > ul >li a {
    color: #003077;
}

.order_table .table_hover > ul:hover {
    background: #f5f5f5;
}

.order_table .table > ul >li img {
    margin: auto;
}

.order_action {
    position: absolute;
    right: 96px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
}

.order_show {
    position: absolute;
    right: 96px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
    display: block;
}

.order_action ul,
.order_show ul {
    margin-bottom: 0;
}

.order_action ul li a,
.order_show ul li a {
    color: #003077;
    padding: 5px 5px 5px 10px;
    display: block;
    cursor: pointer;
}

.expand-transition {
    transition: all .3s ease;
    overflow: inherit;
}

.expand-enter,
.expand-leave {
    opacity: 0;
    height: 0;
}

.v-spinner {
    text-align: center;
}
.order_pagination{
    margin: 0 auto;
    text-align: center;
}

.table>tbody{
    position: relative;
}
.table>tbody>tr{
    position: relative;
}
.space>tr>th {
    background-color: #f4f6f9;
    height: 10px;
}
.component_action{
    position: absolute;
    right: 20px;
    padding: 10px 0;
    top:32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
}
.component_action ul{
    margin-bottom: 0;
}
.component_action ul li{
    text-align: left;
    padding:3px 8px;
    cursor: pointer;
}
.base_pagination{
    margin: auto;
    text-align: center;
}
.cover_loading{
   text-align: center;
   position: absolute;
   top: 40%;
   z-index: 1100;
   left: 0;
   right: 0
}

</style>

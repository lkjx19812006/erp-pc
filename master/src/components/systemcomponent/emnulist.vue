<template>
	<delete-model :param="delParam" v-if="delParam.show"></delete-model>
    <modify-model :param="modifyParam" v-if="modifyParam.show"></modify-model>
    <system-model :param="dialogParam" v-if="dialogParam.show"></system-model>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
            <div class="clear">
            <div class="my_order_search left">
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
                        <option  value="CUST_CN">其他类型</option>
                    </select>
                </div>
            </div>
            <div class="right">
                <button class="btn btn-default" @click="newData()" type="button">新建</button>
                <button class="btn btn-primary" @click="searchname()" type="button">刷新</button>
            </div>
        </div>
        </div>
        <!-- 中间列表 -->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped"  v-cloak id="tab">
                <thead>
                  <tr>
                     <th>编码</th>
                     <th>名称</th>
                     <th>类型</th>
                     <th>描述</th>
                     <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in initSystemlist">
                    <td>{{item.code }}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.type | enumlist }}</td>
                    <td>{{item.desc }}</td>
                    <td ><a class="operate"  @click="modify(item,$index)"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/></a>
                      <!-- <img height="24" width="24" src="/static/images/default_arrow.png" style="margin:auto"/>
                       <div class="component_action" v-show='item.show' transition="expand">
                          <ul>
                              <li @click="modify($index)">编辑</li>
                              <li @click="del({
                                    sub:$index,
                                    id:item.id,
                                    show:true
                                    })">删除</li>
                          </ul>
                        </div> -->
                    <!-- </td>
                     <td > -->
                        <a class="operate" @click="del({
                                sub:$index,
                                id:item.id,
                                show:true
                                })"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/></a>
                     </td>
                  </tr>
                </tbody>
            </table>
        </div>
         <!-- 底部分页 -->
        <pagination :combination="loadParam"  slot="page"></pagination>
    </mglist-model>
	
</template>
<script>
import pagination from '../pagination'
import systemModel from '../systemcomponent/systemDataInfoDialog'
import modifyModel from '../systemcomponent/systemUpdateInfo'
import deleteModel from '../systemcomponent/systemDelInfo'
import filter from '../../filters/filters'
import common from '../../common/common'
import tipsModel from '../tips/tipDialog'
import mglistModel from '../mguan/mgListComponent.vue'
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
        filter,
        tipsModel,
        mglistModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                all:10,
                cur:1,
                sel:'',
                total:0
            },
            dialogParam:{
                 show: false,
                 name: ''
            },
            modifyParam:{
            	id:'',
            	show:false
            },
            tipsParam:{
                show: false,
                name: '',
                alert:true
            },
            delParam:{
                id:'',
                show:false
            },
            emlistdata : [
                {"TRACE" : '跟进类型'},
                {"ST" : '规格类型'},
                {"BANK" : '银行'},
                {"OSTAT" : '订单状态'},
                {"OT" : '包装方式'},
                {"MU" : '计量单位'},
                {"PAY" : '付款方式'},
                {"CL" : '客户信用等级'},
                {"IS" : '意向状态'},
                {"HT" : '药材品类'},
                {"ES" : '员工状态'},
                {"ET" : '企业类型'},
                {"CS" : '客户来源'},
                {"CT" : '证书类型'},
                {"AS" : '审核状态'},
                {"DEV" : '快递公司'},
                {"POS" : '职位'},
                {"LBL" : '常见标签'},
                {"ON" : '客户信用等级'}
            ],
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
    ready(){
      common('tab','table_box',1);
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
        newData:function(){
             this.dialogParam.show=true;
             this.editmodel = false;
             this.dialogParam.callback = this.callback;
        },  
        modify:function(item,id){
          	this.modifyParam.id=id;
            this.modifyParam.show=true;
            this.$broadcast('getParam');
            this.modifyParam.callback = this.callback;
        },
        callback:function(title){
            this.tipsParam.show=true;
            this.tipsParam.name=title;
            this.tipsParam.alert=true;
        },
        del:function(param){
            this.delParam.id=param.id;
            this.delParam.sub=param.sub;
            this.delParam.show=true;
        }
    },
    filter:(filter,{}),
    created() {
        this.getSystemData(this.loadParam);
    }
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
 #table_box  table th,#table_box  table td{
    width: 340px;
    min-width: 340px;
}
</style>

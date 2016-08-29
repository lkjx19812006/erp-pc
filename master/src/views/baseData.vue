<template>
    <drawdel-model :param="modelParam"></drawdel-model>
    <ingredient-model :param="ingredientParam"></ingredient-model>
    <entprise-model :param="entpriseParam"></entprise-model>
    <div class="service-data" v-show="$route.path.split('=')[1]==0">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">企业</div>
            <div class="right col-xs-2">
                <enterprise-model :param="dialogParam"></enterprise-model> 
                <button class="new_btn" @click="enterprise('enedit')" data-toggle="modal" data-target="#myModal">新建</button>
            </div>
        </div>
        <div class="order_table">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader> 
            <table class="table table-hover table_color">
                <thead>
                    <tr>
                        <th>编 码</th>
                        <th>分类码</th>
                        <th>企业名称</th>
                        <th>联系人</th>
                        <th>电 话</th>
                        <th>介 绍</th>
                        <th>法定代表人</th>
                        <th>企业代表人</th>
                        <th>生产范围</th>
                        <th>省 市</th>
                        <th>注册地址</th>
                        <th>生产地址</th>
                        <th>发证日期</th>
                        <th>有效截止日</th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead> 
                <tbody>
                    <tr v-for="item in initEnterpriselist" v-cloak>
                        <td>{{item.enterpriseCode}}</td>
                        <td>{{item.enterpriseClassify}}</td>
                        <td>{{item.enterpriseName}}</td>
                        <td>{{item.enterprisePhone}}</td>
                        <td>{{item.enterpriseContact}}</td>
                        <td>{{item.enterpriseIntroduce}}</td>
                        <td>{{item.enterpriseLegal}}</td>
                        <td>{{item.enterpriseCompany}}</td>
                        <td>{{item.enterpriseRange}}</td>
                        <td>{{item.enterpriseArea}}</td>
                        <td>{{item.enterpriseAddr}}</td>
                        <td>{{item.enterpriseRegist}}</td>
                        <td>{{item.enterpriseDate}}</td>
                        <td>{{item.enterpriseDeadline}}</td>
                        <td @click="etpriseEdit($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show='item.show' transition="expand">
                                <ul>
                                    <li>编辑</li>
                                    <li @click="entpriseDel($index)">删除</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- 成分 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==1">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">成分</div>
            <div class="right col-xs-2">
                <component-model :param="dialogParam"></component-model> 
                <button class="new_btn" @click="component('data')" data-toggle="modal" data-target="#myModal">新建</button>
            </div>
        </div>
        <div class="order_table">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            <table class="table table-hover table_color">
                <thead>
                    <tr>
                        <th>编 码</th>
                        <th>药品名</th>
                        <th>所属药厂</th>
                        <th>成分名</th>
                        <th>含 量</th>
                        <th>单 位</th>
                        <th>类型</th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initConponentlist" v-cloak>
                        <td>{{item.componentId}}</td>
                        <td>{{item.componentName}}</td>
                        <td>{{item.componentOwn}}</td>
                        <td>{{item.componentname}}</td>
                        <td>{{item.componentContent}}</td>
                        <td>{{item.componentUnit}}</td>
                        <td>{{item.componenttype}}</td>
                        <td @click="componentEdit($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show='item.show' transition="expand">
                                <ul>
                                    <li>编辑</li>
                                    <li  @click="delIngredit($index)">删除</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- 提取物 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==2">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">提取物</div>
            <div class="right col-xs-2">
              <draw-model :param="dialogParam"></draw-model>
                <button class="new_btn" @click="draw('data')" data-toggle="modal" data-target="#myModal">新建</button>
            </div>
        </div>
        <div class="order_table">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            <table class="table table-hover table_color">
                <thead>
                    <tr>
                        <th>中文名</th>
                        <th>英文名</th>
                        <th>拉丁文名</th>
                        <th>有效成分和别名</th>
                        <th>常用比例</th>
                        <th>客户名称</th>
                        <th>产地</th>
                        <th>规格</th>
                        <th>采购价格</th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initDrawlist" v-cloak>
                        <td>{{item.drawchinese}}</td>
                        <td>{{item.drawenglish}}</td>
                        <td>{{item.drawlatin}}</td>
                        <td>{{item.drawactive}}</td>
                        <td>{{item.drawratio}}</td>
                        <td>{{item.drawclientName}}</td>
                        <td>{{item.drawproduct}}</td>
                        <td>{{item.drawspec}}</td>
                        <td>{{item.drawprice}}</td>
                        <td  @click="drawEdit($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show='item.show' transition="expand">
                                <ul>
                                    <li>编辑</li>
                                    <li @click="delOperation($index)">删除</li>
                                </ul>
                            </div>
                        </td>
                     </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import enterpriseModel  from '../components/enterpriseEditDialog'
import componentModel  from '../components/componentEditDialog'
import drawModel from '../components/drawEditDialog'
import drawdelModel from '../components/drawDeleteModel'
import ingredientModel from '../components/ingredientDelModel'
import entpriseModel from '../components/entpriseDelModel'
import {
    getList,
    initEnterpriselist,
    initConponentlist,
    initDrawlist
} from '../vuex/getters'
import {
    getEnterpriseData,
    getComponentData,
    getDrawData
} from '../vuex/actions'
export default {
    components:{
        enterpriseModel,
        componentModel,
        drawModel,
        drawdelModel,
        ingredientModel,
        entpriseModel
    },
    data(){
        return {
            dialogParam:{
                show:false,
                name:'enedit',
                name:'data'
            },
             loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            modelParam:{
                show:false,
                $index:'id'
            },
            ingredientParam:{
                show:false,
                $index:'id'
            },
            entpriseParam:{
                show:false,
                $index:'id'
            }
        }
    },
    vuex: {
        getters: {
            getList,
            initEnterpriselist,
            initConponentlist,
            initDrawlist
        },
        actions: {
            getEnterpriseData,
            getComponentData,
            getDrawData
        }
    },
    created() {
        this.getEnterpriseData(this.loadParam);
        this.getComponentData(this.loadParam);
        this.getDrawData(this.loadParam);
        if (this.$route.query.id > this.getList[10].subcategory.length || isNaN(this.$route.query.id) || !this.$route.query.id) {
            this.$route.query.id = 0;
        }
    },
    methods: {
        enterprise:function(value){
            this.dialogParam.show= true;
            this.dialogParam.name = value;
        },
        component:function(value){
            this.dialogParam.show= true;
            this.dialogParam.name = value;
        },
        draw:function(value){
             this.dialogParam.show= true;
             this.dialogParam.name = value;
        },
        etpriseEdit: function(id) {
            if(this.$store.state.table.enterpriseList[id].show){
                this.$store.state.table.enterpriseList[id].show = !this.$store.state.table.enterpriseList[id].show;
            }else{
               this.$store.state.table.enterpriseList[id].show = true;
            }
        },
        componentEdit:function(id){
            if(this.$store.state.table.componentList[id].show){
                this.$store.state.table.componentList[id].show = !this.$store.state.table.componentList[id].show;
            }else{
               this.$store.state.table.componentList[id].show = true;
            }
        },
        drawEdit:function(id){
            if(this.$store.state.table.drawList[id].show){
                this.$store.state.table.drawList[id].show = !this.$store.state.table.drawList[id].show;
            }else{
               this.$store.state.table.drawList[id].show = true;
            }
        },
        delOperation:function(id){
            this.modelParam.show = true;
        },
        delIngredit:function(id){
            this.ingredientParam.show = true;
        },
        entpriseDel:function(id){
            this.entpriseParam.show = true;
        }
    },
     route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
        }
    }
}
</script>
<style scoped>
.service-data {
    width: 100%;
    white-space: nowrap;
}

.service-nav {
    padding: 25px 30px 0 40px;
}

.my_enterprise {
    color: #fa6705;
    font-size: 20px;
    padding: 0;
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
    margin-right: 30px;
    border-top: 1px solid #ddd;
    background: #fff;  
}

.table_color {
    background-color: #fff;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    position: relative;
}

.table>thead>tr>th {
    border-bottom: 0;
    color: #003077;
    font-weight: 100;
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
</style>

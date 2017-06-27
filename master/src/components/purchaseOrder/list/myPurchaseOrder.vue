<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <import-model :param="importParam" v-if="importParam.show"></import-model>
    <edit-model :param="editParam" v-if="editParam.show"></edit-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <delete-model :param="deleteParam" v-if="deleteParam.show"></delete-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <offer-now :param="offerParam" v-if="offerParam.show"></offer-now>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">客户名称：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.customerName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <dt class="left transfer marg_top">客户电话：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.customerPhone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <dt class="left transfer marg_top">采购单ID</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.purchaseId" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <dt class="left transfer marg_top">询价状态：</dt>
                    <dd class="left margin_right">
                        <select class="form-control" v-model="loadParam.inquire" @change="selectSearch()">
                            <option value="0">初始</option>
                            <option value="1">询价中</option>
                            <option value="2">报价中</option>
                            <option value="3">报价完成</option>
                        </select>
                    </dd>
                    <dt class="left transfer marg_top">已收报价：</dt>
                    <dd class="left margin_right">
                        <select class="form-control" v-model="loadParam.offer" @change="selectSearch()">
                            <option value="-1">全部</option>
                            <option value="1">收到报价</option>
                            <option value="0">暂无报价</option>
                        </select>
                    </dd>
                    <dt class="left transfer marg_top">采购单来源：</dt>
                    <dd class="left margin_right">
                        <select class="form-control" v-model="loadParam.source" @change="selectSearch()">
                            <option value="0">业务员导入</option>
                            <option value="1">web</option>
                            <option value="2">android</option>
                            <option value="3">weixin</option>
                            <option value="4">ios</option>
                        </select>
                    </dd>
                    <!-- 新增搜索 -->
                    <dt class="left transfer marg_top">采购品种：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.purchaseContent" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:20px">
                    <i-button type="primary" icon="ios-search" shape="circle" @click="selectSearch()">搜索</i-button>
                    <i-button type="warning" shape="circle" @click="resetCondition()">清空条件</i-button>
                </dl>
                <dd class="pull-right" style="margin-right:10px">
                    <button type="button" class="btn btn-primary" style="margin-right:10px" height="24" width="24" class="new_btn" @click="batchInquire()">批量询价</button>
                    <button type="button" class="btn btn-success" style="margin-right:10px" height="24" width="24" class="new_btn" @click="createPurchase()">新建</button>
                    <!-- <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn">
                        <a href="http://erp.yaocaimaimai.net/local/template/Indent_Item_template.xlsx">
                            EXCEL采购单模板下载
                        </a>
                    </button> 
                    <button type="button" class="btn btn-primary" style="margin-right:10px" height="24" width="24" class="new_btn" @click="excelImport()">EXCEL导入采购单</button>-->
                    <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
                </dd>
            </div>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th style="min-width:60px"></th>
                        <th>采购单ID</th>
                        <th>采购单类型</th>
                        <th>客户名称</th>
                        <th>客户手机</th>
                        <th>业务员</th>
                        <th>发布日期</th>
                        <th>过期时间</th>
                        <th>采购单来源</th>
                        <th>采购内容描述</th>
                        <th>备注</th>
                        <th style="min-width:80px">收到报价数</th>
                        <th>询价状态</th>
                        <th style="min-width:200px;text-align: left;">操作</th>
                    </tr>
                </thead>
                <tr style="background:#f5f7f9">
                    <th style="min-width:60px">
                        <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                    </th>
                    <th style="color:#fa6705;font-size: 14px">全选</th>
                    <th colspan="13"></th>
                </tr>
                <tbody>
                    <tr v-for="item in initMyPurchaseList" v-if="item.id!=-1">
                        <td @click.stop="" style="min-width:60px">
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index)"></label>
                        </td>
                        <td>{{item.id}}</td>
                        <td>{{item.type | indentType}}</td>
                        <td>
                            <a class="underline" @click.stop="detailClick(item.id,item.customerId)">{{item.customerName}}</a>
                        </td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.pubdate}}</td>
                        <td>{{item.duedate}}</td>
                        <td>{{item.source | indentSource}}</td>
                        <td>
                            <Poptip placement="left" trigger="hover">
                                <span>{{item.buyDesc | textDisplay "8"}}</span>
                                <div class="api" slot="content">
                                    {{item.buyDesc}}
                                </div>
                            </Poptip>
                        </td>
                        <td>{{item.comment}}</td>
                        <td style="min-width:80px">{{item.offer}}</td>
                        <td>{{item.inquire | inquire}}</td>
                        <td style="text-align: left">
                            <button v-if="item.inquire==0" class="btn btn-info btn-xs" @click.stop="editPurchase(item,$index)">编辑</button>
                            <button v-if="item.inquire==0" class="btn btn-danger btn-xs" @click.stop="deletePurchase(item.id,$index)">删除</button>
                            <button v-if="item.inquire==0" class="btn btn-success btn-xs" @click.stop="singleInquire(item.id,$index)">询价扩散</button>
                            <button v-if="item.inquire==1||item.inquire==2" class="btn btn-danger btn-xs" @click.stop="cancelInquire(item.id,$index)">终止询价</button>
                            <div v-else v-if="item.inquire!=0" >
                                <button class="btn btn-primary btn-xs" @click.stop="singleInquire(item.id,$index)">恢复询价</button>
                                <button class="btn btn-info btn-xs" @click.stop="editPurchase(item,$index)">编辑</button>
                                <button class="btn btn-danger btn-xs" @click.stop="deletePurchase(item.id,$index)">删除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import createModel from '../createPurchaseOrder.vue'
import importModel from '../indentExcelImport.vue'
import editModel from '../editPurchaseOrder.vue'
import detailModel from '../purchaseOrderDetail.vue'
import deleteModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import tipsdialogModel from '../../tips/tipDialog'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import offerNow from '../offerNow.vue'
import {
    initMyPurchaseList
} from '../../../vuex/getters'
import {
    getPurchaseOrderList,
    inquirePurchaseOrder,
    deletePurchaseOrder,
    importPurchase
} from '../../../vuex/actions'
export default {
    components: {
        createModel,
        importModel,
        editModel,
        detailModel,
        deleteModel,
        tipsdialogModel,
        pagination,
        mglistModel,
        offerNow
    },
    vuex: {
        getters: {
            initMyPurchaseList
        },
        actions: {
            getPurchaseOrderList,
            inquirePurchaseOrder,
            deletePurchaseOrder,
            importPurchase
        }
    },
    data() {
        return {
            loadParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: "",
                link: '/indent/queryEmployeeList',
                key: 'myPurchaseList',
                source: '',
                inquire: '',
                offer: '-1',
                customerName: '',
                customerPhone: '',
                purchaseContent: '',
                purchaseId:''
            },
            createParam: {
                show: false,
                link: "/indent/add",
                callback: this.callback,
                type: "",
                customerId: "",
                customerName: "",
                customerPhone: "",
                buyDesc: "", //采购内容描述
                comment:'',
                province: "",
                city: "",
                district: "",
                address: "",
                duedate: "",
                paymentWay:'',
                intentionList: [] //意向信息
            },
            importParam: {
                loading: false,
                show: false,
                link: this.importPurchase,
                callback: this.selectSearch,
                success: 0, //上传后，返回码的解析，0/1/2/3，初始/成功/错误（1000）/其他错误
                mFile: "", //excel文件
                result: "" // 导入成功后的返回信息
            },
            editParam: {
                show: false,
                link: "", //编辑时是获取详情，确认时是更新数据
                callback: this.callback,
                id: "",
                customerId: "",
                customerName: "",
                customerPhone: "",
                comment:'',
                province: "",
                provinceName:'',
                cityName:'',
                districtName:'',
                city: "",
                district: "",
                address: "",
                buyDesc: "",
                duedate:'',
                paymentWay:'asdas',
                intentionList: [], //意向信息
                intentionListBack: [] //意向信息副本
            },
            detailParam: {
                show: false,
                loading: false,
                key: "myIndent", //我的采购单，用作标记从哪个页面进入详情
                link: "/indent/queryById",
                id: "",
                customerId: ""
            },
            deleteParam: {
                show: false,
                link: this.deletePurchaseOrder, //删除的接口地址
                key: "myPurchaseList",
                callback: this.callback,
                index: "",
                id: ""

            },
            inquireParam: { //询价或者取消询价
                link: "",
                key: "myPurchaseList",
                callback: this.callback,
                inquire: "",
                indexs: [],
                ids: []
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            offerParam:{
                show:false,
            },
            checked: false
        }
    },
    methods: {
        selectSearch: function() { //搜索
            this.getPurchaseOrderList(this.loadParam);
            //this.offerParam.show = true
        },
        resetCondition: function() { //清除搜索条件
            this.loadParam.source = '';
            this.loadParam.inquire = '';
            this.loadParam.offer = '-1';
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.purchaseContent = ''
            this.loadParam.purchaseId = ''
            this.getPurchaseOrderList(this.loadParam);
        },
        checkedAll: function() { //全选
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.myPurchaseList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.myPurchaseList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        onlyselected: function(index) { //单选
            let _this = this;
            this.$store.state.table.basicBaseList.myPurchaseList[index].checked = !this.$store.state.table.basicBaseList.myPurchaseList[index].checked;
            if (!this.$store.state.table.basicBaseList.myPurchaseList[index].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.basicBaseList.myPurchaseList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }

        },
        createPurchase: function() {
            this.createParam.show = true;
        },
        excelImport: function() {
            //重新进入时将之前的信息请空
            this.importParam.success = 0;
            this.importParam.mFile = "";
            this.importParam.result = "";
            this.importParam.show = true;
        },
        editPurchase: function(item, index) {
            console.log(item)
            this.editParam.show = true;
            this.editParam.link = "/indent/queryById";
            this.editParam.id = item.id;
            this.editParam.customerName = item.customerName;
            this.editParam.customerId = item.customerId;
            this.editParam.customerPhone = item.customerPhone;
            this.editParam.province = item.province;
            this.editParam.city = item.city;
            this.editParam.district = item.district;
            this.editParam.provinceName = item.provinceName;
            this.editParam.cityName = item.cityName;
            this.editParam.districtName = item.districtName;
            this.editParam.address = item.address;
            this.editParam.comment = item.comment;
            this.editParam.duedate = item.duedate
            this.editParam.paymentWay = item.paymentWay
            this.editParam.intentionList = [];
            this.editParam.intentionListBack = [];
            
        },
        detailClick: function(id, customerId) {
            this.detailParam.id = id;
            this.detailParam.customerId = customerId;
            this.detailParam.show = true;
        },
        deletePurchase: function(id, index) {
            this.deleteParam.id = id;
            this.deleteParam.index = index;
            this.deleteParam.show = true;
        },
        singleInquire: function(id, index) { //单条询价
            //先将ids,和index置为[],不然会一直叠加
            this.inquireParam.ids = [];
            this.inquireParam.indexs = [];
            this.inquireParam.ids.push(id);
            this.inquireParam.indexs.push(index);
            this.inquireParam.link = "/indent/inquire";
            this.inquireParam.inquire = 1; //表示询价,方便前端展示，无需传入后台
            this.inquirePurchaseOrder(this.inquireParam);
        },
        batchInquire: function() {
            //先将ids,和index置为[],不然会一直叠加
            this.inquireParam.ids = [];
            this.inquireParam.indexs = [];
            let list = this.$store.state.table.basicBaseList.myPurchaseList;
            for (let i = 0; i < list.length; i++) {
                if (list[i].checked) {
                    this.inquireParam.ids.push(list[i].id);
                    this.inquireParam.indexs.push(i);
                }
            }
            if (this.inquireParam.ids.length <= 0) {
                this.tipsParam.show = true;
                this.tipsParam.name = "请至少选择一个采购单";
            } else {
                this.inquireParam.link = "/indent/inquire";
                this.inquireParam.inquire = 1; //表示询价,方便前端展示，无需传入后台
                this.inquirePurchaseOrder(this.inquireParam);
            }
        },
        cancelInquire: function(id, index) { //单条取消询价
            //先将ids,和index置为[],不然会一直叠加
            this.inquireParam.ids = [];
            this.inquireParam.indexs = [];

            this.inquireParam.ids.push(id);
            this.inquireParam.indexs.push(index);
            this.inquireParam.link = "/indent/finishInquire";
            this.inquireParam.inquire = 3; //表示终止询价,方便前端展示，无需传入后台
            this.inquirePurchaseOrder(this.inquireParam);
        },
        callback: function(name) { //如无特殊情况，统一使用这个函数作为回调函数
            this.tipsParam.name = name;
            this.tipsParam.show = true;
            this.getPurchaseOrderList(this.loadParam);
        },

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getPurchaseOrderList(this.loadParam);
        }
    },
    created() {
        this.getPurchaseOrderList(this.loadParam);
        //changeMenu(this.$store.state.table.isTop, this.getIntentionList, this.loadParam, localStorage.myIntentionParam);

    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.edit-model {
    padding: 10px 30px 80px 30px;
}

.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-right: 8px;
}

.margin_right {
    margin-right: 15px
}

.checkbox_unselect {
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

.checkbox_select {
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

#table_box table th,
#table_box table td {
    width: 115px;
    min-width: 100px;
}

.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}

.api {
    max-width: 400px;
    color: #3399ff;
    white-space: normal;
}
</style>

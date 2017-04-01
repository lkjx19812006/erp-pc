<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <edit-model :param="editParam" v-if="editParam.show"></edit-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <delete-model :param="deleteParam" v-if="deleteParam.show"></delete-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">客户名：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:50px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>
                <dd class="pull-right" style="margin-right:10px">
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn" @click="batchInquire()">批量询价</button>
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn" @click="createPurchase()">新建</button>
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
                        <th></th>
                        <th>客户名称</th>
                        <th>客户手机</th>
                        <th>业务员</th>
                        <th>省</th>
                        <th>市</th>
                        <th>区</th>
                        <th>发布日期</th>
                        <th>过期时间</th>
                        <th>采购单来源</th>
                        <th>采购内容描述</th>
                        <th>备注</th>
                        <th>询价状态</th>
                        <th style="min-width:200px;text-align: left;">操作</th>
                    </tr>
                </thead>
                <tr>
                    <th>
                        <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                    </th>
                    <th style="color:#fa6705;font-size: 14px">全选</th>
                    <th colspan="13"></th>
                </tr>
                <tbody>
                    <tr v-for="item in initMyPurchaseList">
                        <td @click.stop="">
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index)"></label>
                        </td>
                        <td>
                            <a class="underline" @click.stop="detailClick(item.id,item.customerId)">{{item.customerName}}</a>
                        </td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.employee}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.district}}</td>
                        <td>{{item.pubdate}}</td>
                        <td>{{item.duedate}}</td>
                        <td>{{item.source | indentSource}}</td>
                        <td>{{item.buyDesc}}</td>
                        <td>{{item.comment}}</td>
                        <td>{{item.inquire | inquire}}</td>
                        <td style="text-align: left">
                            <a class="operate" @click.stop="editPurchase(item,$index)"><img src="/static/images/edit.png" height="18" width="28" alt="编辑" />
                            </a>
                            <a class="operate" @click.stop="deletePurchase(item.id,$index)"><img src="/static/images/del.png" height="18" width="28" alt="删除" />
                            </a>
                            <a v-if="item.inquire==0" class="operate" @click.stop="singleInquire(item.id,$index)"><img src="/static/images/inquire.png" height="18" width="28" alt="询价" />
                            </a>
                            <a v-if="item.inquire==1||item.inquire==2" class="operate" @click.stop="cancelInquire(item.id,$index)"><img src="/static/images/cancelInquire_icon.png" height="18" width="42" alt="取消询价" />
                            </a>
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
import editModel from '../editPurchaseOrder.vue'
import detailModel from '../purchaseOrderDetail.vue'
import deleteModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import tipsdialogModel from '../../tips/tipDialog'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initMyPurchaseList
} from '../../../vuex/getters'
import {
    getPurchaseOrderList,
    inquirePurchaseOrder,
    deletePurchaseOrder
} from '../../../vuex/actions'
export default {
    components: {
        createModel,
        editModel,
        detailModel,
        deleteModel,
        tipsdialogModel,
        pagination,
        mglistModel
    },
    vuex: {
        getters: {
            initMyPurchaseList
        },
        actions: {
            getPurchaseOrderList,
            inquirePurchaseOrder,
            deletePurchaseOrder
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
                key: 'myPurchaseList'

            },
            createParam: {
                show: false,
                link: "/indent/add",
                callback: this.callback,
                customerId: "",
                customerName: "",
                customerPhone: "",
                buyDesc: "", //采购内容描述
                province: "",
                city: "",
                district: "",
                address: "",
                intentionList: [] //意向信息
            },
            editParam: {
                show: false,
                link: "/indent/update",
                callback: this.callback,
                id: "",
                customerId: "",
                customerName: "",
                customerPhone: "",
                province: "",
                city: "",
                district: "",
                address: "",
                buyDesc: "",
                intentionList: [], //意向信息
                intentionListBack: [] //意向信息副本
            },
            detailParam: {
                show: false,
                loading: false,
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

            checked: false
        }
    },
    methods: {
        selectSearch: function() {
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
        editPurchase: function(item, index) {

            this.editParam.id = item.id;
            this.editParam.customerName = item.customerName;
            this.editParam.customerId = item.customerId;
            this.editParam.customerPhone = item.customerPhone;
            this.editParam.province = item.province;
            this.editParam.city = item.city;
            this.editParam.district = item.district;
            this.editParam.address = item.address;
            this.editParam.buyDesc = item.buyDesc;
            for (let i = 0; i < item.intentionList.length; i++) {
                let temp = {
                    id: item.intentionList[i].id,
                    breedId: item.intentionList[i].breedId,
                    breedName: item.intentionList[i].breedName,
                    location: item.intentionList[i].location,
                    spec: item.intentionList[i].spec,
                    number: item.intentionList[i].number,
                    unit: item.intentionList[i].unit,
                    price: item.intentionList[i].price,
                    status: 1
                };
                this.editParam.intentionList.push(temp);
                this.editParam.intentionListBack.push(temp);
            }

            this.editParam.show = true;
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
        }

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
    width: 121px;
    min-width: 110px;
}

.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}
</style>

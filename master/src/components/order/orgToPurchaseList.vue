<template>
    <div>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <breed-model :param="breedParam" v-if="breedParam.show"></breed-model>
        <order-model :param="orderParam" v-if="orderParam.show"></order-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear" style="margin-bottom:10px">
                    <div class="left">
                        <dt class="left transfer marg_top">销售订单所属业务员：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.sellEmployeeName" @click="selectEmployee()" readonly="readonly" />
                        </dd>
                        <dt class="left transfer marg_top">品种：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.breedName" @click="selectBreed()" readonly="readonly" />
                        </dd>
                    </div>
                    <div class="right">
                        <button class="btn btn-default transfer" @click="newOrder()">生成订单</button>
                        <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                    </div>
                    <div class="right">
                        <button class="new_btn transfer" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                        <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
                    </div>
                </div>
                <div class="clear">
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead>
                        <tr>
                            <th></th>
                            <th>品种</th>
                            <th>数量</th>
                            <th>单位</th>
                            <th>销售订单所属业务员</th>
                            <th>创建时间</th>
                        </tr>
                    </thead>
                    <tr>
                        <th>
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                        </th>
                        <th style="color:#fa6705;font-size: 14px">全选</th>
                        <th colspan="4"></th>
                    </tr>
                    <tbody>
                        <tr v-for="item in initOrgOrderLinkList" v-cloak>
                            <td @click.stop="">
                                <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                            </td>
                            <td>{{item.breedName}}</td>
                            <td>{{item.number}}</td>
                            <td>{{item.unit | Unit}}</td>
                            <td>{{item.sellEmployeeName}}</td>
                            <td>{{item.ctime | date}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
    </div>
</template>
<script>
import mglistModel from '../mguan/mgListComponent.vue'
import orderModel from './purchaseToOrder.vue'
import employeeModel from '../clientRelate/searchEmpInfo'
import breedModel from '../intention/breedsearch'
import tipsdialogModel from '../tips/tipDialog'
import pagination from '../pagination'
import filter from '../../filters/filters'
import common from '../../common/common'

import {
    initLogin,
    initOrgOrderLinkList
} from '../../vuex/getters'
import {
    getOrderLinkList
} from '../../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        employeeModel,
        orderModel,
        breedModel,
        mglistModel,
        pagination,
        filter
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                show: false,
                cur: 1,
                all: 1,
                total: 0,
                link: "/order/orgOrderLinkList",
                key: "orgOrderLinkList",
                sellEmployee: "",
                sellEmployeeName: "",
                breedId: "",
                breedName: "",
                pageCallback:this.pageCallback,
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: "",
                employeeId: '',
                employeeName: '',
            },
            breedParam: {
                show: false
            },
            orderParam: {
                show: false,
                link: "/order/createOrderByOrderLink",
                type: 0,
                customer: "",
                customerName: "",
                customerPhone: "",
                incidentals: 0,
                incidentalsDesc: "",
                preferential: 0,
                preferentialDesc: "",
                employee: this.initLogin.id,
                orderStatus: 0,
                orderLinkList: [],
                callback: this.callback

            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            checked: false

        }
    },
    vuex: {
        getters: {
            initLogin,
            initOrgOrderLinkList
        },
        actions: {
            getOrderLinkList
        }
    },
    methods: {
        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        selectBreed: function() {
            this.breedParam.show = true;
        },
        resetCondition: function() {
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.loadParam.sellEmployee = "";
            this.loadParam.sellEmployeeName = "";
            this.selectSearch();

        },
        selectSearch: function() {
            this.checked = false;
            this.getOrderLinkList(this.loadParam);
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.orgOrderLinkList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.orgOrderLinkList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        onlyselected: function(sub, id) {
            //this.id = id;
            const _this = this;
            this.$store.state.table.basicBaseList.orgOrderLinkList[sub].checked = !this.$store.state.table.basicBaseList.orgOrderLinkList[sub].checked;
            if (!this.$store.state.table.basicBaseList.orgOrderLinkList[sub].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.basicBaseList.orgOrderLinkList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        newOrder: function() {
            let list = this.initOrgOrderLinkList;
            this.orderParam.orderLinkList = [];

            for (let i = 0; i < list.length; i++) {
                if (list[i].checked) {
                    this.orderParam.orderLinkList.push(list[i]);
                }
            }

            if (this.orderParam.orderLinkList.length <= 0) {
                this.tipsParam.show = true;
                this.tipsParam.name = "请至少选择一个条目";
                return;
            } else {
                this.orderParam.show = true;
            }

        },
        callback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.getOrderLinkList(this.loadParam);
        },
        pageCallback:function(data){
            this.loadParam.pageSize = data
            this.getOrderLinkList(this.loadParam)
      }
    },

    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOrderLinkList(this.loadParam);
        },
        a: function(employee) {
            this.loadParam.sellEmployee = employee.employeeId;
            this.loadParam.sellEmployeeName = employee.employeeName;
            this.selectSearch();
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.selectSearch();
        },
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {

        this.getOrderLinkList(this.loadParam);
        //changeMenu(this.$store.state.table.isTop, this.getEmpolyeeOrder, this.loadParam, localStorage.myOrderParam);

    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}

.order_search {
    padding: 35px 10px 0 10px;
}

.transfer {
    margin-right: 10px;
}

.order_table {
    position: relative;
}

.marg_top {
    margin-top: 8px;
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

.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
}

#table_box table th,
#table_box table td {
    width: 285px;
    min-width: 285px;
}

.order_pagination {
    text-align: center;
}

.api {
    color: #3399ff;
}
</style>

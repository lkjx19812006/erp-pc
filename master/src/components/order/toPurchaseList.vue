<template>
    <div>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <order-model :param="orderParam" v-if="orderParam.show"></order-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear">
                    <div class="left">
                    </div>
                </div>
                <div class="clear">
                    <div class="right">
                        <button class="btn btn-default transfer" @click="newOrder()">生成订单</button>
                        <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                    </div>
                    <div class="left">
                        <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
                    </div>
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
                            <th>销售订单所属业务员</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tr>
                        <th>
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                        </th>
                        <th style="color:#fa6705;font-size: 14px">全选</th>
                        <th colspan="2"></th>
                    </tr>
                    <tbody>
                        <tr v-for="item in initMyOrderLinkList" v-cloak>
                            <td @click.stop="">
                                <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                            </td>
                            <td>{{item.breedName}}</td>
                            <td>{{item.number}}{{item.unit | Unit}}</td>
                            <td>{{item.sellEmployee}}</td>
                            <td></td>
                            <td></td>
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
import tipsdialogModel from '../tips/tipDialog'
import pagination from '../pagination'
import filter from '../../filters/filters'
import common from '../../common/common'

import {
    initLogin,
    initMyOrderLinkList
} from '../../vuex/getters'
import {
    getOrderLinkList
} from '../../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        orderModel,
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
                link: "/order/myOrderLinkList",
                key: "myOrderLinkList",
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
            initMyOrderLinkList
        },
        actions: {
            getOrderLinkList
        }
    },
    methods: {
        selectSearch: function() {
            this.checked = false;
            this.getOrderLinkList(this.loadParam);
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.myOrderLinkList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.myOrderLinkList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        onlyselected: function(sub, id) {
            //this.id = id;
            const _this = this;
            this.$store.state.table.basicBaseList.myOrderLinkList[sub].checked = !this.$store.state.table.basicBaseList.myOrderLinkList[sub].checked;
            if (!this.$store.state.table.basicBaseList.myOrderLinkList[sub].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.basicBaseList.myOrderLinkList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        newOrder: function() {
            let list = this.initMyOrderLinkList;
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

        }

    },

    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOrderLinkList(this.loadParam);
        }
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
    width: 200px;
    min-width: 200px;
}

.order_pagination {
    text-align: center;
}

.api {
    color: #3399ff;
}
</style>

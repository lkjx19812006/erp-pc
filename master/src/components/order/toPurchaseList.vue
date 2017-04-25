<template>
    <div>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear">
                    <div class="left">
                    </div>
                </div>
                <div class="clear">
                    <div class="right">
                        <button class="btn btn-default transfer" @click="newOrder()">{{$t('static.new')}}</button>
                        <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                    </div>
                    <div class="left">
                        <button type="button" class="new_btn" @click="resetTime()">{{$t('static.clear_all')}}</button>
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
                            <th>品种</th>
                            <th>数量</th>
                            <th>销售订单所属业务员</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initMyOrderLinklist" v-cloak>
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
import pagination from '../pagination'
import filter from '../../filters/filters'
import common from '../../common/common'

import {
    initMyOrderLinklist
} from '../../vuex/getters'
import {
    getOrderLinkList
} from '../../vuex/actions'
export default {
    components: {
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
            }
        }
    },
    vuex: {
        getters: {
            initMyOrderLinklist
        },
        actions: {
            getOrderLinkList
        }
    },
    methods: {
        selectSearch: function() {
            this.getEmpolyeeOrder(this.loadParam);
        },

    },

    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmpolyeeOrder(this.loadParam);
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

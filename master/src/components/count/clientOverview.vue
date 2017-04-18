<template>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">客户总览报表</div>
            <div class="btn btn-primary right" @click="refresh()">刷新</div>
        </div>
        <div class="order_table clearfix" style="margin-top: 15px; margin-bottom:10px " id="top">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
        </div>
        <!-- 业务 -->
        <div class="listContent" id="listContent">
            <!-- 业务中的一项 -->
            <div class="listItem" v-for="item in initClientcount">
                <div class="title">
                    <span>{{item.name}}</span>
                </div>
                <div class="total">
                    <div class="total-lsit">
                        <div>
                            <label>客户数:</label><span>{{item.total}}</span>
                        </div>
                        <div>
                            <label>供应商数:</label><span>{{item.supplier}}</span>
                        </div>
                        <div>
                            <label>成交客户数:</label><span>{{item.traded}}</span>
                        </div>
                        <div>
                            <label>成交占比:</label><span>{{item.tradedRate}}%</span>
                        </div>
                        <div>
                            <label>成交金额:</label><span>{{item.tradedTotal}}元</span>
                        </div>
                    </div>
                </div>
                <!-- 业务员 应收金额 应收 应付 列表 -->
                <div class="table">
                    <table>
                        <tr class="tb-header">
                            <td>业务员</td>
                            <td>客户数</td>
                            <td>供应商数</td>
                            <td>成交客户数</td>
                            <td>成交占比</td>
                            <td>成交金额</td>
                        </tr>
                        <tbody v-for="detail in item.statisticsList">
                            <tr class="tb-content">
                                <td>{{detail.name}}</td>
                                <td>{{detail.total}}</td>
                                <td>{{detail.supplier}}</td>
                                <td>{{detail.traded}}</td>
                                <td>{{detail.tradedRate}}%</td>
                                <td>{{detail.tradedTotal}}元</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    initClientcount
} from '../../vuex/getters'
import {
    getClientOverview
} from '../../vuex/actions'

export default {
    components: {

    },
    data() {
        return {
            loadParam: {
                loading: false,
                link: "/customer/orgStatistics"
            },

        }
    },
    methods: {

    },
    vuex: {
        getters: {
            initClientcount
        },
        actions: {
            getClientOverview
        }
    },

    created() {
        this.getClientOverview(this.loadParam);
    },

    ready() {


    }
}
</script>
<style scoped>
.listContent {
    min-width: 1000px;
    max-width: 100%;
    min-height: 670px;
    overflow-x: auto;
    clear: both;
    width: 100%;
    border: 1px solid #d9d9d9;
    border-bottom: none
}

.listItem {
    min-width: 440px;
    max-width: 500px;
    display: inline-block;
}

.listContent .title {
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
}

.total {
    min-height: 30px;
    overflow: hidden;
    border-right: 1px solid #d9d9d9;
}

.listContent .total-lsit {
    float: left;
    padding: 10px 20px
}

.total-lsit label {
    display: inline-block;
    margin-right: 5px
}

.total-lsit span {
    letter-spacing: 1px
}

.table-header {
    display: flex;
}

.table table {
    width: 100%;
}

.tb-header {
    width: 100%
}

.tb-header td {
    width: 25%;
    padding: 0 10px;
}

.tb-header td {
    border: 1px solid #d9d9d9;
    border-left: none;
    height: 34px;
    line-height: 34px;
    word-break: break-all;
}

.tb-content td {
    width: 25%;
    padding: 0 10px;
    height: 34px;
    line-height: 34px;
    word-break: break-all;
}

.tb-content td {
    border: 1px solid #d9d9d9;
    height: 34px;
    line-height: 34px;
    word-break: break-all;
}

.order_table {
    text-align: left;
}

.table {
    margin-bottom: 20px;
    position: relative;
    display: table;
}

.table>thead>tr>th {
    font-weight: 700;
}
</style>

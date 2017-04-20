<template>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">业务总览报表</div>
            <div class="btn btn-primary right" @click="refresh()">刷新</div>
        </div>
        <!-- 日期统计 -->
        <div class="order_table clearfix" style="margin-top: 15px; margin-bottom:10px " id="top">
            <div class="btn-group">
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.orderType==1}" @click="clickType(1)">
                    销售
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.orderType===0}" @click="clickType(0)">
                    采购
                </button>
            </div>
            <!-- 搜索 日 周 年 -->
            <div class="btn-group">
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='day'}" @click="clickChange('day')">
                    日
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='week'}" @click="clickChange('week')">
                    周
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='month'}" @click="clickChange('month')">
                    月
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='quarter'}" @click="clickChange('quarter')">
                    季
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='year'}" @click="clickChange('year')">
                    年
                </button>
            </div>
            <!-- 搜索起止时间 -->
            <div class="btn-group clearfix right">
                <div class="clear transfer">
                    <div class="left">
                        <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
                        <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="left">
                        <dt class="left marg_top">~~</dt>
                        <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <button type="button" class="btn btn-default" style="margin-left: 15px;" @click="search
                        ()">搜索</button>
                    <button type="button" class="btn btn-default" @click="resetCondition()">{{$t("static.clear_all")}}</button>
                </div>
            </div>
        </div>
        <!-- 业务 -->
        <div class="listContent" id="listContent">
            <!-- 业务中的一项 -->
            <div class="listItem" v-for="item in initOrgCount">
                <div class="title">
                    <span>{{item.name}}</span>
                </div>
                <div class="total">
                    <div class="total-lsit" v-for="key in item.statisticsList">
                        <div>
                            <label>订单金额:</label><span>{{key.totalSum | money}}</span></div>
                        <div v-if="loadParam.orderType==1">
                            <label>应收未收:</label><span>{{key.unpaidSum | money}}</span></div>
                        <div v-if="loadParam.orderType==0">
                            <label>应付:</label><span>{{key.unpaidSum | money}}</span></div>
                        <div>
                            <label>货币:</label><span>{{key.currency | Currency}}</span></div>
                        <div>
                            <label>订单数:</label><span>{{key.orderCount}}笔</span></div>
                    </div>
                </div>
                <!-- 业务员 应收金额 应收 应付 列表 -->
                <div class="table">
                    <table>
                        <tr class="tb-header">
                            <td>业务员</td>
                            <td>订单金额</td>
                            <td>已收金额</td>
                            <td v-if="loadParam.orderType==1">应收未收</td>
                            <td v-if="loadParam.orderType==0">应付</td>
                            <td>币种</td>
                        </tr>
                        <tbody v-for="detail in item.lowerList">
                            <tr class="tb-content">
                                <td rowspan="10">{{detail.name}}</td>
                            </tr>
                            <tr class="tb-content" v-for="classified in detail.statisticsList">
                                <td>{{classified.totalSum | money}}</td>
                                <td>{{classified.prepaidSum | money}}</td>
                                <td>{{classified.unpaidSum | money}}</td>
                                <td>{{classified.currency | Currency}}</td>
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
    initOrgCount
} from '../../vuex/getters'
import {
    getOrgCount
} from '../../vuex/actions'

export default {
    components: {

    },
    data() {
        return {
            loadParam: {
                orderType: 1,
                startTime: '',
                endTime: '',
                timeType: 'month',
                cur: 1,
                total: 15
            },

        }
    },
    methods: {
        refresh: function() {
            this.getOrgCount(this.loadParam);
        },
        clickType: function(type) {
            this.loadParam.orderType = type;
            this.getOrgCount(this.loadParam);

        },
        search: function() {
            this.loadParam.timeType = '';
            this.getOrgCount(this.loadParam)
        },
        resetCondition: function() {
            this.loadParam.startTime = '';
            this.loadParam.endTime = '';
            this.loadParam.timeType = '';
            this.loadParam.orderType = 1;
            this.getOrgCount();

        },
        // 年月日季度搜索
        clickChange: function(type) {
            this.loadParam.startTime = '';
            this.loadParam.endTime = '';
            this.loadParam.timeType = type;
            this.getOrgCount(this.loadParam);
        }
    },
    vuex: {
        getters: {
            initOrgCount
        },
        actions: {
            getOrgCount
        }
    },

    created() {
        this.getOrgCount(this.loadParam);
    },

    ready() {
        window.onresize = function() {
            const tablefrom = document.body.clientHeight - document.getElementById('top').offsetHeight - 200;
            document.getElementById('listContent').style.height = tablefrom + 'px';
        }
        window.onload = function() {
            const tablefrom = document.body.clientHeight - document.getElementById('top').offsetHeight - 200;
            document.getElementById('listContent').style.height = tablefrom + 'px';
            console.log(tablefrom)
        }

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
    width: 100%;
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

.click_change span {
    padding: 0 20px;
    display: inline-block;
    border-right: 1px solid #ddd;
    cursor: pointer;
}

.date_active {
    background: #fa6705;
    color: #fff;
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

.btn-warning {
    background-color: #fa6705;
}

.btn-group {}
</style>

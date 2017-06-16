<template>
    <div class="modal modal-main fade account-modal"></div>
    <div class="box">
        <h4 class="title">{{param.locationName}}
            <button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
            <div class="cover_loading">
                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
            </div>
        </h4>
        <div class="table_con">
            <!-- 客户详情 -->
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th style="width:180px">厂家名称</th>
                        <th style="width:180px">
                            订单数
                            <span class="totalNum">({{initCustomerCountDetailTotal.orderNumber}})</span>
                            <a v-if="loadParam.criterion!='orderNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('orderNumber', 0)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-up"></span>
                            <a v-if="loadParam.criterion!='orderNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('orderNumber', 1)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-down"></span>
                        </th>
                        <th style="width:180px">
                            品种数
                            <span class="totalNum">({{initCustomerCountDetailTotal.breedNumber}})</span>
                            <a v-if="loadParam.criterion!='breedNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('breedNumber', 0)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-up"></span>
                            <a v-if="loadParam.criterion!='breedNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('breedNumber', 1)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-down"></span>
                        </th>
                        <th style="width:180px">
                            成交品种数
                            <span class="totalNum">({{initCustomerCountDetailTotal.tradeBreedNumber}})</span>
                            <a v-if="loadParam.criterion!='tradeBreedNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('tradeBreedNumber', 0)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-up"></span>
                            <a v-if="loadParam.criterion!='tradeBreedNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('tradeBreedNumber', 1)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-down"></span>
                        </th>
                        <th style="width:180px">
                            成交金额
                            <span class="totalNum">({{initCustomerCountDetailTotal.tradeAmount | money}})</span>
                            <a v-if="loadParam.criterion!='tradeAmount'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('tradeAmount', 0)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-up"></span>
                            <a v-if="loadParam.criterion!='tradeAmount'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('tradeAmount', 1)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-down"></span>
                        </th>
                        <th style="width:180px">
                            毛利率
                            <span class="totalNum">({{initCustomerCountDetailTotal.grossProfitRate*100 | money}}%)</span>
                            <a v-if="loadParam.criterion!='grossProfitRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('grossProfitRate', 0)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-up"></span>
                            <a v-if="loadParam.criterion!='grossProfitRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('grossProfitRate', 1)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-down"></span>
                        </th>
                        <th style="width:180px">
                            退货率
                            <span class="totalNum">({{initCustomerCountDetailTotal.returnsRate*100 | money}}%)</span>
                            <a v-if="loadParam.criterion!='returnsRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('returnsRate', 0)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-up"></span>
                            <a v-if="loadParam.criterion!='returnsRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('returnsRate', 1)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-down"></span>
                        </th>
                        <th style="width:180px">收款方式<span class="totalNum"></span></th>
                        <th style="width:180px">规模<span class="totalNum"></span></th>
                        <th style="width:180px">
                            <Poptip placement="left" trigger="hover">
                                <span>复购率</span>
                                <div class="api" slot="content">
                                    三个月内每个厂家复购次数
                                </div>
                            </Poptip>
                            <span class="totalNum">({{initCustomerCountDetailTotal.rebuyRate}})</span>
                            <a v-if="loadParam.criterion!='rebuyRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('rebuyRate', 0)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-up"></span>
                            <a v-if="loadParam.criterion!='rebuyRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('rebuyRate', 1)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-down"></span>
                        </th>
                        <th style="width:180px">
                            采购金额占比
                            <span class="totalNum">({{initCustomerCountDetailTotal.buyAmountRate*100 | money}}%)</span>
                            <a v-if="loadParam.criterion!='buyAmountRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('buyAmountRate', 0)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-up"></span>
                            <a v-if="loadParam.criterion!='buyAmountRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('buyAmountRate', 1)"></a>
                            <span v-else class="glyphicon glyphicon-arrow-down"></span>
                        </th>
                    </tr>
                </thead>
                <tbody class="banma">
                    <tr v-for="item in initCustomerCountDetailList" v-cloak>
                        <td>{{item.customerName}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td>{{item.breedNumber}}</td>
                        <td>{{item.tradeBreedNumber}}</td>
                        <td>{{item.tradeAmount | money}}</td>
                        <td>{{item.grossProfitRate*100 | money}}%</td>
                        <td>{{item.returnsRate*100 | money}}%</td>
                        <td>{{item.paymentWay}}</td>
                        <td>{{item.customerScale}}</td>
                        <td>{{item.rebuyRate}}</td>
                        <td>{{item.buyAmountRate*100 | money}}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import common from '../../../common/common'
import util from '../../tools/util.js'
import {
    initCustomerCountDetailList,
    initCustomerCountDetailTotal,
} from '../../../vuex/getters'
import {
    getCustomerCountDetail
} from '../../../vuex/actions'
export default {
    components: {

    },
    vuex: {
        getters: {
            initCustomerCountDetailList,
            initCustomerCountDetailTotal,
        },
        actions: {
            getCustomerCountDetail
        }
    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                criterion: '', //前端排序标准
                asc: '', //升序（0或!=1）还是降序（1）
            }
        }
    },
    methods: {
        close: function() {
            this.param.show = false
        },
        //criterion:排序的标准，即按什么排序,asc:0/1,升序/降序
        sortBy: function(criterion, asc) {
            this.loadParam.criterion = criterion;
            this.loadParam.asc = asc;
            let list = this.$store.state.table.customerCountDetailList;
            let length = list.length;
            for (let i = length; i > 0; i--) {
                for (let j = 0; j < i - 1; j++) {
                    //升序
                    if (asc != 1 && list[j][criterion] > list[j + 1][criterion]) {
                        let temp = {};
                        util.deepCopy(temp, list[j]);
                        util.deepCopy(list[j], list[j + 1]);
                        util.deepCopy(list[j + 1], temp);
                    }
                    //降序
                    if (asc == 1 && list[j][criterion] < list[j + 1][criterion]) {
                        let temp = {};
                        util.deepCopy(temp, list[j]);
                        util.deepCopy(list[j], list[j + 1]);
                        util.deepCopy(list[j + 1], temp);
                    }

                }
            }
        },
    },
    ready() {
        //common('tabd', 'table_box', 1);
    },
    created() {
        this.getCustomerCountDetail(this.param);
    }
}
</script>
<style scoped>
.box {
    width: 1300px;
    height: 600px;
    background: #fff;
    position: absolute;
    z-index: 9999;
    left: 50%;
    margin-left: -700px;
    margin-top: 100px;
    border-radius: 10px;
    padding-bottom: 20px;
}

.title {
    padding: 15px 10px;
    border-bottom: 1px solid #ccc;
}

.table_con {
    height: 500px;
    width: 100%;
    overflow: auto
}

.form-control {
    width: 100%!important
}

.sortNum {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #666;
    text-align: center;
    line-height: 18px;
    border-radius: 50%;
}

.totalNum {
    color: red;
    font-weight: bold;
}

.banma>tr:nth-child(2n) {
    background: #f5f7f9!important
}

.api {
    color: #3399ff;
}
</style>

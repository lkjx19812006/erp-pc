<template>
    <div class="modal modal-main fade account-modal"></div>
    <div class="box">
        <h4 class="title">{{param.locationName}}
            <button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
        </h4>
        <div class="table_con">
            <!-- 客户详情 -->
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th style="width:250px">厂家名称</th>
                        <th style="width:250px">订单数<span class="totalNum">({{initCustomerCountDetailTotal.orderNumber}})</span></th>
                        <th style="width:250px">品种数<span class="totalNum">({{initCustomerCountDetailTotal.breedNumber}})</span></th>
                        <th style="width:250px">成交品种数<span class="totalNum">({{initCustomerCountDetailTotal.tradeBreedNumber}})</span></th>
                        <th style="width:250px">成交金额<span class="totalNum">({{initCustomerCountDetailTotal.tradeAmount | money}})</span></th>
                        <th style="width:250px">毛利率<span class="totalNum">({{initCustomerCountDetailTotal.grossProfitRate*100 | money}}%)</span></th>
                        <th style="width:250px">退货率<span class="totalNum">({{initCustomerCountDetailTotal.returnsRate*100 | money}}%)</span></th>
                        <th style="width:250px">收款方式<span class="totalNum"></span></th>
                        <th style="width:250px">规模<span class="totalNum"></span></th>
                        <th style="width:250px">复购率<span class="totalNum">({{initCustomerCountDetailTotal.rebuyRate*100 | money}}%)</span></th>
                        <th style="width:250px">采购金额占比<span class="totalNum">({{initCustomerCountDetailTotal.buyAmountRate*100 | money}}%)</span></th>
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
                        <td>{{item.rebuyRate*100 | money}}%</td>
                        <td>{{item.buyAmountRate*100 | money}}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import common from '../../../common/common'
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

        }
    },
    methods: {
        close: function() {
            this.param.show = false
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
    width: 1200px;
    height: 600px;
    background: #fff;
    position: absolute;
    z-index: 9999;
    left: 50%;
    margin-left: -600px;
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
</style>

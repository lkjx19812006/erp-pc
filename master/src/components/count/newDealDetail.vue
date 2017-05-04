<template>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">成交用户</div>
            <div class="btn btn-primary right" @click="toBackPage()">{{$t('static.back')}}</div>
        </div>
        <!-- 日期统计 -->
        <div class="order_table clearfix" style="margin-top: 15px;" id="top">
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
                    <button type="button" class="btn btn-default" style="margin-left: 15px;" @click="search()">{{$t('static.search')}}</button>
                    <button type="button" class="btn btn-default" @click="resetCondition()">{{$t("static.clear_all")}}</button>
                </div>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div style="max-height: 200px;overflow: auto;">
                
            </div>
        </div>
        <div class="btn-group" style="margin-top:20px;max-height: 500px;overflow: auto;" id="table_box">
            <div style="position:fixed;height:32px;z-index: 200;">
                <button type="button" class="btn btn-warning">{{$t('static.details')}}</button>
            </div>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak id="tab" style="margin-top:32px;">
                <tr style="background:none;color:#000">
                    <th>成交时间</th>
                    <th>{{$t('static.breed')}}</th>
                    <th>{{$t('static.type')}}</th>
                    <th>{{$t('static.currency')}}</th>
                    <th>{{$t('static.total_money')}}</th>
                    <th>{{$t('static.cost')}}</th>
                    <th>{{$t('static.trading_patterns')}}</th>
                    <th>已支付</th>
                </tr>
                <tr v-for="item in initMyOrderCount">
                    <td>{{item.tradeTime}}</td>
                    <td>{{item.goodsDesc}}</td>
                    <td v-if="item.type==0">{{$t('static.purchase')}}</td>
                    <td v-if="item.type==1">{{$t('static.sell')}}</td>
                    <td>{{item.currency | Currency}}</td>
                    <td>{{item.total | money}}</td>
                    <td>{{item.cost | money}}</td>
                    <td v-if="item.mode==1">{{$t('static.together')}}</td>
                    <td v-if="item.mode==2">{{$t('static.three_side')}}</td>
                    <td v-if="item.mode==3">{{$t('static.self_support')}}</td>
                    <td>{{item.prepaid | money}}</td>
                </tr>
            </table>
            <div class="base_pagination">
                <pagination :combination="loadParam"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    initMyOrderCount,
    initMyTimeOrderCount,
    initOrderStatics
} from '../../vuex/getters'
import {
    getOrderCount,
    getOrderCountList,
    getTimeOrderCount
} from '../../vuex/actions'
import filter from '../../filters/filters'
import pagination from '../pagination'
import mzDatepicker from '../calendar/vue.datepicker.js'
import common from '../../common/common.js'
export default {
    components: {
        pagination,
        mzDatepicker,
        pagination
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                employee: this.$store.state.table.login.id,
                endTime: '',
                startTime: '',
                orderType: 1,
                timeType: 'month',
                cur: 1,
                all: 15,
                total: 0,
                name:"newDealDetail"
            },

        }
    },
    methods: {

    },
    vuex: {
        getters: {
            initMyOrderCount,
            initMyTimeOrderCount,
            initOrderStatics
        },
        actions: {
            getOrderCount,
            getTimeOrderCount,
            getOrderCountList
        }
    },
    methods:{
    	toBackPage:function(){
    		this.$dispatch('back',this.loadParam.name)
    	}
    },
    events: {
    },
    created() {
        this.getOrderCount(this.loadParam);
        /*this.getTimeOrderCount(this.timeParam);*/
        this.getOrderCountList(this.loadParam);


    },
    filter: (filter, {}),
}
</script>
<style scoped>
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
</style>

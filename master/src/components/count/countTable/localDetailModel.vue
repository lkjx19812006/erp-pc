<template>
    <div class="modal modal-main fade account-modal"></div>
    <div class="box">
        <h4 class="title">{{param.location}}
            <button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
        </h4>
        <div class="table_con">
        <!-- 样品详情 -->
            <table class="table table-hover table_color table-striped " v-cloak id="tabd" v-if="param.orderType=='sampleOrder'">               
                <thead>
                    <tr>
                        <th style="width:250px">产地</th>
                        <th style="width:250px">品种名<span class="totalNum">({{param.totalSampleData.breedNumber}})</span></th>
                        <th style="width:250px">寄样次数<span class="totalNum">({{param.totalSampleData.sampleBreedNumber}})</span></th>
                        <th style="width:250px">到货率<span class="totalNum">({{param.totalSampleData.receiveNumber}})</span></th>
                        <th style="width:250px">药典合格率<span class="totalNum">({{param.totalSampleData.qaStandardNumber}})</span></th>
                        <th style="width:250px">内控合格率<span class="totalNum">({{param.totalSampleData.qaSelfNumber}})</span></th>
                        <th style="width:250px">品种成交率<span class="totalNum">({{param.totalSampleData.tradedNumber}})</span></th>
                        <th style="width:250px">厂家数<span class="totalNum">({{param.totalSampleData.customerNumber}})</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initSampleCountDetail" v-cloak>
                        <td>{{item.locationName}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.sampleBreedNumber}}</td>
                        <td>{{item.receiveNumber}}%</td>
                        <td>{{item.qaStandardNumber}}%</td>
                        <td>{{item.qaSelfNumber}}%</td>
                        <td>{{item.tradedNumber}}%</td>
                        <td>{{item.customerNumber}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- 大货详情 -->
             <table class="table table-hover table_color table-striped " v-cloak id="tab" v-if="param.orderType=='mainOrder'">               
                <thead>
                    <tr>
                        <th style="width:250px">产地</th>
                        <th style="width:250px">品种（数）<span class="totalNum">({{param.totalMainData.breedNumber}})</span></th>
                        <th style="width:250px">订单数<span class="totalNum">({{param.totalMainData.orderNumber}})</span></th>
                        <th style="width:250px">金额（元）<span class="totalNum">({{param.totalMainData.orderCost}})</span></th>
                        <th style="width:250px">毛利率<span class="totalNum">({{param.totalMainData.grossProfit}})</span></th>
                        <th style="width:250px">退货率<span class="totalNum">({{param.totalMainData.recoveryRate}})</span></th>
                        <th style="width:250px">厂家数<span class="totalNum">({{param.totalMainData.customerNumber}})</span></th>
                        <th style="width:250px">发货地数<span class="totalNum">({{param.totalMainData.shipAddr}})</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initMainOrderCountDetail" v-cloak>
                        <td>{{item.locationName}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td>{{item.orderCost}}</td>
                        <td>{{item.grossProfit}}</td>
                        <td>{{item.recoveryRate }}</td>
                        <td>{{item.customerNumber}}</td>
                        <td>{{item.shipAddr}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import common from '../../../common/common'
    import {
        initCNProvince,
        initSampleCountDetail,
        initMainOrderCountDetail
    } from '../../../vuex/getters'
    import {

    } from '../../../vuex/actions'
    export default{
        components:{

        },
        vuex:{
            getters:{
                initSampleCountDetail,
                initMainOrderCountDetail
            },
            actions:{

            }
        },
        props:['param'],
        data(){
            return {

            }
        },
        methods:{
            close:function(){
                this.param.show = false
            },
        },
        ready() {
            //common('tabd', 'table_box', 1);
            console.log(this.param)
        },
    }
</script>

<style scoped>
    .box{
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
    .title{
        padding: 15px 10px;
        border-bottom: 1px solid #ccc;
    }
    .table_con{
        height: 500px;
        width:100%;
        overflow: auto
    }
    .form-control{
        width:100%!important
    }
    .sortNum{
        display: inline-block;
        width:20px;
        height:20px;
        border:1px solid #666;
        text-align: center;
        line-height: 18px;
        border-radius: 50%;
    }
    .totalNum{
        color:red;
        font-weight: bold;
    }
</style>
<template>
    <div class="modal modal-main fade account-modal"></div>
    <div class="box">
        <h4 class="title">{{param.location}}
            <button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
        </h4>
        <div class="table_con">
        <!-- 样品详情 -->
            <table class="table table-hover table_color table-striped " v-cloak id="tabd">               
                <thead>
                    <tr>
                        <th style="width:250px">产地</th>
                        <th style="width:250px">寄样次数<span class="totalNum">({{param.totalMainData.sampleOrderNumber}})</span></th>
                        <th style="width:250px">成交品种<span class="totalNum">({{param.totalMainData.sampleBreebNumber}})</span></th>
                        <th style="width:250px">成交次数<span class="totalNum">({{param.totalMainData.orderNumber}})</span></th>
                        <th style="width:250px">成交品种数<span class="totalNum">({{param.totalMainData.breedNumber}})</span></th>
                        <th style="width:250px">成交金额<span class="totalNum">({{param.totalMainData.orderMoney}})</span></th>
                        <th style="width:250px">毛利率<span class="totalNum">({{param.totalMainData.grossProfit}})</span></th>
                        <th style="width:250px">退货数<span class="totalNum">({{param.totalMainData.recoveryRate}})</span></th>
                        <th style="width:250px">厂家数<span class="totalNum">({{param.totalMainData.customerNumber}})</span></th>
                        <th style="width:250px">发货地数<span class="totalNum">({{param.totalMainData.shipAddr}})</span></th>
                    </tr>
                </thead>
                <tbody class="banma">
                    <tr v-for="item in initDealBreedList" v-cloak>
                        <td>{{item.locationName}}</td>
                        <td>{{item.sampleOrderNumber}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td>{{item.breedNumber}}</td>
                        <td>{{item.orderMoney}}</td>
                        <td>{{item.grossProfit}}</td>
                        <td>{{item.recoveryRate}}</td>
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
        initDealBreedList
    } from '../../../vuex/getters'
    import {

    } from '../../../vuex/actions'
    export default{
        components:{

        },
        vuex:{
            getters:{
                initDealBreedList
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
    .banma>tr:nth-child(2n){
        background: #f5f7f9!important
    }
</style>
<template>
    <div class="achive">
        <div class="achive_top clear">
            <nav class="title left">部门销售业绩报表</nav>
            <div class="achive_time right">
                <a class="select_btn" @click="freshCharts(getCharList)">
                    <span class="select_btn_time">2017年</span>
                    <span class="select_btn_img"><img src="/static/images/down_arrow.png" height="13" width="24" /></span>
                </a>
            </div>
        </div>
        <div class="achive_top">
            <div class="chart_body">
                <div class="chart" v-echarts="getCharList.options" :loading="getCharList.load"></div>
                <p>2017年部门销售业绩报表</p>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getCharList
} from '../vuex/getters'
import {
    freshCharts
} from '../vuex/actions'
export default {
    data() {
            return {

            }
        },
        vuex: {
            getters: {
                getCharList
            },
            actions: {
                freshCharts
            },
        },
        created() {
            this.freshCharts();
            // if(this.getcharList.achieveListc.length==0){
            // 	this.initCharts();
            // }
        }
}
</script>
<style scoped>
.achive_top {
    margin: 25px 30px 0 40px;
}

.title {
    color: #fa6705;
    font-size: 20px;
}

.select_btn {
    position: relative;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    background: #fff;
}

.select_btn_time {
    font-size: 16px;
    color: #333;
    padding: 8px 15px 8px 10px;
    border-right: 1px solid #ccc;
    float: left;
}

.select_btn_img {
    float: right;
    padding: 13px 7px 0;
}

.calute_show {
    text-align: right;
    margin-bottom: 0;
}

.calute_line {
    width: 50px;
    height: 10px;
    margin-right: 5px;
    background: #9966ff;
    display: inline-block;
}

.calute_show label {
    color: #333;
    font-size: 14px;
}

.green {
    background: #66cccc;
}

.orange {
    background: #ff9900;
}

.chart {
    width: 100%;
    height: 700px;
}

.chart_body {
    position: relative;
}

.chart_body p {
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 16px;
    color: #333;
}
</style>

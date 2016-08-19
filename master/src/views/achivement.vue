<template>
    <div class="achive">
        <div class="achive_top clear">
            <nav class="title left">部门销售业绩报表</nav>
            <div class="achive_time right">
                <a class="select_btn">
                    <span class="select_btn_time">2017年</span>
                    <span class="select_btn_img"><img src="../assets/images/down_arrow.png" height="13" width="24" /></span>
                </a>
            </div>
        </div>
        <div class="achive_top">
            <div class="chart_body">
                <div class="chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
                <p>2017年部门销售业绩报表</p>
            </div>
        </div>
    </div>
</template>
<script>
import {
	getcharList
} from '../vuex/getters'
import {
    initCharts
} from '../vuex/actions'
var echarts = require('echarts');
export default {
    data() {
        return {
            barChartOption: {
                tooltip: {
                    trigger: 'item'
                },
                calculable: true,
                color: ['#9966ff', '#66cccc', '#ff9900'],
                legend: {
                    data: ['Growth', '三方合营1', '三方合营2', '三方合营'],
                    itemGap: 1,
                    orient: 'vertical',
                    top: 'top',
                    right: '0',
                    margin: [5, 0],
                    itemWidth:50,
                    itemHeight:10,
                    textStyle: {
                        color: '#333',
                        fontSize:'14'
                    }
                },
                grid: {
                    top: '10%',
                    left: '34',
                    right: '5%',
                    containLabel: true,
                     textStyle: {
                        color: '#333',
                        fontSize:'14'
                    }
                },
                xAxis: [{
                    type: 'category',
                    name: '时间/月',
                    data: this.getcharList.timeList,
                    textStyle: {
                        color: '#003077',
                        fontSize:'14'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '业绩/元',
                    textStyle: {
                        color: '#003077',
                        fontSize:'14'
                    },
                    axisLabel: {
                        formatter: function(a) {
                            a = +a;
                            return isFinite(a) ? echarts.format.addCommas(+a) : '';
                        }
                    }
                }],
                dataZoom: [{
                    show: false,
                    start: 0,
                    end: 100
                }, {
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    show: false,
                    yAxisIndex: 0,
                    filterMode: 'empty',
                    width: 30,
                    height: '80%',
                    showDataShadow: false,
                    left: '93%'
                }],
                series: [{
                    name: '三方合营1',
                    type: 'bar',
                    barGap: '0',
                    data: this.getcharList.achieveList/*[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]*/
                }, {
                    name: '三方合营2',
                    type: 'bar',
                    barGap: '0',
                    data: this.getcharList.achieveListed/* [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12]*/
                }, {
                    name: '三方合营',
                    type: 'bar',
                    barGap: '0',
                    data:this.getcharList.achieveListc
                }]
            },
            barChartLoading: false
        }
    },
     vuex: {
     		getters: {
                getcharList
            },
            actions: {
         		initCharts
            },
        },
        created() {
            this.initCharts();
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

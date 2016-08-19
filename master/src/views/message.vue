<template>
    <div>
        message
        <button @click='increment'>Increment +1</button>
        <button @click='decrement'>Increment -1</button>
    </div>
    <div class="chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
</template>
<script>
import {
    increment,
    decrement
} from '../vuex/actions'


export default {
    vuex: {
        actions: {
            increment: increment,
            decrement: decrement
        }
    },
    data() {
        return {
            msg: 'Hello World!',
            barChartOption: {
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                legend: {
                    data: ['Growth', 'Budget 2011', 'Budget 2012'],
                    itemGap: 5
                },
                grid: {
                    top: '12%',
                    left: '1%',
                    right: '10%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: [200000,400000,600000,800000]
                }],
                yAxis: [{
                    type: 'value',
                    name: 'Budget (million USD)',
                }],
                dataZoom: [{
                    show: true,
                    start: 94,
                    end: 100
                }, {
                    type: 'inside',
                    start: 94,
                    end: 100
                }, {
                    show: true,
                    yAxisIndex: 0,
                    filterMode: 'empty',
                    width: 30,
                    height: '80%',
                    showDataShadow: false,
                    left: '93%'
                }],
                series: [{
                    name: 'Budget 2011',
                    type: 'bar',
                    data: [1,2,3,4,5,6]
                }, {
                    name: 'Budget 2012',
                    type: 'bar',
                    data: [2,3,4,5,6,7]
                }]
            },
            barChartLoading: false
        }
    }

}
</script>
<style scoped>
.chart {
    width: 100%;
    height: 800px;
}
</style>

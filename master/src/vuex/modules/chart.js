/*
 * @Author: huili.sun
 * @Date:   2016-08-19 14:46:10
 * @Last Modified by:   huili.sun
 * @Last Modified time: 2016-09-07 19:31:57
 */

'use strict';
import {
    CHANGE_CHARTS,
    CHANGE_LINECHARTS,
    CHANGE_PIECHARTS,
    CHANGE_LINESCHARTS,
    CHANGE_COLCHARTS
} from '../mutation-types'

const state = {
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
            itemWidth: 50,
            itemHeight: 10,
            textStyle: {
                color: '#333',
                fontSize: '14'
            }
        },
        grid: {
            top: '10%',
            left: '34',
            right: '5%',
            containLabel: true,
            textStyle: {
                color: '#333',
                fontSize: '14'
            }
        },
        xAxis: [{
            type: 'category',
            name: '时间/月',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            textStyle: {
                color: '#003077',
                fontSize: '14'
            }
        }],
        yAxis: [{
            type: 'value',
            name: '业绩/元',
            textStyle: {
                color: '#003077',
                fontSize: '14'
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
            data: ['10000', '20000', '30000', '40000', '50000', '60000', '70000', '80000', '90000', '100000', '110000', '120000']
        }, {
            name: '三方合营2',
            type: 'bar',
            barGap: '0',
            data: ['10000', '20000', '30000', '40000', '50000', '60000', '70000', '80000', '90000', '100000', '110000', '120000']
        }, {
            name: '三方合营',
            type: 'bar',
            barGap: '0',
            data: ['10000', '20000', '30000', '40000', '50000', '60000', '70000', '80000', '90000', '100000', '110000', '120000']
        }]
    }, barChartLoading: false,

     lineChartOption: {
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        //折线的颜色
        color: ['#3399FF'],
        legend: {
            data: ['Growth', '个人业绩'],
            itemGap: 1,
            selectedMode:false,
            orient: 'vertical',
            top: 'top',
            left: 'center',
            itemHeight: 10,
            textStyle: {
                color: '#333',
                fontSize: '14'
            }
        },
        grid: {
            top: '10%',
            left: '34',
            right: '9%',
            containLabel: true,
            textStyle: {
                color: '#333',
                fontSize: '14'
            }
        },
        xAxis: [{
            type: 'category',
            name: '7月',
            data: ['1号','5号','10号','11号','16号','20号', '30号'],
            textStyle: {
                color: '#003077',
                fontSize: '14'
            }
        }],
        yAxis: [{
            type: 'value',
            name: '业绩',
            textStyle: {
                color: '#003077',
                fontSize: '14'
            },
            splitArea: { show: true },
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
            name: '个人业绩',
            type: 'line',
            data: ['1000', '2000', '3000', '4000', '5000', '6000', '5000']
        }]
    },
    lineChartLoading: false,

    linesChartOption:{
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['新增','活跃','成交','客户总数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'新增',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'活跃',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'成交',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'客户总数',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            }
        ]
    },linesChartLoading: false,

    PieChartOption: {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ['#fa6705', '#ccc'],
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['已完成','未完成'],
            show: false
        },
        toolbox: {
            show : true,
            feature : {
              //mark : {show: true},
              //dataView : {show: true, readOnly: false},
              restore : {show: false},
              //saveAsImage : {show: true}
            }
        },
        calculable : false,
        series : [
            {
              name:'饼图实例',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                    {value:700, name:'已完成'},
                    {value:200, name:'未完成'}
                ]
            }
          ]
      },PieChartLoading: false,

    ColChartOption:{
        title: {
            text: ''
        },
        tooltip : {
            trigger: 'item',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '7%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data :  ['新增用户','新增活跃用户','新增成交用户','用户总数'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type:'bar',
                barWidth: '60px',
                data:[150, 52, 200, 110],
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#91c7ae','#c23531', '#2f4554', '#61a0a8',
                                '#d48265'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
               
            }
             
        ]
      },ColChartLoading:false
}

const mutations = {
    [CHANGE_CHARTS](state, data) {
        state.barChartOption.xAxis.data = data.results.timeList;
        state.barChartOption.series[0].data = data.results.achieveList;
        state.barChartOption.series[1].data = data.results.achieveListed;
        state.barChartOption.series[2].data = data.results.achieveListc;
        state.barChartLoading=false;
    },

    [CHANGE_LINECHARTS](state, data) {
        state.lineChartOption.xAxis.data = data.results.dateList;
        state.lineChartOption.series.data = data.results.achieveList;
        state.lineChartLoading=false;
    },

    [CHANGE_LINESCHARTS](state, data) {
        state.linesChartOption.xAxis.data = data.results.dateList;
        state.linesChartOption.series.data = data.results.achieveList;
        state.linesChartLoading=false;
    },
    
    [CHANGE_PIECHARTS](state, data) {
        state.PieChartOption.legend.data = data.results.dateList;
        state.PieChartOption.series.data = data.results.achieveList;
        state.PieChartLoading=false;
    },

    [CHANGE_COLCHARTS](state,data) {
        state.linesChartOption.xAxis.data = data.results.dateList;
        state.linesChartOption.series.data = data.results.achieveList;
        state.linesChartLoading=false;
    }
}


export default {
    state,
    mutations
}

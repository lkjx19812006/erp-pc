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
    CHANGE_COLCHARTS,
    CHANGE_REGIONALCHARTS
} from '../mutation-types'
import china from '../../assets/map/china.js'
const randomData = function() {
    return Math.round(Math.random()*1000);
}
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
            trigger: 'axis',

            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },

        },
        legend: {
            data: ['新增', '活跃','成交','客户总数','haha总数']
        },
        xAxis: [{
            type: 'category',
            data: ['1周', '2周', '3周', '4周', '5周', '6周', '7周', '8周', '9周', '10周', '11周', '12周']
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
                formatter: '{value} 个'
            }
        }],
        series: [{
                name: '新增',
                type:'line',
                data: [90, 34, 48, 57, 39, 21, 13, 12, 14, 36, 62, 49],
                
            }, {
                name: '活跃',
                type:'line',
                data: [50, 54, 58, 37, 31, 63, 34, 37, 48, 51, 72, 69],
                
            },
            {
                name: '成交',
                type:'line',
                data: [60, 34, 58, 47, 39, 53, 34, 77, 48, 51, 32, 39],
                
            },
            {
                name: '客户总数',
                type:'line',
                data: [80, 55, 48, 51, 31, 63, 34, 37, 48, 23, 42, 44],
                
            },
            {
                name: 'haha总数',
                type:'line',
                data: [11, 22, 33, 44, 55, 66, 34, 37, 48, 23, 42, 44],
                
            }

        ]
    },linesChartLoading: false,

    regionalChartOption:{
        title: {
            text: '区域客户',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:['iphone3','iphone4','iphone5']
        },
        visualMap: {
            min: 0,
            max: 2500,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'iphone3',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: randomData() },
                    {name: '天津',value: randomData() },
                    {name: '上海',value: randomData() },
                    {name: '重庆',value: randomData() },
                    {name: '河北',value: randomData() },
                    {name: '河南',value: randomData() },
                    {name: '云南',value: randomData() },
                    {name: '辽宁',value: randomData() },
                    {name: '黑龙江',value: randomData() },
                    {name: '湖南',value: randomData() },
                    {name: '安徽',value: randomData() },
                    {name: '山东',value: randomData() },
                    {name: '新疆',value: randomData() },
                    {name: '江苏',value: randomData() },
                    {name: '浙江',value: randomData() },
                    {name: '江西',value: randomData() },
                    {name: '湖北',value: randomData() },
                    {name: '广西',value: randomData() },
                    {name: '甘肃',value: randomData() },
                    {name: '山西',value: randomData() },
                    {name: '内蒙古',value: randomData() },
                    {name: '陕西',value: randomData() },
                    {name: '吉林',value: randomData() },
                    {name: '福建',value: randomData() },
                    {name: '贵州',value: randomData() },
                    {name: '广东',value: randomData() },
                    {name: '青海',value: randomData() },
                    {name: '西藏',value: randomData() },
                    {name: '四川',value: randomData() },
                    {name: '宁夏',value: randomData() },
                    {name: '海南',value: randomData() },
                    {name: '台湾',value: randomData() },
                    {name: '香港',value: randomData() },
                    {name: '澳门',value: randomData() }
                ]
            },
            {
                name: 'iphone4',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: randomData() },
                    {name: '天津',value: randomData() },
                    {name: '上海',value: randomData() },
                    {name: '重庆',value: randomData() },
                    {name: '河北',value: randomData() },
                    {name: '安徽',value: randomData() },
                    {name: '新疆',value: randomData() },
                    {name: '浙江',value: randomData() },
                    {name: '江西',value: randomData() },
                    {name: '山西',value: randomData() },
                    {name: '内蒙古',value: randomData() },
                    {name: '吉林',value: randomData() },
                    {name: '福建',value: randomData() },
                    {name: '广东',value: randomData() },
                    {name: '西藏',value: randomData() },
                    {name: '四川',value: randomData() },
                    {name: '宁夏',value: randomData() },
                    {name: '香港',value: randomData() },
                    {name: '澳门',value: randomData() }
                ]
            },
            {
                name: 'iphone5',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: randomData() },
                    {name: '天津',value: randomData() },
                    {name: '上海',value: randomData() },
                    {name: '广东',value: randomData() },
                    {name: '台湾',value: randomData() },
                    {name: '香港',value: randomData() },
                    {name: '澳门',value: randomData() }
                ]
            }
        ]
    },regionalChartLoading: false,

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
    
    [CHANGE_REGIONALCHARTS](state,data){
        state.regionalChartOption.xAxis.data = data.results.dateList;
        state.regionalChartOption.series.data = data.results.achieveList;
        stete.linesChartLoading = false;
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

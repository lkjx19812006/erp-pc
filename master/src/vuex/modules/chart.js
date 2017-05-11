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
    CHANGE_REGIONALCHARTS,
    CHANGE_CUSTYPECHARTS,
    CHANGE_ORGCHARTS,
    CHANGE_ORGCOLCHARTS,
    ORG_REGIONAL_DETAIL,
    ALL_REGIONAL_DETAIL,
    CHANGE_ALLCHARTS,
    CHANGE_ALLCOLCHARTS
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
            data: ['新增', '活跃','成交','客户总数']
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                interval: 0
            },
            data: ['5月1号', '5月2号', '5月3号', '5月4号', '5月5号', '5月6号', '5月7号', '5月8号', '5月9号', '5月10号', '5月11号', '5月12号']
        }],
        yAxis: [{
            type: 'value'
            /*min: 0,
            max: 20,
            interval: 5,
            axisLabel: {
                formatter: '{value} 个'
            }*/
        }],
        series: [{
                name: '新增',
                type:'line',
                data: [10,13, 20, 18, 11, 16, 13, 12, 14, 12, 11, 3],
                
            }, {
                name: '活跃',
                type:'line',
                data: [3, 11, 12, 14, 12, 13, 20, 15, 20, 5, 3, 8],
                
            },
            {
                name: '成交',
                type:'line',
                data: [6, 14, 18, 17, 3, 13, 14, 17, 4, 11, 12, 19],
                
            },
            {
                name: '客户总数',
                type:'line',
                data: [10, 15, 4, 11, 3, 13, 14, 17, 18, 20, 12, 14],
                
            },
        ]
    },linesChartLoading: false,

    orgChartOption:{
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
            data: ['新增', '活跃','成交','客户总数']
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                interval: 0
            },
            data: ['5月1号', '5月2号', '5月3号', '5月4号', '5月5号', '5月6号', '5月7号', '5月8号', '5月9号', '5月10号', '5月11号', '5月12号']
        }],
        yAxis: [{
            type: 'value'
            /*min: 0,
            max: 20,
            interval: 5,
            axisLabel: {
                formatter: '{value} 个'
            }*/
        }],
        series: [{
                name: '新增',
                type:'line',
                data: [10,13, 20, 18, 11, 16, 13, 12, 14, 12, 11, 3],
                
            }, {
                name: '活跃',
                type:'line',
                data: [3, 11, 12, 14, 12, 13, 20, 15, 20, 5, 3, 8],
                
            },
            {
                name: '成交',
                type:'line',
                data: [6, 14, 18, 17, 3, 13, 14, 17, 4, 11, 12, 19],
                
            },
            {
                name: '客户总数',
                type:'line',
                data: [10, 15, 4, 11, 3, 13, 14, 17, 18, 20, 12, 14],
                
            },
        ]
    },orgChartLoading: false,

    allChartOption:{
        title: {
            text: '新'
        },
        tooltip: {
            trigger: 'axis',

            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },

        },
        legend: {
            data: ['新增', '活跃','成交','客户总数']
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                interval: 0
            },
            data: ['5月1号', '5月2号', '5月3号', '5月4号', '5月5号', '5月6号', '5月7号', '5月8号', '5月9号', '5月10号', '5月11号', '5月12号']
        }],
        yAxis: [{
            type: 'value'
            /*min: 0,
            max: 20,
            interval: 5,
            axisLabel: {
                formatter: '{value} 个'
            }*/
        }],
        series: [{
                name: '新增',
                type:'line',
                data: [10,13, 20, 18, 11, 16, 13, 12, 14, 12, 11, 3],
                
            }, {
                name: '活跃',
                type:'line',
                data: [3, 11, 12, 14, 12, 13, 20, 15, 20, 5, 3, 8],
                
            },
            {
                name: '成交',
                type:'line',
                data: [6, 14, 18, 17, 3, 13, 14, 17, 4, 11, 12, 19],
                
            },
            {
                name: '客户总数',
                type:'line',
                data: [10, 15, 4, 11, 3, 13, 14, 17, 18, 20, 12, 14],
                
            },
        ]
    },allChartLoading: false,

    custypeChartOption:{
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
            data: ['产地', '药厂','药商','服务商']
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                interval: 0
            },
            data: ['5月1号', '5月2号', '5月3号', '5月4号', '5月5号', '5月6号', '5月7号', '5月8号', '5月9号', '5月10号', '5月11号', '5月12号']
        }],
        yAxis: [{
            type: 'value',
        }],
        series: [{
                name: '产地',
                type:'line',
                data: [90, 34, 48, 57, 39, 21, 13, 12, 14, 36, 62, 49],
                
            }, {
                name: '药厂',
                type:'line',
                data: [50, 54, 58, 37, 31, 63, 34, 37, 48, 51, 72, 69],
                
            },
            {
                name: '药商',
                type:'line',
                data: [60, 34, 58, 47, 39, 53, 34, 77, 48, 51, 32, 39],
                
            },
            {
                name: '服务商',
                type:'line',
                data: [80, 55, 48, 51, 31, 63, 34, 37, 48, 23, 42, 44],
                
            },
        ]
    },custypeChartLoading: false,

    regionalChartOption:{
        title: {
            text: '区域客户',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {  
                var res = params.name+'<br/>';  
                var myseries = options.series;  
                for (var i = 0; i < myseries.length; i++) {  
                    res+= myseries[i].name;  
                    for(var j=0;j<myseries[i].data.length;j++){  
                        if(myseries[i].data[j].name==params.name){  
                          res+=' : '+myseries[i].data[j].value+'</br>';  
                        }  
                    }         
                }  
                return res;  
            }  
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:['新增用户','活跃用户','成交用户']
        },
        visualMap: {
            min: 0,
            max: 200,
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
                name: '新增用户',
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
                name: '活跃用户',
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
                name: '成交用户',
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
            }
        ]
    },regionalChartLoading: false,

    orgRegionalChartOption:{
        title: {
            text: '区域客户',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {  
                var res = params.name+'<br/>';  
                var myseries = options.series;  
                for (var i = 0; i < myseries.length; i++) {  
                    res+= myseries[i].name;  
                    for(var j=0;j<myseries[i].data.length;j++){  
                        if(myseries[i].data[j].name==params.name){  
                          res+=' : '+myseries[i].data[j].value+'</br>';  
                        }  
                    }         
                }  
                return res;  
            }  
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:['新增用户','活跃用户','成交用户']
        },
        visualMap: {
            min: 0,
            max: 200,
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
                name: '新增用户',
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
                name: '活跃用户',
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
                name: '成交用户',
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
            }
        ]
    },orgRegionalChartLoading: false,

    allRegionalChartOption:{//全部客户区域统计
        title: {
            text: '区域客户',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {  
                var res = params.name+'<br/>';  
                var myseries = options.series;  
                for (var i = 0; i < myseries.length; i++) {  
                    res+= myseries[i].name;  
                    for(var j=0;j<myseries[i].data.length;j++){  
                        if(myseries[i].data[j].name==params.name){  
                          res+=' : '+myseries[i].data[j].value+'</br>';  
                        }  
                    }         
                }  
                return res;  
            }  
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:['新增用户','活跃用户','成交用户']
        },
        visualMap: {
            min: 0,
            max: 200,
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
                name: '新增用户',
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
                name: '活跃用户',
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
                name: '成交用户',
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
            }
        ]
    },allRegionalChartLoading: false,

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
                data :  ['新增用户','活跃用户','成交用户','用户总数'],
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
                data:[10, 52, 200, 110],
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
      },ColChartLoading:false,

      orgColChartOption:{//部门客户柱状图
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
                data :  ['新增用户','活跃用户','成交用户','用户总数'],
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
                data:[10, 52, 150, 110],
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
      },orgColChartLoading:false,

      allColChartOption:{//部门客户柱状图
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
                data :  ['新增用户','活跃用户','成交用户','用户总数'],
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
                data:[10, 52, 150, 110],
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
      },allColChartLoading:false
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
        state.linesChartOption.xAxis[0].data=[];
        state.linesChartOption.series[0].data=[];
        state.linesChartOption.series[1].data =[];
        state.linesChartOption.series[2].data=[];
        state.linesChartOption.series[3].data=[];
        for(var i=0;i<data.length;i++){                   
          state.linesChartOption.xAxis[0].data.push(data[i].countDate.toString().substring(6,8))          
          state.linesChartOption.series[0].data.push(data[i].addNumber)
          state.linesChartOption.series[1].data.push(data[i].activeNumber)
          state.linesChartOption.series[2].data.push(data[i].transactionNumber)
          state.linesChartOption.series[3].data.push(data[i].customerTotal)  
        }
        state.linesChartLoading=false;
    },

    [CHANGE_ORGCHARTS](state, data) { //部门图数据    
        state.orgChartOption.xAxis[0].data=[];
        state.orgChartOption.series[0].data=[];
        state.orgChartOption.series[1].data =[];
        state.orgChartOption.series[2].data=[];
        state.orgChartOption.series[3].data=[];
        for(var i=0;i<data.length;i++){                   
          state.orgChartOption.xAxis[0].data.push(data[i].countDate.toString().substring(6,8))          
          state.orgChartOption.series[0].data.push(data[i].addNumber)
          state.orgChartOption.series[1].data.push(data[i].activeNumber)
          state.orgChartOption.series[2].data.push(data[i].transactionNumber)
          state.orgChartOption.series[3].data.push(data[i].customerTotal)  
        }
        state.orgChartLoading=false;
    },
    
    [CHANGE_ALLCHARTS](state, data) { //部门折线图数据    
        state.allChartOption.xAxis[0].data=[];
        state.allChartOption.series[0].data=[];
        state.allChartOption.series[1].data =[];
        state.allChartOption.series[2].data=[];
        state.allChartOption.series[3].data=[];
        for(var i=0;i<data.length;i++){                   
          state.allChartOption.xAxis[0].data.push(data[i].countDate.toString().substring(6,8))          
          state.allChartOption.series[0].data.push(data[i].addNumber)
          state.allChartOption.series[1].data.push(data[i].activeNumber)
          state.allChartOption.series[2].data.push(data[i].transactionNumber)
          state.allChartOption.series[3].data.push(data[i].customerTotal)  
        }
        state.allChartLoading=false;
    },
    
    [CHANGE_REGIONALCHARTS](state,data){//个人区域数据
        for(var i = 0;i<=33;i++){
            state.regionalChartOption.series[0].data[i].value = data[i].addNumber
            state.regionalChartOption.series[0].data[i].name = data[i].provinceName
            state.regionalChartOption.series[1].data[i].value = data[i].activeNumber
            state.regionalChartOption.series[1].data[i].name = data[i].provinceName
            state.regionalChartOption.series[2].data[i].value = data[i].transactionNumber 
            state.regionalChartOption.series[2].data[i].name = data[i].provinceName           
        }
        state.regionalChartLoading = false;
    },

    [ORG_REGIONAL_DETAIL](state,data){//部门区域数据
        for(var i = 0;i<=33;i++){
            state.orgRegionalChartOption.series[0].data[i].value = data[i].addNumber
            state.orgRegionalChartOption.series[0].data[i].name = data[i].provinceName
            state.orgRegionalChartOption.series[1].data[i].value = data[i].activeNumber
            state.orgRegionalChartOption.series[1].data[i].name = data[i].provinceName
            state.orgRegionalChartOption.series[2].data[i].value = data[i].transactionNumber 
            state.orgRegionalChartOption.series[2].data[i].name = data[i].provinceName           
        }
        state.orgRegionalChartLoading = false;
    },

    [ALL_REGIONAL_DETAIL](state,data){//全部区域数据
        for(var i = 0;i<=33;i++){
            state.allRegionalChartOption.series[0].data[i].value = data[i].addNumber
            state.allRegionalChartOption.series[0].data[i].name = data[i].provinceName
            state.allRegionalChartOption.series[1].data[i].value = data[i].activeNumber
            state.allRegionalChartOption.series[1].data[i].name = data[i].provinceName
            state.allRegionalChartOption.series[2].data[i].value = data[i].transactionNumber 
            state.allRegionalChartOption.series[2].data[i].name = data[i].provinceName           
        }
        state.allRegionalChartLoading = false;
    },

    [CHANGE_CUSTYPECHARTS](state,data){
        console.log(data)
        state.custypeChartOption.xAxis[0].data=[];
        state.custypeChartOption.series[0].data=[];
        state.custypeChartOption.series[1].data =[];
        state.custypeChartOption.series[2].data=[];
        state.custypeChartOption.series[3].data=[];
        if(data.type == '新增'){
            for(var i=0;i<data.dataList.length;i++){                   
              state.custypeChartOption.xAxis[0].data.push(data.dataList[i].countDate.toString().substring(6,8))          
              state.custypeChartOption.series[0].data.push(data.dataList[i].addNumber['0'])
              state.custypeChartOption.series[1].data.push(data.dataList[i].addNumber['1'])
              state.custypeChartOption.series[2].data.push(data.dataList[i].addNumber['2'])
              state.custypeChartOption.series[3].data.push(data.dataList[i].addNumber['3'])  
            }
        }
        if(data.type == '成交'){
            for(var i=0;i<data.dataList.length;i++){                   
              state.custypeChartOption.xAxis[0].data.push(data.dataList[i].countDate.toString().substring(6,8))          
              state.custypeChartOption.series[0].data.push(data.dataList[i].transactionNumber['0'])
              state.custypeChartOption.series[1].data.push(data.dataList[i].transactionNumber['1'])
              state.custypeChartOption.series[2].data.push(data.dataList[i].transactionNumber['2'])
              state.custypeChartOption.series[3].data.push(data.dataList[i].transactionNumber['3'])  
            }
        }
        if(data.type == '活跃'){
            for(var i=0;i<data.dataList.length;i++){                   
              state.custypeChartOption.xAxis[0].data.push(data.dataList[i].countDate.toString().substring(6,8))          
              state.custypeChartOption.series[0].data.push(data.dataList[i].activeNumber['0'])
              state.custypeChartOption.series[1].data.push(data.dataList[i].activeNumber['1'])
              state.custypeChartOption.series[2].data.push(data.dataList[i].activeNumber['2'])
              state.custypeChartOption.series[3].data.push(data.dataList[i].activeNumber['3'])  
            }
        }
        
        state.custypeChartLoading=false;
    },

    [CHANGE_PIECHARTS](state, data) {
        state.PieChartOption.legend.data = data.results.dateList;
        state.PieChartOption.series.data = data.results.achieveList;
        state.PieChartLoading=false;
    },

    [CHANGE_COLCHARTS](state,data) {
        //state.linesChartOption.xAxis.data = data
        state.ColChartOption.series[0].data=[];
        state.ColChartOption.series[0].data[0] = data[0].addNumber
        state.ColChartOption.series[0].data[1] = data[0].activeNumber
        state.ColChartOption.series[0].data[2] = data[0].transactionNumber
        state.ColChartOption.series[0].data[3] = data[0].customerTotal
        state.ColChartLoading=false;
    },
    [CHANGE_ORGCOLCHARTS](state,data) {
        //state.linesChartOption.xAxis.data = data
        state.orgColChartOption.series[0].data=[];
        state.orgColChartOption.series[0].data[0] = data.addNumber
        state.orgColChartOption.series[0].data[1] = data.activeNumber
        state.orgColChartOption.series[0].data[2] = data.transactionNumber
        state.orgColChartOption.series[0].data[3] = data.customerTotal
        state.orgColChartLoading=false;
    },
    [CHANGE_ALLCOLCHARTS](state,data) {
        state.allColChartOption.series[0].data=[];
        state.allColChartOption.series[0].data[0] = data.addNumber
        state.allColChartOption.series[0].data[1] = data.activeNumber
        state.allColChartOption.series[0].data[2] = data.transactionNumber
        state.allColChartOption.series[0].data[3] = data.customerTotal
        state.allColChartLoading=false;
    }
}


export default {
    state,
    mutations
}

<template>
    <div class="employee clear">
        <div class="employee_left">
            <div class="employee_top" @click="freshLinecharts(getLinechart)">
                <a class="select_btn clear">
                    <span class="select_btn_person">个人业绩</span>
                    <span class="select_btn_img"><img src="/static/images/down_arrow.png" height="13" width="24" /></span>
                </a>
                <a class="select_btn">
                    <span class="select_btn_date">2016年7月</span>
                    <span class="select_btn_img"><img src="/static/images/down_arrow.png" height="13" width="24" /></span>
                </a>
            </div>
            <div class="employee_line">
                <div class="chart" v-echarts="getLinechart.options" :loading="getLinechart.load"></div>
            </div>
            <div class="complete_rate">
            	<span>个人业绩完成率</span>
            	<a class="select_btn"  @click="freshPiecharts(getPiechart)"> 
                    <span class="select_btn_date">2016年7月</span>
                    <span class="select_btn_img"><img src="/static/images/down_arrow.png" height="13" width="24" /></span>
                </a>
            </div>
            <div class="pie_chart">
            	 <div class="Piechart" v-echarts="getPiechart.options" :loading="getPiechart.load"></div>
            </div>
        </div>
        <div class="employee_right">
            右测消息
        </div>
    </div>
</template>
<script>
import {
    getLinechart,
     getPiechart
} from '../vuex/getters'
import {
    freshLinecharts,
    freshPiecharts
} from '../vuex/actions'
export default {
    data() {
            return {

            }
        },
        vuex: {
            getters: {
                getLinechart,
                 getPiechart
            },
            actions: {
                freshLinecharts,
                 freshPiecharts
            },
        },
        created() {
            this.freshLinecharts();
             this.freshPiecharts();
            // if(this.getcharList.achieveListc.length==0){
            // 	this.initCharts();
            // }
        }
}
</script>
<style scoped>
.employee {
    position: relative;
    padding: 25px 30px 0 40px;
    background: #fff;
}

.employee_left {
    position: relative;
    width: 1070px;
    float: left;
    border-right: 1px solid #ccc;
    padding-right: 30px;
}

.employee_right {}
.employee_top{
	margin-bottom: 20px;
}
.employee_line {
    height: 420px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.chart {
    width: 100%;
    height: 420px;
}

.select_btn {
    display: inline-block;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.select_btn_person,
.select_btn_date {
    display: inline-block;
    color: #333;
    font-size: 20px;
    float: left;
    padding: 5px 10px 5px 5px;
}

.select_btn_img {
    display: inline-block;
    text-align: center;
    margin-top: 14px;
    padding: 0 8px;
}
.pie_chart{
	width: 370px;
	height: 370px;
	text-align: center;
	margin: auto;
}
.Piechart{
	width: 100%;
	height: 100%;
}
</style>

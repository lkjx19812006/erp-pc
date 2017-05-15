<template>
    <div class="lines">
    <!-- 折线图 -->
        <h4 class="detail_title">用户总览
            <span class="detail_num ">
                <div class="show_type">
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.timeType==='month'}" @click="selectTime('year')">
                            年
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.timeType==='day'}"
                         @click="selectTime('month')">
                            月
                        </button>
                    </div>
                    <dt class="left transfer marg_top" style="margin-left: 20px">品种类型：</dt>
                    <dd class="left margin_right">
                        <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.type" @change="selectType()">
                            <option value=''>全部</option>
                            <option value='0'>求购</option>
                            <option value='1'>供应</option>
                        </select>
                    </dd>
                    <dt v-if="loadParam.timeType!='day'" class="left transfer marg_top" style="margin-left: 20px">请选择年份：</dt>
                    <dd v-if="loadParam.timeType!='day'" class="left margin_right asdf" style="margin-right: 20px">
                        <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.year" @change="selectType('year')">
                            <option :value="[item+'-01-01 00:00:00',(item+1)+'-01-01 00:00:00']" v-for='item in setYear'>{{item}}</option>
                        </select>
                    </dd>
                    
                    <dt v-if="loadParam.timeType!='month'" class="left transfer marg_top" style="margin-left: 20px">请选择年和月：</dt>
                    <dd v-if="loadParam.timeType!='month'" class="left margin_right" style="margin-right: 20px">
                        <select class="form-control edit-input" v-model="loadParam.yearMonth" @change="selectType('month')">
                            <option :value='item' v-for='item in setYear'>{{item}}</option>
                        </select>
                    </dd>
                    <dd v-if="loadParam.timeType!='month'" class="left margin_right" style="margin-right: 20px">
                        <select class="form-control edit-input" :disabled="loadParam.yearMonth?false:true" v-model="loadParam.month" @change="selectType('month')">
                            <option value='1'>01月</option>
                            <option value='2'>02月</option>
                            <option value='3'>03月</option>
                            <option value='4'>04月</option>
                            <option value='5'>05月</option>
                            <option value='6'>06月</option>
                            <option value='7'>07月</option>
                            <option value='8'>08月</option>
                            <option value='9'>09月</option>
                            <option value='10'>10月</option>
                            <option value='11'>11月</option>
                            <option value='12'>12月</option>
                        </select>
                    </dd>                            
                </div>
            </span>
        </h4>               
        <div class="line_chart" v-if="param.name=='我的品种统计'">
            <div class="linechart" v-echarts="initBreedLinesChart.options" :loading="initBreedLinesChart.load"></div>
        </div>
        <div class="line_chart" v-if="param.name=='部门品种统计'">
            <div class="linechart" v-echarts="initBreedLinesChart.options" :loading="initBreedLinesChart.load"></div>
        </div>
        <div class="line_chart" v-if="param.name=='全部品种统计'">
            <div class="linechart" v-echarts="initBreedLinesChart.options" :loading="initBreedLinesChart.load"></div>
        </div>
    </div>
</template>
<script>
import {
    initBreedLinesChart,
    getYear,
} from '../../../vuex/getters'
import {
    freshBreedLines
} from '../../../vuex/actions'

export default {
    components: {

    },
    props:['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                type:'',
                timeType:'month',
                year:['2017-01-01 00:00:00','2018-01-01 00:00:00'],
                yearMonth:'',
                month:'',
                monthArr:[],
            },            
        }
    },
    vuex: {
        getters: {
            initBreedLinesChart,
            getYear
        },
        actions: {
            freshBreedLines,
        }
    },
    events: {

    },
    methods:{
        selectType:function(data){
            if(data=='month'){
                if(this.loadParam.month==''){//选择年份未选择月份默认月份为1月份
                    this.loadParam.month='1'
                }
                this.loadParam.monthArr=this.mGetDate(this.loadParam.yearMonth,this.loadParam.month)
                if(this.param.name=='我的品种统计'){
		    		this.freshBreedLines(this.loadParam)
		    	}
            }else{
                if(this.param.name=='我的品种统计'){
		    		this.freshBreedLines(this.loadParam)
		    	}
            }            
        },
        selectTime:function(data){ //切换年月显示
            
            if(data=="month"){
                var date = new Date()
                var year = date.getFullYear()
                this.loadParam.year=[year+'-01-01 00:00:00',(year+1)+'-01-01 00:00:00'];
                var month = date.getMonth()
                var day = date.getDate()
                if(day>5){
                    month = month+1
                }
                this.loadParam.yearMonth = year
                this.loadParam.month = month
                this.loadParam.monthArr=this.mGetDate(this.loadParam.yearMonth,this.loadParam.month)
                this.loadParam.timeType = 'day'
                if(this.param.name=='我的品种统计'){
		    		this.freshBreedLines(this.loadParam)
		    	}
            }else if(data=='year'){
                var date = new Date()
                var year = date.getFullYear()
                this.loadParam.year=[year+'-01-01 00:00:00',(year+1)+'-01-01 00:00:00'];
                this.loadParam.timeType = 'month'
                if(this.param.name=='我的品种统计'){
		    		this.freshBreedLines(this.loadParam)
		    	}               
            }
        },
        mGetDate:function (year, month){//判断每月多少天
            var d = new Date(year, month, 0);
            if(month<10){
                month = "0"+month
            }
            var time = [year+'-'+month+'-01'+' 00:00:00',year+'-'+month+'-'+d.getDate()+ ' 00:00:00']
            return time
        }
    },
    created() {
    	if(this.param.name=='我的品种统计'){
    		this.freshBreedLines(this.loadParam)
    	}
        
    },
    computed:{
        setYear:function(){//计算当前年份过滤年份数组显示的年份
            let now = new Date();
            let nowYear = now.getFullYear()
            for(var i=0;i<=this.getYear.length;i++){
                if(this.getYear[i]>=nowYear){
                    return this.getYear.slice(0,i+1)
                }
            }
        }
    },
    filters:{
    }
}
</script>
<style scoped>
.show_type{
    width: 100%;
    height:40px;
    line-height: 30px;
    padding-top: 5px;
    font-size:14px;
}
.lines{
    width: 100%;
}
.detail_num{
    display: inline-block;
    float: right;
    margin-right:20px;
    color:#ff9e4d
}
.detail_title{
    padding-left:20px;
    line-height: 50px;
    background: #fafafa
}
.line_chart {
    width: 1200px;
    height: 380px;
    text-align: center;
    margin: 0 auto;
    background-color:#fff;
}
.linechart {
    width: 100%;
    width: 1200px;
    height:380px;
    min-height: 100%;
}
</style>

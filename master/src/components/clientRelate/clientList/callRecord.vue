<template>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;"> 
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">客户电话：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerPhone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">员工号：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.employeeNo" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">拨打分机号：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.seat" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer" >
                    <!-- <div class="client-detailInfo col-xs-6"> -->
                    <dt class="left transfer marg_top">开始时间：</dt>
                    <mz-datepicker :time.sync="loadParam.startTime" format="yyyy-MM-dd HH:mm:ss">
                    </mz-datepicker>
                    <!-- </div> -->
                </dl>

                <dl class="clear left transfer" >
                    <!-- <div class="client-detailInfo col-xs-6"> -->
                    <dt class="left transfer marg_top">结束时间：</dt>
                    <mz-datepicker :time.sync="loadParam.endTime" format="yyyy-MM-dd HH:mm:ss">
                    </mz-datepicker>
                    <!-- </div> -->
                </dl>
                <dd class="left" style="margin-left:20px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
                </dd>

                <dd class="left" style="margin-left:20px" >
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dd>
                
                <dd class="pull-right" style="margin-right:20px">
                  <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
                </dd>
            </div>
        </div>

        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th style="width:10%">员工</th>
                        <th style="width:10%">员工工号</th>
                        <th style="width:10%">主叫</th>
                        <th style="width:10%">分机号</th>
                        <th style="width:10%">被叫</th>
                        <th style="width:20%">开始时间</th>
                        <th style="width:20%">应答时间</th>
                        <th style="width:20%">结束时间</th> 
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initCallRecordList">
                       <td>{{item.emploeeName}}</td>
                       <td>{{item.workno}}</td>
                       <td>{{item.caller}}</td>
                       <td>{{item.seat}}</td>
                       <td>{{item.called}}</td>
                       <td>{{item.startt}}</td>
                       <td>{{item.answert}}</td>
                       <td>{{item.end}}</td>
                       <td></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--底部分页-->
        <pagination :combination="loadParam"  slot="page"></pagination>
    </mglist-model>
    
</template>
<script>
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initCallRecordList
} from '../../../vuex/getters'
import {
    getCallRecordList
} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        changeMenu,
        common,
        mglistModel
    },
    vuex: {
        getters: {
            initCallRecordList
        },
        actions: {
           getCallRecordList
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                link:'/callRecord/',
                total:0,
                customerPhone:'',
                seat:'',
                employeeNo:'',
                startTime:'',
                endTime:''
            },
        
        }
    },
    methods: {
        
          selectSearch:function(){
            console.log(this.loadParam.customerPhone);
              this.getCallRecordList(this.loadParam);
          },
          resetCondition:function(){
             this.loadParam.customerPhone = '';
             this.loadParam.seat = '';
             this.loadParam.employeeNo = '';
             this.loadParam.startTime = '';
             this.loadParam.endTime = '';
             this.getCallRecordList(this.loadParam);
          }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getCallRecordList(this.loadParam);
        },
        
    },
    created() {
        changeMenu(this.$store.state.table.isTop,this.getCallRecordList,this.loadParam,localStorage.callRecordParam);
        
    },
    ready(){
      common('tab','table_box',1);
    },
    filter:(filter,{})
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-right: 8px;
}
.table>tbody>tr>td{
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break:break-all; */
}
.component_action{
    right: 30px;
}
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
#table_box table th,#table_box table td{
    width: 115px;
    min-width: 115px;
}
.service-nav {
    padding: 35px 10px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
</style>

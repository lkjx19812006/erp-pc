<template>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;"> 
                

                <dl class="clear left transfer" >
                    <!-- <div class="client-detailInfo col-xs-6"> -->
                    <dt class="left transfer marg_top">日期：</dt>
                    <mz-datepicker :time.sync="loadParam.date" format="yyyy-MM-dd HH:mm:ss">
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
                        <th>日期</th>
                        <th>员工</th>
                        <th>员工工号</th>
                        <th>分机号</th>
                        <th>通话次数</th>
                        <th>通话时长</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initCallCountList">
                       <td>{{item.date}}</td>
                       <td>{{item.employee}}</td>
                       <td>{{item.workNo}}</td>
                       <td>{{item.extNo}}</td>
                       <td>{{item.times}}</td>
                       <td>{{item.duration}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--底部分页-->
        <!-- <pagination :combination="loadParam"  slot="page"></pagination> -->
    </mglist-model>
    
</template>
<script>
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initCallCountList
} from '../../../vuex/getters'
import {
    getCallCountList,
    
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
            initCallCountList
        },
        actions: {
           getCallCountList,
           
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
                link:'/callRecord/getCallRecordCount',
                total:0,
                date:''
                
            },
            voiceParam: {
                id:'',
                index:''
            }
        
        }
    },
    methods: {
        
          selectSearch:function(){
              this.getCallCountList(this.loadParam);
          },
          resetCondition:function(){
             this.loadParam.date = '';
             this.getCallCountList(this.loadParam);
          },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getCallCountList(this.loadParam);
        },
        
    },
    created() {
        changeMenu(this.$store.state.table.isTop,this.getCallCountList,this.loadParam,localStorage.callCountParam);
        
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
    width: 285px;
    min-width: 285px;
}
.service-nav {
    padding: 35px 10px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
</style>

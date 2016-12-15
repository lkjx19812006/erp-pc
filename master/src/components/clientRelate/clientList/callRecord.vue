<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
    
    <div>
        <div class="service-nav">
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
                    <div class="client-detailInfo col-xs-6">
                        <dt class="left transfer marg_top">开始时间：</dt>
                        <mz-datepicker :time.sync="loadParam.startTime" format="yyyy-MM-dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl>

                <dl class="clear left transfer" >
                    <div class="client-detailInfo col-xs-6">
                        <dt class="left transfer marg_top">结束时间：</dt>
                        <mz-datepicker :time.sync="loadParam.endTime" format="yyyy-MM-dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
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

            <div class="clear" style="margin-top:3px;"> 
                 

            </div>
        </div>
        <div class="order_table" id="table_box">
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
        <div class="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
</template>
<script>
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import detailModel from '../../../components/clientRelate/clientDetail'
import createModel  from '../../../components/user/userTransfer'
import deletebreedModel  from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel  from '../../../components/clientRelate/clientUpdate'
import transferModel   from '../../../components/user/employeeOrOrg'
import tipsdialogModel  from '../../../components/tips/tipDialog'
import searchModel  from  '../../../components/clientRelate/searchModel'
import auditDialog from '../../../components/tips/auditDialog'
import vSelect from '../../tools/vueSelect/components/Select'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import {
    initCallRecordList
} from '../../../vuex/getters'
import {
    getCallRecordList
} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        detailModel,
        createModel,
        deletebreedModel,
        alterinfoModel,
        transferModel,
        tipsdialogModel,
        searchModel,
        auditDialog,
        vSelect
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
    padding: 23px 30px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
</style>

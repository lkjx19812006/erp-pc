<template>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
    <mglist-model>
        <div slot="top">
            <div class="clear">
                 <dl class="clear left transfer">
                        <div class="left">
                            <dt class="left transfer marg_top">起止时间：</dt>
                            <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                        <div class="left">
                            <dt class="left marg_top">~~</dt>
                            <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                    </dl>
                <dl class="clear left transfer">
                    <dt class="left  marg_top">{{$t('static.salesman')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.employeeName" @click="selectEmployee()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left  marg_top">{{$t('static.department')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.orgName" placeholder="请选择部门" readonly="true" @click="selectOrg()"/>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left  marg_top">{{$t('static.supplier_name')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerName"  @keyup.enter="search()" />
                    </dd>
                </dl>
                <button class="new_btn left transfer pull-left btn-clear" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                <button class="new_btn left transfer pull-left btn-search" @click="search()">{{$t('static.search')}}</button>
            </div>
            <div class="btn-group pull-left">
                <button class="btn btn-default" v-bind:class="{ 'btn-warning': currentView==1}" @click="clickChange(1)">应收账款</button>
                <button class="btn btn-default" v-bind:class="{ 'btn-warning': currentView==0}" @click="clickChange(0)">应付账款</button>
            </div>
            <button class="btn btn-primary pull-right" style="margin-right:70px" @click="resetCondition()">{{$t('static.refresh')}}</button>
        </div>
        <div slot="form" style="position:relative;height:100%">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>

       <div class="module_table" v-if="currentView==1" id="tt" style="height:900px;overflow:auto;position:relative">

            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.orderTradeTime')}}</th>
                        <th>{{$t('static.orderFicount')}}</th>
                        <th>{{$t('static.backAmount')}}</th>
                        <th>{{$t('static.chargeAmount')}}</th>
                        <th>{{$t('static.billDate')}}</th>
                        <th>{{$t('static.dueDate')}}</th>
                        <th>{{$t('static.overDue')}}</th>
                        <th>{{$t('static.operator')}}</th>
                        <th>{{$t('static.department')}}</th> 
                    </tr>
                       
                </thead>
                <tbody>
                    <tr v-for="item in initFinancialCountTotal" style="cursor:pointer">
                        <td>{{item.customerName}}</td>
                        <td>{{item.tradeTime|subtime2}}</td>
                        <td>{{item.total}}</td>
                        <td>
                            <a v-for="stage in item.stages">{{stage.received}}</a>
                        </td>
                         <td>
                            <a v-for="stage in item.stages">{{stage.unreceived}}</a>
                        </td>
                        <td>
                            <a v-for="stage in item.stages">{{stage.extra}}</a>
                        </td>
                        <td>
                            <a v-for="stage in item.stages">{{stage.scheduleTime|date}}</a>
                        </td>
                        <td>
                            <p v-for="stage in item.stages">
                           <a v-if="stage.isOverdue==0">否</a>
                           <a v-if="stage.isOverdue==1">是</a>
                           </p>

                        </td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.orgName}}</td>
                    </tr>
                </tbody>
            </table>
            </div>


       <div class="module_table"  v-if="currentView==0" id="t2">
            <table class="table table-hover table_color table-striped" id="t1" v-cloak id="tab" style="height:850px;overflow-y:auto">

                <thead>
                    <tr>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.orderTradeTime')}}</th>
                        <th>{{$t('static.orderFicount')}}</th>
                        <th>{{$t('static.order_amount')}}</th>
                        <th>{{$t('static.payAmount')}}</th>
                        <th>{{$t('static.billDate')}}</th>
                        <th>{{$t('static.dueDate')}}</th>
                        <th>{{$t('static.overDue')}}</th>
                        <th>{{$t('static.operator')}}</th>
                        <th>{{$t('static.department')}}</th> 
                    </tr>
                       
                </thead>
                <tbody>
                    <tr v-for="item in initFinancialCountTotal" style="cursor:pointer">
                      
                       <td>{{item.customerName}}</td>
                        <td>{{item.tradeTime|subtime2}}</td>
                        <td>{{item.total}}</td>
                        <td>
                            <a v-for="stage in item.stages">{{stage.paid}}</a>
                        </td>
                         <td>
                            <a v-for="stage in item.stages">{{stage.unpaid}}</a>
                        </td>
                        <td>
                            <a v-for="stage in item.stages">{{stage.extra}}</a>
                        </td>
                        <td>
                            <a v-for="stage in item.stages">{{stage.scheduleTime|date}}</a>
                        </td>
                        <td>
                           <p v-for="stage in item.stages">
                           <a v-if="stage.isOverdue==0">否</a>
                           <a v-if="stage.isOverdue==1">是</a>
                           </p>

                        </td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.orgName}}</td>
                    </tr>
                </tbody>
            </table>
            </div>


        </div>
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import pagination from '../pagination'
import filter from '../../filters/filters'
import common from '../../common/common'
import changeMenu from '../tools/tabs/tabs.js'
import mglistModel from '../mguan/mgListComponent.vue'
import employeeModel from '../clientRelate/searchEmpInfo'
import selectorgModel from '../tips/treeDialog'
import {
    initFinancialCountTotal,
    initLogin
} from '../../vuex/getters'
import {
    getFinancialList

} from '../../vuex/actions'
export default {
    components: {
        pagination,
        mglistModel,
        employeeModel,
        selectorgModel
    },
    
    vuex: {
        getters: {
            initFinancialCountTotal,
            initLogin
        },
        actions: {
          getFinancialList
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all:7,
                type:1,
                total: 0,
                link: '/orderCount/payStageCount',
                employee: this.initLogin.id,
                breedId: '',
                breedName: '',
                employeeId:'',
                employeeName: '',
                customerName: '',
                customerEmail: '',
                orgId:'',
                orgName:'',
                inquire: '',
                country: '',
                startTime:"",
                endTime:""
            },
         employeeParam: {
                show:false,
                org: true,
                orgId: this.initLogin.orgId,
                //单个业务员搜索
                employeeId: '',
                employeeName: '',
                //多个业务员搜索
                employeeIds: '',
                employeeNames: '',

            },
             selectOrgParam: {
                show: false,
                orgId: '',
                orgName: '',
                callback: this.callback,
            },
            inquireParam: {
                show: false,
                times: 0, //询价的次数
                link: '',
                intentionId: '',
                inquireType: '',
                comment: ''
            },
            tipsParam: {
                show: false,
                name: '修改成功',
                alert: true,
            },
            createParam: {
                show: false,
                url: '/intlIntention/',
                customerId: '',
                customerName: '',
                customerPhone: '',
                customerEmail: '',
                country: '',
                province: '',
                city: '',
                district: '',
                address: '',
                duedate: '',
                pack: '',
                items: [

                ]
            },
            offerParam: {
                show: false,
                id: '',
                items: [],
            },
            currentView: 1,
            privilege: /31/.test(this.initLogin.privilege), //判断是否为供应部主管
            checked: false,
            auditParam: {
                title: '意向申请审核备注',
                auditComment: '',
                confirm: true,
                callback: '',
                show: false
            }
        }
    },
    methods: {
        clickChange: function(currentView) {

            this.currentView = currentView;
            this.loadParam.type=currentView;
            this.getFinancialList(this.loadParam);
            console.log(this.currentView)
             
        },
        search: function() {
            this.getFinancialList(this.loadParam);

        },
         selectEmployee: function() {
            this.employeeParam.show=true;     
               },
        selectOrg: function() {
            this.selectOrgParam.show = true;
        },
        callback: function() {
            if (this.selectOrgParam.orgId) {
                this.loadParam.orgId= this.selectOrgParam.orgId;
                this.loadParam.orgName = this.selectOrgParam.orgName;

                this.employeeParam.orgId = this.selectOrgParam.orgId;
            }
        },
        
        resetCondition: function() {
            this.loadParam.employee = '';
            this.loadParam.orgName='';
            this.loadParam.orgId='';
            this.loadParam.employeeId='';
            this.loadParam.customerName = '';
            this.loadParam.employeeName = '';
            this.loadParam.breedId = '';
            this.loadParam.breedName = '';
            this.loadParam.inquire = '';
            this.loadParam.customerEmail = '';
            this.loadParam.startTime='';
            this.loadParam.endTime='';
            this.getFinancialList(this.loadParam);
        },
     
        //在详情界面需要刷新列表页面时，调用此函数
        detailCallback: function() {
            this.getFinancialList(this.loadParam);
        },
        changeCur:function(storageParam) {   //
        if(!!storageParam){
            for(var key in param){
                param[key] = JSON.parse(storageParam)[key];
            }
        }
        
    }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getFinancialList(this.loadParam);
        },
         a: function(employee) {
            this.loadParam.employeeId = employee.employeeId;
            this.loadParam.employeeName = employee.employeeName;
        }
    },
 ready(){
         common('tab', 'tt', 1);

     },
   created() {
      changeMenu(this.$store.state.table.isTop, this.getFinancialList, this.loadParam, localStorage.financialReParam);
      
    },
    filter: (filter, {})
}
</script>
<style scoped>
.service-nav {
    padding: 25px 0 0 0;
}

.click_change {
    text-align: left;
    border: 1px solid #ddd;
    border-bottom: none;
    border-right: none;
    width: 541px;
    line-height: 30px;
}

.click_change span {
    padding: 0 20px;
    display: inline-block;
    border-right: 1px solid #ddd;
    cursor: pointer;
}

.date_active {
    background: #fa6705;
    color: #fff;
}
.module_table {
    border: 1px solid #ddd;
    border-bottom: none;
    padding: 0;
    position: absolute;
    width: 100%;
    float: left;
    overflow: hidden;
}

.transfer {
    margin-top:10px;
    margin-left: 5px;
}
.btn-group{
    margin-top:15px;
}
.btn{
    outline:none;
}
.new_btn{
    border-radius: 5px; 
    color:white;
    margin-left:15px;
    height:35px;
}
.btn-search{
  background: #5CB85C;   
}
.btn-clear{
    background: #F0AD4E;
}
#table_box table th,
#table_box table td {
    min-width: 170px;
    width: 170px;
    padding:10px 0;

}
#table_box table td a,
#table_box table td p{
    border-bottom: 1px solid #ccc;
    display:inline-block;
    height:30px;
    width:100%;
    line-height:30px;
}
#table_box table td a:last-child,
#table_box table td p:last-child{
    border-bottom: none;
}

</style>

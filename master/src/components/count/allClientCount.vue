<template>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <select-org-model :param="selectOrgParam" v-if="selectOrgParam.show"></select-org-model>
    <div class="service-nav clearfix">
        <div class="my_enterprise col-xs-1">全部客户统计</div>
    </div>
    <div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="clearfix" style="margin-top:10px">
            <span v-show="loadParam.groupBy!='org_id'">
                <dt class="left transfer marg_top">业务员：</dt>
                <dd class="left margin_right">
                    <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="按回车键搜索" readonly="true" @click="selectEmployee()">
                </dd>
            </span>
            <dt class="left transfer marg_top">部门：</dt>
            <dd class="left margin_right">
                <input type="text" class="form-control" v-model="loadParam.orgName" placeholder="按回车键搜索" readonly="true" @click="selectOrg()">
            </dd>
            <dt class="left transfer marg_top">是否国际：</dt>
            <dd class="left margin_right">
                <select v-model="loadParam.intl" class="form-control" @change="selectSearch()">
                    <option value="">全部</option>
                    <option value="0">否</option>
                    <option value="1">是</option>
                </select>
            </dd>
            <!-- <dt class="left transfer marg_top">国家：</dt>
            <div type="text" class="left margin_right">
                <v-select :debounce="250" :value.sync="country" :options="initCountrylist" placeholder="国家/Country" label="cnameEn">
                </v-select>
            </div> -->
            <dd class="pull-left" style="margin-right:10px">
                <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn" @click="selectSearch()">搜索</button>
            </dd>
            <dd class="pull-left" style="margin-right:10px">
                <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn" @click="resetCondition()">清空条件</button>
            </dd>
            <dd class="pull-left" style="margin-right:10px">
                <button type="button" class="btn btn-primary" style="margin-right:10px" height="24" width="24" class="new_btn" @click="selectSearch()">刷新</button>
            </dd>
        </div>
        <div style="max-height: 200px;margin-top:10px">
            <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                <thead>
                    <tr style="background:none;color:#000;">
                      <th rowspan="2"></th>
                      <th rowspan="2">客户数</th>
                      <th rowspan="2">供应商数</th>
                      <th rowspan="2">成交客户数</th>
                      <th rowspan="2">成交占比</th>
                      <th colspan = "4">撮合</th>
                      <th colspan = "4">联营</th>
                      <th colspan = "4">自营</th>
                    </tr>
                    <tr style="background:none;color:#000;">
                        <th>销售订单数</th>
                        <th>销售订单金额</th>
                        <th>采购订单数</th>
                        <th>采购订单金额</th>
                        <th>销售订单数</th>
                        <th>销售订单金额</th>
                        <th>采购订单数</th>
                        <th>采购订单金额</th>
                        <th>销售订单数</th>
                        <th>销售订单金额</th>
                        <th>采购订单数</th>
                        <th>采购订单金额</th>
                    </tr>
                </thead>
                <tbody>
                    <td>合计</td>
                    <td>{{initClientcount.total}}</td>
                    <td>{{initClientcount.supplier}}</td>
                    <td>{{initClientcount.traded}}</td>
                    <td>{{initClientcount.tradedRate}}<span v-if="initClientcount.tradedRate!=0">%</span></td>
                    <td>{{initClientcount.sellMateCount }}</td>
                    <td>{{initClientcount.sellMateTotal | money}}元</td>
                    <td>{{initClientcount.buyMateCount }}</td>
                    <td>{{initClientcount.buyMateTotal | money}}元</td>
                    <td>{{initClientcount.sellTripleCount }}</td>
                    <td>{{initClientcount.sellTripleTotal | money}}元</td>
                    <td>{{initClientcount.buyTripleCount }}</td>
                    <td>{{initClientcount.buyTripleTotal | money}}元</td>
                    <td>{{initClientcount.sellSelfCount }}</td>
                    <td>{{initClientcount.sellSelfTotal | money}}元</td>
                    <td>{{initClientcount.buySelfCount }}</td>
                    <td>{{initClientcount.buySelfTotal | money}}元</td>
                </tbody>
            </table>
        </div>
        <div class="clearfix" style="margin-top:10px">
            <div class="btn-group pull-left">
                <button type="button" class="btn btn-default" style="width:70px" v-bind:class="{ 'btn-warning': loadParam.groupBy=='employee_id'}" @click="selectGroupBy('employee_id')">
                    业务员
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.groupBy=='org_id'}" @click="selectGroupBy('org_id')">
                    部门
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.groupBy=='type'}" @click="selectGroupBy('type')">
                    类型
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.groupBy=='country'}" @click="selectGroupBy('country')">
                    国家
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.groupBy=='province'}" @click="selectGroupBy('province')">
                    省
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.groupBy=='city'}" @click="selectGroupBy('city')">
                    市
                </button>
            </div>
        </div>
        <div class="module clear">
          <div class="module_table">
              <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                <thead v-show="true">
                <tr style="background:none;color:#000;">
                  <th rowspan="2">
                    <span v-if="loadParam.groupBy=='employee_id'">业务员</span>
                    <span v-if="loadParam.groupBy=='org_id'">部门</span>
                    <span v-if="loadParam.groupBy=='country'">国家</span>
                    <span v-if="loadParam.groupBy=='province'">省</span>
                    <span v-if="loadParam.groupBy=='city'">市</span>
                  </th>
                  <th rowspan="2">客户数</th>
                  <th rowspan="2">供应商数</th>
                  <th rowspan="2">成交客户数</th>
                  <th rowspan="2">成交占比</th>
                  <th colspan = "4">撮合</th>
                  <th colspan = "4">联营</th>
                  <th colspan = "4">自营</th>
                </tr>
                <tr style="background:none;color:#000;">
                  <th>销售订单数</th>
                  <th>销售订单金额</th>
                  <th>采购订单数</th>
                  <th>采购订单金额</th>
                  <th>销售订单数</th>
                  <th>销售订单金额</th>
                  <th>采购订单数</th>
                  <th>采购订单金额</th>
                  <th>销售订单数</th>
                  <th>销售订单金额</th>
                  <th>采购订单数</th>
                  <th>采购订单金额</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="item in initClientcount.statisticsList">
                    <td>{{item.name}}</td>
                    <td>{{item.total}}</td>
                    <td>{{item.supplier}}</td>
                    <td>{{item.traded}}</td>
                    <td>{{item.tradedRate}}<span v-if="initClientcount.tradedRate!=0">%</span></td>
                    <td>{{item.sellMateCount }}</td>
                    <td>{{item.sellMateTotal | money}}元</td>
                    <td>{{item.buyMateCount }}</td>
                    <td>{{item.buyMateTotal | money}}元</td>
                    <td>{{item.sellTripleCount }}</td>
                    <td>{{item.sellTripleTotal | money}}元</td>
                    <td>{{item.buyTripleCount }}</td>
                    <td>{{item.buyTripleTotal | money}}元</td>
                    <td>{{item.sellSelfCount }}</td>
                    <td>{{item.sellSelfTotal | money}}元</td>
                    <td>{{item.buySelfCount }}</td>
                    <td>{{item.buySelfTotal | money}}元</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
    </div>
</template>
<script>
import {
    initClientcount,
    initLogin,
    initCountrylist
} from '../../vuex/getters'
import {

    getCountryList,
    getClientAllcount,
} from '../../vuex/actions'
import pagination from '../pagination'
import employeeModel from '../clientRelate/searchEmpInfo'
import selectOrgModel from '../../components/tips/treeDialog'
import vSelect from '../tools/vueSelect/components/Select'
export default {
    components: {
        pagination,
        vSelect,
        employeeModel,
        selectOrgModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: 0,
                link: '/customer/allStatistics',
                groupBy: 'employee_id',
                orgId: '',
                orgName: '',
                employeeId: '',
                employeeName: '',
                country: '',
                intl: '0'

            },
            countryParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            country: {
                id: '',
                cname: '',
                cnameEn: ''
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: '',
                employeeId: '',
                employeeName: ''
            },
            selectOrgParam: {
                show: false,
                orgId: '',
                orgName: '',
                callback: this.callback
            },

        }
    },
    methods: {
        selectGroupBy: function(groupBy) {
            this.loadParam.groupBy = groupBy;
            this.selectSearch();
        },
        selectSearch: function() {
            this.loadParam.country = '';
            if (this.country.id) {
                this.loadParam.country = this.country.id;
            }
            this.getClientAllcount(this.loadParam);
        },
        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        selectOrg: function() {
            this.selectOrgParam.show = true;
        },
        callback: function() {
            if (this.selectOrgParam.orgId) {
                this.loadParam.orgId = this.selectOrgParam.orgId;
                this.loadParam.orgName = this.selectOrgParam.orgName;
                this.employeeParam.orgId = this.selectOrgParam.orgId;
                this.selectSearch();
            }
        },
        resetCondition: function() {
            this.loadParam.employeeId = "";
            this.loadParam.employeeName = "";
            this.loadParam.orgId = "";
            this.loadParam.orgName = "";
            //需要把country内容清空
            /*this.country.id = "";
            this.country.cname = "";
            this.country.cnameEn = "";*/
            this.selectSearch();
        }
    },
    vuex: {
        getters: {
            initClientcount,
            initLogin,
            initCountrylist
        },
        actions: {
            getCountryList,
            getClientAllcount
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
        },
        a: function(employee) {
            this.loadParam.employeeId = employee.employeeId;
            this.loadParam.employeeName = employee.employeeName;
        },
    },
    created() {
        this.getCountryList(this.countryParam);
        this.getClientAllcount(this.loadParam);
        window.onload = function() {
            console.log(document.getElementById('module_judge').style.maxHeight)
            if (document.getElementById('module_judge').style.maxHeight < 500) {
                document.getElementsByClassName('module_thead')[0].style.paddingRight = '17px'
            }
        }
    }
}
</script>
<style scoped>
.transfer {
    margin-right: 8px;
}

.margin_right {
    margin-right: 15px
}

.table>thead>tr>th {
    width: 285px;
}

.module {
    position: relative;
}

.module_table {
    border: 1px solid #ddd;
    max-height: 600px;
    padding: 0;
    position: absolute;
    width: 100%;

    float: left;
    overflow-x: auto;
    overflow-y: auto;
}
.can_slide {
    max-height: 600px;
    position: absolute;
    overflow-x: auto;
    overflow-y: auto;
}

.module_thead {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
}

.module_tbody {
    margin-top: 30px;
    max-height: 500px;
    line-height: 25px;
    overflow: auto;
}

.module_tr {
    border-bottom: 1px solid #ddd;
}

.clear {
    clear: both;
}

.module_tr:last-of-type {
    border-bottom: none;
}

.module_th {
    background: #004796;
    color: #fff;
    float: left;
    width: 5.55%;
    line-height: 30px;
}

.module_td {
    float: left;
    width: 5.56%;
    line-height: 30px;
}

.module_th,
.module_td {
    border-right: 1px solid #ddd;
}

.module_th:last-of-type,
.module_td:last-of-type {
    border-right: none;
}

.click_change {
    text-align: left;
    border: 1px solid #ddd;
    border-bottom: none;
    border-right: none;
    width: 224px;
    line-height: 30px;
    margin-top: 20px;
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

.count_top {
    width: 100%;
}

.count_select {
    text-align: left;
    padding-left: 16px;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-right: 10px;
}

.count_select select {
    border: 1px solid #ddd;
}

.btn-warning {
    background-color: #fa6705;
}
</style>

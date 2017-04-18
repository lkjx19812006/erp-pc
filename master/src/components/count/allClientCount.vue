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
        <div class="clearfix" style="margin-top:10px">
            <div class="btn-group pull-left">
                <button type="button" class="btn btn-default" style="width:70px" v-bind:class="{ 'btn-warning': loadParam.groupBy=='employee_id'}" @click="selectGroupBy('employee_id')">
                    业务员
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.groupBy=='org_id'}" @click="selectGroupBy('org_id')">
                    部门
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
                <div class="module_thead  clearfix">
                    <div class="module_th">
                        <span v-if="loadParam.groupBy=='employee_id'">业务员</span>
                        <span v-if="loadParam.groupBy=='org_id'">部门</span>
                        <span v-if="loadParam.groupBy=='country'">国家</span>
                        <span v-if="loadParam.groupBy=='province'">省</span>
                        <span v-if="loadParam.groupBy=='city'">市</span>
                    </div>
                    <div class="module_th">总客户数</div>
                    <div class="module_th">供应商数</div>
                    <div class="module_th">成交客户数</div>
                    <div class="module_th">成交占比</div>
                    <div class="module_th">成交总额</div>
                </div>
                <div class="module_tbody" id="module_judge">
                    <div class="module_tr clearfix" v-for="item in initClientcount.statisticsList">
                        <div class="module_td">{{item.name}}</div>
                        <div class="module_td">{{item.total}}</div>
                        <div class="module_td">{{item.supplier}}</div>
                        <div class="module_td">{{item.traded}}</div>
                        <div class="module_td">{{item.tradedRate}}<span v-if="item.tradedRate!=0">%</span></div>
                        <div class="module_td">{{item.tradedTotal}}元</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="total">
        总计：
        <div>
            <span>客户数：{{initClientcount.total}},</span>
            <span>供应商数：{{initClientcount.supplier}},</span>
            <span>成交客户数：{{initClientcount.traded}},</span>
            <span>成交占比：{{initClientcount.tradedRate}}<span v-if="initClientcount.tradedRate!=0">%</span>,</span>
            <span>成交总额：{{initClientcount.tradedTotal}}元</span>
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
                country: ''

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
    overflow: hidden;
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

.total {
    margin-top: 550px;
    color: red;
    font-size: 16px;
    border: 1px solid #ddd;
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
    width: 16.666%;
    line-height: 30px;
}

.module_td {
    float: left;
    width: 16.666%;
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

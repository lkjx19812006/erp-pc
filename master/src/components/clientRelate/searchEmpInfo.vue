<template>
    <div>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show = false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="model-header">
                <h4>{{$t('static.salesman')}}</h4>
                <div class="trans_service clearfix">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>
                    <div class="clear">
                        <!-- <div  class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" v-model="loadParam.orgName" placeholder="请选择部门" @click="selectOrg()" readonly="true">
                    </div> -->
                        <dl class="clear left transfer">
                            <dt class="left marg_top">{{$t('static.department')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.orgName" @click="selectOrg()" readonly="true" placeholder="请选择部门" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left marg_top">{{$t('static.salesman')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.name" @keyUp.enter="employNameSearch()" placeholder="{{$t('static.enter_salesman')}}" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left marg_top">{{$t('static.cellphone')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.mobile" @keyUp.enter="employNameSearch()" placeholder="{{$t('static.enter_phone')}}" />
                            </dd>
                        </dl>
                        <button class="new_btn transfer pull-left" @click="employNameSearch()">{{$t('static.search')}}</button>
                        <button class="new_btn transfer pull-left" @click="resetContional()">{{$t('static.clear_all')}}</button>
                        <!-- <div class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" v-model="loadParam.name" placeholder="{{$t('static.enter_salesman')}}" @keyup.enter="employNameSearch()">
                    </div> -->
                        <!-- <div class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" v-model="loadParam.mobile" placeholder="请输入业务员手机号"  @keyup.enter="employNameSearch()">
                                        </div> -->
                    </div>
                    <table class="table table-hover table_head table-striped " v-cloak>
                        <thead>
                            <tr>
                                <th></th>
                                <th>姓名</th>
                                <th>部门</th>
                                <th>手机号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in initEmployeeList" @click="serviceselected($index,item)">
                                <td>
                                    <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"></label>
                                </td>
                                <td>{{item.name}}</td>
                                <td>{{item.orgName}}</td>
                                <td>{{item.mobile}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <div class="edit_footer">
                    <button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
                    <input  type="button" class="btn btn-orange" @click="selected(param,param.show=false)" value="确定"/>
                </div> -->
                </div>
                <div class="order_pagination">
                    <pagination :combination="loadParam"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import selectorgModel from '../../components/tips/treeDialog'
import {
    initEmployeeList,
    initOrgList
} from '../../vuex/getters'
import {
    getEmployeeList,
    transferInfo,
    getOrgList
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: 0,
                name: '',
                mobile: '',
                orgId: '',
                leave: 1
            },
            selectOrgParam: {
                show: false,
                orgId: '',
                orgName: '',
                callback: this.callback,
            },
            checked: false,
            show: true
        }
    },
    components: {
        pagination,
        selectorgModel
    },
    vuex: {
        getters: {
            initEmployeeList,
            initOrgList
        },
        actions: {
            getEmployeeList,
            transferInfo,
            getOrgList
        }
    },
    methods: {
        serviceselected: function(sub, item) {
            this.$store.state.table.basicBaseList.employeeList[sub].checked = !this.$store.state.table.basicBaseList.employeeList[sub].checked;
            for (var key in this.initEmployeeList) {
                if (key != sub) {
                    if (this.$store.state.table.basicBaseList.employeeList[key].checked == true) {
                        this.$store.state.table.basicBaseList.employeeList[key].checked = false;
                    }
                }
            }

            this.param.employeeId = item.id;
            this.param.employeeName = item.name;

            let result = {
                employeeId: item.id,
                employeeName: item.name,
                orgId: item.orgid
            }
            this.param.show = false;
            this.$dispatch('a', result);
        },
        selectOrg: function() {
            this.selectOrgParam.show = true;
        },
        callback: function() {
            if (this.selectOrgParam.orgId) {
                this.loadParam.orgId = this.selectOrgParam.orgId;
                this.loadParam.orgName = this.selectOrgParam.orgName;
                this.getEmployeeList(this.loadParam);

            }
        },
        employNameSearch: function() {
            this.getEmployeeList(this.loadParam);
        },
        resetContional: function() {
            this.loadParam.name = "";
            this.loadParam.mobile = "";
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmployeeList(this.loadParam);
        }
    },
    created() {
        if (this.param.orgId) {
            this.loadParam.orgId = 1;
        }
        this.getEmployeeList(this.loadParam);
        this.getOrgList(this.loadParam);
    }
}
</script>
<style scoped>
.modal {
    z-index: 1086;
}

.modal_con {
    z-index: 1086;
}

.change_trans {
    margin-top: 20px;
}

.transfer {
    margin-left: 10px;
}

.top-title {
    left: 0;
    right: 0;
    width: 800px;
}

.tans_tab {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #fa6705;
    text-align: left;
}

.tans_tab > .tabs {
    width: 100px;
    display: inline-block;
    font-size: 16px;
    text-align: center;
    background-color: #f5f5f5;
    color: #333;
    float: left;
    height: 40px;
    border-bottom: 1px solid #fa6705;
    cursor: pointer;
}

.tans_tab .tabs_active {
    background-color: #fff;
    color: #fa6705;
    border: 1px solid #fa6705;
    border-bottom: 0;
}

.checkbox_unselect {
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

.checkbox_select {
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

.trans_service {
    margin-top: 20px;
}

.trans_service .col-xs-8 {
    margin-bottom: 20px;
}

.table {
    margin-bottom: 5px;
}

.table_head>thead>tr {
    background-color: #f5f5f5;
    color: #333;
    font-size: 18px;
}

.base_pagination {
    margin-top: 0;
}

.table {
    display: table
}
</style>

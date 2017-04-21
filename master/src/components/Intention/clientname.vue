<template>
    <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="model-header">
            <h4>{{$t('static.customer_info')}}</h4>
            <div class="trans_service clearfix">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <!-- <div class="col-xs-4">
                                    <div class="name_search clearfix" style="border:none">
                       <select  class="form-control" v-model="loadParam.type" @change="employNameSearch()">
                            <option selected value="">请选择客户类型</option>
                            <option value="0">个人</option>
                            <option value="1">企业</option>
                      </select> 
                    </div>
                </div> -->
                <div class="col-xs-9 clearfix">
                    <div class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" v-model="loadParam.name" placeholder="请输入客户名字" @keyup.enter="employNameSearch()">
                    </div>
                    <div class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" v-model="loadParam.phone" placeholder="请输入客户手机号" @keyup.enter="employNameSearch()">
                    </div>
                    <button class="new_btn" @click="employNameSearch()">{{$t('static.search')}}</button>
                    <button class="new_btn transfer" @click="reset()">{{$t('static.clear_all')}}</button>
                </div>
                <table class="table table-hover table_head table-striped " v-cloak>
                    <thead>
                        <tr>
                            <th></th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.client_phone')}}</th>
                            <th>{{$t('static.province')}}</th>
                            <th>{{$t('static.city')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initCustomerlist" @click="serviceselected($index,item.id,item.name,item.mainPhone,item.mainEmail)">
                            <td>
                                <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"></label>
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{item.mainPhone}}</td>
                            <td>{{item.phoneProvince}}</td>
                            <td>{{item.phoneCity}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="base_pagination">
                <pagination :combination="loadParam"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import {
    initCustomerlist
} from '../../vuex/getters'
import {
    getClientList
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
                link: '/customer/employeeDistributed',
                name: '',
                phone: '',
                type: '',
                employeeId: '',
                total: 0
            },
            checked: false,
            show: true
        }
    },
    components: {
        pagination
    },
    vuex: {
        getters: {
            initCustomerlist
        },
        actions: {
            getClientList
        }
    },
    methods: {
        serviceselected: function(sub, id, name, tel, email) {
            this.$store.state.table.basicBaseList.customerList[sub].checked = !this.$store.state.table.basicBaseList.customerList[sub].checked;
            for (var key in this.initCustomerlist) {
                if (key != sub) {
                    if (this.$store.state.table.basicBaseList.customerList[key].checked == true) {
                        this.$store.state.table.basicBaseList.customerList[key].checked = false;
                    }
                }
            }
            this.param.customerId = id;
            this.param.customerName = name;
            this.param.customerPhone = tel;
            this.param.email = email;
            this.param.show = false;
            this.$dispatch('customer', this.param);
        },
        employNameSearch: function() {
            this.getClientList(this.loadParam);
        },
        reset: function() {
            this.loadParam.name = '';
            this.loadParam.phone = '';
            this.getClientList(this.loadParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getClientList(this.loadParam);
        }
    },
    created() {
        if ("employeeId" in this.param) {
            this.loadParam.employeeId = this.param.employeeId;
        }
        this.getClientList(this.loadParam);
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

.top-title {
    position: fixed;
    margin: auto;
    right: 0;
    left: 0;
    width: 800px;
}

.change_trans {
    margin-top: 20px;
}

.con_trans {
    margin-top: 40px;
}

.transfer {
    margin-right: 7px;
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
    margin-bottom: 20px;
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
    position: relative;
}

table {
    display: table;
}
</style>

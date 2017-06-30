<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <search-model :param="loadParam" v-if="loadParam.show"></search-model>
    <set-blacklist :param="blacklistParam" v-if="blacklistParam.show"></set-blacklist>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="my_enterprise col-xs-1">{{$t('static.blacklist')}}</div>
            <button class="new_btn transfer" @click="clientTransferWhite()">{{$t('static.out_of_blacklist')}}</button>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>
                            <!-- <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label> -->
                        </th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.recent_contact')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.transaction_num')}}</th>
                        <th>{{$t('static.client_type')}}</th>
                        <th>{{$t('static.contact')}}</th>
                        <th>{{$t('static.cellphone')}}</th>
                        <th>{{$t('static.phone_origin')}}</th>
                        <th>{{$t('static.client_origin')}}</th>
                        <th>{{$t('static.detailed_address')}}</th>
                        <th>{{$t('static.main_product')}}</th>
                        <th>拉黑原因</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    </tr>
                    <tr v-for="item in initBlackCustomerlist">
                        <td @click.stop="">
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                        </td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.ctime|timeFilters}}</td>
                        <td>{{item.lastOrderTime|timeFilters}}</td>
                        <td class="underline" @click="clickOn({
                      id:item.id,
                      sub:$index,
                      show:true,
                      loading:true,
                      creditLevel:item.creditLevel,
                      name:item.name,
                      link:alterInfo,
                      url:'/customer/',
                      key:'blackCustomerList'
                      })">{{item.name}}
                        </td>
                        <td>{{item.orderTotal}}</td>
                        <td>{{item.type | customerType}}</td>
                        <td>{{item.mainContact}}</td>
                        <td>{{item.mainPhone}}</td>
                        <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
                        <td>{{item.provinceName}}{{item.cityName}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.bizScope}}</td>
                        <td>{{item.blackComments}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import pagination from '../../../components/pagination'
import detailModel from '../../../components/clientRelate/clientDetail'
import searchModel from '../../../components/clientRelate/searchModel'
import tipsdialogModel from '../../../components/tipsDialog'
import setBlacklist from '../setBlacklist.vue'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initBlackCustomerlist
} from '../../../vuex/getters'
import {
    getClientList,
    customerTransferBlacklist

} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        detailModel,
        tipsdialogModel,
        searchModel,
        setBlacklist,
        mglistModel
    },
    vuex: {
        getters: {
            initBlackCustomerlist
        },
        actions: {
            getClientList,
            customerTransferBlacklist
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
                all: 7,
                link: '/customer/',
                key: 'blackCustomerList',
                name: '',
                phone: '',
                employeeId: '',
                employeeName: '',
                type: '',
                classify: '',
                status: '',
                bizScope: '',
                provinceName: '',
                province: '',
                city: '',
                cityName: '',
                blacklist: 1,
                total: 0
            },
            searchParam: {
                show: false,
            },
            tipsParam: {
                show: false,
                name: '请先选择客户'
            },
            changeParam: {
                show: false,
                loading: true
            },
            blacklistParam: {
                show: false
            },
            checked: false
        }
    },
    methods: {
        clickOn: function(param) {
            this.changeParam = param;
        },

        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.blackCustomerList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.blackCustomerList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        onlyselected: function(sub, id) {

            const _this = this;
            this.$store.state.table.basicBaseList.blackCustomerList[sub].checked = !this.$store.state.table.basicBaseList.blackCustomerList[sub].checked;
            if (!this.$store.state.table.basicBaseList.blackCustomerList[sub].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.basicBaseList.blackCustomerList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        searchClient: function() {
            this.getClientList(this.loadParam)
        },

        //客户移出黑名单
        clientTransferWhite: function() {
            this.blacklistParam.title = "移出黑名单";
            this.blacklistParam.link = '/customer/transferBlacklist';
            this.blacklistParam.customerIds = [];
            for (var i in this.initBlackCustomerlist) {
                if (this.initBlackCustomerlist[i].checked) {
                    this.blacklistParam.customerIds.push(this.initBlackCustomerlist[i].id);
                }
            }
            if (this.blacklistParam.customerIds.length > 0) {
                this.blacklistParam.show = true;
                this.blacklistParam.blacklist = 0;
                this.blacklistParam.callback = this.blacklistCallback;
            } else {
                this.showTips('请先选择客户');
            }
        },
        blacklistCallback: function(name) {
            this.blacklistParam.show = false;
            this.showTips(name);
            this.selectSearch();
        },
        selectSearch: function() {
            this.getClientList(this.loadParam);
        },
        showTips: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getClientList(this.loadParam);
        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getClientList, this.loadParam, localStorage.blackClientParam);
    },
    filters: {
        timeFilters: function(mytime) {
            // debugger;
            return mytime ? mytime.substring(0, 10) : '';
        }
    }
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-left: 18px;
}

.table>tbody>tr>td {
    max-width: 400px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break:break-all; */
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

#table_box table th,
#table_box table td {
    width: 122px;
    min-width: 122px;
}
</style>

<template>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">客户名：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:50px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>
                <dd class="pull-right" style="margin-right:10px">
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
                        <th>客户名称</th>
                        <th>客户手机</th>
                        <th>业务员</th>
                        <th>发布日期</th>
                        <th>过期时间</th>
                        <th>采购单来源</th>
                        <th>采购内容描述</th>
                        <th>备注</th>
                        <th>询价状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initPurchaseOfferList">
                        <td>
                            <a class="underline" @click.stop="detailClick(item.id,item.customerId)">{{item.customerName}}</a>
                        </td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.pubdate}}</td>
                        <td>{{item.duedate}}</td>
                        <td>{{item.source | indentSource}}</td>
                        <td>{{item.buyDesc}}</td>
                        <td>{{item.comment}}</td>
                        <td>{{item.inquire | inquire}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import detailModel from '../purchaseOfferDetail.vue'
import tipsdialogModel from '../../tips/tipDialog'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initPurchaseOfferList
} from '../../../vuex/getters'
import {
    getPurchaseOrderList
} from '../../../vuex/actions'
export default {
    components: {
        detailModel,
        tipsdialogModel,
        pagination,
        mglistModel
    },
    vuex: {
        getters: {
            initPurchaseOfferList
        },
        actions: {
            getPurchaseOrderList
        }
    },
    data() {
        return {
            loadParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: "",
                link: '/indent/queryOfferList',
                key: 'purchaseOfferList'

            },


            detailParam: {
                show: false,
                loading: false,
                link: "/indent/queryById",
                id: "",
                customerId: ""
            },

            tipsParam: {
                show: false,
                name: '',
                alert: true
            },

            checked: false
        }
    },
    methods: {
        selectSearch: function() {
            this.getPurchaseOrderList(this.loadParam);
        },
        detailClick: function(id, customerId) {
            this.detailParam.id = id;
            this.detailParam.customerId = customerId;
            this.detailParam.show = true;
        },
        callback: function(name) { //如无特殊情况，统一使用这个函数作为回调函数
            this.tipsParam.name = name;
            this.tipsParam.show = true;
            this.getPurchaseOrderList(this.loadParam);
        }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getPurchaseOrderList(this.loadParam);
        }
    },
    created() {
        this.getPurchaseOrderList(this.loadParam);
        //changeMenu(this.$store.state.table.isTop, this.getIntentionList, this.loadParam, localStorage.myIntentionParam);

    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.edit-model {
    padding: 10px 30px 80px 30px;
}

.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-right: 8px;
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
    width: 143px;
    min-width: 143px;
}

.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}
</style>

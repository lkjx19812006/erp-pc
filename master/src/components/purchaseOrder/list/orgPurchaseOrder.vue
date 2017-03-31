<template>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <delete-model :param="deleteParam" v-if="deleteParam.show"></delete-model>
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
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th style="min-width:200px;text-align: left;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOrgPurchaseList">
                        <td></td>
                        <td>
                            <a class="underline" @click.stop="detailClick()">详情</a>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style="text-align: left">
                            <a class="operate" @click.stop="deletePurchase()"><img src="/static/images/del.png" height="18" width="28" alt="删除" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import detailModel from '../purchaseOrderDetail.vue'
import deleteModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initOrgPurchaseList
} from '../../../vuex/getters'
import {

} from '../../../vuex/actions'
export default {
    components: {
        detailModel,
        deleteModel,
        pagination,
        mglistModel
    },
    vuex: {
        getters: {
            initOrgPurchaseList
        },
        actions: {

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
                link: '/intention/employee/list',
                key: 'myIntentionList'

            },
            detailParam: {
                show: false,
                loading: false
            },
            deleteParam: {
                show: false,
                link: '', //删除的接口地址


            }
        }
    },
    methods: {

        detailClick: function() {
            this.detailParam.show = true;
        },
        deletePurchase: function() {
            this.deleteParam.show = true;
        }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            //this.getIntentionList(this.loadParam);
        }
    },
    created() {
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
    width: 121px;
    min-width: 110px;
}

.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}
</style>

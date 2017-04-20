<template>
    <breed-detail-model :param="breedDetailParam" v-if="breedDetailParam.show"></breed-detail-model>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clearfix">
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="留言会员名称" v-model="loadParam.fullName" @keyup.enter="searchMsg()">
                </div>
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" v-model="loadParam.phone" placeholder="按会员手机" @keyup.enter="searchMsg()">
                </div>
                <button class="new_btn pull-left" @click="searchMsg()">搜索</button>
                <button class="btn  btn-primary pull-right transfer" @click="searchMsg()">刷新</button>
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
                        <th>留言时间</th>
                        <th>预售产品</th>
                        <th>规格</th>
                        <th>出口国</th>
                        <th>预售价格</th>
                        <th>到港时间</th>
                        <th>会员名</th>
                        <th>手机号</th>
                        <th>归属业务员</th>
                        <th>要求</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initPreSellMsgList">
                        <td>{{item.ctime}}</td>
                        <td class="underline" @click="editBreed(item.breedId)">{{item.breedName}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.arriveTime}}</td>
                        <td>{{item.fullname}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.content}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import editmsgModel from '../editMsg'
import tipsModel from '../../tips/tipDialog'
import breedDetailModel from '../../serviceBaselist/breeddetail'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initPreSellMsgList
} from '../../../vuex/getters'
import {
    getMsgList,
    getUserDetail,
    getBreedDetail
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        editmsgModel,
        breedDetailModel,
        tipsModel,
        mglistModel
    },
    vuex: {
        getters: {
            initPreSellMsgList
        },
        actions: {
            getMsgList,
            getUserDetail,
            getBreedDetail
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
                key: 'preSellMsgList',
                type: 1,
                fullName: '',
                phone: '',
                total: 0
            },
            breedDetailParam: {
                show: false,
                link: '/details/',
                id: ''
            },
            tipsParam: {
                name: '',
                show: false,
                alert: true
            },
        }
    },
    methods: {
        searchMsg: function() {
            this.getMsgList(this.loadParam);
        },

        editBreed: function(id) {
            this.breedDetailParam.show = true;
            this.breedDetailParam.id = id;
            this.getBreedDetail(this.breedDetailParam);
        },
        callback: function(title) {
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getMsgList(this.loadParam);
        }
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getMsgList, this.loadParam, localStorage.preSellMsgParam);
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.service-nav {
    padding: 35px 0px 10px 40px;
}

.name_search {
    float: left;
    margin-right: 20px;
}

.my_enterprise {
    padding: 6px;
}

.transfer {
    margin-right: 18px;
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
    width: 170px;
    min-width: 170px;
}
</style>

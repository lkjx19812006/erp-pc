<template>
    <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div class="service-nav clearfix">
        <div class="my_enterprise col-xs-2">提取物</div>
        <div class="name_search clearfix">
            <img src="/static/images/search.png" height="24" width="24">
            <input type="text" class="search_input" placeholder="按名称搜索">
        </div>
    </div>
    <div class="order_table">
        <table class="table table-hover table_color table-striped" v-cloak>
            <thead>
                <tr>
                    <th>中文名</th>
                    <th>联系人</th>
                    <th>联系方式</th>
                    <th>公司名称</th>
                    <th>主要成分</th>
                    <th>email</th>
                    <th>创建时间</th>
                </tr>
            </thead>
            <thead class="space">
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initDrawlist">
                    <td>{{item.name}}</td>
                    <td>{{item.contactsName}}</td>
                    <td>{{item.contactsPhone}}</td>
                    <td>{{item.company}}</td>
                    <td>{{item.mainProducts}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.ctime}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="base_pagination">
        <pagination :combination="loadParam"></pagination>
    </div>
</template>
<script>
import pagination from '../../components/pagination'
import filter from '../../filters/filters'	
import {
    initDrawlist
} from '../../vuex/getters'
import {
    getDrawData
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        filter
    },
    vuex: {
        getters: {
            initDrawlist
        },
        actions: {
            getDrawData
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
        }
    },
    created() {
        this.getDrawData(this.loadParam, this.loadParam.all)
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getDrawData(this.loadParam);
        }
    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
        }
    },
    filter: (filter, {})
}
</script>

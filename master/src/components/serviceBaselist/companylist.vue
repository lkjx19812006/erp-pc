<template>
    <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div class="service-nav clearfix">
        <div class="my_enterprise col-xs-2">企业</div>
    </div>
    <div class="order_table" v-cloak>
        <table class="table table-hover table_color">
            <thead>
                <tr>
                    <th>编 码</th>
                    <th>分类码</th>
                    <th>企业名称</th>
                    <th>电 话</th>
                    <th>法定代表人</th>
                    <th>企业代表人</th>
                    <th>生产范围</th>
                    <th>所在省</th>
                    <th>所在市</th>
                    <th>注册地址</th>
                    <th>发证日期</th>
                    <th>有效截止日</th>
                    <th></th>
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
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initEnterpriselist">
                    <td>{{item.number}}</td>
                    <td>{{item.category | categorystate}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.tel | telstate}}</td>
                    <td>{{item.legalPerson}}</td>
                    <td>{{item.principal}}</td>
                    <td>{{item.bizScope}}</td>
                    <td>{{item.province}}</td>
                    <td>{{item.city}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.ctime}}</td>
                    <td>{{item.utime}}</td>
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
    initEnterpriselist
} from '../../vuex/getters'
import {
    getEnterpriseData
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        filter
    },
    vuex: {
        getters: {
            initEnterpriselist
        },
        actions: {
            getEnterpriseData
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 8
            },
        }
    },
    created() {
        this.getEnterpriseData(this.loadParam, this.loadParam.all)
    },
    methods: {

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEnterpriseData(this.loadParam);
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
<style scoped>
	
</style>
<template>
    <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div class="service-nav clearfix">
        <div class="my_enterprise col-xs-2">提取物</div>
    </div>
    <div class="order_table">
        <table class="table table-hover table_color" v-cloak>
            <thead>
                <tr>
                    <th>中文名</th>
                    <th>英文名</th>
                    <th>拉丁文名</th>
                    <th>有效成分和别名</th>
                    <th>常用比例</th>
                    <th>客户名称</th>
                    <th>产地</th>
                    <th>规格</th>
                    <th>采购价格</th>
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
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initDrawlist">
                    <td>{{item.name}}</td>
                    <td>{{item.drawenglish}}</td>
                    <td>{{item.drawlatin}}</td>
                    <td>{{item.drawactive}}</td>
                    <td>{{item.drawratio}}</td>
                    <td>{{item.contactsName}}</td>
                    <td>{{item.drawproduct}}</td>
                    <td>{{item.drawspec}}</td>
                    <td>{{item.drawprice}}</td>
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

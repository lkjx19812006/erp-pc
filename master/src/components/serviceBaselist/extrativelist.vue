<template>

    <div class="service-nav clearfix">
        <div class="my_enterprise col-xs-1">提取物</div>
        <div>
            <div class="name_search clearfix">
                <img src="/static/images/search.png" height="24" width="24">
                <input type="text" class="search_input" placeholder="按名称搜索" v-model="loadParam.name" @keyup.enter="categoryNameSearch()">
            </div>
            <div class="name_search clearfix">
                <img src="/static/images/search.png" height="24" width="24">
                <input type="text" class="search_input" placeholder="按公司名称搜索" v-model="loadParam.company" @keyup.enter="categoryNameSearch()">
            </div>
            <div class="name_search clearfix" style="border:none">
                <button class="new_btn" style="height: 30px;padding: 0 10px;" @click="categoryNameSearch()">搜索</button>
                <button class="new_btn" style="height: 30px;padding: 0 10px;margin-right:10px;" @click="reset()">清空条件</button>
            </div>
       </div>
    </div>
    <div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <table class="table table-hover table_color table-striped" v-cloak>
            <thead>
                <tr>
                    <th>中文名</th>
                    <th>联系人</th>
                    <th>联系方式</th>
                    <th>公司名称</th>
                    <th>邮箱</th>
                    <th>主要成分</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initDrawlist">
                    <td>{{item.name}}</td>
                    <td>{{item.contactsName}}</td>
                    <td>{{item.contactsPhone}}</td>
                    <td>{{item.company}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.mainProducts}}</td>
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
                all: 7,
                name:'',
                company:'',
                total:0
            },
        }
    },
    created() {
        this.getDrawData(this.loadParam)
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
    filter: (filter, {}),
    methods:{
        categoryNameSearch:function(){
            this.getDrawData(this.loadParam);
        },
        reset:function(){
            this.loadParam.name='';
            this.loadParam.company='';
            this.getDrawData(this.loadParam)
        }
    }
}
</script>
<style scoped>
.name_search{
    margin-right: 3%;
}
</style>

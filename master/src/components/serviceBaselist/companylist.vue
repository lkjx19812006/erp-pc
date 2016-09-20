<template>
   <detail-model  :param="companyParam" v-if="companyParam.show"></detail-model>
    <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div v-show="!companyParam.show">
    <form>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">企业</div>
            <div class="col-xs-9 my_order_search">
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按企业名称搜索" v-model="loadParam.conName" >
                </div>
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按企业类型搜索" v-model="loadParam.conType" >
                </div>
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按所在省搜索" v-model="loadParam.conProvince">
                </div>
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按分类码搜索"v-model="loadParam.category"/>
                </div>
            </div>
            <div class=" col-xs-2">
                <a class="new_btn transfer" @click="multiSearch(loadParam.conName,loadParam.conType,loadParam.conProvince,loadParam.category)">查询</a>
            </div>
        </div>
        <div class="order_table" v-cloak>
            <table class="table table-hover table_color table-striped">
                <thead>
                    <tr>
                        <th>分类码</th>
                        <th>类型</th>
                        <th>企业名称</th>
                        <th>电 话</th>
                        <th>企业代表人</th>
                        <th>生产范围</th>
                        <th>所在省</th>
                        <th>所在市</th>
                        <th>注册地址</th>
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
                    <tr v-for="item in initEnterpriselist">
                        <td>{{item.category | categorystate}}</td>
                        <td>{{item.type}}</td>
                        <td  class="underline"  @click="companyDetail(item.id)">{{item.name}}</td>
                        <td>{{item.tel | telstate}}</td>
                        <td>{{item.principal}}</td>
                        <td>{{item.bizScope}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.address}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
</template>
<script>
import pagination from '../../components/pagination'
import filter from '../../filters/filters'
import detailModel  from '../serviceBaselist/companydetail'
import {
    initEnterpriselist
} from '../../vuex/getters'
import {
    getEnterpriseData,
    getCompanyDetail,
    getCompanyData
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        filter,
        detailModel
    },
    vuex: {
        getters: {
            initEnterpriselist
        },
        actions: {
            getEnterpriseData,
            getCompanyDetail,
            getCompanyData
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 8,
                conName:'',
                conType:'',
                conProvince:'',
                category:''
            },
            companyParam:{
                id:'',
                show:false
            }
        }
    },
    created() {
        this.getEnterpriseData(this.loadParam, this.loadParam.all)
    },
    methods: {
        companyDetail:function(id){
            this.companyParam.show = true;
            this.companyParam.id = id;
            this.getCompanyDetail(this.companyParam);
        },
        multiSearch:function(conName,conType,conProvince,category){
            this.getCompanyData(this.loadParam, this.loadParam.all);
        }
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
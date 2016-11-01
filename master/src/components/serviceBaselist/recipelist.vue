<template>
    <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">成分</div>
            <div class="col-xs-4 my_order_search">
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按药品名称搜索" v-model="loadParam.name" >
                </div>
                 <a class="new_btn transfer"  @click="multiSearch()">查询</a>
            </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped" v-cloak>
                <thead>
                    <tr>
                        <th>编 码</th>
                        <th>药品名称</th>
                        <th>品种名称</th>
                        <th>含 量</th>
                        <th>单 位</th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initConponentlist">
                        <td>{{item.code | codestate}}</td>
                        <td class="underline" @click="clickRecipe({
                            id:item.id,
                            code:item.code,
                            name:item.name,
                            breedName:item.breedName,
                            companyName:item.companyName,
                            quantity:item.quantity,
                            unit:item.unit,
                            status:item.status,
                            show:true,
                            loading:true
                            })">{{item.name}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.unit}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
</template>
<script type="text/javascript">
import pagination from '../../components/pagination'
import filter from '../../filters/filters'
import detailModel from '../serviceBaselist/recipeDetail'
import {
    initConponentlist
} from '../../vuex/getters'
import {
    getComponentData
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        filter,
        detailModel
    },
    vuex: {
        getters: {
            initConponentlist
        },
        actions: {
            getComponentData
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
                name:''
            },
            changeParam: {
                show: false
            }
        }
    },
    created() {
        this.getComponentData(this.loadParam)
    },
    methods: {
        clickRecipe:function(initConponentlist){
            this.changeParam=initConponentlist;
        },
        multiSearch:function(){
            this.getComponentData(this.loadParam)
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getComponentData(this.loadParam);
        }
    },
    filter: (filter, {})
}
</script>
<style scoped>
.name_search{
    float:left;
    line-height: 28px;
    margin-right:0;
}
</style>

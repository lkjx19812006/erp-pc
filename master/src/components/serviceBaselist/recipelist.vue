<template>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <div v-show="!changeParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">成分</div>
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
                        <th>公司名称</th>
                        <th>含 量</th>
                        <th>单 位</th>
                        <th>状态</th>
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
                    <tr v-for="item in initConponentlist"  @click="clickRecipe(item.id)">
                        <td>{{item.code}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.companyName | companyname}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.unit}}</td>
                        <td>{{item.status}}</td>
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
    getComponentData,
    getRecipeDetail
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
            getComponentData,
            getRecipeDetail
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
            changeParam: {
                show: false,
                id: ''
            }
        }
    },
    created() {
        this.getComponentData(this.loadParam, this.loadParam.all)
    },
    methods: {
        clickRecipe:function(id){
            this.changeParam.show = true;
            this.changeParam.id = id;
            this.getRecipeDetail(this.changeParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getComponentData(this.loadParam);
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

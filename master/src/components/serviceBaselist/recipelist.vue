<template>
    <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
    <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
            <div class="right">
                 <button class="btn btn-primary transfer"  @click="multiSearch()">刷新</button>
            </div>
            <div class="left my_order_search"  style="margin-bottom: 10px;">
                <div class="name_search clearfix transfer">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按药品名称搜索" v-model="loadParam.name" @keyup.enter="multiSearch()">
                </div>
                 <button class="new_btn"  @click="reset()">清空条件</button>
                 <button class="new_btn transfer"  @click="multiSearch()">搜索</button>
            </div>
        </div>
        <!-- 中间列表 -->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped" v-cloak id="tab">
                <thead>
                    <tr>
                        <!-- <th>编 码</th> -->
                        <th>药品名称</th>
                        <th>品种名称</th>
                        <th>含 量</th>
                        <th>单 位</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initConponentlist">
                        <!-- <td>{{item.code | codestate}}</td> -->
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
         <!-- 底部分页 -->
        <pagination :combination="loadParam"  slot="page"></pagination>
    </mglist-model>
    <!-- <div>
        <div class="service-nav clearfix" id="top">
            
        </div>
        <div class="order_table" id="table_box">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            
        </div>
        <div class="base_pagination" id="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div> -->
</template>
<script type="text/javascript">
import pagination from '../../components/pagination'
import filter from '../../filters/filters'
import detailModel from '../serviceBaselist/recipeDetail'
import common from '../../common/common'
import mglistModel from '../mguan/mgListComponent.vue'
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
        mglistModel,
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
                name:'',
                total:0
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
        },
        reset:function(){
            this.loadParam.name='';
            this.getComponentData(this.loadParam)
        }
    },
     ready(){
      common('tab','table_box',1);
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
.transfer{
    margin-right: 10px;
    cursor: pointer;
}
 #table_box  table th,#table_box  table td{
    width: 428px;
    min-width: 428px;
}
</style>

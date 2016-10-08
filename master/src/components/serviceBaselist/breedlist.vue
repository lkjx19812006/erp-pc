<template>
    <breed-model :param="breedParam" v-if="breedParam.show"></breed-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <breedrevise-model :param="reviseParam" v-if="reviseParam.show"></breedrevise-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <div v-show="!changeParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">品种</div>
            <div class="col-xs-4 my_order_search">
                <div class="ordertel_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="按品种名称搜索" @keyup.enter="categoryNameSearch(loadParam.name)">
                </div>
                <button class="new_btn" @click="categoryNameSearch()">搜索</button>
            </div>
            <div class="right col-xs-1">
                <button class="new_btn" @click="createBreed('create')">新建</button>
            </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped" v-cloak>
                <thead>
                    <tr>
                        <th>编码</th>
                        <th>品种名称</th>
                        <th>品种类别</th>
                        <th>拼音</th>
                        <th>英文</th>
                        <th>拉丁文</th>
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initBreedlist">
                        <td>{{item.code | breedcode}}</td>
                        <td  class="underline"  @click="editBreed(item.id)">{{item.name}}</td>
                        <td>{{item.categoryId}}</td>
                        <td>{{item.pinyin}}</td>
                        <td>{{item.eName}}</td>
                        <td>{{item.lName}}</td>
                        <td @click.stop="breedClick($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="breed_action" v-show="item.show">
                                <ul>
                                    <li @click="modifyBreed($index,item)">编辑</li>
                                    <li @click="specDelete({
                                        id:item.id,
                                        sub:$index,
                                        show:true,
                                        name:item.name,
                                        title:'药材',
                                        link:deleteInfo,
                                        url:'/breed/',
                                        key:'breedList'
                                        },item.show=false)">删除</li>
                                </ul>
                            </div>
                        </td>
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
import pressImage from '../../components/imagePress'
import filter from '../../filters/filters'
import breedModel from '../../components/serviceBaseData/createBreedDialog'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import breedreviseModel from '../../components/serviceBaseData/breedUpdate'
import detailModel from '../../components/serviceBaselist/breeddetail'
import {
    initBreedlist,
} from '../../vuex/getters'
import {
    getBreedData,
    getBreedNameSearch,
    getBreedDetail,
    deleteInfo
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        pressImage,
        breedModel,
        deletebreedModel,
        breedreviseModel,
        filter,
        detailModel
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
            breedParam: {
                show: false,
                name: ''
            },
            reviseParam: {
                show: false,
                id: ''
            },
            deleteParam: {
                show: false,
                id: ''
            },
            changeParam: {
                show: false,
                id: ''
            },
            breedBaseData: this.initBreedlist
        }
    },
    vuex: {
        getters: {
            initBreedlist
        },
        actions: {
            getBreedData,
            getBreedNameSearch,
            getBreedDetail,
            deleteInfo
        }
    },
    created() {
        this.getBreedData(this.loadParam, this.loadParam.all);
    },
    methods: {
        categoryNameSearch: function() {
            this.getBreedNameSearch(this.loadParam, this.loadParam.all);
        },
        createBreed: function(value) {
            this.breedParam.show = true;
            this.breedParam.name = value;
        },
        breedClick: function(id) {
            console.log(id);
            console.log(this.$store.state.table.basicBaseList.breedList[id]);
            if (this.$store.state.table.basicBaseList.breedList[id].show) {
                this.$store.state.table.basicBaseList.breedList[id].show = !this.$store.state.table.basicBaseList.breedList[id].show;
            } else {
                this.$store.state.table.basicBaseList.breedList[id].show = true;
            }
        },
        editBreed: function(id) {
            this.changeParam.show = true;
            this.changeParam.id = id;
            this.getBreedDetail(this.changeParam);
        },
        specDelete:function(initBreedlist){
            this.deleteParam = initBreedlist;
        },
        modifyBreed: function(id) {
            this.reviseParam.id = id;
            this.reviseParam.show = true;
            this.reviseshow = false;
            this.$broadcast('getParam');
            if (this.$store.state.table.basicBaseList.breedList[id].show == true) {
                this.$store.state.table.basicBaseList.breedList[id].show = !this.$store.state.table.basicBaseList.breedList[id].show;
            }
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getBreedData(this.loadParam);
        }
    },
    filter: (filter, {})
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right:50px;
}
.transfer{
    margin-left: 18px;
}
</style>

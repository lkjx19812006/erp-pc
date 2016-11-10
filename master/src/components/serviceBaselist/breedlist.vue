<template>
    <breed-model :param="breedParam" v-if="breedParam.show"></breed-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <breedrevise-model :param="reviseParam" v-if="reviseParam.show"></breedrevise-model>
    <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">品种</div>
            <div class="col-xs-9 my_order_search">
               <div class="ordertel_search clearfix" style="border:none; float:left;width:180px" >

                <select class="form-control" v-model="loadParam.categoryId" @change="categoryNameSearch()">
                  <option value="" selected>按品种分类搜索</option>
                  <option  v-for="item in initCategorylist" value="{{item.id}}">{{item.name}}</option>
                </select>
              </div>
              <div class="ordertel_search clearfix">
                <img src="/static/images/search.png" height="24" width="24">
                <input type="text" style='float:left;' class="search_input" v-model="loadParam.name" placeholder="按品种名称搜索" @keyup.enter="categoryNameSearch()">
              </div>
              <div class="ordertel_search clearfix" style='border:0;'>
                  <button class="new_btn" @click="categoryNameSearch()">搜索</button>
                  <button text="button" class="new_btn transfer" @click="reset()">清空条件</button>
              </div>
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
                        <th>操作</th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th colspan="7"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initBreedlist">
                        <td>{{item.code | breedcode}}</td>
                        <td  class="underline"  @click="editBreed(item.id)">{{item.name}}</td>
                        <td v-if="breedCategory[item.categoryId]">{{breedCategory[item.categoryId]}}</td>
                        <td v-if="!breedCategory[item.categoryId]">其它类</td>
                        <td>{{item.pinyin}}</td>
                        <td>{{item.eName}}</td>
                        <td>{{item.lName}}</td>
                        <td @click="item.show=false,modifyBreed($index,item)">
                          <a class="operate"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
                            <!-- <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="breed_action" v-show="item.show">
                                <ul>
                                    <li @click="item.show=false,modifyBreed($index,item)">编辑</li>
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
                            </div> -->
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
<script>
import pagination from '../../components/pagination'
import pressImage from '../../components/imagePress'
import filter from '../../filters/filters'
import breedModel from '../../components/serviceBaseData/createBreedDialog'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import breedreviseModel from '../../components/serviceBaseData/breedUpdate'
import detailModel from '../../components/serviceBaselist/breeddetail'
import {
    initBreedlist,
  initCategorylist
} from '../../vuex/getters'
import {
    getBreedData,
    getBreedNameSearch,
    getBreedDetail,
    deleteInfo,
  getCategoryData
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
                all: 7,
               categoryId:'',
               name:'',
              total:0
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
            breedCategory:{
              800:"药材和饮片",
              810:'全草类',
              811:'花类',
              812:'果实籽仁类',
              813:'根茎类',
              814:'叶类',
              815:'树皮类',
              816:'藤木类',
              817:'树脂类',
              818:'菌藻类',
              819:'动物类',
              820:'矿物类',
              900:'提取物和植物油脂类',
              901:'ww'
            },
            changeParam: {
                show: false,
                id: ''
            }

        }
    },
    vuex: {
        getters: {
            initBreedlist,
          initCategorylist
        },
        actions: {
            getBreedData,
            getBreedNameSearch,
            getBreedDetail,
            deleteInfo,
          getCategoryData
        }
    },
    methods: {
        reset:function(){
            this.loadParam.name='';
            this.loadParam.categoryId='';
            this.getBreedData(this.loadParam)
        },
        categoryNameSearch: function() {
            this.getBreedNameSearch(this.loadParam);
        },
        createBreed: function(value) {
            this.breedParam.show = true;
            this.breedParam.name = value;
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
        },
      eventClick:function(sub){

        this.$store.state.table.basicBaseList.breedList[sub].show=!this.$store.state.table.basicBaseList.breedList[sub].show;
      }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            console.log(this.loadParam);
            this.getBreedNameSearch(this.loadParam);
        }
    },
    filter: (filter, {}),
    created() {
        this.getBreedData(this.loadParam);
        this.getCategoryData();
    }
}
</script>
<style scoped>

.ordertel_search > .new_btn{
    height: 30px;
    padding:0 10px;
}
.breed_action {
    top: 33px;
    right:50px;
}
.transfer{
    margin-right: 10px;
}
.ordertel_search{
  margin-right:3%;
}
.form-control{
    height:29px;
    line-height:10px;
    position:absolute;
    padding:3px 14px;
    margin-top:0px;
}
</style>

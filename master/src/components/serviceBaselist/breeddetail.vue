<template>
    <createspec-model :param="specParam" v-if="specParam.show"></createspec-model>
    <updatebreed-model :param="breedlistParam" v-if="breedlistParam.show"></updatebreed-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <div class="breed_detail">
      <div class="cover_loading" v-if="param.id!=initBreedDetail.id">
        <pulse-loader :loading="true" :color="color" :size="size"></pulse-loader>
      </div>
    <div class="client-section clearfix" v-cloak>
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="col-md-8 client-detail">
            <h4 class="section_title">药材相关</h4>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-heading clearfix" @click="specsToggle({
                            link:initBreedDetail.specs,
                            crete:'specs'
                            })">
                        <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/spec.png" height="26" width="26" />
                                <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                    规格({{initBreedDetail.specs.arr.length}})
                                </a>
                                <button type="button" class="btn btn-base pull-right" @click.stop="createFormt({
                                     id:param.id,
                                     title:'规格',
                                     show:true,
                                     name:'',
                                     namelist:'规格名称',
                                     link:createSpec,
                                     url:'/spec/',
                                     key:'specs'
                                     })">新建</button>
                            </h4>
                    </div>
                    <div class="panel-collapse" v-show="initBreedDetail.specs.show">
                        <div class="panel-body panel-set">
                            <ul class="clearfix" v-for="item in initBreedDetail.specs.arr">
                                <li class="panel-name">
                                    <label>规格名称：{{item.name}}</label>
                                </li>
                                <li @click="clickShow($index,{
                                        concrete:'specs'
                                        })">
                                    <img src="/static/images/default_arrow.png" height="24" width="24" />
                                    <div class="breed_action" v-show="item.show" transition="expand">
                                        <dl>
                                            <dt @click="updateSpec({
                                                    sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    title:'规格',
                                                    namelist:'规格名称',
                                                    name:item.name,
                                                    link:alterSpec,
                                                    url:'/spec/',
                                                    key:'specs',
                                                    breedId:item.breedId
                                                    },item.show=false)">编辑</dt>
                                            <dt @click="specDelete({
                                                    sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    name:item.name,
                                                    title:'规格',
                                                    link:specDel,
                                                    url:'/breed/spec/',
                                                    key:'specs',
                                                    headline:'breedDetail'
                                                    },item.show=false)">删除</dt>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading clearfix" @click="specsToggle({
                            link:initBreedDetail.locals,
                            crete:'locals'
                            })">
                        <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/product.png" height="27" width="27" style="margin-top:4px;" />
                                <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                    产地({{initBreedDetail.locals.arr.length}})
                                </a>
                                <button type="button" class="btn btn-base pull-right" @click.stop="createFormt({
                                     id:param.id,
                                     title:'产地',
                                     show:true,
                                     name:'',
                                     namelist:'产地名称',
                                     link:createSpec,
                                     url:'/local/',
                                     key:'locals'
                                     })">新建</button>
                        </h4>
                    </div>

                        <div class="panel-collapse" v-show="!initBreedDetail.locals.show">
                            <div class="panel-body panel-set">
                                <ul class="clearfix" v-for="item in initBreedDetail.locals.arr" v-cloak>
                                    <li class="panel-name">
                                        <label>产地名称：{{item.name}}</label>
                                    </li>
                                    <li @click="clickShow($index,{
                                        concrete:'locals'
                                        })">
                                        <img src="/static/images/default_arrow.png" height="24" width="24" />
                                        <div class="breed_action" v-show="item.show" transition="expand">
                                            <dl>
                                                <dt @click="updateSpec({
                                                     sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    title:'产地',
                                                    namelist:'产地名称',
                                                    name:item.name,
                                                    link:alterSpec,
                                                    url:'/local/',
                                                    key:'locals',
                                                    breedId:item.breedId
                                                    },item.show=false)">编辑</dt>
                                                <dt @click="specDelete({
                                                    sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    name:item.name,
                                                    title:'产地',
                                                    link:specDel,
                                                    url:'/breed/local/',
                                                    key:'locals',
                                                     headline:'breedDetail'
                                                    },item.show=false)">删除</dt>
                                            </dl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title clearfix" @click="specsToggle({
                                link:initBreedDetail.alias,
                                crete:'alias'
                                })">
                                <img class="pull-left" src="/static/images/alias.png" height="30" width="26"  />
                                <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                    别名({{initBreedDetail.alias.arr.length}})
                                </a>
                                <button type="button" class="btn btn-base pull-right" @click.stop="createFormt({
                                     id:param.id,
                                     title:'别名',
                                     show:true,
                                     alias:'',
                                     namelist:'别名名称',
                                     link:saveAlias,
                                     url:'/alias/',
                                     key:'alias'
                                     })">新建</button>
                            </h4>
                        </div>
                        <div  class="panel-collapse collapse in" v-show="!initBreedDetail.alias.show">
                            <div class="panel-body panel-set">
                                <ul class="clearfix" v-for="item in initBreedDetail.alias.arr" v-cloak>
                                    <li class="panel-name">
                                        <label>别名：{{item.alias}}</label>
                                    </li>
                                    <li @click="clickShow($index,{
                                        concrete:'alias'
                                        })">
                                        <img src="/static/images/default_arrow.png" height="24" width="24" />
                                        <div class="breed_action" v-show="item.show" transition="expand">
                                            <dl>
                                                <dt @click="updateSpec({
                                                    sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    title:'别名',
                                                    namelist:'别名',
                                                    name:item.alias,
                                                    link:alterAlias,
                                                    url:'/alias/',
                                                    key:'alias',
                                                    breedId:item.breedId
                                                    },item.show=false)">编辑</dt>
                                                <dt @click="specDelete({
                                                     sub:$index,
                                                     id:item.id,
                                                    show:true,
                                                    name:item.alias,
                                                    title:'别名',
                                                    link:specDel,
                                                    url:'/breed/alias/',
                                                    key:'alias',
                                                     headline:'breedDetail'
                                                    },item.show=false)">删除</dt>
                                            </dl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title clearfix" @click="specsToggle({
                                link:initBreedDetail.units,
                                crete:'units'
                                })">
                                <img class="pull-left" src="/static/images/unit.png" height="31" width="26"  />
                                <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                    单位({{initBreedDetail.units.arr.length}})
                                </a>
                                <button type="button" class="btn btn-base pull-right" @click.stop="createFormt({
                                     id:param.id,
                                     title:'单位',
                                     show:true,
                                     name:'',
                                     namelist:'单位名称',
                                     link:createSpec,
                                     url:'/unit/',
                                     key:'units'
                                     })">新建</button>
                            </h4>
                        </div>
                        <div  class="panel-collapse" v-show="!initBreedDetail.units.show">
                            <div class="panel-body panel-set">
                                <ul class="clearfix" v-for="item in initBreedDetail.units.arr" v-cloak>
                                    <li class="panel-name">
                                        <label>单位名称：{{item.name}}</label>
                                    </li>

                                    <li @click="clickShow($index,{
                                        concrete:'units'
                                        })">
                                        <img src="/static/images/default_arrow.png" height="24" width="24" />
                                        <div class="breed_action" v-show="item.show" transition="expand">
                                            <dl>
                                                <dt @click="updateSpec({
                                                     sub:$index,
                                                    id:item.id,
                                                    breedId:item.breedId,
                                                    show:true,
                                                    title:'单位',
                                                    namelist:'单位名称',
                                                    name:item.name,
                                                    link:alterSpec,
                                                    url:'/unit/',
                                                    key:'units',
                                                    breedId:item.breedId
                                                    },item.show=false)">编辑</dt>
                                                <dt @click="specDelete({
                                                    sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    name:item.name,
                                                    title:'单位',
                                                    link:specDel,
                                                    url:'/breed/unit/',
                                                    key:'units',
                                                     headline:'breedDetail'
                                                    },item.show=false)">删除</dt>
                                            </dl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <h4 class="section_title">详情</h4>
                <div class="edit-detail clearfix">
                    <div class="client-detailInfo col-xs-12">
                        <label>编号</label>
                        <input type="text" class="form-control"  value="{{initBreedDetail.code}}" disabled="disabled" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种名称</label>
                        <input type="text" class="form-control" value="{{initBreedDetail.name}}" disabled="disabled" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种分类选择</label>
                      <input v-if="breedCategory[initBreedDetail.categoryId]" type="text" class="form-control" value="{{breedCategory[initBreedDetail.categoryId]}}" disabled="disabled" />
                      <input v-if="!breedCategory[initBreedDetail.categoryId]" type="text" class="form-control" value="其它类" disabled="disabled" />
                    </div>
                  <div class="client-detailInfo  col-xs-12">
                    <label>拼音</label>
                    <input type="text" class="form-control" value="{{initBreedDetail.pinyin}}" disabled="disabled" />
                  </div>
                  <div class="client-detailInfo  col-xs-12">
                    <label>英文</label>
                    <input type="text" class="form-control" value="{{initBreedDetail.eName}}" disabled="disabled" />
                  </div>
                  <div class="client-detailInfo  col-xs-12">
                    <label>拉丁文</label>
                    <input type="text" class="form-control" value="{{initBreedDetail.lName}}" disabled="disabled" />
                  </div>
                    <div class="client-detailInfo  col-xs-12 ">
                        <label>图标</label>
                        <div class="clearfix">
                            <div class="client-image col-md-4">
                                <!--<span>{{initBreedDetail.icon}}</span>-->
                                <img :src="initBreedDetail.url" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import createspecModel from '../serviceBaselist/breedDetailDialog/createspec'
import updatebreedModel  from '../serviceBaselist/breedDetailDialog/updateBreedlist'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import {
    initCategorylist,
    initBreedDetail
} from '../../vuex/getters'
import {
    getCategoryData,
    updateBreedInfo,
    getBreedDetail,
    specDel,
    createSpec,
    saveAlias,
    alterSpec,
    alterAlias
} from '../../vuex/actions'
export default {
    components: {
        createspecModel,
        updatebreedModel,
        deletebreedModel
    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            specParam: {
                id:'',
                show: false,
                title:'',
                namelist:'',
                link:''
            },
            breedlistParam:{
                show:false,
                id:'',
                title:'',
                namelist:'',
                link:'',
                url:''
            },
            deleteParam:{
                show:false
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
            }
        }
    },
    vuex: {
        getters: {
            initCategorylist,
            initBreedDetail
        },
        actions: {
            getCategoryData,
            updateBreedInfo,
            getBreedDetail,
            specDel,
            createSpec,
            saveAlias,
            alterSpec,
            alterAlias
        }
    },
    methods: {
        specsToggle: function(param) {
            if(this.$store.state.table.breedDetail[param.crete].arr.length==0){
                this.$store.state.table.breedDetail[param.crete].show=false
            }
            this.$store.state.table.breedDetail[param.crete].show = !this.$store.state.table.breedDetail[param.crete].show;
        },
        createFormt: function(initBreedDetail){
            this.specParam=initBreedDetail;
        },
        specDelete:function(initBreedDetail){
            this.deleteParam = initBreedDetail;
        },
        updateSpec:function(initBreedDetail){
            this.breedlistParam=initBreedDetail;
        },
        clickShow: function(id,param) {
            if (this.$store.state.table.breedDetail[param.concrete].arr[id].show) {
                this.$store.state.table.breedDetail[param.concrete].arr[id].show = !this.$store.state.table.breedDetail[param.concrete].arr[id].show
            } else {
                this.$store.state.table.breedDetail[param.concrete].arr[id].show = true
            }
        }
    },
    created() {
        this.getCategoryData();
    }
}
</script>
<style scoped>
.top-title{
    width: 100%;
    right: 0;
    top:70px;
}
.breed_detail {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;
    height: 100%;
}

.client-detailInfo img {
    width: 100px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
}
.panel-body ul{
    border-top:1px solid #ddd;
}
.panel-body ul > li:last-of-type {
    float: right;
    position: relative;
}
.panel-body ul li{
    padding: 10px;
}
.breed_action {
    top:7px;
    right: 25px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt {
    display: block;
    padding:0px 3px;
    font-size: 14px;
    cursor: pointer;
}
</style>

<template>
    <createspec-model :param="specParam" v-if="specParam.show"></createspec-model>
    <updatebreed-model :param="breedlistParam" v-if="breedlistParam.show"></updatebreed-model>
    <!-- <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model> -->
    <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
    <tip-model :param="tipsParam" v-if="tipsParam.show"></tip-model>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" @click="param.show=false"></div>
    <div class="container modal_con modal_overall" v-show="param.show" @click="param.show=false">
        <div class="cover_loading" v-if="param.id!=initBreedDetail.id">
            <pulse-loader :loading="true" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="client-section clearfix" v-cloak>
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="col-md-12">
                <h4 class="section_title">详情</h4>
                <div class="panel-group" @click.stop="">
                    <div class="panel panel-default" style="border:none">
                        <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                            <div class="col-md-3 col-sm-4 col-xs-6">
                              <label>品种名称</label>：{{initBreedDetail.name}}
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-6"  v-if="breedCategory[initBreedDetail.categoryId]">
                              <label>品种分类</label>：{{breedCategory[initBreedDetail.categoryId]}}
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-6"  v-if="!breedCategory[initBreedDetail.categoryId]">
                              <label>品种分类</label>：{{breedCategory[initBreedDetail.categoryId]}}
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-6">
                              <label>拼音</label>：{{initBreedDetail.pinyin}}
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-6">
                              <label>英文</label>：{{initBreedDetail.eName}}
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-6">
                              <label>拉丁文</label>：{{initBreedDetail.lName}}
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                              <label>图标</label>：<img :src="initBreedDetail.url"  width="100px" @click="bigPicture(initBreedDetail.url)" />
                            </div>
                        </ul>
                    </div>
                    <div class="panel panel-default" style="border:none">
                        <!-- 规格 -->
                        <div class="div_tag clear">
                            <label class="left">规格：</label>
                            <div>
                                <Tag color="yellow" v-for="item in initBreedDetail.specs.arr" closable @on-close="specDelete({
                                       sub:$index,
                                       id:item.id,
                                       name:item.name,
                                       title:'规格',
                                       link:specDel,
                                       url:'/breed/spec/',
                                       key:'specs',
                                       headline:'breedDetail'
                                    })">{{item.name}}</Tag>
                                <i-button icon="ios-plus-empty" type="dashed" size="small" style="color:#f90;margin-left:20px;" @click="createFormt({
                                         id:param.id,
                                         title:'规格',
                                         show:true,
                                         name:'',
                                         namelist:'规格名称',
                                         link:createSpec,
                                         url:'/spec/',
                                         key:'specs',
                                         judge:'specs'
                                       })">添加规格</i-button>
                            </div>
                        </div>
                        <!-- 单位 -->
                        <div class="div_tag clear">
                            <label class="left">单位：</label>
                            <div>
                                <Tag color="green" v-for="item in initBreedDetail.units.arr" closable @on-close="specDelete({
                                        sub:$index,
                                        id:item.id,
                                        name:item.name,
                                        title:'单位',
                                        link:specDel,
                                        url:'/breed/unit/',
                                        key:'units',
                                        headline:'breedDetail'
                                    })">{{item.name}}</Tag>
                                <i-button icon="ios-plus-empty" type="dashed" size="small" style="color:#0c6;margin-left:20px;" @click="createFormt({
                                         id:param.id,
                                         title:'单位',
                                         show:true,
                                         name:'',
                                         namelist:'单位名称',
                                         link:createSpec,
                                         url:'/unit/',
                                         key:'units',
                                         judge:'units'
                                       })">添加单位</i-button>
                            </div>
                        </div>
                        <!-- 别名 -->
                        <div class="div_tag clear">
                            <label class="left">别名：</label>
                            <div><Tag color="red" v-for="item in initBreedDetail.alias.arr" closable @on-close="specDelete({
                                    sub:$index,
                                    id:item.id,
                                    name:item.alias,
                                    title:'别名',
                                    link:specDel,
                                    url:'/breed/alias/',
                                    key:'alias',
                                    headline:'breedDetail'
                                })">{{item.alias}}</Tag>
                            <i-button icon="ios-plus-empty" type="dashed" size="small" style="color:#f50;margin-left:20px;" @click="createFormt({
                                     id:param.id,
                                     title:'别名',
                                     alias:'',
                                     show:true,
                                     namelist:'别名名称',
                                     link:saveAlias,
                                     url:'/alias/',
                                     key:'alias',
                                     judge:'alias'
                                 })">添加别名</i-button></div>
                        </div>
                        <!-- 产地 -->
                        <div class="div_tag clear">
                            <label class="left">产地：</label>
                            <div><Tag color="blue" v-for="item in initBreedDetail.locals.arr" closable @on-close="specDelete({
                                    sub:$index,
                                    id:item.id,
                                    name:item.name,
                                    title:'产地',
                                    link:specDel,
                                    url:'/breed/local/',
                                    key:'locals',
                                    headline:'breedDetail'
                                })">{{item.name}}</Tag>
                            <i-button icon="ios-plus-empty" type="dashed" size="small" style="color:#39f;margin-left:20px;" @click="createFormt({
                                     id:param.id,
                                     title:'产地',
                                     show:true,
                                     name:'',
                                     namelist:'产地名称',
                                     link:createSpec,
                                     url:'/local/',
                                     key:'locals',
                                     judge:'locals'
                                 })">添加产地</i-button></div>
                        </div>
                    </div>
                <!-- <div class="panel panel-default">
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
                                         key:'specs',
                                         judge:'specs'
                                         })">新建</button>
                            </h4>
                        </div>
                        <div class="panel-collapse" v-show="initBreedDetail.specs.show">
                            <div class="panel-body panel-set">
                                <table class="table contactSet">
                                    <thead>
                                        <tr>
                                            <th>规格名称</th>
                                            <th colspan="2">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in initBreedDetail.specs.arr">
                                            <td>{{item.name}}</td>
                                            <td ><a class="operate" @click="updateSpec({
                                                   sub:$index,
                                                   id:item.id,
                                                   show:true,
                                                   title:'规格',
                                                   namelist:'规格名称',
                                                   name:item.name,
                                                   link:alterSpec,
                                                   url:'/spec/',
                                                   key:'specs',
                                                   judge:'specs',
                                                   breedId:item.breedId
                                                   },item.show=false)"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/></a>
                                           </td>
                                           <td>
                                            <a class="operate"  @click="specDelete({
                                                   sub:$index,
                                                   id:item.id,
                                                   show:true,
                                                   name:item.name,
                                                   title:'规格',
                                                   link:specDel,
                                                   url:'/breed/spec/',
                                                   key:'specs',
                                                   headline:'breedDetail'
                                                   },item.show=false)"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                         key:'locals',
                                         judge:'locals'
                                         })">新建</button>
                            </h4>
                        </div>
                        <div class="panel-collapse" v-show="!initBreedDetail.locals.show">
                            <div class="panel-body panel-set">
                                <table class="table contactSet">
                                    <thead>
                                        <tr>
                                            <th>产地名称</th>
                                            <th colspan="2">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in initBreedDetail.locals.arr">
                                            <td>{{item.name}}</td>
                                            <td ><a class="operate" @click="updateSpec({
                                                     sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    title:'产地',
                                                    namelist:'产地名称',
                                                    name:item.name,
                                                    link:alterSpec,
                                                    url:'/local/',
                                                    key:'locals',
                                                    judge:'locals',
                                                    breedId:item.breedId
                                                    },item.show=false)"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/></a>
                                                <a class="operate" @click="specDelete({
                                                    sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    name:item.name,
                                                    title:'产地',
                                                    link:specDel,
                                                    url:'/breed/local/',
                                                    key:'locals',
                                                     headline:'breedDetail'
                                                    },item.show=false)"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                     key:'alias',
                                     judge:'alias'
                                     })">新建</button>
                            </h4>
                        </div>
                        <div  class="panel-collapse collapse in" v-show="!initBreedDetail.alias.show">
                            <div class="panel-body panel-set">
                                <table class="table contactSet">
                                    <thead>
                                        <tr>
                                            <th>别名</th>
                                            <th colspan="2">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in initBreedDetail.alias.arr">
                                            <td>{{item.alias}}</td>
                                            <td ><a class="operate" @click="updateSpec({
                                                    sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    title:'别名',
                                                    namelist:'别名',
                                                    name:item.alias,
                                                    link:alterAlias,
                                                    url:'/alias/',
                                                    key:'alias',
                                                    judge:'alias',
                                                    breedId:item.breedId
                                                    },item.show=false)"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/></a>
                                                <a class="operate"  @click="specDelete({
                                                        sub:$index,
                                                        id:item.id,
                                                        show:true,
                                                        name:item.alias,
                                                        title:'别名',
                                                        link:specDel,
                                                        url:'/breed/alias/',
                                                        key:'alias',
                                                         headline:'breedDetail'
                                                    },item.show=false)"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                     key:'units',
                                     judge:'units'
                                     })">新建</button>
                            </h4>
                        </div>
                        <div  class="panel-collapse" v-show="!initBreedDetail.units.show">
                            <div class="panel-body panel-set">
                                <table class="table contactSet">
                                    <thead>
                                        <tr>
                                            <th>单位名称</th>
                                            <th colspan="2">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in initBreedDetail.units.arr">
                                            <td>{{item.name}}</td>
                                            <td><a class="operate"  @click="updateSpec({
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
                                                    judge:'units',
                                                    breedId:item.breedId
                                                    },item.show=false)"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/></a>
                                                <a class="operate" @click="specDelete({
                                                    sub:$index,
                                                    id:item.id,
                                                    show:true,
                                                    name:item.name,
                                                    title:'单位',
                                                    link:specDel,
                                                    url:'/breed/unit/',
                                                    key:'units',
                                                     headline:'breedDetail'
                                                    },item.show=false)"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                                   judge:'units',
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
                               </ul> -->
                            </div>
                        </div>
                    <!--</div>
                -->
                </div>
            </div>
           
        </div>
    </div>
</template>
<script>
import createspecModel from '../serviceBaselist/breedDetailDialog/createspec'
import updatebreedModel  from '../serviceBaselist/breedDetailDialog/updateBreedlist'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import tipModel from '../tips/tipDialog'
import pictureModel from '../tips/pictureDialog'
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
        deletebreedModel,
        tipModel,
        pictureModel
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
                
            },
            pictureParam:{
                show:false,
                img:''
            },
            tipsParam:{
                show:false,
                alert:true,
                name:''
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
            this.specParam.callback = this.callback;
        },
        specDelete:function(initBreedDetail){
            this.deleteParam = initBreedDetail;
            this.specDel(this.deleteParam)
        },
        updateSpec:function(initBreedDetail){
            this.breedlistParam=initBreedDetail;
        },
        bigPicture:function(url){
            this.pictureParam.show=true;
            this.pictureParam.img = url;
        },
        clickShow: function(id,param) {
            if (this.$store.state.table.breedDetail[param.concrete].arr[id].show) {
                this.$store.state.table.breedDetail[param.concrete].arr[id].show = !this.$store.state.table.breedDetail[param.concrete].arr[id].show
            } else {
                this.$store.state.table.breedDetail[param.concrete].arr[id].show = true
            }
        },
        callback:function(title){
            this.tipsParam.show = true;
            this.tipsParam.alert = true;
            this.tipsParam.name = title;
        }
    },
    created() {
        this.getCategoryData();
    }
}
</script>
<style scoped>
.top-title{
    right: 0;
    top: 91px;
    width: 60%;
    margin: auto;
    left: 0;
}
.breed_detail {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;
    height: 100%;
}
.contactSet thead{
    color: #fa6705;
}
.client-detailInfo img {
    width: 100px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
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
.table{
    display: table;
}
</style>

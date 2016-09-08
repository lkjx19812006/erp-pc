<template>
    <createspec-model :param="specParam" v-if="specParam.show"></createspec-model>
    <updatebreed-model :param="breedlistParam" v-if="breedlistParam.show"></updatebreed-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <div class="breed_detail">
    <div class="client-section clearfix" v-cloak>
        <div @click="close()" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="col-md-8 client-detail">
            <h4 class="section_title">药材相关</h4>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-heading clearfix" @click="specsToggle(initBreedDetail.specs)">
                        <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/contact.png" height="32" width="27" />
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
                                    <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
                                    <label>规格名称：{{item.name}}</label>
                                </li>
                                <li @click="clickShow($index)">
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
                                                    id:item.id,
                                                    show:true,
                                                    name:item.name,
                                                    title:'规格',
                                                    link:specDel,
                                                    url:'/breed/spec/',
                                                    key:'specs'
                                                    },item.show=false)">删除</dt>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                            <!--  <p class="contact-view">查看全部</p> -->
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading clearfix" @click="localToggle(initBreedDetail.locals)">
                        <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
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
                                        <img class="pull-left" src="/static/images/chance.png" height="21" width="18" />
                                        <label>产地名称：{{item.name}}</label>
                                    </li>
                                    <li @click="clickLocal($index)">
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
                                                    id:item.id,
                                                    show:true,
                                                    name:item.name,
                                                    title:'产地',
                                                    link:specDel,
                                                    url:'/breed/local/',
                                                    key:'locals'
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
                            <h4 class="panel-title clearfix" @click="aliasToggle(initBreedDetail.alias)">
                                <img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
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
                                        <img class="pull-left" src="/static/images/chance.png" height="21" width="18" />
                                        <label>别名：{{item.alias}}</label>
                                    </li>
                                    <li @click="clickAlias($index)">
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
                                                     id:item.id,
                                                    show:true,
                                                    name:item.alias,
                                                    title:'别名',
                                                    link:specDel,
                                                    url:'/breed/alias/',
                                                    key:'alias'
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
                            <h4 class="panel-title clearfix" @click="unitsToggle(initBreedDetail.units)">
                                <img class="pull-left" src="/static/images/file.png" height="34" width="26"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
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
                                        <img class="pull-left" src="/static/images/chance.png" height="21" width="18" />
                                        <label>单位名称：{{item.name}}</label>
                                    </li>
                            
                                    <li @click="unitclick($index)">
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
                                                    id:item.id,
                                                    show:true,
                                                    name:item.name,
                                                    title:'单位',
                                                    link:specDel,
                                                    url:'/breed/unit/',
                                                    key:'units'
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
                        <input type="text" class="form-control" v-model='initBreedDetail.code' value="{{initBreedDetail.code}}" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种名称</label>
                        <input type="text" class="form-control" value="{{initBreedDetail.name}}" v-model='initBreedDetail.name' />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种分类选择</label>
                        <select class="form-control" v-model="initBreedDetail.categoryId">
                            <option v-for="item in initCategorylist" value="{{item.id}}">{{item.name}}</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12 ">
                        <label>图标</label>
                        <div class="clearfix">
                            <div class="client-image col-md-4">
                                <img :src="initBreedDetail.icon" />
                            </div>
                        </div>
                    </div>
                    <div class="client-editbtn col-xs-12">
                        <button type="button" class="btn btn-orange" @click="updateBreedInfo(initBreedDetail,initBreedDetail.sub=initBreedDetail.id)">保存</button>
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
            if(this.$store.state.table.breedDetail.specs.arr.length==0){
                this.$store.state.table.breedDetail.specs.show=false
            }
            this.$store.state.table.breedDetail.specs.show = !this.$store.state.table.breedDetail.specs.show;
        },
        localToggle: function(param) {
            if(this.$store.state.table.breedDetail.locals.arr.length==0){
                this.$store.state.table.breedDetail.locals.show=false
            }
            this.$store.state.table.breedDetail.locals.show = !this.$store.state.table.breedDetail.locals.show;
        },
        aliasToggle:function(param){
            if(this.$store.state.table.breedDetail.alias.arr.length==0){
                this.$store.state.table.breedDetail.alias.show=false
            }
            this.$store.state.table.breedDetail.alias.show = !this.$store.state.table.breedDetail.alias.show;
        },    
        unitsToggle:function(param){
            if(this.$store.state.table.breedDetail.units.arr.length==0){
                this.$store.state.table.breedDetail.units.show=false
            }
            this.$store.state.table.breedDetail.units.show = !this.$store.state.table.breedDetail.units.show;
        },                           
        close: function() {
            this.param.show = false;
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
        clickShow: function(id) {
            if (this.$store.state.table.breedDetail.specs.arr[id].show) {
                this.$store.state.table.breedDetail.specs.arr[id].show = !this.$store.state.table.breedDetail.specs.arr[id].show
            } else {
                this.$store.state.table.breedDetail.specs.arr[id].show = true
            }
        },
        clickLocal:function(id){
             if (this.$store.state.table.breedDetail.locals.arr[id].show) {
                this.$store.state.table.breedDetail.locals.arr[id].show = !this.$store.state.table.breedDetail.locals.arr[id].show
            } else {
                this.$store.state.table.breedDetail.locals.arr[id].show = true
            }
        },
        clickAlias:function(id){
             if (this.$store.state.table.breedDetail.alias.arr[id].show) {
                this.$store.state.table.breedDetail.alias.arr[id].show = !this.$store.state.table.breedDetail.alias.arr[id].show
            } else {
                this.$store.state.table.breedDetail.alias.arr[id].show = true
            }
        },
        unitclick:function(id){
             if (this.$store.state.table.breedDetail.units.arr[id].show) {
                this.$store.state.table.breedDetail.units.arr[id].show = !this.$store.state.table.breedDetail.units.arr[id].show
            } else {
                this.$store.state.table.breedDetail.units.arr[id].show = true
            }
        }
    },
    created() {
        this.getCategoryData();
    }
}
</script>
<style scoped>
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

.panel-body ul > li:last-of-type {
    float: right;
    position: relative;
}

.breed_action {
    top: 0px;
    right: 30px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt {
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}
</style>

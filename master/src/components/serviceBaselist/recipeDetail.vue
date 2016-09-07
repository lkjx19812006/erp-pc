<template>
    <createspec-model :param="specParam" v-if="specParam.show"></createspec-model>
    <updatebreed-model :param="breedlistParam" v-if="breedlistParam.show"></updatebreed-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <div class="breed_detail">
        <div class="client-section clearfix" v-cloak>
            <div @click="close()" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="col-md-8">
                <h4 class="section_title">成分相关</h4>
                <div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading clearfix" @click="specsToggle(initConponentlist.specs)">
                            <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/contact.png" height="32" width="27" />
                                <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                    企业({{initConponentlist.specs.arr.length}})
                                </a>
                            </h4>
                        </div>
                        <div class="panel-collapse" v-show="initConponentlist.specs.show">
                            <div class="panel-body panel-set">
                                <ul class="clearfix" v-for="item in initConponentlist.specs.arr">
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
                                                    url:'/spec/',
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
                </div>
            </div>
            <div class="col-md-4" style="border-left:1px solid #ddd">
                <h4 class="section_title">详情</h4>
                <div class="edit-detail clearfix">
                    <div class="client-detailInfo col-xs-12">
                        <label>编号</label>
                        <input type="text" class="form-control" value="{{initConponentlist.code}}" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>药品名称</label>
                        <input type="text" class="form-control" value="{{initConponentlist.name}}" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种名称</label>
                        <input type="text" class="form-control" value="{{initConponentlist.breedName}}"  />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>公司名称</label>
                        <input type="text" class="form-control" value="{{initConponentlist.companyName}}"  />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>含量</label>
                        <input type="text" class="form-control" value="{{initConponentlist.quantity}}"  />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>单位</label>
                        <input type="text" class="form-control" value="{{initConponentlist.unit}}"  />
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
    initConponentlist
} from '../../vuex/getters'
import {
    updateBreedInfo,
    getRecipeDetail,
    specDel
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
            initConponentlist
        },
        actions: {
            updateBreedInfo,
            getRecipeDetail
        }
    },
    methods: {
        specsToggle: function(param) {
            if(this.$store.state.table.breedDetail.specs.arr.length==0){
                this.$store.state.table.breedDetail.specs.show=false
            }
            this.$store.state.table.breedDetail.specs.show = !this.$store.state.table.breedDetail.specs.show;
        },
        close: function() {
            this.param.show = false;
        },
        createFormt: function(id){
            this.specParam.show = true;
            this.specParam.id = id;
            this.specParam.title="规格";
            this.specParam.namelist="规格名称";
            this.specParam.link=this.createSpec;
        },
        specDelete:function(initConponentlist){
            /*this.deleteParam = initConponentlist;*/
        },
        updateSpec:function(initConponentlist){
            /*this.breedlistParam=initConponentlist;*/
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
        }
    },
   /* created() {
        this.getCategoryData();
    }*/
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

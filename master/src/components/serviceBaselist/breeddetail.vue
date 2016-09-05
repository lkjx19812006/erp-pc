<template>
    <!-- 点击药材编辑 -->
    <!--  <div class="cover_loading">
       <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
   </div> -->
    <div class="breed_detail">
        <div class="client-section clearfix" v-cloak>
            <div @click="close()" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="col-md-8 client-detail">
                <h4 class="section_title">药材相关</h4>
                <div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading clearfix" v-on:click="toggle(
                            )">
                            <h4 class="panel-title clearfix">
                            <img class="pull-left" src="/static/images/contact.png" height="32" width="27" />
                            <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                规格
                            </a>
                            <button type="button" class="btn btn-base pull-right">新建</button>
                        </h4>
                        </div>
                        <div class="panel-collapse collapse in" v-bind:class="{'in':initToggle==true,'blank':initToggle==false}" transition="expand">
                            <div class="panel-body panel-set">
                                <ul class="clearfix" v-for="item in initBreedlist.specs">
                                    <li class="panel-name">
                                        <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
                                        <label>规格名称：{{item.name}}</label>
                                    </li>
                                    <li class="panel-tel">
                                        <label>创建时间：{{item.ctime}}</label>
                                    </li>
                                    <li>
                                        <img src="/static/images/default_arrow.png" height="24" width="24" />
                                    </li>
                                </ul>
                               <!--  <p class="contact-view">查看全部</p> -->
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading clearfix" v-on:click="localToggle(
                            )">
                            <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                    产地
                                </a>
                                <button type="button" class="btn btn-base pull-right">新建</button>
                            </h4>
                        </div>
                        <div id="collapseTwo" class="panel-collapse collapse" v-bind:class="{'in':initToggle==true,'blank':initToggle==false}" transition="expand">
                            <div class="panel-body panel-set">
                                <ul class="clearfix" v-for="item in initBreedlist.locals" v-cloak>
                                    <li class="panel-name">
                                        <img class="pull-left" src="/static/images/chance.png" height="21" width="18" />
                                        <label>产地名称：{{item.name}}</label>
                                    </li>
                                    <li class="panel-name">
                                        <label>状态：{{item.status}}</label>
                                    </li>
                                    <li>
                                        <img src="/static/images/default_arrow.png" height="24" width="24" />
                                    </li>
                                </ul>
                               <!--  <p class="contact-view">查看全部</p> -->
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title clearfix"  v-on:click="localToggle()">
                                <img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                    别名
                                </a>
                                <button type="button" class="btn btn-base pull-right">新建</button>
                            </h4>
                        </div>
                        <div id="collapseThree" class="panel-collapse collapse" v-bind:class="{'in':initToggle==true,'blank':initToggle==false}" transition="expand">
                            <div class="panel-body panel-set">
                               <ul class="clearfix" v-for="item in initBreedlist.alias" v-cloak>
                                    <li class="panel-name">
                                        <img class="pull-left" src="/static/images/chance.png" height="21" width="18" />
                                        <label>别名：{{item.name}}</label>
                                    </li>
                                    <li class="panel-name">
                                        <label>状态：{{item.status}}</label>
                                    </li>
                                    <li>
                                        <img src="/static/images/default_arrow.png" height="24" width="24" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/file.png" height="34" width="26"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                    单位
                                </a>
                                <button type="button" class="btn btn-base pull-right">新建</button>
                            </h4>
                        </div>
                        <div id="collapseThree" class="panel-collapse collapse">
                            <div class="panel-body panel-set">
                               <ul class="clearfix" v-for="item in initBreedlist.units" v-cloak>
                                    <li class="panel-name">
                                        <img class="pull-left" src="/static/images/chance.png" height="21" width="18" />
                                        <label>单位名称：{{item.name}}</label>
                                    </li>
                                    <li class="panel-name">
                                        <label>状态：{{item.status}}</label>
                                    </li>
                                    <li>
                                        <img src="/static/images/default_arrow.png" height="24" width="24" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                    跟进（0）
                                </a>
                                <button type="button" class="btn btn-base pull-right">新建</button>
                            </h4>
                        </div>
                        <div id="collapseThree" class="panel-collapse collapse">
                            <div class="panel-body panel-set">
                                Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
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
                        <input type="text" class="form-control" v-model='initBreedlist.code' value="{{initBreedlist.code}}" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种名称</label>
                        <input type="text" class="form-control" value="{{initBreedlist.name}}" v-model='initBreedlist.name' />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种分类选择</label>
                        <select class="form-control" v-model="initBreedlist.categoryId">
                            <option v-for="item in initCategorylist" value="{{item.id}}">{{item.name}}</option>
                        </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12 ">
                        <label>图标</label>
                        <div class="clearfix">
                            <div class="client-image col-md-4">
                                <img :src="initBreedlist.icon" />
                            </div>
                        </div>
                    </div>
                    <div class="client-editbtn col-xs-12">
                        <button type="button" class="btn btn-orange" @click="updateBreedInfo(initBreedlist,initBreedlist.id)">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    initToggle,
    initCategorylist,
    initBreedlist
} from '../../vuex/getters'
import {
    getToggle,
    getCategoryData,
    updateBreedInfo
} from '../../vuex/actions'
export default {
    components: {

    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            }
        }
    },
    vuex: {
        getters: {
            initToggle,
            initCategorylist,
            initBreedlist
        },
        actions: {
            getToggle,
            getCategoryData,
            updateBreedInfo
        }
    },
    methods: {
        toggle: function() {
            this.getToggle();
        },
        localToggle: function() {
            /*if (this.initToggle == true) {
                this.parent().siblings().initToggle = false
            }*/
            this.getToggle()
        },
        close:function(){

        }
    },
    created(){
        this.getCategoryData();
    }
}
</script>
<style>
/* breed_detail */

.client-detailInfo img {
    width: 100px;
}
.panel-body ul li:last-of-type{
    float: right;
}
</style>

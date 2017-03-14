<template>
    <div class="clear">
        <editscope-model :param="editMenuParam" v-if="editMenuParam.show"></editscope-model>
        <delete-model :param="deleteParam" v-if="deleteParam.show"></delete-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <div class="service-nav">
            <button class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.sys=='erp'}" @click="clickChange('erp')">ERP系统</button>
            <button class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.sys=='wms'}" @click="clickChange('wms')">WMS系统</button>
        </div>
        <!-- 右侧功能 -->
        <mglist-model style="width:75%;float:right">
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear">
                    <div class="right">
                        <!-- <button type="button" class="btn btn-primary pull-right transfer" @click="resetLoad()">刷新</button> -->
                        <button class="btn btn-default pull-right " @click="newData()">新建功能</button>
                    </div>
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <table class="table table-hover table_color table-striped" v-cloak id="tab">
                    <thead>
                        <tr>
                            <th>功能名称</th>
                            <th>功能英文名</th>
                            <th>功能说明</th>
                            <th>创建时间</th>
                            <th colspan="2">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initScopeDetail.subcategory">
                            <td>{{item.cname}}</td>
                            <td>{{item.ename}}</td>
                            <td>{{item.remark}}</td>
                            <td>{{item.ctime}}</td>
                            <td>
                                <button @click="modify({
                                    title:'修改功能',
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    cname:item.cname,
                                    ename:item.ename,
                                    sys:item.sys,
                                    pid:item.pid,
                                    remark:item.remark,
                                    link:'/sys/menu/',
                                    type:item.type
                                   })" class="btn btn-primary btn-edit">编辑</button>
                                <button @click="delete_contain({
                                    title:'功能',
                                    sub:$index,
                                    id:item.id,
                                    sys:item.sys,
                                    show:true,
                                    cname:item.cname,
                                    ename:item.ename,
                                    link:specDel,
                                    url:'/sys/menu/',
                                    type:item.type
                                   })" class="btn btn-primary btn-apply">删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </mglist-model>
        <!-- 左侧菜单 -->
        <div style="width:25%;float:left;position:relative;" class="clear">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div class="clear operate_menu">
                <button class="btn btn-default pull-left" @click="addMenu()">添加菜单</button>
                <button class="btn btn-primary pull-right transfer" @click="resetConditional()">刷新</button>
                <button class="btn btn-default pull-right transfer" @click="deleteMenu({
                  id:'',
                  show:false,
                  link:specDel,
                  type:'',
                  title:'',
                  url:'/sys/menu/'
                  })">删除菜单</button>
                <button class="btn btn-default pull-right" @click="editMenu()">编辑菜单</button>
            </div>
            <div class="trans_parten clear">
                <div class="clear">
                    <ul v-for="item in list.result" class="clear">
                        <li>
                            <div class="clear">
                                <p class="line_text" v-bind:class="{'line_text':!list.result[$index].show,'select_line_text':list.result[$index].show}" @click="selectShow(list.result[$index])">{{list.result[$index].cname}}</p>
                                <!-- 二级目录 -->
                                <div v-for="subItem in list.result[$index].subcategory" class="sub_second clear">
                                    <p v-if="subItem.type==0" class="line_text" v-bind:class="{'line_text':!subItem.show,'select_line_text':subItem.show}" @click="selectShow(subItem)">{{subItem.cname}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mglistModel from '../mguan/mgListComponent'
import treeDialog from '../generalModule/orgComponent'
import editscopeModel from '../role/editScope'
import tipsModel from '../tips/tipDialog'
import deleteModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import pagination from '../pagination'
import {
    initScopeDetail
} from '../../vuex/getters.js'
import {
    baseGetData,
    scopedOperate,
    baseAddData,
    baseUpdateData,
    specDel
} from '../../vuex/actions.js'
export default {
    components: {
        treeDialog,
        editscopeModel,
        tipsModel,
        deleteModel,
        pagination,
        mglistModel
    },
    props: ['param'],
    data() {
        return {
            arr: [0, 1, 2, 3, 4],
            dateText: '',
            show: true,
            loadParam: {
                loading: false,
                color: '#5dc596',
                size: '15px',
                url: '/sys/menu/',
                cur: 1,
                keyName: 'menu',
                sys: 'erp'
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            deleteParam: {
                show: false
            },
            editMenuParam: {
                show: false,
                cname: '',
                ename: '',
                icon: '',
                id: '',
                pid: '',
                type: '',
                remark: '',
                url: '',
            },
        }
    },
    methods: {
        clickChange: function(system) {
            this.loadParam.sys = system;
            this.baseGetData(this.loadParam);
        },

        selectShow: function(item) {
            /*--循环所有的层级的show置为false,最后自己本身为true(如果是关联显示应该判断父级和子级的显示)--*/
            for (var i in this.list.result) {
                if (this.list.result[i].show) {
                    this.list.result[i].show = false;
                }
                let subcategory = this.list.result[i].subcategory;
                for (var j in subcategory) {
                    if (subcategory[j].show) {
                        subcategory[j].show = false;
                    }
                }
            }
            item.show = true;
            this.scopedOperate(item);
        },
        addMenu: function() {
            this.editMenuParam.show = true;
            this.editMenuParam.title = '添加菜单';
            this.editMenuParam.link = '/sys/menu/';
            this.editMenuParam.cname = '';
            this.editMenuParam.ename = '';
            this.editMenuParam.icon = '';
            this.editMenuParam.pid = '';
            this.editMenuParam.remark = '';
            this.editMenuParam.type = 0; // 0/1 页面/功能 
            this.editMenuParam.sys = this.loadParam.sys;
            this.editMenuParam.url = '';
            this.editMenuParam.callback = this.callback;
        },
        newData: function() {
            if (!this.initScopeDetail.id) {
                this.tipsParam.show = true;
                this.tipsParam.name = '请选择菜单'
            } else {
                this.editMenuParam.show = true;
                this.editMenuParam.title = '添加功能';
                this.editMenuParam.link = '/sys/menu/';
                this.editMenuParam.cname = '';
                this.editMenuParam.ename = '';
                this.editMenuParam.icon = '';
                this.editMenuParam.pid = '';
                this.editMenuParam.remark = '';
                this.editMenuParam.sys = this.loadParam.sys;
                this.editMenuParam.type = 1; // 0/1 页面/功能 
                this.editMenuParam.url = '';
                this.editMenuParam.callback = this.functionCallback;
            }
            this.initScopeDetail.id = '';
        },
        editMenu: function() {
            if (!this.initScopeDetail.id) {
                this.tipsParam.show = true;
                this.tipsParam.name = '请选择菜单'
            } else {
                this.editMenuParam.show = true;
                this.editMenuParam.title = '编辑菜单';
                this.editMenuParam.link = '/sys/menu/';
                this.editMenuParam.cname = this.initScopeDetail.cname;
                this.editMenuParam.ename = this.initScopeDetail.ename;
                this.editMenuParam.icon = this.initScopeDetail.icon;
                this.editMenuParam.pid = this.initScopeDetail.pid;
                this.editMenuParam.remark = this.initScopeDetail.remark;
                this.editMenuParam.type = this.initScopeDetail.type; // 0/1 页面/功能 
                this.editMenuParam.url = this.initScopeDetail.url;
                this.editMenuParam.id = this.initScopeDetail.id;
                this.editMenuParam.sys = this.loadParam.sys;
                this.editMenuParam.callback = this.callback;
            }
            this.initScopeDetail.id = '';
        },
        modify: function(item) {
            this.editMenuParam = item;
            this.editMenuParam.callback = this.functionCallback;
        },
        deleteMenu: function(item) {
            if (!this.initScopeDetail.id) {
                this.tipsParam.show = true;
                this.tipsParam.name = '请选择菜单'
            } else {
                this.deleteParam = item;
                this.deleteParam.show = true;
                this.deleteParam.title = '菜单';
                this.deleteParam.type = this.initScopeDetail.type; // 0/1 页面/功能 
                this.deleteParam.id = this.initScopeDetail.id;
                this.deleteParam.callback = this.callback;
            }
        },
        delete_contain: function(item) {
            this.deleteParam = item;
            this.deleteParam.callback = this.functionCallback;
        },
        resetConditional: function() {
            this.baseGetData(this.loadParam);
            if (this.initScopeDetail.id) {
                this.scopedOperate(this.initScopeDetail);
            }
        },
        callback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            if (title == 'success') {
                this.baseGetData(this.loadParam);
            }
        },
        functionCallback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
            if (name == 'success') {
                this.scopedOperate(this.initScopeDetail);
            }
        }
    },
    vuex: {
        getters: {
            list: state => state.tablelist.menu.list,
            initScopeDetail
        },
        actions: {
            baseGetData,
            baseAddData,
            scopedOperate,
            baseUpdateData,
            specDel
        }
    },
    created() {
        this.baseGetData(this.loadParam);
    }
}
</script>
<style scoped>
.line_text {
    margin-top: 10px;
    float: left;
    margin-left: 20px;
}

.select_line_text {
    margin-top: 10px;
    float: left;
    color: #fa6705;
    margin-left: 20px;
    font-weight: 700;
}

.sub_second {
    margin-left: 26px;
    clear: both;
    white-space: normal;
}

.transfer {
    margin-left: 8px;
}

.operate_menu {
    position: relative;
    margin-top: 20px;
}

.trans_parten {
    position: absolute;
    left: 0;
    right: 0;
    max-height: 650px;
    overflow-y: auto;
}

#table_box table th,
#table_box table td {
    min-width: 255px;
    width: 255px;
}
</style>

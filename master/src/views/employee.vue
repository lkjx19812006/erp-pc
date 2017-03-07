<template>
    <div>
        <tree-dialog v-if="transferParam.show" :param="transferParam"></tree-dialog>
        <createemp-model :param="createParam" v-if="createParam.show"></createemp-model>
        <detailemp-model :param="changeParam" v-if="changeParam.show"></detailemp-model>
        <searchorg-model :param.sync="orgParam" v-if="orgParam.show"></searchorg-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <password-model :param="passwordParam" v-if="passwordParam.show"></password-model>
        <delete-model :param="deleteParam" v-if="deleteParam.show"></delete-model>
        <newly-model :param="complierParam" v-if="complierParam.show"></newly-model>
        <!-- 右侧员工 -->
        <mglist-model style="width:79%;float:right">
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear">
                    <div class="left my_order_search">
                        <div class="name_search clearfix">
                            <img src="/static/images/search.png" height="24" width="24" />
                            <input type="text" class="search_input" v-model="loadParam.name" placeholder="按员工名字搜索" @keyup.enter="loadByCondition()">
                        </div>
                        <div class="name_search clearfix">
                            <img src="/static/images/search.png" height="24" width="24">
                            <input type="text" class="search_input" v-model="loadParam.mobile" placeholder="按员工电话搜索" @keyup.enter="loadByCondition()">
                        </div>
                        <div class="name_search clearfix" style="margin-right:10px;border:none">
                            <button class="new_btn " style="line-height:20px;" @click="rest()">清空条件</button>
                        </div>
                        <div class="name_search clearfix" style="border:none">
                            <button class="new_btn" @click="loadByCondition()">搜索</button>
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <dl class="clear left" style="margin-bottom: 0">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.leave==1}" @click="selectType(1)">
                                在职
                            </button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.leave==0}" @click="selectType(0)">
                                离职
                            </button>
                        </div>
                    </dl>
                    <div class="right">
                        <button type="button" class="btn btn-primary pull-right transfer" @click="loadByCondition()">刷新</button>
                        <button type="button" class="btn btn-default pull-right transfer" @click="employeeTransfer({
                        arr:[],
                        name:'test',
                        employeeId:'',
                        orgId:'',
                        show:true
                        })">划转至部门</button>
                        <button type="button" class="btn btn-default pull-right transfer" @click="becomeManager()">
                            划转为主管
                        </button>
                        <button class="btn btn-default pull-right " @click="newData({
                         title:'新建员工',
                         show:true,
                         name:'',
                         orgid:'',
                         orgcode:'',
                         status:'',
                         ename:'',
                         no:'',
                         orgName:'',
                         position:'',
                         mobile:'',
                         extno:'',
                         email:'',
                         wechat:'',
                         qq:'',
                         level:1,
                         privilege:'',
                         entrydate:'',
                         leavedate:'',
                         leave:'',
                         namelist:'姓名',
                         englist:'英文名',
                         job:'工号',
                         parten:'部门',
                         code:'部门编码',
                         orgiid:'部门编号',
                         statuslist:'状态',
                         positionlist:'职位',
                         phonelist:'手机',
                         nolist:'分机号',
                         entry:'入职时间',
                         leavelist:'离职时间',
                         levellist:'职级',
                         link:createEmploy,
                         url:'/employee/',
                         key:'employeeList',
                         division:'new',
                         })">新建</button>
                    </div>
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
                            <th></th>
                            <th>姓名</th>
                            <th>英文名</th>
                            <th>工号</th>
                            <th>部门</th>
                            <th>职位</th>
                            <th>是否主管</th>
                            <th>手机号</th>
                            <th>分机号</th>
                            <th>入职时间</th>
                            <th>离职时间</th>
                            <th>职级</th>
                            <th>员工状态</th>
                            <th>编辑</th>
                            <th>修改密码</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initEmployeeList" @dblclick="quickLogin(item.no)">
                            <td @click.stop="">
                                <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                            </td>
                            <td class="underline" @click.stop="clickOn({
                                sub:$index,
                                id:item.id,
                                show:true,
                                name:item.name,
                                ename:item.ename,
                                no:item.no,
                                privilege:item.privilege,
                                orgid:item.orgid,
                                orgcode:item.orgcode,
                                leave:item.leave,
                                orgName:item.orgName,
                                position:item.position,
                                mobile:item.mobile,
                                extno:item.extno,
                                level:item.level,
                                qq:item.qq,
                                entrydate:item.entrydate,
                                leavedate:item.leavedate,
                                link:updateEmploy,
                                url:'/employee/',
                                key:'employeeList'
                               })">{{item.name}}</td>
                            <td>{{item.ename}}</td>
                            <td>{{item.no}}</td>
                            <td>{{item.orgName}}</td>
                            <td>{{item.position}}</td>
                            <td>
                                <div v-if="item.ismanager==0">否</div>
                                <div v-if="item.ismanager==1">是</div>
                            </td>
                            <td>{{item.mobile}}</td>
                            <td>{{item.extno}}</td>
                            <td>{{item.entrydate | date}}</td>
                            <td>{{item.leavedate | date}}</td>
                            <td>{{item.level | levelstate}}</td>
                            <td>
                                <div v-if="item.leave==0">离职</div>
                                <div v-if="item.leave==1">在职</div>
                                <div v-if="item.leave!=1&&item.leave!=0">在职</div>
                            </td>
                            <td @click="modify({
                                title:'编辑员工',
                                sub:$index,
                                id:item.id,
                                show:true,
                                name:item.name,
                                ename:item.ename,
                                no:item.no,
                                privilege:item.privilege,
                                orgid:item.orgid,
                                orgcode:item.orgcode,
                                leave:item.leave,
                                orgName:item.orgName,
                                position:item.position,
                                mobile:item.mobile,
                                extno:item.extno,
                                qq:item.qq,
                                wechat:item.wechat,
                                email:item.email,
                                level:item.level,
                                entrydate:item.entrydate,
                                leavedate:item.leavedate,
                                namelist:'姓名',
                                englist:'英文名',
                                job:'工号',
                                parten:'部门',
                                positionlist:'职位',
                                phonelist:'手机',
                                nolist:'分机号',
                                code:'部门编码',
                                orgiid:'部门编号',
                                statuslist:'状态',
                                entry:'入职时间',
                                leaveTime:'离职时间',
                                levellist:'职级',
                                link:updateEmploy,
                                url:'/employee/',
                                key:'employeeList',
                                division:'edit',
                               })">
                                <button class="btn btn-primary btn-gray">编辑</button>
                            </td>
                            <td><a class="operate" @click="updatePassword(item.no)">修改密码</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
        <!-- 左侧部门 -->
        <mglist-model style="width:20%;float:left">
            <!-- 头部搜索 -->
            <div slot="top" style="height:42px;">
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <div class="clear">
                    <button class="btn btn-default pull-left" @click="addOrg()">添加部门</button>
                    <button class="btn btn-default pull-right transfer" @click="deleteOrg({
              id:'',
              show:false,
              link:specDel,
              url:'/org/'
              })">删除部门</button>
                    <button class="btn btn-default pull-right" @click="editOrg()">编辑部门</button>
                </div>
                <div class="trans_parten">
                    <div>
                        <treeview :value.sync="id" :model="$store.state.table.basicBaseList.orgList" class="form-control" labelname="name" valuename="id" codename="code" children="lowerList" @click="slectedOne"></treeview>
                    </div>
                </div>
            </div>
        </mglist-model>
    </div>
</template>
<script>
import createempModel from '../components/emloyee/createEmploy'
import pagination from '../components/pagination'
import filter from '../filters/filters'
import detailempModel from '../components/emloyee/employDetail'
import searchorgModel from '../components/emloyee/searchorg'
import common from '../common/common'
import changeMenu from '../components/tools/tabs/tabs.js'
import tipsdialogModel from '../components/tips/tipDialog'
import passwordModel from '../components/emloyee/updatePassword'
import mglistModel from '../components/mguan/mgListComponent.vue'
import treeDialog from '../components/generalModule/orgComponent.vue'
import deleteModel from '../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import newlyModel from '../components/emloyee/createOrg.vue'
import {
    getList,
    initEmployeeList,
    initOrgDetail,
    initOrgList,
    initLogin
} from '../vuex/getters'
import {
    getEmployeeList,
    updateEmploy,
    createEmploy,
    getOrgList,
    updatePawd,
    transferOrg,
    specDel,
    getOrgDetail,
    alterOrg,
    transferManager,
    login
} from '../vuex/actions'
export default {
    components: {
        pagination,
        createempModel,
        detailempModel,
        searchorgModel,
        tipsdialogModel,
        passwordModel,
        mglistModel,
        treeDialog,
        deleteModel,
        newlyModel
    },
    data() {
        return {
            loadParam: {
                loading: false,
                color: '#5dc596',
                size: '15px',
                /*list: true,*/ //部门以列表的形式展现(只展示叶子节点),
                cur: 1,
                all: 7,
                name: '',
                mobile: '',
                orgId: '',
                orgCode: '',
                id: '',
                leave: 1,
                total: 0
            },
            tab_height: 0,
            createParam: {
                show: false
            },
            changeParam: {
                show: false,
                sub: '',
                id: ''
            },
            deleteParam: {
                show: false
            },
            tipsParam: {
                show: false,
                alert: true,
                name: "",
            },
            complierParam: { //编辑部门
                show: false,
                id: '',
                bizType: '',
                code: '',
                level: '',
                name: '',
                pid: '',
                status: ''
            },
            orgParam: {
                show: false,
                orgid: '',
                orgName: '',
                orgcode: '',
                all: true //表示获取所有部门信息，而不是只有叶子信息
            },
            passwordParam: {
                show: false,
                no: '',
                newPwd: '',
                callback: ''
            },
            checked: false,
            transferParam: {
                show: false,
                name: '',
                orgId: '',
                employeeId: '',
                transferCustomer: '',
            },
            loginParam: {
                loading: true,
                no: '',
                link: '/employee/loginWithoutPassword',
                loginCallback: ''
            }
        }
    },
    methods: {
        onlyselected: function(sub, id) {
            const _this = this;
            this.$store.state.table.basicBaseList.employeeList[sub].checked = !this.$store.state.table.basicBaseList.employeeList[sub].checked;
            if (this.$store.state.table.basicBaseList.employeeList[sub].checked == true) {
                this.transferParam.employeeId = id;
                console.log(this.transferParam.employeeId)
            } else if (this.$store.state.table.basicBaseList.employeeList[sub].checked == false) {
                this.transferParam.employeeId = '';
            }
            for (var key in this.initEmployeeList) {
                if (key != sub) {
                    if (this.$store.state.table.basicBaseList.employeeList[key].checked) {
                        this.$store.state.table.basicBaseList.employeeList[key].checked = false;
                    }


                }
            }
        },
        employeeTransfer: function() {
            for (var i in this.initEmployeeList) {
                if (this.initEmployeeList[i].checked) {
                    this.transferParam.employeeId = this.initEmployeeList[i].id;
                }
            }
            if (this.transferParam.employeeId !== '') {
                this.transferParam.show = true;
            } else {
                this.tipsParam.show = true;
                this.tipsParam.alert = true;
                this.tipsParam.name = '请选择员工';
                this.tipsParam.confirm = false;
            }
            this.transferParam.callback = this.callback;
        },

        becomeManager: function() {
            for (var i in this.initEmployeeList) {
                if (this.initEmployeeList[i].checked) {
                    this.transferParam.employeeId = this.initEmployeeList[i].id;
                }
            }
            if (this.transferParam.employeeId !== '') {
                this.transferManager(this.transferParam);
            } else {
                this.tipsParam.show = true;
                this.tipsParam.alert = true;
                this.tipsParam.name = '请选择员工';
                this.tipsParam.confirm = false;
            }
            this.transferParam.callback = this.callback;
        },
        addOrg: function() {
            this.complierParam.show = true;
            this.complierParam.title = '添加部门';
            this.complierParam.distinct = '';
            this.complierParam.bizType = '';
            this.complierParam.code = '';
            this.complierParam.level = '';
            this.complierParam.name = '';
            this.complierParam.pid = '';
            this.complierParam.status = '';
            this.complierParam.callback = this.callback;
        },
        editOrg: function() { //编辑部门
            if (this.loadParam.orgId !== '') {
                this.complierParam.id = this.loadParam.orgId;
                this.complierParam.name = this.loadParam.orgName;
                this.complierParam.bizType = this.initOrgDetail.bizType;
                this.complierParam.code = this.initOrgDetail.code;
                this.complierParam.level = this.initOrgDetail.level;
                this.complierParam.pid = this.initOrgDetail.pid;
                this.complierParam.status = this.initOrgDetail.status;
                this.complierParam.show = true;
                this.complierParam.distinct = 'editparten';
                this.complierParam.title = '编辑部门';
            } else {
                this.tipsParam.show = true;
                this.tipsParam.alert = true;
                this.tipsParam.name = '请选择部门';
                this.tipsParam.confirm = false;
            }
            this.complierParam.callback = this.callback;
        },
        deleteOrg: function(item) { //删除部门
            if (this.loadParam.orgId !== '') {
                item.id = this.loadParam.orgId;
                this.deleteParam = item;
                this.deleteParam.show = true;
                this.deleteParam.title = '此部门';
                console.log(this.deleteParam)
            } else {
                this.tipsParam.show = true;
                this.tipsParam.alert = true;
                this.tipsParam.name = '请选择部门';
                this.tipsParam.confirm = false;
            }
            this.deleteParam.callback = this.callback;
        },
        selectType: function(leave) {
            console.log(leave)
            this.loadParam.leave = leave;
            this.getEmployeeList(this.loadParam);
        },
        newData: function(initEmployeeList) {
            this.createParam = initEmployeeList;
            this.createParam.callback = this.callback;
        },

        callback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getEmployeeList(this.loadParam);
            this.getOrgList(this.loadParam);
            this.transferParam.employeeId = '';
        },
        modify: function(initEmployeeList) {
            this.createParam = initEmployeeList;
            this.createParam.callback = this.callback;
        },
        clickOn: function(initEmployeeList) {
            this.changeParam = initEmployeeList;
            this.changeParam.show = true;
        },
        loadByCondition: function() {
            this.getEmployeeList(this.loadParam);
            this.getOrgList(this.loadParam);
        },
        rest: function() {
            this.loadParam.name = '';
            this.loadParam.mobile = '';
            this.loadParam.orgId = '';
            this.loadParam.orgName = '';
            this.loadParam.orgCode = '';
            this.getEmployeeList(this.loadParam);
        },
        updatePassword: function(no) {
            this.passwordParam.show = true;
            this.passwordParam.no = no;
            this.passwordParam.callback = this.confirmPassword;
        },
        confirmPassword: function() {
            this.passwordParam.callback = this.callback;
            this.updatePawd(this.passwordParam);
        },
        slectedOne: function() {
            this.getEmployeeList(this.loadParam);
            this.loadParam.id = this.loadParam.orgId;
            this.getOrgDetail(this.loadParam)
        },
        quickLogin: function(no) {
            if (this.initLogin.no == "admin") { //只有登录的是系统管理员才能直接登录
                //this.exit();
                this.loginParam.no = no;
                this.loginParam.loginCallback = this.loginCallback;
                this.login(this.loginParam);
            }
        },
        loginCallback: function() {
            this.$route.router.go({
                name: 'home'
            });
        },
        exit: function() {
            document.cookie = "no=;expires=";
            document.cookie = "id=;expires=";
            document.cookie = "orgId=;expires=";
            document.cookie = "name=;expires=";
            this.$route.router.go({
                name: 'login'
            });
        },
    },
    vuex: {
        getters: {
            getList,
            initEmployeeList,
            initOrgList,
            initOrgDetail,
            initLogin
        },
        actions: {
            getEmployeeList,
            updateEmploy,
            createEmploy,
            getOrgList,
            updatePawd,
            transferOrg,
            specDel,
            getOrgDetail,
            alterOrg,
            transferManager,
            login
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmployeeList(this.loadParam);
            this.getOrgList(this.loadParam);
        },
        org: function(org) {
            this.loadParam.orgName = org.orgName;
            this.loadParam.orgCode = org.orgcode;
        },
        selectEmpOrOrg: function(param) {
            this.transferParam.employeeId = param.employeeId;
            this.transferParam.employeeName = param.employeeName;
            this.transferParam.orgId = param.orgId;
            this.transferParam.orgName = param.orgName;
            this.transferOrg(this.transferParam);
        },
        treeview_click: function(param) {
            this.loadParam.orgId = "";
            this.loadParam.orgCode = param.code;
            if (param.children.length == 0) {
                this.loadParam.orgId = param.value;
                this.loadParam.orgName = param.label;
            }

        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getEmployeeList, this.loadParam, localStorage.employeeParam);
        this.getOrgList(this.loadParam);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.myemploy {
    width: 100%;
    white-space: nowrap;
}

.order_search {
    padding: 25px 20px 0 20px;
}

.transfer {
    margin-left: 18px;
}

.name_search {
    position: relative;
    display: inline-block;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
}

.name_search > .new_btn {
    height: 30px;
    padding: 0 10px;
}

#top,
.top {
    max-height: 87px;
    height: 72px;
}

.trans_parten {
    text-align: left;
}

.treeview {
    height: 500px;
    border: 0px;
}

.cover_loading {
    text-align: center;
    position: absolute;
    top: 40%;
    z-index: 1100;
    left: 0;
    right: 0
}

#table_box table th,
#table_box table td {
    width: 90px;
    min-width: 90px;
}

.form-control {
    box-shadow: none;
}
</style>

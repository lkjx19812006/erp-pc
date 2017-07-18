<template>
    <div>
        <!-- 注册客户 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==0">
            <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
            <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
            <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
            <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
            <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
            <personalauth-model :param="personalParam" v-if="personalParam.show"></personalauth-model>
            <companyauth-model :param="companyParam" v-if="companyParam.show"></companyauth-model>
            <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
            <mglist-model>
                <!-- 头部搜索-->
                <div slot="top">
                    <search-model>
                        <div slot="main">
                            <erp-search title="会员名称" :value.sync="loadParam.fullname" @on-keyenter="selectSearch()"></erp-search>
                            <erp-search title="手机号" :value.sync="loadParam.phone" @on-keyenter="selectSearch()"></erp-search>
                            <erp-search title="static.loginClient_id" :value.sync="loadParam.id" @on-keyenter="selectSearch()"></erp-search>
                            <erp-select title="来源" :value.sync='loadParam.source' :options='sourceOptions' @on-change="selectSearch()"></erp-select>
                            <erp-select title="经营类型" :value.sync="loadParam.bizType" :options="bizTypeOptions" @on-change="selectSearch()"></erp-select>
                            <erp-select title="个人认证" :value.sync="loadParam.utype" :options="uTypeOptions" @on-change="selectSearch()"></erp-select>  
                        </div>
                        <div slot="more">
                            <erp-search title="未跟进天数" :value.sync="loadParam.trackingDay" @on-keyenter="selectSearch()"></erp-search>
                            <erp-select title="提取状态" :value.sync="loadParam.transform" :options="transformOptions" @on-change="selectSearch()"></erp-select>
                            <erp-select title="审核状态" :value.sync="loadParam.audit" :options="auditOptions" @on-change="selectSearch()"></erp-select>
                            <erp-select title="企业认证" :value.sync="loadParam.ctype" :options="uTypeOptions" @on-change="selectSearch()"></erp-select>
                        </div>
                        <div slot="handle">
                            <button type="button" class="btn btn-primary" height="24" width="24" @click="selectSearch()">搜索</button>
                            <button type="button" class="btn btn-warning" height="24" width="24" @click="resetCondition()">清空条件</button>
                            <button type="button" class="btn btn-success" height="24" width="24" @click="audit()">审核</button>
                            <button type="button" class="btn btn-primary" height="24" width="24" @click="selectSearch()">刷新</button>
                        </div>
                    </search-model>
                    
                </div>
                <!--中间列表-->
                <div slot="form">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>
                    <table class="table table-hover table_color table-striped " v-cloak id="tab">
                        <thead>
                            <tr>
                                <th>
                                    <!-- <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label> -->
                                </th>
                                <th>ID</th>
                                <th>姓名</th>
                                <!-- <th>昵称</th> -->
                                <th>等级</th>
                                <th>手机</th>
                                <th>手机归属地</th>
                                <!--<th>邮箱</th>-->
                                <!--<th>qq</th>-->
                                <th>所在公司</th>
                                <th>主营业务</th>
                                <th>来源</th>
                                <th>经营类型</th>
                                <th>经营地址</th>
                                <th>审核状态</th>
                                <th>审核说明</th>
                                <th>备注</th>
                                <th>个人认证</th>
                                <th>企业认证</th>
                                <th>提取状态</th>
                                <th>所属业务员</th>
                                <th>注册时间</th>
                                <th style="min-width: 130px;">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in initUserList">
                                <td @click.stop="">
                                    <!-- <label v-if="item.audit!=1" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                            <label v-if="item.audit==1" class="checkbox_unselect"></label> -->
                                    <label v-if="item.audit!=2" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index)"></label>
                                </td>
                                <td>{{item.id}}</td>
                                <td class="underline" v-if="item.fullname==''||item.fullname==null" @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true
                                })">未填写</td>
                                <td class="underline" v-else @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true
                                })">{{item.fullname}}</td>
                                <!-- <td>{{item.nickname}}</td> -->
                                <td v-if="item.grade==0">一星</td>
                                <td v-if="item.grade==1">二星</td>
                                <td v-if="item.grade==2">三星</td>
                                <td v-if="item.grade!=0&&item.grade!=1&&item.grade!=2">其它</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.phoneProvince+item.phoneCity}}</td>
                                <!--<td>{{item.email}}</td>-->
                                <!--<td>{{item.qq}}</td>-->
                                <td>{{item.company}}</td>
                                <td>{{item.bizMain}}</td>
                                <td v-if="item.source==1">
                                    <div style="background:#CC3333;color:#fff">{{item.sourceType}}</div>
                                </td>
                                <td v-if="item.source==2">
                                    <div style="background:green;color:#fff">{{item.sourceType}}</div>
                                </td>
                                <td v-if="item.source==3">
                                    <div style="background:#0000CC;color:#fff">{{item.sourceType}}</div>
                                </td>
                                <td v-if="item.source==4">
                                    <div style="background:#CC0099;color:#fff">{{item.sourceType}}</div>
                                </td>
                                <!-- <td v-if="item.source==4" style="background:#9966FF;color:#fff">{{item.sourceType}}</td> -->
                                <td v-if="item.source!==1&&item.source!==2&&item.source!==3&&item.source!==4">其它</td>
                                <td>{{item.bizTypeName}}</td>
                                <td>{{item.province+item.city}}</td>
                                <td>{{item.auditResult}}</td>
                                <td>{{item.auditComment}}</td>
                                <td>{{item.comment}}</td>
                                <td v-if="item.utype==0" style="color:#3399CC">未申请</td>
                                <td v-if="item.utype==1" style="color:#339966">等待认证</td>
                                <td v-if="item.utype==2">
                                    <div style="background:green;color:#fff">已认证</div>
                                </td>
                                <td v-if="item.utype==3">
                                    <div style="background:red;color:#fff">认证失败</div>
                                </td>
                                <td v-if="item.ctype==0" style="color:#3399CC">未申请</td>
                                <td v-if="item.ctype==1" style="color:#339966">等待认证</td>
                                <td v-if="item.ctype==2">
                                    <div style="background:green;color:#fff">已认证</div>
                                </td>
                                <td v-if="item.ctype==3">
                                    <div style="background:red;color:#fff">认证失败</div>
                                </td>
                                <td v-if="item.transStatus==1">
                                    <div style="color:#fff;background:green">已提取</div>
                                </td>
                                <td v-if="item.transStatus==0">未提取</td>
                                <td v-if="item.transStatus!=0&&item.transStatus!=1">转黑名单</td>
                                <td>{{item.employeeName}}</td>
                                <td>{{item.ctime}}</td>
                                <td>
                                    <div class="operate" @click="modifyUser({
                                    loading:false,
                                    id:item.id,
                                    show:true,
                                    userType:3,
                                    link:alertInfo,
                                    url:'/user/',
                                    key:'userList',
                                    index:$index,
                                    nickname:'',
                                    qq:'',
                                    fullname:'',
                                    email:'',
                                    phone:'',
                                    tel:'',
                                    nickname:'',
                                    company:'',
                                    comment:'',
                                    address:'',
                                    idnumber:'',
                                    bizType:'',
                                    gender:'',
                                    importance:'',
                                    userType:'',
                                    bizMain:'',
                                    grade:item.grade
                                    },item.show=false)"><img src="/static/images/edit.png" height="18" width="30" />
                                    </div>
                                    <div class="operate" v-if="item.transStatus==0&&item.audit==2" @click="userToClient({
                                    mainBiz:item.bizMain,
                                    name:item.fullname,
                                    keyname:'transStatus',
                                    sub:$index,
                                    userId:item.id,
                                    province:'',
                                    phone:item.phone,
                                    tel:item.tel,
                                    email:item.email,
                                    qq:item.qq,
                                    type:0,
                                    scale:0,
                                    nature:0,
                                    advance:1,
                                    capitalReturnDays:0,
                                    classify:'1,买',
                                    fullname:item.fullname,
                                    show:true,
                                    key:'userList',
                                    countryId:7,
                                    countryName:'中国',
                                    contact:{
                                     name: item.fullname,
                                     position: '',
                                     department: '',
                                     phone: item.phone,
                                     tel: item.tel,
                                     email: item.email,
                                     qq: item.qq,
                                     wechart: item.wechart
                                     }
                                    },item.show=false)"><img src="/static/images/convert.png" height="18" width="30" />
                                    </div>
                                    <div class="operate" v-if="item.utype==1" @click="personalAuth({id:item.id,index:$index,ucomment:item.ucomment,utype:1},item.show=false)"><img src="/static/images/Pcertification.png" height="18" width="47" />
                                    </div>
                                    <div class="operate" v-if="item.ctype==1" @click="companyAuth({id:item.id,index:$index,ccomment:item.ccomment,ctype:1},item.show=false)"><img src="/static/images/Ecertification.png" height="18" width="48" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--底部分页-->
                <pagination :combination="loadParam" slot="page"></pagination>
            </mglist-model>
        </div>
        <!-- 会员意向 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==4">
            <user-intention></user-intention>
        </div>
        <!-- 注册客户反馈 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==1">
            <user-feedback></user-feedback>
        </div>
        <!-- 注册订单列表 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==2">
            <register-order-list></register-order-list>
        </div>
    </div>
</template>
<script>
import userIntention from '../components/Intention/intentionList/userIntention.vue'
import userFeedback from '../components/user/userFeedback'
import tipsdialogModel from '../components/tips/tipDialog'
import calendar from '../components/calendar/vue.datepicker'
import alterinfoModel from '../components/user/userUpdate'
import transferModel from '../components/user/userTransfer'
import auditModel from '../components/user/userAudit'
import detailModel from '../components/user/userDetail'
import intentionModel from '../components/user/userIntention'
import common from '../common/common'
import changeMenu from '../components/tools/tabs/tabs.js'
import pagination from '../components/pagination'
import personalauthModel from '../components/user/personalAuth'
import companyauthModel from '../components/user/companyAuth'
import mglistModel from '../components/mguan/mgListComponent.vue'
import registerOrderList from '../components/order/registerOrderList'
import {
    bizTypeOptions,
    sourceOptions,
    transformOptions,
    auditOptions,
    uTypeOptions
} from '../common/searchData.js'
import {
    getCount,
    initUserList,
    initUserDetail,
    getIsTop
} from '../vuex/getters'
import {
    getUserList,
    getUserDetail,
} from '../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        pagination,
        calendar,
        alterinfoModel,
        transferModel,
        detailModel,
        intentionModel,
        auditModel,
        personalauthModel,
        companyauthModel,
        mglistModel,
        userIntention,
        registerOrderList,
        userFeedback
    },
    data() {
        return {
            list: {
                all: 8,
                cur: 1
            },
            sourceOptions:sourceOptions,
            bizTypeOptions:bizTypeOptions,
            uTypeOptions:uTypeOptions,
            transformOptions:transformOptions,
            auditOptions:auditOptions,
            loadParam: {
                loading: true,
                show: false,
                fullname: '',
                id: '',
                source: '',
                bizMain: '',
                bizType: '',
                phone: '',
                startCtime: '',
                endCtime: '',
                audit: '',
                transform: '',
                ctype: '',
                utype: '',
                trackingDay: '', //几天未联系
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                city: '',
                province: '',
                total: 0
            },
            tipsParam: {
                show: false,
                alert: true,
                name: "请选择会员"
            },

            alterParam: {
                show: false,
                loading: true,
                id: '',
                name: ''
            },
            auditParam: {
                show: false,
                indexs: [],
                userIds: [],
                auditComment: '',
                audit: ''
            },

            transferParam: {
                show: false,
                id: '',
                name: '',
                /*employeeId:'',
                employeeName:'',
                orgCode:'0001002',
                orgName:'',*/
                province: '',
                city: ''
            },
            changeParam: {
                show: false
            },
            intentionParam: {
                show: false,
                flag: 0,
                userId: this.initUserDetail.id,
                //fullname:this.initUserDetail.fullname,
                customerName: this.initUserDetail.fullname,
                //phone:this.initUserDetail.phone,
                customerPhone: this.initUserDetail.phone,
                breedName: '',
                price: '',
                unit: '',
                especial: '',
                quality: '',
                spec: '',
                number: '',
                location: '',
                type: '',
                country: '',
                province: '',
                city: '',
                district: '',
                address: '',
                invoic: '',
                sampling: '',
                sampleUnit: '',
                advance: '',
                intl: '',
                sampleNumber: 0,
                sampleAmount: 0,
                qualification: '',
                url: '/intention/',
                inType: 2
            },
            checked: false,
            personalParam: {
                show: false,
                utype: 1
            },
            companyParam: {
                show: false,
                ctype: 1
            },

        }
    },
    vuex: {
        getters: {
            // note that you're passing the function itself, and not the value 'getCount()'
            counterValue: getCount,
            initUserList,
            initUserDetail,
            getIsTop

        },
        actions: {
            getUserList,
            getUserDetail,

        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getUserList(this.loadParam);
            this.checked = false;
        }
    },

    methods: {
        selectSearch: function() {
            if (!this.loadParam.trackingDay.match(/^([0-9]|[1-9][0-9]{1,2})$/) && this.loadParam.trackingDay !== '') {
                this.tipsParam.show = true;
                this.tipsParam.name = "请输入至多三位的整数";
                this.tipsParam.alert = true;
                return;
            }
            this.getUserList(this.loadParam)
        },
        clickOn: function(item) {
            this.changeParam = item;
            //this.getUserDetail(this.changeParam);
        },
        eventClick: function(id) {
            if (this.$store.state.table.basicBaseList.userList[id].show) {
                this.$store.state.table.basicBaseList.userList[id].show = !this.$store.state.table.basicBaseList.userList[id].show;
            } else {
                this.$store.state.table.basicBaseList.userList[id].show = true;
            }
        },
        resetCondition: function() {
            this.loadParam.fullname = "";
            this.loadParam.id = "";
            this.loadParam.source = "";
            this.loadParam.bizMain = "";
            this.loadParam.bizType = "";
            this.loadParam.phone = "";
            this.loadParam.startCtime = "";
            this.loadParam.endCtime = "";
            this.loadParam.audit = "";
            this.loadParam.transform = "";
            this.loadParam.city = "";
            this.loadParam.utype = "";
            this.loadParam.ctype = "";
            this.loadParam.province = "";
            this.loadParam.trackingDay = "";
            this.getUserList(this.loadParam);
        },
        onlyselected: function(index) {
            const _self = this;
            this.$store.state.table.basicBaseList.userList[index].checked = !this.$store.state.table.basicBaseList.userList[index].checked;
            if (_self.checked) {
                _self.checked = false;
            } else {
                _self.checked = true;
                this.$store.state.table.basicBaseList.userList.forEach(function(item) {
                    if (!item.checked) {
                        if (item.audit != 2) _self.checked = item.checked;
                    }
                })
            }
        },
        select: function() {
            this.checked = !this.checked;
            const checked = this.checked;
            this.$store.state.table.basicBaseList.userList.forEach(function(item) {
                if (item.audit != 2) item.checked = checked;
            })


        },
        audit: function() {
            var _this = this;
            _this.auditParam.userIds = [];
            _this.auditParam.indexs = [];
            _this.checked = false;
            for (var i = 0; i < this.initUserList.length; i++) {
                if (this.$store.state.table.basicBaseList.userList[i].checked) {
                    _this.auditParam.userIds.push(this.$store.state.table.basicBaseList.userList[i].id);
                    _this.auditParam.indexs.push(i);
                }
            }
            if (this.auditParam.userIds.length > 0) {
                this.auditParam.show = true;
            } else {
                this.tipsParam.show = true;
                this.tipsParam.name = "请选择会员";
                this.tipsParam.alert = true;
            }

        },

        loadByCondition: function() {
            this.getUserList(this.loadParam);
        },
        search: function() {
            this.loadParam.loading = false;
            this.loadParam.show = true;

        },
        createUser: function(value) {
            this.createParam.show = true;
            //this.createParam.name=value;
        },

        clientTransfer: function(value) {
            this.transferParam.show = true;
            this.transferParam.name = value;
        },
        modifyUser: function(item) {
            this.alterParam = item;
            this.alterParam.callback = this.editback;
        },
        editback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        },
        userToClient: function(item) {
            this.transferParam = item;
            this.transferParam.callback = this.transferback;
        },
        transferback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.selectSearch();
        },
        createIntention: function() {
            this.intentionParam = {
                show: false,
                flag: 0,
                userId: this.initUserDetail.id,
                //fullname:this.initUserDetail.fullname,
                customerName: this.initUserDetail.fullname,
                //phone:this.initUserDetail.phone,
                customerPhone: this.initUserDetail.phone,
                breedName: '',
                price: '',
                unit: '',
                especial: 1,
                quality: '',
                spec: '',
                number: '',
                location: '',
                type: 0,
                visit: 0,
                country: '',
                province: '',
                city: '',
                district: '',
                address: '',
                invoic: 0,
                sampling: 0,
                sampleUnit: '',
                advance: 0,
                intl: 0,
                sampleNumber: 0,
                sampleAmount: 0,
                qualification: '',
                url: '/intention/',
                inType: 2
            };
            this.intentionParam.show = true;
        },
        personalAuth: function(item) {
            this.personalParam.show = true;
            this.personalParam.id = item.id;
            this.personalParam.index = item.index;
            this.personalParam.ucomment = item.ucomment;
            this.personalParam.utype = item.utype;
        },
        companyAuth: function(item) {
            this.companyParam.show = true;
            this.companyParam.id = item.id;
            this.companyParam.index = item.index;
            this.companyParam.ccomment = item.ccomment;
            this.companyParam.ctype = item.ctype;
        },

    },
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getUserList, this.loadParam, localStorage.userParam);
    }

}
</script>
<style scoped>
.component_action {
    right: 32px;
    top: 50%;
    padding: 3px 0;
}

.transfer {
    margin-right: 16px;
}

.service-nav {
    padding: 23px 30px 0px 4px;
}

#table_box table th,
#table_box table td {
    min-width: 70px;
    width:100px;
}

dl {
    margin-bottom: 5px;
}

.base_pagination {
    text-align: center;
    position: fixed;
    height: 64px;
    bottom: 0px;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 10;
}
</style>

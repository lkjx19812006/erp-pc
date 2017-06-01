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
                    <div class="clear" style="margin-top:3px;">
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">会员名称：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.fullname" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                            </dd>
                            <!-- 客户id -->
                            <dt class="left transfer marg_top" style="margin-left:5px">{{$t("static.loginClient_id")}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.id" placeholder="{{$t('static.Enter_search')}}" @keyup.enter="selectSearch()">
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top" style="letter-spacing:8px">来源：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.source" @change="selectSearch()">
                                    <option value="">全部</option>
                                    <option value="1">PC</option>
                                    <option value="2">安卓</option>
                                    <option value="3">微信</option>
                                    <option value="4">IOS</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer ">
                            <dt class="left transfer marg_top">经营类型：</dt>
                            <dd class="left">
                                <select v-model="loadParam.bizType" class="form-control" @change="selectSearch()">
                                    <option value="">全部</option>
                                    <option value="0">其它</option>
                                    <option value="1">合作社</option>
                                    <option value="2">药商</option>
                                    <option value="3">药厂</option>
                                    <option value="4">个体户</option>
                                    <option value="5">药店</option>
                                    <option value="6">医院</option>
                                    <option value="7">贸易公司</option>
                                    <option value="8">零售商行</option>
                                    <option value="9">药农</option>
                                    <option value="10">介绍人</option>
                                    <option value="11">药贩子</option>
                                    <option value="12">产地药商</option>
                                    <option value="13">销地药商</option>
                                    <option value="14">养生诊所</option>
                                    <option value="15">化工厂</option>
                                    <option value="16">化妆品厂</option>
                                    <option value="17">提取物厂</option>
                                    <option value="18">食品厂</option>
                                    <option value="19">实验室</option>
                                    <option value="20">网上电商</option>
                                    <option value="21">中成药生产商</option>
                                    <option value="22">西药生产商</option>
                                    <option value="23">饮片厂</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">个人认证：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.utype" @change="selectSearch()">
                                    <option value="">全部</option>
                                    <option value="0">未申请</option>
                                    <option value="1">等待认证</option>
                                    <option value="2">已认证</option>
                                    <option value="3">认证失败</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">未跟进天数：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.trackingDay" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                            </dd>
                        </dl>
                        <dd class="left" style="margin-left:20px">
                            <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
                        </dd>
                    </div>
                    <div class="clear" style="margin-top:3px;">
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top" style="letter-spacing:3px">手机号：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.phone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">提取状态：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.transform" @change="selectSearch()">
                                    <option value="">全部</option>
                                    <option value="0">待提取</option>
                                    <option value="1">已提取</option>
                                    <!-- <option value="2">转黑</option> -->
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">审核状态：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.audit" @change="selectSearch()">
                                    <option value="">全部</option>
                                    <option value="0">待审核</option>
                                    <option value="1">审核中</option>
                                    <option value="2">审核通过</option>
                                    <option value="3">审核不通过</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">企业认证：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.ctype" @change="selectSearch()">
                                    <option value="">全部</option>
                                    <option value="0">未申请</option>
                                    <option value="1">等待认证</option>
                                    <option value="2">已认证</option>
                                    <option value="3">认证失败</option>
                                </select>
                            </dd>
                        </dl>
                        <dd class="left" style="margin-left:20px">
                            <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                        </dd>
                        <dd class="pull-right">
                            <button type="button" class="btn btn-default" height="24" width="24" @click="audit()">审核</button>
                            <button type="button" class="btn btn-primary" height="24" width="24" @click="selectSearch()">刷新</button>
                        </dd>
                    </div>
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
        <div class="myOrder" v-if="$route.path.split('=')[1]==1">
            <user-intention></user-intention>
        </div>
        <!-- 注册订单列表 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==2">
            <register-order-list></register-order-list>
        </div>
    </div>
</template>
<script>
import userIntention from '../components/Intention/intentionList/userIntention.vue'
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
        registerOrderList
    },
    data() {
        return {
            list: {
                all: 8,
                cur: 1
            },
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
    min-width: 88px;
    width: 88px;
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

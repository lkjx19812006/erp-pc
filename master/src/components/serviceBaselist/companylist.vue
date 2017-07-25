<template>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <detail-model :param="companyParam" v-if="companyParam.show"></detail-model>
    <search-model :param="loadParam" v-if="loadParam.show"></search-model>
    <update-model :param="updateParam" v-if="updateParam.show"></update-model>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
            <div class="clearfix">
                <div class="pull-right">
                    <button class="btn btn-primary transfer" @click="selectSearch()">刷新</button>
                </div>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">类别：</dt>
                    <dd class="left">
                        <select class="form-control" v-model="loadParam.conType" @change="selectSearch()">
                            <option value="" selected>全部</option>
                            <option value="MF">药厂</option>
                            <option value="CF">化妆品厂</option>
                            <option value="FF">食品厂</option>
                            <option value="HF">保健品厂</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">是否划转：</dt>
                    <dd class="left">
                        <select v-model="loadParam.transform" class="form-control" @change="selectSearch()">
                            <option value="" selected>全部</option>
                            <option value=1>已划转</option>
                            <option value=0>未划转</option>
                            <option value="-2">已过期</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">企业名称：</dt>
                    <dd class="left">
                        <input type="text" v-model="loadParam.name" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()" />
                    </dd>
                </dl>

                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">所在省：</dt>
                    <dd class="left">
                        <input type="text" v-model="loadParam.province" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()" />
                    </dd>
                </dl>
                <button class="btn btn-default transfer" @click="selectSearch()">搜索</button>
                <button class="btn btn-default transfer" @click="resetCondition()">清空条件</button>
            </div>
        </div>
        <!-- 中间列表 -->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped" id="tab">
                <thead>
                    <tr>
                        <th>分类码</th>
                        <th>类别</th>
                        <th>企业名称</th>
                        <th>电 话</th>
                        <th>企业代表人</th>
                        <th style="min-width: 250px;">经营范围</th>
                        <th>所在省</th>
                        <th>所在市</th>
                        <th>业务员</th>
                        <th>注册地址</th>
                        <th>是否转为客户</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initEnterpriselist">
                        <td>{{item.category | categorystate}}</td>
                        <td>{{item.type}}</td>
                        <td class="underline" @click="companyDetail(item.id,$index)">{{item.name}}</td>
                        <td>{{item.tel | telstate}}</td>
                        <td>{{item.principal}}</td>
                        <td style="min-width: 250px;">{{item.bizScope}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.address}}</td>
                        <td v-if="!item.transform">否</td>
                        <td v-if="item.transform">是</td>
                        <td>{{item.remark}}</td>
                        <td>
                            <a class="operate" @click="updateCompany({
                                        sub:$index,
                                        show:true,
                                        name:item.name,
                                        url:'/company/',
                                        key:'enterpriseList',
                                        id:item.id,
                                        tel:item.tel,
                                        remark:item.remark,
                                        link:updateEnterprise
                                        })"><img src="/static/images/edit.png" alt="编辑" title="编辑" />
                            </a>
                            <a class="operate" @click="createCustomer({
                                        keyname:'transform',
                                        sub:$index,
                                        show:true,
                                        key:'enterpriseList',
                                        companyId:item.id,
                                        category:item.type,
                                        classify:'1,买',
                                        type:0,
                                        name:item.name,
                                        tel:item.tel,
                                        principal:item.principal,
                                        legalPerson:item.legalPerson,
                                        bizScope:item.bizScope,
                                        province:item.province,
                                        number:item.number,
                                        city:item.city,
                                        address:item.address,
                                        employeeId:'',
                                        employeeName:'',
                                        orgId:'',
                                        orgName:'',
                                        countryId:7,
                                        countryName:'中国'
                                        })" v-if="!item.transform"><img src="/static/images/convert.png" height="18" width="28" alt="提取" title="划转" /></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 底部分页 -->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import pagination from '../../components/pagination'
import filter from '../../filters/filters'
import detailModel from '../serviceBaselist/companydetail'
import transferModel from '../user/userTransfer'
import searchModel from './companySearch'
import updateModel from '../serviceBaselist/breedDetailDialog/updateEnterprise'
import common from '../../common/common'
import tipsModel from '../../components/tips/tipDialog'
import mglistModel from '../mguan/mgListComponent.vue'
import {
    initEnterpriselist,
    initProvince
} from '../../vuex/getters'
import {
    getEnterpriseData,
    getCompanyDetail,
    getCompanyData,
    getProvinceList,
    updateEnterprise
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        filter,
        detailModel,
        transferModel,
        searchModel,
        updateModel,
        tipsModel,
        mglistModel
    },
    data() {
        return {
            loadParam: {
                show: false,
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 8,
                id:'',
                name: '',
                conType: '',
                province: '',
                category: '',
                transform: '',
                city: '',
                total: 0
            },
            tipsParam: {
                show: false,
                alert: true,
                name: ''
            },
            companyParam: {
                id: '',
                show: false,
                loading: false
            },
            updateParam: {
                show: false,
            },
            transferParam: {
                show: false,

            },
        }
    },
    vuex: {
        getters: {
            initEnterpriselist,
            initProvince
        },
        actions: {
            getEnterpriseData,
            getCompanyDetail,
            getCompanyData,
            getProvinceList,
            updateEnterprise
        }

    },

    methods: {
        selectSearch: function() {
            this.getCompanyData(this.loadParam)
        },
        companyDetail: function(id, index) {
            this.companyParam.show = true;
            this.companyParam.id = id;
            this.companyParam.sub = index;
            this.companyParam.loading = true;
            this.getCompanyDetail(this.companyParam);
        },
        multiSearch: function() {
            this.getCompanyData(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.id='';
            this.loadParam.name = '';
            this.loadParam.conType = '';
            this.loadParam.conProvince = '';
            this.loadParam.category = '';
            this.loadParam.transform = '';
            this.loadParam.province = '';
            this.getEnterpriseData(this.loadParam);
        },
        companyClick: function(sub) {
            console.log(this.$store.state.table.basicBaseList.enterpriseList[sub].show);
            if (this.$store.state.table.basicBaseList.enterpriseList[sub].show) {
                this.$store.state.table.basicBaseList.enterpriseList[sub].show = !this.$store.state.table.basicBaseList.enterpriseList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.enterpriseList[sub].show = true;
            }
        },
        updateCompany: function(initEnterpriselist) {
            this.updateParam = initEnterpriselist;
            this.updateParam.callback = this.callback;
        },
        createCustomer: function(initEnterpriselist) {
            initEnterpriselist.employeeId = this.$store.state.table.login.id;
            initEnterpriselist.employeeName = this.$store.state.table.login.name;
            initEnterpriselist.orgId = this.$store.state.table.login.orgId;
            this.transferParam = initEnterpriselist;

            const obj = {
                '保健品厂': "HF",
                '药厂': "MF",
                '化妆品厂': "CF",
                '食品厂': "FF"
            }
            this.transferParam.category = obj[this.transferParam.category];
            this.transferParam.show = true;
            this.transferParam.callback = this.callback;
        },
        callback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.alert = true;
            this.tipsParam.name = title;
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEnterpriseData(this.loadParam);
            this.getCompanyData(this.loadParam);

        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {}),
    created() {
        this.getEnterpriseData(this.loadParam);
        this.getProvinceList(this.loadParam);
    }
}
</script>
<style scoped>
.name_search {
    margin-right: 3%;
}

.new_btn {
    padding: 7px 10px;
    float: none;
    cursor: pointer;
}

.transfer {
    margin-right: 15px;
}

#table_box table th,
#table_box table td {
    width: 121px;
    min-width: 121px;
}
</style>

<template>
    <relative-company :param="relativeParam" v-if="relativeParam.show"></relative-company>
    <product-detail :param="detailParam" v-if="detailParam.show"></product-detail>
    <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
            <div class="clearfix">
                <div class="pull-right">
                    <button class="btn btn-primary transfer" @click="selectSearch()">刷新</button>
                </div>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">产品名称：</dt>
                    <dd class="left">
                        <input type="text" v-model="loadParam.name" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">产品类别：</dt>
                    <dd class="left">
                        <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                            <option value="" selected>全部</option>
                            <option value="中成药">中成药</option>
                            <option value="药材">药材</option>
                            <option value="提取物">提取物</option>
                            <option value="饮片">饮片</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">公司名称：</dt>
                    <dd class="left">
                        <input type="text" v-model="loadParam.companyName" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">批准文号：</dt>
                    <dd class="left">
                        <input type="text" v-model="loadParam.approvalNo" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()" />
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
                        <th>产品名称</th>
                        <th>产品类型</th>
                        <th>公司名称</th>
                        <th>产品规格</th>
                        <th>批准文号</th>
                        <th>批准时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initCompanyProductlist">
                        <td><a @click="getDetail(item.id)">{{item.name}}</a></td>
                        <td>{{item.type}}</td>
                        <td>{{item.companyName}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.approvalNo}}</td>
                        <td>{{item.approvalTime}}</td>
                        <td><a @click="getRelativeCompany(item.name)">关联企业</a></td>
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
import common from '../../common/common'
import tipsModel from '../../components/tips/tipDialog'
import mglistModel from '../mguan/mgListComponent.vue'
import relativeCompany from './relativeCompanyList'
import productDetail from './companyProductDetail'
import {
    initCompanyProductlist
} from '../../vuex/getters'
import {
    getCompanyProduct
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        filter,
        tipsModel,
        mglistModel,
        relativeCompany,
        productDetail
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
                total: 0,
                name: '',
                type: '',
                approvalNo: '',
                companyName: ''

            },
            relativeParam: {
                show: false,
                link: '/company/getCompanyByProductName',
                name: ''
            },
            detailParam: {
                show: false,
                link: '/company/getProductDetail/',
                id: ''
            }
        }
    },
    vuex: {
        getters: {
            initCompanyProductlist
        },
        actions: {
            getCompanyProduct
        }

    },

    methods: {
        selectSearch: function() {
            this.getCompanyProduct(this.loadParam)
        },
        resetCondition: function() {
            this.loadParam.name = '';
            this.loadParam.type = '';
            this.loadParam.approvalNo = '';
            this.loadParam.companyName = '';
            this.getCompanyProduct(this.loadParam);
        },
        getRelativeCompany: function(name) {
            this.relativeParam.name = name;
            this.relativeParam.show = true;
        },
        getDetail: function(id) {
            this.detailParam.show = true;
            this.detailParam.id = id;
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getCompanyProduct(this.loadParam);
        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {}),
    created() {
        this.getCompanyProduct(this.loadParam);
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
    width: 242px;
    min-width: 242px;
}
</style>

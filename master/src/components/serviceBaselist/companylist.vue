<template>

    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <detail-model  :param="companyParam" v-if="companyParam.show"></detail-model>
    <search-model  :param="loadParam" ></search-model>
    <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div v-show="!companyParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">企业</div>
            <div class="col-xs-10 my_order_search">
                <!--<div class="name_search clearfix" style="border:none">-->
                    <!--<select class="form-control" v-model="loadParam.conProvince" @change="multiSearch()">-->
                         <!--<option value="" selected>按省条件搜索</option>-->
                         <!--<option v-for="item in initProvince">{{item.cname}}</option>-->
                     <!--</select>-->
                <!--</div>-->
                <!--<div class="name_search clearfix" style="border:none">-->
                     <!--&lt;!&ndash; <img src="/static/images/search.png" height="24" width="24"> &ndash;&gt;-->
                     <!--&lt;!&ndash; <input type="text" class="search_input" placeholder="按类别搜索" v-model="loadParam.conType"/> &ndash;&gt;-->
                     <!--<select class="form-control" v-model="loadParam.conType" @change="multiSearch()">-->
                         <!--<option value="" selected>按类别搜索</option>-->
                         <!--<option value="MF">药厂</option>-->
                         <!--<option value="CF">化妆品厂</option>-->
                         <!--<option value="FF">食品厂</option>-->
                         <!--<option value="HF">保健品厂</option>-->
                     <!--</select>-->
                <!--</div>-->
                <!--<div class="name_search clearfix" style="border:none">-->
                    <!--&lt;!&ndash; <img src="/static/images/search.png" height="24" width="24">-->
                      <!--<input type="text" class="search_input" placeholder="按客户是否划转搜索" v-model="loadParam"/> &ndash;&gt;-->
                     <!--<select class="form-control" v-model="loadParam.transform" @change="multiSearch()">-->
                         <!--<option value="" selected>根据客户划转</option>-->
                         <!--<option value="">已划转</option>-->
                         <!--<option value="">未划转</option>-->
                     <!--</select>-->
                <!--</div>-->
                 <!--<div class="name_search clearfix">-->
                    <!--<img src="/static/images/search.png" height="24" width="24">-->
                    <!--<input type="text" class="search_input" placeholder="按企业名称搜索" v-model="loadParam.conName" >-->
                <!--</div>-->
                 <!--<div class="name_search clearfix">-->
                    <!--<img src="/static/images/search.png" height="24" width="24">-->
                    <!--<input type="text" class="search_input" placeholder="按分类码搜索" v-model="loadParam.category"/>-->
                <!--</div>-->
                <!-- <a class="new_btn transfer"  @click="multiSearch()">查询</a> -->
                <a class="new_btn transfer" style="float:right"  @click="loadParam.show=true">查询</a>
            </div>
           <!--  <div class=" col-xs-1">
               <a class="new_btn transfer" @click="multiSearch()">查询</a>
           </div> -->
        </div>

        <div class="order_table" v-cloak>
            <table class="table table-hover table_color table-striped">
                <thead>
                    <tr>
                        <th>分类码</th>
                        <th>类别</th>
                        <th>企业名称</th>
                        <th>电 话</th>
                        <th>企业代表人</th>
                        <th>经营范围</th>
                        <th>所在省</th>
                        <th>所在市</th>
                        <th>注册地址</th>
                        <th>是否转为客户</th>
                        <th></th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initEnterpriselist">
                        <td>{{item.category | categorystate}}</td>
                        <td>{{item.type}}</td>
                        <td  class="underline"  @click="companyDetail(item.id,$index)">{{item.name}}</td>
                        <td>{{item.tel | telstate}}</td>
                        <td>{{item.principal}}</td>
                        <td>{{item.bizScope}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.address}}</td>
                        <td v-if="!item.transform">否</td>
                        <td v-if="item.transform">是</td>
                        <td  >
                          <div v-if="!item.transform" @click="companyClick($index)">
                            <img height="24" width="24" src="../../../static/images/default_arrow.png" />
                            <div class="breed_action" v-show="item.show">
                                <ul>
                                    <li @click="createCustomer({
                                        keyname:'transform',
                                        sub:$index,
                                        show:true,
                                        key:'enterpriseList',
                                        companyId:item.id,
                                        category:item.type,
                                        type:'1,企业',
                                        name:item.name,
                                        tel:item.tel,
                                        principal:item.principal,
                                        bizScope:item.bizScope,
                                        province:item.province,
                                        city:item.city,
                                        address:item.address,
                                        employeeId:'',
                                        employeeName:'',
                                        orgId:'',
                                        orgName:'',
                                        countryId:7,
                                        countryName:'中国'
                                        })">划转</li>
                                </ul>
                            </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
</template>
<script>
import pagination from '../../components/pagination'
import filter from '../../filters/filters'
import detailModel  from '../serviceBaselist/companydetail'
import transferModel  from '../user/userTransfer'
import searchModel from './companySearch'

import {
    initEnterpriselist,
    initProvince
} from '../../vuex/getters'
import {
    getEnterpriseData,
    getCompanyDetail,
    getCompanyData,
    getProvinceList
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        filter,
        detailModel,
        transferModel,
        searchModel
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
            getProvinceList
        }
    },
    data() {
        return {
            loadParam: {
                show:false,
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 8,
                conName:'',
                conType:'',
                conProvince:'',
                category:'',
                transform:''
            },
            companyParam:{
                id:'',
                show:false
            },

            transferParam:{
                show:false,

            },
        }
    },
    created() {
        this.getEnterpriseData(this.loadParam)
        this.getProvinceList(this.loadParam)
    },
    methods: {
        companyDetail:function(id,index){
            this.companyParam.show = true;
            this.companyParam.id = id;
            this.companyParam.sub=index;
            this.getCompanyDetail(this.companyParam);
        },
        multiSearch:function(){
            this.getCompanyData(this.loadParam);
        },
        companyClick:function(sub){
            console.log(sub);
            console.log(this.$store.state.table.basicBaseList.enterpriseList[sub].show);
            if(this.$store.state.table.basicBaseList.enterpriseList[sub].show) {
                this.$store.state.table.basicBaseList.enterpriseList[sub].show = !this.$store.state.table.basicBaseList.enterpriseList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.enterpriseList[sub].show = true;
            }
        },
        createCustomer:function(initEnterpriselist){
            this.transferParam=initEnterpriselist;

            const obj={
              '保健品厂':"HF",
              '药厂':"MF",
              '化妆品厂':"CF",
              '食品厂':"FF"
            }
            this.transferParam.category=obj[this.transferParam.category];

          this.transferParam.show=true;
            console.log(this.transferParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEnterpriseData(this.loadParam);
            this.getCompanyData(this.loadParam);
        }
    },
    filter: (filter, {})
}
</script>
<style scoped>

.name_search{
    margin-right:3%;
}
.new_btn{
    float: none;
}
</style>

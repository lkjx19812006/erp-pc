<template>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <detail-model  :param="companyParam" v-if="companyParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <update-model :param="updateParam" v-if="updateParam.show"></update-model>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">企业</div>
            <div class="my_order_search">
                <a class="new_btn transfer" style="float:right"  @click="loadParam.show=true">查询</a>
            </div>
        </div>

        <div class="order_table" v-cloak>
             <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
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
                        <th>业务员</th>
                        <th>注册地址</th>
                        <th>是否转为客户</th>
                        <th>备注</th>
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
                        <td>{{item.employeeName}}</td>
                        <td>{{item.address}}</td>
                        <td v-if="!item.transform">否</td>
                        <td v-if="item.transform">是</td>
                        <td>{{item.remark}}</td>
                        <td>
                          <div  @click="companyClick($index)">
                            <img height="24" width="24" src="../../../static/images/default_arrow.png" />
                            <div class="breed_action" v-show="item.show">
                                <ul>
                                    <li v-if="!item.transform" @click="createCustomer({
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
                                        })">划转</li>
                                    <li @click="updateCompany({
                                        sub:$index,
                                        show:true,
                                        name:item.name,
                                        url:'/company/',
                                        key:'enterpriseList',
                                        id:item.id,
                                        tel:item.tel,
                                        remark:item.remark,
                                        link:updateEnterprise
                                        })">编辑</li>
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
import updateModel from '../serviceBaselist/breedDetailDialog/updateEnterprise'
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
        updateModel
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
                province:'',
                category:'',
                transform:'',
                city:''
            },
            companyParam:{
                id:'',
                show:false
            },
            updateParam:{
                show:false,
            },
            transferParam:{
                show:false,

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
            console.log(this.$store.state.table.basicBaseList.enterpriseList[sub].show);
            if(this.$store.state.table.basicBaseList.enterpriseList[sub].show) {
                this.$store.state.table.basicBaseList.enterpriseList[sub].show = !this.$store.state.table.basicBaseList.enterpriseList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.enterpriseList[sub].show = true;
            }
        },
        updateCompany:function(initEnterpriselist){
            this.updateParam=initEnterpriselist;
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
    filter: (filter, {}),
    created() {
        this.getEnterpriseData(this.loadParam)
        console.log(this.loadparam)
        this.getProvinceList(this.loadParam)
    }
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

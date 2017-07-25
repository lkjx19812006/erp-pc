<template>
    <relative-company :param="relativeParam" v-if="relativeParam.show"></relative-company>
    <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
            <div class="clearfix">
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">证书名称：</dt>
                   <dd class="left">
                        <input type="text" v-model="loadParam.name" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()"/>
                   </dd>
                </dl>
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">公司名称：</dt>
                   <dd class="left">
                        <input type="text" v-model="loadParam.companyName" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()"/>
                   </dd>
                </dl>

                <div class="clear left transfer">
                    <dt class="left transfer marg_top">起始时间：</dt>
                    <mz-datepicker :time.sync="loadParam.releaseDateStart" format="yyyy-MM-dd HH:mm:ss">
                    </mz-datepicker>
                </div>
            </div>

            <div class="clearfix">
                <div class="pull-right" >
                    <button class="btn btn-primary transfer"   @click="selectSearch()">刷新</button>
                </div>
                
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">证书编号：</dt>
                   <dd class="left">
                        <input type="text" v-model="loadParam.number" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()"/>
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">产品名称：</dt>
                   <dd class="left">
                        <input type="text" v-model="loadParam.productName" class="form-control" placeholder="按回车搜索" @keyup.enter="selectSearch()"/>
                   </dd>
                </dl>

                <div class="clear left transfer">
                    <dt class="left transfer marg_top">结束时间：</dt>
                    <mz-datepicker :time.sync="loadParam.releaseDateEnd" format="yyyy-MM-dd HH:mm:ss">
                    </mz-datepicker>
                </div>

                <!-- <dl class="clear left transfer">
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
                </dl> -->
                
                
                <button class="btn btn-default transfer"  @click="selectSearch()">搜索</button>
                <button class="btn btn-default transfer"  @click="resetCondition()">清空条件</button>
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
                        <th>证书名称</th>
                        <th>证书编号</th>
                        <th>公司名称</th>
                        <th>产品名称</th>
                        <th>发证日期</th>
                        <th>过期时间</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initCompanyLicenselist">
                        <td><a @click="getRelativeCompany(item.name)">{{item.name}}</a></td>
                        <td>{{item.number}}</td>
                        <td>{{item.companyName}}</td>
                        <td>{{item.productName}}</td>
                        <td>{{item.releaseDate}}</td>
                        <td>{{item.dueDate}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
         <!-- 底部分页 -->
        <pagination :combination="loadParam"  slot="page"></pagination>
    </mglist-model>
    
</template>
<script>
import pagination from '../../components/pagination'
import filter from '../../filters/filters'
import common from '../../common/common'
import tipsModel from '../../components/tips/tipDialog'
import mglistModel from '../mguan/mgListComponent.vue'
import mzDatepicker from '../calendar/vue.datepicker.js'
import relativeCompany from './relativeCompanyList'
import {
    initCompanyLicenselist
} from '../../vuex/getters'
import {
    getCompanyLicense
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        filter,
        tipsModel,
        mglistModel,
        mzDatepicker,
        relativeCompany
    },
    data() {
        return {
            loadParam: {
                show:false,
                loading: true,
                color: '#5dc596',
                size: '15px',
                id:'',
                cur: 1,
                all: 8,
                total:0,
                name:'',  //证书名称
                companyName:'',   //企业名称
                productName:'',   //产品名称
                number:'',   //证书编号
                releaseDateStart:'',   //发证起始时间
                releaseDateEnd:''      //发证结束时间
            },
            relativeParam: {
                show: false,
                link:'/company/getCompanyByLicenseName',
                name: ''
            }
        }
    },
    vuex: {
        getters: {
            initCompanyLicenselist
        },
        actions: {
            getCompanyLicense
        }

    },

    methods: {
        selectSearch:function(){
            this.getCompanyLicense(this.loadParam)
        },
        resetCondition:function(){
            this.loadParam.name='';
            this.loadParam.number='';
            this.loadParam.companyName='';
            this.loadParam.productName='';
            this.loadParam.releaseDateStart='';
            this.loadParam.releaseDateEnd='';
            this.getCompanyLicense(this.loadParam);
        },
        getRelativeCompany: function(name){
            this.relativeParam.name = name;
            this.relativeParam.show = true;
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getCompanyLicense(this.loadParam);
        }
    },
    ready(){
      common('tab','table_box',1);
    },
    filter: (filter, {}),
    created() {
        this.getCompanyLicense(this.loadParam);
    }
}
</script>
<style scoped>

.name_search{
    margin-right:3%;
}
.new_btn{
    padding:7px 10px;
    float: none;
    cursor: pointer;
}
.transfer{
    margin-right:15px;
}
 #table_box  table th,#table_box  table td{
    width: 286px;
    min-width: 286px;
}
</style>

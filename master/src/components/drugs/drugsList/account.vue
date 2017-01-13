<template>
    <drugs-model :param="detailParam" v-if="detailParam.show"></drugs-model>
    <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
            <dd class="pull-right" style="margin-right:20px">
                <button type="button" class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
            </dd>
        </div>
        <!-- 中间列表 -->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>用户名</th>
                        <th>正常金额</th>
                        <th>冻结金额</th>
                        <th>积分</th>
                        <th>信用度</th>
                        <th>创建时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                    <tr v-for="item in initDrugAccountList">
                       <td><a @click.stop="clickOn({
                              show:true,
                              id:item.id,
                              moneyId:item.id,
                              userId:item.userId,
                              loading:false,
                              status:item.status,
                              link:'/money/details/'
                        })">{{item.userName}}</a></td>
                       <td>{{item.normalMoney}}</td>
                       <td>{{item.freezeMoney}}</td>
                       <td>{{item.integral}}</td>
                       <td>{{item.credit}}</td>
                       <td>{{item.createTime}}</td>
                       
                      
                        
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 底部分页 -->
        <pagination :combination="loadParam"  slot="page"></pagination>
    </mglist-model>
    
</template>
<script>
import  drugsModel  from  '../RolloutDetail'
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initDrugAccountList
} from '../../../vuex/getters'
import {
    getDrugAccountList
} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        drugsModel,
        mglistModel
    },
    vuex: {
        getters: {
            initDrugAccountList   
        },
        actions: {
            getDrugAccountList
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show:false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                link:'/money/',
                //key:'myCustomerList',
               
            },
            detailParam:{
          show:false
        },
            
        }
    },
    methods: {

        selectSearch:function(){
            this.getDrugAccountList(this.loadParam);
        },
        clickOn:function(initRolloutlist){
           console.log(initRolloutlist)
           this.detailParam = initRolloutlist;
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getDrugAccountList(this.loadParam);
        },
        
    },
    created() {
        changeMenu(this.$store.state.table.isTop,this.getDrugAccountList,this.loadParam,localStorage.drugAccountParam);
    },
    ready(){
      common('tab','table_box',1);
    },
    filter:(filter,{})
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-right: 8px;
}
.table>tbody>tr>td{
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break:break-all; */
}
.component_action{
    right: 30px;
}
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
#table_box table th,#table_box table td{
    width: 283px;
    min-width: 283px;
}
.service-nav {
    padding: 23px 30px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
</style>

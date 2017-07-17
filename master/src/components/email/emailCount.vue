<template>

    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer" >
                    <!-- <div class="client-detailInfo col-xs-6"> -->
                    <dt class="left transfer marg_top">日期：</dt>
                    <mz-datepicker :time.sync="loadParam.date" format="yyyy-MM-dd HH:mm:ss">
                    </mz-datepicker>
                    <!-- </div> -->
                </dl>

                <dd class="left transfer">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">{{$t("static.search")}}</button>
                </dd>

                <dd class="pull-right" style="margin-right:20px">
                  <button type="button" class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
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
                        <th>业务员</th>
                        <th>日期</th>
                        <th>邮箱</th>
                        <th>发件数量</th>
                        <th>收件数量</th>
                        <th>是否离职</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initEmailCount">
                        <td>{{item.employeeName}}</td>
                        <td>{{item.date}}</td>
                        <td>{{item.no}}</td>
                        <td>{{item.sendNumber}}</td>
                        <td>{{item.receiveNumber}}</td>
                        <td :style="{color:item.employeeLeave==0?'red':''}">{{item.employeeLeave | isLeave}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <!-- <pagination :combination="loadParam"  slot="page"></pagination> -->

    </mglist-model>

</template>
<script>
import filter from '../../filters/filters'
import pagination from '../../components/pagination'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import mglistModel from '../mguan/mgListComponent.vue'
import mzDatepicker from '../calendar/vue.datepicker.js'

import {
    initEmailCount
} from '../../vuex/getters'
import {
    getEmailCount
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        mglistModel,
        mzDatepicker,

    },
    vuex: {
        getters: {
           initEmailCount
        },
        actions: {
            getEmailCount,
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
                total:0,
                date:''
            },


        }
    },
    methods: {
        selectSearch:function(){
          this.getEmailCount(this.loadParam);
        },

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmailCount(this.loadParam);
        },

    },
    created() {
          this.getEmailCount(this.loadParam);
    },
    filters:{
        isLeave:function(item){
            return item==0?'离职':'在职'
        }
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
    width: 300px;
    min-width: 200px;
}
.service-nav {
    padding: 23px 30px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
</style>

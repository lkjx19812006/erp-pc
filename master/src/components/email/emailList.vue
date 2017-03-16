<template>
    <email-detail :param="detailParam" v-if="detailParam.show"></email-detail>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;"> 
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">邮箱：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.emailNo" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">收件人：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.receiveNo" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                    <div class="left">
                        <dt class="left transfer marg_top">起止时间：</dt>
                        <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>

                    <div class="left">
                        <dt class="left marg_top">~~</dt>
                        <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl> 
                
            </div>

            <div class="clear" style="margin-top:3px;"> 
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">主题：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.theme" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">发件人：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.sendNo" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">发件人姓名：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.sendName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>
                
                
                <dd class="left transfer">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">{{$t("static.search")}}</button>
                </dd>
                <dd class="left">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">{{$t("static.clear_all")}}</button>
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
                        <th>邮箱</th>
                        <th>主题</th>
                        <th>发件人</th>
                        <th>发件人姓名</th>
                        <th>收件人</th>
                        <th>发送时间</th>  
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initEmailList">
                        <td>{{item.emailNo}}</td>
                        <td><a @click="clickOn(item)">{{item.theme}}</a></td>
                        <td>{{item.sendNo}}</td>
                        <td>{{item.sendName}}</td>
                        <td>{{item.receiveNo}}</td>
                        <td>{{item.sendDate}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--底部分页-->
        <pagination :combination="loadParam"  slot="page"></pagination>

    </mglist-model> 

</template>
<script>
import filter from '../../filters/filters'
import pagination from '../../components/pagination'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import mglistModel from '../mguan/mgListComponent.vue'
import mzDatepicker from '../calendar/vue.datepicker.js'
import emailDetail from './emailDetail'
import {
    initEmailList
} from '../../vuex/getters'
import {
    getEmailList
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        mglistModel,
        mzDatepicker,
        emailDetail
    },
    vuex: {
        getters: {
           initEmailList
        },
        actions: {
            getEmailList,
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
                emailNo:'',
                theme:'',
                sendNo:'',
                sendName:'',
                receiveNo:'',
                startTime:'',
                endTime:''
            },
            detailParam: {
                show:false,
                link:'/email',
                id:'',
            }
            
        }
    },
    methods: {
        selectSearch:function(){
          this.getEmailList(this.loadParam);
        },
        resetCondition:function(){
          this.loadParam.emailNo='';
          this.loadParam.theme='';
          this.loadParam.sendNo='';
          this.loadParam.sendName='';
          this.loadParam.receiveNo='';
          this.loadParam.startTime='';
          this.loadParam.endTime='';
          this.getEmailList(this.loadParam);
        },
        clickOn:function(param){
          this.detailParam = param;
          this.detailParam.show = true;
          this.detailParam.link = "/email";
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmailList(this.loadParam);
        },
       
    },
    created() {
        
        changeMenu(this.$store.state.table.isTop,this.getEmailList,this.loadParam,localStorage.emailParam);
        this.language = localStorage.lang;  
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
    width: 281px;
    min-width: 281px;
}
.service-nav {
    padding: 23px 30px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
</style>

<template>
    <div>
        <drugs-model :param="detailParam" v-if="detailParam.show"></drugs-model>
        <state-model :param="disposeParam" v-if="disposeParam.show"></state-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear" style="margin-top:10px;">
        
                    <dl class="clear left">
                        <dt class="left marg_top" style="letter-spacing:3px">客户名：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.name" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">银行名：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.bank" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
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
                    <dl class="clear left transfer">
                        <button type="button" class="new_btn transfer" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                        <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
                    </dl>
                    <dd class="pull-right" style="margin-right:20px">
                        <button type="button" class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                    </dd>
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead>
                        <tr>
                            <th>{{$t('static.client_id')}}</th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>客户手机</th>
                            <th>{{$t('static.account_number')}}</th>
                            <th>银行账户</th>
                            <th>{{$t('static.normal_amount') }}</th>
                            <th>{{$t('static.freezing_amount')}}</th>
                            <th>{{$t('static.transfer_amount')}}</th>
                            <th>{{$t('static.application_time')}}</th>
                            <th>{{$t('static.status')}}</th>
                            <th>{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initRolloutlist">
                            <td>{{item.moneyId}}</td>
                            <td>
                                <a @click.stop="clickOn({
                                      show:true,
                                      id:item.id,
                                      moneyId:item.moneyId,
                                      userId:item.userId,
                                      loading:false,
                                      status:item.status,
                                      link:'/money/details/'
                                })">{{item.name}}</a>
                            </td>
                            <td>{{item.userPhone}}</td>
                            <td>{{item.bank}}</td>
                            <td>{{item.number}}</td>
                            <td>{{item.normalMoney | money}}</td>
                            <td>{{item.freezeMoney | money}}</td>
                            <td v-if="item.amount">{{item.amount}}</td>
                            <td v-if="!item.amount">0</td>
                            <td>{{item.ctime}}</td>
                            <td>{{item.status | drugsStatus}}</td>
                            <td>
                                <a class="operate" v-if="item.status==0" @click="drugs(item,$index)"><img src="/static/images/{{$t('static.img_apply')}}.png" /></a>
                                <a class="operate" v-if="item.status==1" @click="drugs(item,$index)"><img src="/static/images/{{$t('static.img_Financial')}}.png" title="转账处理中" alt="转账处理中"></a>
                                <a class="operate" v-if="item.status==2" @click="drugs(item,$index)"><img src="/static/images/{{$t('static.img_transfer')}}.png" title="转出成功" alt="转出成功"></a>
                                <a class="operate" v-if="item.status==3" @click="drugs(item,$index)"><img src="/static/images/{{$t('static.img_Financialover')}}.png"></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
    </div>
</template>
<script>
import drugsModel from '../RolloutDetail'
import stateModel from '../drugsStatus'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initRolloutlist
} from '../../../vuex/getters'
import {
    getRolloutList
} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        filter,
        drugsModel,
        stateModel,
        mglistModel
    },
    vuex: {
        getters: {
            initRolloutlist
        },
        actions: {
            getRolloutList
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 1,
                link: '/money/rollOut',
                name: '',
                type: '',
                status: '',
                userPhone: '',
                bank: '',
                startTime: '',
                endTime: '',
                total: 0,
                moneyId:''
            },
            checked: false,
            detailParam: {
                show: false
            },
            disposeParam: {
                show: false,
                title: '',
                link: '/money/rollOutHandle'
            }
        }
    },
    methods: {
        clickOn: function(initRolloutlist) {
            console.log(initRolloutlist)
            this.detailParam = initRolloutlist;
        },
        selectSearch: function() {
            this.getRolloutList(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.name = '';
            this.loadParam.moneyId='';
            this.loadParam.startTime = '';
            this.loadParam.endTime = '';
            this.loadParam.bank = '';
            this.getRolloutList(this.loadParam);
        },
        drugs: function(item, sub) {
            item.show = !item.show;
            item.sub = sub;
            this.disposeParam = item;
            console.log(this.disposeParam)
            this.disposeParam.show = true;
            this.disposeParam.title = '药款转出操作';
            this.disposeParam.link = '/money/rollOutHandle';
            if (item.status == 0) {
                this.disposeParam.tips = '处理中';
            } else if (item.status == 1) {
                this.disposeParam.tips = '审核通过，转账中';
            } else if (item.status == 2) {
                this.disposeParam.tips = '转账成功';
            } else if (item.status == 3) {
                this.disposeParam.tips = '操作已完成，药款已转出';
            }

        }
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getRolloutList(this.loadParam);
        }
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getRolloutList, this.loadParam, localStorage.rollOutParam);
    }
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-left: 18px;
}

.checkbox_unselect {
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

.checkbox_select {
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

#table_box table th,
#table_box table td {
    width: 150px;
    min-width: 150px;
}
</style>

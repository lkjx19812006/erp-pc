<template>
    <div>
        <div class="modal modal-main fade account-modal" role="dialog" @click="param.show=false"></div>
        <div id="scroll" class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>{{$t('static.delivery_record')}}</h3>
            </div>
            <div>
                <div class="cover_loading">
                    <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <section class="editsection" v-cloak>
                    <table class="table table-hover table_color table-striped ">
                        <thead>
                            <tr>
                                <th>{{$t('static.install_type')}}</th>
                                <th>{{$t('static.order_amount')}}</th>
                                <th>{{$t('static.currency')}}</th>
                                <th>{{$t('static.country')}}</th>
                                <th>{{$t('static.business_type')}}</th>
                                <th>{{$t('static.payment_name')}}</th>
                                <th>{{$t('static.userName')}}</th>
                                <th>{{$t('static.account')}}</th>
                                <th>{{$t('static.paid_branch')}}</th>
                                <th>{{$t('static.review_status')}}</th>
                                <th>{{$t('static.order_status')}}</th>
                                <th>{{$t('static.create_time')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in initRecordList">
                                <td v-if="item.type==0">{{$t('static.paid')}}</td>
                                <td v-if="item.type==1">{{$t('static.income')}}</td>
                                <td>{{item.amount}}</td>
                                <td>{{item.currency | Currency}}</td>
                                <td>{{item.payCountryName}}</td>
                                <td>{{item.bizType}}</td>
                                <td>{{item.payName}}</td>
                                <td>{{item.payUserName}}</td>
                                <td>{{item.payNumber}}</td>
                                <td>{{item.paySubName}}</td>
                                <td v-if="item.validate==0">{{$t('static.wait_approval')}}</td>
                                <td v-if="item.validate==1">{{$t('static.approving')}}</td>
                                <td v-if="item.validate==2">{{$t('static.approved')}}</td>
                                <td v-if="item.validate==3">{{$t('static.unapproved')}}</td>
                                <td v-if="item.pr==0">{{$t('static.notpayment')}}</td>
                                <td v-if="item.pr==1&&item.type==0">{{$t('static.confirm_income')}}</td>
                                <td v-if="item.pr==1&&item.type==1">{{$t('static.confirm_recipt')}}</td>
                                <td>{{item.ctime}}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
            <!-- <div class="edit_footer">
              <button type="button" class="btn  btn-confirm" @click="param.show = false">{{$t('static.confirm')}}</button>
          </div> -->
        </div>
    </div>
</template>
<script>
import {
    initRecordList
} from '../../../vuex/getters'
import {
    getRequestRecord
} from '../../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            type: "image/*"
        }
    },
    vuex: {
        getters: {
            initRecordList
        },
        actions: {
            getRequestRecord
        }
    },
    methods: {


    },
    events: {

    },
    created() {
        console.log(this.param)
        console.log(this.initRecordList)
        this.getRequestRecord(this.param);

    }
}
</script>
<style scoped>
.modal {
    z-index: 1083
}

.modal_con {
    z-index: 1084;
    width: 1200px;
}

.edit-model {
    padding: 10px 30px 80px 30px;
}

.top-title {
    position: absolute;
    top: 0;
    right: 0;
    width: 1200px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.editpage-input {
    margin-top: 15px;
}

table {
    display: table;
}

a {
    cursor: pointer;
}
</style>

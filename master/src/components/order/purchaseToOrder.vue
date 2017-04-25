<template>
    <div>
        <customer-model :param="customerParam" v-if="customerParam.show"></customer-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div class="top-title">
                <span class="glyphicon glyphicon-remove-circle" @click="close()"></span>
            </div>
            <div class="edit-content">
                <h3>生成订单</h3>
            </div>
            <form>
                <div class="edit-model">
                    <div>
                        <h4 style="text-align: left;font-size: 14px;margin:10px 0 10px 0">基本信息</h4>
                        <div class="clear">
                            <div class="col-md-6">
                                <label class="pull-left">客户：</label>
                                <input type="text" class="form-control" v-model="param.customerName" @click="selectCustomer()" readonly="readonly">
                            </div>
                            <div class="col-md-6">
                                <label class="pull-left">客户手机：</label>
                                <input type="text" class="form-control" v-model="param.customerPhone">
                            </div>
                        </div>
                        <h4 style="text-align: left;font-size: 14px;margin:10px 0 10px 0">商品信息</h4>
                        <table class="table table-hover table_color table-striped ">
                            <thead>
                                <tr>
                                    <th>品种</th>
                                    <th>数量</th>
                                    <th>采购价格</th>
                                    <th>质量</th>
                                    <th>规格</th>
                                    <th>产地</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in param.orderLinkList">
                                    <td>{{item.breedName}}</td>
                                    <td>
                                        <input type="text" class="form-control pull-left" style="width:50%;margin-right:-10px" v-model="item.number">
                                        <span style="line-height:32px;">{{item.unit | Unit}}</span>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control pull-left" style="width:40%;margin-right:-10px" v-model="item.price">
                                        <span style="line-height:32px;">元/{{item.unit | Unit}}</span>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="item.quality">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="item.spec">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="item.location">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h4 style="text-align: left;font-size: 14px;margin:10px 0 10px 0">其他信息</h4>
                        <div class="clear">
                            <div class="col-md-6">
                                <label class="pull-left">杂费：</label>
                                <input type="text" class="form-control" v-model="param.incidentals">
                            </div>
                            <div class="col-md-6">
                                <label class="pull-left">杂费说明：</label>
                                <input type="text" class="form-control" v-model="param.incidentalsDesc">
                            </div>
                        </div>
                        <div class="clear">
                            <div class="col-md-6">
                                <label class="pull-left">优惠金额：</label>
                                <input type="text" class="form-control" v-model="param.preferential">
                            </div>
                            <div class="col-md-6">
                                <label class="pull-left">优惠说明：</label>
                                <input type="text" class="form-control" v-model="param.preferentialDesc">
                            </div>
                        </div>
                        <div class="clear">
                            <div class="col-md-6">
                                <label class="pull-left">总金额：</label>
                                <input type="text" class="form-control" v-model="total" readonly="readonly">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="close()">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" @click="confirm()">{{$t('static.confirm')}}</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import customerModel from '../Intention/clientname'
import util from '../tools/util.js'
import tipsModel from '../tips/tipDialog'
import vSelect from '../tools/vueSelect/components/Select'
import inputSelect from '../tools/vueSelect/components/inputselect'
import {

} from '../../vuex/getters'
import {
    createOrderByOrderLink
} from '../../vuex/actions'
export default {
    props: ['param'],
    components: {
        customerModel,
        tipsModel,
        vSelect,
        inputSelect
    },
    vuex: {
        actions: {
            createOrderByOrderLink
        },
        getters: {

        }
    },
    data() {
        return {
            tipsParam: {
                show: false,
                alert: true,
                name: ''
            },
            customerParam: {
                show: false,
                customerId: '',
                customerName: '',
                customerPhone: '',
                employeeId: ''
            },


        }
    },
    computed: {
        total: function() {
            let goods = this.param.orderLinkList;
            let sum = 0;
            for (let i = 0; i < goods.length; i++) {
                sum = util.add(sum, util.mul(goods[i].price, goods[i].number));
            }
            sum = util.add(sum, util.sub(this.param.incidentals, this.param.preferential))
            return sum;
        }
    },
    methods: {
        close: function() {
            this.param.show = false;
        },
        selectCustomer: function() {
            this.customerParam.show = true;
        },
        confirm: function() {
            this.createOrderByOrderLink(this.param);
        }
    },
    events: {
        customer: function(customer) {
            this.param.customerName = customer.customerName;
            this.param.customer = customer.customerId;
            this.param.customerPhone = customer.customerPhone;
        }

    },
    created() {


    }
}
</script>
<style scoped>
.modal {
    z-index: 1082;
}

.modal_con {
    width: 760px;
    z-index: 1082
}

.edit-model {
    padding: 10px 5px;
}

.edit_footer {
    width: 760px;
}

.top-title {
    width: 760px;
    left: 0;
    right: 0;
}

.table {
    display: table;
}

.customer-input {
    width: 45%;
    margin-bottom: 10px;
}
</style>

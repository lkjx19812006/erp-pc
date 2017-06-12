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
            <validator name="validation">
                <form>
                    <div class="edit-model">
                        <div>
                            <h4 style="text-align: left;font-size: 14px;margin:10px 0 10px 0">基本信息</h4>
                            <div class="clear">
                                <div class="col-md-6">
                                    <label class="pull-left">客户：
                                        <span class="system_danger" v-if="$validation.customer.required">
                                            必填项
                                        </span>
                                    </label>
                                    <input type="text" v-show="false" v-model="param.customer" v-validate:customer="['required']">
                                    <input type="text" class="form-control" v-model="param.customerName" @click="selectCustomer()" readonly="readonly">
                                </div>
                                <div class="col-md-6">
                                    <label class="pull-left">客户手机：
                                        <span class="system_danger" v-if="$validation.phone.phone">
                                            必填项
                                        </span>
                                    </label>
                                    <input type="text" class="form-control" v-model="param.customerPhone" v-validate:phone="['phone']">
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
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in param.orderLinkList">
                                        <td>{{item.breedName}}</td>
                                        <td>
                                            <span style="line-height:32px;">{{item.number}}{{item.unit | Unit}}</span>
                                        </td>
                                        <td>
                                            <span style="line-height:32px;">{{item.buyPrice}}元/{{item.unit | Unit}}</span>
                                        </td>
                                        <td>
                                            <span style="line-height:32px;">{{item.quality}}</span>
                                        </td>
                                        <td>
                                            <span style="line-height:32px;">{{item.spec}}</span>
                                        </td>
                                        <td>
                                            <span style="line-height:32px;">{{item.location | province}}</span>
                                        </td>
                                        <td>
                                            <a @click="showModifyBreed($index)">编辑</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <validator name="inner">
                                <div v-if="breedInfo.status == 1" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px;height:270px">
                                    <div class="col-md-12 clearfix">
                                        <!-- 品种 -->
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.breed')}}</label>
                                            <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" readonly="true" />
                                        </div>
                                        <!-- 数量,必填至多两位小数 -->
                                        <div class="editpage-input col-md-6">
                                            <div style="clear:both;height:36px;">
                                                <div class="left" style="width:45%;">
                                                    <label class="editlabel">{{$t('static.quantity')}}
                                                        <span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span>
                                                        <span class="system_danger" v-if="!$inner.number.required&&$inner.number.quantity">
                                                        {{$t('static.two_decimal')}}
                                                    </span>
                                                    </label>
                                                    <input type="number" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="['required','quantity']" />
                                                </div>
                                                <div class="left" style="width:45%;">
                                                    <label class="editlabel">{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
                                                    <input type="text" v-show="false" v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}" disabled="disabled" />
                                                    <select class="form-control edit-input" v-model="breedInfo.unit" disabled="true">
                                                        <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}({{item.ename}})</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 价格,必填至多两位小数 -->
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">
                                                <span>{{$t('static.purchase')}}</span>
                                                <span>{{$t('static.price')}}</span>
                                                <span class="system_danger" v-if="$inner.price.required">{{$t('static.required')}}</span>
                                                <span class="system_danger" v-if="!$inner.price.required&&$inner.price.money">
                                                {{$t('static.two_decimal')}}
                                            </span>
                                            </label>
                                            <div style="clear:both;height:34px;">
                                                <div class="left" style="width:45%;">
                                                    <input type="number" v-model="breedInfo.price" class="form-control edit-input" v-validate:price="['required','money']" />
                                                </div>
                                                <div class="left" style="width:45%;">
                                                    <select class="form-control edit-input" v-model="breedInfo.unit" disabled="true">
                                                        <option v-for="item in initUnitlist" value="{{item.id}}">元/{{item.name}}({{item.ename}})</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 质量 -->
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.quality')}}</label>
                                            <input type="text" v-model="breedInfo.quality" class="form-control edit-input" />
                                        </div>
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.specification')}}</label>
                                            <div type="text" class="edit-input">
                                                <input-select :value.sync="breedInfo.spec" :prevalue="breedInfo.spec" :options="initBreedDetail.specs.arr" placeholder="规格/Specification" label="name">
                                                </input-select>
                                            </div>
                                        </div>
                                        <!-- 产地 -->
                                        <div class="editpage-input col-md-6">
                                            <label class="editlabel">{{$t('static.origin')}}<span class="jinggao" v-if="$inner.locals.required">{{$t('static.required')}}</span> </label>
                                            <input type="text" v-show="false" v-model="breedInfo.location" v-validate:locals="{required:true}" />
                                            <breed-location :param="breedInfo" :show="breedInfo" :widparam="'200'"></breed-location>
                                        </div>
                                        <!-- 提交 -->
                                        <div class="col-md-12" style="margin-top:10px;text-align:right">
                                            <button type="button" class="btn btn-confirm" v-if="breedInfo.status==1" @click="cancelModifyBreed()">{{$t('static.cancel')}}</button>
                                            <button type="button" class="btn btn-confirm" v-show='false' @click="addBreed()">{{$t('static.save')}}</button>
                                            <button type="button" class="btn btn-confirm" v-if="$inner.valid">
                                                <div v-if="breedInfo.status==1" @click="modifyBreed()">{{$t('static.save')}}</div>
                                            </button>
                                            <button type="button" class="btn btn-confirm" v-else disabled="disabled">{{$t('static.save')}}</button>
                                        </div>
                                    </div>
                                </div>
                            </validator>
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
                        <button v-if="$validation.valid&&breedInfo.status==0" type="button" class="btn  btn-confirm" @click="confirm()">{{$t('static.confirm')}}</button>
                        <button v-else type="button" class="btn  btn-confirm" disabled="disabled">{{$t('static.confirm')}}</button>
                    </div>
                </form>
            </validator>
        </div>
    </div>
</template>
<script>
import customerModel from '../Intention/clientname'
import breedLocation from './second_order/breedLocation'
import util from '../tools/util.js'
import tipsModel from '../tips/tipDialog'
import vSelect from '../tools/vueSelect/components/Select'
import inputSelect from '../tools/vueSelect/components/inputselect'
import {
    initBreedDetail,
    initUnitlist
} from '../../vuex/getters'
import {
    getBreedDetail,
    getUnitList,
    createOrderByOrderLink,
} from '../../vuex/actions'
export default {
    props: ['param'],
    components: {
        customerModel,
        breedLocation,
        tipsModel,
        vSelect,
        inputSelect,

    },
    vuex: {
        actions: {
            getBreedDetail,
            getUnitList,
            createOrderByOrderLink,
        },
        getters: {
            initBreedDetail,
            initUnitlist
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
            breedInfo: {
                status: 0, //0/1,初始/编辑
                index: '', //当前编辑的是第几条信息
                id: "",
                breedName: "",
                number: "",
                price: "",
                unit: "",
                quality: "",
                spec: "",
                location: ""

            }


        }
    },
    computed: {
        total: function() {
            let goods = this.param.orderLinkList;
            let sum = 0;
            for (let i = 0; i < goods.length; i++) {
                sum = util.add(sum, util.mul(goods[i].buyPrice, goods[i].number));
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
        showModifyBreed: function(index) {
            let breedInfo = this.breedInfo;
            let item = this.param.orderLinkList[index];
            breedInfo.status = 1;
            breedInfo.index = index;
            breedInfo.id = item.breedId; //不能编辑
            breedInfo.breedName = item.breedName; //不能编辑
            breedInfo.number = item.number;
            breedInfo.unit = item.unit; //不能编辑
            breedInfo.price = item.buyPrice;
            breedInfo.quality = item.quality;
            breedInfo.spec = item.spec;
            breedInfo.location = item.location;
            this.getBreedDetail(this.breedInfo);

        },
        modifyBreed: function() {
            let breedInfo = this.breedInfo;
            let index = breedInfo.index;
            let item = this.param.orderLinkList[index];
            breedInfo.status = 0;
            item.number = breedInfo.number;
            item.buyPrice = breedInfo.price;
            item.quality = breedInfo.quality;
            item.spec = breedInfo.spec;
            item.location = breedInfo.location;

        },
        cancelModifyBreed: function() {
            this.breedInfo.status = 0;
        },
        confirm: function() {
            let orderLinkList = this.param.orderLinkList;
            for (let i = 0; i < orderLinkList.length; i++) {
                if (!(/^([\+]?([1-9]\d*)|0)(\.\d{1,2})?$/.test(orderLinkList[i].number))) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = "“" + orderLinkList[i].breedName + "”数量格式有误,并且至多精确到两位小数！";
                    return;
                }
                if (!(/^([\+]?([1-9]\d*)|0)(\.\d{1,2})?$/.test(orderLinkList[i].buyPrice))) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = "“" + orderLinkList[i].breedName + "”价格格式有误,并且至多精确到两位小数！";
                    return;
                }
            }
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
        this.getUnitList();

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

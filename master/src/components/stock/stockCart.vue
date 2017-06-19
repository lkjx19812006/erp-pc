<template>
    <searchcustomer-model :param="customerParam" v-if='customerParam.show'></searchcustomer-model>
    <validator name='validation'>
        <div>
            <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
            <div class="container modal_con" v-show="param.show">
                <div @click.stop="param.show=false" class="top-title">
                    <span class="glyphicon glyphicon-remove-circle"></span>
                </div>
                <div class="cover_loading">
                    <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <div class="client_nav">
                    <nav class="navbar navbar-client" role="navigation">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <span class="navbar-brand navbar-name">购物车商品信息</span>
                            </div>
                        </div>
                    </nav>
                </div>
                <section>
                    <div class="client-section clearfix">
                        <div class="col-md-12">
                            <table class="table  contactSet">
                                <thead>
                                    <th>品种</th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="item in param.goods">
                                        <td>{{item.breedName}}</td>
                                        <td>{{item.priceAndNumber.breedPrice}}元</td>
                                        <td>{{item.priceAndNumber.breedNum}}/{{item.unitId | unit}}</td>
                                        <td><a @click='deleteCart($index)'>移出</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="client-section clearfix">
                        <div class="editpage-input col-md-6" @click="selectCustomer()">
                            <label class="editlabel">客户名称<span class="system_danger" v-if="$validation.customername.required">必填项</span></label>
                            <input type="text" class="form-control edit-input" style="width:95%" v-model="param.customerName" readonly="readonly" v-validate:customername="{required:true}" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">收货人</label>
                            <input type="text" class="form-control edit-input" style="width:95%" v-model="param.consignee" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">收货人手机</label>
                            <input type="text" class="form-control edit-input" style="width:95%" v-model="param.consigneePhone" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">订单类型<span class="system_danger" v-if="$validation.sample.required">必填项</span></label>
                            <select class="form-control" v-model="param.sample" style="width:95%" v-validate:sample="{required:true}">
                                <option value="0">大货订单</option>
                                <option value="1">样品订单</option>
                            </select>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.province')}}</label>
                            <div type="text" class="edit-input" style="width:95%">
                                <v-select :debounce="250" :value.sync="province" :on-change="selectCity" :options="initProvince" placeholder="省/Province" label="cname">
                                </v-select>
                            </div>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.city')}}</label>
                            <input type="text" v-if="!province.cname" class="form-control edit-input" style="width:95%" disabled="disabled" placeholder="{{$t('static.select_province_first')}}" />
                            <div v-if="province.cname" type="text" class="edit-input" style="width:95%">
                                <v-select :debounce="250" :value.sync="city" :on-change="selectDistrict" :options="initCitylist" placeholder="市/City" label="cname">
                                </v-select>
                            </div>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">{{$t('static.area')}}</label>
                            <input type="text" v-if="!city.cname" class="form-control edit-input" style="width:95%" disabled="disabled" placeholder="{{$t('static.select_city_first')}}" />
                            <div v-if="city.cname" type="text" class="edit-input" style="width:95%">
                                <v-select :debounce="250" :value.sync="district" :options="initDistrictlist" placeholder="区" label="cname">
                                </v-select>
                            </div>
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">详细地址</label>
                            <input type="text" class="form-control edit-input" v-model="param.consigneeAddr" style="width:95%" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">杂费</label>
                            <input type="number" class="form-control edit-input" v-model="param.incidentals" style="width:95%" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">优惠</label>
                            <input type="number" class="form-control edit-input" v-model="param.preferential" style="width:95%" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">杂费说明</label>
                            <input type="text" class="form-control edit-input" v-model="param.incidentalsDesc" style="width:95%" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">优惠说明</label>
                            <input type="text" class="form-control edit-input" v-model="param.preferentialDesc" style="width:95%" />
                        </div>
                        <div class="editpage-input col-md-6">
                            <label class="editlabel">总金额</label>
                            <input type="text" class="form-control edit-input" v-model="total" style="width:95%" readonly="readonly" />
                        </div>
                    </div>
                </section>
                <div class="edit_footer">
                    <button type="button" class="btn btn-confirm" @click="createOrder()" :disabled="$validation.invalid">生成订单</button>
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">返回继续选择商品</button>
                </div>
            </div>
        </div>
    </validator>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import searchcustomerModel from '../Intention/clientname'
import util from '../tools/util.js'
import pressImage from '../../components/imagePress'
import filter from '../../filters/filters.js'
import {
    initProvince,
    initCitylist,
    initDistrictlist,

} from '../../vuex/getters'
import {
    getProvinceList,
    getCityList,
    getDistrictList,
    createOrderByStock
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        filter,
        searchcustomerModel
    },
    props: ['param'],
    data() {
        return {
            countryParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            province: {
                id: '',
                cname: ''
            },
            city: {
                id: '',
                cname: ''
            },
            district: {
                id: '',
                cname: ''
            },
            customerParam: {
                show: false
            },
            customerName: ''
        }
    },
    vuex: {
        getters: {
            initProvince,
            initCitylist,
            initDistrictlist,
        },
        actions: {
            getProvinceList,
            getCityList,
            getDistrictList,
            createOrderByStock
        }
    },
    computed: {
        total: function() {
            let goods = this.param.goods;
            let sum = 0;
            for (let i = 0; i < goods.length; i++) {
                console.log(util.mul(goods[i].priceAndNumber.breedNum, goods[i].priceAndNumber.breedPrice));
                sum = util.add(sum, util.mul(goods[i].priceAndNumber.breedNum, goods[i].priceAndNumber.breedPrice));
                //sum+=goods[i].priceAndNumber.breedPrice*goods[i].priceAndNumber.breedNum
            }

            return util.sub(util.add(sum, this.param.incidentals), this.param.preferential); //sum + this.param.incidentals - this.param.preferential 
        }
    },
    methods: {
        selectCity: function() {
            this.city = {
                id: '',
                cname: ''
            };
            this.district = {
                id: '',
                cname: ''
            };
            if (this.province != '' && this.province != null) {
                this.getCityList(this.province);
            }

        },
        selectDistrict: function() {
            this.district = {
                id: '',
                cname: ''
            };
            if (this.city != '' && this.city != null) {
                this.getDistrictList(this.city);
            }
        },
        deleteCart: function($index) {
            this.$store.state.table.stockCartList.splice($index, 1);
            if (this.$store.state.table.stockCartList.length == 0) {
                this.param.leng = 0;
            }
        },
        createOrder: function() {
            this.param.stockCartList = [];
            this.param.province = this.province.id;
            this.param.city = this.city.id;
            this.param.district = this.district.id;
            let goods = this.param.goods;
            for (let i = 0; i < goods.length; i++) {
                this.param.stockCartList.push({
                    freezeNum: parseFloat(goods[i].priceAndNumber.breedNum),
                    id: goods[i].id,
                    price: parseFloat(goods[i].priceAndNumber.breedPrice)
                });
            }
            this.createOrderByStock(this.param);

        },
        selectCustomer: function() {
            this.customerParam.show = true;
        }

    },
    events: {
        'customer': function(data) {
            this.customerName = data.customerName;
            this.param.customer = data.customerId;
            this.param.customerPhone = data.customerPhone;
            this.param.customerName = data.customerName;
            this.param.email = data.email
        }
    },
    filter: (filter, {}),
    created() {
        this.getProvinceList(this.countryParam);
    }
}
</script>
<style scoped>
.top-title {
    position: fixed;
    z-index: 1088;
    width: 50%;
    right: 0;
    left: 0;
}

.modal {
    z-index: 1083;
}

.modal_con {
    z-index: 1083;
    width: 50%;
}
.system_danger{
    display: inline-block!important;
    height: 14px!important;
    width: 20px!important

}
.client_body {
    position: relative;
    background-color: #fff;
    padding: 20px;
}

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.navbar-img {
    float: left;
    margin-right: 10px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
}

section {
    background-color: #fff;
}

.edit_footer {
    width: 50%;
}

section article {
    margin-top: 10px;
}

.client-section {
    padding: 10px 5px 40px 5px;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    text-align: center;
}

.table {
    display: table;
}
</style>

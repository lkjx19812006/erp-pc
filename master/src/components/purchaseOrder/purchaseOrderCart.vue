<template>
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
                            </thead>
                            <tbody>
                                <tr v-for="item in param.goods">
                                    <td>{{item.breedName}}</td>
                                    <td>{{item.price}}元</td>
                                    <td>{{item.number}}/{{item.unit | unit}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="client-section clearfix">
                    <div class="editpage-input col-md-6">
                        <label class="editlabel">客户名称</label>
                        <input type="text" class="form-control edit-input" style="width:95%" v-model="param.customerName" disabled="disabled" />
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
                </div>
            </section>
            <div class="edit_footer">
                <button type="button" class="btn btn-confirm" @click="createOrder()">生成订单</button>
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
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
    createOrderByPurchase
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        pressImage,
        filter,
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
            createOrderByPurchase
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
        createOrder: function() {
            this.param.intentionOfferList = [];
            this.param.province = this.province.cname;
            this.param.city = this.city.cname;
            this.param.district = this.district.cname;
            let goods = this.param.goods;
            for (let i = 0; i < goods.length; i++) {
                this.param.intentionOfferList.push({
                    id: goods[i].offerId,
                    number: goods[i].number
                });
            }
            this.createOrderByPurchase(this.param);

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

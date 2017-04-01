<template>
    <!-- 创建订单 -->
    <div>
        <supplier-model :param="customerParam" v-if="customerParam.show"></supplier-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>采购单意向报价</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <section class="editsection">
                        <div style="margin-top:20px;">
                            <img src="/static/images/breedInfo@2x.png" style="display:inline" />
                            <h5 style="display:inline">基本信息</h5>
                        </div>
                        <div class="clearfix">
                            <!-- 品种，不可编辑 -->
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">品种： </label>
                                <input type="text" class="form-control edit-input" v-model="param.breedName" readOnly="true" />
                            </div>
                            <!-- 供应商选择 -->
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">供应商名称： <span class="system_danger" v-if="$validation.custname.required">{{$t('static.required')}}</span></label>
                                <input type="text" class="form-control edit-input" v-model="param.customerName" value="{{param.customerName}}" v-validate:custname="['required']" readonly="true" @click="searchSupplier()" />
                            </div>
                            <div class="editpage-input col-md-6">
                                <div class="left" style="width:45%;">
                                    <label class="editlabel">数量<span class="system_danger" v-if="$validation.number.required">{{$t('static.required')}}</span></label>
                                    <input type="number" v-model="param.number" class="form-control edit-input" v-validate:number="{required:true}" />
                                </div>
                                <div class="left" style="width:45%;">
                                    <label class="editlabel">单位<span class="system_danger" v-if="$validation.unit.required">{{$t('static.required')}}</span></label>
                                    <input type="text" v-show="false" v-model="param.unit" class="form-control edit-input" v-validate:unit="{required:true}" disabled="disabled" />
                                    <select class="form-control edit-input" v-model="param.unit">
                                        <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}({{item.ename}})</option>
                                    </select>
                                </div>
                            </div>
                            <div class="editpage-input col-md-6">
                                <div class="left" style="width:45%;">
                                    <label class="editlabel">单价<span class="system_danger" v-if="$validation.price.required">{{$t('static.required')}}</span></label>
                                    <input type="number" v-model="param.price" class="form-control edit-input" v-validate:price="{required:true}" />
                                </div>
                                <div class="left" style="width:45%;">
                                    <label class="editlabel">单位<span class="system_danger" v-if="$validation.unit.required">{{$t('static.required')}}</span></label>
                                    <select class="form-control edit-input" v-model="param.unit" disabled="true">
                                        <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}({{item.ename}})</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div>
                    </div>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm()">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import pressImage from '../imagePress'
import inputSelect from '../tools/vueSelect/components/inputselect'
import supplierModel from '../order/second_order/selectAllSupplier.vue'
import {
    initUnitlist,
    initEmployeeList,
    initLogin
} from '../../vuex/getters'
import {
    getUnitList,
    getEmployeeList,
    offerPurchaseOrder

} from '../../vuex/actions'
export default {
    components: {
        supplierModel,
        vSelect,
        inputSelect,
        pressImage,
    },
    props: ['param'],
    data() {
        return {
            customerParam: {
                show: false,
                link: '/customer/suppliers'
            },
        }
    },
    vuex: {
        getters: {
            initUnitlist,
            initEmployeeList,
            initLogin
        },
        actions: {
            getUnitList,
            getEmployeeList,
            offerPurchaseOrder
        }
    },
    methods: {
        searchSupplier: function() {
            this.customerParam.show = true;
        },
        confirm: function() {
            this.offerPurchaseOrder(this.param);
        }


    },
    watch: {

    },
    events: {

        supplier: function(supplier) {
            this.param.customerId = supplier.customer;
            this.param.customerName = supplier.customerName;
        },

    },
    created() {
        //获取单位列表
        this.getUnitList();

    }
}
</script>
<style scoped>
.modal {
    z-index: 1082
}

.modal_con {
    z-index: 1082;
    width: 700px;
    height: 500px;
}

.top-title {
    position: fixed;
    width: 700px;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 70px 30px;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpage-input {
    margin-top: 15px;
}

.edit-input {
    height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.edit_footer {
    position: absolute;
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 0px;
    width: 700px;
    bottom: 0px;
}

.edit_footer button {
    margin-left: 15px;
}

.table {
    display: table;
}
</style>

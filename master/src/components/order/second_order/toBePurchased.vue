<template>
    <div>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div class="top-title">
                <span class="glyphicon glyphicon-remove-circle" @click="close()"></span>
            </div>
            <div class="edit-content">
                <h3>采销对应</h3>
            </div>
            <form>
                <div class="edit-model">
                    <div>
                        <h4 style="text-align: left;font-size: 14px;">商品及待采购信息</h4>
                        <table class="table table-hover table_color table-striped ">
                            <thead>
                                <tr>
                                    <th>品种</th>
                                    <th>数量</th>
                                    <th>展开采购信息</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in param.list">
                                    <td v-if="!item.toBePurchased">{{item.breedName}}</td>
                                    <td v-if="!item.toBePurchased">{{item.number}}{{item.unit | Unit}}</td>
                                    <td v-if="!item.toBePurchased">
                                        <a v-if="param.list[$index+1].show" @click="openOrClose($index)">折叠</a>
                                        <a v-else @click="openOrClose($index)">展开</a>
                                    </td>
                                    <td v-show="item.toBePurchased&&item.show" colspan="4">
                                        <table class="table table-hover table_color table-striped " style="width:80%;float:right;border-top:1px soild red">
                                            <thead>
                                                <tr>
                                                    <th>数量</th>
                                                    <th>采购员</th>
                                                    <th colspan="2"><a @click="showAdd($index,item)">+</a></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="purchase in item.arr">
                                                    <td>
                                                        <span v-if="purchase.flag===0">{{purchase.number}}</span>
                                                        <input v-else class="form-control pull-left" type="number" style="width:40%;margin-right:-30px" v-model="purchase.number">
                                                        <span style="line-height:32px;">{{purchase.unit | Unit}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if="purchase.flag===0">{{purchase.buyEmployeeName}}</span>
                                                        <input v-else class="form-control" type="text" v-model="purchase.buyEmployeeName" readonly="readonly" @click="selectEmployee($parent.$index,$index)">
                                                    </td>
                                                    <td>
                                                        <a v-if="purchase.flag===0" @click="showEdit($parent.$index,$index)">编辑</a>
                                                        <a v-else @click="saveSingle($parent.$index,$index)">保存</a>
                                                    </td>
                                                    <td><a @click="deletePurchase($parent.$index,$index)">删除</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
import employeeModel from '../../clientRelate/searchEmpInfo'
import tipsModel from '../../tips/tipDialog'
import util from '../../tools/util.js'
import vSelect from '../../tools/vueSelect/components/Select'
import inputSelect from '../../tools/vueSelect/components/inputselect'
import {

} from '../../../vuex/getters'
import {
    updateOrderLink
} from '../../../vuex/actions'
export default {
    props: ['param'],
    components: {
        employeeModel,
        tipsModel,
        vSelect,
        inputSelect
    },
    vuex: {
        actions: {
            updateOrderLink
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
            employeeParam: {
                show: false,
                org: true,
                orgId: '',
                employeeId: '',
                employeeName: ''
            },
            parentIndex: '',
            index: '',

        }
    },
    methods: {
        close: function() {
            this.param.show = false;
        },
        openOrClose: function(index) {
            this.param.list[index + 1].show = !this.param.list[index + 1].show;
        },
        selectEmployee: function(parentIndex, index) {
            this.parentIndex = parentIndex;
            this.index = index;
            this.employeeParam.show = true;
        },
        showAdd: function(index, item) {
            let temp = {};
            temp.flag = 1;
            temp.breedId = item.breedId;
            temp.breedName = item.breedName;
            temp.number = 0;
            temp.unit = item.unit;
            temp.buyEmployee = "";
            temp.buyOrg = "";
            temp.sellGoodsId = item.sellGoodsId;
            temp.sellId = this.param.sellId;
            temp.sellEmployee = this.param.sellEmployee;
            this.param.list[index].arr.push(temp);
        },
        showEdit: function(parentIndex, index) {
            this.param.list[parentIndex].arr[index].flag = 2;
        },
        saveSingle: function(parentIndex, index) {
            this.param.list[parentIndex].arr[index].flag = 0;
        },
        deletePurchase: function(parentIndex, index) {
            this.param.list[parentIndex].arr.splice(index, 1);
        },
        confirm: function() {
            //首先要将this.param.list拆分成goods和orderLinkList两部分
            let orderLinkList = [];
            let backTemp = [];
            let list = this.param.list;
            for (let i = 0; i < list.length; i = i + 2) {
                let total = list[i].number; //每个商品总数量
                let orderLinkTotal = 0;
                let orderLinkArr = list[i + 1].arr;
                for (let k = 0; k < orderLinkArr.length; k++) {
                    if (!(/^([\+]?([1-9]\d*)|0)(\.\d{1,2})?$/.test(orderLinkArr[k].number))) {
                        this.tipsParam.show = true;
                        this.tipsParam.name = "“" + list[i].breedName + "”数量格式有误,并且至多精确到两位小数！";
                        return;
                    }
                    if (!orderLinkArr[k].buyEmployee) {
                        this.tipsParam.show = true;
                        this.tipsParam.name = "请选择一个采购员";
                        return;
                    }
                    orderLinkList.push(orderLinkArr[k]);
                    orderLinkTotal = util.add(orderLinkTotal, orderLinkArr[k].number);
                }
                if (orderLinkTotal != total) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = "“" + list[i].breedName + "”采销数量不一致，请核查！";
                    return;
                }
            }
            //循环param.orderLinkBack和orderLinkList找到前者有而后者没有的项，追加到orderLinkList后（status置为0）
            for (let j = 0; j < this.param.orderLinkBack.length; j++) {
                let isExist = false;
                for (let l = 0; l < orderLinkList.length; l++) {
                    if (this.param.orderLinkBack[j].id == orderLinkList[l].id) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    this.param.orderLinkBack[j].status = 0;
                    backTemp.push(this.param.orderLinkBack[j]);
                }
            }
            for (let m = 0; m < backTemp.length; m++) {

                orderLinkList.push(backTemp[m]);
            }
            this.param.orderLinkList = orderLinkList;
            this.updateOrderLink(this.param);
        }
    },
    events: {

        a: function(employee) {

            this.param.list[this.parentIndex].arr[this.index].buyEmployee = employee.employeeId;
            this.param.list[this.parentIndex].arr[this.index].buyEmployeeName = employee.employeeName;
            this.param.list[this.parentIndex].arr[this.index].buyOrg = employee.orgId;
        },
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

.stageTotal {
    display: inline-block;
    margin-left: 7px;
    margin-right: 7px;
    font-size: 14px;
    font-weight: 500
}
</style>

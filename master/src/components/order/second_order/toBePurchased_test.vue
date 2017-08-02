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
                                    <th>勾选</th>
                                    <th>品种</th>
                                    <th>数量</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in param.goods">
                                    <td>
                                        <Checkbox :checked='selectAll' @click.prevent="checkAll()" ></Checkbox>
                                    </td>
                                    <td>{{item.breedName}}</td>
                                    <td>{{item.number}}{{item.unit | Unit}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="edit-model">
                    <div>
                        <h4 style="text-align: left;font-size: 14px; padding-right: 20px;">请选择采购业务员
                            <a class="right" href="javascript:void(0);" @click="selectEmployee()">

                                <Icon type="person-add" size="20"></Icon>
                                添加
                            </a>
                        </h4>
                        <table class="table table-hover table_color table-striped ">
                            <thead>
                                <tr>    
                                    <th>采购员</th>
                                    <th>品种</th>
                                    <th>添加</th>
                                    <th>待采购数量</th>
                                </tr>
                            </thead>
                             <tbody>
                                <tr v-for="item in param.orderLinkList" rowspan="2">
                                    <td>{{item.buyEmployeeName}}</td>
                                    <td>{{item.breedName}}
                                        
                                    </td>
                                    <td><a>添加</a></td>
                                    <td>{{item.number}}</td>
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
            personsData:[
                {
                    employee:'',

                }
            ],
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

        selectEmployee: function(parentIndex, index) {

            this.employeeParam.show = true;
        },
        showAdd: function(index, item) {

        },
       
        },
    events: {

        a: function(employee) {

            this.param.buyEmployee = employee.employeeId;
            this.param.buyEmployeeName = employee.employeeName;
            this.param.buyOrg = employee.orgId;
        },
    },
    created() {
        console.log(this.param)

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
    height: 300px;
    border:1px solid #ccc;
    overflow-y: auto
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

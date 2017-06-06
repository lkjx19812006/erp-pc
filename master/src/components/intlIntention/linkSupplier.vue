<template>
    <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="model-header">
            <h4>选择供应商</h4>
            <div class="con_list">
                <div class="trans_service clearfix">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>
                    <table class="table table-hover table_color table-striped" style="text-align:center" v-cloak>
                        <thead>
                            <tr>
                                <th></th>
                                <th>供应商名称</th>
                                <th>价格/单位</th>
                                <th>规格</th>
                                <th>产地</th>
                                <th>库存</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in initSupplierList" @click="selectEmployee($index,item)">
                                <td>
                                    <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="selectEmployee($index,item)"></label>
                                </td>
                                <td>{{item.cName}}</td>
                                <td>{{item.price}}/{{item.unit}}</td>
                                <td>{{item.spec}}</td>
                                <td>{{item.location | province}}</td>
                                <td>{{item.inventory}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-close" @click="param.show = fasle">取消</button>
                        <button type="button" class="btn btn-orange" v-if="param.supplier==''" disabled="true">确定</button>
                        <button type="button" class="btn btn-orange" v-else @click="confirmEmp()">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    initSupplierList,
} from '../../vuex/getters'
import {
    getProductSupplier
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                breedId: this.param.breedId,
            },
        }
    },

    vuex: {
        getters: {
            initSupplierList,
        },
        actions: {
            getProductSupplier
        }
    },
    methods: {
        /*      Partselected:function(){
                    this.checked=!this.checked;
                   if(this.checked){
                         this.$store.state.table.customerList.forEach(function(item){
                            item.checked=true;
                     })
                   }else{
                        this.$store.state.table.customerList.forEach(function(item){
                            item.checked=false;
                     })
                   }
                },*/

        selectEmployee: function(sub, item) {
            this.$store.state.count.supplierList[sub].checked = !this.$store.state.count.supplierList[sub].checked;
            if (this.$store.state.count.supplierList[sub].checked == true) {
                this.param.supplier = item.cid;
            } else if (this.$store.state.count.supplierList[sub].checked == false) {
                this.param.supplier = '';
            }
            for (var key in this.initSupplierList) {
                if (key != sub) {
                    if (this.$store.state.count.supplierList[key].checked == true) {
                        this.$store.state.count.supplierList[key].checked = false;
                    }
                }
            }
        },
        confirmEmp: function() {
            this.param.supplier = '';
            this.param.supplierName = '';
            this.param.product = '';
            this.param.origPrice = '';
            for (var key in this.initSupplierList) {
                if (this.$store.state.count.supplierList[key].checked == true) {
                    this.param.supplier = this.$store.state.count.supplierList[key].cid;
                    this.param.product = this.$store.state.count.supplierList[key].id;
                    this.param.supplierName = this.$store.state.count.supplierList[key].cName;
                    this.param.origPrice = this.$store.state.count.supplierList[key].price;
                }
            }
            this.$dispatch('supplier', this.param);
            this.param.show = false;

        }

    },

    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getProductSupplier(this.loadParam);
            this.checked = false;

        },
    },
    created() {
        this.getProductSupplier(this.loadParam);
        /*if(this.param.employeeId){
              this.loadParam.name= this.param.employeeName;
              console.log(this.loadParam.name)
              console.log(this.param.employeeName)
        }*/
    }
}
</script>
<style scoped>
.modal {
    z-index: 1085;
}

.modal_con {
    width: 900px;
    z-index: 1085;
}

.top-title {
    width: 900px;
    z-index: 1083;
    position: fixed;
    right: 0;
    left: 0;
    margin: auto;
}

.edit_footer {
    width: 900px;
    z-index: 1000;
}

.trans_service {
    margin-top: 10px;
}

.con_list {
    position: relative;
}

.change_trans {
    margin-top: 20px;
}

.con_trans {
    margin-top: 40px;
}

.name_search {
    margin-top: 30px;
}

.btn_shape {
    width: 175px;
}

.tans_tab {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #fa6705;
    text-align: left;
}

.tans_tab > .tabs {
    width: 100px;
    display: inline-block;
    font-size: 14px;
    text-align: center;
    background-color: #f5f5f5;
    color: #333;
    float: left;
    height: 40px;
    border-bottom: 1px solid #fa6705;
    cursor: pointer;
}

.tans_tab .tabs_active {
    background-color: #fff;
    color: #fa6705;
    border: 1px solid #fa6705;
    border-bottom: 0;
}

.tans_tab .tabs_active_1 {
    background-color: #fff;
    color: #fa6705;
    border: 1px solid #fa6705;
    border-bottom: 0;
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

.trans_service .col-xs-8 {
    margin-bottom: 20px;
}

.table_head>thead>tr {
    color: #333;
    font-size: 18px;
}

.trans_parten {
    text-align: left;
}

.treeview {
    height: 500px;
    border: 0px;
}

.table {
    display: table;
}
</style>

<template>
    <!-- 意向报价 -->
    <div>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>我的报价</h3>
            </div>
            <table class="table table-hover table_color table-striped ">
                <thead>
                    <tr>
                        <th>报价时间</th>
                        <th>供应商名称</th>
                        <!-- <th>求购业务员</th> -->
                        <th>产地</th>
                        <th>价格</th>
                        <th>数量</th>
                        <th>单位</th>
                        <th>审核状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initDetailMyOfferList">
                        <td>{{item.otime.substr(0,19)}}</td>
                        <td>{{item.offerCustomerName}}</td>
                        <!-- <td>{{item.buyCustomerName}}</td> -->
                        <td>{{item.location | province}}</td>
                        <td>{{item.price}}元</td>
                        <td>{{item.number}}</td>
                        <td>{{item.unit | unit}}</td>
                        <td>{{item.validate | Audit}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="edit_footer">
                <button type="button" class="btn  btn-confirm" @click="param.show=false">{{$t('static.confirm')}}</button>
            </div> -->
        </div>
    </div>
</template>
<script>

import {
    initDetailMyOfferList
} from '../../vuex/getters'
import {
    getMyOfferList

} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {

        }
    },
    vuex: {
        getters: {
           initDetailMyOfferList
        },
        actions: {
           getMyOfferList
        }
    },
    methods: {
        

    },
    watch: {

    },
    computed: {
       
    },
    events: {
        
    },
    created() {
        this.getMyOfferList(this.param)
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
    bottom: 200px;
    height: 500px;
    overflow-y:auto;
}

.top-title {
    position: fixed;
    width: 700px;
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

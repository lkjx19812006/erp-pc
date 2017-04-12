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
            </section>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import pressImage from '../../components/imagePress'
import filter from '../../filters/filters.js'
import {


} from '../../vuex/getters'
import {

} from '../../vuex/actions'
export default {
    components: {
        pressImage,
        filter,
    },
    props: ['param'],
    data() {
        return {



        }
    },
    vuex: {
        getters: {

        },
        actions: {

        }
    },
    methods: {


    },
    filter: (filter, {}),
    created() {

    }
}
</script>
<style scoped>
.top-title {
    position: fixed;
    z-index: 1088;
    width: 40%;
    right: 0;
    left: 0;
}

.modal {
    z-index: 1083;
}

.modal_con {
    z-index: 1083;
    width: 40%;
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
    width: 40%;
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

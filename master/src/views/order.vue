<template>
    <div class="myOrder">
        <div class="order_search">
            <div class="clear">
                <div class="my_order col-xs-2">我的订单</div>
                <div class="col-xs-7 my_order_search">
                    <div class="name_search">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" placeholder="按名字搜索">
                    </div>
                    <div class="ordertel_search">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" placeholder="按订单号搜索">
                    </div>
                    <div class="tel_search">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" maxlength="11" class="search_input" placeholder="按电话搜索">
                    </div>
                </div>
                <div class="right">
                    <!-- <show-model :param="modelParam"></show-model> -->
                    <dialog-model :param="modelParam"></dialog-model>
                    <button class="new_btn" @click="newOrder('new')">新建</button>
                </div>
            </div>
        </div>  
        <div class="order_table">
            <div class="table">
                <ul class="clear">
                    <li><a>名称</a></li>
                    <li><a>交易模式</a></li>
                    <li><a>订单号</a></li>
                    <li><a>购货单位</a></li>
                    <li><a>联系电话</a></li>
                    <li><a>交易人</a></li>
                    <li><a>订单时间</a></li>
                    <li><a>物流状态</a></li>
                    <li></li>
                </ul>
            </div>
            <div class="table table_hover">
                <pulse-loader :loading="viewParam.loading" :color="color" :size="size"></pulse-loader>
                <ul class="clear" v-for="item in getOrderlist" v-cloak>
                    <li>{{item.orderStatus}}</li>
                    <li>{{item.orderModule}}</li>
                    <li>{{item.orderNum}}</li>
                    <li>{{item.orderUnit}}</li>
                    <li>{{item.orderTel}}</li>
                    <li>{{item.orderPerson}}</li>
                    <li>{{item.orderTime}}</li>
                    <li>{{item.orderLogstatus}}</li>
                    <li @click="edit($index)">
                       <img height="24" width="24" src="/static/images/default_arrow.png" />
                    </li>
                    <div class="order_action"  v-show='item.show' transition="expand">
                        <ul>
                            <li><a>编辑</a></li>
                            <li><a>修改</a></li>
                        </ul>
                    </div>
                </ul>
            </div>
        </div>
    </div>
    
</template>
<script>
import dialogModel from '../components/showDialog'
import {
    getList,
    getOrderlist
} from '../vuex/getters'
import {
    orderInquiry,
    changeShowStatue
} from '../vuex/actions'

export default {
    components: {
        dialogModel
    },
    data() {
        return {
            viewParam: {
                loading: true
            },
            modelParam:{
                 show: false,
                 name: 'new'
            },
            testData:this.getOrderlist,
            show:false
        }
    },
    vuex: {
        getters: {
            getList,
            getOrderlist
        },
        actions: {
            orderInquiry,
            changeShowStatue
        }
    },
    created() {
        this.orderInquiry(this.viewParam);
        if (this.$route.query.id > this.getList[1].subcategory.length || isNaN(this.$route.query.id)) {
            this.$route.query.id = 0;
        }
    },
    methods: {
        edit: function(id) {

            /*this.$store.state.table.list[0].show = Object.assign({}, item, { show: true });*/
            //this.$store.state.table.list[id].show=true;
            //console.log(this.$store.state.table.list[id].show)       
        },
        newOrder:function(value){
             this.modelParam.name=value;
             this.modelParam.show=true;
        }
    },
     route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
      }
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}

.order_search {
    padding: 25px 30px 0 40px;
}

.my_order {
    float: left;
    color: #fa6705;
    font-size: 20px;
    padding: 0;
}
.my_order_search{
    min-width: 742px;
}
.name_search,
.ordertel_search,
.tel_search {
    position: relative;
    border: 1px solid #ccc;
    float: left;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    background: #fff;
    height: 30px;
    line-height: 28px;
    margin-right: 11%;
}

.tel_search {
    margin-right: 0;
}

.name_search>img,
.ordertel_search>img,
.tel_search>img {
    float: left;
    margin-top: 2px;
    margin-left: 1px;
}

.search_input {
    color: #666;
    font-size: 14px;
    float: left;
    text-indent: 5px;
}

.search_input:focus {
    outline: 0;
}

.new_btn {
    float: right;
    border: 1px solid #ccc;
    color: #003077;
    padding: 4px 10px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    background: #fff;
}

.order_table {
    margin-top: 20px;
    position: relative;
    margin-right: 30px;
}

.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    border-top: 1px solid #ddd;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}

.order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 11.1%;
    display: table-cell;
}

.order_table .table > ul >li a {
    color: #003077;
}

.order_table .table_hover > ul:hover {
    background: #f5f5f5;
}

.order_table .table > ul >li img {
    margin: auto;
}

.order_action {
    position: absolute;
    right: 55px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
}

.order_show {
    position: absolute;
    right: 20px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
    display: block;
}

.order_action ul,
.order_show ul {
    margin-bottom: 0;
}

.order_action ul li a,
.order_show ul li a {
    color: #003077;
    padding: 5px 5px 5px 10px;
    display: block;
}

.expand-transition {
    transition: all .3s ease;
    overflow: inherit;
}

.expand-enter,
.expand-leave {
    opacity: 0;
    height: 0;
}

.v-spinner {
    text-align: center;
}
</style>

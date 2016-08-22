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
                	<show-dialog :param="modelPopup"></show-dialog>
                    <button class="new_btn" @click="new_order('new')">新建</button>
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
                <ul class="clear" v-for="items in getOrderlist" v-cloak>
                    <li>{{items.orderStatus}}</li>
                    <li>{{items.orderModule}}</li>
                    <li>{{items.orderNum}}</li>
                    <li>{{items.orderUnit}}</li>
                    <li>{{items.orderTel}}</li>
                    <li>{{items.orderPerson}}</li>
                    <li>{{items.orderTime}}</li>
                    <li>{{items.orderLogstatus}}</li>
                    <li @click.stop="edit(items.orderId)">
                       <img height="24" width="24" src="/static/images/default_arrow.png" />
                    </li>
                    <div class="order_action" v-show="!items.is_ordershow" transition="expand">
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
import show_dialog from '../components/show_dialog'
import {
    getList,
    getOrderlist
} from '../vuex/getters'
import {
    orderList
} from '../vuex/actions'

export default {
    components: {
    	show_dialog
    },
    data() {
        return {
            viewParam: {
                is_order: true,
                is_show:false,
                loading: true
            },
            modelPopup:{
            	 show: false
            }
        }
    },
    vuex: {
        getters: {
            getList,
            getOrderlist
        },
        actions: {
            orderList
        }
    },
    created() {
        this.orderList(this.viewParam);
        if (this.$route.query.id > this.getList[1].subcategory.length || isNaN(this.$route.query.id)) {
            this.$route.query.id = 0;
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
	},
    methods: {
        edit: function(id) {
            if (this.viewParam.is_ordershow == true) {
                this.viewParam.is_order = false;
                this.viewParam.is_show = true;
            } else {
                this.viewParam.is_order = true;
                this.viewParam.is_show = false;
            }
        },
        new_order:function(value){
        	 this.modelPopup.name=value;
        	 this.modelPopup.show=true;
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
    margin: 25px 30px 0 40px;
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
    right: 20px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
    display: none;
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
    transition: all .5s ease-in-out 0.1s;
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

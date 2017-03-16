<template>
    <div id="left" class="left high_bg" v-bind:class="{'left':getMenu==240,'left_close':getMenu==50}" transition="expand">
        <div class="menu" @click="menu()">
            <img src="/static/images/icon_menu.png" height="14" width="21" />
        </div>
        <ul class="left_menu">
            <!-- li左侧菜单列表循环 -->
            <li v-for="item in getList" transition="item">
                <div v-link="item.url" class="menu_div" @click="init_data(item.id,item)">
                    <div class="bleft">
                        <img v-bind:src="item.icon" height="21" width="21">
                    </div>
                    <a v-if="lang=='en'" title="{{item.ename}}">{{item.ename}}</a>
                    <a v-if="lang=='zh_CN'" title="{{item.cname}}">{{item.cname}}</a>
                </div>
                <div class="bshow" v-if="$route.path.split('?')[0]==item.url.split('?')[0]" transition="expand_trans">
                    <dl class="bshow_dl" clear>
                        <dd class="clear" v-if="sub.type===0" v-for="sub in item.subcategory" v-link="sub.url" transition="item" @click="init_data(sub.id,sub)">
                            <i class="fold_line"></i>
                            <div class="fold_content">
                                <div class="bleft">
                                    <img v-bind:src="sub.icon" height="15" width="15">
                                </div>
                                <a v-if="lang=='en'" style="cursor:pointer;" class="{{$route.path==sub.url?'active_font':''}}" title="{{sub.ename}}">{{sub.ename}}</a>
                                <a v-if="lang=='zh_CN'" style="cursor:pointer;" class="{{$route.path==sub.url?'active_font':''}}" title="{{sub.cname}}">{{sub.cname}}</a>
                            </div>
                        </dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
import {
    getList,
    getMenu,

} from '../vuex/getters'
import {
    initList,
    menuBar
} from '../vuex/actions'
export default {
    data() {
            return {
                lang: ''

            }
        },
        vuex: {
            getters: {
                getList,
                getMenu,

            },
            actions: {
                initList,
                menuBar
            },

        },
        created() {
            this.lang = Vue.config.lang;
        },

        events: {
            changeLang: function(val) {
                console.log('接收广播：' + val);
                this.lang = val;
            }
        },
        methods: {

            init_data: function(id, menu) {
                this.$store.state.table.isTop = false;
                var tab = '';
                if (menu.subcategory.length > 0) {
                    tab = menu.subcategory[0];
                } else {
                    tab = menu;
                }

                this.$dispatch("tab", tab);
            },
            menu: function() {
                this.menuBar();
            },
        }
}
</script>
<style scoped>
.item {
    box-sizing: border-box;
    background-color: #eee;
    border: 1px solid black;
    display: inline-block;
    width: 100px;
    height: 100px;
}

.item-transition {
    transition: opacity .5s ease;
}

.item-enter {
    opacity: 0;
}

.item-leave {
    opacity: 0;
    position: absolute;
    /* important for removal move to work */
}

.item-move {
    color: red;
    transition: transform .5s cubic-bezier(.55, 0, .1, 1);
    /* applied when moving */
}

.item-move {
    /* applied to the element when moving */
    transition: transform .5s cubic-bezier(.55, 0, .1, 1);
}

.left {
    height: 100%;
    position: fixed;
    width: 200px;
    /*  overflow-x: hidden !important;
   overflow-y: auto !important; */
    white-space: nowrap;
    z-index: 999;
}

.left:hover {
    overflow: auto;
}

.left_close {
    width: 50px;
    height: 100%;
    position: fixed;
    /* overflow-x: hidden !important;
    overflow-y: auto !important; */
    white-space: nowrap;
    z-index: 999;
}

.menu {
    padding-left: 16px;
    margin: 0px 0 30px 0;
    padding-top: 20px
}

.left_menu {
    font-size: 12px;
    padding: 0 10px;
}

.left_menu li {
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;
}

.menu_div {
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.left_menu li a {
    color: #fff;
    font-size: 12px;
    cursor: pointer;
}

.menu_div .bleft {
    float: left;
    width: 32px;
    height: 32px;
    margin-right: 16px;
    margin-top: 4px;
    text-align: center;
}

.menu_div .bleft img {
    margin: auto;
    margin-top: 4px;
}

.v-link-active >.bleft {
    background: #fa6705;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.active_font {
    color: #fa6705 !important;
}

.v-link-active {
    background: #16325c;
}

.bshow_dl dd {
    margin-left: 15px;
    position: relative;
    color: #fff;
}

.bshow_dl .bleft {
    float: left;
    padding-top: 2px;
    padding-right: 4px;
}

.bshow_dl .fold_content {
    padding-top: 9px;
    margin-left: 18px;
}

.bshow_dl .fold_line {
    height: 32px;
    display: inline-block;
    、 overflow: hidden;
    color: #fff;
    position: absolute;
    margin-top: -12px;
    width: 15px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
}

.bshow_dl dd:first-child .fold_line {
    height: 22px;
    display: inline-block;
    color: #fff;
    position: absolute;
    margin-top: -2px;
    width: 15px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
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

.expand_trans {
    transition: all;
    overflow: inherit;
}

.expand_trans-enter,
.expand_trans-leave {
    opacity: 0;
    height: 0;
}
</style>

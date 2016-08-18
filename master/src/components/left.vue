<template>
    <div id="left" class="left high_bg" v-bind:class="{'left':getMenu==240,'left_close':getMenu==50}" transition="expand">
        <div class="menu" @click="menu()">
            <img src="../assets/images/icon_menu.png" height="14" width="21" />
        </div>
        {{getCount}}
        <ul class="left_menu">
        <!-- li左侧菜单列表循环 -->
            <li v-for="item  in  getList">
                <div v-link="item.path" class="menu_div" @click="system_data(item.categoryid)">
                    <div class="bleft">
                        <img v-bind:src="item.img" height="21" width="21">
                    </div>
                    <a>{{item.category}}</a>
                </div>
                 <div class="bshow" v-if="willshow==item.categoryid" transition="expand_trans">
                    <dl class="bshow_dl mui-clearfix">
                        <dd class="mui-clearfix" v-for="sub in item.subcategory">
                            <i class="fold_line"></i>
                            <div class="fold_content">
                                <div class="bleft">
                                    <img v-bind:src="sub.img" height="15" width="15">
                                </div>
                                <span v-link="sub.path">{{sub.subcategory}}</span>
                            </div>
                        </dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {
    getList,
     getMenu
} from '../vuex/getters'
import {
    initList,
    menuBar
} from '../vuex/actions'
export default {
    data() {
            return {
                msg: '左边',
                willshow: 0
            }
        },
        vuex: {
            getters: {
                getList,
                getMenu
            },
            actions: {
                initList,
                 menuBar
            },
        },
        created() {
            this.initList();
        },
        methods: {
            system_data: function(id) { //点击菜单展开或关闭
                    this.willshow = id;
            },
            menu: function() {
                this.menuBar();
            },
        }
}
</script>
<style scoped>
.left {
    height: 100%;
    position: fixed;
    top: 60px;
    width: 240px;
    overflow: hidden;
    white-space: nowrap;
}
.left:hover {
  overflow: auto;
}

.left_close {
    width: 50px;
    height: 100%;
    position: fixed;
    top: 60px;
    overflow: hidden !important;
    white-space: nowrap;
}

.menu {
    padding-left: 16px;
    margin: 0px 0 30px 0;
    padding-top: 20px
}

.left_menu {
    font-size: 14px;
    padding: 0 16px;
}

.left_menu li {
    margin-bottom: 10px;
    position: relative;
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
    font-size: 14px;
}

.menu_div .bleft {
    float: left;
    width: 32px;
    height: 32px;
    margin-right: 16px;
    margin-top: 5px;
    text-align: center;
}

.v-link-active >.bleft {
    background: #fa6705;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}
.v-link-active ~ .bshow dd:first-of-type span{
    color: #fa6705;
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
    margin-top: 8px;
    margin-left: 18px;
}

.bshow_dl .fold_line {
    height: 32px;
    display: inline-block;
    color: #fff;
    position: absolute;
    margin-top: -12px;
    width: 15px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
}

.bshow_dl dd:first-child .fold_line{
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

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter,
.expand-leave {
    opacity: 0;
    height: 0;
}
.expand_trans{
    transition: all;
    overflow: inherit;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand_trans-enter,
.expand_trans-leave {
    opacity: 0;
    height: 0;
}
</style>

<template>
    <div id="left" class="left high_bg" v-bind:class="[left, { left: isB, left_close: isC }]" transition="expand">
        <div class="menu" @click="menu()">
            <img src="../assets/images/icon_menu.png" height="14" width="21" />
        </div>
        <ul class="left_menu">
            <li>
                <div v-link="" class="menu_div">
                    <div class="bleft">
                        <img src="../assets/images/icon_main.png" height="21" width="21">
                    </div>
                    <a>主页</a>
                </div>
            </li>
            <li>
                <div v-link="" class="menu_div">
                    <div class="bleft">
                        <img src="../assets/images/icon_change.png" height="21" width="21">
                    </div>
                    <a>业务机会</a>
                </div>
            </li>
            <li>
                <div v-link="{ path: '/home/news'}" class="menu_div" @click="system_data()">
                    <div class="bleft">
                        <img src="../assets/images/icon_base.png" height="21" width="21">
                    </div>
                    <a>系統基础数据</a>
                </div>
                <div class="bshow" v-if="willshow" transition="expand">
                    <dl class="bshow_dl mui-clearfix">
                        <dd class="mui-clearfix">
                            <i class="fold_line_active"></i>
                            <div class="fold_content">
                                <div class="bleft">
                                    <img src="../assets/images/icon_order.png" height="15" width="15">
                                </div>
                                <span class="con_active">我的订单</span>
                            </div>
                        </dd>
                        <dd class="mui-clearfix">
                            <i class="fold_line"></i>
                            <div class="fold_content">
                                <div class="bleft">
                                    <img src="../assets/images/icon_order.png" height="15" width="15">
                                </div>
                                <span>部门订单</span>
                            </div>
                        </dd>
                    </dl>
                </div>
            </li>
            <li>
                <div v-link="{ path: '/home/message'}" class="menu_div">
                    <div class="bleft">
                        <img src="../assets/images/icon_data.png" height="17" width="21">
                    </div>
                    <a>业务基础数据{{getList[0].categoryid}}</a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {
    getList
} from '../vuex/getters'
import {
    initList
} from '../vuex/actions'
export default {
    data() {
            return {
                msg: '左边',
                willshow: true,
                isB: true,
                isC: false
            }
        },
        vuex: {
            getters: {
                getList
            },
            actions: {
                initList
            }
        },
        created() {
            this.initList();
        },
    methods: {
        system_data: function() { //点击菜单展开或关闭
            if (this.willshow == true) {
                this.willshow = false;
            } else {
                this.willshow = true;
            }
        },
        menu: function() {
            if (this.isB == true) {
                this.isB = false;
                this.isC = true;
            } else {
                this.isB = true;
                this.isC = false;
            }
        }
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

.left_close {
    width: 50px;
    height: 100%;
    position: fixed;
    top: 60px;
    overflow: hidden;
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

.v-link-active {
    background: #16325c;
}

.bshow {}

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

.bshow_dl .con_active {
    color: #fa6705;
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

.fold_line_active {
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
    overflow: hidden;
}


/* .expand-enter 定义进入的开始状态 */


/* .expand-leave 定义离开的结束状态 */

.expand-enter,
.expand-leave {
    opacity: 0;
    height: 0;
}
</style>

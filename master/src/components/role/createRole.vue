<template>
    <div>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container  modal_con">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>{{param.title}}</h3>
            </div>
            <validator name="validation">
                <form novalidate>
                    <div class="edit-model">
                        <section class="editsection" v-cloak>
                            <div class="cover_loading">
                                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>名称<span class="system_danger" v-if="$validation.cname.minlength">请输入至少两位</span></label>
                                    <input type="text" id="cname" class="form-control" maxlength="11" v-model="param.cname" v-validate:cname="{minlength:2}" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>备注</label>
                                    <input type="text" class="form-control" v-model="param.remark" />
                                </div>
                            </div>
                            <div class="clearfix" style="display:none;">
                                <div class="table-responsive">
                                    <table class="table">
                                        <tr v-for="item in list.result">
                                            <td v-if="$index%5==0">
                                                <div style="float:left;width:20%">
                                                    <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index].show,'checkbox_select_base':list.result[$index].show}" @click="selectShow(list.result[$index])">
                                                    </label>
                                                    <p style="padding-top:10px;float:left">{{list.result[$index].cname}}</p>
                                                    <div v-for="subItem in list.result[$index].subcategory" style="margin-left:8px">
                                                        <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}" @click="selectShow(subItem)">
                                                        </label>
                                                        <p style="padding-top:10px;float:left">{{subItem.cname}}</p>
                                                        <div v-if="list.result[$index].subcategory" style="margin-left:8px" v-for="secondItem in subItem.subcategory">
                                                            <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}" @click="selectShow(secondItem)">
                                                            </label>
                                                            <p style="padding-top:10px;float:left">{{secondItem.cname}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="list.result[$index+1]" style="float:left;width:20%">
                                                    <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index+1].show,'checkbox_select_base':list.result[$index+1].show}" @click="selectShow(list.result[$index+1])">
                                                    </label>
                                                    <p class="line_text">{{list.result[$index+1].cname}}</p>
                                                    <div v-for="subItem in list.result[$index+1].subcategory" style="margin-left:8px">
                                                        <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}" @click="selectShow(subItem)">
                                                        </label>
                                                        <p class="line_text">{{subItem.cname}}</p>
                                                        <div v-if="list.result[$index+1].subcategory" style="margin-left:8px" v-for="secondItem in subItem.subcategory">
                                                            <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}" @click="selectShow(secondItem)">
                                                            </label>
                                                            <p style="padding-top:10px;float:left">{{secondItem.cname}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="list.result[$index+2]" style="float:left;width:20%">
                                                    <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index+2].show,'checkbox_select_base':list.result[$index+2].show}" @click="selectShow(list.result[$index+2])">
                                                    </label>
                                                    <p class="line_text">{{list.result[$index+2].cname}}</p>
                                                    <div v-for="subItem in list.result[$index+2].subcategory" style="margin-left:8px">
                                                        <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}" @click="selectShow(subItem)">
                                                        </label>
                                                        <p class="line_text">{{subItem.cname}}</p>
                                                        <div v-if="list.result[$index+2].subcategory" style="margin-left:8px" v-for="secondItem in subItem.subcategory">
                                                            <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}" @click="selectShow(secondItem)">
                                                            </label>
                                                            <p style="padding-top:10px;float:left">{{secondItem.cname}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="list.result[$index+3]" style="float:left;width:20%">
                                                    <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index+3].show,'checkbox_select_base':list.result[$index+3].show}" @click="selectShow(list.result[$index+3])">
                                                    </label>
                                                    <p class="line_text">{{list.result[$index+3].cname}}</p>
                                                    <div v-for="subItem in list.result[$index+3].subcategory" style="margin-left:8px">
                                                        <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}" @click="selectShow(subItem)">
                                                        </label>
                                                        <p class="line_text">{{subItem.cname}}</p>
                                                        <div v-if="list.result[$index+3].subcategory" style="margin-left:8px" v-for="secondItem in subItem.subcategory">
                                                            <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}" @click="selectShow(secondItem)">
                                                            </label>
                                                            <p style="padding-top:10px;float:left">{{secondItem.cname}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="list.result[$index+4]" style="float:left;width:20%">
                                                    <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index+4].show,'checkbox_select_base':list.result[$index+4].show}" @click="selectShow(list.result[$index+4])">
                                                    </label>
                                                    <p class="line_text">{{list.result[$index+4].cname}}</p>
                                                    <div v-for="subItem in list.result[$index+4].subcategory" style="margin-left:8px">
                                                        <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}" @click="selectShow(subItem)">
                                                        </label>
                                                        <p class="line_text">{{subItem.cname}}</p>
                                                        <div v-if="list.result[$index+4].subcategory" style="margin-left:8px" v-for="secondItem in subItem.subcategory">
                                                            <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}" @click="selectShow(secondItem)">
                                                            </label>
                                                            <p style="padding-top:10px;float:left">{{secondItem.cname}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <!-- 权限修改样式 -->
                            <div>
                                <div class="clear">
                                    <ul v-for="item in list.result">
                                        <li>
                                            <div class="clear">
                                                <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index].show,'checkbox_select_base':list.result[$index].show}" @click="selectShow(list.result[$index])">
                                                </label>
                                                <p class="line_text">{{list.result[$index].cname}}</p>
                                                <!-- 二级目录 -->
                                                <div v-for="subItem in list.result[$index].subcategory" class="sub_second clear">
                                                    <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}" @click="selectShow(subItem)">
                                                    </label>
                                                    <p class="line_text">{{subItem.cname}}</p>
                                                    <!-- 三级功能 -->
                                                    <div class="clear">
                                                        <ul class="sub_second clear">
                                                            <li class="clear" v-for="secondItem in subItem.subcategory">
                                                                <label class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!secondItem.show,'checkbox_select_base':secondItem.show}" @click="selectShow(secondItem)">
                                                                </label>
                                                                <p class="line_text">{{secondItem.cname}}</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                        <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="save()">保存</button>
                        <button type="button" class="btn  btn-confirm" v-else disabled="disabled">保存</button>
                    </div>
                </form>
            </validator>
        </div>
    </div>
</template>
<script>
import {

} from '../../vuex/getters'
import {
    baseGetData,
    baseAddData,
    baseUpdateData
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            arr: [0, 1, 2, 3, 4],
            dateText: '',
            show: true
        }
    },
    vuex: {
        getters: {
            list: state => state.tablelist.menu.list
        },
        actions: {
            baseGetData,
            baseAddData,
            baseUpdateData
        }
    },
    methods: {
        selectShow: function(item) {
            item.show = !item.show;
            this.selectParentNode(item);
            this.selectChildNode(item);
        },
        //选择父节点时，所有子节点做相应的改变
        selectParentNode: function(item) {
            if (item.subcategory.length !== 0) {
                for (let i = 0; i < item.subcategory.length; i++) {
                    item.subcategory[i].show = item.show;
                    this.selectParentNode(item.subcategory[i]);
                }
            }
        },
        //选择子节点
        selectChildNode: function(item) {
            if (item.pid !== 0) {
                for (let j = 0; j < this.list.result.length; j++) {
                    if (this.list.result[j].subcategory.length > 0 && this.list.result[j].id == item.pid) {
                        if (item.show) {
                            this.list.result[j].show = true;
                            break;
                        } else {
                            if (item.type == 1) {
                                this.list.result[j].show = true;
                                break;
                            } else {
                                this.list.result[j].show = false;
                                for (let k = 0; k < this.list.result[j].subcategory.length; k++) {
                                    if (this.list.result[j].subcategory[k].show) {
                                        this.list.result[j].show = true;
                                        break;
                                    }
                                }
                            }

                        }
                    }
                }
            }
        },
        save: function() {
            function CurentTime() {
                var now = new Date();
                var year = now.getFullYear(); //年
                var month = now.getMonth() + 1; //月
                var day = now.getDate(); //日
                var hh = now.getHours(); //时
                var mm = now.getMinutes(); //分
                var clock = year + "-";
                if (month < 10)
                    clock += "0";
                clock += month + "-";
                if (day < 10)
                    clock += "0";
                clock += day + " ";
                if (hh < 10)
                    clock += "0";
                clock += hh + ":";
                if (mm < 10) clock += '0';
                clock += mm;
                return (clock);
            }
            let idArr = [];
            for (let i in this.list.result) { //一级
                if (this.list.result[i].show) {
                    idArr.push(this.list.result[i].id);
                }
                for (let m in this.list.result[i].subcategory) { //二级
                    if (this.list.result[i].subcategory[m].show) {
                        idArr.push(this.list.result[i].subcategory[m].id);
                    }
                    for (let k in this.list.result[i].subcategory[m].subcategory) { //三级
                        if (this.list.result[i].subcategory[m].subcategory[k].show) {
                            idArr.push(this.list.result[i].subcategory[m].subcategory[k].id);
                        }
                        console.log(idArr)
                    }
                }
            }
            if (idArr.length == 0) {
                return alert("请选择功能");
            }
            this.param.body = {
                cname: this.param.cname,
                menus: idArr.join(","),
                remark: this.param.remark
            };
            this.param.link = '/sys/role/';
            this.param.keyName = 'power';
            this.param.loading = true;
            this.param.utime = CurentTime();
            if (this.param.id) {
                this.param.body.id = this.param.id;
                this.baseUpdateData(this.param);
            } else {
                this.baseAddData(this.param);
            }
            this.param.show = false;
        },
        getDataInit: function() {
            if (this.param.menus) {
                let idArr = this.param.menus.split(',');
                for (let item in idArr) {
                    for (let m in this.list.result) {
                        if (this.list.result[m].id == idArr[item]) {
                            this.list.result[m].show = true;
                        }
                        for (let n in this.list.result[m].subcategory) {
                            if (this.list.result[m].subcategory[n].id == idArr[item]) {
                                this.list.result[m].subcategory[n].show = true;
                            }
                            for (let k in this.list.result[m].subcategory[n].subcategory) {
                                if (this.list.result[m].subcategory[n].subcategory[k].id == idArr[item]) {
                                    this.list.result[m].subcategory[n].subcategory[k].show = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    created() {
        this.param.keyName = 'menu';
        this.param.url = '/sys/menu/';
        this.param.cur = 1;
        this.param.getDataInit = this.getDataInit;
        console.log(this.param);
        this.baseGetData(this.param);
    }
}
</script>
<style scoped>
.editsection {
    margin-bottom: 50px;
}

.search_input {
    float: none;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.search_input {
    text-indent: 0px;
}

.top-title {
    left: 0;
    right: 0;
    width: 800px;
}

.line_text {
    padding-top: 10px;
    float: left;
}

.sub_second {
    margin-left: 26px;
    clear: both;
    white-space: normal;
}

.sub_second > li {
    display: inline-block;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.role {
    margin-right: 10px;
}

.table {
    display: table;
}
</style>

<template>
    <div>
        <mglist-model>
            <!-- 头部搜索-->
            <div slot="top">
                <dd class="pull-right">
                    <button type="button" class="btn btn-primary" height="24" width="24" @click="cancel()">
                        取消
                    </button>
                </dd>
            </div>
            <!--中间列表-->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <div style="display:inline-block;height:400px;margin-right:60px" v-for="list in $store.state.table.dictionary">
                    <button v-if="list.isEdit" type="button" class="btn btn-default" height="24" width="24" @click="addSingle($index)">添加</button>
                    <button v-if="!list.isEdit" type="button" class="btn btn-primary" height="24" width="24" @click="editSingle($index)">
                        编辑
                    </button>
                    <button v-else type="button" class="btn btn-primary" height="24" width="24" @click="saveSingle(list)">
                        保存
                    </button>
                    <table class="table table-hover table_color table-striped " style="display:table;width:400px" v-cloak>
                        <thead>
                            <tr>
                                <th colspan="3">
                                    <div v-if="list.fileName=='zh_CN.i18n.json'">中文</div>
                                    <div v-else>English</div>
                                </th>
                            </tr>
                            <tr>
                                <th>key</th>
                                <th>value</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in list.arr">
                                <td>
                                    <div v-if="!list.isEdit">{{item.key}}</div>
                                    <div v-else>
                                        <input type="text" v-model="item.key">
                                    </div>
                                </td>
                                <td>
                                    <div v-if="!list.isEdit">{{item.value}}</div>
                                    <div v-else>
                                        <input type="text" v-model="item.value">
                                    </div>
                                </td>
                                <td>
                                    <a v-if="list.isEdit" @click="deleteSingle(list,$index)">删除</a>
                                    <div v-else>删除</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--底部分页-->
            <!-- <pagination :combination="loadParam" slot="page"></pagination> -->
        </mglist-model>
    </div>
</template>
<script>
import common from '../common/common'
import changeMenu from '../components/tools/tabs/tabs.js'
import pagination from '../components/pagination'
import mglistModel from '../components/mguan/mgListComponent.vue'
import {
    initDictionary
} from '../vuex/getters'
import {
    readDictionary,
    saveDictionary
} from '../vuex/actions'


export default {
    //props: ['param'],
    components: {
        pagination,
        mglistModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                lang: "en1,zh_CN"
            },
            saveParam: {
                fileName: "",
                dictionary: ""
            },
        }
    },
    vuex: {
        getters: {
            initDictionary
        },
        actions: {
            readDictionary,
            saveDictionary
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.checked = false;
        }
    },
    methods: {
        //单个语言操作
        addSingle: function(index) {
            if ((this.initDictionary[index].arr.length == 0 || this.initDictionary[index].arr[0].key !== "") && this.initDictionary[index].isEdit) {
                let temp = {
                    key: "",
                    value: ""
                };
                this.$store.state.table.dictionary[index].arr.unshift(temp);
            }

        },
        editSingle: function(index) {
            this.$store.state.table.dictionary[index].isEdit = true;
        },
        saveSingle: function(list) {
            list.isEdit = false;
            this.saveParam.fileName = list.fileName;
            this.saveParam.dictionary = "{";
            for (let i = 0; i < list.arr.length; i++) {
                this.saveParam.dictionary += list.arr[i].key + ":\"" + list.arr[i].value + "\";";
            }
            this.saveParam.dictionary += "}";

            this.saveDictionary(this.saveParam);
        },
        deleteSingle: function(list, index) {
            if (list.isEdit) {
                list.arr.splice(index, 1);
            }

        },

        cancel: function() {
            this.readDictionary(this.loadParam);
        }


    },
    ready() {
        //common('tab', 'table_box', 1);
    },
    created() {
        this.readDictionary(this.loadParam);
    }


}
</script>
<style scoped>
.component_action {
    right: 32px;
    top: 50%;
    padding: 3px 0;
}

.transfer {
    margin-right: 16px;
}

.service-nav {
    padding: 23px 30px 0px 4px;
}

#table_box table th,
#table_box table td {
    min-width: 88px;
    width: 88px;
}

dl {
    margin-bottom: 5px;
}
</style>

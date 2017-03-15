<template>
    <div>
        <mglist-model>
            <!-- 头部搜索-->
            <div slot="top">
                <dd class="pull-right">
                    <div class="clear" style="margin-top:3px;">
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">页面搜索：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="condition" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                            </dd>
                        </dl>
                        <button type="button" class="btn btn-primary" height="24" width="24" @click="selectSearch()">
                            {{$t('static.search')}}
                        </button>
                        <button type="button" class="btn btn-primary" height="24" width="24" @click="resetCondition()">
                            {{$t('static.clear_all')}}
                        </button>
                        <button v-if="!isEdit" type="button" class="btn btn-primary" height="24" width="24" @click="edit()">
                            {{$t('static.edit')}}
                        </button>
                        <button v-else type="button" class="btn btn-primary" height="24" width="24" @click="save()">
                            {{$t('static.save')}}
                        </button>
                        <button type="button" class="btn btn-primary" height="24" width="24" @click="cancel()">
                            {{$t('static.cancel')}}
                        </button>
                    </div>
                </dd>
            </div>
            <!--中间列表-->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <div style="display:inline-block;height:400px;margin-right:60px">
                    <!-- <button v-if="isEdit" type="button" class="btn btn-default" height="24" width="24" @click="add()">添加</button> -->
                    <table class="table table-hover table_color table-striped " style="display:table;width:400px" v-cloak>
                        <thead>
                            <tr>
                                <th>key</th>
                                <th>中文</th>
                                <th>英文</th>
                                <!-- <th rowspan="1000">{{$t('static.handle')}}</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in $store.state.table.dictionary[0].arr" v-if="item.show">
                                <td>
                                    <div>{{item.key}}</div>
                                </td>
                                <td>
                                    <div>{{item.zh_CN}}</div>
                                </td>
                                <td>
                                    <div v-if="!isEdit">{{item.en}}</div>
                                    <div v-else>
                                        <input type="text" v-model="item.en">
                                    </div>
                                </td>
                                <!-- <td>
                                    <a v-if="list.isEdit" @click="deleteSingle(list,$index)">删除</a>
                                    <div v-else>删除</div>
                                </td> -->
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
                lang: "zh_CN,en"
            },
            saveParam: {
                fileName: "",
                dictionary: ""
            },
            condition: "",
            isEdit: false
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
        edit: function() {
            this.isEdit = true;
        },
        save: function() {
            this.isEdit = false;
            this.saveParam.fileName = "en.i18n.json";
            this.saveParam.dictionary = "{";
            let arr = this.initDictionary[0].arr;
            for (let i = 0; i < arr.length; i++) {
                this.saveParam.dictionary += arr[i].key + ":\"" + arr[i].en + "\";";
            }
            this.saveParam.dictionary += "}";

            this.saveDictionary(this.saveParam);
        },
        cancel: function() {
            this.isEdit = false;
            this.readDictionary(this.loadParam);
        },
        selectSearch: function() {
            let arr = this.$store.state.table.dictionary[0].arr;
            for (let i = 0; i < arr.length; i++) {
                arr[i].show = true;
                if (arr[i].key.indexOf(this.condition) == -1 && arr[i].zh_CN.indexOf(this.condition) == -1 && arr[i].en.indexOf(this.condition) == -1) {
                    arr[i].show = false;
                }
            }

        },
        resetCondition: function() {
            this.condition = "";
            this.selectSearch();
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

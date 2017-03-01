<template>
    <div>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show = false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="model-header">
                <h4>{{$t('static.breed')}}</h4>
                <div class="trans_service clearfix">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>
                    <div class="clear">
                        <dl class="clear left transfer">
                            <dt class="left marg_top">{{$t('static.breed')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.name" @keyUp.enter="employNameSearch()" placeholder="{{$t('static.breed')}}" />
                            </dd>
                        </dl>
                        <div class="name_search clearfix transfer" style="border:none">
                            <input type="button" class="btn btn-default" height="24" width="24" value="{{$t('static.search')}}" @click="employNameSearch()">
                            <button type="button" class="btn btn-default transfer" @click="resetTime()">{{$t('static.clear_all')}}</button>
                        </div>
                    </div>
                    <table class="table table-hover table_head table-striped " v-cloak>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{{$t('static.breed')}}</th>
                                <th>English name</th>
                                <th>{{$t('static.type')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in initBreedlist" @click="serviceselected($index,item.id,item.name,item.eName)">
                                <td>
                                    <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"></label>
                                </td>
                                <td>{{item.name}}</td>
                                <td>{{item.eName}}</td>
                                <td>{{item.categoryName}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="base_pagination">
                    <pagination :combination="loadParam"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import {
    initBreedlist
} from '../../vuex/getters'
import {
    getBreedData,
    getBreedNameSearch
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                name: '',
                eName: '',
                total: 0
            },
            checked: false,
            show: true
        }
    },
    components: {
        pagination
    },
    vuex: {
        getters: {
            initBreedlist
        },
        actions: {
            getBreedData,
            getBreedNameSearch
        }
    },
    methods: {
        serviceselected: function(sub, id, name, eName) {
            this.$store.state.table.basicBaseList.breedList[sub].checked = !this.$store.state.table.basicBaseList.breedList[sub].checked;
            for (var key in this.initBreedlist) {
                if (key != sub) {
                    if (this.$store.state.table.basicBaseList.breedList[key].checked == true) {
                        this.$store.state.table.basicBaseList.breedList[key].checked = false;
                    }
                }
            }

            this.param.breedId = id;
            this.param.breedName = name;
            this.param.eName = eName;
            this.param.show = false;
            this.$dispatch('breed', this.param);


        },
        employNameSearch: function() {
            this.getBreedNameSearch(this.loadParam);
        },
        resetTime: function() {
            this.loadParam.name = '';
            this.loadParam.eName = '';
            this.getBreedNameSearch(this.loadParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getBreedData(this.loadParam);
        }
    },
    created() {
        this.getBreedData(this.loadParam);
    }
}
</script>
<style scoped>
.modal {
    z-index: 1086;
}

.modal_con {
    z-index: 1086;
}

.change_trans {
    margin-top: 20px;
}

.top-title {
    top: 91px;
    position: fixed;
    right: 0;
    width: 800px;
    margin: auto;
    left: 0;
}

.transfer {
    margin-left: 10px;
}

.checkbox_unselect {
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

.checkbox_select {
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

.trans_service {
    margin-top: 20px;
    margin-bottom: 20px;
}

.trans_service .col-xs-8 {
    margin-bottom: 20px;
}

.table {
    margin-bottom: 5px;
}

.table_head>thead>tr {
    background-color: #f5f7f9;
    color: #000;
    font-size: 18px;
}

.base_pagination {
    margin-top: 0;
    position: relative;
}

.table {
    display: table;
}
</style>

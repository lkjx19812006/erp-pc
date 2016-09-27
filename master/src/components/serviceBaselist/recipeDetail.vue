<template>
    <div class="breed_detail">
        <div class="client-section clearfix" v-cloak>
            <div @click="close()" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="col-md-8">
                <h4 class="section_title">成分相关</h4>
                <div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading clearfix" @click="drugToggle(initDruglist)">
                            <h4 class="panel-title clearfix">
                                <img class="pull-left" src="/static/images/company.png" height="30" width="26" />
                                <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                    企业({{initDruglist.length}})
                                </a>
                            </h4>
                        </div>
                        <div class="panel-collapse"   v-show="!initDruglist.show"> 
                            <div class="panel-body panel-set">
                                <table class="table contactSet">
                                    <thead>
                                        <tr>
                                            <th>药品名称</th>
                                            <th>药品编号</th>
                                            <th>药品类型</th>
                                            <th>所属公司</th>
                                            <th>公司地址</th>
                                            <th>说明</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in initDruglist">
                                            <td>
                                                {{item.name}}
                                            </td>
                                            <td>{{item.number}}</td>
                                            <td>{{item.drugType}}</td>
                                            <td>{{item.company}}</td>
                                            <td>{{item.address}}</td>
                                            <td>{{item.spec}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4" style="border-left:1px solid #ddd">
                <h4 class="section_title">详情</h4>
                <div class="edit-detail clearfix">
                    <div class="client-detailInfo  col-xs-12">
                        <label>药品名称</label>
                        <input type="text" class="form-control" value="{{param.name}}" disabled="disabled" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种名称</label>
                        <input type="text" class="form-control" value="{{param.breedName}}" disabled="disabled" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>含量</label>
                        <input type="text" class="form-control" value="{{param.quantity}}" disabled="disabled" />
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>单位</label>
                        <input type="text" class="form-control" value="{{param.unit}}"  disabled="disabled"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import filter from '../../filters/filters'
import {
    initDruglist
} from '../../vuex/getters'
import {
    getRecipeDetail,
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            show:false
        }
    },
    vuex: {
        getters: {
            initDruglist
        },
        actions: {
            getRecipeDetail
        }
    },
    methods: {
        drugToggle: function(param) {
            console.log(this.$store.state.table.basicBaseList.drugList)
            if(this.$store.state.table.basicBaseList.drugList.length==0){
                this.$store.state.table.basicBaseList.drugList.show=false
                console.log(this.$store.state.table.basicBaseList.drugList.show)
            }
            this.$store.state.table.basicBaseList.drugList.show =!this.$store.state.table.basicBaseList.drugList.show;
            console.log(this.$store.state.table.basicBaseList.drugList.show)
        },
        close: function() {
            this.param.show = false;
        }
    },
    filter: (filter, {})
}
</script>
<style scoped>
.contactSet thead{
    color: #fa6705;
    }
.top-title{
    width: 100%;
    right: 0;
    top:130px;
}
.breed_detail {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;
    height: 100%;
}

.client-detailInfo img {
    width: 100px;
}

.breed_action {
    top: 0px;
    right: 30px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt {
    display: block;
    padding: 3px 10px;
    font-size: 14px;
    cursor: pointer;
}
.breed_action dl dt:hover{
    color: #1a90ff;
}
</style>

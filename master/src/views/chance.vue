<template>
	 <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">业务机会</div>
            <div class="col-xs-8 my_order_search">
                <div class="name_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" placeholder="按品种类别搜索">
                </div>
                <div class="ordertel_search clearfix">
                    <img src="/static/images/search.png" height="24" width="24">
                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="按客户名称搜索">
                </div>
            </div>
            <div class="right col-xs-2">
               <!--  <button class="new_btn transfer" @click="clientTransfer({
                   arr:[],
                   name:'test',
                   employeeId:'',
                   orgId:'',
                   show:true
                   })">划转</button> -->
                <button class="new_btn" @click="createCustomer('create')">新建</button>
            </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak>
                <thead>
                    <tr>
                        <th>类型</th>
	            		<th>特殊的</th>
	            		<th>品种名称</th>
	            		<th>资格资质</th>
	            		<th>规格</th>
	            		<th>单位</th>
	            		<th>交收地址</th>
	            		<th>预付比例</th>
	            		<th>发票</th>
	            		<th>上门看货</th>
	            		<th>包装</th>
	            		<th>是否国际</th>
	            		<th>提供样品</th>
	            		<th>样品数量</th>
	            		<th>样品单位</th>
	            		<th>样品总价</th>
	            		<th>报价总数</th>
	            		<th>报价均价</th>
	            		<th>状态</th>
	            		<th></th>
                    </tr>
                </thead>
                <tbody>
                   <!--  <tr>
                       <td>
                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label>
                       </td>
                       <td>全选</td>
                   </tr> -->
                    <tr v-for="item in initChanceList">
                        <td>{{item.type}}</td>
                        <td>{{item.especial}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.qualification | qualify}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.unit}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.advance}}</td>
                        <td>{{item.invoic}}</td>
                        <td>{{item.visit}}</td>
                        <td>{{item.pack}}</td>
                        <td>{{item.intl}}</td>
                        <td>{{item.sampling}}</td>
                        <td>{{item.sampleNumber}}</td>
                        <td>{{item.sampleUnit}}</td>
                        <td>{{item.sampleAmount}}</td>
                        <td>{{item.offer}}</td>
                        <td>{{item.offerVprice}}</td>
                        <td>{{item.status}}</td>
                        <td @click.stop="eventClick($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show="item.show">
                                <ul>
                                    <li @click="modifyClient({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.name,
                                                type:item.type,
                                                category:item.category,
                                                principal:item.principal,
                                                bizScope:item.bizScope,
                                                tel:item.tel,
                                                email:item.email,
                                                province:item.province,
                                                city:item.city,
                                                address:item.address,
                                                comments:item.comments,
                                                link:alterInfo,
                                                url:'/customer/',
                                                key:'customerList'
                                                })">编辑</li>
                                    <li @click="specDelete({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.name,
                                                title:'客户',
                                                link:deleteInfo,
                                                url:'/customer/',
                                                key:'customerList'
                                                })">删除</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
</template>
<script>
import pagination from '../components/pagination'
import filter from '../filters/filters'
import {
	initChanceList
} from '../vuex/getters'
import {
	getChanceList
} from '../vuex/actions'
export default {
    components: {   
        pagination
    },
    vuex: {
        getters: {
            initChanceList
        },
        actions: {
            getChanceList
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            }
        }
    },
    methods: {
         eventClick:function(sub){
            if(this.$store.state.table.basicBaseList.chanceList[sub].show){
                this.$store.state.table.basicBaseList.chanceList[sub].show = !this.$store.state.table.basicBaseList.chanceList[sub].show;
            }else{
                this.$store.state.table.basicBaseList.chanceList[sub].show=true;
            }   
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getChanceList(this.loadParam);
        }
    },
    created() {
        this.getChanceList(this.loadParam, this.loadParam.all);
    },
    filter: (filter,{})
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-left: 18px;
}
.checkbox_unselect{
    background-image: url(../../static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.checkbox_select{
    background-image: url(../../static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
</style>

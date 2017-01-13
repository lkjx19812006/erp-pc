<template>
	  <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
            <div class="clear">
                <div class="my_order col-xs-2">省市区</div>
            </div>
        </div>
        <!-- 中间列表 -->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color  table-striped" id="tab">
                <thead>
                      <tr>
                          <th>编号</th>
                          <th>名称</th>
                          <th>英文名称</th>
                          <th>级别</th>
                          <th>ISO编码</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="item in initProvincelist" v-cloak>
                          <td>{{item.twoNumber | numberstate}}</td>
                          <td>{{item.cname}}</td>
                          <td>{{item.nameEn}}</td>
                          <td>{{item.level}}</td>
                          <td>{{item.iso | isostate}}</td>
                      </tr>
                  </tbody>
            </table>
        </div>
         <!-- 底部分页 -->
        <pagination :combination="loadParam"  slot="page"></pagination>
    </mglist-model>
        
</template>
<script>
import pagination from '../pagination'
import filter from '../../filters/filters'
import common from '../../common/common'
import mglistModel from '../mguan/mgListComponent.vue'
import {
    initProvincelist
} from '../../vuex/getters'
import {
    getProvinceData
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        filter,
        mglistModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                all:10,
                cur:1,
                total:0
            },
            show:true
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getProvinceData(this.loadParam);
        }
    },
    vuex: {
        getters: {
            initProvincelist
        },
        actions: {
            getProvinceData
        }
    },
    created() {
        this.getProvinceData(this.loadParam,this.loadParam.all);
    },
/*     route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
      }
    },*/
    ready(){
      common('tab','table_box',1);
    },
    filter:(filter,{
    })
}
</script>
<style scoped>
.order_search {
    padding: 25px 30px 0 40px;
}

.my_order {
    float: left;
    color: #fa6705;
    padding: 0;
}
.name_search{
    position: relative;
    border:none;
    display: inline-block;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    background: #fff;
    height: 34px;
    line-height: 32px;
     margin-right: 7%;
}
.tel_search {
    margin-right: 0;
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
.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
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
    width: 15.8%;
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
 #table_box  table th,#table_box  table td{
    width: 343px;
    min-width: 343px;
}
</style>

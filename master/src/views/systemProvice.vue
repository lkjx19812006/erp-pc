<template>
     <div class="myOrder">
        <div class="order_search">
            <div class="clear">
                <div class="my_order col-xs-2">省市区</div>
            </div>
        </div>  
        <div class="order_table">
           <div class="table">
              <ul class="clear">
                  <li><a>编号</a></li>
                  <li><a>名称</a></li>
                  <li><a>级别</a></li>
                  <li><a>图标</a></li>
                  <li><a>IOS编码</a></li>
              </ul>
          </div>
          <div class="table table_hover"  v-cloak>
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
              <ul class="clear" v-for="item in initProvincelist">
                  <li>{{item.provinceId}}</li>
                  <li>{{item.provinceName}}</li>
                  <li>{{item.provinceRank}}</li>
                  <li>{{item.provinceIcon}}</li>
                  <li>{{item.provinceIOS}}</li>
              </ul>
          </div> 
        </div>
    </div>
    <div class="order_pagination">
        <pagination :combination="list"></pagination>
    </div>
</template>
<script>
import pagination from '../components/pagination'
import systemModel from '../components/systemDataInfoDialog'
import modifyModel from '../components/systemUpdateInfo'
import {
    getList,
    initProvincelist
} from '../vuex/getters'
import {
    getSystemData,
    changeShowStatue
} from '../vuex/actions'

export default {
    components: {
        pagination,
        modifyModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            dialogParam:{
                 show: false,
                 name: 'data'   
            },
            modifyParam:{
            	$index:'id',
            	show:false
            },
            show:true,
            list: {all:8,cur:1}
        }
    },
    vuex: {
        getters: {
            getList,
            initProvincelist
        },
        actions: {
            getSystemData,
            changeShowStatue
        }
    },
    created() {
        this.getSystemData(this.loadParam);
       /* this.changeShowStatue();*/
        if (this.$route.query.id > this.getList[1].subcategory.length || isNaN(this.$route.query.id)) {
            this.$route.query.id = 1;
        }
    },
    methods: {
        modify:function(id){
        	this.modifyParam.$index=id;
            this.modifyParam.show=true;
        }
    },
     route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
      }
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}

.order_search {
    padding: 25px 30px 0 40px;
}

.my_order {
    float: left;
    color: #fa6705;
    font-size: 20px;
    padding: 0;
}
.my_order_search{
    
}
.name_search,
.ordertel_search,
.tel_search {
    position: relative;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    background: #fff;
    height: 30px;
    line-height: 28px;
     margin-right: 7%; 
}
.tel_search {
    margin-right: 0;
}

.name_search>img,
.ordertel_search>img,
.tel_search>img {
    float: left;
    margin-top: 2px;
    margin-left: 1px;
}

.search_input {
    color: #666;
    font-size: 14px;
    float: left;
    text-indent: 5px;
}

.search_input:focus {
    outline: 0;
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

.order_table {
    margin-top: 20px;
    position: relative;
    margin-right: 30px;
}

.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    border-top: 1px solid #ddd;
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

.order_action {
    position: absolute;
    right: 96px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
}

.order_show {
    position: absolute;
    right: 96px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
    display: block;
}

.order_action ul,
.order_show ul {
    margin-bottom: 0;
}

.order_action ul li a,
.order_show ul li a {
    color: #003077;
    padding: 5px 5px 5px 10px;
    display: block;
    cursor: pointer;
}

.expand-transition {
    transition: all .3s ease;
    overflow: inherit;
}

.expand-enter,
.expand-leave {
    opacity: 0;
    height: 0;
}

.v-spinner {
    text-align: center;
}
.order_pagination{
    position: absolute;;
    bottom: 50px;
    left:0;
    right: 0;
    text-align: center;
}
</style>

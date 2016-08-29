<template>
    <div class="myOrder" v-show="$route.path.split('=')[1]==0">
        <div class="order_search">
            <div class="clear">
                <div class="my_order col-xs-2">枚举类型</div>
                <div class="right col-xs-2">
                    <system-model :param="dialogParam"></system-model>
                    <button class="new_btn" @click="dataBase('data')" data-toggle="modal" data-target="#myModal">新建</button>
                </div>
            </div>
        </div>  
        <div class="order_table">
           <div class="table">
              <ul class="clear">
                  <li><a>编号</a></li>
                  <li><a>编码</a></li>
                  <li><a>类型</a></li>
                  <li><a>描述</a></li>
                  <li><a>状态</a></li>
                  <li></li>
              </ul>
          </div>
          <div class="table table_hover">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
              <ul class="clear" v-for="item in initSystemlist" v-cloak>
                  <li>{{item.systemDataId}}</li>
                  <li>{{item.systemDataCode}}</li>
                  <li>{{item.systemDataType}}</li>
                  <li>{{item.systemDescribe}}</li>
                  <li>{{item.systemStatus}}</li>
                  <li @click="editData($index)">
                     <img height="24" width="24" src="/static/images/default_arrow.png" />
                  </li>
                  <div class="order_action"  v-show='item.show' transition="expand">
                      <ul>
                      	  <modify-model :param="modifyParam"></modify-model>
                          <li @click="modify($index)"><a>编辑</a></li>
                          <!-- <modify-model :param="modifyParam"></modify-model> -->
                          <li><a>删除</a></li>
                      </ul>
                  </div>
              </ul>
          </div> 
        </div>
    </div>
     <div class="myOrder" v-show="$route.path.split('=')[1]==1">
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
    initSystemlist,
    initProvincelist
} from '../vuex/getters'
import {
    getSystemData,
    getProvinceData,
    changeShowStatue
} from '../vuex/actions'

export default {
    components: {
        systemModel,
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
            initSystemlist,
            initProvincelist
        },
        actions: {
            getSystemData,
            changeShowStatue,
            getProvinceData
        }
    },
    created() {
        this.getSystemData(this.loadParam);
        this.getProvinceData(this.loadParam);
        if (this.$route.query.id > this.getList[10].subcategory.length || isNaN(this.$route.query.id)||!this.$route.query.id) {
            this.$route.query.id = 0;
        }
        console.log(this.$route.query.id);
    },
    methods: {
        editData: function(id) {
            if(this.$store.state.table.systemDataList[id].show == true){
                this.$store.state.table.systemDataList[id].show=!this.$store.state.table.systemDataList[id].show;
            }else{
                 this.$store.state.table.systemDataList[id].show=true;
            }       
        },
        dataBase:function(value){
             this.dialogParam.name=value;
             this.dialogParam.show=true;
        },
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

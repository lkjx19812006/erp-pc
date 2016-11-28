	<template>
  	<create-model :param.sync="createParam" v-if="createParam.show"></create-model>
  	<tip-model :param.sync="tipParam" v-if="tipParam.show"></tip-model>
		 <div  class="myemploy" >
        <div class="order_search">
            <div class="clearfix">
                <div class="my_order col-xs-1">角色列表</div>
                <div class="right">
                    <button class="new_btn" @click="newData()">新建</button>
                </div>
            </div>
        </div>
        <div class="order_table" id="table_box">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
           <table class="table table-hover table_color table-striped"  v-cloak id="tab">
              <thead>
                  <tr>
                     <th>名称</th>
                     <th>备注</th>
                     <th>更新时间</th>
                     <th style="width:150px;">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list.result.list">
                    <td>{{item.cname}}</td>
                    <td>{{item.remark}}</td>
                    <td>{{item.utime}}</td>
                    <td>
                      <a class="operate" @click="editData(item,$index)"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
                      </a>
                      <!-- <img height="24" width="24" src="/static/images/default_arrow.png" style="margin:auto"/>
                       <div class="component_action" v-show='item.show' transition="expand">
                          <ul>
                              <li @click="editData(item,$index)">编辑</li>
                             <li @click="showConfirm(item,$index)">删除</li>
                          </ul>
                        </div> -->
                      <a class="operate"  @click="showConfirm(item,$index)"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
        </div>
         <div class="order_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
	</template>

	<script>
import createModel  from '../components/role/createRole'
import pagination from '../components/pagination'
import tipModel  from '../components/tips/tipDialog'
import common from '../common/common'
import {

} from '../vuex/getters'
import {
 baseGetData,
 baseDelData
} from '../vuex/actions'
export default {
    components:{
        pagination,
        createModel,
        tipModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                keyName:'power',
                mobile:'',
                orgId:'',
                url:'/sys/role/',
                total:0
            },
            createParam:{
                show:false,
                item:{},
                loading:true,
                cname:'',
                remark:''
            },
            tipParam:{
            	show:false,
            	name:'',
            	alert:false,
            	confirm:false,
            	callback:''
            }
        }
    },
    methods:{
        editData:function(item,index){
           this.createParam.show=true;
           this.createParam.title='修改角色';
           this.createParam.cname=item.cname;
           this.createParam.remark=item.remark;
           this.createParam.id=item.id;
           this.createParam.menus=item.menus;
           this.createParam.index=index;

        },
        newData:function(){
           this.createParam.show=true;
           this.createParam.title='新建角色';
           this.createParam.cname='';
           this.createParam.remark='';
           this.createParam.id='';
           this.createParam.menus='';
        },
        showConfirm:function(item,index){
        	this.loadParam.index=index;
        	this.loadParam.id=item.id;
        	this.tipParam.show=true;
        	this.tipParam.name='确定删除'+item.cname+'吗？';
        	this.tipParam.confirm=true;
        	this.tipParam.alert=false;
        	this.tipParam.callback=this.delData;
        },
        delData:function(){
        	this.loadParam.loading=true;
        	this.baseDelData(this.loadParam);
        }

    },
    vuex: {
        getters: {
          list:state => state.tablelist.power.list
        },
        actions: {
          baseGetData,
          baseDelData
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.baseGetData(this.loadParam);
        }
    },
    ready(){
      common('tab','table_box',1);
    },
    created() {
      this.baseGetData(this.loadParam);
    }
}
</script>
<style scoped>
.myemploy {
    width: 100%;
    white-space: nowrap;
}
.order_search {
    padding: 25px 30px 0 40px;
}
.order_table {
    margin-top: 20px;
    position: relative;
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

.order_pagination{
    margin: 0 auto;
    text-align: center;
}

.table>tbody{
    position: relative;
}
.table>tbody>tr{
    position: relative;
}
.space>tr>th {
    background-color: #f4f6f9;
    height: 10px;
}

.base_pagination{
    margin: auto;
    text-align: center;
}
 #table_box  table th,#table_box  table td{
  width: 425px;
  min-width: 425px;
}
</style>

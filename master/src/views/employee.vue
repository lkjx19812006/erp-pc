<template>
<createemp-model :param="createParam" v-if="createParam.show"></createemp-model>
    <div  class="myemploy">
        <div class="order_search">
            <div class="clear">
                <div class="my_order col-xs-2">员工列表</div>
                <div class="col-xs-8 my_order_search">
                    <div class="name_search">

                    </div>
                </div>
                <div class="right col-xs-2">
                    <button class="new_btn" @click="newData({ 
                         title:'新建员工',
                         show:true,
                         name:'',
                         orgId:'',
                         orgCode:'',
                         status:'',
                         ename:'',
                         no:'',
                         orgName:'',
                         position:'',
                         mobile:'',
                         extNo:'',
                         level:'',
                         role:[{'id':1,'type':'管理员','checked':false},{'id':2,'type':'部门经理','checked':false}],
                         entryDate:'',
                         leaveDate:'',
                         namelist:'姓名',
                         englist:'英文名',
                         job:'工号',
                         parten:'部门',
                         code:'部门编码',
                         orgid:'部门编号',
                         statuslist:'状态',
                         positionlist:'职位',
                         phonelist:'手机',
                         nolist:'分机号',
                         entry:'入职时间',
                         leave:'离职时间',
                         levellist:'职级',
                         link:Employ,
                         url:'/employee/',
                         key:'employeeList'
                         })">新建</button>
                </div>
            </div>
        </div>  
        <div class="order_table">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
           <table class="table table-hover table_color table-striped"  v-cloak>
              <thead>
                  <tr>
                     <th>姓名</th>
                     <th>英文名</th>
                     <th>工号</th>
                     <th>部门</th>
                     <th>职位</th>
                     <th>手机号</th>
                     <th>分机号</th>
                     <th>入职时间</th>
                     <th>离职时间</th>
                     <th>职级</th>
                     <th></th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-for="item in initEmployeeList">  
                    <td>{{item.name}}</td>
                    <td>{{item.ename}}</td>
                    <td>{{item.no}}</td>
                    <td>{{item.orgName}}</td>
                    <td>{{item.position}}</td>
                    <td>{{item.mobile}}</td>
                    <td>{{item.extNo}}</td>
                    <td>{{item.entryDate | entryDate}}</td>
                    <td>{{item.leaveDate}}</td>
                    <td>{{item.level | levelstate}}</td>
                    <td  @click="editData($index,{
                            concrete:'employeeList'
                            })">
                      <img height="24" width="24" src="/static/images/default_arrow.png" style="margin:auto"/>
                       <div class="component_action" v-show='item.show' transition="expand">
                          <ul>
                              <li @click="modify({
                                 title:'编辑员工',
                                 sub:$index,
                                 id:item.id,
                                 show:true,
                                 name:item.name,
                                 ename:item.ename,
                                 no:item.no,
                                 role:item.role,
                                 orgId:item.orgId,
                                 orgCode:item.orgCode,
                                 status:item.status,
                                 orgName:item.orgName,
                                 position:item.position,
                                 mobile:item.mobile,
                                 extNo:item.extNo,
                                 level:item.level,
                                 entryDate:item.entryDate,
                                 leaveDate:item.leaveDate,
                                 namelist:'姓名',
                                 englist:'英文名',
                                 job:'工号',
                                 parten:'部门',
                                 positionlist:'职位',
                                 phonelist:'手机',
                                 nolist:'分机号',
                                 code:'部门编码',
                                 orgid:'部门编号',
                                 statuslist:'状态',
                                 entry:'入职时间',
                                 leave:'离职时间',
                                 levellist:'职级',
                                 link:updateEmploy,
                                 url:'/employee/',
                                 key:'employeeList'
                                })">编辑</li>
                             <!--  <li>删除</li> -->
                          </ul>
                        </div>
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
import createempModel  from '../components/emloyee/createEmploy'
import pagination from '../components/pagination'
import filter from '../filters/filters'
import {
   getList,
   initEmployeeList
} from '../vuex/getters'
import {
    getEmployeeList,
    updateEmploy
} from '../vuex/actions'
export default {
    components:{
        pagination,
        createempModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            createParam:{
                show:false
            }
        }
    },
    methods:{
        editData:function(sub,param){
            if(this.$store.state.table.basicBaseList[param.concrete][sub].show){
                this.$store.state.table.basicBaseList[param.concrete][sub].show= !this.$store.state.table.basicBaseList[param.concrete][sub].show;
            }else{
                this.$store.state.table.basicBaseList[param.concrete][sub].show = true;
            }
        },
        newData:function(initEmployeeList){
            this.createParam=initEmployeeList;
            console.log(this.createParam.arr)
        },
        modify:function(initEmployeeList){
            this.createParam=initEmployeeList;
        }
    },
    vuex: {
        getters: {
           getList,
           initEmployeeList
        },
        actions: {
            getEmployeeList,
            updateEmploy
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmployeeList(this.loadParam);
        }
    },
    created() {
        if (this.$route.query.id > this.getList[7].subcategory.length || isNaN(this.$route.query.id)||!this.$route.query.id) {
            this.$route.query.id = 0;
        }
        this.getEmployeeList(this.loadParam,this.loadParam.all);
    },
    filter:(filter,{})
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

.my_order {
    float: left;
    color: #fa6705;
    font-size: 20px;
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
/* .component_action{
    position: absolute;
    right: 20px;
    padding: 10px 0;
    top:32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
}

.component_action ul li{
    text-align: left;
    padding:3px 8px;
    cursor: pointer;
} */
.base_pagination{
    margin: auto;
    text-align: center;
}
.cover_loading{
   text-align: center;
   position: absolute;
   top: 40%;
   z-index: 1100;
   left: 0;
   right: 0
}

</style>

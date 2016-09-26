<template>
     <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>报价详情</h3>
        </div>      
        <div class="order_table">
           <table class="table table-hover table_color"  v-cloak>
              <thead>
                  <tr>
                     <th>客户名称</th>
                     <th>客户手机号</th>
                     <th>品种名称</th>
                     <th>资质资格</th>
                     <th>规格</th>
                     <th>单价</th>
                     <th>单位</th>
                     <th>数量</th>
                     <th>产地</th>
                     <th>提供样品</th>
                     <th>样品数量</th>
                     <th>样品单位</th>
                     <th></th>
                  </tr>
                </thead> 
                <tbody>
                  <tr>  
                    <td class="underline">{{initOfferList.customerName}}</td>
                    <td>{{initOfferList.customerPhone}}</td>
                    <td>{{initOfferList.breedName}}</td>
                    <td>{{initOfferList.orgName}}</td>
                    <td>{{initOfferList.qualification}}</td>
                    <td>{{initOfferList.spec}}</td>
                    <td>{{initOfferList.price}}</td>
                    <td>{{initOfferList.unit}}</td>
                    <td>{{initOfferList.number}}</td>
                    <td>{{initOfferList.location}}</td>
                    <td>{{initOfferList.sampling}}</td>
                    <td>{{initOfferList.sampleNumber}}</td>
                    <td>{{initOfferList.sampleUnit}}</td>
                    <td >
                      <img height="24" width="24" src="/static/images/default_arrow.png" style="margin:auto"/>
                      <!--  <div class="component_action" v-show='item.show' transition="expand">
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
                                orgid:item.orgid,
                                orgcode:item.orgcode,
                                status:item.status,
                                orgName:item.orgName,
                                position:item.position,
                                mobile:item.mobile,
                                extno:item.extno,
                                level:item.level,
                                entrydate:item.entrydate,
                                leavedate:item.leavedate,
                                namelist:'姓名',
                                englist:'英文名',
                                job:'工号',
                                parten:'部门',
                                positionlist:'职位',
                                phonelist:'手机',
                                nolist:'分机号',
                                code:'部门编码',
                                orgiid:'部门编号',
                                statuslist:'状态',
                                entry:'入职时间',
                                leave:'离职时间',
                                levellist:'职级',
                                link:updateEmploy,
                                url:'/employee/',
                                key:'employeeList'
                               })">编辑</li>
                            <li @click="specDelete({
                                   id:item.id,
                                   sub:$index,
                                   show:true,
                                   name:item.name,
                                   title:'员工',
                                   link:deleteInfo,
                                   url:'/employee/',
                                   key:'employeeList'
                                   })">删除</li>
                         </ul>
                       </div> -->
                    </td>
                  </tr>
                </tbody>
              </table>
        </div>
    </div>
</template>
<script>
import filter from '../../filters/filters'
import {
    initOfferList
} from '../../vuex/getters'
import {
    getOffersdetail
} from '../../vuex/actions'
export default {
    components:{
        
    },
     props: ['param'],
    data() {
        return {
            
        }
    },
    methods:{

    },
    vuex: {
        getters: {
            initOfferList
        },
        actions: {
            getOffersdetail
        },
    },
    filter:(filter,{})
}
</script>
<style scoped>
.myemploy {
    width: 100%;
    white-space: nowrap;
}
.edit-content {
    padding: 19px 10px;
    text-align: center;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}
.order_search {
    padding: 0px 30px 0 40px;
}
.modal_con{
    overflow-x: auto;
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
.table>thead>tr>th{
    color: #fa6705;
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

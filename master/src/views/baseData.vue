<template>
    <drawdel-model :param="modelParam" v-if="!drawdel"></drawdel-model>
    <ingredient-model :param="ingredientParam" v-if="!ingredient"></ingredient-model>
    <entprise-model :param="entpriseParam" v-if="!entprise"></entprise-model>
    <enterprise-model :param="enterdialogParam" v-if="!baseshow" ></enterprise-model>
    <draw-model :param="dialogParam" v-if="!drawshow" ></draw-model>
    <modify-model :param="modifyParam" v-if="!modifyenter"></modify-model>
    <breed-model :param="breedParam" v-if="!breedshow" ></breed-model> 
    <breeddel-model :param="delParam" v-if="!delshow" ></breeddel-model>
    <breedrevise-model :param="reviseParam" v-if="!reviseshow" ></breedrevise-model>

    <div class="service-data" v-show="$route.path.split('=')[1]==0">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader> 
        </div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">企业</div>
            <div class="right col-xs-2">
                <button class="new_btn" @click="newEnterprise('enedit')" data-toggle="modal" data-target="#myModal">新建</button>
            </div>
        </div>
        <div class="order_table"  v-cloak>
            <table class="table table-hover table_color">
                <thead>
                    <tr>
                        <th>编 码</th>
                        <th>分类码</th>
                        <th>企业名称</th>
                        <th>电 话</th>
                        <th>法定代表人</th>
                        <th>企业代表人</th>
                        <th>生产范围</th>
                        <th>所在省</th>
                        <th>所在市</th>
                        <th>注册地址</th>
                        <th>发证日期</th>
                        <th>有效截止日</th>
                        <th></th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead> 
                <tbody>
                    <tr v-for="item in initEnterpriselist" >
                        <td>{{item.number}}</td>
                        <td>{{item.category | categorystate}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.tel | telstate}}</td>
                        <td>{{item.legalPerson}}</td>
                        <td>{{item.principal}}</td>
                        <td>{{item.bizScope}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.ctime}}</td>
                        <td>{{item.utime}}</td>
                        <td @click="etpriseEdit($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show='item.show' transition="expand">
                                <ul>
                                    <li @click="modifyEnter($index)">编辑</li>
                                    <li @click="entpriseDel($index)">删除</li>
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
    <!-- 成分 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==1">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">成分</div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam1.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color">
                <thead>
                    <tr>
                        <th>编 码</th>
                        <th>药品名</th>
                        <th>所属药厂</th>
                        <th>成分名</th>
                        <th>含 量</th>
                        <th>单 位</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initConponentlist" v-cloak>
                        <td>{{item.code}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.companyName | companyname}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.unit}}</td>
                        <td>{{item.status}}</td>
                       <!--  <td @click="componentEdit($index)">
                           <img height="24" width="24" src="/static/images/default_arrow.png" />
                           <div class="component_action" v-show='item.show' transition="expand">
                               <ul>
                                   <li  @click="modifyComp($index,item)">编辑</li>
                                   <li  @click="delIngredit($index)">删除</li>
                               </ul>
                           </div>
                       </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
         <div class="base_pagination">
            <pagination :combination="loadParam1"></pagination>
        </div>
    </div>
    <!-- 提取物 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==2">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam2.loading" :color="color" :size="size"></pulse-loader> 
        </div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2">提取物</div>
        </div>
        <div class="order_table">
            <table class="table table-hover table_color"  v-cloak>
                <thead>
                    <tr>
                        <th>中文名</th>
                        <th>英文名</th>
                        <th>拉丁文名</th>
                        <th>有效成分和别名</th>
                        <th>常用比例</th>
                        <th>客户名称</th>
                        <th>产地</th>
                        <th>规格</th>
                        <th>采购价格</th>
                    </tr>
                </thead>
                <thead class="space">
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initDrawlist">
                        <td>{{item.name}}</td>
                        <td>{{item.drawenglish}}</td>
                        <td>{{item.drawlatin}}</td>
                        <td>{{item.drawactive}}</td>
                        <td>{{item.drawratio}}</td>
                        <td>{{item.contactsName}}</td>
                        <td>{{item.drawproduct}}</td>
                        <td>{{item.drawspec}}</td>
                        <td>{{item.drawprice}}</td>
                       <!--  <td  @click="drawEdit($index)">
                           <img height="24" width="24" src="/static/images/default_arrow.png" />
                           <div class="component_action" v-show='item.show' transition="expand">
                               <ul>
                                   <li>编辑</li>
                                   <li @click="delOperation($index)">删除</li>
                               </ul>
                           </div>
                       </td> -->
                     </tr>
                </tbody>
            </table>
        </div> 
        <div class="base_pagination">
            <pagination :combination="loadParam2"></pagination>
        </div>
    </div>
    <!-- 药材 -->
     <div class="service-data" v-show="$route.path.split('=')[1]==3">
         <div v-show="changeShow">
            <div class="service-nav clearfix">
                <div class="my_enterprise col-xs-2">药材列表</div>
                <div class="col-xs-8 my_order_search">
                    <div class="name_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input"  placeholder="按品种类别搜索">
                    </div>
                    <div class="ordertel_search clearfix">
                        <img src="/static/images/search.png" height="24" width="24">
                        <input type="text" class="search_input" v-model="loadParam3.name" placeholder="按品种名称搜索" v-on:keyup="categoryNameSearch(loadParam3.name)">
                    </div>
                </div>
                <div class="right col-xs-2">
                    <button class="new_btn" @click="createBreed('create')">新建</button>
                </div>
            </div>
            <div class="order_table">
               <div class="cover_loading">
                   <pulse-loader :loading="loadParam3.loading" :color="color" :size="size"></pulse-loader>
               </div>
                <table class="table table-hover table_color" v-cloak>
                    <thead>
                        <tr>
                            <th>编码</th>
                            <th>品种名称</th>
                            <th>图标</th>
                            <th></th>
                        </tr>
                    </thead>
                    <thead class="space">
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initBreedlist" @click="editBreed(item.id)">
                            <td>{{item.code | breedcode}}</td>
                            <td>{{item.name}}</td>
                            <td><img :src="item.icon" alt="药材图标" height="80px" /></td>
                            <td @click="breedClick($index)">
                               <img height="24" width="24" src="/static/images/default_arrow.png" />
                               <div class="component_action" v-show='item.show' transition="expand">
                                   <ul>
                                       <li  @click="modifyBreed($index,item)">编辑</li>
                                       <li  @click="delBreed($index,item.id)">删除</li>
                                   </ul>
                               </div>
                           </td> 
                        </tr>
                    </tbody>
                </table>
            </div>
             <div class="base_pagination">
                <pagination :combination="loadParam3"></pagination>
            </div>
        </div>
        <!-- 点击药材编辑 -->
        <div class="client-section clearfix" v-show="!changeShow">
            <div @click="changeShow = true" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="col-md-8 client-detail">
                <h4 class="section_title">药材相关</h4>
                <article>
                   <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader> 
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading clearfix">
                                <h4 class="panel-title clearfix">
                                    <img class="pull-left" src="/static/images/contact.png" height="32" width="27" />
                                    <a data-toggle="collapse" data-parent="#accordion"  class="panel-title-set">
                                        规格（8）
                                    </a>
                                    <button type="button" class="btn btn-base pull-right">新建</button>
                                </h4>

                            </div>
                            <div  class="panel-collapse collapse in">
                                <div class="panel-body panel-set">
                                    <ul class="clearfix" >
                                        <li class="panel-name">
                                            <img class="pull-left" src="../../static/images/contactname.png" height="21" width="18" />
                                            <label>规格名称：{{name}}</label>
                                        </li>
                                        <li class="panel-job">
                                            <label>职务：</label>
                                        </li>
                                        <li class="panel-phone">
                                            <label>电话：</label>
                                        </li>
                                        <li class="panel-email">
                                            <label>电子邮件：</label>
                                        </li>
                                        <li>
                                            <img src="../../static/images/default_arrow.png" height="24" width="24" />
                                        </li>
                                    </ul>
                                    <p class="contact-view">查看全部</p>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading clearfix">
                                <h4 class="panel-title clearfix">
                                            <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                            <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                                产地（0）
                                            </a>
                                            <button type="button" class="btn btn-base pull-right">新建</button>
                                        </h4>
                            </div>
                            <div id="collapseTwo" class="panel-collapse collapse">
                                <div class="panel-body">
                                    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title clearfix">
                                    <img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
                                    <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                        别名（8）
                                    </a>
                                    <button type="button" class="btn btn-base pull-right">新建</button>
                                </h4>
                            </div>
                            <div id="collapseThree" class="panel-collapse collapse">
                                <div class="panel-body">
                                    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title clearfix">
                                    <img class="pull-left" src="/static/images/compact.png" height="32" width="27"  />
                                    <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                        产地名称（0）
                                    </a>
                                    <button type="button" class="btn btn-base pull-right">新建</button>
                                </h4>
                            </div>
                            <div id="collapseThree" class="panel-collapse collapse">
                                <div class="panel-body">
                                    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title clearfix">
                                    <img class="pull-left" src="/static/images/file.png" height="34" width="26"  />
                                    <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                        单位（2）
                                    </a>
                                    <button type="button" class="btn btn-base pull-right">新建</button>
                                </h4>
                            </div>
                            <div id="collapseThree" class="panel-collapse collapse">
                                <div class="panel-body">
                                    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title clearfix">
                                    <img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
                                    <a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
                                        跟进（0）
                                    </a>
                                    <button type="button" class="btn btn-base pull-right">新建</button>
                                </h4>
                            </div>
                            <div id="collapseThree" class="panel-collapse collapse">
                                <div class="panel-body">
                                    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <div class="col-md-4">
                <h4 class="section_title">详情</h4>
                <article>
                    <div class="edit-detail clearfix">
                            <div class="client-detailInfo col-xs-12">
                                <label>编号</label>
                                <input type="text" class="form-control" v-model='breedBaseData.code' value="{{breedBaseData.code}}" />
                            </div>
                            <div class="client-detailInfo  col-xs-12">
                                <label>品种名称</label>
                                <input type="text" class="form-control" value="{{breedBaseData.name}}" v-model='breedBaseData.name'/>
                            </div>
                            <div class="client-detailInfo  col-xs-12">
                                <label>品种分类选择</label>
                                <select class="form-control" v-model="breedBaseData.selected">
                                    <option v-for="item in initBreedlist" value="{{item.id}}">{{item.name}}</option>
                                </select>
                            </div>
                            <div class="client-detailInfo  col-xs-12 ">
                                <label>图标</label>
                                <div class="clearfix">
                                    <div class="client-image col-md-4">
                                        <press-image></press-image>
                                    </div>
                                    <div class="client-image col-md-4">
                                        <press-image></press-image>
                                    </div>
                                    <div class="client-image col-md-4">
                                        <press-image></press-image>
                                    </div>
                                </div>
                            </div>
                        <div class="client-editbtn col-xs-12">
                            <button type="button" class="btn btn-orange">保存</button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../components/pagination'
import pressImage from '../components/imagePress'
import enterpriseModel  from '../components/serviceBaseData/enterpriseEditDialog'
import drawModel from '../components/serviceBaseData/drawEditDialog'
import drawdelModel from '../components/serviceBaseData/drawDeleteModel'
import ingredientModel from '../components/serviceBaseData/ingredientDelModel'
import entpriseModel from '../components/serviceBaseData/entpriseDelModel'
import modifyModel from '../components/serviceBaseData/enterpriseUpdate'
import filter from '../filters/filters'
import breedModel from '../components/serviceBaseData/createBreedDialog'
import breeddelModel from '../components/serviceBaseData/breedDelete'
import breedreviseModel from '../components/serviceBaseData/breedUpdate'
import {
    getList,
    initEnterpriselist,
    initConponentlist,
    initDrawlist,
    initBreedlist
} from '../vuex/getters'
import {
    getEnterpriseData,
    getComponentData,
    getDrawData,
    getBreedData,
    getBreedNameSearch
} from '../vuex/actions'
export default {
    components:{
        enterpriseModel,
        drawModel,
        drawdelModel,
        ingredientModel,
        entpriseModel,
        modifyModel,
        pagination,
        pressImage,
        breedModel,
        breeddelModel,
        breedreviseModel,
        filter
    },
    data(){
        return {
            breedBaseData:{
              /*  name: this.initBreedlist[this.Bid].name,
                code: this.initBreedlist[this.Bid].code,
                selected: this.initBreedlist[this.Bid].categoryId*/
            },
            dialogParam:{
                show:false,
                name:'data'
            },
            enterdialogParam:{
                show:false,
                name:'enedit'
            },
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur:1,
                all:7
            },
            loadParam1:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur:1,
                all:7
            },
            loadParam2:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur:1,
                all:7
            },
            loadParam3:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur:1,
                all:7,
                name:''
            },
            modelParam:{
                show:false,
                id:''
            },
            ingredientParam:{
                show:false,
                id:''
            },
            entpriseParam:{
                show:false,
                id:''
            },
            modifyParam:{
                show:false,
                id:''
            },
            breedParam:{
                show:false,
                name:''
            },
            reviseParam:{
                show:false,
                id:''
            },
            delParam:{
                show:false,
                id:''
            },
            baseshow:true,
            drawdel:true,
            ingredient:true,
            entprise:true,
            drawshow:true,
            componnetshow:true,
            modifyenter:true,
            breedshow:true,
            changeShow:true,
            delshow:true,
            reviseshow:true
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEnterpriseData(this.loadParam);
            this.loadParam1.cur = input;
            this.getComponentData(this.loadParam1);
            this.loadParam2.cur = input;
            this.getDrawData(this.loadParam2);
            this.loadParam3.cur = input;
            this.getBreedData(this.loadParam3);
        }
    },
    watch: {
        cur: function(oldValue , newValue)
        {console.log(arguments)}
    },
    vuex: {
        getters: {
            getList,
            initEnterpriselist,
            initConponentlist,
            initDrawlist,
            initBreedlist
        },
        actions: {
            getEnterpriseData,
            getComponentData,
            getDrawData,
            getBreedData,
            getBreedNameSearch
        }
    },
    created() {
        this.getEnterpriseData(this.loadParam,this.loadParam.all);
        this.getComponentData(this.loadParam1,this.loadParam1.all);
        this.getDrawData(this.loadParam2,this.loadParam2.all);
        this.getBreedData(this.loadParam3,this.loadParam3.all);
        if (this.$route.query.id > this.getList[11].subcategory.length || isNaN(this.$route.query.id) || !this.$route.query.id) {
            this.$route.query.id = 0;
        }
    },
    methods: {
        categoryNameSearch:function(name){
            this.getBreedNameSearch(this.loadParam3,this.loadParam3.all);
        },
        newEnterprise:function(value){
            this.enterdialogParam.show= true;
            this.enterdialogParam.name = value;
            this.baseshow=false;
        },
        component:function(value){
            this.dialogParam.show= true;
            this.dialogParam.name = value;
            this.componnetshow=false;
        },
        draw:function(value){
             this.dialogParam.show= true;
             this.dialogParam.name = value;
             this.drawshow=false;
        },
        etpriseEdit: function(id) {
            if(this.$store.state.table.enterpriseList[id].show){
                this.$store.state.table.enterpriseList[id].show = !this.$store.state.table.enterpriseList[id].show;
            }else{
               this.$store.state.table.enterpriseList[id].show = true;
            }
        },
        drawEdit:function(id){
            if(this.$store.state.table.drawList[id].show){
                this.$store.state.table.drawList[id].show = !this.$store.state.table.drawList[id].show;
            }else{
               this.$store.state.table.drawList[id].show = true;
            }
        },
        createBreed:function(value){
            this.breedParam.show = true;
            this.breedParam.name= value;
            this.breedshow = false;
        },
        breedClick:function(id){
             if(this.$store.state.table.breedList[id].show){
                this.$store.state.table.breedList[id].show = !this.$store.state.table.breedList[id].show;
            }else{
               this.$store.state.table.breedList[id].show = true;
            }
        },
        editBreed:function(Bid){
            this.changeShow = false;
            this.Bid=Bid;
           /* this.$broadcast('getParam');*/
        },
        delBreed:function(sub,id){
            this.delParam.show = true;
            this.delParam.id=id;
            this.delshow=false;
        },
        modifyBreed:function(id){
            this.reviseParam.id=id;
            this.reviseParam.show=true;
            this.reviseshow=false;
            this.$broadcast('getParam');
            if(this.$store.state.table.breedList[id].show == true){
              this.$store.state.table.breedList[id].show=!this.$store.state.table.breedList[id].show;
            }
        },
        editEnter:function(id){
            this.modifyModel.id=id;
            this.modifyParam.show=true;
        },
        delOperation:function(id){
            this.modelParam.show = true;
            this.modelParam.id=id;
            this.drawdel=false;
        },
        entpriseDel:function(id){
            this.entpriseParam.show = true;
            this.entpriseParam.id=id;
            this.entprise=false;
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
    },
    filter:(filter,{})
}
</script>
<style scoped>
.service-data {
    width: 100%;
    white-space: nowrap;
}

.service-nav {
    padding: 25px 30px 0 40px;
}

.my_enterprise {
    color: #fa6705;
    font-size: 20px;
    padding: 0;
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
    border-top: 1px solid #ddd;
    background: #fff;  
    text-align: center;
}

.table_color {
    background-color: #fff;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    position: relative;
    vertical-align: middle;
}

.table>thead>tr>th {
    border-bottom: 0;
    color: #003077;
    font-weight: 100;
}
.table>tbody{
    position: relative;
}
.table>tbody>tr{
    position: relative;
}
.table>tbody>tr>td img{
    margin: auto;
}
.space>tr>th {
    background-color: #f4f6f9;
    height: 10px;
}
.component_action{
    position: absolute;
    right: 40px;
    padding: 10px 0;
    top:63px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 1100;
    min-width: 90px;
    max-width: 200px;
}
.component_action ul{
    margin-bottom: 0;
}
.component_action ul li{
    text-align: left;
    padding:3px 8px;
    cursor: pointer;
}
.base_pagination{
    margin: auto;
    text-align: center;
    margin-top: 70px;
}
.cover_loading{
   text-align: center;
   position: absolute;
   top: 40%;
   z-index: 1100;
   left: 0;
   right: 0
}
.top-title {
    position: absolute;
    right: 0;
    top: 0;
}

.top-title span {
    font-size: 28px;
}
.client-section {
    padding: 28px 15px 40px 20px;
    position: relative;
}

.section_title {
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    margin: 0;
}

.panel-title-set {
    margin-top: 6px;
    margin-left: 26px;
    display: inline-block;
    font-size: 20px;
    color: #333;
}

.panel-set {
    overflow: hidden;
    overflow-x: auto;
}

.panel-body ul {
    white-space: nowrap;
}

.panel-body ul li {
    display: inline-block;
    margin-right: 5%;
    /* overflow: hidden; */
    text-overflow: ellipsis;
    white-space: nowrap;
}

.panel-name {
    width: 140px;
}

.panel-job {
    width: 140px;
}

.panel-phone {
    width: 158px
}

.panel-email {
    width: 240px;
}

.panel-body ul li:last-of-type {
    margin-right: 0;
    width: 35px;
    text-align: center;
}

.panel-body ul li:last-of-type img {
    margin: auto;
}
.panel-collapse{
    background:#f5f5f5;
}
.panel-body ul li:first-of-type img {
    margin-right: 5px;
}

.panel-body ul li label {
    font-size: 16px;
    color: #333;
    font-weight: 100;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}
.panel-group{
    margin-top: 20px;
}
.client-detail {
    border-right: 1px solid #ddd;
}

.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
    margin-top: 20px;
}

.client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
}

.client-detailInfo label {
    display: block;
    color: #333;
    font-size: 16px;
}

.btn-orange {
    background-color: #fa6705;
    color: #fff;
    font-size: 18px;
}

.client-editbtn {
    text-align: right;
    margin-top: 15px;
}

.client-image {
    display: inline-block;
}
</style>

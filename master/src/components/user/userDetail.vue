<template>
  <tracking-model :param="trackingParam" v-if="trackingParam.show"></tracking-model>
  <chance-model :param="chanceParam" v-if="chanceParam.show"></chance-model>

<div class="client_body">
      <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <a class="navbar-brand navbar-name" href="#">{{initUserDetail.fullname}}</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right" style="margin-top:8px;">
                        <li>
                            <button type="button" class="btn btn-base" @click="createTracking({
                        objId:initUserDetail.id,
                        bizId:'',
                        type:'',
                        trackingWay:'',
                        bizType:'',
                        contactNo:'',
                        comments:'',
                        show:false
                      })">新建跟进</button>
                        </li>
                        
                        <li>
                            <button type="button" class="btn btn-base" @click="modifyUser({
                                               id:initUserDetail.id,
                                               show:true,
                                               name:initUserDetail.name,
                                               nickname:initUserDetail.nickname,
                                               fullname:initUserDetail.fullname,
                                               type:initUserDetail.type,
                                               phone:initUserDetail.phone,
                                               email:initUserDetail.email,
                                               qq:initUserDetail.qq,
                                               company:initUserDetail.company,
                                               comment:initUserDetail.comment,
                                               link:alertInfo,
                                               url:'/user/',
                                               key:'userList'
                                               })">编辑</button>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix" >
                <div class="col-md-8 client-detail">
                    <h4 class="section_title">相关</h4>
                    <article>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                          link:initUserDetail.chance,
                          crete:'chance'
                          })">
                    <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                    <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                      业务机会（{{initUserDetail.chance.arr.length}}）
                    </a>
                    <button type="button" class="btn btn-base pull-right"  @click.stop="createChance()">新建</button>
                  </h4>
                                </div>
                                <div class="panel-collapse" v-show="initUserDetail.chance.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>品种</th>
                                            <th>产地</th>
                                            <th>规格</th>
                                            <th>数量</th>
                                            <th>价格</th>
                                            <th>单位</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initUserDetail.chance.arr">
                                                <td>{{item.breedName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td  @click="clickShow($index,{
                                                  concrete:'chance'
                                                  })">
                                                  <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                <div class="breed_action" v-show="item.show">
                                                    <dl>
                                                       <dt @click="createChance()">编辑</dt>
                                                       <!-- <dt @click="specDelete()">删除</dt> -->
                                                   </dl>
                                                </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                          
                           
                
              <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="personalEnfoldment({id:initUserDetail.id})">
                    <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                    <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                      个人认证
                    </a>
                    <button v-if="initUserDetail.utype==1" type="button" class="btn btn-base pull-right"  @click.stop="personalAuth({id:initUserDetail.id,ucomment:initUserDetail.ucomment,utype:initUserDetail.utype})">点击认证</button>
                    <button v-if="initUserDetail.utype!=1" type="button" class="btn btn-base pull-right"  @click.stop="">无需认证</button>
                  </h4>
                                </div>
                                <div class="panel-collapse" v-show="initUserDetail.personalAuthShow&&initUserDetail.utype==1">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>文件类型</th>
                                            <th>路径</th>
                                            <th>描述<th>
                                           
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initIdentify.files">
                                                <td>{{item.fileType}}</td>
                                                <td>{{item.path}}</td>
                                                <td>{{item.description}}</td>
                                                
                                            </tr>
                                        </tbody> 
                                    </table>
                                    </div>
                                </div>
                            </div>


                      <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="companyEnfoldment({id:initUserDetail.id})">
                    <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                    <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                      企业认证
                    </a>
                    <button v-if="initUserDetail.ctype==1" type="button" class="btn btn-base pull-right"  @click.stop="companyAuth({id:initUserDetail.id,ccomment:initUserDetail.ccomment,ctype:initUserDetail.ctype})">点击认证</button>
                    <button v-if="initUserDetail.ctype!=1" type="button" class="btn btn-base pull-right"  @click.stop="">无需认证</button>
                  </h4>
                                </div>
                                <div class="panel-collapse" v-show="initUserDetail.companyAuthShow&&initUserDetail.ctype==1">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>文件类型</th>
                                            <th>路径</th>
                                            <th>描述<th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initIdentify.files">
                                                <td>{{item.fileType}}</td>
                                                <td>{{item.path}}</td>
                                                <td>{{item.description}}</td>
                                                
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>



                            
                <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                          link:initUserDetail.tracking,
                          crete:'tracking'
                          })">
                    <img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
                    <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                      跟进（{{initUserDetail.tracking.arr.length}}）
                    </a>
                    <button type="button" class="btn btn-base pull-right" @click.stop="createTracking({
                        objId:initUserDetail.id,
                        bizId:'',
                        type:'',
                        trackingWay:'',
                        bizType:'',
                        contactNo:'',
                        comments:'',
                        show:false
                      })">新建</button>
                  </h4>
                                </div>
                                <div  class="panel-collapse" v-show="initUserDetail.tracking.show">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                          <thead>
                                            <th>业务ID</th>
                                            <th>业务类型</th>
                                            <th>跟进对象ID</th>
                                            <th>跟进方式</th>
                                            <th>联系账号</th>
                                            <th>备注</th>
                                            
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initUserDetail.tracking.arr">
                                                <td>{{item.bizId}}</td>
                                                <td>{{item.bizType}}</td>
                                                <td>{{item.objId}}</td>
                                                <td>{{item.trackingWay}}</td>
                                                <td>{{item.contactNo}}</td>
                                                <td>{{item.comments}}</td>
                                                
                                                <td  @click="clickShow($index,{
                                                  concrete:'tracking'
                                                  })">
                                                  <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                <div class="breed_action" v-show="item.show" >
                                                   <dl>
                                                       <dt @click="updateTracking(item,$index)">编辑</dt>
                                                       
                                                </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                          
                            
                        </div>
                    </article>
                </div>

                <div class="col-md-4">
                    <h4 class="section_title">详情</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>姓名</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.fullname" value="{{initUserDetail.fullname}}"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>昵称</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.nickname" value="{{initUserDetail.nickname}}" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>电话</label>
                                    <input type="text" class="form-control"  v-model="initUserDetail.phone" value="{{initUserDetail.phone}}"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>邮箱</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.email" value="{{initUserDetail.email}}"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>qq</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.qq" value="{{initUserDetail.qq}}" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>公司</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.company" value="{{initUserDetail.company}}"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-12 col-xs-12">
                                    <label>备注</label>
                                    <input type="text" class="form-control" v-model="initUserDetail.comment" value="{{initUserDetail.comment}}" />
                                </div>
                              
                            </div>
                           
                        </div>
                    </article>
                </div>
            </div>
        </section>
       </div>


</template>
<script>

import trackingModel from  '../user/userTracking'
import chanceModel from  '../user/userChance'

import {
  initClientDetail,

  initUserDetail,
  initIdentify
} from '../../vuex/getters'
import {
  getClientDetail,

 getUserDetail,
 getAuthInfo,
 

} from '../../vuex/actions'
export default {
    components: {

        trackingModel,
        chanceModel
    },
    props:['param'],
    data(){
      return {
        
        trackingParam:{
          show:false
        },
        chanceParam:{
          show:false
        },
        personalParam:{
          show:false
        },
        companyParam:{
          show:false
        },
        detailParam:{
          show:false
        },
        show:true

      }
    },
    vuex:{
      getters:{
      initClientDetail,
      initUserDetail,
      initIdentify
      },
      actions:{
        getClientDetail,
       
        getUserDetail,
        getAuthInfo
      }
    },
    
    methods:{
      modifyUser:function(item){
        this.$parent.modifyUser(item);
      },
      enfoldment:function(param){

        if(this.$store.state.table.userDetail[param.crete].arr.length==0){
                this.$store.state.table.userDetail[param.crete].show=true;
            }
            this.$store.state.table.userDetail[param.crete].show = !this.$store.state.table.userDetail[param.crete].show;
      },
      personalEnfoldment:function(item){
        
        this.$store.state.table.userDetail.personalAuthShow=!this.$store.state.table.userDetail.personalAuthShow;
        if(this.$store.state.table.userDetail.personalAuthShow){
          item.utype = 1;
          console.log(item);
          this.getAuthInfo(item);

        }
        
      },
      companyEnfoldment:function(item){
        this.$store.state.table.userDetail.companyAuthShow=!this.$store.state.table.userDetail.companyAuthShow;
        if(this.$store.state.table.userDetail.companyAuthShow){
          item.ctype = 1;
          console.log(item);
          this.getAuthInfo(item);
        }
        
      },
      personalAuth:function(item){
          console.log('个人认证');
          console.log(item);
          this.$parent.personalAuth(item);
      },
      companyAuth:function(item){
          console.log('企业认证');
          console.log(item);
          this.$parent.companyAuth(item);
      },

      clickShow: function(index,param) {
            
            if (this.$store.state.table.userDetail[param.concrete].arr[index].show) {
                this.$store.state.table.userDetail[param.concrete].arr[index].show = false;
            } else {
                this.$store.state.table.userDetail[param.concrete].arr[index].show = true
            }
         
        },
        createTracking:function(item){
          item.show=!item.show;
          this.trackingParam = item;
          this.trackingParam.show = true;
          this.trackingParam.flag = 0;   //0表示添加
        },
        updateTracking:function(item,index){

          item.show=!item.show;
          item.index = index;
          this.trackingParam = item;
          this.trackingParam.flag = 1;   //1表示修改
          this.trackingParam.show = true;

        },
        createChance:function(){
          
          this.chanceParam.show = true;
        },

        getUserDetail:function(){
          console.log('papapapa');
          detailParam.id = initUserDetail.id;
          this.getUserDetail(detailParam);

        }  
       
    },

   

    
}
</script>
<style scoped>
.client_body {
    position: relative;
    background-color: #fff;
    padding: 20px;
}

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.navbar-img {
    float: left;
    margin-right: 10px;
}

.navbar-name {
    color: #fa6705;
    font-size: 20px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
}

section {
    background-color: #fff;
}
.breed_action{
  top: 20px;
  right: 40px;
}
.breed_action dl dt{
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}
section article {
    margin-top: 30px;
}
.top-title{
  z-index: 100
}
.client-section {
    padding: 10px 5px 40px 5px;
}

.section_title {
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    margin: 0;
}
.contactSet thead{
  color:#fa6705;
}
.panel-title-set {
    margin-top: 6px;
    margin-left: 26px;
    display: inline-block;
    font-size: 20px;
    color: #333;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}

.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
  text-align: left;
}
.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
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
.label_action{
  position: absolute;
  top:13px;
  right: 32px;
  border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 1000;
    min-width: 90px;
    cursor: pointer;
    padding: 5px 10px;
    max-width: 200px;
}
.client-editbtn {
    text-align: right;
    margin-top: 15px;
}
.client-image {
    display: inline-block;
}
</style>

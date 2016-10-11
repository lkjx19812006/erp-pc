<template>
  <tracking-model :param="trackingParam" v-if="trackingParam.show"></tracking-model>
  <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
  <personalauth-model :param="personalParam" v-if="personalParam.show"></personalauth-model>
  <companyauth-model :param="companyParam" v-if="companyParam.show"></companyauth-model>

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
                                    bizName:'',
                                    type:0,
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
                                              link:initUserDetail.intention,
                                              crete:'intention'
                                              })">
                                        <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          会员意向（{{initUserDetail.intention.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="createIntention()">新建</button>
                                      </h4>

                                </div>
                                <div class="panel-collapse" v-show="initUserDetail.intention.show">
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
                                            <tr v-for="item in initUserDetail.intention.arr">
                                                <td>{{item.breedName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td  @click="clickShow($index,{
                                                  concrete:'intention'
                                                  })">
                                                  <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                <div class="breed_action" v-show="item.show">
                                                       <dt @click="updateIntention(
                                                            intentionParam.sub=$index,
                                                            intentionParam.id=item.id,
                                                            intentionParam.breedName=item.breedName,
                                                            intentionParam.price=item.price,
                                                            intentionParam.unit=item.unit,
                                                            intentionParam.especial=item.especial,
                                                            intentionParam.quality=item.quality,
                                                            intentionParam.spec=item.spec,
                                                            intentionParam.number=item.number,
                                                            intentionParam.location=item.location,
                                                            intentionParam.type=item.type,
                                                            intentionParam.country=item.country,
                                                            intentionParam.province=item.province,
                                                            intentionParam.city=item.city,
                                                            intentionParam.district=item.district,
                                                            intentionParam.address=item.address,
                                                            intentionParam.invoic=item.invoic,
                                                            intentionParam.sampling=item.sampling,
                                                            intentionParam.sampleUnit=item.sampleUnit,
                                                            intentionParam.advance=item.advance,
                                                            intentionParam.intl=item.intl,
                                                            intentionParam.sampleNumber=item.sampleNumber,
                                                            intentionParam.sampleAmount=item.sampleAmount,
                                                            intentionParam.qualification=item.qualification,
                                                            intentionParam.breedId=item.intentionParam,
                                                            intentionParam.pack=item.pack,
                                                            intentionParam.visit=item.visit,
                                                            intentionParam.duedate=item.duedate,
                                                            intentionParam.breedId=item.breedId,
                                                            intentionParam.key='user'
                                                        )">编辑</dt>
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
                                        <button v-if="initUserDetail.utype==0" type="button" class="btn btn-base pull-right"  @click.stop="" disabled="disabled">未申请认证</button>
                                        <button v-if="initUserDetail.utype==1" type="button" class="btn btn-primary pull-right"  @click.stop="personalAuth({id:initUserDetail.id,ucomment:initUserDetail.ucomment,utype:initUserDetail.utype})">点击认证</button>
                                        <button v-if="initUserDetail.utype==2" type="button" class="btn btn-success pull-right"  @click.stop="" disabled="disabled">已通过认证</button>
                                        <button v-if="initUserDetail.utype==3" type="button" class="btn btn-warning pull-right"  @click.stop="" disabled="disabled">认证未通过</button>

                                    </h4>
                                </div>
                                <!-- <div class="panel-collapse" v-show="initUserDetail.personalAuthShow&&initUserDetail.utype==1"> -->
                                <div class="panel-collapse" v-show="initUserDetail.personalAuthShow&&initIdentify.files.length>0">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                        <thead>
                                          <!-- <th>文件类型</th>
                                          <th>路径</th>
                                          <th>描述<th> -->
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in initIdentify.files">
                                                <!-- <td>{{item.fileType}}</td> -->
                                                <td>
                                                  <div class="thumbnail col-md-3 col-sm-4 col-xs-6">
                                                    <img v-bind:src="{{item.path}}">
                                                  </div>
                                                </td>
                                               <!--  <td>{{item.description}}</td> -->

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
                                      <button v-if="initUserDetail.ctype==0" type="button" class="btn btn-base pull-right"  @click.stop="" disabled="disabled">未申请认证</button>
                                      <button v-if="initUserDetail.ctype==1" type="button" class="btn btn-primary pull-right"  @click.stop="companyAuth({id:initUserDetail.id,ccomment:initUserDetail.ccomment,ctype:initUserDetail.ctype})">点击认证</button>
                                      <button v-if="initUserDetail.ctype==2" type="button" class="btn btn-success pull-right"  @click.stop="" disabled="disabled">已通过认证</button>
                                      <button v-if="initUserDetail.ctype==3" type="button" class="btn btn-warning pull-right"  @click.stop="" disabled="disabled">认证未通过</button>


                                  </h4>
                              </div>
                              <!-- <div class="panel-collapse" v-show="initUserDetail.companyAuthShow&&initUserDetail.ctype==1"> -->
                              <div class="panel-collapse" v-show="initUserDetail.companyAuthShow&&initIdentify.files.length>0">
                                  <div class="panel-body panel-set">
                                      <table class="table  contactSet">
                                        <thead>
                                          <!-- <th>文件类型</th>
                                          <th>路径</th>
                                          <th>描述<th> -->
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in initIdentify.files">
                                                <!-- <td>{{item.fileType}}</td> -->
                                                <td>
                                                  <div class="thumbnail col-md-3 col-sm-4 col-xs-6">
                                                    <img v-bind:src="{{item.path}}">
                                                  </div>
                                                </td>
                                               <!--  <td>{{item.description}}</td> -->

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
                                          bizName:'',
                                          type:0,
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
                                          <th>业务类型</th>
                                          <th>跟进方式</th>
                                          <th>联系账号</th>
                                          <th>备注</th>
                                          <th style="text-align:center">操作</th>
                                        </thead>
                                      <tbody>
                                          <tr v-for="item in initUserDetail.tracking.arr">
                                              <td v-if="item.bizType==0">客户</td>
                                              <td v-if="item.bizType==1">意向</td>
                                              <td v-if="item.bizType==2">订单</td>
                                              <td v-if="item.bizType!=0&&item.bizType!=1&&item.bizType!=2"></td>
                                              <td>{{item.trackingWay}}</td>
                                              <td>{{item.contactNo}}</td>
                                              <td>{{item.comments}}</td>
                                              <td  @click="clickShow($index,{
                                                concrete:'tracking'
                                                })">
                                                <img src="/static/images/default_arrow.png" height="24" width="24" />
                                              <div class="breed_action" v-show="item.show" >

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
                                  <input type="text" class="form-control" v-model="initUserDetail.fullname" value="{{initUserDetail.fullname}}" disabled="disabled" />
                              </div>
                              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                  <label>昵称</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.nickname" value="{{initUserDetail.nickname}}" disabled="disabled"/>
                              </div>
                          </div>
                          <div class="clearfix">
                              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                  <label>手机</label>
                                  <input type="text" class="form-control"  v-model="initUserDetail.phone" value="{{initUserDetail.phone}}" disabled="disabled"/>
                              </div>
                              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                  <label>归属地</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.province" value="{{initUserDetail.province}}" disabled="disabled"/>
                              </div>

                          </div>
                          <div class="clearfix">
                              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                  <label>qq</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.qq" value="{{initUserDetail.qq}}" disabled="disabled"/>
                              </div>
                              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                  <label>公司</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.company" value="{{initUserDetail.company}}" disabled="disabled"/>
                              </div>
                          </div>
                          <div class="clearfix">
                              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                  <label>邮箱</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.email" value="{{initUserDetail.email}}" disabled="disabled"/>
                              </div>
                              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                  <label>主营业务</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.busiType" value="{{initUserDetail.busiType}}" disabled="disabled"/>
                              </div>
                          </div>
                          <div class="clearfix">
                              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                  <label>来源</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.sourceType" value="{{initUserDetail.sourceType}}" disabled="disabled"/>
                              </div>
                              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                  <label>客户类型</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.bizTypeName" value="{{initUserDetail.bizTypeName}}" disabled="disabled"/>
                              </div>
                          </div>
                          <div class="clearfix">
                              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                  <label>审核状态</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.auditResult" value="{{initUserDetail.auditResult}}" disabled="disabled"/>
                              </div>
                              <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                  <label>划转状态</label>
                                  <input v-if="initUserDetail.transStatus==1" type="text" class="form-control" value="已划转" disabled="disabled"/>
                                  <input v-else type="text" class="form-control" value="未划转" disabled="disabled"/>
                              </div>
                          </div>
                          <div class="clearfix">
                              <div class="client-detailInfo pull-left col-md-12 col-xs-12">
                                  <label>备注</label>
                                  <input type="text" class="form-control" v-model="initUserDetail.comment" value="{{initUserDetail.comment}}" disabled="disabled"/>
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

import trackingModel from  './userTracking'
import intentionModel from  './userIntention'
import personalauthModel from './personalAuth'
import companyauthModel from './companyAuth'

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
        personalauthModel,
        trackingModel,
        intentionModel,
        companyauthModel
    },
    props:['param'],
    data(){
      return {

        trackingParam:{
          show:false
        },
        intentionParam:{
          show:false,
          flag:0,   //0表示创建，1表示修改
          sub:'',
          userId:this.initUserDetail.id,
          //fullname:this.initUserDetail.fullname,
          customerName:this.initUserDetail.fullname,
          //phone:this.initUserDetail.phone,
          customerPhone:this.initUserDetail.phone,
          id:'',
          breedId:'',
          breedName:'',
          price:'',
          unit:'',
          especial:'',
          quality:'',
          spec:'',
          number:'',
          location:'',
          type:'',
          country:'',
          province:'',
          city:'',
          district:'',
          address:'',
          invoic:'',
          sampling:'',
          sampleUnit:'',
          advance:'',
          intl:'',
          sampleNumber:0,
          sampleAmount:0,
          qualification:'',
          url:'/intention/'
        },
        detailParam:{
          show:false
        },
        show:true,
        personalParam:{
          show:false,
          utype:1
        },
        companyParam:{
          show:false,
          ctype:1
        }

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
          this.personalParam.show = true;
          this.personalParam.id = item.id;
          this.personalParam.index = item.index;
          this.personalParam.ucomment = item.ucomment;
          this.personalParam.utype = item.utype;
      },
      companyAuth:function(item){

          this.companyParam.show = true;
          this.companyParam.id = item.id;
          this.companyParam.index = item.index;
          this.companyParam.ccomment = item.ccomment;
          this.companyParam.ctype = item.ctype;
      },

      clickShow: function(index,param) {
            console.log('clickShow');
            console.log(this.$store.state.table.userDetail[param.concrete].arr[index]);
            if (this.$store.state.table.userDetail[param.concrete].arr[index].show) {
                this.$store.state.table.userDetail[param.concrete].arr[index].show = false;
            } else {
                this.$store.state.table.userDetail[param.concrete].arr[index].show = true
            }

        },
        createTracking:function(item){
          item.show=!item.show;
          item.userId=this.initUserDetail.id;
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
        createIntention:function(){
          this.intentionParam={
            show:false,
              flag:0,   //0表示创建，1表示修改
              sub:'',
              userId:this.initUserDetail.id,
              //fullname:this.initUserDetail.fullname,
              customerName:this.initUserDetail.fullname,
              //phone:this.initUserDetail.phone,
              customerPhone:this.initUserDetail.phone,
              id:'',
              breedId:'',
              breedName:'',
              price:'',
              unit:'',
              especial:'',
              quality:'',
              spec:'',
              number:'',
              location:'',
              type:'',
              country:'',
              province:'',
              city:'',
              district:'',
              address:'',
              invoic:'',
              sampling:'',
              sampleUnit:'',
              advance:'',
              intl:'',
              sampleNumber:0,
              sampleAmount:0,
              qualification:'',
              url:'/intention/',
              image_f:'',
              image_s:'',
              image_t:'',
              images:''
          };
          this.intentionParam.show = true;

        },
        updateIntention:function(){
          this.intentionParam.flag = 1;
          this.intentionParam.show = true;
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
  z-index: 100;
  width: 100%;
  right: 0;
  top: 130px;
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

/* .client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
}
.client-detailInfo label {
    display: block;
    color: #333;
    font-size: 16px;
} */

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

<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>

     <div  v-show="!changeParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">会员</div>

            <div class="right col-xs-1">
                <button type="button" class="btn btn-default" height="24" width="24" @click="audit()">审核</button>
                <button type="button" class="btn btn-default" height="24" width="24" @click="search()">查询</button>
            </div>

        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak>
                <thead>
                    <tr>
                        <th><label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th>
                        <th>姓名</th>
                        <th>昵称</th>
                        <th>手机</th>
                        <th>归属地</th>
                        <th>邮箱</th>
                        <th>qq</th>
                        <th>公司</th>
                        <th>主营业务</th>
                        <th>来源</th>
                        <th>客户类型</th>
                        <th>审核状态</th>
                        <th>个人认证</th>
                        <th>企业认证</th>
                        <th>划转状态</th>
                        <th>备注</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in initUserList" >
                        <td  @click.stop="">
                            <!-- <label v-if="item.audit!=1" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                            <label v-if="item.audit==1" class="checkbox_unselect"></label> -->
                            <label v-if="item.audit==0" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                        </td>
                        <td class="underline" @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true
                                })">{{item.fullname}}</td>
                        <td>{{item.nickname}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.province+item.city}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.qq}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.busiType}}</td>
                        <td v-if="item.source==0" style="color:red">{{item.sourceType}}</td>
                        <td v-if="item.source==1" style="color:green">{{item.sourceType}}</td>
                        <td v-if="item.source==2" style="color:blue">{{item.sourceType}}</td>
                        <td v-if="item.source==3" style="color:#444444 ">{{item.sourceType}}</td>
                        <td>{{item.bizTypeName}}</td>
                        <td>{{item.auditResult}}</td>
                        <td>{{item.utype}}</td>
                        <td>{{item.ctype}}</td>
                        <td v-if="item.transStatus==1">已划转</td>
                        <td v-else>未划转</td>
                        <td>{{item.comment}}</td>

                        <td @click.stop="eventClick($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show="item.show">
                                <ul>
                                    <li @click="modifyUser({
                                                id:item.id,
                                                show:true,
                                                name:item.name,
                                                nickname:item.nickname,
                                                fullname:item.fullname,
                                                type:item.type,
                                                phone:item.phone,
                                                email:item.email,
                                                qq:item.qq,
                                                index:$index,
                                                company:item.company,
                                                comment:item.comment,
                                                link:alertInfo,
                                                url:'/user/',
                                                key:'userList'
                                                },item.show=false)">编辑</li>
                                    <li v-if="item.transStatus==0" @click="userToClient({
                                                name:item.fullname,
                                                keyname:'transStatus',
                                                sub:$index,
                                                userId:item.id,
                                                main:item.main,
                                                province:'',
                                                phone:item.phone,
                                                tel:item.tel,
                                                email:item.email,
                                                qq:item.qq,
                                                type:'',
                                                fullname:item.fullname,
                                                employeeId:'',
                                                employeeName:'',
                                                orgId:'',
                                                orgName:'',
                                                show:true,
                                                key:'userList',
                                                countryId:7,
                                                countryName:'中国',
                                                contact:{
                                                 name: item.fullname,
                                                 position: '',
                                                 department: '',
                                                 phone: item.phone,
                                                 tel: item.tel,
                                                 email: item.email,
                                                 qq: item.qq,
                                                 wechart: ''
                                                }
                                                },item.show=false)">划转</li>
                                    <li @click="createIntention(item.show=false)">意向</li>
                                    <li v-if="item.utype==1" @click="personalAuth({id:item.id,index:$index,ucomment:item.ucomment,utype:1},item.show=false)">个人认证</li>
                                    <li v-if="item.ctype==1" @click="companyAuth({id:item.id,index:$index,ccomment:item.ccomment,ctype:1},item.show=false)">企业认证</li>
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
import tipsdialogModel  from '../components/tips/tipDialog'
import calendar from '../components/calendar/vue.datepicker'
import alterinfoModel  from '../components/user/userUpdate'
import transferModel  from '../components/user/userTransfer'
import auditModel  from '../components/user/userAudit'
import detailModel from '../components/user/userDetail'
import searchModel from '../components/user/userSearch'
import intentionModel from  '../components/user/userIntention'

import pagination from '../components/pagination'
import {
    getCount,
    initUserList,
    initUserDetail,

} from '../vuex/getters'
import {
    getUserList,
    getUserDetail,


} from '../vuex/actions'


export default {
    //props: ['param'],
    components: {
        tipsdialogModel,
        pagination,
        calendar,
        alterinfoModel,
        transferModel,
        detailModel,
        searchModel,
        intentionModel,

        auditModel

    },
	 data() {
        return {
            list: {all:8,cur:1},
            loadParam: {
                loading: true,
                show:false,
                fullname:'',
                source:'',
                busiType:'',
                phone:'',
                startCtime:'',
                endCtime:'',
                audit:'',
                transform:'',
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                city:'',
                province:''
            },
            tipsParam:{
                show:false,
                alert:true,
                name:"请选择会员"
            },
            alterParam:{
                show:false,
                id:'',
                name:''
            },
            auditParam:{
                show:false,
                indexs:[],
                userIds:[],
                auditComment:'',
                audit:''
            },
            transferParam:{
                show:false,
                id:'',
                name:'',
                employeeId:'',
                employeeName:'',
                orgId:'',
                orgName:'',
                province:'',
                city:''
            },
            changeParam:{
                show:false
            },
         intentionParam:{
            show:false,
            flag:0,
            userId:this.initUserDetail.id,
            //fullname:this.initUserDetail.fullname,
            customerName:this.initUserDetail.fullname,
            //phone:this.initUserDetail.phone,
            customerPhone:this.initUserDetail.phone,
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
          checked:false

        }
    },
    vuex: {
        getters: {
            // note that you're passing the function itself, and not the value 'getCount()'
            counterValue: getCount,
            initUserList,
            initUserDetail,

        },
        actions: {
            getUserList,
            getUserDetail,

        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getUserList(this.loadParam);
          this.checked=false;

        }
      },
  methods: {
    clickOn: function(item) {
        this.changeParam = item;
        this.getUserDetail(this.changeParam);
    },
    eventClick:function(id){
            if(this.$store.state.table.basicBaseList.userList[id].show){
                this.$store.state.table.basicBaseList.userList[id].show = !this.$store.state.table.basicBaseList.userList[id].show;
            }else{
                this.$store.state.table.basicBaseList.userList[id].show=true;
            }
        },

    onlyselected: function(index){
      const _self=this;
        this.$store.state.table.basicBaseList.userList[index].checked=!this.$store.state.table.basicBaseList.userList[index].checked;
        if(_self.checked){
          _self.checked=false;
        }else {
          _self.checked=true;
          this.$store.state.table.basicBaseList.userList.forEach(function (item) {
            if(!item.checked){
              if(item.audit==0) _self.checked=item.checked;
            }
          })
        }
    },
    select:function(){
      this.checked=!this.checked;
      const checked=this.checked;
      this.$store.state.table.basicBaseList.userList.forEach(function(item){
        if(item.audit==0)item.checked=checked;
      })

    },
    audit: function(){
        var _this = this;
        _this.auditParam.userIds = [];
        _this.auditParam.indexs = [];
      _this.checked=false;
        for(var i=0;i<this.initUserList.length;i++){
            if(this.$store.state.table.basicBaseList.userList[i].checked){
                _this.auditParam.userIds.push(this.$store.state.table.basicBaseList.userList[i].id);
                _this.auditParam.indexs.push(i);
            }
        }
        if(this.auditParam.userIds.length>0){
            this.auditParam.show = true;
        }else{
            this.tipsParam.show = true;
        }


    },

    resetTime:function(){
        this.loadParam.startCtime = '';
        this.loadParam.endCtime = '';
    },
    loadByCondition:function(){
        this.getUserList(this.loadParam);
    },
    search:function(){
        this.loadParam.loading = false;
        this.loadParam.show = true;

    },
    createUser:function(value){
        this.createParam.show=true;
        //this.createParam.name=value;
        },

    clientTransfer:function(value){
        this.transferParam.show=true;
        this.transferParam.name=value;
    },
    modifyUser:function(item){
        this.alterParam = item;
    },
    userToClient:function(item){
        this.transferParam = item;
    },
    createIntention:function(){
      this.intentionParam={
        show:false,
          flag:0,
          userId:this.initUserDetail.id,
          //fullname:this.initUserDetail.fullname,
          customerName:this.initUserDetail.fullname,
          //phone:this.initUserDetail.phone,
          customerPhone:this.initUserDetail.phone,
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
      };
        this.intentionParam.show = true;
    }


  },
  created() {
        this.getUserList(this.loadParam);
  }


}

</script>

<style scoped>

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

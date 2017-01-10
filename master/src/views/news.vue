<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
    <personalauth-model :param="personalParam" v-if="personalParam.show"></personalauth-model>
    <companyauth-model :param="companyParam" v-if="companyParam.show"></companyauth-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <search-model :param.sync="loadParam" v-if="loadParam.show"></search-model>
     <div>
        <div class="service-nav">
  
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer" >
                   <dt class="left transfer marg_top">会员名称：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.fullname" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:8px">来源：</dt>
                   <dd class="left">
                        <select class="form-control" v-model="loadParam.source" @change="selectSearch()">
                            <option value="">全部</option>
                            <option value="1">PC</option>
                            <option value="2">安卓</option>
                            <option value="3">微信</option>
                            <option value="4">IOS</option>
                        </select>
                   </dd>
                </dl>

                <dl class="clear left transfer ">
                   <dt class="left transfer marg_top">经营类型：</dt>
                   <dd class="left">
                         <select v-model="loadParam.bizType"  class="form-control" @change="selectSearch()">
                                  <option value="">全部</option>
                                  <option value="0">其它</option>
                                  <option value="1">合作社</option>
                                  <option value="2">药商</option>
                                  <option value="3">药厂</option>
                                  <option value="4">个体户</option>
                                  <option value="5">药店</option>
                                  <option value="6">医院</option>
                                  <option value="7">贸易公司</option>
                                  <option value="8">零售商行</option>
                                  <option value="9">药农</option>
                                  <option value="10">介绍人</option>
                                  <option value="11">药贩子</option>
                                  <option value="12">产地药商</option>
                                  <option value="13">销地药商</option>
                                  <option value="14">养生诊所</option>
                                  <option value="15">化工厂</option>
                                  <option value="16">化妆品厂</option>
                                  <option value="17">提取物厂</option>
                                  <option value="18">食品厂</option>
                                  <option value="19">实验室</option>
                                  <option value="20">网上电商</option>
                                  <option value="21">中成药生产商</option>
                                  <option value="22">西药生产商</option>
                                  <option value="23">饮片厂</option>
                        </select>
                   </dd>
                </dl>
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">个人认证：</dt>
                   <dd class="left">
                        <select class="form-control" v-model="loadParam.utype" @change="selectSearch()">
                            <option value="">全部</option>
                            <option value="0">未申请</option>
                            <option value="1">等待认证</option>
                            <option value="2">已认证</option>
                            <option value="3">认证失败</option>
                        </select>
                   </dd>
                </dl>
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">未跟进天数：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.trackingDay" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dd class="left" style="margin-left:20px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
                    
                </dd>

            </div>
    
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:3px" >手机号：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.phone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">提取状态：</dt>
                   <dd class="left">
                        <select class="form-control" v-model="loadParam.transform" @change="selectSearch()">
                            <option value="">全部</option>
                            <option value="0">待提取</option>
                            <option value="1">已提取</option>
                            <!-- <option value="2">转黑</option> -->
                        </select>
                   </dd>
                   
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">审核状态：</dt>
                   <dd class="left">
                        <select class="form-control" v-model="loadParam.audit" @change="selectSearch()">
                            <option value="">全部</option>
                            <option value="0">待审核</option>
                            <option value="1">审核中</option>
                            <option value="2">审核通过</option>
                            <option value="3">审核不通过</option>
                        </select>
                   </dd>
                </dl>
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">企业认证：</dt>
                   <dd class="left">
                        <select class="form-control" v-model="loadParam.ctype" @change="selectSearch()">
                            <option value="">全部</option>
                            <option value="0">未申请</option>
                            <option value="1">等待认证</option>
                            <option value="2">已认证</option>
                            <option value="3">认证失败</option>
                        </select>
                   </dd>
                </dl>
                <dd class="left" style="margin-left:20px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                   
                </dd>
                <dd class="pull-right">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="audit()">审核</button>
                    <button type="button" class="btn btn-primary" height="24" width="24" @click="selectSearch()">刷新</button>
                </dd>
            </div>


           <!--  <div class="right" style="margin-top:10px;">
               <button type="button" class="btn btn-default" height="24" width="24" @click="audit()">审核</button>
           </div> -->
                
        </div>

        <i-table :columns="columns" :data="initUserList" :height="tab_height" @on-selection-change="selectUser"></i-table>

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
import common from '../common/common'
import changeMenu from '../components/tools/tabs/tabs.js'
import pagination from '../components/pagination'
import personalauthModel from  '../components/user/personalAuth' 
import companyauthModel from '../components/user/companyAuth'
import {
    getCount,
    initUserList,
    initUserDetail,
    getIsTop

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
        auditModel,
        personalauthModel,
        companyauthModel
    },
	 data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, 
                {
                    type: 'index',
                    align: 'center'
                },      
                {
                    title: '姓名',
                    key: 'fullname',
                    width:100,
                    /*render (row,column,index) {
                        const style = 'cursor: pointer;color: #0090ff;';   
                        return `<i-button type="text" style="${style}" size="small" @click="clickOn(${index})">${row.fullname}</i-button>`;
                    }*/
                },
                {
                    title: '等级',
                    key: 'grade',
                    render (row) {
                        const grade = row.grade == 0 ? '一星':row.grade == 1 ? '两星':row.grade == 2 ? '三星':'其他';
                        return `<div>${grade}</div>`;

                    }
                },
                {
                    title: '手机',
                    key: 'phone',
                    width:120
                    
                },
                {
                    title: '手机归属地',
                    key: 'phoneProvince',
                    width:100,
                    render (row) {
                        const text = row.phoneProvince + row.phoneCity;
                        return `<div>${text}</div>`;

                    }

                },
                {
                    title: '所在公司',
                    key: 'company'
                },
                {
                    title: '主营业务',
                    key: 'bizMain'
                },
                {
                    title: '来源',
                    key: 'sourceType',
                    align:'center',
                    render (row) {
                        const sourceType = row.sourceType;
                        const style = row.source == 1 ? 'background:#CC3333;color:#fff':row.source == 2 ? 'background:green;color:#fff':row.source == 3 ? 'background:#0000CC;color:#fff':row.source == 4 ?'background:#CC0099;color:#fff':'';
                        return `<div style="${style}">${sourceType}</div>`;

                    }
                },
                {
                    title: '经营类型',
                    key: 'bizTypeName'
                },
                {
                    title: '经营地址',
                    key: 'province',
                    render (row) {
                        const text = row.province + row.city;
                        return `<div>${text}</div>`;

                    }
                },
                {
                    title: '审核状态',
                    key: 'auditResult'
                },
                {
                    title: '个人认证',
                    key: 'utype',
                    render (row) {
                        const style = row.utype == 0 ? 'color:#3399CC':row.utype == 1 ? 'color:#339966':row.utype == 2 ? 'background:green;color:#fff':row.utype == 3 ?'background:red;color:#fff':'';
                        const utype = row.utype == 0 ? '未申请':row.utype == 1 ? '等待认证':row.utype == 2 ? '已认证':row.utype == 3 ?'认证失败':'';
                        return `<div style="${style}">${utype}</div>`;

                    }

                },
                {
                    title: '企业认证',
                    key: 'ctype',
                    render (row) {
                        const style = row.ctype == 0 ? 'color:#3399CC':row.ctype == 1 ? 'color:#339966':row.ctype == 2 ? 'background:green;color:#fff':row.ctype == 3 ?'background:red;color:#fff':'';
                        const ctype = row.ctype == 0 ? '未申请':row.ctype == 1 ? '等待认证':row.ctype == 2 ? '已认证':row.ctype == 3 ?'认证失败':'';
                        return `<div  style="${style}">${ctype}</div>`;
                    }
                },
                {
                    title: '提取状态',
                    key: 'transStatus',
                    render (row) {
                        const style = row.transStatus == 1 ? 'color:#fff;background:green':'';
                        const transStatus = row.transStatus == 0 ? '未提取':row.transStatus == 1 ? '已提取':'转黑名单';
                        return `<div  style="${style}">${transStatus}</div>`;
                    }
                },
                {
                    title: '所属业务员',
                    key: 'employeeName'
                },
                {
                    title: '注册时间',
                    key: 'ctime'
                },
                {
                    title: '操作',
                    key: 'action',
                    //fixed: 'right',
                    width: 150,
                    render (row,column,index) {
                        return `<i-button type="text" size="small" @click="clickOn(${index})">查看详情</i-button>
                                <i-button type="text" size="small" @click="modifyUser(${index})">编辑</i-button>
                                <i-button type="text" size="small" v-if="initUserList[${index}].transStatus==0&&initUserList[${index}].audit==2" @click="userToClient(${index})">提取</i-button>
                                <i-button type="text" size="small" v-if="initUserList[${index}].utype==1" @click="personalAuth(${index})">个人认证</i-button>
                                <i-button type="text" size="small" v-if="initUserList[${index}].ctype==1" @click="companyAuth(${index})">企业认证</i-button>
                                `;
                    }
                }
            ],
            tab_height:0,
            list: {all:8,cur:1},
            loadParam: {
                loading: true,
                show:false,
                fullname:'',
                source:'',
                bizMain:'',
                bizType:'',
                phone:'',
                startCtime:'',
                endCtime:'',
                audit:'',
                transform:'',
                ctype:'',
                utype:'',
                trackingDay:'',   //几天未联系
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                city:'',
                province:'',
                total:0
            },
            tipsParam:{
                show:false,
                alert:true,
                name:"请选择会员"
            },
            alterParam:{
                show:false,
                loading:true,
                id:'',
                link:this.alertInfo,
                url:'/user/',
                key:'userList',
                index:0,
                nickname:'',
                qq:'',
                fullname:'',
                email:'',
                phone:'',
                tel:'',
                nickname:'',
                company:'',
                comment:'',
                address:'',
                idnumber:'',
                bizType:'',
                gender:'',
                importance:'',
                userType:'',
                bizMain:'',
                grade:''
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
                mainBiz:'',
                name:'',
                keyname:'transStatus',
                sub:'',
                userId:'',
                province:'',
                phone:'',
                tel:'',
                email:'',
                qq:'',
                type:0,
                classify:'1,买',
                fullname:'',
                key:'userList',
                countryId:7,
                countryName:'中国',
                contact:{
                 name: '',
                 position: '',
                 department: '',
                 phone: '',
                 tel: '',
                 email: '',
                 qq: '',
                 wechart: ''
                }   
                  
            },
            changeParam:{
                show:false,
                loading:true,
                id:'',
                sub:0,
                
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
            url:'/intention/',
            inType:2
        },
          checked:false,
        personalParam:{
          show:false,
          utype:1
        },
        companyParam:{
          show:false,
          ctype:1
        },
        users:[]     //被选中的注册客户

        }
    },
    vuex: {
        getters: {
            // note that you're passing the function itself, and not the value 'getCount()'
            counterValue: getCount,
            initUserList,
            initUserDetail,
            getIsTop

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
    selectSearch:function(){
        if(!this.loadParam.trackingDay.match(/^([0-9]|[1-9][0-9]{1,2})$/)&&this.loadParam.trackingDay!==''){
            this.tipsParam.show = true;
            this.tipsParam.name="请输入至多三位的整数";
            this.tipsParam.alert=true;
            return ;
        }
        this.getUserList(this.loadParam)
    },
    clickOn: function(index) {
        this.changeParam.id=this.initUserList[index].id,
        this.changeParam.sub=index,
        this.changeParam.show=true,
        this.changeParam.loading=true
    },
    eventClick:function(id){
        if(this.$store.state.table.basicBaseList.userList[id].show){
            this.$store.state.table.basicBaseList.userList[id].show = !this.$store.state.table.basicBaseList.userList[id].show;
        }else{
            this.$store.state.table.basicBaseList.userList[id].show=true;
        }
    },
    resetCondition:function(){
        this.loadParam.fullname="";
        this.loadParam.source = "";
        this.loadParam.bizMain ="";
        this.loadParam.bizType ="";
        this.loadParam.phone="";
        this.loadParam.startCtime ="";
        this.loadParam.endCtime = "";
        this.loadParam.audit = "";
        this.loadParam.transform = "";
        this.loadParam.city = "";
        this.loadParam.utype = "";
        this.loadParam.ctype = "";
        this.loadParam.province = "";
        this.loadParam.trackingDay = "";
        this.getUserList(this.loadParam);
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
              if(item.audit!=2) _self.checked=item.checked;
            }
          })
        }
    },
    select:function(){
      this.checked=!this.checked;
      const checked=this.checked;
      this.$store.state.table.basicBaseList.userList.forEach(function(item){
        if(item.audit!=2)item.checked=checked;
      })

    },
    selectUser:function(selection){
      this.users = selection;
    },
    audit: function(){
        var _this = this;
        _this.auditParam.userIds = [];
        _this.auditParam.indexs = [];
        for(var i=0;i<this.initUserList.length;i++){
          for(var j=0;j<this.users.length;j++){
            if(this.users[j].id == this.initUserList[i].id){
              _this.auditParam.userIds.push(this.users[j].id);
              _this.auditParam.indexs.push(i);
            }
          }  
        }
        if(this.auditParam.userIds.length>0){
          console.log(_this.auditParam.userIds);
          console.log(_this.auditParam.indexs);
            this.auditParam.show = true;
        }else{
            this.tipsParam.show = true;
            this.tipsParam.name="请选择会员";
            this.tipsParam.alert=true;
        }


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
    modifyUser:function(index){
        this.alterParam.index = index;
        this.alterParam.id = this.initUserList[index].id;
        this.alterParam.show = true;
        this.alterParam.callback = this.editback;
    },
    editback:function(title){
        this.tipsParam.show = true;
        this.tipsParam.name=title;
        this.tipsParam.alert=true;
    },
    userToClient:function(index){
        this.transferParam.mainBiz=this.initUserList[index].bizMain;
        this.transferParam.name=this.initUserList[index].fullname;
        this.transferParam.keyname='transStatus';
        this.transferParam.sub=index;
        this.transferParam.userId=this.initUserList[index].id;
        this.transferParam.province='';
        this.transferParam.phone=this.initUserList[index].phone;
        this.transferParam.tel=this.initUserList[index].tel;
        this.transferParam.email=this.initUserList[index].email;
        this.transferParam.qq=this.initUserList[index].qq;
        this.transferParam.fullname=this.initUserList[index].fullname;
        this.transferParam.show=true;
        this.transferParam.contact={
           name: this.initUserList[index].fullname,
           position: '',
           department: '',
           phone: this.initUserList[index].phone,
           tel: this.initUserList[index].tel,
           email: this.initUserList[index].email,
           qq: this.initUserList[index].qq,
           wechart: this.initUserList[index].wechart
        };
        this.transferParam.callback = this.transferback;
    },
    transferback:function(title){
        this.tipsParam.show = true;
        this.tipsParam.name=title;
        this.tipsParam.alert=true;
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
          especial:1,
          quality:'',
          spec:'',
          number:'',
          location:'',
          type:0,
          visit:0,
          country:'',
          province:'',
          city:'',
          district:'',
          address:'',
          invoic:0,
          sampling:0,
          sampleUnit:'',
          advance:0,
          intl:0,
          sampleNumber:0,
          sampleAmount:0,
          qualification:'',
          url:'/intention/',
          inType:2
      };
        this.intentionParam.show = true;
    },
    personalAuth:function(index){

      this.personalParam.show = true;
      this.personalParam.id = this.initUserList[index].id;
      this.personalParam.index = index;
      this.personalParam.ucomment = this.initUserList[index].ucomment;
      this.personalParam.utype = this.initUserList[index].utype;
    },
    companyAuth:function(index){
      this.companyParam.show = true;
      this.companyParam.id = this.initUserList[index].id;
      this.companyParam.index = index;
      this.companyParam.ccomment = this.initUserList[index].ccomment;
      this.companyParam.ctype = this.initUserList[index].ctype;
    },

  },
  ready(){
      /*common('tab','table_box',1);*/
  },
  created() {
      this.tab_height = window.document.body.offsetHeight - 264;
      changeMenu(this.$store.state.table.isTop,this.getUserList,this.loadParam,localStorage.userParam);   
  }


}

</script>

<style scoped>
.component_action{
    right: 32px;
    top: 50%;
    padding: 3px 0;
}
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
.transfer{
    margin-right: 16px;
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

.service-nav {
    padding: 23px 30px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
.base_pagination{
    text-align: center;
    position: fixed;
    height: 64px;
    bottom:0px;
    left: 0;
    right:0;
    background: #fff;
    z-index: 10;
}
</style>

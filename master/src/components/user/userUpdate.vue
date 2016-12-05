<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" >
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{initUserDetail.fullname}}的信息</h3>
        </div>
        <validator name="validation">
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />

               <div class="editpage">

                 <div class="cover_loading">
                   <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
                 </div>
                   <div class="editpageleft">
                       <div class="editpage-input">
                            <label class="editlabel" for="system">姓名<span class="system_danger" v-if="$validation.fullname.minlength">请输入姓名且不少于两位数</span></label>
                           <input type="text" class="form-control  edit-input" v-validate:fullname="{minlength:2}" v-model='param.fullname' value="{{initUserDetail.fullname}}"/>
                           <!-- <input type="text" v-model='param.fullname' class="form-control edit-input" value="{{initUserDetail.fullname}}" /> -->
                       </div>
                       <!-- <div class="editpage-input">
                           <label class="editlabel" for="system">昵称<span class="system_danger" v-if="$validation.nickname.required">昵称不能为空</span></label>
                           <input type="text" class="form-control  edit-input" v-validate:nickname="{required:true}" v-model='param.nickname' value="{{initUserDetail.nickname}}"/>
                       </div> -->

                     <div class="editpage-input">

                          <label class="editlabel" for="system">固话
                            <span class="system_danger" v-if="$validation.tel.tel">请输入正确的电话</span></label>
                          <input type="text" class="form-control  edit-input" v-validate:tel="['tel']" v-model='param.tel' value="{{initUserDetail.tel}}"/>
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">性别</label>
                       <select class="form-control edit-input"  v-model="param.gender"  v-validate:usertype="['required']">
                         <option value="男">男</option>
                         <option value="女">女</option>
                         <option value="其它">其它</option>
                       </select>
                       <!--<input type="text" v-model='param.gender' class="form-control edit-input" value="{{initUserDetail.gender}}" />-->
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel" for="system">身份证号码<span class="system_danger" v-if="$validation.idnumber.IDCard">格式不对</span></label>
                       <input type="text" class="form-control  edit-input" v-validate:idnumber="['IDCard']" v-model='param.idnumber' value="{{initUserDetail.idnumber}}"/>
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">会员等级</label>
                       <select class="form-control edit-input"  v-model="param.grade">
                         <option value=0>一星</option>
                         <option value=1>二星</option>
                         <option value=2>三星</option>
                         </select>
                       <!--<input type="text" v-model="param.grade" class="form-control edit-input" value="{{initUserDetail.grade}}" />-->
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">经营类型</label>
                       <select class="form-control edit-input"  v-model="initUserDetail.bizType"  v-validate:usertype="['required']">
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
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">会员类型<span class="system_danger" v-if="$validation.usertype.required">请选择会员类型</span></label>

                       <select class="form-control edit-input"  v-model="initUserDetail.userType"  v-validate:usertype="['required']">
                           <option value="0">个人</option>
                           <option value="1">企业</option>
                      </select>
                      <!--  <input type="text" v-model="param.userType" class="form-control edit-input" value="{{initUserDetail.userType}}" /> -->
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">备注</label>
                       <input type="text" v-model='param.comment' class="form-control edit-input" value="{{initUserDetail.comment}}" />
                     </div>

                   </div>
                   <div class="editpageright">
                       <div class="editpage-input">
                           <label class="editlabel" for="system">邮箱<span class="system_danger" v-if="$validation.email.email">邮箱格式不对</span></label>
                           <input type="text" class="form-control  edit-input" v-validate:email="['email']" v-model='param.email' value="{{initUserDetail.email}}"/>
                       </div>
                       <div class="editpage-input">
                            <label class="editlabel" for="system">手机<span class="system_danger" v-if="$validation.phone.phone">请输入正确的手机号</span></label>
                            <input type="text" class="form-control  edit-input" v-validate:phone="['phone']" v-model='param.phone' value="{{initUserDetail.phone}}"/>
                       </div>
                       <div class="editpage-input">
                           <label class="editlabel">公司</label>
                           <input type="text" v-model="param.company" class="form-control edit-input" value="{{initUserDetail.company}}" />
                       </div>

                     <div class="editpage-input">

                       <label class="editlabel" for="system">qq<span class="system_danger" v-if="$validation.qq.qq">请输入正确的qq号</span></label>
                       <input type="text" class="form-control  edit-input" v-validate:qq="['qq']" v-model='param.qq' value="{{initUserDetail.qq}}"/>
                     </div>

                     <div class="editpage-input">
                       <label class="editlabel">地址</label>
                       <input type="text" v-model="param.address" class="form-control edit-input" value="{{initUserDetail.address}}" />
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">重要级别</label>
                       <select class="form-control edit-input"  v-model="param.importance">
                         <option value="0">重要</option>
                         <option value="1">很重要</option>
                         <option value="2">非常重要</option>
                       </select>
                       <!--<input type="text" v-model="param.importance" class="form-control edit-input" value="{{initUserDetail.importance}}" />-->
                     </div>

                     <div class="editpage-input">
                       <label class="editlabel">主营业务</label>
                       <input type="text" v-model='param.bizMain' class="form-control edit-input" value="{{initUserDetail.busiType}}" />
                     </div>
                   </div>
               </div>

           </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.userType=initUserDetail.userType,param.bizType=initUserDetail.bizType,tipsParam.show=true">确定</button>
            <button type="button" class="btn  btn-confirm" v-else disabled="true">确定</button>
        </div>
        </validator>
    </div>
</template>
<script>
import tipsdialogModel  from '../tips/tipDialog'
import {
  initUserDetail
} from '../../vuex/getters'
import {
    getUserDetail,
    updateUserInfo
} from '../../vuex/actions'
export default {
    components: {
      tipsdialogModel
    },
    props: ['param'],
    data() {
        return {
          tipsParam:{
            show:false,
            confirm:true,
            name:"确认修改信息?",
            callback:this.alertInfo
          }
        }
    },
    vuex: {
       getters: {
         initUserDetail
        },
        actions: {
            updateUserInfo,
            getUserDetail
        }
    },
    methods: {
      alertInfo:function(){
        this.param.show = false;
        this.updateUserInfo(this.param);
      }
    },
    created(){
      this.getUserDetail(this.param);

    }
}
</script>
<style scoped>
.big-font {
    font-size: 36px;
}

.top-title{
    position: absolute;
    right: 0;
    top: 0;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
    margin-bottom:60px;
}
.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpage-input {
    margin-top: 15px;
}
.edit-input {
    height: 36px;
    line-height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}
.editpage_img {
    width: 90%;
}

.editpage_img img {
    display: inline-block;
    background: #ccc;
}

.editpage-image {
    display: inline-block;
}
.system_danger {
    color: red;
    margin-bottom: 0;
    font-weight: 100;
    font-size: 12px;
}
</style>

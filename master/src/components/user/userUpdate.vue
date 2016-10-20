<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" >
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{param.fullname}}的信息</h3>
        </div>
       <div class="edit-model">
           <section class="editsection" v-cloak>
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <validator name="validation">
               <div class="editpage">

                 <div class="cover_loading">
                   <pulse-loader :loading="detailParam.loading" :color="color" :size="size"></pulse-loader>
                 </div>
                   <div class="editpageleft">
                       <div class="editpage-input">
                            <label class="editlabel" for="system">姓名<span class="system_danger" v-if="$validation.fullname.minlength">请输入姓名且不少于两位数</span></label>
                           <input type="text" class="form-control  edit-input" v-validate:fullname="{minlength:2}" v-model='param.fullname' value="{{initUserDetail.fullname}}"/>
                           <!-- <input type="text" v-model='param.fullname' class="form-control edit-input" value="{{initUserDetail.fullname}}" /> -->
                       </div>
                       <div class="editpage-input">
                           <label class="editlabel" for="system">昵称<span class="system_danger" v-if="$validation.nickname.required">昵称不能为空</span></label>
                           <input type="text" class="form-control  edit-input" v-validate:nickname="{required:true}" v-model='param.nickname' value="{{initUserDetail.nickname}}"/>
                       </div>

                     <div class="editpage-input">
                          
                          <label class="editlabel" for="system">电话<span class="system_danger" v-if="$validation.tel.tel">格式不对</span></label>
                          <input type="text" class="form-control  edit-input" v-validate:tel="['tel']" v-model='param.tel' value="{{initUserDetail.tel}}"/>
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">性别</label>
                       <input type="text" v-model='param.gender' class="form-control edit-input" value="{{initUserDetail.gender}}" />
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel" for="system">身份证号码<span class="system_danger" v-if="$validation.idnumber.IDCard">格式不对</span></label>
                       <input type="text" class="form-control  edit-input" v-validate:idnumber="['IDCard']" v-model='param.idnumber' value="{{initUserDetail.idnumber}}"/>
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">会员等级</label>
                       <input type="text" v-model="param.grade" class="form-control edit-input" value="{{initUserDetail.grade}}" />
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">经营类型</label>
                       <input type="text" v-model="param.busiType" class="form-control edit-input" value="{{initUserDetail.busiType}}" />
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">业务类型</label>
                       <input type="text" v-model="param.bizType" class="form-control edit-input" value="{{initUserDetail.bizType}}" />
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">会员类型</label>
                       <select class="form-control edit-input"  v-model="param.userType" value="{{initUserDetail.userType}}">
                           <option value="0">个人账户</option>
                           <option value="1">企业账户</option>
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
                           <label class="editlabel">邮箱</label>
                           <input type="text" v-model='param.email' class="form-control edit-input" value="{{initUserDetail.email}}" />
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
                       <label class="editlabel">qq</label>
                       <input type="text" v-model="param.qq" class="form-control edit-input" value="{{initUserDetail.qq}}" />
                     </div>

                     <div class="editpage-input">
                       <label class="editlabel">专属业务员</label>
                       <input type="text" v-model="param.employee" class="form-control edit-input" value="{{initUserDetail.employee}}" />
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">地址</label>
                       <input type="text" v-model="param.address" class="form-control edit-input" value="{{initUserDetail.address}}" />
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">主经营品种</label>
                       <input type="text" v-model="param.bizMain" class="form-control edit-input" value="{{initUserDetail.bizMain}}" />
                     </div>
                     <div class="editpage-input">
                       <label class="editlabel">重要级别</label>
                       <input type="text" v-model="param.importance" class="form-control edit-input" value="{{initUserDetail.importance}}" />
                     </div>

                   </div>
               </div>
               </validator>
           </section>
       </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" v-if="$validation.fullname.minlength
                          ||$validation.nickname.required
                          ||$validation.tel.tel
                          ||$validation.phone.phone
                          ||$validation.idnumber.IDCard" disabled="true">确定</button>
            <button type="button" class="btn  btn-confirm" v-else @click="tipsParam.show=true">确定</button>
        </div>
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

          },
          detailParam:{
            show:false,
            loading:true
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
      this.detailParam.id = this.param.id;
      this.getUserDetail(this.detailParam);
    }
}
</script>
<style scoped>
.big-font {
    font-size: 36px;
}

.top-title span {
    font-size: 28px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
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

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
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

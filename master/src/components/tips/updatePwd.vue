<template>
   
    <div  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <validator name="validation">
              <form novalidate>
                <h4>修改密码</h4>
                <div class="model-tips clearfix">
                    <label class="left">原密码：</label>
                    <input type="password" class="form-control" v-model="validate.oldPwd" placeholder="请输入原密码">
                </div>
                <div class="model-tips clearfix">
                    <p class="system_danger" v-if="$validation.password.pwd">请输入6至12位的数字或字母</p>
                    <label class="left">新密码：</label>
                    <input type="password" class="form-control" v-validate:password="['pwd']" v-model="validate.newPwd"  placeholder="请输入新密码">
                </div>
                <div class="model-tips clearfix">
                    <p class="system_danger" v-if="$validation.repassword.required">请输入确认密码</p>
                    <label class="left">确认密码：</label>
                    <input type="password" class="form-control" v-validate:repassword="['required']" v-model="validate.resetPwd"  placeholder="请输入确认密码">
                </div>
                <div class="model-footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm" v-if="$validation.valid"  @click="confirm(validate)" value="确定" />
                    <input type="button" class="btn  btn-confirm" v-else disabled="true" value="确定" />
                </div>
              </form>
            </validator>
        </div>
    </div>
</template>
<script>

import {
    initLogin
} from '../../vuex/getters'
import {
    resetPawd
} from '../../vuex/actions'
export default {
    props: ['param'],
    vuex: {
        getters: {
            initLogin
        },
        actions:{
           resetPawd
        }
    },
    data(){
        return{
            validate:{
                oldPwd:'',
                no:this.initLogin.no,
                newPwd:'',
                resetPwd:''
            }
        }
    },
    methods:{
        confirm:function(passwd){
            if(passwd.newPwd==passwd.resetPwd){
                passwd.callback=this.callback;
               
                passwd.callback=this.param.callback;
                this.resetPawd(passwd);
                this.param.show=false;
            }else if(passwd.newPwd==''||passwd.resetPwd==''){
              this.param.callback('密码不能为空');
            }else{
                this.param.callback('两次输入密码不一致');
            }
        }
    },
    created() {
        console.log(this.initLogin)
    }

}
</script>
<style scoped>

.del_modal_con{
    z-index:1091;
    width: 550px;
}
.model-footer{
    padding: 15px 20px;
    margin-top: 15px;
    border-top: 1px solid #ddd;
}
.model-tips{
    border-bottom: none;
    padding:15px 10px;
    position: relative;
}
.system_danger{
    text-align: left;
    position: absolute;
    top: -10px;
    left: 16%;
}
.modal {
    z-index:1090;
}
.model-tips label{
    font-weight: 100;
    font-size: 12px;
    text-align: right;
    width: 15%;
}
.form-control{
    width: 80%;
}

</style>

<template>
    <div>
        <div  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container del_modal_con" v-show="param.show">
            <div class="model-header">
                <validator name="validation">
                  <form novalidate>
                    <h4>{{$t('static.modify_password')}}</h4>
                    <div class="model-tips clearfix">
                        <label class="left">{{$t('static.old_password')}}：</label>
                        <input type="password" class="form-control" v-model="validate.oldPwd" placeholder="{{$t('static.old_password')}}">
                    </div>
                    <div class="model-tips clearfix">
                        <p class="system_danger" v-if="$validation.password.pwd">{{$t('static.validate_password')}}</p>
                        <label class="left">{{$t('static.new_password')}}：</label>
                        <input type="password" class="form-control" v-validate:password="['pwd']" v-model="validate.newPwd"  placeholder="{{$t('static.new_password')}}">
                    </div>
                    <div class="model-tips clearfix">
                        <p class="system_danger" v-if="$validation.repassword.required">{{$t('static.required')}}</p>
                        <label class="left">{{$t('static.again_password')}}：</label>
                        <input type="password" class="form-control" v-validate:repassword="['required']" v-model="validate.resetPwd"  placeholder="{{$t('static.again_password')}}">
                    </div>
                    <div class="model-footer">
                        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                        <input type="button" class="btn  btn-confirm" v-if="$validation.valid"  @click="confirm(validate)" value="{{$t('static.confirm')}}" />
                        <input type="button" class="btn  btn-confirm" v-else disabled="true" value="{{$t('static.confirm')}}" />
                    </div>
                  </form>
                </validator>
            </div>
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
               /* passwd.callback=this.callback;*/
                passwd.callback=this.param.callback;
                this.resetPawd(passwd);
                this.param.show=false;
            }else if(passwd.newPwd==''||passwd.resetPwd==''){
                console.log(this.param)
               this.param.callback(this.$t('static.empty_password'));
            }else{
                this.param.callback(this.$t('static.twice_password'));
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

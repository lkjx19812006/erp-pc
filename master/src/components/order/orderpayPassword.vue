<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>请输入支付密码</h4>
            <p class="model-tips">
                <input type="password" placeholder="请输入正确的六位支付密码" maxlength="6" v-model="payPwd" />
            </p>
            <div class="model-footer">
                <button type="button" class="btn btn-close"  @click="param.show = false">再想想</button>
                <button type="button" class="btn btn-orange" @click="confirmPay(param)">确认支付</button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    yankuanPayorder
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
        }
    },
    vuex:{
        actions:{
          yankuanPayorder
        }
    },
    methods:{
        confirmPay:function(param){
            console.log('111')
            console.log(param)
            /*if(payPwd==""||payPwd==undefined){ //验证密码是否正确

            }else{
                this.yankuanPayorder(param);
            }*/
            param.show=false;
            this.yankuanPayorder(param);
        }
    }
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
}
.big-font {
    font-size: 36px;
}
.top-title {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -28px;
    margin-right: -22px;
}
.model-tips input{
    border: 1px solid #ddd;
    width: 80%;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
}
.top-title span {
    font-size: 30px;
    color: #fff;
}

</style>

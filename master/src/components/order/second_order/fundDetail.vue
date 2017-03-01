<template>
    <shadow-model :param="param">
        <language-model v-show="false"></language-model> 
        <div class="cover_loading">
            <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <span class="navbar-brand navbar-name" href="#">{{initFundDetail.payUserName}}</span>
                    </div>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix" @click.stop="">
              <h4 class="section_title">{{$t('static.details')}}</h4>
                <ul class="clearfix" style="margin-top:20px;font-size: 13px">
                  <li class="col-md-4" v-if="this.language=='zh_CN'">{{$t('static.payment_type')}}：<label>{{initFundDetail.bizType | bizType  initFundDetail.bizType initFundDetail.type }}</li>
                  <li class="col-md-4" v-if="this.language=='en'">{{$t('static.payment_type')}}：<label>{{initFundDetail.bizType | enbizType  initFundDetail.bizType initFundDetail.type }}</li>
                  <li class="col-md-4">{{$t('static.payment_name')}}：<label>{{initFundDetail.payName}}</label></li>
                  <li class="col-md-4">{{$t('static.userName')}}：<label>{{initFundDetail.payUserName}}</li>
                  <li class="col-md-4">{{$t('static.account')}}：<label>{{initFundDetail.payNumber}}</li>
                  <li class="col-md-4" v-show="initFundDetail.payWay==2">{{$t('static.paid_branch')}}：<label>{{initFundDetail.payName}}</li>
                  <li class="col-md-4">{{$t('static.order_amount')}}：<label>{{initFundDetail.amount}}</li>
                  <li class="col-md-4" v-if="initFundDetail.pr==0">{{$t('static.payment')}}：<label>{{$t('static.notpayment')}}</li>
                  <li class="col-md-4" v-if="initFundDetail.pr==1&&initFundDetail.type==1">{{$t('static.paystatus')}}：<label>{{$t('static.confirm_recipt')}}</li>
                  <li class="col-md-4" v-if="initFundDetail.pr==1&&initFundDetail.type==0">{{$t('static.paystatus')}}：<label>{{$t('static.confirm_paid')}}</li>
                  <li class="col-md-4">{{$t('static.create_time')}}：<label>{{initFundDetail.ctime}}</li>
                </ul>
                <ul class="clearfix">
                  <li v-for="img in initFundDetail.images" class="col-md-4">
                      <img :src="img.url" />
                  </li>
                </ul>
            </div>
        </section>
    </shadow-model>
</template>
<script>
import languageModel from '../../tools/language.vue'
import{
    initFundDetail
} from '../../../vuex/getters'
import {
    getFundDetail
} from '../../../vuex/actions'
import shadowModel from '../../mguan/shadow.vue'
export default {
    components: {
        shadowModel,
        languageModel
    },
    data() {
        return {
          changeShow: true, 
          language:''  
        }
    },
    props:['param'],
    vuex: {
        getters:{
            initFundDetail
        },
        actions:{
            getFundDetail
        }
    },
    methods:{
      close:function(){
        console.log(this.param)
        this.param.show=false;
      }
    },
    created(){
       this.getFundDetail(this.param);
       this.language = localStorage.lang;
    }
}
</script>
<style scoped>
.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}
.modal_con{
  height: 600px;
}
.navbar-img {
    float: left;
    margin-right: 10px;
}
.client-line{
  border-left: 1px solid #ddd;
}
.navbar-name {
    color: #fa6705;
    font-size: 20px;
}

.top-title{
  width:800px;
  left: 0;
  right:0;
  z-index: 1081;
}

</style>

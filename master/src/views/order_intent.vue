<template>
     <!-- 会员意向 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==0">
         <user-intention></user-intention>
     </div>
     <!-- 我的意向 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==1">
         <my-intention></my-intention>
     </div>
     <!-- 部门意向 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==2">
        <org-intention></org-intention>
     </div>
     <!-- 意向资源池 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==6">
        <potential-intention></potential-intention>
     </div>
     <!-- 我的报价 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==3">
        <my-offer></my-offer>
     </div>
     <!-- 部门报价 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==4">
        <org-offer></org-offer>
     </div>
     <!-- 我的留言 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==5">
        <msg></msg>
     </div>
     <!-- 我的寄样申请列表 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==7">
        <my-sample></my-sample>>
     </div>
     <!-- 部门寄样申请列表 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==8">
        <org-sample></org-sample>>
     </div>
     
</template>
<script>
import userIntention from '../components/Intention/intentionList/userIntention.vue'
import myIntention from '../components/Intention/intentionList/myIntention.vue'
import orgIntention from '../components/Intention/intentionList/orgIntention.vue'
import potentialIntention from '../components/Intention/intentionList/potentialIntention.vue'
import myOffer from '../components/Intention/intentionList/myOffer.vue'
import orgOffer from '../components/Intention/intentionList/orgOffer.vue'
import msg from '../components/Intention/intentionList/msg.vue'
import mySample  from  '../components/Intention/intentionList/mySendSample' 
import orgSample from '../components/Intention/intentionList/orgSendSample'
export default {
    components: { 
        userIntention,  
        myIntention,
        orgIntention,
        potentialIntention,
        myOffer,
        orgOffer,
        msg,
        mySample,
        orgSample
    }
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-left: 18px;
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

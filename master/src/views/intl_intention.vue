<template>
     
     <!-- 我的意向 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==0">
         <my-intention></my-intention>
     </div>
     <!-- 部门意向 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==1">
        <org-intention></org-intention>
     </div>

     <!-- 国际询价 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==2">
        <intl-inquire></intl-inquire>
     </div>
     <!-- 国际我的寄样申请 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==3">
        <mysample-model></mysample-model>
     </div>
     <!-- 国际部门寄样 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==4">
        <sample-model></sample-model>
     </div>

     
</template>
<script>

import myIntention from '../components/intlIntention/intentionList/myIntention.vue'
import orgIntention from '../components/intlIntention/intentionList/orgIntention.vue'
import intlInquire from '../components/intlIntention/intentionList/intlInquire.vue'
import mysampleModel from '../components/intlIntention/intentionList/mySampleApply'
import sampleModel from  '../components/intlIntention/intentionList/orgSampleApply'
export default {
    components: { 
        myIntention,
        orgIntention,
        intlInquire,
        mysampleModel,
        sampleModel
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

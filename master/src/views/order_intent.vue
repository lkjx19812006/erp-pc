<template>
     <!-- 我的意向 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==0">
         <my-intention></my-intention>
     </div>
      <!-- 部门意向 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==1">
        <org-intention></org-intention>
     </div>
     <!-- 我的报价 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==2">
        <my-offer></my-offer>
     </div>
     <!-- 部门报价 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==3">
        <org-offer></org-offer>
     </div>
     <!-- 我的留言 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==4">
        <my-msg></my-msg>
     </div>
     <!-- 部门留言 -->
     <div class="myOrder" v-if="$route.path.split('=')[1]==5">
        <org-msg></org-msg>
     </div>
</template>
<script>
import myIntention from '../components/Intention/intentionList/myIntention.vue'
import orgIntention from '../components/Intention/intentionList/orgIntention.vue'
import myOffer from '../components/Intention/intentionList/myOffer.vue'
import orgOffer from '../components/Intention/intentionList/orgOffer.vue'
import myMsg from '../components/Intention/intentionList/myMsg.vue'
import orgMsg from '../components/Intention/intentionList/orgMsg.vue'

import {
	
} from '../vuex/getters'
import {
	
} from '../vuex/actions'
export default {
    components: {   
        myIntention,
        orgIntention,
        myOffer,
        orgOffer,
        myMsg,
        orgMsg
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

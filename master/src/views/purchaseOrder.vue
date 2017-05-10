<template>
  <div>
    <!-- 我的采购单 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==0">
      <my-purchase></my-purchase>
    </div>
    <!-- 部门采购单 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==1">
      <org-purchase></org-purchase>
    </div>
    <!-- 全部采购单 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==2">
      <all-purchase></all-purchase>
    </div>
    <!-- 采购单报价 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==3">
      <purchase-offer></purchase-offer>
    </div>
    <!-- 我的客户报价 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==4">
      <my-offer></my-offer>
    </div>
    <!-- 部门客户报价 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==5">
      <org-offer></org-offer>
    </div>
  </div>
</template>
<script>
  import myPurchase from '../components/purchaseOrder/list/myPurchaseOrder.vue'
  import orgPurchase from '../components/purchaseOrder/list/orgPurchaseOrder.vue'
  import allPurchase from '../components/purchaseOrder/list/allPurchaseOrder.vue'
  import purchaseOffer from '../components/purchaseOrder/list/purchaseOffer.vue'
  import myOffer from '../components/Intention/intentionList/myOffer.vue'
  import orgOffer from '../components/Intention/intentionList/orgOffer.vue'
  export default {
    components: {
      myPurchase,
      orgPurchase,
      allPurchase,
      purchaseOffer,
      myOffer,
      orgOffer
    }
  }
</script>
<style scoped>
  .breed_action {
    top: 33px;
    right: 106px;
  }

  .transfer {
    margin-left: 18px;
  }

  .checkbox_unselect {
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

  .checkbox_select {
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

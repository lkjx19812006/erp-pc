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
        <!-- 我收到的报价 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==6">
            <my-purchase-offer :param="mpoParam"></my-purchase-offer>
        </div>
        <!-- 收到的全部报价 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==7">
            <all-purchase-offer :param="apoParam"></all-purchase-offer>
        </div>
        <!-- 不参与记录 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==8">
            <cancel-record :param="apoParam"></cancel-record>
        </div>
    </div>
</template>
<script>
import myPurchase from '../components/purchaseOrder/list/myPurchaseOrder.vue'
import orgPurchase from '../components/purchaseOrder/list/orgPurchaseOrder.vue'
import allPurchase from '../components/purchaseOrder/list/allPurchaseOrder.vue'
import purchaseOffer from '../components/purchaseOrder/list/purchaseOffer.vue'
import myPurchaseOffer from '../components/purchaseOrder/list/myPurchaseOffer.vue'
import allPurchaseOffer from '../components/purchaseOrder/list/myPurchaseOffer.vue'
import cancelRecord from '../components/purchaseOrder/list/cancelRecord.vue'
import myOffer from '../components/Intention/intentionList/myOffer.vue'
import orgOffer from '../components/Intention/intentionList/orgOffer.vue'
export default {
    components: {
        myPurchase,
        orgPurchase,
        allPurchase,
        purchaseOffer,
        myPurchaseOffer,
        allPurchaseOffer,
        myOffer,
        orgOffer,
        cancelRecord
    },
    data() {
        return {
            mpoParam: {
                //控制我收到的报价的搜索条件是否显示
                breedId: true,
                offerEmployee: true,
                accept: true,
                //设置接口路径（link）,返回列表名（key）,getter中的返回列表
                link: '/intention/offer/queryMyOffer',
                key: 'myIndentOfferList',
                init: 'initMyIndentOfferList'
            },
            apoParam: {
                //控制我收到的报价的搜索条件是否显示
                breedId: true,
                offerEmployee: true,
                accept: true,
                //设置接口路径（link）,返回列表名（key）,getter中的返回列表
                link: '/intention/offer/queryAllOffer',
                key: 'allIndentOfferList',
                init: 'initAllIndentOfferList'
            },

        }
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

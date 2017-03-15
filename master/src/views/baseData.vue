<template>
    <div>
        <div class="service-data" v-if="$route.path.split('=')[1]==0">
            <company-model></company-model>
        </div>
        <!-- 成分 -->
        <div class="service-data" v-if="$route.path.split('=')[1]==1">
            <recipe-model></recipe-model>
        </div>
        <!-- 提取物 -->
        <div class="service-data" v-if="$route.path.split('=')[1]==2">
            <extractive-model></extractive-model>
        </div>
        <!-- 药材 -->
        <div class="service-data" v-if="$route.path.split('=')[1]==3">
            <breed-model></breed-model>
        </div>
        <!-- 企业产品 -->
        <div class="service-data" v-if="$route.path.split('=')[1]==4">
            <company-product></company-product>
        </div>
        <!-- 企业证书 -->
        <div class="service-data" v-if="$route.path.split('=')[1]==5">
            <company-license></company-license>
        </div>
    </div>
</template>
<script>
import breedModel from '../components/serviceBaselist/breedlist'
import recipeModel from '../components/serviceBaselist/recipelist'
import companyModel from '../components/serviceBaselist/companylist'
import extractiveModel from '../components/serviceBaselist/extrativelist'
import companyProduct from '../components/serviceBaselist/companyProduct'
import companyLicense from '../components/serviceBaselist/companyLicense'

export default {
    components: {
        breedModel,
        recipeModel,
        companyModel,
        extractiveModel,
        companyProduct,
        companyLicense
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.service-data {
    width: 100%;
    white-space: nowrap;
}
</style>

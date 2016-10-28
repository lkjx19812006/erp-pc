<template>
    <div class="service-data" v-show="$route.path.split('=')[1]==0">
        <company-model></company-model>
    </div>
    <!-- 成分 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==1">
        <recipe-model></recipe-model>
    </div>
    <!-- 提取物 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==2">
        <extractive-model></extractive-model>
    </div>
    <!-- 药材 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==3">
        <breed-model></breed-model>
    </div>
</template>
<script>
import breedModel from '../components/serviceBaselist/breedlist'
import recipeModel from '../components/serviceBaselist/recipelist'
import companyModel  from '../components/serviceBaselist/companylist'
import extractiveModel  from '../components/serviceBaselist/extrativelist'

export default {
    components: {
        breedModel,
        recipeModel,
        companyModel,
        extractiveModel
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

<template>
    <div>
        <!-- 供应商列表 -->
        <div v-if="$route.path.split('=')[1]==0">
            <supply-list></supply-list>
        </div>
        <!-- 供应商资质证书 -->
        <div v-if="$route.path.split('=')[1]==1">
            <supply-certi></supply-certi>
        </div>
        <!-- 产品列表 -->
        <div v-if="$route.path.split('=')[1]==2">
            <supply-product></supply-product>
        </div>
        <!-- 产品文件列表 -->
        <div v-if="$route.path.split('=')[1]==3">
            <product-files></product-files>
        </div>
    </div>
</template>
<script>
import supplyList from '../components/supply/supplyList'
import supplyCerti from '../components/supply/supplyCerti'
import supplyProduct from '../components/supply/supplyProduct'
import productFiles from '../components/supply/productFiles'

export default {
    components: {
        supplyList,
        supplyCerti,
        supplyProduct,
        productFiles
    }

}
</script>
<style scoped>
</style>

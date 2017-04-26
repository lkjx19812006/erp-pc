<template>
    <div>
        <!-- 库存列表 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==0">
            <stock-List></stock-List>
        </div>

    </div>
</template>
<script>
import stockList from '../components/stock/stockList.vue'

export default {
    components: {
        stockList
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

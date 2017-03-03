<template>
    <div>
        <div class="myOrder" v-if="$route.path.split('=')[1]==0">
            <enumlist-model></enumlist-model>
        </div>
        <!-- begin省市区 -->
        <div class="myOrder" v-if="$route.path.split('=')[1]==1">
            <province-model></province-model>
        </div>
    </div>
</template>
<script>
import enumlistModel from '../components/systemcomponent/emnulist'
import provinceModel from '../components/systemcomponent/provincelist'

export default {
    components: {
        enumlistModel,
        provinceModel
    },
    data() {
        return {

        }
    },

    vuex: {
        getters: {

        }
    },
    created() {

        /*if (this.$route.query.id > this.getList[8].subcategory.length || isNaN(this.$route.query.id)||!this.$route.query.id) {
            this.$route.query.id = 0;
        }*/
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}
</style>

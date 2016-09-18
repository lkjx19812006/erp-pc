<template>
    <div class="service-data" v-show="$route.path.split('=')[1]==0">
        <company></company>
    </div>
    <!-- 成分 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==1">
        <recipe></recipe>
    </div>
    <!-- 提取物 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==2">
        <extractive></extractive>
    </div>
    <!-- 药材 -->
    <div class="service-data" v-show="$route.path.split('=')[1]==3">
        <breed></breed>
    </div>
</template>
<script>
import breed from '../components/serviceBaselist/breedlist'
import recipe from '../components/serviceBaselist/recipelist'
import company from '../components/serviceBaselist/companylist'
import extractive  from '../components/serviceBaselist/extrativelist'
import  store from '../vuex/store'
import {
    getList
} from '../vuex/getters'
export default {
    components: {
        breed,
        recipe,
        company,
        extractive
    },
    store,
    data() {
        return {

        }
    },
    vuex: {
        getters: {
            getList
        }
    },
    created() {
        if (this.$route.query.id > this.getList[11].subcategory.length || isNaN(this.$route.query.id) || !this.$route.query.id) {
            this.$route.query.id = 0;
        }

    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
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

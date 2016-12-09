<template>
    <div class="myOrder" v-show="$route.path.split('=')[1]==0">
         <enumlist></enumlist>
    </div>
    <!-- begin省市区 -->
     <div class="myOrder" v-show="$route.path.split('=')[1]==1">
        <province></province>
    </div>
</template>
<script>
import enumlist from '../components/systemcomponent/emnulist'
import province from '../components/systemcomponent/provincelist'

export default {
    components: {
      enumlist,
        province
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

<template>
    <div class="myOrder" v-show="$route.path.split('=')[1]==0">
         <enum></enum>
    </div>
    <!-- begin省市区 -->
     <div class="myOrder" v-show="$route.path.split('=')[1]==1">
        <province></province>
    </div>
</template>
<script>
import enum from '../components/systemcomponent/emnulist'
import province from '../components/systemcomponent/provincelist'
import {
    getList
} from '../vuex/getters'

export default {
    components: {
        enum,
        province
    },
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
        if (this.$route.query.id > this.getList[10].subcategory.length || isNaN(this.$route.query.id)||!this.$route.query.id) {
            this.$route.query.id = 0;
        }
    },
    route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
      }
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}
</style>

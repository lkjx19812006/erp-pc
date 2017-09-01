<template>
    <div id="app">
        <ul v-for="item in initCurrencylist">
            <li>{{item.name}}</li>
        </ul>

    </div>
</template>
<script>
import {
    initCurrencylist,
    initClientcount,
    initLogin
} from '../vuex/getters.js'
import {
    getCurrencyList,
    getClientcount
} from '../vuex/actions.js'
export default {
    components: {

    },
    data() {
       return {
         hello :222,
         loadParam:{
            employeeId:this.initLogin.id,
            loading:false
         }

       }
    },
    vuex: {
        actions: {
            getCurrencyList,
            getClientcount
        },
        getters: {
            initCurrencylist,
            initLogin,
            initClientcount
        }
    },
    methods: {

    },
    created() {

    }
}
</script>
<style scoped>

</style>

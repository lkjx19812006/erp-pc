<template>
    <div id="app">
        <ul v-for="item in initCurrencylist">
            <li>{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
import {
    initCurrencylist
} from '../vuex/getters.js'
import {
    getCurrencyList
} from '../vuex/actions.js'
export default {
    components: {

    },
    data() {
        return {

        }
    },
    vuex: {
        actions: {
            getCurrencyList
        },
        getters: {
            initCurrencylist

        }
    },
    methods: {

    },
    created() {
        this.getCurrencyList();
    }
}
</script>
<style scoped>
/* body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
 }  */

#app {
    color: #2c3e50;
    max-width: 100%;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: left;
}

#app a {
    color: #42b983;
    text-decoration: none;
}

.logo {
    width: 100px;
    height: 100px
}

.image_demo {
    width: 200px;
    height: 200px
}
</style>

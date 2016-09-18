<template>
    <div>部门业务机会</div>
    <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    <p>{{ message }}</p>
    <input type='text' v-model="message | twoWays">
</template>
<script>
import {
    getList
} from '../vuex/getters'

import demo from '../filters/demo'
export default {
    components: {

    },
    data() {
        return {
            message: 'hello',
            color: '#5dc596',
            size: '15px',
            loading: true
        }
    },
    vuex: {
        getters: {
            getList
        }
    },
    created() {
        if (this.$route.query.id > this.getList[1].subcategory.length || isNaN(this.$route.query.id)) {
            this.$route.query.id = 0;
        }
    },
    filter: (demo, {
        read: function(val) {},
        write: function(newVal, oldVal) {}
    })
}
</script>
<style scoped>
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
</style>

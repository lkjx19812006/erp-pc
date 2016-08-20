<template>
    <div>
        部门业务机会
        <div v-loaders ></div>
        <pulse-loader :loading="true" :color="#5dc596" :size="15px"></pulse-loader>
    </div>
</template>
<script>
import {
    getList
} from '../vuex/getters'

export default {
    components: {
    	
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
 created(){
 	if(this.$route.query.id>this.getList[1].subcategory.length||isNaN(this.$route.query.id)){
 		this.$route.query.id=0;
 	}

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
</style>

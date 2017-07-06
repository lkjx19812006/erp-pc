<template>
     <bigintention :param="allParam"></bigintention>
</template>
<script type="text/javascript">
  import bigintention from '../BigIntention.vue'
  
  export default{
        data(){
        return{
            allParam:{
                url:'/intention/',
                id:3
            }
            
        }
    },
    components:{
   bigintention
    }
  }
</script>
<style type="text/css"></style>
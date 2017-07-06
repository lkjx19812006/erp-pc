<template>
     <bigintention :param="userParam"></bigintention>
</template>
<script type="text/javascript">
  import bigintention from '../BigIntention.vue'
  
  export default{
     data(){
        return{
            userParam:{
                url:'/intention/user/list',
                id:4
            }
            
        }
    },
    components:{
   bigintention
    }
  }
</script>
<style type="text/css"></style>
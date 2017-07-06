<template>
     <bigintention :param="orgParam"></bigintention>
</template>
<script type="text/javascript">
  import bigintention from '../BigIntention.vue'
  
  export default{
    data(){
        return{
            orgParam:{
                url:'/intention/org/list',
                id:2
            }
            
        }
    },
    components:{
   bigintention
    }
  }
</script>
<style type="text/css"></style>
<template>
     <bigclient :param="orgParam"></bigclient>
</template>
<script type="text/javascript">
  import bigclient from './BigClient.vue'
  
  export default{
    data(){
        return{
            orgParam:{
                url:"/customer/orgDistributed",
                id:1
            }
            
        }
    },
    components:{
   bigclient
    }
  }
</script>
<style type="text/css"></style>
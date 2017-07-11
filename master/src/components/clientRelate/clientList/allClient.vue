<template>
     <bigclient :param="allParam"></bigclient>
</template>
<script type="text/javascript">
  import bigclient from './BigClient.vue'
  
  export default{
    data(){
        return{
            allParam:{
                url:"/customer/",
                id:2
            }
            
        }
    },
    components:{
   bigclient
    }
  }
</script>
<style type="text/css"></style>
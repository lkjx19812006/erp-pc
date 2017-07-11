<template>
     <bigclient :param="myParam"></bigclient>
</template>
<script type="text/javascript">
  import bigclient from './BigClient.vue'
  
  export default{
    data(){
        return{
            myParam:{
                url:"/customer/employeeDistributed",
                id:0
            }
            
        }
    },
    components:{
   bigclient
    }
  }
</script>
<style type="text/css"></style>
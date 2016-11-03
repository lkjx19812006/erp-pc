<template>
    <div>
      <select class="form-control edit-input" v-model="language"  style="width:100px">
        <option value="zh_CN" selected>中文</option>
        <option value="en">English</option>
      </select>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default{
        data(){
            return{
              language:''
            }
        },
      watch:{
        'language':function(val){
          Vue.config.lang = val;
        }
      },
    }
</script>
<style scoped>

</style>

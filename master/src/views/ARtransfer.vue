<style>

</style>
<template>
  <div class="content">
    <!--蓝金灵页面-->
    <langjinling v-if="pathId == '0'"></langjinling>
  </div>
</template>
<script>
  import langjinling from '../components/ARtransfer/langjinling.vue'
  export default {
    data() {
      return {}
    },
    components:{
      langjinling
    },
    computed: {
      //通过计算属性 实时计算当前ID值 显示不同的页面内容
      pathId() {
        return this.$route.query.id;
      }
    },
    //DOM加载完成方法
    ready() {
    },
    methods: {}
  }
</script>

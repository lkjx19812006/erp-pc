<style scoped>
  * {
    box-sizing: border-box;
  }

  /*包裹盒子*/

  .langjinling {
    padding: 10px;
  }

  /*頭部tab切換開始*/

  .langjinling .top_tab {
    display: flex;
    flex-display: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }

  .langjinling .top_tab div {
    flex: 0 0 auto;
    padding: 5px 30px;
    font-size: 16px;
    border: 1px solid #169BD5;
    color: #169BD5;
    cursor: pointer;
  }

  .langjinling .top_tab div:nth-child(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .langjinling .top_tab div:nth-child(2) {
    border-left: 0 none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .langjinling .top_tab .active {
    background-color: #169BD5;
    color: #fff;
  }
</style>
<template>
  <div class="langjinling">
    <!--头部按钮切换-->
    <div class="top_tab">
      <div class="show-sx" :class="{'active':tabIndex === 0}" @click="tabIndex=0">
        授信
      </div>
      <div class="show-dk" :class="{'active':tabIndex === 1}" @click="tabIndex=1">
        贷款
      </div>
    </div>
    <ljl-sx v-if="tabIndex === 0"></ljl-sx>
    <ljl-loan v-if="tabIndex === 1"></ljl-loan>
  </div>
</template>
<script>
  import ljlSx from './ljlSx.vue'
  import ljlLoan from './ljlLoan.vue'
  export default {
    data() {
      return {
        tabIndex: 0,
      }
    },
    components: {
      ljlSx,
      ljlLoan
    },
    methods: {

    }
  }
</script>
<template>
  <div>
    <full-calendar :events="fcEvents" locale="en"></full-calendar>
  </div>
</template>
<script>
import {
  increment,
  decrement
} from '../vuex/actions'


export default {
  vuex: {
    actions: {
      increment: increment,
      decrement: decrement
    }
  },
  data() {
    return {
      fcEvents: [{
        title: 'erp报价流程开发',
        start: '2017-05-7',
        end: '2017-05-8'
      },{
        title: 'erp报价流程测试',
        start: '2017-05-7',
        end: '2017-05-8'
      },{
        title: 'erp统计流程开发',
        start: '2017-05-9',
        end: '2017-05-12'
      }]
    }
  }
}
</script>
<style scoped>
</style>

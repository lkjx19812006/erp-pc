<template>
<div>
 message

 <button @click='increment'>Increment +1</button>
  <button @click='decrement'>Increment -1</button>
 </div>


</template>

<script>
import { increment,decrement } from '../vuex/actions'

export default {
 vuex: { 
    actions: {
      increment: increment,
      decrement:decrement
    }
  }
}
</script>
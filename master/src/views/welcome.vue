<template>
    <div id="app">
        <hello></hello>
        <p>
            Welcome to your Vue.js appssss!
        </p>
    </div>
    <div>
        <show-model :param="modelParam"></show-model>
        <button v-on:click="btnClick('hello')">hello</button>
        <button v-on:click="btnClick('test')">hello</button>
    </div>
</template>
<script>
import Hello from '../components/Hello'
import showModel from './showmodel'
export default {
    components: {
        Hello,
        showModel
    },
    data() {
        return {
            modelParam: {
                show: false,
                name: 'hello'
            }
        }
    },
    methods: {
        btnClick: function(value) {
          this.modelParam.name=value;
          this.modelParam.show=true;
        }
    },
    route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          transition.next()
      }
    }
}
</script>
<style scoped>
/* body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
 }  */

#app {
    color: #2c3e50;
    max-width: 100%;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: left;
}

#app a {
    color: #42b983;
    text-decoration: none;
}

.logo {
    width: 100px;
    height: 100px
}
</style>

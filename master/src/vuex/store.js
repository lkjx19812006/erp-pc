import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'

Vue.use(Vuex)

// create the store
export default new Vuex.Store({
  modules:{
    category
  }
})
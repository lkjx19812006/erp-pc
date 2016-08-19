import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'
import echarts from './modules/chart'

Vue.use(Vuex)

// create the store
export default new Vuex.Store({
  modules:{
    category,
    echarts
  }
})
import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'
import echarts from './modules/chart'
import table from './modules/table'
import tablelist from './modules/tablelist'

Vue.use(Vuex)

// create the store
export default new Vuex.Store({
  modules:{
    category,
    echarts,
    table,
    tablelist
  }
})
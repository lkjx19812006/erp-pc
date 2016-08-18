import {
  INCREMENT,
  DECREMENT,
  INIT_LIST
} from '../mutation-types'

const state = {
   count: 0,
   list:[
    {"categoryid":0,"category":"业务机会","img":"../images/logo.png","subcategory":[{"subcategoryId":1,"subcategory":"个人业务机会","img":"../images/logo.png"},{"subcategoryId":2,"subcategory":"部门业务机会","img":"../images/logo.png"}]},
    {"categoryid":2,"category":"潜在客户","img":"../images/logo.png","subcategory":[]}
  ]
}


const mutations = {

  [INCREMENT] (state) {
    state.count++
  },

  [DECREMENT] (state) {
   state.count--
  },

  [INIT_LIST] (state,data) {
     state.list=data.results;
  }
}

export default {
  state,
  mutations
}
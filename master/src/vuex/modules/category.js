import {
    INCREMENT,
    DECREMENT,
    INIT_LIST,
    INIT_TABS,
    MENU_BAR,
    FOLD
} from '../mutation-types'

var categoryJson={};
if(localStorage.menus){
  categoryJson=JSON.parse(localStorage.menus)
}

const state = {
    count: 0,

    list:categoryJson,
    tabs:[],
    left: 240,
    expand:true
}


const mutations = {

    [INCREMENT](state) {
        state.count++
    },

    [DECREMENT](state) {
        state.count--
    },

    [INIT_LIST](state,data) {
        state.list = data.menus;
    },
    [INIT_TABS](state,data) {
        state.tabs = data;
    },
    
    [MENU_BAR](state) {
        if (state.left == 240) {
            state.left = 50;
        } else {
            state.left = 240;
        }
    },
    [FOLD](state){
        if(state.expand == true){
            state.expand = false
        }else{
            state.expand = true
        }
    }
}

export default {
    state,
    mutations
}

import {
    INCREMENT,
    DECREMENT,
    INIT_LIST,
    MENU_BAR,
    FOLD
} from '../mutation-types'

const state = {
    count: 0,

    list: JSON.parse(localStorage.menus),
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

import {
    MY_CLIENT_COUNT
} from '../mutation-types'

const state = {
    countList: [{
        "id": 0,
        "name": "孙慧丽",
        "type": "0",
        "daycount": "0",
        "month": "100",
        "week": "20",
        "total": "5000"
    }],
}
const mutations = {
    [MY_CLIENT_COUNT](state, data) { //我的客户统计
      console.log(state.countList)
      state.countList = data;
    },
}
export default {
    state,
    mutations
}

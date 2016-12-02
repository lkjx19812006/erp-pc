import {
    MY_CLIENT_COUNT,
    MY_SAMPLE_LIST,
    ORG_SAMPLE_LIST,
    ADD_SAMPLE,
    UPDATE_SAMPLE
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
    mySampleList:[],
    orgSampleList:[],
}
const mutations = {
    [MY_CLIENT_COUNT](state, data) { //我的客户统计
      console.log(state.countList)
      state.countList = data;
    },
    [MY_SAMPLE_LIST](state,data){ //我的寄样申请列表
        state.mySampleList = data;
    },
    [ORG_SAMPLE_LIST](state,data){ //部门寄样申请列表
        state.orgSampleList = data;
    },
    [ADD_SAMPLE](state,date){
        state.mySampleList.unshift({  //新建寄样申请表
            /*"type":data.type,
            "sourceType":data.sourceType,
            "sample":data.sample,
            "intl":data.intl,*/
        })
    },
    [UPDATE_SAMPLE](state, data) { //修改寄样申请表
            state.mySampleList[data.sub][key] = data[key];
    }
}
export default {
    state,
    mutations
}

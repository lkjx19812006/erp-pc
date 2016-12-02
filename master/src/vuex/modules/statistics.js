import {
    MY_CLIENT_COUNT,
    MY_SAMPLE_LIST,
    ORG_SAMPLE_LIST,
    ADD_SAMPLE,
    UPDATE_SAMPLE,
    SAMPLE_DETAIL,
    DELETE_DATA
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
    sampleDetail:{
        arr: [],
        show: true
    },
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
    [ADD_SAMPLE](state,data){
        console.log(data)
        state.mySampleList.unshift({  //新建寄样申请表
           'customerName':data.customerName,
           'customerPhone':data.customerPhone,
           'customer':data.customer,
           'currency':data.currency, 
           'total':data.total,
           'employee':data.employee,
           'country':data.country,
           'province':data.province,
           'city':data.city,
           'district':data.district,
           'items':data.items,
           'validate':data.validate,
           'ctime':data.ctime
        })
    },
    [UPDATE_SAMPLE](state, data) { //修改寄样申请表
        state.mySampleList[data.sub][key] = data[key];
    },
    [SAMPLE_DETAIL](state,data){ //寄样详情
        state.sampleDetail = data;
    },
    [DELETE_DATA](state,data) { //删除信息
        state[data.key].splice(data.sub, 1);
    },
}
export default {
    state,
    mutations
}

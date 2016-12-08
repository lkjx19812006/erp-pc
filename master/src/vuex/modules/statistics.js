import {
    MY_CLIENT_COUNT,
    MY_ORDER_COUNT,
    MY_SAMPLE_LIST,
    ORG_SAMPLE_LIST,
    ADD_SAMPLE,
    UPDATE_SAMPLE,
    SAMPLE_DETAIL,
    DELETE_DATA,
    APPLY_DATA,
    UNIT_LIST
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
    myOrderList:{},
    mySampleList:[{
        "send":true
    }],
    orgSampleList:[],
    sampleDetail:{
        arr: [],
        show: true
    },
    unitList:[],
}
const mutations = {
    [UNIT_LIST](state,data){ //常用单位
       console.log(state.unitList)
       state.unitList = data;
    },
    [MY_CLIENT_COUNT](state, data) { //我的客户统计
      console.log(state.countList)
      state.countList = data;
    },
    [MY_CLIENT_COUNT](state, data) { //我的订单统计
      console.log("订单统计")
      
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
           'sampleDesc':data.sampleDesc,
           'consignee':data.consignee,
           'consigneePhone':data.consigneePhone,
           'address':data.address,
           'items':data.items,
           'validate':data.validate,
           'ctime':data.ctime,
           'id':data.id
        })
    },
    [UPDATE_SAMPLE](state, data) { //修改寄样申请表
        console.log(data)
        for(var key in data){
            state.mySampleList[data.index][key] = data[key];
        }   
    },
    [SAMPLE_DETAIL](state,data){ //寄样详情
        state.sampleDetail = data;
    },
    [DELETE_DATA](state,data) { //删除信息
        state[data.key].splice(data.sub, 1);
    },
    [APPLY_DATA](state,data){ //审核寄样申请
        console.log(data)
        if(data.url=='/sample/validate/'){
          for (var key in data) {
                console.log(state.orgSampleList[data.sub])
                state.orgSampleList[data.sub][key] = data[key];
            }  
         state.orgSampleList[data.sub].description = data.auditComment;
        }
        if(data.url=='/sample/validate/apply/'){
            for (var key in data) {
                console.log(state.mySampleList[data.sub])
                state.mySampleList[data.sub][key] = data[key];
            }
            state.mySampleList[data.sub].description = data.auditComment;
        }
        
        
    }
}
export default {
    state,
    mutations
}

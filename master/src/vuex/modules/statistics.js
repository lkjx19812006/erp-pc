import {
    MY_CLIENT_COUNT,
    MY_ORDER_COUNT,
    MY_TIME_ORDER_COUNT,
    MY_SAMPLE_LIST,
    ORG_SAMPLE_LIST,
    ADD_SAMPLE,
    UPDATE_SAMPLE,
    SAMPLE_DETAIL,
    DELETE_DATA,
    APPLY_DATA,
    UNIT_LIST,
    CURRENCY_LIST,
    MY_FUND_LIST,
    ORG_FUND_LIST,
    FUND_DETAIL_DATA,
    FINANCE_LIST,
    REQUEST_RECORD,
    ITEM_SUPPLIER_LIST
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
    //我的交易统计(总)
    myOrderCount:[],
    //我的交易统计(时间维度:日周月季年)
    myTimeOrderCount:[],
    //部门交易统计(总)
    orgOrderCount:[],
    //部门交易分类统计(客户类型,客户所在地,品种,产地等方式)
    orgOrderSortCount:[],
    mySampleList:[{
        "send":true
    }],
    orgSampleList:[],
    sampleDetail:{
        arr: [],
        show: true
    },
    unitList:[],
    currencyList:[],
    myFundlist:[],
    orgFundlist:[],
    fundDetail:[],
    financeList:[],
    //分期申请历史记录
    recordList:[],
    //产品供应商
    supplierList:[]
}
const mutations = {
    [UNIT_LIST](state,data){ //常用单位
       state.unitList = data;
    },
    [CURRENCY_LIST](state,data){
        state.currencyList = data;
    },
    [MY_CLIENT_COUNT](state, data) { //我的客户统计
      state.countList = data;
    },
    [MY_ORDER_COUNT](state, data) { //我的订单统计
      state[data.key] = data;
    },
    [MY_TIME_ORDER_COUNT](state, data) { //我的订单统计(时间维度)
      state.myTimeOrderCount = data;
    },
    [MY_SAMPLE_LIST](state,data){ //我的寄样申请列表
        state.mySampleList = data;
    },
    [ORG_SAMPLE_LIST](state,data){ //部门寄样申请列表
        state.orgSampleList = data;
    },
    [MY_FUND_LIST](state,data){ //我的资金记录
      if(data.titles=='确定收款'){
            console.log(state.myFundlist[data.sub])
            state.myFundlist[data.sub].pr =  data.pr;
        }else{
          state.myFundlist = data;
        }
    },
    [ORG_FUND_LIST](state,data){ //我的资金记录
      state.orgFundlist = data;
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
           'comments':data.comments,
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
    },
    [FUND_DETAIL_DATA](state,data){
      state.fundDetail = data;
    },
    [FINANCE_LIST](state,data){
      console.log(data)
        if(data.titles=='分期审核'){
            state.financeList[data.sub].validate =  data.validate;
            state.financeList[data.sub].pr =  data.pr;
        }else{
          state.financeList = data;
        }
    },
    [REQUEST_RECORD](state,data){
      state.recordList = data;
    },
    [ITEM_SUPPLIER_LIST](state,data){
       state.supplierList = data;
    }

}
export default {
    state,
    mutations
}

import {
   ORDER_TABLE,
   CHANGE_SHOW_STATUE,
   CLIENT_INFO,
   SYSTEM_DATA,
   PROVINCE_DATA,
   SERVICE_ENTERPRISE,
   SERVICE_COMPONENT,
   SERVICE_DRAW,
   DELETE_SHOW_STATUE,
   DELETE_COMPANY_STATUS,
   DELETE_COMPONENT_STATUS,
   DELETE_DRAW_STATUS,
   ADD_DATA,
   UPDATE_DATA
} from '../mutation-types'

const state = {
  	list:[
  	  {"orderId":0,"orderName":"药材","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"大大","orderTime":"2016-09-18","orderLogstatus":"运输中","show":true},
  	  {"orderId":1,"orderName":"人参","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"达达","orderTime":"2016-09-18","orderLogstatus":"运输中","show":true},
  	  {"orderId":2,"orderName":"未完成","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"大大","orderTime":"2016-09-28","orderLogstatus":"运输完成","show":true},
  	  {"orderId":3,"orderName":"已完成","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"规格","orderTime":"2016-09-18","orderLogstatus":"运输中","show":true}
  	],
    clientList:[
        {"clientId":0,"clientName":"孙慧","clientJob":"代理商","clientTel":"13162875213","clientEmail":"sunhuili@163.com"},
        {"clientId":1,"clientName":"小熊","clientJob":"代理商","clientTel":"15738855555","clientEmail":"sunhuili@163.com"},
        {"clientId":2,"clientName":"杨宁","clientJob":"代理商","clientTel":"15698522632","clientEmail":"yangning@163.com"}
    ],
    systemDataList:[
        {"systemDataId":0,"systemDataCode":"022112","systemDataType":"1","systemDescribe":"123456789011","systemStatus":"enene"},
        {"systemDataId":1,"systemDataCode":"1112","systemDataType":"2","systemDescribe":"1234567890","systemStatus":"enene"},
        {"systemDataId":2,"systemDataCode":"34445","systemDataType":"3","systemDescribe":"1234567890","systemStatus":"enene"},
        {"systemDataId":3,"systemDataCode":"45555","systemDataType":"2","systemDescribe":"1234567890","systemStatus":"enene"},
        {"systemDataId":4,"systemDataCode":"4fff5","systemDataType":"5","systemDescribe":"1234567890","systemStatus":"enene"}
    ],
    provinceDataList:[
       {"provinceId":0,"provinceName":"中国","provinceRank":"222","provinceIcon":"1111","provinceIOS":"22222"},
       {"provinceId":1,"provinceName":"上海","provinceRank":"222","provinceIcon":"1111","provinceIOS":"22222"},
       {"provinceId":2,"provinceName":"河南","provinceRank":"222","provinceIcon":"1111","provinceIOS":"22222"}
    ],
    enterpriseList:[
       {"enterpriseId":0,"enterpriseCode":"02212","enterpriseClassify":"1","enterpriseName":"上海冕冠","enterprisePhone":"13162875213","enterpriseContact":"大神","enterpriseIntroduce":"好好好好哄","enterpriseLegal":"卡卡","enterpriseCompany":"来啦","enterpriseRange":"包括很多、很多、、、","enterpriseArea":"上海虹口区","enterpriseAddr":"上海虹口江湾镇","enterpriseRegist":"上海虹口江湾镇","enterpriseDate":"2015-07-07","enterpriseDeadline":"2030-7-7"},
       {"enterpriseId":1,"enterpriseCode":"32143","enterpriseClassify":"15","enterpriseName":"上海冕冠","enterprisePhone":"13162875213","enterpriseContact":"大神","enterpriseIntroduce":"好好好好哄","enterpriseLegal":"卡卡","enterpriseCompany":"来啦","enterpriseRange":"包括很多、很多、、、","enterpriseArea":"上海虹口区","enterpriseAddr":"上海虹口江湾镇","enterpriseRegist":"上海虹口江湾镇","enterpriseDate":"2015-07-07","enterpriseDeadline":"2030-7-7"}
    ],
    componentList:[
         {"componentId":0,"componentName":"人1参","componentOwn":"饮片厂","componentname":"ddd","componentContent":"0.5g","componentUnit":"克","componenttype":"来啦"},
         {"componentId":1,"componentName":"红1茶","componentOwn":"药品厂","componentname":"ffd","componentContent":"0.5g","componentUnit":"克","componenttype":"来啦"}
    ],
    drawList:[
         {"drawId":0,"drawchinese":"明明1","drawenglish":"sunny","drawlatin":"ddd","drawactive":"0.5g","drawratio":"1:6","drawclientName":"法规","drawproduct":"上海","drawspec":"颗","drawprice":"155元/斤"},
         {"drawId":1,"drawchinese":"小小1","drawenglish":"emma","drawlatin":"ddd","drawactive":"0.5g","drawratio":"1:6","drawclientName":"法规","drawproduct":"上海","drawspec":"颗","drawprice":"155元/斤"}
    ]

}

const mutations = {
	  [ORDER_TABLE](state, data) {
        state.list = data.results;
    },
    [CHANGE_SHOW_STATUE](state,id){
        state.list[id].show=!state.list[id].show;
    },
    [CLIENT_INFO](state,data){
        state.clientList = data.results;
    },
    [SYSTEM_DATA](state,data){
         state.systemDataList =data.results.systemDataList;
    },

    [DELETE_SHOW_STATUE](state,id){
        state.systemDataList.splice(id,1);
    },
    [DELETE_COMPANY_STATUS](state,id){
        state.enterpriseList.splice(id,1);
    },
     [DELETE_COMPONENT_STATUS](state,id){
       state.componentList.splice(id,1);
    },
     [DELETE_DRAW_STATUS](state,id){
         state.drawList.splice(id,1);
    },

    [ADD_DATA](state,data){
        state.systemDataList.push({
          "systemDataId":data.systemDataId,
          "systemDataCode":data.systemDataCode,
          "systemDataType":data.systemDataType,
          "systemDescribe":data.systemDescribe,
          "systemStatus":data.systemStatus});
    },

    [UPDATE_DATA](state,data){
       state.systemDataList[data.id].systemDataId=data.systemDataId;
       state.systemDataList[data.id].systemDataCode=data.systemDataCode;
       state.systemDataList[data.id].systemDataType=data.systemDataType;
       state.systemDataList[data.id].systemDescribe=data.systemDescribe;
       state.systemDataList[data.id].systemStatus=data.systemStatus;
    },

    [PROVINCE_DATA](state,data){
         state.provinceDataList =data.results.provinceDataList;
    },
    [SERVICE_COMPONENT](state,data){
         state.componentList = data.results.componentList;
    },
    [SERVICE_ENTERPRISE](state,data){
        state.enterpriseList = data.results.enterpriseList; 
    },
    [SERVICE_DRAW](state,data){
         state.drawList = data.results.drawList;
    }
}

export default {
    state,
    mutations
}
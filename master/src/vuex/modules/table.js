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
   UPDATE_DATA,
   SAVE_COMPANY_DATA,
   UPDATE_ENTER_DATA
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
    enumlist:[
        {"id":0,"code":"022112","type":"1","desc":"123456789011","status":"0"},
        {"id":1,"code":"1112","type":"2","desc":"1234567890","status":"1"},
        {"id":2,"code":"34445","type":"3","desc":"1234567890","status":"0"},
        {"id":3,"code":"45555","type":"2","desc":"1234567890","status":"1"},
        {"id":4,"code":"4fff5","type":"5","desc":"1234567890","status":"1"}
    ],
    locationlist:[
        {"twoNumber":0,"cname":"中国1","level":"2122","icon":"1111","iso":"22222"},
        {"twoNumber":1,"cname":"上海1","level":"222","icon":"1111","iso":"22222"},
        {"twoNumber":2,"cname":"河南1","level":"222","icon":"1111","iso":"22222"}
    ],
    enterpriseList:[
        {"id":0,"number":"00","category":"0ww","name":"上海ee冕冠","tel":"13162875213","legal_person":"卡卡","principal":"来啦","biz_scope":"包括很多、很多、、、","province":"上海虹口区","city":"虹口区","address":"上海虹口江湾镇","release_date":"2015-07-07","due_date":"2018-07-07","show":"true"},
        {"id":1,"number":"11","category":"3243","name":"上海冕冠","tel":"13162875213","legal_person":"卡卡","principal":"来啦","biz_scope":"包括很多、很多、、、","province":"上海虹口区","city":"虹口区","address":"上海虹口江湾镇","release_date":"2015-07-07","due_date":"2018-07-07","show":"true"}   
    ],
    componentList:[
        {"code":0,"name":"人参","company_name":"饮片厂","breed_name":"ddd","quantity":"0.5g","unit":"克","status":"提取物"},
        {"code":1,"name":"红茶","company_name":"药品厂","breed_name":"ffd","quantity":"0.5g","unit":"克","status":"药材"}
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
    [SYSTEM_DATA](state,data){ //枚举类型
         state.enumlist = data;
    },

    [DELETE_SHOW_STATUE](state,id){
        state.enumlist.splice(id,1);
    },
    [DELETE_COMPANY_STATUS](state,id){ //企业删除
        state.enterpriseList.splice(id,1);
    },
     [DELETE_COMPONENT_STATUS](state,id){ //成分删除
       state.componentList.splice(id,1);
    },
     [DELETE_DRAW_STATUS](state,id){
         state.drawList.splice(id,1);
    },

    [ADD_DATA](state,data){
        state.enumlist.push({
          "id":data.id,
          "code":data.code,
          "type":data.type,
          "desc":data.desc,
          "status":data.status
        });
    },

    [SAVE_COMPANY_DATA](state,data){
          state.enterpriseList.push({
              'number': data.number,
              'category':data.category,
              'name': data.name,
              'tel': data.tel,
              'legal_person': data.legal_person,
              'principal': data.principal,
              'biz_scope': data.biz_scope,
              'province': data.province,
              'city': data.city,
              'address':data.address,
              'release_date': data.release_date,
              'due_date': data.due_date
          })
    },

    [UPDATE_DATA](state,data){
       state.enumlist[data.id].id=data.id;
       state.enumlist[data.id].code=data.code;
       state.enumlist[data.id].type=data.type;
       state.enumlist[data.id].desc=data.desc;
       state.enumlist[data.id].status=data.status;
    },

    [UPDATE_ENTER_DATA](state,data){
        state.enterpriseList[data.id].number=data.number;
        state.enterpriseList[data.id].category=data.category;
        state.enterpriseList[data.id].name=data.name;
        state.enterpriseList[data.id].tel=data.tel;
        state.enterpriseList[data.id].legalPerson=data.legalPerson;
        state.enterpriseList[data.id].principal=data.principal;
        state.enterpriseList[data.id].bizScope=data.bizScope;
        state.enterpriseList[data.id].province=data.number;
        state.enterpriseList[data.id].city=data.city;
        state.enterpriseList[data.id].address=data.address;
        state.enterpriseList[data.id].ctime=data.ctime;
        state.enterpriseList[data.id].utime=data.utime;
    },
 
    [PROVINCE_DATA](state,data){   //省市区
         state.locationlist = data;
    },
    [SERVICE_COMPONENT](state,data){  //成分
         state.componentList = data;
    },
    [SERVICE_ENTERPRISE](state,data){  //企业
        state.enterpriseList = data; 
    },
    [SERVICE_DRAW](state,data){  //提取物
         state.drawList = data;
    }
}

export default {
    state,
    mutations
}
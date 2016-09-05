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
   ADD_DATA,
   UPDATE_DATA,
   UPDATE_ENTER_DATA,
   BREED_DATA,
   ADD_BREED_DATA,
   DELETE_BREED_DATA,
   CATEGORY_DATA,
   UPDATE_BREED_DATA,
   SPEC_DATA,
   LOCAL_DATA
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
        {"id":1,"number":"11","category":"3243","name":"上海冕冠","tel":"13162875213","legal_person":"卡卡","principal":"来啦","biz_scope":"包括很多、很多、、、","province":"上海虹口区","city":"虹口区","address":"上海虹口江湾镇","release_date":"2015-07-07","due_date":"2018-07-07","show":"false"}   
    ],
    componentList:[
        {"code":0,"name":"人参","company_name":"饮片厂","breed_name":"ddd","quantity":"0.5g","unit":"克","status":"提取物"},
        {"code":1,"name":"红茶","company_name":"药品厂","breed_name":"ffd","quantity":"0.5g","unit":"克","status":"药材"}
    ],
    drawList:[
         {"drawId":0,"drawchinese":"明明1","drawenglish":"sunny","drawlatin":"ddd","drawactive":"0.5g","drawratio":"1:6","drawclientName":"法规","drawproduct":"上海","drawspec":"颗","drawprice":"155元/斤"},
         {"drawId":1,"drawchinese":"小小1","drawenglish":"emma","drawlatin":"ddd","drawactive":"0.5g","drawratio":"1:6","drawclientName":"法规","drawproduct":"上海","drawspec":"颗","drawprice":"155元/斤"}
    ],
    breedList:[
         {"category_id":0,"code":"111","name":"人参","icon":"dddd","show":"true"},
         {"category_id":1,"code":"222","name":"蓝蝴蝶","icon":"ddd","show":"true"}
    ],
    categoryList:[
          {"code":"0","name":"全草类","show":"true"},
          {"code":"0","name":"花类","show":"true"}
    ],
    specList:[
          {"breed_id":"0","name":"块","show":"true"},
          {"breed_id":"0","name":"颗","show":"false"}
    ],
    localList:[
        {"breed_id":"0","name":"云南","show":"true"},
        {"breed_id":"0","name":"昆明","show":"false"}
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

    [ADD_DATA](state,data){ // 新增枚举
        state.enumlist.push({
          "name":data.name,
          "code":data.code,
          "type":data.type,
          "desc":data.desc,
          "status":data.status
        });
    },

    [UPDATE_DATA](state,data){   //枚举修改
       state.enumlist[data.sub].id=data.id;
       state.enumlist[data.sub].name=data.name;
       state.enumlist[data.sub].code=data.code;
       state.enumlist[data.sub].type=data.type;
       state.enumlist[data.sub].desc=data.desc;
       state.enumlist[data.sub].status=data.status;
    },
    [DELETE_SHOW_STATUE](state,id){   //删除枚举
       state.enumlist.splice(id,1);
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
    },
    [BREED_DATA](state,data){  //药材
       state.breedList = data;
    },

    [ADD_BREED_DATA](state,data){ //新增药材
       state.breedList.push({
          "code":data.code,
          "name":data.name,
          "icon":data.icon,
          "categoryId":data.id
       })
    }, 

    [DELETE_BREED_DATA](state,id){ //删除药材信息
         state.breedList.splice(id,1);
    },

    [CATEGORY_DATA](state,data){  //品种显示
        state.categoryList = data;
    },

    [UPDATE_BREED_DATA](state,data){  //修改药材
        state.breedList[data.sub].code=data.code;
        state.breedList[data.sub].categoryId=data.categoryId;
        state.breedList[data.sub].name=data.name;
        state.breedList[data.sub].id=data.id;
    },
    [SPEC_DATA](state,data){  // 获取规格
        state.specList = data;
    },
    [LOCAL_DATA](state,data){  //获取产地
        state.localList = data;
    }
}

export default {
    state,
    mutations
}
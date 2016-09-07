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
   DELETE_SPECS_DATA,
   CATEGORY_DATA,
   UPDATE_BREED_DATA,
   ADDSPEC_DATA,
   BREED_DETAIL_DATA,
   SERVICE_ENTERPRISE_DETAIL,
   ADD_CONTACT_DATA,
   UPDATE_SPEC_DATA,
   DELETE_CONTACT_DATA,
   UPDATE_CONTACT_DATA
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
    systemBaseList:{
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
    },
    basicBaseList:{
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
          ]
    },
  
    breedDetail:{
          "code": "232去",
          "icon": "http://p.ayxbk.com/images/thumb/4/4f/Bkg32.jpg/220px-Bkg32.jpg",
          "units": {arr:[],
              show:false
            },
          "langues": {arr:[],show:false},
          "specs":{
            arr:[
                  {"id": 630,"breedId": 1001,"name": "统1个","show":"true"},
                  {"id": 631,"breedId": 1001,"name": "段11","show":"true"}
                  ],
            show:true      
              },
          "name":"花类",
          "alias": {arr:[],show:false},
          "id": 1001,
          "categoryId": 810,
          "show":true,
          "locals":{ 
            arr:[
                  {"id": 1,"breedId": 1001,"name": "云南","show":"true"},
                  {"id": 2,"breedId": 1001,"name": "广东","show":"true"}
              ],
            show:false
          },
    },
    companyDetail:{
        "id": "11",
        "type": "AAA",
        "name": "芜湖市八方炒货食品有限公司",
        "number": "SC11834022105055",
        "category": null,
        "legalPerson": "徐先华",
        "principal": "徐先华",
        "bizScope": "炒货食品及坚果制品",
        "website": null,
        "tel": null,
        "email": null,
        "province": "安徽省",
        "city": "芜湖市",
        "address": "安徽省芜湖市芜湖县陶辛镇保沙三官村(芜湖凯鑫新型材料有限公司内)",
        "utime": "2016-08-26 18:43",
        "ctime": "2016-08-26 18:43",
        "companyLicenses": null,
        "companyProducts": [],
        "companyContacts": {
            arr:[
                {"id": 1,"cid":11,"name":"dnjdj","tel": "13162878512","show":"true"},
                {"id": 2,"cid":11,"name":"dnjdj","tel": "13162847511","show":"true"}
            ],
            show:true
       }
    }
}

const mutations = {
	  [ORDER_TABLE](state, data) {
        state.list = data.results;
    },
    [CLIENT_INFO](state,data){
        state.clientList = data.results;
    },
    [SYSTEM_DATA](state,data){ //枚举类型
         state.systemBaseList.enumlist = data;
    }, 
    [PROVINCE_DATA](state,data){   //省市区
         state.systemBaseList.locationlist = data;
    },
    [DELETE_SHOW_STATUE](state,id){   //删除枚举
         state.systemBaseList.enumlist.splice(id,1);
    },
    [ADD_DATA](state,data){ // 新增枚举
        state.systemBaseList.enumlist.unshift({
          "name":data.name,
          "code":data.code,
          "type":data.type,
          "desc":data.desc,
          "status":data.status,
          "show":false
        });
    },

    [UPDATE_DATA](state,data){   //枚举修改
       state.systemBaseList.enumlist[data.sub].id=data.id;
       state.systemBaseList.enumlist[data.sub].name=data.name;
       state.systemBaseList.enumlist[data.sub].code=data.code;
       state.systemBaseList.enumlist[data.sub].type=data.type;
       state.systemBaseList.enumlist[data.sub].desc=data.desc;
       state.systemBaseList.enumlist[data.sub].status=data.status;
    },
   
   
    [SERVICE_COMPONENT](state,data){  //成分
         state.basicBaseList.componentList = data;
    },
    [SERVICE_ENTERPRISE](state,data){  //企业
        state.basicBaseList.enterpriseList = data; 
    },
    [SERVICE_DRAW](state,data){  //提取物
        state.basicBaseList.drawList = data;
    },
    [BREED_DATA](state,data){  //药材
       state.basicBaseList.breedList = data;
    },

    [BREED_DETAIL_DATA](state,data){
        state.breedDetail=data;
    },

    [ADD_BREED_DATA](state,data){ //新增药材
       state.basicBaseList.breedList.unshift({
          "code":data.code,
          "name":data.name,
          "categoryId":data.selected,
          "show":false
       })
    }, 
    [ADD_CONTACT_DATA](state,data){ //新增企业联系人
        state.companyDetail.companyContacts.arr.unshift({
           "name":data.name,
            "cid":data.id,
            "tel":data.tel,
            "phone":data.phone,
            "wechart":data.wechart,
            "email":data.email,
            "qq":data.qq,
            "show":false
        })
    },
    [UPDATE_CONTACT_DATA](state,data){
        state.companyDetail[data.key].arr[data.sub].cid=data.cid;
        state.companyDetail[data.key].arr[data.sub].name=data.name;
        state.companyDetail[data.key].arr[data.sub].phone=data.phone;
        state.companyDetail[data.key].arr[data.sub].email=data.email;
        state.companyDetail[data.key].arr[data.sub].wechart=data.wechart;
    },

    [DELETE_CONTACT_DATA](state,id){ //删除企业联系人
        state.companyDetail.companyContacts.arr.splice(id,1);
    },

    [DELETE_BREED_DATA](state,id){ //删除药材信息
         state.basicBaseList.breedList.splice(id,1);
    },

    [DELETE_SPECS_DATA](state,data){ //删除药材相关信息
        /*state.breedDetail[data.key].arr.splice(data.id,1);*/
        state.breedDetail[data.key].arr.$remove(data.id);
    },

    [CATEGORY_DATA](state,data){  //品种显示
        state.basicBaseList.categoryList = data;
    },

    [UPDATE_BREED_DATA](state,data){  //修改药材
        state.basicBaseList.breedList[data.sub].code=data.code;
        state.basicBaseList.breedList[data.sub].categoryId=data.categoryId;
        state.basicBaseList.breedList[data.sub].name=data.name;
        state.basicBaseList.breedList[data.sub].id=data.id;
    },

    [UPDATE_SPEC_DATA](state,data){  //修改药材相关信息
        state.breedDetail[data.key].arr[data.sub].breedId=data.breedId;
        state.breedDetail[data.key].arr[data.sub].name=data.name;
        state.breedDetail[data.key].arr[data.sub].alias=data.name;
        state.breedDetail[data.key].arr[data.sub].id=data.id;
    },

    [ADDSPEC_DATA](state,data){  // 获取breedDetail常用规格
        state.breedDetail[data.key].arr.push({
          "name":data.name,
          "breedId":data.id,
          "show":false,
          "alias":data.name
        })
    },
    [SERVICE_ENTERPRISE_DETAIL](state,data){
      state.companyDetail = data;
    }

}

export default {
    state,
    mutations
}
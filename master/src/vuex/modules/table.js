import {
   ORDER_TABLE,
   CHANGE_SHOW_STATUE,
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
   UPDATE_CONTACT_DATA,
   DRUG_DETAIL_DATA,
   CUSTOMER_DATA,
   CUSTOMER_DETAIL_DATA
} from '../mutation-types'

const state = {
  	list:[
  	  {"orderId":0,"orderName":"药材","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"大大","orderTime":"2016-09-18","orderLogstatus":"运输中","show":true},
  	  {"orderId":1,"orderName":"人参","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"达达","orderTime":"2016-09-18","orderLogstatus":"运输中","show":true},
  	  {"orderId":2,"orderName":"未完成","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"大大","orderTime":"2016-09-28","orderLogstatus":"运输完成","show":true},
  	  {"orderId":3,"orderName":"已完成","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"规格","orderTime":"2016-09-18","orderLogstatus":"运输中","show":true}
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
          ],
          drugList:[
            {"id": 176311,"number": "国药准字Z20093164","name": "麝香祛痛搽剂","nameEn": "","product": "","agentType": "搽剂", "spec": "每瓶装60ml","company": "远大医药黄石飞云制药有限公司","address": "湖北省黄石市鄂黄路52号","drugType": "中药","numberOld": "","approveDate": "2014-03-03 00:00","code": "86901890001064", "linkDb": "药品广告 中药保护品种库","ctime": "2016-09-02 16:52","show":"true"},
            {"id": 176312,"number": "国药准字Z20093165","name": "麝香祛痛搽剂","nameEn": "","product": "","agentType": "搽剂", "spec": "每瓶装60ml","company": "浙江景岳堂药业有限公司","address": "湖北省黄石市鄂黄路52号","drugType": "中药","numberOld": "","approveDate": "2014-03-03 00:00","code": "86901890001064", "linkDb": "药品广告 中药保护品种库","ctime": "2016-09-02 16:52","show":"true"}
         ],
         customerList:[
            {"id":0,"type":0,"name":"ddd","category":"14555","principal":"suny","biz_scope":"djkdfd","tel":"13162875213","email":"大大","province":"上海市","city":"虹口","address":"上海市虹口区","employee_id":"AAA","credit_level":"AAA","show":true},
            {"id":1,"type":0,"name":"ddf","category":"14frff555","principal":"suny","biz_scope":"djkdfd","tel":"13162875213","email":"大大","province":"上海市","city":"虹口","address":"上海市虹口区","employee_id":"AAA","credit_level":"AAA","show":false},
            {"id":2,"type":1,"name":"ggg","category":"gvgg","principal":"suny","biz_scope":"djkdfd","tel":"13162875213","email":"大大","province":"上海市","city":"虹口","address":"上海市虹口区","employee_id":"AAA","credit_level":"AAA","show":false}
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
    },
    clientDetail:{
        "type": "0",
        "name":"sunny",
        "category":22,
        "principal":"sunny",
        "id": 1001,
        "biz_scope":"好好好好哈哈",
        "tel":"13162875213",
        "email":"165256@163.com",
        "province":"上海",
        "city":"虹口",
        "address":"上海空口区",
        "credit_level":"AAA",
        "employee_id": 11,
        "show":true,
        "contact": {
            arr:[],
            show:false
          },
        "chance": {
            arr:[],
            show:false
         },
        "orders":{
          arr:[],
          show:true      
            },        
        "contract": {arr:[],show:false}, 
        "files":{ 
          arr:[
                {"id": 1,"breedId": 1001,"name": "云南","show":"true"},
                {"id": 2,"breedId": 1001,"name": "广东","show":"true"}
            ],
           show:false
         },
         "track": {arr:[],show:false},
         "remark": {arr:[],show:false},
         "addr": {arr:[],show:false},
         "label": {arr:[],show:false}
    }
}

const mutations = {
	  [ORDER_TABLE](state, data) {
        state.list = data.results;
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
        state.breedDetail[data.key].arr.$remove(data.id);
       /* state.breedDetail[data.key].arr.length-1;*/
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

    [ADDSPEC_DATA](state,data){  // 添加药材相关信息
        state.breedDetail[data.key].arr.push({
          "name":data.name,
          "breedId":data.id,
          "show":false,
          "alias":data.name
        })
    },
    [SERVICE_ENTERPRISE_DETAIL](state,data){  //企业详情
      state.companyDetail = data;
    },

    [DRUG_DETAIL_DATA](state,data){   //成分详情
      state.basicBaseList.drugList = data;
    },
    [CUSTOMER_DATA](state, data) {  //客户列表
         state.basicBaseList.customerList = data;
    },
    [CUSTOMER_DETAIL_DATA](state,data){ //客户详情
        state.clientDetail = data;
    },

    [CUSTOMER_DATA](state,data){ //新增客户
        state.basicBaseList.customerList.unshift({
           "name":data.name,
            "type":data.type,
            "tel":data.tel,
            "category":data.category,
            "email":data.email,
            "principal":data.principal,
            "biz_scope":data.biz_scope,
            "province":data.province,
            "city":data.city,
            "address":data.address,
            "employee_id":data.employee_id,
            "credit_level":data.credit_level,
            "show":false
        })
    },
    [CUSTOMER_DATA](state,data){ //删除客户信息
        state.basicBaseList[data.key].$remove(data.id);
    },
    [CUSTOMER_DATA](state,data){  //修改客户列表信息
      console.log(state.basicBaseList[data.key])
        state.basicBaseList[data.key].breedId=data.breedId;
        state.basicBaseList[data.key].name=data.name;
        state.basicBaseList[data.key].alias=data.name;
        state.basicBaseList[data.key].id=data.id;
    }
}

export default {
    state,
    mutations
}
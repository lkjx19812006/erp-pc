
import {
   LOGIN_DATA,
   ORDER_TABLE,
   ORDER_ADD_DATA,
   ORDER_DETAIL_DATA,
   ORDER_UPDATE_DATA,
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
   CUSTOMER_ADD_DATA,
   CUSTOMER_DETAIL_DATA,
   CUSTOMER_BATCH_DELETE,
   UPDATE_CUSTOMER_DETAIL,
   CUSTOMER_UPDATE_DATA,
   UPDATE_ADDR_DETAIL,
   ADD_ADDR_DETAIL,
   LABEL_DATA,
   CUSTOMER_CONTACT_DATA,
   ADD_LABEL_DATA,
   UPDATE_LABEL_DETAIL,
   ADD_PRODUCT_DATA,
   UPDATE_PRODUCT_DATA,
   EMPLOYEE_DATA,
   CHANCE_LIST_DATA,
   USER_DATA,
   UPDATE_USER_DATA,
   BATCH_UPDATE_USER_DATA,
   BATCH_USER_INTENTION_AUDIT,
   ORG_DATA,
   ROLE_DATA,
   QUICK_EDIT,
   FILE_DATA,
   USER_DETAIL_DATA,
   ADD_EMPLOYEE_DATA,
   UPDATE_EMPLOY_DATA,
   IDENTIFY_DATA,
   UPDATE_TRACKING_DATA,
   ADD_TRACKING_DATA,
   INTENTION_LIST_DATA,
   SUPPLY_DEMAND_DATA,
   INTENTION_DETAIL_DATA,
   OFFER_LIST_DATA,
   MSG_LIST_DATA,
   MSG_UPDATE_DATA,
   UPDATA_INTENTION_DATA,
   INTENTION_DATA,
   INTENTION_UP_DOWN,
   INTENTION_OFFER_DETAIL,
   PROVINCE_LIST,
   COUNTRY_LIST,
   CITY_LIST,
   DISTRICT_LIST,
   ADD_FILES_DATA,
   ADD_CERTIFICATE_DATA,
   ALTER_PRODUCT_DATA,
   SUPPLY_PRODUCT_DATA,
   PRODUCT_DATA,
   PRODUCT_DETAIL_DATA,
   FILES_DATA_LIST,
   CUSTOMER_TRANSFER,
   ORDER_STATUS,
   EXPRESS_DATA,
   ORDER_UPLOAD_DATA,
   ORDER_PAY_DATA,
   ORDER_ROLLOUT_DATA,
   EXPRESS_DETAIL_DATA

} from '../mutation-types'




var base64DecodeChars = new Array(
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
      break;

    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
      break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if(c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
      break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if(c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}



function uncompile(code){
  var test=base64decode(code);
  test=unescape(test);
  return test;

}


function getCookie(name){          //获取cookie
  var search = name + "=" ;
  var offset = document.cookie.indexOf(search);
  if(offset==-1){     //cookie中不存在这个变量
    return '';
  }else{
    offset += search.length;
    var end = document.cookie.indexOf(";", offset);
    if(end == -1) {
      end = document.cookie.length;
    }
    return(document.cookie.substring(offset, end));
  }
}



const state = {
    login:{
        "id":uncompile(getCookie('id')),
        "name":uncompile(getCookie('name')),
        "no":uncompile(getCookie('no')),
        "orgId":uncompile(getCookie('orgId')),
        "time":getCookie('time')
    },
    systemBaseList: {
        enumlist: [
            { "id": 0, "code": "022112", "type": "1", "desc": "123456789011", "status": "0" },
            { "id": 1, "code": "1112", "type": "2", "desc": "1234567890", "status": "1" },
            { "id": 2, "code": "34445", "type": "3", "desc": "1234567890", "status": "0" },
            { "id": 3, "code": "45555", "type": "2", "desc": "1234567890", "status": "1" },
            { "id": 4, "code": "4fff5", "type": "5", "desc": "1234567890", "status": "1" }
        ],
        countryList: [],
        cityList:[],
        districtList:[],
        locationlist: [
            { "twoNumber": 0, "cname": "中国1", "level": "2122", "icon": "1111", "iso": "22222" },
            { "twoNumber": 1, "cname": "上海1", "level": "222", "icon": "1111", "iso": "22222" },
            { "twoNumber": 2, "cname": "河南1", "level": "222", "icon": "1111", "iso": "22222" }
        ],
    },

    label:{
        auditLabel: [
            {"text":"文本1"}
        ]
    } ,

    basicBaseList: {
        orderList: [{"id":"5726ea3bf22125bcdcff7820","type":0,"sample":0,"intl":0,"sourceType":1,"link":"1234567890",
                "customer":null,"user":null,"amount":200.000000,"incidentals":0.000000,"incidentalsDesc":null,
                "preferential":0.000000,"preferentialDesc":null,"total":200.000000,"currency":0,"lcompanyId":null,
                "lcompanyName":null,"logisticsNo":null,"consignee":"测试","consigneePhone":"18505565316","zipCode":"000000",
                "country":"7","province":null,"city":null,"district":null,"employee":null,"orderStatus":0,"status":1,"visit":0,
                "pay":0,"ptime":null,"payWay":null,"invoice":0,"logistics":0,"stime":null,"consigneeAddr":"北京,北京,西城区 阿伦",
                "no":"20160502134843429001","clients":0,"cancleCauses":null,"comments":"快点，急用","ftime":null,"updater":null,
                "utime":"2016-09-13 14:32","creater":"b11741af0efc49ed815545c0d88ddc98","ctime":"2016-05-02 13:48","goods":null,
                "payPics":null,"sendPics":null}],
        enterpriseList: [
            { "id": 0, "number": "00", "category": "0ww", "name": "上海ee冕冠", "tel": "13162875213", "legal_person": "卡卡", "principal": "来啦", "biz_scope": "包括很多、很多、、、", "province": "上海虹口区", "city": "虹口区", "address": "上海虹口江湾镇", "release_date": "2015-07-07", "due_date": "2018-07-07", "show": "true" },
            { "id": 1, "number": "11", "category": "3243", "name": "上海冕冠", "tel": "13162875213", "legal_person": "卡卡", "principal": "来啦", "biz_scope": "包括很多、很多、、、", "province": "上海虹口区", "city": "虹口区", "address": "上海虹口江湾镇", "release_date": "2015-07-07", "due_date": "2018-07-07", "show": "false" }
        ],
        componentList: [
            { "code": 0, "name": "人参", "company_name": "饮片厂", "breed_name": "ddd", "quantity": "0.5g", "unit": "克", "status": "提取物" },
            { "code": 1, "name": "红茶", "company_name": "药品厂", "breed_name": "ffd", "quantity": "0.5g", "unit": "克", "status": "药材" }
        ],
        drawList: [
            { "drawId": 0, "drawchinese": "明明1", "drawenglish": "sunny", "drawlatin": "ddd", "drawactive": "0.5g", "drawratio": "1:6", "drawclientName": "法规", "drawproduct": "上海", "drawspec": "颗", "drawprice": "155元/斤" },
            { "drawId": 1, "drawchinese": "小小1", "drawenglish": "emma", "drawlatin": "ddd", "drawactive": "0.5g", "drawratio": "1:6", "drawclientName": "法规", "drawproduct": "上海", "drawspec": "颗", "drawprice": "155元/斤" }
        ],
        breedList: [
            { "category_id": 0, "code": "111", "name": "人参", "icon": "dddd", "show": "true" },
            { "category_id": 1, "code": "222", "name": "蓝蝴蝶", "icon": "ddd", "show": "true" }
        ],
        categoryList: [
            { "code": "0", "name": "全草类", "show": "true" },
            { "code": "0", "name": "花类", "show": "true" }
        ],
        drugList:{
            arr:[
                { "id": 176311, "number": "国药准字Z20093164", "name": "麝香祛痛搽剂", "nameEn": "", "product": "", "agentType": "搽剂", "spec": "每瓶装60ml", "company": "远大医药黄石飞云制药有限公司", "address": "湖北省黄石市鄂黄路52号", "drugType": "中药", "numberOld": "", "approveDate": "2014-03-03 00:00", "code": "86901890001064", "linkDb": "药品广告 中药保护品种库", "ctime": "2016-09-02 16:52", "show": true },
                { "id": 176312, "number": "国药准字Z20093165", "name": "麝香祛痛搽剂", "nameEn": "", "product": "", "agentType": "搽剂", "spec": "每瓶装60ml", "company": "浙江景岳堂药业有限公司", "address": "湖北省黄石市鄂黄路52号", "drugType": "中药", "numberOld": "", "approveDate": "2014-03-03 00:00", "code": "86901890001064", "linkDb": "药品广告 中药保护品种库", "ctime": "2016-09-02 16:52", "show": true }
            ],
            show: true
        },
        customerList: [
            { "id": 0, "type": 0,"typeDesc": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false },
            { "id": 1, "type": 0,"typeDesc": 0, "name": "ddf", "category": "14frff555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": false, "checked": false },
            { "id": 2, "type": 1, "typeDesc": 0,"name": "ggg", "category": "gvgg", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": false, "checked": false }
        ],
        productList:[
             {"id": "442","cid": 1,"type": "1","name": "1111","breedId": 1111,"quality": "1111","location": "111","spec": "干","number": 1111,"price": 11,"unit": "1111","duedate": "2016-10-23 00:00","coa": 0,"comments": null,"status": 1,"show":true}
        ],
        intentionList: [
            { "id": "1201608221917540470","customerId": "29565","customerName": "段飞","customerPhone": "15871287716","type": 1,"especial": 1,"breedId": 1174,"breedName": "艾叶","location": "湖北","spec": "全叶","unit": "63","province": "湖北","city": "孝感","district": "大悟县","address": "城区","invoic": 0,"visit": 0,"pack": "机压包","intl": 0,"country": "中国","offerTotal": 0,"status": 1, "show": true }

        ],
        supplyDemandList: [
            { "id": "1201608221917540470","customerId": "29565","customerName": "段飞","customerPhone": "15871287716","type": 1,"especial": 1,"breedId": 1174,"breedName": "艾叶","location": "湖北","spec": "全叶","unit": "63","province": "湖北","city": "孝感","district": "大悟县","address": "城区","invoic": 0,"visit": 0,"pack": "机压包","intl": 0,"country": "中国","offerTotal": 0,"status": 1, "show": true }

        ],
        offerList:[
            {"id":"163","intentionId":"57568d24a2ec516dc1d0f57c","userId":"3ed2a1d7dafe449eb5e631a46f20f713","customerId":null,"number":3000,"unit":"63","price":12.000000,"incidentals":1.000000,"incidentalsDesc":"含运费价格","total":36000.000000,"qualification":null,"quality":null,"location":null,"spec":null,"advance":null,"invoic":null,"visit":null,"pack":null,"sampling":null,"sampleNumber":null,"sampleUnit":null,"sampleAmount":null,"address":null,"comments":null,"otime":"2016-06-07 17:19","clients":null,"status":1,"description":"","updater":null,"utime":"2016-09-27 10:08","creater":null,"ctime":"2016-09-27 10:08"},
            {"id":"184","intentionId":"575d3527a2ec789e03ce62f1","userId":"6496e96c50774ca5a311ab02eb3f873e","customerId":null,"number":200,"unit":"63","price":30.000000,"incidentals":200.000000,"incidentalsDesc":"因为需要运费…","total":6000.000000,"qualification":null,"quality":null,"location":null,"spec":null,"advance":null,"invoic":null,"visit":null,"pack":null,"sampling":null,"sampleNumber":null,"sampleUnit":null,"sampleAmount":null,"address":null,"comments":null,"otime":"2016-06-12 18:20","clients":null,"status":1,"description":"","updater":null,"utime":"2016-09-27 10:08","creater":null,"ctime":"2016-09-27 10:08"}
        ],
        msgList:[
            {"id":1508,"intentionId":"f0d082de37ba4230880fe5ff06b0f647","userId":"b11741af0efc49ed815545c0d88ddc98","phone":null,"comments":"asdadasdasdadasd","reserve":null,"status":1,"ctime":"2016-09-01 17:53","reply":null,"replier":null,"rtime":null,"updater":null,"utime":null,"creater":null}
        ],
        intentionDetail:
            {"id":"1008","chanceId":"","userId":"","customerId":"36485","customerName":"刘振领","customerPhone":"17756736988","type":1,"especial":1,"breedId":2246,"breedName":"红枣","qualification":null,"quality":"各种规格，保证质量，量大从优","location":"新疆","spec":"选货","number":10000,"numberDesc":"","price":null,"origPrice":null,"priceDesc":"","unit":"63","province":null,"city":null,"district":null,"address":"安徽","pubdate":null,"duedate":null,"advance":0.000000,"invoic":0,"visit":0,"pack":null,"intl":0,"country":"中国","sampling":0,"cFlagsPath":"","sampleNumber":0,"sampleUnit":null,"sampleAmount":null,"onSell":3,"shelveTime":"2016-06-17 17:23","unshelveTime":null,"employee":null,"offer":0,"offerFalse":0,"offerNumber":0,"offerVprice":null,"offerTotal":0.000000,"status":1,"validate":1,"description":"买包子","updater":"100014","utime":"2016-07-12 19:38","creater":"100014","ctime":"2016-06-17 17:22",
              "pics":[],"ids":null,"images":null,"offers":{arr:[],show:false},"msgs":{arr:[],show:false}},
        employeeList: [{
            "id": 6,
            "name": "lm",
            "no": "001",
            "orgName": "冕冠电子商务有限公司",
            "orgId": 1,
            "orgCode": "1",
            "level": "1",
            "extNo": "123456",
            "qq": "38917306",
            "wechat": "38917306@qq.com",
            "email": "38917306@qq.com",
            "position": "软件工程师",
            "isManager": 1,
            "status": 1,
            "ename": "john",
            "role": "管理员",
            "show": true
        }],
        orgList: [{ "id": 1, "name": "冕冠电子商务有限公司", "level": null, "pid": 0, "status": 1, "utime": null, "ctime": null, "creater": null, "updater": null, "code": "0001", "show": true }],
        roleList: [{"id":2,"cname":"系统管理员000","remark":"具有管理员权限","sortnum":null,"menus":"16,14,13,12,28,27,26,25,11,24,23,9,22,21,8,7,3,2,18,1","updater":null,"utime":null,"creater":null,"ctime":null,"status":null}],
        userList: [{
            "id": "0008fcc6c2d549888afb2e950e6343c1","type": 0,"password": "56bf5523459ce2dfc6720798d852d6e6",
            "nickname": "卖蘑菇的小姑凉", "fullname": "沈威峰","phone": "13851379713","email": "857714234@qq.com","qq": "857714234",
            "company": "个体种植户","score": 300,"source": 1,"status": 0,"userIds": null,"customerId": null,"main": null,"show": true
        }],
        filesList:[{
            "id": 2617,"fileType": "image","bizType": "customer_license","bizId": "57f8817888e8bb85da01df7b","path": "/photos/order_photos_other/57f8815a88e8bb85da01df7a.jpg","description": null,"status": 1,"category": 0,"show":true
        }],
        expressList:[{
            "id": 2,"name": "韵达快运","code": "yunda","codeAick": "yunda","status": 1,"show":true
        }],
        orderPayList:[{
             "id": "580ebddddeb2e33b1ffb9495","payWay":"3","orderId":"57f88e6288e8bb85da01df9b","orderNo": "11111","payFee":"0"
        }]

    },

    orderDetail: {"id":"5726ea3bf22125bcdcff7820","type":0,"sample":0,"intl":0,"sourceType":1,"link":"1234567890",
                  "customer":null,"user":null,"amount":200.000000,"incidentals":0.000000,"incidentalsDesc":null,
                  "preferential":0.000000,"preferentialDesc":null,"total":200.000000,"currency":0,"lcompanyId":null,
                  "lcompanyName":null,"logisticsNo":null,"consignee":"韦军军","consigneePhone":"18505565316","zipCode":"000000",
                  "country":"7","province":null,"city":null,"district":null,"employee":null,"orderStatus":0,"status":1,"visit":0,
                  "pay":0,"ptime":null,"payWay":null,"invoice":0,"logistics":0,"stime":null,"consigneeAddr":"北京,北京,西城区 阿伦",
                  "no":"20160502134843429001","clients":0,"cancleCauses":null,"comments":null,"ftime":null,"updater":null,
                  "utime":"2016-09-13 14:32","creater":"b11741af0efc49ed815545c0d88ddc98","ctime":"2016-05-02 13:48",
                  "goods":[{"id":"5726ea3bf22125bcdcff7821","orderId":"5726ea3bf22125bcdcff7820","sourceType":1,"sourceId":"23",
                  "title":null,"breedId":1007,"brredName":null,"quality":null,"location":"上海","spec":"干货","price":100.000000,
                  "unit":"公斤","address":null,"pubdate":null,"duedate":null,"advance":1.000000,"invoic":null,"visit":0,"pack":null,
                  "image":"/productPic/20160502/q5c6xa7.jpg","description":null,"number":2,"amount":200.000000,"updater":null,
                  "utime":"2016-09-13 14:32","creater":"b11741af0efc49ed815545c0d88ddc98","ctime":"2016-05-02 13:48"}],"payPics": {arr: [],show: false},"sendPics":{arr: [],show: false},"attachFiles":{arr: [],show: false}},

    locationList:{
        provinceList: [
            {"id": 248,"pid": 7, "path": ",1,7,248,","level": 3,"cname": "天津", "nameEn": "Tianjin","namePy": null, "code": "12","twoNumber": null,"number": null,"iso": null,"sortnum": 248, "show": true }
        ]
    },
    breedDetail: {
        "code": "232去",
        "icon": "http://p.ayxbk.com/images/thumb/4/4f/Bkg32.jpg/220px-Bkg32.jpg",
        "units": {
            arr: [],
            show: false
        },
        "langues": { arr: [], show: false },
        "specs": {
            arr: [
                { "id": 630, "breedId": 1001, "name": "统1个", "show": "true" },
                { "id": 631, "breedId": 1001, "name": "段11", "show": "true" }
            ],
            show: true
        },
        "name": "花类",
        "alias": { arr: [], show: false },
        "id": 1001,
        "categoryId": 810,
        "show": true,
        "locals": {
            arr: [
                { "id": 1, "breedId": 1001, "name": "云南", "show": "true" },
                { "id": 2, "breedId": 1001, "name": "广东", "show": "true" }
            ],
            show: false
        }
    },
    companyDetail: {
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
        "companyLicenses": {
            arr: [],
            show: true
        },
        "companyProducts": {
            arr: [],
            show: true
        },
        "companyContacts": {
            arr: [
                { "id": 1, "cid": 11, "name": "dnjdj", "tel": "13162878512", "show": "true" },
                { "id": 2, "cid": 11, "name": "dnjdj", "tel": "13162847511", "show": "true" }
            ],
            show: true
        }
    },
    clientDetail: {
        "type": "0",
        "name": "sunny",
        "category": 22,
        "principal": "sunny",
        "id": 1001,
        "biz_scope": "好好好好哈哈",
        "tel": "13162875213",
        "email": "165256@163.com",
        "province": "上海",
        "city": "虹口",
        "address": "上海空口区",
        "credit_level": "AAA",
        "employee_id": 11,
        "show": true,
        "contacts": {
            arr: [
                { "id": 1, "customer_id": 1, "name": "sunny", "position": "业务员", "department": "业务部", "phone": "13162875213", "tel": "0215555555", "email": "54621641655@163.com", "main": 0, "wechart": "1564642663", "qq": "154851192", "show": "true" }
            ],
            show: false
        },
        "chance": {
            arr: [],
            show: false
        },
        "intentions": { arr: [], show: false },
        "products": { arr: [], show: false },
        "files": {
            arr: [
                { "id": 1, "breedId": 1001, "name": "云南", "show": "true" }
            ],
            show: false
        },
        "trackings": { arr: [], show: false },
        "remarks": {
            arr: [
                { "id": 0, "customerId": 10, "remark": "dfhidfhi", "status": 0, "show": true }
            ],
            show: false
        },
        "addresses": {
            arr: [
                { "id": 1, "type": "0", "customerId": "11", "contactNme": "定金", "contactPhone": "13162875213", "sex": "女", "country": "中国", "province": "上海", "city": "上海", "detail_addr": "很多基地及", "address": "上海市空口区158号", "show": "true" }
            ],
            show: false
        },
        "labels": {
            arr: [
                { "id": 1, "customerId": 10, "label": "dfhidfhi", "status": 0, "show": true }
            ],
            show: false
        },
        "intention":{
          arr:[],
          show:false,
        },
        "orders":{
          arr:[],
          show:false,
        },
    },

    userDetail: {"id":"00012792255a4e22bf1b70eb6eb89b33","type":0,"name":null,"password":"45ed3749b1633c0ee7c64b99cba11eba",
    "gender":null,"nickname":null,"fullname":"测试","idnumber":null,"signature":null,"phone":"15301546841","email":null,
    "qq":null,"tel":null,"openId":null,"avatar":null,"url":null,"signin":null,"company":"上海大汉三通通信股份有限公司",
    "address":null,"employee":"wei","orgId":null,"employeeId":null,"score":300,"utype":1,"ctype":0,"addrShip":null,
    "addrReceive":null,"busiType":null,"province":null,"city":null,"source":1,"lastLoginIp":null,"lastLoginTime":null,
    "status":null,"updater":null,"utime":null,"creater":null,"ctime":null,"startCtime":null,"endCtime":null,"userIds":null,
    "customerId":null,"main":null,"audit":0,"bizMain":null,"userType":0,"auditResult":null,"sourceType":null,
    "intention":{"show":false,"arr":[]},"tracking":{"show":false,"arr":[]},"personalAuthShow":false,"companyAuthShow":false
  },
  logisticsDetail:{
    "com": "yunda",
    "codenumber": "3903300539521",
    "ischeck": "1",
    "condition": "F00",
    "data": [
        {
          "ftime": "2016-08-20 18:06:39",
          "context": "在河南南阳公司卧龙分部进行签收扫描，快件已被 已签收 签收",
          "location": "",
          "time": "2016-08-20 18:06:39"
        },
        {
          "ftime": "2016-08-20 18:02:01",
          "context": "在河南南阳公司卧龙分部进行派件扫描；派送业务员：邓师傅；联系电话：15637757071",
          "location": "",
          "time": "2016-08-20 18:02:01"
        },
    ],
    "companytype": "yunda",
    "nu": "3903300539521"
  },
  productDetail:{
    "id": "442",
    "cid": 1,
    "type": "提取物",
    "name": "1111",
    "breedId": 810,
    "quality": "1111",
    "location": "北京",
    "spec": "干",
    "number": 1111,
    "price": 11,
    "unit": "1111",
    "filesList":{
         arr: [
                { "id": 1, "customerId": 10, "label": "dfhidfhi", "status": 0, "show": true }
            ],
            show: false
    }
  },
  identify:{},
  trackingDetail:{}
}

const mutations = {
    [LOGIN_DATA](state, data) { //订单列表
        state.login = data;
    },

    [ORDER_TABLE](state, data) { //订单列表
        state.basicBaseList.orderList = data;
    },
    [EXPRESS_DATA](state,data){ //物流列表
        state.basicBaseList.expressList = data;
    },
    [EXPRESS_DETAIL_DATA](state,data){
      console.log(data)
        state.logisticsDetail = data;
    },
    [ORDER_PAY_DATA](state,data){  //订单支付记录
        state.basicBaseList.orderPayList = data;
    },
    [ORDER_ROLLOUT_DATA](state,data){ //药款到转出记录
        state.basicBaseList.orderRolloutList = data;
    },
    [ORDER_UPDATE_DATA](state,data){ //修改订单
        console.log(data)
        for (var key in data) {
            state.basicBaseList.orderList[data.sub][key] = data[key];
        }
        console.log(state.basicBaseList.orderList[data.sub]);
    },
    [ORDER_ADD_DATA](state, data) {  //创建订单
        if(data.key == 'intentionDetail'){
            console.log('意向详情采纳报价');
            state.basicBaseList.intentionDetail.offers.arr[data.index].orderTime++;

        }
        if(data.key == 'offerList'){
            console.log('报价采纳报价');
            state.basicBaseList.offerList[data.index].orderTime++;
        }
        if(data.key == 'orderList'){
            console.log(data)
            state.basicBaseList[data.key].unshift({
                "type":data.type,
                "sourceType":data.sourceType,
                "sample":data.sample,
                "intl":data.intl,
                "customer":data.customer,
                "incidentals":data.incidentals,
                'incidentalsDesc':data.incidentalsDesc,
                "preferential":data.preferential,
                'preferentialDesc':data.preferentialDesc,
                'currency':data.currency,
                "consignee":data.consignee,
                'consigneePhone':data.consigneePhone,
                "zipCode":data.zipCode,
                "country":data.country,
                "province":data.province,
                "employee":data.employee,
                "org":data.org,
                "city":data.city,
                "district":data.district,
                "consigneeAddr":data.consigneeAddr,
                'comments':data.comments,
                "orderStatus":data.orderStatus,
                goods:[{
                    "sourceType":data.goods[0].sourceType,
                    "sourceId":data.goods[0].sourceId,
                    "title":data.goods[0].title,
                    "breedId":data.goods[0].breedId,
                    "brredName":data.goods[0].breedName,
                    "quality":data.goods[0].quality,
                    'location':data.goods[0].location,
                    "spec":data.goods[0].spec,
                    "price":data.goods[0].price,
                    "unit":data.goods[0].unit,
                    "number":data.goods[0].number
                }],
                "show": false,
                "no":data.no,
                "id":data.id
            });
        }
        if(data.key == 'orders'){
            console.log(data)
            state.clientDetail[data.key].arr.unshift({
                "type":data.type,
                "sourceType":data.sourceType,
                "sample":data.sample,
                "intl":data.intl,
                "customer":data.customer,
                "incidentals":data.incidentals,
                'incidentalsDesc':data.incidentalsDesc,
                "preferential":data.preferential,
                'preferentialDesc':data.preferentialDesc,
                'currency':data.currency,
                "consignee":data.consignee,
                'consigneePhone':data.consigneePhone,
                "zipCode":data.zipCode,
                "country":data.country,
                "province":data.province,
                "employee":data.employee,
                "org":data.org,
                "city":data.city,
                "district":data.district,
                "consigneeAddr":data.consigneeAddr,
                'comments':data.comments,
                "orderStatus":data.orderStatus,
                goods:[{
                    "sourceType":data.goods[0].sourceType,
                    "sourceId":data.goods[0].sourceId,
                    "title":data.goods[0].title,
                    "breedId":data.goods[0].breedId,
                    "brredName":data.goods[0].breedName,
                    "quality":data.goods[0].quality,
                    'location':data.goods[0].location,
                    "spec":data.goods[0].spec,
                    "price":data.goods[0].price,
                    "unit":data.goods[0].unit,
                    "number":data.goods[0].number
                }],
                "show": false,
                "no":data.no,
                "id":data.id
            });
        }
    },
    [ORDER_DETAIL_DATA](state, data) {//订单详情
        console.log(data);
        state.orderDetail = data;
    },
    [ORDER_UPLOAD_DATA](state,data){ //新建订单详情凭证
        console.log(data);
        if(data.payPics){
            state.orderDetail.payPics.arr.unshift({
                "orderId":data.orderId,
                "path":data.payPics,
                "description":data.description,
                "fileType":data.fileType,
                "bizType":data.bizType,
                "show":false
            })
        }
        if(data.sendPics){
            state.orderDetail.sendPics.arr.unshift({
                "orderId":data.orderId,
                "path":data.sendPics,
                "description":data.description,
                "fileType":data.fileType,
                "bizType":data.bizType,
                "show":false
            })
        }
        if(data.bizType=="attach_files"){
            state.orderDetail.attachFiles.arr.unshift({
                "orderId":data.orderId,
                "path":data.attachFiles,
                "fileType":data.fileType,
                "bizType":data.bizType,
                "description":data.description,
                "show":false
            })
        }
    },
    [ORDER_STATUS](state,data){   //订单状态详情
        console.log(data)
        for(var i in  state.basicBaseList.orderList){
            if(state.basicBaseList.orderList[i].id==data.id){
                state.basicBaseList.orderList[i].orderStatus=data.orderStatus;
                state.basicBaseList.orderList[i].payWay=data.payWay;
                state.basicBaseList.orderList[i].lcompanyId=data.lcompanyId;
                state.basicBaseList.orderList[i].logisticsNo=data.logisticsNo;

            }
        }
    },
    [SYSTEM_DATA](state, data) { //枚举类型
      state.systemBaseList.enumlist = data;
    },
    [PROVINCE_DATA](state, data) { //省市区
        state.systemBaseList.locationlist = data;
    },

    [ADD_DATA](state, data) { // 新增枚举
        state.systemBaseList.enumlist.unshift({
            "name": data.name,
            "code": data.code,
            "type": data.type,
            "desc": data.desc,
            "typedesc":data.type,
            "id": data.id,
            "show": false,
            "status":1
        });
    },
    [UPDATE_DATA](state, data) { //枚举修改
        for (var key in data) {
            state.systemBaseList.enumlist[data.sub][key] = data[key];

        }
    },

    [SERVICE_ENTERPRISE](state, data) { //企业
        state.basicBaseList.enterpriseList = data;
    },
    [SERVICE_DRAW](state, data) { //提取物
        state.basicBaseList.drawList = data;
    },
    [BREED_DATA](state, data) { //药材
        state.basicBaseList.breedList = data;
    },

    [BREED_DETAIL_DATA](state, data) { //药材列表
        state.breedDetail = data;
    },

    [ADD_BREED_DATA](state, data) { //新增药材
        state.basicBaseList.breedList.unshift({
            "code": data.code,
            "name": data.name,
            "categoryId": data.categoryId,
            "categoryName":data.categoryName,
            "pinyin": data.pinyin,
            "eName": data.eName,
            "lName": data.lName,
            "id": data.id,
            "show":false,
            "icon":data.path
        })
    },
    [ADD_CONTACT_DATA](state, data) { //新增企业联系人
        state.companyDetail.companyContacts.arr.unshift({
            "name": data.name,
            "cid": data.cid,
            "tel": data.tel,
            "phone": data.phone,
            "wechart": data.wechart,
            "email": data.email,
            "show": false,
            "id": data.id,
            "main":data.main
        })
        console.log(data.id)
    },

    [DELETE_CONTACT_DATA](state,data){
      state.companyDetail.companyContacts.arr.splice(data.index,1);
    },

    [UPDATE_CONTACT_DATA](state, data) { //修改企业相关内容
        for (var key in data) {
            state.companyDetail[data.key].arr[data.sub][key] = data[key];
        }
        console.log(state.companyDetail[data.key].arr[data.sub])
    },
    [DELETE_BREED_DATA](state,data) { //删除客户/订单信息
        state.basicBaseList[data.key].splice(data.sub, 1);
    },
    [DELETE_SPECS_DATA](state, data) { //删除相关信息
        state[data.headline][data.key].arr.splice(data.sub, 1);
    },
    [DELETE_SHOW_STATUE](state, data) { //删除枚举
        state.systemBaseList.enumlist.splice(data.sub, 1);
    },

    [CATEGORY_DATA](state, data) { //品种显示
        state.basicBaseList.categoryList = data;
    },

    [UPDATE_BREED_DATA](state, data) { //修改药材

        for (var key in data) {
            state.basicBaseList.breedList[data.sub][key] = data[key];
        }
        console.log(state.basicBaseList.breedList[data.sub]);
    },

    [UPDATE_SPEC_DATA](state, data) { //修改药材相关信息
        if(data.name)data.alias=data.name;
        for (var key in data) {
            state.breedDetail[data.key].arr[data.sub][key] = data[key];
        }
    },

    [ADDSPEC_DATA](state, data) { // 添加药材相关信息
        state.breedDetail[data.key].arr.push({
            "name": data.name,
            "breedId": data.breedId,
            "show": false,
            "alias": data.name,
            "id": data.id
        })
    },
    [SERVICE_ENTERPRISE_DETAIL](state, data) { //企业详情
        state.companyDetail = data;
    },
    [SERVICE_COMPONENT](state, data) { //成分
        state.basicBaseList.componentList = data;
    },
    [DRUG_DETAIL_DATA](state, data) { //成分详情
        state.basicBaseList.drugList = data;
    },
    [CUSTOMER_DATA](state, data) { //客户列表
        state.basicBaseList.customerList = data;
    },
    [CUSTOMER_DETAIL_DATA](state, data) { //客户详情
        state.clientDetail = data;
    },
    [CUSTOMER_TRANSFER](state,data){
      console.log(data);
     switch (data.flag){
       case 'myClient':
         data.arr.forEach(function(item){
           for(var i=0;i<state.basicBaseList.customerList.length;i++){
             if(state.basicBaseList.customerList[i].id == item){
               state.basicBaseList.customerList.splice(i,1);
             }
           }
         });

         break;
       case 'orgClient':
         data.arr.forEach(function(item){
           for(var i=0;i<state.basicBaseList.customerList.length;i++){
             if(state.basicBaseList.customerList[i].id == item){
               state.basicBaseList.customerList.splice(i,1);
             }
           }
         });

         break;
       case 'allClient':
         data.arr.forEach(function(item){
           for(var i=0;i<state.basicBaseList.customerList.length;i++){
             if(state.basicBaseList.customerList[i].id == item){
               state.basicBaseList.customerList[i].employeeId=data.employeeId;
               state.basicBaseList.customerList[i].employeeName=data.employeeName;
               state.basicBaseList.customerList[i].orgId=data.orgId;
             }
           }
         });
         break;
       case 'potentialClient':
         data.arr.forEach(function(item){
           for(var i=0;i<state.basicBaseList.customerList.length;i++){
             if(state.basicBaseList.customerList[i].id == item){
               state.basicBaseList.customerList.splice(i,1);
             }
           }
         });
         break;
       default:
         data.arr.forEach(function(item){
           for(var i=0;i<state.basicBaseList.customerList.length;i++){
             if(state.basicBaseList.customerList[i].id == item){
               state.basicBaseList.customerList.splice(i,1);
             }
           }
         });
         break;

     }

    },
    [CUSTOMER_BATCH_DELETE](state, data){
        data.customerIds.forEach(function(item){
          for(var i=0;i<state.basicBaseList.customerList.length;i++){
                if(state.basicBaseList.customerList[i].id == item){
                  state.basicBaseList.customerList.splice(i,1);
                }
          }
        })
      if(data.customerIds[0]==state.clientDetail.id){
        state.clientDetail.blacklist=1-state.clientDetail.blacklist;
      }

    },
    [CUSTOMER_ADD_DATA](state, data) { //新增客户


        state.basicBaseList.customerList.unshift({
          address:data.address,
          bizScope:data.bizScope,
          category:data.category,
          city:data.city,
          cityName:data.cityName,
          classify:data.classify,
          classifyDesc:data.classifyDesc,
          comments:data.comments,
          country:data.country,
          countryName:data.countryName,
          email:data.email,
          id:data.id,
          mainBiz:data.mainBiz,
          mainEmail:data.email,
          mainPhone:data.phone,
          name:data.name,
          number:data.number,
          orgId:data.orgId,
          principal:data.principal,
          province:data.province,
          provinceName:data.provinceName,
          source:4,
          sourceType:'业务录入',
          tel:data.tel,
          type:data.type,
          typeDesc:data.typeDesc,
          show: false,
          supplier:data.supplier
        })

        console.log(data);
      if(data.sub!='undefined'&&data.sub){
        state.basicBaseList[data.key][data.sub][data.keyname]=1;
      }
      if(data.detail){
        state[data.detail].customerId=data.id;
      }

    },
    [CUSTOMER_UPDATE_DATA](state, data) { //修改客户列表信息
        console.log(data)
        for (var key in data) {
            state.basicBaseList[data.key][data.sub][key] = data[key];
        }
    },
    [UPDATE_CUSTOMER_DETAIL](state, data) { //修改客户相关
        for (var key in data) {
            state[data.headline][data.key].arr[data.sub][key] = data[key];
        }
    },
    [UPDATE_ADDR_DETAIL](state, data) { //修改客户地址

        for (var key in data) {
            state[data.headline][data.key].arr[data.sub][key] = data[key];
        }
    },
    [UPDATE_LABEL_DETAIL](state, data) { //修改客户标签
        console.log(data);
        for (var key in data) {
            state[data.headline][data.key].arr[data.sub][key] = data[key];
        }
        state[data.headline][data.key].arr[data.sub].remark = data.remark;
    },
    [UPDATE_PRODUCT_DATA](state, data) { //修改客户产品
        for (var key in data) {
            state[data.headline][data.key].arr[data.sub][key] = data[key];
        }
    },
    [ALTER_PRODUCT_DATA](state, data) { //修改供应商产品
        for (var i in data) {
            state.basicBaseList[data.headline][data.sub][i] = data[i];
        }
    },

    [CUSTOMER_CONTACT_DATA](state, data) { // 新增客户联系人信息
        state.clientDetail[data.key].arr.unshift({
            "name": data.name,
            "position": data.position,
            "department": data.department,
            "phone": data.phone,
            "tel": data.tel,
            "email": data.email,
            "qq": data.qq,
            "wechart": data.wechart,
            "id": data.id,
            "main": data.main,
            "show": false
        })
    },
    [ADD_ADDR_DETAIL](state, data) { // 新增客户地址
        state.clientDetail[data.key].arr.unshift({
            "type": data.type,
            "contactName": data.contactName,
            "contactPhone": data.contactPhone,
            "sex": data.sex,
            "country": data.country,
            "province": data.province,
            "city": data.city,
            "district": data.district,
            "street": data.street,
            'detailAddr': data.detailAddr,
            "address": data.address,
            "customerId": data.customerId,
            "id": data.id,
            "show": false
        })
    },
    [ADD_LABEL_DATA](state, data) { // 新增客户标签
        state.clientDetail[data.key].arr.unshift({
            "label": data.label,
            "remark": data.remark,
            "status": 1,
            "customerId": data.id,
            "id": data.id,
            "show": false
        })
    },
    [ADD_PRODUCT_DATA](state, data) { //新增客户产品
        state.clientDetail[data.key].arr.unshift({
            "type": data.type,
            "name": data.name,
            "breedId": data.breedId,
            "quality": data.quality,
            "location": data.location,
            "spec": data.spec,
            "number": data.number,
            "price": data.price,
            "unit": data.unit,
            "duedate": data.duedate,
            "coa": data.coa,
            "cid": data.cid,
            "id": data.id,
            "show": false,
        })
    },
    [PRODUCT_DATA](state, data) { //供应商产品列表
        state.basicBaseList.productList = data;
    },
    [PRODUCT_DETAIL_DATA](state,data){ //供应商产品详情
        state.productDetail  = data;
    },
    [SUPPLY_PRODUCT_DATA](state, data) { //新增供应商产品
        console.log(data)
        console.log(state.basicBaseList.productList)
        state.basicBaseList.productList.unshift({
            "type": data.type,
            "name": data.name,
            "breedId": data.breedId,
            "quality": data.quality,
            "location": data.location,
            "spec": data.spec,
            "number": data.number,
            "price": data.price,
            "unit": data.unit,
            "duedate": data.duedate,
            "coa": data.coa,
            "cid": data.cid,
            "id": data.id,
            "show": false,
        })
    },
    [FILES_DATA_LIST](state,data){ //供应商文件列表
        state.basicBaseList.filesList = data;
    },
    [ADD_CERTIFICATE_DATA](state,data){ //新增供应商资质证书
        console.log(data)
        state.basicBaseList.filesList.unshift({
            "path": data.path,
            "fileType": data.fileType,
            "bizType":data.bizType,
            "bizId":data.bizId,
            "description":data.description,
            "show":false
        })
    },
    [FILE_DATA](state, data) { //新增客户文件
        state.clientDetail[data.key].arr.unshift({
            "catagory": data.catagory,
            "type": data.type,
            "path": data.path,
            "customerId": data.customerId,
            "show": false,
            "id": data.id
        })
    },
    [EMPLOYEE_DATA](state, data) { //员工业务员列表
        state.basicBaseList.employeeList = data;
    },
    [INTENTION_LIST_DATA](state, data) { //意向列表
        state.basicBaseList.intentionList = data;
    },
    [SUPPLY_DEMAND_DATA](state, data) { //供求匹配信息列表
        state.basicBaseList.supplyDemandList = data;
    },
    [OFFER_LIST_DATA](state, data) { //报价列表
        state.basicBaseList.offerList = data;
    },
    [MSG_LIST_DATA](state, data) { //留言列表
        state.basicBaseList.msgList = data;
    },
    [MSG_UPDATE_DATA](state, data) { //留言修改
        if(data.key=='msgList'){
            console.log('留言列表修改');
            state.basicBaseList.msgList[data.index].comments = data.comments;
        }
        if(data.key=='intentionDetail'){
            state.basicBaseList.intentionDetail.msgs.arr[data.index].comments = data.comments;
        }
    },
    [USER_DATA](state, data) { // 会员列表
        state.basicBaseList.userList = data;
    },

    [QUICK_EDIT](state,data){   //审核时可选择标签
        state.label.auditLabel = data;
    },

    [UPDATE_USER_DATA](state, data) { // 会员更新

        if (data.index != undefined) { //列表页面修改
            if (data) {
                for (var key in data) {
                    state.basicBaseList.userList[data.index][key] = data[key];

                }
            }
            console.log('列表页面修改');
            console.log(state.basicBaseList.userList[data.index]);
            /*state.basicBaseList.userList[data.index].fullname=data.fullname;
          state.basicBaseList.userList[data.index].qq=data.qq;
          state.basicBaseList.userList[data.index].email=data.email;
          state.basicBaseList.userList[data.index].company=data.company;
          state.basicBaseList.userList[data.index].nickname=data.nickname;
          state.basicBaseList.userList[data.index].phone=data.phone;*/
        }

        if (data) {
                for (var key in data) {
                    state.userDetail[key] = data[key];
                }
            }
            /*state.userDetail.fullname=data.fullname;
            state.userDetail.qq=data.qq;
            state.userDetail.email=data.email;
            state.userDetail.company=data.company;
            state.userDetail.nickname=data.nickname;
            state.userDetail.phone=data.phone;  */


    },

    [BATCH_UPDATE_USER_DATA](state, data) { // 批量审核会员
        for(var i=0;i<data.indexs.length;i++){
           var k = data.indexs[i];
           state.basicBaseList.userList[k].checked = false;
           for (var key in data) {
                    if(key=="audit"&&data[key]==1){
                        state.basicBaseList.userList[k].auditResult = "已审核";
                    }else if(key=="audit"&&data[key]==2){
                        state.basicBaseList.userList[k].auditResult = "审核不通过";
                    }
                    state.basicBaseList.userList[k][key] = data[key];
                }
        }


    },

    [BATCH_USER_INTENTION_AUDIT](state, data) { // 批量审核会员意向
        console.log(data);
        if(state.userDetail.intention.arr.length>0){
            console.log("会员详情页审核意向");
            for(let i=0;i<data.indexs.length;i++){
              let k = data.indexs[i];
              state.userDetail.intention.arr[k].validate = data.validate;
              state.userDetail.intention.arr[k].description = data.description;
              state.userDetail.intention.arr[k].checked = false;
            }
        }

        if(state.basicBaseList.intentionList.length>0){
            console.log("意向列表页审核意向");
            for(let i=0;i<data.indexs.length;i++){
              let k = data.indexs[i];
              state.basicBaseList.intentionList[k].validate = data.validate;
              state.basicBaseList.intentionList[k].description = data.description;
              state.basicBaseList.intentionList[k].checked = false;
            }
        }


    },

    [USER_DETAIL_DATA](state, data) { // 会员详情

      for (var key in data) {
        state.userDetail[key] = data[key];
      }

    },

    [ORG_DATA](state, data) { // 部门列表
        state.basicBaseList.orgList = data;
    },
    [ROLE_DATA](state, data) { // 部门列表
        state.basicBaseList.roleList = data;
    },
    [ADD_EMPLOYEE_DATA](state, data) { //新增员工信息
        state.basicBaseList[data.key].unshift({
            "name": data.name,
            "ename": data.ename,
            "show": false,
            "no": data.no,
            "orgName": data.orgName,
            "position": data.position,
            "mobile": data.mobile,
            "extno": data.extno,
            "level": data.level,
            "entrydate": data.entrydate,
            "leavedate": data.leavedate,
            "orgid": data.orgid,
            "orgcode": data.orgcode,
            "status": data.status,
            "privilege": data.privilege
        })
    },

    [IDENTIFY_DATA](state,data){     //认证信息
        state.identify = data;
    },

    [UPDATE_TRACKING_DATA](state,data){     //更新跟进
        if(state.userDetail.tracking.arr[data.index]){
          state.userDetail.tracking.arr[data.index].trackingWay = data.trackingWay;
          state.userDetail.tracking.arr[data.index].comments = data.comments;
          state.userDetail.tracking.arr[data.index].contactNo = data.contactNo;
          state.userDetail.tracking.arr[data.index].type = data.type;
        }
        if(state.clientDetail.trackings.arr[data.index]){
          state.clientDetail.trackings.arr[data.index].trackingWay = data.trackingWay;
          state.clientDetail.trackings.arr[data.index].comments = data.comments;
          state.clientDetail.trackings.arr[data.index].contactNo = data.contactNo;
          state.clientDetail.trackings.arr[data.index].type = data.type;
        }

    },

    [ADD_TRACKING_DATA](state,data){     //增加跟进
        const temp = {};
        temp.trackingWay = data.trackingWay;
        temp.comments = data.comments;
        temp.contactNo = data.contactNo;
        temp.type = data.type;
        temp.objId = data.objId;
        temp.bizId = data.bizId;
        temp.bizType = data.bizType;
        temp.show = false;
        temp.id=data.id;
        state.userDetail.tracking.arr.push(temp);
        state.clientDetail.trackings.arr.push(temp);
    },



    [UPDATE_EMPLOY_DATA](state, data) { //修改员工信息
        for (var key in data) {
            state.basicBaseList[data.key][data.sub][key] = data[key];
        }
    },
    [UPDATA_INTENTION_DATA](state,data){ //修改意向
      if(data.key=='user'){   //会员详情页修改意向
        console.log("用户详情页修改意向");
        for (var i in state.userDetail.intention.arr[data.sub]) {
          state.userDetail.intention.arr[data.sub][i] = data[i];
        }
      }else if(data.key=='client'){   //客户详情页修改意向
        console.log("客户详情页修改意向");
        for (var i in state.clientDetail.intentions.arr[data.sub]) {
          state.clientDetail.intentions.arr[data.sub][i] = data[i];
        }
      }else{
        console.log("意向列表页修改意向");
        for (var i in state.basicBaseList.intentionList[data.sub]) {
          state.basicBaseList.intentionList[data.sub][i] = data[i];
        }
      }

    },
    [INTENTION_DATA](state, data) { //机会划转意向，新增意向
      var temp = {
        "id":data.id,
        "type":data.type,
        "especial":data.especial,
        "customerName":data.customerName,
        "customerId":data.customerId,
        "customerPhone":data.customerPhone,
        "breedName":data.breedName,
        "qualification":data.qualification,
        "spec":data.spec,
        "address":data.address,
        "advance":data.advance,
        "invoic":data.invoic,
        'visit':data.visit,
        "intl":data.intl,
        "unit":data.unit,
        "pack":data.pack,
        "sampling":data.sampling,
        "sampleNumber":data.sampleNumber,
        "sampleUnit":data.sampleUnit,
        "sampleAmount":data.sampleAmount,
        "breedId":data.breedId,
        "country":data.country,
        "quality":data.quality,
        "price":data.price,
        "province":data.province,
        "city":data.city,
        "district":data.district,
        "location":data.location,
        "number":data.number,
        "quality":data.quality,
        "show":false,
        "duedate":data.duedate,
        "images":data.images,
        "audit":data.audit,
        "validate":0,
        "loading":true
      };

        if(data.key=="intentionList"){
            console.log("意向列表页添加意向");
            state.basicBaseList.intentionList.unshift(temp);
        }
        if(data.key=="user"){
          console.log("会员详情页添加意向");
          state.userDetail.intention.arr.unshift(temp);
        }
        if(data.key=="client"){
            console.log("客户详情页添加意向");
            state.clientDetail.intentions.arr.unshift(temp);
        }

    },
    [INTENTION_UP_DOWN](state,data){
        console.log(data.indexs);
        for(let i=0;i<data.indexs.length;i++){
          let k = data.indexs[i];
          state.basicBaseList.intentionList[k].onSell = data.onSell;
          state.basicBaseList.intentionList[k].checked = false;
        }
    },
    [INTENTION_DETAIL_DATA](state,data){
        state.basicBaseList.intentionDetail = data;
    },
    /*[INTENTION_OFFER_DETAIL](state,data){
        state.basicBaseList.intentionDetail = data;
    },*/
    [PROVINCE_LIST](state,data){
        state.locationList.provinceList = data;
    },
    [COUNTRY_LIST](state,data){
        state.systemBaseList.countryList = data;
    },
    [CITY_LIST](state,data){
        state.systemBaseList.cityList = data;
    },
    [DISTRICT_LIST](state,data){
        state.systemBaseList.districtList = data;
    },

    [ADD_FILES_DATA](state,data){
        state.clientDetail.files.arr.unshift({
            "path": data.path,
            "fileType": data.fileType,
            "bizType":data.bizType,
            "bizId":data.bizId,
            "description":data.description,
            "show":false,
            "id":data.id
        })
    }


}

export default {
    state,
    mutations
}

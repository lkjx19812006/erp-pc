import {

   ORDER_TABLE,
   ORDER_DETAIL_DATA,
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
   ORG_DATA,
   FILE_DATA,
   USER_DETAIL_DATA,
   ADD_EMPLOYEE_DATA,
   UPDATE_EMPLOY_DATA,
   IDENTIFY_DATA,
   UPDATE_TRACKING_DATA,
   ADD_TRACKING_DATA,
   UPDATA_INTENTION_DATA,
   INTENTION_DATA,
   INTENTION_OFFER_DETAIL,
   PROVINCE_LIST

} from '../mutation-types'

const state = {
    orderList: [{"id":"5726ea3bf22125bcdcff7820","type":0,"sample":0,"intl":0,"sourceType":1,"link":"1234567890",
                "customer":null,"user":null,"amount":200.000000,"incidentals":0.000000,"incidentalsDesc":null,
                "preferential":0.000000,"preferentialDesc":null,"total":200.000000,"currency":0,"lcompanyId":null,
                "lcompanyName":null,"logisticsNo":null,"consignee":"测试","consigneePhone":"18505565316","zipCode":"000000",
                "country":"7","province":null,"city":null,"district":null,"employee":null,"orderStatus":0,"status":1,"visit":0,
                "pay":0,"ptime":null,"payWay":null,"invoice":0,"logistics":0,"stime":null,"consigneeAddr":"北京,北京,西城区 阿伦",
                "no":"20160502134843429001","clients":0,"cancleCauses":null,"comments":"快点，急用","ftime":null,"updater":null,
                "utime":"2016-09-13 14:32","creater":"b11741af0efc49ed815545c0d88ddc98","ctime":"2016-05-02 13:48","goods":null,
                "payPics":null,"sendPics":null}],
    systemBaseList: {
        enumlist: [
            { "id": 0, "code": "022112", "type": "1", "desc": "123456789011", "status": "0" },
            { "id": 1, "code": "1112", "type": "2", "desc": "1234567890", "status": "1" },
            { "id": 2, "code": "34445", "type": "3", "desc": "1234567890", "status": "0" },
            { "id": 3, "code": "45555", "type": "2", "desc": "1234567890", "status": "1" },
            { "id": 4, "code": "4fff5", "type": "5", "desc": "1234567890", "status": "1" }
        ],
        locationlist: [
            { "twoNumber": 0, "cname": "中国1", "level": "2122", "icon": "1111", "iso": "22222" },
            { "twoNumber": 1, "cname": "上海1", "level": "222", "icon": "1111", "iso": "22222" },
            { "twoNumber": 2, "cname": "河南1", "level": "222", "icon": "1111", "iso": "22222" }
        ],
    },

    basicBaseList: {
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
            { "id": 0, "type": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false },
            { "id": 1, "type": 0, "name": "ddf", "category": "14frff555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": false, "checked": false },
            { "id": 2, "type": 1, "name": "ggg", "category": "gvgg", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": false, "checked": false }
        ],
        intentionList: [
            { "id": "1201608221917540470","customerId": "29565","customerName": "段飞","customerPhone": "15871287716","type": 1,"especial": 1,"breedId": 1174,"breedName": "艾叶","location": "湖北","spec": "全叶","unit": "63","province": "湖北","city": "孝感","district": "大悟县","address": "城区","invoic": 0,"visit": 0,"pack": "机压包","intl": 0,"country": "中国","offerTotal": 0,"status": 1, "show": true }
        ],
        intentionDetail: [
            { "id": "1201608221917540470","customerName": "段飞","customerPhone": "15871287716","type": 1,"especial": 1,"breedId": 1174,"breedName": "艾叶","location": "湖北","spec": "全叶","unit": "63","province": "湖北","city": "孝感","district": "大悟县","address": "城区","pack": "机压包","country": "中国","status": 1, "show": true }
        ],
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
        userList: [{
            "id": "0008fcc6c2d549888afb2e950e6343c1","type": 0,"password": "56bf5523459ce2dfc6720798d852d6e6",
            "nickname": "卖蘑菇的小姑凉", "fullname": "沈威峰","phone": "13851379713","email": "857714234@qq.com","qq": "857714234",
            "company": "个体种植户","score": 300,"source": 1,"status": 0,"userIds": null,"customerId": null,"main": null,"show": true
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
                  "utime":"2016-09-13 14:32","creater":"b11741af0efc49ed815545c0d88ddc98","ctime":"2016-05-02 13:48"}],"payPics":null,"sendPics":null},
                  
    


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
        "intent": { arr: [], show: false },
        "products": { arr: [], show: false },
        "files": {
            arr: [
                { "id": 1, "breedId": 1001, "name": "云南", "show": "true" }
            ],
            show: false
        },
        "track": { arr: [], show: false },
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
        }
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
  identify:{},
  trackingDetail:{}
}

const mutations = {
    [ORDER_TABLE](state, data) {
        state.orderList = data;
    },
    [ORDER_DETAIL_DATA](state, data) {
        console.log(data);
        state.orderDetail = data;
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
            "status": data.status,
            "id": data.id,
            "show": false
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
            "categoryId": data.selected,
            "id": data.id,
            "show": false
        })
    },
    [ADD_CONTACT_DATA](state, data) { //新增企业联系人
        state.companyDetail.companyContacts.arr.unshift({
            "name": data.name,
            "cid": data.id,
            "tel": data.tel,
            "phone": data.phone,
            "wechart": data.wechart,
            "email": data.email,
            "show": false,
            "id": data.id
        })
    },
    [UPDATE_CONTACT_DATA](state, data) { //修改企业相关内容
        for (var key in data) {
            state.companyDetail[data.key].arr[data.sub][key] = data[key];
        }
        console.log(state.companyDetail[data.key].arr[data.sub])
    },

    [DELETE_BREED_DATA](state,data) { //删除客户信息
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
        console.log(state.basicBaseList.breedList[data.sub])
    },

    [UPDATE_SPEC_DATA](state, data) { //修改药材相关信息
        
        state.breedDetail.alias.arr[data.sub].alias = data.name;
        for (var key in data) {
            state.breedDetail[data.key].arr[data.sub][key] = data[key];
        }
    },

    [ADDSPEC_DATA](state, data) { // 添加药材相关信息
        state.breedDetail[data.key].arr.push({
            "name": data.name,
            "breedId": data.id,
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
    [CUSTOMER_ADD_DATA](state, data) { //新增客户
        state.basicBaseList.customerList.unshift({
            "name": data.name,
            "type": data.type,
            "tel": data.tel,
            "category": data.category,
            "email": data.email,
            "principal": data.principal,
            "bizScope": data.bizScope,
            "province": data.province,
            "city": data.city,
            "address": data.address,
            "comments": data.comments,
            "id": data.id,
            "show": false
        })
    },
    [CUSTOMER_UPDATE_DATA](state, data) { //修改客户列表信息
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
        for (var key in data) {
            state[data.headline][data.key].arr[data.sub][key] = data[key];
        }
        state[data.headline][data.key].arr[data.sub].remark = data.label;
    },
    [UPDATE_PRODUCT_DATA](state, data) { //修改客户产品
        for (var key in data) {
            state[data.headline][data.key].arr[data.sub][key] = data[key];
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
            "remark": data.label,
            "status": data.status,
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
    [USER_DATA](state, data) { // 会员列表
        state.basicBaseList.userList = data;
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
        } else { //详情页面修改
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
        }

    },


    [USER_DETAIL_DATA](state, data) { // 会员详情 
        state.userDetail = data;

    },

    [ORG_DATA](state, data) { // 部门列表
        state.basicBaseList.orgList = data;
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
            "status": data.status
           /* "role": param.role*/
        })
    },

    [IDENTIFY_DATA](state,data){     //认证信息
        state.identify = data;
    },

    [UPDATE_TRACKING_DATA](state,data){     //更新跟进
        state.userDetail.tracking.arr[data.index].trackingWay = data.trackingWay;
        state.userDetail.tracking.arr[data.index].comments = data.comments;
        state.userDetail.tracking.arr[data.index].contactNo = data.contactNo;
        state.userDetail.tracking.arr[data.index].type = data.type;
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
        state.userDetail.tracking.arr.push(temp);
    },

    

    [UPDATE_EMPLOY_DATA](state, data) { //修改员工信息
        for (var key in data) {
            state.basicBaseList[data.key][data.sub][key] = data[key];
        }
    },
    [UPDATA_INTENTION_DATA](state,data){ //修改意向
        for (var key in data) {
            state.basicBaseList[data.key][data.sub][key] = data[key];
        }
    },
    [INTENTION_DATA](state, data) { //机会划转意向，新增意向
        state.basicBaseList.intentionList.unshift({
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
             "quality":data.quality
        })
    },
    [INTENTION_OFFER_DETAIL](state,data){
        state.basicBaseList.intentionDetail = data;
    },
    [PROVINCE_LIST](state,data){
        state.locationList.provinceList = data;
    }

}

export default {
    state,
    mutations
}

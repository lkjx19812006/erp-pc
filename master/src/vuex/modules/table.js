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
    ORG_LIST_DATA,
    CHANCE_LIST_DATA,
    USER_DATA,
    UPDATE_USER_DATA,
    ORG_DATA,
    FILE_DATA
} from '../mutation-types'

const state = {
    list: [
        { "orderId": 0, "orderName": "药材", "orderModule": "代理商", "orderNum": "1234567890", "orderUnit": "金融科技", "orderTel": "13162875213", "orderPerson": "大大", "orderTime": "2016-09-18", "orderLogstatus": "运输中", "show": true },
        { "orderId": 1, "orderName": "人参", "orderModule": "代理商", "orderNum": "1234567890", "orderUnit": "金融科技", "orderTel": "13162875213", "orderPerson": "达达", "orderTime": "2016-09-18", "orderLogstatus": "运输中", "show": true },
        { "orderId": 2, "orderName": "未完成", "orderModule": "代理商", "orderNum": "1234567890", "orderUnit": "金融科技", "orderTel": "13162875213", "orderPerson": "大大", "orderTime": "2016-09-28", "orderLogstatus": "运输完成", "show": true },
        { "orderId": 3, "orderName": "已完成", "orderModule": "代理商", "orderNum": "1234567890", "orderUnit": "金融科技", "orderTel": "13162875213", "orderPerson": "规格", "orderTime": "2016-09-18", "orderLogstatus": "运输中", "show": true }
    ],
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
        drugList: [
            { "id": 176311, "number": "国药准字Z20093164", "name": "麝香祛痛搽剂", "nameEn": "", "product": "", "agentType": "搽剂", "spec": "每瓶装60ml", "company": "远大医药黄石飞云制药有限公司", "address": "湖北省黄石市鄂黄路52号", "drugType": "中药", "numberOld": "", "approveDate": "2014-03-03 00:00", "code": "86901890001064", "linkDb": "药品广告 中药保护品种库", "ctime": "2016-09-02 16:52", "show": "true" },
            { "id": 176312, "number": "国药准字Z20093165", "name": "麝香祛痛搽剂", "nameEn": "", "product": "", "agentType": "搽剂", "spec": "每瓶装60ml", "company": "浙江景岳堂药业有限公司", "address": "湖北省黄石市鄂黄路52号", "drugType": "中药", "numberOld": "", "approveDate": "2014-03-03 00:00", "code": "86901890001064", "linkDb": "药品广告 中药保护品种库", "ctime": "2016-09-02 16:52", "show": "true" }
        ],
        customerList: [
            { "id": 0, "type": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false },
            { "id": 1, "type": 0, "name": "ddf", "category": "14frff555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": false, "checked": false },
            { "id": 2, "type": 1, "name": "ggg", "category": "gvgg", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": false, "checked": false }
        ],
        employeeList: [
            { "id": 1, "name": "lm", "no": "001", "orgId": 1, "level": "1", "qq": null, "wechat": null, "email": null, "isManager": 1, "position": null, "mobile": null, "show": "true" }
        ],
        orgList: [
            { "id": 1, "name": "交易部门", "show": true }
        ],
        chanceList: [
            { "id": "14732390725891000", "userId": "b11741af0efc49ed815545c0d88ddc98", "type": 1, "especial": 1, "breedId": 1085, "breedName": "天仙子", "qualification": "", "quality": "工城 霜天地", "location": "东北", "spec": "统", "number": 213, "price": 12, "unit": "公斤", "address": "北京市,北京市,东城区 The", "duedate": "2016-09-14 00:00", "advance": 1, "invoic": 1, "visit": 0, "pack": "瓦楞纸箱", "intl": 0, "sampling": 1, "sampleNumber": 1, "sampleUnit": "公斤", "sampleAmount": 100, "show": true }
        ],
         employeeList:[{"id":6,"name":"lm","no":"001","orgName":"冕冠电子商务有限公司","orgId":1,"orgCode":"","level":"1",
                       "entryDate":null,"leaveDate":null,"mobile":null,"extNo":"123456","qq":"38917306","wechat":"38917306@qq.com",
                       "email":"38917306@qq.com","position":"软件工程师","isManager":1,"status":1,"updater":null,"utime":null,"creater":null,"ctime":null,"ename":"john"}
                       ],
        orgList:[{"id":1,"name":"冕冠电子商务有限公司","level":null,"pid":0,"status":1,"utime":null,"ctime":null,"creater":null,"updater":null,"code":"0001"}],           
        userList: [{
            "id": "0008fcc6c2d549888afb2e950e6343c1",
            "type": 0,
            "name": null,
            "password": "56bf5523459ce2dfc6720798d852d6e6",
            "gender": null,
            "nickname": "卖蘑菇的小姑凉",
            "fullname": "沈威峰",
            "idnumber": null,
            "signature": null,
            "phone": "13851379713",
            "email": "857714234@qq.com",
            "qq": "857714234",
            "tel": null,
            "openId": null,
            "avatar": null,
            "url": null,
            "signin": null,
            "company": "个体种植户",
            "address": null,
            "employee": null,
            "employeeId": null,
            "score": 300,
            "utype": 0,
            "ctype": 0,
            "addrShip": null,
            "addrReceive": null,
            "busiType": null,
            "province": null,
            "city": null,
            "source": 1,
            "lastLoginIp": null,
            "lastLoginTime": "2016-06-02 11:44",
            "status": 0,
            "updater": null,
            "utime": null,
            "creater": null,
            "ctime": null,
            "startCtime": null,
            "endCtime": null,
            "userIds": null,
            "customerId": null,
            "main": null,
            "show": true
        }]
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
        "utime": "2016-08-26 18:43",
        "ctime": "2016-08-26 18:43",
        "companyLicenses": null,
        "companyProducts": [],
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
                { "id": 1, "breedId": 1001, "name": "云南", "show": "true" },
                { "id": 2, "breedId": 1001, "name": "广东", "show": "true" }
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
    }
}

const mutations = {
    [ORDER_TABLE](state, data) {
        state.list = data.results;
    },
    [SYSTEM_DATA](state, data) { //枚举类型
        state.systemBaseList.enumlist = data;
    },
    [PROVINCE_DATA](state, data) { //省市区
        state.systemBaseList.locationlist = data;
    },
    [DELETE_SHOW_STATUE](state, sub) { //删除枚举
        state.systemBaseList.enumlist.splice(sub, 1);
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
        state.systemBaseList.enumlist[data.sub].id = data.id;
        state.systemBaseList.enumlist[data.sub].name = data.name;
        state.systemBaseList.enumlist[data.sub].code = data.code;
        state.systemBaseList.enumlist[data.sub].type = data.type;
        state.systemBaseList.enumlist[data.sub].desc = data.desc;
        state.systemBaseList.enumlist[data.sub].status = data.status;
    },
    [SERVICE_COMPONENT](state, data) { //成分
        state.basicBaseList.componentList = data;
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
            "qq": data.qq,
            "show": false,
            "id": data.id
        })
    },
    [UPDATE_CONTACT_DATA](state, data) { //修改企业相关内容
        state.companyDetail[data.key].arr[data.sub].cid = data.cid;
        state.companyDetail[data.key].arr[data.sub].name = data.name;
        state.companyDetail[data.key].arr[data.sub].phone = data.phone;
        state.companyDetail[data.key].arr[data.sub].email = data.email;
        state.companyDetail[data.key].arr[data.sub].wechart = data.wechart;
    },

    /* [DELETE_CONTACT_DATA](state,id){ //删除企业联系人 待定
         state.companyDetail.companyContacts.arr.splice(id,1);
     },*/
    [DELETE_BREED_DATA](state, data) { //删除客户信息
        state.basicBaseList[data.key].splice(data.sub, 1);
    },
    [DELETE_SPECS_DATA](state, data) { //删除相关信息
        state[data.headline][data.key].arr.splice(data.sub, 1);
    },

    [CATEGORY_DATA](state, data) { //品种显示
        state.basicBaseList.categoryList = data;
    },

    [UPDATE_BREED_DATA](state, data) { //修改药材
        state.basicBaseList.breedList[data.sub].code = data.code;
        state.basicBaseList.breedList[data.sub].categoryId = data.categoryId;
        state.basicBaseList.breedList[data.sub].name = data.name;
        state.basicBaseList.breedList[data.sub].id = data.id;
    },

    [UPDATE_SPEC_DATA](state, data) { //修改药材相关信息
        state.breedDetail[data.key].arr[data.sub].breedId = data.breedId;
        state.breedDetail[data.key].arr[data.sub].name = data.name;
        state.breedDetail[data.key].arr[data.sub].alias = data.name;
        state.breedDetail[data.key].arr[data.sub].id = data.id;
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
        state.basicBaseList[data.key][data.sub].category = data.category;
        state.basicBaseList[data.key][data.sub].name = data.name;
        state.basicBaseList[data.key][data.sub].type = data.type;
        state.basicBaseList[data.key][data.sub].principal = data.principal;
        state.basicBaseList[data.key][data.sub].bizScope = data.bizScope;
        state.basicBaseList[data.key][data.sub].id = data.id;
        state.basicBaseList[data.key][data.sub].tel = data.tel;
        state.basicBaseList[data.key][data.sub].email = data.email;
        state.basicBaseList[data.key][data.sub].province = data.province;
        state.basicBaseList[data.key][data.sub].address = data.address;
        state.basicBaseList[data.key][data.sub].city = data.city;
        state.basicBaseList[data.key][data.sub].comments = data.comments;
    },
    [UPDATE_CUSTOMER_DETAIL](state, data) { //修改客户相关
        state[data.headline][data.key].arr[data.sub].name = data.name;
        state[data.headline][data.key].arr[data.sub].position = data.position;
        state[data.headline][data.key].arr[data.sub].department = data.department;
        state[data.headline][data.key].arr[data.sub].phone = data.phone;
        state[data.headline][data.key].arr[data.sub].tel = data.tel;
        state[data.headline][data.key].arr[data.sub].email = data.email;
        state[data.headline][data.key].arr[data.sub].qq = data.qq;
        state[data.headline][data.key].arr[data.sub].wechart = data.wechart;
        state[data.headline][data.key].arr[data.sub].main = data.main;
    },
    [UPDATE_ADDR_DETAIL](state, data) { //修改客户地址
        state[data.headline][data.key].arr[data.sub].id = data.id;
        state[data.headline][data.key].arr[data.sub].customerId = data.customerId;
        state[data.headline][data.key].arr[data.sub].type = data.type;
        state[data.headline][data.key].arr[data.sub].contactName = data.contactName;
        state[data.headline][data.key].arr[data.sub].contactPhone = data.contactPhone;
        state[data.headline][data.key].arr[data.sub].sex = data.sex;
        state[data.headline][data.key].arr[data.sub].address = data.address;
        state[data.headline][data.key].arr[data.sub].country = data.country;
        state[data.headline][data.key].arr[data.sub].province = data.province;
        state[data.headline][data.key].arr[data.sub].city = data.city;
        state[data.headline][data.key].arr[data.sub].detailAddr = data.detailAddr;
        state[data.headline][data.key].arr[data.sub].district = data.district;
        state[data.headline][data.key].arr[data.sub].street = data.street;
    },
    [UPDATE_LABEL_DETAIL](state, data) { //修改客户标签
        state[data.headline][data.key].arr[data.sub].id = data.id;
        state[data.headline][data.key].arr[data.sub].customerId = data.customerId;
        state[data.headline][data.key].arr[data.sub].label = data.label;
        state[data.headline][data.key].arr[data.sub].remark = data.label;
        state[data.headline][data.key].arr[data.sub].status = data.status;
    },
    [UPDATE_PRODUCT_DATA](state, data) { //修改客户产品
        state[data.headline][data.key].arr[data.sub].id = data.id;
        state[data.headline][data.key].arr[data.sub].cid = data.cid;
        state[data.headline][data.key].arr[data.sub].type = data.type;
        state[data.headline][data.key].arr[data.sub].name = data.name;
        state[data.headline][data.key].arr[data.sub].breedId = data.breedId;
        state[data.headline][data.key].arr[data.sub].quality = data.quality;
        state[data.headline][data.key].arr[data.sub].location = data.location;
        state[data.headline][data.key].arr[data.sub].spec = data.spec;
        state[data.headline][data.key].arr[data.sub].number = data.number;
        state[data.headline][data.key].arr[data.sub].price = data.price;
        state[data.headline][data.key].arr[data.sub].unit = data.unit;
        state[data.headline][data.key].arr[data.sub].duedate = data.duedate;
        state[data.headline][data.key].arr[data.sub].coa = data.coa;
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
            "id": data.id
        })
    },
    [FILE_DATA](state, data) { //新增客户文件
        state.clientDetail[data.key].arr.unshift({
            "catagory": data.catagory,
            "type": data.type,
            "path": data.path,
            "customerId": data.id,
            "show": false
        })
    },
    [EMPLOYEE_DATA](state, data) { //员工列表
        state.basicBaseList.employeeList = data;
    },
    [ORG_LIST_DATA](state, data) { //部门列表
        state.basicBaseList.orgList = data;
    },
    [CHANCE_LIST_DATA](state, data) { //业务机会列表
        state.basicBaseList.chanceList = data;
    },
    [USER_DATA](state, data) { // 会员列表
        state.basicBaseList.userList = data;
    },

    [UPDATE_USER_DATA](state,data){  // 会员更新
        state.basicBaseList[data.key][data.index].fullname=data.fullname;
    },

    [EMPLOYEE_DATA](state,data){  // 业务员列表
        state.basicBaseList.employeeList = data;
    },

    [ORG_DATA](state,data){  // 部门列表
        state.basicBaseList.orgList = data;
    },
    


}

export default {
    state,
    mutations
}

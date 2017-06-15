import {
    LOGIN_DATA,
    PASSWORD_DATA,
    BACKLOG_TABLE,
    FLOW_RECORD_TABLE,
    NOTICE_TABLE,
    ORDER_TABLE,
    ORDER_ADD_DATA,
    ORDER_DETAIL_DATA,
    ORDER_UPDATE_DATA,
    ORDER_STATISTIC,
    ORDER_LINK,
    LINK_ORDER,
    CHANGE_SHOW_STATUE,
    SYSTEM_DATA,
    PROVINCE_DATA,
    SERVICE_ENTERPRISE,
    COMPANY_PRODUCT_DATA,
    COMPANY_PRODUCT_DETAIL,
    COMPANY_LICENSE_DATA,
    RELATIVE_COMPANY_DATA,
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
    CUSTOMER_BATCH_SUPPLIER,
    UPDATE_CUSTOMER_DETAIL,
    EMPLOYEE_DETAIL,
    CUSTOMER_UPDATE_DATA,
    UPDATE_ADDR_DETAIL,
    ADDRESS_TABLE,
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
    ORG_DETAIL,
    ROLE_DATA,
    QUICK_EDIT,
    FILE_DATA,
    USER_DETAIL_DATA,
    ADD_EMPLOYEE_DATA,
    UPDATE_EMPLOY_DATA,
    IDENTIFY_DATA,
    UPDATE_TRACKING_DATA,
    ADD_TRACKING_DATA,
    PURCHASE_LIST_DATA,
    DELETE_PURCHASE,
    INQUIRE_PURCHASE_STATUS,
    PURCHASE_DETAIL,
    INDENT_OFFER_DATA,
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
    INTLINTENTION_LIST_DATA,
    INTLINTENTION_DETAIL_DATA,
    INQUIRE_DATA,
    ITEM_INQUIRE,
    OUTER_OFFER_DATA,
    INTLINTENTION_INQUIRE_LIST_DATA,
    INTLINTENTION_INQUIRE_DETAIL_DATA,
    ITEM_HISTORY_DATA,
    ADD_INTLINTENTION_DATA,
    UPDATA_INTLINTENTION_DATA,
    DELETE_INTLINTENTION_DATA,
    ORIGIN_OFFER_DATA,
    OTHER_OFFER_DATA,
    DEL_OTHER_OFFER,
    CONFIRM_OFFER,
    UPLOAD_INTL_INTENT_FILE,
    DEL_INTL_INTENT_FILE,
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
    DRUG_ACCOUNT_DATA,
    ORDER_ROLLOUT_DATA,
    EXPRESS_DETAIL_DATA,
    ORG_ORDER_AUDIT,
    BATCH_ORG_ORDER,
    UPDATE_ENTERPRISE,
    ROLLOUT_STATUS,
    ROLLOUT_DETAIL,
    USER_TYPE,
    CALL_RECORD_DATA,
    CALL_COUNT_DATA,
    CALL_RECORD_VOICE_DATA,
    EMAIL_DATA,
    EMAIL_COUNT,
    MUlT_DICTIONARY,
    MY_ORG_COUNT,
    STOCK_LIST,
    DELETE_STOCK_DATA,
    ADD_STOCK_LIST,
    UPDATE_OFFERDESCRIPTION,
    NEW_USER_DETAIL,
    NEW_DEAL_DETAIL,
    NEW_ACTIVE_DETAIL,
    YESTODAY_DETAIL,
    PROVINCE_DETAIL,
    ORG_PROVINCE_DETAIL,
    OFFER_MESSAGE_TABLE,
    CLEAR_NOTICE_TABLE,
    ORG_YESTODAY_DETAIL,
    ORG_SALEMAN_DETAIL,
    ALL_YESTODAY_DETAIL,
    ALL_ORG_DETAIL,
    ALL_PROVINCE_DETAIL,
    BREED_PROVINCE_DETAIL,
    ORGBREED_PROVINCE_DETAIL,
    ALLBREED_PROVINCE_DETAIL,
    CUSTYPE_DETAIL,
    ORG_CUSTYPE_DETAIL,
    ALL_CUSTYPE_DETAIL,
    CHANGE_ADDBREEDDETAIL,
    CHANGE_DEALBREEDDETAIL,
    YESTODAY_BREED_DETAIL,
    ORGYESTODAY_BREED_DETAIL,
    ALLYESTODAY_BREED_DETAIL,
    CHANGE_ORGADDBREEDDETAIL,
    CHANGE_ALLADDBREEDDETAIL,
    CHANGE_BREEDORDER_DETAIL,
    ADD_BREED_LOCAL,
    SELECT_SAMPLECOUNT,
    SELECT_MAINORDERCOUNT,
    SELECT_SAMPLEDETAIL,
    SELECT_MAINORDERDETAIL,
    CHANGE_BREEDCOUNT,
    CHANGE_SENDBREEDCOUNT,
    CHANGE_DEALBREEDCOUNT,
    CHANGE_CANCELRECORD,
    CHANGE_BILLLIST,
    CUSTOMER_COUNT_LIST,
    CUSTOMER_COUNT_TOTAL,
    CUSTOMER_COUNT_DETAIL_LIST,
    CUSTOMER_COUNT_DETAIL_TOTAL,
    SUPPLIER_COUNT_LIST,
    SUPPLIER_COUNT_TOTAL,
    SUPPLIER_COUNT_DETAIL_LIST,
    SUPPLIER_COUNT_DETAIL_TOTAL,

} from '../mutation-types'




var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}



function uncompile(code) {
    var test = base64decode(code);
    test = unescape(test);
    return test;

}


function getCookie(name) { //获取cookie
    var search = name + "=";
    var offset = document.cookie.indexOf(search);
    if (offset == -1) { //cookie中不存在这个变量
        return '';
    } else {
        offset += search.length;
        var end = document.cookie.indexOf(";", offset);
        if (end == -1) {
            end = document.cookie.length;
        }
        return (document.cookie.substring(offset, end));
    }
}



const state = {
    isTop: false, //用于判断是左侧列表还是上部列表
    login: {
        "id": uncompile(getCookie('id')),
        "name": uncompile(getCookie('name')),
        "no": uncompile(getCookie('no')),
        "orgId": uncompile(getCookie('orgId')),
        "time": getCookie('time'),
        "privilege": getCookie('privilege'),
        "safeCode": getCookie('safeCode')
    },
    systemBaseList: {
        enumlist: [],
        countryList: [],
        cityList: [],
        districtList: [],
        locationlist: [],
        CNProvince: [
            { "id": "247", "cname": "北京(beijing)" },
            { "id": "248", "cname": "天津(tianjin)" },
            { "id": "249", "cname": "河北(hebei)" },
            { "id": "250", "cname": "山西(shanxi)" },
            { "id": "251", "cname": "内蒙古(neimenggu)" },
            { "id": "252", "cname": "辽宁(liaoning)" },
            { "id": "253", "cname": "吉林(jilin)" },
            { "id": "254", "cname": "黑龙江(heilongjiang)" },
            { "id": "255", "cname": "上海(shanghai)" },
            { "id": "256", "cname": "江苏(jiangsu)" },
            { "id": "257", "cname": "浙江(zhejiang)" },
            { "id": "258", "cname": "安徽(anhui)" },
            { "id": "259", "cname": "福建(fujian)" },
            { "id": "260", "cname": "江西(jiangxi)" },
            { "id": "261", "cname": "山东(shandong)" },
            { "id": "262", "cname": "河南(henan)" },
            { "id": "263", "cname": "湖北(hubei)" },
            { "id": "264", "cname": "湖南(hunan)" },
            { "id": "265", "cname": "广东(guangdong)" },
            { "id": "266", "cname": "广西(guangxi)" },
            { "id": "267", "cname": "海南(hainan)" },
            { "id": "268", "cname": "重庆(chongqing)" },
            { "id": "269", "cname": "四川(sichuan)" },
            { "id": "270", "cname": "贵州(guizhou)" },
            { "id": "271", "cname": "云南(yunnan)" },
            { "id": "272", "cname": "西藏(xizang)" },
            { "id": "273", "cname": "陕西(sanxi)" },
            { "id": "274", "cname": "甘肃(gansu)" },
            { "id": "275", "cname": "青海(qinghai)" },
            { "id": "276", "cname": "宁夏(ningxia)" },
            { "id": "277", "cname": "新疆(xinjiang)" },
            { "id": "278", "cname": "台湾(taiwan)" },
            { "id": "279", "cname": "香港(xianggang)" },
            { "id": "280", "cname": "澳门(aomen)" },

        ],
    },

    label: {
        auditLabel: [
            { "text": "文本1" }
        ]
    },

    basicBaseList: {
        //待办事项列表
        backlogList: [],
        //报价项列表
        offerMessageList: [],
        //流程记录
        flowRecord: [],
        //通知列表
        noticeList: [],
        //订单列表
        userOrderList: [],
        myOrderList: [],
        orgOrderList: [{
            "id": "5726ea3bf22125bcdcff7820",
            "type": 0,
            "sample": 0,
            "intl": 0,
            "sourceType": 1,
            "link": "1234567890",
            "customer": null,
            "user": null,
            "amount": 200.000000,
            "incidentals": 0.000000,
            "incidentalsDesc": null,
            "preferential": 0.000000,
            "preferentialDesc": null,
            "total": 200.000000,
            "currency": 0,
            "lcompanyId": null,
            "lcompanyName": null,
            "logisticsNo": null,
            "consignee": "测试",
            "consigneePhone": "18505565316",
            "zipCode": "000000",
            "country": "7",
            "province": null,
            "city": null,
            "district": null,
            "employee": null,
            "orderStatus": 0,
            "status": 1,
            "visit": 0,
            "pay": 0,
            "ptime": null,
            "payWay": null,
            "invoice": 0,
            "logistics": 0,
            "stime": null,
            "consigneeAddr": "北京,北京,西城区 阿伦",
            "no": "20160502134843429001",
            "clients": 0,
            "cancleCauses": null,
            "comments": "快点，急用",
            "ftime": null,
            "updater": null,
            "utime": "2016-09-13 14:32",
            "creater": "b11741af0efc49ed815545c0d88ddc98",
            "ctime": "2016-05-02 13:48",
            "goods": null,
            "payPics": null,
            "sendPics": null,
            term: 0
        }],
        allOrderList: [{
            "id": "5726ea3bf22125bcdcff7820",
            "type": 0,
            "sample": 0,
            "intl": 0,
            "sourceType": 1,
            "link": "1234567890",
            "customer": null,
            "user": null,
            "amount": 200.000000,
            "incidentals": 0.000000,
            "incidentalsDesc": null,
            "preferential": 0.000000,
            "preferentialDesc": null,
            "total": 200.000000,
            "currency": 0,
            "lcompanyId": null,
            "lcompanyName": null,
            "logisticsNo": null,
            "consignee": "测试",
            "consigneePhone": "18505565316",
            "zipCode": "000000",
            "country": "7",
            "province": null,
            "city": null,
            "district": null,
            "employee": null,
            "orderStatus": 0,
            "status": 1,
            "visit": 0,
            "pay": 0,
            "ptime": null,
            "payWay": null,
            "invoice": 0,
            "logistics": 0,
            "stime": null,
            "consigneeAddr": "北京,北京,西城区 阿伦",
            "no": "20160502134843429001",
            "clients": 0,
            "cancleCauses": null,
            "comments": "快点，急用",
            "ftime": null,
            "updater": null,
            "utime": "2016-09-13 14:32",
            "creater": "b11741af0efc49ed815545c0d88ddc98",
            "ctime": "2016-05-02 13:48",
            "goods": null,
            "payPics": null,
            "sendPics": null
        }],
        purchaseOrderList: [{
            "id": "5726ea3bf22125bcdcff7820",
            "type": 0,
            "sample": 0,
            "intl": 0,
            "sourceType": 1,
            "link": "1234567890",
            "customer": null,
            "user": null,
            "amount": 200.000000,
            "incidentals": 0.000000,
            "incidentalsDesc": null,
            "preferential": 0.000000,
            "preferentialDesc": null,
            "total": 200.000000,
            "currency": 0,
            "lcompanyId": null,
            "lcompanyName": null,
            "logisticsNo": null,
            "consignee": "测试",
            "consigneePhone": "18505565316",
            "zipCode": "000000",
            "country": "7",
            "province": null,
            "city": null,
            "district": null,
            "employee": null,
            "orderStatus": 0,
            "status": 1,
            "visit": 0,
            "pay": 0,
            "ptime": null,
            "payWay": null,
            "invoice": 0,
            "logistics": 0,
            "stime": null,
            "consigneeAddr": "北京,北京,西城区 阿伦",
            "no": "20160502134843429001",
            "clients": 0,
            "cancleCauses": null,
            "comments": "快点，急用",
            "ftime": null,
            "updater": null,
            "utime": "2016-09-13 14:32",
            "creater": "b11741af0efc49ed815545c0d88ddc98",
            "ctime": "2016-05-02 13:48",
            "goods": null,
            "payPics": null,
            "sendPics": null
        }],
        sellOrderList: [{
            "id": "5726ea3bf22125bcdcff7820",
            "type": 0,
            "sample": 0,
            "intl": 0,
            "sourceType": 1,
            "link": "1234567890",
            "customer": null,
            "user": null,
            "amount": 200.000000,
            "incidentals": 0.000000,
            "incidentalsDesc": null,
            "preferential": 0.000000,
            "preferentialDesc": null,
            "total": 200.000000,
            "currency": 0,
            "lcompanyId": null,
            "lcompanyName": null,
            "logisticsNo": null,
            "consignee": "测试",
            "consigneePhone": "18505565316",
            "zipCode": "000000",
            "country": "7",
            "province": null,
            "city": null,
            "district": null,
            "employee": null,
            "orderStatus": 0,
            "status": 1,
            "visit": 0,
            "pay": 0,
            "ptime": null,
            "payWay": null,
            "invoice": 0,
            "logistics": 0,
            "stime": null,
            "consigneeAddr": "北京,北京,西城区 阿伦",
            "no": "20160502134843429001",
            "clients": 0,
            "cancleCauses": null,
            "comments": "快点，急用",
            "ftime": null,
            "updater": null,
            "utime": "2016-09-13 14:32",
            "creater": "b11741af0efc49ed815545c0d88ddc98",
            "ctime": "2016-05-02 13:48",
            "goods": null,
            "payPics": null,
            "sendPics": null
        }],
        toDoOrderList: [],
        orderList: [{
            "id": "5726ea3bf22125bcdcff7820",
            "type": 0,
            "sample": 0,
            "intl": 0,
            "sourceType": 1,
            "link": "1234567890",
            "customer": null,
            "user": null,
            "amount": 200.000000,
            "incidentals": 0.000000,
            "incidentalsDesc": null,
            "preferential": 0.000000,
            "preferentialDesc": null,
            "total": 200.000000,
            "currency": 0,
            "lcompanyId": null,
            "lcompanyName": null,
            "logisticsNo": null,
            "consignee": "测试",
            "consigneePhone": "18505565316",
            "zipCode": "000000",
            "country": "7",
            "province": null,
            "city": null,
            "district": null,
            "employee": null,
            "orderStatus": 0,
            "status": 1,
            "visit": 0,
            "pay": 0,
            "ptime": null,
            "payWay": null,
            "invoice": 0,
            "logistics": 0,
            "stime": null,
            "consigneeAddr": "北京,北京,西城区 阿伦",
            "no": "20160502134843429001",
            "clients": 0,
            "cancleCauses": null,
            "comments": "快点，急用",
            "ftime": null,
            "updater": null,
            "utime": "2016-09-13 14:32",
            "creater": "b11741af0efc49ed815545c0d88ddc98",
            "ctime": "2016-05-02 13:48",
            "goods": [{ "breedName": "三七" }],
            "payPics": null,
            "sendPics": null
        }],
        myOrderLinkList: [],
        orgOrderLinkList: [],
        linkOrder: { arr: [] },
        orgOrderStatis: "",
        allOrderStatis: "",

        enterpriseList: [
            { "id": 0, "number": "00", "category": "0ww", "name": "上海ee冕冠", "tel": "13162875213", "legal_person": "卡卡", "principal": "来啦", "biz_scope": "包括很多、很多、、、", "province": "上海虹口区", "city": "虹口区", "address": "上海虹口江湾镇", "release_date": "2015-07-07", "due_date": "2018-07-07", "show": "true" },
            { "id": 1, "number": "11", "category": "3243", "name": "上海冕冠", "tel": "13162875213", "legal_person": "卡卡", "principal": "来啦", "biz_scope": "包括很多、很多、、、", "province": "上海虹口区", "city": "虹口区", "address": "上海虹口江湾镇", "release_date": "2015-07-07", "due_date": "2018-07-07", "show": "false" }
        ],
        companyProductList: [],
        companyLicenseList: [],
        relativeCompanyList: [],
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
        drugList: {
            arr: [
                { "id": 176311, "number": "国药准字Z20093164", "name": "麝香祛痛搽剂", "nameEn": "", "product": "", "agentType": "搽剂", "spec": "每瓶装60ml", "company": "远大医药黄石飞云制药有限公司", "address": "湖北省黄石市鄂黄路52号", "drugType": "中药", "numberOld": "", "approveDate": "2014-03-03 00:00", "code": "86901890001064", "linkDb": "药品广告 中药保护品种库", "ctime": "2016-09-02 16:52", "show": true },
                { "id": 176312, "number": "国药准字Z20093165", "name": "麝香祛痛搽剂", "nameEn": "", "product": "", "agentType": "搽剂", "spec": "每瓶装60ml", "company": "浙江景岳堂药业有限公司", "address": "湖北省黄石市鄂黄路52号", "drugType": "中药", "numberOld": "", "approveDate": "2014-03-03 00:00", "code": "86901890001064", "linkDb": "药品广告 中药保护品种库", "ctime": "2016-09-02 16:52", "show": true }
            ],
            show: true
        },
        //客户列表
        customerList: [
            { "id": 0, "type": 0, "typeDesc": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false }
        ],
        myCustomerList: [
            { "id": 0, "type": 0, "typeDesc": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false }
        ],
        orgCustomerList: [
            { "id": 0, "type": 0, "typeDesc": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false }
        ],
        allCustomerList: [
            { "id": 0, "type": 0, "typeDesc": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false }
        ],
        blackCustomerList: [
            { "id": 0, "type": 0, "typeDesc": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false }
        ],
        unCustomerList: [
            { "id": 0, "type": 0, "typeDesc": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false }
        ],
        supplyCustomerList: [
            { "id": 0, "type": 0, "typeDesc": 0, "name": "ddd", "category": "14555", "principal": "suny", "biz_scope": "djkdfd", "tel": "13162875213", "email": "大大", "province": "上海市", "city": "虹口", "address": "上海市虹口区", "employee_id": "AAA", "credit_level": "AAA", "show": true, "checked": false }
        ],
        //收货地址列表
        addressList: [],
        //客户通话记录
        callRecordList: [],
        //客户通话记录统计
        callCountList: [],
        //产品列表
        productList: [
            { "id": "442", "cid": 1, "type": "1", "name": "1111", "breedId": 1111, "quality": "1111", "location": "111", "spec": "干", "number": 1111, "price": 11, "unit": "1111", "duedate": "2016-10-23 00:00", "coa": 0, "comments": null, "status": 1, "show": true }
        ],
        //产品文件列表
        productList: [{ bizId: "2", bizType: "product_license", breedId: 812, category: 0, cid: 27578, cname: null, coa: 0, comments: null, creater: "100014", ctime: "2016-12-05 14:43", description: "", fileType: "image", id: 10492, location: "山西", name: "测试", path: "/local/validate/58450c98f0682b631a31d502.png", pname: "22", quality: "", spec: "10:1（%）", status: 1, type: "提取物", updater: null, url: "http://192.168.1.248:70/img/local/validate/58450c98f0682b631a31d502.png", utime: null }],
        //采购单列表
        myPurchaseList: [{ checked: false }, { checked: false }],
        orgPurchaseList: [{ checked: false }, { checked: false }, { checked: false }],
        allPurchaseList: [{ checked: false }, { checked: false }, { checked: false }, { checked: false }],
        //采购单报价列表
        purchaseOfferList: [{}],
        //意向列表
        userIntentionList: [
            { "id": "1201608221917540470", "customerId": "29565", "customerName": "段飞", "customerPhone": "15871287716", "type": 1, "especial": 1, "breedId": 1174, "breedName": "艾叶", "location": "湖北", "spec": "全叶", "unit": "63", "province": "湖北", "city": "孝感", "district": "大悟县", "address": "城区", "invoic": 0, "visit": 0, "pack": "机压包", "intl": 0, "country": "中国", "offerTotal": 0, "status": 1, "show": true }
        ],
        myIntentionList: [
            { "id": "1201608221917540470", "customerId": "29565", "customerName": "段飞", "customerPhone": "15871287716", "type": 1, "especial": 1, "breedId": 1174, "breedName": "艾叶", "location": "湖北", "spec": "全叶", "unit": "63", "province": "湖北", "city": "孝感", "district": "大悟县", "address": "城区", "invoic": 0, "visit": 0, "pack": "机压包", "intl": 0, "country": "中国", "offerTotal": 0, "status": 1, "show": true }

        ],
        orgIntentionList: [
            { "id": "1201608221917540470", "customerId": "29565", "customerName": "段飞", "customerPhone": "15871287716", "type": 1, "especial": 1, "breedId": 1174, "breedName": "艾叶", "location": "湖北", "spec": "全叶", "unit": "63", "province": "湖北", "city": "孝感", "district": "大悟县", "address": "城区", "invoic": 0, "visit": 0, "pack": "机压包", "intl": 0, "country": "中国", "offerTotal": 0, "status": 1, "show": true }
        ],
        unIntentionList: [
            { "id": "1201608221917540470", "customerId": "29565", "customerName": "段飞", "customerPhone": "15871287716", "type": 1, "especial": 1, "breedId": 1174, "breedName": "艾叶", "location": "湖北", "spec": "全叶", "unit": "63", "province": "湖北", "city": "孝感", "district": "大悟县", "address": "城区", "invoic": 0, "visit": 0, "pack": "机压包", "intl": 0, "country": "中国", "offerTotal": 0, "status": 1, "show": true }
        ],
        intentionList: [
            { "id": "1201608221917540470", "customerId": "29565", "customerName": "段飞", "customerPhone": "15871287716", "type": 1, "especial": 1, "breedId": 1174, "breedName": "艾叶", "location": "湖北", "spec": "全叶", "unit": "63", "province": "湖北", "city": "孝感", "district": "大悟县", "address": "城区", "invoic": 0, "visit": 0, "pack": "机压包", "intl": 0, "country": "中国", "offerTotal": 0, "status": 1, "show": true }

        ],
        //国际意向列表
        myIntlIntentionList: [

        ],
        orgIntlIntentionList: [

        ],
        intlIntentionList: [

        ],
        intlIntentionInquireList: [
            { "id": "7", "intentionId": "58228a6688e87dc057d5e969", "inquire": 1, "inquireType": "FOB&CIF", "comment": "卖报的小行家", "ctime": "2016-11-09 10:31:51" }
        ],
        supplyDemandList: [
            { "id": "1201608221917540470", "customerId": "29565", "customerName": "段飞", "customerPhone": "15871287716", "type": 1, "especial": 1, "breedId": 1174, "breedName": "艾叶", "location": "湖北", "spec": "全叶", "unit": "63", "province": "湖北", "city": "孝感", "district": "大悟县", "address": "城区", "invoic": 0, "visit": 0, "pack": "机压包", "intl": 0, "country": "中国", "offerTotal": 0, "status": 1, "show": true }

        ],
        //报价列表
        myOfferList: [
            { "id": "163", "intentionId": "57568d24a2ec516dc1d0f57c", "userId": "3ed2a1d7dafe449eb5e631a46f20f713", "customerId": null, "number": 3000, "unit": "63", "price": 12.000000, "incidentals": 1.000000, "incidentalsDesc": "含运费价格", "total": 36000.000000, "qualification": null, "quality": null, "location": null, "spec": null, "advance": null, "invoic": null, "visit": null, "pack": null, "sampling": null, "sampleNumber": null, "sampleUnit": null, "sampleAmount": null, "address": null, "comments": null, "otime": "2016-06-07 17:19", "clients": null, "status": 1, "description": "", "updater": null, "utime": "2016-09-27 10:08", "creater": null, "ctime": "2016-09-27 10:08" },
        ],
        orgOfferList: [
            { "id": "163", "intentionId": "57568d24a2ec516dc1d0f57c", "userId": "3ed2a1d7dafe449eb5e631a46f20f713", "customerId": null, "number": 3000, "unit": "63", "price": 12.000000, "incidentals": 1.000000, "incidentalsDesc": "含运费价格", "total": 36000.000000, "qualification": null, "quality": null, "location": null, "spec": null, "advance": null, "invoic": null, "visit": null, "pack": null, "sampling": null, "sampleNumber": null, "sampleUnit": null, "sampleAmount": null, "address": null, "comments": null, "otime": "2016-06-07 17:19", "clients": null, "status": 1, "description": "", "updater": null, "utime": "2016-09-27 10:08", "creater": null, "ctime": "2016-09-27 10:08" },
        ],
        offerList: [
            { "id": "163", "intentionId": "57568d24a2ec516dc1d0f57c", "userId": "3ed2a1d7dafe449eb5e631a46f20f713", "customerId": null, "number": 3000, "unit": "63", "price": 12.000000, "incidentals": 1.000000, "incidentalsDesc": "含运费价格", "total": 36000.000000, "qualification": null, "quality": null, "location": null, "spec": null, "advance": null, "invoic": null, "visit": null, "pack": null, "sampling": null, "sampleNumber": null, "sampleUnit": null, "sampleAmount": null, "address": null, "comments": null, "otime": "2016-06-07 17:19", "clients": null, "status": 1, "description": "", "updater": null, "utime": "2016-09-27 10:08", "creater": null, "ctime": "2016-09-27 10:08" },
        ],
        msgList: [],
        preSellMsgList: [],
        intentionDetail: {
            msgs: {
                arr: []
            },
            trackings: {
                arr: []
            },
            importQualityPics: [],
            testReportPics: [],
            labels: {
                arr: []
            }
        },
        intentionOfferDetail: {
            offer: {},
            intention: {},
        },
        intlIntentionDetail: {},
        intlIntentionInquireDetail: {},
        itemHistory: {},
        outerOfferList: [],
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
        roleList: [{ "id": 2, "cname": "系统管理员000", "remark": "具有管理员权限", "sortnum": null, "menus": "16,14,13,12,28,27,26,25,11,24,23,9,22,21,8,7,3,2,18,1", "updater": null, "utime": null, "creater": null, "ctime": null, "status": null }],
        userList: [{
            "id": "0008fcc6c2d549888afb2e950e6343c1",
            "type": 0,
            "password": "56bf5523459ce2dfc6720798d852d6e6",
            "nickname": "卖蘑菇的小姑凉",
            "fullname": "沈威峰",
            "phone": "13851379713",
            "email": "857714234@qq.com",
            "qq": "857714234",
            "company": "个体种植户",
            "score": 300,
            "source": 1,
            "status": 0,
            "userIds": null,
            "customerId": null,
            "main": null,
            "show": true
        }],
        filesList: [{
            "id": 2617,
            "fileType": "image",
            "bizType": "customer_license",
            "bizId": "57f8817888e8bb85da01df7b",
            "path": "/photos/order_photos_other/57f8815a88e8bb85da01df7a.jpg",
            "description": null,
            "status": 1,
            "category": 0,
            "show": true
        }],
        expressList: [{
            "id": 2,
            "name": "韵达快运",
            "code": "yunda",
            "codeAick": "yunda",
            "status": 1,
            "show": true
        }],
        orderPayList: [{
            "id": "580ebddddeb2e33b1ffb9495",
            "payWay": "3",
            "orderId": "57f88e6288e8bb85da01df9b",
            "orderNo": "11111",
            "payFee": "0"
        }],
        drugAccountList: [],
        orderRolloutList: {
            list: []
        },
        //邮件列表
        emailList: [],
        //邮件统计
        emailCount: [],
        userTypeList: [{
            "name": "其它",
            "id": 0
        }]
    },
    orderDetail: {
        "id": "5726ea3bf22125bcdcff7820",
        "type": 0,
        "sample": 0,
        "intl": 0,
        "sourceType": 1,
        "link": "1234567890",
        "customer": null,
        "user": null,
        "amount": 200.000000,
        "incidentals": 0.000000,
        "incidentalsDesc": null,
        "preferential": 0.000000,
        "preferentialDesc": null,
        "total": 200.000000,
        "currency": 0,
        "lcompanyId": null,
        "lcompanyName": null,
        "logisticsNo": null,
        "consignee": "韦军军",
        "consigneePhone": "18505565316",
        "zipCode": "000000",
        "country": "7",
        "province": null,
        "city": null,
        "district": null,
        "employee": null,
        "orderStatus": 0,
        "status": 1,
        "visit": 0,
        "pay": 0,
        "ptime": null,
        "payWay": null,
        "invoice": 0,
        "logistics": 0,
        "stime": null,
        "consigneeAddr": "北京,北京,西城区 阿伦",
        "no": "20160502134843429001",
        "clients": 0,
        "cancleCauses": null,
        "comments": null,
        "ctime": "2016-05-02 13:48",
        "goods": { arr: [], show: false },
        "payPics": { arr: [], show: false },
        "sendPics": { arr: [], show: false },
        "attachFiles": { arr: [], show: false },
        "stages": { arr: [], show: false },
        "contractList": { arr: [], show: false }
    },
    purchaseDetail: { "intentionList": { arr: [], show: false } },
    indentOfferList: [],
    myIndentOfferList: [],
    allIndentOfferList: [],
    purchaseOfferDetail: {},
    locationList: {
        provinceList: [
            { "id": 248, "pid": 7, "path": ",1,7,248,", "level": 3, "cname": "天津", "nameEn": "Tianjin", "namePy": null, "code": "12", "twoNumber": null, "number": null, "iso": null, "sortnum": 248, "show": true }
        ]
    },
    breedDetail: {
        "code": "232去",
        "icon": "http://p.ayxbk.com/images/thumb/4/4f/Bkg32.jpg/220px-Bkg32.jpg",
        "units": {
            arr: [],
            show: false
        },
        "specs": {
            arr: [],
            show: true
        },
        "name": "花类",
        "alias": { arr: [], show: false },
        "id": 1001,
        "categoryId": 810,
        "show": true,
        "locals": {
            arr: [],
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
    companyProductDetail: { "drugList": [] },
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
            arr: [],
            show: false
        },
        "intention": {
            arr: [],
            show: false,
        },
        "orders": {
            arr: [],
            show: false,
        },
    },

    userDetail: {
        "id": "00012792255a4e22bf1b70eb6eb89b33",
        "type": 0,
        "name": null,
        "password": "45ed3749b1633c0ee7c64b99cba11eba",
        "gender": null,
        "nickname": null,
        "fullname": "测试",
        "idnumber": null,
        "signature": null,
        "phone": "15301546841",
        "email": null,
        "qq": null,
        "tel": null,
        "openId": null,
        "avatar": null,
        "url": null,
        "signin": null,
        "company": "上海大汉三通通信股份有限公司",
        "address": null,
        "employee": "wei",
        "orgId": null,
        "employeeId": null,
        "score": 300,
        "utype": 1,
        "ctype": 0,
        "addrShip": null,
        "addrReceive": null,
        "busiType": null,
        "province": null,
        "city": null,
        "source": 1,
        "lastLoginIp": null,
        "lastLoginTime": null,
        "status": null,
        "updater": null,
        "utime": null,
        "creater": null,
        "ctime": null,
        "startCtime": null,
        "endCtime": null,
        "userIds": null,
        "customerId": null,
        "main": null,
        "audit": 0,
        "bizMain": null,
        "userType": 0,
        "auditResult": null,
        "sourceType": null,
        "intention": { "show": false, "arr": [] },
        "tracking": { "show": false, "arr": [] },
        "orders": { "show": false, "arr": [] },
        "personalAuthShow": false,
        "companyAuthShow": false
    },
    logisticsDetail: {
        "com": "yunda",
        "codenumber": "3903300539521",
        "ischeck": "1",
        "condition": "F00",
        "data": [{
            "ftime": "2016-08-20 18:06:39",
            "context": "在河南南阳公司卧龙分部进行签收扫描，快件已被 已签收 签收",
            "location": "",
            "time": "2016-08-20 18:06:39"
        }, {
            "ftime": "2016-08-20 18:02:01",
            "context": "在河南南阳公司卧龙分部进行派件扫描；派送业务员：邓师傅；联系电话：15637757071",
            "location": "",
            "time": "2016-08-20 18:02:01"
        }, ],
        "companytype": "yunda",
        "nu": "3903300539521"
    },
    productDetail: {
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
        "filesList": {
            arr: [
                { "id": 1, "customerId": 10, "label": "dfhidfhi", "status": 0, "show": true }
            ],
            show: false
        }
    },
    rolloutDetail: {
        "moneyRecords": {
            arr: [],
            show: false
        },
        "moneyRollIns": {
            arr: [],
            show: false
        },
        "moneyRollOuts": {
            arr: [],
            show: false
        }
    },
    identify: {},
    trackingDetail: {},
    employeeDetail: {},
    orgDetail: {},
    dictionary: [{ fileName: '', dictionary: {}, arr: [], isEdit: false }],
    orgCount: {}, //部门统计state
    stockList: [{ checked: false }, { checked: false }],
    stockCartList: [],
    yearNum: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    newUserDetail: [{ name: "测试" }, { name: "测试" }, { name: "测试" }, { name: "测试" }],
    newDealDetail: [{ name: "测试" }, { name: "测试" }, { name: "测试" }, { name: "测试" }],
    newActiveDetail: [{ name: "测试" }, { name: "测试" }, { name: "测试" }, { name: "测试" }],
    yestodayDetail: [],
    orgYestodayDetail: [],
    allYestodayDetail: [],
    orgSalemanDetail: [{ name: "测试" }, { name: "测试" }, { name: "测试" }, { name: "测试" }],
    allOrgDetail: [{ name: "3" }, { name: "2" }, { name: "1" }, { name: "4" }],
    provinceDetail: [],
    orgProvinceDetail: [],
    allProvinceDetail: [],
    breedProvinceDetail: [],
    orgBreedProvinceDetail: [],
    allBreedProvinceDetail: [],
    cusTypeDetail: [],
    orgCusTypeDetail: [],
    allCusTypeDetail: [],
    breedOrderDetail: [],
    addBreedDetail: [{ name: "测试" }, { name: "测试" }, { name: "测试" }, { name: "测试" }],
    dealBreedDetail: [{ name: "测试" }, { name: "测试" }, { name: "测试" }, { name: "测试" }],
    yestodayDealBreed: [{ name: "测试" }, { name: "测试" }, { name: "测试" }, { name: "测试" }],
    orgYestodayDealBreed: [{ breedName: "部门成交测试" }, { breedName: "部门成交测试" }, { breedName: "部门成交测试" }, { breedName: "部门成交测试" }],
    allYestodayDealBreed: [{ breedName: "全部成交测试" }, { breedName: "全部成交测试" }, { breedName: "全部成交测试" }, { breedName: "全部成交测试" }],
    orgAddBreedDetail: [{ breedName: "部门新增测试" }, { breedName: "部门新增测试" }, { breedName: "部门新增测试" }, { breedName: "部门新增测试" }],
    allAddBreedDetail: [{ breedName: "全部新增测试" }, { breedName: "全部新增测试" }, { breedName: "全部新增测试" }, { breedName: "全部新增测试" }],
    sampleCountList: [],
    mianOrderCountList: [],
    sampleCountDetail: [],
    mianOrderCountDetail: [],
    breedCountList: [],
    sendBreedList: [],
    dealBreedList: [],
    cancelRecordList: [],
    billList: [],
    customerCountList: [],
    customerCountTotal: {},
    customerCountDetailList: [],
    customerCountDetailTotal: {},
    supplierCountList: [],
    supplierCountTotal: {},
    supplierCountDetailList: [],
    supplierCountDetailTotal: {},
}

const mutations = {
    [LOGIN_DATA](state, data) { //登录
        state.login = data;
    },
    [BACKLOG_TABLE](state, data) {
        state.basicBaseList.backlogList = data;
    },
    [CLEAR_NOTICE_TABLE](state, data) {
        state.basicBaseList.noticeList = [];
    },
    [OFFER_MESSAGE_TABLE](state, data) {
        state.basicBaseList.offerMessageList = data;
    },
    [FLOW_RECORD_TABLE](state, data) {
        state.basicBaseList.flowRecord = data;
    },
    [NOTICE_TABLE](state, data) {
        state.basicBaseList.noticeList = state.basicBaseList.noticeList.concat(data);
        console.log(state.basicBaseList.noticeList)
    },

    [USER_TYPE](state, data) {
        state.basicBaseList.userTypeList = data;
    },
    [ORDER_TABLE](state, data) { //订单列表
        if (data.key) {
            state.basicBaseList[data.key] = data;
        } else if (data.titles == '申请发货') {
            state.basicBaseList.orderList[data.sub].verifier = data.verifier;
            state.basicBaseList.orderList[data.sub].logistics = data.logistics;
        } else if (data.titles == '售后申请') {
            state.basicBaseList.orderList[data.sub].logistics = data.logistics;
        } else if (data.link == '/order/transferToEmployee') {
            //state.basicBaseList.orderList.shift(data.id)

            //state.basicBaseList.userOrderList.splice(data.itemSub, 1);

        } else {
            state.basicBaseList.orderList = data;
        }

    },
    [ORDER_LINK](state, data) {
        if (data.key) {
            state.basicBaseList[data.key] = data;
        }
    },
    [LINK_ORDER](state, data) {
        state.basicBaseList.linkOrder = data;
    },
    [ORDER_STATISTIC](state, data) {
        if (data.key == "orgOrderList") {
            state.basicBaseList.orgOrderStatis = data;
        }
        if (data.key == "allOrderList") {
            state.basicBaseList.allOrderStatis = data;
        }

    },

    [EXPRESS_DATA](state, data) { //物流列表
        state.basicBaseList.expressList = data;
    },
    [EXPRESS_DETAIL_DATA](state, data) { //物流详情
        console.log(data)
        state.logisticsDetail = data;
    },
    [ORG_ORDER_AUDIT](state, data) { //审核部门订单(个人)
        state.basicBaseList[data.key][data.index].validate = data.validate;
        state.basicBaseList[data.key][data.index].logistics = data.logistics;
    },
    [BATCH_ORG_ORDER](state, data) { // 批量审核部门订单

        for (var i = 0; i < data.indexs.length; i++) {
            var k = data.indexs[i];
            state.basicBaseList[data.key][k].checked = false;
            for (var key in data) {
                if (key == "validate" && data[key] == 2) {
                    state.basicBaseList[data.key][k].validate = "2";
                } else if (key == "validate" && data[key] == -2) {
                    state.basicBaseList[data.key][k].validate = "-2";
                } else if (key == "validate" && data[key] == 1) {
                    state.basicBaseList[data.key][k].validate = "1";
                }
                state.basicBaseList[data.key][k][key] = data[key];
            }
        }
    },
    [ORDER_PAY_DATA](state, data) { //订单支付记录
        state.basicBaseList.orderPayList = data;
    },
    [DRUG_ACCOUNT_DATA](state, data) { //药款账户
        state.basicBaseList.drugAccountList = data;
    },
    [ORDER_ROLLOUT_DATA](state, data) { //药款转出记录
        state.basicBaseList.orderRolloutList = data;
    },
    [ROLLOUT_DETAIL](state, data) { //药款转出详情
        console.log(data)
        state.rolloutDetail = data;
    },
    [ROLLOUT_STATUS](state, data) {
        console.log(data)
        if (data.link == '/money/rollOutHandle' && data.key == 'moneyRollOuts') {
            for (var i in data) {
                if (i == "status" && data[i] == 1) {
                    state.rolloutDetail[data.key].arr[data.sub].status = "1";
                } else if (i == "status" && data[i] == 2) {
                    state.rolloutDetail[data.key].arr[data.sub].status = "2";
                } else if (i == "status" && data[i] == 3) {
                    state.rolloutDetail[data.key].arr[data.sub].status = "3";
                }
            }
        } else {
            for (var key in data) {
                if (key == "status" && data[key] == 1) {
                    state.basicBaseList.orderRolloutList[data.sub].status = "1";
                } else if (key == "status" && data[key] == 2) {
                    state.basicBaseList.orderRolloutList[data.sub].status = "2";
                } else if (key == "status" && data[key] == 3) {
                    state.basicBaseList.orderRolloutList[data.sub].status = "3";
                }
            }
        }
    },
    [PASSWORD_DATA](state, data) { //修改登录密码
        console.log(data)
        for (var key in data) {
            state.login[key] = data[key];
        }
    },
    [ORDER_UPDATE_DATA](state, data) { //修改订单
        console.log(data)
        for (var key in data) {
            state.basicBaseList.myOrderList[data.index][key] = data[key];
        }

    },
    [ORDER_ADD_DATA](state, data) { //创建订单
        if (data.key == 'intentionDetail') {
            console.log('意向详情采纳报价');
            state.basicBaseList.intentionDetail.offers.arr[data.index].orderTime++;

        }
        if (data.key == 'myOfferList' || data.key == 'orgOfferList') {
            console.log('报价采纳报价');
            state.basicBaseList[data.key][data.index].orderTime++;
        }
        if (data.key == 'myOrderList') {
            state.basicBaseList[data.key].unshift({
                "type": data.type,
                "sourceType": data.sourceType,
                "sample": data.sample,
                "intl": data.intl,
                "customer": data.customer,
                "customerName": data.customerName,
                "incidentals": data.incidentals,
                'incidentalsDesc': data.incidentalsDesc,
                "preferential": data.preferential,
                'preferentialDesc': data.preferentialDesc,
                'currency': data.currency,
                "consignee": data.consignee,
                'consigner': data.consigner,
                'consigneePhone': data.consigneePhone,
                "zipCode": data.zipCode,
                "country": data.country,
                "province": data.province,
                "employee": data.employee,
                "org": data.org,
                "city": data.city,
                "district": data.district,
                "consigneeAddr": data.consigneeAddr,
                'comments': data.comments,
                'total': data.total,
                'cost': data.cost,
                'unpaid': data.unpaid,
                'prepaid': data.prepaid,
                'goods': data.goods,
                "show": false,
                "no": data.no,
                "id": data.id,
                "orderStatus": data.orderStatus,
                "validate": data.validate,
                "payWay": data.payWay,
                "checked": false,
                "clients": data.clients,
                "goodsDesc": data.goodsDesc,
                "total": data.total,
                "ctime": data.ctime,
                "mode": data.mode,
                "tradeTime": data.tradeTime
            });
        }
        if (data.key == 'orders') {
            console.log(data)
                /*state.clientDetail[data.key].arr.unshift(data);*/
            state.clientDetail[data.key].arr.unshift({
                "type": data.type,
                "sourceType": data.sourceType,
                "sample": data.sample,
                "intl": data.intl,
                "customer": data.customer,
                "customerName": data.customerName,
                "incidentals": data.incidentals,
                'incidentalsDesc': data.incidentalsDesc,
                "preferential": data.preferential,
                'preferentialDesc': data.preferentialDesc,
                'currency': data.currency,
                'consigner': data.consigner,
                "consignee": data.consignee,
                'consigneePhone': data.consigneePhone,
                "zipCode": data.zipCode,
                "country": data.country,
                "province": data.province,
                "employee": data.employee,
                "org": data.org,
                "city": data.city,
                "district": data.district,
                "consigneeAddr": data.consigneeAddr,
                'comments': data.comments,
                'goods': data.goods,
                "show": false,
                "no": data.no,
                'total': data.total,
                "orderStatus": data.orderStatus,
                "validate": data.validate,
                "payWay": data.payWay,
                "id": data.id,
                "checked": false,
                "clients": data.clients,
                "sample": data.sample,
                "goodsDesc": data.goodsDesc,
                "ctime": data.ctime,
                "total": data.total,
                'cost': data.cost,
                'unpaid': data.unpaid,
                'prepaid': data.prepaid,
                "mode": data.mode,
                "tradeTime": data.tradeTime
            });
        }
    },
    [ORDER_DETAIL_DATA](state, data) { //订单详情
        state.orderDetail = data;
    },
    [ORDER_UPLOAD_DATA](state, data) { //新建订单详情凭证
        console.log(data);
        if (data.titles == '申请分期审核' || data.titles == '申请审核' || data.titles == 'Apply for approval' || data.titles == '重新申请审核' || data.titles == '重新申请支付') {
            state.orderDetail.stages.arr[data.sub].validate = data.validate;
        }

        if (data.stages) {
            console.log(state.orderDetail.stages.arr)
            state.orderDetail.stages.arr = data.stages; //分期付款
        }
    },
    [ORDER_STATUS](state, data) { //订单状态详情
        for (var i in state.basicBaseList[data.key]) {
            if (state.basicBaseList[data.key][i].id == data.id) {
                state.basicBaseList[data.key][i].orderStatus = data.orderStatus;
                state.basicBaseList[data.key][i].payWay = data.payWay;
                state.basicBaseList[data.key][i].lcompanyId = data.lcompanyId;
                state.basicBaseList[data.key][i].logisticsNo = data.logisticsNo;
            }
        }
        if (data.orderStatus == 30 && (data.payWay == 0 || data.payWay == 3)) {
            for (var i in state.basicBaseList[data.key]) {
                if (state.basicBaseList[data.key][i].id == data.id) {
                    state.basicBaseList[data.key][i].orderStatus = data.orderStatus;
                    state.basicBaseList[data.key][i].payWay = data.payWay;
                }
            }
        }
        if (data.orderStatus == 40 || data.orderStatus == 30) {
            for (var i = 0; i < state.basicBaseList[data.key].length - 1; i++) {
                if (state.basicBaseList[data.key][i].id == data.id) {
                    state.basicBaseList[data.key].splice(i, 1);
                }
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
            "typedesc": data.type,
            "id": data.id,
            "show": false,
            "status": 1
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
    [COMPANY_PRODUCT_DATA](state, data) { //企业产品
        state.basicBaseList.companyProductList = data;
    },
    [COMPANY_PRODUCT_DETAIL](state, data) { //企业产品详情
        state.companyProductDetail = data;
    },
    [COMPANY_LICENSE_DATA](state, data) { //企业证书
        state.basicBaseList.companyLicenseList = data;
    },
    [RELATIVE_COMPANY_DATA](state, data) { //相关企业列表
        state.basicBaseList.relativeCompanyList = data;
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

    [ADD_BREED_LOCAL](state, data) { //新增药品产地
        state.breedDetail.locals.arr.push(data)
    },

    [ADD_BREED_DATA](state, data) { //新增药材
        state.basicBaseList.breedList.unshift({
            "code": data.code,
            "name": data.name,
            "categoryId": data.categoryId,
            "categoryName": data.categoryName,
            "pinyin": data.pinyin,
            "eName": data.eName,
            "lName": data.lName,
            "id": data.id,
            "show": false,
            "icon": data.path,
            "url": data.url
        })
    },
    [UPDATE_ENTERPRISE](state, data) { //修改企业列表
        console.log(data)
        for (var i in data) {
            state.basicBaseList[data.key][data.sub][i] = data[i];
        }
        console.log(state.basicBaseList[data.key][data.sub])
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
            "main": data.main,
            "position": data.position
        })
        console.log(data.id)
    },

    [DELETE_CONTACT_DATA](state, data) {
        state.companyDetail.companyContacts.arr.splice(data.index, 1);
    },

    [UPDATE_CONTACT_DATA](state, data) { //修改企业相关内容
        for (var key in data) {
            state.companyDetail[data.key].arr[data.sub][key] = data[key];
        }
        console.log(state.companyDetail[data.key].arr[data.sub])
    },
    [DELETE_BREED_DATA](state, data) { //删除客户/订单信息
        state.basicBaseList[data.key].splice(data.sub, 1);

    },
    [DELETE_SPECS_DATA](state, data) { //删除相关信息
        if (data.sign == 'intentionDetail') {
            state.basicBaseList.intentionDetail.labels.splice(data.sub, 1);
        } else {
            state[data.headline][data.key].arr.splice(data.sub, 1);
        }

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
        if (data.name) data.alias = data.name;
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
        state.basicBaseList[data.key] = data;
        state.basicBaseList.customerList = data;
    },
    [CUSTOMER_DETAIL_DATA](state, data) { //客户详情
        state.clientDetail = data;
    },
    [CUSTOMER_TRANSFER](state, data) {
        console.log(data);
        switch (data.flag) {
            case 'myClient':
                data.arr.forEach(function(item) {
                    for (var i = 0; i < state.basicBaseList.customerList.length; i++) {
                        if (state.basicBaseList.customerList[i].id == item) {
                            if (state.login.id != item.employeeId) {
                                state.basicBaseList.customerList.splice(i, 1);
                            }

                        }
                    }
                });

                break;
            case 'orgClient':
                data.arr.forEach(function(item) {
                    for (var i = 0; i < state.basicBaseList.customerList.length; i++) {
                        if (state.basicBaseList.customerList[i].id == item) {
                            if (state.login.orgId != item.orgId) {
                                state.basicBaseList.customerList.splice(i, 1);
                            }
                        }
                    }
                });

                break;
            case 'allClient':
                data.arr.forEach(function(item) {
                    for (var i = 0; i < state.basicBaseList.customerList.length; i++) {
                        if (state.basicBaseList.customerList[i].id == item) {
                            state.basicBaseList.customerList[i].employeeId = data.employeeId;
                            state.basicBaseList.customerList[i].employeeName = data.employeeName;
                            state.basicBaseList.customerList[i].orgId = data.orgId;
                        }
                    }
                });
                break;
            case 'potentialClient':
                data.arr.forEach(function(item) {
                    for (var i = 0; i < state.basicBaseList.customerList.length; i++) {
                        if (state.basicBaseList.customerList[i].id == item) {
                            state.basicBaseList.customerList.splice(i, 1);
                        }
                    }
                });
                break;
            default:
                data.arr.forEach(function(item) {
                    for (var i = 0; i < state.basicBaseList.customerList.length; i++) {
                        if (state.basicBaseList.customerList[i].id == item) {
                            state.basicBaseList.customerList.splice(i, 1);
                        }
                    }
                });
                break;

        }

    },
    [CUSTOMER_BATCH_DELETE](state, data) {
        data.customerIds.forEach(function(item) {
            for (var i = 0; i < state.basicBaseList[data.key].length; i++) {
                if (state.basicBaseList[data.key][i].id == item) {
                    state.basicBaseList[data.key].splice(i, 1);
                }
            }
        })

        if (data.customerIds[0] == state.clientDetail.id) {
            state.clientDetail.blacklist = 1 - state.clientDetail.blacklist;
        }

    },
    [CUSTOMER_BATCH_SUPPLIER](state, data) {
        data.customerIds.forEach(function(item) {
            for (var i = 0; i < state.basicBaseList[data.key].length; i++) {
                if (state.basicBaseList[data.key][i].id == item) {
                    state.basicBaseList[data.key][i].comments = data.blackComments;
                    state.basicBaseList[data.key][i].supplier = 1;
                }
            }
        })
    },

    [CUSTOMER_ADD_DATA](state, data) { //新增客户
        var temp = {
            address: data.address,
            bizScope: data.bizScope,
            category: data.category,
            city: data.city,
            cityName: data.cityName,
            classify: data.classify,
            classifyDesc: data.classifyDesc,
            comments: data.comments,
            country: data.country,
            countryName: data.countryName,
            email: data.email,
            id: data.id,
            mainBiz: data.mainBiz,
            mainEmail: data.email,
            mainPhone: data.mainPhone,
            phoneProvince: data.phoneProvince,
            phoneCity: data.phoneCity,
            name: data.name,
            number: data.number,
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            orgId: data.orgId,
            orgName: data.orgName,
            principal: data.principal,
            province: data.province,
            provinceName: data.provinceName,
            source: 4,
            sourceType: '业务录入',
            tel: data.tel,
            type: data.type,
            typeDesc: data.typeDesc,
            orderTotal: data.orderTotal,
            mainPosition: data.mainPosition,
            mainContact: data.mainContact,
            show: false,
            supplier: data.supplier,
            checked: false,
            creditLevel: data.creditLevel,
            ctime: data.ctime
        };



        if (!!data.key && data.key != "userList") {
            state.basicBaseList[data.key].unshift(temp); //新增客户划转
        }

        if (data.sub != 'undefined' && data.sub) { //会员列表页会员划转
            state.basicBaseList[data.key][data.sub][data.keyname] = 1;
        }
        if (data.detail) { //会员详情页会员划转
            state[data.detail].customerId = data.id;
        }

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
        console.log(data);
        console.log(data.key);
        console.log(state.basicBaseList.filesList)
        if (data.key == 'filesList') {
            state.basicBaseList.filesList[data.sub].description = data.description;
        } else {
            for (var key in data) {
                state[data.headline][data.key].arr[data.sub][key] = data[key];
            }
            state[data.headline][data.key].arr[data.sub].remark = data.remark;
        }

    },
    [UPDATE_PRODUCT_DATA](state, data) { //修改客户产品
        for (var key in data) {
            state[data.headline][data.key].arr[data.sub][key] = data[key];
        }
    },
    [ALTER_PRODUCT_DATA](state, data) { //修改供应商产品
        console.log(data)
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
    [ADDRESS_TABLE](state, data) { // 客户地址列表
        state.basicBaseList.addressList = data;
    },
    [ADD_ADDR_DETAIL](state, data) { // 新增客户地址
        var temp = {
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
        };
        state.clientDetail[data.key].arr.unshift(temp);
        state.basicBaseList.addressList.unshift(temp);

    },
    [ADD_LABEL_DATA](state, data) { // 新增客户标签(意向标签)
        if (data.url == "/intention/insertLabel") {
            state.basicBaseList.intentionDetail.labels.unshift({
                "label": data.label,
                "status": 1,
                "intentionId": data.intentionId,
                "id": data.id
            });
        }
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
            "breedName": data.breedName
        })
    },
    [PRODUCT_DATA](state, data) { //供应商产品列表
        state.basicBaseList.productList = data;
    },
    [PRODUCT_DETAIL_DATA](state, data) { //供应商产品详情
        state.productDetail = data;
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
    [FILES_DATA_LIST](state, data) { //供应商文件列表
        state.basicBaseList.filesList = data;
    },
    [ADD_CERTIFICATE_DATA](state, data) { //新增供应商资质证书
        console.log(data)
        state.basicBaseList.filesList.unshift({
            "path": data.path,
            "fileType": data.fileType,
            "bizType": data.bizType,
            "bizId": data.bizId,
            "description": data.description,
            "show": false
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
    [PURCHASE_LIST_DATA](state, data) { //采购单列表
        if (data.key) {
            state.basicBaseList[data.key] = data;
        }
    },
    [UPDATE_OFFERDESCRIPTION](state, data) { //更新采购单报价描述报价描述
        state.purchaseDetail.intentionList.arr[data.index].offers.arr[data.sub].description = data.auditComment;

    },
    [PURCHASE_DETAIL](state, data) { //采购单详情
        state.purchaseDetail = data;
    },
    [INDENT_OFFER_DATA](state, data) { //采购单报价列表
        state[data.key] = data;
    },

    [DELETE_PURCHASE](state, data) { //删除采购单
        state.basicBaseList[data.key].splice(data.index, 1);
    },
    [INQUIRE_PURCHASE_STATUS](state, data) { //（单个/批量）采购单询价
        for (let i = 0; i < data.indexs.length; i++) {
            let index = data.indexs[i];
            state.basicBaseList[data.key][index].inquire = data.inquire;
        }
    },
    [INTENTION_LIST_DATA](state, data) { //意向列表
        if (data.key) {
            state.basicBaseList[data.key] = data;
        } else {
            state.basicBaseList.intentionList = data;
        }

    },
    [INTLINTENTION_LIST_DATA](state, data) { //国际意向列表
        state.basicBaseList[data.key] = data;
    },

    [INTLINTENTION_INQUIRE_LIST_DATA](state, data) { //国际意向询价列表

        state.basicBaseList.intlIntentionInquireList = data;
    },

    [ORIGIN_OFFER_DATA](state, data) { //国际意向原材料报价
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].offerOrigPrice = data.origPrice;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].offerPrice = data.price;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].offerNumber = data.number;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].offererName = data.offererName;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].offerEUnit = data.unit;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].offerComment = data.comment;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].offerCurrency = data.currency;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].exchangeRate = data.exchangeRate;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].origCurrency = data.origCurrency;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].supplierName = data.supplierName;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].supplier = data.supplier;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].product = data.product;
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].offererName = data.offererName;
        state.basicBaseList.intlIntentionDetail.itemsTotal = data.itemsTotal;
        state.basicBaseList.intlIntentionInquireList[data.lastIndex].inquire = 2; //原材料报价后将inquire置为2

    },

    [OTHER_OFFER_DATA](state, data) { //增（改）国际意向其他报价
        //如果data.index==''表示是增加其他报价，否则是修改
        if (data.index === '') {
            //新建要补全信息
            console.log('新建其他报价');
            state.basicBaseList.intlIntentionDetail.offers.arr.unshift(data);
            state.basicBaseList.intlIntentionDetail.offersTotal = data.offersTotal;
        } else {
            console.log('修改其他报价');
            state.basicBaseList.intlIntentionDetail.offers.arr[data.index].currency = data.currency;
            state.basicBaseList.intlIntentionDetail.offers.arr[data.index].cost = data.cost;
            state.basicBaseList.intlIntentionDetail.offers.arr[data.index].costDesc = data.costDesc;
            state.basicBaseList.intlIntentionDetail.offers.arr[data.index].comment = data.comment;
            state.basicBaseList.intlIntentionDetail.offersTotal = data.offersTotal;
        }
    },

    [DEL_OTHER_OFFER](state, data) { //删除国际意向其他报价
        state.basicBaseList.intlIntentionDetail.offers.arr.splice(data.index, 1);
        state.basicBaseList.intlIntentionDetail.offersTotal = data.offersTotal;
    },

    [CONFIRM_OFFER](state, data) { //确认报价
        console.log(data.index);
        state.basicBaseList.intlIntentionInquireList[data.index].inquire = 3;
    },


    [UPLOAD_INTL_INTENT_FILE](state, data) { //上传国际意向文件
        if (data.category == 0) { //原文件
            console.log('上传的原文件');
            state.basicBaseList.intlIntentionDetail.files.arr.unshift(data);
        } else if (data.category == 1) { //报价文件
            console.log('上传的报价文件');
            state.basicBaseList.intlIntentionDetail.offerFiles.arr.unshift(data);
        }
    },

    [DEL_INTL_INTENT_FILE](state, data) { //删除国际意向文件
        console.log('删除文件');
        if (data.category == 0) {
            console.log('删除的原文件');
            state.basicBaseList.intlIntentionDetail.files.arr.splice(data.index, 1);
        } else if (data.category == 1) {
            console.log('删除的报价文件');
            state.basicBaseList.intlIntentionDetail.offerFiles.arr.splice(data.index, 1);
        }
    },



    [SUPPLY_DEMAND_DATA](state, data) { //供求匹配信息列表
        state.basicBaseList.supplyDemandList = data;
    },
    [OFFER_LIST_DATA](state, data) { //报价列表
        state.basicBaseList[data.key] = data;
    },
    [MSG_LIST_DATA](state, data) { //留言列表
        console.log(data.key);
        state.basicBaseList[data.key] = data;
    },
    [MSG_UPDATE_DATA](state, data) { //留言修改
        if (data.key == 'msgList') {
            console.log('留言列表修改');
            console.log(data.utime)
            state.basicBaseList.msgList[data.index].comments = data.comments;
            state.basicBaseList.msgList[data.index].utime = data.utime;
        }
        if (data.key == 'intentionDetail') {
            state.basicBaseList.intentionDetail.msgs.arr[data.index].comments = data.comments;
        }
    },
    [USER_DATA](state, data) { // 会员列表
        state.basicBaseList.userList = data;
    },

    [QUICK_EDIT](state, data) { //审核时可选择标签
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
        for (var i = 0; i < data.indexs.length; i++) {
            var k = data.indexs[i];
            state.basicBaseList.userList[k].checked = false;
            for (var key in data) {
                if (key == "audit" && data[key] == 2) {
                    state.basicBaseList.userList[k].auditResult = "已审核";
                } else if (key == "audit" && data[key] == 3) {
                    state.basicBaseList.userList[k].auditResult = "审核不通过";
                } else if (key == "audit" && data[key] == 1) {
                    state.basicBaseList.userList[k].auditResult = "审核中";
                }
                state.basicBaseList.userList[k][key] = data[key];
            }
        }


    },

    [BATCH_USER_INTENTION_AUDIT](state, data) { // 批量审核会员意向
        console.log(data);
        if (state.userDetail.intention.arr.length > 0) {
            console.log("会员详情页审核意向");
            for (let i = 0; i < data.indexs.length; i++) {
                let k = data.indexs[i];
                state.userDetail.intention.arr[k].validate = data.validate;
                state.userDetail.intention.arr[k].description = data.description;
                state.userDetail.intention.arr[k].checked = false;
            }
        }

        if (state.basicBaseList[data.key].length > 0) {
            console.log("意向列表页审核意向");
            for (let i = 0; i < data.indexs.length; i++) {
                let k = data.indexs[i];
                if (data.validate == 3) {
                    state.basicBaseList[data.key][k].onSell = 0;
                }
                state.basicBaseList[data.key][k].validate = data.validate;
                state.basicBaseList[data.key][k].description = data.description;
                state.basicBaseList[data.key][k].checked = false;
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
    [ORG_DETAIL](state, data) { // 部门详情页面
        state.orgDetail = data;
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
            "entrydate": data.entrydate,
            "leavedate": data.leavedate,
            "orgid": data.orgid,
            "orgcode": data.orgcode,
            "leave": data.leave,
            "privilege": data.privilege
        })
    },

    [IDENTIFY_DATA](state, data) { //认证信息
        state.identify = data;
    },

    [UPDATE_TRACKING_DATA](state, data) { //更新跟进
        if (state.userDetail.tracking.arr[data.index]) {
            state.userDetail.tracking.arr[data.index].trackingWay = data.trackingWay;
            state.userDetail.tracking.arr[data.index].comments = data.comments;
            state.userDetail.tracking.arr[data.index].contactNo = data.contactNo;
            state.userDetail.tracking.arr[data.index].type = data.type;
        }
        if (state.clientDetail.trackings.arr[data.index]) {
            state.clientDetail.trackings.arr[data.index].trackingWay = data.trackingWay;
            state.clientDetail.trackings.arr[data.index].comments = data.comments;
            state.clientDetail.trackings.arr[data.index].contactNo = data.contactNo;
            state.clientDetail.trackings.arr[data.index].type = data.type;
        }
        if (state.basicBaseList.intentionDetail.trackings.arr[data.index]) {
            state.basicBaseList.intentionDetail.trackings.arr[data.index].trackingWay = data.trackingWay;
            state.basicBaseList.intentionDetail.trackings.arr[data.index].comments = data.comments;
            state.basicBaseList.intentionDetail.trackings.arr[data.index].contactNo = data.contactNo;
            state.basicBaseList.intentionDetail.trackings.arr[data.index].type = data.type;
        }

    },

    [ADD_TRACKING_DATA](state, data) { //增加跟进
        const temp = {};
        temp.trackingWay = data.trackingWay;
        temp.comments = data.comments;
        temp.contactNo = data.contactNo;
        temp.type = data.type;
        temp.objId = data.objId;
        temp.bizId = data.bizId;
        temp.bizType = data.bizType;
        temp.show = false;
        temp.id = data.id;
        state.userDetail.tracking.arr.unshift(temp);
        state.clientDetail.trackings.arr.unshift(temp);
        state.basicBaseList.intentionDetail.trackings.arr.unshift(temp);
    },
    [EMPLOYEE_DETAIL](state, data) { //员工详情
        state.employeeDetail = data;
    },
    [UPDATE_EMPLOY_DATA](state, data) { //修改员工信息
        if (data.title == 'first') {
            state.basicBaseList[data.key].gender = data.gender;
            state.basicBaseList[data.key].goodfield = data.goodfield;
            state.basicBaseList[data.key].qq = data.qq;
            state.basicBaseList[data.key].wechat = data.wechat;
            state.basicBaseList[data.key].mobile = data.mobile;
        } else {
            for (var key in data) {
                state.basicBaseList[data.key][data.sub][key] = data[key];
            }
        }

    },
    [UPDATA_INTENTION_DATA](state, data) { //修改意向
        if (data.key == 'user') { //会员详情页修改意向
            console.log("用户详情页修改意向");
            for (var i in state.userDetail.intention.arr[data.sub]) {
                state.userDetail.intention.arr[data.sub][i] = data[i];
            }
        } else if (data.key == 'client') { //客户详情页修改意向
            console.log("客户详情页修改意向");
            for (var i in state.clientDetail.intentions.arr[data.sub]) {
                state.clientDetail.intentions.arr[data.sub][i] = data[i];
            }
        } else {
            console.log("意向列表页修改意向");
            for (var i in state.basicBaseList[data.key][data.sub]) {
                state.basicBaseList[data.key][data.sub][i] = data[i];
            }
        }

    },

    [ADD_INTLINTENTION_DATA](state, data) { //新增国际意向

        state.basicBaseList.myIntlIntentionList.unshift({
            'customerId': data.customerId,
            'customerName': data.customerName,
            'customerEmail': data.customerEmail,
            'country': data.country,
            'province': data.province,
            'city': data.city,
            'district': data.district,
            'address': data.address,
            'duedate': data.duedate,
            'pack': data.pack,
            'items': data.items,
            'especial': data.especial,
            'type': data.type,
            'id': data.id,
            'advance': data.advance,
            'inquireTime': data.inquireTime,
            'offerTime': data.offerTime,
            'validate': data.validate,
            'source': data.source,
            'inquire': data.inquire,
            'names': data.names,
            'ctime': data.ctime,
        });

    },

    [UPDATA_INTLINTENTION_DATA](state, data) { //修改国际意向

        console.log("修改国际意向");
        for (var i in data) {
            state.basicBaseList[data.key][data.index][i] = data[i];
        }


    },

    /* [DELETE_INTLINTENTION_DATA](state,data){ //删除国际意向

         console.log("删除国际意向");
         state.basicBaseList.intlIntentionList.splice(data.index,1);
     },*/

    [INQUIRE_DATA](state, data) { //国际意向询价
        state.basicBaseList[data.key][data.index].inquire = data.inquire;
        state.basicBaseList[data.key][data.index].inquireTime = data.inquireTime;
        state.basicBaseList[data.key][data.index].inquireType = data.inquireType;
    },

    [ITEM_INQUIRE](state, data) { //条目再询价
        state.basicBaseList.intlIntentionDetail.items.arr[data.index].again = 1;
    },



    [INTENTION_DATA](state, data) { //机会划转意向，新增意向
        data.onSell = 0;
        if (data.key == "myIntentionList") {
            console.log("意向列表页添加意向");
            //state.basicBaseList.myIntentionList.unshift(data);
        }
        if (data.key == "user") {
            console.log("会员详情页添加意向");
            state.userDetail.intention.arr.unshift(data);
        }
        if (data.key == "client") {
            console.log("客户详情页添加意向");
            state.clientDetail.intentions.arr.unshift(data);
        }

    },
    [INTENTION_UP_DOWN](state, data) {

        for (let i = 0; i < data.indexs.length; i++) {
            let k = data.indexs[i];
            state.basicBaseList[data.key][k].onSell = data.onSell;
            state.basicBaseList[data.key][k].checked = false;
        }
    },
    [INTENTION_DETAIL_DATA](state, data) {
        state.basicBaseList.intentionDetail = data;
    },
    [INTLINTENTION_DETAIL_DATA](state, data) {
        state.basicBaseList.intlIntentionDetail = data;
    },
    [INTLINTENTION_INQUIRE_DETAIL_DATA](state, data) {
        state.basicBaseList.intlIntentionInquireDetail = data;
    },
    [ITEM_HISTORY_DATA](state, data) {
        state.basicBaseList.itemHistory = data;
    },
    [OUTER_OFFER_DATA](state, data) {
        state.basicBaseList.outerOfferList = data;
    },

    [INTENTION_OFFER_DETAIL](state, data) {
        state.basicBaseList.intentionOfferDetail = data;
    },
    [PROVINCE_LIST](state, data) {
        state.locationList.provinceList = data;
    },
    [COUNTRY_LIST](state, data) {
        state.systemBaseList.countryList = data;
    },
    [CITY_LIST](state, data) {
        state.systemBaseList.cityList = data;
    },
    [DISTRICT_LIST](state, data) {
        state.systemBaseList.districtList = data;
    },

    [ADD_FILES_DATA](state, data) {
        state.clientDetail.files.arr.unshift({
            "path": data.path,
            "fileType": data.fileType,
            "bizType": data.bizType,
            "bizId": data.bizId,
            "description": data.description,
            "name": data.name,
            "show": false,
            "id": data.id,
            "url": data.image_f_show
        })
    },
    [CALL_RECORD_DATA](state, data) {
        state.basicBaseList.callRecordList = data;
    },
    [CALL_COUNT_DATA](state, data) {
        state.basicBaseList.callCountList = data;
    },
    [CALL_RECORD_VOICE_DATA](state, data) {
        state.basicBaseList.callRecordList[data.index].refile = data.refile;
    },
    [EMAIL_DATA](state, data) {
        state.basicBaseList.emailList = data;
    },
    [EMAIL_COUNT](state, data) {
        state.basicBaseList.emailCount = data;
    },

    [MUlT_DICTIONARY](state, data) {
        state.dictionary = data;
    },
    [STOCK_LIST](state, data) { //库存列表
        state.stockList = data;
    },
    [DELETE_STOCK_DATA](state, data) { //删除库存列表
        state.stockList.splice(data.sub, 1)
    },
    [ADD_STOCK_LIST](state, data) { //新增库存列表
        console.log(data)
        console.log(state.stockList)
        state.stockList.unshift(data)
    },
    // 部门统计
    [MY_ORG_COUNT](state, data) {
        state.orgCount = data;
    },
    //我的统计新增用户详情
    [NEW_USER_DETAIL](state, data) {
        state.newUserDetail = data
    },
    //我的统计成交用户
    [NEW_DEAL_DETAIL](state, data) {
        state.newDealDetail = data
    },
    //我的统计活跃用户
    [NEW_ACTIVE_DETAIL](state, data) {
        state.newActiveDetail = data
    },
    //昨日
    [YESTODAY_DETAIL](state, data) {
        state.yestodayDetail = data
    },

    [ALL_YESTODAY_DETAIL](state, data) {
        state.allYestodayDetail = data
    },
    //个人区域数据
    [PROVINCE_DETAIL](state, data) {
        state.provinceDetail = data
    },
    //部门昨日新增
    [ORG_YESTODAY_DETAIL](state, data) {
        state.orgYestodayDetail = data
    },
    //部门业务员数据
    [ORG_SALEMAN_DETAIL](state, data) {
        state.orgSalemanDetail = data
    },
    //部门业务员数据
    [ALL_ORG_DETAIL](state, data) {
        state.allOrgDetail = data
    },
    //部门省数据
    [ORG_PROVINCE_DETAIL](state, data) {
        state.orgProvinceDetail = data
    },
    //全部省数据
    [ALL_PROVINCE_DETAIL](state, data) {
        state.allProvinceDetail = data
    },
    //我的品种统计省份详情
    [BREED_PROVINCE_DETAIL](state, data) {
        state.breedProvinceDetail = data
    },
    //部门品种统计省份详情
    [ORGBREED_PROVINCE_DETAIL](state, data) {
        state.orgBreedProvinceDetail = data
    },
    //全部品种统计省份详情
    [ALLBREED_PROVINCE_DETAIL](state, data) {
        state.allBreedProvinceDetail = data
    },
    //个人类型详情
    [CUSTYPE_DETAIL](state, data) {
        state.cusTypeDetail = data
    },
    //部门类型详情
    [ORG_CUSTYPE_DETAIL](state, data) {
        state.orgCusTypeDetail = data
    },
    //全部类型详情
    [ALL_CUSTYPE_DETAIL](state, data) {
        state.allCusTypeDetail = data
    },
    //我的品种统计新增详情
    [CHANGE_ADDBREEDDETAIL](state, data) {
        state.addBreedDetail = data
    },
    //部门品种统计新增详情
    [CHANGE_ORGADDBREEDDETAIL](state, data) {
        state.orgAddBreedDetail = data
    },
    //全部品种统计新增详情
    [CHANGE_ALLADDBREEDDETAIL](state, data) {
        state.allAddBreedDetail = data
    },
    //我的品种统计成交详情
    [CHANGE_DEALBREEDDETAIL](state, data) {
        state.dealBreedDetail = data
    },
    //我的品种统计昨日成交详情
    [YESTODAY_BREED_DETAIL](state, data) {
        state.yestodayDealBreed = data
    },
    //部门品种统计昨日成交详情
    [ORGYESTODAY_BREED_DETAIL](state, data) {
        state.orgYestodayDealBreed = data
    },
    //全部品种统计昨日成交详情
    [ALLYESTODAY_BREED_DETAIL](state, data) {
        state.allYestodayDealBreed = data
    },
    //品种统计订单详情
    [CHANGE_BREEDORDER_DETAIL](state, data) {
        state.breedOrderDetail = data
    },
    //样品订单统计
    [SELECT_SAMPLECOUNT](state, data) {
        state.sampleCountList = data
    },
    //样品订单详细
    [SELECT_SAMPLEDETAIL](state, data) {
        state.sampleCountDetail = data
    },
    //大货订单统计
    [SELECT_MAINORDERCOUNT](state, data) {
        state.mianOrderCountList = data
    },
    //大货订单详情
    [SELECT_MAINORDERDETAIL](state, data) {
        state.mianOrderCountDetail = data
    },
    //订单信息页面
    [CHANGE_BREEDCOUNT](state, data) {
        state.breedCountList = data
    },
    //寄样详情页面
    [CHANGE_SENDBREEDCOUNT](state, data) {
        state.sendBreedList = data
    },
    //成交详情页面
    [CHANGE_DEALBREEDCOUNT](state, data) {
        state.dealBreedList = data
    },
    //取消报价列表
    [CHANGE_CANCELRECORD](state, data) {
        state.cancelRecordList = data
    },
    //收付费信息统计
    [CHANGE_BILLLIST](state, data) {
        state.billList = data
    },
    //客户统计信息（新）
    [CUSTOMER_COUNT_LIST](state, data) {
        state.customerCountList = data
    },
    [CUSTOMER_COUNT_TOTAL](state, data) {
        state.customerCountTotal = data
    },
    [CUSTOMER_COUNT_DETAIL_LIST](state, data) {
        state.customerCountDetailList = data;
    },
    [CUSTOMER_COUNT_DETAIL_TOTAL](state, data) {
        state.customerCountDetailTotal = data;
    },
    //供应商统计信息（新）
    [SUPPLIER_COUNT_LIST](state, data) {
        state.supplierCountList = data
    },
    [SUPPLIER_COUNT_TOTAL](state, data) {
        state.supplierCountTotal = data
    },
    [SUPPLIER_COUNT_DETAIL_LIST](state, data) {
        state.supplierCountDetailList = data;
    },
    [SUPPLIER_COUNT_DETAIL_TOTAL](state, data) {
        state.supplierCountDetailTotal = data;
    },
}

export default {
    state,
    mutations
}

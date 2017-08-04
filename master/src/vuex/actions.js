import Vue from 'vue';
import * as types from './mutation-types'
import apiUrl from './api/api'
import httpService from '../common/httpService.js'
export const increment = ({ dispatch }) => dispatch(types.INCREMENT)
export const decrement = ({ dispatch }) => dispatch(types.DECREMENT)
export const menuBar = ({ dispatch }) => dispatch(types.MENU_BAR)

Date.prototype.toFormatString = function() {
    return this.getFullYear() + "-" + ((this.getMonth() + 1) < 10 ? ('0' + (this.getMonth() + 1)) : (this.getMonth() + 1)) + "-" + (this.getDate() < 10 ? ('0' + this.getDate()) : this.getDate()) + " " + "00:00:00"
};

export const login = ({ dispatch }, data) => { //登录

    const body = {
        no: data.no,
        password: data.password
    }
    if (data.captcha) {
        body.captcha = data.captcha;
    }
    Vue.http({
        method: 'POST',
        url: httpService.addSID(apiUrl.orderList + data.link),
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        //对用户名和密码加密
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        function base64encode(str) {
            var out, i, len;
            var c1, c2, c3;

            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        }

        function compile(code) {
            var test = escape(code);
            test = base64encode(test);
            return test;
        }

        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
            return currentdate;
        }
        data.loading = false;
        if (res.json().result) {
            var no = compile(data.no);
            var lastTime = getNowFormatDate();
            var expire = new Date((new Date()).getTime() + 24 * 3600000); //得到的时间与真实时间差了8小时,cookie将在24小时后过期
            document.cookie = "no=" + no + ";expires=" + expire;
            document.cookie = "id=" + compile(res.json().result.id) + ";expires=" + expire;
            document.cookie = "orgId=" + compile(res.json().result.orgid) + ";expires=" + expire;
            document.cookie = "name=" + compile(res.json().result.name) + ";expires=" + expire;
            document.cookie = "time=" + lastTime + ";expires=" + expire;
            document.cookie = "privilege=" + res.json().result.privilege + ";expires=" + expire;
            document.cookie = "safeCode=" + (res.json().result.functions.join() + ',') + ";expires=" + expire;
            var result = res.json().result;
            result.time = lastTime;
            //var safeCode = result.functions[3]?result.functions[3]:''

            var loginInfo = {
                id: result.id,
                name: result.name,
                no: result.no,
                orgId: result.orgid,
                time: result.time,
                privilege: result.privilege,
                safeCode: result.functions.join() + ','
            }
            dispatch(types.LOGIN_DATA, loginInfo);
            dispatch(types.INIT_LIST, result);
            //本地存储左侧菜单
            for (var i in result.menus) {
                result.menus[i].show = false;
            }
            localStorage.menus = JSON.stringify(result.menus);

            data.required = false;

            data.loginCallback(body);
        } else if (res.json().code == "160104") {
            data.required = true;
        } else {

            data.name = res.json().msg;
            data.show = true;

        }

    }, (res) => {
        console.log('fail');
        data.name = '服务器内部错误';
        data.show = true;
        data.loading = false;
    });
}
export const commonHttp = ({ dispatch }, data) => { //回调wms的接口
    let body = {
        biz_param: {
            no: data.no,
            password: data.password
        }
    }
    Vue.http({
        method: 'POST',
        url: '/front/account/erpLogin.do',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        window.localStorage.KEY = res.json().biz_result.KEY;
        window.localStorage.SID = res.json().biz_result.SID;
        httpService.SID = res.json().biz_result.SID;
        httpService.KEY = res.json().biz_result.KEY;
        httpService.setCookie('KEY', httpService.KEY);
        httpService.setCookie('SID', httpService.SID);
    }, (res) => {
        console.log('fail');
    })
}

export const test = ({ dispatch }, data) => {
    let body = {
        biz_module: 'userSuggestService',
        biz_method: 'querySuggestList',
        biz_param: data
    }
    httpService.commonPOST(body)
        .then((res) => {
            console.log(res)
        }, (error) => {
            console.log(error)
        })
}

export const resetPawd = ({ dispatch }, data) => { //修改密码(需要提供原密码)
    const body = {
        no: data.no,
        newPwd: data.newPwd,
        oldPwd: data.oldPwd
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + '/employee/resetPassword',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.PASSWORD_DATA, data);
        if (res.json().code == 200) {
            data.callback(res.json().msg);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const updatePawd = ({ dispatch }, data) => { //修改密码(直接修改密码,无需提供原密码,管理员使用)
    const body = {
        no: data.no,
        newPwd: data.newPwd
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + '/employee/updatePassword',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().code == 200) {
            data.callback(res.json().msg);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const initList = ({ dispatch }) => {
    Vue.http.get(apiUrl.list)
        .then((res) => {
            dispatch(types.INIT_LIST, res.data);
        }, (res) => {
            console.log('fail');
        });
};

//柱状图
export const freshCharts = ({ dispatch }, getCharList) => {
    if (getCharList) getCharList.load = true;
    Vue.http.get(apiUrl.charList)
        .then((res) => {
            dispatch(types.CHANGE_CHARTS, res.data);
        }, (res) => {
            console.log('fail');
        });
};

//我的统计重叠折线图
export const freshLinesCharts = ({ dispatch }, getCharList) => {
    if (getCharList) getCharList.load = true;
    var url = '/crm/api/v1/count/getEmployeeCustomerStatistics'

    var startTime, endTime
    if (getCharList.timeType == 'month') {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == 'day') {

        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {

        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,

    }
    if (getCharList.type) {
        body.type = getCharList.type
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().result == null) {

            return;
        }
        dispatch(types.CHANGE_LINESCHARTS, res.json().result.list);
    }, (res) => {
        console.log('fail');
    });
}

export const freshBreedLines = ({ dispatch }, getCharList) => { //我的品种统计折线图
    if (getCharList) getCharList.load = true;
    var startTime, endTime
    if (getCharList.timeType == 'month') {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == 'day') {

        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {
        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,
    }
    if (getCharList.type) {
        body.type = getCharList.type
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getBreedStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().result == null) {
            return;
        }
        dispatch(types.CHANGE_BREEDLINESCHARTS, res.json().result.list);
    }, (res) => {
        console.log('fail');
    });
}

export const freshOrgBreedLines = ({ dispatch }, getCharList) => { //部门品种统计折线图
    if (getCharList) getCharList.load = true;
    var startTime, endTime
    if (getCharList.timeType == 'month') {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == 'day') {

        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {
        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,
        queryType: 'org'
    }
    if (getCharList.type) {
        body.type = getCharList.type
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getBreedStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().result == null) {

            return;
        }
        dispatch(types.CHANGE_ORGBREEDLINESCHARTS, res.json().result.list);
    }, (res) => {
        console.log('fail');
    });
};

export const freshAllBreedLines = ({ dispatch }, getCharList) => { //全部品种统计折线图
    if (getCharList) getCharList.load = true;
    var startTime, endTime
    if (getCharList.timeType == 'month') {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == 'day') {

        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {
        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,
        queryType: 'all'
    }
    if (getCharList.type) {
        body.type = getCharList.type
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getBreedStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().result == null) {

            return;
        }
        dispatch(types.CHANGE_ALLBREEDLINESCHARTS, res.json().result.list);
    }, (res) => {
        console.log('fail');
    });
};


export const getNewUserId = ({ dispatch }, param) => { //获取新增用户详情的id
    var body = {}

    if (param.startTime) {
        body.startTime = param.startTime
    }
    if (param.endTime) {
        body.endTime = param.endTime
    }
    if (param.provinceId) {
        body.provinceId = param.provinceId.id
    }
    if (param.type) {
        body.type = param.type
    }
    if (!param.isSearch) {
        body.endTime = new Date().toFormatString()
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerDetailStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().result)
    }, (res) => {
        console.log('fail');
    });
}

export const getNewUser = ({ dispatch }, param) => { //获取新增用户详情的数据
    var body = {
        page: param.cur,
        pageSize: '7',
        ids: param.data
    }

    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/customer/getListByIds',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.NEW_USER_DETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
    });
}

export const getDealUser = ({ dispatch }, param) => { //获取成交用户详情的数据
    var body, url
    if (param.showType == 'num') {
        url = '/crm/api/v1/customer/getListByIds'
        body = {
            page: param.cur,
            pageSize: '7',
            ids: param.data
        }
    }
    if (param.showType == 'time') {
        url = '/crm/api/v1//order/getListByIds'
        body = {
            page: param.cur,
            pageSize: '7',
            id: param.data
        }
    }
    Vue.http({
        method: 'POST',
        url: url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.NEW_DEAL_DETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
    });
}

export const getActiveUser = ({ dispatch }, param) => { //获取活跃用户详情的数据
    var body, url
    if (param.showType == 'time' && param.activeType == '报价') { //报价
        url = '/crm/api/v1/intention/getOfferListByIds'
        body = {
            page: param.cur,
            pageSize: '20',
            idsStr: param.data.offerTimesDetail
        }
    }
    if (param.showType == 'time' && param.activeType == '订单') { //订单
        url = '/crm/api/v1/order/getListByIds'
        body = {
            page: param.cur,
            pageSize: '7',
            id: param.data.orderTimesDetail
        }
    }
    if (param.showType == 'time' && param.activeType == '意向') { //意向
        url = '/crm/api/v1/intention/getListByIds'
        body = {
            page: param.cur,
            pageSize: '7',
            id: param.data.intentionTimesDetail
        }
    }
    if (param.showType == 'time' && param.activeType == '采购单') { //采购
        url = '/crm/api/v1/indent/getListByIds'
        body = {
            page: param.cur,
            pageSize: '16',
            idsStr: param.data.indentTimesDetail
        }
    }
    Vue.http({
        method: 'POST',
        url: url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.NEW_ACTIVE_DETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
    });
}

export const getBreedDetailId = ({ dispatch }, param) => { //获取我的品种详情的id
    var body = {}
    if (param) {
        if (param.startTime) {
            body.startTime = param.startTime
        }
        if (param.endTime) {
            body.endTime = param.endTime
        }
        if (param.provinceId) {
            body.provinceId = param.provinceId.id
        }
        if (param.type) {
            body.type = param.type
        }
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getAddBreedDetail',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().result)
    }, (res) => {
        console.log('fail');
    });
}

export const getOrgBreedDetailId = ({ dispatch }, param) => { //获取部门品种详情的id
    var body = {
        queryType: 'org'
    }
    if (param) {
        if (param.startTime) {
            body.startTime = param.startTime
        }
        if (param.endTime) {
            body.endTime = param.endTime
        }
        if (param.provinceId) {
            body.provinceId = param.provinceId.id
        }
        if (param.type) {
            body.type = param.type
        }
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getAddBreedDetail', //暂未更新
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().result)
    }, (res) => {
        console.log('fail');
    });
}

export const getAllBreedDetailId = ({ dispatch }, param) => { //获取全部品种详情的id
    var body = {
        queryType: 'all'
    }
    if (param) {
        if (param.startTime) {
            body.startTime = param.startTime
        }
        if (param.endTime) {
            body.endTime = param.endTime
        }
        if (param.provinceId) {
            body.provinceId = param.provinceId.id
        }
        if (param.type) {
            body.type = param.type
        }
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getAddBreedDetail',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().result)
    }, (res) => {
        console.log('fail');
    });
}

export const getAddBreedData = ({ dispatch }, param) => { //获取我的品种统计新增品种详情的数据
    if (param.data == "") {
        var data = []
        dispatch(types.CHANGE_ADDBREEDDETAIL, data)
        return
    }
    var body = {
        page: param.cur,
        pageSize: '8',
        ids: param.data
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getProductListByIds', //暂未更新
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_ADDBREEDDETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
        var data = []
        dispatch(types.CHANGE_ADDBREEDDETAIL, data)
    });
}

export const getBreedOrderDetail = ({ dispatch }, param) => { //获取我的品种统计的订单详情
    var body = {
        page: 1,
        pageSize: '8',
        ids: param.transactionNumberDetail
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/queryOrderListById', //暂未更新
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_BREEDORDER_DETAIL, data)
            // param.total = res.json().result.total
            // param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
    });
}

export const getOrgAddBreedData = ({ dispatch }, param) => { //获取部门品种统计新增品种详情的数据
    if (param.data == "") {
        var data = []
        dispatch(types.CHANGE_ORGADDBREEDDETAIL, data)
        return
    }
    var body = {
        page: param.cur,
        pageSize: '8',
        ids: param.data,
        queryType: 'org'
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getProductListByIds', //暂未更新
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_ORGADDBREEDDETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
    });
}

export const getAllAddBreedData = ({ dispatch }, param) => { //获取全部品种统计新增品种详情的数据
    if (param.data == "") {
        var data = []
        dispatch(types.CHANGE_ALLADDBREEDDETAIL, data)
        return
    }
    var body = {
        page: param.cur,
        pageSize: '8',
        ids: param.data,
        queryType: 'all'
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getProductListByIds', //暂未更新
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_ALLADDBREEDDETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
    });
}

export const getDealBreedData = ({ dispatch }, param) => { //获取我的品种统计成交品种详情的数据
    var body = {
        page: param.cur,
        pageSize: '7',
        ids: param.data
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/queryOrderListById', //暂未更新
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_DEALBREEDDETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
    });
}

export const getYestodayData = ({ dispatch }, param) => { //获取昨日新增
    var body = {
        page: param.cur,
        pageSize: '7',
        ids: param.data
    };
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/customer/getListByIds',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }

    }).then((res) => {
        var data = res.json().result
        dispatch(types.YESTODAY_DETAIL, res.json().result.list)
        param.total = data.total
        param.all = data.pages
    }, (res) => {
        console.log('fail')
    })
}


export const getCusTypeData = ({ dispatch }, getCharList) => { //获取个人客户类型折线图   
    if (getCharList) getCharList.load = true;
    var startTime, endTime
    if (getCharList.timeType == 'month') {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == 'day') {
        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {
        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByTypes',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = {
            dataList: res.json().result.list,
            type: getCharList.type
        }
        dispatch(types.CHANGE_CUSTYPECHARTS, data)
    }, (res) => {
        console.log('fail')
    })
}

export const getCusTypeList = ({ dispatch }, getCharList) => { //获取个人客户类型详情
    var body = {}
    if (getCharList) {
        body.startTime = getCharList.startTime,
            body.endTime = getCharList.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByTypesCount',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.CUSTYPE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
}
export const getOrgCusTypeList = ({ dispatch }, getCharList) => { //获取部门客户类型详情  
    var body = {
        queryType: 'org'
    }
    if (getCharList) {
        body.startTime = getCharList.startTime,
            body.endTime = getCharList.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByTypesCount',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.ORG_CUSTYPE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
}

export const getAllCusTypeList = ({ dispatch }, getCharList) => { //获取部门客户类型详情  
    var body = {
        queryType: 'all'
    }
    if (getCharList) {
        body.startTime = getCharList.startTime,
            body.endTime = getCharList.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByTypesCount',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.ALL_CUSTYPE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
}

export const getOrgCusTypeData = ({ dispatch }, getCharList) => { //获取部门客户类型折线图   
    if (getCharList) getCharList.load = true;
    var startTime, endTime
    if (getCharList.timeType == 'month') {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == 'day') {
        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {
        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,
        queryType: 'org'
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByTypes',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = {
            dataList: res.json().result.list,
            type: getCharList.type
        }
        dispatch(types.CHANGE_ORGCUSTYPECHARTS, data)
    }, (res) => {
        console.log('fail')
    })
}

export const getAllCusTypeData = ({ dispatch }, getCharList) => { //获取全部客户类型折线图   
    if (getCharList) getCharList.load = true;
    var startTime, endTime
    if (getCharList.timeType == 'month') {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == 'day') {
        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {
        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,
        queryType: 'all'
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByTypes',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = {
            dataList: res.json().result.list,
            type: getCharList.type
        }
        dispatch(types.CHANGE_ALLCUSTYPECHARTS, data)
    }, (res) => {
        console.log('fail')
    })
}

export const freshOrgCount = ({ dispatch }, getCharList) => { //获取部门客户折线图
    if (getCharList) getCharList.load = true;
    var startTime, endTime
    if (getCharList.timeType == 'month') {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == 'day') {
        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {
        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,
    }
    if (getCharList.type) {
        body.type = getCharList.type
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getOrgCustomerStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_ORGCHARTS, data)
    }, (res) => {
        console.log('fail')
    })
}
export const getFinancialList = ({ dispatch }, param) => { //财务应收应付数据获取
    param.loading = true;
    var url = apiUrl.clientList + param.link;
    var body = {
        type: param.type,
        page: param.cur,
        pageSize: 15
    }
    if (param.startTime != "") {
        body.startTime = param.startTime;
    }
    if (param.endTime != "") {
        body.endTime = param.endTime;
    }
    if (param.orgId != "") {
        body.orgId = param.orgId;
    }
    if (param.employeeId != "") {
        body.employeeId = param.employeeId;
    }
    if (param.customerId != "") {
        body.customerId = param.customerId;
    }
    if (param.customerName != "") {
        body.customerName = param.customerName;
    }
    if (param.isOverdue != "") {
        body.isOverdue = Number(param.isOverdue);
    }
    if (param.orderStatus != "") {
        body.orderStatus = Number(param.orderStatus);
    }

    Vue.http({
        method: 'POST',
        url: url,
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        var finan = res.json().result;
        dispatch(types.FINANCIAL_COUNT_TOTAL, finan);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const freshAllCount = ({ dispatch }, getCharList) => { //获取全部客户统计折线图
    if (getCharList) getCharList.load = true;
    var startTime, endTime
    if (getCharList.timeType == "month") {
        startTime = getCharList.year[0]
        endTime = getCharList.year[1]
    }
    if (getCharList.timeType == "day") {
        startTime = getCharList.monthArr[0]
        endTime = getCharList.monthArr[1]
    }
    var body = {
        dateType: getCharList.timeType,
        startTime: startTime,
        endTime: endTime,
    }
    if (getCharList.type) {
        body.type = getCharList.type
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getAllCustomerStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_ALLCHARTS, data)
    }, (res) => {
        console.log('fail')
    })
}

//部门统计柱状图
export const freshOrgColCharts = ({ dispatch }, param) => {
    var newDate = new Date()
    var myDate = new Date(); //获取今天日期
    var oldDateMs = myDate.setDate(myDate.getDate() - 1);
    var oldDate = new Date(oldDateMs).toFormatString()
    var body = {
        startTime: oldDate,
        endTime: newDate.toFormatString(),
        queryDetail: true
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getOrgCustomerStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().result.list[0]) {
            dispatch(types.CHANGE_ORGCOLCHARTS, res.json().result.list[0])
            param.callback(res.json().result.list[0].addNumberDetail)
        }

    }, (res) => {
        console.log('fail')
    })
}

//全部统计柱状图
export const freshAllColCharts = ({ dispatch }, param) => {
    var newDate = new Date()
    var myDate = new Date(); //获取今天日期
    var oldDateMs = myDate.setDate(myDate.getDate() - 1); //获取前一天时间的毫秒数（跨月会自动计算）    
    var oldDate = new Date(oldDateMs).toFormatString()
    var body = {
        startTime: oldDate,
        endTime: newDate.toFormatString(),
        queryDetail: true
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getAllCustomerStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().result.list[0]) {
            dispatch(types.CHANGE_ALLCOLCHARTS, res.json().result.list[0])
            param.callback(res.json().result.list[0].addNumberDetail)
        }
    }, (res) => {

        console.log('fail')
    })
}

export const getOrgCountDetail = ({ dispatch }, param) => { //获取部门昨日新增详情
    var body = {
        page: param.cur,
        pageSize: '7',
        ids: param.data
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/customer/getListByIds',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.ORG_YESTODAY_DETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages

    }, (res) => {
        console.log('fail');
    });
}

export const getAllCountDetail = ({ dispatch }, param) => { //获取部门业务员详情
    var body = {
        page: param.cur,
        pageSize: '7',
        ids: param.data
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/customer/getListByIds',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.ALL_YESTODAY_DETAIL, data)
        param.total = res.json().result.total
        param.all = res.json().result.pages

    }, (res) => {
        console.log('fail');
    });
}

export const getOrgSalemanData = ({ dispatch }, param) => { //获取部门业务员详情
    // Date.prototype.toLocaleString = function() {
    //     return this.getFullYear() + "-" + ((this.getMonth() + 1)<10?('0'+(this.getMonth() + 1)):(this.getMonth() + 1)) + "-" + (this.getDate()<10?('0'+this.getDate()):this.getDate()) + " " + "00:00:00"
    // };
    var body = {}
    if (param.startTime) {
        body.startTime = param.startTime
    }
    if (param.endTime) {
        body.endTime = param.endTime
    }
    if (param.provinceId) {
        body.provinceId = param.provinceId.id
    }
    if (param.type) {
        body.type = param.type
    }
    if (!param.isSearch) {
        body.endTime = new Date().toFormatString()
    }

    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getOrgEmployeeCustomerStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.ORG_SALEMAN_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail');
    });
}

export const getAllOrgData = ({ dispatch }, param) => { //获取全部部门详情
        var body = {
            queryType: 'all'
        }

        if (param.startTime) {
            body.startTime = param.startTime
        }
        if (param.endTime) {
            body.endTime = param.endTime
        }
        if (param.provinceId) {
            body.provinceId = param.provinceId.id
        }
        if (param.type) {
            body.type = param.type
        }
        if (!param.isSearch) {
            body.endTime = new Date().toFormatString()
        }
        Vue.http({
            method: 'POST',
            url: '/crm/api/v1/count/getCustomerNumberGroupByOrg',
            emulateHTTP: true,
            body: body,
            emulateJSON: false,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then((res) => {
            dispatch(types.ALL_ORG_DETAIL, res.json().result.list)
        }, (res) => {
            console.log('fail');
        });
    }
    //我的统计柱状图
export const freshColCharts = ({ dispatch }, param) => {
    // Date.prototype.toLocaleString = function() {
    //     return this.getFullYear() + "-" + ((this.getMonth() + 1)<10?('0'+(this.getMonth() + 1)):(this.getMonth() + 1)) + "-" + (this.getDate()<10?('0'+this.getDate()):this.getDate()) + " " + "00:00:00"
    // };
    var newDate = new Date()
    var myDate = new Date(); //获取今天日期
    var oldDateMs = myDate.setDate(myDate.getDate() - 1);
    var oldDate = new Date(oldDateMs).toFormatString()
    var body = {
        startTime: oldDate,
        endTime: newDate.toFormatString(),
        queryDetail: true
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerStatistics',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().result.list.length != 0) {
            dispatch(types.CHANGE_COLCHARTS, res.json().result.list)
            param.callback_yes(res.json().result.list[0].addNumberDetail)
        }
    }, (res) => {
        console.log('fail')
    })
};

export const freshBreedBarCharts = ({ dispatch }, param) => { //我的品种统计柱状图
    // Date.prototype.toLocaleString = function() {
    //      return this.getFullYear() + "-" + ((this.getMonth() + 1)<10?('0'+(this.getMonth() + 1)):(this.getMonth() + 1)) + "-" + (this.getDate()<10?('0'+this.getDate()):this.getDate()) + " " + "00:00:00"
    //  };

    var newDate = new Date()
    var myDate = new Date(); //获取今天日期
    var oldDateMs = myDate.setDate(myDate.getDate() - 7);
    var oldDate = new Date(oldDateMs).toFormatString()
    var body = {
        startTime: oldDate,
        endTime: newDate.toFormatString(),
        queryDetail: true,
    }
    if (param) {
        if (param.startTime) {
            body.startTime = param.startTime
        }
        if (param.endTime) {
            body.endTime = param.endTime
        }
        if (param.type) {
            body.type = param.type
        }
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getDealCountByBreed',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }

    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_BREEDBARCHARTS, data)
        dispatch(types.YESTODAY_BREED_DETAIL, data)
        param.start = 0
        param.end = 10
        param.cur = 1
        param.total = data.length
        param.all = Math.ceil(data.length / 10)
    }, (res) => {
        console.log('fail')
    })
};

export const freshOrgBreedBarCharts = ({ dispatch }, param) => { //部门品种统计柱状图
    // Date.prototype.toFormatString = function() {
    //     return this.getFullYear() + "-" + ((this.getMonth() + 1) < 10 ? ('0' + (this.getMonth() + 1)) : (this.getMonth() + 1)) + "-" + (this.getDate() < 10 ? ('0' + this.getDate()) : this.getDate()) + " " + "00:00:00"
    // };

    var newDate = new Date()
    var myDate = new Date(); //获取今天日期
    var oldDateMs = myDate.setDate(myDate.getDate() - 7);
    var oldDate = new Date(oldDateMs).toFormatString()

    var body = {
        startTime: oldDate,
        endTime: newDate.toFormatString(),
        queryDetail: true,
        queryType: 'org'
    }
    if (param.startTime) {
        body.startTime = param.startTime
    }
    if (param.endTime) {
        body.endTime = param.endTime
    }
    if (param.type) {
        body.type = param.type
    }
    if (param.empId) {
        body.employeeId = param.empId
        body.queryType = 'employee'
    }

    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getDealCountByBreed',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }

    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_ORGBREEDBARCHARTS, data)
        dispatch(types.ORGYESTODAY_BREED_DETAIL, data)
        param.start = 0
        param.end = 10
        param.cur = 1
        param.total = data.length
        param.all = Math.ceil(data.length / 10)
    }, (res) => {
        console.log('fail')
    })
};

export const freshAllBreedBarCharts = ({ dispatch }, param) => { //全部品种统计柱状图
    // Date.prototype.toFormatString = function() {
    //      return this.getFullYear() + "-" + ((this.getMonth() + 1)<10?('0'+(this.getMonth() + 1)):(this.getMonth() + 1)) + "-" + (this.getDate()<10?('0'+this.getDate()):this.getDate()) + " " + "00:00:00"
    //  };
    var newDate = new Date()
    var myDate = new Date(); //获取今天日期
    var oldDateMs = myDate.setDate(myDate.getDate() - 7);
    var oldDate = new Date(oldDateMs).toFormatString()

    var body = {
        startTime: oldDate,
        endTime: newDate.toFormatString(),
        queryDetail: true,
        queryType: 'all'
    }
    if (param) {
        if (param.startTime) {
            body.startTime = param.startTime
        }
        if (param.endTime) {
            body.endTime = param.endTime
        }
        if (param.type) {
            body.type = param.type
        }
        if (param.orgId) {
            body.orgId = param.orgId
            body.queryType = 'org'
        }
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getDealCountByBreed',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }

    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.CHANGE_ALLBREEDBARCHARTS, data)
        dispatch(types.ALLYESTODAY_BREED_DETAIL, data)
        param.start = 0
        param.end = 10
        param.cur = 1
        param.total = data.length
        param.all = Math.ceil(data.length / 10)
    }, (res) => {
        console.log('fail')
    })
};

//我的统计区域图
export const freshRegionalCharts = ({ dispatch }, param) => {
    var body = {}
    if (param) {
        body.startTime = param.startTime
        body.endTime = param.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByProvinces',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param = res.json().result.list
        dispatch(types.CHANGE_REGIONALCHARTS, res.json().result.list)
        dispatch(types.PROVINCE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
};

//部门统计区域图
export const freshOrgRegionalCharts = ({ dispatch }, param) => {
    var body = {
        queryType: 'org'
    }
    if (param) {
        body.startTime = param.startTime
        body.endTime = param.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByProvinces',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param = res.json().result.list
        dispatch(types.ORG_REGIONAL_DETAIL, res.json().result.list)
        dispatch(types.ORG_PROVINCE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
};

//全部统计区域图
export const freshAllRegionalCharts = ({ dispatch }, param) => {
    var body = {
        queryType: 'all'
    }
    if (param) {
        body.startTime = param.startTime
        body.endTime = param.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/getEmployeeCustomerNumberByProvinces',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param = res.json().result.list
        dispatch(types.ALL_REGIONAL_DETAIL, res.json().result.list)
        dispatch(types.ALL_PROVINCE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
};

//我的品种统计区域图
export const freshBreedRegionalCharts = ({ dispatch }, param) => {
    var body = {

    }
    if (param) {
        body.startTime = param.startTime
        body.endTime = param.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getBreedNumberByProvinces',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var data = res.json().result.list
        dispatch(types.BREED_REGIONAL_DETAIL, res.json().result.list)
        dispatch(types.BREED_PROVINCE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
};



//部门品种统计区域图
export const freshOrgBreedRegionalCharts = ({ dispatch }, param) => {
    var body = {
        queryType: 'org'
    }
    if (param) {
        body.startTime = param.startTime
        body.endTime = param.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getBreedNumberByProvinces',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.ORGBREED_REGIONAL_DETAIL, res.json().result.list)
        dispatch(types.ORGBREED_PROVINCE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
};


//全部品种统计区域图
export const freshAllBreedRegionalCharts = ({ dispatch }, param) => {
    var body = {
        queryType: 'all'
    }
    if (param) {
        body.startTime = param.startTime
        body.endTime = param.endTime
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/getBreedNumberByProvinces',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.ALLBREED_REGIONAL_DETAIL, res.json().result.list)
        dispatch(types.ALLBREED_PROVINCE_DETAIL, res.json().result.list)
    }, (res) => {
        console.log('fail')
    })
};

//折线图
export const freshLinecharts = ({ dispatch }, getLinechart) => {
    if (getLinechart) getLinechart.load = true;
    Vue.http.get(apiUrl.linechart)
        .then((res) => {
            dispatch(types.CHANGE_LINECHARTS, res.data);
        }, (res) => {
            console.log('fail');
        });
};

//饼状图
export const freshPiecharts = ({ dispatch }, getPiechart) => {
    if (getPiechart) getPiechart.load = true;
    Vue.http.get(apiUrl.piechart)
        .then((res) => {
            dispatch(types.CHANGE_PIECHARTS, res.data);
        }, (res) => {
            console.log('fail');
        });
};

//获取待办事项
export const getBacklogList = ({ dispatch }, param) => {
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?page=' + param.cur + '&pageSize=15';

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var backlogList = res.json().result;
        dispatch(types.BACKLOG_TABLE, backlogList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
        param.messageLen = res.json().result.length
            //localStorage.BacklogParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

//获取通知列表
export const getNoticeList = ({ dispatch }, param) => {
    param.loading = true;
    let body = {
        page: param.cur,
        pageSize: 15
    }
    if (param.read) {
        body.read = param.read;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var noticeList = res.json().result.list;
        if (param.callback) param.callback(noticeList);
        for (var i in noticeList) {
            noticeList[i].checked = false;
            noticeList[i].show = false;
        }
        if (param.cur === 1) {
            dispatch(types.CLEAR_NOTICE_TABLE);
        }
        dispatch(types.NOTICE_TABLE, noticeList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        let arr = [];
        param.callback(arr);
        param.loading = false;
    })
}

//获取报价消息通知列表
export const getOfferMessageList = ({ dispatch }, param) => {
    param.loading = true;
    let body = {
        page: param.cur,
        pageSize: 15,
        bizTypes: param.bizType
    }
    if (param.read) {
        body.read = param.read;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var noticeList = res.json().result.list;
        if (param.callback) param.callback(noticeList);
        for (var i in noticeList) {
            noticeList[i].checked = false;
            noticeList[i].show = false;
        }
        dispatch(types.OFFER_MESSAGE_TABLE, noticeList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        let arr = [];
        param.callback(arr);
        param.loading = false;
    })
}

//已读接口
export const readNotice = ({ dispatch }, param) => {
        var body = {
            ids: param.ids
        };

        Vue.http({
            method: 'POST',
            url: apiUrl.orderList + param.link,
            emulateHTTP: true,
            body: body,
            emulateJSON: false,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then((res) => {
            param.callback(res.json().msg)

        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
    }
    //获取流程记录
export const getFlowRecord = ({ dispatch }, param) => {
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?&bizType=' + param.bizType + '&bizId=' + param.bizId;

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var flowRecord = res.json().result;
        dispatch(types.FLOW_RECORD_TABLE, flowRecord);
        param.loading = false;

        //localStorage.BacklogParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}


//审核流程(完成任务)
export const finishFlow = ({ dispatch }, param) => {
    param.loading = true;
    var body = {
        taskId: param.taskId,
        result: param.result,
        description: param.auditComment
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + '/flow/',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        //var flowRecord = res.json().result;
        /*var flowRecord = [1,2,3];
        dispatch(types.FLOW_RECORD_TABLE, flowRecord);*/
        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.loading = false;

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getOrderList = ({ dispatch }, param) => { //全部订单列表以及订单搜索
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?page=' + param.cur + '&pageSize=15';
    for (var key in param) {
        if (key == 'consignee' && param[key] !== '') {
            url += '&consignee=' + param[key];
        }
        if (key == 'clients' && param[key] !== '') {
            url += '&clients=' + param[key];
        }
        if (key == 'no' && param[key] !== '') {
            url += '&orderNo=' + param[key];
        }
        if (key == 'id' && param[key] !== '') {
            url += '&id=' + param[key];
        }
        if (key == 'customerId' && param[key] !== '') {
            url += '&customerId=' + param[key];
        }
        if (key == 'startTime' && param[key] !== '') {
            url += '&startTime=' + param[key];
        }
        if (key == 'endTime' && param[key] !== '') {
            url += '&endTime=' + param[key];
        }
        if (key == 'mode' && param[key] !== '') {
            url += '&mode=' + param[key];
        }
        if (key == 'validate' && param[key] !== '') {
            url += '&validate=' + param[key];
        }
        if (key == 'dataStatus' && param[key] !== '') {
            url += '&dataStatus=' + param[key];
        }
        if (key == 'orderStatus' && param[key] !== '') {
            url += '&orderStatus=' + param[key];
        }
        if (key == 'payWay' && param[key] !== '') {
            url += '&payWay=' + param[key];
        }
        if (key == 'consigneePhone' && param[key] !== '') {
            url += '&consigneePhone=' + param[key];
        }
        if (key == 'type' && param[key] !== '') {
            if (param[key] == 2) { //预售时
                url += '&type=1&pre=1';
            } else {
                url += '&type=' + param[key];
            }
        }
        if (key == 'org' && param[key] !== '') {
            url += '&org=' + param[key];
        }
        if (key == 'breedId' && param[key] !== '') {
            url += '&breedId=' + param[key];
        }
        if (key == 'intl' && param[key] !== '') {
            url += '&intl=' + param[key];
        }
        if (key == 'employeeId' && param[key] !== '') {
            url += '&employee=' + param[key];
        }
        if (key == 'sample' && param[key] !== '') {
            url += '&sample=' + param[key];
        }
        if (key == 'sourceType' && param[key] !== '') {
            url += '&sourceType=' + param[key];
        }
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orderList = res.json().result.list;
        for (var i in orderList) {
            orderList[i].checked = false;
            orderList[i].show = false;
        }
        orderList.key = param.key;
        dispatch(types.ORDER_TABLE, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        //localStorage.allOrderList = JSON.stringify(orderList);
        localStorage.allOrderParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getToDoOrderList = ({ dispatch }, param) => { //待处理订单列表
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?page=' + param.cur + '&pageSize=15';
    if (param.processDefineKey != '') {
        url += '&processDefineKey=' + param.processDefineKey
    }
    if (param.startTime != '') {
        url += '&startTime=' + param.startTime
    }
    if (param.endTime != '') {
        url += '&endTime=' + param.endTime
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orderList = res.json().result.list;

        orderList.key = param.key;
        dispatch(types.ORDER_TABLE, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        //localStorage.allOrderList = JSON.stringify(orderList);
        localStorage.toDoOrderParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getOrderStatistical = ({ dispatch }, param) => { //简单的订单统计接口
    param.loading = true;
    var body = {
        queryType: 1
    };
    var url = apiUrl.orderList + '/order/statistical';
    for (var key in param) {
        if (key == 'consignee' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'consigneePhone' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'startTime' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'endTime' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'mode' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'orderStatus' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'type' && param[key] !== '') {
            body[key] = param[key];
            if (body[key] == 2) {
                body[key] = 1;
                body.pre = 1;
            }
        }
        if (key == 'validate' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'org' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'breedId' && param[key] !== '') {
            body[key] = param[key];
        }
        if (key == 'employeeId' && param[key] !== '') {
            body.employee = param[key];
        }
        if (key == 'sourceType' && param[key] !== '') {
            body.sourceType = param[key];
        }
    }
    Vue.http({
        method: 'POST',
        url: url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var orderStatis = res.json().result;
        orderStatis.key = param.key;

        dispatch(types.ORDER_STATISTIC, orderStatis);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getOrderPayList = ({ dispatch }, param) => { //订单支付记录列表以及订单搜索
    param.loading = true;
    const body = {
        page: param.cur,
        pageSize: 15
    }
    for (var key in param) {
        if (key == 'orderNo' && param[key] != '') {
            body.orderNo = param[key];
        }
        if (key == 'payWay' && param[key] != '') {
            body.payWay = param[key];
        }
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var orderList = res.json().result.list;
        for (var i in orderList) {
            orderList[i].checked = false;
            orderList[i].show = false;
        }
        dispatch(types.ORDER_PAY_DATA, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.payRecordParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getDrugAccountList = ({ dispatch }, param) => { //药款账户列表
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?page=' + param.cur + '&pageSize=15';
    if (param.name && param.name !== '') {
        url += '&name=' + param.name;
    }
    if (param.userPhone && param.userPhone !== '') {
        url += '&phone=' + param.userPhone;
    }
    if (param.startTime && param.startTime !== '') {
        url += '&startTime=' + param.startTime;
    }
    if (param.endTime && param.endTime !== '') {
        url += '&endTime=' + param.endTime;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var drugAccountList = res.json().result.list;
        // 如果用户名为空，为它添加匿名
        for (var i = 0; i < drugAccountList.length; i++) {
            if (drugAccountList[i].userName == '') {
                drugAccountList[i].userName = '未填写'
            }
        }
        dispatch(types.DRUG_ACCOUNT_DATA, drugAccountList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.drugAccountParam = JSON.stringify(param);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getRolloutList = ({ dispatch }, param) => { //药款转出记录列表以及订单搜索
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?page=' + param.cur + '&pageSize=15';
    if (param.bank && param.bank != "") {
        url += '&bank=' + param.bank;
    }
    if (param.name && param.name !== '') {
        url += '&name=' + param.name;
    }
    if (param.moneyId && param.moneyId !== '') {
        url += '&moneyId=' + param.moneyId;
    }
    if (param.userPhone && param.userPhone !== '') {
        url += '&phone=' + param.userPhone;
    }
    if (param.startTime && param.startTime !== '') {
        url += '&startTime=' + param.startTime;
    }
    if (param.endTime && param.endTime !== '') {
        url += '&endTime=' + param.endTime;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orderList = res.json().result.list;
        dispatch(types.ORDER_ROLLOUT_DATA, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.rollOutParam = JSON.stringify(param);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getDrugsDetail = ({ dispatch }, param) => { //药款转出详情页面
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?id=' + param.moneyId + '&userId=' + param.userId;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var drugsDetail = res.json().result;
        var moneyRollIns = drugsDetail.moneyRollIns;
        if (!moneyRollIns) {
            moneyRollIns = [];
        }
        drugsDetail.moneyRollIns = {};
        drugsDetail.moneyRollIns.arr = moneyRollIns;
        drugsDetail.moneyRollIns.show = true;
        for (var i in drugsDetail.moneyRollIns.arr) {
            drugsDetail.moneyRollIns.arr[i].show = false;
        }
        var moneyRollOuts = drugsDetail.moneyRollOuts;
        if (!moneyRollOuts) {
            moneyRollOuts = [];
        }
        drugsDetail.moneyRollOuts = {};
        drugsDetail.moneyRollOuts.arr = moneyRollOuts;
        drugsDetail.moneyRollOuts.show = true;
        for (var i in drugsDetail.moneyRollOuts.arr) {
            drugsDetail.moneyRollOuts.arr[i].show = false;
        }
        var moneyRecords = drugsDetail.moneyRecords;
        if (!moneyRecords) {
            moneyRecords = [];
        }
        drugsDetail.moneyRecords = {};
        drugsDetail.moneyRecords.arr = moneyRecords;
        drugsDetail.moneyRecords.show = true;
        for (var i in drugsDetail.moneyRecords.arr) {
            drugsDetail.moneyRecords.arr[i].show = false;
        }
        dispatch(types.ROLLOUT_DETAIL, drugsDetail);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const outOfDrugs = ({ dispatch }, param) => { //药款转出财务操作
    const Drugsdata = {
        id: param.id,
        status: param.status
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.orderList + '/money/rollOutHandle',
        emulateHTTP: false,
        body: Drugsdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        param.status = res.json().result.status;
        dispatch(types.ROLLOUT_STATUS, param);
    }, (res) => {
        console.log('fail');
    })
}
export const getOrderCheckList = ({ dispatch }, param) => { //订单财务审核列表以及订单搜索
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?orderStatus=' + param.orderStatus + '&type=' + param.type + '&page=' + param.cur + '&pageSize=15';
    for (var key in param) {
        if (key == 'consignee' && param[key] != '') {
            url += '&consignee=' + param[key];
        }
        if (key == 'clients' && param[key] != '') {
            url += '&clients=' + param[key];
        }
        if (key == 'dataStatus' && param[key] != '') {
            url += '&dataStatus=' + param[key];
        }
        /*if(key=='orderStatus'&&param[key]!=''){
          url += '&orderStatus='+param[key];
        }*/
        if (key == 'payWay' && param[key] != '') {
            url += '&payWay=' + param[key];
        }
        if (key == 'consigneePhone' && param[key] != '') {
            url += '&consigneePhone=' + param[key];
        }
        if (key == 'type' && param[key] != '') {
            url += '&type=' + param[key];
        }
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orderList = res.json().result.list;
        for (var i in orderList) {
            orderList[i].checked = false;
            orderList[i].show = false;
        }
        orderList.key = param.key;
        dispatch(types.ORDER_TABLE, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
        if (param.type == 1) {
            localStorage.sellOrderCheckParam = JSON.stringify(param);
        }
        if (param.type == 0) {
            localStorage.purchaseOrderCheckParam = JSON.stringify(param);
        }


    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getEvaluation = ({ dispatch }, param) => { //获取评论历史
    const data = {
        id: param.id
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var history = res.json().result;
        dispatch(types.EVALUATION_HISTORY, history);
    }, (res) => {
        console.log('fail');
    })
}

export const getUserOrder = ({ dispatch }, param) => { //注册客户的订单列表
    param.loading = true;
    const body = {
        page: param.cur,
        pageSize: 15,
    }
    if (param.type) {
        body.type = param.type;
    }
    if (param.mode) {
        body.mode = param.mode;
    }
    if (param.orderStatus) {
        body.orderStatus = param.orderStatus;
    }
    if (param.validate) {
        body.validate = param.validate;
    }
    if (param.consignee) {
        body.consignee = param.consignee;
    }
    if (param.consigneePhone) {
        body.consigneePhone = param.consigneePhone;
    }
    if (param.endTime) {
        body.endTime = param.endTime;
    }
    if (param.startTime) {
        body.startTime = param.startTime;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }

    }).then((res) => {
        var orderList = res.json().result.list;
        for (var i in orderList) {
            orderList[i].checked = false;
            orderList[i].show = false;
        }
        orderList.key = param.key;
        dispatch(types.ORDER_TABLE, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.userOrderParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const transferOrder = ({ dispatch }, param) => { //注册客户订单划转
    const body = {
        id: param.id,
        userId: param.user,
        employee: param.employee
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.ORDER_TABLE, param);
        if (res.json().result) {
            param.callback(res.json().result);
        } else {
            param.callback(res.json().msg);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const getEmpolyeeOrder = ({ dispatch }, param) => { //业务员的订单(我的订单)列表
    param.loading = true;
    const body = {
        employee: param.employee,
        page: param.cur,
        pageSize: 15
    }
    for (var key in param) {
        if (key == 'consignee' && param[key] != '') {
            body.consignee = param[key];
        }
        if (key == 'clients' && param[key] != '') {
            body.clients = param[key];
        }
        if (key == 'customerId' && param[key] != '') {
            body.customerId = param[key];
        }
        if (key == 'id' && param[key] != '') {
            body.id = param[key];
        }
        if (key == 'no' && param[key] != '') {
            body.orderNo = param[key];
        }
        if (key == 'startTime' && param[key] != '') {
            body.startTime = param[key];
        }
        if (key == 'endTime' && param[key] != '') {
            body.endTime = param[key];
        }
        if (key == 'mode' && param[key] != '') {
            body.mode = param[key];
        }
        if (key == 'dataStatus' && param[key] != '') {
            body.dataStatus = param[key];
        }
        if (key == 'orderStatus' && param[key] != '') {
            body.orderStatus = param[key];
        }
        if (key == 'payWay' && param[key] != '') {
            body.payWay = param[key];
        }
        if (key == 'consigneePhone' && param[key] != '') {
            body.consigneePhone = param[key];
        }
        if (key == 'type' && param[key] != '') {
            body.type = param[key];
            if (body.type == 2) { //表示预售
                body.type = 1;
                body.pre = 1;
            }
        }
        if (key == 'validate' && param[key] !== '') {
            body.validate = param[key];
        }
        if (key == 'sample' && param[key] !== '') {
            body.sample = param[key];
        }
        if (key == 'sourceType' && param[key] !== '') {
            body.sourceType = param[key];
        }
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var orderList = res.json().result.list;
        for (var i in orderList) {
            orderList[i].checked = false;
            orderList[i].show = false;
        }
        orderList.key = param.key;
        dispatch(types.ORDER_TABLE, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.myOrderParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getOrgOrder = ({ dispatch }, param) => { //部门的订单列表
    param.loading = true;
    const body = {
        org: param.org,
        page: param.cur,
        pageSize: 15
    }
    for (var key in param) {
        if (key == 'consignee' && param[key] != '') {
            body.consignee = param[key];
        }
        if (key == 'clients' && param[key] != '') {
            body.clients = param[key];
        }
        if (key == 'no' && param[key] != '') {
            body.orderNo = param[key];
        }
        if (key == 'id' && param[key] != '') {
            body.id = param[key];
        }
        if (key == 'customerId' && param[key] != '') {
            body.customerId = param[key];
        }
        if (key == 'mode' && param[key] != '') {
            body.mode = param[key];
        }
        if (key == 'validate' && param[key] !== '') {
            body.validate = param[key];
        }
        if (key == 'dataStatus' && param[key] != '') {
            body.dataStatus = param[key];
        }
        if (key == 'orderStatus' && param[key] != '') {
            body.orderStatus = param[key];
        }
        if (key == 'payWay' && param[key] != '') {
            body.payWay = param[key];
        }
        if (key == 'consigneePhone' && param[key] != '') {
            body.consigneePhone = param[key];
        }
        if (key == 'type' && param[key] != '') {
            body.type = param[key];
            if (body.type == 2) { //表示预售
                body.type = 1;
                body.pre = 1;
            }
        }
        if (key == 'breedId' && param[key] != '') {
            body.breedId = param[key];
        }
        if (key == 'employeeId' && param[key] != '') {
            body.employee = param[key];
        }
        if (key == 'startTime' && param[key] != '') {
            body.startTime = param[key];
        }
        if (key == 'endTime' && param[key] != '') {
            body.endTime = param[key];
        }
        if (key == 'sample' && param[key] != '') {
            body.sample = param[key];
        }
        if (key == 'sourceType' && param[key] != '') {
            body.sourceType = param[key];
        }
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var orderList = res.json().result.list;
        for (var i in orderList) {
            orderList[i].checked = false;
            orderList[i].show = false;
        }
        orderList.key = param.key;
        dispatch(types.ORDER_TABLE, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.orgOrderParam = JSON.stringify(param);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const exportOrder = ({ dispatch }, param) => { //导出订单
    const body = {
        page: param.cur,
        pageSize: 15,
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + "/order/exportExcel",
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('订单导出成功')

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}



export const orgOrderAudit = ({ dispatch }, param) => { //订单申请审核（单个）
    const data = {
        id: param.id,
    }
    if (param.description) {
        data.description = param.description;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/order/validate',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        param.description = "";
        /*data.index = param.index;
        data.key = param.key;
        data.validate = 1;
        if (res.json().code == 200) {
            dispatch(types.ORG_ORDER_AUDIT, data);
        }*/
        if (param.callback) {
            param.callback(res.json().msg);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const orderApplyAuditAgain = ({ dispatch }, param) => { //订单重新申请审核（单个）
    const data = {
        id: param.id,
    }
    if (param.description) {
        data.description = param.description;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/order/repeatValidate',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        param.show = false;
        param.description = "";
        /*data.index = param.index;
        data.key = param.key;
        data.validate = 1;
        if (res.json().code == 200) {
            dispatch(types.ORG_ORDER_AUDIT, data);
        }*/
        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const orderOrgAudit = ({ dispatch }, param) => { //订单部门主管审核（单个）
    const data = {
        id: param.id,
        validate: param.validate
    }
    if (param.auditComment) {
        data.description = param.auditComment;
    }
    if (param.logistics) {
        data.validate = param.logistics;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/order/flowValidate',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.show = false;
        param.description = "";
        /*data.index = param.index;
        data.key = param.key;
        data.validate = param.validate;
        data.logistics = res.json().result.logistics;
        if (res.json().code == 200) {
            dispatch(types.ORG_ORDER_AUDIT, data);
        }*/

    }, (res) => {
        console.log('fail');
    })
}

export const batchOrgOrder = ({ dispatch }, param) => { //批量审核部门的订单
    const OrgOrderdata = {
        ids: param.ids,
    }
    if (param.description) {
        OrgOrderdata.description = param.description;
    }
    if (param.validate) {
        OrgOrderdata.validate = param.validate;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/order/validates',
        emulateHTTP: false,
        body: OrgOrderdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.show = false;
        param.description = "";
        OrgOrderdata.indexs = param.indexs;
        OrgOrderdata.key = param.key;
        if (res.json().code == 200) {
            dispatch(types.BATCH_ORG_ORDER, OrgOrderdata);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const getExpressList = ({ dispatch }, param) => { //物流列表
    param.loading = true;
    var url = apiUrl.orderList + '/express/';
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var expressList = res.json().result;
        dispatch(types.EXPRESS_DATA, expressList);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const logisticsInfo = ({ dispatch }, param) => { //物流查看详情
    param.loading = true;
    /* var url = apiUrl.orderList+'/order/logistics?checkCode=yunda&number=3903300539521';*/
    var url = apiUrl.orderList + '/order/logistics?checkCode=' + param.lcompanyCode + '&number=' + param.number;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        dispatch(types.EXPRESS_DETAIL_DATA, res.json().result);
        param.loading = false;
    }, (res) => {
        console.log('fail');
    })
}
export const createOrder = ({ dispatch }, data) => { //创建订单

    if (data.city == null || data.city == '' || !data.city) {
        data.city = '';
    }
    if (data.district == null || data.district == '' || !data.district) {
        data.district = '';
    }
    if (data.addressId == null || data.addressId == '' || !data.addressId) {
        data.addressId = 0;
    }
    if (!data.pre) {
        data.pre = 0;
    }
    const body = {
        pre: data.pre,
        type: data.type,
        sourceType: data.sourceType,
        sample: data.sample,
        intl: data.intl,
        customer: data.customer,
        customerName: data.customerName,
        freight: data.freight,
        freightType: data.freightType,
        incidentals: data.incidentals,
        incidentalsDesc: data.incidentalsDesc,
        preferential: data.preferential,
        preferentialDesc: data.preferentialDesc,
        currency: data.currency,
        zipCode: data.zipCode,
        addressId: data.addressId,
        country: data.country,
        province: data.province,
        city: data.city,
        employee: data.employee,
        org: data.org,
        tradeTime: data.tradeTime,
        district: data.district,
        consigneeAddr: data.consigneeAddr,
        comments: data.comments,
        orderStatus: data.orderStatus,
        goods: data.goods
    }
    if (data.title1 == '采购订单') {
        body.link = data.link;
    }
    if (data.email) {
        body.email = data.email;
    }
    if (data.consigner) {
        body.consigner = data.consigner;
    }
    if (data.consignee == '') {
        body.consignee = data.customerName;
    } else {
        body.consignee = data.consignee;
    }
    if (data.consigneePhone == '') {
        body.consigneePhone = data.customerPhone;
    } else {
        body.consigneePhone = data.consigneePhone;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + '/order/',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        data.callback(res.json().msg);
        if (res.json().code == 200) {
            data.no = res.json().result.no;
            data.id = res.json().result.id;
            data.clients = res.json().result.clients;
            data.payWay = res.json().result.payWay;
            data.validate = res.json().result.validate;
            data.checked = false;
            data.sample = res.json().result.sample;
            data.goodsDesc = res.json().result.goodsDesc;
            data.total = res.json().result.total;
            data.cost = res.json().result.cost;
            data.unpaid = res.json().result.unpaid;
            data.prepaid = res.json().result.prepaid;
            data.ctime = new Date();
            data.consignee = res.json().result.consignee;
            data.tradeTime = res.json().result.tradeTime;
            data.consigner = res.json().result.consigner;
            data.consigneePhone = res.json().result.consigneePhone;
            data.consigneeAddr = res.json().result.consigneeAddr;
            data.mode = 3;
            data.show = false;
            dispatch(types.ORDER_ADD_DATA, data);
        }

    }, (res) => {
        console.log('fail');
        data.show = false;
    });
}
export const alterOrder = ({ dispatch }, param) => { //修改订单

    if (param.city == null || param.city == '' || !param.city) {
        param.city = '';
    }
    if (param.district == null || param.district == '' || !param.district) {
        param.district = '';
    }
    const body = {
        type: param.type,
        id: param.id,
        sourceType: param.sourceType,
        sample: param.sample,
        intl: param.intl,
        customer: param.customer,
        freight: param.freight,
        freightType: param.freightType,
        incidentals: param.incidentals,
        incidentalsDesc: param.incidentalsDesc,
        preferential: param.preferential,
        preferentialDesc: param.preferentialDesc,
        currency: param.currency,
        consignee: param.consignee,
        consigneePhone: param.consigneePhone,
        zipCode: param.zipCode,
        country: param.country,
        province: param.province,
        city: param.city,
        tradeTime: param.tradeTime,
        district: param.district,
        customerName: param.customerName,
        consigneeAddr: param.consigneeAddr,
        comments: param.comments,
        orderStatus: param.orderStatus,
        goods: param.goods
    }
    if (param.consigner) {
        body.consigner = param.consigner;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.orderList + '/order/',
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.show = false;
        param.checked = false;
        param.consigneeAddr = res.json().result.consigneeAddr;
        param.goodsDesc = res.json().result.goodsDesc;
        param.unpaid = res.json().result.unpaid;
        if (res.json().code == 200) {
            dispatch(types.ORDER_UPDATE_DATA, param);
        }
    }, (res) => {
        console.log('fail');
        param.show = false;
    });
}

export const getOrderLinkList = ({ dispatch }, param) => { //获取“待采购”列表
    param.loading = true;
    let body = {
        page: param.cur,

    }
    if (param.pageSize) {
        body.pageSize = param.pageSize
    } else {
        body.pageSize = 15
    }
    if (param.sellEmployee) {
        body.sellEmployee = param.sellEmployee;
    }
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        let orderLinkList = res.json().result.list;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        orderLinkList.key = param.key;
        for (let i = 0; i < orderLinkList.length; i++) {
            orderLinkList[i].checked = false;
        }
        dispatch(types.ORDER_LINK, orderLinkList);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const updateOrderLink = ({ dispatch }, param) => { //修改“待采购”
    const body = {
        sellId: param.sellId,
        sellEmployee: param.sellEmployee,
        orderLinkList: param.orderLinkList
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.show = false;
    }, (res) => {
        console.log('fail');
        param.show = false;
    });
}

export const createOrderByOrderLink = ({ dispatch }, param) => { //“待采购”生成订单
    const body = {
        type: param.type,
        customer: param.customer,
        customerName: param.customerName,
        customerPhone: param.customerPhone,
        incidentals: param.incidentals,
        incidentalsDesc: param.incidentalsDesc,
        preferential: param.preferential,
        preferentialDesc: param.preferentialDesc,
        employee: param.employee,
        orderStatus: param.orderStatus,
        orderLinkList: param.orderLinkList
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.show = false;

    }, (res) => {
        console.log('fail');
        param.show = false;
    });
}

export const uploadDocument = ({ dispatch }, param) => { //新建订单详情各个凭证
    const body = {
        orderId: param.orderId,
        description: param.description,
        fileType: param.fileType,
        bizType: param.bizType
    }
    if (param.titles == "上传支付凭证") {
        body.payPics = param.files;
    }
    if (param.titles == "上传附件凭证") {
        body.attachFiles = param.files;
    }
    if (param.titles == "上传物流凭证") {
        body.sendPics = param.files;
    }
    if (param.titles == "上传合同") {
        body.orderContractList = param.files;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.creCallback(res.json().msg);
        dispatch(types.ORDER_UPLOAD_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const dividedPayment = ({ dispatch }, param) => { //新建订单付款分期
    const stages = [];
    for (var i = 0; i < param.stages.length; i++) {
        var temp = {};
        // temp = {
        //     id: param.stages[i].id,
        //     amount: param.stages[i].amount,
        //     comment: param.stages[i].comment,
        //     creater: param.stages[i].creater,
        //     description: param.stages[i].description,
        //     orderId: param.stages[i].orderId,
        //     orderStatus: param.stages[i].orderStatus,
        //     ratio: param.stages[i].ratio,
        //     extra: param.stages[i].extra,
        //     status: param.stages[i].status,
        //     type: param.stages[i].type,
        //     validate: param.stages[i].validate
        // };
        temp.id = param.stages[i].id;
        temp.amount = param.stages[i].amount,
            temp.comment = param.stages[i].comment,
            // temp.creater =param.stages[i].creater,
            temp.description = param.stages[i].description,
            temp.orderId = param.stages[i].orderId,
            temp.orderStatus = param.stages[i].orderStatus,
            // temp.ratio =param.stages[i].ratio,
            temp.extra = param.stages[i].extra,
            // temp.status =param.stages[i].status,
            temp.type = param.stages[i].type,
            // temp.validate =param.stages[i].validate
            stages.push(temp);

    }

    const body = {
        id: param.id,
        stages: stages
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        for (var i in res.json().result) {
            param.stages[i].type = res.json().result[i].type;
            param.stages[i].ctime = res.json().result[i].ctime;
            param.stages[i].validate = res.json().result[i].validate;
        }
        if (res.json().code == 200) {
            dispatch(types.ORDER_UPLOAD_DATA, param);
        }
    }, (res) => {
        console.log('fail');
    });
}

export const paymentConfirm = ({ dispatch }, param) => { //确定收款
    var ss = param.images;
    var img = ss.split(","); //字符串转化为数组
    img.toString();
    const body = {
        id: param.id,
        images: img
    }
    if (param.comment) {
        body.comment = param.comment;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.pr = res.json().result.pr;
        if (res.json().code == 200) {
            dispatch(types.MY_FUND_LIST, param);
        }
    }, (res) => {
        console.log('fail');
    });
}

export const paymentAudit = ({ dispatch }, param) => { //订单分期审核
    const body = {
        payWay: param.payWay,
    }
    if (param.id && param.id != '') {
        body.id = param.id;
    }
    if (param.currency && param.currency != '') {
        body.currency = param.currency;
    }
    if (param.validate && param.validate != '') {
        body.validate = param.validate;
    }
    if (param.prNo && param.prNo != '') {
        body.prNo = param.prNo;
    }
    if (param.amount && param.amount != '') {
        body.amount = param.amount;
    }
    if (param.country && param.country != '') {
        body.payCountry = param.country;
    }
    if (param.amount == 0) {
        body.amount = 0;
    }
    if (param.description && param.description != '') {
        body.description = param.description;
    }
    if (param.comment && param.comment != '') {
        body.comment = param.comment;
    }
    if (param.payNumber && param.payNumber != '') {
        body.payNumber = param.payNumber;
    }
    if (param.bizSubId && param.bizSubId != '') {
        body.bizSubId = param.bizSubId;
    }
    if (param.payUserName && param.payUserName != '') {
        body.payUserName = param.payUserName;
    }
    if (param.bizId && param.bizId != '') {
        body.bizId = param.bizId;
    }
    if (param.payName && param.payName != '') {
        body.payName = param.payName;
    }
    if (param.paySubName && param.paySubName != '') {
        body.paySubName = param.paySubName;
    }
    if (param.images) {
        body.images = param.images;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        param.callback(res.json().msg);
        if (res.json().code == 200) {
            param.validate = res.json().result.validate;
            param.pr = res.json().result.pr;
            dispatch(types.ORDER_UPLOAD_DATA, param);
        }
        if (res.json().msg == '已申请审核') {
            param.validate = 1;
            dispatch(types.ORDER_UPLOAD_DATA, param);
        }
        if (param.titles == '分期审核' || param.titles == '确认付款' || param.titles == '确认收款') {
            param.validate = res.json().result.validate;
            param.pr = res.json().result.pr;
            param.prNo = res.json().result.prNo;
            dispatch(types.FINANCE_LIST, param);
        }
        if (param.titles == '编辑') {
            param.validate = res.json().result.validate;
            param.pr = res.json().result.pr;
            param = res.json().result;
            dispatch(types.MY_FUND_LIST, param);
        }
    }, (res) => {
        console.log('fail');
    });
}
export const editPayment = ({ dispatch }, param) => { //编辑我的收付款

    const data = {
        id: param.id,
        comment: param.comment,
        payName: param.payName,
        payNumber: param.payNumber,
        payUserName: param.payUserName,
        payWay: param.payWay
    }
    if (param.paySubName && param.paySubName != '') {
        data.paySubName = param.paySubName;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.orderList + param.url,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            param.payName = res.json().result.payName;
            param.payNumber = res.json().result.payNumber;
            param.payUserName = res.json().result.payUserName;
            param.payWay = res.json().result.payWay;
            param.paySubName = res.json().result.paySubName;
            dispatch(types.MY_FUND_LIST, param);
        }
    }, (res) => {
        console.log('fail');
    });
};
export const orderStatu = ({ dispatch }, param) => { //订单状态详情
    param.loading = true;
    const body = {
        orderId: param.id
    }
    if (param.images) {
        body.images = param.images;
    }
    if (param.b && param.link == '/order/send') {
        var strs = param.b.split(",");
        param.lcompanyId = strs[0];
        body.logistics = param.lcompanyId;
    }
    if (param.b && param.link == '/order/sendflowSend') {
        var strs = param.b.split(",");
        param.logistics = strs[0];
        body.logistics = param.logistics;
    }
    if (param.b) {
        var strs = param.b.split(",");
        param.name = strs[1];
        body.name = param.name;
    }
    if (param.name) {
        body.name = param.name;
    }
    if (param.b) {
        var strs = param.b.split(",");
        param.code = strs[2];
        body.code = param.code;
    }
    if (param.lcompanyNo) {
        body.number = param.lcompanyNo;
    }
    if (param.number) {
        body.number = param.number;
    }
    if (param.driverName) {
        body.driverName = param.driverName;
    }
    if (param.driverPid) {
        body.driverPid = param.driverPid;
    }
    if (param.driverTel) {
        body.driverTel = param.driverTel;
    }
    if (param.vehicleNo) {
        body.vehicleNo = param.vehicleNo;
    }
    if (param.way) {
        body.way = param.way;
    }
    if (param.vesselNo) { //船次
        body.vesselNo = param.vesselNo;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        if (res.json().result == null) {
            var status = param;
        } else {
            var status = res.json().result;
        }
        param.callback(res.json().msg);
        status.link = param.link;
        status.key = param.key;
        if (res.json().code == 200) {
            dispatch(types.ORDER_STATUS, status);
        }

    }, (res) => {
        console.log('fail');
    })
}
export const orderDeliverGoods = ({ dispatch }, param) => { //销售订单发货，采购订单发货在上面
    param.loading = true;
    const body = {
        id: param.id,
        logisticses: param.logisticses
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        if (res.json().result == null) {
            var status = param;
        } else {
            var status = res.json().result;
        }
        status.orderStatus = 50;
        param.callback(res.json().msg);

    }, (res) => {
        console.log('fail');
    })
}

export const orderReceive = ({ dispatch }, param) => { //订单收货流程

    param.images = '';
    if (param.image_f) {
        param.images += param.image_f + ','
    }
    if (param.image_s) { param.images += param.image_s + ',' }
    if (param.image_t) { param.images += param.image_t };
    const body = {
        id: param.id
    }
    if (param.images) {
        body.images = param.images;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.ORDER_STATUS, param);
        }
        param.show = false;
    }, (res) => {
        console.log('fail');
        param.show = false;
    })
}

/*订单取消状态,在orderStatus.vue界面取消时要传两个参数,（param是需要传入后台的，data是要隐藏orderStatus的）
 *如果在部门订单列表页取消，就只需要一个参数
 */
export const orderCancle = ({ dispatch }, param, data) => {

    const body = {
        orderId: param.id,
        cancleCauses: param.cancleCauses
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        if (data) {
            data.show = false;
        }
        var status = res.json().result;
        if (param.cancelBack) {
            param.cancelBack(res.json().msg);
        }
        status.key = param.key;
        dispatch(types.ORDER_STATUS, status);
    }, (res) => {
        console.log('fail');
    })
}

/*订单取消申请，走取消流程
 */
export const orderCancleApply = ({ dispatch }, param) => {
    const body = {
        orderId: param.orderId,
        cancleCauses: param.cancleCauses
    }
    if (param.validate) {
        body.validate = param.validate;
    }
    if (param.id) {
        body.id = param.id;
    }
    if (param.taskKey) {
        body.taskKey = param.taskKey;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.cancelBack) {
            param.cancelBack(res.json().msg);
        }
        param.show = false;

    }, (res) => {
        param.show = false;
        console.log('fail');
    })
}

/*订单取消审核，走取消流程
 */
export const orderCancleFlow = ({ dispatch }, param) => {
    const body = {
        id: param.id,
        cancleCauses: param.cancleCauses,
        validate: param.validate,
        taskKey: param.taskKey
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + param.link,
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.show = false;
    }, (res) => {
        param.show = false;
        console.log('fail');
    })
}

export const yankuanPayorder = ({ dispatch }, param, undelinePay) => { //订单支付状态(已更改流程，此步骤接口未经过)
    undelinePay.images = '';
    if (undelinePay.image_f) {
        undelinePay.images += undelinePay.image_f + ','
    }
    if (undelinePay.image_s) { undelinePay.images += undelinePay.image_s + ',' }
    if (undelinePay.image_t) { undelinePay.images += undelinePay.image_t };
    /*var ss= param.images;
    var sss = ss.split(",");//字符串转化为数组
    sss..toString()*/
    const body = {
        orderId: undelinePay.id,
        payWay: undelinePay.payWay
    }
    if (undelinePay.images) {
        body.images = undelinePay.images;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + undelinePay.link,
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        undelinePay.show = false;
        param.show = false;
        var status = res.json().result;
        status.key = param.key;
        param.callback(res.json().msg);
        dispatch(types.ORDER_STATUS, status);
    }, (res) => {
        console.log('fail');
    })
}

export const getOrderDetail = ({ dispatch }, param) => { //获取订单详情
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.orderList + '/order/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orderDetail = res.json().result;
        if (param.key == 'orderDetail') {
            var goods = orderDetail.goods;
            if (!goods) {
                goods = [];
            }
            var goodsArr = [];
            for (var i = 0; i < orderDetail.goods.length; i++) {
                orderDetail.goods[i].checked = false;
                goodsArr.push(orderDetail.goods[i]);
                console.log("sdfgdsfds", goodsArr)
            }

            orderDetail.goods = {};
            orderDetail.goods.arr = goodsArr;
            orderDetail.goods.selected = [];
            orderDetail.goods.show = true;
            orderDetail.goods.total = 0;
            for (var i in orderDetail.goods.arr) {
                orderDetail.goods.arr[i].show = false;
                orderDetail.goods.total += orderDetail.goods.arr[i].amount * 100;
            }
            orderDetail.goods.total = orderDetail.goods.total / 100;
            var payPics = orderDetail.payPics;
            if (!payPics) {
                payPics = [];
            }
            orderDetail.payPics = {};
            orderDetail.payPics.arr = payPics;
            orderDetail.payPics.show = true;
            payPics.url = [];
            for (var i in orderDetail.payPics.arr) {
                orderDetail.payPics.arr[i].show = false;
                if (orderDetail.payPics.arr[i].url) {
                    var img = orderDetail.payPics.arr[i].url;
                    var file = img.split(',');
                    payPics.url = payPics.url.concat(file);
                }

            }

            var sendPics = orderDetail.sendPics;
            orderDetail.sendPics = {};
            orderDetail.sendPics.arr = sendPics;
            orderDetail.sendPics.show = true;
            for (var i in orderDetail.sendPics.arr) {
                orderDetail.sendPics.arr[i].show = false;
            }

            var attachFiles = orderDetail.attachFiles;
            orderDetail.attachFiles = {};
            orderDetail.attachFiles.arr = attachFiles;
            orderDetail.attachFiles.show = true;
            for (var i in orderDetail.attachFiles.arr) {
                orderDetail.attachFiles.arr[i].show = false;
            }

            var logisticses = orderDetail.logisticses;
            orderDetail.logisticses = {};
            orderDetail.logisticses.arr = logisticses;
            orderDetail.logisticses.show = true;
            for (var i in orderDetail.logisticses.arr) {
                orderDetail.logisticses.arr[i].show = false;
            }

            var contractList = orderDetail.contractList;
            orderDetail.contractList = {};
            orderDetail.contractList.arr = contractList;
            orderDetail.contractList.show = true;
            for (var i in orderDetail.contractList.arr) {
                orderDetail.contractList.arr[i].show = false;
            }

            var stages = orderDetail.stages;
            orderDetail.stages = {};
            orderDetail.stages.arr = stages;
            orderDetail.stages.show = true;
            for (var i in orderDetail.stages.arr) {
                orderDetail.stages.arr[i].show = false;
            }

            var orderLinkList = orderDetail.orderLinkList;
            orderDetail.orderLinkList = {};
            orderDetail.orderLinkList.arr = orderLinkList;
            orderDetail.orderLinkList.show = true;
            for (var i in orderDetail.orderLinkList.arr) {
                orderDetail.orderLinkList.arr[i].flag = 0;
                orderDetail.orderLinkList.arr[i].show = false;
            }
        }
        if (param.key == 'myOrderList' || param.key == 'orgOrderList' || param.key == 'allOrderList' || param.key == 'sellOrderList') {
            orderDetail.goods.forEach(function(item) {
                var temp = {
                    id: item.id,
                    breedId: item.breedId,
                    breedName: item.breedName,
                    quality: item.quality,
                    title: item.title,
                    location: item.location,
                    spec: item.spec,
                    number: item.number,
                    unit: item.unit,
                    price: item.price,
                    costPrice: item.costPrice,
                    status: item.status,
                    sourceType: item.sourceType,
                }
                param.goods.push(temp);
                param.goodsBack.push(temp);
            })

        }
        param.loading = false;
        dispatch(types.ORDER_DETAIL_DATA, orderDetail);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const getOrderDetailByOrderCancel = ({ dispatch }, param) => { //根据订单取消的ID获取订单详情
    param.loading = true;
    let body = {
        id: param.id
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + '/order/flow/cancel/details',
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var orderDetail = res.json().result;
        if (param.key == 'orderDetail') {
            var goods = orderDetail.goods;
            if (!goods) {
                goods = [];
            }
            orderDetail.goods = {};
            orderDetail.goods.arr = goods;
            orderDetail.goods.show = true;
            orderDetail.goods.total = 0;
            for (var i in orderDetail.goods.arr) {
                orderDetail.goods.arr[i].show = false;
                orderDetail.goods.total += orderDetail.goods.arr[i].amount * 100;
            }
            orderDetail.goods.total = orderDetail.goods.total / 100;
            var payPics = orderDetail.payPics;
            if (!payPics) {
                payPics = [];
            }
            orderDetail.payPics = {};
            orderDetail.payPics.arr = payPics;
            orderDetail.payPics.show = true;
            payPics.url = [];
            for (var i in orderDetail.payPics.arr) {
                orderDetail.payPics.arr[i].show = false;
                if (orderDetail.payPics.arr[i].url) {
                    var img = orderDetail.payPics.arr[i].url;
                    var file = img.split(',');
                    payPics.url = payPics.url.concat(file);
                }

            }

            var sendPics = orderDetail.sendPics;
            orderDetail.sendPics = {};
            orderDetail.sendPics.arr = sendPics;
            orderDetail.sendPics.show = true;
            for (var i in orderDetail.sendPics.arr) {
                orderDetail.sendPics.arr[i].show = false;
            }

            var attachFiles = orderDetail.attachFiles;
            orderDetail.attachFiles = {};
            orderDetail.attachFiles.arr = attachFiles;
            orderDetail.attachFiles.show = true;
            for (var i in orderDetail.attachFiles.arr) {
                orderDetail.attachFiles.arr[i].show = false;
            }

            var logisticses = orderDetail.logisticses;
            orderDetail.logisticses = {};
            orderDetail.logisticses.arr = logisticses;
            orderDetail.logisticses.show = true;
            for (var i in orderDetail.logisticses.arr) {
                orderDetail.logisticses.arr[i].show = false;
            }

            var contractList = orderDetail.contractList;
            orderDetail.contractList = {};
            orderDetail.contractList.arr = contractList;
            orderDetail.contractList.show = true;
            for (var i in orderDetail.contractList.arr) {
                orderDetail.contractList.arr[i].show = false;
            }

            var stages = orderDetail.stages;
            orderDetail.stages = {};
            orderDetail.stages.arr = stages;
            orderDetail.stages.show = true;
            for (var i in orderDetail.stages.arr) {
                orderDetail.stages.arr[i].show = false;
            }

            var orderLinkList = orderDetail.orderLinkList;
            orderDetail.orderLinkList = {};
            orderDetail.orderLinkList.arr = orderLinkList;
            orderDetail.orderLinkList.show = true;
            for (var i in orderDetail.orderLinkList.arr) {
                orderDetail.orderLinkList.arr[i].flag = 0;
                orderDetail.orderLinkList.arr[i].show = false;
            }
        }

        param.loading = false;
        dispatch(types.ORDER_DETAIL_DATA, orderDetail);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}


export const getLinkOrder = ({ dispatch }, param) => { //获取关联订单（采销对应）
    const body = {
        id: param.id
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + '/order/queryLinkOrder',
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        let temp = res.json().result;
        let result = {
            arr: temp,
            show: true
        };

        dispatch(types.LINK_ORDER, result);
    }, (res) => {
        console.log('fail');
    })
}

export const downOrderDetailPDF = ({ dispatch }, param) => { //下载订单详情PDF
    param.loading = true;
    var url = apiUrl.orderList + '/fund/downPDFVoucher';
    var body = {
        id: param.id
    }

    Vue.http({
        method: 'POST',
        url: url,
        emulateJSON: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        window.open(res.json().result);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getSystemData = ({ dispatch }, param) => { //枚举类型
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.dataBaseList + '/query?type=&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj1 = res.json().result.list;
        for (var i in obj1) {
            obj1[i].show = false;
            obj1[i].delInfo = false;
        }
        dispatch(types.SYSTEM_DATA, obj1);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getSystemSearch = ({ dispatch }, param) => { //搜索枚举类型

    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/enum/query/?type=' + param.sel + '&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj1 = res.json().result.list;
        for (var i in obj1) {
            obj1[i].show = false;
            obj1[i].delInfo = false;
        }
        dispatch(types.SYSTEM_DATA, obj1);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const saveDataInfo = ({ dispatch }, data) => { //新建枚举类型

    const body = {
        code: data.code,
        desc: data.desc,
        id: data.id,
        name: data.name,
        type: data.type,
        typedesc: data.type
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.dataBaseList + '/',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        data.callback(res.json().msg);
        data.id = res.json().result.id;
        if (res.json().code == 200) {
            dispatch(types.ADD_DATA, data);
        }

    }, (res) => {
        console.log('fail');
    });
};
export const updateDataInfo = ({ dispatch }, param) => { //修改枚举信息

    const data = {
        code: param.code,
        desc: param.desc,
        id: param.id,
        name: param.name,
        status: param.status,
        type: param.type,
        typedesc: param.type
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.dataBaseList + '/',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.UPDATE_DATA, param);
        }
    }, (res) => {
        console.log('fail');
    });
};

export const deleteShowStatue = ({ dispatch }, param) => { //删除枚举

    Vue.http({
        method: 'DELETE',
        url: apiUrl.dataBaseList + '/' + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.DELETE_SHOW_STATUE, param);
    }, (res) => {
        console.log('fail');
    });
};

export const getProvinceData = ({ dispatch }, param) => { //省市区列表

    if (param.loading) param.loading = true;
    if (!param.cur) {
        param.cur = '';
    }
    Vue.http({
        method: 'GET',
        url: apiUrl.provinceList + '/?page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        for (var i in obj) {
            obj[i].show = false;
        }
        dispatch(types.PROVINCE_DATA, obj);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getCountryList = ({ dispatch }, param) => { //获取国家列表
    if (param.loading !== undefined) {
        param.loading = true;
    }
    if (!param.cur) {
        param.cur = '';
    }
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/country/?page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        obj.forEach(function(item) {
            item.cnameEn = item.cname + '(' + item.nameEn + ')'; //中英文名字"中国/Chinese"
        })
        dispatch(types.COUNTRY_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        if (param.country) {
            for (var i in res.json().result) {
                //有的地方国家传的ID，有的地方国家传的中文名
                if (res.json().result[i].cname == param.country || res.json().result[i].id == param.country) {
                    const object = {
                        id: res.json().result[i].id,
                        province: param.province,
                        city: param.city,
                        loading: false
                    }
                    return getProvinceList({ dispatch }, object);
                }
            }
        } else {
            param.country = '';
        }

    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getProvinceList = ({ dispatch }, param) => { //获取省的列表
    if (param.loading) param.loading = true;
    if (!param.id) {
        param.id = '';
    }
    if (!param.cur) {
        param.cur = '';
    }
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/province/?page=' + param.cur + '&pageSize=15&country=' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        obj.forEach(function(item) {
            item.cnameEn = item.cname + '(' + item.nameEn + ')'; //中英文名字"中国/Chinese"
        })
        dispatch(types.PROVINCE_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        if (param.province) {
            for (var i in res.json().result) {
                if (res.json().result[i].cname == param.province || res.json().result[i].id == param.province) {
                    const object = {
                        id: res.json().result[i].id,
                        city: param.city,
                        loading: false
                    }
                    return getCityList({ dispatch }, object);
                }
            }
        }
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getCityList = ({ dispatch }, param) => { //获取市的列表
    if (param.loading) param.loading = true;
    if (!param.cur) {
        param.cur = '';
    }
    if (!param.id) {
        return "";
    }
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/city/?page=' + param.cur + '&pageSize=15&province=' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        obj.forEach(function(item) {
            item.cnameEn = item.cname + '(' + item.nameEn + ')'; //中英文名字"中国/Chinese"
        })
        dispatch(types.CITY_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        if (param.city) {
            for (var i in res.json().result) {
                if (res.json().result[i].cname == param.city || res.json().result[i].id == param.city) {
                    const object = {
                        id: res.json().result[i].id,
                        loading: false
                    }
                    return getDistrictList({ dispatch }, object);
                }
            }
        }
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getDistrictList = ({ dispatch }, param) => { //获取区的列表
    if (param.loading) param.loading = true;
    if (!param.cur) {
        param.cur = '';
    }

    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/district/?page=' + param.cur + '&pageSize=15&city=' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;

        dispatch(types.DISTRICT_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getEnterpriseData = ({ dispatch }, param) => { // 企业列表

    param.loading = true;
    Vue.http({
        method: "GET",
        url: apiUrl.clientList + '/company/query?type=&name=&city=&category=&province=&transform=&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {

        var obj = res.json().result.list;
        for (var i in obj) {
            obj[i].show = false;
        }
        dispatch(types.SERVICE_ENTERPRISE, obj);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getCompanyData = ({ dispatch }, param) => { //企业搜索
    param.loading = true;
    if (!param.cur) {
        param.cur = '';
    }
    var url = apiUrl.clientList + '/company/query?page=' + param.cur + '&pageSize=15';
    for (var key in param) {
        if (key == 'conType' && param[key] !== '') {
            url += '&type=' + param.conType
        } else if (key == 'conType') {
            url += '&type='
        }
        if (key == 'name' && param[key] !== '') {
            url += '&name=' + param.name
        } else if (key == 'name') {
            url += '&name='
        }
        if (key == 'category' && param[key] !== '') {
            url += '&category=' + param.category
        } else if (key == 'category') {
            url += '&category='
        }
        if (key == 'province' && param[key] !== '') {
            url += '&province=' + param.province
        } else if (key == 'province') {
            url += '&province='
        }
        if (key == 'transform' && param[key] !== '') {
            url += '&transform=' + param.transform
        } else if (key == 'transform') {
            url += '&transform='
        }
        if (key == 'city' && param[key] !== '' && param[key] !== undefined) {
            url += '&city=' + param.city
        } else if (key == 'city') {
            url += '&city='
        }
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;

        for (var i in obj) {
            obj[i].show = false;
        }
        dispatch(types.SERVICE_ENTERPRISE, obj);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getCompanyDetail = ({ dispatch }, param) => { //获取企业详情
    Vue.http({
        method: 'GET',
        url: apiUrl.enterpriseList + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        var arr = obj.companyContacts;
        obj.companyContacts = {
            arr: arr,
            show: true
        };
        for (var i in obj.companyContacts.arr) {
            obj.companyContacts.arr[i].show = false;
        }
        var arr = obj.companyProducts;
        obj.companyProducts = {
            arr: arr,
            show: true
        };
        for (var i in obj.companyProducts.arr) {
            obj.companyProducts.arr[i].show = false;
        }
        var arr = obj.companyLicenses;
        obj.companyLicenses = {
            arr: arr,
            show: true
        };
        for (var i in obj.companyLicenses.arr) {
            obj.companyLicenses.arr[i].show = false;
        }
        dispatch(types.SERVICE_ENTERPRISE_DETAIL, obj);
    }, (res) => {
        console.log('fail');
    });
}
export const updateEnterprise = ({ dispatch }, param) => { //修改企业电话备注

    const alterdata = {
        tel: param.tel,
        remark: param.remark,
        id: param.id
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.enterpriseList,
        emulateHTTP: false,
        body: alterdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        dispatch(types.UPDATE_ENTERPRISE, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterCompany = ({ dispatch }, param) => { //修改企业联系人
    const alterdata = {
        name: param.name,
        cid: param.cid,
        phone: param.phone,
        tel: param.tel,
        email: param.email,
        wechart: param.wechart,
        main: param.main,
        id: param.id,
        status: 1
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.enterpriseList + param.url,
        emulateHTTP: false,
        body: alterdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const deleteCompanyContact = ({ dispatch }, param) => { //删除企业联系人
    const alterdata = {
        status: 0,
        id: param.id
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.enterpriseList + param.url,
        emulateHTTP: false,
        body: alterdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.DELETE_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}


export const createContact = ({ dispatch }, param) => { //新增企业联系人

    const data1 = {
        "name": param.name,
        "cid": param.cid,
        "tel": param.tel,
        "phone": param.phone,
        "wechart": param.wechart,
        "email": param.email,
        "main": param.main,
        "position": param.position
    }
    Vue.http({
        method: "POST",
        url: apiUrl.enterpriseList + 'contract',
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.id = res.json().result.id;
        dispatch(types.ADD_CONTACT_DATA, param)
    }, (res) => {
        console.log('fail');
    });
}

export const getCompanyProduct = ({ dispatch }, param) => { //企业产品
    param.loading = true;
    var url = apiUrl.clientList + '/company/products?page=' + param.cur + '&pageSize=15';

    if (param.name) {
        url += "&name=" + param.name;
    }
    if (param.type) {
        url += "&type=" + param.type;
    }
    if (param.approvalNo) {
        url += "&approvalNo=" + param.approvalNo;
    }
    if (param.companyName) {
        url += "&companyName=" + param.companyName;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        dispatch(types.COMPANY_PRODUCT_DATA, obj);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getCompanyProductDetail = ({ dispatch }, param) => { //(公司)企业产品详情
    param.loading = true;
    var url = apiUrl.clientList + param.link + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var detail = res.json().result;
        var drugList = detail.drugList;
        var breedList = [];
        if (drugList.length > 0 && drugList[0].component) { //如果配方存在
            let list = drugList[0].component.split(";");
            let length = list.length;
            if (length > 1) { //最后一个为"",应该去掉
                for (let i = 0; i < length - 1; i++) {
                    let temp = list[i].split(":");
                    if (temp.length >= 2) {
                        let breed = {
                            name: temp[0],
                            number: temp[1]
                        };
                        breedList.push(breed);
                    }

                }
            }
            detail.drugList[0].componentArr = breedList;
        }
        dispatch(types.COMPANY_PRODUCT_DETAIL, detail);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getRetiveCompany = ({ dispatch }, param) => { //根据产品名称获取公司
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?page=' + param.cur + '&pageSize=15';
    if (param.name) {
        url += '&name=' + param.name;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        dispatch(types.RELATIVE_COMPANY_DATA, obj);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getCompanyLicense = ({ dispatch }, param) => { //企业证书
    param.loading = true;
    var url = apiUrl.clientList + '/company/licenses?page=' + param.cur + '&pageSize=15';
    if (param.name) {
        url += "&name=" + param.name;
    }
    if (param.number !== "") {
        url += "&number=" + param.number;
    }
    if (param.companyName) {
        url += "&companyName=" + param.companyName;
    }
    if (param.productName !== "") {
        url += "&productName=" + param.productName;
    }
    if (param.releaseDateStart !== "") {
        url += "&releaseDateStart=" + param.releaseDateStart;
    }
    if (param.releaseDateEnd !== "") {
        url += "&releaseDateEnd=" + param.releaseDateEnd;
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        dispatch(types.COMPANY_LICENSE_DATA, obj);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getComponentData = ({ dispatch }, param) => { //成分
    param.loading = true;
    if (!param.name) {
        param.name = '';
    }

    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/recipe/' + '?page=' + param.cur + '&pageSize=15&recipeName=' + param.name,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var aa = res.json().result.list;
        dispatch(types.SERVICE_COMPONENT, aa);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
};
export const getRecipeDetail = ({ dispatch }, param) => { //获取成分详情
    if (param.loading) {
        param.loading = true;
    }
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/recipe/company/?id=' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        if (param.loading) {
            param.loading = false;
        }
        var obj = res.json().result;
        var arr = obj.list;
        obj.list = {};
        obj.list.show = false;
        obj.list.arr = arr;
        /* for (var i in obj.list) {
             obj.list[i].show = false;
         }*/

        dispatch(types.DRUG_DETAIL_DATA, obj.list);
    }, (res) => {
        if (param.loading) {
            param.loading = false;
        }
        console.log('fail');
    });
}

export const getDrawData = ({ dispatch }, param) => { //提取物以及搜索
    param.loading = true;
    var url = apiUrl.drawList + '/' + '?page=' + param.cur + '&pageSize=15';
    for (var ext in param) {
        if (ext == 'name' && param[ext] !== '') {
            url += '&extractiveName=' + param.name
        }
        if (ext == 'company' && param[ext] !== '') {
            url += '&companyName=' + param.company
        }
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true
    }).then((res) => {
        var dd = res.json().result.list;
        dispatch(types.SERVICE_DRAW, dd);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getBreedData = ({ dispatch }, param) => { //药材
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.breedList + '/' + '?page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var breed = res.json().result.list;
        for (var i in breed) {
            breed[i].show = false;
            breed[i].checked = false;
        }
        dispatch(types.BREED_DATA, breed);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getBreedDetail = ({ dispatch }, param) => { //获取药材详情(根据ID或者根据name)
    var url = apiUrl.breedList;
    if (param.id) {
        url += "/details/" + param.id;
    } else if (param.name) {
        url += "/detailByName/" + param.name;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        param.loading = false;
        var breed = res.json().result;
        if (breed === null) {
            param.show = false;
            param.callback("品种不存在");
            return;
        }
        var arr = breed.specs;
        breed.specs = {
            arr: arr,
            show: true
        };
        for (var i in breed.specs.arr) {
            breed.specs.arr[i].show = false;
        }
        var arr = breed.locals;
        breed.locals = {
            arr: arr,
            show: true
        };
        for (var j in breed.locals.arr) {
            breed.locals.arr[j].show = false;
        }
        var arr = breed.alias;
        breed.alias = {
            arr: arr,
            show: true
        };
        for (var j in breed.alias.arr) {
            breed.alias.arr[j].show = false;
        }
        var arr = breed.units;
        breed.units = {
            arr: arr,
            show: true
        };
        for (var j in breed.units.arr) {
            breed.units.arr[j].show = false;
        }
        dispatch(types.BREED_DETAIL_DATA, breed);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}

export const getBreedNameSearch = ({ dispatch }, param) => { //药材搜索
    param.loading = true;
    var breedUrl = apiUrl.breedList + '/' + '?&page=' + param.cur + '&pageSize=15';
    if (param.categoryId) {
        breedUrl += '&category=' + param.categoryId;
    }
    if (param.name) {
        breedUrl += '&breedName=' + param.name;
    }
    if (param.eName) {
        breedUrl += '&eName=' + param.eName;
    }
    if (param.lName) {
        breedUrl += '&lName=' + param.lName;
    }
    Vue.http({
        method: 'GET',
        url: breedUrl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var breed = res.json().result.list;
        for (var i in breed) {
            breed[i].show = false;
            breed[i].checked = false;
        }
        dispatch(types.BREED_DATA, breed);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
};
export const getCategoryData = ({ dispatch }, param) => { // 获取品种信息
    Vue.http({
        method: 'GET',
        url: apiUrl.categoryList,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var cInfo = res.json().result;
        dispatch(types.CATEGORY_DATA, cInfo);
    }, (res) => {
        console.log('fail');
    });
}

export const saveBreed = ({ dispatch }, data) => { //新增药材信息

    const data1 = {
        categoryId: data.categoryId,
        name: data.name,
        pinyin: data.pinyin,
        eName: data.eName,
        lName: data.lName,
        icon: data.icon,
        url: data.url
    }

    Vue.http({
        method: "POST",
        url: apiUrl.breedList + '/',
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        data.id = res.json().result.id;
        data.code = res.json().result.code;
        data.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.ADD_BREED_DATA, data);
        }

    }, (res) => {
        console.log('fail');
    });
}

export const createSpec = ({ dispatch }, param, id) => { //新增药材相关
    const data1 = {
        locationId: param.province.id,
        breedId: id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.breedList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.id = res.json().result.id;
        param.breedId = id;
        if (res.json().code == 200) {
            dispatch(types.ADDSPEC_DATA, param);
        }

        name = '';
    }, (res) => {
        console.log('fail');
    })
}

export const saveAlias = ({ dispatch }, param, id) => { //新增药材别名
    const data1 = {
        alias: param.name,
        breedId: id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.breedList + '/alias/',
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.id = res.json().result.id;
        param.breedId = id;
        dispatch(types.ADDSPEC_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const updateBreedInfo = ({ dispatch }, param) => { //修改药材信息
    const updatedata = {
        code: param.code,
        name: param.name,
        categoryId: param.categoryId,
        eName: param.eName,
        lName: param.lName,
        pinyin: param.pinyin,
        id: param.id,
        icon: param.icon
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.breedList + '/',
        emulateHTTP: false,
        params: param.id,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        if (res.json().code == 200) {
            dispatch(types.UPDATE_BREED_DATA, param);
        }

    }, (res) => {
        console.log('fail');
    })
}
export const alterSpec = ({ dispatch }, param) => { //修改药材相关
    const alterdata = {
        name: param.name,
        id: param.id,
        breedId: param.breedId
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.breedList + param.url,
        emulateHTTP: false,
        body: alterdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_SPEC_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterAlias = ({ dispatch }, param) => { //修改药材别名
    const alterdata = {
        alias: param.name,
        id: param.id,
        breedId: param.breedId
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.breedList + param.url,
        emulateHTTP: false,
        body: alterdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_SPEC_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const specDel = ({ dispatch }, param) => { //删除药材相关信息
    Vue.http({
        method: 'DELETE',
        url: apiUrl.clientList + param.url + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.url == '/org/') {
            param.callback(res.json().msg)
        } else if (param.url == '/sys/menu/') {
            param.callback(res.json().msg)
        } else {
            dispatch(types.DELETE_SPECS_DATA, param);
        }

    }, (res) => {
        console.log('fail');
    });
}

export const getClientList = ({ dispatch }, param) => { //客户信息列表与搜索
    param.loading = true;
    var clienturl = apiUrl.clientList + param.link + '?&page=' + param.cur;
    if (param.pageSize) {
        clienturl += '&pageSize=' + param.pageSize;
    } else {
        clienturl += '&pageSize=15';
    }
    for (var search in param) {
        if (search == 'name' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&name=' + param.name
        }
        if (search == 'id' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&id=' + param.id
        }
        if (search == 'type' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&type=' + param.type
        }
        if (search == 'classify' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&classify=' + param.classify
        }
        if (search == 'phone' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&phone=' + param.phone
        }
        if (search == 'employeeId' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&employeeId=' + param.employeeId
        }
        if (search == 'employeeIds' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&employeeIds=' + param.employeeIds
        }
        if (search == 'bizScope' && param[search] != '' && param[search] != 'undefined') {
            clienturl += '&bizScope=' + param.bizScope
        }
        if (search == 'province' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&province=' + param.province
        }
        if (search == 'creditLevel' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&creditLevel=' + param.creditLevel
        }
        if (search == 'city' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&city=' + param.city
        }
        if (search == 'blacklist' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&blacklist=' + param.blacklist
        }

        if (search == 'label' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&label=' + param.label
        }
        if (search == 'phoneCityName' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&phoneCity=' + param.phoneCityName
        }
        if (search == 'phoneProvinceName' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&phoneProvince=' + param.phoneProvinceName
        }
        if (search == 'ctimeStart' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&ctimeStart=' + param.ctimeStart
        }
        if (search == 'ctimeEnd' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&ctimeEnd=' + param.ctimeEnd
        }
        if (search == 'audit' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&audit=' + param.audit
        }
        if (search == 'trackingDay' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&trackingDay=' + param.trackingDay
        }
        if (search == 'orderSum' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&orderSum=' + param.orderSum
        }
        if (search == 'orgId' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&orgId=' + param.orgId
        }
    }
    Vue.http({
        method: 'GET',
        url: clienturl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var client = res.json().result.list;
        for (var i in client) {
            client[i].checked = false;
            client[i].show = false;
        }
        client.key = param.key;
        dispatch(types.CUSTOMER_DATA, client)
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        if (param.link == "/customer/employeeDistributed") {
            localStorage.myClientParam = JSON.stringify(param);
        }
        if (param.link == "/customer/orgDistributed") {
            localStorage.orgClientParam = JSON.stringify(param);
        }
        if (param.link == "/customer/" && !param.blacklist) {
            localStorage.allClientParam = JSON.stringify(param);
        }
        if (param.link == "/customer/" && param.blacklist) {
            localStorage.blackClientParam = JSON.stringify(param);
        }
        if (param.link == "/customer/undistributed") {
            localStorage.unClientParam = JSON.stringify(param);
        }
        if (param.link == "/customer/suppliers") {
            localStorage.supplyClientParam = JSON.stringify(param);
        }
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getCallRecordList = ({ dispatch }, param) => { //客户通话记录列表与搜索
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    for (var search in param) {
        if (search == 'customerPhone' && param[search] !== '') {
            url += '&customerPhone=' + param.customerPhone
        }
        if (search == 'seat' && param[search] !== '') {
            url += '&seat=' + param.seat
        }
        if (search == 'employeeNo' && param[search] !== '') {
            url += '&employeeNo=' + param.employeeNo
        }
        if (search == 'startTime' && param[search] !== '') {
            url += '&startTime=' + param.startTime
        }
        if (search == 'endTime' && param[search] !== '') {
            url += '&endTime=' + param.endTime
        }
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var callRecord = res.json().result.list;

        dispatch(types.CALL_RECORD_DATA, callRecord);

        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.callRecordParam = JSON.stringify(param);


    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getCallRecordVoice = ({ dispatch }, param) => { //获取录音
    const data = {
        id: param.id,
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + '/callRecord/getVoice',
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        param.refile = res.json().result;
        dispatch(types.CALL_RECORD_VOICE_DATA, param);

    }, (res) => {
        console.log('fail');
    })
}

export const getCallCountList = ({ dispatch }, param) => { //客户通话记录统计列表与搜索
    param.loading = true;
    var url = apiUrl.clientList + param.link;
    if (param.date) {
        url += "?date=" + param.date;
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var callCount = res.json().result;

        dispatch(types.CALL_COUNT_DATA, callCount);

        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.callCountParam = JSON.stringify(param);


    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getUserTypeList = ({ dispatch }, param) => { //客户类型
    param.loading = true;

    var clienturl = apiUrl.clientList + '/sys/enum/userType';
    Vue.http({
        method: 'GET',
        url: clienturl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var product = res.json().result;
        dispatch(types.USER_TYPE, product)
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getProductList = ({ dispatch }, param) => { //供应商产品列表
    param.loading = true;

    var clienturl = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    if (param.name) {
        clienturl = clienturl + '&name=' + param.name;
    }
    if (param.employeeId) {
        clienturl = clienturl + '&employeeId=' + param.employeeId;
    }
    if (param.cid) {
        clienturl = clienturl + '&cid=' + param.cid;
    }
    if (param.description) {
        clienturl = clienturl + '&description=' + param.description;
    }
    if (param.type) {
        clienturl = clienturl + '&type=' + param.type;
    }
    if (param.status) {
        clienturl = clienturl + '&status=' + param.status;
    }
    if (param.cName) {
        clienturl = clienturl + '&cName=' + param.cName;
    }
    if (param.breedId) {
        clienturl = clienturl + '&breedId=' + param.breedId;
    }

    Vue.http({
        method: 'GET',
        url: clienturl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var product = res.json().result.list;
        for (var i in product) {
            product[i].show = false;
            product[i].checked = false;
        }
        dispatch(types.PRODUCT_DATA, product)
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
        if (param.link == '/customer/product') {
            localStorage.productParam = JSON.stringify(param);
        }
        if (param.link == '/customer/product/file') {
            localStorage.productFileParam = JSON.stringify(param);
        }

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getProductDetail = ({ dispatch }, param) => { //获取供应商产品详情
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/customer/product/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        param.loading = false;
        var product = res.json().result;
        var arr = product.filesList;
        product.filesList = {
            arr: arr,
            show: true
        };
        for (var i in product.filesList.arr) {
            product.filesList.arr[i].show = false;
        }
        dispatch(types.PRODUCT_DETAIL_DATA, product);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getMyClientList = ({ dispatch }, param) => { //业务员的(我的)客户信息列表与搜索
    param.loading = true;
    var clienturl = apiUrl.clientList + '/customer/employeeDistributed?' + '&page=' + param.cur + '&pageSize=15';
    for (var search in param) {
        if (search == 'name' && param[search] !== '') {
            clienturl += '&name=' + param.name
        }
        if (search == 'type' && param[search] !== '') {
            clienturl += '&type=' + param.type
        }
        if (search == 'classify' && param[search] !== '') {
            clienturl += '&classify=' + param.classify
        }
        if (search == 'status' && param[search] !== '') {
            clienturl += '&status=' + param.status
        }
        if (search == 'phone' && param[search] !== '') {
            clienturl += '&phone=' + param.phone
        }
        if (search == 'employeeId' && param[search] !== '') {
            clienturl += '&employeeId=' + param.employeeId
        }
        if (search == 'bizScope' && param[search] !== '') {
            clienturl += '&bizScope=' + param.bizScope
        }
        if (search == 'province' && param[search] !== '') {
            clienturl += '&province=' + param.province
        }
        if (search == 'city' && param[search] !== '' && param[search] !== undefined) {
            clienturl += '&city=' + param.city
        }

    }
    Vue.http({
        method: 'GET',
        url: clienturl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var client = res.json().result.list;
        for (var i in client) {
            client[i].checked = false;
            client[i].show = false;
        }
        dispatch(types.CUSTOMER_DATA, client);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getOrgClientList = ({ dispatch }, param) => { //部门客户信息列表与搜索
    param.loading = true;
    var clienturl = apiUrl.clientList + '/customer/orgDistributed?' + '&page=' + param.cur + '&pageSize=15';
    for (var search in param) {
        if (search == 'name' && param[search] !== '') {
            clienturl += '&name=' + param.name
        }
        if (search == 'type' && param[search] !== '') {
            clienturl += '&type=' + param.type
        }
        if (search == 'classify' && param[search] !== '') {
            clienturl += '&classify=' + param.classify
        }
        if (search == 'status' && param[search] !== '') {
            clienturl += '&status=' + param.status
        }
        if (search == 'phone' && param[search] !== '') {
            clienturl += '&phone=' + param.phone
        }
        if (search == 'employeeId' && param[search] !== '') {
            clienturl += '&employeeId=' + param.employeeId
        }
        if (search == 'bizScope' && param[search] !== '') {
            clienturl += '&bizScope=' + param.bizScope
        }
        if (search == 'province' && param[search] !== '') {
            clienturl += '&province=' + param.province
        }
        if (search == 'city' && param[search] !== '' && param[search] !== undefined) {
            clienturl += '&city=' + param.city
        }

    }
    Vue.http({
        method: 'GET',
        url: clienturl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var client = res.json().result.list;
        for (var i in client) {
            client[i].checked = false;
            client[i].show = false;
        }
        dispatch(types.CUSTOMER_DATA, client);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const customerAudit = ({ dispatch }, param) => { //客户审核(跟进)
    const data = {
        customerIds: param.ids,
        audit: param.audit,
        auditComment: param.auditComment
    };
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        if (param.callback) {
            param.callback(res.json().msg);
        }
    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}
export const customerTransferBlacklist = ({ dispatch }, param) => { //客户转供应商,移出供应商,拉黑,移出黑名单
    param.loading = true;
    const data = {};
    if (param.link == '/customer/transferBlacklist') {
        data.blackComments = param.comments;
        data.customerIds = param.customerIds;
        data.blacklist = param.blacklist;
    } else if (param.link == '/customer/setSupplier') {
        data.customerIds = param.customerIds;
        if (!param.supplier && param.supplier !== 0) {
            data.supplier = 1;
        } else {
            data.supplier = param.supplier;
        }
        data.comments = param.comments;
    }


    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        if (param.link == '/customer/transferBlacklist') { dispatch(types.CUSTOMER_BATCH_DELETE, param); }
        if (param.link == '/customer/setSupplier') { dispatch(types.CUSTOMER_BATCH_SUPPLIER, param); }
        if (param.callback) {
            param.callback(res.json().msg);
        }
    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}

export const evaluateInquire = ({ dispatch }, param) => { //国际询价评价
        const data = {};
        //订单评价
        if (param.page == 1) {
            data.orderGoodsIds = param.ids;
            data.orderId = param.orderId;
        } else { //国际询价
            data.intentionId = param.intentionId;
            data.ids = param.ids;
        }
        data.evaluation = param.comments;


        Vue.http({
            method: "POST",
            url: apiUrl.clientList + param.link,
            emulateHTTP: true,
            body: data,
            emulateJSON: false,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then((res) => {
            if (param.callback) {
                param.callback(res.json().msg);
            }
            console.log(res)
        }, (res) => {

            console.log('fail');
        });
    }
    //确认评价
export const confirmEvaluation = ({ dispatch }, param) => {
    const data = {};
    data.id = param.id;
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        console.log(res)
    }, (res) => {

        console.log('fail');
    });
}


    //国际报价 报价申请
export const applyQuotedPrice = ({ dispatch }, param) => {
    const data = {};
    data.id = param.id;
    data.offerType=param.type;
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        console.log(res)
    }, (res) => {

        console.log('fail');
    });
}


export const getEmployeeList = ({ dispatch }, param) => { //员工列表以及搜索
    param.loading = true;
    var apiurl = apiUrl.clientList + '/employee/?' + '&page=' + param.cur + '&pageSize=12';
    /*var apiurl = apiUrl.employeeList+'/?'+'&page=' + param.cur + '&pageSize=14';*/
    for (var seach in param) {
        if (seach == 'name' && param[seach] !== '') {
            apiurl += '&name=' + param.name
        }
        if (seach == 'mobile' && param[seach] !== '') {
            apiurl += '&phone=' + param.mobile
        }
        // if (seach == 'orgCode' && param[seach] !== '') {
        //     apiurl += '&orgCode=' + param.orgCode
        // }
        if (seach == 'orgId' && param[seach] !== '') {
            apiurl += '&org=' + param.orgId
        }
        if (seach == 'leave' && param[seach] !== '') {
            apiurl += '&leave=' + param.leave
        }
    }
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var employ = res.json().result.list;
        for (var i in employ) {
            employ[i].show = false;
            employ[i].checked = false;
        }
        dispatch(types.EMPLOYEE_DATA, employ);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
        localStorage.employeeParam = JSON.stringify(param);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getEmployeeDetail = ({ dispatch }, param) => { //员工列表以及搜索
    param.loading = true;
    var apiurl = apiUrl.clientList + '/employee/' + param.id;
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var employ = res.json().result;
        dispatch(types.EMPLOYEE_DETAIL, employ);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getOrgList = ({ dispatch }, param) => { //部门列表
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/org/',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var org = res.json().result;
        var arr = [];

        function getLeaf(tree, arr) { //获取树的叶子节点
            if (tree.lowerList.length == 0) {
                arr.push(tree);

            } else {
                for (var i = 0; i < tree.lowerList.length; i++) {
                    getLeaf(tree.lowerList[i], arr);
                }
            }
        }
        getLeaf(org[0], arr);

        if ('list' in param && param.list == true) {
            dispatch(types.ORG_DATA, arr);
        } else {
            dispatch(types.ORG_DATA, org);
        }

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getOrgDetail = ({ dispatch }, param) => { //部门详情页面
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/org/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orgDetail = res.json().result;
        dispatch(types.ORG_DETAIL, orgDetail);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const createOrg = ({ dispatch }, data) => { //新增部门信息
    const Cdata = {
        'name': data.name,
        'pid': data.pid,
        'bizType': data.bizType
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + '/org/',
        emulateHTTP: true,
        body: Cdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (data.callback) {
            data.callback(res.json().msg);
        }
        if (res.json().code == 200) {
            dispatch(types.ORG_DATA, data);
        }
    }, (res) => {
        console.log('fail');
    })
}
export const alterOrg = ({ dispatch }, param) => { //修改部门信息
    var data = {
        name: param.name,
        code: param.code,
        status: param.status,
        id: param.id,
        pid: param.pid,
        level: param.level,
        bizType: param.bizType,
        responsibleProvinceId: param.responsibleProvinceId
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + '/org/',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        dispatch(types.ORG_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const getRoleList = ({ dispatch }, param) => { //获取角色列表
    param.loading = true;
    if ('pageSize' in param) {
        var pageSize = param.pageSize;
    } else {
        var pageSize = 15;
    }
    var clienturl = apiUrl.clientList + '/sys/role/' + '?&page=' + param.cur + '&pageSize=' + pageSize;
    Vue.http({
        method: 'GET',
        url: clienturl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var role = res.json().result.list;
        for (var i = 0; i < role.length; i++) {
            role[i].checked = false;
            for (var j = 0; j < param.roles.length; j++) {
                if (role[i].id == param.roles[j]) {
                    role[i].checked = true;
                }
            }
        }
        dispatch(types.ROLE_DATA, role)
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const saveCreate = ({ dispatch }, data, tipsParam) => { //新增客户列表
    const Cdata = {
        "name": data.name,
        "type": data.type,
        "tel": data.tel,
        "scale": data.scale,
        "nature": data.nature,
        "advance": data.advance,
        "capitalReturnDays": data.capitalReturnDays,
        "typeDesc": data.typeDesc,
        "classify": data.classify,
        "email": data.email,
        "userId": data.userId,
        "companyId": data.companyId,
        "number": data.number,
        "category": data.category,
        "principal": data.principal,
        "legalPerson": data.legalPerson,
        "bizScope": data.bizScope,
        "province": data.province,
        "address": data.address,
        "comments": data.comments,
        "contacts": data.contacts,
        "legalPerson": data.legalPerson,
        "principal": data.principal,
        "bizScope": data.bizScope,
        "website": data.website,
        "orgId": data.orgId,
        "employeeId": data.employeeId,
        "country": data.country,
        "creditLevel": data.creditLevel
    }
    if (data.supplier == 1) {
        Cdata.supplier = data.supplier;
    }
    if (data.city) {
        Cdata.city = data.city;
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + '/customer/',
        emulateHTTP: true,
        body: Cdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (data.callback) {
            data.callback(res.json().msg);
        }
        if (data.freshCallback) {
            data.freshCallback()
        }
        if (res.json().msg == 'success') {
            data.transStatus = 1;
            data.id = res.json().result.customerId;
            data.mainPhone = data.contacts[0].phone;
            data.phoneProvince = res.json().result.phoneProvince;
            data.phoneCity = res.json().result.phoneCity;
            data.ctime = new Date();
            data.orderTotal = 0;
            data.mainContact = data.contacts[0].name;
            data.mainPosition = data.contacts[0].position;
        }
        if ('show' in tipsParam) {
            tipsParam.show = true;
        }
        if (res.json().code == 200) {
            dispatch(types.CUSTOMER_ADD_DATA, data);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const importCustomer = ({ dispatch }, param) => { //excel导入客户
    param.loading = true;
    let data = new FormData();
    data.append("country", param.country);
    data.append("type", param.type);
    data.append("mFile", param.mFile);
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + '/customer/importByExcel',
        emulateJSON: false,
        emulateHTTP: false,
        body: data
    }).then((res) => {
        if (res.json().code == 200) {
            param.success = true;
            param.result = res.json().result;
        }
        param.loading = false;
    }, (res) => {
        console.log('fail');
    })
}

export const deleteInfo = ({ dispatch }, param) => { //删除客户、药材信息
    Vue.http({
        method: 'DELETE',
        url: apiUrl.clientList + param.url + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.DELETE_BREED_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}
export const alterInfo = ({ dispatch }, param) => { //修改客户信息
    var data = {
        name: param.name,
        type: param.type,
        category: param.category,
        typeDesc: param.typeDesc,
        scale: param.scale,
        nature: param.nature,
        advance: param.advance,
        capitalReturnDays: param.capitalReturnDays,
        classifyDesc: param.classify,
        classify: param.classify,
        principal: param.principal,
        legalPerson: param.legalPerson,
        bizScope: param.bizScope,
        mainPhone: param.mainPhone,
        email: param.email,
        province: param.province,
        country: param.country,
        address: param.address,
        number: param.number,
        website: param.website,
        comments: param.comments,
        tel: param.tel,
        id: param.id,
        orgId: param.orgId,
        employeeId: param.employeeId,
        creditLevel: param.creditLevel,
        countryName: param.countryName,
        provinceName: param.provinceName
    }
    if (param.supplier) {
        data.supplier = param.supplier;
    }
    if (param.country) {
        data.country = param.country;
    } else {
        data.country = -1;
    }
    if (param.province) {
        data.province = param.province;
    } else {
        data.province = -1;
    }
    if (param.city) {
        data.city = param.city;
    } else {
        data.city = -1;
    }
    if (param.cityName) {
        data.cityName = param.cityName;
    }
    if (param.tracking) {
        data = '';
        data = {
            id: param.id,
            audit: param.audit,
            auditComment: param.auditComment
        };
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + '/customer/',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }

        param.phoneProvince = res.json().result.phoneProvince;
        param.phoneCity = res.json().result.phoneCity;
        param.cityName = res.json().result.cityName;
        param.countryName = res.json().result.countryName;
        param.provinceName = res.json().result.provinceName;
        dispatch(types.CUSTOMER_UPDATE_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const updateContact = ({ dispatch }, param) => { //修改客户联系人
    const updatedata = {
        id: param.id,
        name: param.name,
        position: param.position,
        department: param.department,
        phone: param.phone,
        tel: param.tel,
        email: param.email,
        qq: param.qq,
        wechart: param.wechart,
        main: param.main
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        params: param.id,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_CUSTOMER_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}

//获取客户地址
export const getAddrInfo = ({ dispatch }, param) => {
    param.loading = true;
    var url = apiUrl.clientList + param.link + param.customerId;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var addressList = res.json().result;
        dispatch(types.ADDRESS_TABLE, addressList);

        param.loading = false;
        //localStorage.BacklogParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}


export const addrInfo = ({ dispatch }, param) => { //修改客户地址

    const updatedata = {
        type: param.type,
        contactName: param.contactName,
        contactPhone: param.contactPhone,
        sex: param.sex,
        country: param.country,
        province: param.province,
        city: param.city,
        district: param.district,
        detailAddr: param.detailAddr,
        address: param.address,
        id: param.id,
        customerId: param.customerId,
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.url + '/',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        if (param.callback) {
            param.callback(res.json().msg);
        }
        dispatch(types.UPDATE_ADDR_DETAIL, param);
    }, (res) => {
        param.show = false;
        console.log('fail');
    })
}
export const alterRemark = ({ dispatch }, param) => { //修改客户备注
    const updatedata = {
        id: param.id
    }
    for (var key in param) {
        if (key == 'remark' && param[key] != '') {
            updatedata.remark = param[key];
        }
        if (key == 'description' && param[key] != '') {
            updatedata.description = param[key];
        }
        if (key == 'customerId' && param[key] != '') {
            updatedata.customerId = param[key];
        }
        if (key == 'status' && param[key] != '') {
            updatedata.status = param[key];
        }
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_LABEL_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterLabel = ({ dispatch }, param) => { //修改客户标签
    const updatedata = {
        label: param.label,
        status: param.status,
        id: param.id,
        customerId: param.customerId
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_LABEL_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterProduct = ({ dispatch }, param) => { //修改客户产品
    const updatedata = {
        type: param.type,
        name: param.name,
        breedId: param.breedId,
        breedName: param.breedName,
        quality: param.quality,
        location: param.location,
        spec: param.spec,
        number: param.number,
        price: param.price,
        unit: param.unit,
        duedate: param.duedate,
        coa: param.coa,
        cid: param.cid,
        id: param.id
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const updateProduct = ({ dispatch }, param) => { //修改供应商产品
    const updatedata = {
        type: param.type,
        name: param.name,
        breedId: param.breedId,
        quality: param.quality,
        location: param.location,
        spec: param.spec,
        number: param.number,
        price: param.price,
        unit: param.unit,
        duedate: param.duedate,
        coa: param.coa,
        comments: param.comments,
        cid: param.cid,
        id: param.id
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        dispatch(types.ALTER_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}


export const getClientDetail = ({ dispatch }, param) => { //获取客户详情

    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/customer/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        param.loading = false;
        var con = res.json().result;

        var arr = con.contacts;
        con.contacts = null;
        con.contacts = {
            arr: arr,
            show: true
        };
        for (var i in con.contacts.arr) {
            con.contacts.arr[i].show = false;
        };

        var arr = con.addresses;
        con.addresses = null;
        con.addresses = {
            arr: arr,
            show: true
        };
        for (var j in con.addresses.arr) {
            con.addresses.arr[j].show = false;
        };

        var arr = con.files;
        con.files = null;
        con.files = {
            arr: arr,
            show: true
        };
        for (var j in con.files.arr) {
            con.files.arr[j].show = false;
        }

        var arr = con.labels;
        con.labels = null;
        con.labels = {
            arr: arr,
            show: true
        };
        for (var j in con.labels.arr) {
            con.labels.arr[j].show = false;
        }

        var arr = con.products;
        con.products = null;
        con.products = {
            arr: arr,
            show: true
        };
        for (var j in con.products.arr) {
            con.products.arr[j].show = false;
        }

        var arr = con.remarks;
        con.remarks = null;
        con.remarks = {
            arr: arr,
            show: true
        };
        for (var j in con.remarks.arr) {
            con.remarks.arr[j].show = false;
        }


        var arr = con.intentions;
        con.intentions = null;
        con.intentions = {
            arr: arr,
            show: true
        };
        for (var j in con.intentions.arr) {
            con.intentions.arr[j].show = false;
        }

        var arr = con.orders;
        con.orders = null;
        con.orders = {
            arr: arr,
            show: true
        };

        for (var j in con.orders.arr) {
            con.orders.arr[j].show = false;
        }

        var arr = con.trackings;
        con.trackings = null;
        con.trackings = {
            arr: arr,
            show: true
        };

        for (var j in con.trackings.arr) {
            con.trackings.arr[j].show = false;
        }

        /*if(con.orders.show&&con.intention.show){
            dispatch(types.CUSTOMER_DETAIL_DATA, con);
        }*/
        dispatch(types.CUSTOMER_DETAIL_DATA, con);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const getCustomerTransfer = ({ dispatch }, param, data) => { //客户详情里面划转记录
    var body = {
        customer: param.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + '/customer/queryCustomerTransfer',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        data.list = res.json().result;
        //param.id = res.json().result.id;
        //dispatch(types.CUSTOMER_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const createCustomer = ({ dispatch }, param) => { //新增客户相关联系人
    const data1 = {
        "name": param.name,
        "position": param.position,
        "department": param.department,
        "phone": param.phone,
        "tel": param.tel,
        "email": param.email,
        "qq": param.qq,
        "wechart": param.wechart,
        'main': Number(param.main),
        //"id":param.id,
        "customerId": param.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.id = res.json().result.id;
        dispatch(types.CUSTOMER_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createAddress = ({ dispatch }, param) => { //新增客户地址
    const data = {
        "type": param.type,
        "contactName": param.contactName,
        "contactPhone": param.contactPhone,
        "sex": param.sex,
        "country": param.country,
        "province": param.province,
        "city": param.city,
        "district": param.district,
        'detailAddr': param.detailAddr,
        "address": param.address,
        "customerId": param.customerId
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        param.id = res.json().result.id;
        if (param.callback) {
            param.callback(res.json().msg);
        }
        dispatch(types.ADD_ADDR_DETAIL, param);
    }, (res) => {
        param.show = false;
        console.log('fail');
    })
}
export const createLabel = ({ dispatch }, param) => { //新增客户标签
    const data = {
        "label": param.label,
        "status": param.status,
    }
    if (param.customerId) {
        data.customerId = param.customerId;
    }
    if (param.intentionId) {
        data.intentionId = param.intentionId;
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg)
        param.id = res.json().result.id;
        dispatch(types.ADD_LABEL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createRemark = ({ dispatch }, param) => { //新增客户备注
    const data1 = {
        "remark": param.remark,
        "status": param.status,
        "customerId": param.customerId,
        //"id":param.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg)
        param.id = res.json().result.id;
        dispatch(types.ADD_LABEL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createProduct = ({ dispatch }, param) => { //新增客户产品
    const data = {
        /*"type": param.type,*/
        "cType": param.cType,
        "name": param.breedName, //默认产品名就是品种名
        "breedId": param.breedId,
        /*"quality": param.quality,*/
        "location": param.location,
        "spec": param.spec,
        /*"number": param.number,
        "price": param.price,
        "unit": param.unit,
        "duedate": param.duedate,
        "coa": param.coa,*/
        "cid": param.cid,
        "breedName": param.breedName
    }

    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.id = res.json().result.id;
        dispatch(types.ADD_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const newProduct = ({ dispatch }, param) => { //新增供应商产品
    const data = {
        "type": param.type,
        "name": param.name,
        "breedId": param.breedId,
        "quality": param.quality,
        "location": param.location,
        "spec": param.spec,
        "number": param.number,
        "price": param.price,
        "unit": param.unit,
        "duedate": param.duedate,
        "coa": param.coa,
        "cid": param.cid
    }

    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.SUPPLY_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const addrDel = ({ dispatch }, param) => { //删除客户收货地址,客户标签,意向标签等
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.DELETE_SPECS_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const transferEmploy = ({ dispatch }, param) => { //客户业务员划转信息
    const transferdata = {
        employeeId: param.employeeId,
        orgId: param.orgId,
        customerIds: param.arr
    }
    console.log(transferdata);
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + '/customer/customersTransferEmployee',
        emulateHTTP: false,
        body: transferdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.CUSTOMER_TRANSFER, param);
    }, (res) => {
        console.log('fail');
    });
}
export const transferInfo = ({ dispatch }, param) => { //客户部门划转信息
    const transferdata = {
        orgId: param.orgId,
        customerIds: param.arr
    }
    if (param.employeeId) {
        transferdata.employeeId = param.employeeId;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + '/customer/customersTransferEmployee',
        emulateHTTP: false,
        body: transferdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.CUSTOMER_TRANSFER, param);
        param.callback(res.json().msg);
    }, (res) => {
        console.log('fail');
    });
}

export const transferOrg = ({ dispatch }, param) => { //员工部门划转信息

    const transferdata = {
        orgid: param.orgId,
        id: param.employeeId,
        transferCustomer: param.transferCustomer
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + '/employee/transferOrg',
        emulateHTTP: false,
        body: transferdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        /*dispatch(types.CUSTOMER_TRANSFER, param);*/
        param.callback(res.json().msg);
    }, (res) => {
        console.log('fail');
    });
}

export const transferManager = ({ dispatch }, param) => { //员工划转为主管
    const transferdata = {
        id: param.employeeId
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + '/employee/transferManager',
        emulateHTTP: false,
        body: transferdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        /*dispatch(types.CUSTOMER_TRANSFER, param);*/
        if (res.json().result) {
            param.callback(res.json().result);
        } else {
            param.callback("划转主管成功");
        }

    }, (res) => {
        console.log('fail');
    });
}

export const getPurchaseOrderList = ({ dispatch }, param) => { //采购单列表以及搜索
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    if (param.customerName) {
        url += '&customerName=' + param.customerName;
    }
    if (param.customerId) {
        url += '&customerId=' + param.customerId;
    }
    if (param.customerPhone) {
        url += '&customerPhone=' + param.customerPhone;
    }
    if (param.inquire) {
        url += '&inquire=' + param.inquire;
    }
    if (param.offer) {
        url += '&offer=' + param.offer;
    }
    if (param.source) {
        url += '&source=' + param.source;
    }
    if (param.employee) {
        url += '&employee=' + param.employee;
    }
    if (param.org) {
        url += '&org=' + param.org;
    }
    if (param.purchaseContent) {
        url += '&buyDesc=' + param.purchaseContent;
    }
    if (param.purchaseId) {
        url += '&id=' + param.purchaseId;
    }
    if (param.auditing) {
        url += '&indentValidate=' + param.auditing
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        let purchaseOrder = res.json().result.list;

        for (let i = 0; i < purchaseOrder.length; i++) {
            purchaseOrder[i].checked = false;
        }
        if (param.key) {
            purchaseOrder.key = param.key;
        }
        dispatch(types.PURCHASE_LIST_DATA, purchaseOrder);

        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
        if (param.auditing == '1') {
            param.auditNum = res.json().result.total
        }
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getWaitforAuditNumber = ({ dispatch }, param) => { //获取待审核数量
    var url = apiUrl.clientList + '/indent/queryList?&page=1&pageSize=15&indentValidate=1';
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        param.auditNum = res.json().result.total
    }, (res) => {
        console.log('提交失败')
    })
}

export const editDescription = ({ dispatch }, param) => { //编辑报价描述
    var url = apiUrl.clientList + "/intention/offerDescription"
    var body = {
        id: param.id,
        description: param.auditComment
    }
    Vue.http({
        method: 'POST',
        url: url,
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_OFFERDESCRIPTION, param)
    }, (res) => {
        console.log('提交失败')
    })
}


export const getPurchaseOrderDetail = ({ dispatch }, param) => { //采购单详情
    param.loading = true;
    var url = apiUrl.clientList + param.link + "?id=" + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        let detail = res.json().result;

        let intentionList = detail.intentionList;
        for (let i = 0; i < intentionList.length; i++) {
            intentionList[i].show = false; //是否处于展开状态
        }
        detail.intentionList = {};
        detail.intentionList.arr = intentionList;
        detail.intentionList.show = false;

        if (param.intentionList && param.intentionListBack) {
            let arr = detail.intentionList.arr;
            for (let i = 0; i < arr.length; i++) {
                let temp = {
                    id: arr[i].id,
                    breedId: arr[i].breedId,
                    breedName: arr[i].breedName,
                    location: arr[i].location,
                    spec: arr[i].spec,
                    number: arr[i].number,
                    unit: arr[i].unit,
                    price: arr[i].price,
                    status: 1,
                    description: arr[i].description,
                    quality: arr[i].quality,
                    mainStandard: arr[i].mainStandard,
                };
                param.intentionList.push(temp);
                param.intentionListBack.push(temp);
            }
        }
        dispatch(types.PURCHASE_DETAIL, detail);
        param.loading = false;

    }, (res) => {
        param.loading = false;
    })
}

export const createPurchaseOrder = ({ dispatch }, param) => { //新增采购单
    const body = {
        type: param.type,
        customerId: param.customerId,
        customerName: param.customerName,
        customerPhone: param.customerPhone,
        buyDesc: param.buyDesc,
        comment: param.comment,
        province: param.province,
        city: param.city,
        district: param.district,
        address: param.address,
        paymentWay: param.paymentWay,
        intentionList: param.intentionList,
        duedate: param.duedate
    }


    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        /*dispatch(types.CUSTOMER_TRANSFER, param);*/

        if (param.callback) {
            param.callback(res.json().msg);
        }
        if (param.nowCallback) {
            param.nowCallback()
        }
    }, (res) => {
        console.log('fail');
    });
}

export const importPurchase = ({ dispatch }, param) => { //excel导入采购单
    param.loading = true;
    let data = new FormData();
    data.append("mFile", param.mFile);
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + '/indent/importByExcel',
        emulateJSON: false,
        emulateHTTP: false,
        body: data
    }).then((res) => {

        if (res.json().code == 1000) {
            param.success = 2;
            param.result = res.json().result;
        } else if (res.json().code == 200) {
            param.success = 1;
            param.result = "";
        } else {
            param.success = 3;
            param.result = res.json().msg;
        }

        if (param.callback) {
            param.callback();
        }
        param.loading = false;
    }, (res) => {
        console.log('fail');
    })
}

export const modifyPurchaseOrder = ({ dispatch }, param) => { //修改采购单
    const body = {
        id: param.id,
        customerId: param.customerId,
        customerName: param.customerName,
        customerPhone: param.customerPhone,
        address: param.address,
        comment: param.comment,
        buyDesc: param.buyDesc,
        paymentWay: param.paymentWay,
        intentionList: param.intentionList,
        province: param.province,
        city: param.city,
        district: param.district,
        duedate: param.duedate
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        /*dispatch(types.CUSTOMER_TRANSFER, param);*/
        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        console.log('fail');
    });
}

export const deletePurchaseOrder = ({ dispatch }, param) => { //删除采购单
    const body = {
        id: param.id
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + "/indent/delete",
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().code == 200) {
            dispatch(types.DELETE_PURCHASE, param);
        }
        param.callback(res.json().msg);
    }, (res) => {
        console.log('fail');
    });
}

export const inquirePurchaseOrder = ({ dispatch }, param) => { //采购单询价或采购单取消询价(终止询价)
    console.log(param.ids)
    const body = {
        ids: param.ids
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (res.json().code == 200) {
            dispatch(types.INQUIRE_PURCHASE_STATUS, param);
        }

        param.callback(res.json().msg);
    }, (res) => {
        console.log('fail');
    });
}

export const offerPurchaseOrder = ({ dispatch }, param) => { //采购单意向报价
    const body = {
        intentionId: param.intentionId,
        customerId: param.customerId,
        number: param.number,
        unit: param.unit,
        price: param.price,
        quality: param.quality,
        description: param.description,
        location: param.location,
        spec: param.spec,
        images: param.images
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        console.log('fail');
    });
}

export const createOrderByPurchase = ({ dispatch }, param) => { //采购单报价生成订单
    param.loading = true;
    const body = {
        intl: 0,
        customer: param.customer,
        customerName: param.customerName,
        consignee: param.consignee,
        consigneeAddr: param.consigneeAddr,
        consigneePhone: param.consigneePhone,
        incidentals: param.incidentals,
        incidentalsDesc: param.incidentalsDesc,
        preferential: param.preferential,
        preferentialDesc: param.preferentialDesc,
        province: param.province,
        city: param.city,
        district: param.district,
        intentionOfferList: param.intentionOfferList
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        param.show = false;
        if (param.callback) {
            param.callback(res.json().msg);
        }


    }, (res) => {
        param.loading = false;
        console.log('fail');
        param.show = false;
    });
}

export const createOrderByStock = ({ dispatch }, param) => { //库存列表页面生成订单
    param.loading = true;
    const body = {
        intl: 0,
        customer: param.customer,
        customerName: param.customerName,
        consignee: param.consignee,
        consigneeAddr: param.consigneeAddr,
        consigneePhone: param.consigneePhone,
        incidentals: param.incidentals,
        incidentalsDesc: param.incidentalsDesc,
        preferential: param.preferential,
        preferentialDesc: param.preferentialDesc,
        province: param.province,
        city: param.city,
        district: param.district,
        stockList: param.stockCartList,
        orderStatus: param.orderStatus,
        sample: param.sample
    };
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/stock/addOrderByStock/',
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        param.show = false;
        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        param.loading = false;
        param.show = false
    })
}

export const getIntentionList = ({ dispatch }, param) => { //意向信息列表以及搜索
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    for (var search in param) {
        if (search == 'id' && param[search] !== '') {
            console.log(param.id)
            url += '&id=' + param.id
        }
        if (search == 'userName' && param[search] !== '') {
            url += '&userName=' + param.userName
        }
        if (search == 'userPhone' && param[search] !== '') {
            url += '&userPhone=' + param.userPhone
        }
        if (search == 'type' && param[search] !== '') {
            url += '&type=' + param.type
        }
        if (search == 'especial' && param[search] !== '') {
            url += '&especial=' + param.especial
        }
        if (search == 'preSell' && param[search] !== '') {
            url += '&preSell=' + param.preSell
        }
        if (search == 'invoic' && param[search] !== '') {
            url += '&invoic=' + param.invoic
        }
        if (search == 'validate' && param[search] !== '') {
            url += '&validate=' + param.validate
        }
        if (search == 'source' && param[search] !== '') {
            url += '&source=' + param.source
        }
        if (search == 'onSell' && param[search] !== '') {
            url += '&onSell=' + param.onSell
        }
        if (search == 'intl' && param[search] !== '') {
            url += '&intl=' + param.intl
        }
        if (search == 'sampling' && param[search] !== '') {
            url += '&sampling=' + param.sampling
        }
        if (search == 'visit' && param[search] !== '') {
            url += '&visit=' + param.visit
        }
        if (search == 'advance' && param[search] !== '') {
            url += '&advance=' + param.advance
        }
        if (search == 'breedId' && param[search] !== '') {
            url += '&breedId=' + param.breedId
        }
        if (search == 'customerName' && param[search] !== '') {
            url += '&customerName=' + param.customerName
        }
        if (search == 'customerId' && param[search] !== '') {
            url += '&customerId=' + param.customerId
        }
        if (search == 'location' && param[search] !== '') {
            url += '&location=' + param.location
        }
        if (search == 'customerPhone' && param[search] !== '') {
            url += '&customerPhone=' + param.customerPhone
        }
        if (search == 'label' && param[search] !== '') {
            url += '&label=' + param.label
        }

    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var intent = res.json().result.list;
        for (var i in intent) {
            intent[i].checked = false;
            intent[i].show = false;
        }
        intent.key = param.key;
        dispatch(types.INTENTION_LIST_DATA, intent);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        if (param.link == "/intention/user/list") {
            localStorage.userIntentionParam = JSON.stringify(param);
        }
        if (param.link == "/intention/employee/list") {
            localStorage.myIntentionParam = JSON.stringify(param);
        }
        if (param.link == "/intention/org/list") {
            localStorage.orgIntentionParam = JSON.stringify(param);
        }
        if (param.link == "/intention/resource/list") {
            localStorage.potentialIntentionParam = JSON.stringify(param);
        }
        if (param.link == "/intention/") {
            localStorage.allIntentionParam = JSON.stringify(param);
        }

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getSupplyDemandList = ({ dispatch }, param) => { //匹配供求信息(意向)
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?type=' + param.type + '&breedId=' + param.breedId;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var intent = res.json().result.list;
        dispatch(types.SUPPLY_DEMAND_DATA, intent);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getIntentionDetail = ({ dispatch }, param, extraParam) => { //意向详情
    param.loading = true;
    var url = apiUrl.clientList + '/intention/' + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var result = res.json().result;
        var arr = result.offers;
        result.offers = null;
        result.offers = {
            arr: arr,
            show: false
        };
        for (var i in result.offers.arr) {
            result.offers.arr[i].show = false;
            result.offers.arr[i].checked = false;
            if (param.offerId && param.offerId == result.offers.arr[i].id) {
                result.offers.arr[i].checked = true;
            }
        };
        var arr = result.msgs;
        result.msgs = null;
        result.msgs = {
            arr: arr,
            show: false
        };
        var arr = result.trackings;
        result.trackings = null;
        result.trackings = {
            arr: arr,
            show: false
        };
        for (var i in result.trackings.arr) {
            result.trackings.arr[i].show = false;
        };
        dispatch(types.INTENTION_DETAIL_DATA, result);
        if (param.init) {
            let pics = res.json().result.pics;
            let importQualityPics = res.json().result.importQualityPics;
            let testReportPics = res.json().result.testReportPics;
            param.init(pics, importQualityPics, testReportPics); //用于修改意向时相关参数的初始化
        }

        if (param.getOffers) {

            param.getOffers(param.index, result);
        }

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getOffersByIntentionId = ({ dispatch }, param) => { //根据意向ID获取报价
    param.loading = true;
    const body = {
        intentionId: param.id
    };
    if (param.querySource) {
        body.querySource = param.querySource
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/intention/offer/queryByIntentionId',
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var result = res.json().result;
        let list = result.list;

        for (let i = 0; i < list.length; i++) {
            list[i].show = false;
            list[i].checked = false;
            if (param.offerId && param.offerId == list[i].id) {
                list[i].checked = true;
            }
        }
        if (param.getOffers) {
            let intention = {
                id: param.id,
                offers: {
                    arr: result.list,
                    show: false
                }
            }
            dispatch(types.INTENTION_DETAIL_DATA, intention);
            param.getOffers(param.index, intention);

        }


    }, (res) => {
        param.loading = false;

    })
}

export const getOffersByIndentId = ({ dispatch }, param) => { //根据意向ID获取报价
    param.loading = true;
    let url = "/crm/api/v1" + param.link;
    const body = {
        indentId: param.id,
    };
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    if (param.offerEmployee) {
        body.offerEmployee = param.offerEmployee;
    }
    if (param.accept) {
        body.accept = param.accept;
    }
    if (param.querySource) {
        body.querySource = param.querySource;
    }
    if (param.source) {
        body.source = param.source
    }
    if (param.validate) {
        body.validate = param.validate
    }
    Vue.http({
        method: 'POST',
        url: url,
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var result = res.json().result;
        let list = result.list;
        list.key = param.key;
        list.forEach(function(item) {
            item.checked = false
        })
        dispatch(types.INDENT_OFFER_DATA, list);

    }, (res) => {
        param.loading = false;

    })
}

export const getIndentOffers = ({ dispatch }, param) => { //获取我收到的（全部的、采购单下）报价列表
    param.loading = true;
    let url = "/crm/api/v1" + param.link;
    const body = {
        page: param.cur,
        pageSize: 15
    };
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    if (param.offerEmployee) {
        body.offerEmployee = param.offerEmployee;
    }
    if (param.accept) {
        body.accept = param.accept;
    }
    if (param.onSell) {
        body.onSell = param.onSell;
    }
    if (param.startTime) {
        body.startTime = param.startTime;
    }
    if (param.endTime) {
        body.endTime = param.endTime;
    }
    if (param.effective) {
        body.effective = param.effective;
    }
    if (param.source) {
        body.source = param.source
    }
    if (param.buyCustomer) {
        body.buyCustomer = param.buyCustomer
    }
    if (param.buyEmployee) {
        body.buyEmployee = param.buyEmployee
    }
    if (param.validate) {
        body.validate = param.validate
    }
    Vue.http({
        method: 'POST',
        url: url,
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var result = res.json().result;
        let list = result.list;
        for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
        }
        param.total = result.total;
        param.all = result.pages;
        list.key = param.key;
        dispatch(types.INDENT_OFFER_DATA, list);

    }, (res) => {
        param.loading = false;

    })
}

export const getOfferDetail = ({ dispatch }, param) => { //报价详情
    param.loading = true;
    let url = "/crm/api/v1" + param.link + param.id;
    const body = {
        id: param.id
    };
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        param.loading = false;
        var result = res.json().result;
        dispatch(types.INTENTION_OFFER_DETAIL, result);
    }, (res) => {
        param.loading = false;

    })
}


export const handleOfferAccept = ({ dispatch }, param) => { //根据意向ID获取报价
    param.loading = true;
    const body = {
        id: param.id,
        comments: param.comments
    };
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    if (param.offerEmployee) {
        body.offerEmployee = param.offerEmployee;
    }
    if (param.accept) {
        body.accept = param.accept;
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/intention/offerAccept',
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        let result = res.json().result;
        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        param.loading = false;

    })
}

export const getOfferList = ({ dispatch }, param) => { //报价信息列表以及搜索
    //param.loading = true;
    let body = {
        biz_module: 'erpIntentionOfferService',

        biz_param: {
            page: param.cur,
            pageSize: 15,
        }
    }
    if (param.key == 'myOfferList') {
        body.biz_method = 'queryMySendOffer'
    } else if (param.key == 'orgOfferList') {
        body.biz_method = 'queryOrgSendOffer'
    }
    if (param.breedId) {
        body.biz_param.breedId = param.breedId;
    }
    if (param.offerEmployee) {
        body.biz_param.offerEmployee = param.offerEmployee;
    }
    if (param.accept) {
        body.biz_param.accept = param.accept;
    }
    if (param.onSell) {
        body.biz_param.onSell = param.onSell;
    }
    if (param.startTime) {
        body.biz_param.startTime = param.startTime;
    }
    if (param.endTime) {
        body.biz_param.endTime = param.endTime;
    }
    if (param.effective) {
        body.biz_param.effective = param.effective;
    }
    if (param.source) {
        body.biz_param.source = param.source
    }
    if (param.buyCustomer) {
        body.biz_param.buyCustomer = param.buyCustomer
    }
    if (param.buyEmployee) {
        body.biz_param.buyEmployee = param.buyEmployee
    }
    if (param.validate) {
        body.biz_param.validate = param.validate
    }
    if (param.offerCustomer) {
        body.biz_param.offerCustomer = param.offerCustomer
    }
    httpService.commonPOST(body)
        .then((res) => {
            var offer = res.biz_result.list;
            for (var i in offer) {
                offer[i].checked = false;
                offer[i].show = false;
            }
            offer.key = param.key;
            dispatch(types.OFFER_LIST_DATA, offer);
            param.all = res.biz_result.pages;
            param.total = res.biz_result.total;
            param.loading = false;
            if (param.link == "/intention/employee/offers") {
                localStorage.myOfferParam = JSON.stringify(param);
            }
            if (param.link == "/intention/org/offers") {
                localStorage.orgOfferParam = JSON.stringify(param);
            }
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
        /*var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
        if ('fullname' in param && param.fullname !== '') {
            url += '&fullname=' + param.fullname
        }
        if ('breedName' in param && param.breedName !== '') {
            url += '&breedName=' + param.breedName
        }
        if ('userPhone' in param && param.userPhone !== '') {
            url += '&userPhone=' + param.userPhone
        }
        if ('customerId' in param && param.customerId !== '') {
            url += '&customerId=' + param.customerId
        }
        if ('spec' in param && param.spec !== '') {
            url += '&spec=' + param.spec
        }
        if ('startTime' in param && param.startTime !== '') {
            url += '&startTime=' + param.startTime
        }
        if ('endTime' in param && param.endTime !== '') {
            url += '&endTime=' + param.endTime
        }*/
        /*Vue.http({
            method: 'GET',
            url: url,
            emulateJSON: true,
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then((res) => {
            var offer = res.json().result.list;
            for (var i in offer) {
                offer[i].checked = false;
                offer[i].show = false;
            }
            offer.key = param.key;
            dispatch(types.OFFER_LIST_DATA, offer);
            param.all = res.json().result.pages;
            param.total = res.json().result.total;
            param.loading = false;
            if (param.link == "/intention/employee/offers") {
                localStorage.myOfferParam = JSON.stringify(param);
            }
            if (param.link == "/intention/org/offers") {
                localStorage.orgOfferParam = JSON.stringify(param);
            }

        }, (res) => {
            console.log('fail');
            param.loading = false;
        })*/
}

export const getMsgList = ({ dispatch }, param) => { //留言信息列表以及搜索
    param.loading = true;
    var url = apiUrl.clientList + '/intention/msgs?' + '&page=' + param.cur + '&pageSize=15';
    if (param.fullName && param.fullName != '') {
        url += '&fullName=' + param.fullName
    }
    if (param.phone && param.phone != '') {
        url += '&phone=' + param.phone
    }
    if (param.type && param.type != '') {
        url += '&type=' + param.type
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var msg = res.json().result.list;
        for (var i in msg) {
            msg[i].checked = false;
            msg[i].show = false;
        }
        msg.key = param.key;
        dispatch(types.MSG_LIST_DATA, msg);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        if (param.key == "msgList") {
            localStorage.msgParam = JSON.stringify(param);
        }
        if (param.key == "preSellMsgList") {
            localStorage.preSellMsgParam = JSON.stringify(param);
        }

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}


export const updateMsg = ({ dispatch }, param) => { //修改留言信息

    var url = apiUrl.clientList + '/intention/msgs';
    const data = {
        id: param.id,
        comments: param.comments
    }
    Vue.http({
        method: 'PUT',
        url: url,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.utime = res.json().result.utime;
        dispatch(types.MSG_UPDATE_DATA, param);
        param.show = false;

    }, (res) => {
        console.log('fail');
        param.show = false;
    });
}

export const getIntlIntentionList = ({ dispatch }, param) => { //国际意向列表以及搜索
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    if (param.breedName !== '') {
        url += '&names=' + param.breedName;
    }
    if (param.customerId !== '') {
        url += '&customerId=' + param.customerId;
    }
    if (param.employeeName !== '') {
        url += '&employeeName=' + param.employeeName;
    }
    if (param.customerName !== '') {
        url += '&customerName=' + param.customerName;
    }
    if (param.customerEmail !== '') {
        url += '&customerEmail=' + param.customerEmail;
    }
    if (param.inquire !== '') {
        url += '&inquire=' + param.inquire;
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var intent = res.json().result.list;
        intent.key = param.key;
        dispatch(types.INTLINTENTION_LIST_DATA, intent);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        if (param.link == "/intlIntention/by/employee") {
            localStorage.myIntlIntentionParam = JSON.stringify(param);
        }
        if (param.link == "/intlIntention/") {
            localStorage.orgIntlIntentionParam = JSON.stringify(param);
        }

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getEmpIntlIntentionList = ({ dispatch }, param) => { //业务员国际意向列表以及搜索
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    if (param.breedName !== '') {
        url += '&names=' + param.breedName;
    }
    if (param.employee !== '') {
        url += '&employee=' + param.employee;
    }
    if (param.customerName !== '') {
        url += '&customerName=' + param.customerName;
    }
    if (param.customerEmail !== '') {
        url += '&customerEmail=' + param.customerEmail;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var intent = res.json().result.list;
        /*for (var i in intent){
             intent[i].checked = false;
             intent[i].show =false;
        }*/
        dispatch(types.INTLINTENTION_LIST_DATA, intent);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getIntlIntentionDetail = ({ dispatch }, param) => { //按ID查询国际意向详情
    param.loading = true;
    var url = apiUrl.clientList + '/intlIntention/' + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var intent = res.json().result;
        var itemsTotal = [];
        var offersTotal = [];
        var extractiveTotal = [];

        intent.offerStatus = intent.offerStatus ? JSON.parse(intent.offerStatus) : intent.offerStatus;
        for (var key in intent.itemsTotal) {
            let temp = {
                currency: key,
                total: intent.itemsTotal[key]
            }
            itemsTotal.unshift(temp);
        }
        intent.itemsTotal = itemsTotal;

        for (var key in intent.extractiveTotal) {
            let temp = {
                currency: key,
                total: intent.extractiveTotal[key]
            }
            extractiveTotal.unshift(temp);
        }
        intent.extractiveTotal = extractiveTotal;

        for (var key in intent.offersTotal) {
            let temp = {
                currency: key,
                total: intent.offersTotal[key]
            }
            offersTotal.unshift(temp);
        }
        intent.offersTotal = offersTotal;

        if (param.key == "myIntlIntentionList") { //意向列表编辑意向
            intent.items.forEach(function(item) {
                var temp = {
                    id: item.id,
                    breedId: item.breedId,
                    breedName: item.breedName,
                    qualification: item.qualification,
                    quality: item.quality,
                    location: item.location,
                    spec: item.spec,
                    number: item.number,
                    unit: item.unit,
                    pack: item.pack,
                    status: item.status,
                    type: item.type,
                    description: item.description
                }
                param.items.push(temp);
                param.itemsBack.push(temp);
            })
            param.pack = intent.pack;
            param.duedate = intent.duedate;
            dispatch(types.INTLINTENTION_DETAIL_DATA, intent);
        }

        if (param.key == "intentionDetail") { //意向详情页时

            var inquires = intent.inquires;
            intent.inquires = {};
            intent.inquires.arr = inquires;
            intent.inquires.show = false;

            var offers = intent.offers;
            var offersArr = [];
            for (var i = 0; i < intent.offers.length; i++) {
                intent.offers[i].checked = false;
                offersArr.push(intent.offers[i]);
            }

            intent.offers = {};
            intent.offers.arr = offersArr;
            intent.offers.show = false;
            //intent.offers.arr = offers;

            var files = intent.files;
            intent.files = {};
            intent.files.arr = files;
            intent.files.show = false;

            var offerFiles = intent.offerFiles;
            intent.offerFiles = {};
            intent.offerFiles.arr = offerFiles;
            intent.offerFiles.show = false;


            var extractiveArr = [];
            var itemsArr = [];

            for (var i = 0; i < intent.items.length; i++) {

                if (intent.items[i].type == 0) {
                    intent.items[i].checked = false;

                    itemsArr.push(intent.items[i]);
                    console.log("sdfgdsfds", itemsArr)

                } else if (intent.items[i].type == 1) {
                    intent.items[i].checked = false;
                    extractiveArr.push(intent.items[i]);
                }
            }

            intent.items = {};
            intent.items.arr = itemsArr;
            intent.items.show = false;
            intent.extractive = {};
            intent.extractive.arr = extractiveArr;
            intent.extractive.show = false;
            intent.extractive.selected = [];
            intent.items.selected = [];
            intent.offers.selected = [];
            dispatch(types.INTLINTENTION_DETAIL_DATA, intent);
        }
        if (param.key == 'orderList') { //意向详情生成订单
            /*param.goods = intent.items;*/
            param.total = 0;
            param.itemsTotal = 0;

            intent.items.forEach(function(item) {
                if (!item.costPrice) {
                    item.costPrice = 0;
                }
                var temp = {
                    breedId: item.breedId,
                    breedName: item.breedName,
                    title: item.title,
                    quality: item.quality,
                    location: item.location,
                    spec: item.spec,
                    number: item.number,
                    unit: item.unit,
                    price: item.price,
                    costPrice: item.costPrice,
                    sourceType: 1
                }


                param.itemsTotal += temp.number * temp.price * 100 / 100;

                param.goods.push(temp);
            })
            if (!param.incidentals) {
                param.incidentals = 0;
            }
            if (!param.preferential) {
                param.preferential = 0;
            }
            param.total = (param.itemsTotal * 1000 + parseFloat(param.incidentals) * 1000 - parseFloat(param.preferential) * 1000) / 1000
        }

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const intlIntentionConfirmOffer = ({ dispatch }, param) => { //确认报价放在意向详情中的各个分项中
    var url = apiUrl.clientList + param.link;
    var data = {
        'id': param.id,
        'offerType': param.offerType
    };
    Vue.http({
        method: "POST",
        url: url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);

    }, (res) => {
        console.log('fail');
    })
}

export const intlIntentionSaveLast = ({ dispatch }, param) => { //保留上次报价
    var url = apiUrl.clientList + param.link;
    var data = {
        'id': param.id,
    };
    Vue.http({
        method: "POST",
        url: url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);

    }, (res) => {
        console.log('fail');
    })
}

export const againIntentionInquire = ({ dispatch }, param) => { //再次询价申请
    const data = {
        id: param.id
    };
    var url = apiUrl.clientList + param.link;
    Vue.http({
        method: "POST",
        url: url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg)

    }, (res) => {
        console.log('fail');
    })

}

export const intInquiryPass = ({ dispatch }, param) => { //国际询价中的部门询价 再次询价申请审核是否通过
    const data = {
        id: param.id,
        validate: param.validate,
        description: param.description
    };
    var url = apiUrl.clientList + param.link;
    Vue.http({
        method: "POST",
        url: url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
    }, (res) => {
        console.log('fail');
    })
}

export const requestOuterOffer = ({ dispatch }, param) => { //国际意向条目寻求外部报价
    var url = apiUrl.clientList + param.link + "?id=" + param.id;
    const data = {};
    Vue.http({
        method: "POST",
        url: url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const getOuterOffer = ({ dispatch }, param) => { //查询国际意向条目的外部报价
    var url = apiUrl.clientList + param.link + "?id=" + param.id;
    const data = {};
    Vue.http({
        method: "POST",
        url: url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        let outerOfferList = res.json().result.intentionOfferList;
        if (res.json().code == 200) {
            dispatch(types.OUTER_OFFER_DATA, outerOfferList);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const createIntlIntention = ({ dispatch }, param) => { //新增国际意向
    const data = {
        customerId: param.customerId,
        customerName: param.customerName,
        customerPhone: param.customerPhone,
        customerEmail: param.customerEmail,
        country: param.country,
        province: param.province,
        //city: param.city,
        port: param.port,
        district: param.district,
        address: param.address,
        duedate: param.duedate,
        source: param.source,
        pack: param.pack,
        items: param.items
    }

    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        if (param.callback) {
            param.callback(res.json().msg);
        }
        if (param.freshCallback) {
            param.freshCallback()
        }
        var object = res.json().result;
        object.especial = 0;
        object.advance = 1;
        object.inquireTime = 0;
        object.offerTime = 0;
        object.validate = 0;
        object.inquire = 0;
        if (res.json().code == 200) {
            dispatch(types.ADD_INTLINTENTION_DATA, object);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const updateIntlIntention = ({ dispatch }, param, tipParam) => { //修改国际意向

    const data = {
        id: param.id,
        pack: param.pack,
        duedate: param.duedate,
        items: param.items
    };
    Vue.http({
        method: "PUT",
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.names = res.json().result.names;
        dispatch(types.UPDATA_INTLINTENTION_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const getIntlIntentionInquireList = ({ dispatch }, param) => { //国际意向询价列表
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    if (param.inquire !== '' && param.inquire !== undefined) {
        url += "&inquire=" + param.inquire;
    }
    if (param.breedId !== '') {
        url += '&breedId=' + param.breedId;
    }
    if (param.employeeName !== '') {
        url += '&employeeName=' + param.employeeName;
    }
    if (param.customerId !== '') {
        url += '&customerId=' + param.customerId;
    }
    if (param.customerName !== '') {
        url += '&customerName=' + param.customerName;
    }
    if (param.customerEmail !== '') {
        url += '&customerEmail=' + param.customerEmail;
    }
    if (param.country !== '') {
        url += '&country=' + param.country;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var inquire = res.json().result.list;
        dispatch(types.INTLINTENTION_INQUIRE_LIST_DATA, inquire);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.intlInquireParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getIntlIntentionInquireDetail = ({ dispatch }, param) => { //国际意向询价详情
    param.loading = true;
    var url = apiUrl.clientList + param.link + param.id;

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var inquire = res.json().result;
        dispatch(types.INTLINTENTION_INQUIRE_DETAIL_DATA, inquire);
        /*param.all = res.json().result.pages;
        param.total=res.json().result.total;*/
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getIntlItemHistory = ({ dispatch }, param) => { //国际意向条目历史记录
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?id=' + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var itemHistory = res.json().result;
        dispatch(types.ITEM_HISTORY_DATA, itemHistory);
        /*param.all = res.json().result.pages;
        param.total=res.json().result.total;*/
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const intlIntentionInquire = ({ dispatch }, param) => { //国际意向(再)询价
    const data = {
        intentionId: param.intentionId,
        inquireType: param.inquireType,
        comment: param.comment
    }
    if (param.port) {
        data.port = param.port;
    }
    if (param.postcode) {
        data.postcode = param.postcode;
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.cancleCallback) {
            param.cancleCallback(res.json().msg);
        }
        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.show = false;
        param.inquire = 1;
        param.inquireTime++;
        dispatch(types.INQUIRE_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const cancelIntlIntentionInquire = ({ dispatch }, param) => { //国际意向取消询价
    const data = {
        intentionId: param.id
    }

    Vue.http({
        method: "DELETE",
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        if (param.inquireTime <= 1) {
            param.inquire = 0;
            param.inquireType = '';
        } else {
            param.inquire = 3;
        }
        param.inquireTime = param.inquireTime - 1;
        dispatch(types.INQUIRE_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const intlIntentionItemInquire = ({ dispatch }, param) => { //国际意向条目再询价
    const data = {
        id: param.itemId,
        description: param.description
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        dispatch(types.ITEM_INQUIRE, param);
    }, (res) => {
        console.log('fail');
    })
}

export const intlIntentionOffer = ({ dispatch }, param) => { //国际意向原材料报价
    param.total = param.price * param.number;

    const data = {
        id: param.id,
        intentionId: param.intentionId,
        inquireId: param.inquireId,
        type: param.type,
        currency: param.currency,
        itemId: param.itemId,
        itemName: param.itemName,
        origPrice: param.origPrice,
        origCurrency: param.origCurrency,
        supplierName: param.supplierName,
        supplier: param.supplier,
        exchangeRate: param.exchangeRate,
        product: param.product,
        price: param.price,
        number: param.number,
        unit: param.unit,
        total: param.total,
        comment: param.comment,
        intentionOfferId: param.intentionOfferId
    }


    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        if (param.getIntentionDetail) {
            param.getIntentionDetail({
                id: param.intentionId,
                link: "/intlIntention/",
                key: "intentionDetail",
            });
        }
        if (res.json().code == 200) {

            dispatch(types.ORIGIN_OFFER_DATA, param);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const intlIntentionOtherOffer = ({ dispatch }, param) => { //国际意向其他报价(添加或修改)
    const data = {

        intentionId: param.intentionId,
        inquireId: param.inquireId,
        type: param.type,
        currency: param.currency,
        cost: param.cost,
        costDesc: param.costDesc,
        total: param.total,
        comment: param.comment
    }

    data.total = data.cost;
    if (param.id !== '') { //修改时param!==''
        data.id = param.id;
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        if (param.getIntentionDetail) {
            param.getIntentionDetail({
                id: param.intentionId,
                link: "/intlIntention/",
                key: "intentionDetail",
            });
        }
        param.id = res.json().result.id;
        if (res.json().code == 200) {
            //成功后total会改变
            dispatch(types.OTHER_OFFER_DATA, param);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const delIntlIntentionOtherOffer = ({ dispatch }, param) => { //删除国际意向其他报价

    const data = {
        id: param.id,
        type: param.type
    }
    Vue.http({
        method: "DELETE",
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.DEL_OTHER_OFFER, param);
    }, (res) => {
        console.log('fail');
    })
}

export const intlIntentionAffirmOffer = ({ dispatch }, param) => { //国际意向确认报价
    const data = {
        id: param.id,
        description: param.description

    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        if (res.json().code == 200) {
            dispatch(types.CONFIRM_OFFER, param);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const uploadIntlIntentionFiles = ({ dispatch }, param) => { //上传国际意向文件
    const data = {
        fileType: param.fileType,
        bizId: param.bizId,
        path: param.path,
        description: param.description,
        category: param.category
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.link,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.show = false;
        var file = res.json().result;
        param.url = res.json().result.url;
        if (res.json().code == 200) {
            dispatch(types.UPLOAD_INTL_INTENT_FILE, file);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const delIntlIntentionFiles = ({ dispatch }, param) => { //删除国际意向文件
    const data = {
        id: param.id
    }
    Vue.http({
        method: "DELETE",
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        var file = res.json().result;
        dispatch(types.DEL_INTL_INTENT_FILE, param);
    }, (res) => {
        console.log('fail');
    })
}

export const getUserList = ({ dispatch }, param) => { //会员信息列表
    param.loading = true;
    var url = apiUrl.userList + '/user/?' + '&page=' + param.cur + '&pageSize=15';
    for (var key in param) {
        if (key == 'phone' && param[key] !== '') {
            url += '&phone=' + param[key];
        }
        if (key == 'id' && param[key] !== '') {
            url += '&id=' + param[key];
        }
        if (key == 'fullname' && param[key] !== '') {
            url += '&fullname=' + param[key];
        }
        if (key == 'source' && param[key] !== '') {
            url += '&source=' + param[key];
        }
        if (key == 'bizMain' && param[key] !== '') {
            url += '&bizMain=' + param[key];
        }
        if (key == 'bizType' && param[key] !== '') {
            url += '&bizType=' + param[key];
        }
        if (key == 'audit' && param[key] !== '') {
            url += '&audit=' + param[key];
        }
        if (key == 'startCtime' && param[key] !== '') {
            url += '&startCtime=' + param[key];
        }
        if (key == 'endCtime' && param[key] !== '') {
            url += '&endCtime=' + param[key];
        }
        if (key == 'transform' && param[key] !== '') {
            url += '&transStatus=' + param[key];
        }
        if (key == 'city' && param[key] !== '' && param[key] != undefined) {
            url += '&city=' + param[key];
        }
        if (key == 'province' && param[key] !== '') {
            url += '&province=' + param[key];
        }
        if (key == 'utype' && param[key] !== '') {
            url += '&utype=' + param[key];
        }
        if (key == 'ctype' && param[key] !== '') {
            url += '&ctype=' + param[key];
        }
        if (key == 'trackingDay' && param[key] !== '') {
            url += '&trackingDay=' + param[key];
        }
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var user = res.json().result.list;
        for (var i in user) {
            user[i].checked = false;
            user[i].show = false;
        }

        dispatch(types.USER_DATA, user);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
        localStorage.userParam = JSON.stringify(param);
    }, (res) => {
        console.log('fail');

        param.loading = false;
    })
}

//会员审核快速编辑标签
export const auditQuickEdit = ({ dispatch }) => {
    Vue.http.get(apiUrl.auditQuickEdit)
        .then((res) => {
            dispatch(types.QUICK_EDIT, res.data.results);
        }, (res) => {
            console.log('fail');
        });
};

export const getUserDetail = ({ dispatch }, param, doSomething) => { //会员详情
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.userList + '/user/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var userDetail = res.json().result;
        if (userDetail.intention.length > 0) {
            userDetail.intention.forEach(function(item) {
                item.checked = false;
                item.show = false;
            })
        }
        if (userDetail.tracking.length > 0) {
            userDetail.tracking.forEach(function(item) {
                item.show = false;
            })
        }
        if (userDetail.orders.length > 0) {
            userDetail.orders.forEach(function(item) {
                item.show = false;
            })
        }
        var intention = userDetail.intention;
        userDetail.intention = {};
        userDetail.intention.show = false;
        userDetail.intention.checked = false;
        userDetail.intention.arr = intention;

        var tracking = userDetail.tracking;
        userDetail.tracking = {};
        userDetail.tracking.show = false;
        userDetail.tracking.arr = tracking;

        var orders = userDetail.orders;
        userDetail.orders = {};
        userDetail.orders.show = false;
        userDetail.orders.arr = orders;

        userDetail.personalAuthShow = false;
        userDetail.companyAuthShow = false;
        for (var i in userDetail) {
            param[i] = userDetail[i];
        }

        if (doSomething == "editIntention") {
            userDetail.intention.show = true;
        }

        dispatch(types.USER_DETAIL_DATA, userDetail);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const updateUserInfo = ({ dispatch }, param) => { //修改用户基本信息

    var bizCategory = {
        0: '其它',
        1: '合作社',
        2: '药商',
        3: '药厂',
        4: '个体户',
        5: '药店',
        6: '医院',
        7: '贸易公司',
        8: '零售商行',
        9: '药农',
        10: '介绍人',
        11: '药贩子',
        12: '产地药商',
        13: '销地药商',
        14: '养生诊所',
        15: '化工厂',
        16: '化妆品厂',
        17: '提取物厂',
        18: '食品厂',
        19: '实验室',
        20: '网上电商',
        21: '中成药生产商',
        22: '西药生产商',
        23: '饮片厂'
    }
    const updatedata = {
        id: param.id
    }
    if (param.qq) {
        updatedata.qq = param.qq;
    }
    if (param.fullname) {
        updatedata.fullname = param.fullname;
    }
    if (param.email) {
        updatedata.email = param.email;
    }
    if (param.phone) {
        updatedata.phone = param.phone;
    }
    if (param.tel) {
        updatedata.tel = param.tel;
    }
    if (param.nickname) {
        updatedata.nickname = param.nickname;
    }
    if (param.company) {
        updatedata.company = param.company;
    }
    if (param.comment) {
        updatedata.comment = param.comment;
    }
    if (param.utype) {
        updatedata.utype = param.utype;
    }
    if (param.ctype) {
        updatedata.ctype = param.ctype;
    }
    if (param.ucomment) {
        updatedata.ucomment = param.ucomment;
    }
    if (param.ccomment) {
        updatedata.ccomment = param.ccomment;
    }
    if (param.address) {
        updatedata.address = param.address;
    }
    if (param.idnumber) {
        updatedata.idnumber = param.idnumber;
    }
    if (param.bizType) {
        updatedata.bizType = param.bizType;
    }
    if (param.gender) {
        updatedata.gender = param.gender;
    }
    if (param.importance) {
        updatedata.importance = param.importance;
    }
    if (param.grade) {
        updatedata.grade = param.grade;
    }
    if (param.userType) {
        updatedata.userType = param.userType;
    }
    if (param.bizMain) {
        updatedata.bizMain = param.bizMain;
    }

    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/user/',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        updatedata.index = param.index;
        updatedata.bizTypeName = bizCategory[param.bizType];
        dispatch(types.UPDATE_USER_DATA, updatedata);
        param.callback(res.json().msg);
    }, (res) => {
        console.log('fail');
    })
}

export const batchUpdateUserInfo = ({ dispatch }, param) => { //批量修改会员信息
    const updatedata = {
        userIds: param.userIds,
    }
    if (param.auditComment) {
        updatedata.auditComment = param.auditComment;
    }
    if (param.audit) {
        updatedata.audit = param.audit;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/user/batchUpdate',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        param.auditComment = "";
        updatedata.indexs = param.indexs;
        dispatch(types.BATCH_UPDATE_USER_DATA, updatedata);
    }, (res) => {
        console.log('fail');
    })
}

export const batchUserIntentionAudit = ({ dispatch }, param) => { //批量审核会员意向
    const updatedata = {
        ids: param.arr,
        validate: param.validate,
        description: param.description
    }

    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/intention/validates',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;

        dispatch(types.BATCH_USER_INTENTION_AUDIT, param);
    }, (res) => {
        console.log('fail');
    })
}

export const getFilesList = ({ dispatch }, param) => { //供应商文件列表
    var url = apiUrl.clientList + '/customer/file/?' + '&page=' + param.cur + '&pageSize=15';
    param.loading = true;
    if (param.name) {
        url = url + '&name=' + param.name;
    }
    if (param.customerId) {
        url = url + '&customerId=' + param.customerId;
    }
    if (param.description) {
        url = url + '&description=' + param.description;
    }
    if (param.cname) {
        url = url + '&cname=' + param.cname;
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var file = res.json().result.list;
        for (var i in file) {
            file[i].show = false;
        }
        dispatch(types.FILES_DATA_LIST, file);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        //localStorage.fileList = JSON.stringify(file);
        localStorage.fileParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const uploadCertificate = ({ dispatch }, param) => { //供应商新增文件上传
    if (param.image_f) { param.path += param.image_f + ',' }
    if (param.image_s) { param.path += param.image_s + ',' }
    if (param.image_t) { param.path += param.image_t };
    const data = {
        fileType: param.fileType,
        bizType: param.bizType,
        path: param.path,
        description: param.description,
        bizId: param.bizId
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.ADD_CERTIFICATE_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const uploadFiles = ({ dispatch }, param) => { //客户文件上传
    if (param.image_f) { param.path = param.image_f; }
    if (param.image_s && param.path) { param.path = param.path + ',' + param.image_s; } else if (param.image_s && !param.path) {
        param.path = param.image_s;
    }
    if (param.image_t && param.path) { param.path = param.path + ',' + param.image_t } else if (param.image_t && !param.path) {
        param.path = param.image_t;
    }
    const data = {
        fileType: param.fileType,
        bizType: param.bizType,
        path: param.path,
        description: param.description,
        bizId: param.bizId,
        name: param.name
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.id = res.json().result.id;
        dispatch(types.ADD_FILES_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}


export const createEmploy = ({ dispatch }, param) => { //新增员工信息
    if (param.entrydate) {
        param.entrydate = param.entrydate.split(' ')[0] + ' 00:00:00';
    }
    if (param.leavedate) {
        param.leavedate = param.leavedate.split(' ')[0] + ' 00:00:00';
    }
    const data = {
        "name": param.name,
        "ename": param.ename,
        "no": param.no,
        "orgName": param.orgName,
        'position': param.position,
        "mobile": param.mobile,
        "extno": param.extno,
        "leave": param.leave,
        "qq": param.qq,
        "wechat": param.wechat,
        "email": param.email,
        'entrydate': param.entrydate,
        "leavedate": param.leavedate,
        "orgid": param.orgid,
        "orgcode": param.orgcode,
        'privilege': param.privilege
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.leave = 1;
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.ADD_EMPLOYEE_DATA, param);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const updateEmploy = ({ dispatch }, param) => { //修改员工信息
    if (param.entrydate) {
        param.entrydate = param.entrydate.split(' ')[0] + ' 00:00:00';
    }
    if (param.leavedate) {
        param.leavedate = param.leavedate.split(' ')[0] + ' 00:00:00';
    }
    param.photo = '';
    if (param.image_f) { param.photo += param.image_f }
    const updatedata = {
        id: param.id,
        name: param.name,
        ename: param.ename,
        no: param.no,
        orgName: param.orgName,
        position: param.position,
        mobile: param.mobile,
        extno: param.extno,
        leave: param.leave,
        qq: param.qq,
        wechat: param.wechat,
        email: param.email,
        entrydate: param.entrydate,
        leavedate: param.leavedate,
        orgid: param.orgid,
        email: param.email,
        orgcode: param.orgcode,
        privilege: param.privilege,
        gender: param.gender,
        goodfield: param.goodfield,
        photo: param.photo
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.UPDATE_EMPLOY_DATA, param);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const editintentInfo = ({ dispatch }, param, tipParam) => { //修改意向

    const data = {
        "id": param.id,
        "type": param.type,
        "especial": param.especial,
        "customerName": param.customerName,
        "customerId": param.customerId,
        "customerPhone": param.customerPhone,
        "breedName": param.breedName,
        "qualification": param.qualification,
        "spec": param.spec,
        "address": param.address,
        "advance": param.advance,
        "invoic": param.invoic,
        'visit': param.visit,
        "intl": param.intl,
        "unit": param.unit,
        "pack": param.pack,
        "paymentWay": param.paymentWay,
        "sampling": param.sampling,
        "sampleNumber": param.sampleNumber,
        "sampleAmount": param.sampleAmount,
        "breedId": param.breedId,
        "country": param.country,
        "transportType": param.transportType, //运输类型，1/2 空运/海运
        "transportNo": param.transportNo, //航班号
        "arriveTime": param.arriveTime, //到达时间
        "quality": param.quality,
        "price": param.price,
        "province": param.province,
        "onSell": param.onSell,
        "city": param.city,
        "district": param.district,
        "location": param.location,
        "number": param.number,
        "moq": param.moq,
        "quality": param.quality,
        "duedate": param.duedate,
        "images": param.images,
        "importQualityImages": param.importQualityImages,
        "testReportImages": param.testReportImages,
        "description": param.description
    }
    if (param.sampleUnit !== undefined && param.sampleUnit !== "") { //只能传数字（单位ID）
        data.sampleUnit = param.sampleUnit;
    }
    Vue.http({
        method: "PUT",
        url: apiUrl.clientList + '/intention/',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        param.ctime = param.ctime;
        if (param.callback) {
            param.callback(res.json().msg);
        }
        if (res.json().code == 200) {
            dispatch(types.UPDATA_INTENTION_DATA, param);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const createIntentionInfo = ({ dispatch }, param) => { //新增意向
    var today = new Date();
    const data = {
        "userId": param.userId,
        "type": param.type,
        "paymentWay": param.paymentWay,
        "especial": param.especial,
        "preSell": param.preSell,
        "customerName": param.customerName,
        "customerId": param.customerId,
        "customerPhone": param.customerPhone,
        "breedName": param.breedName,
        "qualification": param.qualification,
        "spec": param.spec,
        "address": param.address, //预售的库存地复用address
        "advance": param.advance,
        "invoic": param.invoic,
        'visit': param.visit,
        "intl": param.intl,
        "unit": param.unit,
        "pack": param.pack,
        "sampling": param.sampling,
        "sampleNumber": param.sampleNumber,
        "sampleAmount": param.sampleAmount,
        "breedId": param.breedId,
        "country": param.country, //国家（预售时出口国复用此字段）
        "transportType": param.transportType, //运输类型，1/2 空运/海运
        "transportNo": param.transportNo, //航班号
        "arriveTime": param.arriveTime, //到达时间
        "quality": param.quality,
        "price": param.price,
        "province": param.province,
        "city": param.city,
        "district": param.district,
        "location": param.location,
        "number": param.number,
        "moq": param.moq,
        "quality": param.quality,
        "duedate": param.duedate,
        "images": param.images, //产品图片
        "importQualityImages": param.importQualityImages, //进口资质图片
        "testReportImages": param.testReportImages, //检测报告图片
        "inType": param.inType,
        "validate": param.validate,
        "description": param.description
    }
    if (param.sampleUnit !== undefined && param.sampleUnit !== "") { //只能传数字（单位ID）
        data.sampleUnit = param.sampleUnit;
    }

    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }
        param.id = res.json().result.intentionId;
        param.checked = false;
        param.show = false;
        param.ctime = today.toLocaleDateString();
        if (res.json().code == 200) {
            dispatch(types.INTENTION_DATA, param);
        }

    }, (res) => {
        console.log('fail');
    })
}

export const intentionUpAndDown = ({ dispatch }, param) => { //意向上下架
    const updatedata = {
        ids: param.ids,
        onSell: param.onSell
    }
    if (param.onUnValidateDescription) {
        updatedata.onUnValidateDescription = param.onUnValidateDescription;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + '/intention/upAndDowns',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        } else {
            dispatch(types.INTENTION_UP_DOWN, param);
        }
        param.show = true;
    }, (res) => {
        console.log('fail');
    })
}

export const updateTrackingInfo = ({ dispatch }, param) => { //修改跟进信息
    const updatedata = {
        id: param.id,
        objId: param.objId
    }
    if (param.type) {
        updatedata.type = param.type;
    }
    if (param.trackingWay) {
        updatedata.trackingWay = param.trackingWay;
    }
    if (param.contactNo) {
        updatedata.contactNo = param.contactNo;
    }
    if (param.comments) {
        updatedata.comments = param.comments;
    }

    Vue.http({
        method: 'PUT',
        url: apiUrl.tracking + "/tracking/",
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.UPDATE_TRACKING_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const createTrackingInfo = ({ dispatch }, param) => { //添加跟进信息
    const data = {

    }
    if (param.type !== '') {
        data.type = param.type;
    }
    if (param.trackingWay !== '') {
        data.trackingWay = param.trackingWay;
    }
    if (param.contactNo !== '') {
        data.contactNo = param.contactNo;
    }
    if (param.comments !== '') {
        data.comments = param.comments;
    }
    if (param.objId !== '') {
        data.objId = param.objId;
    }
    if (param.bizId !== '') {
        data.bizId = param.bizId;
    }
    if (param.bizType !== '') {
        data.bizType = param.bizType;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.tracking + "/tracking/",
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.id = res.json().result.id;
        dispatch(types.ADD_TRACKING_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const getAuthInfo = ({ dispatch }, param) => { //查询认证信息
    const data = {
        id: param.id
    }
    if (param.utype) {
        data.utype = param.utype;
    }

    if (param.ctype) {
        data.ctype = param.ctype;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.userList + "/user/identification",
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var identify = res.json().result;
        if (param.utype) {
            dispatch(types.PERSON_IDENTIFY_DATA, identify);
        }
        if (param.ctype) {
            dispatch(types.COMPANY_IDENTIFY_DATA, identify);
        }

    }, (res) => {
        console.log('fail');
    })
}


export const baseGetData = ({ dispatch }, param) => { //查询权限
    param.loading = true;
    var url = apiUrl.base + param.url + '?page=' + param.cur;
    if (param.sys) {
        url += '&sys=' + param.sys
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        const json = {
            list: res.json(),
            name: param.keyName,
            callback: param.getDataInit
        };
        if (json.list.result && Object.prototype.toString.call(json.list.result) === '[object Array]') {
            for (let i in json.list.result) {
                json.list.result[i].show = false;
            }
        } else if (json.list.result.list && Object.prototype.toString.call(json.list.result.list) === '[object Array]') {
            for (let i in json.list.result.list) {
                json.list.result.list[i].show = false;
            }
        }
        param.all = json.list.result.pages;
        param.total = res.json().result.total;
        dispatch(types.ABSTRACT_GET_DATA, json);

        localStorage.scopeList = JSON.stringify(json);
        localStorage.scopeParam = JSON.stringify(param);

    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}
export const scopedOperate = ({ dispatch }, param) => { //查询权限功能
    Vue.http({
        method: 'GET',
        url: apiUrl.base + '/sys/menu/' + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var json = res.json().result;
        dispatch(types.ABSTRACT_GET_DETAIL, json);

    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const baseAddData = ({ dispatch }, param) => { //新增权限
    const data = {}
    if (param.link == '/sys/role/' && param.body) {
        data.cname = param.body.cname;
        data.menus = param.body.menus;
        data.remark = param.body.remark;
    }
    if (param.link == '/sys/menu/' && param.cname) {
        data.cname = param.cname;
    }
    if (param.link == '/sys/menu/' && param.ename) {
        data.ename = param.ename;
    }
    if (param.link == '/sys/menu/' && param.pid) {
        data.pid = param.pid;
    }
    if (param.link == '/sys/menu/' && param.sys) {
        data.sys = param.sys;
    }
    if (param.link == '/sys/menu/' && param.type !== '') {
        data.type = param.type;
    }
    if (param.link == '/sys/menu/' && param.remark) {
        data.remark = param.remark;
    }
    if (param.link == '/sys/menu/' && param.url) {
        data.url = param.url;
    }
    if (param.link == '/sys/menu/' && param.icon) {
        data.icon = param.icon.substring(34);
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.base + param.link,
        body: data,
        emulateHTTP: true,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.pid || res.json().code == 200) {
            param.callback(res.json().msg)
            dispatch(types.ABSTRACT_UPDATE_DATA, param);
        } else {
            if (res.json().result.id) { param.body.id = res.json().result.id; }
            param.body.utime = param.utime;
            param.body.show = false;
            let json = {
                name: param.keyName,
                body: param.body
            }
            param.loading = false;
            param.show = false;
            dispatch(types.ABSTRACT_ADD_DATA, json);
        }
        param.loading = false;
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const baseUpdateData = ({ dispatch }, param) => { //修改权限
    const data = {}
    if (param.link == '/sys/role/' && param.body) {
        data.cname = param.body.cname;
        data.id = param.body.id;
        data.menus = param.body.menus;
        data.remark = param.body.remark;
    }
    if (param.link == '/sys/menu/' && param.cname) {
        data.cname = param.cname;
    }
    if (param.link == '/sys/menu/' && param.ename) {
        data.ename = param.ename;
    }
    if (param.link == '/sys/menu/' && param.id) {
        data.id = param.id;
    }
    if (param.link == '/sys/menu/' && param.pid) {
        data.pid = param.pid;
    }
    if (param.link == '/sys/menu/' && param.type !== '') {
        data.type = param.type;
    }
    if (param.link == '/sys/menu/' && param.sys) {
        data.sys = param.sys;
    }
    if (param.link == '/sys/menu/' && param.remark) {
        data.remark = param.remark;
    }
    if (param.link == '/sys/menu/' && param.url) {
        data.url = param.url;
    }
    if (param.link == '/sys/menu/' && param.safecode) {
        data.safecode = param.safecode;
    }
    if (param.link == '/sys/menu/' && param.icon) {
        if (param.icon.indexOf("static") > 0) {
            data.icon = param.icon;
        } else {
            data.icon = param.icon.substring(34);
        }

    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.base + param.link,
        body: data,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.body) {
            param.body.utime = param.utime;
            let json = {
                name: param.keyName,
                body: param.body,
                index: param.index
            }
            param.loading = false;
            param.show = false;
            dispatch(types.ABSTRACT_UPDATE_DATA, json);
        } else {
            param.callback(res.json().msg)
            dispatch(types.ABSTRACT_UPDATE_DATA, param);
        }


    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const baseDelData = ({ dispatch }, param) => { //删除权限信息
    Vue.http({
        method: 'DELETE',
        url: apiUrl.base + param.url + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        let json = {
            name: param.keyName,
            index: param.index
        }
        param.loading = false;
        dispatch(types.ABSTRACT_DELETE_DATA, json);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const loadFile = ({ dispatch }, param) => { //查询认证信息
    Vue.http({
        method: 'GET',
        url: apiUrl.loadUrl + '?path=' + encodeURI(param.path),
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

    }, (res) => {

    })
}

/*---二期开发---*/
export const getUnitList = ({ dispatch }, param) => { //常用单位接口
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/enum/units',
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var clientCount = res.json().result;
        dispatch(types.UNIT_LIST, clientCount);
    }, (res) => {
        console.log('fail');
    })
}
export const getCurrencyList = ({ dispatch }, param) => { //常用货币接口
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/enum/currency',
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var obj = res.json().result;
        dispatch(types.CURRENCY_LIST, obj);
    }, (res) => {
        console.log('fail');
    })
}

/*---我的客户统计---*/
export const getClientcount = ({ dispatch }, param) => { //我的客户统计
    if (param) param.loading = true;
    var countUrl = apiUrl.clientList + '/count/getCustomerAdd?role=emp';
    if (param.employeeId) {
        countUrl += '&employeeId=' + param.employeeId
    }
    Vue.http({
        method: 'GET',
        url: countUrl,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;

        var clientCount = res.json().result;
        dispatch(types.MY_CLIENT_COUNT, clientCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}
export const getClientOrgcount = ({ dispatch }, param) => { //部门客户统计
    if (param) param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + param.link,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;

        var clientCount = res.json().result;


        dispatch(types.MY_CLIENT_COUNT, clientCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const getClientAllcount = ({ dispatch }, param) => { //全部客户统计
    param.loading = true;
    let body = {
        groupBy: param.groupBy
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId;
    }
    if (param.orgId) {
        body.orgId = param.orgId;
    }
    if (param.country) {
        body.country = param.country;
    }
    if (param.intl) {
        body.intl = param.intl;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var clientCount = res.json().result;
        //计算成交占比（traded/total）
        let computeRate = function(traded, total) {
            let rate;
            if (total == 0 || traded == 0) {
                rate = 0;
            } else {
                rate = traded / total * 10000;
            }
            if (rate != 0) {
                let temp = rate.toString().split(".")[0];
                rate = temp / 100;
            }
            return rate;
        }
        clientCount.tradedRate = computeRate(clientCount.traded, clientCount.total);
        for (let i = 0; i < clientCount.statisticsList.length; i++) {
            clientCount.statisticsList[i].tradedRate = computeRate(clientCount.statisticsList[i].traded, clientCount.statisticsList[i].total);
        }

        dispatch(types.MY_CLIENT_COUNT, clientCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const getClientOverview = ({ dispatch }, param) => { //客户总览统计
    param.loading = true;
    let body = {};

    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var clientCount = res.json().result;
        //计算成交占比（traded/total）
        let computeRate = function(traded, total) {
            let rate;
            if (total == 0 || traded == 0) {
                rate = 0;
            } else {
                rate = traded / total * 10000;
            }
            if (rate != 0) {
                let temp = rate.toString().split(".")[0];
                rate = temp / 100;
            }
            return rate;
        }

        for (let i = 0; i < clientCount.length; i++) {
            clientCount[i].tradedRate = computeRate(clientCount[i].traded, clientCount[i].total);
            let list = clientCount[i].statisticsList;
            for (let k = 0; k < list.length; k++) {
                list[k].tradedRate = computeRate(list[k].traded, list[k].total);
            }
        }

        dispatch(types.MY_CLIENT_COUNT, clientCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const getOrderCount = ({ dispatch }, param) => { //我的订单统计(交易统计)

    if (param) param.loading = true;
    var url = apiUrl.clientList + '/report/order/list' + '?' + '&page=' + param.cur + '&pageSize=10';
    if (param.endTime && param.endTime !== '') {
        url += "&endTime=" + param.endTime;
    }
    if (param.startTime && param.startTime !== '') {
        url += "&startTime=" + param.startTime;
    }
    if (param.employee && param.employee !== '') {
        url += "&employee=" + param.employee;
    }
    if (param.org && param.org !== '') {
        url += "&org=" + param.org;
    }
    if (param.groupType && param.groupType !== '') {
        url += "&groupType=" + param.groupType;
    }
    if (param.timeType && param.timeType !== '') {
        url += "&timeType=" + param.timeType;
    }
    if (param.orderType && param.orderType !== '') {
        url += "&orderType=" + param.orderType;
    }
    if (param.orderType == 0) {
        url += "&orderType=" + 0;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var orderCount = res.json().result.list;
        dispatch(types.MY_ORDER_COUNT, orderCount);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}
export const getOrgCountList = ({ dispatch }, param) => { //订单统计(有部门,全部以及部门的客户类型搜索等)
    if (param) param.loading = true;
    var url = apiUrl.clientList + param.link + '?';
    if (param.endTime && param.endTime !== '') {
        url += "&endTime=" + param.endTime;
    }
    if (param.startTime && param.startTime !== '') {
        url += "&startTime=" + param.startTime;
    }
    if (param.employee && param.employee !== '') {
        url += "&employee=" + param.employee;
    }
    if (param.org && param.org !== '') {
        url += "&org=" + param.org;
    }
    if (param.groupType && param.groupType !== '') {
        url += "&groupType=" + param.groupType;
    }
    if (param.timeType && param.timeType !== '') {
        url += "&timeType=" + param.timeType;
    }
    if (param.orderType && param.orderType !== '') {
        url += "&orderType=" + param.orderType;
    }
    if (param.orderType == 0) {
        url += "&orderType=" + 0;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var orderCount = res.json().result;
        if (param.key) {
            orderCount.key = param.key;
        }
        dispatch(types.ORG_ORDER_COUNT, orderCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}
export const getOrderCountList = ({ dispatch }, param) => { //全部订单统计(头部)
    if (param) param.loading = true;
    var url = apiUrl.clientList + '/report/order/totalStatistics' + '?';
    if (param.endTime && param.endTime !== '') {
        url += "&endTime=" + param.endTime;
    }
    if (param.startTime && param.startTime !== '') {
        url += "&startTime=" + param.startTime;
    }
    if (param.employee && param.employee !== '') {
        url += "&employee=" + param.employee;
    }
    if (param.org && param.org !== '') {
        url += "&org=" + param.org;
    }
    if (param.orderType && param.orderType !== '') {
        url += "&orderType=" + param.orderType;
    }
    if (param.orderType == 0) {
        url += "&orderType=" + 0;
    }
    if (param.groupType && param.groupType !== '') {
        url += "&groupType=" + param.groupType;
    }
    if (param.timeType && param.timeType !== '') {
        url += "&timeType=" + param.timeType;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var orderCount = res.json().result;
        orderCount.key = param.key;
        dispatch(types.ORDER_COUNT, orderCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}
export const getTimeOrderCount = ({ dispatch }, param) => { //我的订单统计(时间维度:日周月季年)
    if (param) param.loading = true;
    var url = apiUrl.clientList + param.link + '?';
    if (param.timeType && param.timeType !== '') {
        url += "&timeType=" + param.timeType;
    }
    if (param.objType && param.objType !== '') {
        url += "&objType=" + param.objType;
    }
    if (param.employee && param.employee !== '') {
        url += "&employee=" + param.employee;
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        var orderCount = res.json().result;

        dispatch(types.MY_TIME_ORDER_COUNT, orderCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}


/*---业务总览报表---*/
export const getOrgCount = ({ dispatch }, param) => {
    var OrgUrl = apiUrl.clientList + '/report/order/all?';

    for (var seach in param) {
        if (seach == 'orderType' && param[seach] !== '') {
            OrgUrl += '&orderType=' + param.orderType
        }

        if (seach == 'startTime' && param[seach] !== '') {
            OrgUrl += '&startTime=' + param.startTime;

        }
        if (seach == 'endTime' && param[seach] !== '') {
            OrgUrl += '&endTime=' + param.endTime
        }
        if (seach == 'timeType' && param[seach] !== '') {
            OrgUrl += '&timeType=' + param.timeType
        }
    }

    if (param.orderType == 0) {
        OrgUrl += "&orderType=" + 0;
    }
    Vue.http({
        method: 'GET',
        url: OrgUrl,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var orgCount = res.json().result;
        dispatch(types.MY_ORG_COUNT, orgCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const getEmployeeCount = ({ dispatch }, param) => { //部门获取员工列表以及搜索
    param.loading = true;
    var apiurl = apiUrl.clientList + '/employee/?' + '&page=' + param.cur + '&pageSize=50';
    for (var seach in param) {
        if (seach == 'name' && param[seach] !== '') {
            apiurl += '&name=' + param.name
        }
        if (seach == 'mobile' && param[seach] !== '') {
            apiurl += '&phone=' + param.mobile
        }
        if (seach == 'orgId' && param[seach] !== '') {
            apiurl += '&org=' + param.orgId
        }
        if (seach == 'orgCode' && param[seach] !== '') {
            apiurl += '&orgCode=' + param.orgCode
        }
    }
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var employ = res.json().result.list;
        dispatch(types.EMPLOYEE_DATA, employ);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getSampleList = ({ dispatch }, param) => { //我的寄样申请列表以及搜索
    param.loading = true;
    var apiurl = apiUrl.commonList + '/sample/list/employee/?' + '&page=' + param.cur + '&pageSize=15';
    for (var seach in param) {
        if (seach == 'customerName' && param[seach] !== '') {
            apiurl += '&customerName=' + param.customerName
        }
        if (seach == 'customerPhone' && param[seach] !== '') {
            apiurl += '&customerPhone=' + param.customerPhone
        }
        if (seach == 'validate' && param[seach] !== '') {
            apiurl += '&validate=' + param.validate
        }
    }
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var mysample = res.json().result.list;
        for (var i in mysample) {
            mysample[i].show = false;
            mysample[i].checked = false;
        }
        dispatch(types.MY_SAMPLE_LIST, mysample);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getSampleDetail = ({ dispatch }, param) => { //寄样详情
    param.loading = true;
    var apiurl = apiUrl.commonList + '/sample/' + param.id;
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        if (param.key == 'sampleDetail') {
            var items = obj.items;
            if (!items) {
                items = [];
            }
            obj.items = {};
            obj.items.arr = items;
            obj.items.show = true;
            for (var i in obj.items.arr) {
                obj.items.arr[i].show = false;
            }
            dispatch(types.SAMPLE_DETAIL, obj);
            param.loading = false;
        }
        if (param.key == "samplelist") { //寄样列表编辑寄样信息

            obj.items.forEach(function(item) {
                var temp = {
                    id: item.id,
                    breedId: item.breedId,
                    breedName: item.breedName,
                    quality: item.quality,
                    location: item.location,
                    spec: item.spec,
                    number: item.number,
                    unit: item.unit,
                    cunit: item.cunit,
                    eunit: item.eunit,
                    status: item.status,
                    description: item.description
                }
                param.items.push(temp);
                param.itemsBack.push(temp);
            })
            param.customerName = obj.customerName,
                param.customerPhone = obj.customerPhone,
                param.consignee = obj.consignee;
            param.consigneePhone = obj.consigneePhone;
            param.total = obj.total;
            param.country = obj.country;
            param.province = obj.province;
            param.city = obj.city;
            param.comments = obj.comments;
            param.district = obj.district;
            param.address = obj.address;
            dispatch(types.SAMPLE_DETAIL, obj);
            param.loading = false;
        }

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getOrgSampleList = ({ dispatch }, param) => { //部门寄样申请列表以及搜索
    param.loading = true;
    var apiurl = apiUrl.commonList + '/sample/list/org/?' + '&page=' + param.cur + '&pageSize=15';
    for (var seach in param) {
        if (seach == 'customerName' && param[seach] !== '') {
            apiurl += '&customerName=' + param.customerName
        }
        if (seach == 'customerPhone' && param[seach] !== '') {
            apiurl += '&customerPhone=' + param.customerPhone
        }
        if (seach == 'validate' && param[seach] !== '') {
            apiurl += '&validate=' + param.validate
        }
    }
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orgsample = res.json().result.list;
        for (var i in orgsample) {
            orgsample[i].show = false;
            orgsample[i].checked = false;
        }
        dispatch(types.ORG_SAMPLE_LIST, orgsample);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const createSample = ({ dispatch }, data) => { //新建寄样申请
    const body = {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customer: data.customer,
        currency: data.currency,
        total: data.total,
        comments: data.comments,
        employee: data.employee,
        country: data.country,
        province: data.province,
        city: data.city,
        district: data.district,
        address: data.address,
        items: data.items
    }
    if (data.consignee == '') {
        body.consignee = data.customerName;
    } else {
        body.consignee = data.consignee;
    }
    if (data.consigneePhone == '') {
        body.consigneePhone = data.customerPhone
    } else {
        body.consigneePhone = data.consigneePhone;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + '/sample/',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        data.callback(res.json().msg);
        data.validate = res.json().result.validate;
        data.ctime = new Date();
        data.sampleDesc = res.json().result.sampleDesc;
        data.address = res.json().result.address;
        data.consigneePhone = res.json().result.consigneePhone;
        data.consignee = res.json().result.consignee;
        data.id = res.json().result.id;
        if (res.json().code == 200) {
            dispatch(types.ADD_SAMPLE, data);
        }

        data.show = false;
    }, (res) => {
        console.log('fail');
    });
}
export const alterSample = ({ dispatch }, param) => { //修改寄样申请
    const body = {
        id: param.id,
        customerName: param.customerName,
        customerPhone: param.customerPhone,
        customer: param.customer,
        currency: param.currency,
        total: param.total,
        employee: param.employee,
        country: param.country,
        province: param.province,
        comments: param.comments,
        city: param.city,
        district: param.district,
        status: param.status,
        address: param.address,
        items: param.items
    }
    if (param.consignee == '') {
        body.consignee = param.customerName;
    } else {
        body.consignee = param.consignee;
    }
    if (param.consigneePhone == '') {
        body.consigneePhone = param.customerPhone
    } else {
        body.consigneePhone = param.consigneePhone;
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.commonList + '/sample/',
        emulateHTTP: false,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.send = false;
        param.address = res.json().result.address;
        param.sampleDesc = res.json().result.sampleDesc;
        if (res.json().code == 200) {
            dispatch(types.UPDATE_SAMPLE, param);
        }

    }, (res) => {
        console.log('fail');
        param.send = false;
    });
}
export const deleteData = ({ dispatch }, param) => { //删除客户、药材信息
    Vue.http({
        method: 'DELETE',
        url: apiUrl.commonList + param.url + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch(types.DELETE_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}
export const sampleApply = ({ dispatch }, param) => { //  申请/审核 寄样申请
    const body = {
        id: param.id
    }
    if (param.auditComment) {
        body.description = param.auditComment;
    }
    if (param.validate) {
        body.validate = param.validate;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.validate = res.json().result.validate;
        param.description = res.json().result.description;
        if (res.json().code == 200) {
            dispatch(types.APPLY_DATA, param);
        }
    }, (res) => {
        console.log('fail');
    });
}
export const getMyFundList = ({ dispatch }, param) => { //个人资金记录以及搜索
    param.loading = true;
    var apiurl = apiUrl.commonList + '/fund/employee/?' + 'page=' + param.cur + '&pageSize=15';
    for (var seach in param) {
        if (seach == 'amount' && param[seach] !== '') {
            apiurl += '&amount=' + param.amount
        }
        if (seach == 'payName' && param[seach] !== '') {
            apiurl += '&payName=' + param.payName
        }
        if (seach == 'payUserName' && param[seach] !== '') {
            apiurl += '&payUserName=' + param.payUserName
        }
        if (seach == 'payNumber' && param[seach] !== '') {
            apiurl += '&payNumber=' + param.payNumber
        }
        if (seach == 'type' && param[seach] !== '') {
            apiurl += '&type=' + param.type
        }
        if (seach == 'bizSubId' && param[seach] !== '') {
            apiurl += '&bizSubId=' + param.bizSubId
        }
        if (seach == 'bizId' && param[seach] !== '') {
            apiurl += '&bizId=' + param.bizId
        }
        if (seach == 'validate' && param[seach] !== '') {
            apiurl += '&validate=' + param.validate
        }
    }
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orgsample = res.json().result.list;
        param.loading = false;
        dispatch(types.MY_FUND_LIST, orgsample);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        localStorage.myFundParam = JSON.stringify(param);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getFinanceList = ({ dispatch }, param) => { //财务资金审核以及搜索
    param.loading = true;
    var apiurl = apiUrl.commonList + '/fund/?' + 'page=' + param.cur + '&pageSize=15';
    for (var seach in param) {
        if (seach == 'amount' && param[seach] !== '') {
            apiurl += '&amount=' + param.amount
        }
        if (seach == 'payName' && param[seach] !== '') {
            apiurl += '&payName=' + param.payName
        }
        if (seach == 'payUserName' && param[seach] !== '') {
            apiurl += '&payUserName=' + param.payUserName
        }
        if (seach == 'payNumber' && param[seach] !== '') {
            apiurl += '&payNumber=' + param.payNumber
        }
        if (seach == 'type' && param[seach] !== '') {
            apiurl += '&type=' + param.type
        }
        if (seach == 'validate' && param[seach] !== '') {
            apiurl += '&validate=' + param.validate
        }
    }
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orgsample = res.json().result.list;
        param.loading = false;
        dispatch(types.FINANCE_LIST, orgsample);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        localStorage.myFinanceParam = JSON.stringify(param);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getOrgFundList = ({ dispatch }, param) => { //部门资金记录以及搜索
    param.loading = true;
    var apiurl = apiUrl.commonList + '/fund/org/?' + 'page=' + param.cur + '&pageSize=15';
    for (var seach in param) {
        if (seach == 'amount' && param[seach] !== '') {
            apiurl += '&amount=' + param.amount
        }
        if (seach == 'payName' && param[seach] !== '') {
            apiurl += '&payName=' + param.payName
        }
        if (seach == 'employee' && param[seach] !== '') {
            apiurl += '&employee=' + param.employee
        }
        if (seach == 'payUserName' && param[seach] !== '') {
            apiurl += '&payUserName=' + param.payUserName
        }
        if (seach == 'payNumber' && param[seach] !== '') {
            apiurl += '&payNumber=' + param.payNumber
        }
        if (seach == 'type' && param[seach] !== '') {
            apiurl += '&type=' + param.type
        }
        if (seach == 'validate' && param[seach] !== '') {
            apiurl += '&validate=' + param.validate
        }
    }
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orgsample = res.json().result.list;
        param.loading = false;
        dispatch(types.ORG_FUND_LIST, orgsample);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        localStorage.orgFundParam = JSON.stringify(param);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getFundDetail = ({ dispatch }, param) => { //获取资金记录详情
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/fund/' + param.id,
        mulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        param.loading = false;
        var product = res.json().result;
        product.url = [];
        var img = res.json().result.images;
        for (var i in img) {
            var url = img[i].split(",");
            product.url = product.url.concat(url);
        }

        dispatch(types.FUND_DETAIL_DATA, product);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getRequestRecord = ({ dispatch }, param) => { ///获取分期申请记录列表
    Vue.http({
        method: 'GET',
        url: apiUrl.commonList + param.url + '/?bizId=' + param.bizId + '&type=' + param.type + '&bizType=' + param.bizType + '&bizSubId=' + param.bizSubId,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        dispatch(types.REQUEST_RECORD, obj);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getProductSupplier = ({ dispatch }, param) => { //获取有产品的供应商列表
    param.loading = true;
    var url = apiUrl.clientList + '/customer/product/byBreed' + '?breedId=' + param.breedId;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var itemHistory = res.json().result;
        for (var i in itemHistory) {
            itemHistory[i].checked = false;
            itemHistory[i].show = false;
        }
        dispatch(types.ITEM_SUPPLIER_LIST, itemHistory);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getBankList = ({ dispatch }, param) => { //获取银行数据
    var url = apiUrl.clientList + '/sys/enum/banks';
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var bank = res.json().result;
        dispatch(types.BANK_LIST, bank);
    }, (res) => {
        console.log('fail');
    })
}
export const getBankBranchList = ({ dispatch }, param) => { //获取银行支行的数据
    param.loading = true;
    if (!param.name) {
        param.name = '';
    }
    var url = apiUrl.clientList + '/sys/enum/getBankSubbranchs' + '?name=' + param.name + '&page=' + param.cur + '&pageSize=15';
    for (var seach in param) {
        if (seach == 'province' && param[seach] !== '') {
            url += '&province=' + param.province;
        }
        if (seach == 'city' && param[seach] !== '') {
            url += '&city=' + param.city;
        }
        if (seach == 'district' && param[seach] !== '') {
            url += '&district=' + param.district;
        }
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var branch = res.json().result.list;
        for (var i in branch) {
            branch[i].checked = false;
        }
        dispatch(types.BANK_BRANCH_LIST, branch);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const orderApplySend = ({ dispatch }, param) => { //发货申请
    const body = {
        id: param.orderId,
        description: param.description
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + '/order/sendflowStart',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.logistics = res.json().result.logistics;
        param.verifier = res.json().result.verifier;
        /*param.description=res.json().result.description;*/
        if (res.json().code == 200) {
            dispatch(types.ORDER_TABLE, param);
        }
    }, (res) => {
        console.log('fail');
    });
}
export const sendRestart = ({ dispatch }, param) => { //重新申请发货
    const body = {};
    if (param.orderId) {
        body.id = param.orderId;
    }
    if (param.bizId) {
        body.id = param.bizId;
    }
    if (param.auditComment) {
        body.description = param.auditComment;
    }
    if (param.description) {
        body.description = param.description;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + '/order/sendflowRestart',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.logistics = 1;
        /*param.description=res.json().result.description;*/
        if (res.json().code == 200) {
            dispatch(types.ORDER_TABLE, param);
        }
    }, (res) => {
        console.log('fail');
    });
}
export const sendCancel = ({ dispatch }, param) => { //取消发货
    const body = {

    }
    if (param.orderId) {
        body.id = param.orderId;
    }
    if (param.bizId) {
        body.id = param.bizId;
    }
    if (param.auditComment) {
        body.description = param.auditComment;
    }
    if (param.description) {
        body.description = param.description;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + '/order/sendflowCancle',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        param.logistics = 0;
        /*param.description=res.json().result.description;*/
        if (res.json().code == 200) {
            dispatch(types.ORDER_TABLE, param);
        }
    }, (res) => {
        console.log('fail');
    });
}
export const applyContract = ({ dispatch }, param) => { //申请补充合同
    var ss = param.files;
    var img = ss.split(","); //字符串转化为数组
    img.toString();
    const body = {
        orderId: param.orderId,
        contractText: param.contractText,
        comment: param.comment,
        adjusted: param.adjusted,
        images: img
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.ORDER_TABLE, param);
        }
    }, (res) => {
        console.log('fail');
    });
}

export const getMyContractList = ({ dispatch }, param) => { //补充合同列表（我的、部门）
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?page=' + param.cur + '&pageSize=15';
    for (var seach in param) {
        if (seach == 'orderDesc' & param[seach] !== '') {
            url += '&orderDesc=' + param.orderDesc
        }
        if (seach == 'customer' & param[seach] !== '') {
            url += '&customer=' + param.customer
        }
        if (seach == 'customerName' & param[seach] !== '') {
            url += '&customerName=' + param.customerName
        }
        if (seach == 'customerPhone' & param[seach] !== '') {
            url += '&customerPhone=' + param.customerPhone
        }
        if (seach == 'orderNo' & param[seach] !== '') {
            url += '&orderNo=' + param.orderNo
        }
        if (seach == 'orderType' & param[seach] !== '') {
            url += '&orderType=' + param.orderType
        }
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var contract = res.json().result.list;
        contract.link = param.link;
        dispatch(types.CONTRACT_LIST, contract);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const contractCheck = ({ dispatch }, param) => { //审核合同和重新申请补充合同或者取消以及售后申请审核
    const body = {
        id: param.id,
    }
    if (param.validate) {
        body.validate = param.validate;
    }
    if (param.description) {
        body.description = param.description;
    }
    if (param.orderId) {
        body.orderId = param.orderId;
    }
    if (param.shipper && param.type == 0) {
        body.shipper = param.shipper;
    }
    if (param.type) {
        body.type = param.type;
    }
    if (param.consignee) {
        body.consignee = param.consignee;
    }
    if (param.comment) {
        body.comment = param.comment;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.CONTRACT_LIST, param);
        }
    }, (res) => {
        console.log('fail');
    });
}

export const getSalesApplyList = ({ dispatch }, param) => { //售后申请列表（我的、部门）
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?page=' + param.cur + '&pageSize=15';
    for (var seach in param) {
        if (seach == 'orderDesc' & param[seach] !== '') {
            url += '&orderDesc=' + param.orderDesc
        }
        if (seach == 'customer' & param[seach] !== '') {
            url += '&customer=' + param.customer
        }
        if (seach == 'customerName' & param[seach] !== '') {
            url += '&customerName=' + param.customerName
        }
        if (seach == 'customerPhone' & param[seach] !== '') {
            url += '&customerPhone=' + param.customerPhone
        }
        if (seach == 'orderNo' & param[seach] !== '') {
            url += '&orderNo=' + param.orderNo
        }
        if (seach == 'orderType' & param[seach] !== '') {
            url += '&orderType=' + param.orderType
        }
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var contract = res.json().result.list;
        contract.link = param.link;
        dispatch(types.AFTER_SALES, contract);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const afterSalesApply = ({ dispatch }, param) => { //售后申请
    var ss = param.files;
    var img = ss.split(","); //字符串转化为数组
    img.toString();
    const body = {
        orderId: param.orderId,
        comment: param.comment,
        consignee: param.consignee,
        shipper: param.shipper,
        type: param.type,
        images: img
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.AFTER_SALES, param);
        }
    }, (res) => {
        console.log('fail');
    });
}

export const afterSalesRequest = ({ dispatch }, param) => { //售后申请(新版)
    param.loading = true;
    const body = {
        orderId: param.orderId,
        comment: param.comment,
        images: param.images,
        itemList: param.itemList,
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}

export const afterSalesFlow = ({ dispatch }, param) => { //售后（退/换货）审核/收货(新版)
    const body = {
        id: param.id,
        description: param.description,
        validate: param.validate
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        console.log('fail');
    });
}

export const afterSalesSend = ({ dispatch }, param) => { //售后（换货）发货(新版)
    const body = {
        id: param.id,
        images: param.images,
        validate: param.validate,
        logisticsInfo: param.logisticsInfo
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.link,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show = false;
        if (param.callback) {
            param.callback(res.json().msg);
        }

    }, (res) => {
        console.log('fail');
    });
}


export const contractEdit = ({ dispatch }, param) => { //合同编辑修改

    param.images = '';
    if (param.image_f) {
        param.images += param.image_f + ','
    }
    if (param.image_s) { param.images += param.image_s + ',' }
    if (param.image_t) { param.images += param.image_t }
    var ss = param.images;
    var img = ss.split(","); //字符串转化为数组
    img.toString();
    const body = {
        orderId: param.orderId,
        id: param.id,
        comment: param.comment,
        adjusted: param.adjusted,
        contractText: param.contractText,
        images: img
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.CONTRACT_LIST, param);
        }
    }, (res) => {
        console.log('fail');
    });
}
export const afterSalseEdit = ({ dispatch }, param) => { //售后编辑修改

    const body = {
        //orderId: param.orderId,
        id: param.id,
        comment: param.comment,
        images: param.images,
        itemList: param.itemList,
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.CONTRACT_LIST, param);
        }
    }, (res) => {
        console.log('fail');
    });
}

export const getReceiptDetail = ({ dispatch }, param) => { //合同、售后详情页面
    param.loading = true;
    var url = apiUrl.clientList + param.url + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var contract = res.json().result;
        contract.url = param.url;

        if (param.goods) { //表示需要编辑这条售后信息

            for (let i = 0; i < contract.itemList.length; i++) {
                let item = contract.itemList[i];
                let temp = {
                    goodsIndex: '',
                    id: item.goodsId,
                    itemId: item.id,
                    breedName: item.breedName,
                    unit: item.unit,
                    price: item.price,
                    number: item.number,
                    maxNumber: '',
                    type: item.type
                }
                param.goods.push(temp);
                param.goodsBack.push(temp);

            }
        }
        dispatch(types.SALES_DETAIL, contract);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const afterResend = ({ dispatch }, param) => { //售后重新发货
    param.images = '';
    if (param.image_f) {
        param.images += param.image_f + ','
    }
    if (param.image_s) { param.images += param.image_s + ',' }
    if (param.image_t) { param.images += param.image_t }
    /*var ss= param.images;
    var img = ss.split(",");//字符串转化为数组
    img.toString();*/
    const body = {
        afterSalesId: param.afterSalesId,
        orderId: param.orderId,
        way: param.way,
        validate: param.validate
    }
    if (param.images) {
        body.images = param.images;
    }
    if (param.number) {
        body.number = param.number;
    }
    if (param.name) {
        body.name = param.name;
    }
    if (param.code) {
        body.code = param.code;
    }
    if (param.logistics) {
        body.logistics = param.logistics;
    }
    if (param.driverName) {
        body.driverName = param.driverName;
    }
    if (param.driverPid) {
        body.driverPid = param.driverPid;
    }
    if (param.driverTel) {
        body.driverTel = param.driverTel;
    }
    if (param.vehicleNo) {
        body.vehicleNo = param.vehicleNo;
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.commonList + param.url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(res.json().msg);
        if (res.json().code == 200) {
            dispatch(types.AFTER_SALES, param);
        }
    }, (res) => {
        console.log('fail');
    });
}



export const getCustomerAddReport = ({ dispatch }, param) => { //客户新增统计

    var url = apiUrl.clientList + "/count/getCustomerAddReport?role=org";
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {


    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getEmailList = ({ dispatch }, param) => { //邮件列表

    var url = apiUrl.clientList + "/email/?page=" + param.cur + "&pageSize=15";
    if (param.emailNo) {
        url += "&emailNo=" + param.emailNo;
    }
    if (param.theme) {
        url += "&theme=" + param.theme;
    }
    if (param.sendNo) {
        url += "&sendNo=" + param.sendNo;
    }
    if (param.sendName) {
        url += "&sendName=" + param.sendName;
    }
    if (param.receiveNo) {
        url += "&receiveNo=" + param.receiveNo;
    }
    if (param.startTime) {
        url += "&startTime=" + param.startTime;
    }
    if (param.endTime) {
        url += "&endTime=" + param.endTime;
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        let list = res.json().result.list;

        for (let i = 0; i < list.length; i++) {
            list[i].show = false;
        }

        dispatch(types.EMAIL_DATA, list);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        localStorage.emailParam = JSON.stringify(param);

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getEmailDetail = ({ dispatch }, param) => { //获取邮件详情
    param.loading = true;
    var url = apiUrl.orderList + param.link + '/' + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var emailDetail = res.json().result;

        //dispatch(types.EMAIL_DETAIL, emailDetail);

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getEmailCount = ({ dispatch }, param) => { //邮件统计
    param.loading = true;
    var url = apiUrl.orderList + "/email/count";
    if (param.date) {
        url += "?date=" + param.date
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var emailCount = res.json().result;

        dispatch(types.EMAIL_COUNT, emailCount);

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const readDictionary = ({ dispatch }, param) => { //字典信息
    param.loading = true;

    var url = "/crm/api/v1/i18n/readMuDictionary/" + param.lang;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var jsonArr = res.json().result;
        if (jsonArr.length > 0) {
            let arr = [];
            for (let key in jsonArr[0].dictionary) {
                let temp = {
                    key: key,
                    zh_CN: jsonArr[0].dictionary[key],
                    en: "",
                    show: true
                }
                arr.push(temp);

            }

            jsonArr[0].arr = arr;
            jsonArr[0].isEdit = false;
            if (jsonArr.length > 1) {
                for (let i = 1; i < jsonArr.length; i++) { //遍历其他语言
                    for (let key in jsonArr[i].dictionary) { //遍历语言中的每一个键值对

                        for (let j = 0; j < jsonArr[0].arr.length; j++) { //jsonArr[0].arr
                            if (key === jsonArr[0].arr[j].key) {
                                jsonArr[0].arr[j].en = jsonArr[i].dictionary[key];
                                break;
                            }
                        }

                    }
                }
            }
        }

        dispatch(types.MUlT_DICTIONARY, jsonArr);
        param.loading = false;
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const readDictionaryBack = ({ dispatch }, param) => { //字典信息
    param.loading = true;

    var url = "/crm/api/v1/i18n/readMuDictionary/" + param.lang;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var jsonArr = res.json().result;
        for (let i = 0; i < jsonArr.length; i++) {
            let arr = [];
            for (let key in jsonArr[i].dictionary) {
                let temp = {
                    key: key,
                    value: jsonArr[i].dictionary[key],
                    show: true
                }
                arr.push(temp);
            }
            jsonArr[i].arr = arr;
            jsonArr[i].isEdit = false;
        }
        dispatch(types.MUlT_DICTIONARY, jsonArr);
        param.loading = false;
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const saveDictionary = ({ dispatch }, param) => { //保存字典
    var url = "/crm/api/v1/i18n/saveDictionary";
    var body = {
        fileName: param.fileName,
        dictionary: param.dictionary
    }
    Vue.http({
        method: 'POST',
        url: url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

    }, (res) => {
        console.log('fail');
    })
}

export const getStockList = ({ dispatch }, param) => {
    var url = '/crm/api/v1/stock/queryStockList/';
    var body = {
        page: param.cur,
        breedId: param.breedId,
        depotName: param.depotName,
        depotType: param.depotType,
        pageSize: 20
    };
    Vue.http({
        method: 'POST',
        url: url,
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        var data = res.json().result.list
        for (let i = 0; i < data.length; i++) {
            data[i].checked = false
        }
        dispatch(types.STOCK_LIST, data)
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

    }, (res) => {
        console.log('fail')
    })
}


export const importStock = ({ dispatch }, param) => { //excel导入社会库存
    param.loading = true;
    let data = new FormData();
    data.append('mFile', param.mFile);
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/stock/importByExcel',
        emulateJSON: false,
        emulateHTTP: false,
        body: data
    }).then((res) => {
        if (res.json().code == 1000) {
            param.success = 2;
            param.result = res.json().result;
        } else if (res.json().code == 200) {
            param.success = 1;
            param.result = '';
        } else {
            param.success = 3;
            param.result = res.json().msg;
        }

        if (param.callback) {
            param.callback();
        }
        param.loading = false;
    }, (res) => {
        console.log('fail')
    })
}

export const createStockInfo = ({ dispatch }, param) => { //新建库存
    var today = new Date();

    var canDeposite, canProcess, unitId, usableNum, specAttribute;
    unitId = parseInt(param.unit);
    canDeposite = parseInt(param.canDeposite);
    canProcess = parseInt(param.canProcess);
    usableNum = parseInt(param.usableNum);

    specAttribute = '{"' + param.breedName + '":{"规格":' + '"' + param.specAttribute + '"' + ',' + '"片型":' + '"' + param.shape + '"' + '}}';

    var body = {
        breedId: param.breedId,
        breedName: param.breedName,
        canDeposite: canDeposite,
        canProcess: canProcess,
        depotName: param.depotName,
        due_date: param.dueDate,
        employee: param.employeeId,
        location: param.location,
        unit_id: unitId,
        usableNum: usableNum,
        spec: param.specAttribute,
        shape: param.shape,
    };
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/stock/addStock',
        emulateJSON: false,
        emulateHTTP: false,
        body: body
    }).then((res) => {
        param.specAttribute = specAttribute
        param.callback({
            loading: false,
            breedName: "",
            breedId: '',
            depotName: '',
            depotType: '',
            cur: 1,
            all: 1,
            total: '',
            show: false
        })
        param.sCallBack(res.json().msg)
            //dispatch(types.ADD_STOCK_LIST, param);
            //window.location.reload()
    }, (res) => {
        console.log('fail')
    })
}

export const editStockInfo = ({ dispatch }, param) => { //修改库存
    var today = new Date();
    var canDeposite, canProcess, unitId, usableNum, specAttribute
    unitId = parseInt(param.unit)
    canDeposite = parseInt(param.canDeposite)
    canProcess = parseInt(param.canProcess)
    usableNum = parseInt(param.usableNum)
        //"2017-04-29 00:00:00"
        //specAttribute = '{"'+param.breedName+'":{"片型":'+'"'+param.specAttribute+'"'+','+'"规格":'+'"'+param.specification+'"'+'}}'

    //dueData = param.dueData.parse()
    var body = {
        id: param.id,
        breedName: param.breedName,
        breedId: param.breedId,
        canDeposite: canDeposite,
        canProcess: canProcess,
        depotName: param.depotName,
        due_date: param.dueDate,
        employee: param.employeeId,
        location: param.location,
        unit_id: unitId,
        shape: param.shape,
        usableNum: usableNum,
        spec: param.specAttribute
    };
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/stock/updateStock',
        body: body,
        emulateJSON: false,
        emulateHTTP: false,
        body: body
    }).then((res) => {
        param.callback({
            loading: false,
            breedName: "",
            breedId: '',
            depotName: '',
            depotType: '',
            cur: 1,
            all: 1,
            total: '',
            show: false
        })
        param.sCallBack(res.json().msg)
    }, (res) => {
        console.log('fail')
    })
}

export const deleteStockInfo = ({ dispatch }, param) => { //删除库存信息
    var body = {
        id: param.id
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/stock/deleteStock',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {

        dispatch(types.DELETE_STOCK_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const setLadderPrice = ({ dispatch }, param) => { //设置阶梯价格
    var ladder = {};
    var list = param.ladderPriceList
    for (var i = 0; i < list.length; i++) {
        ladder[list[i].minNumber] = list[i].ladder
    }
    var ladderStr = JSON.stringify(ladder)
    var body = {
        id: param.id,
        ladderPrice: ladderStr
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/stock/ladderPrice',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(param.freshData)
        param.priceCallback(res.json().msg)
    }, (res) => {
        console.log('fail');
    });

}

export const setQaStandard = ({ dispatch }, param) => { //设置药典是否合格
    var body = {
        id: param.ids,
        qa_standard: param.qa_standard
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/order/orderGoodsQaStandard',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(param)
    }, (res) => {
        console.log('fail');
    });
}

export const setQaSelf = ({ dispatch }, param) => { //设置内控是否合格
    var body = {
        id: param.ids,
        qa_self: param.qa_self
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/order/orderGoodsQaSelf',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(param)
    }, (res) => {
        console.log('fail');
    });
}

export const setSampleTraded = ({ dispatch }, param) => { //设置样品是否转为大货订单
    var body = {
        id: param.ids,
        sample_traded: param.sample_traded
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/order/orderGoodsSampleTraded',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(param)
    }, (res) => {
        console.log('fail');
    });
}

export const addBreedLocation = ({ dispatch }, param, breedId) => { //新增品种的产地
    var body = {
        locationId: param,
        breedId: breedId
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/breed/local/',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch('ADD_BREED_LOCAL', res.json().result)
    }, (res) => {
        console.log('fail');
    });
}

export const getSampleOrderCount = ({ dispatch }, param, data) => { //样品订单统计
    var body = {
        beginTime: '2015-01-01 00:00:00',
        endTime: new Date().toFormatString()
    }
    if (param.startTime) {
        body.beginTime = param.startTime
    }
    if (param.endTime) {
        body.endTime = param.endTime
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId
    }
    if (param.orgId) {
        body.orgId = param.orgId
    }
    if (param.locationId) {
        body.locationId = param.location.id
    }
    if (param.breedId) {
        body.breedId = param.breedId
    }
    if (param.sortNum) {
        body.sortValue = param.sortNum
    }
    if (data) {
        body.breedIds = data.ids
        body.locationId = data.locationId
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/orderCount/queryOrderSampleCount',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (data) {
            param.detailCallback(res.json().result.total)
            dispatch('SELECT_SAMPLEDETAIL', res.json().result.list)
        } else {
            param.callback(res.json().result.total)
            dispatch('SELECT_SAMPLECOUNT', res.json().result.list)
        }

    }, (res) => {
        console.log('fail');
    });
}

export const getMainOrderCount = ({ dispatch }, param, data) => { //大货订单统计
    var body = {
        beginTime: '2015-01-01 00:00:00',
        endTime: new Date().toFormatString()
    }

    if (param.startTime) {
        body.beginTime = param.startTime
    }
    if (param.endTime) {
        body.endTime = param.endTime
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId
    }
    if (param.orgId) {
        body.orgId = param.orgId
    }

    if (param.location) {
        body.locationId = param.location.id
    }
    if (param.breedId) {
        body.breedId = param.breedId
    }
    if (param.sortNum) {
        body.sortValue = param.sortNum
    }
    if (data) {
        body.breedIds = data.ids
        body.locationId = data.locationId
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/orderCount/queryOrderCount',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (data) {
            param.detailCallback(res.json().result.total)
            dispatch('SELECT_MAINORDERDETAIL', res.json().result.list)
        } else {
            param.callback(res.json().result.total)
            dispatch('SELECT_MAINORDERCOUNT', res.json().result.list)
        }

    }, (res) => {
        console.log('fail');
    });
}

export const getBreedCount = ({ dispatch }, param, data) => { //品种信息统计
    var body = {
        beginTime: '2015-01-01 00:00:00',
        endTime: new Date().toFormatString(),
    }

    if (param.startTime) {
        body.beginTime = param.startTime
    }
    if (param.endTime) {
        body.endTime = param.endTime
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId
    }
    if (param.orgId) {
        body.orgId = param.orgId
    }

    if (param.location) {
        body.locationId = param.location.id
    }
    if (param.breedId) {
        body.breedId = param.breedId
    }
    if (param.sortNum) {
        body.sortValue = param.sortNum
    }
    if (data) {
        body.breedIds = data.ids
        body.locationId = data.locationId
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/productCount/queryBreedCount',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        if (data) {
            param.detailCallback(res.json().result.total)
            dispatch('CHANGE_SENDBREEDCOUNT', res.json().result.list)
        } else {
            param.callback(res.json().result.total)
            dispatch('CHANGE_BREEDCOUNT', res.json().result.list)
        }

    }, (res) => {
        console.log('fail');
    });
}

export const getCustomerCount = ({ dispatch }, param) => { //客户信息统计
    param.loading = true;
    var body = {
        beginTime: param.beginTime,
        endTime: param.endTime,
    }
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    if (param.locationId) {
        body.locationId = param.locationId;
    }
    if (param.orgId) {
        body.orgId = param.orgId;
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId;
    }
    if (param.scale) {
        body.scale = param.scale;
    }
    if (param.paymentWay) {
        body.paymentWay = param.paymentWay;
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/queryCustomerCunt',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        let result = res.json().result;
        //列表信息
        dispatch('CUSTOMER_COUNT_LIST', result.list);
        //合计信息
        dispatch('CUSTOMER_COUNT_TOTAL', result.total);

    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}

export const getCustomerCountDetail = ({ dispatch }, param) => { //客户详情（点击产地）信息统计
    param.loading = true;
    var body = {
        beginTime: param.beginTime,
        endTime: param.endTime,
        locationId: param.locationId,
    }
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    if (param.orgId) {
        body.orgId = param.orgId;
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId;
    }
    if (param.scale) {
        body.scale = param.scale;
    }
    if (param.paymentWay) {
        body.paymentWay = param.paymentWay;
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/queryCustomer',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        let result = res.json().result;
        dispatch('CUSTOMER_COUNT_DETAIL_LIST', result.list);
        dispatch('CUSTOMER_COUNT_DETAIL_TOTAL', result.total);

    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}

export const getSupplierCount = ({ dispatch }, param) => { //供应商信息统计
    param.loading = true;
    var body = {
        beginTime: param.beginTime,
        endTime: param.endTime,
    }
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    if (param.locationId) {
        body.locationId = param.locationId;
    }
    if (param.orgId) {
        body.orgId = param.orgId;
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId;
    }
    if (param.scale) {
        body.scale = param.scale;
    }
    if (param.paymentWay) {
        body.paymentWay = param.paymentWay;
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/querySupplierCunt',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        let result = res.json().result;
        //列表信息
        dispatch('SUPPLIER_COUNT_LIST', result.list);
        //合计信息
        dispatch('SUPPLIER_COUNT_TOTAL', result.total);

    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}

export const getSupplierCountDetail = ({ dispatch }, param) => { //供应商详情（点击产地）信息统计
    param.loading = true;
    var body = {
        beginTime: param.beginTime,
        endTime: param.endTime,
        locationId: param.locationId,
    }
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    if (param.orgId) {
        body.orgId = param.orgId;
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId;
    }
    if (param.scale) {
        body.scale = param.scale;
    }
    if (param.paymentWay) {
        body.paymentWay = param.paymentWay;
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/count/querySupplier',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        let result = res.json().result;

        dispatch('SUPPLIER_COUNT_DETAIL_LIST', result.list);
        dispatch('SUPPLIER_COUNT_DETAIL_TOTAL', result.total);

    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}

export const getLogisticsCount = ({ dispatch }, param) => { //物流（运费）信息统计
    param.loading = true;
    var body = {
        beginTime: param.beginTime,
        endTime: param.endTime,
    }
    if (param.breedId) {
        body.breedId = param.breedId;
    }
    if (param.locationId) {
        body.locationId = param.locationId;
    }
    if (param.orgId) {
        body.orgId = param.orgId;
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId;
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/orderCount/queryFreightCount',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        let result = res.json().result;
        //列表信息
        dispatch('LOGISTICS_COUNT_LIST', result.list);
        //合计信息
        dispatch('LOGISTICS_COUNT_TOTAL', result.total);

    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}


export const getCancelRecord = ({ dispatch }, param, data) => { //取消报价统计
    var body = {
        page: param.cur,
        pageSize: 15
    }

    if (param.startTime) {
        body.startTime = param.startTime
    }
    if (param.endTime) {
        body.endTime = param.endTime
    }
    if (param.employeeId) {
        body.employee = param.employeeId
    }
    if (param.breedName) {
        body.breedName = param.breedName
    }

    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/intention/queryNotOfferList',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch('CHANGE_CANCELRECORD', res.json().result.list)
        param.total = res.json().result.total
        param.all = res.json().result.pages
    }, (res) => {
        console.log('fail');
    });
}

export const getBillList = ({ dispatch }, param, data) => { //收付费信息统计
    var body = {
        beginTime: '2015-01-01 00:00:00',
        endTime: new Date().toFormatString(),
    }

    if (param.startTime) {
        body.beginTime = param.startTime
    }
    if (param.endTime) {
        body.endTime = param.endTime
    }
    if (param.employeeId) {
        body.employeeId = param.employeeId
    }
    if (param.orgId) {
        body.orgId = param.orgId
    }

    if (param.location) {
        body.locationId = param.location.id
    }
    if (param.breedId) {
        body.breedId = param.breedId
    }
    if (param.intl) {
        body.intl = param.intl
    }
    if (param.type) {
        body.type = param.type
    }
    if (param.sortNum) {
        body.sortValue = param.sortNum
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/orderCount/queryPayMoneyCount',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch("CHANGE_BILLLIST", res.json().result.list)
        param.callback(res.json().result.total)
    }, (res) => {
        console.log('fail');
    });
}

export const setClientTop = ({ dispatch }, param, data) => { //客户置顶
    var body = {
        id: param.id,
        sort: param.sortNum
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/customer/sort',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.callback(data)
    }, (res) => {
        console.log('fail');
    });
}

export const getFeedbackList = ({ dispatch }, data) => {
    let body = {
        biz_module: 'userSuggestService',
        biz_method: 'querySuggestList',
        biz_param: {
            pn: data.pn,
            pSize: data.pSize,
            phone: data.phone,
            //id:data.id,
            sign: data.sign,
            operator: data.operator,
            name: data.name
        }
    }
    httpService.commonPOST(body)
        .then((res) => {
            data.total = res.biz_result.total
            data.all = res.biz_result.pages
            dispatch('USER_FEEDBACK_INFO', res.biz_result.list)
        }, (error) => {
            console.log(error)
        })
}

export const handleFeedbackInfo = ({ dispatch }, data) => {
    let body = {
        biz_module: 'userSuggestService',
        biz_method: 'addPushSuggestResponse',
        biz_param: {
            suggestId: data.suggestId,
            message: data.message
        }
    }
    httpService.commonPOST(body)
        .then((res) => {
            data.callback(res)
            console.log(res)

        }, (error) => {
            console.log(error)
        })
}

export const transferPurchaseOrder = ({ dispatch }, data) => {
    let body = {
        biz_module: 'erpIndentService',
        biz_method: 'indentTransfer',
        biz_param: {
            ids: data.ids,
            offerOrgs: data.offerOrgs
        }
    }
    httpService.commonPOST(body)
        .then((res) => {
            data.callback(res.msg)
        }, (error) => {
            data.callback(res.msg)
        })
}

export const openOfferPdf = ({ dispatch }, data) => {
    var body = {
        id: data.id
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/indent/downPDF',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        data.callback(res.json().result)
    }, (res) => {
        console.log('fail');
    });
}

export const getMyOfferList = ({ dispatch }, data) => { //采购单报价专区中查看我的报价
    var body = {
        indentId: data.id,
        breedId: data.breedId
    }
    Vue.http({
        method: 'POST',
        url: '/crm/api/v1/intention/offer/queryMyOffer2Indent',
        body: body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        dispatch('DETAIL_MYOFFER_LIST', res.json().result.list)
    }, (res) => {
        console.log('fail');
    });
}

export const handleOfferAudit = ({ dispatch }, data) => {
    let body = {
        biz_module: 'erpIntentionOfferService',
        biz_method: 'offerValidate',
        biz_param: {
            ids: data.auditIds,
            validate: data.validate,
            validateDescription: data.comment
        }
    }
    httpService.commonPOST(body)
        .then((res) => {
            console.log(res)
            data.callback(res.msg)
        }, (error) => {
            data.callback(res.msg)
        })
}

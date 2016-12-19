import Vue from 'vue'
import * as types from './mutation-types'
import apiUrl from './api/api'

export const increment = ({ dispatch }) => dispatch(types.INCREMENT)
export const decrement = ({ dispatch }) => dispatch(types.DECREMENT)
export const menuBar = ({ dispatch }) => dispatch(types.MENU_BAR)

export const login = ({ dispatch }, data) => { //登录
    console.log(data);
    const body = {
        no: data.no,
        password: data.password
    }
    console.log(body);
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + '/employee/login',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('登录成功');
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
            var result = res.json().result;
            result.time = lastTime;

            var loginInfo={
                id:result.id,
                name:result.name,
                no:result.no,
                orgId:result.orgid,
                time:result.time,
                privilege:result.privilege
            }

            dispatch(types.LOGIN_DATA, loginInfo);
            dispatch(types.INIT_LIST, result);
            //本地存储左侧菜单
            console.log(result.menus);
            for (var i in result.menus) {
                result.menus[i].show = false;
            }
            localStorage.menus = JSON.stringify(result.menus);


            data.loginCallback();
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
export const resetPawd = ({ dispatch }, data) => { //修改密码
    console.log(data);
    const body = {
        no: data.no,
        newPwd: data.newPwd,
        oldPwd: data.oldPwd
    }
    console.log(body);
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
        console.log(res.json())
        dispatch(types.PASSWORD_DATA, data);
        if(res.json().code==200){
           data.callback(res.json().msg);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const initList = ({ dispatch }) => {
    Vue.http.get(apiUrl.list)
        .then((res) => {
            console.log('目录结构');
            console.log(res.data);
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

        //localStorage.BacklogParam = JSON.stringify(param);

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
        taskId:param.taskId,
        result:param.result,
        description:param.auditComment
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
        if(param.callback){
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
        if (key == 'consignee' && param[key] != '') {
            url += '&consignee=' + param[key];
        }
        if (key == 'clients' && param[key] != '') {
            url += '&clients=' + param[key];
        }
        if (key == 'no' && param[key] != '') {
            url += '&orderNo=' + param[key];
        }
        if (key == 'ctime' && param[key] != '') {
            url += '&startTime=' + param[key];
        }
        if (key == 'ftime' && param[key] != '') {
            url += '&endTime=' + param[key];
        }
        if (key == 'mode' && param[key] != '') {
            url += '&mode=' + param[key];
        }
        if (key == 'dataStatus' && param[key] != '') {
            url += '&dataStatus=' + param[key];
        }
        if (key == 'orderStatus' && param[key] != '') {
            url += '&orderStatus=' + param[key];
        }
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

        //localStorage.allOrderList = JSON.stringify(orderList);
        localStorage.allOrderParam = JSON.stringify(param);

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

export const getRolloutList = ({ dispatch }, param) => { //药款转出记录列表以及订单搜索
    param.loading = true;
    var url = apiUrl.orderList + param.link + '?page=' + param.cur + '&pageSize=15';
    if(param.bank&&param.bank!=""){
         url += '&bank=' + param.bank;
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
    console.log(param)
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
        console.log("操作成功")
        console.log(res.json().result)
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
        if(param.type==1){
            localStorage.sellOrderCheckParam = JSON.stringify(param);  
        }
        if(param.type==0){
            localStorage.purchaseOrderCheckParam = JSON.stringify(param);  
        }
          

    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getEmpolyeeOrder = ({ dispatch }, param) => { //业务员的订单(我的订单)列表
    console.log(param)
        //console.log(param.link)
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
        if (key == 'no' && param[key] != '') {
            body.orderNo = param[key];
        }
        if (key == 'ctime' && param[key] != '') {
            body.startTime = param[key];
        }
        if (key == 'ftime' && param[key] != '') {
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
        console.log('订单查询成功')
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
    console.log(param)
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
        if (key == 'ctime' && param[key] != '') {
            body.startTime = param[key];
        }
        if (key == 'ftime' && param[key] != '') {
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
        console.log(res.json().result)
        var orderList = res.json().result.list;
        console.log(orderList)
        for (var i in orderList) {
            orderList[i].checked = false;
            orderList[i].show = false;
        }
        console.log('订单查询成功')
        orderList.key = param.key;
        dispatch(types.ORDER_TABLE, orderList);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        console.log(param.cur)
        param.loading = false;

        localStorage.orgOrderParam = JSON.stringify(param);
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
        param.callback(res.json().msg);
        param.show = false;
        param.description = "";
        data.index = param.index;
        data.key = param.key;
        data.validate = 1;
        if(res.json().code==200){
           dispatch(types.ORG_ORDER_AUDIT, data);
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
        param.callback(res.json().msg);
        param.show = false;
        param.description = "";
        data.index = param.index;
        data.key = param.key;
        data.validate = 1;
        if(res.json().code==200){
           dispatch(types.ORG_ORDER_AUDIT, data);
        }
        
    }, (res) => {
        console.log('fail');
    })
}

export const orderOrgAudit = ({ dispatch }, param) => { //订单部门主管审核（单个）
    const data = {
        id: param.id,
        validate:param.validate
    }
    if (param.auditComment) {
        data.description = param.auditComment;
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
        data.index = param.index;
        data.key = param.key;
        data.validate = param.validate;
        if(res.json().code==200){
           dispatch(types.ORG_ORDER_AUDIT, data);
        }
        
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
    console.log(OrgOrderdata);
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
        if(res.json().code==200){
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
    console.log(param)
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
    console.log(data.goods);
    if(data.city==null||data.city==''||!data.city){
        data.city=''; 
    }
    if(data.district==null||data.district==''||!data.district){
       data.district=''; 
    }
    const body = {
        type: data.type,
        sourceType: data.sourceType,
        sample: data.sample,
        intl: data.intl,
        customer: data.customer,
        customerName: data.customerName,
        incidentals: data.incidentals,
        incidentalsDesc: data.incidentalsDesc,
        preferential: data.preferential,
        preferentialDesc: data.preferentialDesc,
        currency: data.currency,
        zipCode: data.zipCode,
        country: data.country,
        province: data.province,
        city: data.city,
        employee: data.employee,
        org: data.org,
        district: data.district,
        consigneeAddr:data.country+' '+data.province+' '+data.city+' '+data.district+' '+data.consigneeAddr,
        comments: data.comments,
        orderStatus: data.orderStatus,
        goods: data.goods
    }
    if (data.email) {
        body.email = data.email;
    }
    if(data.consignee==''){
        body.consignee = data.customerName;
    }else{
       body.consignee = data.consignee; 
    }
    if(data.consigneePhone==''){
        body.consigneePhone = data.customerPhone;
    }else{
        body.consigneePhone = data.consigneePhone;
    }
    console.log(body);
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
        data.no = res.json().result.no;
        data.id = res.json().result.id;
        data.clients = res.json().result.clients;
        data.payWay = res.json().result.payWay;
        data.validate = res.json().result.validate;
        data.checked = false;
        data.sample = res.json().result.sample;
        data.goodsDesc = res.json().result.goodsDesc;
        data.total = res.json().result.total;
        data.ctime = new Date();
        data.consignee = res.json().result.consignee;
        data.consigneePhone = res.json().result.consigneePhone;
        data.consigneeAddr = res.json().result.consigneeAddr;
        data.mode = 3;
        if(res.json().code==200){
           dispatch(types.ORDER_ADD_DATA, data);
        }
        
        data.show = false;
    }, (res) => {
        console.log('fail');
        data.show = false;
    });
}
export const alterOrder = ({ dispatch }, param) => { //修改订单
    console.log(param);
    if(param.city==null||param.city==''||!param.city){
           param.city=''; 
    }
    if(param.district==null||param.district==''||!param.district){
       param.district=''; 
    }
    const body = {
        type: param.type,
        id: param.id,
        sourceType: param.sourceType,
        sample: param.sample,
        intl: param.intl,
        customer: param.customer,
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
        district: param.district,
        customerName: param.customerName,
        consigneeAddr:param.country +' '+param.province+' '+param.city+' '+param.district+' '+param.consigneeAddr,
        comments: param.comments,
        goods: param.goods
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
        param.consigneeAddr =res.json().result.consigneeAddr;
        if(res.json().code==200){
          dispatch(types.ORDER_UPDATE_DATA, param);
        }
        

    }, (res) => {
        console.log('fail');
        param.show = false;
    });
}

export const uploadDocument = ({ dispatch }, param) => { //新建订单详情各个凭证
    console.log(param)
    if (param.titles == "上传支付凭证") {
        if (param.image_f) {
            param.payPics += param.image_f + ','
        }
        if (param.image_s) { param.payPics += param.image_s + ',' }
        if (param.image_t) { param.payPics += param.image_t };
        console.log(param.payPics)
    }
    if (param.titles == "上传附件凭证") {
        if (param.image_f) {
            param.attachFiles += param.image_f + ','
        }
        if (param.image_s) { param.attachFiles += param.image_s + ',' }
        if (param.image_t) { param.attachFiles += param.image_t };
        console.log(param.attachFiles)
    }
    if (param.titles == "上传物流凭证") {
        if (param.image_f) {
            param.sendPics += param.image_f + ','
        }
        if (param.image_s) { param.sendPics += param.image_s + ',' }
        if (param.image_t) { param.sendPics += param.image_t };
        console.log(param.sendPics)
    }

    const body = {
        orderId: param.orderId,
        description: param.description,
        fileType: param.fileType,
        bizType: param.bizType
    }
    if (param.payPics) {
        body.payPics = param.payPics;
    }
    if (param.sendPics) {
        body.sendPics = param.sendPics;
    }
    if (param.attachFiles) {
        body.attachFiles = param.attachFiles;
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
        console.log('添加成功')
        dispatch(types.ORDER_UPLOAD_DATA, param);
        param.show = false;
    }, (res) => {
        console.log('fail');
        param.show = false;
    });
}

export const dividedPayment = ({ dispatch }, param) => { //新建订单付款分期
    console.log(param)
    const stages = [];
    for(var i=0;i< param.stages.length;i++){
        var temp = {};
        temp = {
            id:param.stages[i].id,
            amount:param.stages[i].amount,
            comment:param.stages[i].comment,
            creater:param.stages[i].creater,
            description:param.stages[i].description,
            orderId:param.stages[i].orderId,
            orderStatus:param.stages[i].orderStatus,
            ratio:param.stages[i].ratio,
            status:param.stages[i].status,
            type:param.stages[i].type,
            validate:param.stages[i].validate
        };
        stages.push(temp);

    }
    const body = {
        id: param.id,
        stages:stages
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
        console.log('添加成功')
        param.callback(res.json().msg);
        for(var i in res.json().result){
            param.stages[i].type = res.json().result[i].type;
            param.stages[i].ctime = res.json().result[i].ctime;
            param.stages[i].validate = res.json().result[i].validate;
        }
        if(res.json().code==200){
            dispatch(types.ORDER_UPLOAD_DATA, param);
        }
    }, (res) => {
        console.log('fail'); 
    });
}

export const paymentAudit = ({ dispatch }, param) => { //订单分期审核
    console.log(param)
    param.images = '';
    if (param.image_f) {
        param.images += param.image_f + ','
    }
    if (param.image_s) { param.images += param.image_s + ',' }
    if (param.image_t) { param.images += param.image_t }
    var ss= param.images;
    var sss = ss.split(",");//字符串转化为数组
    sss.toString();
    console.log(sss)
    const body = {};
    if(param.id&&param.id!=''){
        body.id = param.id;
    }
    if(param.validate&&param.validate!=''){
        body.validate = param.validate;
    }
    if(param.description&&param.description!=''){
        body.description = param.description;
    }
    if(param.comment&&param.comment!=''){
        body.comment = param.comment;
    }
    if(param.payNumber&&param.payNumber!=''){
        body.payNumber = param.payNumber;
    }
    if(param.bizSubId&&param.bizSubId!=''){
        body.bizSubId = param.bizSubId;
    }
    if(param.payUserName&&param.payUserName!=''){
        body.payUserName = param.payUserName;
    }
    if(param.payWay&&param.payWay!=''){
        body.payWay = param.payWay;
    }
    if(param.bizId&&param.bizId!=''){
        body.bizId = param.bizId;
    }
    if(param.payName&&param.payName!=''){
        body.payName = param.payName;
    }
    if(param.paySubName&&param.paySubName!=''){
        body.paySubName = param.paySubName;
    }
    if (param.images) {
        body.images = sss;
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
        if(res.json().msg=='已申请审核'){
            param.validate = 1;
            dispatch(types.ORDER_UPLOAD_DATA, param);
        }
        if(param.titles=='分期审核'){
            dispatch(types.FINANCE_LIST, param);
        }
        
    }, (res) => {
        console.log('fail'); 
    });
}

export const orderStatu = ({ dispatch }, param) => { //订单状态详情
    console.log(param)
    console.log("orderStatu");
    param.images = '';
    if (param.image_f) {
        param.images += param.image_f + ','
    }
    if (param.image_s) { param.images += param.image_s + ',' }
    if (param.image_t) { param.images += param.image_t };
    const body = {
        orderId: param.id
    }
    if (param.images) {
        body.images = param.images;
    }
    if (param.b) {
        var strs = param.b.split(",");
        param.lcompanyId = strs[0];
        body.lcompanyId = param.lcompanyId;
    }
    if (param.b) {
        var strs = param.b.split(",");
        param.name = strs[1];
        body.name = param.name;
    }
    if (param.lcompanyNo) {
        body.lcompanyNo = param.lcompanyNo;
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
        console.log('订单已处理')
        var status = res.json().result;
        status.link = param.link;
        status.key = param.key;
        param.callback(res.json().msg);
        if(res.json().code==200){
           dispatch(types.ORDER_STATUS, status);
        }
       
    }, (res) => {
        console.log('fail');
    })
}

export const orderCancle = ({ dispatch }, param, data) => { //订单取消状态
    console.log(param)
    console.log(data);
    console.log("orderCancle");
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
        console.log('订单取消成功')
        param.show = false;
        data.show = false;
        var status = res.json().result;
        status.key = param.key;
        dispatch(types.ORDER_STATUS, status);
    }, (res) => {
        console.log('fail');
    })
}

export const yankuanPayorder = ({ dispatch }, param, undelinePay) => { //订单支付状态
    console.log(param)
    console.log(undelinePay)
    console.log("yankuanPayorder");
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
        console.log('支付成功')
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
    param.loading =true;
    Vue.http({
        method: 'GET',
        url: apiUrl.orderList + '/order/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
         var orderDetail = res.json().result;
         console.log(orderDetail)
        if(param.key=='orderDetail'){
            var goods = orderDetail.goods; 
            if (!goods) {
                goods = [];
            }
            orderDetail.goods = {};
            orderDetail.goods.arr = goods;
            orderDetail.goods.show = true;
            for (var i in orderDetail.goods.arr) {
                orderDetail.goods.arr[i].show = false;
            }
            var payPics = orderDetail.payPics;
            if (!payPics) {
                payPics = [];
            }
            orderDetail.payPics = {};
            orderDetail.payPics.arr = payPics;
            orderDetail.payPics.show = true;
            for (var i in orderDetail.payPics.arr) {
                orderDetail.payPics.arr[i].show = false;
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
            var stages = orderDetail.stages;
            orderDetail.stages = {};
            orderDetail.stages.arr = stages;
            orderDetail.stages.show = true;
            for (var i in orderDetail.stages.arr) {
                orderDetail.stages.arr[i].show = false;
            }
        }
        if(param.key=='myOrderList'||param.key=='orgOrderList'||param.key=='allOrderList'||param.key=='sellOrderList'){
            orderDetail.goods.forEach(function(item) {
                var temp = {
                    id: item.id,
                    breedId: item.breedId,
                    breedName: item.breedName,
                    quality: item.quality,
                    title:item.title,
                    location: item.location,
                    spec: item.spec,
                    number: item.number,
                    unit: item.unit,
                    price: item.price,
                    status:item.status,
                    sourceType:item.sourceType,
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
        console.log(res.json().result)
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getSystemSearch = ({ dispatch }, param) => { //搜索枚举类型
    console.log(param)
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
    console.log(data)
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
        console.log('添加成功')
        data.callback(res.json().msg);
        data.id = res.json().result.id;
        if(res.json().code==200){
           dispatch(types.ADD_DATA, data);
        }
        
    }, (res) => {
        console.log('fail');
    });
};
export const updateDataInfo = ({ dispatch }, param) => { //修改枚举信息
    console.log(param)
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
        if(res.json().code==200){
           dispatch(types.UPDATE_DATA, param);
        }
       
        console.log('修改成功')
    }, (res) => {
        console.log('fail');
    });
};

export const deleteShowStatue = ({ dispatch }, param) => { //删除枚举
    console.log(param)
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
        console.log('删除成功')
        dispatch(types.DELETE_SHOW_STATUE, param);
    }, (res) => {
        console.log('fail');
    });
};

export const getProvinceData = ({ dispatch }, param) => { //省市区列表
    console.log(param);
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
        dispatch(types.COUNTRY_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        if (param.country) {
            for (var i in res.json().result) {
                if (res.json().result[i].cname == param.country) {
                    const object = {
                        id: res.json().result[i].id,
                        province: param.province,
                        city: param.city,
                        loading: false
                    }
                    console.log(object);
                    return getProvinceList({ dispatch }, object);
                }
            }
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
        dispatch(types.PROVINCE_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        if (param.province) {
            for (var i in res.json().result) {
                if (res.json().result[i].cname == param.province) {
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
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/city/?page=' + param.cur + '&pageSize=15&province=' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        dispatch(types.CITY_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        if (param.city) {
            for (var i in res.json().result) {
                if (res.json().result[i].cname == param.city) {
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
    console.log(param)
    param.loading = true;
    Vue.http({
        method: "GET",
        url: apiUrl.clientList + '/company/query?type=&name=&city=&category=&province=&transform=&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        console.log(res.json());
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
    console.log(url);
    console.log(param);
    for (var key in param) {
        if (key == 'conType' && param[key] !== '') {
            url += '&type=' + param.conType
        } else if (key == 'conType') {
            url += '&type='
        }
        if (key == 'conName' && param[key] !== '') {
            url += '&name=' + param.conName
        } else if (key == 'conName') {
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
    console.log(url);
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        console.log(obj)
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
    console.log(param)
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
        console.log('修改成功')
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
        console.log('修改成功')
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
        console.log('删除成功')
        dispatch(types.DELETE_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}


export const createContact = ({ dispatch }, param) => { //新增企业联系人
    console.log(param)
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
        console.log('联系人添加成功')
        console.log(res);
        param.id = res.json().result.id;
        dispatch(types.ADD_CONTACT_DATA, param)
    }, (res) => {
        console.log('fail');
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
        console.log(obj)
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
export const getBreedDetail = ({ dispatch }, param) => { //获取药材详情
    Vue.http({
        method: 'GET',
        url: apiUrl.breedList + '/details/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        param.loading = false;
        var breed = res.json().result;
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
        console.log(breed);
        dispatch(types.BREED_DETAIL_DATA, breed);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}

export const getBreedNameSearch = ({ dispatch }, param) => { //药材搜索
    param.loading = true;
    console.log(param)
    var breedUrl = apiUrl.breedList + '/' + '?&page=' + param.cur + '&pageSize=15';
    if (param.categoryId) {
        breedUrl +='&category=' + param.categoryId;
    }
    if (param.name) {
        breedUrl +='&breedName=' + param.name;
    }
    if (param.eName) {
        breedUrl +='&eName=' + param.eName;
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
        icon: data.path,
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
        console.log('添加成功')
        data.id = res.json().result.id;
        console.log(data);
        data.callback(res.json().msg);
        if(res.json().code==200){
           dispatch(types.ADD_BREED_DATA, data);
        }
        
    }, (res) => {
        console.log('fail');
    });
}

export const createSpec = ({ dispatch }, param, id) => { //新增药材相关
    console.log(param.url)
    const data1 = {
        name: param.name,
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
        console.log('添加成功')
        param.callback(res.json().msg);
        param.id = res.json().result.id;
        param.breedId = id;
        if(res.json().code==200){
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
        console.log('别名添加成功')
        param.id = res.json().result.id;
        param.breedId = id;
        dispatch(types.ADDSPEC_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const updateBreedInfo = ({ dispatch }, param) => { //修改药材信息
    console.log(param)
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
    console.log(updatedata);
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
        console.log('修改成功')
        if(param.callback){
            param.callback(res.json().msg);
        }
        if(res.json().code==200){
            dispatch(types.UPDATE_BREED_DATA, param);
        }
        
    }, (res) => {
        console.log('fail');
    })
}
export const alterSpec = ({ dispatch }, param) => { //修改药材相关
    console.log(param);
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
        console.log('修改成功')
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
        console.log('修改成功')
        dispatch(types.UPDATE_SPEC_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const specDel = ({ dispatch }, param) => { //删除药材相关信息
    console.log(param)
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
        console.log('删除成功')
        dispatch(types.DELETE_SPECS_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const getClientList = ({ dispatch }, param) => { //客户信息列表与搜索
    param.loading = true;
    console.log(param);

    var clienturl = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    for (var search in param) {
        if (search == 'name' && param[search] !== '' && param[search] != 'undefined') {
            clienturl += '&name=' + param.name
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

        if(param.link=="/customer/employeeDistributed"){
            localStorage.myClientParam = JSON.stringify(param);
        }
        if(param.link=="/customer/orgDistributed"){
            localStorage.orgClientParam = JSON.stringify(param);
        }
        if(param.link=="/customer/"&&!param.blacklist){
            localStorage.allClientParam = JSON.stringify(param);
        }
        if(param.link=="/customer/"&&param.blacklist){
            localStorage.blackClientParam = JSON.stringify(param);
        }
        if(param.link=="/customer/undistributed"){
            localStorage.unClientParam = JSON.stringify(param);
        }
        if(param.link=="/customer/suppliers"){
            localStorage.supplyClientParam = JSON.stringify(param);
        }
        
        
        
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getCallRecordList = ({ dispatch }, param) => { //客户通话记录列表与搜索
    param.loading = true;
    console.log(param);
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

export const getUserTypeList = ({ dispatch }, param) => { //客户类型
    param.loading = true;
    console.log(param);
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
    console.log(param);
    var clienturl = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    if (param.name) {
        clienturl = clienturl + '&name=' + param.name;
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
        }
        dispatch(types.PRODUCT_DATA, product)
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
        if(param.link == '/customer/product'){
            localStorage.productParam = JSON.stringify(param);
        }
        if(param.link == '/customer/product/file'){
            localStorage.productFileParam = JSON.stringify(param);
        }
        
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}
export const getProductDetail = ({ dispatch }, param) => { //获取供应商产品详情
    console.log(param)
    param.loading = true;
    console.log(param)
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
    console.log(param);
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
    console.log(param);
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

export const customerTransferBlacklist = ({ dispatch }, param) => {    //客户转供应商,拉黑,移出黑名单
    param.loading = true;
    console.log(param);
    const data = {};
    if (param.link == '/customer/transferBlacklist') {
        data.blackComments = param.blackComments;
        data.customerIds = param.customerIds;
        data.blacklist = param.blacklist;
    } else if (param.link == '/customer/setSupplier') {
        data.customerIds = param.customerIds;
        data.supplier = 1;
        data.comments = param.blackComments;
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
        if(param.callback){
            param.callback(res.json().msg);
        }
    }, (res) => {
        param.loading = false;
        console.log('fail');
    });
}



export const getEmployeeList = ({ dispatch }, param) => { //员工列表以及搜索
    console.log(param)
    param.loading = true;
    var apiurl = apiUrl.clientList + '/employee/?' + '&page=' + param.cur + '&pageSize=14';
    /*var apiurl = apiUrl.employeeList+'/?'+'&page=' + param.cur + '&pageSize=14';*/
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

export const getRoleList = ({ dispatch }, param) => { //获取角色列表
    console.log(param)
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
        console.log('获取角色成功')
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
    console.log('新增客户');
    console.log(data);
    console.log(data.supplier);
    const Cdata = {
        "name": data.name,
        "type": data.type,
        "tel": data.tel,
        //"typeDesc": data.typeDesc,
        "classify": data.classify,
        "email": data.email,
        "userId": data.userId,
        "companyId": data.companyId,
        "number": data.number,
        "category": data.category,
        "principal": data.principal,
        "bizScope": data.bizScope,
        "province": data.province,
        "city": data.city,
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
    if (data.supplier==1) {
        Cdata.supplier = data.supplier;
    }
    console.log(Cdata);
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
        if(data.callback){
            data.callback(res.json().msg);
        }
        if(res.json().msg=='success'){
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
        if(res.json().code==200){
            dispatch(types.CUSTOMER_ADD_DATA, data);
        }
    }, (res) => {
        console.log('fail');
    })
}
export const deleteInfo = ({ dispatch }, param) => { //删除客户、药材信息
    console.log(param)
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
        console.log('删除成功')
        dispatch(types.DELETE_BREED_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}
export const alterInfo = ({ dispatch }, param) => { //修改客户信息
    console.log(param)
    const data = {
        name: param.name,
        type: param.type,
        category: param.category,
        typeDesc: param.type,
        classifyDesc: param.classify,
        classify: param.classify,
        principal: param.principal,
        bizScope: param.bizScope,
        mainPhone: param.mainPhone,
        email: param.email,
        province: param.province,
        country: param.country,
        city: param.city,
        address: param.address,
        comments: param.comments,
        id: param.id,
        orgId: param.orgId,
        employeeId: param.employeeId,
        creditLevel: param.creditLevel,
        cityName: param.cityName,
        countryName: param.countryName,
        provinceName: param.provinceName
    }
    if (param.supplier) {
        data.supplier = param.supplier;
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
        console.log('修改成功') 
        if(param.callback){
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
    console.log(param);

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
        console.log('修改成功')
        dispatch(types.UPDATE_CUSTOMER_DETAIL, param);
    }, (res) => {
        console.log('fail');
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
        street: param.street,
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
        console.log('修改成功')
        dispatch(types.UPDATE_ADDR_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterRemark = ({ dispatch }, param) => { //修改客户备注
    console.log(param)
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
        console.log('修改成功')
        dispatch(types.UPDATE_LABEL_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterLabel = ({ dispatch }, param) => { //修改客户标签
    console.log(param)
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
        console.log('修改成功')
        dispatch(types.UPDATE_LABEL_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterProduct = ({ dispatch }, param) => { //修改客户产品
    console.log(param);
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
        console.log('修改成功')
        dispatch(types.UPDATE_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const updateProduct = ({ dispatch }, param) => { //修改供应商产品
    /*console.log(param)*/
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
        comments:param.comments,
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
        console.log('修改成功')
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
export const createCustomer = ({ dispatch }, param) => { //新增客户相关联系人
    console.log(param.main)
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
        console.log('添加成功')
        param.id = res.json().result.id;
        dispatch(types.CUSTOMER_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createAddress = ({ dispatch }, param) => { //新增客户地址
    console.log(param.url)
    const data1 = {
        "type": param.type,
        "contactName": param.contactName,
        "contactPhone": param.contactPhone,
        "sex": param.sex,
        "country": param.country,
        "province": param.province,
        "city": param.city,
        "district": param.district,
        "street": param.street,
        'detailAddr': param.detailAddr,
        "address": param.address,
        "customerId": param.customerId
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
        console.log('添加成功')
        param.id = res.json().result.id;
        dispatch(types.ADD_ADDR_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createLabel = ({ dispatch }, param) => { //新增客户标签
    console.log(param)
    const data1 = {
        "label": param.label,
        "status": param.status,
        "customerId": param.customerId
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
        console.log('添加成功')
        param.id = res.json().result.id;
        dispatch(types.ADD_LABEL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createRemark = ({ dispatch }, param) => { //新增客户备注
    console.log(param)
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
        console.log('添加成功')
        param.id = res.json().result.id;
        dispatch(types.ADD_LABEL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createProduct = ({ dispatch }, param) => { //新增客户产品
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
        console.log('添加成功')
        param.id = res.json().result.id;
        dispatch(types.ADD_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const newProduct = ({ dispatch }, param) => { //新增供应商产品
    console.log(param);
    return;
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
        console.log('添加成功')
        dispatch(types.SUPPLY_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const addrDel = ({ dispatch }, param) => { //删除客户收货地址
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
        console.log('删除成功')
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
        console.log('划转业务员成功')
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
        console.log('划转部门成功')
        dispatch(types.CUSTOMER_TRANSFER, param);
        param.callback(res.json().msg);
    }, (res) => {
        console.log('fail');
    });
}

export const getIntentionList = ({ dispatch }, param) => { //意向信息列表以及搜索
    param.loading = true;
    console.log(param);
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    for (var search in param) {
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
        if (search == 'invoic' && param[search] !== '') {
            url += '&invoic=' + param.invoic
        } 
        if (search == 'validate' && param[search] !== '') {
            url += '&validate=' + param.validate
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
        if (search == 'location' && param[search] !== '') {
            url += '&location=' + param.location
        }
        if (search == 'customerPhone' && param[search] !== '') {
            url += '&customerPhone=' + param.customerPhone
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
        console.log('意向搜索成功');
        console.log();
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

        if(param.link == "/intention/user/list"){
            localStorage.userIntentionParam = JSON.stringify(param);
        }
        if(param.link == "/intention/employee/list"){
            localStorage.myIntentionParam = JSON.stringify(param);
        }
        if(param.link == "/intention/org/list"){
            localStorage.orgIntentionParam = JSON.stringify(param);
        }
        if(param.link == "/intention/resource/list"){
            localStorage.potentialIntentionParam = JSON.stringify(param);
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
        console.log(intent);
        dispatch(types.SUPPLY_DEMAND_DATA, intent);
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getIntentionDetail = ({ dispatch }, param) => { //意向详情
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
        if (res.json().result.pics[0]) {
            param.image_f = res.json().result.pics[0].path;
            param.image_f_show = res.json().result.pics[0].url;
        }
        if (res.json().result.pics[1]) {
            param.image_s = res.json().result.pics[1].path;
            param.image_s_show = res.json().result.pics[1].url;
        }
        if (res.json().result.pics[2]) {
            param.image_t = res.json().result.pics[2].path;
            param.image_t_show = res.json().result.pics[2].url;
        }
        // console.log(param);

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getOfferList = ({ dispatch }, param) => { //报价信息列表以及搜索
    param.loading = true;
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    if ('fullname' in param && param.fullname !== '') {
        url += '&fullname=' + param.fullname
    }
    if ('breedName' in param && param.breedName !== '') {
        url += '&breedName=' + param.breedName
    }
    if ('userPhone' in param && param.userPhone !== '') {
        url += '&userPhone=' + param.userPhone
    }
    if ('spec' in param && param.spec !== '') {
        url += '&spec=' + param.spec
    }
    if ('startTime' in param && param.startTime !== '') {
        url += '&startTime=' + param.startTime
    }
    if ('endTime' in param && param.endTime !== '') {
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
        if(param.link == "/intention/employee/offers"){
            localStorage.myOfferParam = JSON.stringify(param);
        }
        if(param.link == "/intention/org/offers"){
            localStorage.orgOfferParam = JSON.stringify(param);
        }
        
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
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
        dispatch(types.MSG_LIST_DATA, msg);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        localStorage.msgParam = JSON.stringify(param);
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
    console.log(data);
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
        console.log('修改成功')
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
    console.log(param);
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    if (param.breedName !== '') {
        url += '&names=' + param.breedName;
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
        console.log('国际意向搜索成功');
        var intent = res.json().result.list;
        intent.key = param.key;
        dispatch(types.INTLINTENTION_LIST_DATA, intent);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;

        if(param.link == "/intlIntention/by/employee"){
            localStorage.myIntlIntentionParam = JSON.stringify(param);
        }
        if(param.link == "/intlIntention/"){
            localStorage.orgIntlIntentionParam = JSON.stringify(param);
        }
       
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getEmpIntlIntentionList = ({ dispatch }, param) => { //业务员国际意向列表以及搜索
    param.loading = true;
    console.log(param);
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
        console.log('国际意向搜索成功');
        var intent = res.json().result.list;
        /*for (var i in intent){
             intent[i].checked = false;
             intent[i].show =false;
        }*/
        console.log(intent);
        dispatch(types.INTLINTENTION_LIST_DATA, intent);
        param.all = res.json().result.pages;
        param.total = res.json().result.total;
        param.loading = false;
        console.log(param);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getIntlIntentionDetail = ({ dispatch }, param) => { //按ID查询国际意向详情
    param.loading = true;
    console.log(param);
    var url = apiUrl.clientList + '/intlIntention/' + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        console.log('国际意向搜索成功');
        var intent = res.json().result;
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
                    status: item.status
                }
                param.items.push(temp);
                param.itemsBack.push(temp);
            })
            param.pack = intent.pack,
            param.duedate = intent.duedate,
            console.log(intent.items);
            dispatch(types.INTLINTENTION_DETAIL_DATA, intent);
        }

        if (param.key == "intentionDetail") { //意向详情页时

            var inquires = intent.inquires;
            intent.inquires = {};
            intent.inquires.arr = inquires;
            intent.inquires.show = false;

            var offers = intent.offers;
            intent.offers = {};
            intent.offers.arr = offers;
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

            var items = intent.items;
            intent.items = {};
            intent.items.arr = items;
            intent.items.show = false;


            dispatch(types.INTLINTENTION_DETAIL_DATA, intent);
        }
        if (param.key == 'orderList') {
            /*param.goods = intent.items;*/
            intent.items.forEach(function(item) {
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
                    sourceType: 1
                }
                param.goods.push(temp);
            })
        }

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const createIntlIntention = ({ dispatch }, param) => { //新增国际意向

    const data = {
        customerId: param.customerId,
        customerName: param.customerName,
        customerPhone:param.customerPhone,
        customerEmail: param.customerEmail,
        country: param.country,
        province: param.province,
        city: param.city,
        district: param.district,
        address: param.address,
        duedate: param.duedate,
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
        console.log(res.json());
        if(param.callback){
            param.callback(res.json().msg);
        }
        var object = res.json().result;
        object.especial = 0;
        object.advance = 1;
        object.inquireTime = 0;
        object.offerTime = 0;
        object.validate = 0;
        object.inquire = 0;
        if(res.json().code==200){
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
        console.log('修改成功!!!!');
        if(param.callback){
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
    console.log(param);
    var url = apiUrl.clientList + param.link + '?&page=' + param.cur + '&pageSize=15';
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        console.log('国际意向询价搜索成功');
        var inquire = res.json().result.list;
        console.log(inquire);
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
    console.log(param.link);
    var url = apiUrl.clientList + param.link + param.id;

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        console.log('国际意向询价详情');
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
    console.log(param.link);
    var url = apiUrl.clientList + param.link + '?id=' + param.id;
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        console.log('国际意向条目历史记录');
        var itemHistory = res.json().result;
        console.log(itemHistory);

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
    console.log(param.inquireTime);
    const data = {
        intentionId: param.intentionId,
        inquireType: param.inquireType,
        comment: param.comment
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
        console.log('询价成功')
        if(param.callback){
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
    console.log(param);
    console.log(param.inquireTime);
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
        console.log('取消成功')
            /*param.id=res.json().result.intentionId;
            param.validate = 0;
            param.checked = false;*/
        param.show = false;
        param.inquire = 0;
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
        console.log('询价成功');
        /*param.id=res.json().result.intentionId;
        param.validate = 0;
        param.checked = false;*/
        param.show = false;
        dispatch(types.ITEM_INQUIRE, param);
    }, (res) => {
        console.log('fail');
    })
}

export const intlIntentionOffer = ({ dispatch }, param) => { //国际意向原材料报价
    param.total = param.price * param.number;
    console.log(param);
    const data = {
        id: param.id,
        intentionId: param.intentionId,
        inquireId: param.inquireId,
        type: param.type,
        currency: param.currency,
        itemId: param.itemId,
        itemName: param.itemName,
        origPrice: param.origPrice,
        price: param.price,
        number: param.number,
        unit: param.unit,
        total: param.total,
        comment: param.comment
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
        console.log('原材料报价成功')
        if(param.callback){
            param.callback(res.json().msg);
        }
        if(res.json().code==200){
            dispatch(types.ORIGIN_OFFER_DATA, param);
        }
        ;
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
        console.log('其他报价成功');
        if(param.callback){
            param.callback(res.json().msg);
        }
        param.id = res.json().result.id;
        if(res.json().code==200){
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
        console.log('删除其他报价成功!!!!')

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
        if(param.callback){
            param.callback(res.json().msg);
        }
        if(res.json().code==200){
            dispatch(types.CONFIRM_OFFER, param);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const uploadIntlIntentionFiles = ({ dispatch }, param) => { //上传国际意向文件
    console.log(param);

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
        if(param.callback){
            param.callback(res.json().msg);
        }
        param.show = false;
        var file = res.json().result;
        if(res.json().code==200){
            dispatch(types.UPLOAD_INTL_INTENT_FILE, file);
        }
        
    }, (res) => {
        console.log('fail');
    })
}

export const delIntlIntentionFiles = ({ dispatch }, param) => { //删除国际意向文件
    console.log(param);

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
        console.log('删除意向文件成功');
        param.show = false;
        var file = res.json().result;
        dispatch(types.DEL_INTL_INTENT_FILE, param);
    }, (res) => {
        console.log('fail');
    })
}

export const getUserList = ({ dispatch }, param) => { //会员信息列表
    param.loading = true;
    console.log(param);
    var url = apiUrl.userList + '/user/?' + '&page=' + param.cur + '&pageSize=15';
    for (var key in param) {
        if (key == 'phone' && param[key] !== '') {
            url += '&phone=' + param[key];
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
    }

    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        console.log(res.json().result)
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
    }, (res) => {        console.log('fail');

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

export const getUserDetail = ({ dispatch }, param) => { //会员详情
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
        console.log(userDetail);
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

        var intention = userDetail.intention;
        userDetail.intention = {};
        userDetail.intention.show = false;
        userDetail.intention.checked = false;
        userDetail.intention.arr = intention;

        var tracking = userDetail.tracking;
        userDetail.tracking = {};
        userDetail.tracking.show = false;
        userDetail.tracking.arr = tracking;

        userDetail.personalAuthShow = false;
        userDetail.companyAuthShow = false;
        for (var i in userDetail) {
            param[i] = userDetail[i];
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
    console.log(param);
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
    console.log(updatedata);

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
        console.log(updatedata);
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

    console.log(updatedata);
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
        console.log('会员意向审核成功');
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
        console.log('资质证书添加成功')
        dispatch(types.ADD_CERTIFICATE_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const uploadFiles = ({ dispatch }, param) => { //客户文件上传
    console.log('文件上传');
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
        console.log('文件添加成功')
        param.id = res.json().result.id;
        dispatch(types.ADD_FILES_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}


export const createEmploy = ({ dispatch }, param) => { //新增员工信息
    console.log(param);
    if (param.entrydate) {
        console.log('dadda');
        param.entrydate = param.entrydate.split(' ')[0] + ' 00:00:00';
    }
    if (param.leavedate) {
        param.leavedate = param.leavedate.split(' ')[0] + ' 00:00:00';
    }
    const data1 = {
        "name": param.name,
        "ename": param.ename,
        "no": param.no,
        "orgName": param.orgName,
        'position': param.position,
        "mobile": param.mobile,
        "extno": param.extno,
        "leave": param.leave,
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
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功');
        param.leave = 1;
        param.callback(res.json().msg);
        if(res.json().code==200){
            dispatch(types.ADD_EMPLOYEE_DATA, param);
        }
        
    }, (res) => {
        console.log('fail');
    })
}

export const updateEmploy = ({ dispatch }, param) => { //修改员工信息
    console.log(param)
    if (param.entrydate) {
        console.log('dadda');
        param.entrydate = param.entrydate.split(' ')[0] + ' 00:00:00';
    }
    if (param.leavedate) {
        param.leavedate = param.leavedate.split(' ')[0] + ' 00:00:00';
    }
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
        entrydate: param.entrydate,
        leavedate: param.leavedate,
        orgid: param.orgid,
        orgcode: param.orgcode,
        privilege: param.privilege
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
        console.log('修改成功')
        param.callback(res.json().msg);
        if(res.json().code==200){
            dispatch(types.UPDATE_EMPLOY_DATA, param);
        }
    }, (res) => {
        console.log('fail');
    })
}

export const editintentInfo = ({ dispatch }, param, tipParam) => { //修改意向
    param.images = '';
    if (param.image_f) { param.images += param.image_f + ',' }
    if (param.image_s) { param.images += param.image_s + ',' }
    if (param.image_t) { param.images += param.image_t };
    const data1 = {
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
        "sampling": param.sampling,
        "sampleNumber": param.sampleNumber,
        "sampleUnit": param.sampleUnit,
        "sampleAmount": param.sampleAmount,
        "breedId": param.breedId,
        "country": param.country,
        "quality": param.quality,
        "price": param.price,
        "province": param.province,
        "onSell": param.onSell,
        "city": param.city,
        "district": param.district,
        "location": param.location,
        "number": param.number,
        "quality": param.quality,
        "duedate": param.duedate,
        "images": param.images
    }
    Vue.http({
        method: "PUT",
        url: apiUrl.clientList + '/intention/',
        emulateHTTP: false,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功!!!!')
        param.show = false;
        param.ctime = param.ctime;
        param.callback(res.json().msg);
        if(res.json().code==200){
            dispatch(types.UPDATA_INTENTION_DATA, param);
        }
        
    }, (res) => {
        console.log('fail');
    })
}

export const createIntentionInfo = ({ dispatch }, param, tipParam) => { //新增意向
    console.log(param);
    if (!param.images) {
        param.images = '';
    }
    if (param.image_f) { param.images += param.image_f + ',' }
    if (param.image_s) { param.images += param.image_s + ',' }
    if (param.image_t) { param.images += param.image_t };
    var today = new Date();
    const data1 = {
        "userId": param.userId,
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
        "sampling": param.sampling,
        "sampleNumber": param.sampleNumber,
        "sampleUnit": param.sampleUnit,
        "sampleAmount": param.sampleAmount,
        "breedId": param.breedId,
        "country": param.country,
        "quality": param.quality,
        "price": param.price,
        "province": param.province,
        "city": param.city,
        "district": param.district,
        "location": param.location,
        "number": param.number,
        "quality": param.quality,
        "duedate": param.duedate,
        "images": param.images,
        "inType": param.inType,
        "validate": param.validate

    }
    console.log(data1);
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
        console.log('添加成功')
        if(param.callback){
            console.log("有回调函数");
            param.callback(res.json().msg);
        } 
        param.id = res.json().result.intentionId;
        param.checked = false;
        param.show = false;
        param.ctime = today.toLocaleDateString();
        if(res.json().code==200){
             dispatch(types.INTENTION_DATA, param);
        }
       
    }, (res) => {
        console.log('fail');
    })
}

export const intentionUpAndDown = ({ dispatch }, param) => { //意向上下架
    console.log(param);
    const updatedata = {
        ids: param.ids,
        onSell: param.onSell
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
        console.log('修改成功');
        console.log(param);
        dispatch(types.INTENTION_UP_DOWN, param);
        param.show = true;
    }, (res) => {
        console.log('fail');
    })
}

export const updateTrackingInfo = ({ dispatch }, param) => { //修改跟进信息
    console.log(param);

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
        console.log('修改成功');
        console.log(param);
        dispatch(types.UPDATE_TRACKING_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const createTrackingInfo = ({ dispatch }, param) => { //添加跟进信息

    console.log(param.flag);

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
        console.log('添加成功')
        param.id = res.json().result.id;
        dispatch(types.ADD_TRACKING_DATA, param);
    }, (res) => {
        console.log('fail');
        console.log(param)
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
        console.log('查询成功')
        console.log(res.json());
        var identify = res.json().result;
        dispatch(types.IDENTIFY_DATA, identify);
    }, (res) => {
        console.log('fail');
    })
}


export const baseGetData = ({ dispatch }, param) => { //查询权限

    Vue.http({
        method: 'GET',
        url: apiUrl.base + param.url + '?page=' + param.cur,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        console.log(param);
        console.log('查询成功！')
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
        console.log(json);
        dispatch(types.ABSTRACT_GET_DATA, json);

        localStorage.scopeList = JSON.stringify(json);
        localStorage.scopeParam = JSON.stringify(param);

    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const baseAddData = ({ dispatch }, param) => { //新增权限

    Vue.http({
        method: 'POST',
        url: apiUrl.base + param.url,
        body: param.body,
        emulateHTTP: true,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('新增成功')
        console.log(res.json());
        if (res.json().result.id) param.body.id = res.json().result.id;
        param.body.utime = param.utime;
        param.body.show = false;
        let json = {
            name: param.keyName,
            body: param.body
        }
        param.loading = false;
        param.show = false;
        dispatch(types.ABSTRACT_ADD_DATA, json);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const baseUpdateData = ({ dispatch }, param) => { //修改权限
    console.log(param.body);
    Vue.http({
        method: 'PUT',
        url: apiUrl.base + param.url,
        body: param.body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        console.log(res.json());
        param.body.utime = param.utime;
        let json = {
            name: param.keyName,
            body: param.body,
            index: param.index
        }
        param.loading = false;
        param.show = false;
        dispatch(types.ABSTRACT_UPDATE_DATA, json);
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
        console.log('删除成功')
        console.log(res.json());
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
        url: apiUrl.clientList +'/sys/enum/units',
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
        url: apiUrl.clientList +'/sys/enum/currency',
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        var obj = res.json().result;
        dispatch(types.CURRENCY_LIST,obj);
    }, (res) => {
        console.log('fail');
    })
}

/*---我的客户统计---*/
export const getClientcount = ({ dispatch }, param) => { //我的客户统计
    if(param) param.loading= true;
    var countUrl = apiUrl.clientList +'/count/getCustomerAdd?role=emp';
    if(param.employeeId){
        countUrl +=  '&employeeId=' + param.employeeId
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
        console.log(res.json().result)
        var clientCount = res.json().result;
        dispatch(types.MY_CLIENT_COUNT, clientCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}
export const getClientOrgcount = ({ dispatch }, param) => { //部门客户统计
    if(param) param.loading= true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList +param.link,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        console.log(res.json().result)
        var clientCount = res.json().result;
        
        
        dispatch(types.MY_CLIENT_COUNT, clientCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const getOrderCount = ({ dispatch }, param) => { //我的订单统计(交易统计)
    if(param) param.loading= true;
    var url = apiUrl.clientList +param.link +'?';
    if(param.focus&&param.focus!==''){
        url += "&focus=" + param.focus;
    }
    if(param.employeeId&&param.employeeId!==''){
        url += "&employeeId=" + param.employeeId;
    }
    if(param.orgId&&param.orgId!==''){
        url += "&orgId=" + param.orgId;
    }
    if(param.objType&&param.objType!==''){
        url += "&objType=" + param.objType;
    }
    if(param.objId&&param.objId!==''){
        url += "&objId=" + param.objId;
    }


    Vue.http({
        method: 'GET',
        url: url ,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        console.log(res.json().result)
        var orderCount = res.json().result;
        orderCount.key = param.key;
        dispatch(types.MY_ORDER_COUNT, orderCount);
    }, (res) => {
        param.loading = false;
        console.log('fail');
    })
}

export const getTimeOrderCount = ({ dispatch }, param) => { //我的订单统计(时间维度:日周月季年)
    if(param) param.loading= true;
    var url = apiUrl.clientList +param.link +'?';
    if(param.timeType&&param.timeType!==''){
        url += "&timeType=" + param.timeType;
    }
    if(param.objType&&param.objType!==''){
        url += "&objType=" + param.objType;
    }
    if(param.objId&&param.objId!==''){
        url += "&objId=" + param.objId;
    }
    
    Vue.http({
        method: 'GET',
        url: url ,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.loading = false;
        console.log(res.json().result)
        var orderCount = res.json().result;
        
        dispatch(types.MY_TIME_ORDER_COUNT, orderCount);
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
    var apiurl = apiUrl.commonList + '/sample/'+param.id;
    Vue.http({
        method: 'GET',
        url: apiurl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;

        console.log(obj)
        if(param.key=='sampleDetail'){
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
            dispatch(types.SAMPLE_DETAIL,obj);
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
                    status:item.status,
                    description:item.description
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
            dispatch(types.SAMPLE_DETAIL,obj);
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
       /* if (seach == 'orgCode' && param[seach] !== '') {
            apiurl += '&orgCode=' + param.orgCode
        }*/
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
    console.log(data);
    const body = {
       customerName:data.customerName,
       customerPhone:data.customerPhone,
       customer:data.customer,
       currency:data.currency,
       total:data.total,
       comments:data.comments,
       employee:data.employee,
       country:data.country,
       province:data.province,
       city:data.city,
       district:data.district,
       items:data.items
    }
    if(data.address==''&&data.province){
        body.address = data.country+','+data.province+','+data.city+','+data.district
    }else{
        body.address = data.country+' '+data.city+' '+data.address
    }
    if(data.consignee=='') {
        body.consignee = data.customerName;
    }else{
        body.consignee = data.consignee;
    }
    if(data.consigneePhone==''){
        body.consigneePhone = data.customerPhone
    }else{
        body.consigneePhone = data.consigneePhone;
    }
    console.log(body);
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
        console.log('添加成功')
        data.callback(res.json().msg);
        data.validate = res.json().result.validate;
        data.ctime = new Date();
        data.sampleDesc = res.json().result.sampleDesc;
        data.address = res.json().result.address;
        data.consigneePhone = res.json().result.consigneePhone;
        data.consignee = res.json().result.consignee;
        data.id = res.json().result.id;
        if(res.json().code==200){
            dispatch(types.ADD_SAMPLE, data);
        }
        
        data.show = false;
    }, (res) => {
        console.log('fail');
    });
}
export const alterSample = ({ dispatch }, param) => { //修改寄样申请
    console.log(param);
    const body = {
       id: param.id,
       customerName:param.customerName,
       customerPhone:param.customerPhone,
       customer:param.customer,
       currency:param.currency,
       total:param.total,
       employee:param.employee,
       country:param.country,
       province:param.province,
       comments:param.comments,
       city:param.city,
       district:param.district,
       status:param.status,
       items:param.items
    }
    if(param.address==''){
        body.address = param.country+','+param.province+','+param.city+','+param.district
    }
    if(param.consignee=='') {
        body.consignee = param.customerName;
    }else{
        body.consignee = param.consignee;
    }
    if(param.consigneePhone==''){
        body.consigneePhone = param.customerPhone
    }else{
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
        console.log('修改成功')
        param.callback(res.json().msg);
        param.send = false;
        param.address = res.json().result.address;
        if(res.json().code==200){
            dispatch(types.UPDATE_SAMPLE, param);
        }
       
    }, (res) => {
        console.log('fail');
        param.send = false;
    });
}
export const deleteData = ({ dispatch }, param) => { //删除客户、药材信息
    console.log(param)
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
        console.log('删除成功')
        dispatch(types.DELETE_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}
export const sampleApply = ({ dispatch }, param) => { //申请/审核 寄样申请
    console.log(param);
    const body = {
        id:param.id,
        description:param.auditComment,
        validate:param.validate
    }
    console.log(body);
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
        console.log('添加成功')
        param.callback(res.json().msg);
        param.validate= res.json().result.validate; 
        param.description=res.json().result.description;
        if(res.json().code==200){
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
        if (seach == 'validate' && param[seach] !== ''){
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
        if (seach == 'validate' && param[seach] !== ''){
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
export const getFundDetail = ({ dispatch }, param) => { //获取供应商产品详情
    console.log(param)
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/fund/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        param.loading = false;
        var product = res.json().result;
        dispatch(types.FUND_DETAIL_DATA, product);
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
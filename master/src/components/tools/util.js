/*
 * @Author: huili.sun
 * @Date:   2017-03-03 14:45:00
 * @Last Modified by:   huili.sun
 * @Last Modified time: 2017-03-03 14:45:05
 */

'use strict';

var util = {
    add: accAdd,
    sub: subtr,
    mul: accMul,
    div: accDiv,
    getDate: getDate,
    getMonday: getMonday,
    dateFormat: dateFormat,
    deepCopy: deepCopy
}

//加法 
function accAdd(arg1, arg2) {
    let r1, r2, m;
    if (!arg1) {
        arg1 = 0;
    }
    if (!arg2) {
        arg2 = 0;
    }
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));

    return (arg1 * m + arg2 * m) / m;
}
//减法 
function subtr(arg1, arg2) {
    let r1, r2, m, n;
    if (!arg1) {
        arg1 = 0;
    }
    if (!arg2) {
        arg2 = 0;
    }
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//乘法 
function accMul(arg1, arg2) {
    if (!arg1) {
        arg1 = 0;
    }
    if (!arg2) {
        arg2 = 0;
    }
    let m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {

    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {

    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//除法
function accDiv(arg1, arg2) {
    let t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {

    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {

    }

    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return accMul((r1 / r2), pow(10, t2 - t1));

}
//获取今日(距离今天days天)时间
function getDate(days) {
    let now = new Date();
    let today = now.toLocaleDateString();
    let realDate = new Date(Date.parse(today) + days * 86400000);

    let year = realDate.getFullYear();
    let month = realDate.getMonth() + 1;
    let day = realDate.getDate();
    let hour = realDate.getHours();
    let minute = realDate.getMinutes();
    let second = realDate.getSeconds();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }

    let realDateStr = year + "-" + month + "-" + day + " 00:00:00";

    return realDateStr;
}

//获取本周的第一天(星期一)的时间
function getMonday() {
    let now = new Date();
    let week = now.getDay();
    if (week != 0) { //如果week!=0
        return getDate(1 - week);
    } else {
        return getDate(-6);
    }
}

//时间格式化,date表示需要被格式化的时间字符串,dateSign表示日期分隔符,timeSign表示时分秒分割符
function dateFormat(date, dateSign, timeSign) {
    let arr = date.split(" ");
    let dateStr = "";
    let timeStr = "";
    let year = "1970";
    let month = "01";
    let day = "01";
    let hour = "00";
    let minute = "00";
    let second = "00";
    let formatStr = "1970";
    let pattern = new RegExp("[-\/._~:*,]", "g");
    if (arr.length >= 1) {
        dateStr = arr[0];
        let dateArr = dateStr.split(pattern);
        year = dateArr[0];
        month = dateArr[1];
        day = dateArr[2];
    }
    if (arr.length > 1) {
        timeStr = arr[1];
        let timeArr = timeStr.split(pattern);
        hour = timeArr[0];
        minute = timeArr[1];
        second = timeArr[2];
    }
    return year + dateSign + month + dateSign + day + " " + hour + timeSign + minute + timeSign + second;

}


//对象深克隆,将source克隆到target
function deepCopy(target, source) {
    let _this = this;
    for (var key in source) {
        //&& !(source[key] instanceof Array)
        if (typeof source[key] === 'object') {
            target[key] = _this.deepCopy(source[key], target[key]);
        } else {
            target[key] = source[key];
        }

    }

    return target;
}

module.exports = util;

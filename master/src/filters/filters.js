import Vue from 'vue'

Vue.filter('categorystate', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return '' + val;
    }
});

Vue.filter('telstate', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return '' + val;
    }
});

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
    console.log('It is not a string!')
}

Vue.filter('specFilter_a', function(data) { //过滤规格
    if (data && isJSON(data)) {
        data = JSON.parse(data)
        for (var key in data) {
            return data[key]['规格']
        }
    } else {
        return data
    }
})

Vue.filter('specFilter_b', function(data) { //过滤片形
    if (data) {
        data = JSON.parse(data)
        for (var key in data) {
            return data[key]['片型']
        }
    }
})

Vue.filter('Sample', function(val) { //是否样品
    var val = val;
    if (val == 0) {
        return this.$t('static.no');
    } else if (val == 1) {
        return this.$t('static.yes');
    } else {
        return val;
    }
});

Vue.filter('payMent', function(val) {
    var val = val;
    if (val == 0) {
        return '付款';
    } else if (val == 1) {
        return '收款'
    } else {
        return val;
    }
});

Vue.filter('bizType', function(val, bizType, type) {
    var val = val;
    var type = type;
    var bizType = bizType;
    if (val == 'order' && type == 0) {
        return '付款订单';
    } else if (val == 'order' && type == 1) {
        return '收款订单';
    } else if (bizType == 'order_after_sales_refund') {
        return '售后退款订单';
    } else if (bizType == 'order_refund') {
        return '补充合同退款订单';
    } else if (bizType == 'order_cancel_refund') {
        return '取消订单退款';
    } else {
        return val;
    }
});
Vue.filter('enbizType', function(val, bizType, type) {
    var val = val;
    var type = type;
    var bizType = bizType;
    if (val == 'order' && type == 0) {
        return 'Payment order';
    } else if (val == 'order' && type == 1) {
        return 'Receipt order';
    } else if (bizType == 'order_after_sales_refund') {
        return 'Refund for aftersales changes'
    } else if (bizType == 'order_refund') {
        return 'Refund for order changes'
    } else if (bizType == 'order_cancel_refund') {
        return 'Refund for order cancel';
    } else {
        return val;
    }
});

Vue.filter('assess', function(val, type, logistic, name, taskKey) { //订单状态判断
    var val = val;
    var type = type;
    var logistic = logistic;
    var taskKey = taskKey;
    var name = name;
    if (name == null) {
        name = '';
    } else {
        name = name;
    }
    if (val == 60 && logistic == 2) {
        return '已发货';
    } else if (val == 60 && logistic == 3) {
        return '质量检验'
    } else if (val == 60 && logistic == 40) {
        return '已完成订单（质量合格）'
    } else if (val == 60 && logistic == 50) {
        return '已完成订单（补充合同申请）'
    } else if (val == 60 && logistic == 60) {
        return '已完成订单（售后处理中）'
    } else if (val == 10) {
        return '订单处理中'
    } else if (val == 20) {
        return '等待支付'
    } else if (val == 30) {
        return '等待审核'
    } else if (val == 40 && taskKey == 'order_send_warehouse_validate') {
        return '等待' + name + '发货'
    } else if (val == 40 && taskKey == 'order_send_governor_validate') {
        return '等待' + name + '审核'
    } else if (val == 40 && (taskKey !== 'order_send_governor_validate' || taskKey == 'order_send_governor_validate')) {
        return '等待发货'
    } else if (val == 50) {
        return '等待收货'
    } else if (val == -1) {
        return '已取消订单'
    } else if (val == -2) {
        return '已过期订单'
    } else {
        return '';
    }
});
Vue.filter('Enassess', function(val, type, logistic, name, taskKey) { //订单状态判断英文展示
    var val = val;
    var type = type;
    var logistic = logistic;
    var name = name;
    var taskKey = taskKey;
    if (name == null) {
        name = '';
    } else {
        name = name;
    }
    if (val == 60 && logistic == 2) {
        return 'Awaiting comment';
    } else if (val == 60 && logistic == 3) {
        return 'Awaiting comment'
    } else if (val == 60 && logistic == 40) {
        return 'Lost communication'
    } else if (val == 60 && logistic == 50) {
        return 'Awaiting comment（Secondary contract）'
    } else if (val == 60 && logistic == 60) {
        return 'Awaiting comment（Aftersales changes）'
    } else if (val == 10) {
        return 'Order review'
    } else if (val == 20) {
        return 'Processing with payment'
    } else if (val == 30) {
        return 'Bulk order phas'
    } else if (val == 40 && taskKey == 'order_send_warehouse_validate') {
        return 'Payment received' + name
    } else if (val == 40 && taskKey == 'order_send_governor_validate') {
        return 'Bulk order phas' + name
    } else if (val == 40 && (taskKey !== 'order_send_governor_validate' || taskKey == 'order_send_governor_validate')) {
        return 'Bulk order phas'
    } else if (val == 50) {
        return 'Follow up order'
    } else if (val == -1) {
        return 'Order canceled'
    } else if (val == -2) {
        return 'Order Expired'
    } else {
        return '';
    }
});
Vue.filter('numberstate', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return val;
    }
});
Vue.filter('leaveTime', function(val) {
    var val = val;
    if (val == 1) {
        return '在职';
    } else if (val == 0) {
        return '离职';
    } else {
        return val;
    }
});

Vue.filter('orderDescript', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == 0) {
        return this.$t('static.after_making_the_order');
    } else if (val == 10) {
        return this.$t('static.after_making_the_order');
    } else if (val == 20) {
        return this.$t('static.signing_contract');
    } else if (val == 30) {
        return this.$t('static.signing_contract');
    } else if (val == 40) {
        return this.$t('static.signing_contract');
    } else if (val == 50) {
        return this.$t('static.after_delivery');
    } else if (val == 60) {
        return this.$t('static.confirm_receipt');
    } else if (val == 70) {
        return this.$t('static.order_over');
    } else {
        return val;
    }
});

Vue.filter('iconstate', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return '' + val;
    }
});
Vue.filter('isostate', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return val;
    }
});

Vue.filter('systemcode', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == "") {
        return '无';
    } else {
        return val;
    }
});
Vue.filter('systemtype', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return val;
    }
});
Vue.filter('systemdesc', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == "") {
        return '无';
    } else {
        return val;
    }
});

Vue.filter('breedcode', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return val;
    }
})

Vue.filter('categorycode', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return val;
    }
})

Vue.filter('catestate', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return val;
    }
})

Vue.filter('employeestate', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else {
        return val;
    }
})

Vue.filter('qualify', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == "") {
        return '无';
    } else {
        return val;
    }
})
Vue.filter('codestate', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == "") {
        return '无';
    } else {
        return val;
    }
})
Vue.filter('entry', function(val) {
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == "") {
        return '无';
    } else {
        return val;
    }

})
Vue.filter('levelstate', function(val) { //等级
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == "") {
        return '无';
    } else {
        return val;
    }
})
Vue.filter('chanceType', function(val) { //机会类型
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == 1) {
        return '供应';
    } else if (val == 0) {
        return '求购';
    }
})
Vue.filter('chanceEspec', function(val) { //机会类型
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == 0) {
        return '普通';
    } else if (val == 1) {
        return '特殊';
    }
})
Vue.filter('intlstata', function(val) { //是否国际
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == 0) {
        return '国内';
    } else if (val == 1) {
        return '国际';
    }
})

Vue.filter('coa', function(val) { //检测报告
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == 0) {
        return '无';
    } else if (val == 1) {
        return '有';
    }
})
Vue.filter('visitstate', function(val) { //是否上门看货
    var val = val;
    if (val == null) {
        return '无';
    } else if (val == 0) {
        return '不会';
    } else if (val == 1) {
        return '会';
    }
})
Vue.filter('invoicstate', function(val) { //发票
    var val = val;
    if (val == null) {
        return '无发票';
    } else if (val == 0) {
        return '无发票';
    } else if (val == 1) {
        return '普通发票';
    } else if (val == 2) {
        return '增值发票';
    }
})
Vue.filter('advanced', function(val) { //预付比例
    var val = val;
    if (val == null) {
        return 'None';
    } else if (val == 0) {
        return 'None';
    } else {
        val = val * 100;
        return val + "%";
    }

    /*else if (val == 1) {
        return '100%';
    } else if (val == 0.1) {
        return '10%';
    } else if (val == 0.2) {
        return '20%';
    } else if (val == 0.3) {
        return '30%';
    } else if (val == 0.4) {
        return '40%';
    } else if (val == 0.5) {
        return '50%';
    } else if (val == 0.6) {
        return '60%';
    } else if (val == 0.7) {
        return '70%';
    } else if (val == 0.8) {
        return '80%';
    } else if (val == 0.9) {
        return '90%';
    }*/
})
Vue.filter('status', function(val) { //业务机会状态
    var val = val;
    if (val == null) {
        return '不确定';
    } else if (val == 0) {
        return '待审';
    } else if (val == 1) {
        return '通过';
    }
})
Vue.filter('country', function(val) { //国家
    var val = val;
    if (val == null) {
        return '未说明';
    } else {
        return val;
    }
})
Vue.filter('customerType', function(val) { //客户类型
    var val = val;
    if (val == 0) {
        return '其他';
    } else if (val == 1) {
        return '合作社';
    } else if (val == 2) {
        return '药商';
    } else if (val == 3) {
        return '药厂';
    } else if (val == 4) {
        return '个体户';
    } else if (val == 5) {
        return '药店';
    } else if (val == 6) {
        return '医院';
    } else if (val == 7) {
        return '贸易公司';
    } else if (val == 8) {
        return '零售商行';
    } else if (val == 9) {
        return '药农';
    } else if (val == 10) {
        return '介绍人';
    } else if (val == 11) {
        return '药贩子';
    } else if (val == 12) {
        return '产地药商';
    } else if (val == 13) {
        return '销地药商';
    } else if (val == 14) {
        return '诊所';
    } else if (val == 15) {
        return '化工厂';
    } else if (val == 16) {
        return '化妆品厂';
    } else if (val == 17) {
        return '提取物厂';
    } else if (val == 18) {
        return '食品厂';
    } else if (val == 19) {
        return '实验室';
    } else if (val == 20) {
        return '网上电商';
    } else if (val == 21) {
        return '中成药生产商';
    } else if (val == 22) {
        return '西成药生产商';
    } else if (val == 23) {
        return '饮片厂';
    } else if (val == 24) {
        return '茶类公司';
    } else if (val == 25) {
        return '种植基地';
    } else {
        return val;
    }
})
Vue.filter('customerTypeEn', function(val) { //客户类型
    var val = val;
    if (val == 0) {
        return 'Others';
    } else if (val == 1) {
        return 'Cooperatives';
    } else if (val == 2) {
        return 'Drug Makers';
    } else if (val == 3) {
        return 'Factory';
    } else if (val == 4) {
        return 'Private Use';
    } else if (val == 5) {
        return 'Pharmacy';
    } else if (val == 6) {
        return 'Hospital';
    } else if (val == 7) {
        return 'Trading Company';
    } else if (val == 8) {
        return '零售商行 International Department ignored ';
    } else if (val == 9) {
        return '药农 International Department ignored ';
    } else if (val == 10) {
        return '介绍人 International Department ignored ';
    } else if (val == 11) {
        return '药贩子 International Department ignored ';
    } else if (val == 12) {
        return '产地药商 International Department ignored ';
    } else if (val == 13) {
        return '销地药商 International Department ignored ';
    } else if (val == 14) {
        return 'Clinic';
    } else if (val == 15) {
        return 'Chemical Company';
    } else if (val == 16) {
        return 'Cosmetics Company';
    } else if (val == 17) {
        return 'Extract Company';
    } else if (val == 18) {
        return 'Food Company';
    } else if (val == 19) {
        return 'Laboratory for trial';
    } else if (val == 20) {
        return 'Online Company';
    } else if (val == 21) {
        return 'Pharmaceutical producer of Chinese Traditional Patent Medicine';
    } else if (val == 22) {
        return 'Pharmaceutical producer of Western Medicine';
    } else if (val == 23) {
        return 'Pieces Factory';
    } else if (val == 24) {
        return 'Herb tea company';
    }else if (val == 25) {
        return 'Planting base';
    } else {
        return val;
    }
})
Vue.filter('classify', function(val) { //客户分类
    var val = val;
    if (val == '买') {
        return '采购商';
    } else if (val == '卖') {
        return '供应商';
    } else if (val == '买卖') {
        return '买卖';
    } else if (val == 1) {
        return '采购商';
    } else if (val == 2) {
        return '供应商';
    } else if (val == 3) {
        return '买卖';
    } else {
        return val;
    }
})

Vue.filter('customerScale', function(val) { //客户规模
    var val = val;
    if (val === '') {
        return '未知';
    } else if (val == 0) {
        return '小型';
    } else if (val == 1) {
        return '中型';
    } else if (val == 2) {
        return '大型';
    } else {
        return '未知';
    }
})

Vue.filter('customerNature', function(val) { //客户性质
    var val = val;
    if (val == 0) {
        return '个体户';
    } else if (val == 1) {
        return '民企';
    } else if (val == 2) {
        return '国企';
    } else if (val == 3) {
        return '上市公司';
    } else {
        return '未知';
    }
})

Vue.filter('enumlist', function(val) { //国家
    var val = val;
    var obj = {
        "TRACE": '跟进类型',
        "ST": '规格类型',
        "BANK": '银行',
        "OSTAT": '订单状态',
        "OT": '包装方式',
        "MU": '计量单位',
        "PAY": '付款方式',
        "CL": '客户信用等级',
        "IS": '意向状态',
        "HT": '药材品类',
        "ES": '员工状态',
        "ET": '企业类型',
        "CS": '客户来源',
        "CT": '证书类型',
        "AS": '审核状态',
        "DEV": '快递公司',
        "POS": '职位',
        "LBL": '常见标签',
        "ON": '客户信用等级',
        'CUST_CN': '其他类型'
    }
    if (obj[val]) {
        return obj[val]
    } else {
        return val;
    }

})

Vue.filter('onsell', function(val) { //意向上下架
    var val = val;
    if (val == 0) {
        return '初始';
    }
    if (val == 1) {
        return '申请上架中';
    }
    if (val == 2) {
        return '已上架';
    }
    if (val == -2) {
        return '申请上架失败';
    }
    if (val == 3) {
        return '申请下架中';
    }
    if (val == 4) {
        return '已下架';
    }
    if (val == -4) {
        return '申请下架失败';
    } else {
        return '其他';
    }
})

Vue.filter('intentionAudit', function(val) { //意向审核
    var val = val;
    if (val == 0) {
        return '初始';
    }
    if (val == 1) {
        return '客服审核通过';
    }
    if (val == -1) {
        return '客服审核不通过';
    }
    if (val == 2) {
        return '业务员申请审核';
    }

    if (val == 3) {
        return '主管审核通过';
    }
    if (val == -3) {
        return '主管审核不通过';
    }
    if (val == 9) {
        return '审核中';
    } else {
        return '其他';
    }
})

Vue.filter('date', function(val) { //将时间的时分秒去掉
    var val = val;
    if (typeof val === 'string') {
        return val.split(' ')[0];
    } else {
        return val;
    }
})
Vue.filter('subtime', function(val) { //将时间的时分秒去掉
    var val = val;
    if (val) {
        val = val.substring(0, 10);
    } else {
        val = "";
    }
    return val;
})
Vue.filter('subtime2', function(val) { //将时间的分秒后面的去掉
    var val = val;
    if (val) {
        val = val.substring(0, 16);
    } else {
        val = "";
    }
    return val;
})


function format(time, format) {
    var t = new Date(time);
    var tf = function(i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        };
    });
}

Vue.filter('formatTime', function(time) { //毫秒转化成时间    
    return format(time, 'yyyy-MM-dd HH:mm:ss');
})


Vue.filter('dateTime', function(val, accurateTo) { //较正时间格式,accurateTo表示精确到哪一位（天或秒，默认天）
    var result = "";
    var now = new Date(val);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }

    result = year + "-" + month + "-" + date;
    if (accurateTo == "second") {
        result = year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
    }
    return result;

    /*val = new Date(parseInt(val)).toLocaleString().substr(0,20);*/
    /*val= new Date(parseInt(val) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");*/

})

Vue.filter('payfee', function(val) { //将金额保留小数点后两位
    var val = val;
    if (val === val.substring(0, val.indexOf(".") + 3)) {
        return val;
    } else {
        return val.substring(0, val.indexOf(".") + 3);
    }
})
Vue.filter('orderstatus', function(val) { //订单状态
    var val = val;
    if (val == 0) {
        return '新建订单';
    }
    if (val == 10) {
        return '订单处理中';
    }
    if (val == 20) {
        return '等待支付';
    }
    if (val == 30) {
        return '等待审核';
    }
    if (val == 40) {
        return '等待卖家发货';
    }
    if (val == 50) {
        return '等待收货';
    }
    if (val == 60) {
        return '已收货';
    }
    if (val == 70) {
        return '订单已完成';
    }
    if (val == -1) {
        return '订单已取消';
    }
    if (val == -2) {
        return '订单已过期';
    }
})

Vue.filter('salesRecord', function(validate, task) { //订单退换货
    if (validate == null) {
        return this.$t('static.awaiting_review');
    } else if (validate == 0) {
        return this.$t('static.awaiting_review');
    } else if (validate == -2) {
        return this.$t('static.reapply');
    } else if (validate == 2) {
        return "售后成功";
    } else if (validate == 3) {
        return this.$t('static.condirm_receive');
    } else if (validate == 1) {
        return "售后处理中";
    } else {
        return;
    }
})

Vue.filter('Auditing', function(val) { //订单审核
    var val = val;
    if (val == null) {
        return this.$t('static.wait_approval');
    } else if (val == 0) {
        return this.$t('static.wait_approval');
    } else if (val == 1) {
        return this.$t('static.applied');
    } else if (val == 2) {
        return this.$t('static.approved');
    } else if (val == -2) {
        return this.$t('static.unapproved');
    } else if (val == -1) {
        return this.$t('static.canceled_apply');
    } else {
        return val;
    }
})
Vue.filter('EnAuditing', function(val) { //订单审核
    var val = val;
    if (val == null) {
        return 'Waiting for an approval';
    } else if (val == 0) {
        return 'Waiting for an approval';
    } else if (val == 1) {
        return 'Under review';
    } else if (val == 2) {
        return 'Approved';
    } else if (val == -2) {
        return 'Audit not passed';
    } else if (val == -1) {
        return 'Cancelled';
    } else {
        return val;
    }
})

Vue.filter('Audit', function(val) { //寄样审核
    var val = val;
    if (val == null) {
        return '初始状态';
    }
    if (val == 0) {
        return '未审核';
    }
    if (val == 1) {
        return '申请审核';
    }
    if (val == 2) {
        return '审核通过';
    }
    if (val == 3) {
        return '审核未通过';
    }
})

Vue.filter('drugsStatus', function(val) { //药款转出状态
    var val = val;
    if (val == 0) {
        return '申请审核';
    }
    if (val == 1) {
        return '审核中';
    }
    if (val == 2) {
        return '正在转账';
    }
    if (val == 3) {
        return '转出成功';
    }
})
Vue.filter('transferStatus', function(val) { //药款转入状态
    var val = val;
    if (val == 0) {
        return '待支付';
    }
    if (val == 1) {
        return '取消';
    }
    if (val == 2) {
        return '支付成功';
    }
    if (val == 3) {
        return '支付失败';
    }
})
Vue.filter('payType', function(val) { //药款支付状态
    var val = val;
    if (val == 1) {
        return '支付宝支付';
    }
    if (val == 2) {
        return '平安支付';
    }
    if (val == 3) {
        return '微信支付';
    }
})

Vue.filter('linktype', function(val) { //药款关联类型
    var val = val;
    if (val == 0) {
        return '订单';
    }
    if (val == 1) {
        return '转入';
    }
    if (val == 2) {
        return '转出';
    } else {
        return '其他';
    }
})


Vue.filter('requireAgain', function(val) { //询价状态
    var val = val;
    if (val == 0) {
        return '请报价';
    }
    if (val == 1) {
        return '需要再次报价';
    } else {
        return val;
    }
})

Vue.filter('offerAgain', function(val) { // 报价状态
    var val = val;
    if (val == 0) {
        return '未报价';
    }
    if (val == 1) {
        return '已经报价过';
    } else {
        return val;
    }
})

Vue.filter('Currency', function(val) { //订单货币方式
    var val = val;
    if (val == 1 || val === 0) {
        return 'CNY人民币';
    }
    if (val == 2) {
        return 'USD美元';
    }
    if (val == 3) {
        return 'EUR欧元';
    }
    if (val == 4) {
        return 'HKD港币';
    }
    if (val == 5) {
        return 'GBP英镑';
    }
    if (val == 6) {
        return 'JPY日元';
    }
    if (val == 7) {
        return 'KRW韩元';
    }
    if (val == 8) {
        return 'CAD加元';
    }
    if (val == 9) {
        return 'AUD澳元';
    }
    if (val == 10) {
        return 'CHF瑞郎';
    }
    if (val == 11) {
        return 'SGD新加坡元';
    }
    if (val == 12) {
        return 'MYR马来西亚币';
    }
    if (val == 13) {
        return 'IDR印尼';
    }
    if (val == 14) {
        return 'NZD新西兰';
    }
    if (val == 15) {
        return 'VND越南';
    }
    if (val == 16) {
        return 'THB泰铢';
    }
    if (val == 17) {
        return 'PHP菲律宾';
    } else {
        return val;
    }

})

Vue.filter('inquire', function(val) { //国际意向询价状态
    var val = val;
    if (val === 0) {
        return '初始';
    }
    if (val === 1) {
        return '询价中';
    }
    if (val === 2) {
        return '报价中';
    }
    if (val === 3) {
        return '询价结束';
    }
})

Vue.filter('Unit', function(val) { //国际意向单位
    var val = val;
    if (val == 1) {
        return '斤（HKG）';
    }
    if (val == 3) {
        return '克（G）';
    }
    if (val == 63) {
        return '公斤（KG）';
    }
    if (val == 64) {
        return '棵（Tree）';
    }
    if (val == 66) {
        return '份';
    }
    if (val == 69) {
        return '朵（Flower）';
    }
    if (val == 70) {
        return '瓶（Bottle）';
    }
    if (val == 71) {
        return '吨（T）';
    }
    if (val == 72) {
        return '株（Plant）';
    }
    if (val == 73) {
        return '只（Only）';
    }
    if (val == 74) {
        return '盒（Box）';
    }
    if (val == 110) {
        return '升（Liter）';
    }
    if (val == 112) {
        return '20尺柜（GP20T）';
    }
    if (val == 113) {
        return '40尺柜（GP40）';
    }
    if (val == 114) {
        return '40高柜（GP40HQ）';
    }

    return val;


})

Vue.filter('tracking', function(val) { //跟进状态
    var val = val;
    if (val === 0) {
        return '初始';
    }
    if (val === 1) {
        return '跟进中';
    }
    if (val === 2) {
        return '有效';
    }
    if (val === 3) {
        return '无效';
    } else {
        return val;
    }

})

Vue.filter('isnull', function(val) {
    var val = val;
    if (val === null) {
        return 0;
    } else {
        return val;
    }
})
Vue.filter('money', function(val) { //金额逗号隔开
    var val = val;
    val = parseFloat((val + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    var l = val.split(".")[0].split("").reverse(),
        r = val.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
    val = t;
    if (val === null) {
        return 0;
    } else {
        return val;
    }
})


Vue.filter('intentionSource', function(val) { //意向来源
    var val = val;
    if (val == 1) {
        return "pc";
    } else if (val == 2) {
        return "android";
    } else if (val == 3) {
        return "weixin";
    } else if (val == 4) {
        return "ios";
    } else {
        return "其他";
    }
})

Vue.filter('indentSource', function(val) { //采购单来源
    var val = val;
    if (val === 0) {
        return "业务员导入";
    } else if (val == 1) {
        return "web";
    } else if (val == 2) {
        return "android";
    } else if (val == 3) {
        return "weixin";
    } else if (val == 4) {
        return "ios";
    } else {
        return "其他";
    }
})

Vue.filter('file', function(val) { //文件后缀名获取
    var val = val;
    var file = val.substring(val.lastIndexOf('.') + 1);
    if (file == "doc" || file == "docx") {
        return "word";
    } else if (file == "xls" || file == "xlsx") {
        return "excel";
    } else if (file == "jpg" || file == "jpeg" || file == "png") {
        return "image";
    } else if (file != "") {
        return file;
    } else {
        return "other"
    }

});

Vue.filter('isImage', function(val) { //判断是否图片
    var val = val;
    var file = val.substring(val.lastIndexOf('.') + 1);
    if (file == "jpg" || file == "jpeg" || file == "png") {
        return true;
    } else {
        return false;
    }

});

Vue.filter('indentType', function(val) { //判断采购单类型
    var val = val;
    if (val === 0) {
        return "药厂采购单";
    } else if (val == 1) {
        return "药商采购单";
    } else {
        return "其他";
    }

});

Vue.filter('textDisplay', function(val, maxLength) { //文本内容显示，超过maxLength长度部分以...表示
    var val = val;
    if (!val) {
        val = "";
    }
    if (!maxLength) {
        maxLength = 5;
    }
    let length = val.toString().length;
    if (length <= maxLength) {
        return val;
    } else {
        return val.toString().substring(0, maxLength) + "...";
    }


});

Vue.filter('offerAccept', function(val) { //文本内容显示，超过maxLength长度部分以...表示
    var val = val;
    if (val === 0) {
        return "未处理";
    } else if (val == 1) {
        return "已接受";
    } else if (val == 2) {
        return "未采用";
    } else {
        return "待采用";
    }

});

Vue.filter('offerType', function(val) { //报价类型
    var val = val;
    if (val === 0) {
        return "业务员";
    } else if (val == 1) {
        return "客户";
    } else if (val == 2) {
        return "库存信息";
    } else {
        return "供应意向";
    }

});

Vue.filter('intentionType', function(type, especial, preSell) { //意向类型

    if (type === 1 && especial === 1 && preSell === 1) {
        return "预售资源";
    } else if (type === 1 && especial === 1) {
        return "低价资源";
    } else if (type === 1 && especial === 0) {
        return "普通供应";
    } else if (type === 0 && especial === 1) {
        return "紧急求购";
    } else if (type === 0 && especial === 0) {
        return "普通求购";
    } else {
        return "其他";
    }

});

Vue.filter("qaFilter", function(data) {
    if (data == "-1") {
        return "未知"
    }
    if (data == "0") {
        return "不合格"
    }
    if (data == '1') {
        return "合格"
    }
})

Vue.filter("isDeal", function(data) {
    if (data == "-1") {
        return "未知"
    }
    if (data == "0") {
        return "未成交"
    }
    if (data == '1') {
        return "已成交"
    }
})


Vue.filter('province', function(id) {
    if (id == 247) {
        return '北京'
    }
    if (id == 248) {
        return '天津'
    }
    if (id == 249) {
        return '河北'
    }
    if (id == 250) {
        return '山西'
    }
    if (id == 251) {
        return '内蒙古'
    }
    if (id == 252) {
        return '辽宁'
    }
    if (id == 253) {
        return '吉林'
    }
    if (id == 254) {
        return '黑龙江'
    }
    if (id == 255) {
        return '上海'
    }
    if (id == 256) {
        return '江苏'
    }
    if (id == 257) {
        return '浙江'
    }
    if (id == 258) {
        return '安徽'
    }
    if (id == 259) {
        return '福建'
    }
    if (id == 260) {
        return '江西'
    }
    if (id == 261) {
        return '山东'
    }
    if (id == 262) {
        return '河南'
    }
    if (id == 263) {
        return '湖北'
    }
    if (id == 264) {
        return '湖南'
    }
    if (id == 265) {
        return '广东'
    }
    if (id == 266) {
        return '广西'
    }
    if (id == 267) {
        return '海南'
    }
    if (id == 268) {
        return '重庆'
    }
    if (id == 269) {
        return '四川'
    }
    if (id == 270) {
        return '贵州'
    }
    if (id == 271) {
        return '云南'
    }
    if (id == 272) {
        return '西藏'
    }
    if (id == 273) {
        return '陕西'
    }
    if (id == 274) {
        return '甘肃'
    }
    if (id == 275) {
        return '青海'
    }
    if (id == 276) {
        return '宁夏'
    }
    if (id == 277) {
        return '新疆'
    }
    if (id == 278) {
        return '台湾'
    }
    if (id == 279) {
        return '香港'
    }
    if (id == 280) {
        return '澳门'
    }

    return "不限"
})

Vue.filter("paymentWay", function(val) {
    if (val === "") {
        return "未知";
    } else if (val == 0) {
        return "不预付";
    } else if (val == 1) {
        return "0~30%";
    } else if (val == 2) {
        return "30%~50%";
    } else if (val == 3) {
        return "50%~100%";
    } else {
        return "未知";
    }
})

Vue.filter("orderSource", function(val) { //订单来源
    if (val === "") {
        return "未知";
    } else if (val == 0) {
        return "新建";
    } else if (val == 1) {
        return "意向";
    } else if (val == 2) {
        return "报价";
    } else if (val == 3) {
        return "样品申请";
    } else if (val == 4) {
        return "库存";
    } else if (val == 5) {
        return "待采购";
    } else {
        return "未知";
    }
})

Vue.filter("freightType", function(val) { //运费支付人
    if (val === "") {
        return "未知";
    } else if (val == 0) {
        return "我方支付";
    } else if (val == 1) {
        return "客户支付";
    }
})

Vue.filter("newCustomerType", function(val) {
    if (val == 0) {
        return "初始";
    } else if (val == 1) {
        return "买方";
    } else if (val == 2) {
        return "卖方";
    } else if (val == 3) {
        return "既买又卖"
    }
})

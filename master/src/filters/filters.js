import Vue from 'vue'

Vue.filter('categorystate', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return ''+val;
	}
});

Vue.filter('telstate', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return ''+val;
	}
});

Vue.filter('numberstate', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return val;
	}
});
Vue.filter('iconstate', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return ''+val;
	}
});
Vue.filter('isostate', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return val;
	}
});

Vue.filter('systemcode', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==""){
		return '无';
	}else{
		return val;
	}
});
Vue.filter('systemtype', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return val;
	}
});
Vue.filter('systemdesc', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==""){
		return '无';
	}else{
		return val;
	}
});

Vue.filter('breedcode', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return val;
	}
})

Vue.filter('categorycode', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return val;
	}
})

Vue.filter('catestate', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return val;
	}
})

Vue.filter('employeestate', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else{
		return val;
	}
})

Vue.filter('qualify', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==""){
		return '无';
	}else{
		return val;
	}
})
Vue.filter('codestate', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==""){
		return '无';
	}else{
		return val;
	}
})
Vue.filter('entry', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==""){
		return '无';
	}else{
		return val;
	}

})
Vue.filter('levelstate', function(val){ //等级
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==""){
		return '无';
	}else{
		return val;
	}
})
Vue.filter('chanceType', function(val){ //机会类型
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==1){
		return '供应';
	}else if(val==0){
		return '求购';
	}
})
Vue.filter('chanceEspec', function(val){ //机会类型
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==0){
		return '普通';
	}else if(val==1){
		return '特殊';
	}
})
Vue.filter('intlstata', function(val){ //是否国际
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==0){
		return '国内';
	}else if(val==1){
		return '国际';
	}
})

Vue.filter('coa', function(val){ //检测报告
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==0){
		return '无';
	}else if(val==1){
		return '有';
	}
})
Vue.filter('visitstate', function(val){ //是否上门看货
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==0){
		return '不会';
	}else if(val==1){
		return '会';
	}
})
Vue.filter('invoicstate', function(val){ //发票
	var val = val;
	if(val==null){
		 return '无发票';
	}else if(val==0){
		return '无发票';
	}else if(val==1){
		return '普通发票';
	}
	else if(val==2){
		return '增值发票';
	}
})
Vue.filter('status', function(val){ //业务机会状态
	var val = val;
	if(val==null){
		 return '不确定';
	}else if(val==0){
		return '待审';
	}else if(val==1){
		return '通过';
	}
})
Vue.filter('country', function(val){ //国家
	var val = val;
	if(val==null){
		 return '未说明';
	}else {
		return val;
	}
})
Vue.filter('customerType', function(val){ //客户类型
	var val = val;
	if(val==0){
		 return '个人';
	}else if(val==1){
		 return '企业';
	}else{
		return val;
	}
})
Vue.filter('classify', function(val){ //客户分类
	var val = val;
	if(val==1){
		 return '买';
	}else if(val==2){
		 return '卖';
	}else if(val==3){
		return '买卖';
	}else{
		return val;
	}
})

Vue.filter('enumlist', function(val){ //国家
  var val = val;
  var obj=  {
    "TRACE" : '跟进类型',
    "ST" : '规格类型',
    "BANK" : '银行',
    "OSTAT" : '订单状态',
    "OT" : '包装方式',
    "MU" : '计量单位',
    "PAY" : '付款方式',
    "CL" : '客户信用等级',
    "IS" : '意向状态',
    "HT" : '药材品类',
    "ES" : '员工状态',
    "ET" : '企业类型',
    "CS" : '客户来源',
    "CT" : '证书类型',
    "AS" : '审核状态',
    "DEV" : '快递公司',
    "POS" : '职位',
    "LBL" : '常见标签',
    "ON" : '客户信用等级',
    'CUST_CN':'其他类型'
  }
  if(obj[val]){
    return obj[val]
  }else{
    return val;
  }


})

Vue.filter('onsell',function(val){      //意向上下架
	var val = val;
	if(val==0){
		 return '初始';
	}
	if(val==1){
		 return '申请上架中';
	}
	if(val==2){
		 return '已上架';
	}
	if(val==-2){
		 return '申请上架失败';
	}
	if(val==3){
		 return '申请下架中';
	}
	if(val==4){
		 return '已下架';
	}
	if(val==-4){
		 return '申请下架失败';
	}else{
		return '其他';
	}
})

Vue.filter('intentionAudit',function(val){      //意向审核
	var val = val;
	if(val==0){
		 return '初始';
	}
	if(val==1){
		 return '客服审核通过';
	}
	if(val==-1){
		 return '客服审核不通过';
	}
	if(val==2){
		 return '业务员申请审核';
	}

	if(val==3){
		 return '主管审核通过';
	}
	if(val==-3){
		 return '主管审核不通过';
	}
	if(val==9){
		 return '审核中';
	}else{
		return '其他';
	}
})

Vue.filter('date',function(val){      //将时间的时分秒去掉
	var val = val;
	if(typeof val==='string'){
		return val.split(' ')[0];
	}else{
		return val;
	}
})

Vue.filter('payfee',function(val){      //将金额保留小数点后两位
	var val = val;
	if(val===val.substring(0,val.indexOf(".") + 3)){
		return val;
	}else{
		return val.substring(0,val.indexOf(".") + 3);
	}
})
Vue.filter('orderstatus',function(val){     //订单状态
	var val = val;
	if(val==0){
		 return '订单生成';
	}
	if(val==10){
		 return '订单处理中';
	}
	if(val==20){
		 return '等待支付';
	}
	if(val==30){
		 return '等待审核';
	}
	if(val==40){
		 return '等待卖家发货';
	}
	if(val==50){
		 return '等待收货';
	}
	if(val==60){
		 return '订单已完成';
	}
	if(val==70){
		 return '订单已完成';
	}
	if(val==-1){
		 return '订单已取消';
	}
	if(val==-2){
		 return '订单已过期';
	}
})

Vue.filter('Auditing',function(val){     //订单审核
	var val = val;
	if(val==0){
		 return '初始状态';
	}
	if(val==1){
		 return '申请审核';
	}
	if(val==2){
		 return '审核通过';
	}
	if(val==-2){
		 return '审核未通过';
	}
})

Vue.filter('drugsStatus',function(val){     //药款状态
	var val = val;
	if(val==0){
		 return '初始状态';
	}
	if(val==1){
		 return '正在审核';
	}
	if(val==2){
		 return '正在转账';
	}
	if(val==3){
		 return '转出成功';
	}
})
Vue.filter('payType',function(val){     //药款支付状态
	var val = val;
	if(val==1){
		 return '支付宝支付';
	}
	if(val==2){
		 return '平安支付';
	}
	if(val==3){
		 return '微信支付';
	}
})

Vue.filter('linktype',function(val){     //药款关联类型
	var val = val;
	if(val==0){
		 return '订单';
	}
	if(val==1){
		 return '转入';
	}
	if(val==2){
		 return '转出';
	}else{
		return '其他';
	}
})


Vue.filter('requireAgain',function(val){     //询价状态
	var val = val;
	if(val==0){
		 return '请报价';
	}
	if(val==1){
		 return '需要再次报价';
	}else{
		return val;
	}
})

Vue.filter('offerAgain',function(val){     // 报价状态
	var val = val;
	if(val==0){
		 return '未报价';
	}
	if(val==1){
		 return '已经报价过';
	}else{
		return val;
	}
})

Vue.filter('Currency',function(val){     //订单货币方式
	var val = val;
	if(val==0){
		 return 'CNY人民币';
	}
	if(val==1){
		 return 'USD美元';
	}
	if(val==2){
		 return 'EUR欧元';
	}
	if(val==3){
		 return 'HKD港币';
	}
	if(val==4){
		 return 'GBP英镑';
	}
	if(val==5){
		 return 'JPY日元';
	}
	if(val==6){
		 return 'KRW韩元';
	}
	if(val==7){
		 return 'CAD加元';
	}
	if(val==8){
		 return 'AUD澳元';
	}
	if(val==9){
		 return 'CHF瑞郎';
	}
	if(val==10){
		 return 'SGD新加坡元';
	}
	if(val==11){
		 return 'MYR马来西亚币';
	}
	if(val==12){
		 return 'IDR印尼';
	}
	if(val==13){
		 return 'NZD新西兰';
	}
	if(val==14){
		 return 'VND越南';
	}
	if(val==15){
		 return 'THB泰铢';
	}
	if(val==16){
		 return 'PHP菲律宾';
	}

})

Vue.filter('inquire',function(val){      //国际意向询价状态
	var val = val;
	if(val===0){
		return '初始';
	}
	if(val===1){
		return '询价中';
	}
	if(val===2){
		return '报价中';
	}
	if(val===3){
		return '报价完成';
	}


})
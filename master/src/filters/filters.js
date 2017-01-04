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

Vue.filter('payMent', function(val){
	var val = val;
	if(val==0){
		 return '付款';
	}else if(val==1){
		return '收款'
	}else{
		return val;
	}
});
Vue.filter('bizType', function(val){
	var val = val;
	if(val=='order'){
		 return '订单';
	}else if(val=='order_after_sales_refund'){
		return '售后退款订单'
	}else if(val=='order_refund'){
		return '补充合同退款订单'
	}else{
		return val;
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
Vue.filter('leaveTime', function(val){
	var val = val;
	if(val==1){
		 return '在职';
	}else if(val==0){
		 return '离职';
	}else{
		return val;
	}
});

Vue.filter('orderDescript', function(val){
	var val = val;
	if(val==null){
		 return '无';
	}else if(val==20){
		return '合同签订后';
	}else if(val==60){
		return '确认收货后';
	}else if(val==70){
		return  '订单完成后';
	}else {
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
Vue.filter('advanced', function(val){ //预付比例
	var val = val;
	if(val==null){
		 return 'None';
	}else if(val==0){
		return 'None';
	}else if(val==1){
		return '100%';
	}else if(val==0.1){
		return '10%';
	}else if(val==0.2){
		return '20%';
	}else if(val==0.3){
		return '30%';
	}else if(val==0.4){
		return '40%';
	}else if(val==0.5){
		return '50%';
	}else if(val==0.6){
		return '60%';
	}else if(val==0.7){
		return '70%';
	}else if(val==0.8){
		return '80%';
	}else if(val==0.9){
		return '90%';
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
		 return '其他';
	}else if(val==1){
		 return '合作社';
	}else if(val==2){
		 return '药商';
	}else if(val==3){
		 return '药厂';
	}else if(val==4){
		 return '个体户';
	}else if(val==5){
		 return '药店';
	}else if(val==6){
		 return '医院';
	}else if(val==7){
		 return '贸易公司';
	}else if(val==8){
		 return '零售商行';
	}else if(val==9){
		 return '药农';
	}else if(val==10){
		 return '介绍人';
	}else if(val==11){
		 return '药贩子';
	}else if(val==12){
		 return '产地药商';
	}else if(val==13){
		 return '销地药商';
	}else if(val==14){
		 return '养生诊所';
	}else if(val==15){
		 return '化工厂';
	}else if(val==16){
		 return '化妆品厂';
	}else if(val==17){
		 return '提取物厂';
	}else if(val==18){
		 return '食品厂';
	}else if(val==19){
		 return '实验室';
	}else if(val==20){
		 return '网上电商';
	}else if(val==21){
		 return '中成药生产商';
	}else if(val==22){
		 return '西成药生产商';
	}else if(val==23){
		 return '饮片厂';
	}else{
		return val;
	}
})
Vue.filter('classify', function(val){ //客户分类
	var val = val;
	if(val=='买'){
		 return '采购商';
	}else if(val=='卖'){
		 return '供应商';
	}else if(val=='买卖'){
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
Vue.filter('dateTime',function(val){      //将时间的时分秒去掉
	var val = val;
	val = new Date(parseInt(val)).toLocaleString().substr(0,20);
	return val;
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
	if(val==null){
		return '初始状态';
	}else if(val==0){
		 return '初始状态';
	}else if(val==1){
		 return '申请审核';
	}else if(val==2){
		 return '审核通过';
	}else if(val==-2){
		 return '审核未通过';
	}else if(val==-1){
		 return '取消申请';
	}else{
		return val;
	}
})

Vue.filter('Audit',function(val){     //寄样审核
	var val = val;
	if(val==null){
		return '初始状态';
	}
	if(val==0){
		 return '初始状态';
	}
	if(val==1){
		 return '申请审核';
	}
	if(val==2){
		 return '审核通过';
	}
	if(val==3){
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
	if(val==1||val==0){
		 return 'CNY人民币';
	}
	if(val==2){
		 return 'USD美元';
	}
	if(val==3){
		 return 'EUR欧元';
	}
	if(val==4){
		 return 'HKD港币';
	}
	if(val==5){
		 return 'GBP英镑';
	}
	if(val==6){
		 return 'JPY日元';
	}
	if(val==7){
		 return 'KRW韩元';
	}
	if(val==8){
		 return 'CAD加元';
	}
	if(val==9){
		 return 'AUD澳元';
	}
	if(val==10){
		 return 'CHF瑞郎';
	}
	if(val==11){
		 return 'SGD新加坡元';
	}
	if(val==12){
		 return 'MYR马来西亚币';
	}
	if(val==13){
		 return 'IDR印尼';
	}
	if(val==14){
		 return 'NZD新西兰';
	}
	if(val==15){
		 return 'VND越南';
	}
	if(val==16){
		 return 'THB泰铢';
	}
	if(val==17){
		 return 'PHP菲律宾';
	}else{
		return val;
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

Vue.filter('Unit',function(val){     //国际意向单位
	var val = val;
	if(val==71){
		 return '吨（T）';
	}
	if(val==63){
		 return '公斤（KG）';
	}
	if(val==1){
		 return '斤（HKG）';
	}
	if(val==3){
		 return '克（G）';
	}
	if(val==64){
		 return '棵（Tree）';
	}
	if(val==69){
		 return '朵（Flower）';
	}
	if(val==72){
		 return '株（Plant）';
	}
	if(val==70){
		 return '瓶（Bottle）';
	}
	if(val==73){
		 return '只（Only）';
	}
	if(val==74){
		 return '盒（Box）';
	}
	if(val==110){
		 return '升（Liter）';
	}
	if(val==112){
		 return '20尺柜（GP20T）';
	}
	if(val==113){
		 return '40尺柜（GP40）';
	}
	if(val==114){
		 return '40高柜（GP40HQ）';
	}
	if(val==10000){
		 return '未设置（Not set）';
	}else{
		return val;
	}

})
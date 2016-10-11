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
Vue.filter('classify', function(val){ //国家
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
Vue.filter('dateFormat', function(val){ //将时间格式化yyyy-MM-DD
	var val = val;
	if(!val){
		return "";
	}
	//return val;
	return val.split(' ')[0];
})


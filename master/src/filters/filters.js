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

Vue.filter('companyname', function(val){
	var val = val;
	if(val==null){
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

Vue.filter('levelstate', function(val){
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
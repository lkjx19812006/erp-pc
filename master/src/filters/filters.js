import Vue from 'vue'

Vue.filter('categorystate', function(val){
	var val = val;
	if(val='null'){
		 return '无';
	}else{
		return ''+val;
	}
});

Vue.filter('telstate', function(val){
	var val = val;
	if(val='null'){
		 return '无';
	}else{
		return ''+val;
	}
});

<template>
	<div>
        <div class="service-nav clearfix" id="top">
        	<slot name="top"></slot>
        </div>
        <div class="order_table" id="table_box">
	        <slot name="form"></slot>
        </div>
        <div id="base_pagination" class="base_pagination">
        	<slot name="page"></slot>
        </div>
    </div>
</template>
<script>
import common from  '../../common/common.js'
export default{
	props:[],
	components:{
		 common,
	},
	data(){
		return{
			
		}
	},
	ready(){
        window.onresize=function(){  
		    const tablefrom = document.body.clientHeight-document.getElementById('top').offsetHeight-document.getElementById('base_pagination').offsetHeight-108;
		    document.getElementById('table_box').style.height = tablefrom + 'px';
		    /*setTimeout(onresize,100);*/
		}
    },
}
</script>
<style scoped>
.base_pagination{
	position: fixed;
	bottom: 20px;
}
</style>
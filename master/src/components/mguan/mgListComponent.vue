<template>
	<div>
        <div class="service-nav clearfix" id="top">
        	<slot name="top"></slot>
        </div>
        <div>
	        <div class="order_table" id="table_box" style="height:1000px">
		        <slot name="form"></slot>
		        <!-- <table is="my_table"></table> -->
	        </div>

	        <div id="base_pagination" class="base_pagination">
	            <slot name="page"></slot>
	        </div>
	    </div>
    </div>
</template>
<script>
import common from  '../../common/common.js'
export default{
	props:['param'],
        
	components:{
		 common,
	},
	data(){
		return{
			
		}
	},
    computed:{
        
    },
	ready(){
        window.onresize=function(){

		    const tablefrom = document.body.clientHeight-document.getElementById('top').offsetHeight-document.getElementById('base_pagination').offsetHeight-115;
		    document.getElementById('table_box').style.height = tablefrom + 'px';
		    /*setTimeout(onresize,100);*/
		}
    }

    
}
</script>
<style scoped>
.base_pagination{
	bottom: 0px!important;
}
</style>
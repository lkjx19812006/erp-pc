<template>
  <div v-show="param.show" class="modal  fade" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
	    <div class="model-header">
	    	<h4>删除枚举类型</h4>
	    	<p class="model-tips">是否确定删除此枚举类型？</p>
	    	<div class="model-footer">
	    		<button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
	    		<button type="button" class="btn btn-orange" @click="deleteShowStatue(param,param.show=false)">删除</button>
	    	</div>
	    </div> 
	</div>
</template>
<script>
import { 
    deleteShowStatue
 } from '../../vuex/actions'

export default {
    data() {
        return {
        	
        }
    },
    vuex:{
        actions: {
            deleteShowStatue
        }
    },
    props:['param']
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
}


</style>

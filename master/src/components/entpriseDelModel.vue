<template>
  <div v-show="param.show" class="modal  fade" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>删除企业信息</h4>
	    	<p class="model-tips">是否确定删除此企业信息？</p>
	    	<div class="model-footer">
	    		<button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
	    		<button type="button" class="btn btn-orange">删除</button>
	    	</div>
	    </div>
	</div>
</template>
<script>
export default {
    data() {
        return {
        	
        }
    },
    props:['param'],
    methods:{
    	
    }
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
}

.modal_con {
    position: absolute;
    width: 50%;
    right: 0;
    left: 0;
    height: 100%;
    margin: 130px auto;
    z-index: 1080;
    padding: 0 5px;
}

.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -28px;
    margin-right: -22px;
}

.top-title span {
    font-size: 30px;
    color: #fff;
}
.model-header {
    background-color: #fff;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    text-align: center;
}
.model-header h4{
	padding: 16px;
	margin: 0;
	border-bottom: 2px solid #ddd;
}
.model-tips{
	padding: 10px;
	font-size: 16px;
	border-bottom: 2px solid #ddd;
	margin-bottom: 0;
}
.model-footer{
	 box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
	 padding:10px;
	 text-align: right;
}
.btn-close{
	color: #fa6705;
	background-color:#fff;
	border: 1px solid #ddd;
}
.btn-orange{
	background-color: #fa6705;
	color: #fff;
}
</style>

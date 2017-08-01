<template>
	<div class="code_box">
		<!-- <img src="../../../../static/images/qrcode_s.png" class="qrcode_small"/>
		<img :src="'http://api.k780.com:88/?app=qr.get&data=test&level=L&size=4'" class="qrcode_big"> -->
	</div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		props:{
			// title:{
			// 	type:String,
			// 	default:''
			// },
			// value:{
			// 	type:[String,Number],
			// 	default:''
			// },
		},
		methods:{
			handleChange:function(event){
				this.$emit('on-change',event)
			},
			handleClick:function(event){
				this.$emit('on-click',event)
			}
		},
		computed:{
			
		},
		created(){

		}
	}
</script>
<style scoped>
	.code_box {
		position: relative;
	}
	.code_box:hover .qrcode_big{
		visibility:visible;
	}
	.qrcode_small {
		
	}
	.qrcode_big{
		position: absolute;
		top:-120px;
		left: -10px;
		visibility:hidden;
		box-shadow: 0px 0px 10px #888;
		border-radius: 5px;
		z-index: 2000;
	}
</style>
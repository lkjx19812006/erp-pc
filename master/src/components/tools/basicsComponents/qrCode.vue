<template>
	<div class="code_box">
		<img src="../../../../static/images/qrcode_s.png" class="qrcode_small"/>
		<div class="qrcode_big">
			<img :src="'http://api.k780.com:88/?app=qr.get&data='+url+id+'&level=L&size=5'" class="qrcode_img">
			<div class="arrow">
				<Icon type="play" size='20'></Icon>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return {  

			}
		},
		props:{
			url:{
				type:String,
				default:'http://192.168.1.142:81/htm5/%23/needDetails/'
			},
			id:{
				type:[String,Number],
				default:''
			},
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
	.qrcode_img{
		border-radius: 10px;
		width: 130px;
	}
	.qrcode_big{
		position: absolute;
		top:-40px;
		left: -120px;
		visibility: hidden;
		box-shadow: 0px 0px 20px #888;
		border-radius: 10px;
		z-index: 5000;
	}
	.arrow{
		width: 20px;
		height: 100%;
		position: absolute;  
		color:#fff;
		z-index: 5001;
		right: -15px;
		top: 30%;
	}
</style>
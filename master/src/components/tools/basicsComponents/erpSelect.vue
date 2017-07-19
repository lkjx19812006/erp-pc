<template>
	<dl class="clear left transfer">
		<!-- 国际化 -->
		<dt class="left transfer marg_top search_title">{{title.indexOf('static')!=-1?$t(title):title}}：</dt>
	    <dd class="left">
	    	<select
	    	class="form-control erp_input" 
	    	@change='handleChange'
	    	:disabled='disabled'
	    	:style="{width:width+'px'}"
	    	v-model="value">
	    		<option v-for="item in options" :value='item.value'>{{item.text.indexOf('static')!=-1?$t(item.text):item.text}}</option>
	    	</select>
	    </dd>
	</dl>		
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		props:{
			title:{
				type:String,
				default:''
			},
			value:{
				type:[String,Number],
				default:''
			},
			disabled: {
                type: Boolean,
                default: false
            },
            width:{
            	type:[String,Number],
            	default:'110',
            },
            options:{
            	type:Array,
            	default:[]
            }
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
	.search_title{
		font-weight:bold;
		color:#666;
		font-size:14px;
	}
	.erp_input{
		
	}
</style>
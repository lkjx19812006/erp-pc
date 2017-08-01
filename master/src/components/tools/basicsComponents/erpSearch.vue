<template>
	<dl class="clear left transfer">
		<!-- 国际化 -->
		<dt class="left transfer marg_top search_title">{{title.indexOf('static')!=-1?$t(title):title}}：</dt>
	    <dd class="left">
	        <input
	        :type="type"
	        class="form-control erp_input"
	        :style="{width:width+'px'}"
	        v-model="value" 
	        :placeholder="$t('static.Enter_search')"
	        :disabled="disabled"
	        :readonly="readonly"
	        @change="handleChange" 
	        @blur="handleBlur"
	        @focus="handleFocus"
	        @click="handleClick"
	        @keyup.enter="handleEnter"/>
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
			type:{
				type:String,
				default:'text'
			},
			placeholder:{
				type:String,
				default:'按回车键搜索'
			},
			disabled: {
                type: Boolean,
                default: false
            },
            readonly:{
            	type:Boolean,
            	default:false
            },
            width:{
            	type:[String,Number],
            	default:'110',
            }
		},
		methods:{
			handleChange:function(event){
				this.$emit('on-change',event)
			},
			handleEnter:function(){
				this.$emit('on-keyenter')
			},
			handleBlur:function(){
				this.$emit('on-blur')
			},
			handleFocus:function(){
				this.$emit('on-focus')
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
		font-size:14px;
		color:#666;
	}
	.erp_input{
		
	}
</style>
<template>
	<div class="search_box">
		<div class="left" >
			<slot name="main"></slot>
		</div>
		<div class="right handle" >
            <div class="right">
            	<div class="more_fa" v-if="hasMore">
            		<a class="more " href="javascript:void(0);" @click="showMore()">
	                	{{$t('static.more_search')}}
	                	<Icon type="arrow-down-b" v-if='!isMore'></Icon>
	                	<Icon type="arrow-up-b" v-else></Icon>
                	</a>
            	</div>	
                <div class="right">
                	<slot name="handle"></slot>
                </div>
            </div>
            <div class="more_search" style="margin-top:-10px;" v-show="isMore" transition="search">
	        	<slot name="more"></slot>
	        </div>        
        </div>
        
    </div>
</template>

<script>
	export default{
		components:{

		},
		data(){
			return {
				isMore:false,
				hasMore:false
			}
		},
		methods:{
			showMore:function(){
				this.isMore = !this.isMore
			},
			
		},
		computed:{
			
		},
		ready(){
			let doms = document.querySelector('.more_search');//控制更多选项是否显示
			if(doms.children.length>0){
				if(doms.children[0].children.length>0){
					this.hasMore = true
				}else{
					this.hasMore = false
				}
			}else{
				this.hasMore = false
			}
			
		},
		created(){
			
		}
	}
</script>

<style scoped>
	.search_box{
		padding:5px 0;
		float: left;
		width: 100% 
	}
	.more_fa{
		padding-top:7px;
		float: left
	}
	.more{
		color:#39f;
		cursor: pointer;
		margin-right: 20px;
		margin-top: 10px;
	}
	.marg_top{
		color:#000;
		font-weight: bold;
	}
	.handle{
		position: relative;
	}
	.more_search{
		position: absolute;
		padding: 10px;
		border-radius: 5px;
		top:40px;
		z-index: 100;
		right:80%;
		
		border:1px solid #ccc;
		background: #fff;
		transition: 3s;
		box-shadow: 0px 5px 20px #888888;
	}
	.search-transition {
	  transition: all .3s ease;
	  padding: 10px;
	  overflow: hidden;
	}
	.search-enter, .search-leave {
	  height: 0;
	  padding: 0 10px;
	  opacity: 0;
	}
</style>
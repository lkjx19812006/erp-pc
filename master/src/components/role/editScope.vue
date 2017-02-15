<template>
	<div>
		<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    	<div class="container  modal_con">
	        <div @click="param.show=false" class="top-title">
	            <span class="glyphicon glyphicon-remove-circle"></span>
	        </div>
	        <div class="edit-content">
	            <h3>{{param.title}}</h3>
	        </div>
	        <validator name="validation">
	            <form novalidate>
	                <div class="edit-model">
	                    <section class="editsection" v-cloak>
	                        <div class="clearfix">
	                            <div class="client-detailInfo  col-md-6 col-xs-12">
	                                <label>中文名称<span class="system_danger" v-if="$validation.cname.minlength">请输入至少两位</span></label>
	                                <input type="text"  class="form-control edit-input" maxlength="11" v-model="param.cname" v-validate:cname="{minlength:2}" />
	                            </div>
	                            <div class="client-detailInfo  col-md-6 col-xs-12">
	                                <label>英文名称</label>
	                                <input type="text" class="form-control edit-input"  v-model="param.ename"  />
	                            </div>
	                            <div class="client-detailInfo  col-md-6 col-xs-12">
	                                <label>类型</label>
	                                <select class="form-control edit-input" v-model="param.type">
	                                	<option value="0">页面</option>
	                                	<option value="1">功能</option>
	                                </select>
	                            </div>
	                            <div class="client-detailInfo  col-md-6 col-xs-12">
	                                <label>父级页面</label>
	                                <input type="text" class="form-control edit-input"  v-model="param.pid"  />
	                            </div>
	                            <div class="client-detailInfo  col-md-6 col-xs-12">
	                                <label>父级页面</label>
	                                <input type="text" class="form-control edit-input"  v-model="param.pid"  />
	                            </div>
	                            <div class="client-detailInfo  col-md-6 col-xs-12">
	                                <label>路由地址</label>
	                                <input type="text" class="form-control edit-input"  v-model="param.url"  />
	                            </div>
	                            <div class="client-detailInfo  col-md-6 col-xs-12">
	                                <label>图标</label>
	                                <img  :src="param.url"  />
	                            </div>
	                            <div class="client-detailInfo  col-md-12 col-xs-12">
	                                <label>说明</label>
	                                <textarea style="border:1px solid #ddd;resize: none;width: 100%;border-radius: 5px;" rows="5"></textarea>
	                            </div>
	                        </div>
	                    </section>
	                </div>
	                <div class="edit_footer">
	                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
	                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm(param)">保存</button>
	                    <button type="button" class="btn  btn-confirm" v-else disabled="disabled">保存</button>
	                </div>
	            </form>
	        </validator>
	    </div>
	</div>
</template>
<script type="text/javascript">
	import {
		baseUpdateData
	} from '../../vuex/actions.js'
	export default{
		props:['param'],
		vuex:{
			actions:{
				baseUpdateData
			}
		},
		methods:{
			confirm:function(item){
				this.param.show=false;
				this.baseUpdateData(this.param)
			}
		}
	}
</script>
<style scoped>
	.top-title{
		right:0;
		left:0;
		width: 800px;
	}
</style>
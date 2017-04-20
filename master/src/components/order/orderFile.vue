<template>
	<div class="panel-collapse" v-if="initOrderDetail.contractList.arr.length&&!initOrderDetail.contractList.show" v-cloak>
	        <div class="panel-body panel-set">
	            <table class="table  contactSet">
	                <thead>
	                    <th>{{$t('static.file_type')}}</th>
	                    <th>{{$t('static.file_origin')}}</th>
	                    <th>文件名称</th>
	                    <th>{{$t('static.file_path')}}</th>
	                    <th>{{$t('static.description')}}</th>
	                    <th>{{$t('static.create_time')}}</th>
	                    <th v-if="initOrderDetail.validate==0||initOrderDetail.validate==-2"></th>
	                </thead>
	                <tbody>
	                    <tr v-for="item in initOrderDetail.contractList.arr">
	                        <td>{{item.url | file}}</td>
	                        <td>{{item.bizType}}</td>
	                        <th>{{item.name}}</th>
	                        <td>
	                            <img :src="item.url" v-if="item.url | isImage" @click="clickBig(item.url)" style="margin:auto" />
	                            <a href="{{item.url}}" download=""><img src="/static/images/{{$t('static.img_upload')}}.png" style="margin:auto" /></a>
	                        </td>
	                        <td>{{item.description}}</td>
	                        <td>{{item.ctime}}</td>
	                        <td v-if="initOrderDetail.validate==0||initOrderDetail.validate==-2">
	                        <button class="btn btn-default" @click="deleteCompact({
	                            id:item.id,
	                            sub:$index,
	                            show:true,
	                            name:'合同凭证',
	                            title:'合同凭证',
	                            link:specDel,
	                            url:'/customer/file/',
	                            key:'contractList',
	                            headline:'orderDetail'
	                            })">{{$t('static.del')}}
	                        </button>
	                        </td>
	                     </tr>
	                </tbody>
	            </table>
	         </div>
	    </div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:['param']
	}
</script>

<style>
</style>
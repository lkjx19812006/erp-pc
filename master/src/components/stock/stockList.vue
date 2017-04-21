<template>
	<mglist-model>
		<!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">药品名称：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.customerName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <dt class="left transfer marg_top">客户电话：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.customerPhone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <dt class="left transfer marg_top">询价状态：</dt>
                    <dd class="left margin_right">
                        <select class="form-control" v-model="loadParam.inquire" @change="selectSearch()">
                            <option value="0">初始</option>
                            <option value="1">询价中</option>
                            <option value="2">报价中</option>
                            <option value="3">报价完成</option>
                        </select>
                    </dd>
                    <dt class="left transfer marg_top">采购单来源：</dt>
                    <dd class="left margin_right">
                        <select class="form-control" v-model="loadParam.source" @change="selectSearch()">
                            <option value="0">业务员导入</option>
                            <option value="1">web</option>
                            <option value="2">android</option>
                            <option value="3">weixin</option>
                            <option value="4">ios</option>
                        </select>
                    </dd>
                    <!-- 新增搜索 -->
                    <dt class="left transfer marg_top">采购品种：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.purchaseContent" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:20px">
                    <button type="button" class="btn btn-default margin_right" height="24" width="24" @click="selectSearch()">搜索</button>
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>
                <dd class="pull-right" style="margin-right:10px">
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn" @click="batchInquire()">批量询价</button>
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn" @click="createPurchase()">新建</button>
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn">
                        <a href="http://erp.yaocaimaimai.net/local/template/Indent_template.xlsx">
                            EXCEL采购单模板下载
                        </a>
                    </button>
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn" @click="excelImport()">EXCEL导入采购单</button>
                    <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
                </dd>
            </div>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th></th>
                        <th>药材名称</th>
                        <th>入库时间开始</th>
                        <th>入库时间结束</th>
                        <th>产地</th>
                        <th>规格</th>
                        
                        <th style="min-width:200px;text-align: left;">操作</th>
                    </tr>
                </thead>
                <tr>
                    <th>
                        <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                    </th>
                    <th style="color:#fa6705;font-size: 14px">全选</th>
                    <th colspan="13"></th>
                </tr>
                <tbody>
                    <tr v-for="item in initMyPurchaseList">
                        <td @click.stop="">
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index)"></label>
                        </td>
                        <td>{{item.type | indentType}}</td>
                        <td>
                            <a class="underline" @click.stop="detailClick(item.id,item.customerId)">{{item.customerName}}</a>
                        </td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.pubdate}}</td>
                       
                        <td style="text-align: left">
                            <button v-if="item.inquire==0" class="btn btn-primary btn-edit" @click.stop="editPurchase(item,$index)">编辑</button>
                            <button v-if="item.inquire==0" class="btn btn-primary btn-apply" @click.stop="deletePurchase(item.id,$index)">删除</button>
                            <button v-if="item.inquire==0" class="btn btn-primary btn-edit" @click.stop="singleInquire(item.id,$index)">询价</button>
                            <button v-if="item.inquire==1||item.inquire==2" class="btn btn-primary btn-edit" @click.stop="cancelInquire(item.id,$index)">终止询价</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
	</mglist-model>
</template>

<script>
import mglistModel from '../mguan/mgListComponent.vue'
export default {
	components:{
		mglistModel
	},
	data(){
		return {
			loadParam:{
				loading:false
			}
		}
	}
}
</script>

<style>
</style>
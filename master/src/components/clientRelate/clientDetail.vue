<template>
    <div class="client_body">
    	<div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <a class="navbar-brand navbar-name" href="#">杨欢</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right" style="margin-top:8px;">
                        <li>
                            <button type="button" class="btn btn-base">新建跟进</button>
                        </li>
                        <li>
                            <button type="button" class="btn btn-base">删除</button>
                        </li>
                        <li>
                            <button type="button" class="btn btn-base">编辑</button>
                        </li>
                        <li>
                            <button type="button" class="btn btn-base">新建</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix">
                <div class="col-md-8">
                    <h4 class="section_title">相关</h4>
                    <article>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading clearfix">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/contact.png" height="32" width="27"/>
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											联系人（8）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div class="panel-collapse collapse in">
                                    <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading clearfix">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											业务机会（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse collapse">
                                    <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											订单（8）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse collapse">
                                    <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/compact.png" height="32" width="27"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											合同（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse collapse">
                                    <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/file.png" height="34" width="26"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											文件（2）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse collapse">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											跟进（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse collapse">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                             <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											备注（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse collapse">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                             <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											收货地址（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse collapse">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                             <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											标签（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse collapse">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail">
		                                            <td>
		                                                <img class="pull-left" src="/static/images/contactname.png" height="21" width="18" />
		                                                药品名称：{{item.name}}
		                                            </td>
		                                            <td>药品编号：{{item.number}}</td>
		                                            <td>药品类型：{{item.drugType}}</td>
		                                            <td>所属公司：{{item.company}}</td>
		                                            <td>公司地址：{{item.address}}</td>
		                                            <td>说明：{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-md-4 client-detail">
                    <h4 class="section_title">详情</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>名称</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.name" value="{{initClientDetail.name}}"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>类型</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.type" value="{{initClientDetail.type}}" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>分类码</label>
                                    <input type="text" class="form-control"  v-model="initClientDetail.category" value="{{initClientDetail.category}}"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>电话</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.tel" value="{{initClientDetail.tel}}"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>负责人</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.principal" value="{{initClientDetail.principal}}" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>所在市</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.city" value="{{initClientDetail.city}}"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>邮箱</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.email" value="{{initClientDetail.email}}"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>所在省</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.province" value="{{initClientDetail.province}}"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>业务员ID</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.employee_id" value="{{initClientDetail.employee_id}}" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>信用等级</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.credit_level" value="{{initClientDetail.credit_level}}"/>
                                </div>
                            </div>
                            <div class="client-detailInfo">
                                <label>经营范围</label>
                                <input type="text" class="form-control" v-model="initClientDetail.biz_scope" value="{{initClientDetail.biz_scope}}"/>
                            </div>
                            <div class="client-detailInfo">
                                <label>注册地址</label>
                                <input type="text" class="form-control" v-model='initClientDetail.address' value="{{initClientDetail.address}}"/>
                            </div> 
                   
                            <div class="client-detailInfo">
                                <img class="left" src="/static/images/blackselect.png" height="28" width="28" />
                                <label>加入黑名单</label>
                            </div>
                            <div class="client-editbtn">
                                <button type="button" class="btn btn-orange">编辑</button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import pressImage from '../../components/imagePress'
import {
	initClientDetail
} from '../../vuex/getters'
import {
	getClientDetail
} from '../../vuex/actions'
export default {
    components: {
        pressImage
    },
    props:['param'],
    vuex:{
    	getters:{
			initClientDetail
    	},
    	actions:{
    		getClientDetail
    	}
    }
}
</script>
<style scoped>
.client_body {
    position: relative;
    background-color: #fff;
    padding: 20px;
}

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.navbar-img {
    float: left;
    margin-right: 10px;
}

.navbar-name {
    color: #fa6705;
    font-size: 20px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
}

section {
    background-color: #fff;
}

section article {
    margin-top: 30px;
}
.top-title{
	z-index: 100
}
.client-section {
    padding: 10px 5px 40px 5px;
}

.section_title {
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    margin: 0;
}

.panel-title-set {
    margin-top: 6px;
    margin-left: 26px;
    display: inline-block;
    font-size: 20px;
    color: #333;
}

.panel-set {
    overflow: hidden;
    overflow-x: auto;
}

.panel-body ul {
    white-space: nowrap;
}

.panel-body ul li {
    display: inline-block;
    margin-right: 5%;
    /* overflow: hidden; */
    text-overflow: ellipsis;
    white-space: nowrap;
}

.panel-name {
    width: 140px;
}

.panel-job {
    width: 140px;
}

.panel-phone {
    width: 158px
}

.panel-email {
    width: 240px;
}

.panel-body ul li:last-of-type {
    margin-right: 0;
    width: 35px;
    text-align: center;
}

.panel-body ul li:last-of-type img {
    margin: auto;
}

.panel-body ul li:first-of-type img {
    margin-right: 5px;
}

.panel-body ul li label {
    font-size: 16px;
    color: #333;
    font-weight: 100;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}

.client-detail {
    border-left: 1px solid #ddd;
}

.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
}

.client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
}

.client-detailInfo label {
    display: block;
    color: #333;
    font-size: 16px;
}

.btn-orange {
    background-color: #fa6705;
    color: #fff;
    font-size: 18px;
}

.client-editbtn {
    text-align: right;
    margin-top: 15px;
}

.client-image {
    display: inline-block;
}
</style>

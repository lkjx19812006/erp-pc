<template>
    <div class="client_body">
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="../../static/images/personPhoto.png" height="38" width="37" />
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
                     <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading clearfix">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/contact.png" height="32" width="27"/>
										<a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
											联系人（8）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div id="collapseOne" class="panel-collapse collapse in">
                                    <div class="panel-body panel-set">
                                        <ul class="clearfix" v-for="item in initClientlist">
                                            <li class="panel-name">
                                                <img class="pull-left" src="../../static/images/contactname.png" height="21" width="18" />
                                                <label>名称：{{item.clientName}}</label>
                                            </li>
                                            <li class="panel-job">
                                                <label>职务：{{item.clientJob}}</label>
                                            </li>
                                            <li class="panel-phone">
                                                <label>电话：{{item.clientTel}}</label>
                                            </li>
                                            <li class="panel-email">
                                                <label>电子邮件：{{item.clientEmail}}</label>
                                            </li>
                                            <li>
                                                <img src="../../static/images/default_arrow.png" height="24" width="24" />
                                            </li>
                                        </ul>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading clearfix">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
										<a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
											业务机会（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div id="collapseTwo" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
											订单（8）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div id="collapseThree" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/compact.png" height="32" width="27"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
											合同（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div id="collapseThree" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/file.png" height="34" width="26"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
											文件（2）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div id="collapseThree" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="#collapseOne" class="panel-title-set">
											跟进（0）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div id="collapseThree" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
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
                                    <label>客户名</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>客户所有人</label>
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>职务</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>电话</label>
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>电子邮件</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>阶段</label>
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>订单数量</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>订单金额</label>
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="client-detailInfo">
                                <label>客户划转</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="client-detailInfo">
                                <label>收货地址</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="client-detailInfo">
                                <label>发货地址</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="client-detailInfo">
                                <label>文件</label>
                                <input type="file" />
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
import {
    initClientlist
} from '../vuex/getters'
import {
    getClientList
} from '../vuex/actions'
export default {
	components: {

	},
    vuex: {
        getters: {
            initClientlist
        },
        actions:{
        	getClientList
        }
    },
    data(){
    	return {
    		 loadParam: {
                loading: true
            }
    	}
    },
    created() {
        this.getClientList(this.loadParam);
    }

}
</script>
<style scoped>
.client_body {
    position: relative;
}

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    border-bottom: 1px solid #ddd;
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

.client-section {
    padding: 10px 15px 40px 20px;
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
.panel-name{
	width: 140px;
}
.panel-job{
	width: 140px;
}
.panel-phone{
	width: 158px
}
.panel-email{
	width: 240px;
}
.panel-body ul li:last-of-type {
    margin-right: 0;
    width: 35px;
    text-align: center;
}
.panel-body ul li:last-of-type img{
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
</style>

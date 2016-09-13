<template>
	<createcust-model :param="custParam" v-if="custParam.show"></createcust-model>
	<createaddr-model :param="addressParam" v-if="addressParam.show"></createaddr-model>
	<updatecontact-model :param="updateParam" v-if="updateParam.show"></updatecontact-model>
	<updateaddr-model :param="addrParam" v-if="addrParam.show"></updateaddr-model>
	<deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
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
            <div class="client-section clearfix" >
                <div class="col-md-8 client-detail">
                    <h4 class="section_title">相关</h4>
                    <article>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.contacts,
						            	crete:'contacts'
						            	})">
										<img class="pull-left" src="/static/images/contact.png" height="32" width="27"/>
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											联系人（{{initClientDetail.contacts.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right"  @click.stop="createFormt({
		                                     id:param.id,
		                                     customerId:param.id,
		                                     title:'联系人',
		                                     show:true,
		                                     name:'',
		                                     position:'',
		                                     department:'',
		                                     phone:'',
		                                     tel:'',
		                                     email:'',
		                                     qq:'',
		                                     wechart:'',
		                                     main:'',
		                                     namelist:'客户名称',
		                                     job:'联系人职位',
		                                     parten:'联系人部门',
		                                     phonelist:'手机',
		                                     tellist:'电话',
		                                     emaillist:'邮箱',
		                                     QQ:'qq',
		                                     webchart:'微信',
		                                     remark:'备注',
		                                     link:createCustomer,
		                                     url:'/customer/contact',
		                                     key:'contacts'
		                                     })">新建</button>
									</h4>
                                </div>
                                <div class="panel-collapse" v-show="!initClientDetail.contacts.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                        	<thead>
                                        		<th>客户名称</th>
                                        		<th>联系人职位</th>
                                        		<th>联系人部门</th>
                                        		<th>手机</th>
                                        		<th>电话</th>
                                        		<th>邮箱</th>
                                        		<th>qq</th>
                                        		<th>微信</th>
                                        		<th>备注</th>
                                        	</thead>
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail.contacts.arr">
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.position}}</td>
		                                            <td>{{item.department}}</td>
		                                            <td>{{item.phone}}</td>
		                                            <td>{{item.tel}}</td>
		                                            <td>{{item.email}}</td>
		                                            <td>{{item.qq}}</td>
		                                            <td>{{item.wechart}}</td>
		                                            <td>{{item.main}}</td>
		                                            <td  @click="clickShow($index,{
		                                            	concrete:'contacts'
		                                            	})">
		                                            	<img src="/static/images/default_arrow.png" height="24" width="24" />
				                                        <div class="breed_action" v-show="item.show">
				                                            <dl>
				                                               <dt @click="updateSpec({
				                                                   sub:$index,
				                                                   id:item.id,
				                                                   show:true,
				                                                   title:'联系人',
				                                                   namelist:'客户名称',
								                                   job:'联系人职位',
								                                   parten:'联系人部门',
								                                   phonelist:'手机',
								                                   tellist:'电话',
								                                   emaillist:'邮箱',
								                                   QQ:'qq',
								                                   webchart:'微信',
								                                   remark:'备注',
				                                                   name:item.name,
				                                                   position:item.position,
				                                                   department:item.department,
				                                                   phone:item.phone,
				                                                   tel:item.tel,
				                                                   email:item.email,
				                                                   qq:item.qq,
				                                                   wechart:item.wechart,
				                                                   main:item.main,
				                                                   link:updateContact,
				                                                   url:'/customer/contact',
				                                                   key:'contacts',
				                                                   headline:'clientDetail'
				                                                   },item.show=false)">编辑</dt>
				                                               <dt @click="specDelete({
				                                                   id:item.id,
				                                                   show:true,
				                                                   name:item.name,
				                                                   title:'联系人',
				                                                   link:specDel,
				                                                   url:'/customer/contact/',
				                                                   key:'contacts',
				                                                   headline:'clientDetail'
				                                                   },item.show=false)">删除</dt>
				                                           </dl>
				                                        </div>
		                                            </td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.chance,
						            	crete:'chance'
						            	})">
										<img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											业务机会（{{initClientDetail.chance.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="initClientDetail.chance.show">
                                    <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>类型</th>
                                        		<th>特殊的</th>
                                        		<th>品种名称</th>
                                        		<th>资格资质</th>
                                        		<th>规格</th>
                                        		<th>单位</th>
                                        		<th>交收地址</th>
                                        		<th>预付比例</th>
                                        		<th>发票</th>
                                        		<th>上门看货</th>
                                        		<th>包装</th>
                                        		<th>是否国际</th>
                                        		<th>提供样品</th>
                                        		<th>样品数量</th>
                                        		<th>样品单位</th>
                                        		<th>样品总价</th>
                                        		<th>报价总数</th>
                                        		<th>报价均价</th>
                                        		<th>报价供货总数</th>
                                        		<th>状态</th>
                                        	</thead>
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail.chance.arr">
		                                            <td>{{item.type}}</td>
		                                            <td>{{item.especial}}</td>
		                                            <td>{{item.breed_name}}</td>
		                                            <td>{{item.qualification}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.quality}}</td>
		                                            <td>{{item.location}}</td>
		                                            <td>{{item.spec}}</td>
		                                            <td>{{item.price}}</td>
		                                            <td>{{item.unit}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.advance}}</td>
		                                            <td>{{item.invoic}}</td>
		                                            <td>{{item.visit}}</td>
		                                            <td>{{item.pack}}</td>
		                                            <td>{{item.intl}}</td>
		                                            <td>{{item.sampling}}</td>
		                                            <td>{{item.sample_number}}</td>
		                                            <td>{{item.sample_unit}}</td>
		                                            <td>{{item.sample_amount}}</td>
		                                            <td>{{item.offer}}</td>
		                                            <td>{{item.offer_vprice}}</td>
		                                            <td>{{item.offer_total}}</td>
		                                            <td>{{item.status}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                             <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.intent,
						            	crete:'intent'
						            	})">
										<img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											意向（{{initClientDetail.intent.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="initClientDetail.intent.show">
                                    <div class="panel-body panel-set">
                                         <table class="table contactSet">
                                        	<thead>
                                        		<th>药品名称</th>
                                        		<th>药品编号</th>
                                        		<th>药品类型</th>
                                        		<th>所属公司</th>
                                        		<th>公司地址</th>
                                        		<th>说明</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail">
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.drugType}}</td>
		                                            <td>{{item.company}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.orders,
						            	crete:'orders'
						            	})">
										<img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											订单（{{initClientDetail.orders.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="initClientDetail.orders.show">
                                    <div class="panel-body panel-set">
                                         <table class="table contactSet">
                                        	<thead>
                                        		<th>药品名称</th>
                                        		<th>药品编号</th>
                                        		<th>药品类型</th>
                                        		<th>所属公司</th>
                                        		<th>公司地址</th>
                                        		<th>说明</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail.orders">
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.drugType}}</td>
		                                            <td>{{item.company}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <!-- <p class="contact-view">查看全部</p> -->
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.contract,
						            	crete:'contract'
						            	})">
										<img class="pull-left" src="/static/images/compact.png" height="32" width="27"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											合同（{{initClientDetail.contract.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="initClientDetail.contract.show">
                                    <div class="panel-body panel-set">
                                         <table class="table contactSet">
                                        	<thead>
                                        		<th>药品名称</th>
                                        		<th>药品编号</th>
                                        		<th>药品类型</th>
                                        		<th>所属公司</th>
                                        		<th>公司地址</th>
                                        		<th>说明</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail">
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.drugType}}</td>
		                                            <td>{{item.company}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"  >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.files,
						            	crete:'files'
						            	})">
										<img class="pull-left" src="/static/images/file.png" height="34" width="26"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											文件（{{initClientDetail.files.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.files.show">
                                   <div class="panel-body panel-set">
                                         <table class="table contactSet">
                                        	<thead>
                                        		<th>药品名称</th>
                                        		<th>药品编号</th>
                                        		<th>药品类型</th>
                                        		<th>所属公司</th>
                                        		<th>公司地址</th>
                                        		<th>说明</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail.files">
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.drugType}}</td>
		                                            <td>{{item.company}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix"  @click="enfoldment({
						            	link:initClientDetail.track,
						            	crete:'track'
						            	})">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											跟进（{{initClientDetail.track.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="initClientDetail.track.show">
                                   <div class="panel-body panel-set">
	                                    <table class="table contactSet">
                                        	<thead>
                                        		<th>药品名称</th>
                                        		<th>药品编号</th>
                                        		<th>药品类型</th>
                                        		<th>所属公司</th>
                                        		<th>公司地址</th>
                                        		<th>说明</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail">
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.drugType}}</td>
		                                            <td>{{item.company}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                             <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.remark,
						            	crete:'remark'
						            	})">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											备注（{{initClientDetail.remark.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="initClientDetail.remark.show">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>药品名称</th>
                                        		<th>药品编号</th>
                                        		<th>药品类型</th>
                                        		<th>所属公司</th>
                                        		<th>公司地址</th>
                                        		<th>说明</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail">
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.drugType}}</td>
		                                            <td>{{item.company}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.spec}}</td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <p class="contact-view">查看全部</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.addresses,
						            	crete:'addresses'
						            	})">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											收货地址（{{initClientDetail.addresses.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right" @click.stop="createAddr({
		                                     customerId:param.id,
		                                     id:param.id,
		                                     show:true,
		                                     title:'收货地址',
                                             typelist:'类型',
                                             namelist:'联系人姓名',
		                                     phonelist:'联系人电话',
		                                     sexlist:'性别',
		                                     countylist:'国家',
		                                     provicelist:'所在省',
		                                     citylist:'所在市',
		                                     addr_detail:'地址',
		                                     distlist:'所在区域',
		                                     streetlist:'所在街道',
		                                     addr:'详细地址',
                                             type:'',
                                             contact_name:'',
                                             contact_phone:'',
                                             sex:'',
                                             country:'',
                                             province:'',
                                             city:'',
                                             district:'',
                                             street:'',
                                             detail_addr:'',
                                             address:'',
		                                     link:createAddress,
		                                     url:'/customer/insertAddress',
		                                     key:'addresses'
		                                     })">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.addresses.show">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>类型</th>
                                        		<th>联系人姓名</th>
                                        		<th>联系人手机</th>
                                        		<th>性别</th>
                                        		<th>国家</th>
                                        		<th>所在省</th>
                                        		<th>所在市</th>
                                        		<th>所在区域</th>
                                        		<th>所在街道</th>
                                        		<th>地址</th>
                                        		<th>详细地址</th>
                                        	</thead>
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail.addresses.arr">
		                                            <td>{{item.type}}</td>
		                                            <td>{{item.contact_name}}</td>
		                                            <td>{{item.contact_phone}}</td>
		                                            <td>{{item.sex}}</td>
		                                            <td>{{item.country}}</td>
		                                            <td>{{item.province}}</td>
		                                            <td>{{item.city}}</td>
		                                            <td>{{item.district}}</td>
		                                            <td>{{item.street}}</td>
		                                            <td>{{item.detail_addr}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td  @click="clickShow($index,{
		                                            	concrete:'addresses'
		                                            	})">
		                                            	<img src="/static/images/default_arrow.png" height="24" width="24" />
				                                        <div class="breed_action" v-show="item.show" >
				                                           <dl>
				                                               <dt @click="updateAddr({
				                                                   sub:$index,
				                                                   id:item.id,
				                                                   customerId:item.customer_id,
				                                                   show:true,
				                                                   title:'收货地址',
				                                                   typelist:'类型',
				                                                   namelist:'联系人姓名',
								                                   phonelist:'联系人电话',
								                                   sexlist:'性别',
								                                   countylist:'国家',
								                                   provicelist:'所在省',
								                                   citylist:'所在市',
								                                   addr_detail:'地址',
								                                   distlist:'所在区域',
								                                   streetlist:'所在街道',
								                                   addr:'详细地址',
				                                                   type:item.type,
				                                                   contact_name:item.contact_name,
				                                                   contact_phone:item.contact_phone,
				                                                   sex:item.sex,
				                                                   country:item.country,
				                                                   province:item.province,
				                                                   city:item.city,
				                                                   district:item.district,
				                                                   street:item.street,
				                                                   detail_addr:item.detail_addr,
				                                                   address:item.address,
				                                                   link:addrInfo,
				                                                   url:'/customer/updateAddress',
				                                                   key:'addresses',
				                                                   headline:'clientDetail'
				                                                   },item.show=false)">编辑</dt>
				                                               <dt @click="specDelete({
				                                                   id:item.id,
				                                                   show:true,
				                                                   title:'收货地址',
				                                                   link:specDel,
				                                                   url:'/customer/deleteAddress/',
				                                                   key:'addresses',
				                                                   headline:'clientDetail'
				                                                   },item.show=false)">删除</dt>
				                                           </dl> 
				                                        </div>
		                                            </td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                    </div>
                                </div>
                            </div>
                             <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.labels,
						            	crete:'labels'
						            	})">
										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											标签（{{initClientDetail.labels.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.labels.show">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>客户ID</th>
                                        		<th>标签</th>
                                        		<th>状态</th>
                                        		<th></th>
                                        	</thead>
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail.labels.arr">
		                                            <td>{{item.customer_id}}</td>
		                                            <td>{{item.label}}</td>
		                                            <td>{{item.status}}</td>
		                                            <td  @click="clickShow($index,{
		                                            	concrete:'labels'
		                                            	})">
		                                            	<img src="/static/images/default_arrow.png" height="24" width="24" />
				                                        <div class="breed_action" v-show="item.show" >
				                                           <dl>
				                                               <dt @click="updateAddr({
				                                                   sub:$index,
				                                                   id:item.id,
				                                                   customerId:item.customer_id,
				                                                   show:true,
				                                                   link:addrInfo,
				                                                   url:'/customer/updateAddress',
				                                                   key:'labels',
				                                                   headline:'clientDetail'
				                                                   },item.show=false)">编辑</dt>
				                                               <dt @click="specDelete({
				                                                   id:item.id,
				                                                   show:true,
				                                                   title:'标签',
				                                                   link:specDel,
				                                                   url:'/customer/deleteAddress/',
				                                                   key:'labels',
				                                                   headline:'clientDetail'
				                                                   },item.show=false)">删除</dt>
				                                           </dl> 
				                                        </div>
		                                            </td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix" @click="enfoldment({
						            	link:initClientDetail.products,
						            	crete:'products'
						            	})">
										<img class="pull-left" src="/static/images/order.png" height="30" width="30"  />
										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
											产品（{{initClientDetail.products.arr.length}}）
										</a>
										<button type="button" class="btn btn-base pull-right">新建</button>
									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="initClientDetail.products.show">
                                    <div class="panel-body panel-set">
                                         <table class="table contactSet">
                                        	<thead>
                                        		<th>药品名称</th>
                                        		<th>药品编号</th>
                                        		<th>药品类型</th>
                                        		<th>所属公司</th>
                                        		<th>公司地址</th>
                                        		<th>说明</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail">
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.drugType}}</td>
		                                            <td>{{item.company}}</td>
		                                            <td>{{item.address}}</td>
		                                            <td>{{item.spec}}</td>
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
                <div class="col-md-4">
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
                                    <label>备注</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.comments" value="{{initClientDetail.comments}}" />
                                </div>
                                <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
	                                <label>注册地址</label>
	                                <input type="text" class="form-control" v-model='initClientDetail.address' value="{{initClientDetail.address}}"/>
	                            </div> 
                            </div>
                            <div class="client-detailInfo">
                                <label>经营范围</label>
                                <input type="text" class="form-control" v-model="initClientDetail.biz_scope" value="{{initClientDetail.biz_scope}}"/>
                            </div>
                            <div class="client-detailInfo">
                                <img class="left" src="/static/images/blackselect.png" height="28" width="28" />
                                <label>加入黑名单</label>
                            </div>
                            <div class="client-editbtn">
                                <button type="button" class="btn btn-orange" @click="alterInfo(initClientDetail,initClientDetail.id,{key:'customerList'})">编辑</button>
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
import createcustModel  from '../clientRelate/createClientDetail'
import createaddrModel from '../clientRelate/createAddrInfo'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import updatecontactModel  from '../clientRelate/updateContactInfo'
import updateaddrModel from '../clientRelate/updataAddrInfo'
import {
	initClientDetail
} from '../../vuex/getters'
import {
	getClientDetail,
	createCustomer,
	specDel,
	updateContact,
	addrInfo,
	createAddress,
	alterInfo
} from '../../vuex/actions'
export default {
    components: {
        pressImage,
        createcustModel,
        deletebreedModel,
        updatecontactModel,
        updateaddrModel,
        createaddrModel
    },
    props:['param'],
    data(){
    	return {
    		custParam:{
    			show:false,
    			id:''
    		},
    		deleteParam:{
    			show:false
    		},
    		updateParam:{
    			show:false
    		},
    		addrParam:{
    			show:false
    		},
    		addressParam:{
    			show:false
    		},
    		show:true
    	}
    },
    vuex:{
    	getters:{
			initClientDetail
    	},
    	actions:{
    		getClientDetail,
    		createCustomer,
    		specDel,
    		updateContact,
    		addrInfo,
    		createAddress,
    		alterInfo
    	}
    },
    methods:{
    	enfoldment:function(param){
    		if(this.$store.state.table.clientDetail[param.crete].arr.length==0){
                this.$store.state.table.clientDetail[param.crete].show=false
            }
            this.$store.state.table.clientDetail[param.crete].show = !this.$store.state.table.clientDetail[param.crete].show;
    	},
    	clickShow: function(id,param) {
            if (this.$store.state.table.clientDetail[param.concrete].arr[id].show) {
                this.$store.state.table.clientDetail[param.concrete].arr[id].show = !this.$store.state.table.clientDetail[param.concrete].arr[id].show
            } else {
                this.$store.state.table.clientDetail[param.concrete].arr[id].show = true
            }
        },
    	createFormt: function(initClientDetail){
            this.custParam=initClientDetail;
        },
        createAddr:function(initBreedDetail){
        	this.addressParam = initBreedDetail;
        },
        specDelete:function(initBreedDetail){
            this.deleteParam = initBreedDetail;
        },
        updateSpec:function(initBreedDetail){
        	this.updateParam = initBreedDetail;
        },
        updateAddr:function(initBreedDetail){
        	this.addrParam = initBreedDetail;
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
.breed_action dl dt{
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
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
.contactSet thead{
	color:#fa6705;
}
.panel-title-set {
    margin-top: 6px;
    margin-left: 26px;
    display: inline-block;
    font-size: 20px;
    color: #333;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}

.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
	text-align: left;
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
.breed_action{
	top: 10px;
	right: 30px;
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

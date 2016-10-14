<template>
	<createcust-model :param="custParam" v-if="custParam.show"></createcust-model>
	<createaddr-model :param="addressParam" v-if="addressParam.show"></createaddr-model>
	<createlabel-model :param="labelParam" v-if="labelParam.show"></createlabel-model>
	<updatecontact-model :param="updateParam" v-if="updateParam.show"></updatecontact-model>
	<updateaddr-model :param="addrParam" v-if="addrParam.show"></updateaddr-model>
	<updatelabel-model :param="updlabelParam" v-if="updlabelParam.show"></updatelabel-model>
	<deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
	<createfiles-model :param="cfilesParam" v-if="cfilesParam.show"></createfiles-model>
	<createtrack-model :param="ctrackParam" v-if="ctrackParam.show"></createtrack-model>
	<createproduct-model :param="cproductParam" v-if="cproductParam.show"></createproduct-model>
  <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
  <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
  <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
    <div class="client_body">
    	<div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <a class="navbar-brand navbar-name" href="#">{{param.name}}</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right" style="margin-top:8px;">
                         <li>
                            <button type="button" class="btn btn-base" @click="specDelete({
                                                id:param.id,
                                                sub:param.sub,
                                                show:true,
                                                name:param.name,
                                                title:param.name,
                                                link:deleteInfo,
                                                url:'/customer/',
                                                key:'customerList'
                                                })">删除客户信息</button>
                        </li>
                         <li>
                            <button type="button" class="btn btn-base"  @click="createTrack({
                                             status:'',
                                             link:createLabel,
                                             url:'/customer/insertLabel',
                                             key:'labels'
                                             })">新建跟进</button>
                        </li>
                        <li>
                            <button type="button" class="btn btn-base"  @click="newlabel({
                                             customerId:param.id,
                                             id:param.id,
                                             show:true,
                                             title:'标签',
                                             labelist:'标签',
                                             statuslist:'类型',
                                             label:'',
                                             status:'',
                                             link:createLabel,
                                             url:'/customer/insertLabel',
                                             key:'labels'
                                             })">新建标签</button>
                        </li>
                      <li v-if="initClientDetail.blacklist==0">
                        <button type="button" class="btn btn-base"  @click="clientTransferBlack()">加入黑名单</button>
                      </li>
                      <li v-if="initClientDetail.blacklist==1">
                        <button type="button" class="btn btn-base"  @click="clientTransferBlack()">踢出黑名单</button>
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
      		                                     main:0,
      		                                     namelist:'联系人姓名',
      		                                     job:'联系人职位',
      		                                     parten:'联系人部门',
      		                                     phonelist:'手机',
      		                                     tellist:'电话',
      		                                     emaillist:'邮箱',
      		                                     QQ:'qq',
      		                                     webchart:'微信',
      		                                     link:createCustomer,
      		                                     url:'/customer/contact',
      		                                     key:'contacts'
      		                                     })">新建</button>
                  									</h4>
                                </div>
                                <div class="panel-collapse" v-show="!initClientDetail.contacts.show&&initClientDetail.contacts.arr.length>0">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                        	<thead>
                                        		<th>联系人姓名</th>
                                        		<th>联系人职位</th>
                                        		<th>联系人部门</th>
                                        		<th>手机</th>
                                        		<th>电话</th>
                                        		<th>邮箱</th>
                                        		<th>qq</th>
                                        		<th>微信</th>
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
				                                                   namelist:'联系人姓名',
        								                                   job:'联系人职位',
        								                                   parten:'联系人部门',
        								                                   phonelist:'手机',
        								                                   tellist:'电话',
        								                                   emaillist:'邮箱',
        								                                   QQ:'qq',
        								                                   webchart:'微信',
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
				                                                   })">编辑</dt>
				                                               <dt @click="specDelete({
				                                                   id:item.id,
				                                                   sub:$index,
				                                                   show:true,
				                                                   name:item.name,
				                                                   title:'联系人',
				                                                   link:specDel,
				                                                   url:'/customer/contact/',
				                                                   key:'contacts',
				                                                   headline:'clientDetail'
				                                                   })">删除</dt>
				                                           </dl>
				                                        </div>
		                                            </td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                    </div>
                                </div>
                            </div>
                           <!--  <div class="panel panel-default">
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
                               <div  class="panel-collapse" v-show="!initClientDetail.chance.show">
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
                                   </div>
                               </div>
                           </div> -->
                           <div class="panel panel-default">
                              <div class="panel-heading" v-cloak>
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                    						            	link:initClientDetail.files,
                    						            	crete:'files'
                    						            	})">
                    										<img class="pull-left" src="/static/images/file.png" height="29" width="26"  />
                    										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                    											文件（{{initClientDetail.files.arr.length}}）
                    										</a>
                    										<button type="button" class="btn btn-base pull-right" @click.stop="createfiles({
                      											 customerId:param.id,
                                             id:param.id,
    		                                     show:true,
                                             type:'',
                                             path:'',
                                             catagory:'',
    		                                     link:uploadFiles,
    		                                     url:'/customer/file',
    		                                     key:'files'
                      											})">新建</button>
                          				</h4>
                              </div>
                              <div  class="panel-collapse" v-show="!initClientDetail.files.show&&initClientDetail.files.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                      	<thead>
                                      		<th>文件路径</th>
                                      		<th>文件类型</th>
                                      		<th>文件分类</th>
                                      		<th></th>
                                      	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail.files.arr">
		                                            <!-- <td><img v-bind:src="item.path" /></td> -->
                                                <td><img v-bind:src="item.path" /></td>
		                                            <td>{{item.type}}</td>
		                                            <td>{{item.catagory}}</td>
                                                <td  @click="clickShow($index,{
                                                    concrete:'files'
                                                    })">
                                                    <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="files_action" v-show="item.show" >
                                                        <dl>
                                                            <dt @click="specDelete({
                                                                 id:item.id,
                                                                 sub:$index,
                                                                 show:true,
                                                                 title:'文件',
                                                                 link:specDel,
                                                                 url:'/customer/file/',
                                                                 key:'files',
                                                                 headline:'clientDetail'
                                                                 })">删除</dt>
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
                              <div class="panel-heading" v-cloak>
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initClientDetail.intention,
                                              crete:'intention'
                                              })">
                                        <img class="pull-left" src="/static/images/file.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          意向（{{initClientDetail.intention.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right" @click.stop="createIntention()">新建</button>
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="!initClientDetail.intention.show&&initClientDetail.intention.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                            <th>品种</th>
                                            <th>产地</th>
                                            <th>规格</th>
                                            <th>数量</th>
                                            <th>价格</th>
                                            <th>单位</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in initClientDetail.intention.arr">
                                                <td>{{item.breedName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td  @click="clickShow($index,{
                                                  concrete:'intention'
                                                  })">
                                                  <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                <div class="breed_action" v-show="item.show">
                                                       <dt @click="updateIntention(
                                                            intentionParam.sub=$index,
                                                            intentionParam.id=item.id,
                                                            intentionParam.breedName=item.breedName,
                                                            intentionParam.price=item.price,
                                                            intentionParam.unit=item.unit,
                                                            intentionParam.especial=item.especial,
                                                            intentionParam.quality=item.quality,
                                                            intentionParam.spec=item.spec,
                                                            intentionParam.number=item.number,
                                                            intentionParam.location=item.location,
                                                            intentionParam.type=item.type,
                                                            intentionParam.country=item.country,
                                                            intentionParam.province=item.province,
                                                            intentionParam.city=item.city,
                                                            intentionParam.district=item.district,
                                                            intentionParam.address=item.address,
                                                            intentionParam.invoic=item.invoic,
                                                            intentionParam.sampling=item.sampling,
                                                            intentionParam.sampleUnit=item.sampleUnit,
                                                            intentionParam.advance=item.advance,
                                                            intentionParam.intl=item.intl,
                                                            intentionParam.sampleNumber=item.sampleNumber,
                                                            intentionParam.sampleAmount=item.sampleAmount,
                                                            intentionParam.qualification=item.qualification,
                                                            intentionParam.breedId=item.intentionParam,
                                                            intentionParam.pack=item.pack,
                                                            intentionParam.visit=item.visit,
                                                            intentionParam.duedate=item.duedate,
                                                            intentionParam.breedId=item.breedId
                                                        )">编辑</dt>
                                                </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                  </div>
                              </div>
                          </div>

                          <div class="panel panel-default">
                              <div class="panel-heading" v-cloak>
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initClientDetail.orders,
                                              crete:'orders'
                                              })">
                                        <img class="pull-left" src="/static/images/file.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          订单（{{initClientDetail.orders.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button>
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="!initClientDetail.orders.show&&initClientDetail.orders.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>订单流水号</th>
                                          <th></th>
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initClientDetail.orders.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>20160819</td>
                                                <td  @click="clickShow($index,{
                                                    concrete:'files'
                                                    })">
                                                    <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="files_action" v-show="item.show" >
                                                        <dl>
                                                            <dt @click="specDelete({
                                                                 id:item.id,
                                                                 sub:$index,
                                                                 show:true,
                                                                 title:'文件',
                                                                 link:specDel,
                                                                 url:'/customer/file/',
                                                                 key:'files',
                                                                 headline:'clientDetail'
                                                                 })">删除</dt>
                                                        </dl>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                  </div>
                              </div>
                          </div>
                           <!--  <div class="panel panel-default">
                               <div class="panel-heading">
                                   <h4 class="panel-title clearfix" >
                           										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
                           										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                           											跟进（）
                           										</a>
                           										<button type="button" class="btn btn-base pull-right" @click.stop="createtrack({
                           											 customerId:param.id,
         		                                     id:param.id,
         		                                     contactId:param.id,
         		                                     bizId:param.id,
         		                                     show:true,
                                                  type:'',
                                                  trackingWay:'',
                                                  comments:'',
         		                                     link:createTrack,
         		                                     url:'/customer/insertTracking',
         		                                     key:'tracks'
                           											})">新建</button>
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
                           </div> -->
                             <div class="panel panel-default" collapse>
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                  						            	link:initClientDetail.remarks,
                  						            	crete:'remarks'
                  						            	})">
                  										<img class="pull-left" src="/static/images/remark.png" height="30" width="27"  />
                  										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                  											备注（{{initClientDetail.remarks.arr.length}}）
                  										</a>
                  										<button type="button" class="btn btn-base pull-right" @click.stop="newlabel({
    		                                     customerId:param.id,
    		                                     id:param.id,
    		                                     show:true,
    		                                     title:'备注',
                                             labelist:'备注',
                                             statuslist:'状态',
                                             remark:'',
                                             status:'',
    		                                     link:createRemark,
    		                                     url:'/customer/remark',
    		                                     key:'remarks'
    		                                     })">新建</button>
                  									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.remarks.show&&initClientDetail.remarks.arr.length>0">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>备注</th>
                                        		<th>状态</th>
                                        		<th></th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail.remarks.arr">
		                                            <td>{{item.remark}}</td>
		                                            <td>{{item.status}}</td>
		                                            <td  @click="clickShow($index,{
		                                            	concrete:'remarks'
		                                            	})">
		                                            	<img  src="/static/images/default_arrow.png" height="24" width="24"  style="margin-right:0" />
				                                        <div class="label_action" v-show="item.show" >
				                                           <dl>
				                                               <dt @click="updatelabel({
				                                                   sub:$index,
				                                                   id:item.id,
				                                                   customerId:item.customerId,
				                                                   show:true,
				                                                   title:'备注',
  					                                               labelist:'备注',
  					                                               statuslist:'状态',
  					                                               remark:item.remark,
  					                                               status:item.status,
				                                                   link:alterRemark,
				                                                   url:'/customer/remark',
				                                                   key:'remarks',
				                                                   headline:'clientDetail'
				                                                   })">编辑</dt>
				                                               <dt @click="specDelete({
				                                                   id:item.id,
                                                           sub:$index,
				                                                   show:true,
				                                                   title:'备注',
				                                                   link:specDel,
				                                                   url:'/customer/remark/',
				                                                   key:'remarks',
				                                                   headline:'clientDetail'
				                                                   })">删除</dt>
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
              						            	link:initClientDetail.addresses,
              						            	crete:'addresses'
              						            	})">
                    										<img class="pull-left" src="/static/images/addr.png" height="30" width="26"  />
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
                                               contactName:'',
                                               contactPhone:'',
                                               sex:'',
                                               country:'',
                                               province:'',
                                               city:'',
                                               district:'',
                                               street:'',
                                               detailAddr:'',
                                               address:'',
      		                                     link:createAddress,
      		                                     url:'/customer/insertAddress',
      		                                     key:'addresses'
      		                                     })">新建</button>
								                	   </h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.addresses.show&&initClientDetail.addresses.arr.length>0">
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
		                                            <td>{{item.contactName}}</td>
		                                            <td>{{item.contactPhone}}</td>
		                                            <td>{{item.sex}}</td>
		                                            <td>{{item.country}}</td>
		                                            <td>{{item.province}}</td>
		                                            <td>{{item.city}}</td>
		                                            <td>{{item.district}}</td>
		                                            <td>{{item.street}}</td>
		                                            <td>{{item.detailAddr}}</td>
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
				                                                   customerId:item.customerId,
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
				                                                   contactName:item.contactName,
				                                                   contactPhone:item.contactPhone,
				                                                   sex:item.sex,
				                                                   country:item.country,
				                                                   province:item.province,
				                                                   city:item.city,
				                                                   district:item.district,
				                                                   street:item.street,
				                                                   detailAddr:item.detailAddr,
				                                                   address:item.address,
				                                                   link:addrInfo,
				                                                   url:'/customer/updateAddress',
				                                                   key:'addresses',
				                                                   headline:'clientDetail'
				                                                   })">编辑</dt>
				                                               <dt @click="specDelete({
				                                                   id:item.id,
				                                                   sub:$index,
				                                                   show:true,
				                                                   title:'收货地址',
				                                                   link:addrDel,
				                                                   url:'/customer/deleteAddress/',
				                                                   key:'addresses',
				                                                   headline:'clientDetail'
				                                                   })">删除</dt>
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
                  										<img class="pull-left" src="/static/images/label.png" height="30" width="26"  />
                  										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                  											标签（{{initClientDetail.labels.arr.length}}）
                  										</a>
                  										<button type="button" class="btn btn-base pull-right" @click.stop="newlabel({
    		                                     customerId:param.id,
    		                                     id:param.id,
    		                                     show:true,
    		                                     title:'标签',
                                             labelist:'标签',
                                             statuslist:'类型',
                                             label:'',
                                             status:'',
    		                                     link:createLabel,
    		                                     url:'/customer/insertLabel',
    		                                     key:'labels'
    		                                     })">新建</button>
                  									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.labels.show&&initClientDetail.labels.arr.length>0">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>标签</th>
                                        		<th></th>
                                        	</thead>
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail.labels.arr">
		                                            <td>{{item.label}}</td>
		                                            <td  @click="clickShow($index,{
		                                            	concrete:'labels'
		                                            	})">
		                                            	<img src="/static/images/default_arrow.png" height="24" width="24" style="margin-right:0" />
				                                        <div class="label_action" v-show="item.show" >
				                                           <dl>
				                                               <dt @click="updatelabel({
				                                                   sub:$index,
				                                                   id:item.id,
				                                                   customerId:item.customerId,
				                                                   show:true,
				                                                   title:'标签',
  					                                               labelist:'标签',
  					                                               statuslist:'类型',
  					                                               label:item.label,
  					                                               status:item.status,
				                                                   link:alterLabel,
				                                                   url:'/customer/updateLabel',
				                                                   key:'labels',
				                                                   headline:'clientDetail'
				                                                   })">编辑</dt>
				                                               <dt @click="specDelete({
				                                                   id:item.id,
				                                                   sub:$index,
				                                                   show:true,
				                                                   title:'标签',
				                                                   link:addrDel,
				                                                   url:'/customer/deleteLable/',
				                                                   key:'labels',
				                                                   headline:'clientDetail'
				                                                   })">删除</dt>
				                                           </dl>
				                                        </div>
		                                            </td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default" v-cloak>
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                  						            	link:initClientDetail.products,
                  						            	crete:'products'
                  						            	})">
                  										<img class="pull-left" src="/static/images/product.png" height="27" width="27"  />
                  										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                  											产品（{{initClientDetail.products.arr.length}}）
                  										</a>
                  										<button type="button" class="btn btn-base pull-right" @click.stop="newproduct({
    		                                     cid:param.id,
    		                                     id:param.id,
    		                                     show:true,
    		                                     title:'新建产品',
                                             type:'',
                                             name:'',
                                             breedId:'',
                                             quality:'',
                                             location:'',
                                             spec:'',
                                             number:'',
                                             price:'',
                                             unit:'',
                                             duedate:'',
                                             coa:'',
    		                                     link:createProduct,
    		                                     url:'/customer/product',
    		                                     key:'products'
    		                                     })">新建</button>
                  									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.products.show&&initClientDetail.products.arr.length>0">
                                    <div class="panel-body panel-set">
                                         <table class="table contactSet">
                                        	<thead>
                                        		<th>类型</th>
                                        		<th>名称</th>
                                        		<th>品种ID</th>
                                        		<th>质量</th>
                                        		<th>产地</th>
                                        		<th>规格</th>
                                        		<th>数量</th>
                                        		<th>价格</th>
                                        		<th>单位</th>
                                        		<th>价格过期时间</th>
                                        		<th>检测报告</th>
                                        		<th></th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail.products.arr">
		                                            <td>{{item.type}}</td>
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.breedId}}</td>
		                                            <td>{{item.quality}}</td>
		                                            <td>{{item.location}}</td>
		                                            <td>{{item.spec}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.price}}</td>
		                                            <td>{{item.unit}}</td>
		                                            <td>{{item.duedate}}</td>
		                                            <td>{{item.coa}}</td>
		                                            <td  @click="clickShow($index,{
		                                            	concrete:'products'
		                                            	})">
		                                            	<img src="/static/images/default_arrow.png" height="24" width="24" />
				                                        <div class="breed_action" v-show="item.show" >
				                                           <dl>
				                                               <dt @click="newproduct({
				                                                   sub:$index,
				                                                   id:item.id,
				                                                   cid:item.cid,
				                                                   show:true,
				                                                   title:'编辑产品',
				                                                   type:item.type,
				                                                   name:item.name,
				                                                   breedId:item.breedId,
				                                                   quality:item.quality,
				                                                   location:item.location,
				                                                   spec:item.spec,
				                                                   number:item.number,
				                                                   price:item.price,
				                                                   unit:item.unit,
				                                                   duedate:item.duedate,
				                                                   coa:item.coa,
				                                                   link:alterProduct,
				                                                   url:'/customer/product',
				                                                   key:'products',
				                                                   headline:'clientDetail'
				                                                   })">编辑</dt>
				                                               <!-- <dt @click="specDelete({
				                                                   id:item.id,
				                                                   sub:$index,
				                                                   show:true,
				                                                   title:'产品',
				                                                   link:addrDel,
				                                                   url:'/customer/deleteAddress/',
				                                                   key:'products',
				                                                   headline:'clientDetail'
				                                                   })">删除</dt> -->
				                                           </dl>
				                                        </div>
		                                            </td>
		                                        </tr>
		                                    </tbody>
		                                </table>
                                        <!-- <p class="contact-view">查看全部</p> -->
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
                                    <input type="text" class="form-control" v-model="initClientDetail.name" value="{{initClientDetail.name}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>类型</label>
                                    <input v-if="initClientDetail.type==0" type="text" class="form-control"  value="个人" disabled="disabled" />
                                    <input v-if="initClientDetail.type==1" type="text" class="form-control"  value="企业" disabled="disabled" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>分类码</label>
                                    <input type="text" class="form-control"  v-model="initClientDetail.category" value="{{initClientDetail.category}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>电话</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.tel" value="{{initClientDetail.tel}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>负责人</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.principal" value="{{initClientDetail.principal}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>所在省</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.province" value="{{initClientDetail.province}}" disabled="disabled" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>邮箱</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.email" value="{{initClientDetail.email}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>所在市</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.city" value="{{initClientDetail.city}}" disabled="disabled" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>备注</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.comments" value="{{initClientDetail.comments}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
	                                <label>注册地址</label>
	                                <input type="text" class="form-control" v-model='initClientDetail.address' value="{{initClientDetail.address}}" disabled="disabled" />
	                            </div>
                            </div>
                            <div class="client-detailInfo">
                                <label>经营范围</label>
                                <input type="text" class="form-control" v-model="initClientDetail.bizScope" value="{{initClientDetail.bizScope}}" disabled="disabled" />
                            </div>
                            <!-- <div class="client-detailInfo">
                                <img class="left" src="/static/images/blackselect.png" height="28" width="28" />
                                <label>加入黑名单</label>
                            </div>
                           -->
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import pressImage from '../../components/imagePress'
import tipsdialogModel from '../tipsDialog'
import createcustModel  from '../clientRelate/createClientDetail'
import createaddrModel from '../clientRelate/createAddrInfo'
import createlabelModel from '../clientRelate/label/createLabel'
import updatelabelModel from '../clientRelate/label/updatelebel'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import updatecontactModel from '../clientRelate/updateContactInfo'
import updateaddrModel from '../clientRelate/updataAddrInfo'
import createfilesModel from  '../clientRelate/createFiles'
import createtrackModel from '../clientRelate/label/createTrack'
import createproductModel from  '../clientRelate/label/createProduct'
import intentionModel from  '../user/userIntention'
import auditDialog from '../tips/auditDialog'
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
	alterInfo,
	addrDel,
	createLabel,
	alterLabel,
	createRemark,
	alterRemark,
	createProduct,
	alterProduct,
	uploadFiles,
  deleteInfo,
  customerTransferBlacklist
} from '../../vuex/actions'
export default {
    components: {
        pressImage,
        createcustModel,
        deletebreedModel,
        updatecontactModel,
        updateaddrModel,
        createaddrModel,
        createlabelModel,
        updatelabelModel,
        createfilesModel,
        createtrackModel,
        createproductModel,
        intentionModel,
        tipsdialogModel,
      auditDialog
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
    		labelParam:{
    			show:false
    		},
    		updlabelParam:{
    			show:false
    		},
    		cfilesParam:{
    			show:false
    		},
        intentionParam:{
          show:false
        },
    		ctrackParam:{
    			show:false,
    			name:''
    		},
    		cproductParam:{
    			show:false
    		},
    		tipsParam:{
    			show:false
    		},
        auditParam:{
          link:'/customer/transferBlacklist',
          show:false,
          title:'客户拉入黑名单备注',
          arr:[],
          blacklist:1
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
    		alterInfo,
    		addrDel,
    		createLabel,
    		alterLabel,
    		createRemark,
    		alterRemark,
    		createProduct,
    		alterProduct,
    		uploadFiles,
        deleteInfo,
        customerTransferBlacklist
    	}
    },
    methods:{
    	enfoldment:function(param){
    		if(this.$store.state.table.clientDetail[param.crete].arr.length==0){
                this.$store.state.table.clientDetail[param.crete].show=false
            }
            this.$store.state.table.clientDetail[param.crete].show = !this.$store.state.table.clientDetail[param.crete].show;
    	},
      newTracking:function(param){

      },
    	clickShow: function(id,param) {
            if (this.$store.state.table.clientDetail[param.concrete].arr[id].show) {
                this.$store.state.table.clientDetail[param.concrete].arr[id].show = !this.$store.state.table.clientDetail[param.concrete].arr[id].show
            } else {
                this.$store.state.table.clientDetail[param.concrete].arr[id].show = true
            }
        },
        createFormt:function(initBreedDetail){
        	this.custParam = initBreedDetail;
        },
        createAddr:function(initBreedDetail){
        	this.addressParam = initBreedDetail;
        },
        newlabel:function(initBreedDetail){
        	this.labelParam = initBreedDetail;
        },
        specDelete:function(initBreedDetail){
            this.deleteParam = initBreedDetail;
        },
        updateSpec:function(initBreedDetail){
        	 this.updateParam = initBreedDetail;
        },
        updateAddr:function(initBreedDetail){
        	 this.addrParam = initBreedDetail;
        },
        updatelabel:function(initBreedDetail){
        	 this.updlabelParam = initBreedDetail;
        },
        createfiles:function(initBreedDetail){
        	 this.cfilesParam = initBreedDetail;
           console.log(this.cfilesParam.path)
           this.$broadcast('getImageData');
        },
        createTrack:function(value){
          console.log('fsfsfs');
          	this.ctrackParam.show = true;
          	this.ctrackParam.name= value;
        },
        newproduct:function(initBreedDetail){
        	 this.cproductParam = initBreedDetail;
        },
        createIntention:function(){
          this.intentionParam={
            show:false,
              flag:0,   //0表示创建，1表示修改
              sub:'',
              customerId:this.initClientDetail.id,
              //fullname:this.initUserDetail.fullname,
              customerName:this.initClientDetail.name,
              //phone:this.initUserDetail.phone,
              customerPhone:this.initClientDetail.tel,
              id:'',
              breedId:'',
              breedName:'',
              price:'',
              unit:'',
              especial:'',
              quality:'',
              spec:'',
              number:'',
              location:'',
              type:'',
              country:'',
              province:'',
              city:'',
              district:'',
              address:'',
              invoic:'',
              sampling:'',
              sampleUnit:'',
              advance:'',
              intl:'',
              sampleNumber:0,
              sampleAmount:0,
              qualification:'',
              url:'/intention/',
              image_f:'',
              image_s:'',
              image_t:'',
              images:''
          };
          this.intentionParam.show = true;

        },
      callback:function(){
        this.auditParam.blackComments=this.auditParam.auditComment;
        this.auditParam.customerIds=this.auditParam.arr;
        this.auditParam.auditComment='';
        this.customerTransferBlacklist(this.auditParam);
      },
      clientTransferBlack(){
        this.auditParam.arr=[];
        this.auditParam.arr.push(this.initClientDetail.id);

        if(this.initClientDetail.blacklist==0){
          this.auditParam.blacklist=1;
          this.auditParam.title='加入黑名单备注';
        }else{
          this.auditParam.blacklist=0;
          this.auditParam.title='踢出黑名单备注';
        }
        this.auditParam.confirm=true;
        this.auditParam.callback=this.callback;
        this.auditParam.show=true;



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
.breed_action{
	top: 20px;
	right: 40px;
}
.files_action{
  position: absolute;
  top: 32px;
  right: 40px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #fff;
  z-index: 1000;
  min-width: 80px;
  height: 30px;
  padding: 5px 15px;
  cursor: pointer;
}
.files_action:hover{
  color: #fa6705;
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
	z-index: 100;
  width: 100%;
  right: 0;
  top: 130px;
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
.label_action{
	position: absolute;
	top:13px;
	right: 32px;
	border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 1000;
    min-width: 90px;
    cursor: pointer;
    padding: 5px 10px;
    max-width: 200px;
}
.client-editbtn {
    text-align: right;
    margin-top: 15px;
}
.client-image {
    display: inline-block;
}
</style>

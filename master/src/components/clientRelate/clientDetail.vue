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
  <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
  <intention-model :param="intentionParam" v-if="intentionParam.show"></intention-model>
  <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
  <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
  <createorder-model :param="orderParam" v-if="orderParam.show"></createorder-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con modal_overall" v-show="param.show">
    	<div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
      <div class="cover_loading">
        <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
      </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <span class="navbar-brand navbar-name" href="#">{{param.name}}</span>
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
                                          })">{{$t('static.del_client_info')}}</button>
                        </li>

                        <li v-if="initClientDetail.supplier!=1">
                          <button  type="button" class="btn btn-base"  @click="clientTransferSupplier({
                                           id:param.id,
                                           sub:param.sub,
                                           show:true,
                                           link:'/customer/setSupplier',
                                           title:'客户提取为供应商备注'
                                           })">{{$t('static.make_them_become_supplier')}}</button>
                        </li>

                      <li v-if="initClientDetail.blacklist==0">
                        <button type="button" class="btn btn-base"  @click="clientTransferBlack()">{{$t('static.drag_into_blacklist')}}</button>
                      </li>
                      <li v-if="initClientDetail.blacklist==1">
                        <button type="button" class="btn btn-base"  @click="clientTransferBlack()">{{$t('static.out_of_blacklist')}}</button>
                      </li>
                    </ul>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix" >
                <div class="col-md-8 client-detail">
                    <h4 class="section_title">{{$t('static.related_information')}}</h4>
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
                  											{{$t('static.contact')}}（{{initClientDetail.contacts.arr.length}}）
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
      		                                     })">{{$t('static.new')}}</button>
                  									</h4>
                                </div>
                                <div class="panel-collapse" v-show="!initClientDetail.contacts.show&&initClientDetail.contacts.arr.length>0">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                        	<thead>
                                        		<th>{{$t('static.name')}}</th>
                                        		<th>{{$t('static.position')}}</th>
                                        		<th>{{$t('static.department')}}</th>
                                        		<th>{{$t('static.cellphone')}}</th>
                                        		<th>{{$t('static.telephone')}}</th>
                                        		<th>{{$t('static.client_email')}}</th>
                                        		<th>qq</th>
                                        		<th>{{$t('static.wechat')}}</th>
                                            <th colspan="2">{{$t('static.operation')}}</th>
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
                                                <td  @click="updateSpec({
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
                                                           })">
                                                     <a class="operate"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
                                                     </a>
                                                </td>
                                                <td @click="specDelete({
                                                           id:item.id,
                                                           sub:$index,
                                                           show:true,
                                                           name:item.name,
                                                           title:'联系人',
                                                           link:specDel,
                                                           url:'/customer/contact/',
                                                           key:'contacts',
                                                           headline:'clientDetail'
                                                           },item.show=false)">
                                                   <a class="operate"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/>
                                                     </a>
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
                    											{{$t('static.file')}}（{{initClientDetail.files.arr.length}}）
                    										</a>
                    										<button type="button" class="btn btn-base pull-right" @click.stop="createfiles({
                      											 bizId:param.id,
    		                                     show:true,
                                             title:'新建文件',
                                             fileType:'',
                                             bizType:'customer_license',
                                             description:'',
                                             path:'',
                                             name:'',
                                             link:uploadFiles,
                                             url:'/customer/file/',
    		                                     key:'files',
    		                                     image_f_show:'',
    		                                     image_f:''
                      											})">{{$t('static.new')}}</button>
                          				</h4>
                              </div>
                              <div  class="panel-collapse" v-show="!initClientDetail.files.show&&initClientDetail.files.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                      	<thead>
                                      		<th>{{$t('static.filename')}}</th>
                                      		<th>{{$t('static.file_type')}}</th>
                                      		<!-- <th>所属文件</th> -->
                                          <th>{{$t('static.preview')}}</th>
                                          <th>{{$t('static.description')}}</th>
                                      		<th colspan="2">{{$t('static.operation')}}</th>
                                      	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail.files.arr">
		                                            <!-- <td><img v-bind:src="item.path" /></td> -->
                                                <!--<td><img v-bind:src="item.url" v-if="item.fileType=='jpg'||item.fileType=='bmp'||item.fileType=='jpg'||item.fileType=='jpeg'" style='float:left; margin-left:15px;' />-->
                                                    <!--<img  src="/static/images/pdf.png" v-if="item.fileType=='pdf'" style='float:left; margin-left:15px;'>-->
                                                    <!--<img  src="/static/images/word.png" v-if="item.fileType=='doc'||item.fileType=='docx'" style='float:left; margin-left:15px;'>-->
                                                    <!--<img  src="/static/images/excel.png" v-if="item.fileType=='xls'||item.fileType=='xlsx'" style='float:left; margin-left:15px;'>-->
                                                <!--</td>-->
                                                <td>{{item.name}}</td>
		                                            <td>
                                                  {{item.fileType}}
                                                </td>
		                                            <!-- <td v-if="item.bizType=='customer_license'">客户文件</td> -->
                                                <!-- <td v-if="item.bizType=='product_license'">产品文件</td> -->
                                                <td>
                                                    <img v-if="item.fileType=='image'" width="100" :src="item.url"  @click="clickBig(item.url)"/>
                                                    <img  src="/static/images/pdf.png" v-if="item.fileType=='pdf文件'">
                                                    <img  src="/static/images/word.png" v-if="item.fileType=='word'">
                                                    <img  src="/static/images/excel.png" v-if="item.fileType=='excel'">
                                                </td>
                                                <td>{{item.description}}</td>
                                                <td >
                                                     <a class="operate" @click="specDelete({
                                                           id:item.id,
                                                           sub:$index,
                                                           show:true,
                                                           title:'文件',
                                                           link:specDel,
                                                           url:'/customer/file/',
                                                           key:'files',
                                                           headline:'clientDetail'
                                                           },item.show=false)"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/>
                                                     </a>
                                               <a class="operate" href="/crm/api/v1/file/dowanloadFile?path={{item.path}}"><img src="/static/images/upload.png" height="18" width="28"  /></a></td>
                                                <!-- <td  @click="clickShow($index,{
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
                                                                 },item.show=false)">删除</dt>
                                                        </dl>
                                                    </div>
                                                </td> -->
		                                        </tr>
		                                    </tbody>
		                                </table>
                                  </div>
                              </div>
                          </div>

                          <div class="panel panel-default">
                              <div class="panel-heading" v-cloak>
                                  <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initClientDetail.intentions,
                                              crete:'intentions'
                                              })">
                                        <img class="pull-left" src="/static/images/intent.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          {{$t('static.intention')}}（{{initClientDetail.intentions.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right" @click.stop="createIntention()">{{$t('static.new')}}</button>
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="!initClientDetail.intentions.show&&initClientDetail.intentions.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                            <th>{{$t('static.breed')}}</th>
                                            <th>{{$t('static.origin')}}</th>
                                            <th>{{$t('static.specification')}}</th>
                                            <th>{{$t('static.quantity')}}</th>
                                            <th>{{$t('static.price')}}</th>
                                            <th>{{$t('static.unit')}}</th>
                                            <th>{{$t('static.operation')}}</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in initClientDetail.intentions.arr">
                                                <td>{{item.breedName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td  @click="updateIntention({
                                                            flag:1,
                                                            show:true,
                                                            sub:$index,
                                                            key:'client',
                                                            id:item.id,
                                                            breedName:item.breedName,
                                                            price:item.price,
                                                            unit:item.unit,
                                                            especial:item.especial,
                                                            quality:item.quality,
                                                            spec:item.spec,
                                                            number:item.number,
                                                            location:item.location,
                                                            type:item.type,
                                                            country:item.country,
                                                            province:item.province,
                                                            city:item.city,
                                                            district:item.district,
                                                            address:item.address,
                                                            invoic:item.invoic,
                                                            sampling:item.sampling,
                                                            sampleUnit:item.sampleUnit,
                                                            advance:item.advance,
                                                            intl:item.intl,
                                                            sampleNumber:item.sampleNumber,
                                                            sampleAmount:item.sampleAmount,
                                                            qualification:item.qualification,
                                                            breedId:item.breedId,
                                                            pack:item.pack,
                                                            visit:item.visit,
                                                            duedate:item.duedate,
                                                            breedId:item.breedId,
                                                            description:item.description,
                                                            validate:item.validate,
                                                            inType:3,
                                                            loading:false,
                                                            image_f:'',
                                                            image_s:'',
                                                            image_t:'',
                                                            image_f_show:'',
                                                            image_s_show:'',
                                                            image_t_show:''
                                                        })">
                                                     <a class="operate"><img src="/static/images/edit.png" height="18" width="30"/>
                                                     </a>
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
                                        <img class="pull-left" src="/static/images/order.png" height="29" width="26"  />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          {{$t('static.order')}}（{{initClientDetail.orders.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right" @click.stop="newOrder({
                                            show:true,
                                            title1:'新建订单',
                                            type:'',
                                            customer:initClientDetail.id,
                                            sample:0,
                                            intl:0,
                                            incidentals:'',
                                            incidentalsDesc:'',
                                            preferential:'',
                                            preferentialDesc:'',
                                            currency:'人民币',
                                            consignee:'',
                                            consigneePhone:'',
                                            zipCode:'',
                                            country:'',
                                            province:'',
                                            customerName:initClientDetail.name,
                                            employee:initClientDetail.employeeId,
                                            org:initClientDetail.orgId,
                                            city:'',
                                            district:'',
                                            consigneeAddr:'',
                                            comments:'',
                                            sourceType:0,
                                            goods:[{
                                                sourceType:0,
                                                sourceId:'',
                                                title:'',
                                                breedId:'',
                                                brredName:'',
                                                quality:'',
                                                location:'',
                                                spec:'',
                                                price:'',
                                                unit:'',
                                                number:''
                                              }],
                                            key:'orders',
                                            link:createOrder
                                          })">{{$t('static.new')}}</button>
                                  </h4>
                              </div>
                              <div  class="panel-collapse" v-show="!initClientDetail.orders.show&&initClientDetail.orders.arr.length>0">
                                 <div class="panel-body panel-set">
                                      <table class="table contactSet">
                                        <thead>
                                          <th>{{$t('static.order_no')}}</th>
                                          <th>{{$t('static.order_source')}}</th>
                                          <th>{{$t('static.consignee_name')}}</th>
                                          <th>{{$t('static.consignee_phone')}}</th>
                                          <th>{{$t('static.consignee_address')}}</th>
                                          <th>{{$t('static.order_status')}}</th>
                                        </thead>
                                        <tbody>
                                             <tr v-for="item in initClientDetail.orders.arr">
                                                <!-- <td><img :src="item.path" /></td> -->
                                                <td>{{item.no}}</td>
                                                <td v-if="item.sourceType==0">新建</td>
                                                <td v-if="item.sourceType==1">意向</td>
                                                <td v-if="item.sourceType==2">报价</td>
                                                <td>{{item.consignee}}</td>
                                                <td>{{item.consigneePhone}}</td>
                                                <td>{{item.consigneeAddr}}</td>
                                                <td>{{item.orderStatus | orderstatus}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                  </div>
                              </div>
                          </div>
                             <div class="panel panel-default">
                               <div class="panel-heading">
                                   <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:initClientDetail.trackings,
                                              crete:'trackings'
                                              })">
                           										<img class="pull-left" src="/static/images/follow-up.png" height="30" width="30"  />
                           										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                           											{{$t('static.tracking')}}（{{initClientDetail.trackings.arr.length}}）
                           										</a>
                                      <button type="button" class="btn btn-base pull-right" @click.stop="createTracking({
                                          objId:initClientDetail.id,
                                          bizId:'',
                                          bizName:'',
                                          type:1,
                                          trackingWay:'',
                                          bizType:'',
                                          contactNo:'',
                                          comments:'',
                                          show:true,
                                          customer:true,
                                          flag:0
                                        })">{{$t('static.new')}}</button>
                           									</h4>
                               </div>
                               <div  class="panel-collapse" v-show="!initClientDetail.trackings.show">
                                  <div class="panel-body panel-set">
                                    <table class="table contactSet">
                                      <thead>
                                      <th>{{$t('static.business_type')}}</th>
                                      <th>{{$t('static.tracking_mode')}}</th>
                                      <th>{{$t('static.contact_number')}}</th>
                                      <th>{{$t('static.comment')}}</th>
                                      <th>{{$t('static.create_time')}}</th>
                                      <th style="text-align:center">{{$t('static.operation')}}</th>
                                      </thead>
 		                                    <tbody>
 		                                         <tr v-for="item in initClientDetail.trackings.arr">
                                               <td v-if="!item.bizType">客户</td>
                                               <td v-if="item.bizType==1">意向</td>
                                               <td v-if="item.bizType==2">订单</td>
                                               <td>{{item.trackingWay}}</td>
                                               <td>{{item.contactNo}}</td>
                                               <td>{{item.comments}}</td>
                                               <td>{{item.ctime}}</td>
                                               <td  @click="updateTracking(item,$index)">
                                                   <a class="operate"><img src="/static/images/edit.png" height="18" width="30"/>
                                                   </a>
                                               </td>
                                              <!--  <td  @click="clickShow($index,{
                                               concrete:'trackings'
                                               })">
                                                <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                <div class="breed_action" v-show="item.show" >
                                                   <dl>
                                                     <dt @click="updateTracking(item,$index)">编辑</dt>
                                                   </dl>
                                                </div>
                                              </td> -->
 		                                        </tr>
 		                                    </tbody>
 		                                </table>
                                       <!--<p class="contact-view">查看全部</p>-->
                                   </div>
                               </div>
                           </div>
                             <div class="panel panel-default" collapse>
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                  						            	link:initClientDetail.remarks,
                  						            	crete:'remarks'
                  						            	})">
                  										<img class="pull-left" src="/static/images/remark.png" height="30" width="27"  />
                  										<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                  											{{$t('static.comment')}}（{{initClientDetail.remarks.arr.length}}）
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
    		                                     })">{{$t('static.new')}}</button>
                  									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.remarks.show&&initClientDetail.remarks.arr.length>0">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>{{$t('static.comment')}}</th>
                                        		<th>{{$t('static.status')}}</th>
                                        		<th colspan="2">{{$t('static.operation')}}</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail.remarks.arr">
		                                            <td>{{item.remark}}</td>
		                                            <td>{{item.status}}</td>
                                                <td >
                                                   <a class="operate"  @click="updatelabel({
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
                                                           })"><img src="/static/images/edit.png" height="18" width="30"/>
                                                   </a>
                                           <!--      </td>
                                           <td  > -->
                                                   <a class="operate" @click="specDelete({
                                                           id:item.id,
                                                           sub:$index,
                                                           show:true,
                                                           title:'备注',
                                                           link:specDel,
                                                           url:'/customer/remark/',
                                                           key:'remarks',
                                                           headline:'clientDetail'
                                                           },item.show=false)"><img src="/static/images/del.png" height="18" width="30"/>
                                                   </a>
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
                    											{{$t('static.address')}}（{{initClientDetail.addresses.arr.length}}）
                    										</a>
                    										<button type="button" class="btn btn-base pull-right" @click.stop="createAddr({
      		                                     customerId:param.id,
      		                                     id:param.id,
      		                                     show:true,
      		                                     title:'地址',
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
      		                                     })">{{$t('static.new')}}</button>
								                	   </h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.addresses.show&&initClientDetail.addresses.arr.length>0">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>{{$t('static.type')}}</th>
                                        		<th>{{$t('static.name')}}</th>
                                        		<th>{{$t('static.cellphone')}}</th>
                                        		<th>{{$t('static.sex')}}</th>
                                        		<th>{{$t('static.country')}}</th>
                                        		<th>{{$t('static.province')}}</th>
                                        		<th>{{$t('static.city')}}</th>
                                        		<th>{{$t('static.area')}}</th>
                                        		<th>{{$t('static.street')}}</th>
                                        		<th>{{$t('static.address')}}</th>
                                        		<th>{{$t('static.detailed_address')}}</th>
                                            <th colspan="2">{{$t('static.operation')}}</th>
                                        	</thead>
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail.addresses.arr">
		                                            <td v-if="item.type==0">普通</td>
                                                <td v-if="item.type==1">默认</td>
		                                            <td>{{item.contactName}}</td>
		                                            <td>{{item.contactPhone}}</td>
		                                            <td v-if="item.sex==0">男</td>
                                                <td v-if="item.sex==1">女</td>
                                                <td v-if="item.sex==null">未说明</td>
		                                            <td>{{item.country}}</td>
		                                            <td>{{item.province}}</td>
		                                            <td>{{item.city}}</td>
		                                            <td>{{item.district}}</td>
		                                            <td>{{item.street}}</td>
		                                            <td>{{item.detailAddr}}</td>
		                                            <td>{{item.address}}</td>
                                                <td  @click="updateAddr({
                                                           sub:$index,
                                                           id:item.id,
                                                           customerId:item.customerId,
                                                           show:true,
                                                           title:'地址',
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
                                                           })">
                                                   <a class="operate"><img src="/static/images/edit.png" height="18" width="30"/>
                                                   </a>
                                                </td>
                                                <td  @click="specDelete({
                                                           id:item.id,
                                                           sub:$index,
                                                           show:true,
                                                           title:'地址',
                                                           link:addrDel,
                                                           url:'/customer/deleteAddress/',
                                                           key:'addresses',
                                                           headline:'clientDetail'
                                                           },item.show=false)">
                                                   <a class="operate"><img src="/static/images/del.png" height="18" width="30"/>
                                                   </a>
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
                  											{{$t('static.label')}}（{{initClientDetail.labels.arr.length}}）
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
    		                                     })">{{$t('static.new')}}</button>
                  									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.labels.show&&initClientDetail.labels.arr.length>0">
                                   <div class="panel-body panel-set">
                                        <table class="table contactSet">
                                        	<thead>
                                        		<th>{{$t('static.label')}}</th>
                                        		<th colspan="1">{{$t('static.operation')}}</th>
                                        	</thead>
		                                    <tbody>
		                                        <tr v-for="item in initClientDetail.labels.arr">
		                                            <td>{{item.label}}</td>
                                                <td >
                                                   <a class="operate" @click="updatelabel({
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
                                                           })"><img src="/static/images/edit.png" height="18" width="30"/>
                                                   </a>
                                               <!--  </td>
                                               <td > -->
                                                   <div class="operate"   @click="specDelete({
                                                           id:item.id,
                                                           sub:$index,
                                                           show:true,
                                                           title:'标签',
                                                           link:addrDel,
                                                           url:'/customer/deleteLable/',
                                                           key:'labels',
                                                           headline:'clientDetail'
                                                           },item.show=false)"><img src="/static/images/del.png" height="18" width="30"/>
                                                   </a>
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
                  											{{$t('static.product')}}（{{initClientDetail.products.arr.length}}）
                  										</a>
                  										<button type="button" class="btn btn-base pull-right" @click.stop="newproduct({
    		                                     cid:param.id,
    		                                     id:param.id,
    		                                     show:true,
    		                                     title:'新建产品',
                                             type:'',
                                             name:'',
                                             breedId:'',
                                             breedName:'',
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
    		                                     })">{{$t('static.new')}}</button>
                  									</h4>
                                </div>
                                <div  class="panel-collapse" v-show="!initClientDetail.products.show&&initClientDetail.products.arr.length>0">
                                    <div class="panel-body panel-set">
                                         <table class="table contactSet">
                                        	<thead>
                                        		<th>{{$t('static.type')}}</th>
                                        		<th>{{$t('static.name')}}</th>
                                        		<th>{{$t('static.breed')}}</th>
                                        		<th>{{$t('static.quality')}}</th>
                                        		<th>{{$t('static.origin')}}</th>
                                        		<th>{{$t('static.specification')}}</th>
                                        		<th>{{$t('static.quantity')}}</th>
                                        		<th>{{$t('static.price')}}</th>
                                        		<th>{{$t('static.unit')}}</th>
                                        		<th>{{$t('static.deadline')}}</th>
                                        		<th>{{$t('static.test_report')}}</th>
                                        		<th colspan="2">{{$t('static.operation')}}</th>
                                        	</thead>
		                                    <tbody>
		                                         <tr v-for="item in initClientDetail.products.arr">
		                                            <td>{{item.type}}</td>
		                                            <td>{{item.name}}</td>
		                                            <td>{{item.breedName}}</td>
		                                            <td>{{item.quality}}</td>
		                                            <td>{{item.location}}</td>
		                                            <td>{{item.spec}}</td>
		                                            <td>{{item.number}}</td>
		                                            <td>{{item.price}}</td>
		                                            <td>{{item.unit}}</td>
		                                            <td>{{item.duedate}}</td>
		                                            <td v-if="item.coa==0">无</td>
                                                <td v-if="item.coa==1">有</td>
                                                <td   @click="newproduct({
                                                           sub:$index,
                                                           id:item.id,
                                                           cid:item.cid,
                                                           show:true,
                                                           title:'编辑产品',
                                                           type:item.type,
                                                           name:item.name,
                                                           breedId:item.breedId,
                                                           breedName:item.breedName,
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
                                                           })">
                                                   <a class="operate"><img src="/static/images/edit.png" height="18" width="30"/>
                                                   </a>
                                                </td>
                                                <td  @click="createfiles({
                                                             bizId:item.id,
                                                             show:true,
                                                             title:'新建产品文件',
                                                             fileType:'',
                                                             bizType:'product_license',
                                                             description:'',
                                                             path:'',
                                                             link:uploadFiles,
                                                             url:'/customer/file/',
                                                             key:'files'
                                                           })">
                                                   <a class="operate"><img src="/static/images/uploadPro.png" height="18" width="67"/>
                                                   </a>
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
                    <h4 class="section_title">{{$t('static.detailed_information')}}</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.name')}}</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.name" value="{{initClientDetail.name}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>{{$t('static.type')}}</label>
                                    <input  type="text" class="form-control"  value="{{initClientDetail.typeDesc}}" disabled="disabled" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.classification')}}</label>
                                    <input type="text" class="form-control"  value="{{initClientDetail.classify | classify}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>{{$t('static.telephone')}}</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.mainPhone" value="{{initClientDetail.mainPhone}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.principals')}}</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.principal" value="{{initClientDetail.principal}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>{{$t('static.province')}}</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.provinceName" value="{{initClientDetail.provinceName}}" disabled="disabled" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.client_email')}}</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.email" value="{{initClientDetail.email}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>{{$t('static.city')}}</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.cityName" value="{{initClientDetail.cityName}}" disabled="disabled" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.comment')}}</label>
                                    <input type="text" class="form-control" v-model="initClientDetail.comments" value="{{initClientDetail.comments}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
	                                <label>{{$t('static.registered_address')}}</label>
	                                <input type="text" class="form-control" v-model='initClientDetail.address' value="{{initClientDetail.address}}" disabled="disabled" />
	                            </div>
                            </div>
                            <div class="clearfix">
                              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{$t('static.business_scope')}}</label>
                                <input type="text" class="form-control" v-model="initClientDetail.bizScope" value="{{initClientDetail.bizScope}}" disabled="disabled" />
                              </div>
                              <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>{{$t('static.registered_time')}}</label>
                                <input type="text" class="form-control" v-model="initClientDetail.ctime" value="{{initClientDetail.ctime}}" disabled="disabled" />
                              </div>
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
import filter from '../../filters/filters.js'
import tipsdialogModel from '../tipsDialog'
import createcustModel  from '../clientRelate/createClientDetail'
import createaddrModel from '../clientRelate/createAddrInfo'
import createlabelModel from '../clientRelate/label/createLabel'
import updatelabelModel from '../clientRelate/label/updatelebel'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import updatecontactModel from '../clientRelate/updateContactInfo'
import updateaddrModel from '../clientRelate/updataAddrInfo'
import createfilesModel from  '../clientRelate/createFiles'
import createtrackModel from '../user/userTracking'
import createproductModel from  '../clientRelate/label/createProduct'
import intentionModel from  '../user/userIntention'
import auditDialog from '../tips/auditDialog'
import createorderModel  from  '../order/createOrderDialog'
import pictureModel  from  '../tips/pictureDialog'
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
  customerTransferBlacklist,
  createOrder
} from '../../vuex/actions'
export default {
    components: {
        pressImage,
        filter,
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
        auditDialog,
        createorderModel,
        pictureModel
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
          objId:'',
          bizId:'',
          bizName:'',
          type:0,
          trackingWay:'',
          bizType:'',
          contactNo:'',
          comments:'',
          customer:true,
          flag:0
    		},
    		cproductParam:{
    			show:false
    		},
        pictureParam:{
          show:false,
          img:''
        },
    		tipsParam:{
    			show:false
    		},
        auditParam:{
          show:false
        },
    		show:true,
        orderParam:{
          show:false
        }
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
        customerTransferBlacklist,
        createOrder
    	}
    },
    methods:{
    	enfoldment:function(param){
    		if(this.$store.state.table.clientDetail[param.crete].arr.length==0){
                this.$store.state.table.clientDetail[param.crete].show=false
            }
            this.$store.state.table.clientDetail[param.crete].show = !this.$store.state.table.clientDetail[param.crete].show;
    	},
      clickBig:function(img){
          this.pictureParam.show=true;
          this.pictureParam.img = img;
      },
    	clickShow: function(id,param) {
          this.$store.state.table.clientDetail[param.concrete].arr[id].show = !this.$store.state.table.clientDetail[param.concrete].arr[id].show;

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
        var _self=this;
        if(initBreedDetail.key=='customerList'){
          initBreedDetail.callback=function(){
            _self.param.show=false;
          }
        }else{
          initBreedDetail.callback=function(){

          }
        }
        this.deleteParam = initBreedDetail;
      },
      clientTransferSupplier:function(initBreedDetail){
        console.log(initBreedDetail)
          this.auditParam=initBreedDetail;
          this.auditParam.supplier=true;
          this.auditParam.arr=[];
          if(initBreedDetail.id){
            this.auditParam.arr.push(initBreedDetail.id);
          }
          this.auditParam.callback=this.callback;
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
//         this.$broadcast('getImageData');
      },
      createTracking:function(param){
        this.ctrackParam.objId=param.objId;
        this.ctrackParam.bizId=param.bizId;
        this.ctrackParam.bizName=param.bizName;
        this.ctrackParam.type=param.type;
        this.ctrackParam.trackingWay=param.trackingWay;
        this.ctrackParam.bizType=param.bizType;
        this.ctrackParam.contactNo=param.contactNo;
        this.ctrackParam.comments=param.comments;
        this.ctrackParam.show=param.show;
        this.ctrackParam.customer=param.customer;
        this.ctrackParam.flag=param.flag;

      },
      updateTracking:function(item,index){
        item.show=!item.show;
        item.index = index;
        this.ctrackParam = item;
        this.ctrackParam.flag = 1;   //1表示修改
        this.ctrackParam.show = true;

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
            customerPhone:this.initClientDetail.mainPhone,
            id:'',
            breedId:'',
            breedName:'',
            price:'',
            unit:'',
            especial:1,
            quality:'',
            spec:'',
            number:'',
            location:'',
            type:0,
            visit:0,
            validate:0,
            country:'中国',
            province:'',
            city:'',
            district:'',
            address:'',
            invoic:0,
            sampling:0,
            sampleUnit:'',
            advance:0,
            intl:0,
            sampleNumber:0,
            sampleAmount:0,
            pack:'',
            qualification:'GMP',
            url:'/intention/',
            key:'client',
            image_f:'',
            image_s:'',
            image_t:'',
            image_f_show:'',
            image_s_show:'',
            image_t_show:'',
            images:'',
            inType:3,
            audit:0
        };
        this.intentionParam.show = true;

      },

      updateIntention:function(param){
          this.intentionParam = param;
      },
      callback:function(){
        this.auditParam.blackComments=this.auditParam.auditComment;
        this.auditParam.customerIds=this.auditParam.arr;
        this.auditParam.auditComment='';
        this.customerTransferBlacklist(this.auditParam);
      },
      clientTransferBlack(){
        this.auditParam.link='/customer/transferBlacklist';
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
      },
      newOrder:function(order){
        console.log(order)
        this.orderParam = order;
      }
    },
  filter:(filter,{}),
  created(){
    this.getClientDetail(this.param);
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

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
}

section {
    background-color: #fff;
}
.breed_action{
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
section article {
    margin-top: 30px;
}
.top-title{
  z-index: 100;
  width: 70%;
  right: 0;
  top: 91px;
  position: fixed;
  left: 0;
  margin: auto;
}
.client-section {
    padding: 10px 5px 40px 5px;
}
.contactSet thead{
	color:#fa6705;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}

.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
	text-align: center;
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
.table{
  display: table;
}
.client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
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

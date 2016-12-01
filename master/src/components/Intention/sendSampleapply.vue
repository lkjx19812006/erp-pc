<template>
	<searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
	<div v-show="param.send"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.send">
        <div @click="param.send = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	        <h4>寄样申请表</h4>
		    <validator name="validation">
		        <div class="edit-model">
	                <section class="editsection clearfix">
	                	<div class="client-detailInfo col-md-6 col-xs-12">
	                        <label class="editlabel">客户名称 <span class="system_danger" v-if="$validation.customer.required">请输入客户名称</span></label>
	                         <input type="text" class="form-control edit-input" v-model="param.customerName" value="{{param.customerName}}"  onlyready="true" v-validate:customer="['required']"/>
	                    </div>
	                    <div class="client-detailInfo  col-md-6 col-xs-12">
	                        <label class="editlabel">客户电话</label>
	                        <input type="text" class="form-control edit-input" v-model="param.customerPhone" value="{{param.customerPhone}}"  />
	                    </div>
	                    <div class="client-detailInfo  col-md-6 col-xs-12">
	                        <label class="editlabel">收货人姓名</label>
	                        <input type="text" class="form-control edit-input" v-model="param.consignee" value="{{param.consignee}}"  />
	                    </div>
	                    <div class="client-detailInfo  col-md-6 col-xs-12">
	                        <label class="editlabel">收货人联系方式</label>
	                        <input type="text" class="form-control edit-input" v-model="param.consignee_Phone" value="{{param.consignee_Phone}}"  />
	                    </div>
	                    <div class="client-detailInfo  col-md-6 col-xs-12">
	                        <label class="editlabel">收货地址 <span class="system_danger" v-if="$validation.address.required">必填项</span></label></label>
	                        <input type="text" class="form-control edit-input" v-model="param.address" value="{{param.address}}" v-validate:address="['required']" />
	                    </div>
	                </section>
	                <div style="margin-top:20px;">
	                    <h4 style="text-align: left">样品信息</h4>
			            <table class="table table-hover table_color table-striped ">
			                <thead>
				                <tr>
				              		<th>品种名称</th>
				              		<th>质量</th>
				              		<th>产地</th>
				              		<th>规格</th>
				              		<th>数量</th>
				              		<th>单位</th>
				              		<th>合计金额</th>
				              		<th>创建时间</th>
				              		<th></th>
				              		<th></th>
				              	</tr>
			                </thead>
			                <tbody>
			                	<tr>
				                	<td>{{param.breedName}}</td>
				                	<td>{{param.quality}}</td>
				                	<td>{{param.location}}</td>
				                	<td>{{param.spec}}</td>
				                	<td>{{param.sampleNumber}}</td>
				                	<td>{{param.sampleUnit}}</td>
				                	<td>{{param.sampleAmount.toFixed(2)}}</td>
				                	<td>{{param.ctime}}</td>
				                	<td v-if="breedInfo.status==0||breedInfo.status==2" @click="showModifyBreed($index)"><a>{{$t('static.edit')}}</a></td>
	                                <td v-else>{{$t('static.edit')}}</td>
	                                <td v-if="breedInfo.status==0" @click="deleteBreed($index)"><a>{{$t('static.del')}}</a></td>
	                                <td v-else>{{$t('static.del')}}</td>
				                </tr>
			                </tbody>
			            </table>
			            <div style="padding-left:25%">
	                       <div v-if="breedInfo.status==0" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showAddBreed()">添加样品信息</div>   
	                    </div>
	                    <validator name="inner">   
	                       <div v-if="addParam.show||updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
	                             <div class="clearfix">
	                                <div class="editpage-input col-md-6">
	                                     <label class="editlabel" >{{$t('static.breed')}}<span class="system_danger" v-if="$inner.breedname.required">{{$t('static.required')}}</span></label>
	                                     <input type="text" v-model="breedInfo.breedName" class="form-control edit-input" v-validate:breedname="{required:true}"  @click="searchBreed()" readonly="true" />
	                                </div>
	                         
	                                <div class="editpage-input col-md-6">
	                                     <label class="editlabel" >{{$t('static.quality')}}<span class="system_danger" v-if="$inner.quality.required">{{$t('static.required')}}</span></label>
	                                     <input type="text" v-model="breedInfo.quality" class="form-control edit-input" v-validate:quality="{required:true}" />
	                                </div>
	                         
	                                <div class="editpage-input col-md-6">
	                                     <label class="editlabel" >{{$t('static.specification')}}<span class="system_danger" v-if="$inner.spec.required">{{$t('static.required')}}</span></label>
	                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.spec" class="form-control edit-input" v-validate:spec="{required:true}" disabled="disabled" placeholder="请先选择一个品种"/>
	                                     <div type="text" class="edit-input" v-if="breedParam.id">
	                                         <input-select
	                                           :value.sync="breedInfo.spec"
	                                           :prevalue="breedInfo.spec"
	                                           :options="initBreedDetail.specs.arr"
	                                           placeholder="规格"
	                                           label="name"
	                                         >
	                                         </input-select>
	                                     </div>
	                                </div>
	                                
	                                <div class="editpage-input col-md-6">
	                                     <label class="editlabel" >{{$t('static.unit')}}<span class="system_danger" v-if="$inner.unit.required">{{$t('static.required')}}</span></label>
	                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}" disabled="disabled" placeholder="请先选择一个品种"/>
	                                     <div type="text" class="edit-input" v-if="breedParam.id">
	                                         <input-select
	                                           :value.sync="breedInfo.unit"
	                                           :prevalue="breedInfo.unit"
	                                           :options="initBreedDetail.units.arr"
	                                           placeholder="单位"
	                                           label="name"
	                                         >
	                                         </input-select>
	                                     </div>
	                                </div>
	                                <div class="editpage-input col-md-6">
	                                     <label class="editlabel" >{{$t('static.headline')}}</label>
	                                     <input type="text" v-model="breedInfo.title" class="form-control edit-input" />
	                                </div>
	                         
	                                <div class="editpage-input col-md-6">
	                                     <label class="editlabel" >{{$t('static.origin')}}<span class="system_danger" v-if="$inner.location.required">{{$t('static.required')}}</span></label>
	                                     <input type="text" v-show="!breedParam.id" v-model="breedInfo.location" class="form-control edit-input" v-validate:location="{required:true}" disabled="disabled" placeholder="请先选择一个品种"/>
	                                     <div type="text" class="edit-input" v-if="breedParam.id">
	                                         <input-select
	                                           :prevalue="breedInfo.location"
	                                           :value.sync="breedInfo.location"
	                                           :options="initBreedDetail.locals.arr"
	                                           placeholder="产地"
	                                           label="name"

	                                         >
	                                         </input-select>
	                                     </div>

	                                </div>
	                         
	                                <div class="editpage-input col-md-6">
	                                     <label class="editlabel" >{{$t('static.quantity')}}<span class="system_danger" v-if="$inner.number.required">{{$t('static.required')}}</span></label>
	                                     <input type="text" v-model="breedInfo.number" class="form-control edit-input" v-validate:number="{required:true}" />
	                                </div>
	                         
	                                <div class="editpage-input col-md-6">
	                                     <label class="editlabel" >{{$t('static.price')}}<span class="system_danger" v-if="$inner.pack0.required">{{$t('static.required')}}</span></label>
	                                     <input type="number"  v-model="breedInfo.price" class="form-control edit-input" v-validate:pack0="{required:true}" />
	                                </div>

	                                <div class="pull-right col-md-6" style="margin-top:10px;text-align:right">
	                                    <button type="button" class="btn btn-confirm">
	                                        <div v-if="breedInfo.status==1" @click="cancelAddBreed()">{{$t('static.cancel')}}</div>
	                                        <div v-if="breedInfo.status==2" @click="cancelModifyBreed()">{{$t('static.cancel')}}</div>
	                                    </button>
	                                    <button type="button" class="btn btn-confirm" v-if="$inner.valid">
	                                        <div v-if="breedInfo.status==1" @click="addBreed()">{{$t('static.save')}}</div>
	                                        <div v-if="breedInfo.status==2" @click="modifyBreed()">{{$t('static.save')}}</div>
	                                    </button>
	                                    <button type="button" class="btn btn-confirm" v-else disabled="disabled">{{$t('static.save')}}</button>
	                                    
	                                </div>  
	                             </div>
	                       </div>  
	                    </validator> 
			        </div>
	            </div>
	           	<div class="edit_footer">
		            <button type="button" class="btn btn-default btn-close" @click="param.send = false">{{$t('static.cancel')}}</button>
		            <button type="button" class="btn  btn-confirm"  v-if="$validation.valid&&param.goods.length>0"  @click="confirm()">{{$t('static.confirm')}}</button>
		            <button type="button" class="btn  btn-confirm" v-else  disabled="true">{{$t('static.confirm')}}</button>
		        </div>
	        </validator>
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import searchbreedModel  from './breedsearch.vue'
import {
    initCustomerlist
} from '../../vuex/getters'
import {
    
} from '../../vuex/actions'
export default{
	props:['param'],
	data(){
		return {
			loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                link:'/customer/employeeDistributed',
                name:'',
                phone:'',
                type:'',
                employeeId:'',
                total:0
            },
			checked:false,
			show:true,
			breedParam:{
                show:false,
                breedName:'',
                breedId:'',
                loading:false,
                id:''
            },
            breedInfo:{ 
              status:0,   //自定义状态，表示编辑框的状态，0表示收起(起始)状态，1表示add，2表示update，add或update结束后将status置为0
              breedId:'',
              breedName:'',
              title:'',
              quality:'',
              location:'',
              spec:'',
              number:'',
              unit:'',
              price:'',
              id:''
            },
            addParam:{
              show:false,
              length:0
            },
            updateParam:{
              show:false,
              index:0
            },
		}
	},
	components:{
		pagination,
		searchbreedModel
	},
	vuex:{
		getters:{
			initCustomerlist
		},
		actions:{
			
		}
	},
	methods:{
		serviceselected:function(sub,id,name,tel,email){
			this.$store.state.table.basicBaseList.customerList[sub].checked=!this.$store.state.table.basicBaseList.customerList[sub].checked;
			for(var key in this.initCustomerlist){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.customerList[key].checked==true){
						this.$store.state.table.basicBaseList.customerList[key].checked=false;
					}
				}
			}
			this.param.customerId= id;
			this.param.customerName = name;
			this.param.customerPhone = tel;
            this.param.email = email;
			this.param.show=false;
			this.$dispatch('customer',this.param);
		},
		employNameSearch: function() {
            this.getClientList(this.loadParam);
        },
        reset:function(){
        	this.loadParam.name='';
            this.loadParam.phone='';
        },
	    searchBreed:function(breedName,breedId){
            this.breedParam.show=true;
            /*this.param.breedName = this.breedParam.breedName;
            this.param.breedId = this.breedParam.breedId;*/
     	},
        showModifyBreed:function(index){
          this.breedInfo.status = 2;
          this.updateParam.index = index;
          this.breedInfo.breedId=this.param.goods[index].breedId,
          this.breedInfo.breedName=this.param.goods[index].breedName,
          this.breedInfo.title=this.param.goods[index].title,
          this.breedInfo.quality=this.param.goods[index].quality,
          this.breedInfo.location=this.param.goods[index].location,
          this.breedInfo.spec=this.param.goods[index].spec,
          this.breedInfo.number=this.param.goods[index].number,
          this.breedInfo.unit=this.param.goods[index].unit,
          this.breedInfo.price=this.param.goods[index].price,
          this.breedInfo.sourceType=this.param.goods[index].sourceType,
          this.breedInfo.id=this.param.goods[index].orderId,
          this.updateParam.show = true;
        },
        deleteBreed:function(index){
           this.param.goods.splice(index,1);
        },
        showAddBreed:function(){
          if(this.param.goods.length == 0||this.param.goods[this.param.goods.length-1].breedId != ''){
              this.breedInfo.status = 1;    
              this.breedInfo.breedId='';
              this.breedInfo.breedName='';
              this.breedInfo.title='';
              this.breedInfo.quality='';
              this.breedInfo.location='';
              this.breedInfo.spec='';
              this.breedInfo.number='';
              this.breedInfo.unit='';
              this.breedInfo.price='';
              this.breedInfo.sourceType=1;
              this.breedInfo.id='';
              this.param.goods.push({
                  breedId:'',
                  breedName:'',
                  title:'',
                  quality:'',
                  location:'',
                  spec:'',
                  number:'',
                  unit:'',
                  price:'',
                  sourceType:1,
                  status:'',
                  id:''
              });
              this.addParam.show = true;
          }  
          
        },
	},
	events:{
        breed:function(breed){
            this.breedInfo.breedName = breed.breedName;
            this.breedInfo.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
        }
    },
	created(){
		if("employeeId" in this.param){
            this.loadParam.employeeId = this.param.employeeId;
        }
        if(this.param.breedId){
            this.breedParam.breedName = this.param.brredName;
            this.breedParam.id = this.param.breedId;
            this.getBreedDetail(this.breedParam);
            console.log(this.breedParam)
          }
        console.log(this.param)
	}
}
</script>
<style scoped>
.modal{
	z-index: 1085;
}
.modal_con{
	z-index: 1085;
	top:60;
}
.top-title{
	position: fixed;
	margin: auto;
	right: 0;
	left: 0;
	width: 800px;
}
.change_trans{
	margin-top: 20px;
}
.con_trans{
	margin-top: 40px;
}
.transfer{
	margin-right: 7px;
}
.tans_tab{
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #fa6705;
	text-align: left;
}
.tans_tab > .tabs{
	width: 100px;
	display: inline-block;
	font-size:16px;
	text-align: center;
	background-color: #f5f5f5;
	color: #333;
	float: left;
	height: 40px;
	border-bottom: 1px solid #fa6705;
	cursor: pointer;
}
.tans_tab .tabs_active{
	background-color: #fff;
	color: #fa6705;
	border: 1px solid #fa6705;
	border-bottom: 0;
}
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.trans_service{
	margin-top: 20px;
}
.trans_service .col-xs-8{
	margin-bottom: 20px;
}
.table{
	display: table;
}
.table_head>thead>tr{
	background-color: #f5f5f5;
	color: #333;
	font-size: 18px;
}
.base_pagination{
	margin-top: 0;
}
.editlabel{
	text-align: left;
}
</style>
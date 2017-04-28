<template>
	<search-empinfo :param='searchParam' v-if='searchParam.show'></search-empinfo>
	<breed-search :param='loadParam' v-if='loadParam.show'></breed-search>
    <div>
        <!-- <select-model :param="selectParam" v-if="selectParam.show"></select-model> -->
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <div class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con">
            <div class="cover_loading">
                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3 v-if="param.flag==0">新建库存</h3>
                <h3 v-if="param.flag==1">编辑库存</h3>
            </div>
            <validator name="validation">
                <form novalidate>
                    <div class="edit-model">
                        <section class="editsection" v-cloak>
                            <div class="clearfix">
                            <div class="col-md-12">
                            	<!-- 品种 -->
                                <div class="client-detailInfo col-md-6">
                                    <label class="editlabel">{{$t('static.breed')}}<span class="system_danger" v-if="$validation.name.required">请输入品种名称</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.breedName" v-validate:name="{required:true}" readonly="readonly" @click="selectBreed()"/>
                                </div>
                                <!-- 联系业务员 -->
                                <div class="client-detailInfo  col-md-6">
                                    <label>联系业务员<span class="system_danger" v-if="$validation.emp.required">请选择业务员</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:emp="{required:true}" v-model="param.employeeName" readonly="readonly" @click='searchEmpInfo()'/>
                                </div>
                            </div>
                            <div class="col-md-12">
                             	<!-- 规格 -->
                                <div class="client-detailInfo  col-md-6">
                                    <label class="editlabel">{{$t('static.specification')}}<span class="system_danger" v-if="$validation.specification.required">请输入规格</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:specification="{required:true}" v-model=" specAttribute"  @click="changeSpec()"/>
                                </div>
                                <!-- 片型 -->
                                <div class="client-detailInfo  col-md-6">
                                    <label class="editlabel">片型<span class="system_danger" v-if="$validation.spec.required">请输入片型</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:spec="{required:true}" v-model="param.specAttribute | specFilter_b"  @change="changeShape()"/>
                                </div>
                            </div>  
                            <div class="col-md-12">
                            	<!-- 产地 -->
                                <div class="client-detailInfo  col-md-6">
                                    <label class="editlabel" for="system">{{$t('static.origin')}}<span class="system_danger" v-if="$validation.location.required">请输入产地</span></label>
                                    <input type="text" class="form-control edit-input" debounce="500" v-validate:location="['required']" v-model="param.location" />
                                </div>
                            	<!-- 仓库地 -->
                                <div class="client-detailInfo  col-md-6">
                                    <label class="editlabel" for="system">仓库地址<span class="system_danger" v-if="$validation.stocklocation.required">请输入仓库地址</span></label>
                                    <select class="form-control edit-input" v-model="param.depotName" v-validate:stocklocation="{required:true}">
                                    	<option value="亳州">亳州</option>
                                    	<option value="玉林">玉林</option>
                                    	<option value="安国">安国</option>
                                    	<option value="定西">定西</option>
                                    	<option value="成都">成都</option>
                                    </select>
                                </div>
                            </div>  
                                
                            <div class="col-md-12">
                            	<!-- 库存数量 -->
                                <div class="client-detailInfo  col-md-6">
                                    <label>库存数量 <span class="system_danger" v-if="$validation.usablenum.required">请输入库存数量</span><span class="system_danger" v-if="$validation.usablenum.min">库存数量需大于0</span></label>
                                    <input type="number" class="form-control edit-input" v-validate:usablenum="{required:true,min:0}" v-model="param.usableNum" />
                                </div>
                                <!-- 单位 -->
                                <div class="client-detailInfo  col-md-6">
                                    <label class="editlabel">{{$t('static.unit')}}
                                    	<span class="system_danger" v-if="$validation.unit.required">请输入单位</span>
                                    </label>
                                    <select v-model="param.unit" class="form-control edit-input" v-validate:unit="{required:true}">
                                        <option v-for="item in initUnitlist" value="{{item.id}}">{{item.name}}</option>
                                    </select>
                                </div>
                            </div> 
                            <div class="col-md-12">
                            	<!-- 是否可加工 -->
                                <div class="client-detailInfo col-md-6">
                                    <label>是否可加工</label>
                                    <select class="form-control edit-input" v-model='param.canProcess'>
                                        <option value=1>{{$t('static.yes')}}</option>
                                        <option value=0>{{$t('static.no')}}</option>
                                    </select>
                                </div>
                                <!-- 可否押款 -->
                              <div class="client-detailInfo col-md-6">
                                    <label>可否押款</label>
                                    <select class="form-control edit-input" v-model='param.canDeposite'>
                                        <option value=1>{{$t('static.yes')}}</option>
                                        <option value=0>{{$t('static.no')}}</option>
                                    </select>
                                </div>
                            </div>  
                            <div class="col-md-12">
                            	<!-- 采购价格 -->
                                <div class="client-detailInfo  col-md-6">
                                    <label class="editlabel" for="system">采购价格<span class="system_danger" v-if="$validation.price.required">请输入采购价格</span><span class="system_danger" v-if="$validation.price.min">采购价格不得小于0</span></label>
                                    <input type="number" class="form-control edit-input" v-validate:price="{required:true,min:0}" v-model="param.price" />
                                </div>
                                <!-- 过期时间 -->
                                <div class="editpage-input" style="margin-top: 0px;">
                                    <label class="editlabel">过期时间</label>
                                    <mz-datepicker :time.sync="param.dueDate" format="yyyy-MM-dd HH:mm:ss" style="height:36px" @change="changeDate()">
                                    </mz-datepicker>
                                    <button type="button" class="btn btn-default" style="margin-top:-6px" height="24" width="24" @click="reset('duedate')">清空</button>
                                </div>
                            </div>  
                            <div class="col-md-12">
                            	<!-- 备注（选） -->
                                <div class="client-detailInfo  col-md-6">
                                    <label>备注（选）</label>
                                    <input type="text" class="form-control edit-input" v-model="param.comment" />
                                </div>
                            </div>                                                                                                   
                            </div>
                        </section>
                    </div>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                        <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="createOrUpdateStock()">{{$t('static.confirm')}}</button>
                        <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                    </div>
                </form>
            </validator>
        </div>
    </div>
</template>
<script>
//import selectModel from './employeeOrOrg'
import searchEmpinfo from '../clientRelate/searchEmpinfo'
import breedSearch from '../../components/Intention/breedsearch.vue'
import tipsModel from '../tips/tipDialog'
import vSelect from '../tools/vueSelect/components/Select'
import languageModel from '../tools/language.vue'
import mzDatepicker from '../calendar/vue.datepicker.js'
import {
	initUnitlist
    } from '../../vuex/getters'
import {
	createStockInfo,
	editStockInfo,
	getUnitList
} from '../../vuex/actions'
export default {
    components: {
        //selectModel,
        tipsModel,
        vSelect,
        languageModel,
        searchEmpinfo,
        breedSearch
    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: 0
            },
            searchParam: {
                show: false
            },
            tipsParam: {
                show: false,
                remain: true,
                name: '创建成功',
                alert: true
            },
            specAttribute:this.spec,
            
            loading: false,
            ischangeSpec:false,
            ischangeShape:false
        }
    },
    vuex: {
        getters: {
            initUnitlist
        },
        actions: {
            createStockInfo,
            editStockInfo,
            getUnitList
        }
    },
    methods: {
    	searchEmpInfo:function(){
    		this.searchParam.show = true
    	},
    	selectBreed:function(){
    		this.loadParam.show = true
    	},
    	createOrUpdateStock:function(){
    		if (this.param.flag == 0) {
                //this.tipParam.name = '新建意向成功';
                var times_a = this.param.dueDate.substr(0,10)
    			var mtimes_a = Date.parse(times_a.substr(5,2)+'/'+times_a.substr(8,2)+'/'+times_a.substr(0,4))
    			this.param.dueDate = mtimes_a;
                this.param.show = false;
                console.log(this.param)
                this.createStockInfo(this.param);
            }
            if (this.param.flag == 1) {
                //this.tipParam.name = '修改意向成功';
               	
                this.param.show = false;
                this.editStockInfo(this.param);
            }
            this.param.callback = this.param.callback;
    	},
    	changeDate:function(){
    		var times_b = this.param.dueDate.substr(0,10)
    		var mtims_b = Date.parse(times_b.substr(5,2)+'/'+times_b.substr(8,2)+'/'+times_b.substr(0,4))
            this.param.dueDate = mtimes_b;
    	},
    	changeSpec:function(){
    		console.log("哈哈")
    		this.ischangeSpec= true
    		console.log(this.spec)
    	},
    	changeShape:function(){
    		this.ischangeShape= true
    	},
    	reset: function(type) {
            if (type == "duedate") {
                this.param.duedate = "";
            }
        },
    },
    created:function(){
    	this.getUnitList()
    },
    computed:{
    	spec:function(){

    		var data = JSON.parse(this.param.specAttribute)
			for(var key in data){
				return data[key]['规格']
			}
    	}
    },
    events:{
    	a:function(res){
    		this.param.employeeName = res.employeeName
    		this.param.employeeId =res.employeeId
    	},
    	breed: function(breed) {
			console.log(breed.breedId)
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.param.breedName = breed.breedName;
            this.param.breedId = breed.breedId;;
        }
    },
    filters:{
		specFilter_a:function(data){
			if(data&&this.param.flag==1&&this.param.specAttribute.substr(0,1)=='{'){

					data = JSON.parse(data)
					for(var key in data){
						return data[key]['规格']
					}
				
			}
			
		},
		specFilter_b:function(data){
			if(data&&this.param.flag==1){
				if(this.ischangeShape){
					return data
				}else{
					data = JSON.parse(data)
					for(var key in data){
						return data[key]['片型']
					}
				}
				
			}
			
		}
	},       

}
</script>
<style scoped>
.modal {
    z-index: 1083;
}

.modal_con {
    width: 840px;
    z-index: 1084;
}

.top-title {
    width: 840px;
    position: fixed;
    top: 91px;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 70px;
}

.edit-input {
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.editpage-input {
    margin-top: 15px;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 50px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 840px;
    background: #fff;
    margin: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.edit_footer button {
    margin-left: 15px;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.editpage_img {
    width: 90%;
}

.editpage_img img {
    display: inline-block;
    background: #ccc;
}

.editpage-image {
    display: inline-block;
}
</style>

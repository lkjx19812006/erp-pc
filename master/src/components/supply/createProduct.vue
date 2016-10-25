<template>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
    <searchsupply-model :param="supplyParam" v-if="supplyParam.show"></searchsupply-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection"  v-cloak>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">名称 <span class="system_danger" v-if="$validation.username.required">请输入产品名称</span></label>
                                <input type="text" class="form-control" v-model="param.name" v-validate:username="['required']" value="{{param.name}}" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">类型<span class="system_danger" v-if="$validation.type.required">请输入产品名称</span></label>
                                 <select  value="{{param.type}}" v-model="param.type" class="form-control" v-validate:type="['required']">
                                    <option value="0">药材</option>
                                    <option value="1">提取物</option>
                                    <option value="2">饮片</option>
                                </select>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">品种类别 <span class="system_danger" v-if="$validation.breed.required">请选择品种类别</span></label>
                                <select   v-model="param.breedId" class="form-control"  v-validate:breed="['required']" >
                                    <option v-for="item in initCategorylist" value="{{item.id}}">{{item.name}}</option>
                                </select>
                                <!-- <input type="text" id="breed" class="form-control" v-model="param.breedId" v-validate:breed="['required']" value="{{param.breedId}}" disabled="true"  @click="searchBreed(param.categoryName,param.breedId)"/> -->
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">供应商ID<span class="system_danger" v-if="$validation.cid.required">请选择供应商</span></label>
                                <input type="text" class="form-control" v-model="param.cid" value="{{param.cid}}" readonly="readonly" v-validate:cid="['required']" @click="selectSupply(param.cid)" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">

                                <label class="editlabel">产地 <span class="system_danger" v-if="$validation.location1.required">请输入产地</span></label>
                                 <select  value="{{param.location}}" v-model="param.location" class="form-control" id="location1" v-validate:location1="['required']" >
                                    <option v-for="item in initProvince">{{item.cname}}</option>
                                </select>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">质量</label>
                                <input type="text" class="form-control" v-model="param.quality" value="{{param.quality}}"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">

                                <label class="editlabel">数量 <span class="system_danger" v-if="$validation.number.quantity">请输入不超过小数点四位的数字</span></label>
                                <input type="number" class="form-control" v-model="param.number" v-validate:number="['quantity']" value="{{param.number}}" />
                            </div>
                             <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">规格 <span class="system_danger" v-if="$validation.spec.required">请输入规格</span></label>
                                <input type="text" class="form-control" v-model="param.spec"  v-validate:spec="['required']" value="{{param.spec}}"/>

                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">单位</label>
                                <div type="text" class="editpage-input" style="margin-top:0">
                                   <input-select
                                     :value.sync="param.unit"
                                     :prevalue="param.unit"
                                     :options="initCategorylist.unit"
                                     placeholder="单位"
                                     label="name" 
                                   >
                                   </input-select>
                                 </div>
                            </div>
                           <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">价格 <span class="system_danger" v-if="$validation.price.money">请输入不超过小数点两位的数字</span></label>
                                 <input type="number" v-model='param.price' class="form-control edit-input" value="{{param.price}}" v-validate:price="['money']" style="display:-webkit-inline-box"/><span v-show="param.unit">/{{param.unit}}</span>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">检测报告</label>
                                <select  value="{{param.coa}}" v-model="param.coa" class="form-control">
                                    <option value="1">有</option>
                                    <option value="0" selected>无</option>
                                </select>
                                <!-- <input type="text" class="form-control" v-model="param.coa" value="{{param.coa}}"/> -->
                            </div>
                             <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">价格过期时间</label>
                                <mz-datepicker :time.sync="param.duedate" format="yyyy-MM-dd HH:mm:ss"></mz-datepicker>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show=false)">保存</button>
                    <button type="button" class="btn btn-confirm" v-else disabled="true">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import calendar from '../calendar/vue.datepicker'
import searchsupplyModel from '../supply/selectSupply'
import inputSelect from '../tools/vueSelect/components/inputselect'
import {
    initProvince,
    initCategorylist
} from '../../vuex/getters'
import {
    getProvinceList,
    getCategoryData
} from '../../vuex/actions'
export default {
    components: {
        calendar,
        searchsupplyModel,
        inputSelect
    },
    props: ['param'],
    data() {
        return {
           dateText:'',
            loadParam: {
              loading: true,
              show:false,
              color: '#5dc596',
              size: '15px',
              cur: 1,
              all: 7
            },
            breedParam:{
                show:false,
                breedName:'',
                breedId:'',
                loading:false,
                id:''
            },
            supplyParam:{
                show:false,
                cid:''
            }
        }
    },
    vuex: {
      getters: {
         initProvince,
        initCategorylist
      },
      actions: {
         getProvinceList,
         getCategoryData
      }
    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
        }
    },
    methods:{
        createDateText() {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let str = `${year}/${month}/${day}`
            this.dateText = str.replace(/\b(\w)\b/g, "0$1")
        },
        selectSupply:function(cid){
            this.supplyParam.show=true;
            if("id" in this.param){
                this.supplyParam.cid = this.param.id;
            }

        }
    },
    events:{
        supply:function(supply){
            this.param.cid = supply.cid;
        }
    },
    ready() {
        this.createDateText()
    },
    created() {
      this.getProvinceList(this.loadParam);
      this.getCategoryData(this.loadParam);
    }
}
</script>
<style scoped>
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow:inherit;
    padding: 10px 30px 50px 30px;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpage-input {
    margin-top: 15px;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.edit-input {
    height: 36px;
    line-height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
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
.edit-input:focus {
    border-color: #fa6705;
}
</style>

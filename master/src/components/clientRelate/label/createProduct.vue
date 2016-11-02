<template>
    <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
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
                                <label class="editlabel">名称 <span class="system_danger" v-if="$validation.username.required">请输入名称</span></label>
                                <input type="text" id="username" class="form-control" v-model="param.name" v-validate:username="['required']" value="{{param.name}}" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">类型</label>
                                 <select  value="{{param.type}}" v-model="param.type" class="form-control">
                                    <option value="1" selected>可用</option>
                                </select>
                                <!-- <input type="text" id="usertype" class="form-control" v-model="param.type" v-validate:usertype="['required']" value="{{param.type}}"/> -->
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">品种类别 <span class="system_danger" v-if="$validation.breed.required">请选择品种类别</span></label>
                                <select  v-model="param.breedId" class="form-control" v-validate:breed="['required']" >
                                    <option v-for="item in initBreedlist" value="{{item.id}}">{{item.categoryName}}{{item.id}}</option>
                                </select>
                                <!-- <input type="text" id="breed" class="form-control" v-model="param.breedId" v-validate:breed="['required']" value="{{param.breedId}}" disabled="true"  @click="searchBreed(param.categoryName,param.breedId)"/> -->
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">质量</label>
                                <input type="text" class="form-control" v-model="param.quality" value="{{param.quality}}"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">产地 <span class="system_danger" v-if="$validation.location.required">请输入产地</span></label>
                                 <select  value="{{param.location}}" v-model="param.location" class="form-control" v-validate:location="['required']" >
                                    <option v-for="item in initProvince">{{item.cname}}</option>
                                </select>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">规格 <span class="system_danger" v-if="$validation.spec.required">请输入规格</span></label>
                                <input type="text" class="form-control" v-model="param.spec"  id="spec" v-validate:spec="['required']" value="{{param.spec}}"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">数量 <span class="system_danger" v-if="$validation.number.quantity">请输入数量</span></label>
                                <input type="text" class="form-control" v-model="param.number" id="number" v-validate:number="['quantity']" value="{{param.number}}" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">价格 <span class="system_danger" v-if="$validation.price.money">请输入价格</span></label>
                                <input type="text" class="form-control" v-model="param.price"  id="price" v-validate:price="['money']" value="{{param.price}}"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">单位 <span class="system_danger" v-if="$validation.unit.required">请输入单位</span></label>
                                <input type="text" class="form-control" v-model="param.unit" id="unit" v-validate:unit="['required']" value="{{param.unit}}"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">价格过期时间</label>
                                <mz-datepicker :time.sync="param.duedate" format="yyyy-MM-dd HH:mm:ss"></mz-datepicker>
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
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show = false)" >保存</button>  
                    <button type="button" class="btn btn-confirm" v-else disabled="true">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import calendar from '../../calendar/vue.datepicker'
import {
    initProvince,
    initBreedlist
} from '../../../vuex/getters'
import {
    getProvinceList,
    getBreedData
} from '../../../vuex/actions'
export default {
    components: {
        calendar
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
            }
        }
    },
    vuex: {
      getters: {
         initProvince,
         initBreedlist
      },
      actions: {
         getProvinceList,
         getBreedData
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
        }
    },
    ready() {
        this.createDateText()
    },
    created() {
      this.getProvinceList(this.loadParam);
      this.getBreedData(this.loadParam);
    }
}
</script>
<style scoped>
.modal{
    z-index: 1083
}
.modal_con{
    z-index: 1084;
    bottom: 150px;
}
.top-title{
    position: absolute;
    top: 0;
    right: 0;
}
.edit_footer{
    bottom: 150px;
}
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
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
</style>

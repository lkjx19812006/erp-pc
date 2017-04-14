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
                    <section class="editsection" v-cloak>
                        <!-- <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">产品名称<span class="system_danger" v-if="$validation.username.required">请输入名称</span></label>
                                <input type="text" id="username" class="form-control" v-model="param.name" v-validate:username="['required']" value="{{param.name}}" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">产品类型</label>
                                <select value="{{param.type}}" v-model="param.type" class="form-control">
                                    <option>药材</option>
                                    <option>提取物</option>
                                    <option>饮片</option>
                                </select>
                            </div>
                        </div> -->
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">品种名称 <span class="system_danger" v-if="$validation.breed.required">请选择品种</span></label>
                                <input type="text" class="form-control" v-model="param.breedName" v-validate:breed="['required']" value="{{param.breedName}}" @click="searchBreed(param.breedName,param.breedId)" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">规格</label>
                                <input type="text" class="form-control" v-show="!breedParam.id" v-model="param.spec" value="{{param.spec}}" />
                                <div type="text" v-if="breedParam.id">
                                    <input-select :value.sync="param.spec" :prevalue="param.spec" :options="initBreedDetail.specs.arr" placeholder="规格" label="name">
                                    </input-select>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">产地 <span class="system_danger" v-if="$validation.location.required">产地不能为空</span></label>
                                <input type="text" class="form-control" v-model="param.location" v-show="!breedParam.id" v-validate:location="['required']" disabled="disabled" placeholder="请先选择一个品种" />
                                <div type="text" v-if="breedParam.id">
                                    <input-select :prevalue="param.location" :value.sync="param.location" :options="initBreedDetail.locals.arr" placeholder="产地" label="name">
                                    </input-select>
                                </div>
                            </div>
                            <!-- <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">产品质量</label>
                                <input type="text" class="form-control" v-model="param.quality" value="{{param.quality}}" />
                            </div> -->
                        </div>
                        <!-- <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">数量（库存） <span class="system_danger" v-if="$validation.number.quantity">请输入数量</span></label>
                                <input type="text" class="form-control" v-model="param.number" id="number" v-validate:number="['quantity']" value="{{param.number}}" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">价格 <span class="system_danger" v-if="$validation.price.money">请输入不超过小数点两位的数字</span></label>
                                <input type="text" class="form-control" v-model="param.price" id="price" v-validate:price="['money']" value="{{param.price}}" />
                            </div>
                        </div> -->
                        <!-- <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">单位 <span class="system_danger" v-if="$validation.unit.required">单位不能为空</span></label>
                                <input type="text" v-show="!breedParam.id" v-model="param.unit" v-validate:unit="{required:true}" class="form-control edit-input" disabled="disabled" placeholder="请先选择一个品种" />
                                <div type="text" v-if="breedParam.id">
                                    <input-select :value.sync="param.unit" :prevalue="param.unit" :options="initBreedDetail.units.arr" placeholder="单位" label="name">
                                    </input-select>
                                </div>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">价格过期时间</label>
                                <mz-datepicker :time.sync="param.duedate" format="yyyy-MM-dd HH:mm:ss"></mz-datepicker>
                            </div>
                        </div> -->
                        <!-- <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">检测报告</label>
                                <select value="{{param.coa}}" v-model="param.coa" class="form-control">
                                    <option value="1">有</option>
                                    <option value="0">无</option>
                                </select>
                            </div>
                        </div> -->
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show = false)">保存</button>
                    <button type="button" class="btn btn-confirm" v-else disabled="true">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import calendar from '../../calendar/vue.datepicker'
import searchbreedModel from '../../Intention/breedsearch'
import vSelect from '../../tools/vueSelect/components/Select'
import inputSelect from '../../tools/vueSelect/components/inputselect'
import {
    initProvince,
    initBreedlist,
    initBreedDetail
} from '../../../vuex/getters'
import {
    getProvinceList,
    getBreedData,
    getBreedDetail
} from '../../../vuex/actions'
export default {
    components: {
        calendar,
        searchbreedModel,
        inputSelect,
        vSelect
    },
    props: ['param'],
    data() {
        return {
            dateText: '',
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            breedParam: {
                show: false,
                breedName: '',
                breedId: '',
                loading: false,
                id: ''
            }
        }
    },
    vuex: {
        getters: {
            initProvince,
            initBreedlist,
            initBreedDetail
        },
        actions: {
            getProvinceList,
            getBreedData,
            getBreedDetail
        }
    },
    methods: {
        createDateText() {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let str = `${year}/${month}/${day}`
            this.dateText = str.replace(/\b(\w)\b/g, "0$1")
        },
        searchBreed: function(brredName, breedId) {
            this.breedParam.show = true;
        },
    },
    events: {
        breed: function(breed) {
            this.param.breedName = breed.breedName;
            this.param.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
            this.breedParam.loading = true;
            this.getBreedDetail(this.breedParam);
        }
    },
    ready() {
        this.createDateText()
    },
    created() {
        this.getProvinceList(this.loadParam);
        this.getBreedData(this.loadParam);
        if (this.param.breedId) {
            this.breedParam.breedName = this.param.breedName;
            this.breedParam.id = this.param.breedId;
            this.getBreedDetail(this.breedParam);
        }
    }
}
</script>
<style scoped>
.modal {
    z-index: 1083
}

.modal_con {
    z-index: 1084;
    bottom: 150px;
}

.top-title {
    position: absolute;
    top: 0;
    right: 0;
}

.edit_footer {
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

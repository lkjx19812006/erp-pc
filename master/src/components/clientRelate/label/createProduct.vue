<template>
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
                                <input type="text" id="username" class="form-control" v-model="param.name" v-validate:username="['required']" value="{{param.name}}"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">类型 <span class="system_danger" v-if="$validation.usertype.required">请输入类型</span></label>
                                <input type="text" id="usertype" class="form-control" v-model="param.type" v-validate:usertype="['required']" value="{{param.type}}"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">品种ID <span class="system_danger" v-if="$validation.usertype.required">请输入品种ID</span></label>
                                <input type="text" id="breedId" class="form-control" v-model="param.breedId" v-validate:breedId="['required']" value="{{param.breedId}}"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">质量</label>
                                <input type="text" class="form-control" v-model="param.quality" value="{{param.quality}}"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">产地 <span class="system_danger" v-if="$validation.location.required">请输入产地</span></label>
                                <input type="text" class="form-control"  v-model="param.location" id="location" v-validate:location="['required']" value="{{param.location}}"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">规格 <span class="system_danger" v-if="$validation.spec.required">请输入规格</span></label>
                                <input type="text" class="form-control" v-model="param.spec"  id="spec" v-validate:spec="['required']" value="{{param.spec}}"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">数量 <span class="system_danger" v-if="$validation.number.required">请输入数量</span></label>
                                <input type="text" class="form-control" v-model="param.number" id="number" v-validate:number="['required']" value="{{param.number}}" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">价格 <span class="system_danger" v-if="$validation.price.required">请输入价格</span></label>
                                <input type="text" class="form-control" v-model="param.price"  id="price" v-validate:price="['required']" value="{{param.price}}"/>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">单位 <span class="system_danger" v-if="$validation.unit.required">请输入价格</span></label>
                                <input type="text" class="form-control" v-model="param.unit" id="unit" v-validate:unit="['required']" value="{{param.unit}}"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label class="editlabel">价格过期时间</label>
                               <!--  <input type="text" class="form-control" v-model="param.duedate" value="{{param.duedate}}"/> -->
                                <mz-datepicker :time.sync="param.duedate" format="yyyy/MM/dd HH:mm:ss"></mz-datepicker>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label class="editlabel">检测报告</label>
                                <input type="text" class="form-control" v-model="param.coa" value="{{param.coa}}"/>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn btn-confirm"  @click="param.link(param,param.show = false)" value="保存" />
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import calendar from '../../calendar/vue.datepicker'
export default {
    components: {
        calendar
    },
    props: ['param'],
    data() {
        return {
           dateText:'',
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
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
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
</style>

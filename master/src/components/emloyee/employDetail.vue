<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div class="breed_detail">
        <div class="client-section clearfix" v-cloak>
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <validator name="validation">
                <div  class="section_title clearfix">
                    <span>{{param.name}}的信息</span>
                    <button class="new_btn transfer" v-if="$validation.valid" @click="saveSucc(param)">保存</button> 
                    <button class="new_btn transfer" v-else disabled="disabled">保存</button> 

                </div>
                <div class="edit-detail">
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">姓名<span class="system_danger" v-if="$validation.name.minlength">请输入至少两位</span></label>
                            <input type="text" class="form-control edit-input" v-validate:name="{minlength:2}" v-model="param.name" value="{{param.name}}" />
                        </div>
                        <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                            <label class="editlabel">英文名</label>
                            <input type="text" class="form-control edit-input"  v-model="param.ename" value="{{param.ename}}" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">工号<span class="system_danger" v-if="$validation.no.required">请输入员工工号</span></label>
                            <input type="text" class="form-control edit-input" v-validate:no="['required']"  v-model="param.no" value="{{param.no}}" />
                        </div>
                        <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                            <label class="editlabel">部门</label>
                             <input type="text" class="form-control edit-input"   v-model="param.orgName" value="{{param.orgName}}" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">职位<span class="system_danger" v-if="$validation.position.required">请输入职位</span></label>
                             <input type="text" class="form-control edit-input" v-validate:position="['required']" v-model="param.position" value="{{param.position}}" />
                        </div>
                        <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                            <label class="editlabel">手机号<span class="system_danger" v-if="$validation.mobile.phone">请输入正确的手机号</span></label>
                            <input type="text" class="form-control edit-input"v-validate:mobile="['phone']" v-model="param.mobile" value="{{param.mobile}}" />
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">分机号</label>
                             <input type="text" class="form-control edit-input"   v-model="param.extno" value="{{param.extno}}"/>
                        </div>
                        <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                            <label class="editlabel">职级</label>
                            <input type="text" class="form-control edit-input"  v-model="param.level" value="{{param.level | levelstate}}"/>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">入职时间</label>
                            <div class="search_input">
                                <mz-datepicker :time.sync="param.entrydate" format="yyyy-MM-dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </div>
                        <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                            <label class="editlabel">离职时间</label>
                            <div class="search_input">
                                <mz-datepicker :time.sync="param.leavedate" format="yyyy-MM-dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </div> 
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">角色</label>
                            <div class="pull-left role clerafix">
                                 <input type="checkbox" class="checkbox_unselect" id="client_ids"  value="部门经理" />
                                 <label  for="client_ids">部门经理</label>
                            </div>
                        </div>
                    </div>
                </div>
            </validator>   
</template>
<script>
import filter from '../../filters/filters'
import tipsdialogModel  from '../tipsDialog'
import calendar from '../calendar/vue.datepicker'
import {
    updateEmploy
} from '../../vuex/actions'
export default {
    components: {
        filter,
        tipsdialogModel,
        calendar
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            tipsParam:{
                show:false,
                name:'修改成功'
            },
            dateText:''
        }
    },
    props:['param'],
    vuex: {
       actions:{
           updateEmploy
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
        saveSucc:function(param){
           this.tipsParam.show= true;
           this.updateEmploy(param) 
        }
    },
    ready() {
        this.createDateText()
    },
    filter: (filter, {})
}
</script>
<style scoped>
.top-title{
    width: 100%;
    right: 0;
    top:130px;
}
.client-detailInfo img {
    width: 100px;
}
.panel-body ul li:last-of-type{
    float: right;
}
.panel-body ul > li:last-of-type {
    float: none;
    position: relative;
}
.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control{
    background-color: #fff;
}
.panel-collapse{
    background-color: #fff;
}
.panel-group .panel{
    border-radius: 10px;
}
.breed_action {
    top: 33px;
    right: 30px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt {
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}

.contactSet>thead{
    color: #fa6705;
}
.contactSet>tbody>tr>td,.contactSet>thead>tr>th{
    border-bottom: none;
    border-top: none;
    text-align: left;
}
.contact_img{
    margin-right: 6px !important;
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
    float: left;
    margin-right: 10px;
}
</style>

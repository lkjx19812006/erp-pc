<template>
    <div>
        <page-model :param="parentParam" v-if="parentParam.show"></page-model>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container  modal_con">
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
                            <div class="clearfix">
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>中文名称<span class="system_danger" v-if="$validation.cname.minlength">请输入至少两位</span></label>
                                    <input type="text" class="form-control edit-input" maxlength="11" v-model="param.cname" v-validate:cname="{minlength:2}" />
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>英文名称</label>
                                    <input type="text" class="form-control edit-input" v-model="param.ename" />
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12" v-if="param.type==0">
                                    <label>父级页面 </label>
                                    <input type="text" class="form-control edit-input" @click="clickParent(parentParam.pid,parentParam.name,param.type,param.sys)" v-model="parentParam.name" />
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12" v-if="param.type==1">
                                    <label>父级页面 <span class="system_danger" v-if="$validation.parent.required">必填项</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:parent="{required:true}" @click="clickParent(parentParam.pid,parentParam.name,param.type,param.sys)" v-model="parentParam.name" />
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12" v-if="param.type==0">
                                    <label>路由地址 <span class="system_danger" v-if="$validation.url.required">必填项</span></label>
                                    <input type="text" v-validate:url="{required:true}" class="form-control edit-input" v-model="param.url" />
                                </div>
                                <div class="client-detailInfo  col-md-12 col-xs-12">
                                    <label>说明</label>
                                    <textarea style="border:1px solid #ddd;resize: none;width: 100%;border-radius: 5px;" class="form-control edit-input" rows="5" v-model="param.remark"></textarea>
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12" v-if="param.type==0">
                                    <label>图标路径</label>
                                    <input type="text" v-model="param.icon" class="form-control edit-input" readonly="true" />
                                    <press-image :value.sync="param.icon" :type="type" :param="imageParam" style="width:53%"></press-image>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                        <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm(param)">保存</button>
                        <button type="button" class="btn  btn-confirm" v-else disabled="disabled">保存</button>
                    </div>
                </form>
            </validator>
        </div>
    </div>
</template>
<script type="text/javascript">
import pressImage from '../imagePress'
import pageModel from '../role/oneFloorPage'
import {
    baseUpdateData,
    baseAddData
} from '../../vuex/actions.js'
export default {
    props: ['param'],
    components: {
        pressImage,
        pageModel
    },
    data() {
        return {
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            type: "image/jpeg,image/jpg,image/png",
            parentParam: {
                pid: '',
                show: false,
                name: '',
                type: '',
                sys: ''

            }
        }
    },
    vuex: {
        actions: {
            baseUpdateData,
            baseAddData
        }
    },
    events: {
        getImageData: function(imageData) {
            var images = new Array();
            this.param.image = imageData.result.image;
        },
        selectPage: function(page) {
            this.parentParam.pid = page.pid;
            this.parentParam.name = page.name;
            this.param.pid = page.pid;
        }
    },
    methods: {
        confirm: function(item) {
            this.param.show = false;
            if (this.param.title == '编辑菜单' || this.param.title == '修改功能') {
                this.baseUpdateData(this.param)
            } else if (this.param.title == '添加菜单' || this.param.title == '添加功能') {
                this.baseAddData(this.param)
            }
        },
        clickParent: function(id, name, type, sys) {
            this.parentParam.show = true;
            this.parentParam.type = type;
            this.parentParam.sys = sys;
        }
    },
    created() {
        if (this.param.pid) {
            this.parentParam.name = this.param.pid;
        }
    }
}
</script>
<style scoped>
.top-title {
    right: 0;
    left: 0;
    width: 800px;
}
</style>

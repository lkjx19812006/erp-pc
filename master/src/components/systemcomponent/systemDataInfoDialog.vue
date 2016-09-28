<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建枚举类型</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel" for="system">名称<span class="system_danger" v-if="$validation.system.required||$validation.system.minlength">请输入名称且不少于三位数</span></label>
                                    <input type="text" class="form-control  edit-input" id="system" v-validate:system="{required:true,minlength:3}" v-model="systemData.name"  />
                                </div>
                                <div class="editpage-input">
                                        <label class="editlabel" for="systemtype">类型
                                            <span class="system_danger" v-if="$validation.systemtype.required">请选择类型</span> 
                                        </label>
                                        <select class="form-control" id="systemtype" v-validate:systemtype="['required']" v-model="systemData.type" style="width:90%;"> 
                                            <option  value="TRACE">跟进类型</option>
                                            <option  value="ST">规格类型</option>
                                            <option  value="BANK">银行</option>
                                            <option  value="OSTAT">订单状态</option>
                                            <option  value="OT">包装方式</option>
                                            <option  value="MU">计量单位</option>
                                            <option  value="PAY">付款方式</option>
                                            <option  value="CL">客户信用等级</option>
                                            <option  value="IS">意向状态</option>
                                            <option  value="HT">药材品类</option>
                                            <option  value="ES">员工状态</option>
                                            <option  value="ET">企业类型</option>
                                            <option  value="CS">客户来源</option>
                                            <option  value="CT">证书类型</option>
                                            <option  value="AS">审核状态</option>
                                            <option  value="DEV">快递公司</option>
                                            <option  value="POS">职位</option>
                                            <option  value="LBL">常见标签</option>
                                            <option  value="ON">客户信用等级</option>
                                        </select> 
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel" for="systemcode">编码
                                        <span class="system_danger" v-if="$validation.systemcode.required">请输入编码</span> </label>
                                    <input type="text" class="form-control  edit-input" id="systemcode" v-validate:systemcode="['required']" v-model="systemData.code" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel" for="describe">描述</label>
                                    <input type="text" class="form-control  edit-input"  v-model="systemData.desc" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" @click="saveDataInfo(systemData,param.show = false)">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import {
    getSystemData,
    saveDataInfo
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            systemData: {
                name: '',
                code: '',
                type: '',
                desc: '',
                status: ''
            }

        }
    },
    vuex: {
        actions: {
            getSystemData,
            saveDataInfo
        }
    }
}
</script>
<style scoped>
.modal_con{
    max-height: 400px;
    width: 600px;
} 
.top-title{
    position: absolute;
    width: 100%;
    top: 0;
}
.edit_footer{
    position: absolute;
    bottom: 0;
    width: 100%;
}
.big-font {
    font-size: 36px;
}
.top-title span {
    font-size: 28px;
}

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

.edit_footer button {
    margin-left: 15px;
}
.system_danger {
    color: red;
    margin-bottom: 0;
    font-weight: 100;
    font-size: 12px;
}
</style>

<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑枚举类型</h3>
        </div>
        <div class="edit-model">
            <form name="editOrderinfo" action="javascript:void(0)">
                <section class="editsection" v-cloak>
                         <input type="hidden"  class="form-control edit-input" value="{{systemData.id}}" />
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel">名称</label>
                                <input type="text" v-model='systemData.name' class="form-control edit-input" value="{{systemData.name}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">类型</label>
                                <select class="form-control" v-model="systemData.type" style="width:90%;">

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
                                <!-- <input type="text" v-model='systemData.type' class="form-control edit-input" value="{{systemData.type}}" /> -->
                            </div>
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">编码</label>
                                <input type="text" v-model='systemData.code' class="form-control edit-input" value="{{systemData.code}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">描述</label>
                                <input type="text" v-model="systemData.desc" class="form-control edit-input" value="{{systemData.desc}}" />
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="updateDataInfo(systemData,systemData.sub=param.id,param.show = false)">确定</button>
        </div>
    </div>
</template>
<script>
import {
    initSystemlist
} from '../../vuex/getters'
import {
    getSystemData,
    updateDataInfo
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
            systemData: {
                id: this.initSystemlist[this.param.id].id,
                name: this.initSystemlist[this.param.id].name,
                code: this.initSystemlist[this.param.id].code,
                type: this.initSystemlist[this.param.id].type,
                desc: this.initSystemlist[this.param.id].desc,
                status: this.initSystemlist[this.param.id].status
            }
        }
    },
    vuex: {
        getters: {
            initSystemlist
        },
        actions: {
            getSystemData,
            updateDataInfo
        }
    },
    events: {
        'getParam' () {
            this.$set('systemData.name', this.initSystemlist[this.param.id].name);
            this.$set('systemData.code', this.initSystemlist[this.param.id].code);
            this.$set('systemData.type', this.initSystemlist[this.param.id].type);
            this.$set('systemData.status', this.initSystemlist[this.param.id].status);
            this.$set('systemData.desc', this.initSystemlist[this.param.id].desc);
            this.$set('systemData.id', this.initSystemlist[this.param.id].id);
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

</style>

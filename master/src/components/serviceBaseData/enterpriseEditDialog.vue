<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建企业</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">编码</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.number" id="code" v-validate:code="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">企业名称</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.name" id="name" v-validate:name="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">电话</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.tel" id="tel" v-validate:tel="['required']"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">法定负责人</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.legalPerson" id="legal" v-validate:legal="['required']"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">生产范围</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.bizScope" id="range" v-validate:range="['required']"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">注册地址</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.address" id="address" v-validate:address="['required']" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">分类码</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.category" id="category" v-validate:category="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">企业代表人</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.principal" id="principal" v-validate:principal="['required']"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">所在省</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.province" id="province" v-validate:province="['required']"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">所在市</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.city" id="city" v-validate:city="['required']"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">有效截止日</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.utime" id="utime" v-validate:utime="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">发证日期</label>
                                    <input type="text" class="form-control edit-input" v-model="enterpriseData.release_date" id="ctime" v-validate:ctime="['required']"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="saveCompany(enterpriseData,param.show = false)">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import {
    saveCompany
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            enterpriseData: {
                number: '',
                category: '',
                name: '',
                tel: '',
                legalPerson: '',
                principal: '',
                bizScope: '',
                province: '',
                city: '',
                address: '',
                ctime: '',
                utime: ''
            }
        }
    },
    vuex:{
        actions:{
            saveCompany
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
    }
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
}

.modal_con {
    display: block;
    position: fixed;
    top: 91px;
    margin: auto;
    left: 0;
    right: 0;
    max-width: 630px;
    min-width: 380px;
    max-height: 510px;
    bottom: 50px;
    padding: 0;
    background-color: #fff;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    z-index: 1080;
    overflow: hidden;
    overflow-y: auto;
}

.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    right: 0;
    top: 0;
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

.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 50px;
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

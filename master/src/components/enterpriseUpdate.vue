<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑企业信息</h3>
        </div>
        <div class="edit-model">
                <section class="editsection" v-cloak>
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel">编码</label>
                                <input type="text" v-model='companyData.number' class="form-control edit-input" value="{{companyData.number}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">企业名称</label>
                                <input type="text" v-model='companyData.name' class="form-control edit-input" value="{{companyData.name}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">法定代表人</label>
                                <input type="text" v-model='companyData.legal_person' class="form-control edit-input" value="{{companyData.legal_person}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">生产范围</label>
                                <input type="text" v-model="companyData.biz_scope" class="form-control edit-input" value="{{companyData.biz_scope}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">所在市</label>
                                <input type="text" v-model="companyData.city" class="form-control edit-input" value="{{companyData.city}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">发证日期</label>
                                <input type="text" v-model="companyData.release_date" class="form-control edit-input" value="{{companyData.release_date}}" />
                            </div>
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">分类码</label>
                                <input type="text" v-model='companyData.category' class="form-control edit-input" value="{{companyData.category}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">电话</label>
                                <input type="text" v-model="companyData.tel" class="form-control edit-input" value="{{companyData.tel}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">企业代表人</label>
                                <input type="text" v-model="companyData.principal" class="form-control edit-input" value="{{companyData.principal}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">所在省</label>
                                <input type="text" v-model="companyData.province" class="form-control edit-input" value="{{companyData.province}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">注册地址</label>
                                <input type="text" v-model="companyData.address" class="form-control edit-input" value="{{companyData.address}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">有效截止日</label>
                                <input type="text" v-model="companyData.due_date" class="form-control edit-input" value="{{companyData.due_date}}" />
                            </div>
                        </div>
                    </div>
                </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="updateEnterInfo(companyData,param.show = false)">确定</button>
        </div>
    </div>
</template>
<script>
import {
    initEnterpriselist
} from '../vuex/getters'
import {
    getEnterpriseData,
    updateEnterInfo
} from '../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
            companyData: {
                number: this.initEnterpriselist[this.param.id].number,
                category: this.initEnterpriselist[this.param.id].category,
                name: this.initEnterpriselist[this.param.id].name,
                tel: this.initEnterpriselist[this.param.id].tel,
                legal_person: this.initEnterpriselist[this.param.id].legal_person,
                principal: this.initEnterpriselist[this.param.id].principal,
                biz_scope: this.initEnterpriselist[this.param.id].biz_scope,
                province: this.initEnterpriselist[this.param.id].province,
                city: this.initEnterpriselist[this.param.id].city,
                address: this.initEnterpriselist[this.param.id].address,
                release_date: this.initEnterpriselist[this.param.id].release_date,
                due_date: this.initEnterpriselist[this.param.id].due_date,
                id: this.param.id
            }
        }
    },
    vuex: {
        getters: {
            initEnterpriselist
        },
        actions: {
            getEnterpriseData,
            updateEnterInfo
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
    events: {
        'getParam' () {
            this.$set('companyData.number', this.initEnterpriselist[this.param.id].number);
            this.$set('companyData.category', this.initEnterpriselist[this.param.id].category);
            this.$set('companyData.name', this.initEnterpriselist[this.param.id].name);
            this.$set('companyData.tel', this.initEnterpriselist[this.param.id].tel);
            this.$set('companyData.legal_person', this.initEnterpriselist[this.param.id].legal_person);
            this.$set('companyData.principal', this.initEnterpriselist[this.param.id].principal);
            this.$set('companyData.biz_scope', this.initEnterpriselist[this.param.id].biz_scope);
            this.$set('companyData.province', this.initEnterpriselist[this.param.id].province);
            this.$set('companyData.city', this.initEnterpriselist[this.param.id].city);
            this.$set('companyData.address', this.initEnterpriselist[this.param.id].address);
            this.$set('companyData.release_date', this.initEnterpriselist[this.param.id].release_date);
            this.$set('companyData.due_date', this.initEnterpriselist[this.param.id].due_date);
            this.$set('companyData.id', this.param.id);
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
    top: 217px;
    margin: auto;
    left: 0;
    right: 0;
    max-width: 630px;
    min-width: 380px;
    max-height: 500px;
    bottom: 50px;
    padding: 0;
    background-color: #fff;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    /*层数高度不够增加层数*/
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

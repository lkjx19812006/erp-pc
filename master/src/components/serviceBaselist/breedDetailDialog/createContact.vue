<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建企业联系人</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">联系人</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="contactData.name" v-validate:name="['required']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">邮箱</label>
                                    <input type="text" class="form-control edit-input"  id="email" v-model="contactData.email" v-validate:email="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">微信</label>
                                    <input type="text" class="form-control edit-input"  id="wechart" v-model="contactData.wechart" v-validate:wechart="['required']" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">手机号</label>
                                    <input type="text" class="form-control edit-input"  id="phone" v-model="contactData.phone" v-validate:phone="['required']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">电话</label>
                                    <input type="text" class="form-control edit-input"  id="tel" v-model="contactData.tel" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">QQ</label>
                                    <input type="text" class="form-control edit-input"  id="qq" v-model="contactData.qq" v-validate:qq="['required']" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm"  @click="createContact(contactData,param.id,param.show = false)">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import {
    createContact
} from '../../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            contactData: {
                name: '',
                tel:'',
                phone:'',
                wechart:'',
                email:'',
                qq:''
            }
        }
    },
    vuex: {
        actions: {
            createContact
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

<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建客户信息</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection"  v-cloak>   
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>名称</label>
                                <input type="text" id="username" class="form-control" v-model="customerData.name" v-validate:username="['required']"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>类型</label>
                                <input type="text" id="usertype" class="form-control" v-model="customerData.type" v-validate:usertype="['required']" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>分类码</label>
                                <input type="text" id="category" class="form-control" v-model="customerData.category" v-validate:category="['required']" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>负责人</label>
                                <input type="text" class="form-control" v-model="customerData.principal" id="userown" v-validate:userown="['required']" />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>电话</label>
                                <input type="text" class="form-control" maxlength="11" v-model="customerData.tel" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>邮箱</label>
                                <input type="email" class="form-control" v-model="customerData.email"  />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>所在省</label>
                                <input type="text" class="form-control" v-model="customerData.province" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>所在市</label>
                                <input type="text" class="form-control" v-model="customerData.city"  />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>业务员</label>
                                <input type="text" class="form-control" v-model="customerData.employee_id" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>信用等级</label>
                                <input type="text" class="form-control" v-model="customerData.credit_level"  />
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>经营范围</label>
                                <input type="text" class="form-control" v-model="customerData.biz_scope" />
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>注册地址</label>
                                <input type="text" class="form-control" v-model="customerData.address" />
                            </div>
                        </div>
                    </section>
                    <pre>{{$data | json}}</pre>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="saveCreate(customerData,param.show = false)">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import {
    saveCreate
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            customerData:{
                name:'',
                type:'',
                category:'',
                principal:'',
                biz_scope:'',
                tel:'',
                email:'',
                province:'',
                city:'',
                address:'',
                employee_id:'',
                credit_level:''
            }
        }
    },
     vuex: {
        actions: {
            saveCreate
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
    width: 44%;
    left: 0;
    right: 0;
    max-width:730px;
    min-width: 300px;
    max-height:650px;
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
    margin-top: 10px;
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

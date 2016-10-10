<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection"  v-cloak>
                        <div class="editpageleft">
                            <h4>客户信息</h4>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>名称</label>
                                    <input type="text" id="username" class="form-control" v-model="customerData.name" v-validate:username="['required']"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                   <label class="editlabel">类型</label>
                                    <select class="form-control edit-input"  v-model="customerData.type">
                                         <option value="0">个人</option>
                                         <option value="1">企业</option>
                                    </select>
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
                                    <select class="form-control" v-model="customerData.province" @change="multiSearch()">
                                         <option v-for="item in initProvince">{{item.cname}}</option>
                                     </select>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>所在市</label>
                                    <input type="text" class="form-control" v-model="customerData.city"  />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>经营范围</label>
                                    <input type="text" class="form-control" v-model="customerData.bizScope" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>分类</label>
                                    <select class="form-control edit-input"  v-model='param.classify'>
                                         <option value="0">买</option>
                                         <option value="1">卖</option>
                                         <option value="2">买卖</option>
                                    </select>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
                                    <label>注册地址</label>
                                    <input type="text" class="form-control" v-model="customerData.address" />
                                </div>
                            </div>
                        </div>  
                        <div class="editpageright">
                            <h4>联系人</h4>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>联系人名称</label>
                                    <input type="text" id="username" class="form-control" v-model="" v-validate:username="['required']"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>联系人部门</label>
                                    <input type="text" id="usertype" class="form-control" v-model="" v-validate:usertype="['required']" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>联系人职位</label>
                                    <input type="text" id="category" class="form-control" v-model="" v-validate:category="['required']" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>电话</label>
                                    <input type="text" class="form-control" v-model="" id="userown" v-validate:userown="['required']" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>手机</label>
                                    <input type="text" class="form-control" maxlength="11" v-model="" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>邮箱</label>
                                    <input type="email" class="form-control" v-model=""  />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>微信</label>
                                    <input type="text" class="form-control" v-model="" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>qq</label>
                                    <input type="text" class="form-control" v-model=""  />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm"  @click="saveCreate(customerData,param.show = false)" value="保存" />
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import {
    initProvince
} from '../../vuex/getters'
import {
    saveCreate,
    getProvinceList
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
                bizScope:'',
                tel:'',
                email:'',
                province:'',
                city:'',
                address:''
            }
        }
    },
     vuex: {
        getters:{
            initProvince
        },
        actions: {
            saveCreate,
            getProvinceList
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
.modal_con{
    width: 840px;
}
.top-title{
    width: 840px;
}
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 18px;
    color: #fa6705;
    margin: 0;
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
    float: left;
}
.editpageleft{
    border-right:1px solid #ddd; 
}
.editpageleft h4,
.editpageright h4{
    text-indent: 16px;
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
    width: 840px;
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

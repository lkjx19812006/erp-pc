<template>
    <select-model :param="selectParam" v-if="selectParam.show"></select-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建客户</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection"  v-cloak>
                        
                            <div style="margin-top:20px;margin-left:30px;margin-bottom:15px;">
                                <img src="/static/images/breedinfo@2x.png" style="display:inline"/>
                                <h4 style="display:inline">客户信息</h4>           
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>名称</label>
                                    <input type="text" id="username" class="form-control" v-model="param.name" v-validate:username="['required']"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                   <label class="editlabel">类型</label>
                                    <select class="form-control edit-input"  v-model="param.type">
                                         <option value="0">个人</option>
                                         <option value="1">企业</option>
                                    </select>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>分类码</label>
                                    <input type="text" id="category" class="form-control" v-model="param.category" v-validate:category="['required']" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>业务员/部门</label>
                                    <input v-if="!param.orgId" type="text" class="form-control" readonly="readonly" v-model="param.employeeName" @click="selectParam.show=true"  />
                                    <input v-if="param.orgId" type="text" class="form-control" readonly="readonly" v-model="param.orgName" @click="selectParam.show=true"  />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>电话</label>
                                    <input type="text" class="form-control" maxlength="11" v-model="param.tel" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>邮箱</label>
                                    <input type="email" class="form-control" v-model="param.email"  />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>所在省</label>
                                    <input type="text" class="form-control" v-model="param.province" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>所在市</label>
                                    <input type="text" class="form-control" v-model="param.city"  />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>备注</label>
                                    <input type="text" class="form-control" v-model="param.comments" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>注册地址</label>
                                    <input type="text" class="form-control" v-model="param.address" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>经营范围</label>
                                    <input type="text" class="form-control" v-model="param.bizScope" />
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
                        
                            <div style="margin-top:25px;margin-left:30px;margin-bottom:15px;">
                                <img src="/static/images/contact@2x.png" style="display:inline"/>
                                <h4 style="display:inline">联系人</h4>           
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>联系人名称</label>
                                    <input type="text" class="form-control" v-model="" />
                                </div>
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>是否主联系人</label>
                                    <select class="form-control edit-input"  v-model='param.main'>
                                         <option value="0" selected="selected">是</option>
                                         <option value="1">否</option>
                                    </select>
                                </div>
                                
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
                                    <label>联系人部门</label>
                                    <input type="text" class="form-control" v-model="" />
                                </div>
                                <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                    <label>联系人职位</label>
                                    <input type="text"  class="form-control" v-model="" />
                                </div>
                                
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>手机</label>
                                    <input type="text" class="form-control" maxlength="11" v-model="" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>电话</label>
                                    <input type="text" class="form-control" v-model="" />
                                </div> 
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>邮箱</label>
                                    <input type="email" class="form-control" v-model=""  />
                                </div>
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>微信</label>
                                    <input type="text" class="form-control" v-model="" />
                                </div>
                                
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo  pull-left col-md-6 col-xs-12">
                                    <label>qq</label>
                                    <input type="text" class="form-control" v-model=""  />
                                </div>   
                            </div>
                        
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm"  @click="param.link(param,param.show = false)" value="保存" />
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import selectModel  from './employeeOrOrg.vue'
export default {
    components: { 
        selectModel,  
    },
    props: ['param'],
    data() {
        return {
            selectParam:{
                show:false,
                employeeId:'',
                employeeName:'',
                orgId:'',
                orgName:''    
            }
        }
    },
     vuex: {
        actions: {
            
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

    },
    events:{
        'selectEmpOrOrg':function(param){
            this.param.employeeId = param.employeeId;
            this.param.employeeName = param.employeeName;
            this.param.orgId = param.orgId;
            this.param.orgName = param.orgName;   

        }
    },
    created(){
        
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
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 50px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 10px;
    width: 840px;
    background: #fff;
    margin: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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

.form-control {
    width:360px;
}
.client-detailInfo {
    padding:0px 30px 20px 30px;

}
</style>

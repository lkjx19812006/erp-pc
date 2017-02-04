<template>
    <div  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <validator name="validation">
              <form novalidate>
                <h4>修改个人信息</h4>
                <div class="edit-model">
                    <div class="clearfix">
                        <div>
                            <div class="clearfix col-md-6 col-xs-6" style="padding:0">
                                <div class="client-detailInfo  col-md-12" style="height:150px;padding-bottom:0">
                                    <label>头像</label>
                                    <press-image :value.sync="param.image_f" :showurl.sync="param.photo" :type.sync="param.fileType" :param="imageParam"  style="width:120px" v-if="param.photo!==''"></press-image>
                                    <press-image :value.sync="param.image_f" :showurl.sync="param.image_f_show" :type.sync="param.fileType" :param="imageParam" style="width:120px" v-else></press-image>
                                </div>
                            </div>
                            <div class="clearfix col-md-6  col-xs-6" style="padding:0">
                                <div class="client-detailInfo  col-md-12 col-xs-12">
                                    <label>姓名</label>
                                    <input type="text" class="form-control" v-model="param.name" readonly="true" />
                                </div>
                                <div class="client-detailInfo  col-md-12 col-xs-12">
                                    <label>性别</label>
                                    <select class="form-control" v-model="param.gender">
                                        <option value="0">女</option>
                                        <option value="1">男</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                       
                        <div class="client-detailInfo  col-md-6 col-xs-12">
                            <label>手机号 <span class="system_danger" v-if="$validation.phone.phone">请输入正确的手机号</span></label>
                            <input type="email" class="form-control" v-model="param.mobile" v-validate:phone="['phone']"/>
                        </div>
                        <div class="client-detailInfo  col-md-6 col-xs-12">
                            <label>分机号</label>
                            <input type="text" class="form-control" v-model="param.extno"  />
                        </div>
                        <div class="client-detailInfo  col-md-6 col-xs-12">
                            <label>QQ号 <span class="system_danger" v-if="$validation.chat.qq">请输入正确的QQ号</span></label>
                            <input type="text" class="form-control" v-validate:chat="['qq']" v-model="param.qq" />
                        </div>
                        <div class="client-detailInfo  col-md-6 col-xs-12">
                            <label>微信号 <span class="system_danger" v-if="$validation.wechart.wechart">请输入正确的微信号</span></label>
                            <input type="text" class="form-control" v-validate:wechart="['wechart']" v-model="param.wechat" />
                        </div>
                        <div class="client-detailInfo  col-md-12  col-xs-12">
                            <label>擅长领域 </label>
                            <textarea class="textarea" type="text" rows="5" 
                             v-model="param.goodfield"></textarea>
                        </div>
                    </div>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                        <button type="button" class="btn btn-confirm" v-if="$validation.valid"  @click="confirm(param)">保存</button>
                        <button type="button" class="btn btn-confirm" v-else v-else disabled="disabled">保存</button>
                    </div>
                    
                </div>
              </form>
            </validator>
        </div>
    </div>
</template>
<script>
import pressImage from '../imagePress.vue'
import {
    initLogin,
} from '../../vuex/getters'
import {
    updateEmploy
} from '../../vuex/actions'
export default {
    props: ['param'],
    components:{
        pressImage
    },
    vuex: {
        getters: {
            initLogin
        },
        actions:{
           updateEmploy
        }
    },
    data(){
        return{
            imageParam:{
                url:'/crm/api/v1/file/',
                qiniu:false
              },
              type:"image/*"
        }
    },
    methods:{
        confirm:function(param){
            param.show = false;
            this.updateEmploy(param);
        }
    },
    events:{
        getImageData: function(imageData) {
            var paths = new Array();
            this.param.path=imageData.result.path;
        }
    },
    created() {
       console.log(this.param.photo) 
    }
}
</script>
<style scoped>
.model-header{
    position: relative;
}
.del_modal_con{
    z-index:1091;
    width: 650px;
}
.model-tips{
    border-bottom: none;
    padding:15px 10px;
    position: relative;
}
.edit_footer{
    position: absolute;
    width: 640px;
    bottom: 0;
}
.modal {
    z-index:1090;
}
.client-detailInfo {
    text-align: left;
}
.client-detailInfo label{
    display: inline-block;
}
.textarea{
    resize: none;
    border: 1px solid #ddd;
    width: 100%;
    border-radius: 3px;
}
</style>

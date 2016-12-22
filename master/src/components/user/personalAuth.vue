<template>
    <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
    <div  class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" >
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>个人认证</h3>
        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <div class="editpage">
                  <div class="editpageleft">
                      <div class="editpage-input">
                           <label class="editlabel">备注</label>
                           <input type="text" v-model='param.ucomment' class="form-control edit-input" value="{{param.ucomment}}" />
                       </div>
                       <div class="editpage-input">
                           <table class="table  table_color contactSet">
                                <thead>
                                    <th>名称</th>
                                    <th>文件类型</th>
                                    <th>预览</th>
                                    <th>所属文件</th>
                                    <th>描述</th>
                                </thead>
                                <tbody>
                                    <tr v-for="item in initIdentify.files">
                                        <td>{{item.name}}</td>
                                        <td>{{item.fileType}}</td>
                                        <td><img :src="item.path" max-width="200" @click="clickBig(item.path)" /></td>
                                        <td>{{item.bizType}}</td>
                                        <td>{{item.description}}</td>
                                    </tr>
                                </tbody>
                            </table>
                       </div>
                  </div>
               </div>
           </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="updateUserInfo(param,param.utype=2,param.show = false)">通过</button>
            <button type="button" class="btn  btn-confirm" @click="updateUserInfo(param,param.utype=3,param.show = false)">不通过</button>
        </div>
    </div>
</template>
<script>
import pictureModel from '../tips/pictureDialog'
import {
    initIdentify
} from '../../vuex/getters'
import {
    updateUserInfo,
    getAuthInfo
} from '../../vuex/actions'
export default {
    components:{
        pictureModel
    },
    props: ['param'],
    data() {
        return {
            pictureParam:{
                show:false,
                img:''
            }
        }
    },
    vuex: {
       getters: {
            initIdentify
        },
        actions: {
            updateUserInfo,
            getAuthInfo
        }
    },
    methods:{
        clickBig:function(img){
          this.pictureParam.show = true;
          this.pictureParam.img = img;
        }
    },
    created() {
        this.getAuthInfo(this.param);
  }
}
</script>
<style scoped>
.modal{
 z-index: 1083
}
.modal_con{
  z-index: 1084;
}
.big-font {
    font-size: 36px;
}
.top-title{
  left: 0;
  right: 0;
  width: 800px;
}
.editsection {
    width: 100%;
    box-sizing: border-box;
}

.edit-input:focus {
    border-color: #fa6705;
}
.editpage-input{
    margin-top: 10px;
}
.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}
table{
    display: table;
}
</style>

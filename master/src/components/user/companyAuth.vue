<template>
    <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>企业认证</h3>
        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <div class="editpage">
               <div class="editpageleft">
                    <div class="editpage-input">
                           <label class="editlabel">备注</label>
                           <input type="text" v-model='param.ccomment' class="form-control edit-input" value="{{param.ccomment}}" />
                       </div>

                       <div class="editpage-input">
                           <table class="table table_color contactSet">
                                <thead>
                                    <th>名称</th>
                                    <th>文件类型</th>
                                    <th>预览</th>
                                    <td>所属文件</td>
                                    <th>描述<th>
                                </thead>
                                <tbody>
                                    <tr v-for="item in initIdentify.files">
                                        <td>{{item.name}}</td>
                                        <td>{{item.fileType}}</td>
                                        <td><img :src="item.path" width="200" @click="clickBig(item.path)" /></td>
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
            <button type="button" class="btn  btn-confirm" @click="updateUserInfo(param,param.ctype=2,param.show = false)">通过</button>
            <button type="button" class="btn  btn-confirm" @click="updateUserInfo(param,param.ctype=3,param.show = false)">不通过</button>
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
    methods: {
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

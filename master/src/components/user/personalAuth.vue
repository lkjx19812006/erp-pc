<template>
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
                           <table class="table  contactSet">
                                <thead>
                                  <th>文件类型</th>
                                  <th>路径</th>
                                  <th>描述<th>
                                </thead>
                                <tbody>
                                    <tr v-for="item in initIdentify.files">
                                        <td>{{item.fileType}}aasdasdasa</td>
                                        <td><img v-bind:src="item.path" width="200"></td>
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
import {
    initIdentify
} from '../../vuex/getters'
import {
    updateUserInfo,
    getAuthInfo
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {

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

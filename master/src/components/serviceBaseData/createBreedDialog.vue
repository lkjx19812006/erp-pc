<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建药材</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">编码</label>
                                    <input type="text" class="form-control edit-input"  id="code" v-model="breedData.code" v-validate:code="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">品种名称</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="breedData.name" v-validate:category="['required']" />
                                </div>
                                <div class="editpage-input">
                                   <label class="editlabel">品种分类选择</label>
                                   <select class="form-control" v-model="breedData.selected" style="width:90%;">
                                       <option   v-for="item in initCategorylist" value="{{item.id}}">{{item.name}}</option>
                                   </select>
                               </div>
                               <!--  <div class="editpage-input">
                                   <label class="editlabel">上传图标</label>
                                   <div class="editpage_img clearfix">
                                       <div class="editpage-image col-md-4">
                                           <press-image></press-image>
                                       </div>
                                   </div>
                               </div> -->
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="saveBreed(breedData,param.show = false)">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import pressImage from '../../components/imagePress'
import {
    initCategorylist
} from  '../../vuex/getters'
import {
    saveBreed,
    getCategoryData
} from '../../vuex/actions'
export default {
    components: {
        pressImage
    },
    props: ['param'],
    data() {
        return {
            breedData: {
                code: '',
                name: '',
                selected:''
            }
        }
    },
    vuex: {
        getters:{
            initCategorylist
        },
        actions: {
            saveBreed,
            getCategoryData
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
    created() {
        this.getCategoryData();
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
    max-height: 450px;
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

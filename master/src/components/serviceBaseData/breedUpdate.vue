<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑药材</h3>
        </div>
        <div class="edit-model">
            <validator name="validation">
                <section class="editsection" v-cloak>
                    <input type="hidden"  class="form-control edit-input" value="{{categoryData.id}}" />
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">编码 <span class="system_danger" v-if="$validation.code.required">请输入编码</span></label>
                            <input type="text" v-model='categoryData.code' class="form-control edit-input" value="{{categoryData.code | breedcode}}" id="code" v-validate:code="['required']" />
                        </div>
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">品种名称 <span class="system_danger" v-if="$validation.code.required">请输入品种名称</span></label>
                            <input type="text" v-model='categoryData.name' class="form-control edit-input" value="{{categoryData.name}}"  id="name" v-validate:name="['required']"/>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">品种分类选择 <span class="system_danger" v-if="$validation.code.required">请选择品种分类</span></label>
                            <select class="form-control" v-model="categoryData.selected" style="width:90%;">
                               <option  v-for="item in initCategorylist" value="{{item.id}}">{{item.name}}</option>
                             </select>
                        </div>
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">品种名称拼音</label>
                            <input type="text" v-model='categoryData.pinyin' class="form-control edit-input"  />
                        </div>
                    </div>
                     <div class="clearfix">
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">品种名称英文</label>
                            <input type="text" v-model='categoryData.eName' class="form-control edit-input" />
                        </div>
                        <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                            <label class="editlabel">品种名称拉丁文</label>
                            <input type="text" v-model='categoryData.lName' class="form-control edit-input"  />
                        </div>
                    </div>
                </section>
            </validator>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <!-- <button type="button" class="btn  btn-confirm" @click="updateBreedInfo(categoryData,categoryData.sub=param.id,param.show = false)">确定</button> -->
            <button type="button" class="btn  btn-confirm" @click="tipsParam.show=true">确定</button>
        </div>
    </div>
</template>
<script>
import tipsdialogModel  from '../tips/tipDialog'
import filter from '../../filters/filters'
import {
    initBreedlist,
    initCategorylist
} from '../../vuex/getters'
import {
    getBreedData,
    updateBreedInfo,
    getCategoryData
} from '../../vuex/actions'
export default {
    props: ['param'],
    components:{
        filter,
        tipsdialogModel
    },
    data() {
        return {
             categoryData: {
                id: this.initBreedlist[this.param.id].id,
                code: this.initBreedlist[this.param.id].code,
                name: this.initBreedlist[this.param.id].name,
                selected: this.initBreedlist[this.param.id].categoryId,
                pinyin: this.initBreedlist[this.param.id].pinyin,
                eName: this.initBreedlist[this.param.id].eName,
                lName: this.initBreedlist[this.param.id].lName,
            },
            tipsParam: {
                show:false,
                confirm:true,
                name:"确认修改信息?",
                callback:this.confirm
            }
        }
    },
    vuex: {
        getters: {
            initBreedlist,
            initCategorylist
        },
        actions: {
            getBreedData,
            updateBreedInfo,
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
    events: {
        'getParam' () {
            this.$set('categoryData.name', this.initBreedlist[this.param.id].name);
            this.$set('categoryData.code', this.initBreedlist[this.param.id].code);
            this.$set('categoryData.selected', this.initBreedlist[this.param.id].categoryId);
            this.$set('categoryData.id', this.initBreedlist[this.param.id].id);
        }
    },
    methods: {
      confirm:function(){
        this.param.show = false;
        this.categoryData.sub=this.param.id;
        this.updateBreedInfo(this.categoryData);
      }
    },
    filter:(filter,{}),
    created() {
        this.getCategoryData();
    }
}
</script>
<style scoped>
.modal_con{
    max-height: 400px;
    max-width: 600px;
}
.top-title {
    position: absolute;
    top: 0;
    width: 100%;
}
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

.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 50px;
    position: absolute;
    width: 100%;
    bottom: 10px;
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

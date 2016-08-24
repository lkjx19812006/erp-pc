<template>
    <div v-show="param.show"  id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑洋洋</h3>
        </div>
        <div class="edit-model">
            <form name="editOrderinfo" action="javascript:void(0)">
                <section class="editsection">
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel">潜在客户名称</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">职务</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">公司名称</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">电话</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">电子邮件</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">新建文件</label>
                                <div class="editpage_img clearfix">
                                    <div class="editpage-image col-md-4">
                                        <press-image></press-image>
                                     </div>
                                     <div class="editpage-image col-md-4">
                                        <press-image></press-image>
                                     </div>
                                     <div class="editpage-image col-md-4">
                                        <press-image></press-image>
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">所有人别名</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">结束时间</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">金额</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">可能性（%）</label>
                                <input type="text" class="edit-input" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">潜在客户划转</label>
                                <select class="form-control" style="width:90%;">
                                    <option></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">黑名单</label>
                                <p class="addblack">
                                    <img class="left" src="../../static/images/addblack.png" height="28" width="28" />
                                    <span>加入黑名单</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="confirm()">保存</button>
        </div>
    </div>
</template>
<script>
import pressImage from '../components/imagePress.vue'
export default {
    components: {
        pressImage
    },
    props: ['param'],
    data() {
        return {}
    },
    methods:{
        confirm:function(){

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
    left: 0;
    right: 0;
    max-width: 840px;
    min-width: 480px;
    max-height: 710px;
    bottom: 50px;
    padding: 0;
    background-color: #fff;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    /*层数高度不够增加层数*/
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
.editpage_img{
    width: 90%;
}
.editpage_img img{
    display: inline-block;
    background: #ccc;
}
.editpage-image{
    display: inline-block;
}
</style>

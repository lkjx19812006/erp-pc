<template>
    <div v-show="param.show"  id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建枚举类型{{param.id}}</h3>
        </div>
    <validator name="validation1">
     <form novalidate>
        <div class="edit-model">
                <section class="editsection">
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <p class="system_danger"  v-if="$validation1.systemDataId.required">请输入编号</p> 
                                <p class="system_danger"  v-if="$validation1.systemDataId.minlength">您输入的编码应不少于五位数</p> 
                                <label class="editlabel">编号</label>
                                <input type="text" class="form-control  edit-input" id="systemDataId" v-validate:systemDataId="{required:true,minlength:3}"  initial="off" />
                            </div>
                            <div class="editpage-input">
                                <p class="system_danger"  v-if="$validation1.systemDataType.required">请输入类型</p> 
                                <label class="editlabel">类型</label>
                                <input type="text" class="form-control  edit-input" id="systemDataType" initial="off"  v-validate:systemDataType="['required']" />
                            </div>
                            <div class="editpage-input">
                                <p class="system_danger"  v-if="$validation1.systemStatus.required">请输入状态</p> 
                                <label class="editlabel">状态</label>
                                <input type="text" class="form-control  edit-input" id="systemStatus"  v-validate:systemStatus="['required']" />
                            </div>
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <p class="system_danger"  v-if="$validation1.systemDataCode.required">请输入编码</p> 
                                <label class="editlabel">编码</label>
                                <input type="text" class="form-control  edit-input" id="systemDataCode" v-validate:systemDataCode="['required']" />
                            </div>
                            <div class="editpage-input">
                                <p class="system_danger"  v-if="$validation1.systemDescribe.required">请输入描述</p> 
                                <label class="editlabel">描述</label>
                                <input type="text" class="form-control  edit-input" id="systemDescribe" v-validate:systemDescribe="['required']"/>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="submit" class="btn  btn-confirm" v-if="$validation1.valid">保存</button>
        </div>
    </form>
</validator>
    </div>
</template>
<script>
export default {
    components: {
        
    },
    props: ['param'],
    data() {
        return {
           systemDataId:'',
           systemDataCode:'',
           systemDataType:'',
           systemDescribe:'',
           systemStatus:''
        }
    },
    methods:{
    
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
    max-height: 510px;
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
.system_danger{
    color: red;
    margin-bottom: 0;
}
</style>

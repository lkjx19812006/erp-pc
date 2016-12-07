<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{param.name}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">联系方式 <span class="system_danger" v-if="$validation.tel.phone">请输入手机号</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.tel" value="{{param.tel}}" v-validate:tel="['phone']"/>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">备注</label>
                                    <textarea class="form-control" rows="5" v-model="param.remark" value="{{param.remark}}" style="resize:none;"></textarea>
                                    <!-- <input type="text" class="form-control edit-input" v-model="param.remark" value="{{param.remark}}" /> -->
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm()">保存</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="disabled">保存</button>
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
        }
    },
    methods:{
        confirm:function(){
            this.param.show = false;
            this.param.callback=this.param.callback;
            this.param.link(this.param);
        }
    }
}
</script>
<style scoped>
.modal{
    z-index: 1083
}
.modal_con{
    height: 450px;
    width: 450px;
     z-index: 1084
}
.top-title{
    position: absolute;
    width: 100%;
    top: 0;
}
.edit_footer{
    position: absolute;
    bottom: 0;
    width: 100%;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
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

.edit_footer button {
    margin-left: 15px;
}
</style>

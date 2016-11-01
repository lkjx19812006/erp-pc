<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.namelist}}<span class="system_danger" v-if="$validation.name.minlength">请输入至少两位</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.name" value="{{param.name}}" v-validate:name="{minlength:2}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.emaillist}}<span class="system_danger" v-if="$validation.email.email">请输入正确的邮箱</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.email" value="{{param.email}}" v-validate:email="['email']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.weblist}}<span class="system_danger" v-if="$validation.wechart.wechart">请输入正确的微信号</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.wechart" value="{{param.wechart}}" v-validate:wechart="['wechart']" />
                                </div>
                                <div class="editpage-input">
                                  <label class="editlabel">{{param.mainlist}}</label>
                                  <select class="form-control" style="width:90%" v-model="param.main" >-->
                                    <option value=0>否</option>
                                    <option value=1>是</option>
                                    </select>
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.phonelist}}<span class="system_danger" v-if="$validation.phone.phone">请输入正确的手机号</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.phone" value="{{param.phone}}" v-validate:phone="['phone']" />
                                </div>
                                 <div class="editpage-input">
                                     <label class="editlabel">{{param.tellist}}
                                       <span class="system_danger" v-if="$validation.tel.tel">请输入正确的电话,如021-23569894</span>
                                     </label>
                                    <input type="text" class="form-control edit-input" v-model="param.tel" value="{{param.tel}}" v-validate:tel="['tel']" />
                                </div>
                               
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.positionlist}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.position" />
                                </div> 
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid"  @click="param.link(param,param.id,param.show = false)">保存</button>
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
    vuex: {
        actions: {

        }
    }
}
</script>
<style scoped>
.modal{
    z-index: 1083
}
.modal_con{
    height: 500px;
    width: 600px;
    z-index: 1084;
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
.edit_footer button {
    margin-left: 15px;
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

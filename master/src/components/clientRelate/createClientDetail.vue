<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel" for="system">{{param.namelist}}<span class="system_danger" v-if="$validation.name.minlength">请输入姓名且不少于两位数</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:name="{minlength:2}" v-model="param.name"  />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.job}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.position" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel" for="system">{{param.phonelist}}<span class="system_danger" v-if="$validation.phone.phone">请输入正确的手机号</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:phone="['phone']" v-model="param.phone"  />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel"><label class="editlabel" for="system">{{param.webchart}}<span class="system_danger" v-if="$validation.wechart.wechart">请输入正确的微信号</span></label></label>
                                    <input type="text" class="form-control edit-input" v-validate:wechart="['wechart']" v-model="param.wechart" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">是否主要</label>
                                    <select class="form-control edit-input" v-model='param.main'>
                                         <option value="0">否</option>
                                         <option value="1">是</option>
                                    </select>
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.parten}}</label>
                                    <input type="text" class="form-control edit-input"  id="department" v-model="param.department" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel" for="system">{{param.tellist}}<span class="system_danger" v-if="$validation.tel.tel">请输入正确的电话</span></label>
                                    <input type="text" class="form-control edit-input"  id="tel" v-validate:tel="['tel']" v-model="param.tel" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel"><label class="editlabel" for="system">{{param.emaillist}}<span class="system_danger" v-if="$validation.email.email">请输入正确的邮箱</span></label></label>
                                    <input type="text" class="form-control edit-input" v-validate:email="['email']" id="email" v-model="param.email" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel"><label class="editlabel" for="system">{{param.QQ}}<span class="system_danger" v-if="$validation.qq.qq">请输入正确的qq号</span></label></label>
                                    <input type="text" class="form-control edit-input"  v-validate:qq="['qq']" v-model="param.qq" v-validate:qq="['required']" />
                                </div>
                            </div>
                        </div>
                        
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show = false)">保存</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">保存</button>
                   
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
    }
}
</script>
<style scoped>
.modal_con{
    max-height: 600px;
}
.edit_footer{
    position: absolute;
    width: 100%;
    bottom: 10px;
}
.big-font {
    font-size: 36px;
}
.top-title{
    position: absolute;
    width: 100%;
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
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    background-size: 60%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}
.role{
    margin-right: 10px;
}
</style>

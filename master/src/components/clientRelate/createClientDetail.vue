<template>
    <tip-model :param="tipParam" v-if="tipParam.show"></tip-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建联系人</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel" for="system">{{$t('static.name')}}<span class="system_danger" v-if="$validation.name.minlength">{{$t('static.validate_name')}}</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:name="{minlength:2}" v-model="param.name"  />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.position')}}</label>
                                    <input type="text" class="form-control edit-input" v-model="param.position" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel" for="system">{{$t('static.cellphone')}}<span class="system_danger" v-if="$validation.phone.phone">{{$t('static.validate_cellphone')}}</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:phone="['phone']" v-model="param.phone"  />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel" for="system">{{$t('static.wechat')}}<span class="system_danger" v-if="$validation.wechart.wechart">{{$t('static.validate_wechat')}}</span></label>
                                    <input type="text" class="form-control edit-input" v-validate:wechart="['wechart']" v-model="param.wechart" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.whether_main_contact')}}</label>
                                    <select class="form-control edit-input" v-model='param.main'>
                                         <option value="0">否</option>
                                         <option value="1">是</option>
                                    </select>
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.department')}}</label>
                                    <input type="text" class="form-control edit-input"  id="department" v-model="param.department" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel" for="system">{{$t('static.telephone')}}<span class="system_danger" v-if="$validation.tel.tel">{{$t('static.validate_telephone')}}</span></label>
                                    <input type="text" class="form-control edit-input"  id="tel" v-validate:tel="['tel']" v-model="param.tel" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel"><label class="editlabel" for="system">{{$t('static.email')}}<span class="system_danger" v-if="$validation.email.email">{{$t('static.validate_email')}}</span></label></label>
                                    <input type="text" class="form-control edit-input" v-validate:email="['email']" id="email" v-model="param.email" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel"><label class="editlabel" for="system">qq<span class="system_danger" v-if="$validation.qq.qq">{{$t('static.validate_qq')}}</span></label></label>
                                    <input type="text" class="form-control edit-input"  v-validate:qq="['qq']" v-model="param.qq" v-validate:qq="['required']" />
                                </div>
                            </div>
                        </div>
                        
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <!-- <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show = false)">{{$t('static.save')}}</button> -->
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="save()">{{$t('static.save')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.save')}}</button>
                   
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import tipModel from '../tips/tipDialog'
export default {
    components: {
        tipModel
    },
    props: ['param'],
    data() {
        return {
            tipParam:{
                show:false,
                name:"该联系人姓名或电话已存在,请重新输入",
                alert:true,
            }
        }
    },
    methods:{
        save:function(){
            if(this.param.list&&this.param.list.length>0){   
                for(var i=0;i<this.param.list.length;i++){
                    if(this.param.list[i].name==this.param.name||this.param.list[i].phone==this.param.phone){
                        this.tipParam.show = true;
                        return ;
                    }
                }
                this.param.link(this.param);
                this.param.show = false
            }else{
                this.param.link(this.param);
                this.param.show = false
            }
        }
    },
    created(){
        console.log(this.param.list);
        console.log(this.param);
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
.modal{
    z-index: 1083
}
.modal_con{
    max-height: 600px;
    z-index: 1084
}
.edit_footer{
    position: absolute;
    width: 100%;
    bottom: 10px;
}

.top-title{
    position: absolute;
    width: 100%;
    top: 0;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
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

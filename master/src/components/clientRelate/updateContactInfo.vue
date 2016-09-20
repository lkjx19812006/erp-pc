<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.namelist}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.name" value="{{param.name}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.parten}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.department" value="{{param.department}}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.tellist}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.tel" value="{{param.tel}}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.QQ}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.qq" value="{{param.qq}}" />
                                </div>
                            </div>
                             <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.job}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.position" value="{{param.position}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.phonelist}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.phone" value="{{param.phone}}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.emaillist}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.email" value="{{param.email}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.webchart}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.wechart" value="{{param.wechart}}" />
                                </div>
                            </div>
                        </div>
                         <div class="editpage-input clearfix">
                            <label>是否主要</label>
                            <div  class="clerafix ">
                                <div class="pull-left role clerafix">
                                     <input type="radio" class="checkbox_unselect" id="client_ids" v-model="param.main"  value="1" />
                                     <label  for="client_ids">主要</label>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" @click="param.link(param,param.show = false)">保存</button>
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

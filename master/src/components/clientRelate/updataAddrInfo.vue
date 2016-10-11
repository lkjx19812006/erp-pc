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
                                    <label class="editlabel">{{param.typelist}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.type" value="{{param.type}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.namelist}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.contactName" value="{{param.contactName}}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.phonelist}}</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.contactPhone" value="{{param.contactPhone}}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.sexlist}}</label>
                                     <select  class="form-control" v-model="param.sex" style="width:90%;">
                                        <option>{{param.sex}}</option>
                                        <option value="1">女</option>
                                        <option value="0">男</option>
                                    </select>
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.addr}}</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.address" value="{{param.address}}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.countylist}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.country" value="{{param.country}}" />
                                </div>
                            </div>
                             <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.provicelist}}</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.province" value="{{param.province}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.citylist}}</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.city" value="{{param.city}}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.addr_detail}}</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.detailAddr" value="{{param.detailAddr}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.distlist}}</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.district" value="{{param.district}}" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.streetlist}}</label>
                                    <input type="text" class="form-control edit-input"   v-model="param.street" value="{{param.street}}" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show = false)">保存</button>
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
    min-width: 200px;
    max-height: 600px;
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
    position:absolute;
    border-top: 1px solid #ddd;
    text-align: right;
    width:630px;
    padding: 10px 20px;
    margin-bottom: -50px;
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

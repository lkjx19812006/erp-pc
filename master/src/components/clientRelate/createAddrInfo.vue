<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建客户{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.namelist}}</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.contactName" v-validate:name="['required']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.typelist}}</label>
                                    <input type="text" class="form-control edit-input"  id="type" v-model="param.type"  />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.phonelist}}</label>
                                    <input type="text" class="form-control edit-input"  id="phone" v-model="param.contactPhone" v-validate:phone="['required']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.sexlist}}</label>
                                    <select  class="form-control" v-model="param.sex" style="width:90%;">
                                        <option value="1">女</option>
                                        <option value="0">男</option>
                                    </select>
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.addr}}</label>
                                    <input type="text" class="form-control edit-input"  id="addr" v-model="param.address" v-validate:addr="['required']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.streetlist}}</label>
                                    <input type="text" class="form-control edit-input"  id="street" v-model="param.street"  v-validate:street="['required']"/>
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.countylist}}</label>
                                    <input type="text" class="form-control edit-input"  id="country" v-model="param.country" v-validate:country="['required']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.provicelist}}</label>
                                    <input type="text" class="form-control edit-input"  id="province" v-model="param.province" v-validate:province="['required']"/>
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">{{param.citylist}}</label>
                                    <input type="text" class="form-control edit-input"  id="city" v-model="param.city" v-validate:city="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.addr_detail}}</label>
                                    <input type="text" class="form-control edit-input"  id="detail_addr" v-model="param.detailAddr" v-validate:detail_addr="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.distlist}}</label>
                                    <input type="text" class="form-control edit-input"  id="district" v-model="param.district" v-validate:district="['required']" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid"  @click="param.link(param,param.show = false)">保存</button>
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
</style>

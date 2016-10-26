<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{param.no}}订单</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak>
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">收件人</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.consignee" v-validate:name="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">收件人联系方式</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.consigneePhone" v-validate:name="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">商品名称</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.brredName" v-validate:name="['required']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">产地</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.location" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">规格</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.spec" v-validate:phone="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">杂费说明</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.incidentalsDesc" v-validate:amount="['required']" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">收件人地址</label>
                                    <input type="text" class="form-control edit-input"  id="name" v-model="param.consigneeAddr" v-validate:name="['required']" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">价格</label>
                                    <input type="text" class="form-control edit-input" v-model="param.price" />
                                </div>
                                 <div class="editpage-input">
                                    <label class="editlabel">单位</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.unit" v-validate:unit="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">数量</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.number" v-validate:wechart="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">杂费</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.incidentals" v-validate:amount="['required']" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">总价</label>
                                    <input type="text" class="form-control edit-input"  v-model="param.total" disabled="true" v-validate:amount="['required']" />
                                </div>
                            </div>
                        </div>
                        
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm"   @click="param.callback(param,param.show = false)" value="保存"/>
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

<template>
    <div v-show="param.show"  id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建订单</h3>
        </div>
        <div class="edit-model">
            <form name="editOrderinfo" action="javascript:void(0)">
                <section class="editsection">
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel">是否样品订单</label>
                                <!-- <input type="text" class="edit-input" v-model="param.sample"/> -->
                                <select type="text" class="edit-input" v-model="param.sample">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">单价</label>
                                <input type="text" class="edit-input" v-model="param.price"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">单位</label>
                                <input type="text" class="edit-input" v-model="param.unit"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">杂费</label>
                                <input type="text" class="edit-input" v-model="param.incidentals"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">优惠金额</label>
                                <input type="text" class="edit-input" v-model="param.preferential"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">收货人</label>
                                <input type="text" class="edit-input" v-model="param.consignee"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">标题</label>
                                <input type="text" class="edit-input" v-model="param.title"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">国家</label>
                                <input type="text" class="edit-input" v-model="param.country"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">市</label>
                                <input type="text" class="edit-input" v-model="param.city"/>
                            </div>
                            
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">是否国际</label>
                                <select type="text" class="edit-input" v-model="param.intl">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">数量</label>
                                <input type="text" class="edit-input" v-model="param.number"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">规格</label>
                                <input type="text" class="edit-input" v-model="param.spec"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">杂费说明</label>
                                <input type="text" class="edit-input" v-model="param.incidentalsDesc"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">优惠说明</label>
                                <input type="text" class="edit-input" v-model="param.preferentialDesc"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">收货人电话</label>
                                <input type="text" class="edit-input" v-model="param.consigneePhone"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">邮编</label>
                                <input type="text" class="edit-input" v-model="param.zipCode"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">省</label>
                                <input type="text" class="edit-input" v-model="param.province"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">区</label>
                                <input type="text" class="edit-input" v-model="param.district"/>
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
import pressImage from '../../components/imagePress'
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
    },
    created(){
        console.log('123');
        console.log(this.param);
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

<template>
    <div>
        <biz-model :param="bizParam" v-if="bizParam.show"></biz-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3 v-if="param.flag==0">新增跟进</h3>
                <h3 v-if="param.flag!=0">修改跟进</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <section class="editsection" v-cloak>
                        <input type="hidden" class="form-control edit-input" value="{{param.id}}" />
                        <div class="editpage">
                            <div class="editpageleft">
                                <div v-if="param.flag==0" class="editpage-input">
                                </div>
                                <div v-if="param.flag==0&&!param.customer" class="editpage-input">
                                    <label class="editlabel">业务类型</label>
                                    <select type="text" @change="selectBizId()" class="form-control edit-input" v-model="param.bizType">
                                        <option value="">请选择业务类型</option>
                                        <option value="1">意向</option>
                                    </select>
                                </div>
                                <div v-if="param.flag==0&&param.customer" class="editpage-input">
                                    <label class="editlabel">业务类型</label>
                                    <select type="text" @change="selectBizId()" class="form-control edit-input" v-model="param.bizType">
                                        <option value="">请选择业务类型</option>
                                        <option value="1">意向</option>
                                        <option value="2">订单</option>
                                    </select>
                                </div>
                                <!-- <div v-if="param.bizType" class="editpage-input">
                  <label class="editlabel">业务类型</label>
                  <select type="text" @change="selectBizId()" class="form-control edit-input" v-model="param.bizType" disabled=true>
                    <option value="">请选择业务类型</option>
                    <option value="1">意向</option>
                    <option value="2">订单</option>
                  </select>
                </div> -->
                                <div class="editpage-input">
                                    <label class="editlabel">联系账号
                                        <span class="system_danger" v-if="param.trackingWay=='手机'&&$validation.contactno.phone">请输入正确的手机号</span>
                                        <span class="system_danger" v-if="param.trackingWay=='qq'&&$validation.contactno.qq">请输入正确的qq号</span>
                                        <span class="system_danger" v-if="param.trackingWay=='微信'&&$validation.contactno.wechart">请输入正确的微信号</span>
                                        <span class="system_danger" v-if="param.trackingWay=='邮件'&&$validation.contactno.email">请输入正确的邮箱</span>
                                        <span class="system_danger" v-if="param.trackingWay=='固话'&&$validation.contactno.tel">请输入正确的电话</span>
                                    </label>
                                    <input type="text" v-model='param.contactNo' class="form-control edit-input" v-validate:contactno="['phone','qq','wechart','email','tel']" value="{{param.contactNo}}" placeholder='请先选择跟进方式' />
                                </div>
                            </div>
                            <div class="editpageright">
                                <!-- <div v-if="param.flag==0" class="editpage-input">
                     <label class="editlabel">跟进对象ID</label>
                     <input type="text" v-model='param.objId' class="form-control edit-input" value="{{param.objId}}" disabled="disabled" />
                 </div> -->
                                <div class="editpage-input">
                                    <label class="editlabel">跟进方式</label>
                                    <select class="form-control edit-input" v-model='param.trackingWay'>
                                        <option value="">请选择跟进方式</option>
                                        <option value="手机">手机</option>
                                        <option value="固话">固话</option>
                                        <option value="qq">qq</option>
                                        <option value="微信">微信</option>
                                        <option value="邮件">邮件</option>
                                        <option value="其它">其它</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="editpage">
                            <div class="editpage-input" style="width:100%">
                                <label class="editlabel">备注</label>
                                <textarea type="text" v-model='param.comments' class="form-control edit-input" style="height:100px;line-height:20px;width:95%" value="{{param.coments}}"></textarea>
                            </div>
                        </div>
                        <!-- 跟进类型是意向 -->
                        <div class="editpage" v-if="intention.breedName">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">品种名</label>
                                    <input class="form-control edit-input" value="{{intention.breedName}}" readonly="true" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">规格</label>
                                    <input readonly="true" class="form-control edit-input" value="{{intention.spec}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">产地</label>
                                    <input readonly="true" class="form-control edit-input" v-model="intention.location | province" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">数量</label>
                                    <input readonly="true" class="form-control edit-input" value="{{intention.number}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">单位</label>
                                    <input readonly="true" class="form-control edit-input" v-model="intention.unit | Unit" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">价格</label>
                                    <input readonly="true" class="form-control edit-input" value="{{intention.price}}" />
                                </div>
                            </div>
                        </div>
                        <!-- 跟进类型是订单 -->
                        <div class="editpage" v-if="intention.no">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">订单流水号</label>
                                    <input readonly="true" class="form-control edit-input" value="{{intention.no}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">订单金额</label>
                                    <input readonly="true" class="form-control edit-input" value="{{intention.amount}}" />
                                </div>
                            </div>
                            <div class="editpageright">
                                <div class="editpage-input">
                                    <label class="editlabel">商品</label>
                                    <input readonly="true" class="form-control edit-input" value="{{intention.goods[0].brredName}}" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">创建时间</label>
                                    <input readonly="true" class="form-control edit-input" value="{{intention.ctime}}" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="($validation.contactno.phone&&param.trackingWay=='手机')
                          ||($validation.contactno.qq&&param.trackingWay=='qq')
                          ||($validation.contactno.wechart&&param.trackingWay=='微信')
                          ||($validation.contactno.email&&param.trackingWay=='邮件')
                          " disabled="true">确定</button>
                    <button type="button" class="btn  btn-confirm" v-else @click="updateOrAddTrackingInfo(param,param.show = false)">确定
                    </button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import bizModel from './selectBizId'
import {
    initUserDetail,

} from '../../vuex/getters'
import {
    updateTrackingInfo,
    createTrackingInfo,
    getUserDetail
} from '../../vuex/actions'
export default {
    props: ['param'],
    components: {
        bizModel
    },
    data() {
        return {
            bizParam: {
                show: false,
                bizType: '',
                userId: this.param.objId
            },
            intention: {
                breedName: '',
                location: '',
                spec: '',
                number: '',
                price: '',
                unit: ''
            }
        }
    },
    vuex: {
        getters: {
            initUserDetail,

        },
        actions: {
            updateTrackingInfo,
            createTrackingInfo,
            getUserDetail
        }
    },

    methods: {
        updateOrAddTrackingInfo: function(param) {
            console.log(param);
            if (param.flag == 1) {
                this.updateTrackingInfo(param);

            } else {
                this.createTrackingInfo(param);
            }

        },
        selectBizId: function() {

            if (this.param.bizType != '') {
                this.bizParam.show = true;
                this.bizParam.bizType = this.param.bizType;
                this.bizParam.userId = this.param.objId;
            } else {
                this.intention.no = '';
                this.intention.breedName = '';
            }

        }
    },
    events: {
        'getBiz': function(biz) {
            this.param.bizTypeCopy = this.param.bizType;
            this.param.bizId = biz.id;
            this.param.breedName = biz.breedName;
            this.intention = biz;
            console.log('sdffsd');
            console.log(biz);
        },
        'cancel': function() {
            if (this.param.bizTypeCopy) {
                this.param.bizType = this.param.bizTypeCopy
            } else {
                this.param.bizType = '';
            }
        }
    },
    created() {
        if (this.param.breedName) {
            this.intention.breedName = this.param.breedName;
            this.intention.spec = this.param.spec;
            this.intention.location = this.param.location;
            this.intention.number = this.param.number;
            this.intention.unit = this.param.unit;
            this.intention.price = this.param.price;
        }
    }
}
</script>
<style scoped>
/* 整个弹框的样式 */

.modal {
    z-index: 1083
}

.modal_con {
    top: 120px;
    width: 620px;
    bottom: 200px;
    z-index: 1084;
    overflow: hidden;
    overflow-y: auto;
}

.big-font {
    font-size: 36px;
}


/* 圈×的位置 */

.top-title {
    position: fixed;
    top: 120px;
    width: 620px;
    right: 0;
    left: 0;
    margin: auto;
    text-align: right;
    margin-top: 0;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-model {
    padding: 10px 30px 30px 30px;
    margin-bottom: 60px;
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

.edit_footer {
    left: 0;
    right: 0;
    bottom: 200px;
    width: 620px;
    margin: auto;
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

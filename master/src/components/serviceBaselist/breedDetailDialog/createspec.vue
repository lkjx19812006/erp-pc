<template>
    <div>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>新建{{param.title}}</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <section class="editsection">
                        <div class="editpage" v-cloak v-if="param.judge=='specs'">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.namelist}} <span class="system_danger" v-if="$validation.name.required">请输入{{param.namelist}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.name" v-validate:name="['required']" />
                                </div>
                            </div>
                        </div>
                        <div class="" v-cloak v-if="param.judge=='locals'">
                            <div class="editpage-input">
                                <label class="editlabel">{{param.namelist}} <span class="system_danger" v-if="$validation.location.required">请输入{{param.namelist}}</span></label>
                                <!-- <input type="text" class="form-control edit-input" v-model="param.name" v-validate:location="['required']" v-show="false" />
                                <input-select :prevalue="param.name" :value.sync="param.name" :options="province" placeholder="省">
                                </input-select> -->
                                <div  type="text" class="edit-input-new">
                                    <v-select :debounce="250" :value.sync="param.province"  :options="initProvince" placeholder="省/Province" label="cname">
                                    </v-select>
                                </div>
                            </div>
                        </div>
                        <div class="editpage" v-cloak v-if="param.judge=='alias'">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.namelist}} <span class="system_danger" v-if="$validation.name.required">请输入{{param.namelist}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.name" v-validate:name="['required']" />
                                </div>
                            </div>
                        </div>
                        <div class="editpage" v-cloak v-if="param.judge=='units'">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{param.namelist}} <span class="system_danger" v-if="$validation.name.required">请输入{{param.namelist}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.name" v-validate:name="['required']" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.link(param,param.id,param.breedId,param.show = false)">保存</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="disabled">保存</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import vSelect from '../../tools/vueSelect/components/Select'
import inputSelect from '../../tools/vueSelect/components/inputselect'
import {
    initProvince
} from '../../../vuex/getters'
import {
    getProvinceList
} from '../../../vuex/actions'
export default {
    components: {
        vSelect,
        inputSelect
    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                show: false,
                cur: 1,
                all: 1
            },
            province: ['新疆维吾尔族自治区', '宁夏回族自治区', '黑龙江省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '陕西省', '甘肃省', '青海省', '上海市', '吉林省', '辽宁省', '内蒙古自治区', '山西省', '河北省', '天津市', '北京市'],
        }
    },
    methods: {

    },
    vuex: {
        getters: {
            initProvince
        },
        actions: {
            getProvinceList
        }
    },
    created() {
        this.getProvinceList(this.loadParam)
    }
}
</script>
<style scoped>
.modal {
    z-index: 1083
}

.modal_con {
    height: 350px;
    width: 400px;
    z-index: 1084
}

.top-title {
    position: absolute;
    width: 100%;
    top: 0;
}

.edit_footer {
    /* position: absolute; */
    bottom: 300px;
    width: 400px;
}

.big-font {
    font-size: 36px;
}

.top-title span {
    font-size: 28px;
}

.edit-model {
    z-index: 999;
    padding: 10px 30px 100px 30px;
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
.edit-input-new {
    height: 36px;
    width: 75%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}
.dropdown-menu {
    z-index: 999
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

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.system_danger {
    color: red;
    margin-bottom: 0;
    font-weight: 100;
    font-size: 12px;
}
</style>

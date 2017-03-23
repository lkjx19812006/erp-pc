<template>
    <div>
        <tip-model :param="tipParam" v-if="tipParam.show"></tip-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>新建文件</h3>
            </div>
            <div class="edit-model">
                <section class="editsection">
                    <div class="editpage-input" style="width:110%">
                        <label class="editlabel">{{$t('static.country')}}</label>
                        <div type="text" class="edit-input">
                            <v-select :debounce="250" :value.sync="country" :options="initCountrylist" placeholder="国家/Country" label="cnameEn">
                            </v-select>
                        </div>
                    </div>
                    <div class="editpage-input">
                        <label class="editlabel">企业类型</label>
                        <select class="form-control" v-model="param.type">
                            <option value=""></option>
                            <option value="0">Others 其它</option>
                            <option value="1">Cooperatives 合作社</option>
                            <option value="2">Drug Makers 药商</option>
                            <option value="3">Factory 药厂</option>
                            <option value="4">Private Use 个体户</option>
                            <option value="5">Pharmacy 药店</option>
                            <option value="6">Hospital 医院</option>
                            <option value="7">Trading Company 贸易公司</option>
                            <option value="8">Retail 零售商行</option>
                            <option value="9">药农</option>
                            <option value="10">介绍人</option>
                            <option value="11">药贩子</option>
                            <option value="12">产地药商</option>
                            <option value="13">销地药商</option>
                            <option value="14">Acupuncture Clinic 养生诊所</option>
                            <option value="15">Chemical Company 化工厂</option>
                            <option value="16">Cosmetics Company 化妆品厂</option>
                            <option value="17">Extract Company 提取物厂</option>
                            <option value="18">Food Company 食品厂</option>
                            <option value="19">Laboratory for trial 实验室</option>
                            <option value="20">Online Company 网上电商</option>
                            <option value="21">Pharmaceutical producer of Chinese Traditional Patent Medicine 中成药生产商</option>
                            <option value="22">Pharmaceutical producer of Western Medicine 西药生产商</option>
                            <option value="23">Pieces Factory 饮片厂</option>
                            <option value="24">Herb tea company 茶类公司</option>
                        </select>
                    </div>
                    <div class="editpage-input clearfix">
                        <label class="editlabel">{{$t('static.file')}}</label>
                        <input type="file" id="file" accept="application/vnd.ms-excel*" />
                    </div>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                <button type="button" class="btn btn-confirm" @click="save()">{{$t('static.save')}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import pressImage from '../imagePress'
import tipModel from '../tips/tipDialog'
import vSelect from '../tools/vueSelect/components/Select'
import {
    initCountrylist
} from '../../vuex/getters'
import {
    getCountryList
} from '../../vuex/actions'
export default {
    components: {
        pressImage,
        tipModel,
        vSelect
    },
    props: ['param'],
    data() {
        return {
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            tipParam: {
                show: false,
                alert: true,
                name: "请确保您上传的是EXCEL文件"
            },
            type: "application/msexcel",
            countryParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            country: {
                id: '',
                cname: '',
                cnameEn: ''
            },
        }
    },
    vuex: {
        getters: {
            initCountrylist
        },
        actions: {
            getCountryList
        }
    },
    methods: {
        save: function() {
            this.param.country = this.country.id;
            let file = document.getElementById("file").files[0];
            let fileName = file.name;
            let fileType = ""; //文件类型
            if (fileName) {
                fileType = fileName.split(".")[fileName.split(".").length - 1];
            }
            this.param.mFile = file;

            if (!this.param.mFile || (fileType != "xls" && fileType != "xlsx")) {
                this.tipParam.show = true;
            } else {
                this.param.link(this.param);
                this.param.show = false;
            }

        }
    },
    events: {

    },
    created() {
        this.getCountryList(this.countryParam);
    }
}
</script>
<style scoped>
.modal {
    z-index: 1083
}

.modal_con {
    z-index: 1084;
    width: 600px;
    height: 650px;
}

.top-title {
    position: absolute;
    top: 0;
    right: 0;
    width: 600px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}

.edit_footer {
    width: 600px;
    position: absolute;
    bottom: 0
}

.edit_footer button {
    margin-left: 15px;
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

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.editpage-image {
    width: 150px;
}

.edit-input {
    line-height: 20px;
}
</style>

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
                <div class="cover_loading">
                    <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <section class="editsection">
                    <div class="editpage-input clearfix">
                        <label class="editlabel">{{$t('static.file')}}</label>
                        <input type="file" id="file" class="left" />
                        <button type="button" class="btn btn-confirm right" @click="save()">上传</button>
                        <div v-if="param.success==1" class="right" style="margin-right:10px;color:green">上传成功</div>
                        <div v-if="param.success==2||param.success==3" class="right" style="margin-right:10px;color:red">上传失败</div>
                    </div>
                    <h4 v-show="param.loading" style="margin-top:50px;text-align:center;color:red">正在上传，请稍后！！</h4>
                    <!-- 如果上传完成后显示上传后返回信息 -->
                    <div v-if="param.success==2" class="editpage-input clearfix">
                        <ul v-for="(key, value) in param.result">
                            <li>{{key}}、{{value}}</li>
                        </ul>
                    </div>
                    <div v-if="param.success==3" class="editpage-input clearfix">
                        <div style="color:red">{{param.result}}</div>
                    </div>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.back')}}</button>
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
            let file = document.getElementById("file").files[0];
            let fileName = "";
            if (file) {
                fileName = file.name;
            }
            let fileType = ""; //文件类型
            if (fileName) {
                fileType = fileName.split(".")[fileName.split(".").length - 1];
            }
            this.param.mFile = file;

            if (!this.param.mFile || (fileType != "xls" && fileType != "xlsx")) {
                this.tipParam.show = true;
            } else {
                this.param.loading = true;
                this.param.link(this.param);
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
    height: 400px;
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

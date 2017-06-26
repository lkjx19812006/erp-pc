<template>
    <div class="demo-upload-list">
        <!-- <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
            </div>
        </template>-->
        <!-- <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template> -->
        <span class="system_danger" v-if="validate.format">文件格式不正确，请上传 xls 或 xlsx 格式的文件。</span>
        <span class="system_danger" v-if="validate.size">文件大小超出限制，最大为2M。</span>
        <span class="system_danger">{{errorInfo}}</span>
        <span class="system_danger" v-if="validate.isComplete">正在上传...</span>
    </div>
    <Upload v-ref:upload :show-upload-list="false" :on-success="handleSuccess" :format="['xlsx','xls']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :on-error="handleError" :on-progress="handelProgress" name="mFile" multiple type="drag" action="/crm/api/v1/indent/parseExcel" style="display: inline-block;width:100px;">
        <div style="width: 100px;height:30px;line-height: 30px;margin-right:50px;color:#39f">
            <Icon type="ios-cloud-upload" size="20"></Icon>上传文件
        </div>
    </Upload>
    <!-- <Modal title="查看图片" :visible.sync="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal> -->
</template>
<script>
export default {
    data() {
            return {
                imgName: '',
                visible: false,
                validate: {
                    format: false,
                    size: false,
                    isComplete: false
                },
                errorInfo: ''
            }
        },
        computed: {
            uploadList() {
                return this.$refs.upload ? this.$refs.upload.fileList : [];
            }
        },
        methods: {
            handleView(name) { //展示大图

            },
            handleRemove(file) { //删除文件

            },
            handleSuccess(res, file) { //上传成功后回调函数
                // 因为上传过程为实例，这里模拟添加 url
                // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
                this.validate.format = false
                this.validate.size = false
                this.validate.isComplete = false
                for (var key in res.result) {
                    this.errorInfo = res.result[key]
                }
            },
            handleFormatError(file) { //验证文件格式
                this.validate.format = true
            },
            handleMaxSize(file) { //验证文件大小
                this.validate.size = true
            },
            handleError: function(file) { //上传失败回调
                this.errorInfo = error
            },
            handleBeforeUpload() { //上传之前验证上传条目数

            },
            handelProgress() { //上传过程中调用
                this.validate.isComplete = true
            }
        },
        created: function() {
            this.$Notice.config({
                top: 200,
                right: 600,
                duration: 3
            });
        }
}
</script>
<style>
.demo-upload-list {
    display: inline-block;
    /*width: 100px;
        height: 30px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;*/
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>

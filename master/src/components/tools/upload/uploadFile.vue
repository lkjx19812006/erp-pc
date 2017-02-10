<template>
    <Upload action="/crm/api/v1/file/" 
        name="mFile"

        :data="fileInfo" 
        :before-upload="setFile" 
        :on-success="getSucessInfo"
        :on-error = "getErrorInfo"
        :on-remove = "getFilesList"     
        :on-format-error = "getFilesList"
        :on-exceeded-size = "getFilesList"
        :on-preview = "getFileInfo"
        >
        <i-button type="ghost" icon="ios-cloud-upload-outline" >上传文件</i-button>
    </Upload>
</template>
<script>
    export default {
         data () {
            return {
                fileInfo:{
                    qiniu:false
                }
                
            }
        },
        computed:{
            getData(){
                console.log(this.fileInfo);
                return this.fileInfo;
            }
        },
        methods:{ 
            setFile:function(file){ 
                let _this = this;
                if(file.type.split('/')[0]=="image") { //如果上传的是图片
                    var reader = new FileReader(); 
                    reader.readAsDataURL(file);

                    let param ={};
                    param.qiniu = false;
                    reader.onload = function(e){
                        param.mFile=e.currentTarget.result;
                    }
                    reader.onloadend = function(){
                        _this.$http({
                            method: 'POST',
                            url: '/crm/api/v1/file/base64',
                            emulateJSON: false,
                            emulateHTTP: false,
                            body: param
                            }).then((res) => {
        
                            }, (res) => {
                          console.log('fail');
                        })
                    },
                   
                    console.log(param);
                    
                    this.fileInfo = param;
                   
                }else{            //如果上传的不是图片
                    let param =new FormData();
                    param.append("qiniu", false);
                    this.fileInfo = param;
                }  
                
            },
            getSucessInfo:function(response, file, fileList){
                console.log(response.result.path);
                console.log(file);
                console.log(fileList);
                this.$dispatch("getFileList", fileList);
            },
            getErrorInfo:function(response, file, fileList){
                console.log(response.result.path);
                console.log(file);
                console.log(fileList);
                this.$dispatch("getFileList", fileList);
            },
            getFilesList:function(file, fileList){
                console.log(file);
                console.log(fileList);
                this.$dispatch("getFileList", fileList);
            },
            getFileInfo:function(file){
                this.$dispatch("getFileInfo", file);
            }
        }
    }
</script>
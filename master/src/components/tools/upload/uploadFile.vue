<template>
    <Upload action="/crm/api/v1/file/" :data="data">
        <i-button type="ghost" icon="ios-cloud-upload-outline" >上传文件</i-button>
    </Upload>
</template>
<script>
    export default {
         data () {
            return {
                data:{
                    qiniu:false,
                    mfile:'11.xsl'
                }
                
            }
        },
    }
</script>
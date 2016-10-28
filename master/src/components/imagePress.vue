<template>
    <div class="img_div">
        <form>
            <input type="file" @change="previewImg" class="input_image" name="photo" accept="{{type}}">
            <img v-bind:src="image" class="image_show" v-if="imageShow&&!showurl">
            <img v-bind:src="showurl" class="image_show" v-if="imageShow&&showurl">
            <img src="../../static/images/close.png" v-show="showurl" @click="delImage" class="close_image">
            <div v-show="!imageShow">
                <div>{{fileName}}</div>
                <input type="button" value="重新选择文件" class="btn btn-default select_button">
            </div>

        </form>
    </div>
</template>
<script>
export default {
    data() {
            return {
                image: "../../static/images/default_image.png",
                close:false,
                imageShow:true,
                fileName:''
            }
        },
        props: {
          param:{
            default: null,
            qiniu:''
          },
          value:'',
          showurl:'',
          type:'*'
        },
        methods: {
            previewImg: function(e) {
                let _self = this;
                let input = e.target;

                if (input.files && input.files[0]) {
                    let file = input.files[0];
                    console.log(file)
                    _self.fileName=file.name;
                    if(file.type.split('/')[0]=='image'){

                         let reader = new FileReader();
                      let  img = new Image();
                    reader.onload = function(e) {
                        if (input.files[0].size > 204800) { //图片大于200kb则压缩
                            img.src = e.target.result;
                            img.onload = function() {
                                _self.image = _self.compress(img);
                              let param ={};
                              param.mFile=_self.image;
                              if(_self.param&&_self.param.qiniu){param.qiniu=_self.param.qiniu;}
                              else{ param.qiniu=false;}
                              _self.close=true;
                              _self.upload(param,'base64');
                            }
                        } else {

                            _self.image = e.target.result;
                            _self.imageShow=true;
                          let param ={};
                          param.mFile=_self.image;
                          if(_self.param&&_self.param.qiniu){param.qiniu=_self.param.qiniu;}
                          else{ param.qiniu=false;}
                          _self.close=true;
                          _self.upload(param,'base64');
                        }

                    }
                    reader.readAsDataURL(input.files[0]);
                    }else{
                    _self.imageShow=false;
                    _self.close=false;
                    let param =new FormData();
                    param.append("qiniu", _self.param.qiniu);
                    param.append("mFile", file);
                    _self.upload(param,'');
                }
                    return 1;
                }
            },
            compress: function(img) {
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                //如果图片大于四百万像素，计算压缩比并将大小压至50万以下
                let ratio;
                if ((ratio = width * height / 300000) > 1) {
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);
                let ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 1);
                if (ndata.length > 165399) {
                    ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 165399 / ndata.length);
                }
                canvas.width = canvas.height = 0;
                return ndata;
            },
            delImage:function(e){
                e.target.parentElement.reset();
                this.close=false;
                this.image="../../static/images/default_image.png";
                this.$dispatch("getImageData", this.image);
                this.value='';
                this.showurl='';
            },
            upload:function(data,url){
                var _self=this;
                   this.$http({
                        method: 'POST',
                        url: '/crm/api/v1/file/'+url,
                        emulateJSON: false,
                        emulateHTTP: false,
                        body: data
                        }).then((res) => {
                          console.log(res);
                        _self.$dispatch("getImageData", res.json());
                        _self.value=res.json().result.path;
                        _self.showurl=res.json().result.url;
              console.log(res.json());
                        }, (res) => {
                      console.log('fail');
                    })


            }
        }
}
</script>
<style scoped>
h1 {
    color: #42b983;
}

.input_image {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.img_div {
    position: relative;
}

.image_show {
    width: 100%;
}

.close_image{
    position: absolute;
    top: -16px;
    right: -14px;
    width: 30px;
}

.select_button{

}
</style>

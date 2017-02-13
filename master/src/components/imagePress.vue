<template> 
    <div class="img_div">
        <div class="cover_loading"  v-show="loadParam.loading">
            <div class="loadEffect"> 
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span> 
                <span></span>
                <span></span>
            </div>
        </div>
        <form>
            <input type="file" @change="previewImg" class="input_image" name="photo" accept="{{type}}">
            <img v-bind:src="image" class="image_show" v-if="imageShow&&!showurl">
            <img v-bind:src="showurl" class="image_show" v-if="imageShow&&showurl" >
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
            fileName:'',
            loadParam:{
                loading: false,
                color: '#5dc596',
                size: '15px'
            }
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
                let fileNameArr=file.name.split('.');
                _self.type=fileNameArr[fileNameArr.length-1];
              if(_self.type=='png'||_self.type=='bmp'||_self.type=='jpg'||_self.type=='jpeg'||_self.type=='gif'){
                _self.type='image';
              }else if(_self.type=='pdf'){
                _self.type='pdf';
              }else if(_self.type=='doc'||_self.type=='docx'){
                _self.type='word';
              } else if(_self.type=='xls'||_self.type=='xlsx'){
                _self.type='excel';
              }else{
                _self.type='other';
              }
                console.log(file)
                _self.fileName=file.name;
                if(file.type.split('/')[0]=='image'){
                     let reader = new FileReader();
                     let img = new Image();
                reader.onload = function(e) {
                    if (input.files[0].size > 2048000) { //图片大于2M则压缩
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
                console.log(file);
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
            let ratio=1;
            /*if ((ratio = width * height / 300000) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }*/
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            let ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 1);
            /*if (ndata.length > 165399) {
                ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 165399 / ndata.length);
            }*/
            canvas.width = canvas.height = 0;
            return ndata;
        },
        delImage:function(e){
            e.target.parentElement.reset();
            this.close=false;
            this.image="../../static/images/default_image.png";
            this.$dispatch("getImageData",{result:{path:''}});
            this.value='';
            this.showurl='';
        },
        upload:function(data,url){
            console.log(data);
            this.loadParam.loading = true;
            var _self=this;
            console.log(this);
               this.$http({
                    method: 'POST',
                    url: '/crm/api/v1/file/'+url,
                    emulateJSON: false,
                    emulateHTTP: false,
                    body: data
                    }).then((res) => {
                        _self.$dispatch("getImageData", res.json());
                        _self.value=res.json().result.path;
                        _self.showurl=res.json().result.url;
                        this.loadParam.loading = false;
                        console.log(res.json());
                    }, (res) => {
                        this.loadParam.loading = false;
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
    height:120px;
}

.close_image{
    position: absolute;
    top: -16px;
    right: -14px;
    width: 30px;
}
.loadEffect{ width: 90px; height:90px; position: absolute;margin: 0 auto; left: 0;right: 0;margin-top:-30px;} 
.loadEffect span{ display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: #fa6705; position: absolute; -webkit-animation: load 1.04s ease infinite; } 
@-webkit-keyframes load{
 0%{ opacity: 0.8; } 
 100%{ opacity: 0.2; } 
 } 
.loadEffect span:nth-child(1){ left: 0; top: 50%; margin-top:-8px; -webkit-animation-delay:0.13s; } 
.loadEffect span:nth-child(2){ left: 11px; top: 11px; -webkit-animation-delay:0.26s; } 
.loadEffect span:nth-child(3){ left: 50%; top: 0; margin-left: -8px; -webkit-animation-delay:0.39s; } 
.loadEffect span:nth-child(4){ top: 11px; right:11px; -webkit-animation-delay:0.52s; } 
.loadEffect span:nth-child(5){ right: 0; top: 50%; margin-top:-8px; -webkit-animation-delay:0.65s; }
.loadEffect span:nth-child(6){ right: 9px; bottom:11px; -webkit-animation-delay:0.78s; } 
.loadEffect span:nth-child(7){ bottom: 0; left: 50%; margin-left: -8px; -webkit-animation-delay:0.91s; }
.loadEffect span:nth-child(8){ bottom: 10px; left: 10px; -webkit-animation-delay:1.04s; }
</style>

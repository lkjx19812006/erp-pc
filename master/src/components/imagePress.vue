<template>
    <div class="img_div">
        <form>
            <input type="file" @change="previewImg" class="input_image" >
                 <img v-bind:src="image" class="image_show" >
                <img src="../../static/images/close.png" v-show="close" @click="delImage" class="close_image">
        </form>
    </div>
</template>
<script>
export default {
    data() {
            return {
                image: "../../static/images/default_image.png",
                close:false
            }
        },
        methods: {
            previewImg: function(e) {
                let _self = this;
                let input = e.target;
                if (input.files && input.files[0]) {
                    let reader = new FileReader(),
                        img = new Image();
                    reader.onload = function(e) {
                        if (input.files[0].size > 204800) { //图片大于200kb则压缩
                            img.src = e.target.result;
                            img.onload = function() {
                                _self.image = _self.compress(img);
                                _self.$dispatch("getImageData", _self.image);
                                _self.close=true;
                            }
                        } else {
                            _self.image = e.target.result;
                            _self.$dispatch("getImageData", _self.image);
                            _self.close=true;
                        }
                    }
                    reader.readAsDataURL(input.files[0]);
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
                console.log(e.target.parentElement);
                e.target.parentElement.reset();
                this.close=false;
                this.image="../../static/images/default_image.png";
                this.$dispatch("getImageData", this.image);

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
</style>

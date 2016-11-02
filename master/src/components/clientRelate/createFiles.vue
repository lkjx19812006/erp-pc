<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title}}</h3>
        </div>
        <div class="edit-model">
            <section class="editsection">
                <div class="editpage-input">
                    <label class="editlabel">所属文件类别</label>
                    <select class="form-control"  v-model="param.bizType">
                        <option value="customer_license">客户文件</option>
                        <option value="product_license">产品文件</option>
                    </select>
                </div>
                <div class="editpage-input">
                    <label class="editlabel">描述说明</label>
                    <textarea style="width:100%;resize:none;border:1px solid #ddd;border-radius:5px;" rows="5" v-model="param.description">

                    </textarea>
                </div>
                <div class="editpage-input">
                    <label class="editlabel">新建文件</label>
                    <press-image :value.sync="param.image_f" :showurl.sync="param.image_f_show" :type.sync="param.fileType" :param="imageParam" style="float:left;margin-left:15px;width:25%"></press-image>
                </div>
            </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <input type="button" class="btn btn-confirm" @click="param.link(param,param.show = false)" value="保存" />
        </div>
    </div>
</template>
<script>
import pressImage from '../imagePress'
export default {
    components: {
        pressImage
    },
    props: ['param'],
    data() {
        return {
            imageParam:{
                url:'/crm/api/v1/file/',
                qiniu:false
              },
              type:"image/*"
            }
    },
    vuex: {
        actions: {

        }
    },
    events: {
        getImageData: function(imageData) {
            console.log('返回信息');
            console.log(imageData);
            var paths = new Array();
            this.param.path=imageData.result.path;
        }
    }
}
</script>
<style scoped>
.modal{
    z-index: 1083
}
.modal_con{
    z-index: 1084
}
.top-title {
    position: absolute;
    top: 0;
    right: 0;
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
.editpage-image{
    width: 150px;
}
</style>

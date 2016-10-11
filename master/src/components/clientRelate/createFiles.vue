<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>上传文件</h3>
        </div>
        <div class="edit-model">
            <section class="editsection">
                <div class="editpage-input">
                    <label class="editlabel">文件类型</label>
                    <select class="form-control"  v-model="param.type">
                        <option>图片</option>
                        <option>pdf文件</option>
                    </select>
                </div>
                <div class="editpage-input">
                    <label class="editlabel">文件分类</label>
                    <select class="form-control"  v-model="param.catagory">
                        <option>资质证书</option>
                        <option>产品图片</option>
                    </select>
                </div>
                <div class="editpage-input">
                    <label class="editlabel">新建文件</label>
                    <div class="editpage_img clearfix">
                         <div class="editpage-image">
                            <press-image :param.sync="file1"></press-image> 
                         </div>
                        <!--  <div class="editpage-image col-md-4">
                           <press-image :param.sync="file2"></press-image>
                        </div>
                        <div class="editpage-image col-md-4">
                           <press-image :param.sync="file3"></press-image>
                        </div> -->
                    </div>
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
            file1:{
                url:'/crm/api/v1/file/',
                qiniu:false
            },
            file2:{
                url:'/crm/api/v1/file/',
                qiniu:false
            },
            file3:{
                url:'/crm/api/v1/file/',
                qiniu:false
            }

        } 
    },
    vuex: {
        actions: {
           
        }
    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
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
.big-font {
    font-size: 36px;
}

.top-title span {
    font-size: 28px;
}
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
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
.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
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

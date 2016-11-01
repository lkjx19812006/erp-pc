<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.titles}}</h3>
        </div>
        <validator name="validation">
          <form novalidate>
            <div class="edit-model">
                <section class="editsection clearfix">
                    <div class="editpage-input clearfix">
                        <label class="editlabel">新建文件</label>
                        <press-image :value.sync="param.image_f" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:30%"></press-image>
                       <press-image :value.sync="param.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:30%"></press-image>
                       <press-image :value.sync="param.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:30%"></press-image>
                    </div>
                    <div class="editpage-input">
                        <label class="editlabel">描述说明</label>
                        <textarea style="width:100%;resize:none;border:1px solid #ddd;border-radius:5px;" rows="5" v-model="param.description">
                        </textarea>
                    </div>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <input type="button" class="btn btn-confirm" v-if="$validation.valid" @click="param.callback(param,param.show = false)" value="提交" />
                 <input type="button" class="btn btn-confirm" v-else disabled="true"  value="提交" />
            </div>
          </form>
        </validator>
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
    methods:{

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
.modal_con{
    width: 560px;
    height: 520px;
    top: 0;
}
.edit_footer{
     width: 560px;
     position: absolute;
     bottom: 0;
}
.top-title{
     width: 560px;
     position: absolute;
     top: 0;
}
.top-title span {
    font-size: 28px;
}
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
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

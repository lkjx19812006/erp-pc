<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新建{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection" v-cloak>
                        <div v-if="param.remark!==undefined" class="editpage-input">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <input type="text" class="form-control edit-input"  id="label" v-model="param.remark" v-validate:label="['required']" />
                        </div>  
                        <div v-if="param.label!==undefined" class="editpage-input">
                           <label class="editlabel">{{$t('static.label')}}</label>
                           <div type="text" class="edit-input" >
                             <input-select
                               :value.sync="param.label"
                               :prevalue="param.label"
                               :options="labels"
                               placeholder="标签"
                               label="name"
                             >
                             </input-select>
                           </div>
                         </div> 
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm"  @click="param.link(param,param.show = false)" value="保存" />
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import inputSelect from '../../tools/vueSelect/components/inputselect'
export default {
    components: {
        inputSelect
    },
    props: ['param'],
    data() {
        return {
          labels:[],
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
    }
}
</script>
<style scoped>
.modal{
    z-index: 1083
}
.modal_con{
    height: 300px;
    width: 400px;
    z-index: 1084;
}
.edit_footer{
    position: absolute;
    width: 100%;
    bottom: 10px;
}

.top-title{
    position: absolute;
    width: 100%;
    top: 0;
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

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}


.editpage-input {
    margin-top: 15px;
}
.edit-input {
    height: 36px;
    line-height: 20px;
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

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}
.editpage_img {
    width: 90%;
}

.editpage_img img {
    display: inline-block;
    background: #ccc;
}

.editpage-image {
    display: inline-block;
}
</style>

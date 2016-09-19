<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
         <div class="edit-content">
            <h3>编辑新建成分</h3>
            </div>
       <validator name="validation">
        <form novalidate>
            <div class="edit-model">
                <section class="editsection">
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel">编码</label>
                                <input type="text" class="form-control edit-input"  id="code" v-validate:code="['required']"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">所属药厂</label>
                                <input type="text" class="form-control edit-input" v-validate:classify="['required']" id="classify" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">含量</label>
                                <input type="text" class="form-control edit-input" v-validate:code="['required']" id=""/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">类型</label>
                                <input type="text" class="form-control edit-input" v-validate:code="['required']"/>
                            </div>
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">药品名</label>
                                <input type="text" class="form-control edit-input" v-validate:code="['required']"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">成分名</label>
                                <input type="text" class="form-control edit-input" v-validate:code="['required']"/>
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">单位</label>
                                <input type="text" class="form-control edit-input" v-validate:code="['required']"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm(param.show = false)">保存</button>
            </div>
        </form>
    </validator>
</div>
</template>
<script>
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
           
        }
    },
     route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
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

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
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

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}
.edit_footer button {
    margin-left: 15px;
}
</style>

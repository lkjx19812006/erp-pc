<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑枚举类型</h3>
        </div>
        <div class="edit-model">
            <form name="editOrderinfo" action="javascript:void(0)">
                <section class="editsection" v-cloak>
                         <input type="hidden"  class="form-control edit-input" value="{{systemData.id}}" />
                    <div class="editpage">
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel">名称</label>
                                <input type="text" v-model='systemData.name' class="form-control edit-input" value="{{systemData.name}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">类型</label>
                                <input type="text" v-model='systemData.type' class="form-control edit-input" value="{{systemData.type}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">状态</label>
                                <input type="text" v-model='systemData.status' class="form-control edit-input" value="{{systemData.status}}" />
                            </div>
                        </div>
                        <div class="editpageright">
                            <div class="editpage-input">
                                <label class="editlabel">编码</label>
                                <input type="text" v-model='systemData.code' class="form-control edit-input" value="{{systemData.code}}" />
                            </div>
                            <div class="editpage-input">
                                <label class="editlabel">描述</label>
                                <input type="text" v-model="systemData.desc" class="form-control edit-input" value="{{systemData.desc}}" />
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="updateDataInfo(systemData,systemData.sub=param.id,param.show = false)">确定</button>
        </div>
    </div>
</template>
<script>
import {
    initSystemlist
} from '../../vuex/getters'
import {
    getSystemData,
    updateDataInfo
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
            systemData: {
                id: this.initSystemlist[this.param.id].id,
                name: this.initSystemlist[this.param.id].name,
                code: this.initSystemlist[this.param.id].code,
                type: this.initSystemlist[this.param.id].type,
                desc: this.initSystemlist[this.param.id].desc,
                status: this.initSystemlist[this.param.id].status
            }
        }
    },
    vuex: {
        getters: {
            initSystemlist
        },
        actions: {
            getSystemData,
            updateDataInfo
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
        'getParam' () {
            this.$set('systemData.name', this.initSystemlist[this.param.id].name);
            this.$set('systemData.code', this.initSystemlist[this.param.id].code);
            this.$set('systemData.type', this.initSystemlist[this.param.id].type);
            this.$set('systemData.status', this.initSystemlist[this.param.id].status);
            this.$set('systemData.desc', this.initSystemlist[this.param.id].desc);
            this.$set('systemData.id', this.initSystemlist[this.param.id].id);
        }
    }
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
}

.modal_con {
    display: block;
    position: fixed;
    top: 217px;
    margin: auto;
    left: 0;
    right: 0;
    max-width: 630px;
    min-width: 380px;
    max-height: 500px;
    bottom: 50px;
    padding: 0;
    background-color: #fff;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    /*层数高度不够增加层数*/
    z-index: 1080;
    overflow: hidden;
    overflow-y: auto;
}

.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    right: 0;
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

.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 50px;
}

.edit_footer button {
    margin-left: 15px;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
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

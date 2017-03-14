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
                    <section class="editsection">
                        <div class="editpage" v-cloak v-if="param.judge=='specs'">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                <label class="editlabel">{{param.namelist}} <span class="system_danger" v-if="$validation.name.required">请输入{{param.namelist}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.name" v-validate:name="['required']" />
                                </div>
                            </div>
                        </div>
                        <div class="" v-cloak v-if="param.judge=='locals'">
                            <div class="editpage-input">
                                <label class="editlabel">{{param.namelist}} <span class="system_danger" v-if="$validation.name.required">请输入{{param.namelist}}</span></label>
                              <!--   <select class="form-control edit-input" v-model="param.name" v-validate:name="['required']">
                                    <option v-for="item in initProvince">{{item.cname}}</option>
                                </select> -->
                                 <v-select
                                     :debounce="250"
                                     :value.sync="province"
                                     :on-change="selectProvince"
                                     :options="initProvince"
                                     placeholder="省"
                                     label="cname"
                                    >
                                   </v-select>
                            </div>
                        </div>
                        <div class="editpage" v-cloak v-if="param.judge=='alias'">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                <label class="editlabel">{{param.namelist}} <span class="system_danger" v-if="$validation.name.required">请输入{{param.namelist}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.name" v-validate:name="['required']" />
                                </div>
                            </div>
                        </div>
                        <div class="editpage" v-cloak v-if="param.judge=='units'">
                            <div class="editpageleft">
                                <div class="editpage-input">
                                <label class="editlabel">{{param.namelist}} <span class="system_danger" v-if="$validation.name.required">请输入{{param.namelist}}</span></label>
                                    <input type="text" class="form-control edit-input" v-model="param.name" v-validate:name="['required']" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid"  @click="param.link(param,param.id,param.breedId,param.show = false)">保存</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="disabled">保存</button>
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import vSelect from '../../tools/vueSelect/components/Select'
import {
    initProvince
} from '../../../vuex/getters'
import {
    getProvinceList
} from '../../../vuex/actions'
export default {
    components: {
       vSelect
    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                show:false,
                cur: 1,
                all:1
            },
        }
    },
    vuex:{
        getters:{
            initProvince
        },
        actions:{
            getProvinceList
        }
    },
    created(){
        this.getProvinceList(this.loadParam)
    }
}
</script>
<style scoped>
.modal{
    z-index: 1083
}
.modal_con{
    height: 350px;
    width: 400px;
    z-index: 1084
}
.top-title{
    position: absolute;
    width: 100%;
    top: 0;
}
.edit_footer{
    position: absolute;
    bottom: 0;
    width: 100%;
}
.big-font {
    font-size: 36px;
}
.top-title span {
    font-size: 28px;
}

.edit-model {
    overflow: hidden;
   z-index: 999;
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
.dropdown-menu {
    z-index: 999
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
.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}
.btn-close {
    color: #fa6705;
}
.system_danger {
    color: red;
    margin-bottom: 0;
    font-weight: 100;
    font-size: 12px;
}
</style>

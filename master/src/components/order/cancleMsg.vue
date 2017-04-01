<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.reason')}}</h3>
        </div>
        <validator name="validation">
            <div class="edit-model">
                <section class="editsection" v-cloak>
                    <div class="editpage">
                        <input type="hidden" class="form-control edit-input" value="{{param.id}}" />
                        <div class="editpageleft">
                            <div class="editpage-input">
                                <label class="editlabel">{{$t('static.reason')}}<span class="system_danger" v-if="$validation.cause.required">{{$t('static.required')}}</span></label>
                                <textarea v-model='param.cancleCauses' v-validate:cause="['required']" class="form-control" style="width:100%;overflow:auto;word-break:break-all" rows="5"></textarea>
                            </div>
                        </div>
                </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.callback(param)">{{$t('static.save')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.save')}}</button>
                </div>
            </div>
        </validator>
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
    vuex: {
        getters: {

        },
        actions: {

        }
    },

    methods: {},
    created() {

    }

}
</script>
<style scoped>
.modal {
    z-index: 1113;
}

.modal_con {
    width: 554px;
    height: 400px;
    z-index: 1114;
}

.edit_footer {
    width: 554px;
    position: absolute;
    bottom: 0;
}

.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    top: 0;
    width: 554px;
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

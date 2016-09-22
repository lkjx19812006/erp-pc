<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>编辑{{param.name}}的信息</h3>
        </div>
        <div class="edit-model">
            <section class="editsection" v-cloak>
                <div class="editpage">
                    <div class="editpageleft">
                        <div class="editpage-input">
                            <label class="editlabel">名称</label>
                            <input type="text" v-model='param.name' class="form-control edit-input" value="{{param.name}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">类型</label>
                            <select class="form-control edit-input"  v-model='param.type'>
                                 <option value="0">个人</option>
                                 <option value="1">企业</option>
                            </select>
                            <!-- <input type="text" v-model='param.type' class="form-control edit-input" value="{{param.type}}" /> -->
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">分类码</label>
                            <input type="text" v-model='param.category' class="form-control edit-input" value="{{param.category}}" /> 
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">所在省</label>
                            <input type="text" v-model='param.province' class="form-control edit-input" value="{{param.province}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">备注</label>
                            <input type="text" v-model='param.comments' class="form-control edit-input" value="{{param.comments}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">经营范围</label>
                            <input type="text" v-model='param.bizScope' class="form-control edit-input" value="{{param.bizScope}}" />
                        </div>
                    </div>
                    <div class="editpageright">
                        <div class="editpage-input">
                            <label class="editlabel">分类</label>
                            <select class="form-control edit-input"  v-model='param.classify'>
                                 <option value="0">买</option>
                                 <option value="1">卖</option>
                                 <option value="2">买卖</option>
                            </select>
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">负责人</label>
                            <input type="text" v-model='param.principal' class="form-control edit-input" value="{{param.principal}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">电话</label>
                            <input type="text" v-model="param.tel" class="form-control edit-input" value="{{param.tel}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">邮箱</label>
                            <input type="text" v-model="param.email" class="form-control edit-input" value="{{param.email}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">所在市</label>
                            <input type="text" v-model='param.city' class="form-control edit-input" value="{{param.city}}" />
                        </div>
                        <div class="editpage-input">
                            <label class="editlabel">注册地址</label>
                            <input type="text" v-model='param.address' class="form-control edit-input" value="{{param.address}}" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="param.link(param,param.show = false)">确定</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['param'],
    data() {
        return {
        
        }
    },
    vuex: {

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

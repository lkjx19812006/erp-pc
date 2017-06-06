<template>
    <div>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con modal_overall" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="client_nav">
                <nav class="navbar navbar-client" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                            <span class="navbar-brand navbar-name" href="#">{{param.name}}</span>
                        </div>
                    </div>
                </nav>
            </div>
            <section>
                <div class="client-section clearfix">
                    <div class="col-md-8">
                        <h4 class="section_title">产品相关</h4>
                        <article @click.stop="">
                            <div class="panel-group">
                                <div class="panel panel-default">
                                    <div class="panel-heading" v-cloak>
                                        <div class="cover_loading">
                                            <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
                                        </div>
                                        <h4 class="panel-title clearfix" @click="enfoldment({
                                            link:initProductDetail.filesList,
                                            crete:'filesList'
                                            })">
                                              <img class="pull-left" src="/static/images/file.png" height="29" width="26"  />
                                              <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                                产品相关资质证书（{{initProductDetail.filesList.arr.length}}）
                                              </a>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="initProductDetail.filesList.show&&initProductDetail.filesList.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table contactSet">
                                                <thead>
                                                    <th>文件名称</th>
                                                    <th>文件类型</th>
                                                    <th>所属文件类型</th>
                                                    <th>文件路径</th>
                                                    <th>描述</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initProductDetail.filesList.arr">
                                                        <td>{{item.pname}}</td>
                                                        <td>{{item.fileType}}</td>
                                                        <td>{{item.bizType}}</td>
                                                        <td>
                                                            <img v-if="item.fileType=='image'" :src="item.url" />
                                                            <img src="/static/images/pdf.png" v-if="item.fileType=='pdf文件'">
                                                            <img src="/static/images/word.png" v-if="item.fileType=='word'">
                                                            <img src="/static/images/excel.png" v-if="item.fileType=='excel'">
                                                        </td>
                                                        <td>{{item.description}}</td>
                                                        <!-- <td  @click="clickShow($index,{
                                                    concrete:'filesList'
                                                    })">
                                                    <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="files_action" v-show="item.show" >
                                                        <dl>
                                                            <dt @click="adopt(item)">采纳</dt>
                                                        </dl>
                                                    </div>
                                                </td> -->
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="col-md-4 client-line">
                        <h4 class="section_title">详情</h4>
                        <article @click.stop="">
                            <div class="edit-detail">
                                <div class="clearfix">
                                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                        <label class="editlabel">产品名称</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.name}}" disabled="disabled" />
                                    </div>
                                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                        <label class="editlabel">产品类型</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.type}}" disabled="disabled" />
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                        <label class="editlabel">品种名称</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.breedName}}" disabled="disabled" />
                                    </div>
                                    <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                        <label class="editlabel">产品质量</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.quality}}" disabled="disabled" />
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                        <label class="editlabel">产地</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.location}}" disabled="disabled" />
                                    </div>
                                    <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                        <label class="editlabel">数量（库存）</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.number}}" disabled="disabled" />
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                        <label class="editlabel">规格</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.spec}}" disabled="disabled" />
                                    </div>
                                    <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                        <label class="editlabel">价格</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.price}}" disabled="disabled" />
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                        <label class="editlabel">单位</label>
                                        <input type="text" class="form-control edit-input" v-model="initProductDetail.unit | Unit" value="{{initProductDetail.unit}}" disabled="disabled" />
                                    </div>
                                    <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                                        <label class="editlabel">检测报告</label>
                                        <input type="text" class="form-control edit-input" value="{{initProductDetail.coa | coa}}" disabled="disabled" />
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <div class="client-detailInfo  col-xs-12">
                                        <label class="editlabel">价格过期时间</label>
                                        <input type="text" class="form-control edit-input" v-model="initProductDetail.duedate" value="{{initProductDetail.duedate}}" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import {
    initProductDetail
} from '../../vuex/getters'
import {
    getProductDetail
} from '../../vuex/actions'
export default {
    components: {

    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
        }
    },
    props: ['param'],
    vuex: {
        getters: {
            initProductDetail
        },
        actions: {
            getProductDetail
        }
    },
    methods: {
        enfoldment: function(param) {
            if (this.$store.state.table.productDetail[param.crete].arr.length == 0) {
                this.$store.state.table.productDetail[param.crete].show = true;
            }
            this.$store.state.table.productDetail[param.crete].show = !this.$store.state.table.productDetail[param.crete].show;
            console.log(this.$store.state.table.productDetail[param.crete].show)
        }
    },
    created() {
        this.getProductDetail(this.param);
    }
}
</script>
<style scoped>
.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.navbar-img {
    float: left;
    margin-right: 10px;
}

.client-line {
    border-left: 1px solid #ddd;
}

.navbar-name {
    color: #fa6705;
    font-size: 20px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
}

section {
    background-color: #fff;
}

.breed_action {
    top: 20px;
    right: 40px;
}

.files_action {
    position: absolute;
    top: 32px;
    right: 40px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 1000;
    min-width: 80px;
    height: 30px;
    padding: 5px 15px;
    cursor: pointer;
}

.files_action:hover {
    color: #fa6705;
}

.breed_action dl dt {
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}

section article {
    margin-top: 30px;
}

.top-title {
    width: 60%;
    right: 0;
    left: 0;
    top: 91px;
    z-index: 1081;
}

.contactSet thead {
    color: #fa6705;
}

.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
}

.client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
}

.btn-orange {
    background-color: #fa6705;
    color: #fff;
    font-size: 18px;
}

table {
    display: table;
}
</style>

<template>
    <searchsupply-model :param="supplyParam" v-if="supplyParam.show"></searchsupply-model>
    <searchproduct-model :param="productParam" v-if="productParam.show"></searchproduct-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title}}</h3>
        </div>
        <validator name="validation">
          <form novalidate>
            <div class="edit-model">
                <section class="editsection">
                    <div class="editpage-input">
                        <label class="editlabel">文件类型 <span class="system_danger" v-if="$validation.filetype.required">请选择上传文件类型</span></label>
                        <input v-show="false" v-model="param.fileType" v-validate:filetype="['required']" />                        
                        <select class="form-control"  v-model="param.fileType" id="filetype" >
                            <option value="image">图片</option>
                            <option>pdf文件</option>
                            <option>word</option>
                            <option>excel</option>
                        </select>
                    </div>
                    <div class="editpage-input">
                        <label class="editlabel">所属文件类别<span class="system_danger" v-if="$validation.biztype.required">请选择上传文件类型</span></label>
                        <input v-show="false" v-model="param.bizType" v-validate:biztype="['required']" /> 
                        <select class="form-control"  v-model="param.bizType" id="biztype" @change="selectBizType()">
                            <option value="customer_license">客户文件</option>
                            <option value="product_license">产品文件</option>
                        </select>
                    </div>
                    <div class="editpage-input" v-if="param.bizType=='customer_license'">
                        <label class="editlabel">选择供应商 <span class="system_danger" v-if="$validation.supplyer.required">请选择供应商</span></label>
                        <input type="text" class="form-control" v-model="param.name"  readonly="readonly" id="supplyer" v-validate:supplyer="['required']" @click="selectSupply(param.bizId)" />
                    </div>
                    <div class="editpage-input" v-if="param.bizType=='product_license'">
                        <label class="editlabel">选择产品 <span class="system_danger" v-if="$validation.product.required">请选择产品</span></label>
                        <input type="text" class="form-control" v-model="param.name"  readonly="readonly" id="product" v-validate:product="['required']" @click="selectProduct(param.bizId)" />
                    </div>
                    <div class="editpage-input">
                        <label class="editlabel">描述说明</label>
                        <textarea style="width:100%;resize:none;border:1px solid #ddd;border-radius:5px;" rows="5" v-model="param.description">
                            
                        </textarea>
                    </div>
                    <div class="editpage-input">
                        <label class="editlabel">新建文件</label>
                        <press-image :value.sync="param.image_f" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>
                        <press-image :value.sync="param.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>
                        <press-image :value.sync="param.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>

                    </div>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <input type="button" class="btn btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show = false)" value="保存" />
                 <input type="button" class="btn btn-confirm" v-else disabled="true"  value="保存" />
            </div>
          </form>
        </validator>
    </div>
</template>
<script>
import pressImage from '../imagePress'
import searchsupplyModel from '../supply/selectSupply'
import searchproductModel from '../supply/selectProduct'
export default {
    components: {
        pressImage,
        searchsupplyModel,
        searchproductModel
    },
    props: ['param'],
    data() {
        return {
            imageParam:{
                url:'/crm/api/v1/file/',
                qiniu:false
              },
              type:"image/*",
            supplyParam:{
                show:false,
                bizId:'',
                name:''
            },
            productParam:{
                show:false,
                bizId:'',
                name:''
            }
        } 
    },
    methods:{
        selectBizType:function(){
           console.log('addad');
           this.param.name = '';
           if(this.param.bizType=='customer_license'){

           }
           if(this.param.bizType=='product_license'){} 
        },
        selectSupply:function(bizId,name){
            this.supplyParam.show=true;
            if("id" in this.param){
                this.supplyParam.bizId = this.param.id;
            }
        },
        selectProduct:function(bizId,name){
            this.productParam.show=true;
            if("id" in this.param){
                this.productParam.bizId = this.param.id;
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
        },
        supply:function(supply){
            console.log(supply)
            this.param.bizId = supply.cid;
            this.param.name = supply.customerName;
        },
        product:function(supply){
            console.log(supply)
            this.param.bizId = supply.cid;
            this.param.name = supply.customerName;
        },
    }
}
</script>
<style scoped>
.top-title{
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

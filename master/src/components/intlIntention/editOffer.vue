<template>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.raw_material_quotation')}}</h3>
        </div>
        <validator name="validation">
          <div class="edit-model">
            <!--<div class="cover_loading">-->
              <!--<pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>-->
            <!--</div>-->
            <!-- <div class="cover_loading">
              <pulse-loader :loading="breedParam.loading" :color="color" :size="size"></pulse-loader>
            </div> -->
             <section class="editsection" v-cloak>
                 <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
                 <div v-if="true" class="editpage" >
                       <div class="editpageleft">
                          <div class="editpage-input">
                               <label class="editlabel">{{$t('static.breed')}}</label>
                               <input type="text" v-model="param.itemName" class="form-control edit-input" disabled="true" />
                          </div>  
                          <div class="editpage-input" >
                               <label class="editlabel">{{$t('static.cost')}}（{{param.currency | Currency}}）<span class="system_danger" v-if="$validation.origprice.required">{{$t('static.required')}}</span></label>
                               <input type="number" v-model="param.origPrice" class="form-control edit-input" v-validate:origprice="{required:true}" />
                          </div>
                          <div class="editpage-input">
                               <label class="editlabel" >{{$t('static.currency')}}</label>
                               <select type="text" class="form-control edit-input" v-model="param.currency">
                                  <option  value="2" selected>USD（美元）</option>
                                   <option v-for="item in initCurrencylist"  value="{{item.id}}">{{item.name}}（{{item.cname}}）</option>
                               </select>
                          </div>
                       </div>
                       <div class="editpageright">
                          <div class="editpage-input" v-if="param.number==null">
                               <label class="editlabel" >{{$t('static.quantity')}}<span class="system_danger" v-if="$validation.number.required">{{$t('static.required')}}</span></label>
                               <p class="clearfix">
                                  <input type="number" value="{{param.number}}" v-model="param.number" class="form-control edit-input" style="width:80%; float: left;" v-validate:number="{required:true}"/>（{{param.unit | Unit}}）
                               </p>
                          </div>
                          <div class="editpage-input" v-if="param.number!=null">
                               <label class="editlabel" >{{$t('static.quantity')}}（{{param.unit | Unit}}）<span class="system_danger" v-if="$validation.number.required">{{$t('static.required')}}</span></label>
                                <input type="number" value="{{param.number}}" v-model="param.number" class="form-control edit-input"  v-validate:number="{required:true}" disabled="true" />
                          </div>
                          <div class="editpage-input">
                               <label class="editlabel" >{{$t('static.quoted_price')}}（{{param.currency | Currency}}）<span class="system_danger" v-if="$validation.price.required">{{$t('static.required')}}</span></label>
                               <input type="number" v-model="param.price" class="form-control edit-input" v-validate:price="{required:true}" />
                          </div>
                          
                       </div> 
                  </div> 
             </section>
             <div class="col-md-12" style="padding:0;">
                 <label class="editlabel" >{{$t('static.comment')}}</label>
                 <!-- <input type="text" v-model="param.comment" class="form-control edit-input"  /> -->
                 <textarea v-model="param.comment" rows="6" style="resize: none;border:1px solid #ddd;width:100%;"class="form-control"></textarea>
            </div>
          </div>
          <div class="edit_footer">
              <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
              <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confrim()">{{$t('static.confirm')}}</button>
              <button type="button" class="btn  btn-confirm" v-else disabled="disabled">{{$t('static.confirm')}}</button>
          </div>
        </validation>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import inputSelect from '../tools/vueSelect/components/inputselect'
import tipdialogModel from '../tips/tipDialog'
import pressImage from '../imagePress'
import {
    initUnitlist,
    initIntlIntentionDetail,
    initCurrencylist
} from '../../vuex/getters'
import {
    getUnitList,
    getIntlIntentionDetail,
    intlIntentionOffer,
    getCurrencyList
} from '../../vuex/actions'
export default {
    components: {
        vSelect,
        inputSelect,
        tipdialogModel,
        pressImage
    },
    props: ['param'],
    data() {
        return {
          loadParam:{
            loading:false,
            size:'15px',
            
          },
          tipParam:{
              show:false,
              name:'',
              remain:true,
              callback:this.callback
          },
          updateParam:{
            show:false,
            index:0
          },
          offerInfo:{ 
              link:'/intlIntention/itemOffer',
              id:'',
              intentionId:'',
              inquireId:'',
              type:'',
              currency:'',
              itemId:'',
              itemName:'',
              origPrice:'',
              price:'',
              number:'',
              unit:'',
              total:'',
              comment:''
          },
          
          tag:['真空包装','瓦楞纸箱','编织袋','积压包','其它'],
            
          imageParam:{
            url:'/crm/api/v1/file/',
            qiniu:false
          },
          type:"image/*"
        }
    },
    vuex: {
       getters: {
          initUnitlist,
          initIntlIntentionDetail,
          initCurrencylist
        },
        actions: {
          getUnitList,
          getIntlIntentionDetail,
          intlIntentionOffer,
          getCurrencyList
        }
    },
    methods: {
      
      confrim:function(){
        this.param.callback=this.param.callback;
        this.param.show = false;
        this.intlIntentionOffer(this.param);
      }
  
    },
    events:{
        
    },
    created(){
      this.getUnitList(this.loadParam);
      this.getCurrencyList();
    }
}
</script>
<style scoped>
.modal{
  z-index: 1083
}
.modal_con{
  z-index: 1084;
  width: 662px;
  height: 662px;
}

.edit-model {
  padding: 10px 30px 80px 30px;
}

.top-title{
    position: absolute;
    top: 0;
    right:0;
    width: 662px;
}
.edit_footer{
  position: absolute;
  bottom:0;
  width: 662px;
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

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpagecenter{
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  width: 100%;
}


.editpage-input {
    margin-top: 15px;
}

.edit-input {
    height: 36px;
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

a{
    cursor:pointer;
}
</style>

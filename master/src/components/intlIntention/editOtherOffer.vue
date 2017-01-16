<template>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.other_quotations')}}</h3>
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
                               <label class="editlabel" >{{$t('static.currency')}}<span class="system_danger" v-if="$validation.currency.required">{{$t('static.required')}}</span></label>
                               <input v-show="false" type="text" v-model="param.currency" class="form-control edit-input" v-validate:currency="{required:true}"/>
                               <select type="text" class="form-control edit-input" v-model="param.currency">
                                 <option v-for="item in initCurrencylist"  value="{{item.id}}">{{item.name}}（{{item.cname}}）</option>
                               </select>
                          </div>
                          
                          <div class="editpage-input">
                               <label class="editlabel" >{{$t('static.expense_explanation')}}<span class="system_danger" v-if="$validation.expense.required">{{$t('static.required')}}</span></label>
                               <input type="text" v-show="false" v-model="param.costDesc" class="form-control edit-input" v-validate:expense="{required:true}" />
                               <select v-model="param.costDesc" class="form-control edit-input">
                                  <option>{{$t('static.sea_fee')}}</option>
                                  <option>{{$t('static.air_fee')}}</option>
                                  <option>{{$t('static.cour_fee')}}</option>
                                  <option>{{$t('static.premium')}}</option>
                                  <option>{{$t('static.other_fee')}}</option>
                               </select>
                          </div>
                       </div>
                   
                       <div class="editpageright">
                          <div class="editpage-input">
                               <label class="editlabel" >{{$t('static.expense')}}<span class="system_danger" v-if="$validation.cost.required">{{$t('static.required')}}</span></label>
                               <input type="number" v-model="param.cost" class="form-control edit-input" v-validate:cost="{required:true}" />
                          </div>
                          
                          <div class="editpage-input">
                               <label class="editlabel" >{{$t('static.comment')}}</label>
                               <input type="text" v-model="param.comment" class="form-control edit-input"  />
                          </div> 
                       </div>
                 </div>  
                

             </section>
          </div>
          <div class="edit_footer">
              <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
              <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm()">{{$t('static.confirm')}}</button>
              <button type="button" class="btn  btn-confirm" v-else disabled='disabled'>{{$t('static.confirm')}}</button>
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
    initCurrencylist,
    initIntlIntentionDetail
} from '../../vuex/getters'
import {
    getCurrencyList,
    getIntlIntentionDetail,
    intlIntentionOtherOffer
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
          tipParam:{
              show:false,
              name:'',
              remain:true,
          },
          
          addParam:{
            show:false,
          },

          updateParam:{
            show:false,
            index:0
          },
          offerInfo:{ 
              link:'/intlIntention/otherOffer',
              id:'',
              intentionId:'',
              inquireId:'',
              type:'',
              currency:'',
              cost:'',
              costDesc:'',
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
          initCurrencylist,
          initIntlIntentionDetail
        },
        actions: {
          getCurrencyList,
          getIntlIntentionDetail,
          intlIntentionOtherOffer
        }
    },
    methods: { 
      confirm:function(){
        this.param.show = false;
        this.param.callback = this.param.callback;
        this.param.getIntentionDetail = this.getIntentionDetail;
        this.intlIntentionOtherOffer(this.param);
      },
      getIntentionDetail:function(param){
        this.getIntlIntentionDetail(param);
      },

    },
    events:{
        
    },
    created(){
      console.log(this.param);
      this.getCurrencyList();
      //在这里要有查询原材料报价的接口
      this.param.items = [{id:12,
                intentionId:'58228a6688e87dc057d5e969',
                inquireId:7,
                type:1,
                currency:1,
                cost:2,
                costDesc:'运费+小费',
                total:2,
                comment:'啦啦啦'}
            ]
      
    }
}
</script>
<style scoped>
.modal{
  z-index: 1083
}
.modal_con{
  z-index: 1084;
  bottom:300px;
}

.edit-model {
  padding: 10px 30px 80px 30px;
}

.top-title{
    position: absolute;
    top: 0;
    right:0;
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

.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
   /*  margin-top: 50px; */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 300px;
    width: 800px;
    background: #fff;
    margin: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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

a{
    cursor:pointer;
}
</style>

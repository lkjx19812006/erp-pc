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
                
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                         <tr>
                            
                           <th>{{$t('static.currency')}}</th>
                           <th>{{$t('static.expense')}}</th>
                           <th>{{$t('static.expense_explanation')}}</th>
                           <th>{{$t('static.comment')}}</th> 
                           <th></th> 
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in param.items">
                             
                             <td>{{item.currency | Currency}}</td>
                             <td>{{item.cost}}</td>
                             <td>{{item.costDesc}}</td>
                             <td>{{item.comment}}</td>
                             <td @click="showModifyOffer($index)"><a v-if="!addParam.show">{{$t('static.edit')}}</a></td>
                             
                             
                         </tr>
                     </tbody>
                 </table>
                <div style="padding-left:25%">
                     <div v-if="!updateParam.show" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showAddOffer()">{{$t('static.other_quotations')}}</div>   
                 </div> 
                  
                 <validator name="inner">   
                     <div v-if="updateParam.show||addParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                           <div class="editpageleft">
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.currency')}}<span class="system_danger" v-if="$inner.currency.required">{{$t('static.required')}}</span></label>
                                   <input v-show="false" type="text" v-model="offerInfo.currency" class="form-control edit-input" v-validate:currency="{required:true}"/>
                                   <select type="text" class="form-control edit-input" v-model="offerInfo.currency">
                                     <option value="0">CNY人民币</option>
                                     <option value="1">USD美元</option>
                                     <option value="2">EUR欧元</option>
                                     <option value="3">HKD港币</option>
                                     <option value="4">GBP英镑</option>
                                     <option value="5">JPY日元</option>
                                     <option value="6">KRW韩元</option>
                                     <option value="7">CAD加元</option>
                                     <option value="8">AUD澳元</option>
                                     <option value="9">CHF瑞郎</option>
                                     <option value="10">SGD新加坡元</option>
                                     <option value="11">MYR马来西亚币</option>
                                     <option value="12">IDR印尼</option>
                                     <option value="13">NZD新西兰</option>
                                     <option value="14">VND越南</option>
                                     <option value="15">THB泰铢</option>
                                     <option value="16">PHP菲律宾</option>
                                   </select>
                              </div>
                              
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.expense_explanation')}}<span class="system_danger" v-if="$inner.costdesc.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="offerInfo.costDesc" class="form-control edit-input" v-validate:costdesc="{required:true}" />
                              </div>
                              
                              
                           </div>
                       
                           <div class="editpageright">

                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.expense')}}<span class="system_danger" v-if="$inner.cost.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="offerInfo.cost" class="form-control edit-input" v-validate:cost="{required:true}" />
                              </div>
                              
                              <div class="editpage-input">
                                   <label class="editlabel" >{{$t('static.comment')}}<span class="system_danger" v-if="$inner.comment.required">{{$t('static.required')}}</span></label>
                                   <input type="text" v-model="offerInfo.comment" class="form-control edit-input" v-validate:comment="{required:true}" />
                              </div>
                    
                    
                                            
                              <div style="margin-top:10px;text-align:right">
                                  <button type="button" class="btn btn-confirm" @click="updateParam.show=false,addParam.show=false">
                                      {{$t('static.cancel')}}
                                  </button>
                                  <button type="button" class="btn btn-confirm" v-if="$inner.valid" @click="modifyOffer()">
                                      {{$t('static.save')}}
                                  </button>
                                  <button type="button" class="btn btn-confirm" v-else disabled="disabled">{{$t('static.save')}}</button>
                                  
                              </div>
                              
                           </div>
                     </div>  
                 </validator> 

                 

             </section>
          </div>
          <div class="edit_footer">
              <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
              <button type="button" class="btn  btn-confirm" @click="param.show = false">{{$t('static.confirm')}}</button>
          </div>
        </validator>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import inputSelect from '../tools/vueSelect/components/inputselect'
import tipdialogModel from '../tips/tipDialog'
import pressImage from '../imagePress'
import {
    
    initIntlIntentionDetail
} from '../../vuex/getters'
import {
    
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
              callback:this.callback
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
          
          initIntlIntentionDetail
        },
        actions: {
          
          getIntlIntentionDetail,
          intlIntentionOtherOffer
        }
    },
    methods: {
      showAddOffer:function(){
          this.offerInfo.id='',
          this.offerInfo.intentionId='',
          this.offerInfo.inquireId='',
          this.offerInfo.type='',
          this.offerInfo.currency='',
          
          this.offerInfo.cost='',
          this.offerInfo.costDesc='',

          this.offerInfo.total='',
          this.offerInfo.comment='',
          this.param.items.push({
              id:'',
              intentionId:'',
              inquireId:'',
              inquireId:'',
              type:'',
              currency:'',
              cost:'',
              total:'',
              comment:''
          });
          this.addParam.show = true;
      },
      
      showModifyOffer:function(index){
          this.offerInfo.id=this.param.items[index].id,
          this.offerInfo.intentionId=this.param.items[index].intentionId,
          this.offerInfo.inquireId=this.param.items[index].inquireId,
          this.offerInfo.type=this.param.items[index].type,
          this.offerInfo.currency=this.param.items[index].currency,
          
          this.offerInfo.cost=this.param.items[index].cost,
          this.offerInfo.costDesc=this.param.items[index].costDesc,

          this.offerInfo.total=this.param.items[index].total,
          this.offerInfo.comment=this.param.items[index].comment,
          this.updateParam.index = index;
          this.updateParam.show = true;
      },
      modifyOffer:function(){
          var index = this.updateParam.index;
          this.param.items[index].id=this.offerInfo.id,
          this.param.items[index].intentionId=this.offerInfo.intentionId,
          this.param.items[index].inquireId=this.offerInfo.inquireId,
          this.param.items[index].type=this.offerInfo.type,
          this.param.items[index].currency=this.offerInfo.currency,

          this.param.items[index].cost=this.offerInfo.cost,
          this.param.items[index].costDesc=this.offerInfo.costDesc,
          
          this.param.items[index].total=this.offerInfo.total,
          this.param.items[index].comment=this.offerInfo.comment, 
          this.intlIntentionOtherOffer(this.offerInfo);
          this.updateParam.show = false;
      },
      

      cancelModifyBreed:function(){
          this.param.items.pop();
          this.updateParam.show = false; 
      },
      
      
      

    },
    events:{
        
    },
    created(){
      console.log(this.param);
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
  z-index: 1084
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
    bottom: 50px;
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

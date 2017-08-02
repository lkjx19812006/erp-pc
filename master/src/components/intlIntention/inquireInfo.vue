<template>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.inquiry_record')}}</h3>
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
                <div style="margin-top:5px;margin-bottom: 5px;">
                   <img src="/static/images/sellerinfo@2x.png" style="display:inline"/>
                   <h5 style="display:inline">{{$t('static.raw_material_quotation')}}</h5>
                </div> 
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                         <tr>
                           <th>{{$t('static.breed')}}</th> 
                           <th>{{$t('static.currency')}}</th>
                           <th v-if="param.showCost">{{$t('static.cost_price')}}</th>
                           <th>{{$t('static.quoted_price')}}</th>
                           <th>{{$t('static.quantity')}}（{{$t('static.unit')}}）</th> 
                           <th>{{$t('static.quatation_name')}}</th>
                           <th>{{$t('static.comment')}}</th>
                           <th>{{$t('static.evaluation')}}</th>
                           <th>{{$t('static.create_time')}}</th>  
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in initIntlIntentionInquireDetail.offers">
                             <td>{{item.itemName}}</td>
                             <td>{{item.currency | Currency}}</td>
                             <td v-if="param.showCost">{{item.origPrice}}</td>
                             <td>{{item.price}}</td>
                             <td>{{item.number}}（{{item.unit | Unit}}）</td>
                             <td>{{item.offererName}}</td>
                             <td>{{item.comment}}</td>
                             <td>
                            <Poptip placement="right-start" trigger="hover" style="z-index:1000000" >
                                <span v-if="item.evaluation!=''">{{item.evaluation | textDisplay '4'}}</span>
                                <span v-else>{{$t('static.unvalued')}}</span>
                               <div slot="content" style="color:green;white-space:normal;width:150px;">
                                {{item.evaluation}}
                                </div>
                            </Poptip> 
                              </td>
                             <td>{{item.ctime}}</td>
                                           
                         </tr>
                     </tbody>
                 </table>
                <!--  <div style="padding-left:25%">
                     <div v-if="breedInfo.status==0" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showAddBreed()">添加药材信息</div>   
                 </div>   --> 
                 <div style="margin-top:5px;margin-bottom: 5px;">
                   <img src="/static/images/sellerinfo@2x.png" style="display:inline"/>
                   <h5 style="display:inline">{{$t('static.extractive_information')}}</h5>
                </div> 
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                         <tr>
                           <th>{{$t('static.breed')}}</th> 
                           <th>{{$t('static.currency')}}</th>
                           <th>{{$t('static.cost_price')}}</th>
                           <th>{{$t('static.quoted_price')}}</th>
                           <th>{{$t('static.quantity')}}（{{$t('static.unit')}}）</th> 
                           <th>{{$t('static.quatation_name')}}</th>
                           <th>{{$t('static.comment')}}</th>
                           <th>{{$t('static.evaluation')}}</th>
                           <th>{{$t('static.create_time')}}</th>  
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in initIntlIntentionInquireDetail.otherOffers">
                             <td v-if="item.type==2">{{item.itemName}}</td>
                             <td v-if="item.type==2">{{item.currency | Currency}}</td>
                             <td v-if="item.type==2">{{item.origPrice}}</td>
                             <td v-if="item.type==2">{{item.price}}</td>
                             <td v-if="item.type==2">{{item.number}}（{{item.unit | Unit}}）</td>
                             <td v-if="item.type==2">{{item.offererName}}</td>
                             <td v-if="item.type==2">{{item.comment}}</td>
                             <td v-if="item.type==2">
                            <Poptip placement="right-start" trigger="hover"  >
                                <span v-if="item.evaluation!=''">{{item.evaluation | textDisplay '4'}}</span>
                                <span v-else>{{$t('static.unvalued')}}</span>
                               <div slot="content" style="color:green;white-space:normal;width:150px;">
                                {{item.evaluation}}
                                </div>
                            </Poptip>
                              </td>
                             <td v-if="item.type==2">{{item.ctime}}</td>
                                           
                         </tr>
                     </tbody>
                 </table>
        


                  <div style="margin-top:25px;margin-bottom: 5px;">
                   <img src="/static/images/sellerinfo@2x.png" style="display:inline"/>
                   <h5 style="display:inline">{{$t('static.other_quotations')}}</h5>
                </div> 
                 
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                         <tr>
                           <th>{{$t('static.expense')}}</th> 
                           <th>{{$t('static.currency')}}</th>
                           <th>{{$t('static.expense_explanation')}}</th>
                           <th>{{$t('static.comment')}}</th>
                           <th>{{$t('static.evaluation')}}</th>
                           <th>{{$t('static.create_time')}}</th>  
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in initIntlIntentionInquireDetail.otherOffers">
                             <td v-if="item.type==1">{{item.cost}}</td>
                             <td v-if="item.type==1">{{item.currency | Currency}}</td>
                             <td v-if="item.type==1">{{item.costDesc}}</td>
                             <td v-if="item.type==1">{{item.comment}}</td>
                             <td v-if="item.type==1">
                            <Poptip placement="right-start" trigger="hover"  >
                                <span v-if="item.evaluation!=''">{{item.evaluation | textDisplay '4'}}</span>
                                <span v-else>{{$t('static.unvalued')}}</span>
                               <div slot="content" style="color:green;white-space:normal;width:150px;">
                                {{item.evaluation}}
                                </div>
                             </Poptip>
                            </td v-if="item.type==1">
                             <td v-if="item.type==1">{{item.ctime}}</td>
                             
                         </tr>
                     </tbody>
                 </table>
                  
                
                 

             </section>
          </div>
          <div class="edit_footer">
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
    
    initIntlIntentionInquireDetail
} from '../../vuex/getters'
import {
    getIntlIntentionInquireDetail,
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
          
          initIntlIntentionInquireDetail
        },
        actions: {
          
          getIntlIntentionInquireDetail
          
        }
    },
    methods: {
      
      
      

      
      
      

    },
    events:{
        
    },
    created(){
      //在这里要有查询询价详情的
      this.getIntlIntentionInquireDetail(this.param);
      
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

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}
.table{
  display: table;
}

a{
    cursor:pointer;
}
</style>

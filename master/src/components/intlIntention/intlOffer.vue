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

                 <div class="editpage">
                     <!-- <div class="editpageleft">
                     
                       <div class="editpage-input">
                         <label class="editlabel">包装<span v-if="$validation.pack.required" class="system_danger">请输入包装要求</span></label>
                         <input type="text" v-model='param.pack' v-validate:pack="['required']" class="form-control edit-input"  />
                       </div>
                     
                     </div> -->

                     <!-- <div class="editpageright">
                      
                       <div class="editpage-input">
                         <label class="editlabel">过期时间<span v-if="$validation.duedate.required" class="system_danger">请选择过期时间</span></label>
                         <input v-show="false" v-model="param.duedate" v-validate:duedate="['required']"/>
                         <mz-datepicker :time.sync="param.duedate" format="yyyy-MM-dd HH:mm:ss" class="a">
                         </mz-datepicker>
                         <button type="button" class="btn btn-default" height="24" width="24" @click="reset()">清空</button>
                       </div>
                       
                     </div> -->


                 </div>

                <!--  <div style="margin-top:25px">
                   <img src="/static/images/sellerinfo@2x.png" style="display:inline"/>
                   <h4 style="display:inline">药材信息</h4>
                </div> -->
                 
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                         <tr>
                           <th>品种名称</th> 
                           <th>货币类型</th>
                           <th>成本价格</th>
                           <th>报价</th>
                           <th>单位</th>
                           <th>数量</th> 
                           <th>备注</th> 
                           <th></th> 
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in param.items">
                             <td>{{item.itemName}}</td>
                             <td>{{item.currency | Currency}}</td>
                             <td>{{item.origPrice}}</td>
                             <td>{{item.price}}</td>
                             <td>{{item.unit}}</td>
                             <td>{{item.number}}</td>
                             <td>{{item.comment}}</td>
                             <td @click="showModifyOffer($index)"><a>编辑</a></td>
                             
                             
                         </tr>
                     </tbody>
                 </table>
                <!--  <div style="padding-left:25%">
                     <div v-if="breedInfo.status==0" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showAddBreed()">添加药材信息</div>   
                 </div>   --> 
                  
                 <validator name="inner">   
                     <div v-if="updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                           <div class="editpageleft">
                              <div class="editpage-input">
                                   <label class="editlabel">品种名称</label>
                                   <input type="text" v-model="offerInfo.itemName" class="form-control edit-input" disabled="true" />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >成本价格<span class="system_danger" v-if="$inner.origprice.required">必填项</span></label>
                                   <input type="text" v-model="offerInfo.origPrice" class="form-control edit-input" v-validate:origprice="{required:true}"/>
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >单位<span class="system_danger" v-if="$inner.unit.required">必填项</span></label>
                                   <input type="text" v-model="offerInfo.unit" class="form-control edit-input" v-validate:unit="{required:true}"/>
                              </div>

                              <div class="editpage-input">
                                   <label class="editlabel" >备注<span class="system_danger" v-if="$inner.comment.required">必填项</span></label>
                                   <input type="text" v-model="offerInfo.comment" class="form-control edit-input" v-validate:comment="{required:true}" />
                              </div>
                              
                           </div>
                       
                           <div class="editpageright">
                              <div class="editpage-input">
                                   <label class="editlabel" >货币类型<span class="system_danger" v-if="$inner.currency.required">必填项</span></label>
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
                                   <label class="editlabel" >报价<span class="system_danger" v-if="$inner.price.required">必填项</span></label>
                                   <input type="text" v-model="offerInfo.price" class="form-control edit-input" v-validate:price="{required:true}" />
                              </div>
                       
                              <div class="editpage-input">
                                   <label class="editlabel" >数量<span class="system_danger" v-if="$inner.number.required">必填项</span></label>
                                   <input type="text" v-model="offerInfo.number" class="form-control edit-input" v-validate:number="{required:true}"/>
                              </div>
                    
                                            
                              <div style="margin-top:10px;text-align:right">
                                  <button type="button" class="btn btn-confirm" @click="updateParam.show=false">
                                      取消
                                  </button>
                                  <button type="button" class="btn btn-confirm" v-if="$inner.valid" @click="modifyOffer()">
                                      保存
                                  </button>
                                  <button type="button" class="btn btn-confirm" v-else disabled="disabled">保存</button>
                                  
                              </div>
                              
                           </div>
                     </div>  
                 </validator> 

                 

             </section>
          </div>
          <div class="edit_footer">
              <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
              <button type="button" class="btn  btn-confirm" @click="param.show = false">确定</button>
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
    intlIntentionOffer
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
          
          initIntlIntentionDetail
        },
        actions: {
          
          getIntlIntentionDetail,
          intlIntentionOffer
        }
    },
    methods: {
      
      
      showModifyOffer:function(index){
          this.offerInfo.id=this.param.items[index].id,
          this.offerInfo.intentionId=this.param.items[index].intentionId,
          this.offerInfo.inquireId=this.param.items[index].inquireId,
          this.offerInfo.type=this.param.items[index].type,
          this.offerInfo.currency=this.param.items[index].currency,
          this.offerInfo.itemId=this.param.items[index].itemId,
          this.offerInfo.itemName=this.param.items[index].itemName,
          this.offerInfo.origPrice=this.param.items[index].origPrice,
          this.offerInfo.price=this.param.items[index].price,
          this.offerInfo.number=this.param.items[index].number,
          this.offerInfo.unit=this.param.items[index].unit,
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
          this.param.items[index].itemId=this.offerInfo.itemId,
          this.param.items[index].itemName=this.offerInfo.itemName,
          this.param.items[index].origPrice=this.offerInfo.origPrice,
          this.param.items[index].price=this.offerInfo.price,
          this.param.items[index].number=this.offerInfo.number,
          this.param.items[index].unit=this.offerInfo.unit,
          this.param.items[index].total=this.offerInfo.total,
          this.param.items[index].comment=this.offerInfo.comment, 
          this.intlIntentionOffer(this.offerInfo);
          this.updateParam.show = false;
      },
      

      cancelModifyBreed:function(){
  
          this.updateParam.show = false; 
      },
      
      
      

    },
    events:{
        
    },
    created(){
      //在这里要有查询原材料报价的接口
      this.param.items = [{id:9,
              intentionId:'58228a6688e87dc057d5e969',
              inquireId:7,
              type:0,
              currency:1,
              itemId:8,
              itemName:'一枝黄花',
              origPrice:1,
              price:3,
              number:3,
              unit:'kg',
              total:9,
              comment:'来来来'},
              {id:10,
              intentionId:'58228a6688e87dc057d5e969',
              inquireId:7,
              type:0,
              currency:1,
              itemId:8,
              itemName:'丁公藤',
              origPrice:1,
              price:3,
              number:3,
              unit:'kg',
              total:9,
              comment:'嘿嘿嘿'}
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

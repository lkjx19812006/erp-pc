<template>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>条目历史报价</h3>
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
                     


                 </div>

                <div style="margin-top:25px">
                   <!-- <img src="/static/images/sellerinfo@2x.png" style="display:inline"/> -->
                   <h4 style="display:inline"></h4>
                </div> 
                 
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
                           <th>创建时间</th> 
                           
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in initItemHistory">
                             <td>{{item.itemName}}</td>
                             <td>{{item.currency | Currency}}</td>
                             <td>{{item.origPrice}}</td>
                             <td>{{item.price}}</td>
                             <td>{{item.unit}}</td>
                             <td>{{item.number}}</td>
                             <td>{{item.comment}}</td>
                             <td>{{item.ctime}}</td>
                             
                             
                             
                         </tr>
                     </tbody>
                 </table>
               
               <!--  <div style="margin-top:25px">
                  <img src="/static/images/sellerinfo@2x.png" style="display:inline"/>
                  <h4 style="display:inline">其他报价</h4>
               </div> 
                
                <table class="table table-hover table_color table-striped ">
                    <thead>
                        <tr>
                          <th>费用</th> 
                          <th>币种</th>
                          <th>费用描述</th>
                          <th>备注</th>
                          
                          
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initItemHistory.otherOffers">
                            <td>{{item.cost}}</td>
                            <td>{{item.currency | Currency}}</td>
                            <td>{{item.costDesc}}</td>
                            <td>{{item.comment}}</td>
                            
                        </tr>
                    </tbody>
                </table>
                  -->
                
                 

             </section>
          </div>
          <div class="edit_footer">
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
    initItemHistory
} from '../../vuex/getters'
import {
    getIntlItemHistory,
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
          initItemHistory
         
        },
        actions: {
          
          getIntlItemHistory
          
        }
    },
    methods: {
      
      
      

      
      
      

    },
    events:{
        
    },
    created(){
      //在这里要有查询询价详情的
      this.getIntlItemHistory(this.param);
      
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

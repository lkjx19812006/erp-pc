<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div class="top-title">
            <span class="glyphicon glyphicon-remove-circle" @click="param.show=false"></span>
        </div>
        <div class="edit-content">
            <h3>分期付款</h3>
        </div>
        <validator name="validation">
          <form novalidate>
            <div class="edit-model">
                <div>
                    <h4 style="text-align: left;font-size: 14px;">分期信息<span class="system_danger"> 请将所有的分期填写完整才可以提交哦</span></h4>
                    <table class="table table-hover table_color table-striped ">
                        <thead>
                            <tr>
                                <th>分期金额</th>
                                <th>分期比例</th>
                                <th>分期支付时间</th>
                                <th>额外支付时间</th>
                                <th>分期说明</th>
                                <th>申请备注</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in param.stages">
                                <td>{{item.amount}}</td>
                                <td>{{item.ratio}}</td>
                                <td>{{item.orderStatus}}</td>
                                <td>{{item.extra}}</td>
                                <td>{{item.description}}</td>
                                <td>{{item.comment}}</td>
                                <td v-if="(breedInfo.status==0||breedInfo.status==2)&&this.sum <= this.param.total*100" @click="showModifyBreed($index)"><a>{{$t('static.edit')}}</a></td>
                                <td v-else>{{$t('static.edit')}}</td>
                                <td v-if="breedInfo.status==0" @click="deleteBreed($index)"><a>{{$t('static.del')}}</a></td>
                                <td v-else>{{$t('static.del')}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="padding-left:25%">
                       <div v-if="breedInfo.status==0&&this.sum < this.param.total*100" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0;cursor:pointer" @click="showAddBreed()">添加支付分期</div> 
                         
                    </div>
                    <validator name="inner">   
                       <div v-if="addParam.show||updateParam.show" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                             <div class="clearfix">
                                <div class="editpage-input col-md-6">
                                     <label class="editlabel">分期支付时间 <span class="system_danger" v-if="$inner.status.required">{{$t('static.required')}}</span></label>
                                     <select v-model="breedInfo.orderStatus" class="form-control edit-input" v-validate:status="{required:true}">
                                        <option  value="20">合同签订后</option>
                                        <option  value="60">已确认收货</option>
                                        <option  value="70">已完成订单</option>
                                     </select>
                                </div>
                                <div class="editpage-input col-md-6">
                                     <label class="editlabel">分期比例<span class="system_danger" v-if="breedInfo.ratio==''">{{$t('static.required')}}</span>
                                     <span class="system_danger" v-if="((breedInfo.ratio)*10) > (10-scale)">分期比例不能超过100%</span></label>
                                     <select v-model="breedInfo.ratio" class="form-control edit-input" v-validate:ratio="{required:true}" @change="calculate()">
                                        <option  value="1">全额付款</option>
                                        <option  value="0.1">10%</option>
                                        <option  value="0.2">20%</option>
                                        <option  value="0.3">30%</option>
                                        <option  value="0.4">40%</option>
                                        <option  value="0.5">50%</option>
                                        <option  value="0.6">60%</option>
                                        <option  value="0.7">70%</option>
                                        <option  value="0.8">80%</option>
                                        <option  value="0.9">90%</option>
                                     </select>
                                </div>
                                <div class="editpage-input col-md-6">
                                     <label class="editlabel" >分期金额 <span class="system_danger" v-if="breedInfo.amount==''">{{$t('static.required')}}</span>
                                     <span class="system_danger" v-if="breedInfo.amount*100>(param.total*100-sum)">不能超过订单总金额</span></label>
                                     <input type="number" v-if="breedInfo.ratio==1" v-model="breedInfo.amount" value="{{param.total}}" class="form-control edit-input"   />
                                     <input type="number" v-else v-model="breedInfo.amount"  value="{{breedInfo.amount}}" class="form-control edit-input" v-validate:amount="{required:true}"  />
                                </div>
                                
                                <div class="editpage-input col-md-6">
                                     <label class="editlabel">额外支付时间 <span class="system_danger" v-if="$inner.extral.required">{{$t('static.required')}}</span></label>
                                     <input type="text" v-model="breedInfo.extra" class="form-control edit-input" v-validate:extral="{required:true}"  style="width:95%;float:left" /> <span> 天</span>
                                </div>
                                <div class="editpage-input col-md-12">
                                     <label class="editlabel">分期说明<span class="system_danger" v-if="$inner.description.required">{{$t('static.required')}}</span></label>
                                     <textarea class="form-control" v-model="breedInfo.description" value="{{breedInfo.description}}" style="resize:none; border:1px solid #ddd;" rows="5" v-validate:description="{required:true}"></textarea>
                                </div>  
                                <div class="client-detailInfo  col-md-12">
                                    <label class="editlabel">申请备注</label>
                                    <textarea class="form-control" v-model="breedInfo.comment" value="{{breedInfo.comment}}" style="resize:none; border:1px solid #ddd;" rows="5" ></textarea>
                                </div>
                                    
                                <div class="pull-right col-md-6" style="margin-top:10px;text-align:right">
                                    <button type="button" class="btn btn-confirm">
                                        <div v-if="breedInfo.status==1" @click="cancelAddBreed()">{{$t('static.cancel')}}</div>
                                        <div v-if="breedInfo.status==2" @click="cancelModifyBreed()">{{$t('static.cancel')}}</div>
                                    </button>

                                    <button type="button" class="btn btn-confirm" v-if="$inner.valid&&(param.total*100-sum-breedInfo.amount*100)>=0">
                                        <div v-if="breedInfo.status==1" @click="addBreed()">{{$t('static.save')}}</div>
                                        <!-- <div v-if="(breedInfo.status==1||breedInfo.status==2)&&this.sum > this.param.total" @click="addBreed()">{{$t('static.save')}}</div> -->
                                        <div v-if="breedInfo.status==2" @click="modifyBreed()">{{$t('static.save')}}</div>
                                    </button>
                                    <button type="button" class="btn btn-confirm" v-else  disabled="true">{{$t('static.save')}}</button>
                                    
                                </div>  
                             </div>
                       </div>  
                    </validator> 
                </div>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="closeInfo()">{{$t('static.cancel')}}</button>
                <button type="button" class="btn  btn-confirm"  v-if="$validation.valid&&param.stages.length>0&&sum == param.total*100"  @click="confirm()">{{$t('static.confirm')}}</button>
                <!-- <button type="button" class="btn  btn-confirm"  v-if="$validation.valid&&param.stages.length>0&&this.sum!=this.param.total"  disabled="true">总金额不对</button> -->
                <button type="button" class="btn  btn-confirm" v-else  disabled="true">{{$t('static.confirm')}}</button>
            </div> 
          </form>
        </validator>
    </div>

</template>
<script>
    import {
        initOrderDetail
    } from '../../../vuex/getters'
    import {
        dividedPayment,
        getOrderDetail
    } from '../../../vuex/actions'
	export default{
		props:['param'],
        vuex:{
            actions:{
                dividedPayment,
                getOrderDetail
            },
            getters:{
                initOrderDetail
            }
        },
        data(){
            return{
                breedInfo:{ 
                  status:0,   //自定义状态，表示编辑框的状态，0表示收起(起始)状态，1表示add，2表示update，add或update结束后将status置为0
                  amount:'',
                  ratio:'',
                  description:'',
                  orderStatus:'',
                  comment:'',
                  extra:''
                },
                addParam:{
                  show:false,
                  length:0
                },
                updateParam:{
                  show:false,
                  index:0
                },
                sum:0,   //数组金额之和
                scale:0,   //数组金额比例之和 
                modifySum:0,   //用于取消修改后，还原sum
                modifyScale:0,   //用于取消修改后，还原scale

            }
        },
        methods:{
            showModifyBreed:function(index){
              //必须先循环数组，计算sum和scale
              this.sum = 0;
              this.scale = 0;
              for(var i=0;i < this.param.stages.length;i++){
                 this.sum +=parseFloat(this.param.stages[i].amount)*100;
                 this.scale +=parseInt(this.param.stages[i].ratio*10);
              }
              this.modifySum = this.sum;
              this.modifyScale = this.scale;
              this.breedInfo.status = 2;
              this.updateParam.index = index;
              this.breedInfo.amount=this.param.stages[index].amount;
              this.breedInfo.ratio=this.param.stages[index].ratio;
              this.breedInfo.description=this.param.stages[index].description;
              this.breedInfo.orderStatus=this.param.stages[index].orderStatus;
              this.breedInfo.comment=this.param.stages[index].comment;
              this.breedInfo.extra=this.param.stages[index].extra;
              this.updateParam.show = true;
              this.sum -=parseFloat(this.param.stages[index].amount)*100;
              this.scale -=parseInt(this.param.stages[index].ratio*10);
              console.log(this.sum);
              console.log(this.scale);
            },
            calculate:function(){
                console.log(this.scale)
                this.breedInfo.amount = (this.breedInfo.ratio*1000)*this.param.total/1000
                ;
                console.log(((this.breedInfo.ratio)*10) >= (10-this.scale))
                console.log((this.breedInfo.ratio)*10)
                console.log(10-this.scale);
                console.log(this.scale);
            },
            deleteBreed:function(index){
                this.sum -=parseFloat(this.param.stages[index].amount)*100;
                this.scale -=parseInt(this.param.stages[index].ratio*10);
                console.log(this.sum);
                console.log(this.scale);
                this.param.stages.splice(index,1);
            },
            cancelAddBreed:function(){
                this.param.stages.pop();
                this.breedInfo.status = 0;
                this.addParam.show = false; 
            },
            cancelModifyBreed:function(){
              //把sum和scale还原
              this.sum = this.modifySum;
              this.scale = this.modifyScale;
              this.modifySum = 0;
              this.modifyScale = 0;
              this.breedInfo.status = 0;
              this.updateParam.show = false;
              console.log(this.sum);
              console.log(this.scale);
            },
            closeInfo:function(){
                if(this.breedInfo.status==1){
                    this.param.stages.pop();
                    this.breedInfo.status = 0;
                    this.addParam.show = false;  
                }else if(this.breedInfo.status==2){
                    this.breedInfo.status = 0;
                    this.updateParam.show = false;
                }
                this.param.show=false;
            },
            modifyBreed:function(){
              this.param.stages[this.updateParam.index].amount=this.breedInfo.amount;
              this.param.stages[this.updateParam.index].ratio=this.breedInfo.ratio;
              this.param.stages[this.updateParam.index].description=this.breedInfo.description;
              this.param.stages[this.updateParam.index].orderStatus=this.breedInfo.orderStatus;
              this.param.stages[this.updateParam.index].comment=this.breedInfo.comment;
              this.param.stages[this.updateParam.index].extra=this.breedInfo.extra;
              /*this.param.items[this.updateParam.index].orderId=this.breedInfo.id,*/
              this.sum +=parseFloat(this.breedInfo.amount)*100;
              this.scale +=parseInt(this.breedInfo.ratio*10);
              this.breedInfo.status = 0;
              this.updateParam.show = false;
              console.log(this.sum);
              console.log(this.scale);
            },
             addBreed:function(){
              this.param.stages[this.param.stages.length-1].amount = this.breedInfo.amount;
              this.param.stages[this.param.stages.length-1].ratio = this.breedInfo.ratio;
              this.param.stages[this.param.stages.length-1].description = this.breedInfo.description;
              this.param.stages[this.param.stages.length-1].orderStatus = this.breedInfo.orderStatus;
              this.param.stages[this.param.stages.length-1].comment = this.breedInfo.comment;
              this.param.stages[this.param.stages.length-1].extra = this.breedInfo.extra;
              console.log(this.param.stages[this.param.stages.length-1]);
              this.breedInfo.status = 0;
              this.addParam.show = false; 
              console.log(this.param.stages)
              this.sum += parseFloat(this.breedInfo.amount)*100;
              this.scale +=parseInt(this.breedInfo.ratio*10);
              console.log(this.sum);
              console.log(this.scale);
                
            },
            showAddBreed:function(){
                this.sum=0;       
                this.scale=0;
              if(this.param.stages.length == 0 ||this.param.stages[this.param.stages.length-1].amount <=this.param.total){
                  this.breedInfo.status = 1;    
                  this.breedInfo.amount='';
                  this.breedInfo.ratio='';
                  this.breedInfo.description='';
                  this.breedInfo.orderStatus='';
                  this.breedInfo.comment='';
                  this.breedInfo.extra='';
                  this.param.stages.push({
                      amount:'',
                      ratio:'',
                      description:'',
                      orderStatus:'',
                      comment:'',
                      extra:'',
                  });
                  this.addParam.show = true;
              }  
              for(var i=0;i < this.param.stages.length-1;i++){
                 this.sum +=parseFloat(this.param.stages[i].amount)*100;
                 this.scale +=parseInt(this.param.stages[i].ratio*10);
              }
              console.log(this.sum);
              console.log(this.scale);
              
            },
            confirm:function(param){
                this.param.show=false;
                console.log(this.param);
                this.param.callback=this.param.callback;
                this.dividedPayment(this.param);
            }
        },
        created(){
            if(this.param.stages.length>0){
                for(var i=0;i < this.param.stages.length;i++){
                    this.sum +=parseFloat(this.param.stages[i].amount)*100;
                    this.scale +=parseInt(this.param.stages[i].ratio*10);
                }
            }

        }
	}
</script>
<style scoped>
.modal{
   z-index: 1086;
}
.modal_con{
    width: 760px;
    z-index: 1086
}
.edit_footer{
     width: 760px;
}
.top-title{
     width: 760px;
     left: 0;
     right:0;
}
.table{
    display: table;
}
</style>
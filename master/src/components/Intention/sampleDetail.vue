<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con modal_overall" v-show="param.show" @click="param.show=false"> 
        <div class="client-section clearfix" v-cloak>
            <div  class="top-title" @click="param.show=false">
                <span class="glyphicon glyphicon-remove-circle"  style="font-size:28px"></span>
            </div>

            <div class="edit-left col-md-12 col-xs-12">

                <div class="section_title clearfix col-md-12 col-xs-12">
                    <span style="font-size:14px">基本信息</span>
                </div>
                <div class="panel panel-default col-md-12 clearfix" style="padding:0;margin-top:10px;" @click.stop="">
                      <div class="panel-heading" v-cloak>
                          <h4 class="panel-title clearfix" @click="enfoldment({
                                      link:initgSampleDetail.items,
                                      crete:'items'
                                      })">
                                <img class="pull-left" src="/static/images/msg.png" height="29" width="26"  />
                                <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                  样品（{{initgSampleDetail.items.arr.length}}）
                                </a>
                                <!-- <button type="button" class="btn btn-base pull-right" @click.stop="">新建</button> -->
                          </h4>
                      </div>
                      <div  class="panel-collapse" v-if="initgSampleDetail.items.arr.length!==null" v-show="initgSampleDetail.items.show">
                            <div class="panel-body panel-set">
                                <table class="table contactSet">
                                    <thead>
                                      <th>样品名称</th>
                                      <th>产地</th>
                                      <th>规格</th>
                                      <th>质量</th>
                                      <th>单位</th>
                                      <th>说明</th>
                                      <th>创建时间</th>
  
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in initgSampleDetail.items.arr">
                                            <td>{{item.breedName}}</td>
                                            <td>{{item.location}}</td>
                                            <td>{{item.spec}}</td>
                                            <td>{{item.quality}}</td>
                                            <td>{{item.unit | Unit}}</td>
                                            <td>{{item.description}}</td>
                                            <td>{{item.ctime}}</td>
                                            <!-- <td @click="edit($index,item)">
                                                                              <a class="operate"><img src="/static/images/upremark.png" height="18" width="48"  alt="修改备注" title="修改备注"/>
                                                                                </a>
                                                 </td> 
                                            -->                                
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                      </div>
                </div>
                <div class="clearfix col-md-12 col-xs-12"  @click.stop="">
                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                        <label class="editlabel">客户名称</label>
                        <input type="text" class="form-control edit-input" v-model="initgSampleDetail.customerName" value="{{initgSampleDetail.customerName}}" disabled="disabled"/>
                    </div>
                    <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                        <label class="editlabel">客户电话</label>
                        <input type="text" class="form-control edit-input"  v-model="initgSampleDetail.customerPhone" value="{{initgSampleDetail.customerPhone}}" disabled="disabled"/>
                    </div>
                </div>
                <div class="clearfix col-md-12 col-xs-12"  @click.stop="">
                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                        <label class="editlabel">收货人名称</label>
                        <input type="text" class="form-control edit-input" v-model="initgSampleDetail.consignee" value="{{initgSampleDetail.consignee}}" disabled="disabled"/>
                    </div>
                    <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                        <label class="editlabel">收货人联系方式</label>
                         <input type="text" class="form-control edit-input" v-model="initgSampleDetail.consigneePhone" value="{{initgSampleDetail.consigneePhone}}" disabled="disabled"/>
                    </div>
                </div>
                <div class="clearfix col-md-12 col-xs-12"  @click.stop="">
                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                        <label class="editlabel">样品名称</label>
                         <input type="text" class="form-control edit-input" v-model="initgSampleDetail.sampleDesc" value="{{initgSampleDetail.sampleDesc}}" disabled="disabled"/>
                    </div>
                    <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                        <label class="editlabel">收货地址</label>
                        <input type="text" class="form-control edit-input" v-model="initgSampleDetail.address" value="{{initgSampleDetail.address}}" disabled="disabled"/>
                    </div>
                </div>
                <div class="clearfix col-md-12 col-xs-12"  @click.stop="">
                    <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                        <label class="editlabel">总金额</label>
                         <input type="text" class="form-control edit-input"   v-model="initgSampleDetail.total" value="{{initgSampleDetail.total}}" disabled="disabled"/>
                    </div>
                    <div class="client-detailInfo pull-right col-md-6 col-xs-12">
                        <label class="editlabel">备注</label>
                         <input type="text" class="form-control edit-input"   v-model="initgSampleDetail.comments" value="{{initgSampleDetail.total}}" disabled="disabled"/>
                    </div>
                </div>
               
            </div>

           <!--  <div class=" col-md-4 col-xs-12 pull-right">
                    <span class="section_title clearfix col-md-12 col-xs-12" style="margin-top:15px;font-size:14px;">创建时间信息</span>
           </div>
           <div class="col-md-4 col-xs-12 pull-right">
               <div class="edit-right clearfix">
                   <div class="client-detailInfo pull-left col-md-11 col-xs-12">
                       <label class="editlabel">创建时间</label>
                       <div class="search_input">
                           <mz-datepicker :time.sync="initgSampleDetail.ctime" format="yyyy-MM-dd HH:mm:ss">
                           </mz-datepicker>
                       </div>
                   </div>
               </div>
           </div>  -->
</template>
<script>
import filter from '../../filters/filters'
import {
    initgSampleDetail
} from '../../vuex/getters'
import {
    getSampleDetail
} from '../../vuex/actions'
export default {
    components: {

    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            }
        }
    },
    props:['param'],
    vuex: {
        getters:{
            initgSampleDetail
        },
       actions:{
            getSampleDetail
       }
    },
    methods: {
        enfoldment:function(param){
          if(this.$store.state.count.sampleDetail[param.crete].arr.length==0){
                  this.$store.state.count.sampleDetail[param.crete].show=true;
          }
          this.$store.state.count.sampleDetail[param.crete].show = !this.$store.state.count.sampleDetail[param.crete].show;
      },
    },
    created(){
        this.getSampleDetail(this.param);
        console.log(this.param)
    },
    filter: (filter, {})
}
</script>
<style scoped>
span{
    font-size:12px;
}
label{
    font-size:12px;
}
input{
    font-size:12px;
}
.top-title{
    position: fixed;
    width: 60%;
    margin: auto;
    right: 0;
    left: 0;
    cursor: pointer;
}
.section_title{
    padding-top:6px;
}
.client-detailInfo img {
    width: 100px;
}
.panel-body ul li:last-of-type{
    float: right;
}
.panel-body ul > li:last-of-type {
    float: none;
    position: relative;
}
.panel-collapse{
    background-color: #fff;
}
.panel-group .panel{
    border-radius: 10px;
}
.breed_action {
    top: 33px;
    right: 30px;
}

.breed_action {
    padding: 5px 0;
}

.breed_action dl {
    margin-bottom: 0;
}

.breed_action dl dt {
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}

.contactSet>thead{
    color: #fa6705;
}
.contactSet>tbody>tr>td,.contactSet>thead>tr>th{
    border-bottom: none;
    border-top: none;
    text-align: left;
}
.contact_img{
    margin-right: 6px !important;
}
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}

.edit-left {
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
    
    margin-top: 5px;
}

.edit-right {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 5px;
    margin-top: 20px;
}

.mz-datepicker > input {
    font-family: 'Microsoft YaHei', serif;
    color: #666;
    border: 1px solid #d9d9d9;
    height: 30px;
    box-sizing: border-box;
    outline: none;
    padding: 0 30px 0 7px;
    font-size: 15px;
    width: 100%;
    cursor: pointer;
}
.table{
    display: table;
}
.table>thead>tr>th,.table>tbody>tr>td{
  border-bottom:1px solid #ddd;
}
.mz-datepicker > i {
    height: 36px;
}

</style>

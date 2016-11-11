<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>报价搜索</h3>
        </div>
        <div class="edit-model">
             <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <section class="editsection" v-cloak>
                <div class="clearfix">
                     <div class="client-detailInfo  col-xs-12">
                        <label>名称:</label>
                        <input type="text"  class="form-control" v-model="param.fullname"  placeholder="按报价会员名称搜索"/>
                    </div>
                    
                    <div class="client-detailInfo  col-xs-12">
                        <label>品种:</label>
                        <input type="text"  class="form-control" v-model="param.breedName"  placeholder="按品种名称搜索"/>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>规格:</label>
                        <input type="text"  class="form-control" v-model="param.spec"  placeholder="按规格搜索"/>
                    </div>
                  
        
                   
                    <div class="client-detailInfo col-xs-5">
                        <label>注册时间起始：</label>
                        <mz-datepicker :time.sync="param.startTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-7">
                        <label>注册时间结束：</label>
                        <mz-datepicker :time.sync="param.endTime" format="yyyy/MM/dd HH:mm:ss" class="a">
                        </mz-datepicker>
                        <button type="button" class="btn btn-default" height="24" width="24" @click="resetTime()">清空</button>
                    </div>

                    

                    
                </div>
            </section>

        </div>
      <!--<div class="edit_footer">-->
        <!--<button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>-->
        <!--<input type="button" class="btn  btn-confirm"  @click="userSearch(param,param.show = false)" value="确定">-->
      <!--</div>-->

    </div>
    <div class="edit_footer">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="offerSearch(param.show = false)" value="确定">
    </div>
</template>
<script>


import {
    initOfferList
} from '../../vuex/getters'
import {
    getOfferList
} from '../../vuex/actions'
export default {
    components: {
      
    },
    props: ['param'],
    data() {
        return {
            loadParam:{
                loading:false
            }
            
        }
    },
    vuex: {
      getters: {
        initOfferList
      },
      actions: {
        getOfferList
      }
    },
    methods:{
        
        resetTime:function(){
            this.param.startTime = "";
            this.param.endTime = "";
        },
        offerSearch:function(){
            console.log(this.param);
            this.getOfferList(this.param);
        }
      
    },
    created() {
      
    }
}
</script>
<style scoped>
.modal_con{

    width: 600px;
    bottom:300px;
}
.top-title{
    position: absolute;
    width: 100%;
    top: 0;
}
.edit_footer{
    position: fixed;
    bottom: 300px;
    width: 100%;
  z-index: 1080;
  width: 600px;

}
.empSearch{
    position: absolute;
    right: 15px;
    top: 26px;
    width: 6%;
    height: 34px;
    cursor: pointer;
    border-left: 1px solid #ddd;
}
.empSearch >img{
    margin: auto;
    position: relative !important;
    vertical-align: middle;
}
.big-font {
    font-size: 36px;
}

.top-title span {
    font-size: 28px;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 150px 30px;
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
.client-detailInfo img{
    position: absolute;
    top: 6px;
}
</style>

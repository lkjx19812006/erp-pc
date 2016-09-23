<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3 v-if="param.flag==0">新增跟进</h3>
            <h3 v-if="param.flag!=0">修改跟进</h3>

        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <div class="editpage">
                   <div class="editpageleft">
                      <div v-if="param.flag==0" class="editpage-input">
                           <label class="editlabel">跟进对象ID</label>
                           <input type="text" v-model='param.objId' class="form-control edit-input" value="{{param.objId}}" disabled="disabled" />
                       </div>
                       <div v-if="param.flag==0" class="editpage-input">
                           <label class="editlabel">业务ID</label>
                           <input type="text" v-model='param.bizId' class="form-control edit-input" value="{{param.bizId}}" />
                       </div>
                       <div class="editpage-input">
                           <label class="editlabel">跟进主体类型</label>
                           <input type="text" v-model='param.type' class="form-control edit-input" value="{{param.type}}" />
                           <select type="text" class="form-control edit-input" v-model="param.type">
                                <option value="">请选择跟进主体类型</option>
                                <option value="0">客户</option>
                                <option value="1">会员</option>
                                <option value="2">企业</option>
                            </select>

                       </div>
                       <div class="editpage-input">
                           <label class="editlabel">跟进方式</label>
                           <input type="text" v-model='param.trackingWay' class="form-control edit-input" value="{{param.trackingWay}}" />
                       </div>
                      
                       
                   </div>
                   <div class="editpageright">
                      <div v-if="param.flag==0" class="editpage-input">
                           <label class="editlabel">业务类型</label>
                            <input type="text" v-model='param.bizType' class="form-control edit-input" value="{{param.bizType}}" />
                            <select type="text" class="form-control edit-input" v-model="param.bizType">
                                <option value="">请选择业务类型</option>
                                <option value="0">客户</option>
                                <option value="1">意向</option>
                                <option value="2">订单</option>
                            </select>
                      </div>
                      <div class="editpage-input">
                           <label class="editlabel">联系账号</label>
                            <input type="text" v-model='param.contactNo' class="form-control edit-input" value="{{param.contactNo}}" />
                       </div>
                       <div class="editpage-input">
                           <label class="editlabel">备注</label>
                           <input type="text" v-model='param.comments' class="form-control edit-input" value="{{param.coments}}" />
                       </div>
                      
                      
                   </div>
               </div>
           </section>
        </div>  
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="updateOrAddTrackingInfo(param,param.show = false)">确定</button>
        </div>
    </div>
</template>
<script>
import {
    initUserDetail,
    
} from '../../vuex/getters'
import {   
    updateTrackingInfo,
    createTrackingInfo,
    getUserDetail
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
        
        }
    },
    vuex: {
       getters: {
            initUserDetail,
            
        },
        actions: {
            updateTrackingInfo,
            createTrackingInfo,
            getUserDetail
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

    methods: {
      updateOrAddTrackingInfo:function(param){
        console.log(param);
        if(param.flag == 1){
            this.updateTrackingInfo(param); 

        }else{
           this.createTrackingInfo(param); 
        }
         
      },
      
    }
}
</script>
<style scoped>
.big-font {
    font-size: 36px;
}
.top-title span {
    font-size: 28px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
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

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
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

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
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
</style>
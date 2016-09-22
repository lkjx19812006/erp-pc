<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>新增业务机会</h3>
        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <div class="editpage">
                   <div class="editpageleft">
                       <div class="editpage-input">
                           <label class="editlabel">品种</label>
                           <input type="text" v-model='param.breedName' class="form-control edit-input" value="{{param.breedName}}" />
                       </div>
                       <div class="editpage-input">
                           <label class="editlabel">产地</label>
                           <input type="text" v-model='param.location' class="form-control edit-input" value="{{param.location}}" />
                       </div>
                       <div class="editpage-input">
                           <label class="editlabel">规格</label>
                            <input type="text" v-model='param.spec' class="form-control edit-input" value="{{param.spec}}" />
                       </div>
                       
                   </div>
                   <div class="editpageright">
                       <div class="editpage-input">
                           <label class="editlabel">数量</label>
                           <input type="text" v-model='param.number' class="form-control edit-input" value="{{param.number}}" />
                       </div>
                       <div class="editpage-input">
                           <label class="editlabel">价格</label>
                           <input type="text" v-model="param.price" class="form-control edit-input" value="{{param.price}}" />
                       </div>
                       <div class="editpage-input">
                           <label class="editlabel">单位</label>
                           <input type="text" v-model="param.unit" class="form-control edit-input" value="{{param.unit}}" />
                       </div>
                      
                   </div>
               </div>
           </section>
        </div>  
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="(param,param.show = false)">确定</button>
        </div>
    </div>
</template>
<script>
import {
    
} from '../../vuex/getters'
import {   
    updateUserInfo   
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
        
        }
    },
    vuex: {
       getters: {
            
        },
        actions: {
            updateUserInfo 
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
    /*methods: {
      alertInfo:function(param){
        updateUserInfo(param)
      }
    }*/
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
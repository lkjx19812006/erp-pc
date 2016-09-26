<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>业务机会列表</h3>
        </div>
        <div class="edit-model">
           
               <!-- <input type="hidden"  class="form-control edit-input" value="{{initChanceList.id}}" /> -->
               <div class="editpage">
                  <table class="table table-hover table_head table-striped " v-cloak>
                      <thead>
                          <tr> 
                              <th>品种</th>
                              <th>产地</th>
                              <th>规格<th>
                               <th>规格<th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in initChanceList">
                             
                              <td>{{item.breedName}}</td>
                              <td>{{item.location}}</td>
                              <td>{{item.spec}}</td>
                              <td>{{item.spec}}</td>

                          </tr>

                      </tbody>
                  </table>
               </div>
           
        </div>  
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="">确定</button>
        </div>
    </div>
</template>
<script>
import {
    initChanceList
} from '../../vuex/getters'
import {   
    updateUserInfo,
    getChanceList   
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
          loadParam:{
            show:true,
            cur:1,
            all:7
          }
        }
    },
    vuex: {
       getters: {
            initChanceList
        },
        actions: {
            updateUserInfo,
            getChanceList
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
    },*/
    created() {
    
      this.getChanceList(this.loadParam, this.loadParam.all);
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
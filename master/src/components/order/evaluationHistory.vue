<template>
    <div  id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.name}} : {{$t('static.evaluation_history')}}</h3>
        </div>
          <div class="edit-model">
             <section class="editsection" v-cloak>
                
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                         <tr>
                           <th style="width:150px">{{$t('static.evaluation_time')}}</th>
                           <th>{{$t('static.evaluation')}}</th> 
                          
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in initevalHistory">
                         <td>{{item.ctime}}</td>  
                              <td>
                              <Poptip placement="top" trigger="hover">
                              <span v-if="item.evaluation!=''">{{item.evaluation | textDisplay '20'}}</span>
                              <span v-else>{{$t('static.unvalued')}}</span>
                              <div class="api" slot="content" style="color:green">
                                  {{item.evaluation}}
                              </div>
                              </Poptip>
                              </td> 
                                 
                         </tr>
                     </tbody>
                 </table>
             </section>
          </div>
        
    </div>
</template>
<script>
import {
    
    initevalHistory
} from '../../vuex/getters'
import {

} from '../../vuex/actions'
export default {
    components: {
    
    },
    props: ['param'],
    data() {
        return {
         
        }
    },
    vuex: {
       getters: {
          
          initevalHistory
        },
        actions: {
             
        }
    },
    methods: {
          

    },
    events:{
        
    },
    created(){

    }
}
</script>>
<style scoped>
.modal{
  z-index: 1083;

}
.modal_con{
  z-index: 1084;
    height:650px;
  width:550px;
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

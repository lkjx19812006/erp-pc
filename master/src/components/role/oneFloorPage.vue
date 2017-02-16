<template>
<div>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container  modal_con">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>选择父级页面</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection" v-cloak>
                        <div class="sub_second clear">
                            <ul v-for="item in list.result">
                                <li @click="selectShow(list.result[$index])">
                                    <div class="clear">
                                        <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index].show,'checkbox_select_base':list.result[$index].show}"   @click="selectShow(list.result[$index])" >
                                        </label>
                                        <p class="line_text">{{list.result[$index].cname}}</p>
                                        <!-- 二级目录 -->
                                        <!-- <div v-for="subItem in list.result[$index].subcategory"  class="sub_second clear">
                                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)" >
                                            </label>
                                            <p class="line_text">{{subItem.cname}}</p>
                                            三级功能
                                        </div> -->
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </form>
        </validator>
    </div>
</div>
</template>
<script>
import {
   
} from '../../vuex/getters'
import {
   baseGetData,
   baseAddData,
   baseUpdateData
} from '../../vuex/actions'
export default {
    components: {
       
    },
    props: ['param'],
    data() {
        return {
            arr:[0,1,2,3,4],
            dateText:'',
            show:true
        }
    },
     vuex: {
        getters: {
          list:state => state.tablelist.menu.list
        },
        actions: {
           baseGetData,
           baseAddData,
           baseUpdateData
        }
    },
    methods:{
     selectShow:function(item){
        for(var i in this.list.result){ 
            if(this.list.result[i].show){
                this.list.result[i].show = false;
            }
        }
        item.show=!item.show;
        console.log(item)
        console.log(this.param)
        this.param.pid = item.id;
        this.param.name = item.cname;
        this.$dispatch('selectPage', this.param);
        this.param.show = false;
     }
    },
    created(){
        this.param.keyName='menu';
        this.param.url='/sys/menu/';
        this.param.cur=1;
        this.param.getDataInit=this.getDataInit;
        console.log(this.param);
        this.baseGetData(this.param);
    }
}
</script>
<style scoped>
.editsection{
    margin-bottom: 50px;
}
.editsection ul{
}
.search_input{
    float: none;
}
.modal_con,.modal{
    z-index: 1082;
}
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.search_input{
    text-indent: 0px;
}
.top-title{
    left: 0;
    right: 0;
    width: 800px;
}
.line_text{
    padding-top:10px;
    float:left;
}
.sub_second{
    clear:both;
    white-space: normal;
}
.sub_second  li{
    display: block;
}
.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}
</style>

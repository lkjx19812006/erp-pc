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
                                <li>
                                    <div class="clear">
                                        <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index].show,'checkbox_select_base':list.result[$index].show}"   @click="selectShow(list.result[$index])" >
                                        </label>
                                        <p class="line_text">{{list.result[$index].cname}}</p>
                                        <!-- 二级目录 -->
                                        <div v-for="subItem in list.result[$index].subcategory"  class="second_floor sub_second clear">
                                            <label  v-if="param.type==1"  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)">
                                            </label>
                                            <p  v-if="param.type==1" class="line_text">{{subItem.cname}}</p>
                                        </div>
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
            show:true,
            loadParam:{
                keyName:'menu',
                url:'/sys/menu/',
                cur:1,
            }
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
                let subcategory = this.list.result[i].subcategory;
                for(var j in subcategory){
                    if(subcategory[j].show){
                        subcategory[j].show = false;
                    }
                }
            }
            item.show =true; 
            this.param.pid = item.id;
            this.param.name = item.cname;
            this.$dispatch('selectPage', this.param);
            this.param.show = false;
        }
    },
    created(){
        this.param.getDataInit=this.getDataInit;
        this.baseGetData(this.loadParam);
    }
}
</script>
<style scoped>
.editsection{
    margin-bottom: 50px;
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
.second_floor{
    margin-left: 24px;
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

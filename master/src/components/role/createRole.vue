<template>
    <div class="container modal_con"  >
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title}}</h3>
        </div>
        <validator name="validation">
            <form novalidate>
                <div class="edit-model">
                    <section class="editsection" v-cloak>
                     <div class="cover_loading">
                        <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
                     </div>
                        <div class="clearfix">
                            <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                <label>名称</label>
                                <input type="text" id="cname" class="form-control" maxlength="11" v-model="param.cname" v-validate:cname="['required']"/>
                            </div>
                            <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                <label>备注</label>
                                <input type="email" class="form-control" v-model="param.remark"  />
                            </div>
                        </div>
                        <div class="clearfix" >
                        <div class="table-responsive">
                            <table class="table">
                            <tr  v-for="item in list.result" v-if="$index%5==0">
                            <td >
                             <div style="float:left;width:20%">
                           <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index].show,'checkbox_select_base':list.result[$index].show}"   @click="selectShow(list.result[$index])" >
                           </label>
                           <p style="padding-top:10px;float:left">{{list.result[$index].cname}}</p>
                          
                             <div v-for="subItem in list.result[$index].subcategory" style="margin-left:8px">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)" >
                            </label>
                            <p style="padding-top:10px;float:left">{{subItem.cname}}</p>
                           </div>
                           </div>

                           <div v-if="list.result[$index+1]" style="float:left;width:20%">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index+1].show,'checkbox_select_base':list.result[$index+1].show}"   @click="selectShow(list.result[$index+1])" >
                           </label>
                           <p style="padding-top:10px;float:left">{{list.result[$index+1].cname}}</p>
                          
                             <div v-for="subItem in list.result[$index+1].subcategory" style="margin-left:8px">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)" >
                            </label>
                            <p style="padding-top:10px;float:left">{{subItem.cname}}</p>
                           </div>
                           </div>

                        <div v-if="list.result[$index+2]" style="float:left;width:20%">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index+2].show,'checkbox_select_base':list.result[$index+2].show}"   @click="selectShow(list.result[$index+2])" >
                           </label>
                           <p style="padding-top:10px;float:left">{{list.result[$index+2].cname}}</p>
                          
                             <div v-for="subItem in list.result[$index+2].subcategory" style="margin-left:8px">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)" >
                            </label>
                            <p style="padding-top:10px;float:left">{{subItem.cname}}</p>
                           </div>
                           </div>


                           <div v-if="list.result[$index+3]" style="float:left;width:20%">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index+3].show,'checkbox_select_base':list.result[$index+3].show}"   @click="selectShow(list.result[$index+3])" >
                           </label>
                           <p style="padding-top:10px;float:left">{{list.result[$index+3].cname}}</p>
                          
                             <div v-for="subItem in list.result[$index+3].subcategory" style="margin-left:8px">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)" >
                            </label>
                            <p style="padding-top:10px;float:left">{{subItem.cname}}</p>
                           </div>
                           </div>


                            <div v-if="list.result[$index+4]" style="float:left;width:20%">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!list.result[$index+4].show,'checkbox_select_base':list.result[$index+4].show}"   @click="selectShow(list.result[$index+4])" >
                           </label>
                           <p style="padding-top:10px;float:left">{{list.result[$index+4].cname}}</p>
                          
                             <div v-for="subItem in list.result[$index+4].subcategory" style="margin-left:8px">
                            <label  class="checkbox_unselect_base" v-bind:class="{'checkbox_unselect_ base':!subItem.show,'checkbox_select_base':subItem.show}"   @click="selectShow(subItem)" >
                            </label>
                            <p style="padding-top:10px;float:left">{{subItem.cname}}</p>
                           </div>
                           </div>

                            </td>
                            </tr>
                            </table>
                        </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                    <input type="button" class="btn  btn-confirm"  @click="save()" value="保存" />
                </div>
            </form>
        </validator>
    </div>
</template>
<script>
import {
   
} from '../../vuex/getters'
import {
   baseGetData,
   baseAddData
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
           baseAddData
        }
    },
    methods:{
     selectShow:function(item){
        item.show=!item.show;
        if(item.pid==0){
            for(let i in item.subcategory){
                item.subcategory[i].show=item.show;
            }
        }else{
            let category;
            for(let i in this.list.result){
                if(this.list.result[i].id==item.pid){
                   category= this.list.result[i];
                }
            }
            category.show=item.show;
            if(!item.show){
                for(let i in category.subcategory){
                    if(category.subcategory[i].show){
                       category.show=true; 
                    }
                }
            }
        }
     },
     save:function(){
        let idArr=[];
        for(let i in this.list.result){
            if(this.list.result[i].show){
                idArr.push(this.list.result[i].id);
            }
            for(let m in this.list.result[i].subcategory){
                if(this.list.result[i].subcategory[m].show){
                   idArr.push(this.list.result[i].subcategory[m].id); 
                }
            }
        }
        if(idArr.length==0){
            return alert("请选择功能");
        }
            this.param.body={
                cname:this.param.cname,
                menus:idArr.join(","),
                remark:this.param.remark
            };
            this.param.url='/sys/role/';
            this.param.keyName='power';
            this.param.loading=true;
            this.baseAddData(this.param);
     
     }
    },
    created(){
        this.param.keyName='menu';
        this.param.url='/sys/menu/';
        this.param.cur=1;
        this.baseGetData(this.param);
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
.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.search_input{
    text-indent: 0px;
}
.edit-content h3 {
    font-size: 18px;
    color: #fa6705;
    margin: 0;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}
.client-detailInfo label{
    display: inline-block;
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
    float: left;
}
.editpageleft{
    border-right:1px solid #ddd; 
}
.editpageleft h4,
.editpageright h4{
    text-indent: 16px;
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
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}
.role{
    margin-right: 10px;
}
.checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}
</style>

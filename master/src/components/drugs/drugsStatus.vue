<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{param.title}}</h3>
        </div>
        <div class="edit-model">
           <section class="editsection" v-cloak>
               <input type="hidden"  class="form-control edit-input" value="{{param.id}}" />
               <div class="clearfix">
                <img src="/static/images/bee.png"  class="pull-left" height="138" width="111"/>
                <div class="tips_name">{{param.tips}}</div>
            </div>
           </section>
        </div>
        <div class="edit_footer" v-if="param.status!=3">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <button type="button" class="btn  btn-confirm" @click="pass(param)">确定</button>
        </div> 
    </div>
</template>
<script>
import {
    
} from '../../vuex/getters'
import {
    outOfDrugs
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
           
        },
        actions: {
            outOfDrugs
        }
    },
    methods: {
        pass: function(param){
            console.log(this.param)
            if(this.param.status==0){
                /*this.param.status = 1;*/
                this.param.show = false;
                this.outOfDrugs(this.param);
            }else if(this.param.status==1){
                /*this.param.status = 2;*/
                this.param.show = false;
                this.outOfDrugs(this.param);
            }else if(this.param.status==2){
                /*this.param.status =3;*/
                this.param.show = false;
                this.outOfDrugs(this.param);
            }
        } 
    },

}
</script>
<style scoped>
.modal{
    z-index: 1082;
}
.modal_con {
    width: 454px;
    height: 300px;
    top: 0;
    z-index: 1083
}
.edit_footer{
    width: 454px;
    position: absolute;
    bottom: 0;
}
.big-font {
    font-size: 36px;
}
.top-title{
    position: absolute;
    top: 0;
    width: 454px;
}
.tips_name{
    float: left;
    font-size: 20px;
    color: #fa6705;
    white-space: normal;
    padding-top: 47px;
    padding-left: 20px;
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
.editpageleft h3{
    color: #fa6705;
    text-align: center;
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

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
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

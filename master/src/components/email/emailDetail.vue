<template>
<div>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"  @click="param.show=false"></div> 
    <div class="container modal_con modal_overall" v-show="param.show" >
        <div class="client-section clearfix" v-cloak>
            <div class="top-title" @click="param.show=false">
                <span class="glyphicon glyphicon-remove-circle"  style="font-size:28px"></span>
            </div>
            <div class="clearfix" >
                <div class="section_title  col-md-12 col-xs-12 clearfix">
                    <span style="font-size:14px">基本信息</span>
                </div>
                <div  class="col-md-12 col-xs-12">
                    <div class="clearfix" style="padding-top:10px;">
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6" ><label>邮箱:</label>{{param.emailNo}}</div>
                        
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6"><label>发件人:</label>{{param.sendNo}}</div>

                        <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6"><label>发件人姓名:</label>{{param.sendName}}
                        </div>

                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6"><label>发件时间:</label>{{param.sendDate}}</div>

                        <div class="client-detailInfo  col-md-12"><label>主题:</label>{{param.theme}}
                        </div>

                        <div class="client-detailInfo col-md-12"><label>收件人:</label>{{param.receiveNo}}</div>
                       
                        <div class="client-detailInfo col-md-4 col-xs-6"><label>收件时间:</label>{{param.receiveDate}}
                        </div>
                        
                        <div class="client-detailInfo col-md-12">
                            <label>抄送地址:</label>
                            <span>{{param.ccNo}}</span>
                        </div>

                        <div class="client-detailInfo col-md-4  col-xs-6">
                            <label>附件:</label>
                            <span v-if="param.attach===0">无</span>
                            <span v-if="param.attach===1">有</span>
                        </div>
                        
                    </div>
                    

                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import filter from '../../filters/filters'
import {
} from '../../vuex/getters'
import {
    getEmailDetail
} from '../../vuex/actions'
export default {
    components: {
        filter,
    },
    data() {
        return {
            changeShow: true,
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
            
        },
       actions:{
          getEmailDetail  
       }
    },
    created(){  
        this.getEmailDetail(this.param);
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
.client-detailInfo{
    padding: 5px;
    white-space: normal;
}
.client-detailInfo span{
    white-space: normal;
    display: inline-block;
}
.client-detailInfo label{
    display: inline-block;
}
.client-detailInfo img {
    width: 100px;
}

</style>

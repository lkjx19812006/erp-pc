<template>
<detail-model :param="breedDetailParam" v-if="breedDetailParam.show"></detail-model>
<tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
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
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6" >
                            <label>名称:</label>{{initCompanyProductDetail.name}}
                        </div>
                        
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                            <label>产品类型:</label>{{initCompanyProductDetail.type}}
                        </div>

                        <div class="client-detailInfo  col-md-3 col-sm-4 col-xs-6">
                            <label>公司名称:</label>{{initCompanyProductDetail.companyName}}
                        </div>

                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                            <label>产品规格:</label>{{initCompanyProductDetail.spec}}
                        </div>

                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6" >
                            <label>批准文号:</label>{{initCompanyProductDetail.approvalNo}}
                        </div>
                        
                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6">
                            <label>批准时间:</label>{{initCompanyProductDetail.approvalTime}}
                        </div>

                        <div class="client-detailInfo col-md-3 col-sm-4 col-xs-6" >
                            <label>同品种数（同品规数）:</label>{{initCompanyProductDetail.goodsSpec}}
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            
            <div class="clearfix" v-if="initCompanyProductDetail.drugList.length">
                <div class="section_title  col-md-12 col-xs-12 clearfix">
                    <span style="font-size:14px">配方信息</span>
                </div>
                <div  class="col-md-12 col-xs-12">
                    <div class="clearfix" style="padding-top:10px;">
                        <div class="client-detailInfo col-md-12 col-sm-12 col-xs-12" >
                            <label>成分:</label>
                            <span v-for="item in initCompanyProductDetail.drugList[0].componentArr">
                                <a @click="breedDetail(item.name)">{{item.name}}</a>:{{item.number}};
                            </span>
                        </div>

                        <div class="client-detailInfo col-md-12 col-sm-12 col-xs-12" >
                            <label>主治功能:</label>{{initCompanyProductDetail.drugList[0].treatFunction}}
                        </div>
                        
                        <div class="client-detailInfo col-md-12 col-sm-12col-xs-12">
                            <label>配方来源:</label>{{initCompanyProductDetail.drugList[0].source}}
                        </div>
                        
                        <div class="client-detailInfo col-md-12 col-sm-12 col-xs-12">
                            <label>来源页码:</label>第{{initCompanyProductDetail.drugList[0].sourcePage}}页
                        </div>
                        
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import detailModel from './breeddetail'
import tipsModel  from '../../components/tips/tipDialog'
import filter from '../../filters/filters'
import {
    initCompanyProductDetail
} from '../../vuex/getters'
import {
    getCompanyProductDetail,
    getBreedDetail
} from '../../vuex/actions'
export default {
    components: {
        filter,
        detailModel,
        tipsModel
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            breedDetailParam: {
                show: false,
                link: '/detailByName/',
                name: '',
                callback: this.callback
            },
            tipsParam:{
                show:false,
                name:'',
                alert:true,
            },
        }
    },
    props:['param'],
    vuex: {
        getters:{
          initCompanyProductDetail
        },
       actions:{
          getCompanyProductDetail,
          getBreedDetail 
       }
    },
    methods: {
        breedDetail: function(name){
            let nameArr = name.split(/[（,）,(,)]/);
            if(nameArr.length>1){
                name = nameArr[0];
                //name = nameArr[1] + nameArr[0];
            }
            this.breedDetailParam.name = name;
            this.breedDetailParam.show = true;
            this.getBreedDetail(this.breedDetailParam);
        },
        callback: function(name){
            this.tipsParam.show = true;
            this.tipsParam.name=name;
            this.tipsParam.alert=true;
        }
    },
    created(){  
        this.getCompanyProductDetail(this.param);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.modal{
    z-index: 1080;
}
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

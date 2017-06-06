<template>
    <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>匹配{{param.typeName}}信息</h3>
        </div>
        <div>
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <h2 v-if="initSupplyDemandList.length==0" align="center">无对应的{{param.typeName}}信息<h2>
          <table v-if="initSupplyDemandList.length>0" class="table table-hover table_color table-striped " v-cloak >
            <thead>
                <tr>
                    <th>特殊的</th>
                    <th>客户名称</th>
                    <th>客户手机号</th>
                    <th>规格</th>
                    <th>单位</th>
                    <th>单价</th>
                    <th>产地</th>
                    <th>数量</th>
                    <th>国家</th>
                    <th>所在省</th>
                    <th>所在市</th>
                    <th>所在区</th>
                    <th>交收地址</th>
                    <th>预付比例</th>
                    <th>发票</th>
                    <th>上门看货</th>
                    <th>包装</th>
                    <th>是否国际</th>
                    <th>提供样品</th>
                    <th>样品数量</th>
                    <th>样品单位</th>
                    <th>样品价格</th>
                    <th>发布时间</th>
                    <th>审核状态</th>
                    <th>上下架</th>
                </tr>
            </thead>
            <tbody>

                    <tr v-for="item in initSupplyDemandList">
                        <td>{{item.especial | chanceEspec}}</td>
                        <td>{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.unit}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.location | province}}</td>
                        <td>{{item.number}}</td>
                        <td>{{item.country}}</td>
                        <td>{{item.province}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.district}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.advance}}</td>
                        <td>{{item.invoic | invoicstate}}</td>
                        <td>{{item.visit | visitstate}}</td>
                        <td>{{item.pack}}</td>
                        <td>{{item.intl | intlstata}}</td>
                        <td>
                            <div v-if="item.sampling==0">否</div>
                            <div v-if="item.sampling==1">是</div>
                        </td>
                        <td>{{item.sampleNumber}}</td>
                        <td>{{item.sampleUnit}}</td>
                        <td>{{item.sampleAmount}}</td>
                        <td>{{item.ctime | date}}</td>
                        <td>{{item.validate | intentionAudit}}</td>
                        <td>
                          <div>{{item.onSell | onsell}}</div>
                        </td>
                    </tr>
                </tbody>
          </table>
        </div>
    </div>
</template>
<script>
import {
  initSupplyDemandList
} from '../../vuex/getters'
import {
  getSupplyDemandList,

} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
            loadParam:{
                loading:true,
                show:false,
                //id:'',
                type:'',
                breedId:'',
                link:'/intention/'
            },
        }
    },
    vuex:{
        getters: {
            initSupplyDemandList
        },
        actions: {
            getSupplyDemandList,
        }
    },
    methods:{

    },

    events:{

    },
    created(){
        console.log(this.param);
        this.loadParam.type = this.param.type;
        this.loadParam.breedId = this.param.breedId;
        this.getSupplyDemandList(this.loadParam);

    }

}
</script>
<style scoped>
.modal_con {
    width:80%;
}
.glyphicon {
    position:fixed;
    top:91px;
    right:10%;
}
.big-font {
    font-size: 36px;
}
.top-title span {
    font-size: 28px;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 50px 30px;
}
.textarea{
    width: 100%;
    resize: none;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage-input {
    margin-top: 15px;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    background-size: 60%;
    margin: auto;
    text-align: center;
    background-position: 5px;
    float: left;
    margin-right: 10px;
}
.role{
    margin-right: 10px;
}
.table{
  display: table;
}
</style>

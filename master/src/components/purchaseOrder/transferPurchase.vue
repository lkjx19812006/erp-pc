<template>
    <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
    <div class="modal modal-main fade account-modal"></div>
    <div class="box">

        <p>
            <span class="title">请选择部门</span>
            <input type="text" class="form-control" v-model="" placeholder="请选择部门" readonly="true" @click="selectOrg()" />
        </p>
        <div>
            <p class="left" v-for="($index,item) in orgArr">
                <Tag closable color="blue" @on-close="handleClose($index)" >{{item.orgName}}</Tag>
            </p>
        </div>    
        <footer class="footer">
            <button class="btn btn-primary right" style="margin-left:10px;" @click="confirm()">确认</button>
            <button class="btn btn-warning right" @click="param.show=false">取消</button>
        </footer>  
    </div>
</template>

<script>
import selectorgModel from '../tips/treeDialog'
import {transferPurchaseOrder} from '../../vuex/actions'
    export default{
        components:{
            selectorgModel
        },
        vuex:{
            getters:{

            },
            actions:{
                transferPurchaseOrder
            }
        },
        props:['param'],
        data(){
            return {
                selectOrgParam: {
                    show: false,
                    orgId: '',
                    orgName: '',
                    callback: this.callback
                },
                orgArr:[]
            }
        },
        methods:{
            close:function(){
                this.param.show = false
            },
            selectOrg: function() {
                this.selectOrgParam.show = true;
            },
            handleClose:function($index){
                this.orgArr.splice($index,1)
            },
            callback: function() {
                var orgData = {
                    org:this.selectOrgParam.orgId,
                    orgName:this.selectOrgParam.orgName
                }
                this.orgArr.push(orgData)
            },
            confirm:function(){
                let orgIds = []
                this.orgArr.forEach(function(item){
                    orgIds.push(item.org)
                })
                let submitData = {
                    ids:this.param.transferPurchase,
                    offerOrgs:orgIds,
                    callback:this.param.callback
                }
                this.transferPurchaseOrder(submitData)
                this.param.show = false
            }
        },
        ready() {
           
        },
    }
</script>

<style scoped>
    .box{
        width: 600px;
        height: 400px;
        background: #fff;
        position: absolute;
        z-index: 1068;
        left: 50%;
        margin-left: -300px;
        margin-top: 100px;
        border-radius: 10px;
        padding:20px;
    }
    .title{
       font-weight: bold
    }
    .table_con{
        height: 500px;
        width:100%;
        overflow: auto
    }
    footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding:20px 50px;
    }
</style>
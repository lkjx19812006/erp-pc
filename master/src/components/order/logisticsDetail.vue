<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-model">
            <p>物流单号：{{param.lcompanyNo}}</p>
            <p class="clearfix"><img src="/static/images/logistics.png" class="left" height="25" width="25" />物流情况：</p>
            <div class="condition" v-for="">  
                <img src="/static/images/line.png" height="81" width="8"/>
                <div class="logistics_condition">
                    <span>已收入</span>
                    <p>2016-10-22 10:05:00</p>
                </div>
            </div>
           
        </div>
    </div>
</template>
<script>
export default {
    components: {
        
    },
    props: ['param'],
    data() {
        return {
            
        } 
    },
    methods:{

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
    }
}
</script>
<style scoped>
.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding:40px 30px 30px 30px;
}
.condition{
    position: relative;
    padding: 0 20px;
}
.logistics_condition {
    position: absolute;
    margin:auto;
    text-align: left;
    left: 0;
    right: 0;
    top: 0;
    margin-left: 50px;
}
.big-font {
    font-size: 36px;
}
.orange{
    color: #fa6705;
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ddd;
}
.model-tips input{
    border: 1px solid #ddd;
    width: 80%;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
}
.top-title span {
    font-size: 30px;
    color: #000;
}
.editpage-input {
    margin-top: 15px;
}
.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
    text-align: left;
    text-indent: 15px;
}
</style>

<template>
    <div v-show="param.show" class="modal  fade" tabindex="-1" role="dialog">
        <div class="container modal_con">
            <div @click="param.show = false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div :show.sync="param.show">
                <hello-model v-show="param.name=='hello'"></hello-model>
                <test-model v-show="param.name=='test'"></test-model>
            </div>
        </div>
</div>
</template>
<script>
import helloModel from '../components/helloModel'
import testModel from '../components/testModel'
export default {
    components: {
        helloModel,
        testModel
    },
    props: ['param'],
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
}
.modal_con{
     display: block;
     position: absolute;
     top: 91px; 
     margin:auto;
     left: 0;
     right: 0;
     width:80%;
     bottom:50px;
     background-color: #fff;
     border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
}
.big-font{
	font-size: 36px;
}
.top-title{
	position: absolute;
	right: 0;
    top: 0;
    margin-top: -28px;
    margin-right: -22px;
}
.top-title span{
    font-size: 32px;

}
</style>

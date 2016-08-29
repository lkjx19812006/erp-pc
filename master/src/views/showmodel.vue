<template>
    <div v-show="param.show" class="modal  fade" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div :show.sync="param.show">
            <hello-model v-show="param.name=='hello'"></hello-model>
            <test-model v-show="param.name=='test'"></test-model>
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

.modal_con {
    position: absolute;
    width: 50%;
    right: 0;
    left: 0;
    height: 100%;
    margin: 130px auto;
    z-index: 1080;
    padding: 0 5px;
}

.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -28px;
    margin-right: -22px;
}

.top-title span {
    font-size: 30px;
    color: #fff;
}
</style>

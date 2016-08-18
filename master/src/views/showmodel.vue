<template>
    <div v-show="param.show" class="modal">
        <div class="mui-popover mui-active" style="display: block; top: 50px; left: 10%;width:80%;bottom:50px">
            <div @click="param.show = false" class="top-title">
                <i class="mui-icon mui-icon-close big-font"></i>
            </div>
            <div :show.sync="param.show">
                <hello-model v-show="param.name=='hello'"></hello-model>
                <test-model v-show="param.name=='test'"></test-model>
            </div>
            <!--   <div class="mui-scroll-wrapper" data-scroll="2">
        <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
      sdfsfs
        </div>
     </div>
 -->
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
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    opacity: 0.5;
    background-color: #000;
}
.big-font{
	font-size: 36px;
}
.top-title{
	position: absolute;
	right: 0;
}
</style>

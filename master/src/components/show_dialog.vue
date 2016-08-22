<template>
    <div v-show="Popup.show" class="modal fade" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="Popup.show">
        <div @click="Popup.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div :show.sync="Popup.show">
            <order-dialog v-show="Popup.name=='order'"></order-dialog>
        </div>
    </div>
</template>
<script>
import order_dialog from '../components/order_dialog'
export default {
    components: {
        order_dialog
    },
    props: ['Popup'],
    data() {
        return {}
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
    display: block;
    position: absolute;
    top: 91px;
    margin: auto;
    left: 0;
    right: 0;
    width: 80%;
    bottom: 50px;
    background-color: #fff;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
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
    font-size: 32px;
}
</style>

<template>
    <tips-dialog :param="tipsParam" v-if="tipsParam.show"></tips-dialog>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container del_modal_con" v-show="param.show">
        <div class="model-header">
            <h4>{{$t('static.sure_Apply')}}</h4>
            <p style="width:!00%;height:20px"></p>
            <div class="model-footer">
                <button type="button" class="btn btn-close"  @click="cancel()">{{$t('static.cancel')}}</button>
                <button type="button" class="btn btn-orange" @click="confirm()">{{$t('static.confirm')}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import tipsDialog from '../tips/tipDialog'
import {
   applyQuotedPrice
} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
             customParam: {
                id: "",
                show: true,
                type:'',
                link:'',
                callback:''
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            }
        }
    }, 
     vuex: {
        actions: {
      applyQuotedPrice
        }
    },
    methods: {
        //取消
        cancel: function() {
            this.param.show = false;
        },
        //确定
        confirm: function() {
          this.applyQuotedPrice(this.customParam);
        },

    },
     created() {
        console.log("阿斯顿撒旦撒",this.param)
        this.customParam.id = this.param.id;
        this.customParam.type = this.param.type;
        this.customParam.link=this.param.link;
        this.customParam.callback = this.param.callback;
    }


}
</script>
<style scoped>
.modal {
   z-index: 1083
}
.del_modal_con{
    z-index: 1084
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

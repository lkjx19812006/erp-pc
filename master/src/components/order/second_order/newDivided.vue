<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div class="top-title">
            <span class="glyphicon glyphicon-remove-circle" @click="param.show=false"></span>
        </div>
        <div class="edit-content">
            <h3>新建分期付款</h3>
        </div>
        <validator name="validation">
          <form novalidate>
            <div class="edit-model">
                <section class="editsection clearfix">
                    <div class="editpage-input col-md-6">
                        <label class="editlabel">分付阶段{{param.orderStatus}}</label>
                        <select class="form-control" v-model="param.orderStatus">
                        	<option v-if="param.orderStatus>=20&&param.orderStatus<60">合同签订后</option>
                        	<option v-if="param.orderStatus==60" value="60">收货后</option>
                        	<option v-if="param.orderStatus==70" value="70">订单完成后</option>
                        </select>
                    </div>
                    <div class="editpage-input col-md-6">
                        <label class="editlabel">支付金额</label>
                        <input v-model="param.description" type="text" class="form-control" />
                    </div>
                    <div class="editpage-input col-md-6">
                        <label class="editlabel">比例</label>
                        <input v-model="param.description" type="text" class="form-control" />
                    </div>
                    <div class="editpage-input col-md-12">
                        <label class="editlabel">{{$t('static.description')}}</label>
                        <textarea style="width:100%;resize:none;border:1px solid #ddd;border-radius:5px;" rows="5" v-model="param.description">
                        </textarea>
                    </div>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                <input type="button" class="btn btn-confirm" v-if="$validation.valid" @click="param.callback(param,param.show = false)" value="{{$t('static.submit')}}" />
                 <input type="button" class="btn btn-confirm" v-else disabled="true"  value="{{$t('static.submit')}}" />
            </div>
          </form>
        </validator>
    </div>

</template>
<script>
	export default{
		props:['param'],
	}
</script>
<style scoped>
.modal{
   z-index: 1086;
}
.modal_con{
    width: 560px;
    height: 520px;
    top: 0;
    z-index: 1086
}
.edit_footer{
     width: 560px;
     position: absolute;
     bottom: 0;
}
.top-title{
     width: 560px;
     left: 0;
     right:0;
}
</style>
<template>
  <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
  <div>
    <p class="employee_right_title clear">
      <span class="left">{{$t('static.offer_message')}}</span>
      <span class="left btn-danger unread" v-if="loadparam.total!=0">{{loadparam.total}}</span>
    </p>
    <div class="refreshBtn">
      <button class="btn btn-primary right" @click="refresh()">{{$t('static.refresh')}}</button>
    </div>
    <div class="employee_right_message">
      <div class="cover_loading">
        <pulse-loader :loading="loadparam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <div class="employee_message_view" v-for="item in backloglist" @click='selectIndex=$index' :class="{actColor:$index===selectIndex}">
        <div class="message_view_left">
          <span>标题：{{item.title}}
                               <!--  <label v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index)" style="position:relative; bottom:-3px; float:right" v-if="loadparam.type==0">
                                </label> -->
                            </span>
          <p>内容：{{item.message }}</p>
          <time>{{item.mtime}}</time>
          <!-- <div class="message_view_right">
            <a @click="showDetail(item)">{{$t('static.details')}}</a>

          </div> -->
        </div>
        <div class="message_view_right" v-if="item.bizType=='order_validate'">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import detailModel from '../intention/offerDetail'
import {
  finishFlow,
  getBacklogList
} from '../../vuex/actions'
export default {
  components: {
    detailModel
  },
  props: ['loadparam', 'backloglist'],
  data() {
    return {
      title: '',
      selectIndex: null,
      detailParam: {
            show: false,
            loading: true,
            idOrName: true,
            link: "/intention/offers/",
            id: "",
            intoType:''
        },
    }
  },
  vuex: {
    actions: {
      finishFlow,
      getBacklogList
    }
  },
  methods: {
    refresh() {
     
    },
    showDetail: function(id,type) {
            
            this.detailParam.id = id;
            this.detailParam.intoType = type
            this.detailParam.show = true;
        },
  }
}
</script>
<style scoped>
.employee_right {
  float: left;
  overflow-y: auto;
}

.employee_right_title {
  color: #333;
  font-size: 18px;
}

.employee_right_message {
  clear: both;
  white-space: nowrap;
  border-top: none;
  padding-top: 5px;
  max-height: 647px;
  overflow-y: auto;
}
.unread{
  font-size: 12px;
  border-radius: 8px;
  margin-left: 10px;
  padding:0 5px
}
.employee_message_view {
  position: relative;
  border: 1px solid #ddd;
  padding: 10px 8px;
  border-radius: 8px;
  -webkit-border-radius: 8px;
  margin-bottom: 10px;
}

.actColor {
  background-color: #ccc
}
.message_view_left {
  color: #333;
  font-size: 15px;
  white-space: normal;
}

.message_view_left span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.message_view_left time {
  color: #999;
  font-size: 14px;
}

.message_view_right {
  position: absolute;
  right: 14px;
  bottom: 11px;
  vertical-align: middle;
}

.message_view_right a {
  font-size: 13px;
  margin: 0px 5px;
}

.employee_top {
  margin-bottom: 20px;
}

.employee_line {
  height: 420px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
}

.notice_message_view {
  position: relative;
  border: 1px solid #ddd;
  padding: 10px 8px;
  border-radius: 0 8px 8px 0;
  -webkit-border-radius: 0 8px 8px 0;
  margin-bottom: 10px;
}

.level-five {
  border-left: 4px solid #D9534F;
}

.level-four {
  border-left: 4px solid #F0AD4E;
}

.level-three {
  border-left: 4px solid #5BC0DE;
}

.level-two {
  border-left: 4px solid #CCCCCC;
}

.level-one {
  border-left: 4px solid #5CB85C;
}

.level-default {
  border-left: 4px solid #CCCCCC;
}

.linechart {
  width: 100%;
  height: 420px;
}

.select_btn {
  display: inline-block;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
}

.select_btn_person,
.select_btn_date {
  display: inline-block;
  color: #333;
  font-size: 14px;
  float: left;
  padding: 5px 10px 5px 5px;
}

.select_btn_img {
  display: inline-block;
  text-align: center;
  margin-top: 12px;
  padding: 0 8px;
}
</style>

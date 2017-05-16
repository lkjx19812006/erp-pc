<template>
  <div>
    <tip-model :param="tipParam" v-if="tipParam.show"></tip-model>
    <div class="employee clear">
      <div class="col-md-4 col-xs-12 employee_right_wrap">
        <p class="employee_right_title clear">
          <span class="left">{{$t('static.Notifications')}}</span>
          <span class="left btn-danger unread" v-if="noticeParam.total!=0&&noticeParam.type=='0'">{{noticeParam.total}}</span>
          <div class="btn-group">
            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===0}" @click="selectType(0)">
              {{$t('static.Notifications_today')}}
            </button>
            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===1}" @click="selectType(1)">
              {{$t('static.Notifications_three')}}
            </button>
            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===2}" @click="selectType(2)">
              {{$t('static.Read_notifications')}}
            </button>
          </div>
          <button class="btn btn-primary right" @click="refreshNotice()">{{$t('static.refresh')}}</button>
          <!-- 全选 -->
          <div class="checkall" v-if="noticeParam.type==0&&this.initNoticeList.length!==0">
            <span>{{$t('static.Select_all')}} : </span>
            <span class="selectAll" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()" style="position:relative; bottom:-1px; float:right">
            </span>
          </div>
          <div class="btn btn-info btn-xs" style="float:right; margin-left:30px; margin-top:5px" @click="signRead" v-if="noticeParam.type==0&&this.initNoticeList.length!==0">{{$t('static.Mark_read')}}</div>
          <!-- 标记为已读 -->
        </p>
        <div class="employee_right_message">
          <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
          <div class="notice_message_view" v-for="item in initNoticeList" v-bind:class="{'level-five':item.urgent>80&&noticeParam.type !== 2,'level-four':item.urgent<=80&&item.urgent>60&&noticeParam.type !== 2,'level-three':item.urgent<=60&&item.urgent>40&&noticeParam.type !== 2,'level-two':item.urgent<=40&&item.urgent>20&&noticeParam.type !== 2,'level-one':item.urgent<=20&&noticeParam.type !== 2,'level-default': noticeParam.type===2}">
            <div class="message_view_left">
              <span>标题：{{item.title}}
                                <label v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index)" style="position:relative; bottom:-3px; float:right" v-if="noticeParam.type==0">
                                </label>
                            </span>
              <p>内容：{{item.message }}</p>
              <time>{{item.mtime}}</time>
            </div>
          </div>
          <infinite-loading :on-infinite="onInfinite" :distance="10"></infinite-loading>
        </div>
      </div>
      <div class="employee_right col-md-4 col-xs-12">
        <message-view :loadparam="loadParam" :backloglist="initBacklogList"></message-view>
      </div>
      <div class="employee_right col-md-4 col-xs-12">
        <offer-message-view :loadparam="offerNoticeParam" :backloglist="initOfferMessageList"></offer-message-view>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from '../components/pagination'
import tipModel from '../components/tips/tipDialog'
import util from '../components/tools/util.js'
import messageView from '../components/message/message'
import offerMessageView from '../components/message/offerMessage'
import {
  getList,
  initBacklogList,
  initNoticeList,
  initOfferMessageList
} from '../vuex/getters'
import {
  getBacklogList,
  getNoticeList,
  readNotice,
  getOfferMessageList
} from '../vuex/actions'
export default {
  components: {
    util,
    pagination,
    messageView,
    offerMessageView,
    tipModel
  },
  data() {
    return {
      selectIndex: null,
      isActive: true,
      loadParam: {
        loading: true,
        show: false,
        link: '/flow/',
        color: '#5dc596',
        size: '15px',
        cur: 1,
        all: 7,
        total: 0,
        messageLen:0
      },
      noticeParam: {
        loading: true,
        link: '/notification/queryToday',
        type: 0, //0/1/2,今日/三天/已读通知
        color: '#5dc596',
        size: '15px',
        cur: 1,
        all: 7,
        total: 0,
        id: null,
        read: "0",
        callback: ''
      },
      offerNoticeParam: {
        loading: true,
        bizType: ['offer'],
        link: '/notification/queryToday',
        type: 0, //0/1/2,今日/三天/已读通知
        color: '#5dc596',
        size: '15px',
        cur: 1,
        all: 7,
        total: 0,
        id: null,
        read: "0",
        callback: ''
      },
      tipParam: {
        show: false,
        alert: true,
        name: "",
      },
      notificationParam: {
        link: '',
        ids: [],
        callback: ''
      },
      checked: false
    }
  },
  vuex: {
    getters: {
      getList,
      initBacklogList,
      initNoticeList,
      initOfferMessageList
    },
    actions: {
      getBacklogList,
      getNoticeList,
      readNotice,
      getOfferMessageList
    },
  },
  methods: {
    onInfinite() {
      if (this.initNoticeList.length == 0) {
        return setTimeout(() => {
          this.$broadcast('$InfiniteLoading:loaded');
        }, 1000);
      }
      this.noticeParam.cur++;
      this.noticeParam.callback = this.noticeCallBack;
      this.getNoticeList(this.noticeParam);
    },
    noticeCallBack(arr) {
      if (arr.length === 15) {
        setTimeout(() => {
          this.$broadcast('$InfiniteLoading:loaded');
        }, 500);
      } else {
        setTimeout(() => {
          this.$broadcast('$InfiniteLoading:complete');
        }, 500);

      }
    },
    selectType: function(type) {
      this.noticeParam.type = type;
      if (type == 0) { //当天
        this.noticeParam.read = "0";
        this.noticeParam.link = "/notification/queryToday";
      }
      if (type == 1) { //三日内
        this.noticeParam.read = "";
        this.noticeParam.link = "/notification/queryRdDay";
      }
      if (type == 2) { //已读
        this.noticeParam.read = "1";
        this.noticeParam.link = "/notification/query";
      }
      this.getNoticeList(this.noticeParam);
    },
    checkedAll: function() {
      this.checked = !this.checked;
      if (this.checked) {
        this.$store.state.table.basicBaseList.noticeList.forEach(function(item) {
          item.checked = true;
        })
      } else {
        this.$store.state.table.basicBaseList.noticeList.forEach(function(item) {
          item.checked = false;
        })
      }
    },
    onlyselected: function(sub) {
      const _this = this;
      this.$store.state.table.basicBaseList.noticeList[sub].checked = !this.$store.state.table.basicBaseList.noticeList[sub].checked;
      if (!this.$store.state.table.basicBaseList.noticeList[sub].checked) {
        _this.checked = false;
      } else {
        _this.checked = true;
        this.$store.state.table.basicBaseList.noticeList.forEach(function(item) {
          if (!item.checked) {
            _this.checked = false;
          }
        })
      }
    },
    refreshNotice: function() {
      this.noticeParam.cur=1;
      this.getNoticeList(this.noticeParam);
    },
    read: function(param) {
      this.notificationParam.ids = [];
      this.notificationParam.ids.push(param);
      this.notificationParam.link = '/notification/read';
      this.notificationParam.callback = this.notificationCallback;
      this.readNotice(this.notificationParam);
    },
    signRead: function() {
      this.notificationParam.ids = [];
      for (var i = 0; i < this.initNoticeList.length; i++) {
        if (this.initNoticeList[i].checked == true) {
          this.notificationParam.ids.push(this.initNoticeList[i].id)
        }
      }
      this.notificationParam.link = '/notification/read';
      this.notificationParam.callback = this.notificationCallback;
      this.readNotice(this.notificationParam);
    },
    notificationCallback: function(title) {
      this.tipParam.show = true;
      this.tipParam.name = title;
      this.getNoticeList(this.noticeParam);
    }
  },
  created() {
    if (this.$route.query.id > this.getList[0].subcategory.length || isNaN(this.$route.query.id) || !this.$route.query.id) {
      this.$route.query.id = 0;
    }
    //获取待办事项
    this.getBacklogList(this.loadParam);
    //获取消息通知
    this.getNoticeList(this.noticeParam);
    this.getOfferMessageList(this.offerNoticeParam);
  },
  events: {
    fresh: function(input) {
      this.noticeParam.cur = input;
      this.getNoticeList(this.noticeParam);
    },
    refresh: function(input) {
      this.getBacklogList(this.loadParam);
    }
  }
}
</script>
<style scoped>
.left {
  margin-bottom: 10px;
}

.employee_right_message>.actColor {
  background-color: #ccc
}

.checkbox_select {
  background-image: url(/static/images/selected.png);
  display: inline-block;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  background-size: 80%;
  margin: auto;
  text-align: center;
  background-position: 5px;
}
.unread{
  font-size: 12px;
  border-radius: 8px;
  margin-left: 10px;
  padding:0 5px
}
.checkbox_unselect {
  background-image: url(/static/images/unselect.png);
  display: inline-block;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  background-size: 80%;
  margin: auto;
  text-align: center;
  background-position: 5px;
}

.checkall {
  float: right;
  margin: 5px 11px 0 15px;
}

.checkall span {
  font-size: 14px;
  vertical-align: middle;
}

.checkall input {
  margin-top: 0;
  width: 17px;
  height: 17px;
  vertical-align: middle;
  cursor: pointer;
}

.page {
  position: fixed;
}

.order-detail {
  font-size: 15px;
  color: #D9534F;
  overflow-x: hidden;
  word-wrap: break-word;
  width: 350px;
  min-height: 50px;
  white-space: normal;
  padding: 10px 5px;
}

.employee {
  position: relative;
  padding: 25px 30px 0 40px;
  background: #fff;
}

.employee_left {
  position: relative;
  padding-right: 30px;
}

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

.employee_message_view {
  position: relative;
  border: 1px solid #ddd;
  padding: 10px 8px;
  border-radius: 8px;
  -webkit-border-radius: 8px;
  margin-bottom: 10px;
}

.message_view_left {
  color: #333;
  font-size: 15px;
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
  white-space: normal;
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

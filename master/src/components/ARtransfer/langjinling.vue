<style scoped>
  * {
    box-sizing: border-box;
  }

  /*包裹盒子*/

  .langjinling {
    padding: 10px;
  }

  /*頭部tab切換開始*/

  .langjinling .top_tab {
    display: flex;
    flex-display: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }

  .langjinling .top_tab div {
    flex: 0 0 auto;
    padding: 5px 30px;
    font-size: 16px;
    border: 1px solid #F0AD4E;
    color: #F0AD4E;
    cursor: pointer;
  }

  .langjinling .top_tab div:nth-child(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .langjinling .top_tab div:nth-child(2) {
    border-left: 0 none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .langjinling .top_tab .active {
    background-color: #F0AD4E;
    color: #fff;
  }

  /*筛选条件开始*/

  .langjinling .search-filter {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .langjinling .search-filter .form-item {
    flex: 1 0 auto;
    margin: 10px;
    margin-top: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .langjinling .search-filter .form-item:nth-child(4){
    flex: 0 0 200px;
    justify-content: space-between;
  }
  .langjinling .search-filter .form-item label {
    margin-right: 10px;
  }

  /*录入按钮开始*/

  .langjinling .input-info-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    padding-right: 10px;
  }

  .langjinling .input-info-btn .btn {
    flex: 0 0 auto;
    background-color: #169BD5;
    color: #fff;
    border-radius: 5px;
    padding: 8px 15px;
    margin-bottom: 10px;
  }
  
  /*分页开始*/
  .langjinling .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  /*弹出录入对话框*/
  .langjinling .top-search {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 15px 0;
  }
  .langjinling .top-search .detail-item {
      flex: 0 1 auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-right: 10px;
   }
  .langjinling .top-search .detail-item span {
    margin-right: 10px;
  }
  .langjinling .top-search .detail-item:nth-child(4){
    flex: 0 0 auto;
    width: 135px;
    justify-content: space-between;
  }
  .langjinling .page-wrap {
   margin-top: 15px;
   display: flex; 
   flex-direction: row;
   justify-content: center;
   align-items: center;
  }
  /*弹框遮罩层*/
 .langjinling  .my-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .langjinling  .my-wrap > div{
    background-color: rgba(255,255,255, .6);
    border-radius: 6px;
  }
  .langjinling  .my-wrap .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
</style>
<template>
  <div class="langjinling">
    <!--头部按钮切换-->
    <div class="top_tab">
      <div class="show-sx" :class="{'active':tabIndex === 0}" @click="tabIndex=0">
        授信
      </div>
      <div class="show-dk" :class="{'active':tabIndex === 1}" @click="tabIndex=1">
        贷款
      </div>
    </div>
    <!--筛选条件-->
    <div class="search-filter">
      <div class="form-item">
        <label>企业编号</label>
        <i-input @on-enter="getHttp" :value.sync="formData.cid" placeholder="按回车搜索"></i-input>
      </div>
      <div class="form-item">
        <label>企业名称</label>
        <i-input @on-enter="getHttp" :value.sync="formData.name" placeholder="按回车搜索"></i-input>
      </div>
      <div class="form-item">
        <label>授信状态</label>
        <select @change="getHttp" class="form-control" v-model="formData.ljlStatus">
          <option value="">全部</option>
          <option value="ACTIVATED ">已开通</option>
          <option value="DEACTIVATED">未开通</option>
          <option value="ORGANIZATION_REFUSE">机构拒绝</option>
          <option value="INFO_REFUSE">资料拒绝</option>
          <option value="RC_REFUSE">风控拒绝</option>
          <option value="REPORT_REFUSE">报告拒绝</option>
          <option value="ALLOW_REGISTER">重新注册</option>
        </select>
      </div>
      <div class="form-item">
        <i-button @click="clearSearch">清空</i-button>
        <i-button @click="getHttp" icon="ios-search" type="primary">搜索</i-button>
        <i-button @click="getHttp" type="primary">刷新</i-button>
      </div>
    </div>
    <!--录入按钮-->
    <div class="input-info-btn">
      <div class="btn" @click="inputCurInfo">
        录入企业信息
      </div>
    </div>
    <i-table border :columns="columns" :data="resultData.list"></i-table>
    <!--底部分頁-->
    <div class="pagination">
      <Page @on-change="changePn" @on-page-size-change="changePSize" :total="resultData.total" show-sizer></Page>
    </div>
    <!--录入对话框-->
    <Modal :visible.sync="showModal" :style="{top: '100px', width: '800px'}" :loading="loading" title="录入企业信息">
      <!--头部搜索-->
      <div class="top-search">
        <div class="detail-item">
          <span>客户ID</span>
          <i-input @on-enter="getCurCidHttp" :value.sync="cusListFormData.id" placeholder="按回车搜索"></i-input>
        </div>
        <div class="detail-item">
          <span>客户名称</span>
          <i-input @on-enter="getCurCidHttp" :value.sync="cusListFormData.name" placeholder="按回车搜索"></i-input>
        </div>
        <div class="detail-item">
          <span>联系手机</span>
          <i-input @on-enter="getCurCidHttp" :value.sync="cusListFormData.mainPhone" placeholder="按回车搜索"></i-input>
        </div>
        <div class="detail-item">
          <i-button @click="clearFormData">清空</i-button>
          <i-button @click="getCurCidHttp" type="primary" icon="ios-search">搜索</i-button>
        </div>
      </div>
      <!--表格-->
      <i-table :content="customerContent" border :columns="customer" size="small" :data="customerList.list"></i-table>
      <!--底部分页-->
      <div class="page-wrap">
        <Page @on-change="changePnCus" :total="customerList.total"></Page>
      </div>
      <!--遮罩层-->
      <div class="my-wrap" v-show="showLoading">
        <Spin fix>
          <Icon type="load-c" size=50 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
      <!--自定底部-->
      <div slot="footer">
        <i-button @click="cancel">取消</i-button>
        <i-button type="primary" @click="inputCurstomer" :loading="confirmLoading">确定</i-button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import httpService from '../../common/httpService'
  export default {
    data() {
      var _self = this;
      return {
        showLoading: false,
        confirmLoading: false,
        loading: false,
        inputCurstomerId: '',
        customerContent: _self,
        showModal: false,
        tabIndex: 0,
        columns: [{
          align: 'center',
          title: '企业编号',
          key: 'cid'
        }, {
          align: 'center',
          title: '企业名称',
          key: 'name',
        }, {
          align: 'center',
          title: '总授信额度',
          key: 'credit'
        }, {
          align: 'center',
          title: '已使用授信额度',
          key: 'creditFreeze'
        }, {
          align: 'center',
          title: '剩余授信额度',
          key: 'creditBalance'
        }, {
          align: 'center',
          title: '账户是否被冻结',
          render(row) {
            return `<Tag color="green" v-if="${row.isFreezing} === 0">账户正常</Tag>
                    <Tag color="red" v-if="${row.isFreezing} === 1">账户被冻结</Tag>`
          }
        }, {
          align: 'center',
          title: '授信状态',
          render(row, column, index) {
            //访问过滤器原型方法
            var status = _self.constructor.filter('filterLjlStatus')(row.ljlStatus);
            return `${status}`;
          }
        }, {
          align: 'center',
          title: '操作',
          width: 160,
          render(row, column, index) {
            //只有账户为未开通 DEACTIVATED 以及ALLOW_REGISTER 让其开通  账户为开通的时候 ACTIVATED让其更新 
            var showRsg = row.ljlStatus === 'DEACTIVATED' || row.ljlStatus === 'ALLOW_REGISTER';
            var showUpdate = row.ljlStatus === 'ACTIVATED';
            return `<i-button size="small" v-if="${showRsg}" @click="rsgLjl(${index})">注册</i-button>
                    <i-button size="small" v-if="${showUpdate}" @click="updateUserInfo(${index})">更新</i-button>`;
          }
        }],
        formData: {
          pn: 1,
          pSize: 10,
          cid: '',
          acid: '',
          name: '',
          ljlStatus: '',
          isFreezing: ''
        },
        customerList: { list: [], total: 0 },
        customer: [{
          align: 'center',
          title: '客户编号',
          key: 'id'
        }, {
          align: 'center',
          title: '客户名称',
          key: 'name'
        }, {
          align: 'center',
          title: '联系人',
          key: 'mainContact'
        }, {
          align: 'center',
          title: '手机',
          key: 'mainPhone'
        }, {
          width: 120,
          align: 'center',
          title: '操作',
          render(row, column, index) {
            var showSeleBtn = row.selected;
            return `<i-button v-if="${showSeleBtn} === 0" size="small" @click="selectCustomer(${index})">选择客户</i-button>
                    <i-button v-if="${showSeleBtn} === 1" size="small" disabled>选择客户</i-button>
                    <i-button type="primary" v-if="${showSeleBtn} === 2" size="small" @click="selectCustomer(${index})">选择客户</i-button>`;
          }
        }],
        cusListFormData: {
          pn: 1,
          pSize: 10,
          name: '',
          mainPhone: '',
          id: '',
          blacklist: 0,
        },
        resultData: { list: [], total: 0 }
      }
    },
    ready() {
      this.getHttp();
    },
    methods: {
      clearSearch() {
        this.formData.pn = 1;
        this.formData.pSize = 10;
        this.formData.cid = '';
        this.formData.acid = '';
        this.formData.name = '';
        this.formData.ljlStatus = '';
        this.formData.isFreezing = '';
        this.getHttp();
      },
      //企业录入
      inputCurInfo() {
        if (this.customerList.list.length === 0) {
          this.getCurCidHttp();
        }
        this.showModal = true;
      },
      //选择客户 保持唯一选中
      selectCustomer(index) {
        //排他 激活状态下为false
        if (this.customerList.list[index].selected === 0) {
          //全部关闭
          this.customerList.list.forEach(item => {
            item.selected = 1;
          })
          this.customerList.list[index].selected = 2;
          this.inputCurstomerId = this.customerList.list[index].id;
        } else if (this.customerList.list[index].selected === 2) {
          //全部开启
          this.customerList.list.forEach(item => {
            item.selected = 0;
          })
          this.inputCurstomerId = '';
        }

      },
      //清空搜索条件
      clearFormData() {
        this.cusListFormData.pn = 1;
        this.cusListFormData.pSize = 10;
        this.cusListFormData.name = '';
        this.cusListFormData.id = '';
        this.cusListFormData.mainPhone = '';
        this.getCurCidHttp();
      },
      //确定录入      
      inputCurstomer() {
        if (this.inputCurstomerId === '') {
          this.$Message.warning('请选择客户......', 3);
        } else {
          this.confirmLoading = true;
          this.getRegisterHttp(this.inputCurstomerId).then(suc => {
            this.getHttp();
            this.confirmLoading = false;
            this.showModal = false;
          }, err => {
            this.confirmLoading = false;
            this.$Message.warning(err.msg, 3);
          });
        }
      },
      //客户列表分页
      changePnCus(pn) {
        this.cusListFormData.pn = pn;
        this.getCurCidHttp();
      },
      cancel() {
        this.showModal = false;
      },
      //注册蓝金灵
      rsgLjl(index) {
        var param = this.resultData.list[index];
        //用户注册
        this.getRegisterHttp(param.cid);
      },
      //更新用户信息
      updateUserInfo(index) {
        var param = this.resultData.list[index];
        this.updatedLjlUserInfo(param.acid)
      },
      //页码改变
      changePn(pn) {
        this.formData.pn = pn;
        this.getHttp()
      },
      //分页大小改变
      changePSize(psize) {
        this.formData.pn = 1;
        this.formData.pSize = psize
        this.getHttp();
      },
      //更新用户信息
      updatedLjlUserInfo(acid) {
        var body = {
          biz_module: 'erpCustomerLjlCreditService',
          biz_method: 'updateLjlCustomer',
          biz_param: {
            acid: acid
          }
        }
        httpService.commonPOST(body).then(suc => {
          console.log(suc);
          this.getHttp();
        })
      },
      //获取注册接口
      getRegisterHttp(cid) {
        var body = {
          biz_module: 'erpCustomerLjlCreditService',
          biz_method: 'register',
          biz_param: {
            cid: cid
          }
        }
        return new Promise((resolve, reject) => {
          httpService.commonPOST(body).then(suc => {
            //拼接URL地址
            if (suc.code === '1c01') {
              var urlObj = suc.biz_result;
              var linkUrl = urlObj.url + '?';
              var str = ''
              for (var key in urlObj) {
                if (key != 'url') {
                  str += `${key}=${urlObj[key]}&`
                }
              }
              str = str.substring(str.length - 1, -1);
              linkUrl = linkUrl + str;
              window.open(linkUrl);
              resolve()
            } else if (suc.code === '0e00') {
              reject(suc)
            }
          }, err => {
            console.log(err);
            reject()
          })
        })
      },
      //获取列表数据
      getHttp() {
        var body = {
          biz_module: 'erpCustomerLjlCreditService',
          biz_method: 'queryLjlCustomerList',
          biz_param: httpService.filterFormData(this.formData)
        }
        httpService.commonPOST(body).then(suc => {
          console.log(suc);
          this.resultData = suc.biz_result;
        }, err => {
          console.log(err);
        })
      },
      //获取客户ID信息
      getCurCidHttp() {
        var body = {
          biz_module: 'erpCustomerService',
          biz_method: 'queryCustomerList',
          biz_param: this.cusListFormData
        }
        this.showLoading = true;
        httpService.commonPOST(body).then(suc => {
          suc.biz_result.list.forEach(item => {
            //selected 为0时都可以选 为1时都不可以选 为2时为已选中按钮
            item.selected = 0;
          })
          this.customerList = suc.biz_result;
          this.showLoading = false;
        }, err => {
          this.showLoading = false;
        })
      }
    }
  }
</script>
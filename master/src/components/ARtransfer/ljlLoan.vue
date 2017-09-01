<style scoped>
  * {
    box-sizing: border-box;
  }

  /*包裹盒子*/

  .ljlLoan {
    padding: 10px;
    font-size: 14px;
  }
  /*筛选条件开始*/

  .ljlLoan .search-filter {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .ljlLoan .search-filter .form-item {
    flex: 1 0 auto;
    margin: 10px;
    margin-top: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .ljlLoan .search-filter .form-item:last-child{
    flex: 0 0 200px;
    justify-content: space-between;
  }
  .ljlLoan .search-filter .form-item label {
    margin-right: 10px;
  }

  /*新建贷款按钮开始*/

  .ljlLoan .input-info-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    padding-right: 10px;
  }

  .ljlLoan .input-info-btn .btn {
    flex: 0 0 auto;
    background-color: #169BD5;
    color: #fff;
    border-radius: 5px;
    padding: 8px 15px;
    margin-bottom: 10px;
  }
  
  /*分页开始*/
  .ljlLoan .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  /*弹出新建话框*/
  .ljlLoan .top-search {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }
  .ljlLoan .top-search .my-btn-color {
      background-color: #169BD5;
      color: #fff;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
  }
  /*弹框订单信息展示开始*/
  .ljlLoan .order-wrap {
    height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: normal;
  }
  .ljlLoan .order-wrap .detail-items {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 5px;
  }
  .ljlLoan .order-wrap .detail-items .title {
      flex: 0 0 auto;
      width: 100%;
      padding: 10px 0;
  }
  .ljlLoan .order-wrap .detail-items .title span {
      padding: 6px 15px;
      border-radius: 6px;
      color: #fff;
      background-color: #169BD5;
      font-weight: 700;
  }
  .color-red {
      color: red
  }
  .ljlLoan .order-wrap .detail-items .item-info-wrap {
       flex: 0 0 auto;
       display: flex;
       flex-direction: row;
       justify-content: flex-start;
       flex-wrap: wrap;
       border-bottom: 1px solid #d0d0d0;
   }
  .ljlLoan .order-wrap .detail-items .item-info-wrap .item-info {
      flex: 1 0 auto;
      width: 33.3333%;
      line-height: 1.5;
      margin-bottom: 10px;
      padding-right: 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
  }  
  .ljlLoan .order-wrap .detail-items .item-info .tit {
      font-weight: 700;
      flex: 0 0 auto;
  }   
   .ljlLoan .order-wrap .detail-items .item-info .info {
      flex: 1;
   }  
   .ljlLoan .order-wrap .detail-items .description {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 10px 0;
        border-bottom: 1px solid #d0d0d0;
   }
  .ljlLoan .bottom-table .product-table {
      font-weight: 700;
      padding: 10px 0;
  }
  /*弹框遮罩层*/
 .ljlLoan .my-wrap {
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
  .ljlLoan  .my-wrap > div{
    background-color: rgba(255,255,255, .6);
    border-radius: 6px;
  }
  .ljlLoan  .my-wrap .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
</style>
<template>
    <div class="ljlLoan">
        <!--筛选条件-->
        <div class="search-filter">
            <div class="form-item">
                <label>订单ID</label>
                <i-input @on-enter="getHttp" :value.sync="formData.orderId" placeholder="按回车搜索"></i-input>
            </div>
            <div class="form-item">
                <label>订单号</label>
                <i-input @on-enter="getHttp" :value.sync="formData.orderNum" placeholder="按回车搜索"></i-input>
            </div>
            <div class="form-item">
                <label>客户名称</label>
                <i-input @on-enter="getHttp" :value.sync="formData.name" placeholder="按回车搜索"></i-input>
            </div>
            <div class="form-item">
                <label>客戶ID</label>
                <i-input @on-enter="getHttp" :value.sync="formData.cid" placeholder="按回车搜索"></i-input>
            </div>
            <div class="form-item">
                <i-button @click="clearSearch">清空</i-button>
                <i-button @click="getHttp" icon="ios-search" type="primary">搜索</i-button>
                <i-button @click="getHttp" type="primary">刷新</i-button>
            </div>
        </div>
        <!--新建贷款-->
        <div class="input-info-btn">
            <div class="btn" @click="newAddLoan">
                新建贷款
            </div>
        </div>
        <i-table border :columns="columns" :data="resultData.list"></i-table>
        <!--底部分頁-->
        <div class="pagination">
            <Page @on-change="changePn" @on-page-size-change="changePSize" :total="resultData.total" show-sizer></Page>
        </div>
        <!--新建话框-->
        <Modal :visible.sync="showModal" :style="{top: '100px', width: '800px'}" :loading="loading" title="新建贷款">
            <!--头部搜索-->
            <div class="top-search">
                <i-input @on-enter="getOrderDetail" :value.sync="orderDetailId" placeholder="请输入订单ID">
                    <i-button @click="getOrderDetail" type="primary" class="my-btn-color" slot="append" icon="ios-search">搜索订单</i-button>
                </i-input>
            </div>
            <!--订单信息展示-->
            <div class="order-wrap" v-show="orderDetailResult.id !== undefind">
                <div class="detail-items">
                    <div class="title">
                        <span>客户信息</span>
                    </div>
                    <div class="item-info-wrap">
                        <div class="item-info">
                            <span class="tit">客户名称：</span>
                            <span class="info">{{orderDetailResult.customerName}}</span>
                        </div>
                        <div class="item-info">
                            <span class="tit">客户ID：</span>
                            <span class="info">{{orderDetailResult.customer}}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-items">
                    <div class="title">
                        <span>订单信息</span>
                    </div>
                    <div class="item-info-wrap">
                        <div class="item-info">
                            <span class="tit">品种：</span>
                            <span class="info">{{orderDetailResult.goodsDesc}}</span>
                        </div>
                        <div class="item-info">
                            <span class="tit">订单ID：</span>
                            <span class="info">{{orderDetailResult.id}}</span>
                        </div>
                        <div class="item-info">
                            <span class="tit">订单号：</span>
                            <span class="info">{{orderDetailResult.no}}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-items">
                    <div class="title">
                        <span>收件人</span>
                    </div>
                    <div class="item-info-wrap">
                        <div class="item-info">
                            <span class="tit">收货人电话：</span>
                            <span class="info">{{orderDetailResult.consigneePhone}}</span>
                        </div>
                        <div class="item-info">
                            <span class="tit">收货人姓名：</span>
                            <span class="info">{{orderDetailResult.consignee}}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-items">
                    <div class="title">
                        <span>成交金额</span>
                    </div>
                    <div class="item-info-wrap">
                        <div class="item-info">
                            <span class="tit color-red">成交金额：</span>
                            <span class="info">{{orderDetailResult.total}}</span>
                        </div>
                        <div class="item-info">
                            <span class="tit">付款：</span>
                            <span class="info">{{orderDetailResult.prepaid}}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-items">
                    <div class="item-info description">
                        <span class="tit">备注：</span>
                        <span class="info">{{orderDetailResult.description}}</span>
                    </div>
                </div>
                <!--底部表格-->
                <div class="bottom-table">
                    <div class="product-table">
                        商品订单列表
                    </div>
                    <!--表格-->
                    <i-table border :columns="orderDetail" :data="orderDetailResult.goods"></i-table>
                </div>
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
                <i-button type="primary" @click="inputCurstomer" :disabled="!orderDetailResult.id" :loading="confirmLoading">确定</i-button>
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
                orderDetailId: '',
                showModal: false,
                tabIndex: 0,
                columns: [{
                    align: 'center',
                    title: '订单ID',
                    key: 'orderId'
                }, {
                    align: 'center',
                    title: '订单号',
                    key: 'orderNum',
                }, {
                    align: 'center',
                    title: '客戶名称',
                    key: 'name'
                }, {
                    align: 'center',
                    title: '客戶ID',
                    key: 'cid'
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
                    orderId: '',
                    orderNum: ''
                },
                orderDetailResult: {},
                orderDetail: [{
                    align: 'center',
                    title: '品种',
                    key: 'breedName'
                }, {
                    align: 'center',
                    title: '产地',
                    render(row) {
                        var str = '';
                        str = _self.constructor.filter('province')(row.location);
                        return `${str}`
                    }
                }, {
                    align: 'center',
                    title: '规格',
                    render(row) {
                        var str = '';
                        str = row.spec || '不限';
                        return `${str}`
                    }
                }, {
                    align: 'center',
                    title: '数量（单位）',
                    render(row) {
                        var str = '';
                        str = row.number + _self.constructor.filter('Unit')(row.unit);
                        return `${str}`;
                    }
                }],
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
                this.formData.orderId = '';
                this.formData.orderNum = '';
                this.getHttp();
            },
            //新建贷款
            newAddLoan() {
                this.orderDetailId = '';
                this.orderDetailResult = {};
                this.showModal = true;
            },
            //确定新建      
            inputCurstomer() {
                this.getRegisterHttp(this.inputCurstomerId).then(suc => {
                    this.getHttp();
                    this.confirmLoading = false;
                    this.showModal = false;
                }, err => {
                    this.confirmLoading = false;
                    this.$Message.warning(err.msg, 3);
                });
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
                    biz_module: 'erpOrderLjlPayService',
                    biz_method: 'queryLjlOrderList',
                    biz_param: httpService.filterFormData(this.formData)
                }
                httpService.commonPOST(body).then(suc => {
                    console.log(suc);
                    this.resultData = suc.biz_result;
                }, err => {
                    console.log(err);
                })
            },
            //获取订单详情
            getOrderDetail() {
                if (!this.orderDetailId) {
                    this.$Message.warning('请输入订单ID', 3);
                    return;
                }
                var body = {
                    biz_module: 'erpOrderService',
                    biz_method: 'getOrderDetail',
                    biz_param: {
                        id: this.orderDetailId,
                    }
                }
                this.showLoading = true;
                httpService.commonPOST(body).then(suc => {
                    if (suc.code === '1c01') {
                        this.orderDetailResult = suc.biz_result;
                    } else if (suc.code === '0e00') {
                        this.$Message.warning(suc.msg, 3);
                    }
                    this.showLoading = false;
                }, err => {
                    this.$Message.warning(err.msg, 3);
                    this.showLoading = false;
                })
            }
        }
    }
</script>
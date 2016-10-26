<template>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <div v-show="!changeParam.show">
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">药款转出</div>
     <!--  <div class="right col-xs-2">
       <button class="new_btn transfer" @click="createCustomer({
                                            show:true,
                                            title:'新建产品',
                                            type:'',
                                            name:'',
                                            breedId:'',
                                            quality:'',
                                            location:'',
                                            spec:'',
                                            number:'',
                                            price:'',
                                            unit:'',
                                            duedate:'',
                                            coa:'',
                                            cid:'',
                                            link:newProduct,
                                            url:'/customer/product'
                                       })">新建</button>
     </div> -->
    </div>
    <div class="order_table">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak>
        <thead>
            <tr>
              <th>文件类型</th>
              <th>所属文件</th>
              <th>路径</th>
              <th>描述</th>
              <th>状态</th>
              <!-- <th></th> -->
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initProductlist">
            <td>{{item.fileType}}</td>
            <td>{{item.bizType}}</td>
            <td class="underline"  @click="clickOn({
                               id:item.id,
                               sub:$index,
                               show:true,
                               name:item.name
                               })">
                    <img v-bind:src="item.path" v-if="item.fileType=='image'" />
                    <img  src="/static/images/pdf.png" v-else>
            </td>
            <td>{{item.description}}</td>
            <td>{{item.status}}</td>
            <!-- <td @click.stop="eventClick($index)">
              <img height="24" width="24" src="/static/images/default_arrow.png" />
              <div class="component_action" v-show="item.show">
                <ul>
                  <li @click="modifySupply({
                                 sub:$index,
                                 id:item.id,
                                 cid:item.cid,
                                 show:true,
                                 title:'编辑产品',
                                 type:item.type,
                                 name:item.name,
                                 breedId:item.breedId,
                                 quality:item.quality,
                                 location:item.location,
                                 spec:item.spec,
                                 number:item.number,
                                 price:item.price,
                                 unit:item.unit,
                                 duedate:item.duedate,
                                 coa:item.coa,
                                 link:updateProduct,
                                 url:'/customer/product',
                                 headline:'productList'
                                })">编辑</li>
                </ul>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="base_pagination">
      <pagination :combination="loadParam"></pagination>
    </div>
  </div>
</template>
<script>
  import pagination from '../pagination'
  import detailModel from '../supply/productDetail'
  import {
    initProductlist
  } from '../../vuex/getters'
  import {
    getProductList
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      detailModel
    },
    vuex: {
      getters: {
        initProductlist
      },
      actions: {
        getProductList
      }
    },
    data() {
      return {
        loadParam: {
          loading: true,
          show:false,
          color: '#5dc596',
          size: '15px',
          cur: 1,
          all: 7,
          link:'/customer/product/file',
          name:'',
          type:'',
          status:''
        },
        changeParam: {
          show: false
        },
        checked:false
      }
    },
    methods: {
      clickOn: function(initProductlist) {
        this.changeParam = initProductlist;
       /* this.getProductDetail(this.changeParam);*/
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getProductList(this.loadParam);
      }
    },
    created() {
      this.getProductList(this.loadParam);
    }
  }
</script>
<style scoped>
  .breed_action {
    top: 33px;
    right: 106px;
  }
  .transfer{
    margin-left: 18px;
  }
  .table>tbody>tr>td{
/*     max-width: 300px; */
   /*  white-space: normal; */
  }
  .checkbox_unselect{
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
  .checkbox_select{
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
</style>

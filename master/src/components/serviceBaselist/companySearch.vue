<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>企业查询</h3>
        </div>
        <div class="edit-model">
            <section class="editsection" v-cloak>
                <div class="clearfix">
                    <div class="client-detailInfo  col-xs-12">
                        <label>省：</label>
                       <div  class="form-control" style="padding:0;border:none;height:31px">
                        <v-select
                              :debounce="250"
                              :value.sync="province"
                              :on-change="selectProvince"
                              :options="initProvince"
                              placeholder="省"
                              label="cname"

                         >
                            </v-select>
                        </div>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>市：</label>
                       <input type="text" v-if="!province.cname" class="form-control" disabled="disabled" v-model="param.city" style="height:37px"  placeholder="请先选择一个省"/>
                      <div v-if="province.cname"  class="form-control" style="padding:0;border:none;height:31px">
                            <v-select
                                     :debounce="250"
                                     :value.sync="city"
                                     :on-change="selectCity"
                                     :options="initCitylist"
                                     placeholder="市"
                                     label="cname"

                           >
                           </v-select>
                        </div>

                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>类别：</label>
                        <select class="form-control" v-model="param.conType">
	                        <option value="" selected>按类别搜索</option>
	                        <option value="MF">药厂</option>
	                        <option value="CF">化妆品厂</option>
	                        <option value="FF">食品厂</option>
	                        <option value="HF">保健品厂</option>
                     </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>是否划转：</label>
                        <select class="form-control" v-model="param.transform">
	                        <option value="" selected>根据客户划转</option>
	                        <option value=1>已划转</option>
	                        <option value=0>未划转</option>
                     </select>
                    </div>
                    <div class="client-detailInfo  col-xs-12">
                        <label>企业名称：</label>
                        <input type="text"  class="form-control" v-model="param.conName"  placeholder="按企业名查询"/>
                    </div>

                    <div class="client-detailInfo  col-xs-12">
                        <label>分类码：</label>
                        <input type="text"  class="form-control" v-model="param.category"  placeholder="按分类码查询"/>
                    </div>


                </div>
            </section>
          <p class="orange">分类码释义：<br>1) 产品类型代码：H：化学药；Z：中成药；S：生物制品；T:按药品管理的体外诊断试剂；Y：中药饮片；Q：医用气体；F:药用辅料；J：空心胶囊；C：特殊药品；X：其他（如中药配方颗粒等）。<br>2）药品类型属性代码：a：原料药；b：制剂；e：有国家标准的提取物。</p>
        </div>
        <div class="edit_footer">
             <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <input type="button" class="btn  btn-confirm"  @click="companySearch(param,param.show = false)" value="确定">
        </div>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import {
    initProvince,
    initCitylist
} from '../../vuex/getters'
import {
    getCompanyData,
    getProvinceList,
    getCityList
} from '../../vuex/actions'
export default {
    components: {
        vSelect
    },
    props: ['param'],
    data() {
        return {
            province:{
              cname:''
            },
            city:{
              cname:''
            },
            provinceParam:{
              loading:true,
              show:false,
              color: '#5dc596',
              size: '15px',
              cur: 1,
              all: 7,
            },
        }
    },
    vuex: {
      getters: {
        initProvince,
        initCitylist
      },
        actions: {
            getCompanyData,
            getProvinceList,
            getCityList
        }
    },

    methods:{
        companySearch:function(param){
            console.log(param)
             this.getCompanyData(this.param);
        },
        selectProvince:function(){
            this.city = '';
            this.param.city = '';
            this.param.cityName = '';
            this.param.province = this.province.cname;
            this.param.provinceName = this.province.cname;
            if(this.province.cname){
                this.getCityList(this.province);
            }
        },
        selectCity:function(){
            this.param.city = this.city.cname;
            this.param.cityName = this.city.cname;
        },

    },

    created() {
        //this.getCompanyData(this.loadParam);
        this.param.province = '';
        this.param.city = '';
        this.getProvinceList(this.provinceParam);
    }
}
</script>
<style scoped>
  .orange{
    color: #fa6705;
    margin-left: 40px;
    white-space: normal;
  }
.modal_con{
    width: 600px;
}
.top-title{
    width: 600px;
}
.edit_footer{
   width: 600px;
}
.empSearch{
    position: absolute;
    right: 15px;
    top: 26px;
    width: 6%;
    height: 34px;
    cursor: pointer;
    border-left: 1px solid #ddd;
}
.empSearch >img{
    margin: auto;
    position: relative !important;
    vertical-align: middle;
}
.big-font {
    font-size: 36px;
}

.top-title span {
    font-size: 28px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpage-input {
    margin-top: 15px;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.edit-input {
    height: 36px;
    line-height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}
.client-detailInfo img{
    position: absolute;
    top: 6px;
}
</style>

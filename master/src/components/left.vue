<template>
    <div id="left" class="high_bg">
        <div class="menu">
            <img src="../assets/images/icon_menu.png" height="14" width="21" />
        </div>
        <ul class="left_menu">
            <li>
                <div v-link="" class="menu_div">
                      <div class="bleft">
                          <img src="../assets/images/icon_main.png" height="21" width="21">
                      </div>
                      <a>主页</a>
                </div>
            </li>
            <li>
               <div v-link="" class="menu_div">
                    <div class="bleft">
                        <img src="../assets/images/icon_change.png" height="21" width="21">
                    </div>
                    <a>业务机会</a>
                </div>
            </li>
            <li >
                <div v-link="{ path: '/home/news'}" class="menu_div">
                    <div class="bleft">
                        <img src="../assets/images/icon_base.png" height="21" width="21">
                    </div>
                    <a>系統基础数据</a>
                </div>
                <div class="bshow">
                    <dl class="bshow_dl mui-clearfix">
                      <dd>
                          <div class="bleft">
                              <img src="../assets/images/icon_order.png" height="15" width="15">
                          </div>
                          <span class="con_active">我的订单</span>
                      </dd>
                      <dd>
                          <div class="bleft">
                            <img src="../assets/images/icon_order.png" height="15" width="15">
                          </div>
                          <span>部门订单</span>
                      </dd>
                    </dl>
                </div>
            </li>
            <li>
               <div v-link="{ path: '/home/message'}" class="menu_div">
                    <div class="bleft">
                        <img src="../assets/images/icon_data.png" height="17" width="21">
                    </div>
                    <a>业务基础数据</a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            msg: '左边'
        }
    }
}
/*var leftVue = new Vue(){
    el:'#left',
    data:{
       willshow:true
    },
    methods:{
          system_data:function(){
            if(this.willshow==true){
              this.willshow==false;
            }else{
              this.willshow==true;
            }
          },
    }
}*/
</script>
<style scoped>
#left {
    height: 100%;
    position: fixed;
    top: 60px;
    width: 240px;
}

.menu {
    padding-left: 16px;
    margin: 20px 0 35px 0;
}

.left_menu {
    font-size: 14px;
    padding: 0 16px;
}

.left_menu li{
  margin-bottom: 10px; 
  position: relative;
}
.menu_div{
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.left_menu li a {
    color: #fff;
    font-size: 14px;
}

.menu_div .bleft {
    float: left;
    width: 32px;
    height: 32px;
    margin-right: 16px;
    margin-top: 5px;
    text-align: center;
}

.v-link-active >.bleft {
    background: #fa6705;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}
.v-link-active{
   background: #16325c;
}
.bshow{
   
}
.bshow_dl .bleft{
    float: left;
}
.bshow_dl .con_active{
  color: #fa6705;
}
</style>

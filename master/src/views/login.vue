<template>
    <!-- <div class="container">          
            <h1 class="page-header"><span class="glyphicon glyphicon-user"></span>用户登录</h1>
            <form class="form-horizontal">
                <div class="form-group">
                    <div class="col-md-5">
                        <input type="text" class="form-control" placeholder="用户名/email"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-5">
                        <input type="password" class="form-control" placeholder="密码"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-5">
                       <button class="btn btn-primary">登陆</button>
                    </div>
                </div>                               
            </form>
        </div> -->


  <div class="a">
    <div class="container">
        <div>
            
            <div class="client-detailInfo input-group col-md-9 col-xs-12">
                <span class="input-group-addon "><span class="glyphicon glyphicon-user"></span></span>
                <input type="text"  class="form-control" v-model=""  placeholder="请输入用户名"/>
            </div>

            <div class="client-detailInfo input-group col-md-9 col-xs-12">
                <span class="input-group-addon "><span class="glyphicon glyphicon-lock"></span></span>
                <input type="text"  class="form-control" v-model=""  placeholder="请输入密码"/>
            </div>

            <div class="model-footer" v-if="param.confirm">
                <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
                <input type="button" class="btn  btn-confirm"  @click="param.callback(),param.show = false" value="确定" />
            </div>
        </div>
    </div>
  </div>  
</template>


<style scoped>
    .container{
        height:300px;
        width:500px;
        bottom:200px;
    }
   

</style>


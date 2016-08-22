<template>
    <div class="myOrder">
        订单{{$route.params.id}}
        <div class="order_search">
        	<div class="clear">
        		<span class="my_order">我的订单</span>
        		<div class="name_search">
					  <span class="">@</span>
					  <input type="text" class="search_input" placeholder="按名字搜索">
				</div>
				<div class="ordertel_search">
					  <span class="">@</span>
					  <input type="text" class="search_input" placeholder="按订单号搜索" >
				</div>
				<div class="tel_search">
					  <span class="">@</span>
					  <input type="text" class="search_input" placeholder="按电话搜索" >
				</div>
				<button class="new_btn">新建</button>
        	</div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {

        }
    },
    route: {
        data({
            to: {
                params: {
                    id
                }
            }
        }) {
            console.log(id);
            // return Promise.all([
            //   userService.get(userId),
            //   postsService.getForUser(userId)
            // ]).then(([user, post]) => ({ user, post }))
        }
    }
}
</script>
<style scoped>
.myOrder{
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
}
.order_search{
	margin: 25px 30px 0 40px;
}
.my_order{
	float: left;
	color: #fa6705;
	font-size: 20px;
	margin-right: 210px;
}
.name_search,.ordertel_search,.tel_search{
	position: relative;
	border: 1px solid #ccc;
	float: left;
	margin-right: 100px;
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	-ms-border-radius: 3px;
	background: #fff;
}
.name_search>span,.ordertel_search>span,.tel_search>span{
	
}
.search_input{
	color: #666;
	font-size: 14px;
}
.search_input:focus{
	border: 1px solid #fa6705;
}
.new_btn{
	float: right;
}
</style>

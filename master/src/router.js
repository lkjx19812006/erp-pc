export default (router)=>router.map({
    '/':{
        name:'welcome',//应用首页
        component:require('./views/welcome') //加载index页面
    },
    '/home':{
    	name:'home',
    	component:require('./views/home'),
    	subRoutes:{
    		 '/': {
        	component: {
          template: '<p>Default sub view for Foo</p>'
        }
      },
    		 '/news': {
                component: require('./views/news')
            },
            '/message': {
                component: require('./views/message')
            }
    	}
    },
    '*':{//除'/'以外的所有路由，均跳转到404页面
        name:'404',
        component:require('./views/404')// 加载404页面
    }
})
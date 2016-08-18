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
            },
            '/main':{
                component:require('./views/main')
            },
            '/change':{
                component:require('./views/chance')
            },
            '/unclient':{
                component:require('./views/potential_client')
            },
            '/client':{
                component:require('./views/client')
            },
            '/order_intent':{
                component:require('./views/order_intent')
            },
            '/order':{
                component:require('./views/order')
            },
            '/company':{
                component:require('./views/compact')
            },
            '/person':{
                component:require('./views/employee')
            },
            '/achive':{
                component:require('./views/achivement')
            },
            '/scope':{
                component:require('./views/scope')
            },
            '/base':{
                component:require('./views/system_data')
            },
            '/base_data':{
                component:require('./views/base_data')
            },
            '/reports':{
                component:require('./views/message')
            },
            '/board':{
                component:require('./views/message')
            },
            '/report':{
                component:require('./views/message')
            },
            '/set':{
                component:require('./views/message')
            },
             /*router.redirect({
                '*':'main'
            })*/
    	}
    },
    '*':{//除'/'以外的所有路由，均跳转到404页面
        name:'404',
        component:require('./views/404')// 加载404页面
    }
})
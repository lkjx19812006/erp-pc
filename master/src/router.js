export default (router) => router.map({
    '/': {
        name: 'welcome', //应用首页
        component: function(resolve) {
                require(['./views/welcome'], resolve)
            } //加载index页面
    },
    '/home': {
        name: 'home',
        component: function(resolve) {
            require(['./views/home'], resolve)
        },
        auth: true,
        subRoutes: {
            '*': {
                component: function(resolve) {
                    require(['./views/message'], resolve)
                }
            },
            '/main': {
                component: function(resolve) {
                    require(['./views/message'], resolve)
                }
            },
            '/change/:id': {
                name: 'change',
                component: function(resolve) {
                    require(['./views/partchange'], resolve)
                }
            },
            '/unclient': {
                component: function(resolve) {
                    require(['./views/potential_client'], resolve)
                }
            },
            '/client': {
                component: function(resolve) {
                    require(['./views/client'], resolve)
                }
            },
            '/order_intent': {
                component: function(resolve) {
                    require(['./views/order_intent'], resolve)
                }
            },
            '/order/:id': {
                name:'order',
                component: function(resolve) {
                    require(['./views/order'], resolve)
                }
            },
            '/company': {
                component: function(resolve) {
                    require(['./views/compact'], resolve)
                }
            },
            '/person': {
                component: function(resolve) {
                    require(['./views/employee'], resolve)
                }
            },
            '/achive': {
                component: function(resolve) {
                    require(['./views/achivement'], resolve)
                }
            },
            '/scope': {
                component: function(resolve) {
                    require(['./views/scope'], resolve)
                }
            },
            '/base': {
                component: function(resolve) {
                    require(['./views/system_data'], resolve)
                }
            },
            '/base_data': {
                component: function(resolve) {
                    require(['./views/base_data'], resolve)
                }
            },
            '/reports': {
                component: function(resolve) {
                    require(['./views/reports'], resolve)
                }
            },
            '/board': {
                component: function(resolve) {
                    require(['./views/board'], resolve)
                }
            },
            '/record': {
                component: function(resolve) {
                    require(['./views/record'], resolve)
                }
            },
            '/set': {
                component: function(resolve) {
                    require(['./views/set'], resolve)
                }
            },
            /*router.redirect({
                '*':'main'
            })*/
        }
    },
    '*': { //除'/'以外的所有路由，均跳转到404页面
        name: '404',
        component: require('./views/404') // 加载404页面
    }
})

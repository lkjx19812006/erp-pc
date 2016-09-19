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
            '/*any': {
                component: function(resolve) {
                    require(['./views/message'], resolve)
                }
            },
            '/main': {
                component: function(resolve) {
                    require(['./views/main'], resolve)
                }
            },
            '/change': {
                name: 'change',
                component: function(resolve) {
                    require(['./views/chance'], resolve)
                }
            },
            '/unclient': {
                component: function(resolve) {
                    require(['./views/news'], resolve)
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
            '/order': {
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
                name:'achive',
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
                name:'base',
                component: function(resolve) {
                    require(['./views/systemData'], resolve)
                }
            },
            '/baseData': {
                name:'baseData',
                component: function(resolve) {
                    require(['./views/baseData'], resolve)
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
            }
        }
    },
    '*': { //除'/'以外的所有路由，均跳转到404页面
        name: '404',
        component: require('./views/404') // 加载404页面
    }
})

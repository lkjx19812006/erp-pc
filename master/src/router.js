export default (router) => router.map({
  '/': {
    name: 'welcome', //应用首页
    component: function (resolve) {
      require(['./views/home'], resolve)
    } //加载index页面
  },
  '/login': {
    name: 'login', //应用首页
    component: function (resolve) {
      require(['./views/login'], resolve)
    } //加载index页面
  },
  '/home': {
    name: 'home',
    component: function (resolve) {
      require(['./views/home'], resolve)
    },
    auth: true,
    subRoutes: {
      '/': {
        component: function (resolve) { //登录之后显示的
          require(['./views/myMessage'], resolve)
        }
      },
      '/*any': {
        component: function (resolve) {
          require(['./views/myMessage'], resolve)
        }
      },
      '/main': {
        component: function (resolve) {
          require(['./views/myMessage'], resolve)
        }
      },
      '/count': {
        name: 'count',
        component: function (resolve) {
          require(['./views/count'], resolve)
        }
      },
      '/unclient': {
        component: function (resolve) {
          require(['./views/news'], resolve)
        }
      },
      '/client': {
        component: function (resolve) {
          require(['./views/client'], resolve)
        }
      },
      '/supply': {
        component: function (resolve) {
          require(['./views/supply'], resolve)
        }
      },
      '/order_intent': {
        component: function (resolve) {
          require(['./views/order_intent'], resolve)
        }
      },
      '/intl_intent': {
        component: function (resolve) {
          require(['./views/intl_intention'], resolve)
        }
      },
      '/order': {
        name: 'order',
        component: function (resolve) {
          require(['./views/order'], resolve)
        }
      },
      '/company': {
        component: function (resolve) {
          require(['./views/compact'], resolve)
        }
      },
      '/person': {
        name: 'person',
        component: function (resolve) {
          require(['./views/employee'], resolve)
        }
      },
      '/achive': {
        name: 'achive',
        component: function (resolve) {
          require(['./views/achivement'], resolve)
        }
      },
      '/scope': {
        component: function (resolve) {
          require(['./views/scope'], resolve)
        }
      },
      '/base': {
        name: 'base',
        component: function (resolve) {
          require(['./views/systemData'], resolve)
        }
      },
      '/baseData': {
        name: 'baseData',
        component: function (resolve) {
          require(['./views/baseData'], resolve)
        }
      },
      '/reports': {
        component: function (resolve) {
          require(['./views/reports'], resolve)
        }
      },
      '/board': {
        component: function (resolve) {
          require(['./views/board'], resolve)
        }
      },
      '/record': {
        component: function (resolve) {
          require(['./views/record'], resolve)
        }
      },
      '/set': {
        component: function (resolve) {
          require(['./views/set'], resolve)
        }
      },
      '/drug_money': {
        component: function (resolve) {
          require(['./views/drugMoney'], resolve)
        }
      },
      '/email': {
        component: function (resolve) {
          require(['./views/email'], resolve)
        }
      },
      '/dictionary': {
        component: function (resolve) {
          require(['./views/dictionary'], resolve)
        }
      },
      '/purchase': {
        component: function (resolve) {
          require(['./views/purchaseOrder'], resolve)
        }
      },
      '/stock': {
        component: function (resolve) {
          require(['./views/stock'], resolve)
        }
      },
      '/myMessage': {
        component: function (resolve) {
          require(['./views/main'], resolve)
        }
      },
      '/ARtransfer': {
        component: function (resolve) {
          require(['./views/ARtransfer'], resolve)
        }
      }

    }
  },
  '*': { //除'/'以外的所有路由，均跳转到404页面
    name: '404',
    component: require('./views/404') // 加载404页面
  }
})

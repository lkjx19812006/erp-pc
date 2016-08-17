export default (router)=>router.map({
    '/':{
        name:'index',//应用首页
        component:require('./views/welcome') //加载index页面
    },
    '*':{//除'/'以外的所有路由，均跳转到404页面
        name:'404',
        component:require('./views/404')// 加载404页面
    }
})
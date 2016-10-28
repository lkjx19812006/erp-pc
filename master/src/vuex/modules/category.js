import {
    INCREMENT,
    DECREMENT,
    INIT_LIST,
    MENU_BAR,
    FOLD
} from '../mutation-types'

const state = {
    count: 0,
    
    list: [

        {"id":1,"cname":"主页","icon":"/static/images/icon_main.png","url":"/home/main","subcategory":[]},
        {"id":2,"cname":"会员","icon":"/static/images/icon_unuser.png","url":"/home/unclient","subcategory":[]},
        {"id":3,"cname":"客户","icon":"/static/images/icon_user.png","url":"/home/client","subcategory":[]},
        {"id":4,"cname":"意向","icon":"/static/images/order_intent.png","url":"/home/order_intent","subcategory":[]},
        {"id":5,"cname":"订单","icon":"/static/images/icon_order.png","url":"/home/order?id=0","subcategory":[{"id":1,"cname":"我的订单","icon":"/static/images/icon_order.png","url":"/home/order?id=0"},{"id":2,"cname":"客户订单","icon":"/static/images/icon_order.png","url":"/home/order?id=1"}]},
        {"id":6,"cname":"合同","icon":"/static/images/icon_compact.png","url":"/home/company","subcategory":[]},
        {"id":7,"cname":"员工","icon":"/static/images/icon_person.png","url":"/home/person","subcategory":[]},
        {"id":8,"cname":"权限","icon":"/static/images/icon_power.png","url":"/home/scope","subcategory":[]},
        {"id":9,"cname":"系统基础数据","icon":"/static/images/icon_base.png","url":"/home/base?id=0","show":"true","subcategory":[{"id":1,"cname":"枚举类型","icon":"/static/images/icon_order.png","url":"/home/base?id=0"},{"id":2,"cname":"省市区","icon":"/static/images/icon_order.png","url":"/home/base?id=1"}]},
        {"id":10,"cname":"业务基础数据","icon":"/static/images/icon_data.png","url":"/home/baseData?id=0","subcategory":[{"id":1,"cname":"企业","icon":"/static/images/icon_order.png","url":"/home/baseData?id=0"},{"id":2,"cname":"成分","icon":"/static/images/icon_order.png","url":"/home/baseData?id=1"},{"id":3,"cname":"提取物","icon":"/static/images/icon_order.png","url":"/home/baseData?id=2"},{"id":4,"cname":"药材","icon":"/static/images/icon_order.png","url":"/home/baseData?id=3"}]}
       /* 
        {"id":7,"cname":"业绩","icon":"/static/images/achieve.png","url":"/home/achive?id=0","subcategory":[{"id":1,"cname":"部门业绩","icon":"/static/images/icon_order.png","url":"/home/achive?id=0"},{"id":2,"cname":"个人业绩","icon":"/static/images/icon_order.png","url":"/home/achive?id=1"}]},
        {"id":1,"cname":"业务机会","icon":"/static/images/icon_change.png","url":"/home/change","subcategory":[]},
        {"id":11,"cname":"报表","icon":"/static/images/icon_reports.png","url":"/home/reports","subcategory":[]},
        {"id":12,"cname":"仪表盘","icon":"/static/images/icon_board.png","url":"/home/board","subcategory":[]},
        {"id":13,"cname":"日志","icon":"/static/images/icon_report.png","url":"/home/record","subcategory":[]},
        {"id":14,"cname":"设置","icon":"/static/images/icon_set.png","url":"/home/set","subcategory":[]}*/
    ],
    left: 240,
    expand:true
}


const mutations = {

    [INCREMENT](state) {
        state.count++
    },

    [DECREMENT](state) {
        state.count--
    },

    [INIT_LIST](state,data) {
        state.list = data.menus;
    },
    [MENU_BAR](state) {
        if (state.left == 240) {
            state.left = 50;
        } else {
            state.left = 240;
        }
    },
    [FOLD](state){
        if(state.expand == true){
            state.expand = false
        }else{
            state.expand = true
        }
    }
}

export default {
    state,
    mutations
}

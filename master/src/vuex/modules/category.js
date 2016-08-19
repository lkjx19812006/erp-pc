import {
    INCREMENT,
    DECREMENT,
    INIT_LIST,
    MENU_BAR
} from '../mutation-types'

const state = {
    count: 0,
    list: [
        { "categoryid": 0, "category": "主页", "img": "/static/images/icon_main.png", "path": "/home/main", "subcategory": [] },
        { "categoryid": 1, "category": "业务机会", "img": "/static/images/icon_change.png", "path": "/home/change", "subcategory": [{ "subcategoryId": 1, "subcategory": "个人业务机会", "img": "/static/images/icon_order.png", "path": "/home/change" }, { "subcategoryId": 2, "subcategory": "部门业务机会", "img": "/static/images/icon_order.png", "path": "/home/partchange" }] },
        { "categoryid": 2, "category": "潜在客户", "img": "/static/images/icon_unuser.png", "path": "/home/unclient", "subcategory": [] },
        { "categoryid": 3, "category": "客户", "img": "/static/images/icon_user.png", "path": "/home/client", "subcategory": [] },
        { "categoryid": 4, "category": "意向", "img": "/static/images/order_intent.png", "path": "/home/order_intent", "subcategory": [] },
        { "categoryid": 5, "category": "订单", "img": "/static/images/icon_order.png", "path": "/home/order", "subcategory": [{ "subcategoryId": 1, "subcategory": "我的订单", "img": "/static/images/icon_order.png" }, { "subcategoryId": 2, "subcategory": "客户订单", "img": "/static/images/icon_order.png" }] },
        { "categoryid": 6, "category": "合同", "img": "/static/images/icon_compact.png", "path": "/home/company", "subcategory": [] },
        { "categoryid": 7, "category": "员工", "img": "/static/images/icon_person.png", "path": "/home/person", "subcategory": [] },
        { "categoryid": 8, "category": "业绩", "img": "/static/images/achieve.png", "path": "/home/achive", "subcategory": [] },
        { "categoryid": 9, "category": "权限", "img": "/static/images/icon_power.png", "path": "/home/scope", "subcategory": [] },
        { "categoryid": 10, "category": "系统基础数据", "img": "/static/images/icon_base.png", "path": "/home/base", "subcategory": [] },
        { "categoryid": 11, "category": "业务基础数据", "img": "/static/images/icon_data.png", "path": "/home/base_data", "subcategory": [] },
        { "categoryid": 12, "category": "报表", "img": "/static/images/icon_reports.png", "path": "/home/reports", "subcategory": [] },
        { "categoryid": 13, "category": "仪表盘", "img": "/static/images/icon_board.png", "path": "/home/board", "subcategory": [] },
        { "categoryid": 14, "category": "日志", "img": "/static/images/icon_report.png", "path": "/home/record", "subcategory": [] },
        { "categoryid": 15, "category": "设置", "img": "/static/images/icon_set.png", "path": "/home/set", "subcategory": [] }
    ],
    left: 240,
}


const mutations = {

    [INCREMENT](state) {
        state.count++
    },

    [DECREMENT](state) {
        state.count--
    },

    [INIT_LIST](state, data) {
        state.list = data.results;
    },
    [MENU_BAR](state) {
        if (state.left == 240) {
            state.left = 50;
        } else {
            state.left = 240;
        }
    }
}

export default {
    state,
    mutations
}

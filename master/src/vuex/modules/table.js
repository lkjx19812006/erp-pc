/*
* @Author: huili.sun
* @Date:   2016-08-22 14:42:25
* @Last Modified by:   huili.sun
* @Last Modified time: 2016-08-23 17:09:10
*/

'use strict';//orderTable
import {
   ORDER_TABLE,
   CHANGE_SHOW_STATUE
} from '../mutation-types'

const state = {
	list:[
	  {"orderId":0,"orderStatus":"药材","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"大大","orderTime":"2016-09-18","orderLogstatus":"运输中"},
	  {"orderId":1,"orderStatus":"人参","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"达达","orderTime":"2016-09-18","orderLogstatus":"运输中"},
	  {"orderId":2,"orderStatus":"未完成","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"大大","orderTime":"2016-09-28","orderLogstatus":"运输完成"},
	  {"orderId":3,"orderStatus":"已完成","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"规格","orderTime":"2016-09-18","orderLogstatus":"运输中"}
	]
}

const mutations = {
	 [ORDER_TABLE](state, data) {
        state.list = data.results;
    },
    [CHANGE_SHOW_STATUE](state,id){
    	state.list[id].show=!state.list[id].show;
    	console.log(state.list);
    }
}

export default {
    state,
    mutations
}
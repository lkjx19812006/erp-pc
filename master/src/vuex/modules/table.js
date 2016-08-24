/*
* @Author: huili.sun
* @Date:   2016-08-22 14:42:25
* @Last Modified by:   huili.sun
* @Last Modified time: 2016-08-24 17:17:02
*/

'use strict';//orderTable
import {
   ORDER_TABLE,
   CHANGE_SHOW_STATUE,
   CLIENT_INFO
} from '../mutation-types'

const state = {
	list:[
	  {"orderId":0,"orderStatus":"药材","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"大大","orderTime":"2016-09-18","orderLogstatus":"运输中"},
	  {"orderId":1,"orderStatus":"人参","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"达达","orderTime":"2016-09-18","orderLogstatus":"运输中"},
	  {"orderId":2,"orderStatus":"未完成","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"大大","orderTime":"2016-09-28","orderLogstatus":"运输完成"},
	  {"orderId":3,"orderStatus":"已完成","orderModule":"代理商","orderNum":"1234567890","orderUnit":"金融科技","orderTel":"13162875213","orderPerson":"规格","orderTime":"2016-09-18","orderLogstatus":"运输中"}
	],
    clientList:[
        {"clientId":0,"clientName":"孙慧","clientJob":"代理商","clientTel":"13162875213","clientEmail":"sunhuili@163.com"},
        {"clientId":1,"clientName":"小熊","clientJob":"代理商","clientTel":"15738855555","clientEmail":"sunhuili@163.com"},
        {"clientId":2,"clientName":"杨宁","clientJob":"代理商","clientTel":"15698522632","clientEmail":"yangning@163.com"}
    ]
}

const mutations = {
	[ORDER_TABLE](state, data) {
        state.list = data.results;
    },
    [CHANGE_SHOW_STATUE](state,id){
       /*  state.list[id].show=true;
        if(!state.list[id].show){
            state.list[id].show=true;
        }else{
             state.list[id].show=!state.list[id].show;
        }
    	console.log(state.list);*/
        console.log(id);
        state.list[id].show=!state.list[id].show;
        console.log(state.list);
    },
    [CLIENT_INFO](state,data){
        state.clientList = data.results;
    }
}

export default {
    state,
    mutations
}
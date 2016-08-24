import Vue from 'vue'
import * as types from './mutation-types'
import apiUrl from './api/api'

export const increment = ({ dispatch }) => dispatch(types.INCREMENT)
export const decrement = ({ dispatch }) => dispatch(types.DECREMENT)
export const menuBar = ({ dispatch }) => dispatch(types.MENU_BAR)
export const initList = ({ dispatch }) => {
    Vue.http.get(apiUrl.list)
        .then((res) => {
            dispatch(types.INIT_LIST, res.data);
            console.log(res.data);
        }, (res) => {
            console.log('fail');
        });
};
//柱状图
export const freshCharts = ({ dispatch }, getCharList) => {
    if (getCharList) getCharList.load = true;
    Vue.http.get(apiUrl.charList)
        .then((res) => {
            dispatch(types.CHANGE_CHARTS, res.data);
        }, (res) => {
            console.log('fail');
        });
};

//折线图
export const freshLinecharts = ({ dispatch }, getLinechart) => {
    if (getLinechart) getLinechart.load = true;
    Vue.http.get(apiUrl.linechart)
        .then((res) => {
            dispatch(types.CHANGE_LINECHARTS, res.data);
        }, (res) => {
            console.log('fail');
        });
};

//饼状图
export const freshPiecharts = ({ dispatch},getPiechart) => {
    if(getPiechart)getPiechart.load=true;
    Vue.http.get(apiUrl.piechart)
        .then((res) => {
            dispatch(types.CHANGE_PIECHARTS, res.data);
        },(res) => {
            console.log('fail');
        });
};

export const orderInquiry = ({ dispatch },param) => {
    param.loading=true;
    Vue.http.get(apiUrl.orderTable)
        .then((res) => {
            dispatch(types.ORDER_TABLE, res.data);
            param.loading=false; 
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};

export const changeShowStatue =({dispatch },param) => {
    console.log(param);
    dispatch(types.CHANGE_SHOW_STATUE, param);
   
};


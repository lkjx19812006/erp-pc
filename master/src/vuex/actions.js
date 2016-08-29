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

export const getOrderList = ({dispatch},param) => {
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
    /*param.show=true;*/
    dispatch(types.CHANGE_SHOW_STATUE, param);
     if(res.data.results[id].param){
            res.data.results[id].param=!res.data.results[id].param;
        }
        console.log(res.data.results[id].param);
};

export const getClientList = ({dispatch},param) => {
      param.loading=true;
    Vue.http.get(apiUrl.clientList)
        .then((res) => {
            dispatch(types.CLIENT_INFO, res.data);
            param.loading=false; 
            console.log(res.data)
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};

export const getSystemData = ({dispatch},param) => {
      param.loading=true;
    Vue.http.get(apiUrl.dataBaseList)
        .then((res) => {
            for(var i in res.data.results.systemDataList){
               res.data.results.systemDataList[i].show=false; 
               res.data.results.systemDataList[i].delInfo = false;
            }
            dispatch(types.SYSTEM_DATA, res.data);
            param.loading=false; 
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};

export const deleteShowStatue =({dispatch },param) => {
    dispatch(types.DELETE_SHOW_STATUE,param);
       console.log(param);
};

export const saveDataInfo = ({dispatch},param) => {
    dispatch(types.ADD_DATA,param);
    console.log(param)
};

export const updateDataInfo = ({dispatch},param) => {
    dispatch(types.UPDATE_DATA,param);
    console.log(param)
}

export const getProvinceData = ({dispatch},param) => {
      param.loading=true;
    Vue.http.get(apiUrl.provinceList)
        .then((res) => {
            for(var i in res.data.results.provinceList){
               res.data.results.provinceList[i].show=false; 
            }
            dispatch(types.PROVINCE_DATA, res.data);
            param.loading=false; 
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};

export const getEnterpriseData = ({dispatch},param) => {
      param.loading=true;
    Vue.http.get(apiUrl.enterpriseList)
        .then((res) => {
            for(var i in res.data.results.enterpriseList){
               res.data.results.enterpriseList[i].show=false; 
            }
            dispatch(types.SERVICE_ENTERPRISE, res.data);
            param.loading=false; 
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};

export const getComponentData = ({dispatch},param) => {
    param.loading=true;
    Vue.http.get(apiUrl.componentList)
        .then((res) => {
            for(var i in res.data.results.componentList){
               res.data.results.componentList[i].show=false; 
            }
            dispatch(types.SERVICE_COMPONENT, res.data);
            param.loading=false; 
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};

export const getDrawData = ({dispatch},param) => {
    param.loading=true;
    Vue.http.get(apiUrl.drawList)
        .then((res) => {
            for(var i in res.data.results.drawList){
               res.data.results.drawList[i].show=false; 
            }
            dispatch(types.SERVICE_DRAW, res.data);
            param.loading=false; 
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};
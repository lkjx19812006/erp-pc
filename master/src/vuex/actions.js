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
            for(var i in res.data.results.enumlist){
               res.data.results.enumlist[i].show=false; 
               res.data.results.enumlist[i].delInfo = false;
            }
            dispatch(types.SYSTEM_DATA, res.data);
            param.loading=false; 
            console.log(res.data)
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};

export const deleteShowStatue =({dispatch},param) => {
    dispatch(types.DELETE_SHOW_STATUE,param);
};

export const deleteComponentStatus =({dispatch },param) => {
    dispatch(types.DELETE_COMPONENT_STATUS,param);
};
export const deleteDrawStatus =({dispatch },param) => {
    dispatch(types.DELETE_DRAW_STATUS,param);
};

export const saveDataInfo = ({dispatch},data) => {
    dispatch(types.ADD_DATA,data);
};

export const updateDataInfo = ({dispatch},param) => {
    dispatch(types.UPDATE_DATA,param);
};

export const getProvinceData = ({dispatch},param) => {
      param.loading=true;
    Vue.http.get(apiUrl.provinceList)
        .then((res) => {
            for(var i in res.data.results.list){
               res.data.results.list[i].show=false; 
            }
            dispatch(types.PROVINCE_DATA, res.data);
            param.loading=false; 
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};

export const getEnterpriseData = ({dispatch},param) => { // 企业列表
      param.loading=true;
    Vue.http({
        /*method:'GET',*/
        type: "GET",
        url:apiUrl.enterpriseList,
        data:{'type':'AAA','name':'公司','page':1,'pageSize':10},
        emulateJSON: true,
        headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then((res) => {
            console.log(res.json());
            for(var i in res.json().result.list){
               res.json().result.list[i].show=false; 
            }
             dispatch(types.SERVICE_ENTERPRISE, res.json());
             param.loading=false; 
        }, (res) => {
            console.log('fail');
            param.loading=false;  
        });
};
export const saveCompany = ({dispatch},data) => { //新建企业信息
     Vue.http({
        type:"POST",
        url:apiUrl.enterpriseList,
        emulateJSON: true,
        headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then((res) => {
            console.log(res.json())
            dispatch(types.SAVE_COMPANY_DATA,res.json())
        },(res) => {
            console.log('fail');
        });
};


export const updateEnterInfo = ({dispatch},param) => { //修改企业信息
     Vue.http.put(apiUrl.enterpriseList,id)
        .then((res) => {
            dispatch(types.UPDATE_ENTER_DATA,res.param);
        },(res) => {
            console.log('fail');
        }); 
};
export const deleteCompanyStatus =({dispatch },param) => { //删除企业信息
      Vue.http.delete(apiUrl.enterpriseList)
        .then((res) => {
            dispatch(types.DELETE_COMPANY_STATUS,param)
        },(res) => {
            console.log('fail');
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
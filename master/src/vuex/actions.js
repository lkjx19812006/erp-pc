import Vue from 'vue'
import * as types from './mutation-types'
import apiUrl from './api/api'

export const increment = ({ dispatch }) => dispatch(types.INCREMENT)
export const decrement = ({ dispatch }) => dispatch(types.DECREMENT)
export const menuBar = ({ dispatch }) => dispatch(types.MENU_BAR)
export const getToggle = ({ dispatch }) => dispatch(types.FOLD)
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
export const freshPiecharts = ({ dispatch }, getPiechart) => {
    if (getPiechart) getPiechart.load = true;
    Vue.http.get(apiUrl.piechart)
        .then((res) => {
            dispatch(types.CHANGE_PIECHARTS, res.data);
        }, (res) => {
            console.log('fail');
        });
};

export const getOrderList = ({ dispatch }, param) => {
    param.loading = true;
    Vue.http.get(apiUrl.orderTable)
        .then((res) => {
            dispatch(types.ORDER_TABLE, res.data);
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        });
};

export const changeShowStatue = ({ dispatch }, param) => {
    /*param.show=true;*/
    dispatch(types.CHANGE_SHOW_STATUE, param);
    if (res.data.results[id].param) {
        res.data.results[id].param = !res.data.results[id].param;
    }
    console.log(res.data.results[id].param);
};

export const getClientList = ({ dispatch }, param) => {
    param.loading = true;
    Vue.http.get(apiUrl.clientList)
        .then((res) => {
            dispatch(types.CLIENT_INFO, res.data);
            param.loading = false;
            console.log(res.data)
        }, (res) => {
            console.log('fail');
            param.loading = false;
        });
};

export const getSystemData = ({ dispatch }, param) => { //枚举类型
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.dataBaseList + '/query?type&page=' + param.cur + '&pageSize=10',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj1 = res.json().result.list;
        for (var i in obj1) {
            obj1[i].show = false;
            obj1[i].delInfo = false;
        }
        dispatch(types.SYSTEM_DATA, obj1);
        param.all = res.json().result.pages;
        console.log(res.json())
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getSystemSearch = ({ dispatch }, param) => { //搜索枚举类型
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.dataBaseList + '/query?type='+param.type+'&page=' + param.cur + '&pageSize=10',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj1 = res.json().result.list;
        for (var i in obj1) {
            obj1[i].show = false;
        }
        dispatch(types.SYSTEM_DATA, obj1);
        param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const saveDataInfo = ({ dispatch }, data) => { //新建枚举类型
    const body ={
        code: data.code,
        desc: data.desc,
        id: data.id,
        name: data.name,
        status: data.status,
        type: data.type
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.dataBaseList + '/',
        emulateHTTP: true,
        body: body,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.ADD_DATA, data);
    }, (res) => {
        console.log('fail');
    });
};
export const updateDataInfo = ({ dispatch }, param) => { //修改枚举信息
    console.log(param)
    const data = {
        code: param.code,
        desc: param.desc,
        id: param.id,
        name: param.name,
        status: param.status,
        type: param.type
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.dataBaseList + '/',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_DATA, param);
    }, (res) => {
        console.log('fail');
    });
};

export const deleteShowStatue = ({ dispatch }, param) => { //删除枚举
    /*dispatch(types.DELETE_SHOW_STATUE, param);*/
    console.log(param)
    Vue.http({
        method: 'DELETE',
        url: apiUrl.dataBaseList + '/'+param,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('删除成功')
        dispatch(types.DELETE_SHOW_STATUE, param);
    }, (res) => {
        console.log('fail');
    });
};

export const getProvinceData = ({ dispatch }, param) => { //省市区列表
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.provinceList + '/?page=' + param.cur + '&pageSize=10',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        for (var i in obj) {
            obj[i].show = false;
        }
        dispatch(types.PROVINCE_DATA, obj);
        param.loading = false;
        param.all = res.json().result.pages;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
};

export const getEnterpriseData = ({ dispatch }, param) => { // 企业列表
    param.loading = true;
    Vue.http({
        method: "GET",
        url: apiUrl.enterpriseList + 'query/?type&name=公司&page=' + param.cur + '&pageSize=10',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        for (var i in obj) {
            obj[i].show = false;
        }
        dispatch(types.SERVICE_ENTERPRISE, obj);
        param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
};

export const getComponentData = ({ dispatch }, param) => { //成分
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.componentList + '/' + 'query/?page=' + param.cur + '&pageSize=10',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var aa = res.json().result.list;
        dispatch(types.SERVICE_COMPONENT, aa);
        param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
};

export const getDrawData = ({ dispatch }, param) => { //提取物
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.drawList + '/' + 'query?page=' + param.cur + '&pageSize=10',
        emulateJSON: true
    }).then((res) => {
        console.log(res.json())
        var dd = res.json().result.list;
        dispatch(types.SERVICE_DRAW, dd);
        param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getBreedData = ({ dispatch }, param) => { //药材
     param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.breedList + '/' + '?page=' + param.cur + '&pageSize=10',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
        var breed = res.json().result.list;
        for(var i in breed){
            breed[i].show=false;
        }
        dispatch(types.BREED_DATA, breed);
        param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getBreedDetail = ({ dispatch }, param) => { //获取药材详情
    console.log(param.id)
    Vue.http({
        method: 'GET',
        url: apiUrl.breedList + '/details/'+param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
        var breed = res.json().result;
        dispatch(types.BREED_DATA, breed);
    }, (res) => {
        console.log('fail');
    });
}

export const getBreedNameSearch = ({ dispatch }, param) => { //药材搜索
     param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.breedList + '/' + '?name='+param.name+'&page=' + param.cur + '&pageSize=10',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
         }
        }).then((res) => {
        var breed = res.json().result.list;
        dispatch(types.BREED_DATA, breed);
        param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
};
export const getCategoryData = ({ dispatch }, param) => { // 获取品种信息
    Vue.http({
        method: 'GET',
        url: apiUrl.categoryList,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
            }
        }).then((res) => {
        var cInfo = res.json().result;
        dispatch(types.CATEGORY_DATA,cInfo);
    }, (res) => {
        console.log('fail');
    });
}
export const getSpecData = ({ dispatch }, param) => { // 获取规格信息
    Vue.http({
        method: 'GET',
        url: apiUrl.specList,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
            }
        }).then((res) => {
        var spec = res.json().result.list;
        dispatch(types.SPEC_DATA,spec);
    }, (res) => {
        console.log('fail');
    });
}
export const getLocaldata = ({ dispatch }, param) => { // 获取产地信息
    Vue.http({
        method: 'GET',
        url: apiUrl.localList,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
            }
        }).then((res) => {
        var spec = res.json().result.list;
        dispatch(types.LOCAL_DATA,spec);
    }, (res) => {
        console.log('fail');
    });
}
export const saveBreed = ({ dispatch }, data) => { //新增药材信息
    const data1={
        categoryId:data.selected,
        name:data.name,
        code:data.code
       /* icon:data.icon*/
    } 
    Vue.http({
        method: "POST",
        url: apiUrl.breedList + '/',
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.BREED_DATA,data)
    }, (res) => {
        console.log('fail');
    });
};

export const updateBreedInfo = ({ dispatch }, param) => { //修改药材信息
    console.log(param)
    const updatedata = {
        code: param.code,
        name: param.name,
        categoryId: param.selected,
        id:param.id
        /*icon: param.icon,*/
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.breedList +'/',
        emulateHTTP: false,
        params:param.id,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_BREED_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const deleteBreedstatus = ({ dispatch }, param) => { //删除药材信息
    console.log(param)
    Vue.http({
        method: 'DELETE',
        url: apiUrl.breedList + '/'+param,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('删除成功')
        dispatch(types.DELETE_BREED_DATA, param);
    }, (res) => {
        console.log('fail');
    });
};


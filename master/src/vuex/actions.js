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
export const getSystemData = ({ dispatch }, param) => { //枚举类型
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.dataBaseList + '/query?type&page=' + param.cur + '&pageSize=15',
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
        console.log(res.json().result)
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getSystemSearch = ({ dispatch }, param) => { //搜索枚举类型
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/enum/query/?type=' + param,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj1 = res.json().result.list;
        dispatch(types.SYSTEM_DATA, obj1);
    }, (res) => {
        console.log('fail');
    });
}
export const saveDataInfo = ({ dispatch }, data) => { //新建枚举类型
    const body = {
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

export const deleteShowStatue = ({ dispatch }, sub,id) => { //删除枚举
    Vue.http({
        method: 'DELETE',
        url: apiUrl.dataBaseList + '/' + id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('删除成功')
        dispatch(types.DELETE_SHOW_STATUE, sub);
    }, (res) => {
        console.log('fail');
    });
};

export const getProvinceData = ({ dispatch }, param) => { //省市区列表
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.provinceList + '/?page=' + param.cur + '&pageSize=15',
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
        url: apiUrl.clientList + '/company/query/?type=&name=&&category=&province=&page=' + param.cur + '&pageSize=15',
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
}
export const getCompanyData = ({ dispatch }, param) => { //企业搜索
     param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/company/query/?type='+ param.conType+'&name='+param.conName+'&&category=&province='+param.conProvince+'&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        console.log(obj)
        dispatch(types.SERVICE_ENTERPRISE, obj);
         param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const getCompanyDetail = ({ dispatch }, param) => { //获取企业详情
    Vue.http({
        method: 'GET',
        url: apiUrl.enterpriseList + '/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        var arr = obj.companyContacts;
        obj.companyContacts = {
            arr: arr,
            show: true
        };
        for (var i in obj.companyContacts.arr) {
            obj.companyContacts.arr[i].show = false;
        }
        console.log(res.json().result.companyContacts)
        dispatch(types.SERVICE_ENTERPRISE_DETAIL, obj);
    }, (res) => {
        console.log('fail');
    });
}
/*export const contactDel = ({ dispatch }, sub,id) => { //删除企业联系人待定
    Vue.http({
        method: 'DELETE',
        url: apiUrl.enterpriseList + id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('删除成功')
        dispatch(types.DELETE_CONTACT_DATA, sub);
    }, (res) => {
        console.log('fail');
    });
}*/
export const alterCompany = ({ dispatch }, param) => { //修改企业联系人
    const alterdata = {
        name: param.name,
        cid: param.cid,
        phone: param.phone,
        tel: param.tel,
        email: param.email,
        wechart: param.wechart
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.enterpriseList + param.url,
        emulateHTTP: false,
        body: alterdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createContact = ({ dispatch }, param, id) => { //新增企业联系人
    const data1 = {
        "name": param.name,
        "cid": id,
        "tel": param.tel,
        "phone": param.phone,
        "wechart": param.wechart,
        "email": param.email,
        "qq": param.qq
    }
    Vue.http({
        method: "POST",
        url: apiUrl.enterpriseList + 'contract',
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('联系人添加成功')
        dispatch(types.ADD_CONTACT_DATA, param)
    }, (res) => {
        console.log('fail');
    });
}

export const getComponentData = ({ dispatch }, param) => { //成分
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.componentList + '/' + 'query/?page=' + param.cur + '&pageSize=15',
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
export const getRecipeDetail = ({ dispatch }, param) => { //获取成分详情
    Vue.http({
        method: 'GET',
        url: apiUrl.componentList + '/company/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        res.json().result.list = {
            show: true
        };
        for (var i in obj) {
            obj[i].show = false;
        }
        dispatch(types.DRUG_DETAIL_DATA, obj);
    }, (res) => {
        console.log('fail');
    });
}

export const getDrawData = ({ dispatch }, param) => { //提取物
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.drawList + '/' + 'query?page=' + param.cur + '&pageSize=15',
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
        url: apiUrl.breedList + '/' + '?page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var breed = res.json().result.list;
        for (var i in breed) {
            breed[i].show = false;
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
    Vue.http({
        method: 'GET',
        url: apiUrl.breedList + '/details/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var breed = res.json().result;
        /* var object;
         if (breed.specs) {
             object = breed.specs;
         } else if(breed.locals) {
             object = breed.locals;
         }else if(breed.alias){
             object = breed.alias;
         }else if(breed.units){
             object = breed.units;
         }
         object={
             arr:object,
             show:true
         };

         for(var i in object.arr){
            object.arr[i].show=false;
         }*/
        var arr = breed.specs;
        breed.specs = {
            arr: arr,
            show: true
        };
        for (var i in breed.specs.arr) {
            breed.specs.arr[i].show = false;
        }
        var arr = breed.locals;
        breed.locals = {
            arr: arr,
            show: true
        };
        for (var j in breed.locals.arr) {
            breed.locals.arr[j].show = false;
        }
        var arr = breed.alias;
        breed.alias = {
            arr: arr,
            show: true
        };
        for (var j in breed.alias.arr) {
            breed.alias.arr[j].show = false;
        }
        var arr = breed.units;
        breed.units = {
            arr: arr,
            show: true
        };
        for (var j in breed.units.arr) {
            breed.units.arr[j].show = false;
        }
        dispatch(types.BREED_DETAIL_DATA, breed);
    }, (res) => {
        console.log('fail');
    });
}

export const getBreedNameSearch = ({ dispatch }, param) => { //药材搜索
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.breedList + '/' + '?breedName=' + param.name + '&page=' + param.cur + '&pageSize=15',
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
        dispatch(types.CATEGORY_DATA, cInfo);
    }, (res) => {
        console.log('fail');
    });
}

export const saveBreed = ({ dispatch }, data) => { //新增药材信息
    const data1 = {
        categoryId: data.selected,
        name: data.name,
        code: data.code
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
        dispatch(types.ADD_BREED_DATA, data);
        console.log(data)
    }, (res) => {
        console.log('fail');
    });
}

export const createSpec = ({ dispatch }, param, id) => { //新增药材相关
        console.log(param.url)
        const data1 = {
            name: param.name,
            breedId: id
        }
        Vue.http({
            method: "POST",
            url: apiUrl.breedList + param.url,
            emulateHTTP: true,
            body: data1,
            emulateJSON: false,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then((res) => {
            console.log('添加成功')
            dispatch(types.ADDSPEC_DATA, param);
            name = '';
        }, (res) => {
            console.log('fail');
        })
    }
   
export const saveAlias = ({ dispatch }, param, id) => { //新增药材别名
    const data1 = {
        alias: param.name,
        breedId: id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.breedList + '/alias/',
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('别名添加成功')
        dispatch(types.ADDSPEC_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const updateBreedInfo = ({ dispatch }, param) => { //修改药材信息
    console.log(param)
    const updatedata = {
        code: param.code,
        name: param.name,
        categoryId: param.selected,
        id: param.id
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.breedList + '/',
        emulateHTTP: false,
        params: param.id,
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
export const alterSpec = ({ dispatch }, param) => { //修改药材相关
    const alterdata = {
        name: param.name,
        id: param.id,
        breedId: param.breedId
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.breedList + param.url,
        emulateHTTP: false,
        body: alterdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_SPEC_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterAlias = ({ dispatch }, param) => { //修改药材别名
    const alterdata = {
        alias: param.name,
        id: param.id,
        breedId: param.breedId
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.breedList + param.url,
        emulateHTTP: false,
        body: alterdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_SPEC_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const specDel = ({ dispatch }, param) => { //删除药材相关信息
    Vue.http({
        method: 'DELETE',
        url: apiUrl.clientList + param.url + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('删除成功')
        dispatch(types.DELETE_SPECS_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const getClientList = ({ dispatch }, param) => {  //客户信息列表
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.clientList+'/customer/?'+'&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
           var client = res.json().result.list;
           for (var i in client){
                client[i].checked = false;
                client[i].show =false;
           }
            dispatch(types.CUSTOMER_DATA, client);
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}
export const getEmployeeList = ({ dispatch }, param) => {  //员工列表
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.clientList+'/employee/?'+'&page=' + param.cur + '&pageSize=8',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
           var employ = res.json().result.list;
           for (var i in employ){
                employ[i].show =false;
                employ[i].checked =false;
           }
            dispatch(types.EMPLOYEE_DATA, employ);
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}
export const getEmployNameSearch = ({ dispatch }, param) => {  //员工搜索
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.clientList+'/employee/?name='+param.name,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
           var employ = res.json().result.list;
           for (var i in employ){
                employ[i].show =false;
                employ[i].checked =false;
           }
            dispatch(types.EMPLOYEE_DATA, employ);
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}
export const getEmployphoneSearch = ({ dispatch }, param) => {  //员工手机号搜索
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.clientList+'/employee/?phone='+param.mobile,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
           var employ = res.json().result.list;
            dispatch(types.EMPLOYEE_DATA, employ);
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}
export const getEmployOrgSearch = ({ dispatch }, param) => {  //员工部门搜索
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.clientList+'/employee/?org='+param.orgId,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
           var employ = res.json().result.list;
            dispatch(types.EMPLOYEE_DATA, employ);
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}

export const getOrgList = ({ dispatch }, param) => {  //部门列表
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.clientList+'/org/',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
           var org = res.json().result;
           for (var i in org){
                org[i].show =false;
                org[i].checked =false;
           }
           console.log(res.json())
            dispatch(types.ORG_DATA, org);
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}

export const saveCreate = ({ dispatch }, data) => { //新增客户列表
    const Cdata = {
        "name":data.name,
        "type":data.type,
        "tel":data.tel,
        "category":data.category,
        "email":data.email,
        "principal":data.principal,
        "bizScope":data.bizScope,
        "province":data.province,
        "city":data.city,
        "address":data.address,
        "comments":data.comments,
        "id": data.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + '/customer/',
        emulateHTTP: true,
        body: Cdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.CUSTOMER_ADD_DATA, data);
    }, (res) => {
        console.log('fail');
    })
}
export const deleteInfo = ({ dispatch}, param) => { //删除客户、药材信息
    console.log(param)
    Vue.http({
        method: 'DELETE',
        url: apiUrl.clientList + param.url + param.id,
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
}
export const alterInfo = ({ dispatch }, param) => { //修改客户信息
    const data = {
        name:param.name,
        type:param.type,
        category:param.category,
        principal:param.principal,
        bizScope:param.bizScope,
        tel:param.tel,
        email:param.email,
        province:param.province,
        city:param.city,
        address:param.address,
        comments:param.comments,
        id: param.id
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + '/customer/',
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.CUSTOMER_UPDATE_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const updateContact = ({ dispatch }, param) => { //修改客户联系人
    const updatedata = {
        name:param.name,
        position:param.position,
        department:param.department,
        phone:param.phone,
        tel:param.tel,
        email:param.email,
        qq:param.qq,
        wechart:param.wechart,
        main:param.main
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        params: param.id,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_CUSTOMER_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const addrInfo = ({ dispatch }, param) => { //修改客户地址
    const updatedata = {
        type:param.type,
        contactName:param.contactName,
        contactPhone:param.contactPhone,
        sex:param.sex,
        country:param.country,
        province:param.province,
        city:param.city,
        district:param.district,
        street:param.street,
        detailAddr:param.detailAddr,
        address:param.address,
        id: param.id,
        customerId:param.customerId,
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.url+'/',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_ADDR_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterRemark = ({ dispatch }, param) => { //修改客户备注
    console.log(param)
    const updatedata = {
        remark:param.label,
        status:param.status,
        id:param.id,
        customerId:param.customerId,
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_LABEL_DETAIL,param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterLabel = ({ dispatch }, param) => { //修改客户标签
    console.log(param)
    const updatedata = {
        label:param.label,
        status:param.status,
        id:param.id,
        customerId:param.customerId,
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_LABEL_DETAIL,param);
    }, (res) => {
        console.log('fail');
    })
}
export const alterProduct = ({ dispatch }, param) => { //修改客户产品
    console.log(param)
    const updatedata = {
        type:param.type,
        name:param.name,
        breedId:param.breedId,
        quality:param.quality,
        location:param.location,
        spec:param.spec,
        number:param.number,
        price:param.price,
        unit:param.unit,
        duedate:param.duedate,
        coa:param.coa,
        cid:param.cid,
        id:param.id
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_PRODUCT_DATA,param);
    }, (res) => {
        console.log('fail');
    })
}
export const getClientDetail = ({ dispatch }, param) => { //获取客户详情
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/customer/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var con = res.json().result;
        var arr = con.contacts;
        con.contacts = {
            arr: arr,
            show: true
        };
        for (var i in con.contacts.arr) {
            con.contacts.arr[i].show = false;
        };
        var arr = con.addresses;
        con.addresses = {
            arr: arr,show: true
        };
        for (var j in con.addresses.arr) {
            con.addresses.arr[j].show = false;
        };
        var arr = con.files;
        con.files = {
            arr: arr,
            show: true
        };
        for (var j in con.files.arr) {
            con.files.arr[j].show = false;
        }
        var arr = con.labels;
        con.labels = {
            arr: arr,
            show: true
        };
        for (var j in con.labels.arr) {
            con.labels.arr[j].show = false;
        }
        var arr = con.products;
        con.products = {
            arr: arr,
            show: true
        };
        for (var j in con.products.arr) {
            con.products.arr[j].show = false;
        }
        var arr = con.remarks;
        con.remarks = {
            arr: arr,
            show: true
        };
        for (var j in con.remarks.arr) {
            con.remarks.arr[j].show = false;
        }
        var arr = con.chance;
        con.chance = {
            arr: arr,
            show: true
        };
        for (var j in con.chance.arr) {
            con.chance.arr[j].show = false;
        }      
        dispatch(types.CUSTOMER_DETAIL_DATA, con);
    }, (res) => {
        console.log('fail');
    })
}
export const createCustomer = ({ dispatch }, param) => { //新增客户相关联系人
    console.log(param.url)
    const data1 = {
         "name":param.name,
         "position":param.position,
         "department":param.department,
         "phone":param.phone,
         "tel":param.tel,
         "email":param.email,
         "qq":param.qq,
         "wechart":param.wechart,
         'main':param.main,
         "id":param.id,
         "customerId":param.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.CUSTOMER_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createAddress = ({ dispatch }, param) => { //新增客户地址
    console.log(param.url)
    const data1 = {
        "type":param.type,
        "contactName":param.contactName,
        "contactPhone":param.contactPhone,
        "sex":param.sex,
        "country":param.country,
        "province":param.province,
        "city":param.city,
        "district":param.district,
        "street":param.street,
        'detailAddr':param.detailAddr,
        "address":param.address,
        "customerId":param.customerId,
        "id":param.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.ADD_ADDR_DETAIL, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createLabel = ({ dispatch }, param) => { //新增客户标签
    console.log(param)
    const data1 = {
        "label":param.label,
        "status":param.status,
        "customerId":param.customerId,
        "id":param.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.ADD_LABEL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createRemark = ({ dispatch }, param) => { //新增客户备注
    console.log(param)
    const data1 = {
        "remark":param.label,
        "status":param.status,
        "customerId":param.customerId,
        "id":param.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.ADD_LABEL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createProduct = ({ dispatch }, param) => { //新增客户产品
    const data1 = {
        "type":param.type,
        "name":param.name,
        "breedId":param.breedId,
        "quality":param.quality,
        "location":param.location,
        "spec":param.spec,
        "number":param.number,
        "price":param.price,
        "unit":param.unit,
        "duedate":param.duedate,
        "coa":param.coa,
        "cid":param.cid,
        "id":param.id
    }
    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.ADD_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const addrDel = ({ dispatch }, param) => { //删除客户收货地址
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url + param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('删除成功')
        dispatch(types.DELETE_SPECS_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const transferEmploy = ({ dispatch }, param) => { //客户业务员划转信息
    console.log(param)
    const transferdata = {
        employeeId:param.employeeId,
        orgId:param.orgId,
        customerIds:param.arr
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + '/customer/customersTransferEmployee',
        emulateHTTP: false,
        body: transferdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('划转业务员成功')
        dispatch(types.EMPLOYEE_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}
export const transferInfo = ({ dispatch }, param) => { //客户部门划转信息
    console.log(param)
    const transferdata = {
        orgId:param.orgId,
        customerIds:param.arr
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + '/customer/customersTransferEmployee',
        emulateHTTP: false,
        body: transferdata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('划转部门成功')
        dispatch(types.ORG_LIST_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}

export const getChanceList = ({ dispatch }, param) => {  //业务机会信息列表
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.clientList+'/chance/?'+'&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
         console.log(res.json().result)
           var chance = res.json().result.list;
           for (var i in chance){
                chance[i].checked = false;
                chance[i].show =false;
           }
            dispatch(types.CHANCE_LIST_DATA, chance);
            param.all = res.json().result.pages;
            param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getUserList = ({ dispatch }, param) => {  //会员信息列表
    param.loading = true;
    var url = apiUrl.userList+'/user/?'+'&page=' + param.cur + '&pageSize=15';
    for(var key in param){
        if(key=='phone'&&param[key]!=''){
             url += '&phone='+param[key];
        }
        if(key=='fullname'&&param[key]!=''){
             url += '&fullname='+param[key];
        }
        if(key=='status'&&param[key]!=''){
             url += '&status='+param[key];
        }

    }
    Vue.http({
        method:'GET',
        url:url ,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
       var user = res.json().result.list;
       for (var i in user){
            user[i].checked = false;
            user[i].show =false;
       }
        dispatch(types.USER_DATA, user);
        param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const updateUserInfo = ({ dispatch }, param) => { //修改用户基本信息
    console.log(param);
    const updatedata = {
        id: param.id,
        fullname: param.fullname,
    }
    console.log(updatedata);
    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/user/',
        emulateHTTP: false,
        //params: param.id,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With":"XMLHttpRequest",
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        dispatch(types.UPDATE_USER_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}


export const userTransferCustomer = ({ dispatch }, param) => { //会员转客户
    console.log('========');
    console.log(param);
    console.log('========');
    const data = {
        id: param.id,
        main:param.main,
        phone:param.phone,
        tel:param.tel,
        email:param.email,
        qq:param.qq,
        type:param.type,
        fullname:param.fullname,
        employeeId:param.employeeId,
        orgId:param.orgId,
        customerId:param.customerId,
        status:1
    }
    console.log(data);
    Vue.http({
        method: 'POST',
        url: apiUrl.userList + '/user/transformCustomer',
        emulateHTTP: false,
        //params: param.id,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With":"XMLHttpRequest",
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('划转成功')
        //dispatch(types.UPDATE_USER_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

// export const uploadFiles = ({ dispatch }, param) => { //客户业务员划转信息
//     console.log(param)
//     const data = {
//         catagory:param.catagory,
//         type:param.type,
//         path:param.path,
//         customerId:param.id
//     }
//     Vue.http({
//         method: 'POST',
//         url: apiUrl.clientList + param.url,
//         emulateHTTP: false,
//         body: data,
//         emulateJSON: false,
//         headers: {
//             "X-Requested-With": "XMLHttpRequest",
//             'Content-Type': 'application/json;charset=UTF-8'
//         }
//     }).then((res) => {
//         console.log('文件添加成功')
//         dispatch(types.EMPLOYEE_DATA, param);
//     }, (res) => {
//         console.log('fail');
//     });
// }


/*export const getEmployeeList = ({ dispatch }, param) => {  //业务员信息列表
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.employeeList+'/employee/',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
           var employee = res.json().result.list;
           for (var i in employee){
                employee[i].checked = false;
                employee[i].show =false;
           }
            dispatch(types.EMPLOYEE_DATA, employee);
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}*/

/*export const getOrgList = ({ dispatch }, param) => {  //部门列表
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.orgList+'/org/',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
            console.log(res.json());
           var org = res.json().result;
           for (var i in org){
                org[i].checked = false;
                org[i].show =false;
           }

            dispatch(types.ORG_DATA, org);
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}*/

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
        var obj1 = res.json().result;
        dispatch(types.SYSTEM_SEARCH, obj1);
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

export const deleteShowStatue = ({ dispatch }, param) => { //删除枚举
    /*dispatch(types.DELETE_SHOW_STATUE, param);*/
    console.log(param)
    Vue.http({
        method: 'DELETE',
        url: apiUrl.dataBaseList + '/' + param,
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
export const contactDel = ({ dispatch }, param) => { //删除企业联系人
    console.log(param)
    Vue.http({
        method: 'DELETE',
        url: apiUrl.enterpriseList + param,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('删除成功')
        dispatch(types.DELETE_CONTACT_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}
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
    console.log(param)
    console.log(param.id)
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
export const deleteInfo = ({ dispatch }, param) => { //删除客户、药材信息
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
    const updatedata = {
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
        params: param.id,
        body: updatedata,
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
    console.log(param)
    const updatedata = {
        type:param.type,
        contact_name:param.contact_name,
        contact_phone:param.contact_phone,
        sex:param.sex,
        country:param.country,
        province:param.province,
        city:param.city,
        district:param.district,
        street:param.street,
        detail_addr:param.detail_addr,
        address:param.address,
        id: param.id,
        customerId:param.customer_id,
    }
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + param.url+'/'+param.id,
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
        var arr = con.contact;
        con.contact = {
            arr: arr,show: true
        };
        for (var i in con.contact.arr) {
            con.contact.arr[i].show = false;
        };
        var arr = con.chance;
        con.chance = {
            arr: arr,show: true
        };
        for (var j in con.chance.arr) {
            con.chance.arr[j].show = false;
        };
        var arr = con.addr;
        con.addr = {
            arr: arr,show: true
        };
        for (var j in con.addr.arr) {
            con.addr.arr[j].show = false;
        };
        var arr = con.intent;
        con.intent = {
            arr: arr,
            show: true
        };
        for (var j in con.intent.arr) {
            con.intent.arr[j].show = false;
        }
        var arr = con.orders;
        con.orders = {
            arr: arr,
            show: true
        };
        for (var j in con.orders.arr) {
            con.orders.arr[j].show = false;
        }
        var arr = con.contract;
        con.contract = {
            arr: arr,
            show: true
        };
        for (var j in con.contract.arr) {
            con.contract.arr[j].show = false;
        }
        var arr = con.files;
        con.files = {
            arr: arr,
            show: true
        };
        for (var j in con.files.arr) {
            con.files.arr[j].show = false;
        }
        var arr = con.track;
        con.track = {
            arr: arr,
            show: true
        };
        for (var j in con.track.arr) {
            con.track.arr[j].show = false;
        }
        var arr = con.remark;
        con.remark = {
            arr: arr,
            show: true
        };
        for (var j in con.remark.arr) {
            con.remark.arr[j].show = false;
        }
        var arr = con.license;
        con.license = {
            arr: arr,
            show: true
        };
        for (var j in con.license.arr) {
            con.license.arr[j].show = false;
        };  
        var arr = con.produce;
        con.produce = {
            arr: arr,
            show: true
        };
        for (var j in con.produce.arr) {
            con.produce.arr[j].show = false;
        };       
        dispatch(types.CUSTOMER_DETAIL_DATA, con);
    }, (res) => {
        console.log('fail');
    })
}

export const createCustomer = ({ dispatch }, param) => { //新增药材相关联系人
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
         'main':param.main
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
        dispatch(types.CUSTOMER_DETAIL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const createAddress = ({ dispatch }, param) => { //新增药材相关地址
    console.log(param.url)
    const data1 = {
        "type":param.type,
        "contact_name":param.contact_name,
        "contact_phone":param.contact_phone,
        "sex":param.sex,
        "country":param.country,
        "province":param.province,
        "city":param.city,
        "district":param.district,
        "street":param.street,
        'detail_addr':param.detail_addr,
        "address":param.address,
        "customer_id":param.customer_id
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
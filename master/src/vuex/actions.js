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
    var url = apiUrl.orderList+'/order/?'+'page=' + param.cur + '&pageSize=15';
    console.log('param===>');
    console.log(param);
    for(var key in param){
        if(key=='orderNum'&&param[key]!=''){
             url += '&orderNum='+param[key];
        }
        if(key=='customerId'&&param[key]!=''){
          url += '&customerId='+param[key];
        }
    }
    Vue.http({
        method:'GET',
        url:url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
           var orderList = res.json().result.list;
           console.log('订单列表!!!');
           console.log(orderList);
           for (var i in orderList){
                orderList[i].checked = false;
                orderList[i].show =false;

           }
            dispatch(types.ORDER_TABLE, orderList);
            param.all = res.json().result.pages;
            param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
};

export const createOrder = ({ dispatch }, data) => { //创建订单

    console.log(data);
    
    /*const body = {
        type:data.type,
        customer:data.customer,
        sample:data.sample,
        intl:data.intl,
        incidentals:data.incidentals,
        incidentalsDesc:data.incidentalsDesc,
        preferential:data.preferential,   
        preferentialDesc:data.preferentialDesc,  
        currency:data.currency,     
        consignee:data.consignee,    
        consigneePhone:data.consigneePhone,
        zipCode:data.zipCode,     
        country:data.country,
        province:data.province,
        city:data.city,
        district:data.district,
        consigneeAddr:data.consigneeAddr,
        comments:data.comments, 
        sourceType:data.sourceType,     
        sourceId:data.sourceId,     
        title:data.title,     
        breedId:data.breedId,   
        brredName:data.breedName,
        quality:data.quality,
        location:data.location,
        spec:data.spec,
        price:data.price,
        unit:data.unit,
        number:data.number 
    }*/
    const body = {
        type:1,
        sourceType:1,
        sample:1,
        intl:1,
        customer:1,
        incidentals:1.1,
        incidentalsDesc:'asada',
        preferential:1.1,
        preferentialDesc:'dad',
        currency:1,
        consignee:'4111',
        consigneePhone:'12455',
        zipCode:'423453',
        country:'7',
        province:'243',
        city:'3056',
        district:'1346',
        consigneeAddr:'大大',
        comments:'阿斯蒂芬',
        goods:[{
            sourceType:2,
            sourceId:'12545',
            title:'424',
            breedId:123,
            brredName:'ff',
            quality:'dada',
            location:'dad',
            spec:'da',
            price:1.2,
            unit:'kg',
            number:12
        }]
    }
    console.log(body);
    Vue.http({
        method: 'POST',
        url: apiUrl.orderList + '/order/',
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

export const getOrderDetail = ({ dispatch }, param) => { //获取订单详情
    console.log('param===');
    console.log(param);
    Vue.http({
        method: 'GET',
        url: apiUrl.orderList + '/order/' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var orderDetail = res.json().result;
        var goods = orderDetail.goods;
        orderDetail.goods={};
        orderDetail.goods.arr = goods;
        orderDetail.goods.show = true;
        console.log(orderDetail);

        dispatch(types.ORDER_DETAIL_DATA, orderDetail);
    }, (res) => {
        console.log('fail');
    })
}

export const getSystemData = ({ dispatch }, param) => { //枚举类型
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.dataBaseList + '/query?type=&page=' + param.cur + '&pageSize=15',
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
    console.log(param)
    param.loading = true;
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/enum/query/?type=' + param.sel+'&page=' + param.cur + '&pageSize=15',
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
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}
export const saveDataInfo = ({ dispatch }, data) => { //新建枚举类型
    const body = {
        code: data.code,
        desc: data.desc,
        id: data.id,
        name: data.name,
        status: data.status,
        type: data.type,
        // typedesc : data.typedesc
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
        type: param.type,
        // typedesc: param.typedesc
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
        
        dispatch(types.UPDATE_DATA, param);
        console.log('修改成功')
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

  console.log(param);

  if(param.loading)param.loading = true;
  if(!param.cur){
    param.cur='';
  }
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
}

export const getCountryList = ({ dispatch }, param) => { //获取国家列表
    if(param.loading!==undefined){
        param.loading = true;
    }
  if(!param.cur){
    param.cur='';
  }

    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/country/?page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        dispatch(types.COUNTRY_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
       if(param.country){
         for(var i in res.json().result){
           if(res.json().result[i].cname==param.country){
             const object={
               id:res.json().result[i].id,
               province:param.province,
               city:param.city,
               loading:false
             }
             console.log(object);
             return getProvinceList({ dispatch },object);
           }
         }
       }

    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getProvinceList = ({ dispatch }, param) => { //获取省的列表
  if(param.loading) param.loading = true;
  if(!param.id){
    param.id='';
  }
  if(!param.cur){
    param.cur='';
  }
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/province/?page=' + param.cur + '&pageSize=15&country='+param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        dispatch(types.PROVINCE_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;

      if(param.province){
        for(var i in res.json().result){
          if(res.json().result[i].cname==param.province){
            const object={
              id:res.json().result[i].id,
              city:param.city,
              loading:false
            }
            return getCityList({ dispatch },object);
          }
        }
      }
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getCityList = ({ dispatch }, param) => { //获取市的列表
  if(param.loading)param.loading = true;
    if(!param.cur){
      param.cur='';
    }
    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/city/?page=' + param.cur + '&pageSize=15&province='+param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        dispatch(types.CITY_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
      if(param.city){
        for(var i in res.json().result){
          if(res.json().result[i].cname==param.city){
            const object={
              id:res.json().result[i].id,
              loading:false
            }
            return getDistrictList({ dispatch },object);
          }
        }
      }
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getDistrictList = ({ dispatch }, param) => { //获取区的列表
  if(param.loading) param.loading = true;
  if(!param.cur){
    param.cur='';
  }

    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/sys/location/district/?page=' + param.cur + '&pageSize=15&city='+param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        dispatch(types.DISTRICT_LIST, obj);
        param.loading = false;
        param.all = res.json().result.pages;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    });
}

export const getEnterpriseData = ({ dispatch }, param) => { // 企业列表
    param.loading = true;
    console.log('url==>');
    console.log(apiUrl.clientList + '/company/query?type=&name=&category=&province=&transform=&page=' + param.cur + '&pageSize=15');
    Vue.http({
        method: "GET",
        url: apiUrl.clientList + '/company/query?type=&name=&category=&province=&transform=&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        console.log('---------------->');
        console.log(res.json());
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
  if(!param.cur){
    param.cur='';
  }
    var url = apiUrl.clientList + '/company/query?page=' + param.cur + '&pageSize=15';
  console.log(url);
  console.log(param);
    for(var key in param){
        if(key=='conType'&&param[key]!==''){
            url +='&type='+ param.conType
        }else if(key=='conType'){
            url +='&type='
        }
        if(key=='conName'&&param[key]!==''){
            url +='&name='+ param.conName
        }else if(key=='conName'){
            url +='&name='
        }
        if(key=='category'&&param[key]!==''){
            url +='&category='+ param.category
        }else if(key=='category'){
            url +='&category='
        }
        if(key=='conProvince'&&param[key]!==''){
            url +='&province='+ param.conProvince
        }else if(key=='conProvince'){
            url +='&province='
        }
        if(key=='transform'&&param[key]!==''){
            url +='&transform='+ param.transform
        }else if(key=='transform'){
            url +='&transform='
        }
    }
    console.log(url);
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result.list;
        console.log(obj)
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
        var arr = obj.companyProducts;
        obj.companyProducts = {
            arr: arr,
            show: true
        };
        for (var i in obj.companyProducts.arr) {
            obj.companyProducts.arr[i].show = false;
        }
        var arr = obj.companyLicenses;
        obj.companyLicenses = {
            arr: arr,
            show: true
        };
        for (var i in obj.companyLicenses.arr) {
            obj.companyLicenses.arr[i].show = false;
        }
        dispatch(types.SERVICE_ENTERPRISE_DETAIL, obj);
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
        wechart: param.wechart,
        main:param.main,
        id:param.id
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

export const deleteCompanyContact = ({ dispatch }, param) => { //修改企业联系人
  const alterdata = {
    status:0,
    id:param.id
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
    console.log('删除成功')
    dispatch(types.DELETE_CONTACT_DATA, param);
  }, (res) => {
    console.log('fail');
  })
}

export const createContact = ({ dispatch }, param) => { //新增企业联系人
    console.log(param)
    const data1 = {
        "name": param.name,
        "cid": param.cid,
        "tel": param.tel,
        "phone": param.phone,
        "wechart": param.wechart,
        "email": param.email,
        "main":param.main
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
      console.log(res);
        dispatch(types.ADD_CONTACT_DATA, param)
    }, (res) => {
        console.log('fail');
    });
}



export const getComponentData = ({ dispatch }, param) => { //成分
    param.loading = true;
    if(!param.name){
      param.name='';
    }

    Vue.http({
        method: 'GET',
        url: apiUrl.clientList + '/recipe/' + '?page=' + param.cur + '&pageSize=15&recipeName='+param.name,
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
        url: apiUrl.clientList + '/recipe/company/?id=' + param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var obj = res.json().result;
        var arr = obj.list;
        obj.list = {};
        obj.list.show=false;
        obj.list.arr = arr;
       /* for (var i in obj.list) {
            obj.list[i].show = false;
        }*/
        console.log(obj)
        dispatch(types.DRUG_DETAIL_DATA, obj.list);
    }, (res) => {
        console.log('fail');
    });
}

export const getDrawData = ({ dispatch }, param) => { //提取物以及搜索
    param.loading = true;
    var url = apiUrl.drawList + '/' + '?page=' + param.cur + '&pageSize=15';
    for(var ext in param){
        if(ext=='name'&&param[ext]!==''){
            url+='&extractiveName='+param.name
        }
        if(ext=='company'&&param[ext]!==''){
            url+='&companyName='+param.company
        }
    }
    Vue.http({
        method: 'GET',
        url: url,
        emulateJSON: true
    }).then((res) => {
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
            breed[i].checked = false;
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
        param.loading=false;
        var breed = res.json().result;
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
        console.log(breed);
        dispatch(types.BREED_DETAIL_DATA, breed);
    }, (res) => {
        console.log('fail');
    });
}

export const getBreedNameSearch = ({ dispatch }, param) => { //药材搜索
    param.loading = true;
    console.log(param)
  if(!param.categoryId){
    param.categoryId='';
  }
  if(!param.name){
    param.name='';
  }
    Vue.http({
        method: 'GET',
        url: apiUrl.breedList + '/' + '?category='+param.categoryId+'&breedName=' + param.name + '&page=' + param.cur + '&pageSize=15',
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        var breed = res.json().result.list;
        for (var i in breed) {
            breed[i].show = false;
            breed[i].checked = false;
        }
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
        code: data.code,
        pinyin: data.pinyin,
        eName: data.eName,
        lName:data.lName,
        icon: data.path
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
          param.id=res.json().result.id;
          param.breedId=id;
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
      param.id=res.json().result.id;
      param.breedId=id;
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
        eName: param.eName,
        lName: param.lName,
        pinyin: param.pinyin,
        id: param.id
    }
    console.log('update===');
    console.log(updatedata);
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
   console.log(param);
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

export const getClientList = ({ dispatch }, param) => {  //客户信息列表与搜索
    param.loading = true;
    console.log(param);
    var clienturl = apiUrl.clientList+param.link+'?&page=' + param.cur + '&pageSize=15';
    for(var search in param){
        if(search=='name'&&param[search]!==''){
            clienturl += '&name='+param.name
        }
        if(search=='type'&&param[search]!==''){
            clienturl += '&type='+param.type
        }
        if(search=='classify'&&param[search]!==''){
            clienturl += '&classify='+param.classify
        }

        if(search=='phone'&&param[search]!==''){
            clienturl += '&phone='+param.phone
        }
        if(search=='employeeId'&&param[search]!==''){
            clienturl += '&employeeId='+param.employeeId
        }
        if(search=='bizScope'&&param[search]!==''){
            clienturl += '&bizScope='+param.bizScope
        }
        if(search=='province'&&param[search]!==''){
            clienturl += '&province='+param.province
        }
        if(search=='city'&&param[search]!==''&&param[search]!==undefined){
            clienturl += '&city='+param.city
        }
        if(search=='blacklist'&&param[search]!==''&&param[search]!==undefined){
          clienturl += '&blacklist='+param.blacklist
        }
        if(search=='status'&&param[search]!==''&&param[search]!==undefined){
            clienturl += '&status='+param.status
        }
    }
    Vue.http({
        method:'GET',
        url:clienturl,
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
            dispatch(types.CUSTOMER_DATA, client)
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}

export const getProductList = ({ dispatch }, param) => {  //供应商产品列表
    param.loading = true;
    console.log(param);
    var clienturl = apiUrl.clientList+param.link+'?&page=' + param.cur + '&pageSize=15';
    for(var search in param){
        if(search=='name'&&param[search]!==''){
            clienturl += '&name='+param.name
        }
        if(search=='type'&&param[search]!==''){
            clienturl += '&type='+param.type
        }
        if(search=='status'&&param[search]!==''&&param[search]!==undefined){
            clienturl += '&status='+param.status
        }
    }
    Vue.http({
        method:'GET',
        url:clienturl,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
        }).then((res) => {
           var product = res.json().result.list;
           for (var i in product){
                product[i].show =false;
           }
            dispatch(types.PRODUCT_DATA, product)
            param.all = res.json().result.pages;
            param.loading = false;
        }, (res) => {
            console.log('fail');
            param.loading = false;
        })
}

export const getMyClientList = ({ dispatch }, param) => {  //业务员的(我的)客户信息列表与搜索
    param.loading = true;
    console.log(param);
    var clienturl = apiUrl.clientList+'/customer/employeeDistributed?'+'&page=' + param.cur + '&pageSize=15';
    for(var search in param){
        if(search=='name'&&param[search]!==''){
            clienturl += '&name='+param.name
        }
        if(search=='type'&&param[search]!==''){
            clienturl += '&type='+param.type
        }
        if(search=='classify'&&param[search]!==''){
            clienturl += '&classify='+param.classify
        }
        if(search=='status'&&param[search]!==''){
            clienturl += '&status='+param.status
        }
        if(search=='phone'&&param[search]!==''){
            clienturl += '&phone='+param.phone
        }
        if(search=='employeeId'&&param[search]!==''){
            clienturl += '&employeeId='+param.employeeId
        }
        if(search=='bizScope'&&param[search]!==''){
            clienturl += '&bizScope='+param.bizScope
        }
        if(search=='province'&&param[search]!==''){
            clienturl += '&province='+param.province
        }
        if(search=='city'&&param[search]!==''&&param[search]!==undefined){
            clienturl += '&city='+param.city
        }

    }
    Vue.http({
        method:'GET',
        url:clienturl,
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

export const getOrgClientList = ({ dispatch }, param) => {  //部门客户信息列表与搜索
    param.loading = true;
    console.log(param);
    var clienturl = apiUrl.clientList+'/customer/orgDistributed?'+'&page=' + param.cur + '&pageSize=15';
    for(var search in param){
        if(search=='name'&&param[search]!==''){
            clienturl += '&name='+param.name
        }
        if(search=='type'&&param[search]!==''){
            clienturl += '&type='+param.type
        }
        if(search=='classify'&&param[search]!==''){
            clienturl += '&classify='+param.classify
        }
        if(search=='status'&&param[search]!==''){
            clienturl += '&status='+param.status
        }
        if(search=='phone'&&param[search]!==''){
            clienturl += '&phone='+param.phone
        }
        if(search=='employeeId'&&param[search]!==''){
            clienturl += '&employeeId='+param.employeeId
        }
        if(search=='bizScope'&&param[search]!==''){
            clienturl += '&bizScope='+param.bizScope
        }
        if(search=='province'&&param[search]!==''){
            clienturl += '&province='+param.province
        }
        if(search=='city'&&param[search]!==''&&param[search]!==undefined){
            clienturl += '&city='+param.city
        }

    }
    Vue.http({
        method:'GET',
        url:clienturl,
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

export const customerTransferBlacklist  = ({ dispatch }, param) => {
            param.loading = true;
            const data={};
            if(param.link=='/customer/transferBlacklist'){
                data.blackComments=param.blackComments;
                data.customerIds=param.customerIds;
                data.blacklist=param.blacklist;
              }
            else if(param.link=='/customer/setSupplier'){
              data.customerIds=param.customerIds;
              data.supplier=1;
              data.comments=param.blackComments;
            }
            Vue.http({
              method: "POST",
              url: apiUrl.clientList + param.link,
              emulateHTTP: true,
              body: data,
              emulateJSON: false,
              headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/json;charset=UTF-8'
                }
              }).then((res) => {
              param.loading = false;
              if(param.link=='/customer/transferBlacklist'){dispatch(types.CUSTOMER_BATCH_DELETE, param);}
              }, (res) => {
              param.loading = false;
                console.log('fail');
            });
}



export const getEmployeeList = ({ dispatch }, param) => {  //员工列表以及搜索
    param.loading = true;
    var apiurl = apiUrl.clientList+'/employee/?'+'&page=' + param.cur + '&pageSize=14';
    /*var apiurl = apiUrl.employeeList+'/?'+'&page=' + param.cur + '&pageSize=14';*/
    for(var seach in param){
        if(seach=='name'&&param[seach]!==''){
            apiurl += '&name='+param.name
        }
        if(seach=='mobile'&&param[seach]!==''){
            apiurl += '&phone='+param.mobile
        }
        if(seach=='orgId'&&param[seach]!==''){
            apiurl += '&org='+param.orgId
        }
    }
    Vue.http({
        method:'GET',
        url:apiurl,
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

export const  saveCreate = ({ dispatch }, data) => { //新增客户列表
    console.log('新增客户');
    console.log(data);
    const Cdata = {
        "name":data.name,
        "type":data.type,
        "tel":data.tel,
        "category":data.category,
        "classify":data.classify,
        "email":data.email,
        "userId":data.userId,
        "companyId":data.companyId,
        "number":data.number,
        "category":data.category,
        "principal":data.principal,
        "bizScope":data.bizScope,
        "province":data.province,
        "city":data.city,
        "address":data.address,
        "comments":data.comments,
        "contacts": data.contacts,
        "legalPerson":data.legalPerson,
        "principal":data.principal,
        "bizScope":data.bizScope,
        "website":data.website,
        "orgId":data.orgId,
        "employeeId":data.employeeId,
        "country":data.country
    }
    console.log(Cdata);
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
        data.id=res.json().result.customerId;
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
    console.log(param)
    const data = {
        name:param.name,
        type:param.type,
        category:param.category,
        principal:param.principal,
        bizScope:param.bizScope,
        mainPhone:param.mainPhone,
        email:param.email,
        province:param.province,
        country:param.country,
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
    console.log(param);

    const updatedata = {
        id:param.id,
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
    /*console.log(param)*/
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
export const updateProduct = ({ dispatch }, param) => { //修改供应商产品
    /*console.log(param)*/
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
        dispatch(types.ALTER_PRODUCT_DATA,param);
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
      param.loading=false;
        var con = res.json().result;

        var arr = con.contacts;
        con.contacts = null;
        con.contacts = {
            arr: arr,
            show: true
        };
        for (var i in con.contacts.arr) {
            con.contacts.arr[i].show = false;
        };

        var arr = con.addresses;
        con.addresses = null;
        con.addresses = {
            arr: arr,
            show: true
        };
        for (var j in con.addresses.arr) {
            con.addresses.arr[j].show = false;
        };

        var arr = con.files;
        con.files = null;
        con.files = {
            arr: arr,
            show: true
        };
        for (var j in con.files.arr) {
            con.files.arr[j].show = false;
        }

        var arr = con.labels;
        con.labels = null;
        con.labels = {
            arr: arr,
            show: true
        };
        for (var j in con.labels.arr) {
            con.labels.arr[j].show = false;
        }

        var arr = con.products;
        con.products = null;
        con.products = {
            arr: arr,
            show: true
        };
        for (var j in con.products.arr) {
            con.products.arr[j].show = false;
        }

        var arr = con.remarks;
        con.remarks = null;
        con.remarks = {
            arr: arr,
            show: true
        };
        for (var j in con.remarks.arr) {
            con.remarks.arr[j].show = false;
        }


        var arr = con.intentions;
        con.intentions = null;
        con.intentions = {
            arr: arr,
            show: true
        };
        for (var j in con.intentions.arr) {
            con.intentions.arr[j].show = false;
        }

        var arr = con.orders;
        con.orders = null;
        con.orders = {
            arr: arr,
            show: true
        };

        for (var j in con.orders.arr) {
            con.orders.arr[j].show = false;
        }

      var arr = con.trackings;
      con.trackings = null;
      con.trackings = {
        arr: arr,
        show: true
      };

      for (var j in con.trackings.arr) {
        con.trackings.arr[j].show = false;
      }

        /*if(con.orders.show&&con.intention.show){
            dispatch(types.CUSTOMER_DETAIL_DATA, con);
        }*/
        dispatch(types.CUSTOMER_DETAIL_DATA, con);
    }, (res) => {
      param.loading=false;
        console.log('fail');
    })
}
export const createCustomer = ({ dispatch }, param) => { //新增客户相关联系人
    console.log(param.main)
    const data1 = {
         "name":param.name,
         "position":param.position,
         "department":param.department,
         "phone":param.phone,
         "tel":param.tel,
         "email":param.email,
         "qq":param.qq,
         "wechart":param.wechart,
         'main':Number(param.main),
         //"id":param.id,
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
        param.id = res.json().result.id;
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
        "customerId":param.customerId
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
        param.id = res.json().result.id;
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
        "customerId":param.customerId
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
        param.id = res.json().result.id;
        dispatch(types.ADD_LABEL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createRemark = ({ dispatch }, param) => { //新增客户备注
    console.log(param)
    const data1 = {
        "remark":param.remark,
        "status":param.status,
        "customerId":param.customerId,
        //"id":param.id
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
        param.id = res.json().result.id;
        dispatch(types.ADD_LABEL_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const createProduct = ({ dispatch }, param) => { //新增客户产品
    const data = {
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
        "cid":param.cid
    }

    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        param.id = res.json().result.id;
        dispatch(types.ADD_PRODUCT_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}
export const newProduct = ({ dispatch }, param) => { //新增供应商产品
    console.log(param);
    const data = {
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
        "cid":param.cid
    }

    Vue.http({
        method: "POST",
        url: apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.SUPPLY_PRODUCT_DATA, param);
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
    const transferdata = {
        employeeId:param.employeeId,
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

    const transferdata = {
        orgId:param.orgId,
        customerIds:param.arr
    }
    console.log(transferdata);
    console.log(apiUrl.clientList + '/customer/customersTransferEmployee');
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

export const getIntentionList = ({ dispatch }, param) => {  //意向信息列表以及搜索
    param.loading = true;
    console.log(param.link);
    var url = apiUrl.clientList+param.link+'?&page=' + param.cur + '&pageSize=15';
     for(var search in param){
        if(search=='type'&&param[search]!==''){
            url += '&type='+param.type
        }else if(search=='type'){
            url +='&type='
        }
        if(search=='invoic'&&param[search]!==''){
            url += '&invoic='+param.invoic
        }else if(search=='invoic'){
            url +='&invoic='
        }
        if(search=='status'&&param[search]!==''){
            url += '&status='+param.status
        }else if(search=='status'){
            url +='&status='
        }
        if(search=='intl'&&param[search]!==''){
            url += '&intl='+param.intl
        }else if(search=='intl'){
            url +='&intl='
        }
        if(search=='sampling'&&param[search]!==''){
            url += '&sampling='+param.sampling
        }else if(search=='sampling'){
            url +='&sampling='
        }
        if(search=='visit'&&param[search]!==''){
            url += '&visit='+param.visit
        }else if(search=='visit'){
            url +='&visit='
        }
        if(search=='advance'&&param[search]!==''){
            url += '&advance='+param.advance
        }else if(search=='advance'){
            url +='&advance='
        }
    }
    Vue.http({
        method:'GET',
        url:url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
           var intent = res.json().result.list;
           for (var i in intent){
                intent[i].checked = false;
                intent[i].show =false;
           }
            dispatch(types.INTENTION_LIST_DATA, intent);
            param.all = res.json().result.pages;
            param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getSupplyDemandList = ({ dispatch }, param) => {  //匹配供求信息(意向)
    param.loading = true;
    param.type = 1;
    var url = apiUrl.clientList+param.link+'?type='+param.type+'&breedId='+param.breedId;
    Vue.http({
        method:'GET',
        url:url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
           var intent = res.json().result.list;
           console.log(intent);
            dispatch(types.SUPPLY_DEMAND_DATA, intent);
            param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getIntentionDetail = ({ dispatch }, param) => {  //意向详情
    param.loading = true;
    var url = apiUrl.clientList+'/intention/'+param.id;
    Vue.http({
        method:'GET',
        url:url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
            var result = res.json().result;
            var arr = result.offers;
            result.offers = null;
            result.offers = {
                arr:arr,
                show:false
            };
            for (var i in result.offers.arr) {
                result.offers.arr[i].show = false;
            };
            var arr = result.msgs;
            result.msgs = null;
            result.msgs = {
                arr:arr,
                show:false
            };
            for (var i in result.msgs.arr) {
                result.msgs.arr[i].show = false;
            };
            dispatch(types.INTENTION_DETAIL_DATA, result);
            if(res.json().result.pics[0]){
              param.image_f=res.json().result.pics[0].path;
            }
            if(res.json().result.pics[1]){
              param.image_s=res.json().result.pics[1].path;
            }
            if(res.json().result.pics[2]){
              param.image_t=res.json().result.pics[2].path;
            }

            param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getOfferList = ({ dispatch }, param) => {  //报价信息列表以及搜索
    param.loading = true;
    var url = apiUrl.clientList+'/intention/employee/offers?'+'&page=' + param.cur + '&pageSize=15';
    if('intentionId' in param&&param.intentionId!==''){
        url += '&intentionId='+param.intentionId
    }
    Vue.http({
        method:'GET',
        url:url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
           var offer = res.json().result.list;
           for (var i in offer){
                offer[i].checked = false;
                offer[i].show =false;
           }
            dispatch(types.OFFER_LIST_DATA, offer);
            param.all = res.json().result.pages;
            param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const getMsgList = ({ dispatch }, param) => {  //留言信息列表以及搜索
    param.loading = true;
    var url = apiUrl.clientList+'/intention/msgs?'+'&page=' + param.cur + '&pageSize=15';
    if('intentionId' in param&&param.intentionId!==''){
        url += '&intentionId='+param.intentionId
    }
    if('userId' in param&&param.userId!==''){
        url += '&userId='+param.userId
    }
    Vue.http({
        method:'GET',
        url:url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
           var msg = res.json().result.list;
           for (var i in msg){
                msg[i].checked = false;
                msg[i].show =false;
           }
            dispatch(types.MSG_LIST_DATA, msg);
            param.all = res.json().result.pages;
            param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const updateMsg = ({ dispatch }, param) => {  //修改留言信息

    var url = apiUrl.clientList+'/intention/msgs';
    const data = {
        id: param.id,
        comments: param.comments,
        status:10
    }
    console.log(data);
    Vue.http({
        method: 'PUT',
        url: url,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        param.show = false;
        
    }, (res) => {
        console.log('fail');
        param.show = false;
    });
}

/*export const getOffersdetail = ({ dispatch }, param) => {  //意向报价详情
    Vue.http({
        method:'GET',
        url:apiUrl.clientList+'/intention/offers/?intentionId='+param.id,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
        console.log(res.json().result)
            var offer = res.json().result.list;
            for(var i in offer){
                offer[i].show=true;
            }
            dispatch(types.INTENTION_OFFER_DETAIL, offer);
    }, (res) => {
        console.log('fail');
    })
}*/

export const getUserList = ({ dispatch }, param) => {  //会员信息列表
    param.loading = true;
    var url = apiUrl.userList+'/user/?'+'&page=' + param.cur + '&pageSize=15';
    for(var key in param){
        if(key=='phone'&&param[key]!==''){
             url += '&phone='+param[key];
        }
        if(key=='fullname'&&param[key]!==''){
             url += '&fullname='+param[key];
        }
        if(key=='source'&&param[key]!==''){
             url += '&source='+param[key];
        }
        if(key=='busiType'&&param[key]!==''){
             url += '&busiType='+param[key];
        }
        if(key=='audit'&&param[key]!==''){
             url += '&audit='+param[key];
        }
        if(key=='startCtime'&&param[key]!==''){
             url += '&startCtime='+param[key];
        }
        if(key=='endCtime'&&param[key]!==''){
             url += '&endCtime='+param[key];
        }
        if(key=='transform'&&param[key]!==''){
             url += '&transStatus='+param[key];
        }
        if(key=='city'&&param[key]!==''){
             url += '&city='+param[key];
        }
        if(key=='province'&&param[key]!==''){
             url += '&province='+param[key];
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
        console.log('页数==');
        console.log(res.json().result.pages);
        dispatch(types.USER_DATA, user);
        param.all = res.json().result.pages;
        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

//会员审核快速编辑标签
export const auditQuickEdit = ({ dispatch }) => {
    Vue.http.get(apiUrl.auditQuickEdit)
        .then((res) => {
            dispatch(types.QUICK_EDIT, res.data.results);
        }, (res) => {
            console.log('fail');
        });
};

export const getUserDetail = ({ dispatch }, param) => {  //会员详情
    param.loading = true;
    Vue.http({
        method:'GET',
        url:apiUrl.userList+'/user/'+param.id ,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
        console.log("user详情====>");
        var userDetail = res.json().result;
        console.log(userDetail);
        if(userDetail.intention.length>0){
            userDetail.intention.forEach(function(item){
                item.checked = false;
                item.show = false;
            })
        }

        if(userDetail.tracking.length>0){
            userDetail.tracking.forEach(function(item){
                item.show = false;
            })
        }

        var intention = userDetail.intention;
        userDetail.intention ={};
        userDetail.intention.show = false;
        userDetail.intention.checked = false;
        userDetail.intention.arr = intention;

        var tracking = userDetail.tracking;
        userDetail.tracking ={};
        userDetail.tracking.show = false;
        userDetail.tracking.arr = tracking;

        userDetail.personalAuthShow = false;
        userDetail.companyAuthShow = false;

        dispatch(types.USER_DETAIL_DATA, userDetail);

        param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const updateUserInfo = ({ dispatch }, param) => { //修改用户基本信息

    console.log(param);
    const updatedata = {
        id: param.id
    }
    if(param.qq){
        updatedata.qq = param.qq;
    }
    if(param.fullname){
        updatedata.fullname = param.fullname;
    }
    if(param.email){
        updatedata.email = param.email;
    }
    if(param.phone){
        updatedata.phone = param.phone;
    }
    if(param.tel){
        updatedata.tel = param.tel;
    }
    if(param.nickname){
        updatedata.nickname = param.nickname;
    }
    if(param.company){
        updatedata.company = param.company;
    }
    if(param.comment){
        updatedata.comment = param.comment;
    }
    if(param.utype){
        updatedata.utype = param.utype;
    }
    if(param.ctype){
        updatedata.ctype = param.ctype;
    }
    if(param.ucomment){
        updatedata.ucomment = param.ucomment;
    }
    if(param.ccomment){
        updatedata.ccomment = param.ccomment;
    }
    if(param.address){
        updatedata.address = param.address;
    }
    if(param.idnumber){
        updatedata.idnumber = param.idnumber;
    }
    if(param.employee){
        updatedata.employee = param.employee;
    }
    if(param.busiType){
        updatedata.busiType = param.busiType;
    }
    if(param.gender){
        updatedata.gender = param.gender;
    }
    if(param.bizMain){
        updatedata.bizMain = param.bizMain;
    }
    if(param.importance){
        updatedata.importance = param.importance;
    }
    console.log(updatedata);

    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/user/',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With":"XMLHttpRequest",
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then((res) => {
        updatedata.index = param.index;
        console.log(updatedata);
        dispatch(types.UPDATE_USER_DATA, updatedata);
    }, (res) => {
        console.log('fail');
    })
}

export const batchUpdateUserInfo = ({ dispatch }, param) => { //批量修改会员信息
    const updatedata = {
        userIds: param.userIds,
    }
    if(param.auditComment){
        updatedata.auditComment = param.auditComment;
    }
    if(param.audit){
        updatedata.audit = param.audit;
    }

    console.log(updatedata);
    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/user/batchUpdate',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With":"XMLHttpRequest",
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show=false;
        param.auditComment="";
        updatedata.indexs = param.indexs;
        dispatch(types.BATCH_UPDATE_USER_DATA, updatedata);
    }, (res) => {
        console.log('fail');
    })
}

export const batchUserIntentionAudit = ({ dispatch }, param) => { //批量审核会员意向
    const updatedata = {
        ids: param.arr,
        validate: param.validate,
        description:param.description
    }


    console.log(updatedata);
    Vue.http({
        method: 'PUT',
        url: apiUrl.userList + '/intention/validates',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With":"XMLHttpRequest",
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then((res) => {
        param.show=false;
        console.log('会员意向审核成功');
        dispatch(types.BATCH_USER_INTENTION_AUDIT, param);
    }, (res) => {
        console.log('fail');
    })
}

export const getFilesList = ({ dispatch }, param) => {  //供应商文件列表
    param.loading = true;
    var url = apiUrl.clientList+'/customer/file/?'+'&page=' + param.cur + '&pageSize=15';
    Vue.http({
        method:'GET',
        url:url,
        emulateJSON: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res)=>{
           var file = res.json().result.list;
           for (var i in file){
                file[i].show =false;
           }
            dispatch(types.FILES_DATA_LIST, file);
            param.all = res.json().result.pages;
            param.loading = false;
    }, (res) => {
        console.log('fail');
        param.loading = false;
    })
}

export const uploadFiles = ({ dispatch }, param) => { //客户文件上传
    console.log('文件上传');
    if(param.image_f){param.path+=param.image_f+','}
    if(param.image_s){param.path+=param.image_s+','}
    if(param.image_t){param.path+=param.image_t};
    const data = {
        fileType:param.fileType,
        bizType:param.bizType,
        path:param.path,
        description:param.description,
        bizId:param.bizId
    }
    Vue.http({
        method: 'POST',
        url: apiUrl.clientList + param.url,
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('文件添加成功')
        /*param.id = res.json().result.id;*/
        dispatch(types.ADD_FILES_DATA, param);
    }, (res) => {
        console.log('fail');
    });
}


export const createEmploy = ({ dispatch }, param) => { //新增员工信息
    console.log(param)
    const data1 = {
        "name":param.name,
        "ename":param.ename,
        "no":param.no,
        "orgName":param.orgName,
        'position':param.position,
        "mobile":param.mobile,
        "extno":param.extno,
        "level":param.level,
        'entrydate':param.entrydate,
        "leavedate":param.leavedate,
        "orgid":param.orgid,
        "orgcode":param.orgcode,
        'status':param.status
        /*"role":param.role*/
    }
    Vue.http({
        method: "POST",
        url:  apiUrl.clientList + param.url,
        emulateHTTP: true,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.ADD_EMPLOYEE_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const updateEmploy = ({ dispatch }, param) => { //修改员工信息
    console.log(param)
    const updatedata = {
        id:param.id,
        name:param.name,
        ename:param.ename,
        no:param.no,
        orgName:param.orgName,
        position:param.position,
        mobile:param.mobile,
        extno:param.extno,
        level:param.level,
        entrydate:param.entrydate,
        leavedate:param.leavedate,
        orgid:param.orgid,
        orgcode:param.orgcode,
        status:param.status,
        role:param.role
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
        dispatch(types.UPDATE_EMPLOY_DATA,param);
    }, (res) => {
        console.log('fail');
    })
}

export const editintentInfo = ({ dispatch }, param) => { //修改意向

  param.images='';
  if(param.image_f){param.images+=param.image_f+','}
  if(param.image_s){param.images+=param.image_s+','}
  if(param.image_t){param.images+=param.image_t};
    const data1 = {
      "id":param.id,
      "type":param.type,
      "especial":param.especial,
      "customerName":param.customerName,
      "customerId":param.customerId,
      "customerPhone":param.customerPhone,
      "breedName":param.breedName,
      "qualification":param.qualification,
      "spec":param.spec,
      "address":param.address,
      "advance":param.advance,
      "invoic":param.invoic,
      'visit':param.visit,
      "intl":param.intl,
      "unit":param.unit,
      "pack":param.pack,
      "sampling":param.sampling,
      "sampleNumber":param.sampleNumber,
      "sampleUnit":param.sampleUnit,
      "sampleAmount":param.sampleAmount,
      "breedId":param.breedId,
      "country":param.country,
      "quality":param.quality,
      "price":param.price,
      "province":param.province,
      "city":param.city,
      "district":param.district,
      "location":param.location,
      "number":param.number,
      "quality":param.quality,
      "duedate":param.duedate,
      "images":param.images
    }
    Vue.http({
        method: "PUT",
        url: apiUrl.clientList + '/intention/',
        emulateHTTP: false,
        body: data1,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功!!!!')
        dispatch(types.UPDATA_INTENTION_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const createIntentionInfo = ({ dispatch }, param) => { //新增意向
      if(param.image_f){param.images+=param.image_f+','}
      if(param.image_s){param.images+=param.image_s+','}
      if(param.image_t){param.images+=param.image_t};

    const data1 = {
        "userId":param.userId,
         "type":param.type,
         "especial":param.especial,
        "customerName":param.customerName,
        "customerId":param.customerId,
        "customerPhone":param.customerPhone,
         "breedName":param.breedName,
         "qualification":param.qualification,
         "spec":param.spec,
         "address":param.address,
         "advance":param.advance,
         "invoic":param.invoic,
         'visit':param.visit,
         "intl":param.intl,
         "unit":param.unit,
         "pack":param.pack,
         "sampling":param.sampling,
         "sampleNumber":param.sampleNumber,
         "sampleUnit":param.sampleUnit,
         "sampleAmount":param.sampleAmount,
         "breedId":param.breedId,
         "country":param.country,
         "quality":param.quality,
         "price":param.price,
         "province":param.province,
         "city":param.city,
         "district":param.district,
         "location":param.location,
         "number":param.number,
         "quality":param.quality,
         "duedate":param.duedate,
         "images":param.images
    }
    console.log(data1);
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
        param.id=res.json().result.intentionId;
        dispatch(types.INTENTION_DATA, param);
    }, (res) => {
        console.log('fail');
    })
}

export const intentionUpAndDown = ({ dispatch }, param) => { //意向上下架
    console.log(param);
    const updatedata = {
        ids: param.ids,
        onSell:param.onSell
    }
   
    Vue.http({
        method: 'PUT',
        url: apiUrl.clientList + '/intention/upAndDowns',
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功');
        console.log(param);
        dispatch(types.INTENTION_UP_DOWN,param);
        param.show = true;
    }, (res) => {
        console.log('fail');
    })
}

export const updateTrackingInfo = ({ dispatch }, param) => { //修改跟进信息
    console.log(param);

    const updatedata = {
        id: param.id,
        objId:param.objId
    }
    if(param.type){
        updatedata.type = param.type;
    }
    if(param.trackingWay){
        updatedata.trackingWay = param.trackingWay;
    }
    if(param.contactNo){
        updatedata.contactNo = param.contactNo;
    }
    if(param.comments){
        updatedata.comments = param.comments;
    }

    Vue.http({
        method: 'PUT',
        url: apiUrl.tracking + "/tracking/",
        emulateHTTP: false,
        body: updatedata,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功');
        console.log(param);
        dispatch(types.UPDATE_TRACKING_DATA,param);
    }, (res) => {
        console.log('fail');
    })
}

export const createTrackingInfo = ({ dispatch }, param) => { //添加跟进信息

    console.log(param.flag);

    const data = {

    }
    if(param.type!==''){
        data.type = param.type;
    }
    if(param.trackingWay!==''){
        data.trackingWay = param.trackingWay;
    }
    if(param.contactNo!==''){
        data.contactNo = param.contactNo;
    }
    if(param.comments!==''){
        data.comments = param.comments;
    }
    if(param.objId!==''){
        data.objId = param.objId;
    }
    if(param.bizId!==''){
        data.bizId = param.bizId;
    }
    if(param.bizType!==''){
      data.bizType=param.bizType;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.tracking + "/tracking/",
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('添加成功')
        dispatch(types.ADD_TRACKING_DATA,param);
    }, (res) => {
        console.log('fail');
        console.log(param)
    })
}

export const getAuthInfo = ({ dispatch }, param) => { //查询认证信息

    const data = {
        id: param.id
    }
    if(param.utype){
        data.utype = param.utype;
    }

    if(param.ctype){
        data.ctype = param.ctype;
    }

    Vue.http({
        method: 'POST',
        url: apiUrl.userList + "/user/identification",
        emulateHTTP: false,
        body: data,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('查询成功')
        console.log(res.json());
        var identify = res.json().result;
        dispatch(types.IDENTIFY_DATA,identify);
    }, (res) => {
        console.log('fail');
    })
}


export const baseGetData = ({ dispatch }, param) => { //查询认证信息

    Vue.http({
        method: 'GET',
        url: apiUrl.base + param.url+'?page=' + param.cur,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
         param.loading=false;
         console.log(param);
        console.log('查询成功')
        console.log(res.json());
        const json = {
            list:res.json(),
            name:param.keyName,
            callback:param.getDataInit
        };

        if(json.list.result&&Object.prototype.toString.call(json.list.result) === '[object Array]'){
             for(let i in json.list.result){
                json.list.result[i].show=false;
             }
        }else if(json.list.result.list&&Object.prototype.toString.call(json.list.result.list) === '[object Array]'){
            for(let i in json.list.result.list){
                json.list.result.list[i].show=false;
             }
        }
        param.all=json.list.result.pages;
        console.log(json);
        dispatch(types.ABSTRACT_GET_DATA,json);
    }, (res) => {
        param.loading=false;
        console.log('fail');
    })
}

export const baseAddData = ({ dispatch }, param) => { //查询认证信息

    Vue.http({
        method: 'POST',
        url: apiUrl.base + param.url,
        body: param.body,
        emulateHTTP: true,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('新增成功')
        console.log(res.json());
        if(res.json().result.id)param.body.id=res.json().result.id;
        param.body.utime = param.utime;
        param.body.show=false;
        let json = {
            name:param.keyName,
            body:param.body
        }
        param.loading=false;
        param.show=false;
        dispatch(types.ABSTRACT_ADD_DATA,json);
    }, (res) => {
        param.loading=false;
        console.log('fail');
    })
}

export const baseUpdateData = ({ dispatch }, param) => { //查询认证信息
    Vue.http({
        method: 'PUT',
        url: apiUrl.base + param.url,
        body: param.body,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('修改成功')
        console.log(res.json());
       param.body.utime = param.utime;
        let json = {
            name:param.keyName,
            body:param.body,
            index:param.index
        }
        param.loading=false;
        param.show=false;
        dispatch(types.ABSTRACT_UPDATE_DATA,json);
    }, (res) => {
        param.loading=false;
        console.log('fail');
    })
}

export const baseDelData = ({ dispatch }, param) => { //查询认证信息
    Vue.http({
        method: 'DELETE',
        url: apiUrl.base + param.url+param.id,
        emulateHTTP: false,
        emulateJSON: false,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then((res) => {
        console.log('删除成功')
        console.log(res.json());
        let json = {
            name:param.keyName,
            index:param.index
        }
        param.loading=false;
        dispatch(types.ABSTRACT_DELETE_DATA,json);
    }, (res) => {
        param.loading=false;
        console.log('fail');
    })
}


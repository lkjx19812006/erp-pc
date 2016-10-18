const parseJson =(data) =>{
return JSON.parse(JSON.stringify(data));
}


export const getCount = (state) => {
    return state.category.count
};

export const getMenu = (state) => {
    return state.category.left
};
export const getList = (state) => {
    return JSON.parse(JSON.stringify(state.category.list));
}

export const getCharList = (state) => {
    const option={
    	options:JSON.parse(JSON.stringify(state.echarts.barChartOption)),
    	load:JSON.parse(JSON.stringify(state.echarts.barChartLoading))
    } ;
    return option;
}

export const getLinechart = (state) => {
    const option={
    	options:JSON.parse(JSON.stringify(state.echarts.lineChartOption)),
    	load:JSON.parse(JSON.stringify(state.echarts.lineChartLoading))
    } ;
    return option;
}

export const getPiechart = (state) => {
    const option={
        options:JSON.parse(JSON.stringify(state.echarts.PieChartOption)),
        load:JSON.parse(JSON.stringify(state.echarts.PieChartLoading))
    } ;
    return option;
}

export const initOrderlist = (state) => {
    return parseJson(state.table.orderList);
}

export const initOrderDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.orderDetail));
}


/*--系统基础数据--*/
export const initSystemlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.systemBaseList.enumlist));
}
export const initSearchlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.searchList));
}
export const initCountrylist = (state) => {
    return JSON.parse(JSON.stringify(state.table.systemBaseList.countryList));
}
export const initProvincelist = (state) => {
    console.log('getter');
    return JSON.parse(JSON.stringify(state.table.systemBaseList.locationlist));
}
export const initCitylist = (state) => {
    return JSON.parse(JSON.stringify(state.table.systemBaseList.cityList));
}
export const initDistrictlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.systemBaseList.districtList));
}
/*--业务基础数据--*/
export const initEnterpriselist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.enterpriseList));
}
export const initConponentlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.componentList));
}
export const initDrawlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.drawList));
}
export const initBreedlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.breedList));
}

export const initCompanyDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.companyDetail));
}
export const initBreedDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.breedDetail));
}

export const initCategorylist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.categoryList));
}

export const initDruglist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.drugList));
}
/*---客户信息---*/
export const initCustomerlist = (state) => {
    return parseJson(state.table.basicBaseList.customerList);
}
/*供应商产品*/
export const initProductlist = (state) => {
    return parseJson(state.table.basicBaseList.productList);
}
export const initClientDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.clientDetail));
}

export const initEmployeeList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.employeeList));
}

export const initOrgList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orgList));
}
/*--意向信息--*/
export const initIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intentionList));
}

/*--供求意向匹配--*/
export const initSupplyDemandList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.supplyDemandList));
}

/*--报价信息--*/
export const initOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.offerList));
}

/*--留言信息--*/
export const initMsgList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.msgList));
}
/*--意向详情--*/
export const initIntentionDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intentionDetail));
}


/*---会员信息---*/
export const initUserList = (state) => {
    return parseJson(state.table.basicBaseList.userList);
}

/*审核标签*/
export const initAuditLabel = (state) => {
    return parseJson(state.table.label.auditLabel);
}

/*---会员详情---*/
export const initUserDetail = (state) => {
    return parseJson(state.table.userDetail);
}


 /*---认证信息---*/
export const initIdentify = (state) => {

    return parseJson(state.table.identify);
}

// /*---获取数据---*/
// export const getData = (state,param) => {
//     console.log(param);
//     console.log(state);
//     console.log("sdfsdf");
//     return parseJson(state[param.name]);
// }

 /*---修改跟进---*/
/*export const initTrackingDetail = (state) => {
    console.log('getter');
    return parseJson(state.table.trackingDetail);
}*/
/*---获取省市区---*/
export const initProvince = (state) => {
    return JSON.parse(JSON.stringify(state.table.locationList.provinceList));
}

export const initSupply = (state) => {

  return JSON.parse(JSON.stringify(state.table.basicBaseList.supplyList));
}

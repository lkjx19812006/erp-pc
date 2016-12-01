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
    console.log('getter');
    return JSON.parse(JSON.stringify(state.category.list));
}

export const getTabs = (state) => {
    console.log('getter-tabs');
    return JSON.parse(JSON.stringify(state.category.tabs));
}

export const getCharList = (state) => {
    const option={
    	options:JSON.parse(JSON.stringify(state.echarts.barChartOption)),
    	load:JSON.parse(JSON.stringify(state.echarts.barChartLoading))
    } ;
    return option;
}

export const initLogin = (state) => {
    return JSON.parse(JSON.stringify(state.table.login));
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
export const initUserType = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.userTypeList));
}
/*---订单数据---*/
export const initOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.orderList);
}
export const initExpresslist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.expressList));
}
export const initOrderPaylist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orderPayList));
}
export const initRolloutlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orderRolloutList));
}
export const initOrderDetail = (state) => { 
    return JSON.parse(JSON.stringify(state.table.orderDetail));
}
export const initLogisticsDetail = (state) => { 
    return JSON.parse(JSON.stringify(state.table.logisticsDetail));
}
export const initDrugsDetail = (state) => { 
    return JSON.parse(JSON.stringify(state.table.rolloutDetail));
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
/*供应商产品列表以及详情*/
export const initProductlist = (state) => {
    return parseJson(state.table.basicBaseList.productList);
}
export const initProductDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.productDetail));
}
/*供应商文件*/
export const initFileslist = (state) => {
    return parseJson(state.table.basicBaseList.filesList);
}
/*---end---*/
export const initClientDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.clientDetail));
}

export const initEmployeeList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.employeeList));
}

export const initOrgList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orgList));
}
export const initRoleList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.roleList));
}
/*--意向信息--*/
export const initIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intentionList));
}

/*--国际意向信息--*/
export const initIntlIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intlIntentionList));
}

/*--国际意向询价信息--*/
export const initIntlIntentionInquireList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intlIntentionInquireList));
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
/*--国际意向详情--*/
export const initIntlIntentionDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intlIntentionDetail));
}
/*--国际意向询价详情--*/
export const initIntlIntentionInquireDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intlIntentionInquireDetail));
}
/*--国际意向条目历史报价记录--*/
export const initItemHistory = (state) => {
    console.log('getters');
    return JSON.parse(JSON.stringify(state.table.basicBaseList.itemHistory));
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

/*---获取省市区---*/
export const initProvince = (state) => {
    return JSON.parse(JSON.stringify(state.table.locationList.provinceList));
}

export const initSupply = (state) => {
  return JSON.parse(JSON.stringify(state.table.basicBaseList.supplyList));
}


/*---我的客户统计---*/
export const initClientcount = (state) => {
    console.log(state.count)
  return parseJson(state.count.countList);
}
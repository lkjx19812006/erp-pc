const parseJson = (data) => {
    return JSON.parse(JSON.stringify(data));
}

export const getIsTop = (state) => {
    return state.isTop;
};

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
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.barChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.barChartLoading))
    };
    return option;
}

export const initLogin = (state) => {
    return JSON.parse(JSON.stringify(state.table.login));
}


export const getLinechart = (state) => {
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.lineChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.lineChartLoading))
    };
    return option;
}

export const getPiechart = (state) => {
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.PieChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.PieChartLoading))
    };
    return option;
}

/*---待办事项---*/
export const initBacklogList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.backlogList));
}


/*---待处理的报价消息---*/
export const initOfferMessageList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.offerMessageList));
}

/*---流程记录---*/
export const initFlowRecord = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.flowRecord));
}

/*---通知列表---*/
export const initNoticeList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.noticeList));
}

export const initUserType = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.userTypeList));
}

/*---订单数据---*/
export const initUserOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.userOrderList);
}
export const initMyOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.myOrderList);
}
export const initOrgOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.orgOrderList);
}
export const initAllOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.allOrderList);
}
export const initSellOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.sellOrderList);
}
export const initPurchaseOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.purchaseOrderList);
}
export const initToDoOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.toDoOrderList);
}
export const initOrderlist = (state) => {
    return parseJson(state.table.basicBaseList.orderList);
}

/*---待采购统计---*/
export const initMyOrderLinkList = (state) => {
    return parseJson(state.table.basicBaseList.myOrderLinkList);
}
export const initOrgOrderLinkList = (state) => {
    return parseJson(state.table.basicBaseList.orgOrderLinkList);
}

/*---采销对应---*/
export const initLinkOrder = (state) => {
    return parseJson(state.table.basicBaseList.linkOrder);
}


/*---列表页订单统计---*/
export const initOrgOrderStatis = (state) => {
    return parseJson(state.table.basicBaseList.orgOrderStatis);
}
export const initAllOrderStatis = (state) => {
    return parseJson(state.table.basicBaseList.allOrderStatis);
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
    console.log(state.table.orderDetail.goods);
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
    return JSON.parse(JSON.stringify(state.table.systemBaseList.locationlist));
}
export const initCNProvince = (state) => {
    return JSON.parse(JSON.stringify(state.table.systemBaseList.CNProvince));
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
export const initCompanyProductlist = (state) => { //企业产品列表
    return JSON.parse(JSON.stringify(state.table.basicBaseList.companyProductList));
}
export const initCompanyProductDetail = (state) => { //企业产品详情
    return JSON.parse(JSON.stringify(state.table.companyProductDetail));
}
export const initCompanyLicenselist = (state) => { //企业证书列表
    return JSON.parse(JSON.stringify(state.table.basicBaseList.companyLicenseList));
}
export const initRelativeCompanylist = (state) => { //关联企业
    return JSON.parse(JSON.stringify(state.table.basicBaseList.relativeCompanyList));
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
export const initMyCustomerlist = (state) => {
    return parseJson(state.table.basicBaseList.myCustomerList);
}
export const initOrgCustomerlist = (state) => {
    return parseJson(state.table.basicBaseList.orgCustomerList);
}
export const initAllCustomerlist = (state) => {
    return parseJson(state.table.basicBaseList.allCustomerList);
}
export const initBlackCustomerlist = (state) => {
    return parseJson(state.table.basicBaseList.blackCustomerList);
}
export const initUnCustomerlist = (state) => {
    return parseJson(state.table.basicBaseList.unCustomerList);
}
export const initSupplyCustomerlist = (state) => {
    return parseJson(state.table.basicBaseList.supplyCustomerList);
}
export const initCustomerlist = (state) => {
    return parseJson(state.table.basicBaseList.customerList);
}

/*---客户通话记录---*/
export const initCallRecordList = (state) => {
    return parseJson(state.table.basicBaseList.callRecordList);
}

/*---客户通话记录统计---*/
export const initCallCountList = (state) => {
    return parseJson(state.table.basicBaseList.callCountList);
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

export const initEmployeeList = (state) => { //员工
    return JSON.parse(JSON.stringify(state.table.basicBaseList.employeeList));
}

export const initEmployeeDetail = (state) => { //员工详情
    return JSON.parse(JSON.stringify(state.table.employeeDetail));
}
export const initOrgList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orgList));
}
export const initOrgDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.orgDetail));
}
export const initRoleList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.roleList));
}

/*--采购单信息--*/
export const initMyPurchaseList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.myPurchaseList));
}
export const initOrgPurchaseList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orgPurchaseList));
}
export const initAllPurchaseList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.allPurchaseList));
}
export const initPurchaseDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.purchaseDetail));
}
export const initIndentOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.indentOfferList));
}
export const initMyIndentOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.myIndentOfferList));
}
export const initAllIndentOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.allIndentOfferList));
}

/*--采购报价信息--*/
export const initPurchaseOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.purchaseOfferList));
}
export const initPurchaseOrderDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.purchaseOrderDetail));
}


/*--意向信息--*/
export const initUserIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.userIntentionList));
}
export const initMyIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.myIntentionList));
}
export const initOrgIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orgIntentionList));
}
export const initUnIntentionList = (state) => { //潜在意向，意向资源池
    return JSON.parse(JSON.stringify(state.table.basicBaseList.unIntentionList));
}
export const initIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intentionList));
}

/*--国际意向信息--*/
export const initMyIntlIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.myIntlIntentionList));
}
export const initOrgIntlIntentionList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orgIntlIntentionList));
}
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
export const initMyOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.myOfferList));
}
export const initOrgOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.orgOfferList));
}
export const initOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.offerList));
}

/*--留言信息--*/
export const initMsgList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.msgList));
}
export const initPreSellMsgList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.preSellMsgList));
}

/*--意向详情--*/
export const initIntentionDetail = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.intentionDetail));
}

/*--报价详情--*/
export const initIntentionOfferDetail = (state) => {
        return JSON.parse(JSON.stringify(state.table.basicBaseList.intentionOfferDetail));
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
    return JSON.parse(JSON.stringify(state.table.basicBaseList.itemHistory));
}

/*--国际意向条目的外部报价--*/
export const initOuterOfferList = (state) => {
    return JSON.parse(JSON.stringify(state.table.basicBaseList.outerOfferList));
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

/*---常用单位列表---*/
export const initUnitlist = (state) => {
        return parseJson(state.count.unitList);
    }
    /*---常用货币列表---*/
export const initCurrencylist = (state) => {
        return parseJson(state.count.currencyList);
    }
    /*---我的客户统计---*/
export const initClientcount = (state) => {
        console.log(state.count)
        return parseJson(state.count.countList);
    }
    /*---订单统计---*/
export const initMyOrderCount = (state) => {
    return parseJson(state.count.myOrderCount);
}
export const initOrgOrderCount = (state) => {
    return parseJson(state.count.orgOrderCount);
}
export const initOrgCountList = (state) => {
    return parseJson(state.count.employeeCount);
}
export const initOrderStatics = (state) => {
        return parseJson(state.count.orderList);
    }
    // 全部订单统计
export const initAllOrderCount = (state) => {
        return parseJson(state.count.allOrderCount);
    }
    // 部门统计
export const initOrgCount = (state) => { //部门统计
    return parseJson(state.table.orgCount);

}
export const initMyTimeOrderCount = (state) => { //时间维度
    return parseJson(state.count.myTimeOrderCount);
}
export const initOrgOrderSortCount = (state) => {
        return parseJson(state.count.orgOrderSortCount);
    }
    /*--寄样申请列表--*/
export const initSamplelist = (state) => {
    console.log(state.count)
    return parseJson(state.count.mySampleList);
}
export const initOrgSample = (state) => {
    console.log(state.count)
    return parseJson(state.count.orgSampleList);
}
export const initgSampleDetail = (state) => {
        return parseJson(state.count.sampleDetail);
    }
    /*--订单资金记录--*/
export const initMyFundList = (state) => {
    return JSON.parse(JSON.stringify(state.count.myFundlist));
}
export const initOrgFundList = (state) => {
    return parseJson(state.count.orgFundlist);
}
export const initFundDetail = (state) => {
    return parseJson(state.count.fundDetail);
}
export const initFinanceList = (state) => { //财务资金审核
    return parseJson(state.count.financeList);
}
export const initRecordList = (state) => { //分期申请历史记录
    console.log(state.count.recordList)
    return JSON.parse(JSON.stringify(state.count.recordList));
}
export const initSupplierList = (state) => { //分期申请历史记录
    return parseJson(state.count.supplierList);
}
export const initBankList = (state) => { //获取银行的数据
    return parseJson(state.count.bankList);
}
export const initBankBranchList = (state) => { //获取银行分支的数据
    return parseJson(state.count.bankBranchList);
}
export const initMyContractList = (state) => { //我的补充合同
    return parseJson(state.count.myContractList);
}
export const initOrgContractList = (state) => { //部门补充合同
    return parseJson(state.count.orgContractList);
}
export const initMyAfterSales = (state) => { //我的售后列表
    return parseJson(state.count.mySalesList);
}
export const initOrgAfterSales = (state) => { //我的售后列表
    return parseJson(state.count.orgSalesList);
}

export const initReceiptDetail = (state) => { //补充合同，售后详情
    return parseJson(state.count.contractDetail);
}


/*--药款管理记录--*/
export const initDrugAccountList = (state) => { //获取药款账户的数据
    return JSON.parse(JSON.stringify(state.table.basicBaseList.drugAccountList));
}

/*--收货地址列表--*/
export const initAddressList = (state) => { //获取药款账户的数据
    console.log(state.table.basicBaseList.addressList);
    return JSON.parse(JSON.stringify(state.table.basicBaseList.addressList));
}

/*--邮件列表--*/
export const initEmailList = (state) => { //获取邮件列表
    return JSON.parse(JSON.stringify(state.table.basicBaseList.emailList));
}

/*--邮件统计--*/
export const initEmailCount = (state) => { //获取邮件统计
    return JSON.parse(JSON.stringify(state.table.basicBaseList.emailCount));
}

export const initScopeDetail = (state) => { //获取权限详情
    return JSON.parse(JSON.stringify(state.tablelist.power.detail));
}

/*--邮件统计--*/
export const initDictionary = (state) => { //获取邮件统计
    return JSON.parse(JSON.stringify(state.table.dictionary));
}

/*库存管理*/
export const initStockList = (state) => { //获取库存列表
    return JSON.parse(JSON.stringify(state.table.stockList))
}

export const getLineschart = (state) => { //获取折线图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.linesChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.linesChartLoading))
    };
    return option;
}

export const getColchart = (state) => { //获取柱状图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.ColChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.ColChartLoading))
    }
    return option
}

export const initBreedLinesChart = (state) => { //获取我的品种统计折线图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.breedLinesChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.breedLinesChartLoading))
    }
    return option
}

export const initOrgBreedLinesChart = (state) => { //获取部门品种统计折线图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.orgBreedLinesChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.orgBreedLinesChartLoading))
    }
    return option
}


export const initAllBreedLinesChart = (state) => { //获取全部品种统计折线图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.allBreedLinesChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.allBreedLinesChartLoading))
    }
    return option
}

export const initBreedRegionalchart = (state) => { //获取我的品种统计区域图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.breedRegionalChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.breedRegionalChartLoading))
    }
    return option
}

export const initOrgBreedRegionalchart = (state) => { //获取部门品种统计区域图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.orgBreedRegionalChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.orgBreedRegionalChartLoading))
    }
    return option
}

export const initAllBreedRegionalchart = (state) => { //获取全部品种统计区域图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.allBreedRegionalChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.allBreedRegionalChartLoading))
    }
    return option
}

export const initBreedBarChart = (state) => { //获取我的品种统计柱状图
    const option = {
        options: state.echarts.breedBarChartOption,
        load: state.echarts.breedBarChartLoading
    }
    return option
}

export const initOrgBreedBarChart = (state) => { //获取部门品种统计柱状图
    const option = {
        options: state.echarts.orgBreedBarChartOption,
        load: state.echarts.orgBreedBarChartLoading
    }
    return option
}

export const initAllBreedBarChart = (state) => { //获取全部品种统计柱状图
    const option = {
        options: state.echarts.allBreedBarChartOption,
        load: state.echarts.allBreedBarChartLoading
    }
    return option
}



export const getRegionalchart = (state) => { //区域客户中国地图数据
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.regionalChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.regionalChartLoading))
    }
    return option
}


export const getOrgchart = (state) => { //获取部门折线图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.orgChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.orgChartLoading))
    }
    return option
}

export const getAllchart = (state) => { //获取全部折线图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.allChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.allChartLoading))
    }
    return option
}

export const getOrgColchart = (state) => { //获取部门柱状图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.orgColChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.orgColChartOption))
    }
    return option
}

export const getAllColchart = (state) => { //获取全部柱状图
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.allColChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.allColChartOption))
    }
    return option
}

export const getCustypechart = (state) => { //个人客户类型折线图数据
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.custypeChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.custypeChartLoading))
    }
    return option
}


export const getOrgCustypechart = (state) => { //部门客户类型折线图数据
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.orgCustypeChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.orgCustypeChartLoading))
    }
    return option
}

export const getAllCustypechart = (state) => { //全部客户类型折线图数据
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.allCustypeChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.allCustypeChartLoading))
    }
    return option
}

export const getOrgRegionalchart = (state) => { //部门区域数据
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.orgRegionalChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.orgRegionalChartLoading))
    }
    return option
}

export const getAllRegionalchart = (state) => { //全部区域数据
    const option = {
        options: JSON.parse(JSON.stringify(state.echarts.allRegionalChartOption)),
        load: JSON.parse(JSON.stringify(state.echarts.allRegionalChartLoading))
    }
    return option
}

export const getYear = (state) => { //获取年份
    return JSON.parse(JSON.stringify(state.table.yearNum));
}

export const getNewUserDetail = (state) => { //获取新增用户
    return JSON.parse(JSON.stringify(state.table.newUserDetail))
}

export const getDealUserDetail = (state) => { //获取成交用户
    return JSON.parse(JSON.stringify(state.table.newDealDetail))
}

export const getActiveUserDetail = (state) => { //获取活跃用户
    return JSON.parse(JSON.stringify(state.table.newActiveDetail))
}


export const getYesTodayDetail = (state) => { //获取业务员昨日统计用户
    return JSON.parse(JSON.stringify(state.table.yestodayDetail))
}

export const initYesTodayBreed = (state) => { //初始化我的品种统计昨日成交品种
    return JSON.parse(JSON.stringify(state.table.yestodayDealBreed))
}

export const initOrgYesTodayBreed = (state) => { //初始化部门品种统计昨日成交品种
    return JSON.parse(JSON.stringify(state.table.orgYestodayDealBreed))
}

export const initAllYesTodayBreed = (state) => { //初始化全部品种统计昨日成交品种
    return JSON.parse(JSON.stringify(state.table.allYestodayDealBreed))
}

export const getCusTypeDetail = (state) => { //获取业务员客户类型详情
    return JSON.parse(JSON.stringify(state.table.cusTypeDetail))
}

export const getOrgCusTypeDetail = (state) => { //获取部门客户类型详情
    return JSON.parse(JSON.stringify(state.table.orgCusTypeDetail))
}

export const getAllCusTypeDetail = (state) => { //获取全部客户类型详情
    return JSON.parse(JSON.stringify(state.table.allCusTypeDetail))
}

export const getAllYesTodayDetail = (state) => { //获取全部昨日统计用户
    return JSON.parse(JSON.stringify(state.table.allYestodayDetail))
}

export const getOrgYesTodayDetail = (state) => { //获取部门昨日用户
    return JSON.parse(JSON.stringify(state.table.orgYestodayDetail))
}

export const getOrgSalemanDetail = (state) => { //获取部门昨日用户
    return JSON.parse(JSON.stringify(state.table.orgSalemanDetail))
}

export const getAllOrgDetail = (state) => { //获取全部部门用户
    return JSON.parse(JSON.stringify(state.table.allOrgDetail))
}

export const getProvinceDetail = (state) => { //获取个人用户
    return JSON.parse(JSON.stringify(state.table.provinceDetail))
}

export const getOrgProvinceDetail = (state) => { //获取部门省用户
    return JSON.parse(JSON.stringify(state.table.orgProvinceDetail))
}

export const getAllProvinceDetail = (state) => { //获取部门省用户
    return JSON.parse(JSON.stringify(state.table.allProvinceDetail))
}

export const initBreedProvinceDetail = (state) => { //初始化我的品种统计省份详情
    return JSON.parse(JSON.stringify(state.table.breedProvinceDetail))
}

export const initOrgBreedProvinceDetail = (state) => { //初始化部门品种统计省份详情
    return JSON.parse(JSON.stringify(state.table.orgBreedProvinceDetail))
}

export const initAllBreedProvinceDetail = (state) => { //初始化全部品种统计省份详情
    return JSON.parse(JSON.stringify(state.table.allBreedProvinceDetail))
}

export const initAddBreedDetail = (state) => { //初始化我的品种统计新增品种详情
    return JSON.parse(JSON.stringify(state.table.addBreedDetail))
}

export const initOrgAddBreedDetail = (state) => { //初始化部门品种统计新增品种详情
    return JSON.parse(JSON.stringify(state.table.orgAddBreedDetail))
}

export const initAllAddBreedDetail = (state) => { //初始化全部品种统计新增品种详情
    return JSON.parse(JSON.stringify(state.table.allAddBreedDetail))
}

export const initDealBreedDetail = (state) => { //初始化我的品种统计成交品种详情
    return JSON.parse(JSON.stringify(state.table.dealBreedDetail))
}


export const initBreedOrderDetail = (state) => { //初始化我的品种统计成交订单详情
    return JSON.parse(JSON.stringify(state.table.breedOrderDetail))
}

export const initSampleCountList = (state) => { //初始化样品订单统计
    return JSON.parse(JSON.stringify(state.table.sampleCountList))
}

export const initSampleCountDetail = (state) => { //初始化样品订单统计详情
    return JSON.parse(JSON.stringify(state.table.sampleCountDetail))
}

export const initMainOrderCountList = (state) => { //初始化大货订单统计
    return JSON.parse(JSON.stringify(state.table.mianOrderCountList))
}

export const initMainOrderCountDetail = (state) => { //初始化大货订单统计详情
    return JSON.parse(JSON.stringify(state.table.mianOrderCountDetail))
}

export const initBreedCountList = (state) => { //初始化品种统计列表
    return JSON.parse(JSON.stringify(state.table.breedCountList))
}

export const initSendBreedList = (state) => { //初始化品种统计寄样详情
    return JSON.parse(JSON.stringify(state.table.sendBreedList))
}

export const initDealBreedList = (state) => { //初始化大货订单统计详情
    return JSON.parse(JSON.stringify(state.table.dealBreedList))
}

export const initCancelRecordList = (state) => { //初始化取消询价列表
    return JSON.parse(JSON.stringify(state.table.cancelRecordList))
}

export const initBillList = (state) => { //初始化收付费信息统计列表
    return JSON.parse(JSON.stringify(state.table.billList))
}

//初始化客户信息统计
export const initCustomerCountList = (state) => {
    return JSON.parse(JSON.stringify(state.table.customerCountList))
}

export const initCustomerCountTotal = (state) => {
    return JSON.parse(JSON.stringify(state.table.customerCountTotal))
}

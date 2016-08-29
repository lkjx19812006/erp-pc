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
    return parseJson(state.table.list);
}

export const initClientlist = (state) => {
    return parseJson(state.table.clientList);
}

export const initSystemlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.systemDataList)); 
    console.log(state.table.systemDataList) 
} 
export const initProvincelist = (state) => {
    return JSON.parse(JSON.stringify(state.table.provinceDataList));  
}

export const initEnterpriselist = (state) => {
    return parseJson(state.table.enterpriseList);  
}

export const initConponentlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.componentList));  
}

export const initDrawlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.drawList));  
}
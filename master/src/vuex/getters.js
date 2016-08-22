export const getCount = (state) => {
    return state.category.count
};

export const getMenu = (state) => {
    return state.category.left
};

export const getList = (state) => {

    console.log(JSON.parse(JSON.stringify(state.category.list)));
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

export const getOrderlist = (state) => {
    return JSON.parse(JSON.stringify(state.table.list));
}

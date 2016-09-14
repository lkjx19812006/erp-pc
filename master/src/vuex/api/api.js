const ctx = '/crm/api/v1';
const local='/static/data/';


const _listUrl={
	list:local+'list.json',
	charList:local+'chart.json',
	linechart:local+'linechart.json',
	piechart:local+'piechart.json',
	orderTable:local+'order.json',
	clientList:ctx,
	userList:ctx,
	dataBaseList:ctx+'/sys/enum',
	provinceList:ctx+'/sys/location',
	enterpriseList:ctx+'/company/',
	componentList:ctx+'/recipe',
	drawList:ctx+'/extractive',
	breedList:ctx+'/breed',
	categoryList:ctx+'/category/',
	drugList:ctx+'/drug/'
};

export default _listUrl;
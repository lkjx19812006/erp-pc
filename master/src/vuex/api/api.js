const ctx = '/crm/api/v1';
const local='/static/data/';


const _listUrl={
	base:ctx,
	list:local+'list.json',
	charList:local+'chart.json',
	linechart:local+'linechart.json',
	piechart:local+'piechart.json',
	orderTable:local+'order.json',
	auditQuickEdit:local+'auditQuickEdit.json',
	orderList:ctx,
	clientList:ctx,
	userList:ctx,
	tracking:ctx,
	employeeList:local+'employee.json',
	orgList:ctx,
	dataBaseList:ctx+'/sys/enum',
	provinceList:ctx+'/sys/location',
	enterpriseList:ctx+'/company/',
	drawList:ctx+'/extractive',
	breedList:ctx+'/breed',
	categoryList:ctx+'/category/',
	drugList:ctx+'/drug/',
	file:ctx+'/file/',
	countList:local+'clientCount.json',
  loadUrl:ctx+'/file/dowanloadFile'
};

export default _listUrl;

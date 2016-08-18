export const getCount = (state)=>{
	return state.category.count};

export const getList = (state)=>{
	
	console.log(JSON.parse(JSON.stringify(state.category.list)));
	return JSON.parse(JSON.stringify(state.category.list));}
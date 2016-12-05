'use strict';



function changeMenu(isTop,getMethod,param,storageParam) {   //
    console.log(param);
    if(!isTop){
        console.log("刷新数据");
        getMethod(param);
    }else{
        console.log("不刷新数据");
        if(!!storageParam){
            for(var key in param){
                param[key] = JSON.parse(storageParam)[key];
            }
        }
        
    }
}




module.exports = changeMenu;
import {
 ABSTRACT_GET_DATA,
 ABSTRACT_UPDATE_DATA,
 ABSTRACT_DELETE_DATA,
 ABSTRACT_ADD_DATA
} from '../mutation-types'

const state = {

  //角色模块
	 power:{
	 	list:{
      "code": 200,
      "msg": "success",
      "result": {
        "pageNum": 1,
        "pageSize": 10,
        "size": 10,
        "orderBy": null,
        "startRow": 1,
        "endRow": 10,
        "total": 27,
        "pages": 3,
        "list": [
            {
                "id": 1,
                "cname": "员工",
                "remark": null,
                "sortnum": 5,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 2,
                "cname": "系统管理员",
                "remark": "具有管理员权限",
                "sortnum": 6,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 3,
                "cname": "总经理",
                "remark": null,
                "sortnum": 1,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 4,
                "cname": "总助",
                "remark": "可以查看全部供求信息",
                "sortnum": 2,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 5,
                "cname": "业务部主管",
                "remark": "查看本部门全部撮合记录",
                "sortnum": 3,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 21,
                "cname": "市场部主管",
                "remark": null,
                "sortnum": 7,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 22,
                "cname": "市场部员工",
                "remark": null,
                "sortnum": 8,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 11,
                "cname": "业务员",
                "remark": null,
                "sortnum": 4,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 23,
                "cname": "供应部",
                "remark": null,
                "sortnum": 9,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            },
            {
                "id": 24,
                "cname": "财务部主管",
                "remark": null,
                "sortnum": 10,
                "menus": null,
                "updater": null,
                "utime": "2016-09-21 16:36",
                "creater": null,
                "ctime": "2016-09-21 16:36",
                "status": null,
                "show":false
            }
        ],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 2,
        "lastPage": 3,
        "isFirstPage": true,
        "isLastPage": false,
        "hasPreviousPage": false,
        "hasNextPage": true,
        "navigatePages": 8,
        "navigatepageNums": [
            1,
            2,
            3
        ]
    }
	 	},
	 	detail:{

	 	}
	 },


  //权限模块
     menu:{
        list:{

        }
     }


}


const mutations = {

	[ABSTRACT_GET_DATA](state, data) {
        console.log(data);
        if(data.name=='menu'){
            for(var i in data.list.result){
                for(var m in data.list.result[i].subcategory){
                    data.list.result[i].subcategory[m].show=false;
                }
            }
        }
        state[data.name].list = data.list;
        if(data.callback)data.callback();
    },

    [ABSTRACT_UPDATE_DATA](state,data){
        console.log(data);
    	// state[data.name].list.result.list[data.index]=data.body;

        for(let i in state[data.name].list.result.list[data.index]){
            for(let m in data.body){
                if(i==m){
                  state[data.name].list.result.list[data.index][i]=data.body[m];
                }
            }
        }
    },

    [ABSTRACT_DELETE_DATA](state,data){
    	state[data.name].list.result.list.splice(data.index,1);
    },

    [ABSTRACT_ADD_DATA](state,data){
    	state[data.name].list.result.list.unshift(data.body);
    }



}

export default {
    state,
    mutations
}

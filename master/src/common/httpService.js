'use strict';
import Vue from 'vue';
import apiUrl from './api/api'

var httpService = new Vue({
	data:{
		KEY:'',
		SID:'',
		apiUrl:{
			login:'/crm/api/v1/employee/login'
		}
	},
	methods:{
		addSID(url){
			if(this.SID&&this.SID != undefined){
				return url + ';jsessionid=' + this.SID;
			}else{
				return url;
			}
		},
		getSID(req , redirect){
			if(req){
				
			}
		}
	}
})

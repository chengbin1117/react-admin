import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';

let Base64 = require('js-base64').Base64;
let userId = localStorage.getItem('userId')
let token = localStorage.getItem('Kgtoken')


//获得充值列表接口
export async function getAccountRecharge(params) {

	var data = Base64.encode(JSON.stringify(params));

	console.log("sign",data+userId+'_'+token)
    var sign = md5(data+userId+'_'+token);
   
	let url = '/admin/account/getAccountRecharge?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}

//获得提币列表接口
export async function getAccountWIthdraw(params) {

	var data = Base64.encode(JSON.stringify(params));

	console.log("sign",data+userId+'_'+token)
    var sign = md5(data+userId+'_'+token);
   
	let url = '/admin/account/getAccountWithdraw?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//审核提现接口

export async function auditAccountWithdraw(params) {

	var data = Base64.encode(JSON.stringify(params));

	console.log("sign",data+userId+'_'+token)
    var sign = md5(data+userId+'_'+token);
   
	let url = '/admin/account/auditAccountWithdraw?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//获得交易记录列表接口
export async function getAccount(params) {

	var data = Base64.encode(JSON.stringify(params));

	console.log("sign",data+userId+'_'+token)
    var sign = md5(data+userId+'_'+token);
   
	let url = '/admin/account/getAccount?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}

//保证金记录表

export async function getAccountDiposit(params) {

	var data = Base64.encode(JSON.stringify(params));

	console.log("sign",data+userId+'_'+token)
    var sign = md5(data+userId+'_'+token);
   
	let url = '/admin/account/getAccountDiposit?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//获得业务类型列表接口
export async function getBusinessType(params) {

	var data = Base64.encode(JSON.stringify(params));

	console.log("sign",data+userId+'_'+token)
    var sign = md5(data+userId+'_'+token);
   
	let url = '/admin/account/getBusinessType?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
